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
- `src/components/Placeholder.jsx` — labeled image stubs used everywhere real images will eventually live
- `src/components/{Nav,Hero,Vision,Pillars,Community,Services,Sermons,JoinCTA,Footer}.jsx` — section components
- `tailwind.config.js` — brand tokens (`fc-black`, `fc-teal`, `fc-gold`, `fc-cream`) and Barlow Condensed
- `vercel.json` — SPA rewrite

## Brand tokens
- Dark: `#1C1C1C` (`fc-black`)
- Teal: `#009B8D` (`fc-teal`)
- Gold: `#B5922A` (`fc-gold`)
- Cream: `#F5F1E8` (`fc-cream`)
- Display: Barlow Condensed. Body: Inter.

## TODO
- Swap Placeholder components for real photos/video (each has a descriptive label)
- Add `public/og-image.jpg` for social sharing
- Add `public/favicon.png`
- Point `freeway.church` DNS at Vercel after GoDaddy migration
- Consider `/sermons` archive route if a full message archive is wanted
- Lazy-load images once real assets are in
