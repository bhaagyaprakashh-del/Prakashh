import React from 'react';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import { Palette, List, Settings, CreditCard as Edit, Table, RotateCcw, Download, Upload, Save } from 'lucide-react';
import { useAppConfig } from '../../hooks/useAppConfig';
import toast from 'react-hot-toast';

const tabs = [
  { id: 'theme', name: 'Theme', icon: Palette, path: '/custom-theme' },
  { id: 'sidebar', name: 'Sidebar', icon: List, path: '/custom-sidebar' },
  { id: 'modules', name: 'Modules', icon: Settings, path: '/custom-modules' },
  { id: 'forms', name: 'Forms', icon: Edit, path: '/custom-forms' },
  { id: 'tables', name: 'Tables', icon: Table, path: '/custom-tables' }
];

export const CustomizationLayout: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { resetToDefaults, exportConfig, importConfig, undo, redo, canUndo, canRedo } = useAppConfig();

  const currentTab = tabs.find(tab => location.pathname === tab.path)?.id || 'theme';

  const handleTabClick = (path: string) => {
    navigate(path);
  };

  const handleReset = () => {
    if (window.confirm('Are you sure you want to reset all customization settings to defaults? This action cannot be undone.')) {
      resetToDefaults();
      toast.success('Settings reset to defaults');
    }
  };

  const handleExport = () => {
    const config = exportConfig();
    const blob = new Blob([config], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `app-config-${new Date().toISOString().split('T')[0]}.json`;
    a.click();
    URL.revokeObjectURL(url);
    toast.success('Configuration exported');
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
          const success = importConfig(content);
          if (success) {
            toast.success('Configuration imported successfully');
          } else {
            toast.error('Failed to import configuration');
          }
        };
        reader.readAsText(file);
      }
    };
    input.click();
  };

  const handleUndo = () => {
    const success = undo();
    if (success) {
      toast.success('Changes undone');
    }
  };

  const handleRedo = () => {
    const success = redo();
    if (success) {
      toast.success('Changes redone');
    }
  };

  return (
    <div className="h-full flex flex-col bg-slate-900 overflow-hidden">
      {/* Header */}
      <div className="flex justify-between items-center p-4 border-b border-yellow-400/30 flex-shrink-0">
        <div>
          <h1 className="text-2xl font-bold text-slate-50">Customization</h1>
          <p className="mt-1 text-sm text-slate-400">
            Configure app appearance, layout, and behavior
          </p>
        </div>
        <div className="flex space-x-3">
          <div className="flex space-x-1">
            <button
              onClick={handleUndo}
              disabled={!canUndo}
              className="p-2 text-slate-400 hover:text-slate-50 hover:bg-slate-700/50 rounded-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              title="Undo (Ctrl+Z)"
            >
              <RotateCcw className="h-4 w-4" />
            </button>
            <button
              onClick={handleRedo}
              disabled={!canRedo}
              className="p-2 text-slate-400 hover:text-slate-50 hover:bg-slate-700/50 rounded-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              title="Redo (Ctrl+Y)"
            >
              <RotateCcw className="h-4 w-4 scale-x-[-1]" />
            </button>
          </div>
          <button
            onClick={handleImport}
            className="inline-flex items-center px-4 py-2 border border-yellow-400/30 text-sm font-medium rounded-lg text-slate-50 bg-slate-700/50 hover:bg-slate-700 transition-all backdrop-blur-sm"
          >
            <Upload className="h-4 w-4 mr-2" />
            Import
          </button>
          <button
            onClick={handleExport}
            className="inline-flex items-center px-4 py-2 border border-yellow-400/30 text-sm font-medium rounded-lg text-slate-50 bg-slate-700/50 hover:bg-slate-700 transition-all backdrop-blur-sm"
          >
            <Download className="h-4 w-4 mr-2" />
            Export
          </button>
          <button
            onClick={handleReset}
            className="inline-flex items-center px-4 py-2 border border-red-500/30 text-sm font-medium rounded-lg text-red-400 bg-red-500/10 hover:bg-red-500/20 transition-all"
          >
            <RotateCcw className="h-4 w-4 mr-2" />
            Reset All
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="border-b border-yellow-400/30 bg-slate-800/40 backdrop-blur-xl flex-shrink-0">
        <nav className="flex space-x-4 px-4 overflow-x-auto" aria-label="Tabs">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = currentTab === tab.id;
            
            return (
              <button
                key={tab.id}
                onClick={() => handleTabClick(tab.path)}
                className={`${
                  isActive
                    ? 'border-blue-500 text-blue-400'
                    : 'border-transparent text-slate-400 hover:text-slate-300 hover:border-slate-300'
                } whitespace-nowrap py-3 px-2 border-b-2 font-medium text-sm flex items-center transition-all`}
              >
                <Icon className="h-4 w-4 mr-2" />
                {tab.name}
              </button>
            );
          })}
        </nav>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-hidden">
        <Outlet />
      </div>
    </div>
  );
};