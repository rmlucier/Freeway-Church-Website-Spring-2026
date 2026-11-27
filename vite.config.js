import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  // The manifest lets scripts/prerender.mjs find each page's code and CSS files.
  build: { manifest: true },
  // WONDER: build date, so pre-rendered pages and the browser agree on whether
  // the Christmas takeover is on (see src/wonder/useWonder.js).
  define: { __WONDER_BUILD_TIME__: JSON.stringify(new Date().toISOString()) },
});
