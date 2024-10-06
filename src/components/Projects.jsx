import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaGithub, FaExternalLinkAlt, FaReact, FaNodeJs } from 'react-icons/fa';
import { SiNextdotjs, SiMongodb, SiJavascript } from 'react-icons/si';

const TechIcon = ({ icon: Icon, name }) => (
  <div className="flex flex-col items-center mx-2" title={name}>
    <Icon className="text-2xl mb-1" />
    <span className="text-xs">{name}</span>
  </div>
);

const ProjectCard = ({ title, description, link, githubLink, techStack, darkMode }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      className={`${darkMode ? 'bg-gray-800 text-white' : 'bg-white text-gray-800'} shadow-lg rounded-lg overflow-hidden relative`}
      whileHover={{ scale: 1.05 }}
      transition={{ duration: 0.3 }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
    >
      <div className="p-6">
        <h3 className="text-2xl font-bold mb-2">{title}</h3>
        <p className={`${darkMode ? 'text-gray-300' : 'text-gray-600'} mb-4`}>{description}</p>
        <div className="flex flex-wrap mb-4">
          {techStack.map((tech, index) => (
            <TechIcon key={index} icon={tech.icon} name={tech.name} />
          ))}
        </div>
        <div className="flex justify-between items-center">
          {githubLink && (
            <motion.a
              href={githubLink}
              target="_blank"
              rel="noopener noreferrer"
              className={`${darkMode ? 'text-gray-300 hover:text-white' : 'text-gray-600 hover:text-gray-800'}`}
              whileHover={{ scale: 1.1 }}
            >
              <FaGithub size={24} />
            </motion.a>
          )}
          {link && (
            <motion.a
              href={link}
              target="_blank"
              rel="noopener noreferrer"
              className={`${darkMode ? 'text-blue-400 hover:text-blue-300' : 'text-blue-600 hover:text-blue-800'}`}
              whileHover={{ scale: 1.1 }}
            >
              <FaExternalLinkAlt size={24} />
            </motion.a>
          )}
        </div>
      </div>
      <AnimatePresence>
        {isHovered && (
          <motion.div
            className="absolute inset-0 bg-black bg-opacity-80 flex items-center justify-center"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
            transition={{ duration: 0.3 }}
          >
            {link ? (
              <iframe src={link} title={title} className="w-full h-full border-none" />
            ) : (
              <motion.h3
                className="text-4xl font-bold text-white text-center"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
              >
                {title}
              </motion.h3>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

const Projects = ({ darkMode }) => {
  const projectsData = [
    {
      title: "Food Order Sharing App (Shafood)",
      description: "A web application for sharing food orders together.",
      link: "https://freeshafood.vercel.app/",
      githubLink: "https://github.com/sudhanshu786kumar/shafood",
      techStack: [
        { icon: SiNextdotjs, name: "Next.js" },
        { icon: FaReact, name: "React" },
        { icon: SiMongodb, name: "MongoDB" },
        { icon: SiJavascript, name: "REST API" },
      ],
    },
    {
      title: "File Zipper",
      description: "A Node.js application that allows you to zip files through the command shell.",
      githubLink: "https://github.com/sudhanshu786kumar/file-zipper",
      techStack: [
        { icon: FaNodeJs, name: "Node.js" },
      ],
    },
    {
      title: "URL Shortener",
      description: "A Node.js web application that shortens long URLs for easier sharing.",
      githubLink: "https://github.com/sudhanshu786kumar/url-shortener",
      techStack: [
        { icon: FaReact, name: "React" },
        { icon: SiJavascript, name: "REST API" },
      ],
    },
  ];

  return (
    <motion.div
      className={`container mx-auto py-12 px-4 ${darkMode ? 'text-white' : 'text-black'}`}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <h2 className="text-3xl font-bold mb-8 text-center">Projects</h2>
      <motion.div 
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        variants={{
          hidden: { opacity: 0 },
          show: {
            opacity: 1,
            transition: {
              staggerChildren: 0.2
            }
          }
        }}
        initial="hidden"
        animate="show"
      >
        {projectsData.map((project, index) => (
          <motion.div
            key={index}
            variants={{
              hidden: { opacity: 0, y: 50 },
              show: { opacity: 1, y: 0 }
            }}
          >
            <ProjectCard {...project} darkMode={darkMode} />
          </motion.div>
        ))}
      </motion.div>
    </motion.div>
  );
};

export default Projects;