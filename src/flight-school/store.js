import { BONUS_ORDER, CORE_ORDER, OPEN_QUESTIONS, YEARS_CHOICES } from './content.js';

// Everything a person answers stays in their own browser. Nothing is sent to a
// server. Sharing works through a link whose data lives in the URL fragment
// (#...), which browsers never send to the web server.

const KEY = 'flight-school.v1';
const ITEM_IDS = [...CORE_ORDER, ...BONUS_ORDER];
const MAX_NAMES = 200;
const MAX_WRITTEN = 2000;

export const emptyState = () => ({
  step: 0,
  answers: {},
  context: {},
  names: {},
  written: {},
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

const toBase64Url = (text) =>
  btoa(String.fromCharCode(...new TextEncoder().encode(text)))
    .replace(/\+/g, '-')
    .replace(/\//g, '_')
    .replace(/=+$/, '');

const fromBase64Url = (text) =>
  new TextDecoder().decode(
    Uint8Array.from(atob(text.replace(/-/g, '+').replace(/_/g, '/')), (c) => c.charCodeAt(0))
  );

export function encodeLog(state, { includeWritten = false } = {}) {
  const payload = {
    a: ITEM_IDS.map((id) => Math.round(state.answers[id] * 10)),
    y: state.context.years ?? -1,
    r: Math.round((state.context.risk ?? 0) * 10),
    n: [state.names.sentTo || '', state.names.helpers || ''],
    t: state.finishedAt,
  };
  if (includeWritten) {
    payload.w = OPEN_QUESTIONS.map((q) => state.written[q.id] || '');
  }
  return toBase64Url(JSON.stringify(payload));
}

const isTenths = (n) => Number.isInteger(n) && n >= 0 && n <= 100;
const clip = (value, max) => (typeof value === 'string' ? value.slice(0, max) : '');

/** Returns a log in the same shape as saved state, or null if the link is bad. */
export function decodeLog(fragment) {
  try {
    const p = JSON.parse(fromBase64Url(fragment));
    if (!Array.isArray(p.a) || p.a.length !== ITEM_IDS.length || !p.a.every(isTenths)) return null;
    const log = emptyState();
    ITEM_IDS.forEach((id, i) => {
      log.answers[id] = p.a[i] / 10;
    });
    if (Number.isInteger(p.y) && p.y >= 0 && p.y < YEARS_CHOICES.length) log.context.years = p.y;
    if (isTenths(p.r)) log.context.risk = p.r / 10;
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

export const LIMITS = { names: MAX_NAMES, written: MAX_WRITTEN };
