import { motion } from 'framer-motion';
import SEO from '../components/SEO.jsx';
import MailLink from '../components/MailLink.jsx';

// 2025 Budget allocation — from Business Meeting 2025
const budget = [
  {
    label: 'Staff',
    percent: 48,
    detail: 'Pastor Roy (full time) and Pastor Elissa (part time) on the ground in Albion.',
    color: 'bg-fc-teal',
  },
  {
    label: 'Building',
    percent: 16,
    detail: 'Utilities, groundskeeping, maintenance, custodial service, maintenance reserve fund.',
    color: 'bg-fc-gold',
  },
  {
    label: 'Ministry',
    percent: 16,
    detail: 'Sunday food, Kids + Youth, audio/visual equipment.',
    color: 'bg-fc-teal-dark',
  },
  {
    label: 'Outgoing Support',
    percent: 10,
    detail: 'A tithe on our tithe. 10% of our budget flows straight to our missionary partners — specific people, specific places.',
    color: 'bg-fc-gold-soft',
  },
  {
    label: 'Operating',
    percent: 10,
    detail: 'Building insurance, office supplies, the everyday things that keep the lights on.',
    color: 'bg-fc-cream/40',
  },
];

// Missionary partners — funded by the tithe-on-tithe (general fund outgoing support)
// Some partners serve in sensitive regions and are intentionally unnamed.
const partners = [
  { name: 'Nicaragua', image: '/images/partners/nicaragua.jpg' },
  { name: 'Central Asia', image: '/images/partners/kazakhstan.jpg' },
  { name: 'Indonesia', image: '/images/partners/indonesia.jpg' },
  { name: 'China', image: '/images/partners/china.jpg' },
  { name: 'Project 42', href: 'https://www.project42partners.org/', image: '/images/partners/project42.jpg' },
  { name: 'Refugees in Detroit', href: 'https://www.hicdetroit.com/', image: '/images/partners/refugees-detroit.jpg' },
  { name: 'Detroit Chi Alpha', href: 'https://linktr.ee/waynestatechialpha', image: '/images/partners/chi-alpha.jpg' },
];

// What Kingdom Builders funds — responsive / project-based giving
const kbFunds = [
  {
    title: 'Disaster Relief',
    body: 'When floods, fires, or crisis hit — here or around the world.',
  },
  {
    title: 'Bibles',
    body: 'For hands that want one and don\'t have one yet.',
  },
  {
    title: 'Benevolence',
    body: 'Immediate help for members of our church family in need.',
  },
  {
    title: 'Camp Scholarships',
    body: 'So no kid misses summer camp due to lack of funds.',
  },
  {
    title: 'Building Upgrades',
    body: 'The space that lets us welcome more people, better.',
  },
];

// Kingdom Builders growth — from Business Meeting 2025
const kbHistory = [
  { year: '2021', amount: 3446 },
  { year: '2022', amount: 8405 },
  { year: '2023', amount: 9336 },
  { year: '2024', amount: 10783 },
  // 2025 figures were clouded by a one-off anomaly — render at the same
  // height as 2024 so the bar tells a steady-state story without misleading.
  { year: '2025', amount: 10800 },
];
const kbGoal = 23100;
const kbMaxForChart = 25000; // y-axis scale

export default function Giving() {
  return (
    <main className="pt-28">
      <SEO
        path="/giving"
        title="Giving"
        description="How Freeway Church stewards every dollar — the 2026 budget, the Kingdom Builders trajectory, and the global partners we stand with in seven regions."
      />
      {/* Hero */}
      <section className="relative py-24 md:py-40 bg-fc-black overflow-hidden">
        <div className="container-fc">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.2, 0.8, 0.2, 1] }}
            className="max-w-4xl"
          >
            <p className="eyebrow mb-6">Giving at Freeway</p>
            <h1 className="display-xl text-5xl md:text-8xl leading-[0.9] text-fc-cream">
              A free way.<br />
              <span className="text-fc-teal">A full life.</span>
            </h1>
            <p className="mt-10 text-xl md:text-2xl text-fc-cream/80 leading-snug max-w-2xl font-display font-medium">
              We don't give to cover the bills.<br />We give to leave a legacy.
            </p>
            <div className="mt-10 flex flex-wrap gap-4">
              <a
                href="https://freewaychurch.churchcenter.com/giving"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary"
              >
                Give Now
              </a>
              <a href="#how-it-works" className="btn-outline">
                How It Works
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* How it works — Tithing vs Kingdom Builders */}
      <section id="how-it-works" className="py-24 md:py-32 bg-fc-black-soft border-t border-fc-cream/10">
        <div className="container-fc">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.6 }}
            className="max-w-3xl mb-16"
          >
            <p className="eyebrow mb-4">How It Works</p>
            <h2 className="display-xl text-4xl md:text-6xl">
              Two buckets.<br />
              <span className="text-fc-gold">One direction.</span>
            </h2>
            <p className="mt-6 text-lg text-fc-cream/70 leading-relaxed max-w-2xl">
              Freeway is a tithing church. Our congregation gives 10% of their income — and we
              give 10% of our general budget back out to missionary partners, locally and
              around the world. Everything beyond the tithe becomes something we call
              Kingdom Builders.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.6 }}
              className="relative border-l-2 border-fc-teal pl-8 py-2"
            >
              <p className="eyebrow mb-3">The Tithe</p>
              <h3 className="font-display font-black uppercase text-3xl md:text-4xl leading-none mb-5">
                10% of income.
              </h3>
              <p className="text-fc-cream/80 leading-relaxed mb-4">
                For fully devoted followers of Christ, we expect a baseline of 10% of your
                income given to Freeway Church. This isn't a cover charge. It's not a hedge
                against God. It's practice — a rhythm of trust.
              </p>
              <p className="text-fc-cream/60 leading-relaxed italic">
                You can never out-give God.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.6, delay: 0.12 }}
              className="relative border-l-2 border-fc-gold pl-8 py-2"
            >
              <p className="eyebrow mb-3 text-fc-gold">Over and Above</p>
              <h3 className="font-display font-black uppercase text-3xl md:text-4xl leading-none mb-5">
                Kingdom Builders.
              </h3>
              <p className="text-fc-cream/80 leading-relaxed mb-4">
                Anyone who gives over and above their tithe is a Kingdom Builder. These
                dollars respond to specific, on-the-ground needs — disaster relief, Bibles,
                benevolence, camp scholarships, building upgrades. Never generic.
              </p>
              <p className="text-fc-cream/60 leading-relaxed italic">
                We don't give to cover bills. We give to leave a legacy.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Where it goes — 2025 Budget */}
      <section className="py-24 md:py-32 bg-fc-black border-t border-fc-cream/10">
        <div className="container-fc">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.6 }}
            className="max-w-3xl mb-14"
          >
            <p className="eyebrow mb-4">Where It Goes</p>
            <h2 className="display-xl text-4xl md:text-6xl">
              Every dollar, <br />
              <span className="text-fc-teal">on purpose.</span>
            </h2>
          </motion.div>

          {/* Detail list */}
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: '-60px' }}
            variants={{
              hidden: {},
              show: { transition: { staggerChildren: 0.08, delayChildren: 0.2 } },
            }}
            className="grid md:grid-cols-2 gap-x-12 gap-y-8"
          >
            {budget.map((b) => (
              <motion.div
                key={b.label}
                variants={{
                  hidden: { opacity: 0, y: 16 },
                  show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
                }}
                className="group flex items-start gap-5"
              >
                <div
                  className={`${b.color} w-1 self-stretch flex-shrink-0 mt-1 transition-all duration-300 group-hover:w-1.5`}
                />
                <div className="flex-1">
                  <h3 className="font-display font-bold uppercase tracking-wide text-xl mb-1">
                    {b.label}
                  </h3>
                  <p className="text-fc-cream/70 text-sm leading-relaxed">{b.detail}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Missionary Partners — funded by the tithe-on-tithe */}
      <section className="py-24 md:py-32 bg-fc-black-soft border-t border-fc-cream/10">
        <div className="container-fc">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.6 }}
            className="max-w-3xl mb-14"
          >
            <p className="eyebrow mb-4">Our Partners · Tithe on the Tithe</p>
            <h2 className="display-xl text-4xl md:text-6xl">
              Seven partners. <br />
              <span className="text-fc-teal">Three continents.</span>
            </h2>
            <p className="mt-6 text-lg text-fc-cream/70 leading-relaxed max-w-2xl">
              10% of our general budget goes straight back out — monthly support for
              missionaries and ministries we have real relationships with.
            </p>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: '-100px' }}
            variants={{
              hidden: {},
              show: { transition: { staggerChildren: 0.08, delayChildren: 0.1 } },
            }}
            className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-0 border-t border-l border-fc-cream/10"
          >
            {partners.map((p, i) => {
              const variants = {
                hidden: { opacity: 0, y: 16 },
                show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
              };
              const cardClass =
                'group relative overflow-hidden aspect-[4/3] md:aspect-[5/4] border-r border-b border-fc-cream/10';

              const inner = (
                <>
                  {p.image && (
                    <div
                      className="absolute inset-0 bg-cover bg-center grayscale group-hover:grayscale-0 scale-105 group-hover:scale-100 transition-all duration-700"
                      style={{ backgroundImage: `url(${p.image})` }}
                    />
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-fc-black via-fc-black/60 to-fc-black/30 group-hover:from-fc-black group-hover:via-fc-black/40 group-hover:to-transparent transition-all duration-500" />
                  <div className="absolute top-0 left-0 h-px bg-fc-teal w-0 group-hover:w-full transition-all duration-500" />
                  <span className="font-display text-fc-cream/50 text-xs tracking-widest2 absolute top-4 right-5 z-10">
                    0{i + 1}
                  </span>
                  <div className="absolute inset-x-0 bottom-0 p-6 md:p-8 z-10">
                    <h3 className="font-display font-black uppercase text-2xl md:text-3xl leading-none text-fc-cream drop-shadow-lg">
                      {p.name}
                    </h3>
                    {p.href && (
                      <span className="block mt-3 font-display uppercase tracking-widest2 text-[10px] text-fc-teal opacity-80 group-hover:opacity-100 transition-opacity">
                        Visit →
                      </span>
                    )}
                  </div>
                </>
              );

              return p.href ? (
                <motion.a
                  key={p.name}
                  href={p.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  variants={variants}
                  className={cardClass}
                >
                  {inner}
                </motion.a>
              ) : (
                <motion.div key={p.name} variants={variants} className={cardClass}>
                  {inner}
                </motion.div>
              );
            })}
          </motion.div>

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.7, delay: 0.6 }}
            className="mt-10 font-display uppercase tracking-widest2 text-sm text-fc-cream/60 text-center md:text-left"
          >
            Seven partners. Seven places. <span className="text-fc-teal">One table.</span>
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mt-14 pt-10 border-t border-fc-cream/10 grid md:grid-cols-12 gap-8 md:gap-12 items-start"
          >
            <div className="md:col-span-7">
              <h3 className="font-display font-black uppercase text-2xl md:text-3xl leading-tight text-fc-cream mb-3">
                Want to get more involved — <span className="text-fc-teal">or pray for these partners by name?</span>
              </h3>
              <p className="text-fc-cream/70 leading-relaxed max-w-xl">
                Reach out and we'll share specific prayer requests, upcoming trips, and ways
                you can support our partners beyond the tithe.
              </p>
            </div>
            <div className="md:col-span-5 md:justify-self-end">
              <a
                href="https://freewaychurch.churchcenter.com/people/forms/274372"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary"
              >
                Message Us
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Kingdom Builders deep dive */}
      <section className="py-24 md:py-32 bg-fc-black border-t border-fc-cream/10">
        <div className="container-fc">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.6 }}
            className="max-w-3xl mb-16"
          >
            <p className="eyebrow mb-4 text-fc-gold">Kingdom Builders</p>
            <h2 className="display-xl text-4xl md:text-6xl">
              We get to <span className="text-fc-gold">change the world.</span>
            </h2>
            <p className="mt-6 text-lg text-fc-cream/70 leading-relaxed max-w-2xl">
              Tithes carry the rhythm — Sundays, staff, missionary partners. Kingdom Builders
              carries the moments: disaster relief, Bibles, benevolence, camp scholarships,
              building upgrades. As a family we can accomplish more than we ever could by
              ourselves. Never generic. Always specific.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-12 gap-10 md:gap-16">
            {/* Principles */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.6 }}
              className="md:col-span-6 space-y-8"
            >
              <div>
                <div className="font-display text-fc-gold text-sm tracking-widest2 mb-2">01</div>
                <h3 className="font-display font-black uppercase text-2xl md:text-3xl leading-none mb-3">
                  You are a Kingdom Builder
                </h3>
                <p className="text-fc-cream/70 leading-relaxed">
                  Anyone who gives over and above their tithe is a Kingdom Builder. There's no
                  form, no intake meeting, no minimum commitment. If you give beyond the
                  tithe, you're in.
                </p>
              </div>
              <div>
                <div className="font-display text-fc-gold text-sm tracking-widest2 mb-2">02</div>
                <h3 className="font-display font-black uppercase text-2xl md:text-3xl leading-none mb-3">
                  First Fruits
                </h3>
                <p className="text-fc-cream/70 leading-relaxed">
                  Each year we kick off with a First Fruits offering — a moment to plan, vision,
                  and dream together about what God wants to do through us in the coming year.
                </p>
              </div>
              <div>
                <div className="font-display text-fc-gold text-sm tracking-widest2 mb-2">03</div>
                <h3 className="font-display font-black uppercase text-2xl md:text-3xl leading-none mb-3">
                  2026 goal
                </h3>
                <p className="text-fc-cream/70 leading-relaxed">
                  We're aiming for{' '}
                  <span className="text-fc-teal font-display font-bold">$23,100</span> in Kingdom
                  Builders giving this year — enough to give raises to every missionary we
                  support.
                </p>
              </div>
            </motion.div>

            {/* Growth chart */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="md:col-span-6"
            >
              <div className="bg-fc-black p-8 md:p-10 border border-fc-cream/10">
                <p className="eyebrow mb-6">The Trajectory</p>
                <div className="relative h-72 flex items-end justify-between gap-3 md:gap-5 border-b border-fc-cream/10 pb-2">
                  {kbHistory.map((y, i) => {
                    const heightPct = (y.amount / kbMaxForChart) * 100;
                    return (
                      <motion.div
                        key={y.year}
                        initial={{ height: 0 }}
                        whileInView={{ height: `${heightPct}%` }}
                        viewport={{ once: true, margin: '-100px' }}
                        transition={{ duration: 0.9, delay: 0.2 + i * 0.1, ease: [0.2, 0.8, 0.2, 1] }}
                        className="flex-1 bg-fc-gold"
                      />
                    );
                  })}
                  {/* 2026 goal — dashed outline */}
                  <motion.div
                    initial={{ height: 0 }}
                    whileInView={{ height: `${(kbGoal / kbMaxForChart) * 100}%` }}
                    viewport={{ once: true, margin: '-100px' }}
                    transition={{ duration: 0.9, delay: 0.6, ease: [0.2, 0.8, 0.2, 1] }}
                    className="flex-1 border-2 border-dashed border-fc-teal relative flex items-end justify-center"
                  >
                    <span className="absolute -top-6 font-display uppercase tracking-widest2 text-[10px] text-fc-teal whitespace-nowrap">
                      Goal
                    </span>
                  </motion.div>
                </div>
                <div className="flex justify-between gap-3 md:gap-5 mt-3 font-display text-xs text-fc-cream/60 tracking-widest2 uppercase">
                  {kbHistory.map((y) => (
                    <div key={y.year} className="flex-1 text-center">
                      {y.year}
                    </div>
                  ))}
                  <div className="flex-1 text-center text-fc-teal">2026</div>
                </div>
              </div>
            </motion.div>
          </div>

          {/* What Kingdom Builders funds */}
          <div className="mt-20 md:mt-28">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{ duration: 0.6 }}
              className="max-w-2xl mb-10"
            >
              <p className="eyebrow mb-4 text-fc-gold">What It Funds</p>
              <h3 className="font-display font-black uppercase text-3xl md:text-5xl leading-none">
                Specific needs. <br />
                <span className="text-fc-gold">Real moments.</span>
              </h3>
            </motion.div>

            <motion.div
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, margin: '-80px' }}
              variants={{
                hidden: {},
                show: { transition: { staggerChildren: 0.08, delayChildren: 0.1 } },
              }}
              className="grid sm:grid-cols-2 lg:grid-cols-5 gap-0 border-t border-l border-fc-cream/10"
            >
              {kbFunds.map((f, i) => (
                <motion.div
                  key={f.title}
                  variants={{
                    hidden: { opacity: 0, y: 16 },
                    show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
                  }}
                  className="group relative p-8 border-r border-b border-fc-cream/10 hover:bg-fc-black-soft transition-colors"
                >
                  <div className="absolute top-0 left-0 h-px bg-fc-gold w-0 group-hover:w-full transition-all duration-500" />
                  <span className="font-display text-fc-cream/30 text-xs tracking-widest2 block mb-4">
                    0{i + 1}
                  </span>
                  <h4 className="font-display font-black uppercase text-xl leading-tight mb-3 text-fc-cream">
                    {f.title}
                  </h4>
                  <p className="text-fc-cream/70 text-sm leading-relaxed">{f.body}</p>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* Pastoral note */}
      <section className="py-24 md:py-32 bg-fc-black border-t border-fc-cream/10">
        <div className="container-fc">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.7 }}
            className="grid md:grid-cols-12 gap-10 md:gap-14 items-center"
          >
            <div className="md:col-span-5">
              <div className="relative border border-fc-cream/10 overflow-hidden aspect-[4/5] max-w-sm mx-auto md:mx-0">
                <img
                  src="/images/roy-preaching.jpg"
                  alt="Pastor Roy Lucier"
                  className="h-full w-full object-cover"
                  loading="lazy"
                />
              </div>
            </div>
            <div className="md:col-span-7">
              <p className="eyebrow mb-6">A Note from Pastor Roy</p>
              <p className="font-display font-medium text-2xl md:text-3xl leading-snug text-fc-cream mb-8">
                "Praise God that he continues to gently move us into deeper Godly wisdom as we
                walk our own path of surrender and transformation. May God's kingdom come to
                Albion and the surrounding areas as it is in heaven."
              </p>
              <p className="font-display uppercase tracking-widest2 text-sm text-fc-cream/60">
                — Pastors Roy and Elissa Lucier
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Final CTAs */}
      <section className="py-24 md:py-32 bg-fc-black-soft border-y border-fc-cream/10">
        <div className="container-fc">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.6 }}
            className="max-w-3xl"
          >
            <h2 className="display-xl text-4xl md:text-6xl mb-10">
              Ready to give?
            </h2>
            <div className="flex flex-wrap gap-4">
              <a
                href="https://freewaychurch.churchcenter.com/giving"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary"
              >
                Give Now
              </a>
              <MailLink
                subject="Talk to a Pastor"
                className="btn-outline"
                ariaLabel="Email a pastor"
              >
                Talk to a Pastor
              </MailLink>
            </div>
            <p className="mt-8 font-display uppercase tracking-widest2 text-xs text-fc-cream/50 max-w-md leading-relaxed">
              Ephesians 2:10 — "For we are God's masterpiece. He has created us anew in
              Christ Jesus, so we can do the good things he planned for us long ago."
            </p>
          </motion.div>
        </div>
      </section>
    </main>
  );
}
