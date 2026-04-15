import { motion } from 'framer-motion';

const channels = [
  {
    tag: 'Watch',
    title: 'Freeway Media',
    subtitle: 'Stream on YouTube',
    body: "Can't make it in person? Services stream every Sunday. Catch the latest message, browse the archive, or just drop in whenever you need it.",
    href: 'https://www.youtube.com/@freewaymedia/streams',
    cta: 'Watch',
  },
];

export default function Sermons() {
  return (
    <section id="sermons" className="relative py-28 md:py-40 bg-fc-black">
      <div className="container-fc">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6 }}
          className="mb-16 md:mb-20 max-w-3xl"
        >
          <p className="eyebrow mb-4">Messages &amp; Media</p>
          <h2 className="display-xl text-4xl md:text-6xl">
            Listen in.<br />
            <span className="text-fc-gold">Dig deeper.</span>
          </h2>
        </motion.div>

        <div className="grid gap-8">
          {channels.map((c, i) => (
            <motion.a
              key={c.title}
              href={c.href}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              className="group block bg-fc-black-soft border border-fc-cream/10 hover:border-fc-teal transition-colors"
            >
              <div className="overflow-hidden aspect-video">
                <img
                  src="/images/roy-preaching.jpg"
                  alt="Pastor Roy preaching"
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                  loading="lazy"
                />
              </div>
              <div className="p-8 md:p-10">
                <div className="flex items-center justify-between mb-4">
                  <span className="eyebrow">{c.tag}</span>
                  <span className="font-display text-fc-cream/50 text-sm">{c.subtitle}</span>
                </div>
                <h3 className="font-display font-black uppercase text-3xl md:text-4xl mb-4 leading-none">
                  {c.title}
                </h3>
                <p className="text-fc-cream/70 leading-relaxed mb-6">{c.body}</p>
                <span className="inline-flex items-center gap-2 font-display uppercase tracking-widest2 text-sm text-fc-teal group-hover:text-fc-gold transition-colors">
                  {c.cta}
                  <span className="transition-transform group-hover:translate-x-1">→</span>
                </span>
              </div>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
}
