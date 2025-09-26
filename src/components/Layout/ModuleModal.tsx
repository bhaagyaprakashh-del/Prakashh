import React from 'react';
import { X, ChevronRight } from 'lucide-react';
import { NavigationItem } from '../../config/navigation';

interface ModuleModalProps {
  module: NavigationItem;
  onClose: () => void;
  onNavigate: (page: string) => void;
}

export const ModuleModal: React.FC<ModuleModalProps> = ({ module, onClose, onNavigate }) => {
  const handleNavigate = (pageId: string) => {
    onNavigate(pageId);
    onClose();
  };

  const Icon = module.icon;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      />
      
      {/* Modal */}
      <div className="relative bg-slate-800/90 backdrop-blur-xl border border-yellow-400/30 rounded-2xl shadow-2xl max-w-2xl w-full mx-4 max-h-[80vh] overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-yellow-400/30">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-slate-700/50 rounded-lg border border-yellow-400/20">
              <Icon className="h-6 w-6 text-blue-500" />
            </div>
            <div>
              <h2 className="text-xl font-semibold text-slate-50">{module.name}</h2>
              <p className="text-slate-300 text-sm">Select a page to navigate</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-slate-300 hover:text-slate-50 hover:bg-slate-700/50 rounded-lg transition-all border border-yellow-400/20 hover:border-yellow-400/40"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-3 max-h-96 overflow-y-auto">
          {module.children?.map((child) => {
            const ChildIcon = child.icon;
            return (
              <button
                key={child.id}
                onClick={() => handleNavigate(child.id)}
                className="w-full flex items-center justify-between p-4 bg-slate-700/30 hover:bg-slate-700/50 border border-yellow-400/20 hover:border-yellow-400/40 rounded-xl transition-all group backdrop-blur-sm"
              >
                <div className="flex items-center space-x-3">
                  <div className="p-2 bg-slate-600/50 rounded-lg group-hover:bg-slate-600/70 transition-all border border-yellow-400/20">
                    <ChildIcon className="h-5 w-5 text-slate-300 group-hover:text-slate-50" />
                  </div>
                  <div className="text-left">
                    <h3 className="text-slate-50 font-medium">{child.name}</h3>
                    <p className="text-slate-300 text-sm">Navigate to {child.name.toLowerCase()}</p>
                  </div>
                </div>
                <ChevronRight className="h-5 w-5 text-slate-500 group-hover:text-slate-300 transition-all" />
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}