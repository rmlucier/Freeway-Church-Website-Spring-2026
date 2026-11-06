import { useEffect, useMemo, useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import SEO from '../components/SEO.jsx';
import {
  CORE_ITEMS,
  CORE_ORDER,
  NAME_PROMPTS,
  OPENING_LINE,
  OPEN_QUESTIONS,
  RISK_QUESTION,
  YEARS_CHOICES,
  YEARS_QUESTION,
  traitById,
} from '../flight-school/content.js';
import { Counter, RatingSlider } from '../flight-school/parts.jsx';
import { LIMITS, loadState, saveState } from '../flight-school/store.js';
import '../flight-school/flight-school.css';

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// The whole assessment as one flat list of screens.
function buildSteps() {
  const steps = [
    { type: 'intro' },
    { type: 'years' },
    { type: 'risk' },
  ];
  CORE_ORDER.forEach((id, i) => {
    steps.push({ type: 'item', id, text: CORE_ITEMS[id].text, section: 'core', n: i + 1, total: CORE_ORDER.length });
    if (NAME_PROMPTS[id]) steps.push({ type: 'names', ...NAME_PROMPTS[id], n: i + 1, total: CORE_ORDER.length });
  });
  steps.push({ type: 'writtenIntro' });
  const written = OPEN_QUESTIONS.filter((q) => q.id !== 'b1'); // b1 goes with the bonus.
  written.forEach((q, i) => {
    steps.push({ type: 'written', ...q, n: i + 1, total: written.length });
  });
  steps.push({ type: 'finish' });
  return steps;
}

export default function FlightSchoolPreflight() {
  const navigate = useNavigate();
  const steps = useMemo(buildSteps, []);
  // The screen list changed once already, so resume at the first unanswered
  // statement rather than trusting a saved position past it.
  const [state, setState] = useState(() => {
    const saved = loadState();
    const missing = steps.findIndex((s) => s.type === 'item' && typeof saved.answers[s.id] !== 'number');
    return missing >= 0 && missing < saved.step ? { ...saved, step: missing } : saved;
  });
  const stepRef = useRef(null);

  const index = Math.min(state.step, steps.length - 1);
  const step = steps[index];

  useEffect(() => {
    if (state.finishedAt) navigate('/flight-school/log', { replace: true });
  }, [state.finishedAt, navigate]);

  useEffect(() => {
    saveState(state);
  }, [state]);

  // New screen: start at the top and move keyboard / screen reader focus to it.
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
    stepRef.current?.focus({ preventScroll: true });
  }, [index]);

  const update = (patch) => setState((s) => ({ ...s, ...patch }));
  const goTo = (next) => update({ step: next });
  const finish = () => update({ finishedAt: new Date().toISOString(), step: 0 });
  const advance = () => (index === steps.length - 1 ? finish() : goTo(index + 1));

  const canAdvance = () => {
    if (step.type === 'years') return typeof state.context.years === 'number';
    if (step.type === 'risk') return typeof state.context.risk === 'number';
    if (step.type === 'item') return typeof state.answers[step.id] === 'number';
    if (step.type === 'finish') {
      const email = state.profile.email?.trim() || '';
      return Boolean(state.profile.name?.trim()) && (!email || EMAIL_PATTERN.test(email));
    }
    return true;
  };

  return (
    <div className="fs">
      <SEO
        path="/flight-school/preflight"
        title="Preflight | Flight School"
        description="The Flight School assessment."
        noindex
      />

      <div className="fs-bar">
        <div className="fs-read fs-bar-inner">
          <span className="fs-label fs-bar-title">Flight School</span>
          <Link to="/flight-school" className="fs-label fs-bar-exit">
            Save &amp; Exit
          </Link>
        </div>
      </div>

      <main className="fs-read fs-step" ref={stepRef} tabIndex={-1}>
        <StepBody step={step} state={state} update={update} onSkipWritten={() => goTo(steps.length - 1)} />

        {step.type !== 'intro' && (
          <div className="fs-nav">
            <button type="button" className="fs-btn fs-btn-2" onClick={() => goTo(index - 1)}>
              Back
            </button>
            <button type="button" className="fs-btn" disabled={!canAdvance()} onClick={advance}>
              {nextLabel(step, state, index === steps.length - 1)}
            </button>
          </div>
        )}
        {step.type === 'intro' && (
          <div style={{ marginTop: 32 }}>
            <button type="button" className="fs-btn" onClick={advance}>
              Begin
            </button>
          </div>
        )}
      </main>
    </div>
  );
}

function nextLabel(step, state, isLast) {
  if (isLast) return 'See My Log';
  if (step.type === 'names' && !state.names[step.key]?.trim()) return 'Skip';
  if (step.type === 'written' && !state.written[step.id]?.trim()) return 'Skip';
  return 'Next';
}

function StepBody({ step, state, update, onSkipWritten }) {
  switch (step.type) {
    case 'intro':
      return (
        <div className="fs-stack">
          <h1>Preflight</h1>
          <p>{OPENING_LINE}</p>
          <p className="fs-muted">
            About 15 minutes. Your place is saved on this device, so you can stop and come back.
          </p>
        </div>
      );

    case 'years':
      return (
        <div className="fs-stack">
          <h1>Preflight</h1>
          <p className="fs-question" id="years-q" style={{ minHeight: 0 }}>
            {YEARS_QUESTION}
          </p>
          <div role="radiogroup" aria-labelledby="years-q" className="fs-stack" style={{ '--gap': '8px' }}>
            {YEARS_CHOICES.map((choice, i) => (
              <button
                key={choice}
                type="button"
                role="radio"
                aria-checked={state.context.years === i}
                className="fs-choice"
                onClick={() => update({ context: { ...state.context, years: i } })}
              >
                {choice}
              </button>
            ))}
          </div>
        </div>
      );

    case 'risk':
      return (
        <div className="fs-stack">
          <h1>Preflight</h1>
          <p className="fs-question">{RISK_QUESTION}</p>
          <RatingSlider
            label={RISK_QUESTION}
            value={state.context.risk}
            onChange={(risk) => update({ context: { ...state.context, risk } })}
          />
        </div>
      );

    case 'item':
      return (
        <div>
          <Counter n={step.n} total={step.total} />
          <p className="fs-question" style={{ marginBottom: 16 }}>
            {step.text}
          </p>
          <RatingSlider
            key={step.id}
            label={step.text}
            value={state.answers[step.id]}
            onChange={(v) => update({ answers: { ...state.answers, [step.id]: v } })}
          />
        </div>
      );

    case 'names':
      return (
        <div>
          <Counter n={step.n} total={step.total} />
          <label htmlFor={step.key} className="fs-question" style={{ display: 'block', minHeight: 0, marginBottom: 16 }}>
            {step.prompt}
          </label>
          <input
            id={step.key}
            className="fs-input"
            type="text"
            autoComplete="off"
            maxLength={LIMITS.names}
            value={state.names[step.key] || ''}
            onChange={(e) => update({ names: { ...state.names, [step.key]: e.target.value } })}
          />
          <p className="fs-small" style={{ marginTop: 8 }}>
            It's okay to leave this blank.
          </p>
        </div>
      );

    case 'writtenIntro':
      return (
        <div className="fs-stack">
          <h1>For your mentor</h1>
          <p>
            Last part. These 8 questions help a mentor know where to start. Write as much or as
            little as you want, and skip any you like.
          </p>
          <p className="fs-muted">
            Your written answers stay on this device. They are only shared if you choose to include
            them.
          </p>
          <button type="button" className="fs-btn fs-btn-2" onClick={onSkipWritten}>
            Skip These
          </button>
        </div>
      );

    case 'written':
      return (
        <div data-trait={step.trait}>
          <Counter n={step.n} total={step.total} />
          <label htmlFor={step.id} className="fs-question" style={{ display: 'block', minHeight: 0, marginBottom: 16 }}>
            {step.text}
          </label>
          <textarea
            id={step.id}
            className="fs-input"
            maxLength={LIMITS.written}
            value={state.written[step.id] || ''}
            onChange={(e) => update({ written: { ...state.written, [step.id]: e.target.value } })}
          />
          <p className="fs-small" style={{ marginTop: 8 }}>
            {traitById[step.trait].name}
          </p>
        </div>
      );

    case 'finish':
      return (
        <div className="fs-stack">
          <h1>Almost done</h1>
          <p>
            Your answers are private. You choose who sees your results. Pastor Roy will see that you
            finished and who you named as helping you grow, so he can help connect you with a mentor.
          </p>
          <div>
            <label htmlFor="fs-name" style={{ fontWeight: 700 }}>
              Your name
            </label>
            <input
              id="fs-name"
              className="fs-input"
              type="text"
              autoComplete="name"
              maxLength={LIMITS.name}
              value={state.profile.name || ''}
              onChange={(e) => update({ profile: { ...state.profile, name: e.target.value } })}
            />
          </div>
          <div>
            <label htmlFor="fs-email" style={{ fontWeight: 700 }}>
              Your email
            </label>
            <input
              id="fs-email"
              className="fs-input"
              type="email"
              autoComplete="email"
              inputMode="email"
              maxLength={LIMITS.email}
              value={state.profile.email || ''}
              onChange={(e) => update({ profile: { ...state.profile, email: e.target.value } })}
            />
            <p className="fs-small" style={{ marginTop: 8 }}>
              We only use this to send your private results link.
            </p>
          </div>
        </div>
      );

    default:
      return null;
  }
}
