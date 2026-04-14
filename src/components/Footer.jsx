import { motion } from 'framer-motion';

const socials = [
  { label: 'Instagram', href: 'https://instagram.com/freeway.church' },
  { label: 'Facebook', href: 'https://www.facebook.com/www.freeway.church/' },
  { label: 'YouTube', href: 'https://www.youtube.com/@freewaymedia' },
];

const quickLinks = [
  { label: 'About Us', href: '#vision' },
  { label: 'Messages', href: '#sermons' },
  { label: 'Give', href: 'https://freewaychurch.churchcenter.com/giving' },
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
          <div className="md:col-span-5">
            <h2 className="display-xl text-5xl md:text-7xl leading-[0.85] overflow-hidden">
              <motion.span
                initial={{ y: '110%' }}
                whileInView={{ y: 0 }}
                viewport={{ once: true, margin: '-80px' }}
                transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
                className="block"
              >
                Come
              </motion.span>
              <motion.span
                initial={{ y: '110%' }}
                whileInView={{ y: 0 }}
                viewport={{ once: true, margin: '-80px' }}
                transition={{ duration: 0.8, delay: 0.15, ease: [0.76, 0, 0.24, 1] }}
                className="block text-fc-teal"
              >
                home.
              </motion.span>
            </h2>
            <motion.p
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="mt-6 text-fc-cream/70 max-w-md leading-relaxed"
            >
              Sundays at 10am. Albion, Michigan. Bring yourself, bring your questions,
              bring a friend — we'll save you a seat.
            </motion.p>
          </div>

          <div className="md:col-span-3 md:col-start-7">
            <p className="eyebrow mb-5">Quick Links</p>
            <ul className="space-y-3">
              {quickLinks.map((l) => (
                <li key={l.label}>
                  <a
                    href={l.href}
                    target={l.href.startsWith('http') ? '_blank' : undefined}
                    rel={l.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                    className="font-display uppercase tracking-wide text-fc-cream/80 hover:text-fc-teal transition-colors"
                  >
                    {l.label}
                  </a>
                </li>
              ))}
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
