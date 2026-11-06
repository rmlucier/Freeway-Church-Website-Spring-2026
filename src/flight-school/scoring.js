import { CORE_ITEMS, TRAITS } from './content.js';

const round1 = (n) => Math.round(n * 10) / 10;
const average = (values) => values.reduce((sum, v) => sum + v, 0) / values.length;
const scored = (item, value) => (item.reverse ? 10 - value : value);

// Provisional bands from Draft 1. Adjust after the pilot.
export const bandFor = (score) => (score < 5 ? 'Low' : score < 7.5 ? 'Middle' : 'High');

/** @param {Record<string, number>} answers raw 0-10 slider values by item id */
export function scoreAssessment(answers) {
  const traits = {};
  for (const trait of TRAITS) {
    const items = Object.entries(CORE_ITEMS).filter(([, item]) => item.trait === trait.id);
    const score = round1(average(items.map(([id, item]) => scored(item, answers[id]))));
    traits[trait.id] = { score, band: bandFor(score) };
  }
  return { traits };
}
