import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link, useLocation } from 'react-router-dom';
import { useWonder, WonderNavPill } from '../wonder/index.js'; // WONDER

// Top bar: what visitors and regulars need most. Keep this list short.
const links = [
  { label: 'Plan a Visit', to: '/visit' },
  { label: 'Kids', to: '/kids' },
  { label: 'Messages', to: '/#sermons' },
];

// Everything else lives under "More" (listed in full on the mobile menu).
const moreLinks = [
  { label: 'Beliefs', to: '/beliefs' },
  { label: 'Coaching', to: '/#coaching' },
  { label: 'Academy', to: '/academy' },
];

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [moreOpen, setMoreOpen] = useState(false);
  const moreRef = useRef(null);
  const moreButtonRef = useRef(null);
  const location = useLocation();
  const onHome = location.pathname === '/';
  const wonder = useWonder(); // WONDER

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Close both menus whenever the route changes
  useEffect(() => {
    setOpen(false);
    setMoreOpen(false);
  }, [location.pathname, location.hash]);

  // Close "More" on an outside click or Escape
  useEffect(() => {
    if (!moreOpen) return undefined;
    const onPointerDown = (e) => {
      if (!moreRef.current?.contains(e.target)) setMoreOpen(false);
    };
    const onKeyDown = (e) => {
      if (e.key !== 'Escape') return;
      setMoreOpen(false);
      moreButtonRef.current?.focus();
    };
    document.addEventListener('pointerdown', onPointerDown);
    document.addEventListener('keydown', onKeyDown);
    return () => {
      document.removeEventListener('pointerdown', onPointerDown);
      document.removeEventListener('keydown', onKeyDown);
    };
  }, [moreOpen]);

  const linkClass =
    'font-display uppercase tracking-widest2 text-sm text-fc-cream/80 hover:text-fc-teal transition-colors whitespace-nowrap';
  const mobileLinkClass = 'font-display uppercase tracking-widest2 text-lg';
  // Flight School campaign tab. Yellow is the Flight School accent, so the tab
  // stands out while the campaign runs. Remove this tab when the campaign ends.
  const flightSchoolClass =
    'font-display uppercase tracking-widest2 text-[#FFD23F] hover:text-[#FF9A2E] transition-colors whitespace-nowrap';

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${
        scrolled || !onHome ? 'bg-fc-black/90 backdrop-blur-md border-b border-fc-cream/10' : 'bg-transparent'
      }`}
    >
      <div className="container-fc flex items-center justify-between h-20">
        <Link to="/" aria-label="Freeway Church — home" className="block shrink-0">
          <img
            src="/images/logo-horizontal-white.png"
            alt="Freeway Church"
            width="2079"
            height="183"
            // The wordmark is ~11:1, so on phones it must stay short enough to
            // leave room for the menu button.
            className="h-6 sm:h-8 lg:h-6 xl:h-8 2xl:h-9 w-auto max-w-[calc(100vw-7rem)]"
          />
        </Link>

        <nav className="hidden lg:flex items-center gap-6 xl:gap-10">
          {links.map((l) => (
            <Link key={l.label} to={l.to} className={linkClass}>
              {l.label}
            </Link>
          ))}
          <Link to="/flight-school" className={`${flightSchoolClass} text-sm`}>
            Flight School
          </Link>
          <div
            ref={moreRef}
            className="relative"
            onBlur={(e) => {
              if (e.relatedTarget && !e.currentTarget.contains(e.relatedTarget)) setMoreOpen(false);
            }}
          >
            <button
              ref={moreButtonRef}
              type="button"
              onClick={() => setMoreOpen((v) => !v)}
              aria-expanded={moreOpen}
              aria-controls="nav-more"
              className={`${linkClass} inline-flex items-center gap-2 py-2`}
            >
              More
              <svg
                viewBox="0 0 12 8"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                aria-hidden="true"
                className={`h-2 w-3 transition-transform ${moreOpen ? 'rotate-180' : ''}`}
              >
                <path d="M1 1.5 6 6.5 11 1.5" />
              </svg>
            </button>
            {/* Always in the HTML so search engines see the links */}
            <div
              id="nav-more"
              className={`absolute right-0 top-full mt-3 min-w-[11rem] border border-fc-cream/15 bg-fc-black py-2 transition-all duration-200 ${
                moreOpen ? 'visible opacity-100 translate-y-0' : 'invisible opacity-0 -translate-y-1'
              }`}
            >
              {moreLinks.map((l) => (
                <Link
                  key={l.label}
                  to={l.to}
                  onClick={() => setMoreOpen(false)}
                  className={`${linkClass} block px-5 py-3`}
                >
                  {l.label}
                </Link>
              ))}
            </div>
          </div>
          {wonder && <WonderNavPill />}
          <Link to="/giving" className="btn-primary">
            Give
          </Link>
        </nav>

        <button
          onClick={() => setOpen((v) => !v)}
          aria-label="Menu"
          aria-expanded={open}
          className="lg:hidden flex flex-col gap-1.5 p-2"
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
            className="lg:hidden overflow-hidden bg-fc-black border-t border-fc-cream/10"
          >
            <div className="container-fc py-6 flex flex-col gap-5">
              {links.map((l) => (
                <Link key={l.label} to={l.to} className={mobileLinkClass}>
                  {l.label}
                </Link>
              ))}
              <Link to="/flight-school" className={`${flightSchoolClass} text-lg`}>
                Flight School
              </Link>
              {moreLinks.map((l) => (
                <Link
                  key={l.label}
                  to={l.to}
                  onClick={() => setOpen(false)}
                  className={`${mobileLinkClass} text-fc-cream/70`}
                >
                  {l.label}
                </Link>
              ))}
              {wonder && <WonderNavPill className="self-start" />}
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
