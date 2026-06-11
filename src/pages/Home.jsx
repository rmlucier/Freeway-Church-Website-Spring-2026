import SEO from '../components/SEO.jsx';
import Hero from '../components/Hero.jsx';
import Vision from '../components/Vision.jsx';
import Pillars from '../components/Pillars.jsx';
import Community from '../components/Community.jsx';
import Coaching from '../components/Coaching.jsx';
import Services from '../components/Services.jsx';
import Sermons from '../components/Sermons.jsx';
import JoinCTA from '../components/JoinCTA.jsx';
import Midweek from '../components/Midweek.jsx';

export default function Home() {
  return (
    <>
      <SEO
        path="/"
        title="Freeway Church — A church in Albion, Michigan. Sundays at 10am."
        description="Freeway Church is a community in Albion, Michigan for anyone figuring out faith — including people who walked away from church and are thinking about coming back. Sundays at 10am. Everyone is welcome."
      />
      <Hero />
      <Vision />
      <Pillars />
      <Community />
      <Services />
      <Sermons />
      <JoinCTA />
      <Coaching />
      <Midweek />
    </>
  );
}
