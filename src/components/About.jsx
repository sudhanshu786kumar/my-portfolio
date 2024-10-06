import React from 'react';
import { motion } from 'framer-motion';
import { FaCode, FaLaptopCode, FaShieldAlt } from 'react-icons/fa';

const About = ({ darkMode }) => {
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

  return (
    <motion.div
      className={`container mx-auto py-12 ${darkMode ? 'text-white' : 'text-black'}`}
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <h2 className="text-3xl font-bold mb-8">About Me</h2>
      <motion.div className={`bg-white shadow-md rounded-lg p-6 ${darkMode ? 'bg-gray-800' : ''}`} variants={itemVariants}>
        <p className="mb-4">
          <FaCode className="inline-block mr-2" />
          My name is Sudhanshu Kumar, and I am a full stack developer with over 2 years of experience since 2022. I'm currently working as a frontend developer at Cognizant, where I previously interned as a MERN developer. I've also received training in frontend technologies from upGrad.
        </p>
        <p className="mb-4">
          <FaLaptopCode className="inline-block mr-2" />
          I'm passionate about creating modern, efficient, and user-friendly web applications. My experience spans across various technologies in the MERN stack, and I'm always eager to learn and adapt to new technologies and best practices in the ever-evolving world of web development.
        </p>
        <p>
          <FaShieldAlt className="inline-block mr-2" />
          In addition to my technical skills, I have a strong interest in security and design, which allows me to create well-rounded and secure applications with great user experiences.
        </p>
      </motion.div>
    </motion.div>
  );
};

export default About;