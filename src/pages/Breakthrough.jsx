import { useRef } from 'react';
import { motion, useScroll, useTransform, useReducedMotion } from 'framer-motion';
import SEO from '../components/SEO.jsx';

// Month of Breakthrough — Freeway Church, September 2026
// Runs on the main site's brand system: fc-black ground, fc-teal / fc-gold
// accents, Barlow Condensed display type, Inter body. Animations mirror the
// homepage (hero parallax, word-stagger reveal, in-view section fades).

const PRAYER_FORM_URL = 'https://forms.gle/3kVhufpow498Tr3K9';

const wednesdays = ['Sept 2', 'Sept 9', 'Sept 16', 'Sept 23', 'Sept 30'];

const fronts = [
  {
    n: '01',
    title: 'Pastors Roy & Elissa',
    body: 'Leadership and vision. Protection over their family. God-encounters that shape every message and every meeting.',
  },
  {
    n: '02',
    title: 'Kids & Youth Ministry',
    body: 'Pastor Jennae and every kid and teen in our care. The Freeway Leadership Academy launches Wednesday nights, starting September 30 — a generation learning to follow Jesus and lead the way.',
  },
  {
    n: '03',
    title: 'Marriages & Relationships',
    body: 'Healing where there is wound. Honesty where there is hiding. Forgiveness where there is bitterness. Life where there is death.',
  },
  {
    n: '04',
    title: 'Unity Within the Church',
    body: 'One church of one heart and mind. Walls down, honesty up — that we would become a true New Testament community, devoted to one another, breaking bread, sharing life.',
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

// Word-by-word reveal — same motion as the homepage Vision statement.
const revealContainer = {
  hidden: {},
  show: { transition: { staggerChildren: 0.03, delayChildren: 0.1 } },
};
const revealWord = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.2, 0.8, 0.2, 1] } },
};

// Corner brackets used to frame the two headline blocks.
function CornerBrackets({ children, className = '' }) {
  return (
    <div className={`relative inline-block ${className}`}>
      <span aria-hidden className="absolute -left-4 md:-left-6 top-0 h-4 w-4 md:h-6 md:w-6 border-l-2 border-t-2 border-fc-teal" />
      <span aria-hidden className="absolute -left-4 md:-left-6 bottom-0 h-4 w-4 md:h-6 md:w-6 border-l-2 border-b-2 border-fc-teal" />
      <span aria-hidden className="absolute -right-4 md:-right-6 top-0 h-4 w-4 md:h-6 md:w-6 border-r-2 border-t-2 border-fc-teal" />
      <span aria-hidden className="absolute -right-4 md:-right-6 bottom-0 h-4 w-4 md:h-6 md:w-6 border-r-2 border-b-2 border-fc-teal" />
      <div className="px-2 md:px-4">{children}</div>
    </div>
  );
}

export default function Breakthrough() {
  const heroRef = useRef(null);
  const prefersReducedMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ['start start', 'end start'],
  });
  // Poster drifts and scales as you scroll past — the homepage hero move.
  const posterY = useTransform(scrollYProgress, [0, 1], ['0%', '20%']);
  const posterScale = useTransform(scrollYProgress, [0, 1], [1, 1.08]);
  const overlayOpacity = useTransform(scrollYProgress, [0, 1], [0.7, 1]);

  return (
    <main className="pt-28 bg-fc-black text-fc-cream">
      <SEO
        path="/prayer"
        title="Month of Breakthrough · September 2026"
        description="A month of prayer and fasting for personal revival with Jesus. Wednesdays 6:30–7:30 PM at Freeway Church, Albion, MI. Submit a prayer request and download the prayer guide."
        image="https://freeway.church/breakthrough/poster_p1_prayer_trio.jpg"
      />

      {/* Hero — full-bleed poster background with parallax drift */}
      <section
        ref={heroRef}
        className="relative min-h-[90vh] flex items-center overflow-hidden"
      >
        <motion.img
          src="/breakthrough/hero_prayer_trio.jpg"
          alt=""
          aria-hidden="true"
          style={prefersReducedMotion ? undefined : { y: posterY, scale: posterScale }}
          className="absolute inset-0 h-full w-full object-cover grayscale contrast-125"
          fetchpriority="high"
        />
        {/* Base dimmer + vertical wash for text legibility (homepage recipe) */}
        <div className="absolute inset-0 bg-fc-black/40" />
        <motion.div
          style={prefersReducedMotion ? undefined : { opacity: overlayOpacity }}
          className="absolute inset-0 bg-gradient-to-t from-fc-black via-fc-black/85 to-fc-black/50"
        />

        <div className="container-fc relative z-10 py-20 md:py-28">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="eyebrow mb-6"
          >
            Month of
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1, ease: [0.2, 0.8, 0.2, 1] }}
            className="mb-8 max-w-4xl"
          >
            <CornerBrackets>
              <h1
                className="display-xl text-fc-cream text-[clamp(3.5rem,10vw,9rem)]"
                style={{ textShadow: '0 2px 20px rgba(0,0,0,0.6)' }}
              >
                Breakthrough
              </h1>
            </CornerBrackets>
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="eyebrow text-fc-gold mb-10 mt-2"
          >
            Prayer · Fasting · September 2026
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="flex flex-wrap gap-4 items-center"
          >
            <a
              href={PRAYER_FORM_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary"
            >
              Submit a Prayer Request
              <span aria-hidden className="ml-3">→</span>
            </a>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.7 }}
            className="mt-12 flex flex-wrap gap-x-10 gap-y-3 font-display uppercase tracking-widest2 text-xs md:text-sm text-fc-cream/60"
          >
            <span><span className="text-fc-cream">Wednesdays</span> · 6:30–7:30 PM</span>
            <span><span className="text-fc-cream">Freeway Church</span> · Albion, MI</span>
          </motion.div>
        </div>

        {/* Scroll indicator — same bouncing line as the homepage hero */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2"
        >
          <span className="eyebrow text-xs">Scroll</span>
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 1.6, repeat: Infinity }}
            className="h-8 w-px bg-fc-teal"
          />
        </motion.div>
      </section>

      {/* Why This Month */}
      <section className="py-24 md:py-36 border-t border-fc-cream/10">
        <div className="container-fc">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.7 }}
            className="max-w-3xl"
          >
            <p className="eyebrow mb-8">Why This Month</p>
            <h2 className="font-display font-black uppercase text-4xl md:text-7xl leading-[0.95] text-fc-cream mb-10">
              Personal revival.<br />
              <span className="text-fc-gold">With Jesus.</span>
            </h2>
          </motion.div>

          <motion.p
            variants={revealContainer}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: '-120px' }}
            className="text-2xl md:text-3xl leading-snug font-display font-medium text-fc-cream flex flex-wrap max-w-3xl"
          >
            {'Dead things raised. Desire for God. The breakthrough of getting more of Jesus.'
              .split(' ')
              .map((w, i) => (
                <motion.span key={i} variants={revealWord} className="mr-[0.35rem] inline-block">
                  {w}
                </motion.span>
              ))}
          </motion.p>
        </div>
      </section>

      {/* Wednesday Nights */}
      <section className="py-24 md:py-36 border-t border-fc-cream/10 bg-fc-black-soft/30">
        <div className="container-fc">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.6 }}
            className="grid md:grid-cols-12 gap-10 md:gap-16 items-start"
          >
            <div className="md:col-span-5">
              <p className="eyebrow mb-8">Every Wednesday</p>
              <h2 className="font-display font-black uppercase text-4xl md:text-6xl leading-[0.95] text-fc-cream mb-6">
                6:30<span className="text-fc-teal">–</span>7:30 PM
              </h2>
              <p className="text-fc-cream/70 text-base leading-relaxed max-w-md">
                Corporate prayer over the four fronts. Praying for one another by name.
                You don&apos;t need to prepare — just be in the room.
              </p>
            </div>
            <div className="md:col-span-7">
              <ul className="divide-y divide-fc-cream/10 border-t border-b border-fc-cream/10">
                {wednesdays.map((date, i) => (
                  <motion.li
                    key={date}
                    initial={{ opacity: 0, x: -12 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, margin: '-60px' }}
                    transition={{ duration: 0.4, delay: i * 0.06 }}
                    className="flex items-baseline justify-between py-5 md:py-6"
                  >
                    <span className="eyebrow text-xs md:text-sm">
                      Week 0{i + 1}
                    </span>
                    <span className="font-display font-black uppercase text-fc-cream text-2xl md:text-4xl">
                      {date}
                    </span>
                  </motion.li>
                ))}
              </ul>
              <p className="mt-6 font-display uppercase tracking-widest2 text-xs text-fc-cream/60">
                Freeway Church · 28900 B Dr N · Albion, MI
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Four Fronts */}
      <section className="py-24 md:py-36 border-t border-fc-cream/10">
        <div className="container-fc">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.6 }}
            className="max-w-3xl mb-14 md:mb-20"
          >
            <p className="eyebrow mb-8">The Four Fronts</p>
            <h2 className="font-display font-black uppercase text-4xl md:text-7xl leading-[0.95] text-fc-cream">
              What we&apos;re<br />
              <span className="text-fc-teal">praying for.</span>
            </h2>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: '-80px' }}
            variants={{ hidden: {}, show: { transition: { staggerChildren: 0.08 } } }}
            className="grid md:grid-cols-2 gap-0 border-t border-l border-fc-cream/10"
          >
            {fronts.map((f) => (
              <motion.div
                key={f.n}
                variants={{
                  hidden: { opacity: 0, y: 16 },
                  show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
                }}
                className="border-r border-b border-fc-cream/10 p-8 md:p-12 transition-colors hover:bg-fc-black-soft/40"
              >
                <div className="eyebrow mb-4">{f.n}</div>
                <h3 className="font-display font-black uppercase text-2xl md:text-4xl leading-none mb-5 text-fc-cream">
                  {f.title}
                </h3>
                <p className="text-fc-cream/70 leading-relaxed text-base">
                  {f.body}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* How to Fast */}
      <section className="py-24 md:py-36 border-t border-fc-cream/10 bg-fc-black-soft/30">
        <div className="container-fc">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.6 }}
            className="max-w-3xl mb-14"
          >
            <p className="eyebrow mb-8">How to Fast</p>
            <h2 className="font-display font-black uppercase text-4xl md:text-7xl leading-[0.95] text-fc-cream mb-8">
              Pick a lane.<br />
              <span className="text-fc-gold">Show up.</span>
            </h2>
            <p className="text-fc-cream/70 leading-relaxed max-w-2xl text-base">
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
            className="grid sm:grid-cols-2 md:grid-cols-3 gap-0 border-t border-l border-fc-cream/10"
          >
            {fasts.map((f) => (
              <motion.div
                key={f.name}
                variants={{
                  hidden: { opacity: 0, y: 12 },
                  show: { opacity: 1, y: 0, transition: { duration: 0.4 } },
                }}
                className="border-r border-b border-fc-cream/10 p-6 md:p-8 transition-colors hover:bg-fc-black-soft/40"
              >
                <h3 className="font-display font-black uppercase text-xl md:text-2xl leading-none mb-3 text-fc-teal">
                  {f.name}
                </h3>
                <p className="text-fc-cream/70 text-sm leading-relaxed">{f.body}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-24 md:py-40 border-t border-fc-cream/10 relative overflow-hidden">
        <img
          src="/breakthrough/poster_p4_worship_hands.jpg"
          alt=""
          aria-hidden="true"
          className="absolute inset-0 h-full w-full object-cover opacity-20 grayscale"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-fc-black via-fc-black/85 to-fc-black" />

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
                <h2 className="display-xl text-5xl md:text-8xl text-fc-cream">
                  Your turn.
                </h2>
              </CornerBrackets>
            </div>
            <p className="eyebrow text-fc-gold mb-10">
              Write one prayer. We&apos;ll carry it with you.
            </p>
            <a
              href={PRAYER_FORM_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary"
            >
              Submit a Prayer Request
              <span aria-hidden className="ml-3">→</span>
            </a>
            <p className="mt-10 font-display uppercase tracking-widest2 text-xs text-fc-cream/60">
              Freeway Church · Albion, MI · September 2026
            </p>
          </motion.div>
        </div>
      </section>
    </main>
  );
}
