import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link, useLocation } from 'react-router-dom';

// Unified nav links.
//   type: 'page'    → dedicated route (e.g. /visit)
//   type: 'section' → homepage section anchor (e.g. /#community)
// Both resolve through React Router + ScrollToHash so behavior is
// consistent whether you're on the home page or somewhere else.
const links = [
  { label: 'Visit', to: '/visit', type: 'page' },
  { label: 'Kids', to: '/kids', type: 'page' },
  { label: 'Beliefs', to: '/beliefs', type: 'page' },
  { label: 'Community', to: '/#community', type: 'section' },
  { label: 'Coaching', to: '/#coaching', type: 'section' },
  { label: 'Messages', to: '/#sermons', type: 'section' },
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

  // Close mobile menu whenever the route changes
  useEffect(() => {
    setOpen(false);
  }, [location.pathname, location.hash]);

  const linkClass =
    'font-display uppercase tracking-widest2 text-sm text-fc-cream/80 hover:text-fc-teal transition-colors';
  const mobileLinkClass = 'font-display uppercase tracking-widest2 text-lg';

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
            <Link key={l.label} to={l.to} className={linkClass}>
              {l.label}
            </Link>
          ))}
          <Link to="/giving" className="btn-primary">
            Give
          </Link>

          {/* FreeWay Leadership Academy — a discreet paper-plane icon with a
              hover tooltip, echoing the Academy logo. Keeps the page out of the
              main text nav while still being reachable from anywhere. */}
          <div className="relative group flex items-center">
            <Link
              to="/academy"
              aria-label="FreeWay Leadership Academy"
              className="relative flex h-10 w-10 items-center justify-center rounded-full text-fc-gold transition-colors duration-300 hover:text-fc-gold-soft focus:outline-none focus-visible:ring-2 focus-visible:ring-fc-gold focus-visible:ring-offset-2 focus-visible:ring-offset-fc-black"
            >
              {/* The dotted flight-path, as a ring that slowly circles the plane */}
              <span
                aria-hidden="true"
                className="absolute inset-0 rounded-full border border-dashed border-fc-gold/40 transition-colors group-hover:border-fc-gold/80 motion-safe:animate-[spin_20s_linear_infinite]"
              />
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
                className="relative h-5 w-5 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
              >
                <path d="M22 2 11 13" />
                <path d="M22 2 15 22 11 13 2 9z" />
              </svg>
            </Link>
            <span
              role="tooltip"
              className="pointer-events-none absolute top-full right-0 mt-2 whitespace-nowrap rounded-md border border-fc-cream/15 bg-fc-black/95 px-3 py-1.5 font-display uppercase tracking-widest2 text-xs text-fc-cream opacity-0 translate-y-1 transition-all duration-200 group-hover:opacity-100 group-hover:translate-y-0"
            >
              FreeWay Academy
            </span>
          </div>
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
                <Link key={l.label} to={l.to} className={mobileLinkClass}>
                  {l.label}
                </Link>
              ))}
              <Link
                to="/academy"
                className={`${mobileLinkClass} inline-flex items-center gap-2 text-fc-gold`}
              >
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                  className="h-5 w-5"
                >
                  <path d="M22 2 11 13" />
                  <path d="M22 2 15 22 11 13 2 9z" />
                </svg>
                Academy
              </Link>
              <Link to="/giving" className="btn-primary self-start">
                Give
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
