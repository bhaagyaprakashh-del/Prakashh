import React from 'react';
import { MoreVertical, Power, PowerOff, Settings, ExternalLink, Plus, Edit, Trash2, Download, Upload, RefreshCw } from 'lucide-react';

interface ModuleCard {
  id: string;
  name: string;
  description: string;
  icon: React.ComponentType<any>;
  enabled: boolean;
  route?: string;
  category: string;
}

interface CardGridProps {
  modules: ModuleCard[];
  onToggleEnabled: (id: string, enabled: boolean) => void;
  onAction: (action: string, moduleId: string) => void;
  searchTerm: string;
  filterEnabled: string;
}

export const CardGrid: React.FC<CardGridProps> = ({
  modules,
  onToggleEnabled,
  onAction,
  searchTerm,
  filterEnabled
}) => {
  const filteredModules = modules.filter(module => {
    const matchesSearch = module.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         module.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterEnabled === 'all' || 
                         (filterEnabled === 'enabled' && module.enabled) ||
                         (filterEnabled === 'disabled' && !module.enabled);
    
    return matchesSearch && matchesFilter;
  });

  const handleBulkAction = (action: 'enable-all' | 'disable-all') => {
    filteredModules.forEach(module => {
      if (action === 'enable-all' && !module.enabled) {
        onToggleEnabled(module.id, true);
      } else if (action === 'disable-all' && module.enabled) {
        onToggleEnabled(module.id, false);
      }
    });
  };

  return (
    <div className="space-y-6">
      {/* Bulk Actions */}
      <div className="flex items-center justify-between">
        <div className="flex space-x-2">
          <button
            onClick={() => handleBulkAction('enable-all')}
            className="inline-flex items-center px-3 py-1 text-xs font-medium text-green-400 bg-green-500/10 border border-green-500/30 rounded-lg hover:bg-green-500/20 transition-all"
          >
            <Power className="h-3 w-3 mr-1" />
            Enable All
          </button>
          <button
            onClick={() => handleBulkAction('disable-all')}
            className="inline-flex items-center px-3 py-1 text-xs font-medium text-red-400 bg-red-500/10 border border-red-500/30 rounded-lg hover:bg-red-500/20 transition-all"
          >
            <PowerOff className="h-3 w-3 mr-1" />
            Disable All
          </button>
          <button
            onClick={() => onAction('export-all', '')}
            className="inline-flex items-center px-3 py-1 text-xs font-medium text-blue-400 bg-blue-500/10 border border-blue-500/30 rounded-lg hover:bg-blue-500/20 transition-all"
          >
            <Download className="h-3 w-3 mr-1" />
            Export All
          </button>
        </div>
        <div className="text-sm text-slate-400">
          Showing: <span className="font-semibold text-slate-50">{filteredModules.length}</span> modules
        </div>
      </div>

      {/* Module Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredModules.map((module) => {
          const Icon = module.icon;
          
          return (
            <div
              key={module.id}
              className={`bg-slate-800/40 backdrop-blur-xl rounded-2xl p-6 border transition-all ${
                module.enabled 
                  ? 'border-yellow-400/50 shadow-lg' 
                  : 'border-yellow-400/20 opacity-60'
              }`}
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <div className={`p-3 rounded-xl border border-yellow-400/30 ${
                    module.enabled ? 'bg-blue-500/20' : 'bg-slate-700/30'
                  }`}>
                    <Icon className={`h-6 w-6 ${module.enabled ? 'text-blue-400' : 'text-slate-500'}`} />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-slate-50">{module.name}</h3>
                    <p className="text-xs text-slate-500 capitalize">{module.category}</p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-2">
                  {/* Enable/Disable Toggle */}
                  <button
                    onClick={() => onToggleEnabled(module.id, !module.enabled)}
                    className={`p-2 rounded-lg transition-all ${
                      module.enabled
                        ? 'text-green-400 hover:bg-green-500/10'
                        : 'text-slate-500 hover:bg-slate-700/50'
                    }`}
                    title={module.enabled ? 'Disable module' : 'Enable module'}
                  >
                    {module.enabled ? <Power className="h-4 w-4" /> : <PowerOff className="h-4 w-4" />}
                  </button>
                  
                  {/* More Actions */}
                  <div className="relative group">
                    <button className="p-2 text-slate-400 hover:text-slate-50 hover:bg-slate-700/50 rounded-lg transition-all">
                      <MoreVertical className="h-4 w-4" />
                    </button>
                    
                    {/* Dropdown Menu */}
                    <div className="absolute right-0 top-full mt-1 w-48 bg-slate-800/90 backdrop-blur-xl border border-yellow-400/40 rounded-xl shadow-2xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all z-50">
                      <div className="p-2">
                        {module.route && (
                          <button
                            onClick={() => onAction('open', module.id)}
                            className="w-full flex items-center space-x-2 p-2 text-slate-300 hover:text-slate-50 hover:bg-slate-700/50 rounded-lg transition-all"
                          >
                            <ExternalLink className="h-4 w-4" />
                            <span>Open</span>
                          </button>
                        )}
                        <button
                          onClick={() => onAction('settings', module.id)}
                          className="w-full flex items-center space-x-2 p-2 text-slate-300 hover:text-slate-50 hover:bg-slate-700/50 rounded-lg transition-all"
                        >
                          <Settings className="h-4 w-4" />
                          <span>Settings</span>
                        </button>
                        <button
                          onClick={() => onAction('export', module.id)}
                          className="w-full flex items-center space-x-2 p-2 text-slate-300 hover:text-slate-50 hover:bg-slate-700/50 rounded-lg transition-all"
                        >
                          <Download className="h-4 w-4" />
                          <span>Export</span>
                        </button>
                        <button
                          onClick={() => onAction('import', module.id)}
                          className="w-full flex items-center space-x-2 p-2 text-slate-300 hover:text-slate-50 hover:bg-slate-700/50 rounded-lg transition-all"
                        >
                          <Upload className="h-4 w-4" />
                          <span>Import</span>
                        </button>
                        <button
                          onClick={() => onAction('refresh', module.id)}
                          className="w-full flex items-center space-x-2 p-2 text-slate-300 hover:text-slate-50 hover:bg-slate-700/50 rounded-lg transition-all"
                        >
                          <RefreshCw className="h-4 w-4" />
                          <span>Refresh</span>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <p className="text-sm text-slate-300 mb-4">{module.description}</p>

              {/* Action Buttons */}
              <div className="flex flex-wrap gap-2">
                {module.route && (
                  <button
                    onClick={() => onAction('open', module.id)}
                    className="inline-flex items-center px-3 py-1 text-xs font-medium text-blue-400 bg-blue-500/10 border border-blue-500/30 rounded-lg hover:bg-blue-500/20 transition-all"
                  >
                    <ExternalLink className="h-3 w-3 mr-1" />
                    Open
                  </button>
                )}
                <button
                  onClick={() => onAction('create', module.id)}
                  className="inline-flex items-center px-3 py-1 text-xs font-medium text-green-400 bg-green-500/10 border border-green-500/30 rounded-lg hover:bg-green-500/20 transition-all"
                >
                  <Plus className="h-3 w-3 mr-1" />
                  Create
                </button>
                <button
                  onClick={() => onAction('edit', module.id)}
                  className="inline-flex items-center px-3 py-1 text-xs font-medium text-orange-400 bg-orange-500/10 border border-orange-500/30 rounded-lg hover:bg-orange-500/20 transition-all"
                >
                  <Edit className="h-3 w-3 mr-1" />
                  Edit
                </button>
                <button
                  onClick={() => onAction('settings', module.id)}
                  className="inline-flex items-center px-3 py-1 text-xs font-medium text-purple-400 bg-purple-500/10 border border-purple-500/30 rounded-lg hover:bg-purple-500/20 transition-all"
                >
                  <Settings className="h-3 w-3 mr-1" />
                  Settings
                </button>
              </div>

              {/* Status Indicator */}
              <div className="mt-4 pt-4 border-t border-yellow-400/20">
                <div className="flex items-center justify-between">
                  <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                    module.enabled
                      ? 'bg-green-100 text-green-800 border border-green-200'
                      : 'bg-gray-100 text-gray-800 border border-gray-200'
                  }`}>
                    {module.enabled ? 'Enabled' : 'Disabled'}
                  </span>
                  
                  {/* Drag Handle */}
                  <div className="p-1 text-slate-400 hover:text-slate-300 cursor-grab active:cursor-grabbing">
                    <GripVertical className="h-4 w-4" />
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {filteredModules.length === 0 && (
        <div className="text-center py-12">
          <Settings className="h-12 w-12 mx-auto text-slate-500 mb-4" />
          <h3 className="text-lg font-medium text-slate-50 mb-2">No modules found</h3>
          <p className="text-sm text-slate-400">Try adjusting your search criteria.</p>
        </div>
      )}
    </div>
  );
};