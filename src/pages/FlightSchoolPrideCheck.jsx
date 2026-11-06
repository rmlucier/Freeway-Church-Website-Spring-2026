import { useEffect, useMemo, useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import SEO from '../components/SEO.jsx';
import { Counter, RatingSlider } from '../flight-school/parts.jsx';
import { answerOrder, loadPride, savePride } from '../flight-school/pride.js';
import {
  INTRO,
  SHAME,
  SITUATIONS,
  SITUATION_HINT,
  STATEMENTS,
  STATEMENT_ORDER,
} from '../flight-school/pride-content.js';
import '../flight-school/flight-school.css';

// One flat list of screens: the intro, then 31 items, one at a time.
function buildSteps() {
  const items = [
    ...STATEMENT_ORDER.map((id) => ({ type: 'statement', id, text: STATEMENTS[id].text })),
    ...SITUATIONS.map((situation, index) => ({ type: 'situation', id: situation.id, text: situation.text, index })),
    ...Object.entries(SHAME).map(([id, text]) => ({ type: 'shame', id, text })),
  ];
  return [{ type: 'intro' }, ...items.map((item, i) => ({ ...item, n: i + 1, total: items.length }))];
}

const GROUP = { statement: 'statements', situation: 'situations', shame: 'shame' };

export default function FlightSchoolPrideCheck() {
  const navigate = useNavigate();
  const steps = useMemo(buildSteps, []);
  const [state, setState] = useState(loadPride);
  const stepRef = useRef(null);

  const index = Math.min(state.step, steps.length - 1);
  const step = steps[index];
  const answer = step.type === 'intro' ? undefined : state[GROUP[step.type]][step.id];

  useEffect(() => {
    savePride(state);
    if (state.finishedAt) navigate('/flight-school/pride-check/results', { replace: true });
  }, [state, navigate]);

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
    stepRef.current?.focus({ preventScroll: true });
  }, [index]);

  const goTo = (next) => setState((s) => ({ ...s, step: next }));
  const setAnswer = (value) =>
    setState((s) => ({ ...s, [GROUP[step.type]]: { ...s[GROUP[step.type]], [step.id]: value } }));
  const advance = () =>
    index === steps.length - 1
      ? setState((s) => ({ ...s, finishedAt: new Date().toISOString(), step: 0 }))
      : goTo(index + 1);

  return (
    <div className="fs" data-trait="teachable">
      <SEO
        path="/flight-school/pride-check"
        title="Pride Check | Flight School"
        description="An optional Flight School assessment about pride."
        noindex
      />

      <div className="fs-bar">
        <div className="fs-read fs-bar-inner">
          <span className="fs-label fs-bar-title">Pride Check</span>
          <Link to="/flight-school" className="fs-label fs-bar-exit">
            Save &amp; Exit
          </Link>
        </div>
      </div>

      <main className="fs-read fs-step" ref={stepRef} tabIndex={-1}>
        {step.type === 'intro' ? (
          <div className="fs-stack">
            <h1 style={{ color: 'var(--trait)' }}>Pride Check</h1>
            {INTRO.map((line) => (
              <p key={line}>{line}</p>
            ))}
            <p className="fs-muted">
              About 10 minutes. Your answers stay on this device. Nothing is sent to the church, and
              you choose who sees your results.
            </p>
            <div style={{ paddingTop: 16 }}>
              <button type="button" className="fs-btn" onClick={advance}>
                Begin
              </button>
            </div>
          </div>
        ) : (
          <>
            <Counter n={step.n} total={step.total} />
            {step.type === 'situation' ? (
              <Situation step={step} seed={state.seed} value={answer} onChange={setAnswer} />
            ) : (
              <>
                <p className="fs-question" style={{ marginBottom: 16 }}>
                  {step.text}
                </p>
                <RatingSlider key={step.id} label={step.text} value={answer} onChange={setAnswer} />
              </>
            )}
            <div className="fs-nav">
              <button type="button" className="fs-btn fs-btn-2" onClick={() => goTo(index - 1)}>
                Back
              </button>
              <button type="button" className="fs-btn" disabled={typeof answer !== 'number'} onClick={advance}>
                {index === steps.length - 1 ? 'See My Results' : 'Next'}
              </button>
            </div>
          </>
        )}
      </main>
    </div>
  );
}

function Situation({ step, seed, value, onChange }) {
  const { answers } = SITUATIONS[step.index];
  const order = useMemo(() => answerOrder(step.index, seed, answers.length), [step.index, seed, answers.length]);
  const labelId = `${step.id}-q`;

  return (
    <div>
      <p className="fs-question" id={labelId} style={{ minHeight: 0, marginBottom: 8 }}>
        {step.text}
      </p>
      <p className="fs-small" style={{ marginBottom: 16 }}>
        {SITUATION_HINT}
      </p>
      <div role="radiogroup" aria-labelledby={labelId} className="fs-stack" style={{ '--gap': '8px' }}>
        {order.map((i) => (
          <button
            key={i}
            type="button"
            role="radio"
            aria-checked={value === i}
            className="fs-choice"
            onClick={() => onChange(i)}
          >
            {answers[i][0]}
          </button>
        ))}
      </div>
    </div>
  );
}
