import { motion } from 'framer-motion';

export default function Vision() {
  return (
    <section id="vision" className="relative py-28 md:py-40 bg-fc-black">
      <div className="container-fc grid md:grid-cols-12 gap-10">
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.7 }}
          className="md:col-span-4"
        >
          <p className="eyebrow mb-4">The Vision</p>
          <h2 className="font-display font-black uppercase text-4xl md:text-5xl leading-[0.95]">
            A legacy<br />
            <span className="text-fc-gold">worth</span><br />
            leaving.
          </h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="md:col-span-8 md:col-start-5"
        >
          <p className="text-2xl md:text-3xl leading-snug font-display font-medium text-fc-cream">
            Together, we are eagerly cultivating a legacy of Jesus followers.
            Freeway is a community that feels like home — driven with purpose,
            life-change, and Godly intimacy.
          </p>
          <div className="mt-10 flex flex-wrap gap-x-10 gap-y-4 text-sm text-fc-cream/60 uppercase tracking-widest2 font-display">
            <span>Est. Albion, MI</span>
            <span className="text-fc-teal">·</span>
            <span>One service. Real people.</span>
            <span className="text-fc-teal">·</span>
            <span>No show, no script</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
