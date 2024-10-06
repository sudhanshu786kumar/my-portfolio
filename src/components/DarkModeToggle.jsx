import React from 'react';
import { motion } from 'framer-motion';

const DarkModeToggle = ({ darkMode, toggleDarkMode }) => {
  return (
    <motion.button
      className={`p-2 rounded-full ${darkMode ? 'bg-yellow-400' : 'bg-gray-700'}`}
      onClick={toggleDarkMode}
      whileTap={{ scale: 0.95 }}
    >
      {darkMode ? '🌞' : '🌙'}
    </motion.button>
  );
};

export default DarkModeToggle;
