import React from 'react';
import { motion } from 'framer-motion';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
  glass?: boolean;
}

export const Card: React.FC<CardProps> = ({ 
  children, 
  className = '', 
  hover = true,
  glass = false 
}) => {
  const baseClasses = glass
    ? 'backdrop-blur-md bg-gunmetal/20 border border-fog-gray/20 rounded-xl'
    : 'bg-gunmetal border border-fog-gray/10 rounded-xl';

  return (
    <motion.div
      whileHover={hover ? { y: -5, scale: 1.02 } : undefined}
      transition={{ duration: 0.2 }}
      className={`${baseClasses} p-6 transition-all duration-200 ${className}`}
    >
      {children}
    </motion.div>
  );
};