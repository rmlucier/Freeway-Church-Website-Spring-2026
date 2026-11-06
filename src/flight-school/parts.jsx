import { useState } from 'react';
import { TRAITS, sliderLabel } from './content.js';

// Line-art aviation icons from the style guide: 2px strokes, one color, no
// fills, square caps. Decorative, so the trait name always sits beside them.
const ICON_PATHS = {
  // The instrument panel
  faithful: (
    <>
      <path d="M3 13h42v24H3z" />
      <circle cx="15" cy="25" r="7" />
      <circle cx="33" cy="25" r="7" />
      <path d="M15 25l4-4M33 25l-5 2M9 41h30" />
    </>
  ),
  // The radio / headset
  available: (
    <>
      <path d="M8 27v-5a16 16 0 0 1 32 0v5" />
      <path d="M4 27h8v12H4zM36 27h8v12h-8z" />
      <path d="M40 39v4H26" />
    </>
  ),
  // An approach chart
  teachable: (
    <>
      <path d="M7 4h26l8 8v32H7z" />
      <path d="M33 4v8h8" />
      <path d="M20 36l-4 5M28 36l4 5M20 36h8" />
      <path d="M24 31v-3M24 24v-3M24 17v-3" />
    </>
  ),
  // A plane taking off
  missional: (
    <>
      <path d="M3 42h42" />
      <path d="M6 31l6-2 5 3 24-11c3-1 4 2 2 4L19 37H11z" />
      <path d="M24 26l-8-9h5l11 5" />
    </>
  ),
};

export function TraitIcon({ trait }) {
  return (
    <svg
      className="fs-icon"
      viewBox="0 0 48 48"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="square"
      strokeLinejoin="miter"
      aria-hidden="true"
    >
      {ICON_PATHS[trait]}
    </svg>
  );
}

/** Segmented bar, like a radio level meter. */
export function Progress({ total, done }) {
  return (
    <div className="fs-progress" aria-hidden="true">
      {Array.from({ length: total }, (_, i) => (
        <span key={i} className={i < done ? 'on' : ''} />
      ))}
    </div>
  );
}

/**
 * The 0-10 slider. It starts unanswered: the thumb waits in the middle, greyed
 * out, and Next stays off until the person touches it. That way nobody can
 * click through and score a 5 by accident.
 */
export function RatingSlider({ label, value, onChange }) {
  const answered = typeof value === 'number';
  const shown = answered ? value : 5;
  const commit = (e) => onChange(Number(e.target.value));

  return (
    <div>
      <p
        className={`fs-readout fs-slider-label ${answered ? '' : 'waiting'}`}
        aria-live="polite"
      >
        {answered ? sliderLabel(value) : 'Move the slider'}
      </p>
      <div className="fs-slider">
        <div className="fs-meter" aria-hidden="true">
          {Array.from({ length: 20 }, (_, i) => (
            <span key={i} className={answered && value >= (i + 1) / 2 ? 'on' : ''} />
          ))}
        </div>
        <input
          type="range"
          min="0"
          max="10"
          step="0.1"
          value={shown}
          aria-label={label}
          aria-valuetext={answered ? sliderLabel(value) : 'Not answered yet'}
          className={`fs-range ${answered ? '' : 'untouched'}`}
          onChange={commit}
          onPointerUp={commit}
          onKeyUp={(e) => {
            if (e.key.startsWith('Arrow') || e.key === 'Home' || e.key === 'End') commit(e);
          }}
        />
      </div>
      <p className="fs-small fs-ends" style={{ marginTop: 8 }}>
        <span>Not true of me</span>
        <span>Almost always true</span>
      </p>
    </div>
  );
}

const WHEEL_ORDER = ['faithful', 'available', 'teachable', 'missional'];
const C = 160;
const MAX_R = 150;

function wedge(trait, radius) {
  const points = {
    faithful: [[C - radius, C], [C, C - radius]],
    available: [[C, C - radius], [C + radius, C]],
    teachable: [[C + radius, C], [C, C + radius]],
    missional: [[C, C + radius], [C - radius, C]],
  }[trait];
  return `M${C} ${C}L${points[0].join(' ')}A${radius} ${radius} 0 0 1 ${points[1].join(' ')}Z`;
}

/** Four equal segments filled from the center by score, named outside the wheel. */
export function ResultsWheel({ traits }) {
  const summary = TRAITS.map((t) => `${t.name} ${traits[t.id].score.toFixed(1)}`).join(', ');
  const label = (id) => {
    const trait = TRAITS.find((t) => t.id === id);
    return (
      <div data-trait={id}>
        <div className="fs-label fs-wheel-label">{trait.name}</div>
        <div className="fs-readout">{traits[id].score.toFixed(1)}</div>
      </div>
    );
  };

  return (
    <div>
      <div className="fs-wheel-labels" style={{ marginBottom: 8 }}>
        {label('faithful')}
        {label('available')}
      </div>
      <svg className="fs-wheel" viewBox="0 0 320 320" role="img" aria-label={`Your scores: ${summary}`}>
        {WHEEL_ORDER.map((id) => (
          <path key={id} d={wedge(id, MAX_R)} fill="var(--panel-dark)" stroke="var(--panel-line)" strokeWidth="2" />
        ))}
        {WHEEL_ORDER.map((id) => (
          <path
            key={id}
            d={wedge(id, Math.max(traits[id].score, 0) * (MAX_R / 10))}
            style={{ fill: `var(--${id})` }}
          />
        ))}
      </svg>
      <div className="fs-wheel-labels" style={{ marginTop: 8 }}>
        {label('missional')}
        {label('teachable')}
      </div>
    </div>
  );
}

export function NextStep({ children }) {
  return (
    <p className="fs-next">
      <span>Next step</span>
      {children}
    </p>
  );
}

/** Short-lived "Copied" feedback for the copy button. */
export function useFlash(ms = 2000) {
  const [flash, setFlash] = useState('');
  const show = (text) => {
    setFlash(text);
    window.setTimeout(() => setFlash(''), ms);
  };
  return [flash, show];
}
