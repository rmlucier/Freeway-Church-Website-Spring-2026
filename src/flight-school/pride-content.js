// Pride Check content. Source: "Teachable Bonus Assessment (Draft 1)", with Pastor
// Roy's changes: no mentor, "go back and forth" instead of "swing both ways", Peter
// as that result's Bible picture, and lowercase pronouns for God.

export const DIMENSIONS = [
  { id: 'self', name: 'How I see myself' },
  { id: 'corrected', name: "When I'm corrected" },
  { id: 'others', name: 'With other people' },
  { id: 'out', name: 'Stepping out' },
];

export const INTRO = [
  'Everyone deals with pride. Some of us puff up: "I know better." Some of us hold back: "I\'m not good enough." Both keep us from being taught and changed.',
  "This shows which way you lean right now. It's a snapshot, not a grade. Answers change a lot, especially in your teens, so take it again in a few months.",
  "If you're carrying shame, hear this first: this isn't about beating you up. Jesus lifts up people who feel crushed.",
];

// `side` is up, back or teachable. Pride-up and holding-back items feed their
// dimension; teachable items feed the teachable bar.
export const STATEMENTS = {
  PU1a: { dim: 'self', side: 'up', text: 'When someone else gets praised, I think about why I deserved it more.' },
  PU1b: { dim: 'self', side: 'up', text: 'When someone teaches something, I think, "I already know this."' },
  PD1a: { dim: 'self', side: 'back', text: "When I see what other people can do, I decide I'm not good enough to try." },
  PD1b: { dim: 'self', side: 'back', text: 'When a chance to help comes up, I think, "Someone else could do this better."' },
  PU2a: { dim: 'corrected', side: 'up', text: 'When someone corrects me, I explain why I did it that way.' },
  PU2b: { dim: 'corrected', side: 'up', text: "When someone corrects me, I point out what they're doing wrong too." },
  PD2a: { dim: 'corrected', side: 'back', text: 'When someone corrects me, I say "okay" but don\'t change anything.' },
  PD2b: { dim: 'corrected', side: 'back', text: 'When I get corrected, I stop trying instead of trying again.' },
  PU3a: { dim: 'others', side: 'up', text: "When there's a disagreement, I keep pushing until I win." },
  PU3b: { dim: 'others', side: 'up', text: 'I tune out advice from people younger or less experienced than me.' },
  PD3a: { dim: 'others', side: 'back', text: 'When I disagree with someone, I keep it to myself.' },
  PD3b: { dim: 'others', side: 'back', text: "When I see a problem, I don't say anything about it." },
  PU4a: { dim: 'out', side: 'up', text: "I'm more likely to help when other people will notice." },
  PU4b: { dim: 'out', side: 'up', text: "When I've done the right thing, I expect God to make things go my way." },
  PD4a: { dim: 'out', side: 'back', text: 'I say no to new things because I might fail.' },
  PD4b: { dim: 'out', side: 'back', text: 'Before I try something God might be asking, I wait for a clear sign.' },
  T1: { side: 'teachable', text: 'I ask people how I can do better.' },
  T2: { side: 'teachable', text: 'I can say "I was wrong" without adding "but."' },
  T3: { side: 'teachable', text: 'When I learn something from a mistake, I change what I do next time.' },
  T4: { side: 'teachable', text: 'I cheer for people when they do better than me.' },
};

// Mixed so no two neighbors share a dimension. Private links depend on this
// order, so never change it once people have links.
export const STATEMENT_ORDER = [
  'PD4a', 'PU2a', 'T3', 'PD1a', 'PU3b', 'PD2b', 'PU4a', 'T1', 'PD3a', 'PU1b',
  'PD4b', 'PU2b', 'T4', 'PD3b', 'PU4b', 'PD1b', 'PU3a', 'PD2a', 'T2', 'PU1a',
];

// Each answer is [text, pride-up value, holding-back value]. Links store the
// answer's place in this list, so don't reorder answers once people have links.
export const SITUATIONS = [
  {
    id: 'S1',
    dim: 'self',
    text: 'A friend posts about winning something you wanted. What do you most likely do?',
    answers: [
      ['Tell people the judges played favorites.', 9, 1],
      ["Like the post, but think I'd have done better.", 6, 1],
      ['Like the post, then quietly delete my own.', 1, 6],
      ["Decide I'm just not good at anything.", 1, 9],
      ['Text them "congrats," and actually mean it.', 1, 1],
    ],
  },
  {
    id: 'S2',
    dim: 'self',
    text: "A leader asks you to share a short thought from the Bible with your group. What's your first thought?",
    answers: [
      ['"Finally, someone noticed I know this stuff."', 9, 1],
      ['"Sure, but I\'ll do it my way, not theirs."', 6, 1],
      ['"Somebody else would be way better at this."', 1, 6],
      ['"No way. I\'ll find an excuse to get out of it."', 1, 9],
      ['"I\'m nervous, but I\'ll ask for help and try."', 1, 1],
    ],
  },
  {
    id: 'S3',
    dim: 'corrected',
    text: "Your coach or boss pulls you aside and says you've been slacking. What do you do?",
    answers: [
      ["Tell them they're wrong and list what I've done.", 9, 1],
      ["Explain that it's been a really hard week.", 6, 1],
      ['Stay quiet and avoid them for a few days.', 1, 6],
      ['Say "Got it," then keep doing the same thing.', 1, 9],
      ['Ask what they want to see, then work on it.', 1, 1],
    ],
  },
  {
    id: 'S4',
    dim: 'corrected',
    text: 'You get back a paper or project covered in notes about what to fix. What do you do?',
    answers: [
      ["Decide the teacher just doesn't like me.", 9, 1],
      ['Read the notes, but keep doing it my way.', 6, 1],
      ['Shove it in my bag and never look at it.', 1, 6],
      ["Feel like I'm bad at this, and stop trying.", 1, 9],
      ['Read the notes and fix one thing next time.', 1, 1],
    ],
  },
  {
    id: 'S5',
    dim: 'others',
    text: 'Your group project is heading a direction you think is wrong. What do you do?',
    answers: [
      ['Take over and just do it right myself.', 9, 1],
      ['Go along, but make sure everyone knows I disagreed.', 6, 1],
      ['Say nothing. They probably know better than me.', 1, 6],
      ['Say nothing, then complain to friends later.', 1, 9],
      ["Share my idea once, then help with the group's plan.", 1, 1],
    ],
  },
  {
    id: 'S6',
    dim: 'others',
    text: 'Someone younger than you gives you advice that turns out to be exactly right. What happens?',
    answers: [
      ['I think, "Who are they to tell me?"', 9, 1],
      ["I nod, but I don't take it seriously.", 6, 1],
      ["I say thanks and smile, but don't use it.", 1, 6],
      ["I feel embarrassed that I'm so far behind.", 1, 9],
      ['I take the advice and try it out.', 1, 1],
    ],
  },
  {
    id: 'S7',
    dim: 'out',
    text: 'You sense God nudging you to sit with someone who always eats lunch alone. What do you most likely do?',
    answers: [
      ['Do it if my friends will see and think it\'s cool.', 9, 1],
      ['Do it once, then tell people about it.', 6, 1],
      ['Wait and see if I feel it again tomorrow.', 1, 6],
      ['Tell myself someone nicer should do it.', 1, 9],
      ['Go sit with them, even though it feels awkward.', 1, 1],
    ],
  },
  {
    id: 'S8',
    dim: 'out',
    text: "A team, club or role opens up. You'd be good at it, but you could fail in front of people. What do you do?",
    answers: [
      ["Sign up only if I'm sure I'll be one of the best.", 9, 1],
      ['Sign up, and make sure people know my experience.', 6, 1],
      ['Wait for a clear sign that it will work out.', 1, 6],
      ["Skip it. Failing in front of people isn't worth it.", 1, 9],
      ['Sign up, even though I might fail.', 1, 1],
    ],
  },
];

export const SITUATION_HINT = 'Pick the answer closest to what you would really do, not what you should do.';

// Not scored as pride. These answers never leave the device, even in a shared link.
export const SHAME = {
  SH1: 'When I say "I\'m not good enough," part of me wishes someone would prove me wrong.',
  SH2: "I carry past mistakes that I can't seem to put down.",
  SH3: "When I'm corrected, I feel like a failure as a person, not just like I made a mistake.",
};

export const SNAPSHOT_LINE =
  "This is a picture of right now, not who you'll always be. Take it again in a few months.";

export const GRACE = {
  text: "Some of your answers sound less like pride and more like a weight you're carrying. If that's you, hear this: this isn't a correction. Jesus doesn't push down people who already feel crushed. He lifts them up. Before you work on anything else, talk with someone you trust about what you're carrying.",
  noOne: "If you don't have someone to talk to, email us. We'd be glad to listen.",
  gently: 'Read this gently. It may fit part of you, not all of you.',
};

export const LEANS = {
  up: {
    title: 'You lean toward pride up',
    text: "When correction comes, your first move tends to be to explain, push back, or prove you're right. You may be right sometimes, but you'll miss what God wants to teach you, often through people you'd overlook.",
    picture: 'Naaman wanted healing his way. He thought the rivers back home were better. His healing started when he listened to a servant girl and went down into a muddy river.',
    prayer: "God, I'd rather be healed than be right.",
  },
  back: {
    title: 'You lean toward holding back',
    text: "You may stay quiet, say \"okay\" without changing, or skip things because someone else could do them better. That can feel safe, and it may come from being nervous more than anything else. But God made you to be brave. Your voice and your yes matter more than you think.",
    picture: "Moses said, \"Please send someone else.\" God sent him anyway, and gave him his brother Aaron to go with him. God doesn't wait for you to feel ready. He goes with you.",
    prayer: "God, I'm not enough, and you are. Help me be brave.",
  },
  both: {
    title: 'You go back and forth',
    text: "You move between \"I know better\" and \"I'm not good enough.\" Often you're proud where you feel strong and hold back where you feel weak. Your profile shows where each one shows up.",
    picture: "Peter did both. He told Jesus that even if everyone else fell away, he never would. Hours later, afraid, he said he didn't know him. Jesus restored him anyway and gave him work to do.",
    prayer: "God, I don't need to be above anyone or below anyone. I just need to follow you.",
  },
  neither: {
    title: "Pride isn't running the show right now",
    text: "You let correction in and act on it. Like the servants in Naaman's story, you're humble enough to receive the truth and brave enough to speak it. Check your teachable bar and your highest row anyway.",
    // Used when the teachable bar is low, since the line above wouldn't be true.
    textLowTeachable: "Neither kind of pride is running high right now, but your teachable bar is low. Low pride doesn't always mean you're growing. Start with the step below.",
    picture: "Naaman's servants told their powerful master the truth, kindly. Humility made them brave, not silent.",
    prayer: 'God, keep me easy to teach.',
  },
};

export const LIBRARY = {
  up: {
    self: {
      insight: '"I already know this" and "I deserved it more" shut the door before God can teach you.',
      action: 'When someone else gets praised this week, tell them one thing they did well.',
    },
    corrected: {
      insight: 'You defend first. Try listening first.',
      action: 'The next three times you\'re corrected, say only, "Thanks, I\'ll think about that." No explaining.',
    },
    others: {
      insight: "You push to win and may tune out people God sends to teach you. Naaman's healing started with a servant girl.",
      action: 'In your next disagreement, ask one honest question before you make your point.',
    },
    out: {
      insight: 'You step out when it makes you look good, or when you expect something back.',
      action: 'Do one helpful thing this week that no one will see.',
    },
  },
  back: {
    self: {
      insight: "Comparing yourself with others tells you you're not enough. God doesn't grade on a curve.",
      action: 'Write down one way God has already used you. Read it before you say no to anything this month.',
    },
    corrected: {
      insight: 'Saying "okay" isn\'t the same as changing, and quitting isn\'t either.',
      action: "The next time you're corrected, pick one small thing to change and tell someone you're trying it.",
    },
    others: {
      insight: 'Your silence leaves a gap only you can fill. Real humility speaks up.',
      action: 'The next time you see a problem or disagree, say it once, kindly, within a day.',
    },
    out: {
      insight: 'Waiting to feel ready or for a clear sign can keep you on the sidelines. God goes with you.',
      action: 'Say yes to one thing this month that makes you nervous.',
    },
  },
};

export const TEACHABLE_STEP = {
  insight: "Teachable people don't just avoid pride; they go looking for growth.",
  action: 'Ask one person this week, "How can I do better?" Then try one thing they say.',
};
export const TEACHABLE_STRENGTH = 'You ask for feedback, own your mistakes and cheer for others. That\'s what teachable looks like.';
export const NO_ROW_STEP = 'Keep at least one person in your life who tells you hard truths. Ask them once a month, "What do you see in me that I don\'t?"';

export const STRENGTHS = {
  self: 'You see yourself about right: not above others, not below them.',
  corrected: "You listen to correction and act on it. That's rare.",
  others: 'You speak up, and you learn from anyone God sends.',
  out: "You step out even when you're nervous or no one is watching.",
};

export const TWO_KINDS = [
  ['Deep down I believe', '"I\'m too good for this."', '"I\'m not good enough for this."'],
  ['Sounds like', '"I know better." "That\'s beneath me."', '"Someone else could do it better." "God will do it if he wants to."'],
  ['When I compare', '"I\'m better than them."', '"I\'m worse than them."'],
  ['Feels owed', 'Blessing: "God owes me."', 'Safety: "God owes me a sign first."'],
  ['When corrected', 'Argues and defends', 'Says "okay," changes nothing'],
  ['In a disagreement', 'Pushes to win', 'Goes quiet, then complains later'],
  ['With risk', 'Steps out only if it makes me look good', "Stays put so I can't fail"],
  ['In the Bible', 'Naaman: "Aren\'t the rivers back home better?"', 'The servant who buried the money: "I was afraid." Moses: "Send someone else."'],
];
export const TWO_KINDS_BOTTOM_LINE =
  'Pride up refuses to be taught. Holding back refuses to be sent. Teachable people are humble enough to listen and brave enough to go.';
