import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const socials = [
  { label: 'Instagram', href: 'https://instagram.com/freeway.church' },
  { label: 'Facebook', href: 'https://www.facebook.com/www.freeway.church/' },
  { label: 'YouTube', href: 'https://www.youtube.com/@freewaymedia' },
];

const quickLinks = [
  { label: 'Plan a Visit', href: '/visit' },
  { label: 'What We Believe', href: '/beliefs' },
  { label: 'Messages', href: '/#sermons' },
  { label: 'Give', href: '/giving' },
  { label: 'Freeway Report', href: 'https://freewaychurch.churchcenter.com/people/forms/274372' },
];

export default function Footer() {
  return (
    <footer className="relative bg-fc-black pt-24 pb-10 border-t border-fc-cream/10">
      <div className="container-fc">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="grid md:grid-cols-12 gap-10 mb-20"
        >
          <div className="md:col-span-6">
            <motion.h2
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.7, ease: [0.2, 0.8, 0.2, 1] }}
              className="display-xl text-7xl md:text-[10rem] leading-[0.85] text-fc-teal"
            >
              Free.
            </motion.h2>

            <motion.div
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, margin: '-80px' }}
              variants={{
                hidden: {},
                show: { transition: { staggerChildren: 0.18, delayChildren: 0.2 } },
              }}
              className="mt-8 max-w-xl space-y-5 text-fc-cream/80 leading-relaxed text-lg"
            >
              <motion.p
                variants={{
                  hidden: { opacity: 0, y: 16 },
                  show: { opacity: 1, y: 0, transition: { duration: 0.6 } },
                }}
              >
                There's a free way to become friends with God. It's Jesus.
                That's the whole thing — every Sunday, every word, every
                life we've watched change flows from him.
              </motion.p>
              <motion.p
                variants={{
                  hidden: { opacity: 0, y: 16 },
                  show: { opacity: 1, y: 0, transition: { duration: 0.6 } },
                }}
              >
                He's not watching from a distance. He's waiting — for you to
                turn around and come home to a truth you've always known.
              </motion.p>
              <motion.p
                variants={{
                  hidden: { opacity: 0, y: 16 },
                  show: { opacity: 1, y: 0, transition: { duration: 0.6 } },
                }}
              >
                That echo in your chest? It's real. It's all true.
              </motion.p>
              <motion.p
                variants={{
                  hidden: { opacity: 0, y: 16 },
                  show: { opacity: 1, y: 0, transition: { duration: 0.7 } },
                }}
                className="font-display font-black uppercase text-3xl md:text-4xl tracking-tight text-fc-cream pt-2"
              >
                Come home.
              </motion.p>
            </motion.div>
          </div>

          <div className="md:col-span-3 md:col-start-7">
            <p className="eyebrow mb-5">Quick Links</p>
            <ul className="space-y-3">
              {quickLinks.map((l) => {
                const isExternal = l.href.startsWith('http');
                const className =
                  'font-display uppercase tracking-wide text-fc-cream/80 hover:text-fc-teal transition-colors';
                return (
                  <li key={l.label}>
                    {isExternal ? (
                      <a
                        href={l.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={className}
                      >
                        {l.label}
                      </a>
                    ) : (
                      <Link to={l.href} className={className}>
                        {l.label}
                      </Link>
                    )}
                  </li>
                );
              })}
            </ul>
          </div>

          <div className="md:col-span-3">
            <p className="eyebrow mb-5">Follow</p>
            <ul className="space-y-3">
              {socials.map((s) => (
                <li key={s.label}>
                  <a
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-display uppercase tracking-wide text-fc-cream/80 hover:text-fc-teal transition-colors"
                  >
                    {s.label} →
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </motion.div>

        <div className="pt-10 border-t border-fc-cream/10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <img
            src="/images/logo-stack-white.png"
            alt="Freeway Church"
            className="h-20 md:h-24 w-auto"
          />
          <div className="text-fc-cream/50 text-sm font-display uppercase tracking-widest2">
            © {new Date().getFullYear()} Freeway Church · Albion, MI
          </div>
        </div>
      </div>
    </footer>
  );
}
