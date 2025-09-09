import React from 'react';
import { motion } from 'framer-motion';

const SimpleBackground = () => {
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden">
      {/* Animated gradient background */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-br from-soft-lavender via-chat-bg to-cloud-white"
        animate={{
          background: [
            "linear-gradient(135deg, #E0E7FF 0%, #F1F5F9 50%, #FFFFFF 100%)",
            "linear-gradient(135deg, #FFFFFF 0%, #E0E7FF 50%, #F1F5F9 100%)",
            "linear-gradient(135deg, #F1F5F9 0%, #FFFFFF 50%, #E0E7FF 100%)",
            "linear-gradient(135deg, #E0E7FF 0%, #F1F5F9 50%, #FFFFFF 100%)"
          ]
        }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
      />
      
      {/* Floating shapes */}
      <div className="absolute inset-0">
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-32 h-32 rounded-full opacity-10"
            style={{
              background: i % 2 === 0 ? '#6366F1' : '#3B82F6',
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -30, 0],
              x: [0, 20, 0],
              scale: [1, 1.1, 1],
            }}
            transition={{
              duration: 8 + i * 2,
              repeat: Infinity,
              ease: "easeInOut",
              delay: i * 0.5,
            }}
          />
        ))}
      </div>
      
      {/* Subtle pattern overlay */}
      <div 
        className="absolute inset-0 opacity-5"
        style={{
          backgroundImage: `radial-gradient(circle at 25% 25%, #6366F1 2px, transparent 2px),
                           radial-gradient(circle at 75% 75%, #3B82F6 2px, transparent 2px)`,
          backgroundSize: '50px 50px',
          backgroundPosition: '0 0, 25px 25px',
        }}
      />
    </div>
  );
};

export default SimpleBackground;
