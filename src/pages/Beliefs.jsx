import { motion } from 'framer-motion';
import SEO from '../components/SEO.jsx';
import MailLink from '../components/MailLink.jsx';

// AG's four CORE doctrines (from the 16 Fundamental Truths)
const doctrines = [
  {
    number: '01',
    title: 'Salvation',
    tagline: 'Rescued by grace, through faith.',
    body:
      'We believe every person is made for God and separated from him by sin — and that rescue is real. Salvation comes through repentance toward God and faith in Jesus Christ, whose death and resurrection cover what we could never fix. It is not earned. It is received.',
    scriptures: ['Romans 10:9–10', 'Ephesians 2:8–9', 'Titus 2:11'],
    accent: 'teal',
    image: '/images/beliefs-salvation.jpg',
    imageAlt: 'Woman raising her arms in joy after baptism',
  },
  {
    number: '02',
    title: 'Baptism in the Holy Spirit',
    tagline: 'God with you, God through you.',
    body:
      'We believe the baptism in the Holy Spirit is a distinct experience following salvation, given to empower believers for witness and service. It is the same Spirit poured out at Pentecost, still at work today — filling, gifting, and sending the church into the world.',
    scriptures: ['Acts 1:8', 'Acts 2:4', 'Acts 2:38–39'],
    accent: 'gold',
    image: '/images/beliefs-spirit.jpg',
    imageAlt: 'Hands raised in worship with an open Bible',
  },
  {
    number: '03',
    title: 'Divine Healing',
    tagline: 'The cross covers more than you think.',
    body:
      'We believe divine healing is integral to the gospel. Jesus carried our sickness as well as our sin, and deliverance from both is made possible through his atonement. We pray for healing in confidence — and we trust God\'s heart even when the answer takes longer than we hoped.',
    scriptures: ['Isaiah 53:4–5', 'Matthew 8:16–17', 'James 5:14–16'],
    accent: 'teal',
    image: '/images/beliefs-healing.jpg',
    imageAlt: 'Two women kneeling in prayer at an altar',
  },
  {
    number: '04',
    title: 'The Second Coming of Christ',
    tagline: 'He is coming back. This is not the end.',
    body:
      'We believe Jesus is returning — personally, visibly, gloriously. The blessed hope of the church is that Christ will come again to gather his people, judge in righteousness, and reign in a kingdom that has no end. This hope shapes how we live right now.',
    scriptures: ['1 Thessalonians 4:16–17', 'Titus 2:13', 'Revelation 22:12'],
    accent: 'gold',
    image: '/images/beliefs-horizon.jpg',
    imageAlt: 'Mountain ridge emerging from clouds at sunrise',
  },
];

export default function Beliefs() {
  return (
    <main className="pt-28">
      <SEO
        path="/beliefs"
        title="What We Believe"
        description="Freeway Church is an independent, Assemblies of God-affiliated church in Albion, Michigan. Here's a plain-English look at what we teach: Jesus, Scripture, the Holy Spirit, and why unity matters more than uniformity."
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
            <p className="eyebrow mb-6">What We Believe</p>
            <h1 className="display-xl text-5xl md:text-8xl leading-[0.9] text-fc-cream">
              The beliefs<br />
              <span className="text-fc-teal">that move us.</span>
            </h1>
            <p className="mt-10 text-xl md:text-2xl text-fc-cream/80 leading-snug max-w-2xl font-display font-medium">
              Freeway is part of the Assemblies of God. These four core doctrines shape how we
              preach, pray, and live.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Four Core Doctrines */}
      <section className="bg-fc-black-soft border-t border-fc-cream/10">
        {doctrines.map((d, i) => {
          const isEven = i % 2 === 0;
          const accentText = d.accent === 'teal' ? 'text-fc-teal' : 'text-fc-gold';
          const accentBg = d.accent === 'teal' ? 'bg-fc-teal' : 'bg-fc-gold';
          const accentBorder = d.accent === 'teal' ? 'border-fc-teal' : 'border-fc-gold';

          return (
            <motion.article
              key={d.number}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{ duration: 0.7, ease: [0.2, 0.8, 0.2, 1] }}
              className={`relative py-24 md:py-32 border-b border-fc-cream/10 ${
                isEven ? 'bg-fc-black-soft' : 'bg-fc-black'
              }`}
            >
              <div className="container-fc">
                <div
                  className={`grid md:grid-cols-12 gap-10 md:gap-16 items-start ${
                    isEven ? '' : 'md:[&>*:first-child]:order-2'
                  }`}
                >
                  {/* Left: image + title */}
                  <div className="md:col-span-5">
                    {d.image && (
                      <div className="relative border border-fc-cream/10 overflow-hidden aspect-[4/5] mb-8">
                        <img
                          src={d.image}
                          alt={d.imageAlt}
                          className="h-full w-full object-cover"
                          loading="lazy"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-fc-black/40 via-transparent to-transparent" />
                        <div
                          className={`absolute top-4 left-5 font-display font-black text-5xl md:text-6xl leading-none ${accentText} drop-shadow-lg`}
                        >
                          {d.number}
                        </div>
                      </div>
                    )}
                    <div className={`w-16 h-1 ${accentBg} mb-6`} />
                    <h2 className="display-xl text-4xl md:text-6xl leading-[0.95] text-fc-cream mb-4">
                      {d.title}
                    </h2>
                    <p className={`font-display italic text-xl md:text-2xl ${accentText}`}>
                      {d.tagline}
                    </p>
                  </div>

                  {/* Right: body + scriptures */}
                  <div className="md:col-span-7 md:pt-8">
                    <p className="text-fc-cream/80 text-lg md:text-xl leading-relaxed mb-10">
                      {d.body}
                    </p>
                    <div className={`border-l-2 ${accentBorder} pl-6`}>
                      <p className="eyebrow mb-3">Scripture</p>
                      <ul className="space-y-2">
                        {d.scriptures.map((s) => (
                          <li
                            key={s}
                            className="font-display uppercase tracking-widest2 text-sm text-fc-cream/70"
                          >
                            {s}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </motion.article>
          );
        })}
      </section>

      {/* Full 16 Fundamental Truths note */}
      <section className="py-24 md:py-32 bg-fc-black border-t border-fc-cream/10">
        <div className="container-fc">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.6 }}
            className="max-w-3xl"
          >
            <p className="eyebrow mb-6">The Fuller Picture</p>
            <h2 className="display-xl text-3xl md:text-5xl mb-8">
              Four core doctrines.<br />
              <span className="text-fc-teal">Sixteen fundamental truths.</span>
            </h2>
            <p className="text-fc-cream/70 text-lg leading-relaxed mb-8">
              These four — salvation, Spirit baptism, divine healing, and Christ's return — are
              the ones the Assemblies of God calls "core" because of the role they play in
              reaching the lost and building the church. They sit inside a broader Statement of
              Fundamental Truths shared by AG churches worldwide.
            </p>
            <a
              href="https://ag.org/Beliefs/Statement-of-Fundamental-Truths"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-outline"
            >
              Read All 16 →
            </a>
          </motion.div>
        </div>
      </section>

      {/* Pastoral close / CTA */}
      <section className="py-24 md:py-32 bg-fc-black-soft border-y border-fc-cream/10">
        <div className="container-fc">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.7 }}
            className="max-w-3xl"
          >
            <p className="eyebrow mb-6">Have Questions?</p>
            <h2 className="display-xl text-4xl md:text-6xl mb-8">
              Unity over<br />
              <span className="text-fc-gold">uniformity.</span>
            </h2>
            <p className="text-fc-cream/70 text-lg leading-relaxed mb-10 max-w-2xl">
              Christians disagree about plenty of things. What holds us together is Jesus —
              his life, his death, his resurrection, his return. If any of this is new,
              unclear, or stirring something, we'd love to talk it through. No pressure, no
              performance.
            </p>
            <div className="flex flex-wrap gap-4">
              <MailLink
                subject="Talk to a Pastor"
                className="btn-primary"
                ariaLabel="Email a pastor"
              >
                Talk to a Pastor
              </MailLink>
              <a href="/#services" className="btn-outline">
                Visit on Sunday
              </a>
            </div>
          </motion.div>
        </div>
      </section>
    </main>
  );
}
