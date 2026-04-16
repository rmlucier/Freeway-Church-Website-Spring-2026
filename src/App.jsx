import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { motion, useScroll, useSpring } from 'framer-motion';
import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from '@vercel/speed-insights/react';
import Nav from './components/Nav.jsx';
import Footer from './components/Footer.jsx';
import ScrollToHash from './components/ScrollToHash.jsx';
import Home from './pages/Home.jsx';
import Giving from './pages/Giving.jsx';
import Beliefs from './pages/Beliefs.jsx';
import Visit from './pages/Visit.jsx';

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
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/visit" element={<Visit />} />
        <Route path="/beliefs" element={<Beliefs />} />
        <Route path="/giving" element={<Giving />} />
      </Routes>
      <Footer />
      <Analytics />
      <SpeedInsights />
    </BrowserRouter>
  );
}
