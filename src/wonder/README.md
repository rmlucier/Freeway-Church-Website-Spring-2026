# Wonder — Christmas 2026 takeover

A removable layer on top of the regular site for the "Wonder" series
(Sundays Nov 29 – Dec 27, 2026, plus Christmas Eve).

## On / off

`src/wonder/config.js`:

```js
export const WONDER_ENABLED = true;   // false = today's site, exactly
export const WONDER_LAST_DAY = '2026-12-28'; // off automatically from Dec 29 (Detroit time)
export const CHRISTMAS_EVE_TIME = '[CHRISTMAS EVE TIME]'; // set once confirmed
```

The date check runs at build time (for the pre-rendered HTML) and again in the
browser, so an old build still turns itself off on Dec 29. Rebuild/redeploy after
Christmas anyway so the pre-rendered pages are clean.

## What's in here

| File | What it does |
| --- | --- |
| `config.js` | The switch, end date, Christmas Eve time, series list |
| `useWonder.js` | Hook every touch point uses: `const wonder = useWonder()` |
| `WonderHead.jsx` | Loads Pacifico / Lilita One / Nunito and adds the Christmas Eve schema.org event (only while Wonder is on) |
| `HeroSlider.jsx` | 2-slide homepage hero: Wonder slide + the regular hero, unchanged |
| `SeriesStrip.jsx` | Series strip under the hero (`#wonder`, `#christmas-eve`) |
| `Touches.jsx` | Nav pill, peeking sheep, Next Steps star, footer twinkles, chain strip, hills, footer line |
| `wonder.css` | Every Wonder style |
| `public/images/wonder/` | Hero images (re-rendered from the series canvas), SVGs from the illustration kit, sky and grain tiles |

## Touch points in existing files (each marked `WONDER`)

- `src/App.jsx` — `{wonder && <WonderHead />}`
- `src/pages/Home.jsx` — hero wrapped in `<HeroSlider>`, `{wonder && <SeriesStrip />}`
- `src/components/Nav.jsx` — `{wonder && <WonderNavPill />}` (desktop + mobile menu)
- `src/components/Services.jsx` — `{wonder && <WonderSheep />}`
- `src/components/JoinCTA.jsx` — `{wonder && <WonderStar />}`
- `src/components/Footer.jsx` — `wonder-footer` class + chain, twinkles, line, hills
- `vite.config.js` — `__WONDER_BUILD_TIME__` define
- `scripts/prerender.mjs` — skips the old hero.jpg preload while the slider is up

## After Christmas

- `public/llms.txt` has a "Christmas 2026: Wonder" section. It's a static file the flag can't switch off, so delete that section when you turn Wonder off.

## Removing it for good

Delete `src/wonder/` and `public/images/wonder/`, then remove the lines above.
