import Header from './components/landing/Header';
import Hero from './components/landing/Hero';
import ContextStats from './components/landing/ContextStats';
import ConvergedPlatform from './components/landing/ConvergedPlatform';
import SuperAgents from './components/landing/SuperAgents';
import AISolutions from './components/landing/AISolutions';
import ProjectDelivery from './components/landing/ProjectDelivery';
import Pricing from './components/landing/Pricing';
import WebsiteService from './components/landing/WebsiteService';
import FinalCTA from './components/landing/FinalCTA';
import Footer from './components/landing/Footer';

export default function Home() {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <main>
        <Hero />
        <ConvergedPlatform />
        <AISolutions />
        <SuperAgents />
        <WebsiteService />
        {/* <ProjectDelivery /> */}
        <Pricing />
        <FinalCTA />
      </main>
      <Footer />
    </div>
  );
}
