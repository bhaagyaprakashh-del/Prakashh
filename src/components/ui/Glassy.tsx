import React from 'react';

interface GlassyColumnProps {
  children: React.ReactNode;
  className?: string;
}

export const GlassyColumn: React.FC<GlassyColumnProps> = ({ children, className = '' }) => {
  return (
    <div className={`
      bg-white/6 backdrop-blur-xl border border-white/10 rounded-2xl 
      shadow-[0_8px_30px_rgba(0,0,0,0.12)]
      bg-gradient-to-b from-white/8 to-white/4
      ${className}
    `}>
      {children}
    </div>
  );
};

interface GlassyCardProps {
  children: React.ReactNode;
  className?: string;
  isDragging?: boolean;
  isOver?: boolean;
}

export const GlassyCard: React.FC<GlassyCardProps> = ({ 
  children, 
  className = '', 
  isDragging = false,
  isOver = false 
}) => {
  return (
    <div className={`
      bg-white/8 backdrop-blur-xl border border-white/10 rounded-xl p-3 
      transition-all duration-200 shadow-sm
      ${isDragging ? 'bg-white/16 scale-105 shadow-lg' : 'hover:bg-white/12 hover:-translate-y-0.5'}
      ${isOver ? 'bg-white/16' : ''}
      ${className}
    `}>
      {children}
    </div>
  );
};

interface GlassyContainerProps {
  children: React.ReactNode;
  className?: string;
}

export const GlassyContainer: React.FC<GlassyContainerProps> = ({ children, className = '' }) => {
  return (
    <div className={`
      bg-white/4 backdrop-blur-xl border border-white/8 rounded-2xl 
      shadow-[0_8px_30px_rgba(0,0,0,0.08)]
      ${className}
    `}>
      {children}
    </div>
  );
};