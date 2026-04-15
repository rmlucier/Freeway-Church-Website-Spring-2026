import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

/**
 * Handles scroll on route change:
 *   - If the URL has a hash (e.g. /#community), smooth-scroll to that element
 *     once it's mounted. Retries briefly to cover late renders / lazy images.
 *   - Otherwise, jump to the top of the page.
 */
export default function ScrollToHash() {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (!hash) {
      window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
      return;
    }

    const id = decodeURIComponent(hash.replace('#', ''));
    let cancelled = false;
    const deadline = Date.now() + 1500; // give slow mounts time

    const tick = () => {
      if (cancelled) return;
      const el = document.getElementById(id);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'start' });
        return;
      }
      if (Date.now() < deadline) {
        requestAnimationFrame(tick);
      }
    };

    // One frame in, to let the route's first paint happen
    const raf = requestAnimationFrame(tick);
    return () => {
      cancelled = true;
      cancelAnimationFrame(raf);
    };
  }, [pathname, hash]);

  return null;
}
