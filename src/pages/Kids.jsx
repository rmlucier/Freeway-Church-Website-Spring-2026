import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import SEO from '../components/SEO.jsx';
import MailLink from '../components/MailLink.jsx';

const rooms = [
  {
    age: '0–5',
    name: 'Nursery',
    body:
      'A warm, toy-filled room for infants through pre-K. Kids stay in nursery for the full service so you can actually be present for worship. The nursery team runs a simple rhythm — a short Bible lesson, a craft or activity, play time, and a memory verse to take home — all at a pace that works for little ones. Parents sign in at the door.',
    image: '/images/kids-nursery.jpg',
    imageAlt: 'Kids at play in the Freeway nursery room',
  },
  {
    age: 'K–5th',
    name: 'Kidsway',
    body:
      "Kids ages 5 through 11 start the service with their families in the main auditorium. During the greeting right before the message, they leave together for Kidsway — where it's worship, a Bible teaching at their level, a memory verse, and a game or craft. They're back with you by the end of service.",
    image: '/images/kids-kidsway.jpg',
    imageAlt: 'Kidsway kids in costume during a program at Freeway Church',
  },
  {
    age: '6th–12th',
    name: 'Freeway Youth',
    body:
      'Sunday nights at 6 PM. A space built for middle and high schoolers to ask real questions, learn what faith looks like in their own life, and actually enjoy the people they worship with.',
    image: '/images/services-youth.jpg',
    imageAlt: 'Freeway Youth gathering',
  },
];

const safetyPoints = [
  {
    title: 'Every volunteer is background-checked.',
    body:
      'Every adult who serves in the kids wing or nursery goes through a background check before they step into a classroom.',
  },
  {
    title: 'Two-leader policy.',
    body:
      'No child is alone with one adult. Every classroom runs with at least two background-checked leaders present at all times.',
  },
  {
    title: 'Secured kids wing.',
    body:
      "Once the service starts, the kids' wing is secured. Only approved, background-checked leaders are in the classrooms.",
  },
  {
    title: 'Matching-tag pickup.',
    body:
      "When you drop your kid off, you get a tag. The only person who can pick them up is the person who dropped them off — matched by tag.",
  },
];

const sundayFlow = [
  { time: '9:45', label: 'Check-in opens', body: 'Early drop-off for nursery and Kidsway. Skip the line by checking in online beforehand.' },
  { time: '10:00', label: 'Service starts', body: 'Nursery kids (0–5) head to their room. Kidsway kids (K–5) sit with you.' },
  { time: '10:25', label: 'Kidsway leaves for class', body: "During the greeting, K–5th kids leave the auditorium together for Kidsway — worship, teaching, game or craft." },
  { time: '11:25', label: 'Pickup', body: 'Same door, same person who dropped them off. Tag match required.' },
];

const faqs = [
  {
    q: 'Can I stay with my kid the first time?',
    a: "For safety reasons, only background-checked leaders are in the classrooms during service. But you're welcome to visit the rooms before service any Sunday — come early, meet the leaders, let your kid see the space.",
  },
  {
    q: 'What if my kid has allergies?',
    a: "There's an allergies field on the Connect form — fill it out and our team will know before they meet your kid. If you'd rather talk it through, email us and we'll work it out one-on-one.",
  },
  {
    q: 'My kid has special needs. Can they come to Kidsway?',
    a: "Yes — absolutely. If you let us know ahead of time, we can schedule 1:1 assistance so your kid has what they need. Because we're a small church we can make custom arrangements that bigger churches can't. Just reach out.",
  },
  {
    q: 'What should my kid wear?',
    a: "Normal kid clothes. Whatever works for them — comfortable, movement-friendly, nothing special required.",
  },
  {
    q: 'Can I check my kid in before I get there?',
    a: "Yes — check-in can be done online ahead of time, or in person when you arrive. Arriving a few minutes early makes it smoother.",
  },
  {
    q: 'Can parents volunteer in the classrooms?',
    a: "Yes, once you've gone through our background check and training. Every adult in a classroom is approved and background-checked, no exceptions.",
  },
];

// Each leader is optionally paired with a headshot in /images/leaders/.
// When there's no photo, the avatar renders as an initial tile so the
// grid stays visually consistent.
const kidswayLeaders = [
  { name: 'Martha', photo: 'martha.jpg' },
  { name: 'Charlie' },
  { name: 'Jamie' },
  { name: 'Kaylee', photo: 'kaylee.jpg' },
  { name: 'Elanor' },
];
const nurseryLeaders = [
  { name: 'Jen', photo: 'jen.jpg' },
  { name: 'Grace', photo: 'grace.jpg' },
  { name: 'Irene', photo: 'irene.jpg' },
  { name: 'Atalya' },
  { name: 'Carissa', photo: 'carissa.jpg' },
  { name: 'Iris', photo: 'iris.jpg' },
  { name: 'Emma' },
];

function LeaderAvatar({ name, photo }) {
  return (
    <div className="flex flex-col items-center text-center">
      <div className="aspect-square w-20 md:w-24 rounded-full overflow-hidden bg-fc-black-soft border border-fc-cream/15 flex items-center justify-center mb-3">
        {photo ? (
          <img
            src={`/images/leaders/${photo}`}
            alt={name}
            className="h-full w-full object-cover"
            loading="lazy"
            width="96"
            height="96"
          />
        ) : (
          <span className="font-display font-black text-3xl text-fc-cream/40 select-none">
            {name[0]}
          </span>
        )}
      </div>
      <p className="font-display uppercase tracking-widest2 text-xs text-fc-cream/80">
        {name}
      </p>
    </div>
  );
}

export default function Kids() {
  return (
    <main className="pt-28">
      <SEO
        path="/kids"
        title="Kids & Youth"
        description="Kidsway (K–5th), a full-service nursery (0–5), and Freeway Youth (6th–12th) at Freeway Church in Albion, Michigan. Background-checked leaders, two-leader policy, and a secured kids wing. Safe hands. Loud fun."
      />

      {/* Hero */}
      <section className="relative min-h-[70vh] flex items-end bg-fc-black overflow-hidden">
        <img
          src="/images/kids-hero.jpg"
          alt="Kids at Freeway Church laughing together"
          className="absolute inset-0 h-full w-full object-cover"
          fetchpriority="high"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-fc-black via-fc-black/70 to-fc-black/30" />
        <div className="container-fc relative z-10 py-20 md:py-28">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.2, 0.8, 0.2, 1] }}
            className="max-w-4xl"
          >
            <p className="eyebrow mb-6">Kids &amp; Youth</p>
            <h1 className="display-xl text-5xl md:text-8xl leading-[0.9] text-fc-cream">
              Safe hands.<br />
              <span className="text-fc-teal">Loud fun.</span>
            </h1>
            <p className="mt-10 text-xl md:text-2xl text-fc-cream/90 leading-snug max-w-2xl font-display font-medium drop-shadow">
              Background-checked leaders, a secured kids wing, and programs your kid
              will actually look forward to. Bring the whole family.
            </p>
          </motion.div>
        </div>
      </section>

      {/* The three rooms */}
      <section className="py-24 md:py-32 bg-fc-black border-t border-fc-cream/10">
        <div className="container-fc">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.6 }}
            className="max-w-3xl mb-16"
          >
            <p className="eyebrow mb-4">Three rooms, three ages</p>
            <h2 className="display-xl text-4xl md:text-6xl">
              From the nursery<br />
              <span className="text-fc-teal">to the youth room.</span>
            </h2>
          </motion.div>

          <div className="space-y-20">
            {rooms.map((r, i) => (
              <motion.div
                key={r.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-80px' }}
                transition={{ duration: 0.6 }}
                className="grid md:grid-cols-12 gap-8 md:gap-12 items-center"
              >
                <div className={`md:col-span-6 ${i % 2 === 1 ? 'md:order-2' : ''}`}>
                  <div className="relative border border-fc-cream/10 overflow-hidden aspect-[4/3]">
                    <img
                      src={r.image}
                      alt={r.imageAlt}
                      className="absolute inset-0 h-full w-full object-cover"
                      loading="lazy"
                    />
                  </div>
                </div>
                <div className={`md:col-span-6 ${i % 2 === 1 ? 'md:order-1' : ''}`}>
                  <p className="font-display uppercase tracking-widest2 text-xs text-fc-gold mb-3">
                    Ages {r.age}
                  </p>
                  <h3 className="display-xl text-3xl md:text-5xl leading-none mb-6">
                    {r.name}
                  </h3>
                  <p className="text-fc-cream/75 text-lg leading-relaxed">{r.body}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Safety — the big trust section */}
      <section className="relative py-28 md:py-36 bg-fc-black-soft border-t border-fc-cream/10">
        <div className="container-fc">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.6 }}
            className="max-w-3xl mb-16"
          >
            <p className="eyebrow mb-4">Safety</p>
            <h2 className="display-xl text-4xl md:text-6xl">
              Your kid&apos;s safety<br />
              <span className="text-fc-teal">is non-negotiable.</span>
            </h2>
            <p className="mt-8 text-lg text-fc-cream/70 leading-relaxed">
              Every policy below is in place the moment service starts. No exceptions,
              no shortcuts.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-x-12 gap-y-10 max-w-5xl">
            {safetyPoints.map((p, i) => (
              <motion.div
                key={p.title}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.5, delay: i * 0.06 }}
              >
                <h3 className="font-display font-black uppercase tracking-wide text-xl text-fc-teal mb-3">
                  {p.title}
                </h3>
                <p className="text-fc-cream/75 leading-relaxed">{p.body}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Photo band — reassurance after heavy safety content */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, margin: '-100px' }}
        transition={{ duration: 0.9 }}
        className="relative aspect-[21/9] overflow-hidden border-t border-fc-cream/10"
      >
        <img
          src="/images/kids-outdoor-2.jpg"
          alt="A Freeway Church kid playing outdoors"
          className="absolute inset-0 h-full w-full object-cover"
          loading="lazy"
        />
      </motion.div>

      {/* Check-in + typical Sunday */}
      <section className="py-24 md:py-32 bg-fc-black border-t border-fc-cream/10">
        <div className="container-fc">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.6 }}
            className="max-w-3xl mb-16"
          >
            <p className="eyebrow mb-4">A Typical Sunday</p>
            <h2 className="display-xl text-4xl md:text-6xl">
              From drop-off<br />
              <span className="text-fc-gold">to pickup.</span>
            </h2>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: '-80px' }}
            variants={{ hidden: {}, show: { transition: { staggerChildren: 0.08 } } }}
            className="grid md:grid-cols-4 gap-0 border-t border-l border-fc-cream/10"
          >
            {sundayFlow.map((s) => (
              <motion.div
                key={s.time}
                variants={{
                  hidden: { opacity: 0, y: 16 },
                  show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
                }}
                className="relative p-8 border-r border-b border-fc-cream/10"
              >
                <div className="absolute top-0 left-0 h-px bg-fc-teal w-12" />
                <div className="flex items-baseline gap-2 mb-4">
                  <span className="font-display font-black text-4xl text-fc-cream leading-none">
                    {s.time}
                  </span>
                  <span className="font-display uppercase tracking-widest2 text-xs text-fc-cream/50">
                    AM
                  </span>
                </div>
                <h3 className="font-display font-black uppercase text-base text-fc-teal leading-none mb-3">
                  {s.label}
                </h3>
                <p className="text-fc-cream/70 text-sm leading-relaxed">{s.body}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Parent FAQs */}
      <section className="py-24 md:py-32 bg-fc-black-soft border-t border-fc-cream/10">
        <div className="container-fc">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.6 }}
            className="max-w-3xl mb-16"
          >
            <p className="eyebrow mb-4">Parent FAQs</p>
            <h2 className="display-xl text-4xl md:text-6xl">
              Real questions,<br />
              <span className="text-fc-teal">real answers.</span>
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-x-12 gap-y-10 max-w-5xl">
            {faqs.map((f, i) => (
              <motion.div
                key={f.q}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.5, delay: i * 0.06 }}
              >
                <h3 className="font-display font-black uppercase tracking-wide text-xl text-fc-teal mb-3">
                  {f.q}
                </h3>
                <p className="text-fc-cream/75 leading-relaxed">{f.a}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Photo band — breather before team section */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, margin: '-100px' }}
        transition={{ duration: 0.9 }}
        className="relative aspect-[21/9] overflow-hidden border-t border-fc-cream/10"
      >
        <img
          src="/images/kids-outdoor-1.jpg"
          alt="A Freeway Church kid at an outdoor community gathering"
          className="absolute inset-0 h-full w-full object-cover"
          loading="lazy"
        />
      </motion.div>

      {/* Meet the leaders */}
      <section className="py-24 md:py-32 bg-fc-black border-t border-fc-cream/10">
        <div className="container-fc">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.6 }}
            className="max-w-3xl mb-12"
          >
            <p className="eyebrow mb-4">Meet the Team</p>
            <h2 className="display-xl text-4xl md:text-6xl">
              The people<br />
              <span className="text-fc-gold">with your kids.</span>
            </h2>
            <p className="mt-6 text-fc-cream/70 leading-relaxed max-w-2xl">
              The volunteers below give up part of their Sunday every week so your kid
              has a great one. Every one of them is background-checked and trained.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-6 md:gap-8">
            <div className="border border-fc-cream/10 p-8 md:p-10">
              <p className="font-display uppercase tracking-widest2 text-xs text-fc-gold mb-2">
                Kidsway · K–5th
              </p>
              <h3 className="font-display font-black uppercase text-2xl mb-8 text-fc-teal">
                Leaders
              </h3>
              <div className="grid grid-cols-4 sm:grid-cols-5 gap-4">
                {kidswayLeaders.map((l) => (
                  <LeaderAvatar key={l.name} name={l.name} photo={l.photo} />
                ))}
              </div>
            </div>
            <div className="border border-fc-cream/10 p-8 md:p-10">
              <p className="font-display uppercase tracking-widest2 text-xs text-fc-gold mb-2">
                Nursery · 0–5
              </p>
              <h3 className="font-display font-black uppercase text-2xl mb-8 text-fc-teal">
                Leaders
              </h3>
              <div className="grid grid-cols-4 sm:grid-cols-5 gap-4">
                {nurseryLeaders.map((l) => (
                  <LeaderAvatar key={l.name} name={l.name} photo={l.photo} />
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 md:py-32 bg-fc-black-soft border-t border-fc-cream/10">
        <div className="container-fc">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.6 }}
            className="max-w-3xl"
          >
            <h2 className="display-xl text-4xl md:text-6xl mb-8">
              Bring them<br />
              <span className="text-fc-teal">this Sunday.</span>
            </h2>
            <p className="text-fc-cream/80 text-lg leading-relaxed mb-10 max-w-xl">
              Plan a visit, check in ahead of time, or email us with any question that
              didn&apos;t get answered above. We&apos;d love to meet your family.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link to="/visit" className="btn-primary">
                Plan a Visit
              </Link>
              <MailLink
                subject="Kids & Youth question"
                className="btn-outline"
                ariaLabel="Email us a question about Kids and Youth"
              >
                Email Us
              </MailLink>
            </div>
          </motion.div>
        </div>
      </section>
    </main>
  );
}
