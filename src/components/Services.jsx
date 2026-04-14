import { motion } from 'framer-motion';

const schedule = [
  { time: '9:15 AM', name: 'Preservice Prayer' },
  { time: '10:00 AM', name: 'Worship Service' },
  { time: '11:30 AM', name: 'Fellowship' },
  { time: '6:00 PM', name: 'Freeway Youth' },
];

const programs = [
  {
    title: 'Sunday Service',
    body: 'One worship service, 10am, designed for people to experience God no matter where they are in their faith journey.',
  },
  {
    title: 'Kidsway',
    body: "Kids K–5th grade learn and worship in a safe, fun environment with our trained children's team.",
  },
  {
    title: 'Fellowship',
    body: 'Extended time together (with snacks) in the commons after every Sunday service.',
  },
  {
    title: 'Freeway Youth (FWY)',
    body: '6th–12th grade. Sunday evenings in small-group style, plus quarterly events. Real questions, real conversations.',
  },
];

// Albion, MI church address — update with full street address when confirmed
const mapsQuery = encodeURIComponent('Freeway Church, Albion, MI');
const mapsEmbed = `https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2952.7222710448855!2d-84.74432480493775!3d42.26310316697449!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x883d4576470f903b%3A0x468424fe76a1d8ff!2sFreeway%20Church!5e0!3m2!1sen!2sus!4v1725637081321!5m2!1sen!2sus`;
const mapsLink = `https://www.google.com/maps/search/?api=1&query=${mapsQuery}`;

export default function Services() {
  return (
    <section id="services" className="relative py-28 md:py-40 bg-fc-black-soft">
      <div className="container-fc">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6 }}
          className="mb-16 md:mb-20 max-w-3xl"
        >
          <p className="eyebrow mb-4">Every Sunday</p>
          <h2 className="display-xl text-4xl md:text-6xl">
            Here's what<br />
            a <span className="text-fc-teal">Sunday</span> looks like.
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-12 gap-10 md:gap-16">
          {/* Schedule */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.6 }}
            className="md:col-span-5"
          >
            <div className="bg-fc-black p-8 md:p-10 border border-fc-cream/10">
              <p className="eyebrow mb-6">The Rhythm</p>
              <ul className="divide-y divide-fc-cream/10">
                {schedule.map((s) => (
                  <li key={s.time} className="py-4 flex items-baseline justify-between gap-4">
                    <span className="font-display font-bold text-fc-teal text-lg tracking-wider">{s.time}</span>
                    <span className="font-display uppercase tracking-wide text-fc-cream/90">{s.name}</span>
                  </li>
                ))}
              </ul>

              <div className="mt-8 pt-8 border-t border-fc-cream/10">
                <p className="text-fc-cream/70 text-sm">
                  28900 B Dr N<br />
                  Albion, MI 49224
                </p>
                <a
                  href={mapsLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-4 inline-block text-fc-teal font-display uppercase tracking-widest2 text-sm hover:text-fc-gold transition-colors"
                >
                  Get Directions →
                </a>
              </div>
            </div>
          </motion.div>

          {/* Programs */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="md:col-span-7 grid sm:grid-cols-2 gap-6"
          >
            {programs.map((p) => (
              <div key={p.title} className="border-l-2 border-fc-teal pl-5">
                <h3 className="font-display font-bold uppercase text-xl mb-2 tracking-wide">{p.title}</h3>
                <p className="text-fc-cream/70 text-sm leading-relaxed">{p.body}</p>
              </div>
            ))}
          </motion.div>
        </div>

        {/* Map */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="mt-16 border border-fc-cream/10 overflow-hidden aspect-[16/7]"
        >
          <iframe
            src={mapsEmbed}
            title="Freeway Church location"
            className="w-full h-full grayscale contrast-125"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            allowFullScreen
          />
        </motion.div>
      </div>
    </section>
  );
}
