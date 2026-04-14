import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const links = [
  { label: 'Vision', href: '#vision' },
  { label: 'Pillars', href: '#pillars' },
  { label: 'Community', href: '#community' },
  { label: 'Services', href: '#services' },
  { label: 'Messages', href: '#sermons' },
];

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${
        scrolled ? 'bg-fc-black/90 backdrop-blur-md border-b border-fc-cream/10' : 'bg-transparent'
      }`}
    >
      <div className="container-fc flex items-center justify-between h-20">
        <a href="#top" className="font-display font-black text-2xl tracking-tight uppercase">
          Freeway<span className="text-fc-teal">.</span>
        </a>

        <nav className="hidden md:flex items-center gap-10">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="font-display uppercase tracking-widest2 text-sm text-fc-cream/80 hover:text-fc-teal transition-colors"
            >
              {l.label}
            </a>
          ))}
          <a
            href="https://freewaychurch.churchcenter.com/giving"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary"
          >
            Give
          </a>
        </nav>

        <button
          onClick={() => setOpen((v) => !v)}
          aria-label="Menu"
          className="md:hidden flex flex-col gap-1.5 p-2"
        >
          <span className={`h-0.5 w-6 bg-fc-cream transition-transform ${open ? 'translate-y-2 rotate-45' : ''}`} />
          <span className={`h-0.5 w-6 bg-fc-cream transition-opacity ${open ? 'opacity-0' : ''}`} />
          <span className={`h-0.5 w-6 bg-fc-cream transition-transform ${open ? '-translate-y-2 -rotate-45' : ''}`} />
        </button>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25 }}
            className="md:hidden overflow-hidden bg-fc-black border-t border-fc-cream/10"
          >
            <div className="container-fc py-6 flex flex-col gap-5">
              {links.map((l) => (
                <a
                  key={l.href}
                  href={l.href}
                  onClick={() => setOpen(false)}
                  className="font-display uppercase tracking-widest2 text-lg"
                >
                  {l.label}
                </a>
              ))}
              <a
                href="https://freewaychurch.churchcenter.com/giving"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary self-start"
              >
                Give
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
