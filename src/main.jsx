import React from 'react';
import ReactDOM from 'react-dom/client';
import { HelmetProvider } from 'react-helmet-async';
import App from './App.jsx';
import './index.css';

const root = document.getElementById('root');
const app = (
  <React.StrictMode>
    <HelmetProvider>
      <App />
    </HelmetProvider>
  </React.StrictMode>
);

// Public pages are pre-rendered to HTML at build time (scripts/prerender.mjs),
// so the browser attaches to that markup. Pages served from the empty app shell
// (the Flight School tools, and local dev) render from scratch.
if (root.firstElementChild) {
  ReactDOM.hydrateRoot(root, app);
} else {
  ReactDOM.createRoot(root).render(app);
}
