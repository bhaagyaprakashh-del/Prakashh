import React, { useState } from 'react';
import { Palette, Eye, RotateCcw } from 'lucide-react';
import { getContrastRatio, isValidHexColor } from '../../lib/appConfig';

interface ColorPickerProps {
  label: string;
  value: string;
  onChange: (color: string) => void;
  description?: string;
  showContrast?: boolean;
  contrastWith?: string;
}

export const ColorPicker: React.FC<ColorPickerProps> = ({
  label,
  value,
  onChange,
  description,
  showContrast = false,
  contrastWith = '#ffffff'
}) => {
  const [inputValue, setInputValue] = useState(value);
  const [isValid, setIsValid] = useState(true);

  const handleInputChange = (newValue: string) => {
    setInputValue(newValue);
    const valid = isValidHexColor(newValue);
    setIsValid(valid);
    
    if (valid) {
      onChange(newValue);
    }
  };

  const handleColorPickerChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setInputValue(newValue);
    setIsValid(true);
    onChange(newValue);
  };

  const contrastRatio = showContrast ? getContrastRatio(value, contrastWith) : 0;
  const contrastLevel = contrastRatio >= 7 ? 'AAA' : contrastRatio >= 4.5 ? 'AA' : 'Fail';

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <label className="block text-sm font-medium text-slate-50">{label}</label>
        {showContrast && (
          <div className="flex items-center space-x-2">
            <Eye className="h-4 w-4 text-slate-400" />
            <span className={`text-xs font-medium ${
              contrastLevel === 'AAA' ? 'text-green-400' :
              contrastLevel === 'AA' ? 'text-yellow-400' : 'text-red-400'
            }`}>
              {contrastRatio.toFixed(1)}:1 ({contrastLevel})
            </span>
          </div>
        )}
      </div>
      
      {description && (
        <p className="text-xs text-slate-400">{description}</p>
      )}
      
      <div className="flex items-center space-x-3">
        <div className="relative">
          <input
            type="color"
            value={value}
            onChange={handleColorPickerChange}
            className="w-12 h-10 rounded-lg border border-yellow-400/30 cursor-pointer bg-transparent"
            title={`Pick ${label.toLowerCase()}`}
          />
          <div 
            className="absolute inset-1 rounded-md pointer-events-none"
            style={{ backgroundColor: value }}
          />
        </div>
        
        <input
          type="text"
          value={inputValue}
          onChange={(e) => handleInputChange(e.target.value)}
          className={`flex-1 px-3 py-2 bg-slate-700/50 border rounded-lg text-slate-50 placeholder-slate-400 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 backdrop-blur-sm ${
            isValid ? 'border-yellow-400/30' : 'border-red-500'
          }`}
          placeholder="#000000"
        />
        
        <button
          onClick={() => handleInputChange(value)}
          className="p-2 text-slate-400 hover:text-slate-50 hover:bg-slate-700/50 rounded-lg transition-all"
          title="Reset to current value"
        >
          <RotateCcw className="h-4 w-4" />
        </button>
      </div>
      
      {!isValid && (
        <p className="text-xs text-red-400">Please enter a valid hex color (e.g., #3b82f6)</p>
      )}
      
      {showContrast && contrastLevel === 'Fail' && (
        <p className="text-xs text-red-400">
          Low contrast ratio. Consider using a different color for better accessibility.
        </p>
      )}
    </div>
  );
};