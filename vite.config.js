import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  // The manifest lets scripts/prerender.mjs find each page's code and CSS files.
  build: { manifest: true },
});
