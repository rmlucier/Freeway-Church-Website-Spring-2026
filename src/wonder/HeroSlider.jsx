import { useCallback, useEffect, useRef, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import useReducedMotion from '../components/useReducedMotionSafe.js';
import { CHRISTMAS_EVE_TIME } from './config.js';
import './wonder.css';

const ADVANCE_MS = 7000;
// The hero art (re-rendered from the series canvas without its grain layer).
// It fills the slide like `object-fit: cover`, so on screens taller than 16:9
// it is drawn wider than the viewport: 100vh × 16/9 ≈ 178vh.
const HERO_SRCSET = [1280, 1920, 2560, 3840]
  .map((w) => `/images/wonder/wonder-hero-${w}.webp ${w}w`)
  .join(', ');
const HERO_SIZES = '(max-aspect-ratio: 16/9) 178vh, 100vw';
// Start loading the regular hero (and its video) a little before it is shown,
// not on page load, so the Wonder image gets the bandwidth first.
const PREMOUNT_MS = 5000;

function WonderSlide() {
  return (
    <section className="wonder-slide relative min-h-screen flex items-start md:items-center overflow-hidden pt-28 pb-28">
      <picture className="absolute inset-0 z-0" aria-hidden="true">
        <source
          type="image/webp"
          srcSet={HERO_SRCSET}
          sizes={HERO_SIZES}
        />
        <img
          src="/images/wonder/wonder-hero.jpg"
          alt=""
          width="1920"
          height="1080"
          fetchpriority="high"
          decoding="async"
          className="wonder-slide-img h-full w-full object-cover"
        />
      </picture>

      <div className="container-fc relative z-10 w-full">
        <div className="max-w-xl">
          <p className="wonder-label text-sm md:text-base">Christmas at Freeway</p>
          <h1 className="wonder-title text-[clamp(4.75rem,18vw,10rem)] mt-2 mb-4 md:mb-6" data-text="Wonder">Wonder</h1>
          <p className="wonder-text text-2xl md:text-3xl font-extrabold">Anything is possible.</p>
          <p className="wonder-text mt-2 text-base md:text-lg font-semibold opacity-90">
            Sundays · Nov 29 – Dec 27 · 10:00 AM
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link to="/visit" className="wonder-btn wonder-btn-cream">
              Plan a Visit
            </Link>
            <a href="#christmas-eve" className="wonder-btn wonder-btn-red">
              Christmas Eve · {CHRISTMAS_EVE_TIME}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

const SLIDE_NAMES = ['Wonder', 'Home Free'];

// Two-slide hero: slide 1 is Wonder, slide 2 is the regular hero (passed in as
// children, unchanged). No slider library — slides are stacked in one grid
// cell and cross-fade, so the height never jumps.
export default function HeroSlider({ children }) {
  const reduceMotion = useReducedMotion();
  const [index, setIndex] = useState(0);
  const [secondMounted, setSecondMounted] = useState(false);
  const [hovered, setHovered] = useState(false);
  const [focused, setFocused] = useState(false);
  const [inView, setInView] = useState(true);
  const rootRef = useRef(null);
  const touch = useRef(null);
  const count = 2;

  const go = useCallback((i) => {
    const next = (i + count) % count;
    if (next === 1) setSecondMounted(true);
    setIndex(next);
  }, []);

  const paused = hovered || focused || !inView || reduceMotion;

  // Auto-advance
  useEffect(() => {
    if (paused) return undefined;
    const t = setTimeout(() => go(index + 1), ADVANCE_MS);
    return () => clearTimeout(t);
  }, [index, paused, go]);

  // Mount slide 2 shortly before its first turn
  useEffect(() => {
    if (secondMounted || paused) return undefined;
    const t = setTimeout(() => setSecondMounted(true), PREMOUNT_MS);
    return () => clearTimeout(t);
  }, [secondMounted, paused]);

  // Don't rotate while the hero is scrolled out of view
  useEffect(() => {
    const el = rootRef.current;
    if (!el || typeof IntersectionObserver === 'undefined') return undefined;
    const io = new IntersectionObserver(([entry]) => setInView(entry.isIntersecting), {
      threshold: 0.3,
    });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const onTouchStart = (e) => {
    const t = e.touches[0];
    touch.current = { x: t.clientX, y: t.clientY };
  };
  const onTouchEnd = (e) => {
    if (!touch.current) return;
    const t = e.changedTouches[0];
    const dx = t.clientX - touch.current.x;
    const dy = t.clientY - touch.current.y;
    touch.current = null;
    if (Math.abs(dx) > 50 && Math.abs(dx) > Math.abs(dy) * 1.5) go(index + (dx < 0 ? 1 : -1));
  };

  return (
    <section
      ref={rootRef}
      className="wonder-slider relative"
      aria-roledescription="carousel"
      aria-label="Featured"
      onPointerEnter={(e) => e.pointerType === 'mouse' && setHovered(true)}
      onPointerLeave={() => setHovered(false)}
      onFocus={() => setFocused(true)}
      onBlur={(e) => {
        if (!e.currentTarget.contains(e.relatedTarget)) setFocused(false);
      }}
      onTouchStart={onTouchStart}
      onTouchEnd={onTouchEnd}
      onKeyDown={(e) => {
        if (e.key === 'ArrowRight') go(index + 1);
        if (e.key === 'ArrowLeft') go(index - 1);
      }}
    >
      <Helmet>
        <link
          rel="preload"
          as="image"
          type="image/webp"
          imagesrcset={HERO_SRCSET}
          imagesizes={HERO_SIZES}
          fetchpriority="high"
        />
      </Helmet>

      <div className="wonder-slides">
        {[<WonderSlide key="w" />, secondMounted ? children : <div key="p" className="min-h-screen bg-fc-black" />].map(
          (slide, i) => {
            const active = i === index;
            return (
              <div
                key={i}
                role="group"
                aria-roledescription="slide"
                aria-label={`${i + 1} of ${count}: ${SLIDE_NAMES[i]}`}
                aria-hidden={active ? undefined : 'true'}
                {...(active ? {} : { inert: '' })}
                className={`wonder-slide-frame ${active ? 'is-active' : ''}`}
              >
                {slide}
              </div>
            );
          }
        )}
      </div>

      <div className="wonder-slider-controls">
        <button type="button" className="wonder-arrow" aria-label="Previous slide" onClick={() => go(index - 1)}>
          <svg viewBox="0 0 16 16" aria-hidden="true">
            <path d="M10 3 5 8l5 5" />
          </svg>
        </button>
        {SLIDE_NAMES.map((name, i) => (
          <button
            key={name}
            type="button"
            className={`wonder-dot ${i === index ? 'is-active' : ''}`}
            aria-label={`Show slide ${i + 1}: ${name}`}
            aria-current={i === index ? 'true' : undefined}
            onClick={() => go(i)}
          />
        ))}
        <button type="button" className="wonder-arrow" aria-label="Next slide" onClick={() => go(index + 1)}>
          <svg viewBox="0 0 16 16" aria-hidden="true">
            <path d="M6 3l5 5-5 5" />
          </svg>
        </button>
      </div>
    </section>
  );
}
