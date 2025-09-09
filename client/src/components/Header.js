import React from 'react';
import { motion } from 'framer-motion';
import { Bot, Code, TestTube } from 'lucide-react';

const Header = () => {
  return (
    <motion.header
      initial={{ opacity: 0, y: -50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      className="text-center py-8"
    >
      <div className="flex items-center justify-center gap-4 mb-4">
        <motion.div
          animate={{ rotate: [0, 10, -10, 0] }}
          transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
        >
          <Bot className="w-12 h-12 text-sarya-purple" />
        </motion.div>
        <motion.h1
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="text-4xl md:text-5xl font-bold gradient-text"
        >
          Saurabh's AI Assistant
        </motion.h1>
        <motion.div
          animate={{ rotate: [0, -10, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
        >
          <TestTube className="w-12 h-12 text-sky-blue" />
        </motion.div>
      </div>
      
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 0.6 }}
        className="flex items-center justify-center gap-6 text-deep-brown"
      >
        <div className="flex items-center gap-2">
          <Code className="w-5 h-5 text-grass-green" />
          <span className="font-medium">QA Engineer</span>
        </div>
        <div className="w-2 h-2 bg-sarya-purple rounded-full"></div>
        <div className="flex items-center gap-2">
          <TestTube className="w-5 h-5 text-sunshine-yellow" />
          <span className="font-medium">Testing Expert</span>
        </div>
        <div className="w-2 h-2 bg-sarya-purple rounded-full"></div>
        <div className="flex items-center gap-2">
          <Bot className="w-5 h-5 text-friendly-red" />
          <span className="font-medium">AI-Powered</span>
        </div>
      </motion.div>
      
      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.7, duration: 0.6 }}
        className="text-lg text-deep-brown mt-4 max-w-2xl mx-auto"
      >
        Ask me anything about my testing experience, QA methodologies, or technical skills. 
        I'm here to showcase my expertise as a Quality Assurance Engineer!
      </motion.p>
    </motion.header>
  );
};

export default Header;
