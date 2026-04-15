import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link, useLocation } from 'react-router-dom';

const links = [
  { label: 'Vision', hash: '#vision' },
  { label: 'Pillars', hash: '#pillars' },
  { label: 'Community', hash: '#community' },
  { label: 'Services', hash: '#services' },
  { label: 'Messages', hash: '#sermons' },
];

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const location = useLocation();
  const onHome = location.pathname === '/';

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Build an anchor href that works from any page
  const sectionHref = (hash) => (onHome ? hash : `/${hash}`);

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${
        scrolled || !onHome ? 'bg-fc-black/90 backdrop-blur-md border-b border-fc-cream/10' : 'bg-transparent'
      }`}
    >
      <div className="container-fc flex items-center justify-between h-20">
        <Link to="/" aria-label="Freeway Church — home" className="block">
          <img
            src="/images/logo-horizontal-white.png"
            alt="Freeway Church"
            className="h-8 md:h-9 w-auto"
          />
        </Link>

        <nav className="hidden md:flex items-center gap-10">
          {links.map((l) => (
            <a
              key={l.hash}
              href={sectionHref(l.hash)}
              className="font-display uppercase tracking-widest2 text-sm text-fc-cream/80 hover:text-fc-teal transition-colors"
            >
              {l.label}
            </a>
          ))}
          <Link to="/giving" className="btn-primary">
            Give
          </Link>
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
                  key={l.hash}
                  href={sectionHref(l.hash)}
                  onClick={() => setOpen(false)}
                  className="font-display uppercase tracking-widest2 text-lg"
                >
                  {l.label}
                </a>
              ))}
              <Link
                to="/giving"
                onClick={() => setOpen(false)}
                className="btn-primary self-start"
              >
                Give
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
