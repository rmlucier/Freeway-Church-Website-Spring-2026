import { motion } from 'framer-motion';

const SCHEDULING_URL = 'https://calendar.app.google/REPLACE_ME'; // UPDATE: Roy's Google appointment schedule link

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
          <p className="eyebrow text-fc-gold-soft mb-4">Pastoral Coaching</p>
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
          <a
            href={SCHEDULING_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="btn bg-fc-black text-fc-cream hover:bg-fc-gold hover:text-fc-black"
          >
            Book a Session
          </a>
          <a href="mailto:hello@freeway.church" className="btn-outline">
            Questions? Ask Roy
          </a>
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
      </div>
    </section>
  );
}
