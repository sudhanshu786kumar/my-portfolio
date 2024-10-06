import React from 'react';
import { motion } from 'framer-motion';

const Loader = () => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-100">
      <motion.div
        className="w-16 h-16 border-t-4 border-blue-500 border-solid rounded-full"
        animate={{ rotate: 360 }}
        transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
      ></motion.div>
    </div>
  );
};

export default Loader;