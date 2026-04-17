import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import SEO from '../components/SEO.jsx';
import FAQSchema from '../components/FAQSchema.jsx';
import LiteYouTube from '../components/LiteYouTube.jsx';

const expectations = [
  {
    title: 'Come as you are.',
    body:
      'Jeans. Sweatpants. A suit if that\'s your thing. You won\'t be the most dressed up or the most dressed down. We care way more about you being here than what you\'re wearing.',
  },
  {
    title: 'About 75 minutes.',
    body:
      'A full worship service — music, announcements, a message from Pastor Roy, response, and send-off. In and out in an hour and a quarter, give or take.',
  },
  {
    title: 'Coffee is on us.',
    body:
      "Free coffee in the commons before service. Stick around after for fellowship — snacks, conversation, and time to meet some of us. No one stays a stranger long.",
    image: '/images/visit-commons.jpg',
  },
  {
    title: 'Your kids are safe.',
    body:
      'Kids (K–5th) sit with you through worship, then Kidsway dismisses during the greeting so they head down for their own lesson. Background-checked, trained team. Nursery for the littlest ones.',
    image: '/images/visit-kids-play.jpg',
  },
];

const timeline = [
  { time: '9:45', label: 'Doors open', body: 'Come early, grab coffee, find a seat.' },
  { time: '10:00', label: 'Worship starts', body: 'Music, prayer, a few announcements.' },
  { time: '10:25', label: 'The message', body: '30–35 minutes from Pastor Roy. Kids head to Kidsway during the greeting right before the message.' },
  { time: '11:00', label: 'Response & close', body: 'Worship, response, sending.' },
  { time: '11:15', label: 'Prayer', body: 'Ten minutes together — for each other, for Albion, for whatever you carried in.' },
  { time: '11:30', label: 'Fellowship', body: 'Snacks, conversation, meet the pastors.' },
];

const faqs = [
  {
    q: 'Where do I park?',
    a: 'Plenty of parking in the main lot right off B Drive North. If it\'s your first time, pull in and someone will point you the right direction.',
  },
  {
    q: 'Which door do I use?',
    a: "The door right off the parking lot — that's the one we use. A greeter will meet you inside.",
  },
  {
    q: 'What about my kids?',
    a: (
      <>
        Nursery (0–5) runs during the whole service, and Kidsway (K–5th) leaves the
        auditorium for class during the greeting before the message. Sign in at the
        door — or check in online beforehand. See the{' '}
        <Link to="/kids" className="text-fc-teal hover:text-fc-gold transition-colors underline underline-offset-4">
          Kids page
        </Link>{' '}
        for safety policies, typical Sunday, and parent FAQs.
      </>
    ),
    // Plain-text version for FAQPage structured data (schema wants strings).
    plainA:
      'Nursery (0–5) runs during the whole service, and Kidsway (K–5th) leaves the auditorium for class during the greeting before the message. Sign in at the door — or check in online beforehand. See the Kids page for safety policies, typical Sunday, and parent FAQs.',
  },
  {
    q: 'Is there anything I should bring?',
    a: 'Nope. A Bible if you like — we also put the verses on screen. Just bring yourself.',
  },
  {
    q: 'What if I\'m running late?',
    a: 'Slip in the back. No one is counting. You\'re welcome at any point in the service.',
  },
  {
    q: 'Can I watch online first?',
    a: 'Yes — every Sunday streams on our YouTube channel. Some people watch for weeks before walking in. Totally fine.',
  },
];

const mapsQuery = encodeURIComponent('Freeway Church, 28900 B Dr N, Albion, MI 49224');
// Map is centered roughly on Parma (between Albion and Jackson) with a ~25-mile
// view so visitors see Albion in context — Albion west, Parma middle, Jackson east.
const mapsEmbed = `https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d50000!2d-84.58!3d42.245!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x883d4576470f903b%3A0x468424fe76a1d8ff!2sFreeway%20Church!5e0!3m2!1sen!2sus!4v1725637081321!5m2!1sen!2sus`;
const mapsLink = `https://www.google.com/maps/search/?api=1&query=${mapsQuery}`;

export default function Visit() {
  return (
    <main className="pt-28">
      <SEO
        path="/visit"
        title="Plan a Visit"
        description="Sundays at 10am · 28900 B Dr N, Albion, Michigan. Whether it's your first time in a church in years — or ever — you belong here. Free coffee, casual vibe, no pressure."
      />
      <FAQSchema items={faqs.map((f) => ({ q: f.q, a: f.plainA || f.a }))} />
      {/* Hero */}
      <section className="relative min-h-[80vh] flex items-end bg-fc-black overflow-hidden">
        <img
          src="/images/visit-exterior.jpg"
          alt="Freeway Church building, daytime"
          className="absolute inset-0 h-full w-full object-cover"
          fetchpriority="high"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-fc-black via-fc-black/70 to-fc-black/30" />
        <div className="container-fc relative z-10 py-20 md:py-28">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.2, 0.8, 0.2, 1] }}
            className="max-w-4xl"
          >
            <p className="eyebrow mb-6">Plan a Visit</p>
            <h1 className="display-xl text-5xl md:text-8xl leading-[0.9] text-fc-cream">
              We saved<br />
              <span className="text-fc-teal">you a seat.</span>
            </h1>
            <p className="mt-10 text-xl md:text-2xl text-fc-cream/90 leading-snug max-w-2xl font-display font-medium drop-shadow">
              Sundays at 10am. 28900 B Dr N, Albion. Whether it&apos;s your first time in a
              church in years — or ever — you belong here.
            </p>
            <div className="mt-10 flex flex-wrap gap-4">
              <a
                href="https://freewaychurch.churchcenter.com/people/forms/274372"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary"
              >
                Let Us Know You're Coming
              </a>
              <a href={mapsLink} target="_blank" rel="noopener noreferrer" className="btn-outline">
                Get Directions
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* What to expect */}
      <section className="py-24 md:py-32 bg-fc-black-soft border-t border-fc-cream/10">
        <div className="container-fc">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.6 }}
            className="max-w-3xl mb-16"
          >
            <p className="eyebrow mb-4">What to Expect</p>
            <h2 className="display-xl text-4xl md:text-6xl">
              Nothing weird.<br />
              <span className="text-fc-gold">Nothing scary.</span>
            </h2>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: '-100px' }}
            variants={{ hidden: {}, show: { transition: { staggerChildren: 0.1 } } }}
            className="grid md:grid-cols-2 gap-0 border-t border-l border-fc-cream/10"
          >
            {expectations.map((e, i) => (
              <motion.div
                key={e.title}
                variants={{
                  hidden: { opacity: 0, y: 16 },
                  show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
                }}
                className="group relative border-r border-b border-fc-cream/10 flex flex-col"
              >
                <div className="absolute top-0 left-0 h-px bg-fc-teal w-0 group-hover:w-full transition-all duration-500 z-10" />
                {e.image && (
                  <div className="aspect-[16/10] overflow-hidden">
                    <img
                      src={e.image}
                      alt={e.title}
                      className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                      loading="lazy"
                    />
                  </div>
                )}
                <div className="relative p-8 md:p-10 flex-1">
                  <span className="font-display text-fc-cream/30 text-xs tracking-widest2 absolute top-3 right-4">
                    0{i + 1}
                  </span>
                  <h3 className="font-display font-black uppercase text-2xl md:text-3xl leading-none mb-4 text-fc-cream">
                    {e.title}
                  </h3>
                  <p className="text-fc-cream/70 leading-relaxed">{e.body}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Sanctuary band */}
      <motion.section
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, margin: '-100px' }}
        transition={{ duration: 0.9 }}
        className="relative aspect-[21/9] md:aspect-[21/7] overflow-hidden border-t border-fc-cream/10"
      >
        <img
          src="/images/visit-sanctuary.jpg"
          alt="Congregation gathered for Sunday service"
          className="absolute inset-0 h-full w-full object-cover"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-fc-black/70 via-transparent to-fc-black/30" />
        <div className="absolute inset-0 flex items-end">
          <div className="container-fc pb-10 md:pb-16">
            <p className="font-display uppercase tracking-widest2 text-xs md:text-sm text-fc-cream/70 mb-2">
              Sunday · 10am
            </p>
            <p className="font-display font-black uppercase text-2xl md:text-4xl text-fc-cream leading-none max-w-2xl drop-shadow-lg">
              This is what a Sunday <span className="text-fc-teal">looks like.</span>
            </p>
          </div>
        </div>
      </motion.section>

      {/* Timeline */}
      <section className="py-24 md:py-32 bg-fc-black border-t border-fc-cream/10">
        <div className="container-fc">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.6 }}
            className="max-w-3xl mb-16"
          >
            <p className="eyebrow mb-4">The Hour</p>
            <h2 className="display-xl text-4xl md:text-6xl">
              A Sunday, <br />
              <span className="text-fc-teal">minute by minute.</span>
            </h2>
          </motion.div>

          <motion.ol
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: '-80px' }}
            variants={{ hidden: {}, show: { transition: { staggerChildren: 0.08 } } }}
            className="relative border-l border-fc-cream/10 ml-4"
          >
            {timeline.map((t) => (
              <motion.li
                key={t.time}
                variants={{
                  hidden: { opacity: 0, x: -10 },
                  show: { opacity: 1, x: 0, transition: { duration: 0.4 } },
                }}
                className="relative pl-8 pb-10 last:pb-0"
              >
                <div className="absolute -left-1.5 top-1 w-3 h-3 rounded-full bg-fc-teal" />
                <div className="flex items-baseline gap-4 flex-wrap">
                  <span className="font-display font-black text-2xl md:text-3xl text-fc-cream">
                    {t.time}
                  </span>
                  <span className="font-display uppercase tracking-widest2 text-sm text-fc-teal">
                    {t.label}
                  </span>
                </div>
                <p className="text-fc-cream/70 mt-2 max-w-xl">{t.body}</p>
              </motion.li>
            ))}
          </motion.ol>
        </div>
      </section>

      {/* Meet the Pastors */}
      <section className="py-24 md:py-32 bg-fc-black-soft border-t border-fc-cream/10">
        <div className="container-fc">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.7 }}
            className="grid md:grid-cols-12 gap-10 md:gap-16 items-center"
          >
            <div className="md:col-span-7 order-2 md:order-1">
              <p className="eyebrow mb-6">Meet the Pastors</p>
              <h2 className="display-xl text-4xl md:text-6xl mb-8">
                Roy &amp; Elissa<br />
                <span className="text-fc-teal">Lucier.</span>
              </h2>
              <p className="text-fc-cream/80 text-lg leading-relaxed mb-6">
                Roy and Elissa lead Freeway together — Roy full-time, Elissa part-time, both
                all in. They preach, pastor, pray, and live on mission in Albion with their
                family. When you walk in Sunday, you&apos;ll meet them.
              </p>
              <p className="text-fc-cream/60 leading-relaxed">
                Not performers. Not polished. Just two people who love Jesus, love Albion, and
                want to introduce you to both.
              </p>
            </div>
            <div className="md:col-span-5 order-1 md:order-2">
              <div className="relative border border-fc-cream/10 overflow-hidden aspect-video bg-fc-black">
                <LiteYouTube
                  videoId="Xq7t3PRIqOg"
                  title="A welcome from Pastors Roy and Elissa"
                />
              </div>
              <p className="mt-3 text-xs uppercase tracking-widest text-fc-cream/50">
                A quick hello from Roy &amp; Elissa
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-24 md:py-32 bg-fc-black-soft border-t border-fc-cream/10">
        <div className="container-fc">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.6 }}
            className="max-w-3xl mb-16"
          >
            <p className="eyebrow mb-4">Practical Stuff</p>
            <h2 className="display-xl text-4xl md:text-6xl">
              The questions <br />
              <span className="text-fc-gold">everyone has.</span>
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-x-12 gap-y-10 max-w-5xl">
            {faqs.map((f, i) => (
              <motion.div
                key={f.q}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.5, delay: i * 0.06 }}
              >
                <h3 className="font-display font-black uppercase tracking-wide text-xl text-fc-teal mb-3">
                  {f.q}
                </h3>
                <p className="text-fc-cream/75 leading-relaxed">{f.a}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Map */}
      <section className="py-24 md:py-32 bg-fc-black border-t border-fc-cream/10">
        <div className="container-fc">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.6 }}
            className="max-w-3xl mb-12"
          >
            <p className="eyebrow mb-4">Where We Are</p>
            <h2 className="display-xl text-4xl md:text-6xl">
              28900 B Dr N<br />
              <span className="text-fc-teal">Albion, MI 49224</span>
            </h2>
          </motion.div>

          <div className="border border-fc-cream/10 overflow-hidden aspect-[16/9] md:aspect-[21/9]">
            <iframe
              src={mapsEmbed}
              title="Freeway Church location"
              className="w-full h-full grayscale contrast-125"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              allowFullScreen
            />
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-24 md:py-32 bg-fc-black-soft border-y border-fc-cream/10">
        <div className="container-fc">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.6 }}
            className="grid md:grid-cols-12 gap-10 md:gap-16 items-center"
          >
            <div className="md:col-span-7">
              <p className="eyebrow mb-6">See You Sunday</p>
              <h2 className="display-xl text-4xl md:text-6xl mb-8">
                We can't wait<br />
                <span className="text-fc-gold">to see you.</span>
              </h2>
              <p className="text-fc-cream/70 text-lg leading-relaxed mb-10 max-w-2xl">
                Let us know you're planning to come. We'll say hi, introduce you around, and
                make sure your first visit isn't your last.
              </p>
              <div className="flex flex-wrap gap-4">
                <a
                  href="https://freewaychurch.churchcenter.com/people/forms/274372"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-primary"
                >
                  Let Us Know You're Coming
                </a>
                <a href="/#services" className="btn-outline">
                  See Sunday Schedule
                </a>
              </div>
            </div>
            <div className="md:col-span-5">
              <div className="relative border border-fc-cream/10 overflow-hidden aspect-[3/4] max-w-sm mx-auto md:mx-0 md:ml-auto">
                <img
                  src="/images/visit-fellowship.jpg"
                  alt="Fellowship after service"
                  className="h-full w-full object-cover"
                  loading="lazy"
                />
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </main>
  );
}
