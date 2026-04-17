import { lazy, Suspense } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
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
const NotFound = lazy(() => import('./pages/NotFound.jsx'));

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
      <motion.div
        style={{ scaleX }}
        className="fixed top-0 left-0 right-0 h-0.5 bg-fc-teal origin-left z-[60]"
      />
      <Nav />
      <Suspense fallback={<RouteFallback />}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/visit" element={<Visit />} />
          <Route path="/beliefs" element={<Beliefs />} />
          <Route path="/giving" element={<Giving />} />
          <Route path="/kids" element={<Kids />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Suspense>
      <Footer />
      <Analytics />
      <SpeedInsights />
    </BrowserRouter>
  );
}
