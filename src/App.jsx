import { lazy, Suspense } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { motion, useScroll, useSpring } from 'framer-motion';
import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from '@vercel/speed-insights/react';
import Nav from './components/Nav.jsx';
import Footer from './components/Footer.jsx';
import ScrollToHash from './components/ScrollToHash.jsx';

// Route-level code splitting — each page ships as its own chunk so visitors
// only download the code for the page they're actually on.
const Home = lazy(() => import('./pages/Home.jsx'));
const Visit = lazy(() => import('./pages/Visit.jsx'));
const Beliefs = lazy(() => import('./pages/Beliefs.jsx'));
const Giving = lazy(() => import('./pages/Giving.jsx'));
const Kids = lazy(() => import('./pages/Kids.jsx'));
const Summer = lazy(() => import('./pages/Summer.jsx'));
const Breakthrough = lazy(() => import('./pages/Breakthrough.jsx'));
const Academy = lazy(() => import('./pages/Academy.jsx'));
const Marriage = lazy(() => import('./pages/Marriage.jsx'));
const FlightSchool = lazy(() => import('./pages/FlightSchool.jsx'));
const FlightSchoolPreflight = lazy(() => import('./pages/FlightSchoolPreflight.jsx'));
const FlightSchoolLog = lazy(() => import('./pages/FlightSchoolLog.jsx'));
const FlightSchoolBonus = lazy(() => import('./pages/FlightSchoolBonus.jsx'));
const FlightSchoolPastor = lazy(() => import('./pages/FlightSchoolPastor.jsx'));
const NotFound = lazy(() => import('./pages/NotFound.jsx'));

// Flight Log links keep private results in the URL fragment. Never let
// analytics pick that fragment up.
const stripHash = (event) => ({ ...event, url: event.url.split('#')[0] });

// The assessment and bonus run full-screen with their own top bar, so the person
// can focus on one question at a time.
function SiteChrome({ children }) {
  const { pathname } = useLocation();
  return ['/flight-school/preflight', '/flight-school/bonus'].includes(pathname) ? null : children;
}

// Intentionally minimal — keeps the nav visible and avoids a flashy spinner
// for what is usually a sub-100ms chunk load on a fast connection.
function RouteFallback() {
  return <div className="min-h-screen bg-fc-black" aria-hidden="true" />;
}

export default function App() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 30,
    restDelta: 0.001,
  });

  return (
    <BrowserRouter>
      <ScrollToHash />
      <SiteChrome>
        <motion.div
          style={{ scaleX }}
          className="fixed top-0 left-0 right-0 h-0.5 bg-fc-teal origin-left z-[60]"
        />
        <Nav />
      </SiteChrome>
      <Suspense fallback={<RouteFallback />}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/visit" element={<Visit />} />
          <Route path="/beliefs" element={<Beliefs />} />
          <Route path="/giving" element={<Giving />} />
          <Route path="/kids" element={<Kids />} />
          <Route path="/summer" element={<Summer />} />
          <Route path="/prayer" element={<Breakthrough />} />
          <Route path="/academy" element={<Academy />} />
          <Route path="/marriage" element={<Marriage />} />
          <Route path="/flight-school" element={<FlightSchool />} />
          <Route path="/flight-school/preflight" element={<FlightSchoolPreflight />} />
          <Route path="/flight-school/log" element={<FlightSchoolLog />} />
          <Route path="/flight-school/bonus" element={<FlightSchoolBonus />} />
          <Route path="/flight-school/pastor" element={<FlightSchoolPastor />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Suspense>
      <SiteChrome>
        <Footer />
      </SiteChrome>
      <Analytics beforeSend={stripHash} />
      <SpeedInsights beforeSend={stripHash} />
    </BrowserRouter>
  );
}
