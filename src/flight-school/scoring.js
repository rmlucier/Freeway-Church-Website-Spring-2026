import { BONUS_ITEMS, CORE_ITEMS, TRAITS } from './content.js';

const round1 = (n) => Math.round(n * 10) / 10;
const average = (values) => values.reduce((sum, v) => sum + v, 0) / values.length;
const scored = (item, value) => (item.reverse ? 10 - value : value);

// Provisional bands from Draft 1. Adjust after the pilot.
export const bandFor = (score) => (score < 5 ? 'Low' : score < 7.5 ? 'Middle' : 'High');

const HIGH_SIDE = 5; // A pride side is "high" at 5.0 or above.

function quadrantFor(up, down) {
  if (up >= HIGH_SIDE) return down >= HIGH_SIDE ? 'tug' : 'defender';
  return down >= HIGH_SIDE ? 'hider' : 'open';
}

/**
 * @param {Record<string, number>} answers raw 0-10 slider values by item id
 * @param {{sentTo?: string, helpers?: string}} names write-ins
 */
export function scoreAssessment(answers, names = {}) {
  const traits = {};
  const flags = [];

  for (const trait of TRAITS) {
    const items = Object.entries(CORE_ITEMS).filter(([, item]) => item.trait === trait.id);
    const score = round1(average(items.map(([id, item]) => scored(item, answers[id]))));
    traits[trait.id] = { score, band: bandFor(score) };

    const regular = items.filter(([, item]) => !item.reverse).map(([id]) => answers[id]);
    const reversed = items.filter(([, item]) => item.reverse).map(([id]) => answers[id]);
    if (average(regular) >= 8 && average(reversed) >= 8) {
      flags.push(`${trait.name}: agreed strongly with statements that say opposite things. This may be an idealized answer.`);
    }
  }

  const side = (name) =>
    round1(
      average(
        Object.entries(BONUS_ITEMS)
          .filter(([, item]) => item.side === name)
          .map(([id, item]) => scored(item, answers[id]))
      )
    );
  // The bonus is optional, so there may be nothing to score.
  const tookBonus = Object.keys(BONUS_ITEMS).every((id) => typeof answers[id] === 'number');
  const prideUp = tookBonus ? side('up') : null;
  const prideDown = tookBonus ? side('down') : null;

  if (answers.M1 >= 7 && !names.sentTo?.trim()) {
    flags.push('Rated high on naming someone they are helping follow Jesus, but wrote no name.');
  }
  if (answers.M5 >= 7 && !names.helpers?.trim()) {
    flags.push('Rated high on someone helping them grow, but wrote no name.');
  }

  return {
    traits,
    prideUp,
    prideDown,
    quadrant: tookBonus ? quadrantFor(prideUp, prideDown) : null,
    flags,
  };
}
