import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import SEO from '../components/SEO.jsx';
import { BONUS_ITEMS, BONUS_ORDER, OPEN_QUESTIONS } from '../flight-school/content.js';
import { BonusResult, Counter, RatingSlider } from '../flight-school/parts.jsx';
import { scoreAssessment } from '../flight-school/scoring.js';
import { LIMITS, loadState, saveState } from '../flight-school/store.js';
import '../flight-school/flight-school.css';

const QUESTION = OPEN_QUESTIONS.find((q) => q.id === 'b1');
const LAST_ITEM = BONUS_ORDER.length; // Screen 0 is the intro; 1-12 are statements.
const WRITTEN = LAST_ITEM + 1;

const allAnswered = (answers) => BONUS_ORDER.every((id) => typeof answers[id] === 'number');

// TABLED: not routed in App.jsx. Pastor Roy wants pride up / pride down rebuilt as
// its own, more nuanced assessment. Kept as a starting point.
//
// The optional Teachable bonus. Offered after the main assessment, with its own
// results, so nobody has to read about pride to get their Flight Log.
export default function FlightSchoolBonus() {
  const [state, setState] = useState(loadState);
  const mainRef = useRef(null);
  const screen = state.bonusStep;
  // Anyone who answered all 12 in the first version already has results.
  const done = Boolean(state.bonusDoneAt) || (screen === 0 && allAnswered(state.answers));

  useEffect(() => {
    saveState(state);
  }, [state]);

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
    mainRef.current?.focus({ preventScroll: true });
  }, [screen, done]);

  const update = (patch) => setState((s) => ({ ...s, ...patch }));
  const itemId = BONUS_ORDER[screen - 1];

  const body = () => {
    if (!state.finishedAt) {
      return (
        <div className="fs-stack">
          <h1>Teachable bonus</h1>
          <p>This opens after you finish the main assessment.</p>
          <Link to="/flight-school/preflight" className="fs-btn">
            Go to Preflight
          </Link>
        </div>
      );
    }
    if (done) {
      const results = scoreAssessment(state.answers, state.names);
      return (
        <div className="fs-stack">
          <h1 style={{ color: 'var(--teachable)' }}>Your bonus results</h1>
          <BonusResult
            results={results}
            checked={Boolean(state.doneSteps.bonus)}
            onToggle={(checked) => update({ doneSteps: { ...state.doneSteps, bonus: checked } })}
          />
          <Link to="/flight-school/log" className="fs-btn">
            Back to My Flight Log
          </Link>
        </div>
      );
    }
    if (screen === 0) {
      return (
        <div className="fs-stack">
          <h1 style={{ color: 'var(--teachable)' }}>Teachable bonus</h1>
          <p>
            Want to go deeper? Pride can look like "I know better." It can also look like "I'm not
            good enough." These 12 statements show which one you lean toward. It takes about 3
            minutes.
          </p>
          <p className="fs-muted">
            This is optional. Your results stay private, the same as your Flight Log.
          </p>
          <div className="fs-btn-row">
            <button type="button" className="fs-btn" onClick={() => update({ bonusStep: 1 })}>
              Begin
            </button>
            <Link to="/flight-school/log" className="fs-btn fs-btn-2">
              Not Now
            </Link>
          </div>
        </div>
      );
    }
    if (screen === WRITTEN) {
      return (
        <div>
          <label htmlFor="b1" className="fs-question" style={{ display: 'block', minHeight: 0, marginBottom: 16 }}>
            {QUESTION.text}
          </label>
          <textarea
            id="b1"
            className="fs-input"
            maxLength={LIMITS.written}
            value={state.written.b1 || ''}
            onChange={(e) => update({ written: { ...state.written, b1: e.target.value } })}
          />
          <p className="fs-small" style={{ marginTop: 8 }}>
            Optional, and it stays on this device unless you choose to share it.
          </p>
        </div>
      );
    }
    return (
      <div>
        <Counter n={screen} total={BONUS_ORDER.length} />
        <p className="fs-question" style={{ marginBottom: 16 }}>
          {BONUS_ITEMS[itemId].text}
        </p>
        <RatingSlider
          key={itemId}
          label={BONUS_ITEMS[itemId].text}
          value={state.answers[itemId]}
          onChange={(v) => update({ answers: { ...state.answers, [itemId]: v } })}
        />
      </div>
    );
  };

  const asking = state.finishedAt && !done && screen > 0;
  const canAdvance = screen === WRITTEN || typeof state.answers[itemId] === 'number';
  const advance = () =>
    screen === WRITTEN
      ? update({ bonusDoneAt: new Date().toISOString() })
      : update({ bonusStep: screen + 1 });

  return (
    <div className="fs" data-trait="teachable">
      <SEO path="/flight-school/bonus" title="Teachable Bonus | Flight School" description="The optional Flight School Teachable bonus." noindex />
      <div className="fs-bar">
        <div className="fs-read fs-bar-inner">
          <span className="fs-label fs-bar-title">Flight School</span>
          <Link to="/flight-school/log" className="fs-label fs-bar-exit">
            My Flight Log
          </Link>
        </div>
      </div>
      <main className="fs-read fs-step" ref={mainRef} tabIndex={-1}>
        {body()}
        {asking && (
          <div className="fs-nav">
            <button type="button" className="fs-btn fs-btn-2" onClick={() => update({ bonusStep: screen - 1 })}>
              Back
            </button>
            <button type="button" className="fs-btn" disabled={!canAdvance} onClick={advance}>
              {screen === WRITTEN ? 'See Results' : 'Next'}
            </button>
          </div>
        )}
      </main>
    </div>
  );
}
