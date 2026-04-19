import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaChevronRight, FaTimes, FaArrowRight, FaArrowDown } from 'react-icons/fa';

const WelcomeGuide = ({ onComplete }) => {
  const [step, setStep] = useState(0);
  const [dismissed, setDismissed] = useState(false);

  const steps = [
    {
      title: 'Welcome to My Universe! 🌌',
      description: 'This is an interactive portfolio showcasing my skills, projects, and experience.',
      highlight: 'home',
      action: 'Let\'s get started!',
      gradient: 'from-purple-500/30 to-cyan-500/10',
    },
    {
      title: 'Navigate Sections',
      description: 'Use the navigation bar at the top to jump to different sections instantly.',
      highlight: 'header',
      action: 'Continue',
      gradient: 'from-cyan-500/30 to-purple-500/10',
    },
    {
      title: 'Meet Your Guide! 👋',
      description: 'The mascot (bottom right) provides helpful tips and context for each section.',
      highlight: 'mascot',
      action: 'Got it!',
      gradient: 'from-emerald-500/30 to-cyan-500/10',
    },
    {
      title: 'Explore & Interact',
      description: 'Hover over elements, click on projects, and watch smooth animations as you scroll.',
      highlight: 'content',
      action: 'Start Exploring',
      gradient: 'from-gold-500/30 to-purple-500/10',
    },
  ];

  const current = steps[step];

  const containerVariants = {
    initial: { opacity: 0, scale: 0.8, y: 50 },
    animate: { opacity: 1, scale: 1, y: 0, transition: { duration: 0.4 } },
    exit: { opacity: 0, scale: 0.8, y: -50, transition: { duration: 0.3 } },
  };

  const handleNext = () => {
    if (step < steps.length - 1) {
      setStep(step + 1);
    } else {
      setDismissed(true);
      onComplete?.();
    }
  };

  const handleSkip = () => {
    setDismissed(true);
    onComplete?.();
  };

  if (dismissed) return null;

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-50 flex items-center justify-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        {/* Backdrop */}
        <motion.div
          className="absolute inset-0 bg-black/50 backdrop-blur-sm"
          onClick={handleSkip}
        />

        {/* Guide Card */}
        <motion.div
          className={`relative mx-4 max-w-md bg-gradient-to-br ${current.gradient} border border-purple-500/30 rounded-2xl backdrop-blur-xl p-8 shadow-2xl`}
          variants={containerVariants}
          initial="initial"
          animate="animate"
          exit="exit"
        >
          {/* Close button */}
          <motion.button
            onClick={handleSkip}
            className="absolute top-4 right-4 text-text-muted hover:text-text-primary transition"
            whileHover={{ rotate: 90, scale: 1.1 }}
          >
            <FaTimes size={18} />
          </motion.button>

          {/* Step indicator */}
          <div className="flex gap-2 mb-6">
            {steps.map((_, i) => (
              <motion.div
                key={i}
                className={`h-1.5 rounded-full transition-all ${i <= step ? 'bg-gradient-to-r from-purple-500 to-cyan-400 w-6' : 'bg-gray-600 w-2'}`}
                animate={{
                  width: i <= step ? 24 : 8,
                }}
              />
            ))}
          </div>

          {/* Content */}
          <div className="mb-8">
            <motion.h2
              className="text-2xl font-bold text-white mb-3"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
            >
              {current.title}
            </motion.h2>

            <motion.p
              className="text-text-secondary leading-relaxed"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              {current.description}
            </motion.p>
          </div>

          {/* Hint with animation */}
          <motion.div
            className="bg-purple-500/10 border border-purple-500/30 rounded-lg p-4 mb-6"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <p className="text-sm text-purple-300 flex items-center gap-2">
              <FaArrowDown className="animate-bounce" />
              <span>Take a moment to check this out</span>
            </p>
          </motion.div>

          {/* Buttons */}
          <div className="flex gap-4">
            <motion.button
              onClick={handleSkip}
              className="flex-1 px-4 py-2 text-sm font-500 text-text-muted hover:text-text-primary transition"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Skip
            </motion.button>

            <motion.button
              onClick={handleNext}
              className="flex-1 bg-gradient-to-r from-purple-500 to-cyan-400 px-4 py-2 rounded-lg text-white font-600 flex items-center justify-center gap-2 hover:shadow-lg transition"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {current.action}
              <FaChevronRight size={14} />
            </motion.button>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default WelcomeGuide;
