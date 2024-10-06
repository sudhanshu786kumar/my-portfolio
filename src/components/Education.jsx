import React from 'react';
import { motion } from 'framer-motion';
import { FaGraduationCap, FaReact, FaCloud, FaDatabase } from 'react-icons/fa';

const GlassCard = ({ children, className }) => (
  <motion.div
    className={`bg-white bg-opacity-10 backdrop-filter backdrop-blur-lg rounded-lg p-6 shadow-lg ${className}`}
    whileHover={{ scale: 1.05 }}
    transition={{ type: "spring", stiffness: 300, damping: 10 }}
    style={{
      border: '1px solid rgba(255, 255, 255, 0.18)',
      boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.37)'
    }}
  >
    {children}
  </motion.div>
);

const CertificationCard = ({ title, issuer, icon: Icon }) => (
  <GlassCard className="flex flex-col items-center">
    <motion.div
      className="w-16 h-16 bg-indigo-500 rounded-full flex items-center justify-center mb-4"
      whileHover={{ rotate: 360 }}
      transition={{ duration: 0.5 }}
    >
      <Icon className="text-3xl text-white" />
    </motion.div>
    <h3 className="text-xl font-semibold mb-2 text-center">{title}</h3>
    <p className="text-gray-300 text-center">{issuer}</p>
  </GlassCard>
);

const Education = ({ darkMode }) => {
  return (
    <motion.div
      className={`container mx-auto py-12 px-4 ${darkMode ? 'text-white' : 'text-gray-800'}`}
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
        Education & Certifications
      </motion.h2>

      <div className="flex justify-center mb-12">
        <GlassCard className="max-w-lg w-full">
          <motion.div
            className="flex items-center mb-4"
            initial={{ x: -50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            <FaGraduationCap className="text-4xl text-indigo-500 mr-4" />
            <h3 className="text-2xl font-semibold">Bachelor of Technology</h3>
          </motion.div>
          <motion.p 
            className="text-xl mb-2"
            initial={{ x: -50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            Electrical Engineering
          </motion.p>
          <motion.p 
            className="text-lg mb-2"
            initial={{ x: -50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            Rajiv Gandhi Proudyogiki Vishwavidyalaya (RGPV), Bhopal
          </motion.p>
          <motion.p 
            className="text-md"
            initial={{ x: -50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            Graduated: 2022
          </motion.p>
        </GlassCard>
      </div>

      <motion.h3 
        className="text-3xl font-semibold mb-8 text-center"
        initial={{ y: -30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.7 }}
      >
        Certifications
      </motion.h3>

      <motion.div 
        className="grid grid-cols-1 md:grid-cols-3 gap-8"
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
        <CertificationCard title="ReactJS Developer" issuer="HackerRank" icon={FaReact} />
        <CertificationCard title="Microsoft AZ-900" issuer="Microsoft" icon={FaCloud} />
        <CertificationCard title="Microsoft DP-900" issuer="Microsoft" icon={FaDatabase} />
      </motion.div>
    </motion.div>
  );
};

export default Education;