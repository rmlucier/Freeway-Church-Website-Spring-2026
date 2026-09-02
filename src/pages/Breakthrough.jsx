import { motion } from 'framer-motion';
import SEO from '../components/SEO.jsx';

// Month of Breakthrough — Freeway Church, September 2026
// This page runs its own brand system (dark #0A0A0A ground, teal #6FA8A2
// accents, Anton hammer type, Bebas kickers, corner brackets). Intentionally
// separate from the main site's fc-* tokens.

const PRAYER_FORM_URL = 'https://forms.gle/3kVhufpow498Tr3K9';

const wednesdays = ['Sept 2', 'Sept 9', 'Sept 16', 'Sept 23', 'Sept 30'];

const fronts = [
  {
    n: '01',
    title: 'Pastors Roy & Elissa',
    body: 'Leadership and Vision. Protection over their family. God-encounters that shape every message and every meeting.',
  },
  {
    n: '02',
    title: 'Kids in Our Region',
    body: 'Schools. Mental health. Freedom from what is dragging them down. God-encounters that mark a whole generation.',
  },
  {
    n: '03',
    title: 'Marriages & Relationships',
    body: 'Healing where there is wound. Honesty where there is hiding. Forgiveness where there is bitterness. Life where there is death.',
  },
  {
    n: '04',
    title: 'Jobs & Finances',
    body: 'Provision. Integrity in every transaction. Favor with the right people. Purpose that outlasts a paycheck.',
  },
];

const fasts = [
  { name: 'One Meal', body: 'Skip a single meal each day and pray during that time.' },
  { name: 'Sunrise to Sundown', body: 'Water only from sunup to sundown. Break the fast with dinner.' },
  { name: 'Daniel', body: 'Fruit, vegetables, and water only — no meat, dairy, sweets, or bread.' },
  { name: 'One Food', body: 'Cut a specific food you rely on (coffee, sugar, meat) for the whole month.' },
  { name: 'Media', body: 'Fast from social, streaming, or news — spend that time in prayer or scripture.' },
  { name: 'Combination', body: 'Pair a food fast with a media fast. Two altars, one focus.' },
];

// Corner brackets used to frame headline blocks — the signature poster motif.
function CornerBrackets({ children, className = '' }) {
  return (
    <div className={`relative inline-block ${className}`}>
      <span aria-hidden className="absolute -left-4 md:-left-6 top-0 h-4 w-4 md:h-6 md:w-6 border-l-2 border-t-2 border-brk-teal" />
      <span aria-hidden className="absolute -left-4 md:-left-6 bottom-0 h-4 w-4 md:h-6 md:w-6 border-l-2 border-b-2 border-brk-teal" />
      <span aria-hidden className="absolute -right-4 md:-right-6 top-0 h-4 w-4 md:h-6 md:w-6 border-r-2 border-t-2 border-brk-teal" />
      <span aria-hidden className="absolute -right-4 md:-right-6 bottom-0 h-4 w-4 md:h-6 md:w-6 border-r-2 border-b-2 border-brk-teal" />
      <div className="px-2 md:px-4">{children}</div>
    </div>
  );
}

export default function Breakthrough() {
  return (
    <main className="pt-28 bg-brk-black text-brk-cream">
      <SEO
        path="/prayer"
        title="Month of Breakthrough · September 2026"
        description="A month of prayer and fasting for personal revival with Jesus. Wednesdays 6:30–7:30 PM at Freeway Church, Albion, MI. Submit a prayer request and download the prayer guide."
        image="https://freeway.church/breakthrough/poster_p1_prayer_trio.jpg"
      />

      {/* Hero — full-bleed poster background */}
      <section className="relative min-h-[90vh] flex items-center overflow-hidden">
        <img
          src="/breakthrough/poster_p1_prayer_trio.jpg"
          alt=""
          aria-hidden="true"
          className="absolute inset-0 h-full w-full object-cover grayscale contrast-125"
          fetchpriority="high"
        />
        {/* Bottom-to-top dark wash for text legibility */}
        <div className="absolute inset-0 bg-gradient-to-t from-brk-black via-brk-black/85 to-brk-black/50" />
        <div className="absolute inset-0 bg-brk-black/30" />

        <div className="container-fc relative z-10 py-20 md:py-28">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: [0.2, 0.8, 0.2, 1] }}
            className="max-w-4xl"
          >
            <p className="font-bebas text-brk-teal tracking-[0.4em] text-sm md:text-base mb-6">
              MONTH OF
            </p>
            <div className="mb-8">
              <CornerBrackets>
                <h1
                  className="font-anton text-brk-cream text-[3.5rem] sm:text-7xl md:text-9xl leading-[0.85] tracking-tight"
                  style={{ textShadow: '0 2px 20px rgba(0,0,0,0.6)' }}
                >
                  BREAKTHROUGH
                </h1>
              </CornerBrackets>
            </div>
            <p className="font-bebas text-brk-teal-muted tracking-[0.3em] text-sm md:text-lg mb-10 mt-2">
              PRAYER · FASTING · SEPTEMBER 2026
            </p>

            <div className="flex flex-wrap gap-4 items-center">
              <a
                href={PRAYER_FORM_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-3 bg-brk-teal text-brk-black font-bebas tracking-[0.2em] text-sm md:text-base px-8 py-4 hover:bg-brk-cream transition-colors"
              >
                SUBMIT A PRAYER REQUEST
                <span aria-hidden>→</span>
              </a>
            </div>

            <div className="mt-12 flex flex-wrap gap-x-8 gap-y-3 font-bebas tracking-[0.25em] text-xs md:text-sm text-brk-gray">
              <span><span className="text-brk-cream">WEDNESDAYS</span> · 6:30–7:30 PM</span>
              <span><span className="text-brk-cream">FREEWAY CHURCH</span> · ALBION, MI</span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Why This Month */}
      <section className="py-24 md:py-36 border-t border-brk-teal/20">
        <div className="container-fc">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.7 }}
            className="max-w-3xl"
          >
            <p className="font-bebas text-brk-teal tracking-[0.4em] text-xs md:text-sm mb-8">
              WHY THIS MONTH
            </p>
            <h2 className="font-anton text-4xl md:text-7xl leading-[0.95] text-brk-cream mb-10">
              PERSONAL REVIVAL.<br />
              <span className="text-brk-teal">WITH JESUS.</span>
            </h2>
            <p className="text-lg md:text-2xl text-brk-cream/90 leading-snug mb-6 font-bebas tracking-wide">
              Dead things raised. Desire for God.
            </p>
            <p className="text-lg md:text-2xl text-brk-teal leading-snug font-bebas tracking-wide">
              The breakthrough of getting more of Jesus.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Wednesday Nights */}
      <section className="py-24 md:py-36 border-t border-brk-teal/20 bg-brk-black">
        <div className="container-fc">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.6 }}
            className="grid md:grid-cols-12 gap-10 md:gap-16 items-start"
          >
            <div className="md:col-span-5">
              <p className="font-bebas text-brk-teal tracking-[0.4em] text-xs md:text-sm mb-8">
                EVERY WEDNESDAY
              </p>
              <h2 className="font-anton text-4xl md:text-6xl leading-[0.95] text-brk-cream mb-6">
                6:30<span className="text-brk-teal">–</span>7:30 PM
              </h2>
              <p className="text-brk-gray text-sm md:text-base leading-relaxed max-w-md font-bebas tracking-wide">
                Corporate prayer over the four fronts. Praying for one another by name.
                You don&apos;t need to prepare — just be in the room.
              </p>
            </div>
            <div className="md:col-span-7">
              <ul className="divide-y divide-brk-teal/20 border-t border-b border-brk-teal/20">
                {wednesdays.map((date, i) => (
                  <motion.li
                    key={date}
                    initial={{ opacity: 0, x: -12 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, margin: '-60px' }}
                    transition={{ duration: 0.4, delay: i * 0.06 }}
                    className="flex items-baseline justify-between py-5 md:py-6"
                  >
                    <span className="font-bebas text-brk-teal tracking-[0.3em] text-xs md:text-sm">
                      WEEK 0{i + 1}
                    </span>
                    <span className="font-anton text-brk-cream text-2xl md:text-4xl">
                      {date.toUpperCase()}
                    </span>
                  </motion.li>
                ))}
              </ul>
              <p className="mt-6 font-bebas tracking-[0.2em] text-xs text-brk-gray">
                FREEWAY CHURCH · 28900 B DR N · ALBION, MI
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Four Fronts */}
      <section className="py-24 md:py-36 border-t border-brk-teal/20">
        <div className="container-fc">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.6 }}
            className="max-w-3xl mb-14 md:mb-20"
          >
            <p className="font-bebas text-brk-teal tracking-[0.4em] text-xs md:text-sm mb-8">
              THE FOUR FRONTS
            </p>
            <h2 className="font-anton text-4xl md:text-7xl leading-[0.95] text-brk-cream">
              WHAT WE&apos;RE<br />
              <span className="text-brk-teal">PRAYING FOR.</span>
            </h2>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: '-80px' }}
            variants={{ hidden: {}, show: { transition: { staggerChildren: 0.08 } } }}
            className="grid md:grid-cols-2 gap-0 border-t border-l border-brk-teal/20"
          >
            {fronts.map((f) => (
              <motion.div
                key={f.n}
                variants={{
                  hidden: { opacity: 0, y: 16 },
                  show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
                }}
                className="border-r border-b border-brk-teal/20 p-8 md:p-12"
              >
                <div className="font-bebas text-brk-teal tracking-[0.4em] text-xs mb-4">
                  {f.n}
                </div>
                <h3 className="font-anton text-2xl md:text-4xl leading-none mb-5 text-brk-cream">
                  {f.title.toUpperCase()}
                </h3>
                <p className="text-brk-gray leading-relaxed text-sm md:text-base">
                  {f.body}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* How to Fast */}
      <section className="py-24 md:py-36 border-t border-brk-teal/20 bg-brk-black">
        <div className="container-fc">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.6 }}
            className="max-w-3xl mb-14"
          >
            <p className="font-bebas text-brk-teal tracking-[0.4em] text-xs md:text-sm mb-8">
              HOW TO FAST
            </p>
            <h2 className="font-anton text-4xl md:text-7xl leading-[0.95] text-brk-cream mb-8">
              PICK A LANE.<br />
              <span className="text-brk-teal">SHOW UP.</span>
            </h2>
            <p className="text-brk-gray leading-relaxed max-w-2xl">
              The point of fasting isn&apos;t hunger — it&apos;s attention. Any of the
              lanes below re-orients your day toward prayer. Pick one. Tell someone.
              Start.
            </p>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: '-80px' }}
            variants={{ hidden: {}, show: { transition: { staggerChildren: 0.06 } } }}
            className="grid sm:grid-cols-2 md:grid-cols-3 gap-0 border-t border-l border-brk-teal/20"
          >
            {fasts.map((f) => (
              <motion.div
                key={f.name}
                variants={{
                  hidden: { opacity: 0, y: 12 },
                  show: { opacity: 1, y: 0, transition: { duration: 0.4 } },
                }}
                className="border-r border-b border-brk-teal/20 p-6 md:p-8"
              >
                <h3 className="font-anton text-xl md:text-2xl leading-none mb-3 text-brk-teal">
                  {f.name.toUpperCase()}
                </h3>
                <p className="text-brk-gray text-sm leading-relaxed">{f.body}</p>
              </motion.div>
            ))}
          </motion.div>

        </div>
      </section>

      {/* Final CTA */}
      <section className="py-24 md:py-40 border-t border-brk-teal/20 relative overflow-hidden">
        <img
          src="/breakthrough/poster_p4_worship_hands.jpg"
          alt=""
          aria-hidden="true"
          className="absolute inset-0 h-full w-full object-cover opacity-25 grayscale"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-brk-black via-brk-black/80 to-brk-black" />

        <div className="container-fc relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.7 }}
            className="max-w-3xl"
          >
            <div className="mb-10">
              <CornerBrackets>
                <h2 className="font-anton text-5xl md:text-8xl leading-[0.85] text-brk-cream">
                  YOUR TURN.
                </h2>
              </CornerBrackets>
            </div>
            <p className="font-bebas text-brk-teal-muted tracking-[0.25em] text-sm md:text-base mb-10">
              WRITE ONE PRAYER. WE&apos;LL CARRY IT WITH YOU.
            </p>
            <a
              href={PRAYER_FORM_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 bg-brk-teal text-brk-black font-bebas tracking-[0.2em] text-sm md:text-base px-10 py-5 hover:bg-brk-cream transition-colors"
            >
              SUBMIT A PRAYER REQUEST
              <span aria-hidden>→</span>
            </a>
            <p className="mt-10 font-bebas tracking-[0.25em] text-xs text-brk-gray">
              FREEWAY CHURCH · ALBION, MI · SEPTEMBER 2026
            </p>
          </motion.div>
        </div>
      </section>
    </main>
  );
}
