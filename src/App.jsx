import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { useSpring, animated } from '@react-spring/web';
import Header from './components/Header';
import Home from './components/Home';
import About from './components/About';
import Experience from './components/Experience';
import Skills from './components/Skills';
import Projects from './components/Projects';
import Education from './components/Education';
import Contact from './components/Contact';
import Loader from './components/Loader';
import DarkModeToggle from './components/DarkModeToggle';

function App() {
  const [loading, setLoading] = useState(true);
  const [darkMode, setDarkMode] = useState(false);
  const [currentSection, setCurrentSection] = useState('home');

  useEffect(() => {
    setTimeout(() => setLoading(false), 2000);
  }, []);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  const fadeIn = useSpring({
    opacity: loading ? 0 : 1,
    config: { duration: 1000 },
  });

  if (loading) {
    return <Loader />;
  }

  const sections = [
    { id: 'home', component: Home },
    { id: 'about', component: About },
    { id: 'experience', component: Experience },
    { id: 'skills', component: Skills },
    { id: 'projects', component: Projects },
    { id: 'education', component: Education },
    { id: 'contact', component: Contact },
  ];

  return (
    <Router>
      <animated.div style={fadeIn} className={`App min-h-screen ${darkMode ? 'bg-gray-900 text-white' : 'bg-gray-100 text-black'}`}>
        <Header darkMode={darkMode} setCurrentSection={setCurrentSection} />
        <DarkModeToggle darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
        {sections.map(({ id, component: Component }) => (
          <div key={id} id={id} className={currentSection === id ? 'block' : 'hidden'}>
            <Component darkMode={darkMode} />
          </div>
        ))}
      </animated.div>
    </Router>
  );
}

export default App;