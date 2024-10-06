import React from 'react';
import { motion } from 'framer-motion';
import { FaEnvelope, FaLinkedin, FaGithub, FaMapMarkerAlt } from 'react-icons/fa';

const ContactItem = ({ icon: Icon, label, value, link }) => (
  <motion.a
    href={link}
    target="_blank"
    rel="noopener noreferrer"
    className="flex items-center space-x-3 mb-4 p-3 rounded-lg transition-colors duration-300"
    whileHover={{ scale: 1.05, backgroundColor: 'rgba(99, 102, 241, 0.1)' }}
    whileTap={{ scale: 0.95 }}
  >
    <Icon className="text-3xl text-indigo-500" />
    <div>
      <span className="font-semibold block">{label}</span>
      <span className="text-indigo-600 dark:text-indigo-400">{value}</span>
    </div>
  </motion.a>
);

const Contact = ({ darkMode }) => {
  const containerVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        duration: 0.5,
        when: "beforeChildren",
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <motion.div
      className={`container mx-auto py-12 px-4 ${darkMode ? 'text-white' : 'text-gray-800'}`}
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <motion.h2 
        className="text-4xl font-bold mb-8 text-center text-indigo-600 dark:text-indigo-400"
        variants={itemVariants}
      >
        Get in Touch
      </motion.h2>
      <motion.div 
        className={`max-w-4xl mx-auto ${
          darkMode 
            ? 'bg-gray-800 bg-opacity-50' 
            : 'bg-white bg-opacity-75'
        } backdrop-filter backdrop-blur-lg shadow-lg rounded-lg p-8`}
        style={{
          boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.37)',
          border: '1px solid rgba(255, 255, 255, 0.18)'
        }}
        variants={itemVariants}
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <motion.p 
              className="mb-6 text-lg"
              variants={itemVariants}
            >
              I'm always open to new opportunities and collaborations. Feel free to reach out through any of the following channels:
            </motion.p>
            <motion.div variants={itemVariants}>
              <ContactItem 
                icon={FaEnvelope} 
                label="Email" 
                value="sudhanshu786kumar@gmail.com" 
                link="mailto:sudhanshu786kumar@gmail.com" 
              />
              <ContactItem 
                icon={FaLinkedin} 
                label="LinkedIn" 
                value="Sudhanshu Kumar" 
                link="https://www.linkedin.com/in/sudhanshu-kumar-enthu" 
              />
              <ContactItem 
                icon={FaGithub} 
                label="GitHub" 
                value="sudhanshu786kumar" 
                link="https://github.com/sudhanshu786kumar" 
              />
              <ContactItem 
                icon={FaMapMarkerAlt} 
                label="Location" 
                value="Pune, India" 
                link="https://www.google.com/maps/place/Pune" 
              />
            </motion.div>
          </div>
          <motion.div 
            className="bg-indigo-100 dark:bg-indigo-900 rounded-lg p-6"
            variants={itemVariants}
          >
            <h3 className="text-2xl font-semibold mb-4">Let's Connect!</h3>
            <p className="mb-4">Whether you have a project in mind or just want to say hello, I'd love to hear from you.</p>
            <motion.button
              className="bg-indigo-600 text-white px-6 py-3 rounded-lg font-semibold transition-colors duration-300 hover:bg-indigo-700"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => window.location.href = 'mailto:sudhanshu786kumar@gmail.com'}
            >
              Send a Message
            </motion.button>
          </motion.div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default Contact;