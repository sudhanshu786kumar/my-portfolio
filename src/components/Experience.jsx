import React from 'react';
import { motion } from 'framer-motion';
import { FaBriefcase, FaCalendar, FaBuilding, FaGraduationCap, FaCode, FaLaptopCode } from 'react-icons/fa';

const TimelineItem = ({ title, subtitle, date, description, icon: Icon, index, type, technologies }) => (
  <motion.div
    className={`mb-12 flex flex-col md:flex-row ${index % 2 === 0 ? 'md:flex-row-reverse' : ''} ${type === 'education' ? 'timeline-education' : ''}`}
    initial={{ opacity: 0, y: 50 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5, delay: index * 0.2 }}
    viewport={{ once: true }}
  >
    <div className="hidden md:block flex-grow w-1/2" />
    <div className="w-12 flex justify-center relative">
      <motion.div 
        className={`w-1 ${type === 'education' ? 'bg-gradient-to-b from-emerald-400 to-emerald-600' : 'bg-gradient-to-b from-purple-400 to-cyan-400'} rounded relative`}
        initial={{ height: 0 }}
        whileInView={{ height: '100%' }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
      >
        <motion.div 
          className={`absolute w-10 h-10 ${type === 'education' ? 'bg-gradient-to-br from-emerald-400 to-emerald-600' : 'bg-gradient-to-br from-purple-400 to-cyan-400'} rounded-full top-0 left-1/2 transform -translate-x-1/2 flex items-center justify-center shadow-lg`}
          style={{ boxShadow: type === 'education' ? '0 0 20px rgba(52,211,153,0.6)' : '0 0 20px rgba(168,85,247,0.6)' }}
          initial={{ scale: 0 }}
          whileInView={{ scale: 1 }}
          transition={{ type: "spring", stiffness: 300, delay: index * 0.2 + 0.2 }}
          viewport={{ once: true }}
        >
          <Icon className="text-white text-xl" />
        </motion.div>
      </motion.div>
    </div>
    <motion.div 
      className={`w-full md:w-1/2 bg-gradient-to-br ${type === 'education' ? 'from-space-mid/80 to-space-nebula/50 border-emerald-400/30' : 'from-space-mid/80 to-space-nebula/50 border-purple-400/30'} border backdrop-blur-sm p-6 md:p-8 rounded-2xl shadow-xl ${index % 2 === 0 ? 'md:mr-8' : 'md:ml-8'}`}
      whileHover={{ scale: 1.02, y: -5 }}
      transition={{ type: "spring", stiffness: 300 }}
    >
      {/* Journey step indicator */}
      <motion.div 
        className={`inline-block px-3 py-1 rounded-full mb-3 text-xs font-semibold ${type === 'education' ? 'bg-emerald-500/30 text-emerald-300' : 'bg-purple-500/30 text-purple-300'}`}
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ delay: index * 0.2 + 0.1 }}
        viewport={{ once: true }}
      >
        {type === 'education' ? '🎓 Education' : '💼 Experience'}
      </motion.div>

      <motion.h3 
        className={`text-xl md:text-2xl font-bold mb-2 ${type === 'education' ? 'text-emerald-300' : 'text-purple-300'}`}
        initial={{ y: 20, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        transition={{ delay: index * 0.2 + 0.2 }}
        viewport={{ once: true }}
      >
        {title}
      </motion.h3>
      
      <motion.p 
        className="text-base md:text-lg mb-2 flex items-center text-text-primary font-semibold"
        initial={{ y: 20, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        transition={{ delay: index * 0.2 + 0.25 }}
        viewport={{ once: true }}
      >
        <FaBuilding className="mr-3 text-cyan-400" />
        {subtitle}
      </motion.p>

      <motion.p 
        className="text-sm md:text-base mb-3 flex items-center text-text-secondary"
        initial={{ y: 20, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        transition={{ delay: index * 0.2 + 0.3 }}
        viewport={{ once: true }}
      >
        <FaCalendar className="mr-3 text-pink-400" />
        <span className="tracking-wider">{date}</span>
      </motion.p>

      <motion.p 
        className="text-sm md:text-base text-text-secondary leading-relaxed mb-4"
        initial={{ y: 20, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        transition={{ delay: index * 0.2 + 0.35 }}
        viewport={{ once: true }}
      >
        {description}
      </motion.p>

      {/* Tech stack for current role */}
      {technologies && technologies.length > 0 && (
        <motion.div 
          className="flex flex-wrap gap-2 mt-4 pt-4 border-t border-white/10"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: index * 0.2 + 0.4 }}
          viewport={{ once: true }}
        >
          {technologies.map((tech, techIndex) => (
            <motion.span
              key={techIndex}
              className="text-xs px-3 py-1 rounded-full bg-cyan-500/20 text-cyan-300 border border-cyan-500/30 backdrop-blur-sm"
              initial={{ scale: 0, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              transition={{ delay: index * 0.2 + 0.4 + techIndex * 0.05 }}
              viewport={{ once: true }}
            >
              {tech}
            </motion.span>
          ))}
        </motion.div>
      )}
    </motion.div>
  </motion.div>
);

const Experience = ({ darkMode }) => {
  const timelineItems = [
    {
      title: "Senior Full Stack Developer",
      subtitle: "Accenture",
      date: "2026 - Present",
      description: "Architecting scalable full-stack applications leveraging Node.js, React.js, LLMs, and NestJS. Building intelligent systems with MongoDB and Databricks. Driving innovation in modern web architecture.",
      icon: FaLaptopCode,
      type: 'experience',
      technologies: ['Node.js', 'React.js', 'LLMs', 'NestJS', 'MongoDB', 'Databricks']
    },
    {
      title: "Frontend Developer",
      subtitle: "Cognizant",
      date: "2022 - 2026",
      description: "Developed cutting-edge web applications using React and modern technologies. Collaborated with cross-functional teams to deliver high-quality software solutions. Mentored junior developers and established best practices.",
      icon: FaLaptopCode,
      type: 'experience',
      technologies: ['React', 'JavaScript', 'Tailwind CSS', 'Redux']
    },
    {
      title: "MERN Stack Intern",
      subtitle: "Cognizant",
      date: "2022",
      description: "Developed full-stack applications using MongoDB, Express, React, and Node.js. Gained hands-on experience in building scalable and efficient web applications. Contributed to production-level code.",
      icon: FaCode,
      type: 'experience',
      technologies: ['MongoDB', 'Express', 'React', 'Node.js']
    },
    {
      title: "Web Development Bootcamp",
      subtitle: "upGrad",
      date: "2021",
      description: "Completed an intensive web development bootcamp, focusing on modern frontend technologies and best practices in web development. Built 10+ real-world projects.",
      icon: FaBriefcase,
      type: 'education'
    },
    {
      title: "Bachelor of Technology",
      subtitle: "Electrical Engineering, RGPV",
      date: "2018 - 2022",
      description: "Studied Electrical Engineering with a focus on modern technologies and their applications. GPA: 8.2/10",
      icon: FaGraduationCap,
      type: 'education'
    }
  ];

  return (
    <motion.div
      className={`container mx-auto py-12 px-4 ${darkMode ? 'text-white' : 'text-black'}`}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <motion.h2 
        className="text-4xl md:text-5xl font-bold mb-4 text-center bg-gradient-to-r from-purple-400 via-pink-400 to-cyan-400 bg-clip-text text-transparent"
        initial={{ y: -50, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        transition={{ type: "spring", stiffness: 300 }}
        viewport={{ once: true }}
      >
        My Journey Through the Cosmos
      </motion.h2>
      
      <motion.p 
        className="text-center text-text-secondary mb-12 max-w-2xl mx-auto"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
        viewport={{ once: true }}
      >
        Every milestone is a step forward in my professional evolution. From my first internship to becoming a Senior Full Stack Developer, each role has shaped my expertise and passion.
      </motion.p>

      <div className="relative">
        {/* Vertical line in the middle (desktop) */}
        <div className="hidden md:block absolute left-1/2 transform -translate-x-1/2 top-0 bottom-0 w-1 bg-gradient-to-b from-purple-500 via-pink-500 to-cyan-500 rounded-full opacity-30" />
        
        {timelineItems.map((item, index) => (
          <TimelineItem key={index} {...item} index={index} />
        ))}

        {/* Journey completion message */}
        <motion.div
          className="mt-12 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          viewport={{ once: true }}
        >
          <p className="text-lg text-text-secondary italic">
            ✨ And the journey continues... 🚀
          </p>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default Experience;