import { useReducedMotion } from 'framer-motion';

// The FreeWay Leadership Academy logo has a little paper-airplane-on-a-dashed-
// flight-path motif. This recreates it as scalable SVG so we can recolor it for
// the dark site and animate the plane flying in along the trail — a small,
// on-brand nod to the "Freeway / journey" idea.
//
// The trail is a dashed curve; the plane rides it via SMIL <animateMotion>,
// which scales cleanly with the SVG viewBox at any responsive size. We honor
// prefers-reduced-motion by dropping the plane at the end of the path instead
// of animating it.

const TRAIL = 'M6 122 C 92 98, 150 18, 214 60 C 262 92, 336 96, 414 30';

// Paper airplane drawn nosing toward +x so animateMotion rotate="auto" points
// it along the flight path. Roughly centered on the origin.
function Plane() {
  return (
    <g transform="translate(-7,0)">
      <path
        d="M26 0 L-12 -13 L-3 0 L-12 13 Z"
        fill="#D4B04A"
        stroke="#1C1C1C"
        strokeWidth="2"
        strokeLinejoin="round"
      />
      <path d="M26 0 L-3 0" fill="none" stroke="#1C1C1C" strokeWidth="2" strokeLinecap="round" />
    </g>
  );
}

export default function AirplaneTrail({ className = '' }) {
  const reduce = useReducedMotion();

  return (
    <div className={className} aria-hidden="true">
      <svg viewBox="0 0 420 150" fill="none" className="w-full h-auto overflow-visible">
        <path
          id="fla-trail"
          d={TRAIL}
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeDasharray="1 10"
          opacity="0.5"
        />

        {reduce ? (
          <g transform="translate(414,30) rotate(-38)">
            <Plane />
          </g>
        ) : (
          <g>
            <animateMotion
              dur="3.4s"
              begin="0.4s"
              fill="freeze"
              rotate="auto"
              calcMode="spline"
              keyTimes="0;1"
              keySplines="0.32 0 0.2 1"
            >
              <mpath href="#fla-trail" />
            </animateMotion>
            <Plane />
          </g>
        )}
      </svg>
    </div>
  );
}
