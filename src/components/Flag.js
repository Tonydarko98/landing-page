import React from 'react';
import { motion } from 'framer-motion';

const Flag = ({ src, alt, index, isMobile, side }) => {
  const floatingAnimation = {
    y: [0, -10, 0],
    transition: {
      y: {
        repeat: Infinity,
        duration: 3 + index * 0.5,
        ease: "easeInOut"
      }
    }
  };

  return (
    <motion.div
  className={`flag-container bg-gray-300 rounded-lg flex items-center justify-center shadow-lg ${
    isMobile ? 'w-8 h-8 mx-1' : 'w-12 h-12 z-50'
  }`}
  style={{ position: 'relative', zIndex: 50, pointerEvents: 'all' }} // Forzar pointer-events
  animate={isMobile ? {} : floatingAnimation}
  whileHover={isMobile ? {} : { scale: 1.05, backgroundColor: '#FFDE00' }}
  transition={{ duration: 0.3 }}
>

      <img 
        src={src} 
        alt={alt} 
        className={isMobile ? 'w-6 h-6' : 'w-10 h-10'}
      />
    </motion.div>
  );
};

export default Flag;