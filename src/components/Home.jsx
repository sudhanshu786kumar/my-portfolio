import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-scroll';
import { FaRocket, FaCode} from 'react-icons/fa';
import PropTypes from 'prop-types';
import RocketAnimation from './RocketAnimation';
import Experience from './Experience';
import Skills from './Skills';
import Projects from './Projects';
import Contact from './Contact';
import Education from './Education';
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
      <RocketAnimation darkMode={darkMode} />
      <motion.div
        className={`container mx-auto py-12 px-4 ${
          darkMode ? 'text-gray-100' : 'text-gray-900'
        }`}
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <section id="home">
          {/* Combined Photo and Welcome Section */}
          <motion.div 
            className={`flex flex-col md:flex-row items-center justify-center mb-20 bg-opacity-10 backdrop-filter backdrop-blur-lg rounded-lg p-8 ${
              darkMode ? 'bg-gray-800 bg-opacity-30' : 'bg-white bg-opacity-70'
            }`}
            style={{
              border: '1px solid rgba(255, 255, 255, 0.18)',
              boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.37)'
            }}
          >
            {/* Photo Section */}
            <motion.div 
              className="mb-8 md:mb-0 md:mr-12"
              variants={photoVariants}
            >
              <motion.div
                className="relative w-48 h-48 rounded-full overflow-hidden"
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 300 }}
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
              <h1 className={`text-4xl md:text-5xl font-bold mb-4  ${darkMode ? 'text-white-600' : 'text-indigo-600'}`}>Welcome to My Portfolio</h1>
              <div className="relative overflow-hidden h-[3rem] px-2">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={currentTextIndex}
                    className={`text-xl mb-8 flex items-center ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}
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
                  className={`inline-flex items-center px-8 py-4 rounded-full text-lg font-semibold 
                    ${darkMode ? 'bg-indigo-600 hover:bg-indigo-700' : 'bg-indigo-500 hover:bg-indigo-600'}
                    text-white transition duration-300`}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <FaRocket className="mr-2" />
                  Explore My Work
                </motion.button>
              </Link>
            </motion.div>
          </motion.div>

          {/* About Section */}
          <motion.div className="mt-20" variants={itemVariants}>
            <h2 className="text-3xl font-bold mb-8 text-center text-indigo-600">About Me</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {HeaderCardDesc.map((title, index) => (
                <motion.div 
                  key={index}
                  className={`p-6 rounded-lg shadow-lg bg-opacity-10 backdrop-filter backdrop-blur-lg ${
                    darkMode ? 'bg-gray-800 bg-opacity-30 text-gray-100' : 'bg-white bg-opacity-70 text-gray-800'
                  }`}
                  whileHover={{ scale: 1.05, rotateY: 10 }}
                  transition={{ type: "spring", stiffness: 300 }}
                  style={{
                    boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.37)',
                    border: '1px solid rgba(255, 255, 255, 0.18)'
                  }}
                >  
                  <FaCode className="text-4xl mb-4 text-indigo-500" />

                  <h3 className="text-xl font-semibold mb-2">{title.title}</h3>
                  <p className={darkMode ? 'text-gray-300' : 'text-gray-700'}>
                    {title.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </section>

        <section id="experience">
          <Experience darkMode={darkMode} />
        </section>

        <section id="skills">
          <Skills darkMode={darkMode} />
        </section>

        <section id="projects">
          <Projects darkMode={darkMode} />
        </section>

        <section id="education">
          <Education darkMode={darkMode} />
        </section>

        <section id="contact">
          <Contact darkMode={darkMode} />
        </section>
      </motion.div>
    </div>
  );
};

Home.propTypes = {
  darkMode: PropTypes.bool.isRequired
};

export default Home;