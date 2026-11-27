// ─────────────────────────────────────────────────────────────────────────────
// WONDER — Christmas 2026 takeover (Nov 29 – Dec 27, plus Christmas Eve)
//
// THE SWITCH. Set WONDER_ENABLED to false to turn every Wonder change off and
// get today's site back exactly. Even with the flag on, Wonder switches itself
// off once the date in Albion (America/Detroit) is after WONDER_LAST_DAY.
//
// All Wonder code lives in src/wonder/. To remove it for good after Christmas:
// delete src/wonder/ and public/images/wonder/, then undo the small
// `{wonder && …}` lines marked "WONDER" in the files listed in src/wonder/README.md.
// ─────────────────────────────────────────────────────────────────────────────

export const WONDER_ENABLED = true;

// Last day Wonder shows (inclusive). On 2026-12-29 it is gone.
export const WONDER_LAST_DAY = '2026-12-28';

// Shown everywhere Christmas Eve is mentioned. Change it here once confirmed.
export const CHRISTMAS_EVE_TIME = '5–6 PM';

// The series strip under the hero. Sundays only say the week number.
// `sunday: true` entries are the ones that can get the "THIS SUNDAY" tag.
export const SERIES = [
  { date: '2026-11-29', label: 'Week 1', sunday: true },
  { date: '2026-12-06', label: 'Week 2', note: 'Family Sunday · Communion · Potluck Christmas Brunch · ~11:30 AM', sunday: true },
  { date: '2026-12-13', label: 'Week 3', sunday: true },
  { date: '2026-12-16', label: 'Core Team Christmas Party', note: '6:00 PM' },
  { date: '2026-12-20', label: 'Week 4', sunday: true },
  { date: '2026-12-24', label: 'Christmas Eve', note: CHRISTMAS_EVE_TIME, id: 'christmas-eve' },
  { date: '2026-12-27', label: 'Week 5', sunday: true },
];

// Today's date in Albion as 'YYYY-MM-DD' (en-CA formats dates that way).
export function detroitDate(now = new Date()) {
  return new Intl.DateTimeFormat('en-CA', {
    timeZone: 'America/Detroit',
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  }).format(now);
}

export function isWonderOn(now = new Date()) {
  return WONDER_ENABLED && detroitDate(now) <= WONDER_LAST_DAY;
}
