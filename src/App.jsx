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
  return (
    <>
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
