import { motion } from 'framer-motion';
import MailLink from './MailLink.jsx';

const wednesdayRhythm = [
  {
    time: '4:00',
    label: 'Small Groups',
    body: "Different groups meet depending on the season — studies, men's and women's circles, discipleship. Start times vary.",
  },
  {
    time: '6:00',
    label: 'Dinner',
    body: 'A real meal around a real table. Nothing fancy — just food, and everyone who shows up.',
  },
  {
    time: '7:00',
    label: 'Prayer',
    body: 'The night lands in prayer together. Come for all of it, or just this.',
  },
];

export default function Midweek() {
  return (
    <section
      id="midweek"
      className="relative py-28 md:py-40 bg-fc-black border-t border-fc-cream/10"
    >
      <div className="container-fc">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6 }}
          className="max-w-3xl mb-14"
        >
          <p className="eyebrow mb-4">Wednesday Nights</p>
          <h2 className="display-xl text-4xl md:text-6xl">
            Midweek,<br />
            <span className="text-fc-teal">together.</span>
          </h2>
          <p className="mt-6 text-lg text-fc-cream/70 leading-relaxed max-w-2xl">
            Wednesday night is when the week slows down and the church comes back around a
            table. Small groups, dinner, prayer — come for one part, come for all of it.
          </p>
        </motion.div>

        {/* Photo band */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <div className="grid md:grid-cols-2 gap-4">
            <div className="border border-fc-cream/10 overflow-hidden aspect-[3/2]">
              <img
                src="/images/wednesday-dinner.jpg"
                alt="People sharing dinner on Wednesday night"
                className="h-full w-full object-cover"
                loading="lazy"
              />
            </div>
            <div className="border border-fc-cream/10 overflow-hidden aspect-[3/2]">
              <img
                src="/images/wednesday-community.jpg"
                alt="Wednesday night community gathering"
                className="h-full w-full object-cover"
                loading="lazy"
              />
            </div>
          </div>
        </motion.div>

        {/* Timeline */}
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-80px' }}
          variants={{ hidden: {}, show: { transition: { staggerChildren: 0.1 } } }}
          className="grid md:grid-cols-3 gap-0 border-t border-l border-fc-cream/10"
        >
          {wednesdayRhythm.map((r) => (
            <motion.div
              key={r.time}
              variants={{
                hidden: { opacity: 0, y: 16 },
                show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
              }}
              className="relative p-8 md:p-10 border-r border-b border-fc-cream/10"
            >
              <div className="absolute top-0 left-0 h-px bg-fc-teal w-12" />
              <div className="flex items-baseline gap-3 mb-5">
                <span className="font-display font-black text-5xl md:text-6xl text-fc-cream leading-none">
                  {r.time}
                </span>
                <span className="font-display uppercase tracking-widest2 text-xs text-fc-cream/50">
                  PM
                </span>
              </div>
              <h3 className="font-display font-black uppercase text-xl md:text-2xl leading-none mb-4 text-fc-teal">
                {r.label}
              </h3>
              <p className="text-fc-cream/70 text-sm leading-relaxed">{r.body}</p>
            </motion.div>
          ))}
        </motion.div>

        {/* Season note + CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mt-12 grid md:grid-cols-12 gap-8 md:gap-12 items-start"
        >
          <div className="md:col-span-7">
            <p className="text-fc-cream/70 leading-relaxed mb-4">
              Community nights run in seasons, and the schedule shifts with the year — which
              groups are meeting, when they start, what they're studying. The best way to
              find where you belong is to reach out. We'll walk you through what's happening
              right now and the group that fits where you are.
            </p>
            <p className="text-fc-cream/50 leading-relaxed text-sm italic">
              Want the community events calendar? Message us and we'll send it over.
            </p>
          </div>
          <div className="md:col-span-5 md:justify-self-end">
            <MailLink
              subject="Community Events Calendar"
              className="btn-primary"
              ariaLabel="Email us about community events"
            >
              Message Us
            </MailLink>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
