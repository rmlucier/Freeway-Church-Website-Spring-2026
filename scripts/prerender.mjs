// Build-time pre-rendering.
//
// Runs after `vite build`. Renders each public page to real HTML so search
// engines, link previews and AI crawlers that don't run JavaScript still get
// the page's text, title and description. The browser then attaches React to
// that HTML (see src/main.jsx).
//
// Output in dist/:
//   index.html, visit/index.html, ...  one real HTML file per public page
//   404.html                           served by Vercel (with a 404 status) for unknown URLs
//   shell.html                         empty app shell for the client-only Flight School tools
//                                      (vercel.json rewrites those routes to it)
import { build } from 'vite';
import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const dist = path.join(root, 'dist');
const ssrOut = path.join(root, 'dist-ssr');

// route → { output file, page module (for preloading its code and CSS) }
// Adding a public page? Add it here, in src/App.jsx and in public/sitemap.xml.
const PAGES = [
  { route: '/', file: 'index.html', module: 'src/pages/Home.jsx' },
  { route: '/visit', file: 'visit/index.html', module: 'src/pages/Visit.jsx' },
  { route: '/kids', file: 'kids/index.html', module: 'src/pages/Kids.jsx' },
  { route: '/beliefs', file: 'beliefs/index.html', module: 'src/pages/Beliefs.jsx' },
  { route: '/giving', file: 'giving/index.html', module: 'src/pages/Giving.jsx' },
  { route: '/academy', file: 'academy/index.html', module: 'src/pages/Academy.jsx' },
  { route: '/flight-school', file: 'flight-school/index.html', module: 'src/pages/FlightSchool.jsx' },
  { route: '/privacy', file: 'privacy/index.html', module: 'src/pages/Privacy.jsx' },
  { route: '/404', file: '404.html', module: 'src/pages/NotFound.jsx' },
];

const HEAD_MARK = '<!--app-head-->';
const HTML_MARK = '<!--app-html-->';
const HERO_PRELOAD = /\s*<link rel="preload" as="image" href="\/images\/hero\.jpg"[^>]*>/;

// Tags that let the browser fetch the page's own code and CSS straight away
// instead of waiting for the main bundle to ask for them.
function preloadTags(manifest, moduleId) {
  const seen = new Set();
  const js = [];
  const css = [];
  const visit = (id) => {
    if (seen.has(id) || !manifest[id]) return;
    seen.add(id);
    const chunk = manifest[id];
    // The main bundle and its CSS are already in the page.
    if (chunk.isEntry) return;
    js.push(chunk.file);
    (chunk.css || []).forEach((file) => css.push(file));
    (chunk.imports || []).forEach(visit);
  };
  visit(moduleId);
  return [
    ...css.map((file) => `<link rel="stylesheet" href="/${file}">`),
    ...js.map((file) => `<link rel="modulepreload" crossorigin href="/${file}">`),
  ];
}

function count(html, pattern) {
  return (html.match(pattern) || []).length;
}

async function main() {
  await build({
    root,
    logLevel: 'warn',
    build: { ssr: 'src/entry-server.jsx', outDir: ssrOut, emptyOutDir: true },
    ssr: { noExternal: ['react-helmet-async'] },
  });

  const template = await fs.readFile(path.join(dist, 'index.html'), 'utf8');
  if (!template.includes(HEAD_MARK) || !template.includes(HTML_MARK)) {
    throw new Error('index.html is missing the pre-render markers');
  }
  const manifest = JSON.parse(
    await fs.readFile(path.join(dist, '.vite', 'manifest.json'), 'utf8')
  );
  const { render } = await import(pathToFileURL(path.join(ssrOut, 'entry-server.js')).href);

  // Empty shell for the routes that stay client-rendered.
  await fs.writeFile(
    path.join(dist, 'shell.html'),
    template
      .replace(HEAD_MARK, '<title>Freeway Church</title>')
      .replace(HERO_PRELOAD, '')
      .replace(HTML_MARK, '')
  );

  for (const page of PAGES) {
    const { html, helmet } = await render(page.route);
    const head = [
      helmet.title.toString(),
      helmet.meta.toString(),
      helmet.link.toString(),
      helmet.script.toString(),
      ...preloadTags(manifest, page.module),
    ]
      .filter(Boolean)
      .join('\n    ');
    // Only the home page shows the hero image, so only it should preload it.
    // WONDER: while the Christmas slider is up, its own image is preloaded instead.
    const showsHero = page.route === '/' && !html.includes('wonder-slider');
    const base = showsHero ? template : template.replace(HERO_PRELOAD, '');
    const out = base.replace(HEAD_MARK, head).replace(HTML_MARK, html);

    // Fail the build rather than ship a page that would hurt search results.
    const problems = [];
    if (count(out, /<title[ >]/g) !== 1) problems.push('needs exactly one <title>');
    if (count(out, /<meta[^>]+name="description"/g) !== 1) problems.push('needs exactly one meta description');
    if (count(out, /<link[^>]+rel="canonical"/g) !== 1) problems.push('needs exactly one canonical link');
    if (count(out, /<h1[ >]/g) < 1) problems.push('has no <h1>, so the page body did not render');
    if (problems.length) throw new Error(`${page.route}: ${problems.join('; ')}`);

    const target = path.join(dist, page.file);
    await fs.mkdir(path.dirname(target), { recursive: true });
    await fs.writeFile(target, out);
    console.log(`pre-rendered ${page.route.padEnd(15)} → dist/${page.file} (${(out.length / 1024).toFixed(0)} kB)`);
  }

  // Build leftovers that shouldn't be published.
  await fs.rm(ssrOut, { recursive: true, force: true });
  await fs.rm(path.join(dist, '.vite'), { recursive: true, force: true });
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
