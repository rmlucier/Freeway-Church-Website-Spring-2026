import { motion } from 'framer-motion';

export default function Community() {
  return (
    <section id="community" className="relative py-28 md:py-40 bg-fc-black overflow-hidden">
      <div className="container-fc">
        <div className="grid md:grid-cols-12 gap-10 md:gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.7 }}
            className="md:col-span-6"
          >
            <p className="eyebrow mb-4">The Room</p>
            <h2 className="display-xl text-4xl md:text-6xl mb-8">
              You don't have to<br />
              <span className="text-fc-gold">have it together</span><br />
              to be here.
            </h2>
            <p className="text-fc-cream/80 text-lg leading-relaxed mb-6">
              Freeway is full of people at different places in their faith — some who have walked
              with Jesus for decades, some who just walked in for the first time, and plenty
              figuring it out in between. All of that belongs here.
            </p>
            <p className="text-fc-cream/60 leading-relaxed">
              We're not trying to impress anyone. We're trying to be real — with God, with each
              other, and with the world we're called to love. If that sounds like a community
              you'd want to be part of, we'd love to meet you.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.7, delay: 0.15 }}
            className="md:col-span-6 grid grid-cols-6 gap-4"
          >
            <div className="col-span-4 row-span-2">
              <img
                src="/images/community-group.jpg"
                alt="Freeway community gathered together"
                className="h-full w-full object-cover"
                loading="lazy"
              />
            </div>
            <div className="col-span-2 aspect-square">
              <img
                src="/images/community-worship.jpg"
                alt="Drummer leading worship"
                className="h-full w-full object-cover"
                loading="lazy"
              />
            </div>
            <div className="col-span-2 aspect-square">
              <img
                src="/images/community-prayer.jpg"
                alt="Hands raised in worship"
                className="h-full w-full object-cover"
                loading="lazy"
              />
            </div>
            <div className="col-span-6 aspect-[21/9]">
              <img
                src="/images/community-kids.jpg"
                alt="Kids playing on a tire swing"
                className="h-full w-full object-cover"
                loading="lazy"
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
