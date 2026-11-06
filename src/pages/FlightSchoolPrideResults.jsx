import { useMemo } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import SEO from '../components/SEO.jsx';
import { retakeDate } from '../flight-school/insights.js';
import { NextStep, useFlash } from '../flight-school/parts.jsx';
import {
  clearPride,
  decodePride,
  encodePride,
  leanCopy,
  loadPride,
  scorePride,
} from '../flight-school/pride.js';
import {
  GRACE,
  NO_ROW_STEP,
  SNAPSHOT_LINE,
  STRENGTHS,
  TEACHABLE_STEP,
  TEACHABLE_STRENGTH,
  TWO_KINDS,
  TWO_KINDS_BOTTOM_LINE,
} from '../flight-school/pride-content.js';
import '../flight-school/flight-school.css';

const churchEmail = () => ['info', 'freeway.church'].join('@');
const resultsLink = (state) =>
  `${window.location.origin}/flight-school/pride-check/results#${encodePride(state)}`;

const BAR_SEGMENTS = 20;

export default function FlightSchoolPrideResults() {
  const { hash } = useLocation();
  const fragment = hash.replace(/^#/, '');
  const shared = useMemo(() => (fragment ? decodePride(fragment) : null), [fragment]);
  const own = useMemo(loadPride, []);
  const record = shared || (fragment ? null : own.finishedAt ? own : null);

  return (
    <div className="fs" data-trait="teachable" style={{ paddingTop: 80 }}>
      <SEO
        path="/flight-school/pride-check/results"
        title="Pride Check Results | Flight School"
        description="Your Pride Check results."
        noindex
      />
      {record ? (
        <Results key={fragment} record={record} isShared={Boolean(shared)} />
      ) : (
        <section className="fs-section">
          <div className="fs-read fs-stack">
            <h1>Pride Check Results</h1>
            <p>
              {fragment
                ? "This link didn't open. Part of it may be missing. Ask the person who sent it to share it again."
                : "There are no Pride Check results on this device yet."}
            </p>
            <Link to="/flight-school/pride-check" className="fs-btn">
              Go to Pride Check
            </Link>
          </div>
        </section>
      )}
    </div>
  );
}

function Bar({ label, score, color }) {
  return (
    <div data-trait={color}>
      <div className="fs-bar-head">
        <span className="fs-label" style={{ color: 'var(--trait)' }}>
          {label}
        </span>
        <span className="fs-readout">{score.toFixed(1)}</span>
      </div>
      <div className="fs-meter-bar" role="img" aria-label={`${label}: ${score.toFixed(1)} out of 10`}>
        {Array.from({ length: BAR_SEGMENTS }, (_, i) => (
          <span key={i} className={score >= (i + 1) / 2 ? 'on' : ''} />
        ))}
      </div>
    </div>
  );
}

function Results({ record, isShared }) {
  const results = useMemo(() => scorePride(record), [record]);
  const lean = leanCopy(results.lean, results.teachable);

  const hasStrengths = results.strengthRows.length > 0 || results.teachableStrong;

  return (
    <>
      <section className="fs-section">
        <div className="fs-read fs-stack">
          <h1 style={{ color: 'var(--trait)' }}>{isShared ? 'Shared Pride Check Results' : 'Pride Check Results'}</h1>
          {isShared && <p>Someone trusted you with their results. Please keep them private.</p>}

          {results.grace && (
            <div className="fs-card fs-stack">
              <h2 style={{ color: 'var(--accent)' }}>Before anything else</h2>
              <p>{GRACE.text}</p>
              <p>{GRACE.noOne}</p>
              <a className="fs-btn fs-btn-2" href={`mailto:${churchEmail()}`}>
                Email the Church
              </a>
              <p>
                If you're ever thinking about hurting yourself, call or text{' '}
                <a className="fs-link" href="tel:988">
                  988
                </a>{' '}
                any time.
              </p>
            </div>
          )}
          {results.grace && <p><em>{GRACE.gently}</em></p>}

          <p>{SNAPSHOT_LINE}</p>

          <div className="fs-stack" style={{ paddingTop: 16 }}>
            <Bar label="Pride up" score={results.up} color="missional" />
            <Bar label="Pride down" score={results.back} color="available" />
            <Bar label="Teachable" score={results.teachable} color="teachable" />
          </div>
          <p className="fs-small">
            Higher on pride up or pride down means more of it. Higher on teachable is the good
            direction.
          </p>

          <h2 style={{ paddingTop: 16 }}>{lean.title}</h2>
          <p>{lean.text}</p>
        </div>
      </section>

      <section className="fs-section fs-section-deep">
        <div className="fs-read fs-stack">
          <h2 style={{ color: 'var(--trait)' }}>Your profile</h2>
          {results.rows.map((row) => (
            <div key={row.id} className="fs-well fs-row">
              <div className="fs-row-head">
                <strong>{row.name}</strong>
                <span className="fs-small">{row.word}</span>
              </div>
              <div className="fs-row-scores">
                <span data-trait="missional">
                  <span className="fs-small">Pride up</span>
                  <span className="fs-readout fs-row-score">{row.up.toFixed(1)}</span>
                </span>
                <span data-trait="available">
                  <span className="fs-small">Pride down</span>
                  <span className="fs-readout fs-row-score">{row.back.toFixed(1)}</span>
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="fs-section">
        <div className="fs-read fs-stack">
          <h2 style={{ color: 'var(--trait)' }}>Start here</h2>
          {results.steps.map((step) => (
            <article key={step.key} className="fs-card fs-stack">
              <h3>{step.name}</h3>
              <p className="fs-small">{step.label}</p>
              <p>{step.insight}</p>
              <NextStep>{step.action}</NextStep>
            </article>
          ))}
          {results.addTeachableStep && (
            <article className="fs-card fs-stack">
              <h3>Teachable</h3>
              <p>{TEACHABLE_STEP.insight}</p>
              <NextStep>{TEACHABLE_STEP.action}</NextStep>
            </article>
          )}
          {results.noRowStep && (
            <article className="fs-card">
              <NextStep>{NO_ROW_STEP}</NextStep>
            </article>
          )}

          {hasStrengths && (
            <>
              <h2 style={{ color: 'var(--trait)', paddingTop: 32 }}>What's going well</h2>
              <ul className="fs-strengths">
                {results.strengthRows.map((id) => (
                  <li key={id}>{STRENGTHS[id]}</li>
                ))}
                {results.teachableStrong && <li>{TEACHABLE_STRENGTH}</li>}
              </ul>
            </>
          )}
        </div>
      </section>

      <section className="fs-section fs-section-deep">
        <div className="fs-read fs-stack">
          <h2 style={{ color: 'var(--trait)' }}>A picture from the Bible</h2>
          <p>{lean.picture}</p>
          <div className="fs-well">
            <p className="fs-small">Pray</p>
            <p style={{ fontWeight: 700 }}>"{lean.prayer}"</p>
          </div>
        </div>
      </section>

      <section className="fs-section">
        <div className="fs-read fs-stack">
          <h2 style={{ color: 'var(--trait)' }}>Two kinds of pride</h2>
          <div className="fs-kinds" role="table" aria-label="Two kinds of pride, side by side">
            <div className="fs-kinds-head" role="row">
              <span className="fs-kinds-corner" role="cell" />
              <span className="fs-label" role="columnheader" data-trait="missional">Pride up</span>
              <span className="fs-label" role="columnheader" data-trait="available">Pride down</span>
            </div>
            {TWO_KINDS.map(([label, up, back]) => (
              <div className="fs-kinds-row" role="row" key={label}>
                <strong role="rowheader">{label}</strong>
                <span role="cell" data-trait="missional">{up}</span>
                <span role="cell" data-trait="available">{back}</span>
              </div>
            ))}
          </div>
          <div className="fs-well">
            <p style={{ fontWeight: 700 }}>{TWO_KINDS_BOTTOM_LINE}</p>
          </div>
        </div>
      </section>

      {isShared ? (
        <section className="fs-section fs-section-deep">
          <div className="fs-read">
            <Link to="/flight-school" className="fs-btn fs-btn-2">
              About Flight School
            </Link>
          </div>
        </section>
      ) : (
        <KeepOrShare record={record} />
      )}
    </>
  );
}

function KeepOrShare({ record }) {
  const navigate = useNavigate();
  const [flash, showFlash] = useFlash();
  const canShare = typeof navigator !== 'undefined' && typeof navigator.share === 'function';

  const copy = async () => {
    const url = resultsLink(record);
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
        title: 'My Pride Check Results',
        text: 'Here are my Pride Check results.',
        url: resultsLink(record),
      });
    } catch {
      // The person closed the share sheet. Nothing to do.
    }
  };

  const emailSelf = () => {
    const body = `Here's my private Pride Check results link:\n\n${resultsLink(record)}`;
    window.location.href = `mailto:?subject=${encodeURIComponent('My Pride Check Results')}&body=${encodeURIComponent(body)}`;
  };

  const retake = () => {
    if (!window.confirm('Start over? These results will be cleared from this device, so save your link first if you want to keep them.')) return;
    clearPride();
    navigate('/flight-school/pride-check');
  };

  return (
    <section className="fs-section fs-section-deep">
      <div className="fs-read fs-stack">
        <div className="fs-card fs-stack">
          <h3>Keep or share your results</h3>
          <p>
            Your answers are saved on this device and inside your private link, not on our servers.
            If you want to talk your results over with someone, you can send it to them. Anyone with
            the link can see your results, so choose who gets it. Your link leaves out the last three
            questions, so those stay with you.
          </p>
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

        <div className="fs-card fs-stack" style={{ marginTop: 32 }}>
          <h3>Come back to it</h3>
          <p>Answers change. Take this again around {retakeDate(record.finishedAt)}.</p>
          <button type="button" className="fs-btn fs-btn-2" onClick={retake}>
            Retake
          </button>
        </div>

        <Link to="/flight-school" className="fs-btn fs-btn-2" style={{ marginTop: 32 }}>
          Back to Flight School
        </Link>
      </div>
    </section>
  );
}
