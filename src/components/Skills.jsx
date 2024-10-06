import React from 'react';
import { motion } from 'framer-motion';
import { FaReact, FaJs, FaCss3, FaHtml5, FaPython, FaNodeJs, FaDatabase, FaServer, FaUsers, FaComments, FaLightbulb, FaUserTie, FaGitAlt, FaGithub, FaEdit, FaRobot, FaFigma } from 'react-icons/fa';
import { SiNextdotjs, SiMongodb } from 'react-icons/si';

const SkillIcon = ({ icon: Icon, name, level, isSoft }) => (
  <motion.div
    className="flex flex-col items-center mx-4 mb-8"
    initial={{ y: 50, opacity: 0 }}
    animate={{ y: 0, opacity: 1 }}
    transition={{ duration: 0.5 }}
  >
    <motion.div
      className={`w-20 h-20 ${isSoft ? 'bg-green-100' : 'bg-blue-100'} rounded-full flex items-center justify-center mb-2`}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
    >
      <Icon className={`text-4xl ${isSoft ? 'text-green-600' : 'text-blue-600'}`} />
    </motion.div>
    <p className="text-center font-semibold">{name}</p>
    {!isSoft && (
      <div className="mt-2 flex">
        {[...Array(5)].map((_, i) => (
          <motion.div
            key={i}
            className={`w-2 h-2 mx-1 rounded-full ${i < level ? 'bg-blue-600' : 'bg-gray-300'}`}
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: i * 0.1 }}
          />
        ))}
      </div>
    )}
  </motion.div>
);

const SkillChain = ({ skills, isSoft }) => (
  <div className="flex flex-wrap justify-center items-center relative">
    {skills.map((skill, index) => (
      <React.Fragment key={skill.name}>
        <SkillIcon icon={skill.icon} name={skill.name} level={skill.level} isSoft={isSoft} />
        {index < skills.length - 1 && (
          <motion.div
            className={`hidden md:block w-8 h-0.5 ${isSoft ? 'bg-green-300' : 'bg-blue-300'}`}
            initial={{ width: 0 }}
            animate={{ width: '2rem' }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
          />
        )}
      </React.Fragment>
    ))}
  </div>
);

const Skills = () => {
  const technicalSkills = [
    { name: 'ReactJS', icon: FaReact, level: 4 },
    { name: 'JavaScript', icon: FaJs, level: 4 },
    { name: 'CSS', icon: FaCss3, level: 4 },
    { name: 'HTML', icon: FaHtml5, level: 4 },
    { name: 'Python', icon: FaPython, level: 4 },
    { name: 'NodeJS', icon: FaNodeJs, level: 3 },
    { name: 'MongoDB', icon: SiMongodb, level: 3 },
    { name: 'MySQL', icon: FaDatabase, level: 3 },
    { name: 'NextJS', icon: SiNextdotjs, level: 3 },
    { name: 'DSA', icon: FaServer, level: 3 },
  ];

  const softSkills = [
    { name: 'Teamwork', icon: FaUsers },
    { name: 'Communication', icon: FaComments },
    { name: 'Problem Solving', icon: FaLightbulb },
    { name: 'Leadership', icon: FaUserTie },
  ];

  const tools = [
    { name: 'Git', icon: FaGitAlt },
    { name: 'GitHub Copilot', icon: FaGithub },
    { name: 'Cursor AI Editor', icon: FaEdit },
    { name: 'ChatGPT', icon: FaRobot },
    { name: 'Figma', icon: FaFigma },
  ];

  return (
    <motion.div
      className="container mx-auto py-12 px-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <h2 className="text-3xl font-bold mb-8 text-center">Skills</h2>
      <motion.div 
        className="mb-12"
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <h3 className="text-2xl font-semibold mb-6 text-center">Technical Skills</h3>
        <SkillChain skills={technicalSkills} />
      </motion.div>
      <motion.div 
        className="mb-12"
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <h3 className="text-2xl font-semibold mb-6 text-center">Soft Skills</h3>
        <SkillChain skills={softSkills} isSoft={true} />
      </motion.div>
      <motion.div 
        className="mb-12"
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.4 }}
      >
        <h3 className="text-2xl font-semibold mb-6 text-center">Tools</h3>
        <SkillChain skills={tools} isSoft={true} />
      </motion.div>
    </motion.div>
  );
};

export default Skills;