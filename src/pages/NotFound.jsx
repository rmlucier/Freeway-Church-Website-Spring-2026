import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

export default function NotFound() {
  return (
    <main className="min-h-screen flex items-center pt-28 pb-20 bg-fc-black">
      <div className="container-fc">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-3xl"
        >
          <p className="eyebrow mb-6">404 · Page not found</p>
          <h1 className="display-xl text-6xl md:text-8xl leading-[0.9] mb-10">
            Wrong turn.<br />
            <span className="text-fc-teal">Still welcome.</span>
          </h1>
          <p className="text-fc-cream/75 text-lg leading-relaxed max-w-xl mb-10">
            We can&apos;t find the page you&apos;re looking for — but here&apos;s where
            you probably wanted to go:
          </p>

          <nav aria-label="Site sections" className="grid sm:grid-cols-2 gap-4 max-w-xl mb-12">
            <Link
              to="/"
              className="border border-fc-cream/15 hover:border-fc-teal transition-colors p-6 group"
            >
              <p className="eyebrow text-xs mb-2 text-fc-teal">Start here</p>
              <p className="font-display font-black uppercase text-xl group-hover:text-fc-teal transition-colors">
                Home
              </p>
            </Link>
            <Link
              to="/visit"
              className="border border-fc-cream/15 hover:border-fc-teal transition-colors p-6 group"
            >
              <p className="eyebrow text-xs mb-2 text-fc-teal">New here?</p>
              <p className="font-display font-black uppercase text-xl group-hover:text-fc-teal transition-colors">
                Plan a Visit
              </p>
            </Link>
            <Link
              to="/beliefs"
              className="border border-fc-cream/15 hover:border-fc-teal transition-colors p-6 group"
            >
              <p className="eyebrow text-xs mb-2 text-fc-teal">Who we are</p>
              <p className="font-display font-black uppercase text-xl group-hover:text-fc-teal transition-colors">
                What We Believe
              </p>
            </Link>
            <Link
              to="/giving"
              className="border border-fc-cream/15 hover:border-fc-teal transition-colors p-6 group"
            >
              <p className="eyebrow text-xs mb-2 text-fc-teal">Steward</p>
              <p className="font-display font-black uppercase text-xl group-hover:text-fc-teal transition-colors">
                Giving
              </p>
            </Link>
          </nav>

          <Link to="/" className="btn-primary">
            Take me home
          </Link>
        </motion.div>
      </div>
    </main>
  );
}
