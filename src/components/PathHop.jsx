import { useEffect, useId, useRef } from 'react';
import { useInView, useReducedMotion } from 'framer-motion';

// A dashed paper-plane flight path for the Academy page. A little plane flies
// ALONG the dotted trail (SMIL <animateMotion>, same as the hero AirplaneTrail),
// triggered when the hop scrolls into view.
//
// Two shapes:
//   • default ("hop")    — a long, sweeping horizontal trail that sits in a
//                          section's bottom padding.
//   • vertical ("bridge")— a tall descending trail meant to be absolutely
//                          positioned straddling the seam between two sections,
//                          so the plane flies from one section into the next.
//
// SMIL starts on page load, which would waste a below-the-fold flight, so we
// start it with begin="indefinite" and fire beginElement() on scroll-in.
// prefers-reduced-motion drops the plane at the end of the trail.

const SHAPES = {
  horizontal: {
    viewBox: '0 0 460 120',
    d: 'M12 30 C 150 30, 150 92, 250 90 C 330 88, 330 40, 458 92',
    end: 'translate(458,92) rotate(30)',
    dur: '2.4s',
  },
  vertical: {
    viewBox: '0 0 200 360',
    d: 'M104 8 C 30 74, 176 150, 100 214 C 40 264, 150 300, 96 352',
    end: 'translate(96,352) rotate(115)',
    dur: '2.8s',
  },
};

function Plane({ color }) {
  // Nose points toward +x so rotate="auto" orients it along the path tangent.
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

export default function PathHop({
  color = '#009B8D',
  flip = false,
  vertical = false,
  className = '',
}) {
  const reduce = useReducedMotion();
  const containerRef = useRef(null);
  const motionRef = useRef(null);
  const inView = useInView(containerRef, { once: true, margin: '-80px' });
  const trailId = `hop-trail-${useId().replace(/[:]/g, '')}`;

  const shape = vertical ? SHAPES.vertical : SHAPES.horizontal;

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
        viewBox={shape.viewBox}
        fill="none"
        className={`overflow-visible ${flip ? '-scale-x-100' : ''} ${
          vertical ? 'h-44 md:h-64 w-auto' : 'w-full max-w-lg h-auto'
        }`}
      >
        <path
          id={trailId}
          d={shape.d}
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeDasharray="1 10"
          className="text-fc-cream/25"
        />

        {reduce ? (
          <g transform={shape.end}>
            <Plane color={color} />
          </g>
        ) : (
          <g style={{ opacity: inView ? 1 : 0, transition: 'opacity 0.25s ease' }}>
            <animateMotion
              ref={motionRef}
              dur={shape.dur}
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
