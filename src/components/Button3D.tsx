import React from 'react';
import { motion } from 'motion/react';

interface Button3DProps {
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
  variant?: 'emerald' | 'purple' | 'blue' | 'slate';
  size?: 'sm' | 'md' | 'lg';
  fullWidth?: boolean;
}

export const Button3D: React.FC<Button3DProps> = ({
  children,
  onClick,
  className = '',
  variant = 'emerald',
  size = 'md',
  fullWidth = false,
}) => {
  const playClickSound = () => {
    const audio = new Audio('https://www.soundjay.com/buttons/sounds/button-16.mp3');
    audio.play().catch(e => console.log('Audio play blocked:', e));
  };

  const handleClick = () => {
    playClickSound();
    if (onClick) onClick();
  };

  const variants = {
    emerald: {
      bg: 'bg-emerald-600 hover:bg-emerald-500',
      shadow: 'shadow-[0_6px_0_0_rgba(5,150,105,1)]',
      activeShadow: 'active:shadow-none',
      activeTranslate: 'active:translate-y-[6px]',
    },
    purple: {
      bg: 'bg-purple-600 hover:bg-purple-500',
      shadow: 'shadow-[0_6px_0_0_rgba(124,58,237,1)]',
      activeShadow: 'active:shadow-none',
      activeTranslate: 'active:translate-y-[6px]',
    },
    blue: {
      bg: 'bg-blue-600 hover:bg-blue-500',
      shadow: 'shadow-[0_6px_0_0_rgba(37,99,235,1)]',
      activeShadow: 'active:shadow-none',
      activeTranslate: 'active:translate-y-[6px]',
    },
    slate: {
      bg: 'bg-slate-700 hover:bg-slate-600',
      shadow: 'shadow-[0_6px_0_0_rgba(51,65,85,1)]',
      activeShadow: 'active:shadow-none',
      activeTranslate: 'active:translate-y-[6px]',
    },
  };

  const sizes = {
    sm: 'px-4 py-2 text-sm rounded-xl',
    md: 'px-6 py-3 text-base rounded-2xl',
    lg: 'px-10 py-4 text-lg rounded-2xl',
  };

  const currentVariant = variants[variant];
  const currentSize = sizes[size];

  return (
    <motion.button
      whileTap={{ scale: 0.98 }}
      onClick={handleClick}
      className={`
        ${currentVariant.bg} 
        ${currentVariant.shadow} 
        ${currentVariant.activeShadow} 
        ${currentVariant.activeTranslate}
        ${currentSize}
        ${fullWidth ? 'w-full' : ''}
        text-white font-bold transition-all flex items-center justify-center gap-2
        ${className}
      `}
    >
      {children}
    </motion.button>
  );
};
