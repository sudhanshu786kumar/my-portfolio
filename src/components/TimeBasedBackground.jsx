import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import PropTypes from 'prop-types';
import { FaRocket } from 'react-icons/fa';

const TimeBasedBackground = ({ darkMode }) => {
  const [timeOfDay, setTimeOfDay] = useState('day');
  const [stars, setStars] = useState([]);
  const [birds, setBirds] = useState([]);
  const [celestialPosition, setCelestialPosition] = useState('front');

  useEffect(() => {
    const updateTimeOfDay = () => {
      const hour = new Date().getHours();
      // If dark mode is enabled, always show night mode
      if (darkMode) {
        setTimeOfDay('night');
      } else {
        // Otherwise, follow the actual time of day
        if (hour >= 6 && hour < 18) {
          setTimeOfDay('day');
        } else {
          setTimeOfDay('night');
        }
      }
    };

    // Initial update
    updateTimeOfDay();

    // Update every minute
    const interval = setInterval(updateTimeOfDay, 60000);

    return () => clearInterval(interval);
  }, [darkMode]);

  useEffect(() => {
    // Change celestial position every 30 seconds
    const positionInterval = setInterval(() => {
      setCelestialPosition(prev => prev === 'front' ? 'back' : 'front');
    }, 30000);

    return () => clearInterval(positionInterval);
  }, []);

  useEffect(() => {
    if (timeOfDay === 'night') {
      // Generate stars
      const newStars = Array.from({ length: 50 }, () => ({
        id: Math.random(),
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: Math.random() * 2 + 1,
        opacity: Math.random() * 0.5 + 0.5,
        duration: Math.random() * 3 + 2
      }));
      setStars(newStars);
    } else {
      // Generate birds
      const newBirds = Array.from({ length: 5 }, () => ({
        id: Math.random(),
        x: Math.random() * 100,
        y: Math.random() * 30 + 10,
        size: Math.random() * 0.5 + 0.5,
        duration: Math.random() * 10 + 15
      }));
      setBirds(newBirds);
    }
  }, [timeOfDay]);

  const sunVariants = {
    animate: {
      rotate: 360,
      scale: [1, 1.1, 1],
      transition: {
        duration: 20,
        repeat: Infinity,
        ease: "linear"
      }
    },
    pulse: {
      scale: [1, 1.1, 1],
      transition: {
        duration: 5,
        repeat: Infinity,
        ease: "easeInOut"
      }
    },
    depth: {
      scale: celestialPosition === 'front' ? 1.2 : 0.8,
      zIndex: celestialPosition === 'front' ? 10 : 0,
      transition: {
        duration: 2,
        ease: "easeInOut"
      }
    }
  };

  const moonVariants = {
    animate: {
      rotate: 360,
      scale: [1, 1.05, 1],
      transition: {
        duration: 30,
        repeat: Infinity,
        ease: "linear"
      }
    },
    glow: {
      scale: [1, 1.05, 1],
      opacity: [0.8, 1, 0.8],
      transition: {
        duration: 4,
        repeat: Infinity,
        ease: "easeInOut"
      }
    },
    depth: {
      scale: celestialPosition === 'front' ? 1.2 : 0.8,
      zIndex: celestialPosition === 'front' ? 10 : 0,
      transition: {
        duration: 2,
        ease: "easeInOut"
      }
    }
  };

  const starVariants = {
    twinkle: {
      opacity: [0.3, 1, 0.3],
      scale: [1, 1.2, 1],
      transition: {
        duration: 2,
        repeat: Infinity,
        ease: "easeInOut"
      }
    }
  };

  const birdVariants = {
    fly: {
      x: ['0%', '100%'],
      y: ['0%', '-20%', '0%', '20%', '0%'],
      transition: {
        duration: (i) => i * 2 + 10,
        repeat: Infinity,
        ease: "linear"
      }
    }
  };

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* Day/Night background gradient */}
      <div 
        className={`absolute inset-0 transition-colors duration-1000 ${
          timeOfDay === 'day' 
            ? 'bg-gradient-to-b from-blue-400 to-blue-600' 
            : 'bg-gradient-to-b from-indigo-900 to-black'
        }`}
      />

      {/* Sun/Moon */}
      {timeOfDay === 'day' ? (
        <motion.div
          className="absolute top-20 right-20 w-24 h-24"
          variants={sunVariants}
          animate={["animate", "pulse", "depth"]}
          style={{
            transformOrigin: 'center center'
          }}
        >
          <div className="w-full h-full rounded-full bg-yellow-400 shadow-[0_0_50px_rgba(255,255,0,0.5)]" />
          <div className="absolute inset-0 rounded-full bg-yellow-300 blur-xl opacity-50" />
          {/* Sun rays */}
          {Array.from({ length: 8 }).map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-2 h-16 bg-yellow-300 rounded-full"
              style={{
                left: '50%',
                top: '50%',
                transform: `rotate(${i * 45}deg) translateY(-50%)`,
                transformOrigin: '0 0'
              }}
              animate={{
                scale: [1, 1.2, 1],
                opacity: [0.5, 0.8, 0.5]
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                delay: i * 0.2
              }}
            />
          ))}
        </motion.div>
      ) : (
        <motion.div
          className="absolute top-20 right-20 w-20 h-20"
          variants={moonVariants}
          animate={["animate", "glow", "depth"]}
          style={{
            transformOrigin: 'center center'
          }}
        >
          <div className="w-full h-full rounded-full bg-gray-200 shadow-[0_0_30px_rgba(255,255,255,0.3)]" />
          <div className="absolute inset-0 rounded-full bg-gray-100 blur-xl opacity-30" />
          {/* Moon craters */}
          {Array.from({ length: 5 }).map((_, i) => (
            <div
              key={i}
              className="absolute rounded-full bg-gray-300"
              style={{
                width: `${Math.random() * 10 + 5}px`,
                height: `${Math.random() * 10 + 5}px`,
                left: `${Math.random() * 60 + 20}%`,
                top: `${Math.random() * 60 + 20}%`,
                opacity: 0.3
              }}
            />
          ))}
        </motion.div>
      )}

      {/* Stars (only visible at night) */}
      {timeOfDay === 'night' && stars.map(star => (
        <motion.div
          key={star.id}
          className="absolute rounded-full bg-white"
          style={{
            width: star.size,
            height: star.size,
            left: `${star.x}%`,
            top: `${star.y}%`,
            opacity: star.opacity
          }}
          variants={starVariants}
          animate="twinkle"
          transition={{
            duration: star.duration,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      ))}

      {/* Birds (only visible during day) */}
      {timeOfDay === 'day' && birds.map(bird => (
        <motion.div
          key={bird.id}
          className="absolute"
          style={{
            left: `${bird.x}%`,
            top: `${bird.y}%`,
            width: `${bird.size}rem`,
            height: `${bird.size}rem`
          }}
          variants={birdVariants}
          animate="fly"
          custom={bird.duration}
        >
          <svg viewBox="0 0 24 24" fill="none" className="w-full h-full">
            <path
              d="M12 2L2 7L12 12L22 7L12 2Z"
              fill="white"
              opacity="0.8"
            />
          </svg>
        </motion.div>
      ))}

      {/* Clouds (only visible during day) */}
      {timeOfDay === 'day' && (
        <>
          <motion.div
            className="absolute top-1/4 left-1/4 w-32 h-16 bg-white rounded-full opacity-30"
            animate={{
              x: ['0%', '20%', '0%'],
              y: ['0%', '-10%', '0%']
            }}
            transition={{
              duration: 20,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
          <motion.div
            className="absolute top-1/3 right-1/4 w-40 h-20 bg-white rounded-full opacity-30"
            animate={{
              x: ['0%', '-20%', '0%'],
              y: ['0%', '10%', '0%']
            }}
            transition={{
              duration: 25,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
        </>
      )}
    </div>
  );
};

TimeBasedBackground.propTypes = {
  darkMode: PropTypes.bool.isRequired
};

export default TimeBasedBackground; 