import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-scroll';
import {
  FaHome,
  FaBriefcase,
  FaCog,
  FaProjectDiagram,
  FaGraduationCap,
  FaEnvelope,
  FaBars,
  FaTimes,
  FaChevronDown,
} from 'react-icons/fa';

const ModernHeader = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  const navItems = [
    { id: 'home', icon: FaHome, label: 'Home' },
    { id: 'experience', icon: FaBriefcase, label: 'Experience' },
    { id: 'skills', icon: FaCog, label: 'Skills' },
    { id: 'projects', icon: FaProjectDiagram, label: 'Projects' },
    { id: 'education', icon: FaGraduationCap, label: 'Education' },
    { id: 'contact', icon: FaEnvelope, label: 'Contact' },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleSectionChange = (id) => {
    setActiveSection(id);
    setIsOpen(false);
  };

  // Desktop Navigation
  const DesktopNav = () => (
    <div className="hidden md:flex items-center gap-2">
      {navItems.map(({ id, icon: Icon, label }) => (
        <Link
          key={id}
          to={id}
          smooth
          duration={500}
          offset={-70}
          onClick={() => handleSectionChange(id)}
          className="cursor-pointer"
        >
          <motion.button
            className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all duration-300 group relative ${
              activeSection === id
                ? 'bg-purple-500/30 text-purple-300'
                : 'text-text-secondary hover:text-text-primary'
            }`}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Icon className="text-lg" />
            <span className="text-sm font-500">{label}</span>

            {/* Underline animation */}
            {activeSection === id && (
              <motion.div
                className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-purple-500 to-cyan-400"
                layoutId="navUnderline"
              />
            )}

            {/* Hover glow */}
            <motion.div
              className="absolute inset-0 rounded-lg bg-purple-500 opacity-0 group-hover:opacity-10 -z-10"
              whileHover={{ opacity: 0.15 }}
            />
          </motion.button>
        </Link>
      ))}
    </div>
  );

  // Mobile Navigation
  const MobileNav = () => (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          className="absolute top-full left-0 right-0 bg-gradient-to-b from-space-nebula to-space-mid backdrop-blur-xl border-b border-purple-500/20 md:hidden"
        >
          <nav className="flex flex-col p-4 gap-2">
            {navItems.map(({ id, icon: Icon, label }) => (
              <Link
                key={id}
                to={id}
                smooth
                duration={500}
                onClick={() => handleSectionChange(id)}
                className="cursor-pointer"
              >
                <motion.button
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-300 ${
                    activeSection === id
                      ? 'bg-purple-500/30 text-purple-300'
                      : 'text-text-secondary hover:text-text-primary hover:bg-purple-500/10'
                  }`}
                  whileHover={{ x: 8 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Icon className="text-lg" />
                  <span className="text-sm font-500">{label}</span>
                  {activeSection === id && (
                    <motion.div
                      className="ml-auto w-2 h-2 rounded-full bg-cyan-400"
                      animate={{ scale: [1, 1.5, 1] }}
                      transition={{ duration: 2, repeat: Infinity }}
                    />
                  )}
                </motion.button>
              </Link>
            ))}
          </nav>
        </motion.div>
      )}
    </AnimatePresence>
  );

  return (
    <motion.header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-space-deep/90 backdrop-blur-md border-b border-purple-500/20'
          : 'bg-transparent backdrop-blur-sm'
      }`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ type: 'spring', stiffness: 100, damping: 20 }}
    >
      <div className="container mx-auto px-4 md:px-8 py-4 flex items-center justify-between">
        {/* Logo / Brand */}
        <motion.div
          className="flex items-center gap-2"
          whileHover={{ scale: 1.05 }}
        >
          <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-purple-500 to-cyan-400 flex items-center justify-center">
            <span className="text-white font-bold text-lg">S</span>
          </div>
          <div>
            <p className="text-sm font-700 text-white">Sudhanshu</p>
            <p className="text-xs text-purple-300">Developer</p>
          </div>
        </motion.div>

        {/* Desktop Navigation */}
        <DesktopNav />

        {/* Mobile Menu Toggle */}
        <motion.button
          className="md:hidden flex items-center justify-center w-10 h-10 rounded-lg bg-purple-500/20 border border-purple-500/30 text-text-primary"
          onClick={() => setIsOpen(!isOpen)}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          {isOpen ? <FaTimes size={20} /> : <FaBars size={20} />}
        </motion.button>
      </div>

      {/* Mobile Navigation Dropdown */}
      <MobileNav />

      {/* Progress indicator line */}
      <motion.div
        className="absolute bottom-0 left-0 h-0.5 bg-gradient-to-r from-purple-500 via-cyan-400 to-purple-500"
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        style={{ transformOrigin: 'left' }}
      />
    </motion.header>
  );
};

export default ModernHeader;
