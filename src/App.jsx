import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { motion, useScroll, useSpring } from 'framer-motion';
import Nav from './components/Nav.jsx';
import Footer from './components/Footer.jsx';
import Home from './pages/Home.jsx';
import Giving from './pages/Giving.jsx';

export default function App() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 30,
    restDelta: 0.001,
  });

  return (
    <BrowserRouter>
      <motion.div
        style={{ scaleX }}
        className="fixed top-0 left-0 right-0 h-0.5 bg-fc-teal origin-left z-[60]"
      />
      <Nav />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/giving" element={<Giving />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}
