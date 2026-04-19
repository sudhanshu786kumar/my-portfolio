import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaArrowRight, FaTimes } from 'react-icons/fa';

const Mascot = ({ onClose }) => {
  const [visible, setVisible] = useState(true);
  const [messageIndex, setMessageIndex] = useState(0);
  const [currentSection, setCurrentSection] = useState('home');

  const messages = {
    home: {
      greeting: 'Welcome to my universe!',
      hint: 'Explore my journey through the cosmos of code and innovation.',
      emoji: '👋',
    },
    experience: {
      greeting: 'My Career Journey',
      hint: 'From intern to Senior Full Stack Developer @Accenture. Watch my evolution!',
      emoji: '💼',
    },
    skills: {
      greeting: 'Technical Expertise',
      hint: 'React, Node.js, NestJS, MongoDB, Databricks, LLMs and more!',
      emoji: '⚙️',
    },
    projects: {
      greeting: 'My Creations',
      hint: 'Explore the applications I have built. Each one tells a story!',
      emoji: '🎨',
    },
    education: {
      greeting: 'Learning Path',
      hint: 'My academic foundation and professional certifications.',
      emoji: '🎓',
    },
    contact: {
      greeting: 'Connect with Me',
      hint: 'Reach out and let us talk about exciting opportunities!',
      emoji: '💬',
    },
  };

  // Track current section based on scroll position
  useEffect(() => {
    const observerOptions = {
      threshold: 0.3,
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setCurrentSection(entry.target.id);
        }
      });
    }, observerOptions);

    // Observe all sections
    const sections = document.querySelectorAll('.scroll-section');
    sections.forEach((section) => observer.observe(section));

    return () => {
      sections.forEach((section) => observer.unobserve(section));
    };
  }, []);

  const current = messages[currentSection] || messages.home;

  // Floating animation
  const floatVariants = {
    initial: { y: 0, opacity: 0 },
    animate: {
      y: [0, -15, 0],
      opacity: 1,
      transition: { duration: 4, repeat: Infinity, ease: 'easeInOut' },
    },
    exit: { opacity: 0, y: 20, transition: { duration: 0.3 } },
  };

  const containerVariants = {
    initial: { scale: 0.5, opacity: 0 },
    animate: {
      scale: 1,
      opacity: 1,
      transition: { type: 'spring', stiffness: 260, damping: 20 },
    },
    exit: { scale: 0.5, opacity: 0, transition: { duration: 0.2 } },
  };

  // Auto-rotate messages
  useEffect(() => {
    const timer = setTimeout(() => {
      setMessageIndex((prev) => (prev + 1) % 2);
    }, 5000);
    return () => clearTimeout(timer);
  }, [messageIndex]);

  if (!visible) return null;

  return (
    <AnimatePresence>
      <motion.div
        className="fixed bottom-24 md:bottom-32 right-6 md:right-8 z-40"
        variants={floatVariants}
        initial="initial"
        animate="animate"
        exit="exit"
      >
        {/* Glowing background */}
        <motion.div
          className="absolute inset-0 rounded-full blur-2xl"
          style={{
            background: 'linear-gradient(135deg, #a855f7, #22d3ee)',
            opacity: 0.3,
            width: '300px',
            height: '300px',
            left: '-60px',
            top: '-60px',
          }}
          animate={{ opacity: [0.2, 0.4, 0.2] }}
          transition={{ duration: 3, repeat: Infinity }}
        />

        {/* Main card */}
        <motion.div
          className="relative bg-gradient-to-br from-space-mid to-space-nebula dark:from-space-mid dark:to-space-nebula light:from-purple-100 light:to-blue-100 backdrop-blur-xl border border-purple-500/30 dark:border-purple-500/30 light:border-purple-300/40 rounded-3xl p-6 w-72 shadow-2xl"
          variants={containerVariants}
          initial="initial"
          animate="animate"
          style={{
            boxShadow: document.documentElement.classList.contains('light')
              ? '0 0 30px rgba(139,92,246,0.2), inset 0 0 30px rgba(139,92,246,0.1)'
              : '0 0 30px rgba(168,85,247,0.3), inset 0 0 30px rgba(34,211,238,0.1)',
          }}
        >
          {/* Close button */}
          <motion.button
            onClick={() => {
              setVisible(false);
              onClose?.();
            }}
            className="absolute top-3 right-3 text-text-muted dark:text-text-muted light:text-purple-600 hover:text-text-primary dark:hover:text-text-primary light:hover:text-purple-800 transition"
            whileHover={{ rotate: 90, scale: 1.2 }}
            whileTap={{ scale: 0.9 }}
          >
            <FaTimes size={16} />
          </motion.button>

          {/* Emoji header */}
          <motion.div
            className="text-5xl mb-3 inline-block"
            animate={{ rotate: [0, 10, -10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            {current.emoji}
          </motion.div>

          {/* Message content */}
          <div className="space-y-3">
            <motion.h3
              className="text-base font-700 text-text-primary dark:text-text-primary light:text-purple-900"
              key={`greeting-${currentSection}`}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.4 }}
            >
              {current.greeting}
            </motion.h3>

            <motion.p
              className="text-sm text-text-secondary dark:text-text-secondary light:text-purple-700 leading-relaxed"
              key={`hint-${currentSection}-${messageIndex}`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
            >
              {messageIndex === 0 ? current.hint : '✨ Keep exploring!'}
            </motion.p>
          </div>

          {/* Animation dots */}
          <div className="flex gap-2 mt-4">
            {[0, 1].map((i) => (
              <motion.div
                key={i}
                className="w-1.5 h-1.5 rounded-full bg-purple-400/60"
                animate={{
                  opacity: messageIndex === i ? 1 : 0.3,
                  scale: messageIndex === i ? 1.2 : 1,
                }}
                transition={{ duration: 0.3 }}
              />
            ))}
          </div>

          {/* Pointer */}
          <motion.div
            className="absolute -right-3 top-1/2 -translate-y-1/2"
            animate={{ x: [0, 5, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          >
            <FaArrowRight
              className="text-purple-400/50"
              size={20}
              style={{ filter: 'drop-shadow(0 0 8px rgba(168, 85, 247, 0.6))' }}
            />
          </motion.div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default Mascot;
