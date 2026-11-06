import { useMemo, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import SEO from '../components/SEO.jsx';
import {
  OPEN_QUESTIONS,
  QUADRANTS,
  TRAITS,
  YEARS_CHOICES,
  sliderLabel,
} from '../flight-school/content.js';
import { scoreAssessment } from '../flight-school/scoring.js';
import { NextStep, ResultsWheel, TraitIcon, useFlash } from '../flight-school/parts.jsx';
import { clearState, decodeLog, encodeLog, loadState } from '../flight-school/store.js';
import '../flight-school/flight-school.css';

const churchEmail = () => ['info', 'freeway.church'].join('@');

const formatDate = (iso) => {
  const date = iso ? new Date(iso) : null;
  if (!date || Number.isNaN(date.getTime())) return '';
  return date.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
};

const logLink = (state, options) =>
  `${window.location.origin}/flight-school/log#${encodeLog(state, options)}`;

export default function FlightSchoolLog() {
  const { hash } = useLocation();
  const fragment = hash.replace(/^#/, '');
  const shared = useMemo(() => (fragment ? decodeLog(fragment) : null), [fragment]);
  const own = useMemo(loadState, []);

  const log = shared || (fragment ? null : own.finishedAt ? own : null);

  return (
    <div className="fs" style={{ paddingTop: 80 }}>
      <SEO
        path="/flight-school/log"
        title="Your Flight Log | Flight School"
        description="Your Flight School results."
        noindex
      />
      {log ? <Log log={log} isShared={Boolean(shared)} /> : <NoLog badLink={Boolean(fragment)} />}
    </div>
  );
}

function NoLog({ badLink }) {
  return (
    <section className="fs-section">
      <div className="fs-read fs-stack">
        <h1>Your Flight Log</h1>
        <p>
          {badLink
            ? "This link didn't open. Part of it may be missing. Ask the person who sent it to share it again."
            : "There's no Flight Log on this device yet. Take the assessment to see your results."}
        </p>
        <Link to="/flight-school/preflight" className="fs-btn">
          Start Preflight
        </Link>
      </div>
    </section>
  );
}

function Log({ log, isShared }) {
  const results = useMemo(() => scoreAssessment(log.answers, log.names), [log]);
  const quadrant = QUADRANTS[results.quadrant];
  const written = OPEN_QUESTIONS.filter((q) => log.written[q.id]?.trim());
  const date = formatDate(log.finishedAt);

  return (
    <>
      <section className="fs-section">
        <div className="fs-read fs-stack">
          <h1>{isShared ? 'A Shared Flight Log' : 'Your Flight Log'}</h1>
          {date && <p className="fs-muted">Finished {date}</p>}
          {isShared && <p>Someone trusted you with their results. Please keep them private.</p>}
          <div style={{ paddingTop: 16 }}>
            <ResultsWheel traits={results.traits} />
          </div>
        </div>
      </section>

      <section className="fs-section fs-section-deep">
        <div className="fs-read fs-stack">
          {TRAITS.map((trait) => {
            const { score, band } = results.traits[trait.id];
            const copy = trait.results[band];
            return (
              <article key={trait.id} className="fs-card fs-stack" data-trait={trait.id}>
                <TraitIcon trait={trait.id} />
                <h2>{trait.name}</h2>
                <div className="fs-score-row">
                  <span className="fs-readout">{score.toFixed(1)}</span>
                  <span className="fs-label fs-band">{band}</span>
                </div>
                <p>{copy.text}</p>
                <NextStep>{copy.next}</NextStep>
                {trait.id === 'missional' && (log.names.sentTo?.trim() || log.names.helpers?.trim()) && (
                  <div className="fs-well fs-stack">
                    {log.names.sentTo?.trim() && (
                      <p>
                        <span className="fs-small">Who you're helping</span>
                        <br />
                        {log.names.sentTo}
                      </p>
                    )}
                    {log.names.helpers?.trim() && (
                      <p>
                        <span className="fs-small">Who's helping you grow</span>
                        <br />
                        {log.names.helpers}
                      </p>
                    )}
                  </div>
                )}
              </article>
            );
          })}

          <article className="fs-card fs-stack" data-trait="teachable">
            <h2>Teachable bonus</h2>
            <h3 style={{ fontSize: 'var(--fs-h2)', color: 'var(--text)' }}>{quadrant.name}</h3>
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
              Pride up is "I know better." Pride down is "I'm not good enough." Higher means more
              pride.
            </p>
            <p>{quadrant.text}</p>
            <NextStep>{quadrant.next}</NextStep>
          </article>
        </div>
      </section>

      {written.length > 0 && (
        <section className="fs-section">
          <div className="fs-read fs-stack">
            <h2 style={{ color: 'var(--accent)' }}>{isShared ? 'Written answers' : 'What you wrote'}</h2>
            {written.map((q) => (
              <div key={q.id} className="fs-well">
                <p className="fs-small" style={{ marginBottom: 8 }}>
                  {q.text}
                </p>
                <p style={{ whiteSpace: 'pre-wrap', overflowWrap: 'anywhere' }}>{log.written[q.id]}</p>
              </div>
            ))}
          </div>
        </section>
      )}

      {isShared ? <MentorNotes log={log} results={results} /> : <Takeoff log={log} />}
    </>
  );
}

/** Mentor-only reading aids. These appear on shared links, not the taker's own log. */
function MentorNotes({ log, results }) {
  const years = YEARS_CHOICES[log.context.years];
  const risk = log.context.risk;

  return (
    <section className="fs-section fs-section-deep">
      <div className="fs-read fs-stack">
        <h2 style={{ color: 'var(--accent)' }}>For a mentor</h2>
        <div className="fs-card fs-stack">
          {years && (
            <p>
              <strong>Following Jesus:</strong> {years}. Read every score through this. A low
              Missional score from someone three months in is a next step, not a blind spot.
            </p>
          )}
          {typeof risk === 'number' && (
            <p>
              <strong>Comfort with risk:</strong> {sliderLabel(risk)}. Read Faithful against this.
              High Faithful from a careful person means real trust. From a risk-lover, it may be
              personality. Ask: "What did it cost you?"
            </p>
          )}
          {results.prideDown >= 5 && (
            <p>
              <strong>Pride down is high.</strong> This can be shame, not pride. If the person seems
              crushed rather than guarded, lead with grace. Jesus doesn't humble the crushed; He
              lifts them.
            </p>
          )}
          {results.flags.length > 0 && (
            <div>
              <p className="fs-alert">
                <strong>Worth asking about:</strong>
              </p>
              <ul style={{ margin: '8px 0 0', paddingLeft: 24, listStyle: 'square' }}>
                {results.flags.map((flag) => (
                  <li key={flag}>{flag}</li>
                ))}
              </ul>
            </div>
          )}
        </div>
        <Link to="/flight-school" className="fs-btn fs-btn-2">
          About Flight School
        </Link>
      </div>
    </section>
  );
}

function Takeoff({ log }) {
  const navigate = useNavigate();
  const [includeWritten, setIncludeWritten] = useState(false);
  const [flash, showFlash] = useFlash();
  const hasWritten = OPEN_QUESTIONS.some((q) => log.written[q.id]?.trim());
  const canShare = typeof navigator !== 'undefined' && typeof navigator.share === 'function';

  const copy = async () => {
    const url = logLink(log, { includeWritten });
    try {
      await navigator.clipboard.writeText(url);
      showFlash('Link copied.');
    } catch {
      window.prompt('Copy your private link:', url);
    }
  };

  const share = async () => {
    try {
      await navigator.share({
        title: 'My Flight Log',
        text: 'Here are my Flight School results.',
        url: logLink(log, { includeWritten }),
      });
    } catch {
      // The person closed the share sheet. Nothing to do.
    }
  };

  // A mailto link can't reliably carry long text, so written answers stay out.
  const emailSelf = () => {
    const body = `Here's my private Flight School results link:\n\n${logLink(log)}`;
    window.location.href = `mailto:?subject=${encodeURIComponent('My Flight Log')}&body=${encodeURIComponent(body)}`;
  };

  const tellPastor = () => {
    const helpers = log.names.helpers?.trim() || '(no one named yet)';
    const body = `Pastor Roy,\n\nI finished the Flight School assessment.\n\nMy name: \nWho's helping me grow: ${helpers}\n\nCan you help connect me with a mentor?`;
    window.location.href = `mailto:${churchEmail()}?subject=${encodeURIComponent('I finished Flight School')}&body=${encodeURIComponent(body)}`;
  };

  const retake = () => {
    if (window.confirm('Start over? This clears your answers from this device.')) {
      clearState();
      navigate('/flight-school/preflight');
    }
  };

  return (
    <section className="fs-section fs-section-deep">
      <div className="fs-read fs-stack">
        <h2 style={{ color: 'var(--accent)' }}>Cleared for Takeoff</h2>
        <p>
          A next step is easier with someone beside you. Tell Pastor Roy you finished, and he can
          help connect you with a mentor: someone ahead of you, helping you grow. This opens an email
          for you to send. It only says that you finished and who you named as helping you grow, not
          your answers or scores.
        </p>
        <button type="button" className="fs-btn" onClick={tellPastor}>
          Tell Pastor Roy
        </button>

        <div className="fs-card fs-stack" style={{ marginTop: 32 }}>
          <h3>Keep or share your log</h3>
          <p>
            Your results are saved on this device only. Email yourself the private link so you don't
            lose them. Anyone with the link can see your results, so choose who gets it.
          </p>
          {hasWritten && (
            <label className="fs-check">
              <input
                type="checkbox"
                checked={includeWritten}
                onChange={(e) => setIncludeWritten(e.target.checked)}
              />
              <span>Include what I wrote in the link I share</span>
            </label>
          )}
          <div className="fs-btn-row">
            {canShare && (
              <button type="button" className="fs-btn" onClick={share}>
                Share
              </button>
            )}
            <button type="button" className="fs-btn fs-btn-2" onClick={emailSelf}>
              Email Me
            </button>
            <button type="button" className="fs-btn fs-btn-2" onClick={copy}>
              Copy Link
            </button>
          </div>
          <p className="fs-small" aria-live="polite" style={{ minHeight: 24 }}>
            {flash}
          </p>
        </div>

        <button type="button" className="fs-link" style={{ background: 'none', border: 0, padding: '12px 0', font: 'inherit', cursor: 'pointer' }} onClick={retake}>
          Start over
        </button>
      </div>
    </section>
  );
}
