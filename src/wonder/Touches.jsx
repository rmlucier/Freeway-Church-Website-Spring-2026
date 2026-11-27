import { Link } from 'react-router-dom';
import { CHRISTMAS_EVE_TIME } from './config.js';
import './wonder.css';

// Nav: small cream "WONDER" pill next to Give. Scrolls to the series strip.
export function WonderNavPill({ className = '' }) {
  return (
    <Link to="/#wonder" className={`wonder-pill ${className}`}>
      Wonder
    </Link>
  );
}

// A sheep peeking up from the bottom edge of a section, looking up.
// The section it sits in needs `position: relative` (Services already has it).
export function WonderSheep() {
  return (
    <div className="wonder-sheep" aria-hidden="true">
      <img src="/images/wonder/sheep.svg" alt="" width="120" height="120" loading="lazy" decoding="async" />
    </div>
  );
}

// Next Steps cards: a star that replaces the card number on hover.
// Place it right before the number <span>; CSS hides that span on hover.
export function WonderStar() {
  return <img src="/images/wonder/star.svg" alt="" aria-hidden="true" className="wonder-star" width="40" height="40" loading="lazy" />;
}

// CSS-only twinkling cream dots for the closing "Free." area of the footer.
// Fixed positions/timings (not Math.random) so the pre-rendered HTML matches.
const DOTS = [
  [6, 8, 3, 9.5, -2.1], [14, 22, 2, 12.0, -7.4], [23, 6, 4, 7.2, -4.0], [31, 30, 2, 14.1, -1.3],
  [38, 12, 3, 6.4, -5.8], [45, 26, 2, 11.3, -9.9], [52, 5, 3, 8.8, -3.2], [61, 18, 2, 13.6, -6.6],
  [69, 9, 4, 10.2, -0.7], [76, 28, 2, 6.9, -8.1], [83, 14, 3, 12.7, -2.9], [91, 4, 2, 9.1, -5.2],
  [96, 24, 3, 14.8, -11.5], [3, 35, 2, 7.7, -6.0], [58, 34, 2, 11.9, -3.7],
];

export function WonderTwinkles() {
  return (
    <div className="wonder-twinkles" aria-hidden="true">
      {DOTS.map(([left, top, size, dur, delay], i) => (
        <span
          key={i}
          style={{
            left: `${left}%`,
            top: `${top}%`,
            width: size,
            height: size,
            animationDuration: `${dur}s`,
            animationDelay: `${delay}s`,
          }}
        />
      ))}
    </div>
  );
}

// Footer pieces
export function WonderChainStrip() {
  return <div className="wonder-chain" aria-hidden="true" />;
}

export function WonderFooterLine() {
  return (
    <p className="wonder-footer-line wonder-label">
      Christmas at Freeway · Sundays 10 AM · Christmas Eve {CHRISTMAS_EVE_TIME}
    </p>
  );
}

export function WonderHills({ id = 'wonder-wobble' }) {
  return (
    <svg
      className="wonder-hills"
      viewBox="0 0 1440 120"
      preserveAspectRatio="none"
      aria-hidden="true"
      focusable="false"
    >
      {/* Same hand-drawn wobble the series art uses on every line */}
      <defs>
        <filter id={id} x="-5%" y="-5%" width="110%" height="110%">
          <feTurbulence type="fractalNoise" baseFrequency="0.02" numOctaves="2" seed="4" />
          <feDisplacementMap in="SourceGraphic" scale="6" />
        </filter>
      </defs>
      <g filter={`url(#${id})`}>
        <path
          d="M0 62 C 200 22 420 18 640 48 S 1080 30 1260 34 S 1400 46 1440 50 V124 H0 Z"
          fill="#4A5CA8"
        />
        <path d="M0 86 C 260 52 560 60 860 84 S 1300 66 1440 74 V124 H0 Z" fill="#34448C" />
        <path d="M0 106 C 380 84 760 92 1080 104 S 1360 96 1440 98 V124 H0 Z" fill="#232F68" />
      </g>
    </svg>
  );
}
