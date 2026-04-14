import { motion } from 'framer-motion';
import Placeholder from './Placeholder.jsx';

export default function Hero() {
  return (
    <section id="top" className="relative min-h-screen flex items-center overflow-hidden pt-28 pb-20">
      {/* Background placeholder — will be replaced with hero photo/video */}
      <div className="absolute inset-0 z-0">
        <Placeholder label="Hero Image — wide worship / congregation shot" aspect="16/9" className="h-full w-full" />
        <div className="absolute inset-0 bg-gradient-to-b from-fc-black/70 via-fc-black/60 to-fc-black" />
      </div>

      <div className="container-fc relative z-10 grid md:grid-cols-12 gap-10 items-center">
        <div className="md:col-span-8">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="eyebrow mb-6"
          >
            Albion, Michigan · Sundays 10am
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="display-xl text-[clamp(3.5rem,10vw,9rem)] text-fc-cream"
          >
            Home<br />
            <span className="text-fc-teal">Free.</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mt-8 max-w-xl text-lg md:text-xl text-fc-cream/80 leading-relaxed"
          >
            A community that feels like home — driven by purpose, life-change, and real intimacy with God.
            Come as you are. Stay as long as you want.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="mt-10 flex flex-wrap gap-4"
          >
            <a href="#services" className="btn-primary">Plan a Visit</a>
            <a href="#vision" className="btn-outline">Our Story</a>
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
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
  );
}
