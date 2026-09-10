import { useEffect, useId, useRef } from 'react';
import { useInView, useReducedMotion } from 'framer-motion';

// A dashed flight-path "hop" that sits between sections on the Academy page:
// a little paper plane actually flies ALONG the dotted trail — the same
// SMIL <animateMotion> technique as the hero's AirplaneTrail, so it tracks the
// path rather than just appearing at the end. Chained down the page
// (alternating direction + color) it reads as one continuous paper-plane
// journey — the playful signature that sets the Academy apart.
//
// SMIL normally begins on page load, which would mean a below-the-fold hop
// finishes flying before it's ever on screen. So we start it with
// begin="indefinite" and fire it via beginElement() once the hop scrolls into
// view. prefers-reduced-motion drops the plane at the end of the path instead.

const TRAIL = 'M10 16 C 80 16, 110 64, 230 64';

function Plane({ color }) {
  // Nose points toward +x so rotate="auto" orients it along the path.
  return (
    <g transform="translate(-7,0)">
      <path
        d="M22 0 L-14 -12 L-6 0 L-14 12 Z"
        fill={color}
        stroke="#1C1C1C"
        strokeWidth="1.6"
        strokeLinejoin="round"
      />
      <path d="M22 0 L-6 0" stroke="#1C1C1C" strokeWidth="1.6" strokeLinecap="round" />
    </g>
  );
}

export default function PathHop({ color = '#009B8D', flip = false, className = '' }) {
  const reduce = useReducedMotion();
  const containerRef = useRef(null);
  const motionRef = useRef(null);
  const inView = useInView(containerRef, { once: true, margin: '-80px' });
  const trailId = `hop-trail-${useId().replace(/[:]/g, '')}`;

  useEffect(() => {
    if (inView && !reduce && motionRef.current) {
      try {
        motionRef.current.beginElement();
      } catch {
        /* beginElement unsupported — plane simply stays at the path start */
      }
    }
  }, [inView, reduce]);

  return (
    <div ref={containerRef} className={`flex justify-center ${className}`} aria-hidden="true">
      <svg
        viewBox="0 0 240 80"
        fill="none"
        className={`w-44 md:w-60 h-auto overflow-visible ${flip ? '-scale-x-100' : ''}`}
      >
        <path
          id={trailId}
          d={TRAIL}
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeDasharray="1 10"
          className="text-fc-cream/25"
        />

        {reduce ? (
          <g transform="translate(230,64)">
            <Plane color={color} />
          </g>
        ) : (
          // Hidden until it's on screen, then the plane flies the trail.
          <g style={{ opacity: inView ? 1 : 0, transition: 'opacity 0.25s ease' }}>
            <animateMotion
              ref={motionRef}
              dur="1.8s"
              begin="indefinite"
              fill="freeze"
              rotate="auto"
              calcMode="spline"
              keyTimes="0;1"
              keySplines="0.32 0 0.2 1"
            >
              <mpath href={`#${trailId}`} />
            </animateMotion>
            <Plane color={color} />
          </g>
        )}
      </svg>
    </div>
  );
}
