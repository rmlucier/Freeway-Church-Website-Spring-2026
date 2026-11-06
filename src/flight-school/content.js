// Flight School assessment content. Source: "Flight School Assessment:
// Questions (Draft 1)" and the Flight School style guide. Wording here is the
// doc's wording; change it there first, then here.

export const SLIDER_LABELS = [
  { below: 2, label: 'Not true of me' },
  { below: 4, label: 'Rarely true' },
  { below: 6, label: 'Sometimes true' },
  { below: 8, label: 'Often true' },
  { below: Infinity, label: 'Almost always true' },
];

export const sliderLabel = (value) =>
  SLIDER_LABELS.find((band) => value < band.below).label;

export const OPENING_LINE =
  'There are no right or wrong answers. Answer how things really are, not how you wish they were. Your mentor will use this to know where to start.';

export const YEARS_CHOICES = [
  "I'm not sure yet / I'm still exploring",
  'Less than 1 year',
  '1 to 5 years',
  'More than 5 years',
];

export const YEARS_QUESTION = 'How long have you been following Jesus?';
export const RISK_QUESTION = "In general, I'm comfortable taking risks.";

export const TRAITS = [
  {
    id: 'faithful',
    name: 'Faithful',
    definition: "Trusting God enough to risk what He's given you.",
    test: "You know you're faithful when you've put something on the line for Him.",
    results: {
      Low: {
        text: "You may love God and still be keeping what He gave you safe. You may be afraid of God, not fully understanding his role in your life. God is good, and nothing you put in His hands is wasted.",
        next: "Name one thing you've been keeping safe, and take one small risk with it this month.",
      },
      Middle: {
        text: "You've taken real steps of faith, but comfort still wins in some areas. Look for the one place you've been playing it safe. Faith that's real doesn't wait until it's sure something will work.",
        next: "Tell your mentor about one step you've been putting off, and set a date.",
      },
      High: {
        text: "You've put things on the line for God. The question now is what He's asking you to risk next. Keep checking why you risk: trust in God, not just love of a challenge.",
        next: 'Help someone else take their first step of faith.',
      },
    },
  },
  {
    id: 'available',
    name: 'Available',
    definition: 'Being ready for God to lead you.',
    test: "You know you're available when you're out of backup plans.",
    results: {
      Low: {
        text: "Your life may be too full for God to lead you. Start by clearing a little quiet. What is something you're putting your trust in more than God?",
        next: 'Take ten minutes a day this week with no phone, and ask God to lead your day.',
      },
      Middle: {
        text: 'You want God to lead, but busyness or a "just in case" still competes. Busyness needs quiet. A backup plan needs trust.',
        next: 'Name your "just in case" to your mentor.',
      },
      High: {
        text: "You're listening and ready to move. Next, make sure you know where God has placed you and what He wants you to do there. Being available isn't being reckless; you can say yes to God and still leave well.",
        next: 'Write down where God has placed you and one thing He wants you to do there this week.',
      },
    },
  },
  {
    id: 'teachable',
    name: 'Teachable',
    definition: 'Trusting God enough to let Him correct and change you.',
    test: "You know you're teachable when you'd rather be healed than be right.",
    results: {
      Low: {
        text: "Correction may be bouncing off you. Some people argue it down. Others agree and then change nothing. The optional bonus shows which way you lean. If shame is under it, that's not pride: God lifts up people who feel crushed.",
        next: 'Ask one person you trust, "What\'s one thing you see in me that I don\'t?" Then just listen.',
      },
      Middle: {
        text: "You're open to learning, but change stalls somewhere. Find the step that breaks down: hearing it, trusting it, or doing it.",
        next: 'Pick one piece of advice you agreed with but never did, and do it this week.',
      },
      High: {
        text: "You let correction change you. Watch the places where you think you already know, because that's where teachable people get stuck.",
        next: "Learn something from someone you wouldn't expect: someone younger, newer, or very different from you.",
      },
    },
  },
  {
    id: 'missional',
    name: 'Missional',
    definition: 'Living every day on purpose to help others follow Jesus.',
    test: "You know you're missional when you can name who you're sent to.",
    results: {
      Low: {
        text: "Your faith may be real but mostly kept to yourself. Someone was sent to you; now you're being sent. Start with one name, and pray for that person by name this week. (If you're new to following Jesus, this is your next step, not a failure.)",
        next: 'Write one name and pray for them every day this week.',
      },
      Middle: {
        text: 'You care about others knowing Jesus, but the names are fuzzy or the conversations are rare. Name your person, and find who is helping you grow.',
        next: 'Have one conversation this month about what God is doing in your life.',
      },
      High: {
        text: "You know who you're sent to and you're acting on it. Make sure someone is still pouring into you, so you're not running on empty.",
        next: 'Pick one person and walk with them over time, not just one talk.',
      },
    },
  },
];

export const traitById = Object.fromEntries(TRAITS.map((t) => [t.id, t]));

// `reverse` items count as 10 minus the slider value.
export const CORE_ITEMS = {
  F1: { trait: 'faithful', text: 'In the past year, I took a real risk because I believed God was asking me to.' },
  F2: { trait: 'faithful', reverse: true, text: "I usually wait until I'm sure something will work before I try it." },
  F3: { trait: 'faithful', text: 'I can name something God has given me (time, money, a skill, a relationship) that I am using for Him right now.' },
  F4: { trait: 'faithful', reverse: true, text: 'In the past year, fear of failing kept me from doing something I felt God wanted me to do.' },
  F5: { trait: 'faithful', text: 'I believe God would rather I try and fail than never try at all.' },
  F6: { trait: 'faithful', text: 'When I sense God asking me to do something, I usually act on it right away.' },
  F7: { trait: 'faithful', reverse: true, text: "If I'm honest, I haven't done much with what God has given me." },
  F8: { trait: 'faithful', text: "When a step of faith doesn't go well, I try again instead of quitting." },

  A1: { trait: 'available', reverse: true, text: "There is an area of my life where I say yes to God but keep a backup plan in case He doesn't come through." },
  A2: { trait: 'available', text: 'Most days, I take some quiet time with no phone or noise to pray and listen to God.' },
  A3: { trait: 'available', reverse: true, text: 'My schedule is so full that I would have a hard time saying yes if God asked me to do something new.' },
  A4: { trait: 'available', text: 'In the past month, I sensed the Holy Spirit leading me to do something specific, and I did it.' },
  A5: { trait: 'available', text: 'Most mornings, I give my day to God and ask Him to lead it.' },
  A6: { trait: 'available', text: 'I can describe where God has placed me right now (school, work, home, or my street) and what He wants me to do there.' },
  A7: { trait: 'available', reverse: true, text: 'When I have a few free minutes, I usually reach for my phone instead of turning my attention to God.' },
  A8: { trait: 'available', text: 'In the past month, I changed my plans to help someone or to follow what God was asking.' },

  T1: { trait: 'teachable', text: 'In the past few months, someone corrected me and I changed something because of it.' },
  T2: { trait: 'teachable', reverse: true, text: "When someone points out a problem in my life, my first move is to explain why they're wrong." },
  T3: { trait: 'teachable', reverse: true, text: "I often agree with advice or correction, but then don't change anything." },
  T4: { trait: 'teachable', text: 'I have learned something important about God from someone younger than me, newer to faith, or very different from me.' },
  T5: { trait: 'teachable', text: 'When I read or hear a Bible passage I already know, I still expect God to show me something new.' },
  T6: { trait: 'teachable', text: 'If I sense God asking me to do something simple, I do it even before it makes sense to me.' },
  T7: { trait: 'teachable', reverse: true, text: "I tell myself I'm not good enough for God to use me, so I don't try what He asks." },
  T8: { trait: 'teachable', text: 'I have at least one person in my life who can tell me hard truths, and they have done it in the past few months.' },

  M1: { trait: 'missional', text: "I can name at least one person God has put in my life who I'm trying to help know or follow Jesus." },
  M2: { trait: 'missional', reverse: true, text: 'Helping people follow Jesus is mostly the job of pastors and church leaders.' },
  M3: { trait: 'missional', text: 'In the past month, I talked with someone about Jesus or what God is doing in my life.' },
  M4: { trait: 'missional', text: 'I believe God has sent me to the people around me, not just saved me for my own sake.' },
  M5: { trait: 'missional', text: 'Right now, someone is helping me grow in following Jesus (meeting, praying, or checking in with me).' },
  M6: { trait: 'missional', text: 'I see helping someone follow Jesus as a long walk together, not a one-time talk.' },
  M7: { trait: 'missional', reverse: true, text: 'My faith is mostly a private thing that I keep to myself.' },
  M8: { trait: 'missional', text: "Most weeks, I pray by name for people in my life who don't follow Jesus yet." },
};

// The subject keeps changing so people can't spot the "right" answer, and no two
// neighbors share a trait. Each stretch keeps one kind of statement, so the
// thinking stays steady: what you did, then habits, then where you are now, then
// what you believe. Beliefs come last so actions are answered before ideals.
export const CORE_ORDER = [
  // What you did
  'M3', 'F1', 'T1', 'A4', 'F4', 'T8', 'A8', 'T4',
  // Your habits
  'A2', 'F6', 'T2', 'M8', 'A5', 'F2', 'T3', 'A7', 'F8', 'T6',
  // Where you are right now
  'F3', 'M1', 'A6', 'M5', 'A1', 'T7', 'A3', 'M7', 'F7',
  // What you believe
  'M4', 'T5', 'M6', 'F5', 'M2',
];

// The order answers are packed into private links. Links already sent depend on
// this, so never change it, even when CORE_ORDER changes.
export const LINK_CORE_ORDER = [
  'F3', 'M3', 'A5', 'T1', 'F2', 'A3', 'M4', 'T5',
  'A1', 'T2', 'F5', 'M1', 'T6', 'M2', 'A4', 'F1',
  'M5', 'F4', 'T8', 'A2', 'T3', 'A6', 'F6', 'M6',
  'A7', 'M7', 'T4', 'F8', 'M8', 'F7', 'A8', 'T7',
];

export const BONUS_ITEMS = {
  PU1: { side: 'up', text: "When someone gives me advice, I'm already thinking about why it doesn't fit me." },
  PU2: { side: 'up', text: 'In the past month, I argued with someone who was trying to help me.' },
  PU3: { side: 'up', text: 'I find it hard to learn from people who know less than I do.' },
  PU4: { side: 'up', text: 'When I hear a sermon, I mostly think about who else needs to hear it.' },
  PU5: { side: 'up', text: "Because I've served God faithfully, I feel He owes me good things." },
  PU6: { side: 'up', reverse: true, text: 'When I\'m wrong, I can say "I was wrong" without explaining myself.' },
  PD1: { side: 'down', text: 'When someone corrects me, I agree quickly so the talk will end.' },
  PD2: { side: 'down', text: 'I say yes to advice, but I rarely follow through on it.' },
  PD3: { side: 'down', text: 'God uses other people, but probably not me.' },
  PD4: { side: 'down', text: 'Before I step out, I need God to give me a clear sign.' },
  PD5: { side: 'down', text: 'I would rather stay in control than try something new God might be asking.' },
  PD6: { side: 'down', reverse: true, text: 'When I feel unqualified, I still say yes to what God asks.' },
};

export const BONUS_ORDER = [
  'PU1', 'PD3', 'PU2', 'PD1', 'PU6', 'PD4',
  'PU3', 'PD6', 'PU5', 'PD2', 'PU4', 'PD5',
];

export const QUADRANTS = {
  open: {
    name: 'Open',
    text: 'You let people speak into your life and you act on it. Keep inviting it, especially from people you wouldn\'t expect.',
    next: 'Thank someone who corrected you and tell them what changed.',
  },
  hider: {
    name: 'Hider',
    text: "You agree easily, but change slips away, and you may not think God would use you. That's still pride: it protects your control. God doesn't call the qualified; He trains the willing.",
    next: 'Say yes to one thing you feel unqualified for.',
  },
  defender: {
    name: 'Defender',
    text: "When correction comes, your first move is to push back or explain. You may be right sometimes, but you're missing what God wants to teach you.",
    next: 'The next time someone corrects you, say "Thanks, I\'ll think about that" and nothing else.',
  },
  tug: {
    name: 'Tug-of-war',
    text: 'You swing between "I know better" and "I\'m not good enough." Both keep you from being taught and sent.',
    next: 'Talk with your mentor about which one shows up more, and when.',
  },
};

// Shown right after M1 and M5. Blank is allowed.
export const NAME_PROMPTS = {
  M1: { key: 'sentTo', prompt: "Who has God put in your life that you're helping know or follow Jesus? Write 1 to 3 first names." },
  M5: { key: 'helpers', prompt: 'Who is ahead of you, helping you grow in following Jesus? Write 1 to 3 first names.' },
};

export const OPEN_QUESTIONS = [
  { id: 'f1', trait: 'faithful', text: "What has God given you (time, money, skills, people) that you've been keeping safe?" },
  { id: 'f2', trait: 'faithful', text: "Tell about a time you took a risk because of your faith. What happened? If you can't think of one, what has held you back?" },
  { id: 'a1', trait: 'available', text: 'What is the "just in case" you\'re holding onto instead of trusting God?' },
  { id: 'a2', trait: 'available', text: 'Where has God already placed you (school, work, home, your street) that you\'ve been treating as "just" a place you spend time?' },
  { id: 't1', trait: 'teachable', text: "Where is God correcting you right now? Are you arguing with it, or agreeing without changing?" },
  { id: 't2', trait: 'teachable', text: "Who is someone you've had a hard time learning from? Why?" },
  { id: 'm1', trait: 'missional', text: 'Who first helped you follow Jesus? What did they do that mattered?' },
  { id: 'm2', trait: 'missional', text: 'What keeps you from talking about Jesus with the people you named?' },
  { id: 'b1', trait: 'teachable', text: 'Think of the last time someone corrected you. What did you do next?' },
];
