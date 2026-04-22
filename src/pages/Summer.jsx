import { motion } from 'framer-motion';
import SEO from '../components/SEO.jsx';
import MailLink from '../components/MailLink.jsx';
import PhoneLink from '../components/PhoneLink.jsx';

const GOOGLE_FORM_URL =
  'https://docs.google.com/forms/d/e/1FAIpQLSdzAGEkWPewSP9RePKjLmj4YTNYJudbBnK8UcVsyFRundgx9g/viewform?usp=header';

const ideas = [
  {
    title: 'The Spoken Word',
    body:
      'Preach a 10–15 minute message. Read a scripture that has wrecked you in a good way. Share a 5-minute testimony.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3Z" />
        <path d="M19 10v2a7 7 0 0 1-14 0v-2" />
        <line x1="12" y1="19" x2="12" y2="23" />
        <line x1="8" y1="23" x2="16" y2="23" />
      </svg>
    ),
  },
  {
    title: 'Music & Performance',
    body:
      'Play a worship song on guitar or ukulele. Write something original. Prepare a short drama or skit.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M9 18V5l12-2v13" />
        <circle cx="6" cy="18" r="3" />
        <circle cx="18" cy="16" r="3" />
      </svg>
    ),
  },
  {
    title: 'Visual & Media Arts',
    body:
      'Edit a short video testimony. Paint a piece live or share a finished one. Present a photography project.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z" />
        <circle cx="12" cy="13" r="4" />
      </svg>
    ),
  },
  {
    title: 'Craftsmanship & Hands-On',
    body:
      'Show a cross or piece of furniture you built. Share a DIY project. Bake something meaningful and tell us what God taught you in the making of it.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.8-3.8a6 6 0 0 1-7.9 7.9l-5.3 5.3a2.1 2.1 0 0 1-3-3l5.3-5.3a6 6 0 0 1 7.9-7.9z" />
      </svg>
    ),
  },
];

export default function Summer() {
  return (
    <main className="pt-28">
      <SEO
        path="/summer"
        title="A Good Work · Summer 2026"
        description="This summer at Freeway Church we're opening up Sunday services for our congregation to share how God is working in their lives — through preaching, music, art, video, craftsmanship, and more. Sign up by May 24, 2026."
      />

      {/* Hero — typography-forward. Photo slot ready for the "A Good Work" slide. */}
      <section className="relative min-h-[85vh] flex items-center bg-fc-black overflow-hidden">
        {/* PLACEHOLDER: drop the "A Good Work" slide image at /images/summer-hero.jpg */}
        {/* When it lands, uncomment the <img> below.
        <img
          src="/images/summer-hero.jpg"
          alt=""
          className="absolute inset-0 h-full w-full object-cover opacity-40"
          fetchpriority="high"
        />
        */}
        {/* Decorative gradient for the typography-only version */}
        <div className="absolute inset-0 bg-gradient-to-br from-fc-teal/20 via-fc-black to-fc-gold/10" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-fc-teal/10 via-transparent to-transparent" />

        <div className="container-fc relative z-10 py-20 md:py-28">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.2, 0.8, 0.2, 1] }}
            className="max-w-5xl"
          >
            <p className="eyebrow mb-6">Summer 2026 · Freeway Church</p>
            <h1 className="display-xl text-6xl md:text-[10rem] leading-[0.85] text-fc-cream">
              A Good<br />
              <span className="text-fc-teal">Work.</span>
            </h1>
            <p className="mt-10 text-2xl md:text-4xl text-fc-cream/90 leading-tight max-w-3xl font-display font-medium drop-shadow">
              Telling God&apos;s story through ours.
            </p>
          </motion.div>
        </div>
      </section>

      {/* The Vision */}
      <section className="py-24 md:py-32 bg-fc-black border-t border-fc-cream/10">
        <div className="container-fc">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.6 }}
            className="max-w-3xl"
          >
            <p className="eyebrow mb-6">The Vision</p>
            <h2 className="display-xl text-4xl md:text-6xl mb-10">
              He&apos;s writing a story.<br />
              <span className="text-fc-teal">Through each of us.</span>
            </h2>
            <p className="text-fc-cream/80 text-lg leading-relaxed mb-6">
              God is actively working in our lives. He&apos;s writing our individual stories —
              and even more beautifully, He&apos;s using our stories to tell the greater story
              of who He is to the world around us.
            </p>
            <p className="text-fc-cream/70 leading-relaxed">
              This summer, we&apos;re building a canvas wide enough for the whole church family
              to pick up a brush.
            </p>
          </motion.div>
        </div>
      </section>

      {/* The Shift */}
      <section className="py-24 md:py-32 bg-fc-black-soft border-t border-fc-cream/10">
        <div className="container-fc">
          <div className="grid md:grid-cols-12 gap-10 md:gap-16">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{ duration: 0.6 }}
              className="md:col-span-5"
            >
              <p className="eyebrow mb-6">What&apos;s Different</p>
              <h2 className="display-xl text-4xl md:text-5xl leading-none">
                Broader<br />
                <span className="text-fc-gold">canvas.</span>
              </h2>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="md:col-span-7"
            >
              <p className="text-fc-cream/80 text-lg leading-relaxed mb-6">
                Past summers we&apos;ve loved hearing from different voices through our{' '}
                <span className="text-fc-cream">&quot;You Pick Two&quot;</span> preaching
                series. This year, we&apos;re broadening it.
              </p>
              <p className="text-fc-cream/80 text-lg leading-relaxed mb-6">
                God has equipped this church with a wild diversity of gifts — speaking,
                writing, building, painting, playing, baking, filming, teaching. This
                summer we want to see those gifts used to glorify Him.
              </p>
              <p className="text-fc-cream/80 text-lg leading-relaxed">
                Whatever creative, practical, or speaking medium you love most —
                Sundays this summer are your space to share it.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-24 md:py-32 bg-fc-black border-t border-fc-cream/10">
        <div className="container-fc">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.6 }}
            className="max-w-3xl mb-14"
          >
            <p className="eyebrow mb-6">How It Works</p>
            <h2 className="display-xl text-4xl md:text-6xl">
              Every Sunday.<br />
              <span className="text-fc-teal">At least two voices.</span>
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-0 border-t border-l border-fc-cream/10 max-w-5xl">
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.5 }}
              className="p-8 md:p-10 border-r border-b border-fc-cream/10"
            >
              <div className="font-display text-fc-gold text-sm tracking-widest2 mb-3">01</div>
              <h3 className="font-display font-black uppercase text-xl text-fc-teal mb-4">
                Length flexes
              </h3>
              <p className="text-fc-cream/75 leading-relaxed">
                A spoken message might take 15 minutes. Sharing a piece of visual art
                might take 3. Both are fully welcome.
              </p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="p-8 md:p-10 border-r border-b border-fc-cream/10"
            >
              <div className="font-display text-fc-gold text-sm tracking-widest2 mb-3">02</div>
              <h3 className="font-display font-black uppercase text-xl text-fc-teal mb-4">
                Whole service or a segment
              </h3>
              <p className="text-fc-cream/75 leading-relaxed">
                Your piece might fill the whole service or sit inside a normal one.
                The goal is the same either way: offer your gift back to the Lord.
              </p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="p-8 md:p-10 border-r border-b border-fc-cream/10"
            >
              <div className="font-display text-fc-gold text-sm tracking-widest2 mb-3">03</div>
              <h3 className="font-display font-black uppercase text-xl text-fc-teal mb-4">
                Everyone is invited
              </h3>
              <p className="text-fc-cream/75 leading-relaxed">
                Adults, teenagers, and kids. If God has given you something and it
                points back to Him, you have a place on the platform.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Ideas */}
      <section className="py-24 md:py-32 bg-fc-black-soft border-t border-fc-cream/10">
        <div className="container-fc">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.6 }}
            className="max-w-3xl mb-14"
          >
            <p className="eyebrow mb-6">Ideas &amp; Inspiration</p>
            <h2 className="display-xl text-4xl md:text-6xl mb-8">
              Not sure what<br />
              <span className="text-fc-gold">to offer?</span>
            </h2>
            <p className="text-fc-cream/70 leading-relaxed text-lg">
              If it points back to God&apos;s good work in your life, we want to see it.
              A few starting places:
            </p>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: '-80px' }}
            variants={{ hidden: {}, show: { transition: { staggerChildren: 0.08 } } }}
            className="grid sm:grid-cols-2 md:grid-cols-4 gap-0 border-t border-l border-fc-cream/10"
          >
            {ideas.map((idea) => (
              <motion.div
                key={idea.title}
                variants={{
                  hidden: { opacity: 0, y: 16 },
                  show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
                }}
                className="group relative p-8 md:p-10 border-r border-b border-fc-cream/10 hover:bg-fc-black transition-colors"
              >
                <div className="absolute top-0 left-0 h-1 bg-fc-teal w-0 group-hover:w-full transition-all duration-500" />
                <div className="h-10 w-10 text-fc-teal mb-6 group-hover:text-fc-gold transition-colors">
                  {idea.icon}
                </div>
                <h3 className="font-display font-black uppercase text-xl mb-4 leading-tight">
                  {idea.title}
                </h3>
                <p className="text-fc-cream/75 text-sm leading-relaxed">{idea.body}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Call to Action — Signup */}
      <section className="py-24 md:py-32 bg-fc-black border-t border-fc-cream/10">
        <div className="container-fc">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.6 }}
            className="max-w-3xl"
          >
            <div className="inline-flex items-center gap-3 border border-fc-gold/50 text-fc-gold px-4 py-2 mb-8">
              <span className="h-1.5 w-1.5 rounded-full bg-fc-gold animate-pulse" />
              <span className="font-display uppercase tracking-widest2 text-xs">
                First round signups close May 24, 2026
              </span>
            </div>
            <h2 className="display-xl text-4xl md:text-6xl mb-8">
              Ready to<br />
              <span className="text-fc-teal">jump in?</span>
            </h2>
            <p className="text-fc-cream/80 text-lg leading-relaxed mb-10 max-w-xl">
              Prayerfully consider how you&apos;d like to participate. Fill out the quick
              form with your idea and the dates you&apos;re available — we&apos;ll take it
              from there.
            </p>
            <div className="flex flex-wrap gap-4">
              <a
                href={GOOGLE_FORM_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary"
              >
                Sign Up
              </a>
              <PhoneLink
                mode="sms"
                body="Hi Pastor Roy — I'd love to share something for A Good Work this summer."
                className="btn-outline"
                ariaLabel="Text Pastor Roy about A Good Work"
              >
                Text Pastor Roy
              </PhoneLink>
            </div>
            <p className="mt-8 text-fc-cream/50 text-sm leading-relaxed italic max-w-xl">
              Not a form person? No problem. Text{' '}
              <PhoneLink
                mode="sms"
                showNumber
                className="text-fc-cream/80 hover:text-fc-teal transition-colors underline underline-offset-4"
                ariaLabel="Text Pastor Roy"
              >
                Pastor Roy
              </PhoneLink>{' '}
              directly with your idea, or{' '}
              <MailLink
                subject="A Good Work — summer idea"
                className="text-fc-cream/80 hover:text-fc-teal transition-colors underline underline-offset-4"
                ariaLabel="Email your Good Work idea"
              >
                email us
              </MailLink>
              .
            </p>
          </motion.div>
        </div>
      </section>
    </main>
  );
}
