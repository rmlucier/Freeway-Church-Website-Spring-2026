import { motion } from 'framer-motion';
import MailLink from './MailLink.jsx';

// Assembled on interaction via MailLink — see that component for why
// the addresses are split into parts.
const ROY_PARTS = ['rmlucier', 'gmail', 'com'];
const COUNSELING_PARTS = ['harry', 'freeway', 'church'];

const cards = [
  {
    number: '01',
    title: 'What You Bring',
    body: "A decision, a stuck place, a goal, a calling. Work, family, faith, money — anything you're actually working through.",
  },
  {
    number: '02',
    title: 'What Happens',
    body: 'A private conversation with Pastor Roy. He asks, you think out loud, and you leave with a clear next step. Everything stays confidential.',
  },
  {
    number: '03',
    title: 'What It Costs',
    body: "Nothing. If Freeway is your church home, coaching is covered by the church. Book whenever you're ready — no waiting for a crisis.",
  },
];

export default function Coaching() {
  return (
    <section id="coaching" className="relative py-28 md:py-40 bg-fc-teal-dark">
      <div className="container-fc">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6 }}
          className="mb-16 md:mb-24 max-w-3xl"
        >
          <p className="eyebrow text-fc-gold-soft mb-4">Pastoral Coaching and Counseling</p>
          <h2 className="display-xl text-4xl md:text-6xl">
            Someone in<br />
            <span className="text-fc-black">your corner.</span>
          </h2>
          <p className="mt-6 text-fc-cream/90 text-lg leading-relaxed">
            Coaching is a focused, one-on-one conversation about your real life — a decision
            you're facing, a habit you can't shake, a next step you keep putting off. It's not
            counseling, and it's not a sermon. A coach asks the questions that help you get
            clear, then holds you to what you said you'd do.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8 md:gap-6">
          {cards.map((c, i) => (
            <motion.div
              key={c.number}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.7, delay: i * 0.12 }}
              className="group relative border-t border-fc-cream/25 pt-8 flex flex-col"
            >
              <div className="absolute top-0 left-0 h-px bg-fc-gold-soft transition-all duration-500 w-12 group-hover:w-full" />

              <div className="font-display text-fc-gold-soft text-sm tracking-widest2 mb-4">{c.number}</div>

              <h3 className="font-display font-black uppercase text-3xl md:text-4xl leading-none mb-4">
                {c.title}
              </h3>

              <p className="text-fc-cream/80 leading-relaxed flex-1">{c.body}</p>
            </motion.div>
          ))}
        </div>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6 }}
          className="mt-12 text-fc-cream/70 text-sm leading-relaxed max-w-2xl"
        >
          Pastor Roy is an ICF-credentialed coach who works with founders, executives, and
          pastors. Freeway gets the same coaching — free.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="mt-8 flex flex-wrap items-center gap-4"
        >
          <MailLink
            parts={ROY_PARTS}
            subject="Coaching session"
            className="btn bg-fc-black text-fc-cream hover:bg-fc-gold hover:text-fc-black"
          >
            Book a Session
          </MailLink>
          <MailLink parts={ROY_PARTS} subject="Coaching question" className="btn-outline">
            Questions? Ask Roy
          </MailLink>
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mt-6 text-fc-cream/60 text-sm leading-relaxed max-w-xl"
        >
          Coaching isn't therapy. If you're carrying something heavier — grief, trauma, a
          crisis — reach out and we'll help you find the right care.
        </motion.p>

        {/* Counseling */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.7 }}
          className="mt-16 border border-fc-cream/25 bg-fc-black/20 p-8 md:p-12 grid md:grid-cols-12 items-center gap-8"
        >
          <div className="md:col-span-8">
            <p className="eyebrow text-fc-gold-soft mb-3">Counseling</p>
            <h3 className="font-display font-black uppercase text-3xl md:text-4xl leading-none mb-4">
              When it's more<br className="md:hidden" /> than coaching.
            </h3>
            <p className="text-fc-cream/80 leading-relaxed max-w-xl">
              Freeway also has a licensed mental health counselor available to the church.
              Grief, trauma, anxiety, depression — some things deserve more than a next
              step, and that's exactly what counseling is for. Reach out and we'll connect
              you.
            </p>
          </div>
          <div className="md:col-span-4 md:justify-self-end">
            <MailLink
              parts={COUNSELING_PARTS}
              subject="Counseling"
              className="btn bg-fc-black text-fc-cream hover:bg-fc-gold hover:text-fc-black"
            >
              Ask About Counseling
            </MailLink>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
