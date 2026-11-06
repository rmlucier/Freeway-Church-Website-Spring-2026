import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import SEO from '../components/SEO.jsx';
import { OPEN_QUESTIONS, TRAITS } from '../flight-school/content.js';
import { scoreAssessment } from '../flight-school/scoring.js';
import { DiscipleshipChain, NextStep, Quote, ResultsBars, TraitIcon, useFlash } from '../flight-school/parts.jsx';
import { buildInsights, retakeDate } from '../flight-school/insights.js';
import { postFlightSchool } from '../flight-school/api.js';
import { LIMITS, decodeLog, emptyState, encodeLog, loadState, saveState } from '../flight-school/store.js';
import '../flight-school/flight-school.css';

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
        title="Preflight Results | Flight School"
        description="Your Flight School results."
        noindex
      />
      {log ? <Log key={fragment} log={log} isShared={Boolean(shared)} /> : <NoLog badLink={Boolean(fragment)} />}
    </div>
  );
}

function NoLog({ badLink }) {
  return (
    <section className="fs-section">
      <div className="fs-read fs-stack">
        <h1>Preflight Results</h1>
        <p>
          {badLink
            ? "This link didn't open. Part of it may be missing. Ask the person who sent it to share it again."
            : "There are no Preflight Results on this device yet. Take the assessment to see your results."}
        </p>
        <Link to="/flight-school/preflight" className="fs-btn">
          Start Preflight
        </Link>
      </div>
    </section>
  );
}

function Log({ log, isShared }) {
  const results = useMemo(() => scoreAssessment(log.answers), [log]);
  const insights = useMemo(() => buildInsights(log, results), [log, results]);
  const lastTime = isShared ? null : log.history?.[log.history.length - 1];
  const [doneSteps, setDoneSteps] = useState(log.doneSteps || {});
  // Checked boxes are remembered on the person's own device only.
  const toggleStep = (key) =>
    isShared
      ? undefined
      : (checked) => {
          const next = { ...doneSteps, [key]: checked };
          setDoneSteps(next);
          saveState({ ...loadState(), doneSteps: next });
        };
  const written = OPEN_QUESTIONS.filter((q) => log.written[q.id]?.trim());
  const date = formatDate(log.finishedAt);

  return (
    <>
      <section className="fs-section">
        <div className="fs-read fs-stack">
          <h1>{isShared ? 'Shared Preflight Results' : 'Preflight Results'}</h1>
          {date && <p className="fs-muted">Finished {date}</p>}
          {isShared && <p>Someone trusted you with their results. Please keep them private.</p>}
          <div style={{ paddingTop: 16 }}>
            <ResultsBars traits={results.traits} previous={lastTime?.scores} />
          </div>
          {lastTime && <p className="fs-small">Compared with {formatDate(lastTime.at)}.</p>}
          {insights.stage && !isShared && <p>{insights.stage}</p>}
        </div>
      </section>

      <section className="fs-section">
        <div className="fs-read fs-stack">
          <h2 style={{ color: 'var(--accent)' }}>What stands out</h2>

          {insights.pairing && (
            <article className="fs-card fs-stack">
              <h3>
                {insights.pairing.high} over {insights.pairing.low}
              </h3>
              <p>{insights.pairing.text}</p>
            </article>
          )}

          {insights.gap && (
            <article className="fs-card fs-stack">
              <h3>Believing and doing</h3>
              <p>Here's the biggest gap between what you believe and what you've been doing.</p>
              <Quote text={insights.gap.say.text} label={insights.gap.say.label} />
              <Quote text={insights.gap.do.text} label={insights.gap.do.label} />
              <p>That gap isn't a failure. It's a good place to start.</p>
            </article>
          )}

          <article className="fs-card fs-stack">
            <h3>Your chain</h3>
            <p>Someone was sent to you. Now you're being sent.</p>
            <DiscipleshipChain helpers={log.names.helpers} sentTo={log.names.sentTo} />
          </article>
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
                <div className="fs-well">
                  <p className="fs-test">
                    <span className="fs-small">The test</span>
                    <strong>{insights.tests[trait.id]}</strong>
                  </p>
                  <p>{trait.test}</p>
                </div>
                <NextStep checked={Boolean(doneSteps[trait.id])} onToggle={toggleStep(trait.id)}>
                  {copy.next}
                </NextStep>
              </article>
            );
          })}

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

      {isShared ? (
        <section className="fs-section fs-section-deep">
          <div className="fs-read">
            <Link to="/flight-school" className="fs-btn fs-btn-2">
              About Flight School
            </Link>
          </div>
        </section>
      ) : (
        <Takeoff log={log} />
      )}
    </>
  );
}

function Takeoff({ log }) {
  const navigate = useNavigate();
  const [includeWritten, setIncludeWritten] = useState(false);
  const [flash, showFlash] = useFlash();
  const [profile, setProfile] = useState(log.profile || {});
  const [delivery, setDelivery] = useState({
    status: log.recorded ? 'done' : 'idle',
    emailed: Boolean(log.emailed),
  });

  // Tell the church this person finished, and email their link. Runs once on
  // arrival; if it fails, the form below lets them try again.
  const record = useCallback(
    async (who) => {
      setDelivery({ status: 'sending', emailed: false });
      const reply = await postFlightSchool({
        action: 'finish',
        name: who.name,
        email: who.email || '',
        link: logLink(log),
      });
      if (!reply?.saved) {
        setDelivery({ status: 'failed', emailed: false });
        return;
      }
      setDelivery({ status: 'done', emailed: Boolean(reply.emailed) });
      saveState({ ...loadState(), profile: who, recorded: true, emailed: Boolean(reply.emailed) });
    },
    [log]
  );

  const autoRecorded = useRef(false);
  useEffect(() => {
    if (autoRecorded.current) return;
    autoRecorded.current = true;
    if (!log.recorded && log.profile?.name?.trim()) record(log.profile);
  }, [log, record]);

  const hasWritten = OPEN_QUESTIONS.some((q) => log.written[q.id]?.trim());
  const results = useMemo(() => scoreAssessment(log.answers), [log]);
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
        title: 'My Preflight Results',
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
    window.location.href = `mailto:?subject=${encodeURIComponent('My Preflight Results')}&body=${encodeURIComponent(body)}`;
  };

  // Keeps this round's scores on the device so the next results can show what moved.
  const retake = () => {
    if (!window.confirm('Start a new assessment? Your scores stay here to compare.')) return;
    const scores = Object.fromEntries(TRAITS.map((t) => [t.id, results.traits[t.id].score]));
    saveState({
      ...emptyState(),
      profile: { name: profile.name || '' },
      history: [...(log.history || []), { at: log.finishedAt, scores }],
    });
    navigate('/flight-school/preflight');
  };

  return (
    <section className="fs-section fs-section-deep">
      <div className="fs-read fs-stack">
        <h2 style={{ color: 'var(--accent)' }}>Cleared for Takeoff</h2>
        {delivery.status === 'done' && (
          <p aria-live="polite">
            Pastor Roy can see your name and that you finished. He can't see your answers or scores
            unless you share them.
            {delivery.emailed && ' We also emailed you your private results link.'}
          </p>
        )}
        {delivery.status === 'sending' && (
          <p className="fs-muted" aria-live="polite">
            Letting Pastor Roy know you finished...
          </p>
        )}
        {(delivery.status === 'idle' || delivery.status === 'failed') && (
          <form
            className="fs-well fs-stack"
            onSubmit={(e) => {
              e.preventDefault();
              if (profile.name?.trim()) record(profile);
            }}
          >
            <p className={delivery.status === 'failed' ? 'fs-alert' : undefined} aria-live="polite">
              {delivery.status === 'failed'
                ? "That didn't go through. Please try again."
                : 'Add your name so Pastor Roy knows you finished. He will not see your answers.'}
            </p>
            <div>
              <label htmlFor="log-name" style={{ fontWeight: 700 }}>
                Your name
              </label>
              <input
                id="log-name"
                className="fs-input"
                type="text"
                autoComplete="name"
                maxLength={LIMITS.name}
                required
                value={profile.name || ''}
                onChange={(e) => setProfile({ ...profile, name: e.target.value })}
              />
            </div>
            <div>
              <label htmlFor="log-email" style={{ fontWeight: 700 }}>
                Your email, to get your results link
              </label>
              <input
                id="log-email"
                className="fs-input"
                type="email"
                autoComplete="email"
                maxLength={LIMITS.email}
                value={profile.email || ''}
                onChange={(e) => setProfile({ ...profile, email: e.target.value })}
              />
            </div>
            <button type="submit" className="fs-btn">
              Send
            </button>
          </form>
        )}

        <div className="fs-card fs-stack" style={{ marginTop: 32 }}>
          <h3>Keep or share your results</h3>
          <p>
            Your answers are saved on this device and inside your private link, not on our servers.
            Keep the link so you don't lose them. If you want to talk your results over with
            someone, you can send it to them. Anyone with the link can see your results, so choose
            who gets it.
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

        <div className="fs-card fs-stack" style={{ marginTop: 32 }}>
          <h3>Come back and compare</h3>
          <p>
            Growth takes time. Retake this around {retakeDate(log.finishedAt)} on this device, and
            your next results will show what moved.
          </p>
          <button type="button" className="fs-btn fs-btn-2" onClick={retake}>
            Retake
          </button>
        </div>

        <div className="fs-card fs-stack" data-trait="teachable" style={{ marginTop: 32 }}>
          <h3>Pride Check</h3>
          <p>
            Want to go deeper? Pride Check is a separate, optional assessment. It shows whether you
            lean toward "I know better" or "I'm not good enough," and where it shows up.
          </p>
          <Link to="/flight-school/pride-check" className="fs-btn fs-btn-2">
            Go to Pride Check
          </Link>
        </div>
      </div>
    </section>
  );
}
