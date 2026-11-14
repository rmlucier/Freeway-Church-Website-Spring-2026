# Freeway Church — Spring 2026

Single-page site for Freeway Church (Albion, MI). React + Vite + Tailwind v3 + Framer Motion. Deploys to Vercel.

## Run locally
```bash
npm install
npm run dev
```

## Build
```bash
npm run build
npm run preview
```

## Structure
- `src/App.jsx` — top-level composition, renders all sections in order
- `src/components/{Nav,Hero,Vision,Pillars,Community,Services,Sermons,JoinCTA,Footer}.jsx` — section components
- `public/images/` — real photos (hero, community, building, youtube-stage)
- `tailwind.config.js` — brand tokens (`fc-black`, `fc-teal`, `fc-gold`, `fc-cream`) and Barlow Condensed
- `vercel.json` — security headers, redirects for retired pages, and rewrites that send the Flight School tool routes to the app shell
- `scripts/prerender.mjs` — runs after `vite build` and writes real HTML for each public page (plus `404.html`), so search engines and AI crawlers get the page text without running JavaScript. When you add a public page, add it to the list in this script, to `src/App.jsx` and to `public/sitemap.xml`
- `public/llms.txt` — plain-text summary of the church for AI tools. Keep the times and contact details in sync with the site

## Brand tokens
- Dark: `#1C1C1C` (`fc-black`)
- Teal: `#009B8D` (`fc-teal`)
- Gold: `#B5922A` (`fc-gold`)
- Cream: `#F5F1E8` (`fc-cream`)
- Display: Barlow Condensed. Body: Inter.

## TODO
- Point `freeway.church` DNS at Vercel after GoDaddy migration
- Consider `/sermons` archive route if a full message archive is wanted
