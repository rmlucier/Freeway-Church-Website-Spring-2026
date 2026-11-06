import { LINK_CORE_ORDER, OPEN_QUESTIONS, RETIRED_LINK_SLOTS, YEARS_CHOICES } from './content.js';

// Answers stay in the person's own browser and are never stored on a server.
// Sharing works through a link whose data lives in the URL fragment (#...),
// which browsers don't send when a page loads. The only things saved centrally
// are a name and the finish time.

const KEY = 'flight-school.v1';
const LINK_SLOTS = LINK_CORE_ORDER.length + RETIRED_LINK_SLOTS;
const MAX_NAMES = 200;
const MAX_WRITTEN = 2000;

export const emptyState = () => ({
  step: 0,
  answers: {},
  context: {},
  names: {},
  written: {},
  profile: {},
  history: [],
  recorded: false,
  emailed: false,
  finishedAt: null,
});

export function loadState() {
  try {
    const raw = window.localStorage.getItem(KEY);
    return raw ? { ...emptyState(), ...JSON.parse(raw) } : emptyState();
  } catch {
    return emptyState();
  }
}

export function saveState(state) {
  try {
    window.localStorage.setItem(KEY, JSON.stringify(state));
  } catch {
    // Private windows can block storage. The assessment still works; it just
    // won't resume after a reload.
  }
}

export function clearState() {
  try {
    window.localStorage.removeItem(KEY);
  } catch {
    // Nothing to clear.
  }
}

export const toBase64Url = (text) =>
  btoa(String.fromCharCode(...new TextEncoder().encode(text)))
    .replace(/\+/g, '-')
    .replace(/\//g, '_')
    .replace(/=+$/, '');

export const fromBase64Url = (text) =>
  new TextDecoder().decode(
    Uint8Array.from(atob(text.replace(/-/g, '+').replace(/_/g, '/')), (c) => c.charCodeAt(0))
  );

export function encodeLog(state, { includeWritten = false } = {}) {
  const payload = {
    a: [
      ...LINK_CORE_ORDER.map((id) => Math.round(state.answers[id] * 10)),
      ...Array(RETIRED_LINK_SLOTS).fill(-1),
    ],
    y: state.context.years ?? -1,
    n: [state.names.sentTo || '', state.names.helpers || ''],
    t: state.finishedAt,
  };
  if (includeWritten) {
    payload.w = OPEN_QUESTIONS.map((q) => state.written[q.id] || '');
  }
  return toBase64Url(JSON.stringify(payload));
}

export const isTenths = (n) => Number.isInteger(n) && n >= 0 && n <= 100;
const clip = (value, max) => (typeof value === 'string' ? value.slice(0, max) : '');

/** Returns a log in the same shape as saved state, or null if the link is bad. */
export function decodeLog(fragment) {
  try {
    const p = JSON.parse(fromBase64Url(fragment));
    if (!Array.isArray(p.a) || p.a.length !== LINK_SLOTS) return null;
    const log = emptyState();
    for (const [i, id] of LINK_CORE_ORDER.entries()) {
      if (!isTenths(p.a[i])) return null;
      log.answers[id] = p.a[i] / 10;
    }
    if (Number.isInteger(p.y) && p.y >= 0 && p.y < YEARS_CHOICES.length) log.context.years = p.y;
    if (Array.isArray(p.n)) {
      log.names.sentTo = clip(p.n[0], MAX_NAMES);
      log.names.helpers = clip(p.n[1], MAX_NAMES);
    }
    if (Array.isArray(p.w)) {
      OPEN_QUESTIONS.forEach((q, i) => {
        log.written[q.id] = clip(p.w[i], MAX_WRITTEN);
      });
    }
    log.finishedAt = clip(p.t, 40) || null;
    return log;
  } catch {
    return null;
  }
}

export const LIMITS = { names: MAX_NAMES, written: MAX_WRITTEN, name: 120, email: 254 };
