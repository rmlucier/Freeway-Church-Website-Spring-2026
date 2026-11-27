import { useEffect, useRef, useState } from 'react';
import { SERIES, detroitDate } from './config.js';
import { WonderHills } from './Touches.jsx';
import './wonder.css';

const MONTHS = ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'];
const DAYS = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];

function parts(iso) {
  const [y, m, d] = iso.split('-').map(Number);
  const day = new Date(Date.UTC(y, m - 1, d)).getUTCDay();
  return { month: MONTHS[m - 1], day: d, weekday: DAYS[day] };
}

// Slim band right under the hero: the series at a glance. The next Sunday gets
// a "THIS SUNDAY" tag and past dates dim. Both are worked out in the browser
// (after mount) so the pre-rendered HTML never goes stale.
export default function SeriesStrip() {
  const [today, setToday] = useState(null);
  const listRef = useRef(null);
  useEffect(() => setToday(detroitDate()), []);

  const nextSunday = today ? SERIES.find((s) => s.sunday && s.date >= today)?.date : null;

  // Cards rise in one after another the first time the strip scrolls into view.
  // The pre-rendered HTML shows them as-is; we only "arm" (hide, then animate)
  // when the strip starts below the fold, so nothing visible ever blinks.
  const sectionRef = useRef(null);
  const [anim, setAnim] = useState('off'); // off | armed | in
  useEffect(() => {
    const el = sectionRef.current;
    if (!el || typeof IntersectionObserver === 'undefined') return undefined;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return undefined;
    if (el.getBoundingClientRect().top < window.innerHeight) return undefined;
    setAnim('armed');
    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        setAnim('in');
        io.disconnect();
      },
      { threshold: 0.25 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  // Phones show the list as a sideways row: start it at this week's card.
  useEffect(() => {
    const list = listRef.current;
    const card = list?.querySelector('.is-next');
    if (!card || list.scrollWidth <= list.clientWidth) return;
    list.scrollLeft = card.offsetLeft - list.offsetLeft - 24;
  }, [nextSunday]);

  return (
    <section
      ref={sectionRef}
      id="wonder"
      className={`wonder-strip relative overflow-hidden pt-14 md:pt-20 ${anim === 'armed' ? 'is-armed' : ''} ${anim === 'in' ? 'is-in' : ''}`}
      aria-labelledby="wonder-strip-title"
    >
      {/* Big star across from the title, like the hero: Wonder left, star right */}
      <img
        src="/images/wonder/star.svg"
        alt=""
        aria-hidden="true"
        loading="lazy"
        width="800"
        height="800"
        className="wonder-strip-star"
      />
      <div className="wonder-strip-hills" aria-hidden="true">
        <WonderHills id="wonder-wobble-strip" />
      </div>
      <div className="container-fc relative z-10 pb-16 md:pb-24">
        <h2 id="wonder-strip-title" className="mb-8 md:mb-10 flex flex-wrap items-baseline gap-x-4 gap-y-1">
          <span className="wonder-title wonder-title-sm text-5xl md:text-6xl" data-text="Wonder">Wonder</span>
          <span className="wonder-text text-lg md:text-xl font-bold">
            <span className="hidden sm:inline">· </span>a five-week Christmas series
          </span>
        </h2>

        <ol ref={listRef} className="grid grid-cols-2 sm:grid-cols-4 xl:grid-cols-7 gap-3 md:gap-4">
          {SERIES.map((s, i) => {
            const p = parts(s.date);
            const past = today && s.date < today;
            const isNext = s.date === nextSunday;
            return (
              <li
                key={s.date}
                id={s.id}
                style={{ '--i': i }}
                className={`wonder-card ${past ? 'is-past' : ''} ${isNext ? 'is-next' : ''}`}
              >
                {isNext && <span className="wonder-tag">This Sunday</span>}
                <p className="wonder-label wonder-card-date">
                  {p.weekday} · {p.month} {p.day}
                </p>
                <p className="wonder-card-title">{s.label}</p>
                {s.sunday && <p className="wonder-card-note">10:00 AM</p>}
                {s.note && <p className="wonder-card-note">{s.note}</p>}
                {s.id === 'christmas-eve' && (
                  <img
                    src="/images/wonder/candle.svg"
                    alt=""
                    aria-hidden="true"
                    width="44"
                    height="44"
                    loading="lazy"
                    className="wonder-candle"
                  />
                )}
              </li>
            );
          })}
        </ol>
      </div>
    </section>
  );
}
