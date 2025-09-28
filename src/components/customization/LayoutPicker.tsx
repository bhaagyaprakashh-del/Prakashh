import React from 'react';
import { Monitor, Smartphone, Tablet } from 'lucide-react';

interface LayoutOption {
  id: string;
  name: string;
  description: string;
  icon: React.ComponentType<any>;
  preview: string;
}

interface LayoutPickerProps {
  label: string;
  value: string;
  options: LayoutOption[];
  onChange: (value: string) => void;
  description?: string;
}

export const LayoutPicker: React.FC<LayoutPickerProps> = ({
  label,
  value,
  options,
  onChange,
  description
}) => {
  return (
    <div className="space-y-3">
      <label className="block text-sm font-medium text-slate-50">{label}</label>
      {description && (
        <p className="text-xs text-slate-400">{description}</p>
      )}
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
        {options.map((option) => {
          const Icon = option.icon;
          const isSelected = value === option.id;
          
          return (
            <button
              key={option.id}
              onClick={() => onChange(option.id)}
              className={`p-4 rounded-xl border-2 transition-all text-left ${
                isSelected
                  ? 'border-blue-500 bg-blue-500/10'
                  : 'border-yellow-400/30 hover:border-yellow-400/50 bg-slate-700/30'
              }`}
            >
              <div className="flex items-center space-x-3 mb-2">
                <Icon className={`h-5 w-5 ${isSelected ? 'text-blue-400' : 'text-slate-400'}`} />
                <span className={`font-medium ${isSelected ? 'text-blue-400' : 'text-slate-50'}`}>
                  {option.name}
                </span>
              </div>
              <p className="text-xs text-slate-400">{option.description}</p>
              
              {/* Preview */}
              <div className="mt-3 p-2 bg-slate-800/50 rounded border border-yellow-400/20">
                <div 
                  className="w-full h-8 rounded text-xs flex items-center justify-center text-slate-300"
                  style={{ 
                    background: `linear-gradient(45deg, ${isSelected ? '#3b82f6' : '#64748b'} 0%, ${isSelected ? '#1e40af' : '#475569'} 100%)`
                  }}
                >
                  {option.preview}
                </div>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
};