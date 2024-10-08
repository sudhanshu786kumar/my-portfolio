import React from 'react';
import { motion } from 'framer-motion';
import { FaBriefcase, FaCalendar, FaBuilding, FaGraduationCap, FaCode, FaLaptopCode } from 'react-icons/fa';

const TimelineItem = ({ title, subtitle, date, description, icon: Icon, index, type }) => (
  <motion.div
    className={`mb-8 flex flex-col md:flex-row ${index % 2 === 0 ? 'md:flex-row-reverse' : ''} ${type === 'education' ? 'timeline-education' : ''}`}
    initial={{ opacity: 0, y: 50 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5, delay: index * 0.2 }}
    viewport={{ once: true }}
  >
    <div className="hidden md:block flex-grow w-1/2" />
    <div className="w-12 flex justify-center">
      <motion.div 
        className={`w-1 ${type === 'education' ? 'bg-green-500' : 'bg-blue-500'} rounded relative`}
        initial={{ height: 0 }}
        whileInView={{ height: '100%' }}
        transition={{ duration: 0.5 }}
      >
        <motion.div 
          className={`absolute w-8 h-8 ${type === 'education' ? 'bg-green-500' : 'bg-blue-500'} rounded-full top-0 left-1/2 transform -translate-x-1/2 flex items-center justify-center`}
          initial={{ scale: 0 }}
          whileInView={{ scale: 1 }}
          transition={{ type: "spring", stiffness: 300, delay: 0.2 }}
        >
          <Icon className="text-white text-lg" />
        </motion.div>
      </motion.div>
    </div>
    <motion.div 
      className={`w-full md:w-1/2 bg-white p-6 rounded-lg shadow-lg ${index % 2 === 0 ? 'md:mr-6' : 'md:ml-6'}`}
      whileHover={{ scale: 1.03 }}
      transition={{ type: "spring", stiffness: 300 }}
    >
      <motion.h3 
        className={`text-xl md:text-2xl font-semibold mb-2 ${type === 'education' ? 'text-green-600' : 'text-blue-600'}`}
        initial={{ y: 20, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2 }}
      >
        {title}
      </motion.h3>
      <motion.p 
        className="text-md md:text-lg mb-2 flex items-center text-gray-700"
        initial={{ y: 20, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.3 }}
      >
        <FaBuilding className="mr-2" />
        {subtitle}
      </motion.p>
      <motion.p 
        className="text-sm md:text-md mb-2 flex items-center text-gray-600"
        initial={{ y: 20, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.4 }}
      >
        <FaCalendar className="mr-2" />
        {date}
      </motion.p>
      <motion.p 
        className="text-sm md:text-base text-gray-600"
        initial={{ y: 20, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.5 }}
      >
        {description}
      </motion.p>
    </motion.div>
  </motion.div>
);

const Experience = ({ darkMode }) => {
  const timelineItems = [
    {
      title: "Frontend Developer",
      subtitle: "Cognizant",
      date: "2022 - Present",
      description: "Working on cutting-edge web applications using React and related technologies. Collaborating with cross-functional teams to deliver high-quality software solutions.",
      icon: FaLaptopCode,
      type: 'experience'
    },
    {
      title: "MERN Stack Intern",
      subtitle: "Cognizant",
      date: "2022",
      description: "Developed full-stack applications using MongoDB, Express, React, and Node.js. Gained hands-on experience in building scalable and efficient web applications.",
      icon: FaCode,
      type: 'experience'
    },
    {
      title: "Web Development Bootcamp",
      subtitle: "upGrad",
      date: "2021",
      description: "Completed an intensive web development bootcamp, focusing on modern frontend technologies and best practices in web development.",
      icon: FaBriefcase,
      type: 'education'
    },
    {
      title: "Bachelor of Technology",
      subtitle: "Electrical Engineering, RGPV",
      date: "2018 - 2022",
      description: "Studied Electrical Engineering with a focus on modern technologies and their applications in the field.",
      icon: FaGraduationCap,
      type: 'education'
    }
  ];

  return (
    <motion.div
      className={`container mx-auto py-12 ${darkMode ? 'text-white' : 'text-black'}`}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <motion.h2 
        className="text-4xl font-bold mb-12 text-center"
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ type: "spring", stiffness: 300 }}
      >
        My Journey
      </motion.h2>
      <div className="relative">
        {timelineItems.map((item, index) => (
          <TimelineItem key={index} {...item}  index={index} />
        ))}
      </div>
    </motion.div>
  );
};

export default Experience;