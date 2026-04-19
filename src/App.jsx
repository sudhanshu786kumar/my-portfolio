import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { useSpring, animated } from '@react-spring/web';
import { motion } from 'framer-motion';
import ModernHeader from './components/ModernHeader';
import UniverseLoader from './components/UniverseLoader';
import Mascot from './components/Mascot';
import ThemeToggle from './components/ThemeToggle';
import WelcomeGuide from './components/WelcomeGuide';
import Home from './components/Home';
import Experience from './components/Experience';
import Skills from './components/Skills';
import Projects from './components/Projects';
import Education from './components/Education';
import Contact from './components/Contact';
import './App.css';

function App() {
  const [loading, setLoading] = useState(true);
  const [showMascot, setShowMascot] = useState(true);
  const [showWelcome, setShowWelcome] = useState(true);

  useEffect(() => {
    // Initialize theme from localStorage or system preference
    const savedTheme = localStorage.getItem('theme');
    const htmlElement = document.documentElement;
    
    if (savedTheme) {
      if (savedTheme === 'dark') {
        htmlElement.classList.add('dark');
        htmlElement.classList.remove('light');
      } else {
        htmlElement.classList.remove('dark');
        htmlElement.classList.add('light');
      }
    } else {
      // Default to dark mode
      htmlElement.classList.add('dark');
      htmlElement.classList.remove('light');
    }
    
    // Simulate loading time
    const timer = setTimeout(() => setLoading(false), 3000);
    return () => clearTimeout(timer);
  }, []);

  const fadeIn = useSpring({
    opacity: loading ? 0 : 1,
    config: { duration: 800 },
  });

  if (loading) return <UniverseLoader />;

  return (
    <Router>
      {/* Cosmos layers — rendered behind everything */}
      <div className="star-field" aria-hidden="true" />
      <div className="nebula-bg" aria-hidden="true" />

      <animated.div style={fadeIn} className="App min-h-screen relative z-10">
        {/* Theme toggle */}
        <ThemeToggle />

        {/* Modern cosmic header */}
        <ModernHeader />

        {/* Welcome guide on first visit */}
        {showWelcome && <WelcomeGuide onComplete={() => setShowWelcome(false)} />}

        {/* Mascot guide */}
        {showMascot && (
          <Mascot onClose={() => setShowMascot(false)} />
        )}

        {/* Main content wrapper */}
        <div className="pt-20 md:pt-24">
          {/* Home Section */}
          <section id="home" className="scroll-section">
            <Home />
          </section>

          {/* Experience Section */}
          <section id="experience" className="scroll-section">
            <Experience />
          </section>

          {/* Skills Section */}
          <section id="skills" className="scroll-section">
            <Skills />
          </section>

          {/* Projects Section */}
          <section id="projects" className="scroll-section">
            <Projects />
          </section>

          {/* Education Section */}
          <section id="education" className="scroll-section">
            <Education />
          </section>

          {/* Contact Section */}
          <section id="contact" className="scroll-section">
            <Contact />
          </section>
        </div>

        {/* Scroll to top button */}
        <motion.button
          className="fixed bottom-20 right-8 z-40 w-12 h-12 rounded-full bg-gradient-to-br from-purple-500 to-cyan-400 flex items-center justify-center text-white font-bold text-lg shadow-lg"
          style={{ boxShadow: '0 0 20px rgba(168,85,247,0.6)' }}
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          initial={{ opacity: 0, scale: 0 }}
          whileInView={{ opacity: 1, scale: 1 }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          ↑
        </motion.button>
      </animated.div>
    </Router>
  );
}

export default App;