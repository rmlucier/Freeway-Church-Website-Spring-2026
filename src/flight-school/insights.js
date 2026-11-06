import { CORE_ITEMS, TRAITS, sliderLabel, traitById } from './content.js';

// Insights drawn from answers people already gave. All of this runs on their
// device, like the scoring. Wording is pastoral, so have Pastor Roy approve changes.

// A statement of belief or intention, paired with the action that would show it.
const SAY_DO_PAIRS = [
  { say: 'F5', do: 'F1' },
  { say: 'A5', do: 'A4' },
  { say: 'T5', do: 'T1' },
  { say: 'M4', do: 'M3' },
  { say: 'M6', do: 'M8' },
];
const SAY_DO_MIN_GAP = 3;

const PAIRINGS = {
  'faithful>available': "You're willing to take risks for God, but life may be too full to hear what he's saying. Bold steps go further when they start with quiet.",
  'faithful>teachable': "You'll step out for God, but correction may not land as easily. Courage grows stronger when someone can tell you the truth.",
  'faithful>missional': "You've trusted God with real risk. How can you use your faithfulness to help someone?",
  'available>faithful': 'You make room for God and listen for him. Act on it. Being ready turns into faith when something is on the line.',
  'available>teachable': "You listen for God's lead, but it may be harder to hear him through other people. God puts people into our lives for a reason!",
  'available>missional': "You're ready for God to lead. The next question is who he's leading you toward.",
  'teachable>faithful': 'You let God change you. Now put what you\'ve learned at risk. Learning grows when you act on it.',
  'teachable>available': "You're open to being taught, but a busy life leaves little room to hear. Finding quiet time with God is your next step.",
  'teachable>missional': "You're taking a lot in, but not yet passing it on. Someone near you can use what God has taught you.",
  'missional>faithful': 'You care about people following Jesus. Let that care cost you something. What could you risk for them?',
  'missional>available': "You're focused on people, and that's good. Make sure you're also stopping to hear God, so you're partnering with him.",
  'missional>teachable': "You're pouring into others. Make sure someone can still correct you, so you keep growing as you lead.",
};
const PAIRING_MIN_GAP = 1.5;

const STAGE_NOTES = [
  "You're still exploring, and you're welcome to explore at Freeway. These scores aren't a grade. Pick one next step that seems doable.",
  "You're early in this walk. A low score here is a next step, not a failure.",
  "You've been walking with Jesus for a while. This is a good time to find what's next, and someone to walk it with you.",
  "You've followed Jesus a long time. Ask what has changed lately, and who could learn from what you've lived.",
];

const CORE_TESTS = { faithful: 'F1', available: 'A1', teachable: 'T1', missional: 'M1' };

function coreTest(traitId, answers, names) {
  const id = CORE_TESTS[traitId];
  const value = CORE_ITEMS[id].reverse ? 10 - answers[id] : answers[id];
  if (traitId === 'missional' && value >= 7 && !names.sentTo?.trim()) return 'Getting there';
  if (value >= 7) return 'Yes';
  return value >= 4 ? 'Getting there' : 'Not yet';
}

function sayDoGap(answers) {
  const gaps = SAY_DO_PAIRS.map((pair) => ({ ...pair, gap: answers[pair.say] - answers[pair.do] }));
  const biggest = gaps.reduce((best, g) => (g.gap > best.gap ? g : best));
  if (biggest.gap < SAY_DO_MIN_GAP) return null;
  return {
    say: { text: CORE_ITEMS[biggest.say].text, label: sliderLabel(answers[biggest.say]) },
    do: { text: CORE_ITEMS[biggest.do].text, label: sliderLabel(answers[biggest.do]) },
  };
}

export function buildInsights(log, results) {
  const ranked = [...TRAITS].sort((a, b) => results.traits[b.id].score - results.traits[a.id].score);
  const high = ranked[0];
  const low = ranked[ranked.length - 1];
  const spread = results.traits[high.id].score - results.traits[low.id].score;

  return {
    stage: STAGE_NOTES[log.context.years] || null,
    pairing: spread >= PAIRING_MIN_GAP
      ? { high: traitById[high.id].name, low: traitById[low.id].name, text: PAIRINGS[`${high.id}>${low.id}`] }
      : null,
    gap: sayDoGap(log.answers),
    tests: Object.fromEntries(TRAITS.map((t) => [t.id, coreTest(t.id, log.answers, log.names)])),
  };
}

/** About three months after finishing, for the retake reminder. */
export function retakeDate(finishedAt) {
  const date = new Date(finishedAt);
  if (Number.isNaN(date.getTime())) return '';
  date.setMonth(date.getMonth() + 3);
  return date.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
}
