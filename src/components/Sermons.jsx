import { motion } from 'framer-motion';
import Placeholder from './Placeholder.jsx';

const channels = [
  {
    tag: 'Podcast',
    title: 'Things We Say',
    subtitle: 'Listen on Spotify',
    body: 'A weekly podcast that extends what we preach on Sundays. Pastors Roy and Elissa unpack the message, push into real conversations, and talk honestly about what the American Church is navigating right now.',
    href: 'https://open.spotify.com/show/1ClBK7hZzOSyfFhQYjpjMo',
    label: 'Podcast cover / episode art',
    aspect: '1/1',
    cta: 'Listen',
  },
  {
    tag: 'Watch',
    title: 'Freeway Media',
    subtitle: 'Stream on YouTube',
    body: "Can't make it in person? Services stream every Sunday. Catch the latest message, browse the archive, or just drop in whenever you need it.",
    href: 'https://www.youtube.com/@freewaymedia/streams',
    label: 'YouTube stream / stage shot',
    aspect: '16/9',
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

        <div className="grid md:grid-cols-2 gap-8">
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
              <div className="overflow-hidden">
                <div className="transition-transform duration-700 group-hover:scale-[1.03]">
                  <Placeholder label={c.label} aspect={c.aspect} />
                </div>
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
