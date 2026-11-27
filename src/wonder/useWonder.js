import { useEffect, useState } from 'react';
import { isWonderOn } from './config.js';

// Pages are pre-rendered at build time (scripts/prerender.mjs), so the first
// render uses the build date — the same answer on the server and in the
// browser, so hydration matches. After mount we re-check with the visitor's
// real date, so a build made before Dec 29 still turns Wonder off on time.
// __WONDER_BUILD_TIME__ is set in vite.config.js.
const BUILD_TIME =
  typeof __WONDER_BUILD_TIME__ !== 'undefined' ? new Date(__WONDER_BUILD_TIME__) : new Date();

export default function useWonder() {
  const [on, setOn] = useState(() => isWonderOn(BUILD_TIME));
  useEffect(() => {
    setOn(isWonderOn());
  }, []);
  return on;
}
