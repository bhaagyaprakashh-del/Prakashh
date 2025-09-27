import React from 'react';

interface ActionCardProps {
  children: React.ReactNode;
  action?: string;
  id?: string;
  endpoint?: string;
  target?: string;
  className?: string;
  onClick?: () => void;
  hoverable?: boolean;
}

export const ActionCard: React.FC<ActionCardProps> = ({
  children,
  action,
  id,
  endpoint,
  target,
  className = '',
  onClick,
  hoverable = true
}) => {
  const baseClasses = `
    bg-slate-800/40 backdrop-blur-xl rounded-2xl border border-yellow-400/30
    transition-all duration-200
    ${hoverable ? 'hover:border-yellow-400/50 cursor-pointer' : ''}
    ${action ? 'focus:outline-none focus:ring-2 focus:ring-blue-500' : ''}
  `;

  const handleClick = () => {
    if (onClick) {
      onClick();
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (action && (e.key === 'Enter' || e.key === ' ')) {
      e.preventDefault();
      handleClick();
    }
  };

  return (
    <div
      className={`${baseClasses} ${className}`}
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      data-action={action}
      data-id={id}
      data-endpoint={endpoint}
      data-target={target}
      role={action ? 'button' : undefined}
      tabIndex={action ? 0 : undefined}
    >
      {children}
    </div>
  );
};