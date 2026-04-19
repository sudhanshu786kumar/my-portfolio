import React from 'react';
import { motion } from 'framer-motion';

const UniverseLoader = () => {
  // Particle animations
  const particleVariants = (delay) => ({
    initial: { opacity: 0, scale: 0 },
    animate: {
      opacity: [0, 1, 0.5, 0],
      scale: [0, 1, 0.8, 0],
      y: [0, -100, -150],
      transition: {
        duration: 3,
        delay,
        repeat: Infinity,
        ease: 'easeOut',
      },
    },
  });

  const orbitVariants = {
    animate: {
      rotate: 360,
      transition: {
        duration: 8,
        repeat: Infinity,
        ease: 'linear',
      },
    },
  };

  const coreVariants = {
    animate: {
      scale: [1, 1.2, 1],
      opacity: [0.7, 1, 0.7],
      transition: {
        duration: 2,
        repeat: Infinity,
        ease: 'easeInOut',
      },
    },
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-space-void overflow-hidden z-50">
      {/* Animated background starfield */}
      <div className="absolute inset-0 opacity-30">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 rounded-full"
            style={{
              background: `hsla(${Math.random() * 360}, 100%, 50%, 0.8)`,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              boxShadow: `0 0 ${Math.random() * 10 + 5}px currentColor`,
            }}
            animate={{
              opacity: [0.3, 1, 0.3],
              scale: [0.5, 1, 0.5],
            }}
            transition={{
              duration: Math.random() * 3 + 2,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          />
        ))}
      </div>

      {/* Main loader container */}
      <div className="relative w-48 h-48">
        {/* Outer glow layer */}
        <motion.div
          className="absolute inset-0 rounded-full"
          style={{
            background: 'radial-gradient(circle, rgba(168,85,247,0.2) 0%, transparent 70%)',
            boxShadow: '0 0 40px rgba(168,85,247,0.3), inset 0 0 40px rgba(168,85,247,0.1)',
          }}
          animate={{
            opacity: [0.5, 1, 0.5],
          }}
          transition={{ duration: 2, repeat: Infinity }}
        />

        {/* Orbit paths */}
        {[0, 1, 2].map((orbit) => (
          <motion.div
            key={`orbit-${orbit}`}
            className="absolute inset-0 rounded-full border border-transparent"
            style={{
              borderColor: `rgba(${orbit === 0 ? '168,85,247' : orbit === 1 ? '34,211,238' : '251,191,36'}, 0.2)`,
              width: `${100 - orbit * 25}%`,
              height: `${100 - orbit * 25}%`,
              left: `${orbit * 12.5}%`,
              top: `${orbit * 12.5}%`,
            }}
            variants={orbitVariants}
            animate="animate"
          />
        ))}

        {/* Orbiting particles */}
        {[0, 1, 2].map((orbit) => (
          <motion.div
            key={`particle-${orbit}`}
            className="absolute w-3 h-3 rounded-full"
            style={{
              background:
                orbit === 0
                  ? 'radial-gradient(circle, #a855f7, #7c3aed)'
                  : orbit === 1
                    ? 'radial-gradient(circle, #22d3ee, #06b6d4)'
                    : 'radial-gradient(circle, #fbbf24, #f59e0b)',
              boxShadow:
                orbit === 0
                  ? '0 0 20px rgba(168,85,247,0.8)'
                  : orbit === 1
                    ? '0 0 20px rgba(34,211,238,0.8)'
                    : '0 0 20px rgba(251,191,36,0.8)',
              top: '50%',
              left: '50%',
              marginTop: `-${6 + orbit * 20}px`,
              marginLeft: `-6px`,
            }}
            animate={{
              rotate: [0, 360],
            }}
            transition={{
              duration: 6 - orbit * 1.5,
              repeat: Infinity,
              ease: 'linear',
            }}
          />
        ))}

        {/* Core element */}
        <motion.div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-8 rounded-full"
          style={{
            background: 'radial-gradient(circle, #a855f7, #22d3ee)',
            boxShadow: '0 0 30px rgba(168,85,247,0.8), 0 0 60px rgba(34,211,238,0.6)',
          }}
          variants={coreVariants}
          animate="animate"
        />

        {/* Pulsing rings */}
        {[0, 1, 2].map((ring) => (
          <motion.div
            key={`ring-${ring}`}
            className="absolute inset-0 rounded-full border"
            style={{
              borderColor: `rgba(168,85,247,${0.4 - ring * 0.15})`,
              width: `${100 + ring * 20}%`,
              height: `${100 + ring * 20}%`,
              left: `-${ring * 10}%`,
              top: `-${ring * 10}%`,
            }}
            animate={{
              scale: [1, 1.3, 1],
              opacity: [0.8, 0, 0],
            }}
            transition={{
              duration: 2,
              delay: ring * 0.5,
              repeat: Infinity,
            }}
          />
        ))}
      </div>

      {/* Loading text */}
      <motion.div
        className="absolute bottom-24 text-center"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 0.8 }}
      >
        <p className="text-sm tracking-[0.2em] uppercase font-500" style={{ color: '#22d3ee' }}>
          Initializing Universe
        </p>
        <motion.p
          className="text-xs mt-2 font-300"
          style={{ color: '#9494c0' }}
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          ✨ Loading cosmic portfolio...
        </motion.p>
      </motion.div>
    </div>
  );
};

export default UniverseLoader;
