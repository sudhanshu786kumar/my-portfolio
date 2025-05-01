import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import PropTypes from 'prop-types';


const SectionEffect = ({ sectionId, rocketPosition, darkMode, isRocketExploded, onExplodeConfirm }) => {
  const [burnLevel, setBurnLevel] = useState(0);
  const [isExploded, setIsExploded] = useState(false);
  const [showWaterEffect, setShowWaterEffect] = useState(false);
  const [showParticles, setShowParticles] = useState(false);
  const [showWarning, setShowWarning] = useState(false);

  // Reset all effects when rocket explodes
  useEffect(() => {
    if (isRocketExploded) {
      setBurnLevel(0);
      setIsExploded(false);
      setShowWaterEffect(false);
      setShowParticles(false);
      setShowWarning(false);
    }
  }, [isRocketExploded]);

  useEffect(() => {
    const section = document.getElementById(sectionId);
    if (!section || isRocketExploded) return;

    const sectionRect = section.getBoundingClientRect();
    const distance = Math.sqrt(
      Math.pow(rocketPosition.x - (sectionRect.left + sectionRect.width / 2), 2) +
      Math.pow(rocketPosition.y - sectionRect.top, 2)
    );

    if (distance < 150) {
      setBurnLevel(prev => {
        const newLevel = Math.min(prev + 15, 100);
        if (newLevel >= 50 && !isExploded) {
          setIsExploded(true);
          setShowParticles(true);
          setShowWarning(true);
        }
        return newLevel;
      });
    } else {
      setBurnLevel(prev => Math.max(prev - 1, 0));
      setShowParticles(false);
      setShowWarning(false);
    }
  }, [rocketPosition, sectionId, isExploded, isRocketExploded]);

  const handleConfirmExplosion = () => {
    setShowWaterEffect(true);
    setShowWarning(false);
    if (onExplodeConfirm) {
      onExplodeConfirm();
    }
  };

  const handleCancelExplosion = () => {
    setShowWarning(false);
    setBurnLevel(0);
    setIsExploded(false);
    setShowParticles(false);
  };

  const burnGradient = `linear-gradient(0deg, 
    rgba(255, 0, 0, ${Math.min(burnLevel / 50, 1)}) 0%, 
    rgba(255, 69, 0, ${Math.min(burnLevel / 60, 1)}) 30%, 
    rgba(255, 140, 0, ${Math.min(burnLevel / 70, 1)}) 60%, 
    rgba(255, 165, 0, ${Math.min(burnLevel / 80, 1)}) 80%, 
    transparent 100%
  )`;

  const particlesConfig = {
    particles: {
      number: {
        value: 50,
        density: {
          enable: true,
          value_area: 800
        }
      },
      color: {
        value: ['#ff4500', '#ffa500', '#ffd700']
      },
      shape: {
        type: 'circle'
      },
      opacity: {
        value: 0.5,
        random: true,
        animation: {
          enable: true,
          speed: 1,
          minimumValue: 0.1,
          sync: false
        }
      },
      size: {
        value: 3,
        random: true,
        animation: {
          enable: true,
          speed: 2,
          minimumValue: 0.1,
          sync: false
        }
      },
      line_linked: {
        enable: false
      },
      move: {
        enable: true,
        speed: 1,
        direction: 'up',
        random: true,
        straight: false,
        outMode: 'out',
        bounce: false,
        attract: {
          enable: false,
          rotateX: 600,
          rotateY: 1200
        }
      }
    },
    interactivity: {
      detect_on: 'canvas',
      events: {
        onhover: {
          enable: false
        },
        onclick: {
          enable: false
        },
        resize: true
      }
    },
    retina_detect: true
  };

  return (
    <AnimatePresence>
      {burnLevel > 0 && (
        <motion.div
          className="absolute inset-0 pointer-events-none"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          style={{ background: burnGradient }}
        >
          {/* Paper texture overlay */}
          <div 
            className="absolute inset-0 opacity-20"
            style={{
              backgroundImage: 'url("data:image/svg+xml,%3Csvg width=\'100\' height=\'100\' viewBox=\'0 0 100 100\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cpath d=\'M11 18c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm48 25c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm-43-7c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm63 31c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM34 90c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm56-76c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM12 86c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm28-65c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm23-11c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-6 60c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm29 22c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zM32 63c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm57-13c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-9-21c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM60 91c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM35 41c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2z\' fill=\'%23000000\' fill-opacity=\'0.1\' fill-rule=\'evenodd\'/%3E%3C/svg%3E")'
            }}
          />
        </motion.div>
      )}

      {/* Particle Effect */}
      {showParticles && (
        <div className="absolute inset-0 pointer-events-none">
          <Particles
            params={particlesConfig}
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              zIndex: 1
            }}
          />
        </div>
      )}

      {/* Warning Banner */}
      {showWarning && (
        <motion.div
          className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50"
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0, opacity: 0 }}
        >
          <div className={`p-6 rounded-lg shadow-xl ${
            darkMode ? 'bg-gray-800 text-white' : 'bg-white text-gray-800'
          }`}>
            <h3 className="text-xl font-bold mb-4">Warning!</h3>
            <p className="mb-4">The section is burning! Do you want to explode the rocket to extinguish the fire?</p>
            <div className="flex justify-end space-x-4">
              <button
                onClick={handleCancelExplosion}
                className={`px-4 py-2 rounded ${
                  darkMode ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-200 hover:bg-gray-300'
                }`}
              >
                Cancel
              </button>
              <button
                onClick={handleConfirmExplosion}
                className="px-4 py-2 rounded bg-red-500 hover:bg-red-600 text-white"
              >
                Explode Rocket
              </button>
            </div>
          </div>
        </motion.div>
      )}

      {showWaterEffect && (
        <motion.div
          className="absolute inset-0 pointer-events-none overflow-hidden"
          initial={{ y: '-100%' }}
          animate={{ y: '100%' }}
          transition={{ duration: 1.5, ease: 'easeInOut' }}
        >
          <div 
            className={`w-full h-full ${darkMode ? 'bg-blue-500' : 'bg-blue-300'} 
            opacity-50 blur-md transform -skew-y-12`}
          />
          {Array.from({ length: 20 }).map((_, i) => (
            <motion.div
              key={i}
              className="absolute rounded-full bg-white"
              style={{
                width: Math.random() * 10 + 5,
                height: Math.random() * 10 + 5,
                left: `${Math.random() * 100}%`,
                opacity: 0.6,
              }}
              animate={{
                y: ['0%', '100%'],
                opacity: [0.6, 0],
              }}
              transition={{
                duration: 1,
                delay: Math.random() * 0.5,
                ease: 'easeInOut',
              }}
            />
          ))}
        </motion.div>
      )}
    </AnimatePresence>
  );
};

SectionEffect.propTypes = {
  sectionId: PropTypes.string.isRequired,
  rocketPosition: PropTypes.shape({
    x: PropTypes.number.isRequired,
    y: PropTypes.number.isRequired
  }).isRequired,
  darkMode: PropTypes.bool.isRequired,
  isRocketExploded: PropTypes.bool.isRequired,
  onExplodeConfirm: PropTypes.func
};

export default SectionEffect;