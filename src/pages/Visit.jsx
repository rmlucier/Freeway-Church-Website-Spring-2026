import { useEffect } from 'react';
import { motion } from 'framer-motion';

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
      'Grab a cup in the commons before service and stick around for fellowship after. You are not walking into a room of strangers for longer than a cup of coffee.',
  },
  {
    title: 'Your kids are safe.',
    body:
      'Kids (K–5th) sit with you through worship, then Kidsway dismisses during the greeting so they head down for their own lesson. Background-checked, trained team. Nursery for the littlest ones.',
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
    a: 'Main entrance on the front of the building — you can\'t miss it. A greeter will meet you inside.',
  },
  {
    q: 'What about my kids?',
    a: 'Kids (K–5th) stay with you during the worship set, then Kidsway dismisses about 30 minutes in during the greeting time. You can sign them in when you first arrive and grab a nametag, or wait and sign them in right before they head down. Either works.',
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
const mapsEmbed = `https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2952.7222710448855!2d-84.74432480493775!3d42.26310316697449!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x883d4576470f903b%3A0x468424fe76a1d8ff!2sFreeway%20Church!5e0!3m2!1sen!2sus!4v1725637081321!5m2!1sen!2sus`;
const mapsLink = `https://www.google.com/maps/search/?api=1&query=${mapsQuery}`;

export default function Visit() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <main className="pt-28">
      {/* Hero */}
      <section className="relative py-24 md:py-40 bg-fc-black overflow-hidden">
        <div className="container-fc">
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
            <p className="mt-10 text-xl md:text-2xl text-fc-cream/80 leading-snug max-w-2xl font-display font-medium">
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
                className="group relative p-8 md:p-10 border-r border-b border-fc-cream/10"
              >
                <div className="absolute top-0 left-0 h-px bg-fc-teal w-0 group-hover:w-full transition-all duration-500" />
                <span className="font-display text-fc-cream/30 text-xs tracking-widest2 absolute top-3 right-4">
                  0{i + 1}
                </span>
                <h3 className="font-display font-black uppercase text-2xl md:text-3xl leading-none mb-4 text-fc-cream">
                  {e.title}
                </h3>
                <p className="text-fc-cream/70 leading-relaxed">{e.body}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

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
            className="max-w-3xl"
          >
            <p className="eyebrow mb-6">See You Sunday</p>
            <h2 className="display-xl text-4xl md:text-6xl mb-8">
              We'll be watching<br />
              <span className="text-fc-gold">for you.</span>
            </h2>
            <p className="text-fc-cream/70 text-lg leading-relaxed mb-10 max-w-2xl">
              Let us know you're planning to come. We'll keep an eye out, say hi, and make sure
              your first visit isn't your last.
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
          </motion.div>
        </div>
      </section>
    </main>
  );
}
