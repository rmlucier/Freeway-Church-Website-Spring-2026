import { motion } from 'framer-motion';

// A dashed flight-path "hop" that sits between sections on the Academy page:
// the dashed trail draws itself in and a little paper plane glides to the end as
// you scroll to it. Chained down the page (alternating direction + color) it
// reads as one continuous paper-plane journey — the playful signature that sets
// the Academy apart from the rest of the site.
//
// Uses framer whileInView (not SMIL) so each hop animates when it scrolls into
// view rather than firing on page load, and so it honors reduced motion via the
// page's MotionConfig.

export default function PathHop({ color = '#009B8D', flip = false, className = '' }) {
  return (
    <div className={`flex justify-center ${className}`} aria-hidden="true">
      <svg
        viewBox="0 0 240 80"
        fill="none"
        className={`w-44 md:w-60 h-auto overflow-visible ${flip ? '-scale-x-100' : ''}`}
      >
        <motion.path
          d="M10 16 C 80 16, 110 64, 230 64"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeDasharray="1 10"
          className="text-fc-cream/25"
          initial={{ opacity: 0, x: -16 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.9, ease: [0.2, 0.8, 0.2, 1] }}
        />
        <motion.g
          initial={{ opacity: 0, x: -14, y: -10 }}
          whileInView={{ opacity: 1, x: 0, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.6, ease: [0.2, 0.8, 0.2, 1], delay: 0.55 }}
        >
          <g transform="translate(230,64) rotate(20)">
            <path
              d="M8 0 L-20 -11 L-12 0 L-20 11 Z"
              fill={color}
              stroke="#1C1C1C"
              strokeWidth="1.6"
              strokeLinejoin="round"
            />
            <path d="M8 0 L-12 0" stroke="#1C1C1C" strokeWidth="1.6" strokeLinecap="round" />
          </g>
        </motion.g>
      </svg>
    </div>
  );
}
