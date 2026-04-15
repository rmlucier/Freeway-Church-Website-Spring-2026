import { motion } from 'framer-motion';

const reveal = {
  hidden: { clipPath: 'inset(100% 0 0 0)' },
  show: { clipPath: 'inset(0% 0 0 0)' },
};

const gridContainer = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12 } },
};

const wednesdayRhythm = [
  {
    time: '4:00',
    label: 'Small Groups',
    body: 'Different groups meet depending on the season — studies, men\'s and women\'s circles, discipleship. Start times vary.',
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

export default function Community() {
  return (
    <section id="community" className="relative py-28 md:py-40 bg-fc-black overflow-hidden">
      <div className="container-fc">
        <div className="grid md:grid-cols-12 gap-10 md:gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.7 }}
            className="md:col-span-6"
          >
            <p className="eyebrow mb-4">The Room</p>
            <h2 className="display-xl text-4xl md:text-6xl mb-8">
              You don't have to<br />
              <span className="text-fc-gold">have it together</span><br />
              to be here.
            </h2>
            <p className="text-fc-cream/80 text-lg leading-relaxed mb-6">
              Freeway is full of people at different places in their faith — some who have walked
              with Jesus for decades, some who just walked in for the first time, and plenty
              figuring it out in between. All of that belongs here.
            </p>
            <p className="text-fc-cream/60 leading-relaxed">
              We're not trying to impress anyone. We're trying to be real — with God, with each
              other, and with the world we're called to love. If that sounds like a community
              you'd want to be part of, we'd love to meet you.
            </p>
          </motion.div>

          <motion.div
            variants={gridContainer}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: '-100px' }}
            className="md:col-span-6 grid grid-cols-6 gap-4"
          >
            <motion.div
              variants={reveal}
              transition={{ duration: 0.9, ease: [0.76, 0, 0.24, 1] }}
              className="col-span-4 row-span-2 overflow-hidden"
            >
              <img
                src="/images/community-group.jpg"
                alt="Freeway community gathered together"
                className="h-full w-full object-cover"
                loading="lazy"
              />
            </motion.div>
            <motion.div
              variants={reveal}
              transition={{ duration: 0.9, ease: [0.76, 0, 0.24, 1] }}
              className="col-span-2 aspect-square overflow-hidden"
            >
              <img
                src="/images/community-worship.jpg"
                alt="Drummer leading worship"
                className="h-full w-full object-cover"
                loading="lazy"
              />
            </motion.div>
            <motion.div
              variants={reveal}
              transition={{ duration: 0.9, ease: [0.76, 0, 0.24, 1] }}
              className="col-span-2 aspect-square overflow-hidden"
            >
              <img
                src="/images/community-prayer.jpg"
                alt="Hands raised in worship"
                className="h-full w-full object-cover"
                loading="lazy"
              />
            </motion.div>
            <motion.div
              variants={reveal}
              transition={{ duration: 0.9, ease: [0.76, 0, 0.24, 1] }}
              className="col-span-6 aspect-[21/9] overflow-hidden"
            >
              <img
                src="/images/community-kids.jpg"
                alt="Kids playing on a tire swing"
                className="h-full w-full object-cover"
                loading="lazy"
              />
            </motion.div>
          </motion.div>
        </div>

        {/* Wednesday Nights */}
        <div className="mt-28 md:mt-40 pt-20 md:pt-28 border-t border-fc-cream/10">
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
            className="grid md:grid-cols-5 gap-4 mb-16"
          >
            <div className="md:col-span-3 border border-fc-cream/10 overflow-hidden aspect-[16/10]">
              <img
                src="/images/wednesday-dinner.jpg"
                alt="People sharing dinner on Wednesday night"
                className="h-full w-full object-cover"
                loading="lazy"
              />
            </div>
            <div className="md:col-span-2 border border-fc-cream/10 overflow-hidden aspect-[16/10]">
              <img
                src="/images/wednesday-smallgroup.jpg"
                alt="Men gathered around a small group table"
                className="h-full w-full object-cover"
                loading="lazy"
              />
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
            {wednesdayRhythm.map((r, i) => (
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
              <a
                href="https://freewaychurch.churchcenter.com/people/forms/274372"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary"
              >
                Message Us
              </a>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
