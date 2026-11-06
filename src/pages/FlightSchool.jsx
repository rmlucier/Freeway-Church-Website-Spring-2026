import { useMemo } from 'react';
import { Link } from 'react-router-dom';
import SEO from '../components/SEO.jsx';
import { TRAITS } from '../flight-school/content.js';
import { TraitIcon } from '../flight-school/parts.jsx';
import { loadState } from '../flight-school/store.js';
import '../flight-school/flight-school.css';

const STEPS = [
  {
    label: 'Preflight',
    body: 'Answer honest statements about your life right now. It takes about 10 minutes, on your phone or computer.',
  },
  {
    label: 'Your Flight Log',
    body: 'See where you are on all four traits right away, with one next step for each.',
  },
  {
    label: 'Cleared for Takeoff',
    body: 'Get your private results link, share it with someone you trust, and let us help connect you with a mentor.',
  },
];

function StartButton({ state }) {
  if (state.finishedAt) {
    return (
      <Link to="/flight-school/log" className="fs-btn">
        Your Flight Log
      </Link>
    );
  }
  return (
    <Link to="/flight-school/preflight" className="fs-btn">
      {state.step > 0 ? 'Continue Preflight' : 'Start Preflight'}
    </Link>
  );
}

export default function FlightSchool() {
  const state = useMemo(loadState, []);

  return (
    <div className="fs">
      <SEO
        path="/flight-school"
        title="Flight School"
        description="Flight School is learning to fly: a life fully devoted to Jesus. Take the free assessment on your phone and find your next step in being faithful, available, teachable and missional."
        image="https://freeway.church/flight-school/box_cover_title@6x.png"
      />

      <div className="fs-hero">
        <h1>
          <picture>
            <source media="(min-width: 640px)" srcSet="/flight-school/hero_cockpit_title@1x.png" />
            <img
              className="fs-pixel"
              src="/flight-school/hero_cockpit_portrait_title@1x.png"
              alt="Flight School"
            />
          </picture>
        </h1>
      </div>

      <section className="fs-section">
        <div className="fs-read fs-stack">
          <h2 style={{ color: 'var(--accent)' }}>Learning to fly</h2>
          <p>
            We just finished a series on what it takes to be a disciple. A disciple is someone who
            follows Jesus and learns to live like him. Flight School takes that series and helps you
            put it to work in your own life.
          </p>
          <p>
            <strong>Flying</strong> is a life fully devoted to Jesus, obeying God and living
            abundantly. <strong>Flight School</strong> is learning to fly. It starts by finding out
            where you are today.
          </p>
          <div style={{ paddingTop: 8 }}>
            <StartButton state={state} />
          </div>
        </div>
      </section>

      <section className="fs-section fs-section-deep">
        <div className="fs-wide">
          <h2 style={{ color: 'var(--accent)', marginBottom: 24 }}>The four traits</h2>
          <div className="fs-trait-grid">
            {TRAITS.map((trait) => (
              <article key={trait.id} className="fs-card fs-stack" data-trait={trait.id}>
                <TraitIcon trait={trait.id} />
                <h3 style={{ fontSize: 'var(--fs-h2)' }}>{trait.name}</h3>
                <p>{trait.definition}</p>
                <p className="fs-muted">
                  <em>{trait.test}</em>
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="fs-section">
        <div className="fs-wide">
          <h2 style={{ color: 'var(--accent)', marginBottom: 24 }}>How it works</h2>
          <ol className="fs-steps">
            {STEPS.map((step, i) => (
              <li key={step.label} className="fs-card fs-stack">
                <div className="fs-readout" style={{ color: 'var(--accent)' }}>
                  {i + 1}
                </div>
                <h3>{step.label}</h3>
                <p>{step.body}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="fs-section fs-section-deep">
        <div className="fs-read fs-stack">
          <h2 style={{ color: 'var(--accent)' }}>Your answers are private</h2>
          <p>
            Your answers are private. You choose who sees your results. Pastor Roy will see that you
            finished and who you named as helping you grow, so he can help connect you with a mentor.
          </p>
          <p>
            Written for high school students through long-time members. If you're still exploring
            faith, you're welcome here too.
          </p>
          <div className="fs-btn-row" style={{ paddingTop: 8 }}>
            <StartButton state={state} />
            <Link to="/#sermons" className="fs-btn fs-btn-2">
              Watch Messages
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
