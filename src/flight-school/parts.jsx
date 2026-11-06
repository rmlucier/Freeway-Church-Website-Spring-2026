import { useState } from 'react';
import { QUADRANTS, TRAITS, sliderLabel } from './content.js';

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

/** Opens the sermon on this trait from the series, at the start of the message. */
export function MessageLink({ trait }) {
  return (
    <a
      className="fs-message"
      data-trait={trait.id}
      href={trait.message}
      target="_blank"
      rel="noopener noreferrer"
    >
      <span className="fs-label">{trait.name}</span>
      <span className="fs-small">{trait.messageDate}</span>
      <span className="sr-only"> (opens YouTube)</span>
    </a>
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

const BAR_SEGMENTS = 20;

const formatChange = (change) => {
  const rounded = Math.round(change * 10) / 10;
  if (rounded === 0) return 'Same';
  return `${rounded > 0 ? 'Up' : 'Down'} ${Math.abs(rounded).toFixed(1)}`;
};

/**
 * Level meters sorted strongest to weakest, so the eye lands on what matters:
 * where you're strong and where to start. Ticks mark the Middle and High bands.
 */
export function ResultsBars({ traits, previous }) {
  const ranked = [...TRAITS].sort((a, b) => traits[b.id].score - traits[a.id].score);
  const strongest = ranked[0];
  const startHere = ranked[ranked.length - 1];
  const allEven = traits[strongest.id].score === traits[startHere.id].score;

  return (
    <div className="fs-stack">
      {!allEven && (
        <div className="fs-read-out">
          <p>
            <span className="fs-small">Strongest</span>
            <br />
            <span className="fs-label" data-trait={strongest.id} style={{ color: 'var(--trait)' }}>
              {strongest.name}
            </span>
          </p>
          <p>
            <span className="fs-small">Start here</span>
            <br />
            <span className="fs-label" data-trait={startHere.id} style={{ color: 'var(--trait)' }}>
              {startHere.name}
            </span>
          </p>
        </div>
      )}
      {ranked.map((trait) => {
        const { score, band } = traits[trait.id];
        return (
          <div key={trait.id} data-trait={trait.id}>
            <div className="fs-bar-head">
              <span className="fs-label" style={{ color: 'var(--trait)' }}>
                {trait.name}
              </span>
              <span>
                {previous && (
                  <span className="fs-small">
                    {formatChange(score - previous[trait.id])}{' '}
                  </span>
                )}
                <span className="fs-small">{band} </span>
                <span className="fs-readout">{score.toFixed(1)}</span>
              </span>
            </div>
            <div
              className="fs-meter-bar"
              role="img"
              aria-label={`${trait.name}: ${score.toFixed(1)} out of 10, ${band}`}
            >
              {Array.from({ length: BAR_SEGMENTS }, (_, i) => (
                <span key={i} className={score >= (i + 1) / 2 ? 'on' : ''} />
              ))}
              <i style={{ left: '50%' }} />
              <i style={{ left: '75%' }} />
            </div>
          </div>
        );
      })}
      <p className="fs-small fs-ends">
        <span>0</span>
        <span>Low under 5.0 &middot; High from 7.5</span>
        <span>10</span>
      </p>
    </div>
  );
}

export function Counter({ n, total, label = 'Question' }) {
  return (
    <div style={{ marginBottom: 24 }}>
      <p className="fs-readout" style={{ fontSize: 28, marginBottom: 8 }}>
        {label} {n} of {total}
      </p>
      <Progress total={total} done={n} />
    </div>
  );
}

/** The pride-up / pride-down result. Only used where the bonus was taken. */
export function BonusResult({ results, checked, onToggle }) {
  const quadrant = QUADRANTS[results.quadrant];
  return (
    <article className="fs-card fs-stack" data-trait="teachable">
      <h2>{quadrant.name}</h2>
      <div className="fs-well" style={{ display: 'flex', justifyContent: 'space-around', gap: 16 }}>
        <div>
          <div className="fs-small">Pride up</div>
          <div className="fs-readout">{results.prideUp.toFixed(1)}</div>
        </div>
        <div>
          <div className="fs-small">Pride down</div>
          <div className="fs-readout">{results.prideDown.toFixed(1)}</div>
        </div>
      </div>
      <p className="fs-small">
        Pride up is "I know better." Pride down is "I'm not good enough." Higher means more pride.
      </p>
      <p>{quadrant.text}</p>
      <NextStep checked={checked} onToggle={onToggle}>
        {quadrant.next}
      </NextStep>
    </article>
  );
}

/** Shows a statement back to the person with the answer they gave. */
export function Quote({ label, text }) {
  return (
    <blockquote className="fs-quote">
      <p>"{text}"</p>
      <p className="fs-small">You said: {label}</p>
    </blockquote>
  );
}

/** Who's ahead of you, you, and who you're helping. A blank spot is the point. */
export function DiscipleshipChain({ helpers, sentTo }) {
  const link = (role, name) => (
    <div className={`fs-chain-link ${name ? '' : 'empty'}`}>
      <span className="fs-small">{role}</span>
      <strong>{name || 'No one named yet'}</strong>
    </div>
  );
  return (
    <div className="fs-chain">
      {link('Ahead of you', helpers?.trim())}
      <span aria-hidden="true" className="fs-chain-arrow"><i /></span>
      <div className="fs-chain-link you">
        <strong>You</strong>
      </div>
      <span aria-hidden="true" className="fs-chain-arrow"><i /></span>
      {link("You're helping", sentTo?.trim())}
    </div>
  );
}

/**
 * A next step with a box to check off. Shared logs pass no `onToggle`, so a
 * mentor sees an unchecked box they can't change.
 */
export function NextStep({ children, checked = false, onToggle }) {
  return (
    <label className={`fs-next ${checked ? 'done' : ''}`}>
      <input
        type="checkbox"
        checked={checked}
        disabled={!onToggle}
        onChange={(e) => onToggle?.(e.target.checked)}
      />
      <span className="fs-next-text">
        <span className="fs-next-label">Next step</span>
        {children}
      </span>
    </label>
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
