import {
  DIMENSIONS,
  LEANS,
  LIBRARY,
  SHAME,
  SITUATIONS,
  STATEMENTS,
  STATEMENT_ORDER,
} from './pride-content.js';
import { fromBase64Url, isTenths, toBase64Url } from './store.js';

// Pride Check keeps everything on the person's device. Nothing is sent to the
// church. A shared link carries the statements and situations, never the shame
// check, so whoever opens it can't see that part.

const KEY = 'flight-school.pride.v1';

const round1 = (n) => Math.round(n * 10) / 10;
const average = (values) => values.reduce((sum, v) => sum + v, 0) / values.length;

// Provisional cutoffs from Draft 1. Adjust after the pilot.
const LEAN_GAP = 1.5;
const HIGH = 5;
const START_HERE = 7.5;
const STRENGTH_MAX = 3;
const TEACHABLE_STRONG = 7.5;
const GRACE_SHAME = 6;

/**
 * @param {{statements: Record<string, number>, situations: Record<string, number>, shame?: Record<string, number>}} answers
 *   slider values 0-10 by id; situations hold the chosen answer's place in its list
 */
export function scorePride({ statements, situations, shame = {} }) {
  const rows = DIMENSIONS.map((dimension) => {
    const scoreSide = (side, valueAt) => {
      const said = Object.entries(STATEMENTS)
        .filter(([, item]) => item.dim === dimension.id && item.side === side)
        .map(([id]) => statements[id]);
      const did = SITUATIONS.filter((s) => s.dim === dimension.id).map(
        (s) => s.answers[situations[s.id]][valueAt]
      );
      return average([...said, ...did]);
    };
    return { ...dimension, up: round1(scoreSide('up', 1)), back: round1(scoreSide('back', 2)) };
  }).map((row) => ({ ...row, word: rowWord(row) }));

  const up = round1(average(rows.map((r) => r.up)));
  const back = round1(average(rows.map((r) => r.back)));
  const teachable = round1(
    average(Object.entries(STATEMENTS).filter(([, i]) => i.side === 'teachable').map(([id]) => statements[id]))
  );

  const shameValues = Object.keys(SHAME).map((id) => shame[id]);
  const grace =
    shameValues.every((v) => typeof v === 'number') && average(shameValues) >= GRACE_SHAME && back >= HIGH;

  return { rows, up, back, teachable, lean: leanFor(up, back), grace, ...stepsFor(rows, teachable) };
}

function gapOf(a, b) {
  return round1(Math.abs(a - b));
}

function rowWord({ up, back }) {
  if (gapOf(up, back) >= LEAN_GAP) return up > back ? 'Leans up' : 'Leans back';
  return up >= HIGH && back >= HIGH ? 'Both high' : 'Balanced';
}

// A close call with either side at 5.0 or more goes to "back and forth." Calling
// that "pride isn't running the show" would be too reassuring.
function leanFor(up, back) {
  if (gapOf(up, back) >= LEAN_GAP) return up > back ? 'up' : 'back';
  return up < HIGH && back < HIGH ? 'neither' : 'both';
}

function stepsFor(rows, teachable) {
  // One step per area, so two steps always mean two different places to work.
  // On a tie, holding back wins: courage is the safer thing to lead with.
  const steps = rows
    .map((row) => {
      const side = row.up > row.back ? 'up' : 'back';
      return { key: `${row.id}-${side}`, name: row.name, side, score: row[side], ...LIBRARY[side][row.id] };
    })
    .filter((step) => step.score >= HIGH)
    .sort((a, b) => b.score - a.score)
    .slice(0, 2)
    .map((step) => ({ ...step, label: step.score >= START_HERE ? 'Start here' : 'Worth watching' }));

  return {
    steps,
    addTeachableStep: teachable < HIGH,
    noRowStep: steps.length === 0 && teachable >= HIGH,
    strengthRows: rows.filter((r) => r.up <= STRENGTH_MAX && r.back <= STRENGTH_MAX).map((r) => r.id),
    teachableStrong: teachable >= TEACHABLE_STRONG,
  };
}

export const leanCopy = (lean, teachable) => {
  const copy = LEANS[lean];
  return lean === 'neither' && teachable < HIGH ? { ...copy, text: copy.textLowTeachable } : copy;
};

/** The same person always sees a situation's answers in the same shuffled order. */
export function answerOrder(situationIndex, seed, count) {
  const order = Array.from({ length: count }, (_, i) => i);
  let state = (seed + situationIndex * 7919) >>> 0;
  for (let i = count - 1; i > 0; i -= 1) {
    state = (Math.imul(state, 1664525) + 1013904223) >>> 0;
    const j = state % (i + 1);
    [order[i], order[j]] = [order[j], order[i]];
  }
  return order;
}

export const emptyPride = () => ({
  step: 0,
  statements: {},
  situations: {},
  shame: {},
  doneSteps: {},
  seed: Math.floor(Math.random() * 2 ** 31),
  finishedAt: null,
});

export function loadPride() {
  try {
    const raw = window.localStorage.getItem(KEY);
    return raw ? { ...emptyPride(), ...JSON.parse(raw) } : emptyPride();
  } catch {
    return emptyPride();
  }
}

export function savePride(state) {
  try {
    window.localStorage.setItem(KEY, JSON.stringify(state));
  } catch {
    // Private windows can block storage. It still works; it just won't resume.
  }
}

export function clearPride() {
  try {
    window.localStorage.removeItem(KEY);
  } catch {
    // Nothing to clear.
  }
}

export function encodePride(state) {
  return toBase64Url(
    JSON.stringify({
      a: STATEMENT_ORDER.map((id) => Math.round(state.statements[id] * 10)),
      s: SITUATIONS.map((s) => state.situations[s.id]),
      t: state.finishedAt,
    })
  );
}

/** Returns results in the same shape as saved state, or null if the link is bad. */
export function decodePride(fragment) {
  try {
    const p = JSON.parse(fromBase64Url(fragment));
    if (!Array.isArray(p.a) || p.a.length !== STATEMENT_ORDER.length) return null;
    if (!Array.isArray(p.s) || p.s.length !== SITUATIONS.length) return null;
    const result = { ...emptyPride(), finishedAt: typeof p.t === 'string' ? p.t.slice(0, 40) : null };
    for (const [i, id] of STATEMENT_ORDER.entries()) {
      if (!isTenths(p.a[i])) return null;
      result.statements[id] = p.a[i] / 10;
    }
    for (const [i, situation] of SITUATIONS.entries()) {
      if (!Number.isInteger(p.s[i]) || !situation.answers[p.s[i]]) return null;
      result.situations[situation.id] = p.s[i];
    }
    return result;
  } catch {
    return null;
  }
}
