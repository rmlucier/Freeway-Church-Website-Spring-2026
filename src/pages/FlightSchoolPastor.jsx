import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import SEO from '../components/SEO.jsx';
import { postFlightSchool } from '../flight-school/api.js';
import '../flight-school/flight-school.css';

const formatDate = (iso) =>
  new Date(iso).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });

// Unlinked page. The secret key sits in the URL fragment, which browsers never
// send to a server on page load. It shows who finished and who they named, and
// by design has no access to answers or scores.
export default function FlightSchoolPastor() {
  const { hash } = useLocation();
  const key = hash.replace(/^#/, '');
  const [view, setView] = useState({ status: 'loading', finishes: [] });

  useEffect(() => {
    let cancelled = false;
    (async () => {
      const result = key ? await postFlightSchool({ action: 'pastor', key }) : null;
      if (cancelled) return;
      setView(result?.finishes ? { status: 'ready', finishes: result.finishes } : { status: 'denied', finishes: [] });
    })();
    return () => {
      cancelled = true;
    };
  }, [key]);

  return (
    <div className="fs" style={{ paddingTop: 80 }}>
      <SEO path="/flight-school/pastor" title="Pastor View | Flight School" description="Flight School pastor view." noindex />
      <section className="fs-section">
        <div className="fs-wide fs-stack">
          <h1>Pastor view</h1>
          {view.status === 'loading' && <p className="fs-muted">Loading...</p>}
          {view.status === 'denied' && <p>This link doesn't work. Check that you have the whole link.</p>}
          {view.status === 'ready' && (
            <>
              <p>
                <span className="fs-readout" style={{ color: 'var(--accent)' }}>
                  {view.finishes.length}
                </span>{' '}
                finished so far. Answers and scores are only visible if someone shares their results
                with you.
              </p>
              <div className="fs-stack">
                {view.finishes.map((f, i) => (
                  <article key={`${f.finished_at}-${i}`} className="fs-card">
                    <h2 style={{ textTransform: 'none', fontFamily: 'var(--font-body)', fontWeight: 700, fontSize: 20 }}>
                      {f.name}
                    </h2>
                    <p className="fs-small">Finished {formatDate(f.finished_at)}</p>
                    <p style={{ marginTop: 8 }}>
                      <span className="fs-small">Who's helping them grow: </span>
                      {f.helpers || 'No one named yet'}
                    </p>
                  </article>
                ))}
              </div>
            </>
          )}
        </div>
      </section>
    </div>
  );
}
