import { motion } from 'framer-motion';

const pillars = [
  {
    number: '01',
    title: 'Connect to God',
    body: 'Worship that means it. Prayer that actually changes things. Teaching that meets you where you are and pushes you further than you thought you could go.',
  },
  {
    number: '02',
    title: 'Connect with Others',
    body: "Church shouldn't feel like a performance. It should feel like people who know your name, show up when it's hard, and stick around when it gets real.",
  },
  {
    number: '03',
    title: 'Cultivate Life Change',
    body: "Transformation isn't an event — it's a direction. We're a community pointed toward Jesus, practicing what we preach, and growing together on purpose.",
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
          <p className="eyebrow mb-4">Three Pillars</p>
          <h2 className="display-xl text-4xl md:text-6xl">
            How we <span className="text-fc-teal">actually</span><br />do church.
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8 md:gap-6">
          {pillars.map((p, i) => (
            <motion.div
              key={p.number}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.7, delay: i * 0.12 }}
              className="group relative border-t border-fc-cream/15 pt-8"
            >
              <div className="absolute top-0 left-0 h-px bg-fc-teal transition-all duration-500 w-12 group-hover:w-full" />
              <div className="font-display text-fc-gold text-sm tracking-widest2 mb-4">{p.number}</div>
              <h3 className="font-display font-black uppercase text-3xl md:text-4xl leading-none mb-5">
                {p.title}
              </h3>
              <p className="text-fc-cream/70 leading-relaxed">{p.body}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
