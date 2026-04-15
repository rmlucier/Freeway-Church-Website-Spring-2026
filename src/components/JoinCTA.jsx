import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const steps = [
  {
    title: 'Prayer',
    body: 'Something you need prayer for? Our team prays over every request.',
    href: 'https://freewaychurch.churchcenter.com/people/forms/585698',
  },
  {
    title: 'Follow Jesus',
    body: "Said yes to Jesus — or want to? Let's talk about what's next.",
    href: 'https://freewaychurch.churchcenter.com/people/forms/585705',
  },
  {
    title: 'Connect',
    body: 'New around here? Fill out a Freeway Report and we\'ll reach out.',
    href: 'https://freewaychurch.churchcenter.com/people/forms/274372',
  },
  {
    title: 'Give',
    body: 'See how giving works here and where it goes. Then give.',
    href: '/giving',
  },
  {
    title: 'Core Team',
    body: 'Ready to serve? Join the team that makes Sundays happen.',
    href: 'https://freewaychurch.churchcenter.com/people/forms/585690',
  },
  {
    title: 'Watch Online',
    body: "Can't be there in person? Catch the message on YouTube.",
    href: 'https://www.youtube.com/@freewaymedia/streams',
  },
];

export default function JoinCTA() {
  return (
    <section className="relative py-28 md:py-40 bg-fc-black-soft border-y border-fc-cream/10">
      <div className="container-fc">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6 }}
          className="mb-16 md:mb-20 max-w-3xl"
        >
          <p className="eyebrow mb-4">Next Steps</p>
          <h2 className="display-xl text-4xl md:text-6xl">
            Wherever you are,<br />
            <span className="text-fc-teal">there's a step.</span>
          </h2>
        </motion.div>

        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-0 border-t border-l border-fc-cream/10">
          {steps.map((s, i) => {
            const isExternal = s.href.startsWith('http');
            const cardClass =
              'group relative p-8 md:p-10 border-r border-b border-fc-cream/10 hover:bg-fc-black transition-colors';
            const motionProps = {
              initial: { opacity: 0, y: 20 },
              whileInView: { opacity: 1, y: 0 },
              viewport: { once: true, margin: '-60px' },
              transition: { duration: 0.4, delay: i * 0.06 },
            };

            const innerContent = (
              <>
                <div className="absolute top-0 left-0 h-1 bg-fc-teal w-0 group-hover:w-full transition-all duration-500" />
                <div className="flex items-start justify-between mb-6">
                  <h3 className="font-display font-black uppercase text-2xl md:text-3xl leading-none">
                    {s.title}
                  </h3>
                  <span className="font-display text-fc-cream/30 text-sm">0{i + 1}</span>
                </div>
                <p className="text-fc-cream/70 text-sm leading-relaxed mb-6">{s.body}</p>
                <span className="inline-flex items-center gap-2 font-display uppercase tracking-widest2 text-xs text-fc-teal group-hover:text-fc-gold transition-colors">
                  Go
                  <span className="transition-transform group-hover:translate-x-1">→</span>
                </span>
              </>
            );

            return isExternal ? (
              <motion.a
                key={s.title}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                className={cardClass}
                {...motionProps}
              >
                {innerContent}
              </motion.a>
            ) : (
              <motion.div key={s.title} className={cardClass} {...motionProps}>
                <Link to={s.href} className="absolute inset-0" aria-label={s.title} />
                {innerContent}
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
