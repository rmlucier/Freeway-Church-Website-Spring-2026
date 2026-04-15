import { motion } from 'framer-motion';

const pillars = [
  {
    number: '01',
    title: 'Connect',
    habits: ['With God.', 'With others.'],
    body: 'Jesus is a person — not a belief system. Start there. Then: with each other. God is putting a people together one by one, and it takes real work. Forgive quickly. Put each other first.',
    culture: ['Alabaster', 'Lavish'],
  },
  {
    number: '02',
    title: 'Cultivate',
    habits: ['Share your story.', 'Invite others in.'],
    body: "Growth is the whole point. When God does something in your life, tell someone — what you repeat, you remember. And everyone's invited here to have their life wrecked by Jesus. Messy, but worth it.",
    culture: ['Expectation', 'Anticipation'],
  },
  {
    number: '03',
    title: 'Contribute',
    habits: ['Serve.', 'Give.'],
    body: 'You were made for this. Every person is called out of something, into something — whatever yours is, the church needs you to figure it out. And we give: not to cover bills, but to leave a legacy.',
    culture: ['Appointed', 'Enlisted'],
  },
];

export default function Pillars() {
  return (
    <section id="pillars" className="relative py-28 md:py-40 bg-fc-black-soft">
      <div className="container-fc">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6 }}
          className="mb-16 md:mb-24 max-w-3xl"
        >
          <p className="eyebrow mb-4">Three Pillars · Three C's</p>
          <h2 className="display-xl text-4xl md:text-6xl">
            How we <span className="text-fc-teal">actually</span><br />do church.
          </h2>
          <p className="mt-6 font-display uppercase tracking-widest2 text-fc-cream/60 text-sm md:text-base">
            It all works together.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8 md:gap-6">
          {pillars.map((p, i) => (
            <motion.div
              key={p.number}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.7, delay: i * 0.12 }}
              className="group relative border-t border-fc-cream/15 pt-8 flex flex-col"
            >
              <div className="absolute top-0 left-0 h-px bg-fc-teal transition-all duration-500 w-12 group-hover:w-full" />

              <div className="font-display text-fc-gold text-sm tracking-widest2 mb-4">{p.number}</div>

              <h3 className="font-display font-black uppercase text-3xl md:text-4xl leading-none mb-4">
                {p.title}
              </h3>

              <ul className="mb-6 space-y-1">
                {p.habits.map((h) => (
                  <li
                    key={h}
                    className="font-display uppercase tracking-wide text-fc-teal text-sm"
                  >
                    {h}
                  </li>
                ))}
              </ul>

              <p className="text-fc-cream/70 leading-relaxed mb-8 flex-1">{p.body}</p>

              <div className="pt-5 border-t border-fc-cream/10 flex items-center gap-4">
                <span className="eyebrow text-xs text-fc-gold/80">Culture</span>
                <div className="flex items-center gap-3 font-display uppercase tracking-widest2 text-xs text-fc-cream/70">
                  <span>{p.culture[0]}</span>
                  <span className="text-fc-teal">·</span>
                  <span>{p.culture[1]}</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
