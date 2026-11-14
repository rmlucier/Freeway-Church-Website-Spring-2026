import { Writable } from 'node:stream';
import React from 'react';
import { renderToPipeableStream } from 'react-dom/server';
import { StaticRouter } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { AppContent } from './App.jsx';

// Build-time only. Renders one route to an HTML string plus its <head> tags.
// Used by scripts/prerender.mjs; never shipped to the browser.
export function render(url) {
  const helmetContext = {};
  return new Promise((resolve, reject) => {
    let html = '';
    const sink = new Writable({
      write(chunk, _encoding, callback) {
        html += chunk.toString();
        callback();
      },
      final(callback) {
        resolve({ html, helmet: helmetContext.helmet });
        callback();
      },
    });
    const { pipe } = renderToPipeableStream(
      <React.StrictMode>
        <HelmetProvider context={helmetContext}>
          <StaticRouter location={url}>
            <AppContent />
          </StaticRouter>
        </HelmetProvider>
      </React.StrictMode>,
      {
        // Wait for the lazy-loaded page to finish so the full page is in the HTML.
        onAllReady() {
          pipe(sink);
        },
        onError: reject,
      }
    );
  });
}
