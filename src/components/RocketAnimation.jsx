import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaRocket } from 'react-icons/fa';
import PropTypes from 'prop-types';
import SectionEffect from './SectionEffect';

const GasParticle = ({ color, x, y, scale, opacity, blur }) => (
  <motion.div
    className="absolute rounded-full"
    style={{
      backgroundColor: color,
      width: scale * 8,
      height: scale * 8,
      x,
      y,
      opacity,
      filter: `blur(${blur}px)`,
      transform: 'translate(-50%, -50%)'
    }}
  />);

GasParticle.propTypes = {
  color: PropTypes.string.isRequired,
  x: PropTypes.number.isRequired,
  y: PropTypes.number.isRequired,
  scale: PropTypes.number.isRequired,
  opacity: PropTypes.number.isRequired,
  blur: PropTypes.number.isRequired
};

const RocketFlame = ({ darkMode }) => {
  const [particles, setParticles] = useState([]);
  const flameColors = darkMode ? ['#4169E1', '#1E90FF', '#00BFFF'] : ['#FF4500', '#FFA500', '#FFD700'];
  
  useEffect(() => {
    const generateParticle = () => ({
      id: Math.random(),
      color: flameColors[Math.floor(Math.random() * flameColors.length)],
      x: (Math.random() - 0.5) * 20,
      y: Math.random() * 30 + 20,
      scale: Math.random() * 1.5 + 0.5,
      opacity: Math.random() * 0.5 + 0.5,
      blur: Math.random() * 3 + 1,
      velocity: Math.random() * 2 + 1
    });

    const particleInterval = setInterval(() => {
      setParticles(prevParticles => {
        const newParticles = prevParticles
          .filter(p => p.y < 60)
          .map(p => ({
            ...p,
            y: p.y + p.velocity,
            opacity: p.opacity * 0.95
          }));

        while (newParticles.length < 15) {
          newParticles.push(generateParticle());
        }

        return newParticles;
      });
    }, 50);

    return () => clearInterval(particleInterval);
  }, [darkMode]);

  return (
    <motion.div
      className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-full"
      style={{ width: '20px', height: '30px' }}
    >
      {particles.map(particle => (
        <GasParticle key={particle.id} {...particle} />
      ))}
      <motion.div
        className="absolute bottom-0 left-1/2 transform -translate-x-1/2"
        style={{
          width: '14px',
          height: '20px',
          background: darkMode 
            ? 'linear-gradient(to top, rgba(65,105,225,0.8), transparent)'
            : 'linear-gradient(to top, rgba(255,69,0,0.8), transparent)',
          borderRadius: '4px',
          filter: 'blur(2px)',
          zIndex: -1
        }}
      />
    </motion.div>
  );
};

RocketFlame.propTypes = {
  darkMode: PropTypes.bool.isRequired
};

const RocketAnimation = ({ darkMode }) => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isExploded, setIsExploded] = useState(false);
  const [particles, setParticles] = useState([]);
  const [orbitAngle, setOrbitAngle] = useState(0);

  const sections = ['home', 'experience', 'skills', 'projects', 'education', 'contact'];

  // Generate random position within viewport
  const getRandomPosition = () => {
    const maxX = window.innerWidth - 50;
    const maxY = window.innerHeight - 50;
    return {
      x: Math.random() * maxX,
      y: Math.random() * maxY
    };
  };

  // Generate explosion particles
  const generateParticles = () => {
    const colors = darkMode 
      ? ['#4169E1', '#1E90FF', '#00BFFF', '#87CEEB', '#B0E0E6']
      : ['#FF595E', '#FFCA3A', '#8AC926', '#1982C4', '#6A4C93'];
    return Array.from({ length: 20 }, (_, i) => ({
      id: i,
      color: colors[Math.floor(Math.random() * colors.length)],
      angle: (Math.PI * 2 * i) / 20,
      velocity: 10 + Math.random() * 10
    }));
  };

  // Handle rocket click
  const handleRocketClick = () => {
    if (!darkMode) {
      setIsExploded(true);
      setParticles(generateParticles());
      setTimeout(() => {
        setIsExploded(false);
        setPosition(getRandomPosition());
      }, 2000);
    }
  };

  // Update rocket position based on mode
  useEffect(() => {
    if (darkMode) {
      // Orbit around moon position (top-20 right-20)
      const moonX = window.innerWidth - 100; // Approximate moon position
      const moonY = 100;
      const orbitRadius = 150;
      
      const orbitInterval = setInterval(() => {
        setOrbitAngle(prev => (prev + 1) % 360);
        const rad = (orbitAngle * Math.PI) / 180;
        setPosition({
          x: moonX + Math.cos(rad) * orbitRadius,
          y: moonY + Math.sin(rad) * orbitRadius
        });
      }, 50);

      return () => clearInterval(orbitInterval);
    } else {
      // Random movement in light mode
      const moveInterval = setInterval(() => {
        if (!isExploded) {
          setPosition(getRandomPosition());
        }
      }, 5000);

      return () => clearInterval(moveInterval);
    }
  }, [darkMode, isExploded, orbitAngle]);

  return (
    <div className="fixed inset-0 pointer-events-none z-50">
      {!darkMode && sections.map(sectionId => (
        <SectionEffect
          key={sectionId}
          sectionId={sectionId}
          rocketPosition={position}
          darkMode={darkMode}
          isRocketExploded={isExploded}
        />
      ))}
      <AnimatePresence>
        {!isExploded && (
          <motion.div
            className="absolute pointer-events-auto cursor-pointer"
            initial={position}
            animate={{
              x: position.x,
              y: position.y,
              rotate: darkMode ? orbitAngle + 90 : [0, 10, -10, 0]
            }}
            transition={{
              type: 'spring',
              stiffness: 100,
              damping: 10,
              rotate: darkMode ? { duration: 0 } : {
                repeat: Infinity,
                duration: 2
              }
            }}
            onClick={handleRocketClick}
          >
            <motion.div
              animate={{
                y: [-2, 2, -2]
              }}
              transition={{
                repeat: Infinity,
                duration: 1.5
              }}
            >
              <FaRocket
                className={`text-3xl ${darkMode ? 'text-indigo-400' : 'text-indigo-600'}`}
              />
              <RocketFlame darkMode={darkMode} />
            </motion.div>
          </motion.div>
        )}

        {isExploded && (
          <>
            {particles.map((particle) => (
              <motion.div
                key={particle.id}
                className="absolute w-3 h-3 rounded-full"
                style={{
                  backgroundColor: particle.color,
                  left: position.x + 20,
                  top: position.y + 20
                }}
                initial={{ scale: 0 }}
                animate={{
                  x: Math.cos(particle.angle) * particle.velocity * 20,
                  y: Math.sin(particle.angle) * particle.velocity * 20,
                  scale: [1, 0],
                  opacity: [1, 0]
                }}
                transition={{
                  duration: 1,
                  ease: 'easeOut'
                }}
              />
            ))}
          </>
        )}
      </AnimatePresence>
    </div>
  );
};

RocketAnimation.propTypes = {
  darkMode: PropTypes.bool.isRequired
};

export default RocketAnimation;