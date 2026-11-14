import { useEffect, useState } from 'react';
import { useReducedMotion } from 'framer-motion';

// The pages are pre-rendered to HTML at build time, where there is no browser
// to ask about motion preferences. Report "no preference" for the first render
// so the browser's first paint matches the pre-rendered HTML, then switch to
// the visitor's real setting.
export default function useReducedMotionSafe() {
  const reduce = useReducedMotion();
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  return mounted && Boolean(reduce);
}
