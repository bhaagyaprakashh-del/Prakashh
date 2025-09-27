import React from 'react';
import { Loader2 } from 'lucide-react';

interface ActionButtonProps {
  children: React.ReactNode;
  action: string;
  id?: string;
  endpoint?: string;
  method?: 'GET' | 'POST' | 'PUT' | 'DELETE';
  target?: string;
  confirm?: string;
  data?: any;
  className?: string;
  disabled?: boolean;
  isLoading?: boolean;
  onClick?: () => void;
  variant?: 'primary' | 'secondary' | 'danger' | 'success';
  size?: 'sm' | 'md' | 'lg';
}

export const ActionButton: React.FC<ActionButtonProps> = ({
  children,
  action,
  id,
  endpoint,
  method = 'POST',
  target,
  confirm,
  data,
  className = '',
  disabled = false,
  isLoading = false,
  onClick,
  variant = 'primary',
  size = 'md'
}) => {
  const getVariantClasses = () => {
    switch (variant) {
      case 'primary':
        return 'bg-blue-600 hover:bg-blue-700 text-white border-transparent';
      case 'secondary':
        return 'bg-slate-700/50 hover:bg-slate-700 text-slate-50 border-yellow-400/30';
      case 'danger':
        return 'bg-red-600 hover:bg-red-700 text-white border-transparent';
      case 'success':
        return 'bg-green-600 hover:bg-green-700 text-white border-transparent';
      default:
        return 'bg-blue-600 hover:bg-blue-700 text-white border-transparent';
    }
  };

  const getSizeClasses = () => {
    switch (size) {
      case 'sm':
        return 'px-3 py-1.5 text-sm';
      case 'md':
        return 'px-4 py-2 text-sm';
      case 'lg':
        return 'px-6 py-3 text-base';
      default:
        return 'px-4 py-2 text-sm';
    }
  };

  const baseClasses = `
    inline-flex items-center justify-center font-medium rounded-lg border
    focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500
    transition-all duration-200 backdrop-blur-sm
    disabled:opacity-50 disabled:cursor-not-allowed
  `;

  const handleClick = () => {
    if (disabled || isLoading) return;
    
    if (onClick) {
      onClick();
    }
  };

  return (
    <button
      type="button"
      className={`${baseClasses} ${getVariantClasses()} ${getSizeClasses()} ${className}`}
      disabled={disabled || isLoading}
      onClick={handleClick}
      data-action={action}
      data-id={id}
      data-endpoint={endpoint}
      data-method={method}
      data-target={target}
      data-confirm={confirm}
      data-data={data ? JSON.stringify(data) : undefined}
    >
      {isLoading ? (
        <>
          <Loader2 className="h-4 w-4 mr-2 animate-spin" />
          Loading...
        </>
      ) : (
        children
      )}
    </button>
  );
};