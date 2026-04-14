import { motion, useScroll, useSpring } from 'framer-motion';
import Nav from './components/Nav.jsx';
import Hero from './components/Hero.jsx';
import Vision from './components/Vision.jsx';
import Pillars from './components/Pillars.jsx';
import Community from './components/Community.jsx';
import Services from './components/Services.jsx';
import Sermons from './components/Sermons.jsx';
import JoinCTA from './components/JoinCTA.jsx';
import Footer from './components/Footer.jsx';

export default function App() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 30,
    restDelta: 0.001,
  });

  return (
    <>
      <motion.div
        style={{ scaleX }}
        className="fixed top-0 left-0 right-0 h-0.5 bg-fc-teal origin-left z-[60]"
      />
      <Nav />
      <main>
        <Hero />
        <Vision />
        <Pillars />
        <Community />
        <Services />
        <Sermons />
        <JoinCTA />
      </main>
      <Footer />
    </>
  );
}
