import React from 'react';
import { motion } from 'framer-motion';

const SimpleBackground = () => {
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden">
      {/* Animated gradient background */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-br from-soft-lavender via-muted-beige to-cloud-white"
        animate={{
          background: [
            "linear-gradient(135deg, #D9CCEC 0%, #FAF5ED 50%, #F7F9FB 100%)",
            "linear-gradient(135deg, #F7F9FB 0%, #D9CCEC 50%, #FAF5ED 100%)",
            "linear-gradient(135deg, #FAF5ED 0%, #F7F9FB 50%, #D9CCEC 100%)",
            "linear-gradient(135deg, #D9CCEC 0%, #FAF5ED 50%, #F7F9FB 100%)"
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
              background: i % 2 === 0 ? '#8C5BAA' : '#58AEDA',
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
          backgroundImage: `radial-gradient(circle at 25% 25%, #8C5BAA 2px, transparent 2px),
                           radial-gradient(circle at 75% 75%, #58AEDA 2px, transparent 2px)`,
          backgroundSize: '50px 50px',
          backgroundPosition: '0 0, 25px 25px',
        }}
      />
    </div>
  );
};

export default SimpleBackground;
