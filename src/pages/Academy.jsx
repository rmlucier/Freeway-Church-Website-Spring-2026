import { motion, MotionConfig } from 'framer-motion';
import SEO from '../components/SEO.jsx';
import MailLink from '../components/MailLink.jsx';
import PhoneLink from '../components/PhoneLink.jsx';
import AirplaneTrail from '../components/AirplaneTrail.jsx';
import PathHop from '../components/PathHop.jsx';

// The Academy logo's full crayon-box palette. Used for playful accents (the
// flight-path hops, the strengths chips) that set this page apart from the
// site's restrained teal/gold.
const LOGO_COLORS = [
  '#E4572E', // coral
  '#F2A93B', // amber
  '#EF9A9A', // pink
  '#2E8B7F', // teal-green
  '#3FA34D', // green
  '#7FA8D9', // sky
  '#2E6FB0', // blue
  '#F6D64A', // yellow
];

// Shared scroll reveals. Each block rises and fades in as it scrolls into view,
// so the page feels like it's being uncovered section by section. Images and the
// hero logo get a true curtain "wipe" via the Wipe component below. MotionConfig
// (in the render) makes all of this fall back to a plain fade for visitors who
// prefer reduced motion.
const EASE = [0.2, 0.8, 0.2, 1];

const revealUp = {
  hidden: { opacity: 0, y: 32 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: EASE },
  },
};

const revealItem = {
  hidden: { opacity: 0, y: 24 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: EASE },
  },
};

// Curtain for grid images — lives inside a stagger container so the panels lift
// off the photos one after another. Transform-only.
const curtain = {
  hidden: { scaleY: 1 },
  show: { scaleY: 0, transition: { duration: 0.7, ease: EASE } },
};

// Hero orchestration. The grid is the animation root (animate="show"); every
// piece below is a variant child so it flows down and staggers. Using variant
// labels (not loose animate props) is what lets nested elements like the
// headline actually animate.
const heroStagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12, delayChildren: 0.1 } },
};

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.65, ease: EASE } },
};

// A curtain "wipe" — a panel that slides up and away to uncover its contents.
// Transform-only (reliable everywhere), so it's the workhorse for the reveal
// feel Roy asked for. Children sit under an overlay that scales from full to
// nothing, anchored at the top so it lifts like a blind being raised.
function Wipe({ children, className = '', delay = 0, color = 'bg-fc-black' }) {
  return (
    <motion.div
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: '-80px' }}
      className={`relative overflow-hidden ${className}`}
    >
      {children}
      <motion.div
        aria-hidden="true"
        variants={{
          hidden: { scaleY: 1 },
          show: {
            scaleY: 0,
            transition: { duration: 0.7, ease: EASE, delay },
          },
        }}
        className={`absolute inset-0 origin-top ${color}`}
      />
    </motion.div>
  );
}

// TODO: replace with the real FreeWay Leadership Academy application form URL
// once the Google Form is built. Until then this points visitors to text/email.
const APPLICATION_FORM_URL = '';

const topics = [
  {
    title: 'Identity',
    body:
      'Discovering who God created you to be — before any title, role, or achievement is ever attached to your name.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <circle cx="12" cy="8" r="4" />
        <path d="M4 21v-1a7 7 0 0 1 14 0v1" />
        <path d="M20 8v6" />
        <path d="M17 11h6" />
      </svg>
    ),
  },
  {
    title: 'Character',
    body:
      'Learning that a leader is known by the way they live and treat others — not by a position they hold.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M12 2 4 5v6c0 5 3.5 8.5 8 11 4.5-2.5 8-6 8-11V5l-8-3Z" />
        <path d="m9 12 2 2 4-4" />
      </svg>
    ),
  },
  {
    title: 'Responsibility & Accountability',
    body:
      'Owning our choices, keeping our word, and following through — even when no one is watching.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M9 11l3 3L22 4" />
        <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11" />
      </svg>
    ),
  },
  {
    title: 'Circle of Control',
    body:
      'Focusing energy on what we can control, and learning to leave the people around us powerful.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <circle cx="12" cy="12" r="9" />
        <circle cx="12" cy="12" r="4" />
      </svg>
    ),
  },
  {
    title: 'Stewardship',
    body:
      'Managing our time, talent, and treasure well — because everything we have is a gift to steward.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <circle cx="12" cy="12" r="9" />
        <path d="M12 7v10" />
        <path d="M9.5 9.5a2.5 2.5 0 0 1 2.5-1.5c1.4 0 2.5.9 2.5 2s-1.1 2-2.5 2-2.5.9-2.5 2 1.1 2 2.5 2a2.5 2.5 0 0 0 2.5-1.5" />
      </svg>
    ),
  },
  {
    title: 'Circle of Choices',
    body:
      'Making wise decisions, handling challenges with courage, and understanding that choices carry consequences.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M12 3v6" />
        <path d="M12 9 6 21" />
        <path d="M12 9l6 12" />
        <circle cx="6" cy="21" r="1.5" />
        <circle cx="18" cy="21" r="1.5" />
      </svg>
    ),
  },
];

const strengths = [
  'Self-Worth',
  'Confidence',
  'Character',
  'Courage',
  'Compassion',
  'Responsibility',
  'Self-Control',
  'Communication',
  'Perseverance',
  'Serving Others',
];

export default function Academy() {
  return (
    <MotionConfig reducedMotion="user">
    <main className="pt-28">
      <SEO
        path="/academy"
        title="FreeWay Leadership Academy"
        description="A Christ-centered leadership program for kids at Freeway Church — helping children discover who God created them to be, grow in character, and learn to lead others well. For 1st–6th grade, with a hands-on track for pre-K & Kindergarten. Wednesdays, dinner at 5:30pm, program 6:30–8:00pm."
      />

      {/* Hero — logo on a light card + tagline */}
      <section className="relative min-h-[85vh] flex items-center bg-fc-black overflow-hidden">
        {/* Decorative atmospherics — a little warmer/brighter than the rest of
            the site, to set the Academy apart from the very top */}
        <div className="absolute inset-0 bg-gradient-to-br from-fc-teal/15 via-fc-black to-fc-gold/10" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-fc-teal/10 via-transparent to-transparent" />
        <div className="pointer-events-none absolute -top-16 left-1/4 h-80 w-80 rounded-full bg-[#E4572E]/10 blur-3xl" />
        <div className="pointer-events-none absolute bottom-0 right-1/3 h-72 w-72 rounded-full bg-[#F6D64A]/10 blur-3xl" />

        {/* Paper airplane flight-path motif, echoing the Academy logo */}
        <AirplaneTrail className="pointer-events-none absolute top-24 md:top-16 right-4 md:right-24 w-56 md:w-96 text-fc-teal/70 z-10" />

        <div className="container-fc relative z-10 py-20 md:py-28">
          <motion.div
            initial="hidden"
            animate="show"
            variants={heroStagger}
            className="grid md:grid-cols-12 gap-10 md:gap-16 items-center"
          >
            {/* Logo — appears ABOVE the text on mobile, right side on desktop.
                Sits on a cream card so the navy script + outlines stay legible
                against the dark hero. The curtain lifts to uncover it. */}
            <motion.div
              variants={fadeUp}
              className="md:col-span-5 md:order-2 md:justify-self-end order-1"
            >
              <Wipe
                delay={0.35}
                color="bg-fc-cream"
                className="w-64 sm:w-72 md:w-full max-w-sm mx-auto md:mx-0 rounded-3xl bg-fc-cream p-6 md:p-8 shadow-2xl shadow-fc-black/60"
              >
                <img
                  src="/images/academy-logo.png"
                  alt="FreeWay Leadership Academy"
                  className="w-full h-auto"
                  width="2000"
                  height="2000"
                  fetchpriority="high"
                />
              </Wipe>
            </motion.div>

            <motion.div
              variants={heroStagger}
              className="md:col-span-7 md:order-1 order-2"
            >
              <motion.p variants={fadeUp} className="eyebrow mb-6">
                A Freeway Church Kids Initiative
              </motion.p>
              <motion.h1
                variants={fadeUp}
                className="display-xl text-5xl md:text-8xl leading-[0.85] pb-[0.12em] text-fc-cream"
              >
                Raising up<br />
                <span className="text-fc-teal">young leaders.</span>
              </motion.h1>
              <motion.p
                variants={fadeUp}
                className="mt-8 text-xl md:text-3xl text-fc-cream/90 leading-tight max-w-2xl font-display font-medium drop-shadow"
              >
                Know who you are, grow who you are, lead others well.
              </motion.p>
              <motion.p
                variants={fadeUp}
                className="mt-6 text-base md:text-lg text-fc-cream/75 leading-relaxed max-w-xl"
              >
                A Christ-centered leadership program helping kids discover who God
                created them to be, grow in character, and learn how to positively
                influence the world around them.
              </motion.p>

              <motion.div variants={fadeUp} className="mt-9 flex flex-wrap gap-4">
                <a href="#apply" className="btn-primary">
                  Apply Now
                </a>
                <a href="#about" className="btn-outline">
                  Learn More
                </a>
              </motion.div>

              {/* Quick facts */}
              <motion.div variants={fadeUp} className="mt-10 flex flex-wrap gap-x-8 gap-y-3">
                <div className="flex items-center gap-2.5">
                  <span className="h-1.5 w-1.5 rounded-full bg-fc-gold" />
                  <span className="font-display uppercase tracking-widest2 text-xs text-fc-cream/70">
                    Grades 1–6 &middot; Pre-K &amp; K track
                  </span>
                </div>
                <div className="flex items-center gap-2.5">
                  <span className="h-1.5 w-1.5 rounded-full bg-fc-gold" />
                  <span className="font-display uppercase tracking-widest2 text-xs text-fc-cream/70">
                    6:30–8:00pm &middot; Dinner at 5:30
                  </span>
                </div>
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* About — the working description */}
      <section id="about" className="relative py-24 md:py-32 bg-fc-black-soft border-t border-fc-cream/10">
        <div className="container-fc">
          <motion.div
            variants={revealUp}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: '-100px' }}
            className="max-w-3xl"
          >
            <p className="eyebrow mb-6">What It Is</p>
            <h2 className="display-xl text-4xl md:text-6xl mb-10">
              Leadership isn&apos;t a title.<br />
              <span className="text-fc-teal">It&apos;s how you live.</span>
            </h2>
            <p className="text-fc-cream/80 text-lg leading-relaxed mb-6">
              Through engaging lessons, hands-on activities, small group discussions,
              games, and reflection, students explore what it means to be a leader —
              not because of a title or position, but because of the way they live and
              treat others.
            </p>
            <p className="text-fc-cream/70 leading-relaxed">
              Students develop practical leadership skills while growing in self-worth,
              confidence, character, and courage. The Academy encourages children to
              recognize their God-given gifts, make wise choices, handle challenges
              with courage, and lead with humility and integrity.
            </p>
          </motion.div>
        </div>

        {/* Flight path that crosses from About down into the gallery */}
        <PathHop
          vertical
          color={LOGO_COLORS[0]}
          className="absolute right-6 md:right-24 bottom-0 translate-y-1/2 z-20 pointer-events-none"
        />
      </section>

      {/* Gallery — real kids, real fun */}
      <section className="py-24 md:py-32 bg-fc-black border-t border-fc-cream/10">
        <div className="container-fc">
          <motion.div
            variants={revealUp}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: '-100px' }}
            className="max-w-3xl mb-14"
          >
            <p className="eyebrow mb-6">More Than a Classroom</p>
            <h2 className="display-xl text-4xl md:text-6xl mb-8">
              Growing leaders,<br />
              <span className="text-fc-teal">having a blast.</span>
            </h2>
            <p className="text-fc-cream/70 leading-relaxed text-lg max-w-2xl">
              Games, worship, hands-on activities, and a whole lot of laughter. This is
              what an Academy night looks like.
            </p>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: '-80px' }}
            variants={{ hidden: {}, show: { transition: { staggerChildren: 0.08 } } }}
            className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-4"
          >
            {[
              { src: '/images/academy-group.jpg', alt: 'Academy students worshipping with hands raised outdoors' },
              { src: '/images/academy-slide.jpg', alt: 'A child laughing on a summer slip-and-slide' },
              { src: '/images/academy-play.jpg', alt: 'A student building at a hands-on activity table' },
              { src: '/images/academy-water.jpg', alt: 'A student mid-game in an outdoor activity' },
              { src: '/images/academy-container.jpg', alt: 'Kids playing a balance game outdoors' },
            ].map((img) => (
              <motion.div
                key={img.src}
                variants={{ hidden: {}, show: {} }}
                className="relative aspect-[4/5] overflow-hidden border border-fc-cream/10"
              >
                <img
                  src={img.src}
                  alt={img.alt}
                  className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 hover:scale-[1.04]"
                  loading="lazy"
                />
                <motion.div
                  aria-hidden="true"
                  variants={curtain}
                  className="absolute inset-0 origin-top bg-fc-black"
                />
              </motion.div>
            ))}
            {/* Closing tile */}
            <motion.div
              variants={revealItem}
              className="relative aspect-[4/5] overflow-hidden border border-fc-teal/40 bg-fc-teal/10 flex items-center p-6 md:p-8"
            >
              <div>
                <p className="font-display font-black uppercase text-2xl md:text-3xl leading-tight text-fc-cream">
                  Come see<br />
                  <span className="text-fc-teal">for yourself.</span>
                </p>
                <a
                  href="#apply"
                  className="mt-5 inline-block font-display uppercase tracking-widest2 text-xs text-fc-gold hover:text-fc-cream transition-colors"
                >
                  Apply →
                </a>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Skills / strengths they grow in */}
      <section className="py-24 md:py-32 bg-fc-black-soft border-t border-fc-cream/10">
        <div className="container-fc">
          <motion.div
            variants={revealUp}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: '-100px' }}
            className="max-w-3xl mb-14"
          >
            <p className="eyebrow mb-6">What They Grow In</p>
            <h2 className="display-xl text-4xl md:text-6xl pb-[0.12em]">
              Ten strengths.<br />
              <span className="text-fc-gold">One young leader.</span>
            </h2>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: '-80px' }}
            variants={{ hidden: {}, show: { transition: { staggerChildren: 0.06 } } }}
            className="flex flex-wrap gap-3 md:gap-4"
          >
            {strengths.map((s, i) => (
              <motion.span
                key={s}
                variants={{
                  hidden: { opacity: 0, y: 12 },
                  show: { opacity: 1, y: 0, transition: { duration: 0.4 } },
                }}
                style={{ borderLeftColor: LOGO_COLORS[i % LOGO_COLORS.length] }}
                className="font-display uppercase tracking-widest2 text-sm md:text-base border border-fc-cream/15 border-l-4 text-fc-cream/85 px-5 py-3 transition-colors hover:text-fc-cream hover:bg-fc-cream/5"
              >
                {s}
              </motion.span>
            ))}
          </motion.div>

          <PathHop color={LOGO_COLORS[7]} className="mt-16 md:mt-24" />
        </div>
      </section>

      {/* Topics covered */}
      <section className="py-24 md:py-32 bg-fc-black border-t border-fc-cream/10">
        <div className="container-fc">
          <motion.div
            variants={revealUp}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: '-100px' }}
            className="max-w-3xl mb-14"
          >
            <p className="eyebrow mb-6">What We&apos;ll Cover</p>
            <h2 className="display-xl text-4xl md:text-6xl mb-8">
              The building blocks<br />
              <span className="text-fc-teal">of a leader.</span>
            </h2>
            <p className="text-fc-cream/70 leading-relaxed text-lg">
              Each session builds on the last. A few of the big ideas we&apos;ll
              explore together:
            </p>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: '-80px' }}
            variants={{ hidden: {}, show: { transition: { staggerChildren: 0.08 } } }}
            className="grid sm:grid-cols-2 md:grid-cols-3 gap-0 border-t border-l border-fc-cream/10"
          >
            {topics.map((topic) => (
              <motion.div
                key={topic.title}
                variants={revealItem}
                className="group relative p-8 md:p-10 border-r border-b border-fc-cream/10 hover:bg-fc-black transition-colors"
              >
                <div className="absolute top-0 left-0 h-1 bg-fc-teal w-0 group-hover:w-full transition-all duration-500" />
                <div className="h-10 w-10 text-fc-teal mb-6 group-hover:text-fc-gold transition-colors">
                  {topic.icon}
                </div>
                <h3 className="font-display font-black uppercase text-xl mb-4 leading-tight">
                  {topic.title}
                </h3>
                <p className="text-fc-cream/75 text-sm leading-relaxed">{topic.body}</p>
              </motion.div>
            ))}
            {/* "And more" tile */}
            <motion.div
              variants={revealItem}
              className="relative p-8 md:p-10 border-r border-b border-fc-cream/10 flex items-center"
            >
              <p className="font-display uppercase tracking-widest2 text-fc-gold text-lg">
                &amp; more →
              </p>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* The Goal */}
      <section className="relative py-24 md:py-32 bg-fc-black-soft border-t border-fc-cream/10">
        <div className="container-fc">
          <motion.div
            variants={revealUp}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: '-100px' }}
            className="max-w-3xl"
          >
            <p className="eyebrow mb-6">Our Goal</p>
            <h2 className="display-xl text-4xl md:text-6xl mb-10">
              A generation who lead<br />
              <span className="text-fc-teal">with character &amp; faith.</span>
            </h2>
            <p className="text-fc-cream/80 text-lg leading-relaxed">
              To see a generation of young leaders grow in character, courage,
              compassion, and faith — helping them discover their God-given identity
              and use their influence to serve the community and make a positive
              difference in the world around them.
            </p>
          </motion.div>
        </div>

        {/* Flight path that crosses from the Goal down into the details */}
        <PathHop
          vertical
          flip
          color={LOGO_COLORS[6]}
          className="absolute left-6 md:left-24 bottom-0 translate-y-1/2 z-20 pointer-events-none"
        />
      </section>

      {/* Details — ages + schedule */}
      <section className="py-24 md:py-32 bg-fc-black border-t border-fc-cream/10">
        <div className="container-fc">
          <motion.div
            variants={revealUp}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: '-100px' }}
            className="max-w-3xl mb-14"
          >
            <p className="eyebrow mb-6">The Details</p>
            <h2 className="display-xl text-4xl md:text-6xl pb-[0.12em]">
              Who, when,<br />
              <span className="text-fc-gold">&amp; how it flows.</span>
            </h2>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: '-80px' }}
            variants={{ hidden: {}, show: { transition: { staggerChildren: 0.12 } } }}
            className="grid md:grid-cols-2 gap-0 border-t border-l border-fc-cream/10 max-w-4xl"
          >
            <motion.div
              variants={revealItem}
              className="p-8 md:p-10 border-r border-b border-fc-cream/10"
            >
              <h3 className="font-display font-black uppercase text-xl text-fc-teal mb-4">
                Who It&apos;s For
              </h3>
              <p className="text-fc-cream/75 leading-relaxed">
                Built for <strong className="text-fc-cream">1st–6th grade</strong>, with
                a simple, hands-on version for our{' '}
                <strong className="text-fc-cream">pre-K &amp; Kindergarten</strong> friends
                so the youngest ones can join in too.
              </p>
            </motion.div>
            <motion.div
              variants={revealItem}
              className="p-8 md:p-10 border-r border-b border-fc-cream/10"
            >
              <h3 className="font-display font-black uppercase text-xl text-fc-teal mb-4">
                When We Meet
              </h3>
              <p className="text-fc-cream/75 leading-relaxed">
                <strong className="text-fc-cream">Dinner &amp; hangout</strong> starts at{' '}
                <strong className="text-fc-cream">5:30pm</strong>. The Academy runs{' '}
                <strong className="text-fc-cream">6:30–8:00pm</strong> — come early, eat
                together, and settle in.
              </p>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Apply CTA */}
      <section
        id="apply"
        className="relative overflow-hidden py-24 md:py-32 bg-fc-black-soft border-t border-fc-cream/10"
      >
        {/* Warm, brighter finale glow — a lift out of the dark to close the page */}
        <div className="pointer-events-none absolute -top-24 -right-16 h-96 w-96 rounded-full bg-fc-gold/20 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-32 -left-20 h-96 w-96 rounded-full bg-fc-teal/20 blur-3xl" />
        <div className="container-fc relative">
          <motion.div
            variants={revealUp}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: '-100px' }}
            className="max-w-3xl"
          >
            <h2 className="display-xl text-4xl md:text-6xl mb-8">
              Ready to<br />
              <span className="text-fc-teal">apply?</span>
            </h2>
            <p className="text-fc-cream/80 text-lg leading-relaxed mb-10 max-w-xl">
              Applications take just a few minutes. Tell us a little about your child —
              a strength they already have, an area they&apos;d like to grow, and how to
              reach you — and we&apos;ll take it from there.
            </p>
            <div className="flex flex-wrap gap-4">
              {APPLICATION_FORM_URL ? (
                <a
                  href={APPLICATION_FORM_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-primary"
                >
                  Start Application
                </a>
              ) : (
                <MailLink
                  subject="FreeWay Leadership Academy — application"
                  className="btn-primary"
                  ariaLabel="Email us about the FreeWay Leadership Academy application"
                >
                  Request an Application
                </MailLink>
              )}
              <PhoneLink
                mode="sms"
                body="Hi Pastor Roy — I'd love to sign my child up for the FreeWay Leadership Academy."
                className="btn-outline"
                ariaLabel="Text Pastor Roy about the Academy"
              >
                Text Pastor Roy
              </PhoneLink>
            </div>
            <p className="mt-8 text-fc-cream/50 text-sm leading-relaxed italic max-w-xl">
              Questions before you apply? Text{' '}
              <PhoneLink
                mode="sms"
                showNumber
                className="text-fc-cream/80 hover:text-fc-teal transition-colors underline underline-offset-4"
                ariaLabel="Text Pastor Roy"
              >
                Pastor Roy
              </PhoneLink>{' '}
              or{' '}
              <MailLink
                subject="FreeWay Leadership Academy — question"
                className="text-fc-cream/80 hover:text-fc-teal transition-colors underline underline-offset-4"
                ariaLabel="Email a question about the Academy"
              >
                email us
              </MailLink>
              .
            </p>
          </motion.div>
        </div>
      </section>
    </main>
    </MotionConfig>
  );
}
