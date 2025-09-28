import React, { useState } from 'react';
import { Download, Upload, Copy, Check, AlertTriangle } from 'lucide-react';

interface JsonEditorProps {
  value: string;
  onChange: (value: string) => void;
  onImport: (json: string) => boolean;
  onExport: () => string;
  label: string;
  description?: string;
  readOnly?: boolean;
}

export const JsonEditor: React.FC<JsonEditorProps> = ({
  value,
  onChange,
  onImport,
  onExport,
  label,
  description,
  readOnly = false
}) => {
  const [copied, setCopied] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleChange = (newValue: string) => {
    setError(null);
    onChange(newValue);
    
    // Validate JSON
    try {
      JSON.parse(newValue);
    } catch (err) {
      setError('Invalid JSON format');
    }
  };

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(value);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  const handleExport = () => {
    const exportData = onExport();
    const blob = new Blob([exportData], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${label.toLowerCase().replace(/\s+/g, '-')}-config.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleImport = () => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = '.json';
    input.onchange = (e) => {
      const file = (e.target as HTMLInputElement).files?.[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = (e) => {
          const content = e.target?.result as string;
          const success = onImport(content);
          if (!success) {
            setError('Failed to import configuration');
          }
        };
        reader.readAsText(file);
      }
    };
    input.click();
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <label className="block text-sm font-medium text-slate-50">{label}</label>
          {description && (
            <p className="text-xs text-slate-400 mt-1">{description}</p>
          )}
        </div>
        
        <div className="flex space-x-2">
          <button
            onClick={handleCopy}
            className="inline-flex items-center px-3 py-1 text-xs font-medium text-slate-400 bg-slate-700/50 border border-yellow-400/30 rounded-lg hover:bg-slate-700 transition-all"
          >
            {copied ? <Check className="h-3 w-3 mr-1" /> : <Copy className="h-3 w-3 mr-1" />}
            {copied ? 'Copied!' : 'Copy'}
          </button>
          <button
            onClick={handleExport}
            className="inline-flex items-center px-3 py-1 text-xs font-medium text-blue-400 bg-blue-500/10 border border-blue-500/30 rounded-lg hover:bg-blue-500/20 transition-all"
          >
            <Download className="h-3 w-3 mr-1" />
            Export
          </button>
          {!readOnly && (
            <button
              onClick={handleImport}
              className="inline-flex items-center px-3 py-1 text-xs font-medium text-green-400 bg-green-500/10 border border-green-500/30 rounded-lg hover:bg-green-500/20 transition-all"
            >
              <Upload className="h-3 w-3 mr-1" />
              Import
            </button>
          )}
        </div>
      </div>

      <div className="relative">
        <textarea
          value={value}
          onChange={(e) => handleChange(e.target.value)}
          readOnly={readOnly}
          className={`w-full h-96 px-4 py-3 bg-slate-900/50 border rounded-xl text-slate-50 font-mono text-sm resize-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 backdrop-blur-sm ${
            error ? 'border-red-500' : 'border-yellow-400/30'
          }`}
          placeholder="JSON configuration will appear here..."
        />
        
        {error && (
          <div className="absolute bottom-3 left-3 flex items-center space-x-2 px-3 py-1 bg-red-500/20 border border-red-500/40 rounded-lg">
            <AlertTriangle className="h-4 w-4 text-red-400" />
            <span className="text-xs text-red-400">{error}</span>
          </div>
        )}
      </div>
    </div>
  );
};