import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FaSun, FaMoon } from 'react-icons/fa';

const ThemeToggle = () => {
  const [isDark, setIsDark] = useState(() => {
    // Initialize from localStorage or system preference
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
      return savedTheme === 'dark';
    }
    return window.matchMedia('(prefers-color-scheme: dark)').matches;
  });

  useEffect(() => {
    // Apply theme to HTML element
    const htmlElement = document.documentElement;
    if (isDark) {
      htmlElement.classList.add('dark');
      htmlElement.classList.remove('light');
    } else {
      htmlElement.classList.remove('dark');
      htmlElement.classList.add('light');
    }
    // Save to localStorage
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
  }, [isDark]);

  const toggleTheme = () => {
    setIsDark((prev) => !prev);
  };

  return (
    <motion.button
      onClick={toggleTheme}
      className="fixed top-24 md:top-24 right-8 z-40 w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300"
      style={{
        background: isDark
          ? 'linear-gradient(135deg, #a855f7, #22d3ee)'
          : 'linear-gradient(135deg, #fbbf24, #f59e0b)',
        boxShadow: isDark
          ? '0 0 20px rgba(168,85,247,0.6)'
          : '0 0 20px rgba(251,191,36,0.6)',
      }}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      title={isDark ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
    >
      {isDark ? (
        <FaSun className="text-white text-lg" />
      ) : (
        <FaMoon className="text-white text-lg" />
      )}
    </motion.button>
  );
};

export default ThemeToggle;
