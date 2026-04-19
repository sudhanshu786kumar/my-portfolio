import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-scroll';
import { FaCode } from 'react-icons/fa';
import PropTypes from 'prop-types';
import TimeBasedBackground from './TimeBasedBackground';
import { HeaderCardDesc } from '../constants/constant';

const Home = ({ darkMode }) => {
  const [currentTextIndex, setCurrentTextIndex] = useState(0);
  const [displayText, setDisplayText] = useState('');
  
  useEffect(() => {
    const texts = [
      "I'm Sudhanshu Kumar",
      "a Frontend Developer",
      "passionate about creating modern web applications",
      "I'm Sudhanshu Kumar, a Frontend Developer passionate about creating modern web applications."
    ];
    let currentChar = 0;
    let timeoutId;

    const typeText = () => {
      if (currentChar < texts[currentTextIndex].length) {
        setDisplayText(texts[currentTextIndex].substring(0, currentChar + 1));
        currentChar++;
        
        // Variable typing speed
        const delay = Math.random() * 50 + 50; // Random delay between 50-100ms
        timeoutId = setTimeout(typeText, delay);
      } else {
        // Wait before starting to erase
        timeoutId = setTimeout(startErasing, 2000);
      }
    };

    const startErasing = () => {
      currentChar = texts[currentTextIndex].length;
      eraseText();
    };

    const eraseText = () => {
      if (currentChar > 0) {
        setDisplayText(texts[currentTextIndex].substring(0, currentChar - 1));
        currentChar--;
        timeoutId = setTimeout(eraseText, 30); // Faster erasing speed
      } else {
        // Move to next text
        setCurrentTextIndex((prevIndex) => (prevIndex + 1) % texts.length);
        timeoutId = setTimeout(() => {
          currentChar = 0;
          typeText();
        }, 500);
      }
    };

    timeoutId = setTimeout(typeText, 200);

    return () => clearTimeout(timeoutId);
  }, [currentTextIndex]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: {
        duration: 0.5,
        when: "beforeChildren",
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  const photoVariants = {
    hidden: { scale: 0, rotateY: 360},
    visible: { 
      scale: 1, 
      rotate: 0,
      transition: {
        type: "spring",
        stiffness: 260,
        damping: 20
      }
    }
  };

  const textVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.5,
        ease: "easeOut"
      }
    }
  };

  const typingVariants = {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    exit: { opacity: 0 }
  };

  return (
    <div className="animated-gradient relative">
      <TimeBasedBackground darkMode={darkMode} />
      <motion.div
        className="container mx-auto py-12 px-4 text-text-primary"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <section id="home" className="scroll-section">
          {/* Combined Photo and Welcome Section */}
          <motion.div 
            className="flex flex-col md:flex-row items-center justify-center mb-20 backdrop-blur-xl rounded-3xl p-8 md:p-12 relative overflow-hidden"
            style={{
              background: 'linear-gradient(135deg, rgba(12,12,40,0.7), rgba(18,18,58,0.7))',
              border: '1px solid rgba(168,85,247,0.3)',
              boxShadow: '0 0 40px rgba(168,85,247,0.2), inset 0 0 60px rgba(34,211,238,0.05)'
            }}
          >
            {/* Photo Section */}
            <motion.div 
              className="mb-8 md:mb-0 md:mr-12 relative"
              variants={photoVariants}
            >
              {/* Glow background */}
              <motion.div
                className="absolute -inset-6 rounded-full blur-2xl"
                style={{
                  background: 'linear-gradient(135deg, #a855f7, #22d3ee)',
                  opacity: 0.3,
                }}
                animate={{ opacity: [0.2, 0.4, 0.2] }}
                transition={{ duration: 3, repeat: Infinity }}
              />
              <motion.div
                className="relative w-56 h-56 rounded-full overflow-hidden border-2 border-purple-400/50"
                whileHover={{ scale: 1.08, boxShadow: '0 0 30px rgba(168,85,247,0.6)' }}
                transition={{ type: "spring", stiffness: 300 }}
                style={{
                  boxShadow: '0 0 20px rgba(168,85,247,0.4), inset 0 0 20px rgba(34,211,238,0.2)'
                }}
              >
                <img 
                  src="my_profile.jfif" 
                  alt="Sudhanshu Kumar" 
                  className="w-full h-full object-cover"
                />
              </motion.div>
            </motion.div>

            {/* Welcome Text */}
            <motion.div 
              className="text-center md:text-left" 
              variants={itemVariants}
            >
             
              <h1 className="text-5xl md:text-6xl font-bold mb-4 bg-gradient-to-r from-purple-300 via-cyan-300 to-emerald-300 bg-clip-text text-transparent leading-tight">Welcome to My Portfolio</h1>
              <div className="relative overflow-hidden h-[3rem] px-2">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={currentTextIndex}
                    className={`text-xl mb-8 flex items-center ${darkMode ? 'text-gray-300' : 'text-black-700'}`}
                    variants={textVariants}
                  >
                    <motion.span
                      initial="initial"
                      animate="animate"
                      exit="exit"
                      variants={typingVariants}
                      className="inline-block whitespace-nowrap"
                    >
                      {displayText}
                    </motion.span>
                    <motion.span
                      className={`inline-block ml-2 w-[3px] h-[1.2em] align-middle ${
                        darkMode ? 'bg-white' : 'bg-gray-900'
                      }`}
                      animate={{ 
                        opacity: [1, 0, 1],
                        scaleY: [1, 0.8, 1]
                      }}
                      transition={{ 
                        duration: 0.8,
                        repeat: Infinity,
                        ease: "easeInOut"
                      }}
                    />
                  </motion.div>
                </AnimatePresence>
              </div>
              <Link to="projects" smooth={true} duration={500}>
                <motion.button
                  className="inline-flex items-center px-8 py-4 rounded-full text-lg font-semibold text-white mt-6"
                  style={{
                    background: 'linear-gradient(135deg, #a855f7, #22d3ee)',
                    boxShadow: '0 0 20px rgba(168,85,247,0.6)'
                  }}
                  whileHover={{ scale: 1.08, boxShadow: '0 0 30px rgba(168,85,247,0.8)' }}
                  whileTap={{ scale: 0.95 }}
                >
                  Explore My Work ✨
                </motion.button>
              </Link>
            </motion.div>
          </motion.div>

          {/* About Section */}
          <motion.div className="mt-32" variants={itemVariants}>
            <motion.h2 
              className="text-4xl md:text-5xl font-bold mb-4 text-center bg-gradient-to-r from-cyan-300 via-purple-300 to-pink-300 bg-clip-text text-transparent"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              viewport={{ once: true }}
            >
              About Me
            </motion.h2>
            <motion.p 
              className="text-center text-text-secondary mb-12 max-w-2xl mx-auto"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              viewport={{ once: true }}
            >
              Crafting digital experiences through innovation and passion
            </motion.p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {HeaderCardDesc.map((title, index) => (
                <motion.div 
                  key={index}
                  className="p-8 rounded-2xl backdrop-blur-xl relative group"
                  style={{
                    background: 'linear-gradient(135deg, rgba(168,85,247,0.1), rgba(34,211,238,0.1))',
                    border: '1px solid rgba(168,85,247,0.2)',
                    boxShadow: '0 0 20px rgba(168,85,247,0.15)'
                  }}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  whileHover={{ y: -5 }}
                  transition={{ type: "spring", stiffness: 300, delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <motion.div
                    className="absolute inset-0 rounded-2xl blur-xl group-hover:opacity-100 opacity-0 transition-opacity"
                    style={{
                      background: 'linear-gradient(135deg, #a855f7, #22d3ee)',
                      zIndex: -1
                    }}
                  />
                  <motion.div 
                    className="text-5xl mb-4 inline-block"
                    animate={{ rotate: [0, 10, -10, 0] }}
                    transition={{ duration: 3, repeat: Infinity, delay: index * 0.5 }}
                  >
                    <FaCode className="text-purple-400" />
                  </motion.div>
                  <h3 className="text-xl font-semibold mb-3 text-white">{title.title}</h3>
                  <p className="text-text-secondary leading-relaxed">
                    {title.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </section>
      </motion.div>
    </div>
  );
};

Home.propTypes = {
  darkMode: PropTypes.bool.isRequired
};

export default Home;