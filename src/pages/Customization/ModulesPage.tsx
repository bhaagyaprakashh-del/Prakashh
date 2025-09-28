import React, { useState } from 'react';
import { Search, Filter } from 'lucide-react';
import { 
  LayoutDashboard, 
  Users, 
  CheckSquare, 
  Megaphone, 
  Calendar, 
  UserPlus, 
  Shield, 
  Users2, 
  Building, 
  BarChart3, 
  Settings as SettingsIcon,
  Cog
} from 'lucide-react';
import { useAppConfig } from '../../hooks/useAppConfig';
import { CardGrid } from '../../components/customization/CardGrid';
import { JsonEditor } from '../../components/customization/JsonEditor';
import toast from 'react-hot-toast';

const modules = [
  {
    id: 'dashboard',
    name: 'Dashboard',
    description: 'Main overview with metrics and insights',
    icon: LayoutDashboard,
    category: 'core',
    route: '/dashboard'
  },
  {
    id: 'leads',
    name: 'Leads & Sales',
    description: 'Manage leads, contacts, and sales pipeline',
    icon: Users,
    category: 'sales',
    route: '/leads'
  },
  {
    id: 'tasks',
    name: 'Tasks & Tickets',
    description: 'Task management and support tickets',
    icon: CheckSquare,
    category: 'productivity',
    route: '/tasks'
  },
  {
    id: 'campaigns',
    name: 'Campaigns & Messaging',
    description: 'Marketing campaigns and messaging tools',
    icon: Megaphone,
    category: 'marketing',
    route: '/campaigns'
  },
  {
    id: 'calendar',
    name: 'Calendar',
    description: 'Schedule and event management',
    icon: Calendar,
    category: 'productivity',
    route: '/calendar'
  },
  {
    id: 'subscribers',
    name: 'Subscribers',
    description: 'Subscriber management and engagement',
    icon: UserPlus,
    category: 'marketing',
    route: '/subscribers'
  },
  {
    id: 'agents',
    name: 'Agents',
    description: 'Agent management and permissions',
    icon: Shield,
    category: 'management',
    route: '/agents'
  },
  {
    id: 'chit-groups',
    name: 'Chit Groups',
    description: 'Chit fund group management',
    icon: Users2,
    category: 'finance',
    route: '/chit-groups'
  },
  {
    id: 'employees-hrms',
    name: 'Employees HRMS',
    description: 'Human resource management system',
    icon: Building,
    category: 'hr',
    route: '/employees'
  },
  {
    id: 'reports-hub',
    name: 'Reports Hub',
    description: 'Analytics and reporting dashboard',
    icon: BarChart3,
    category: 'analytics',
    route: '/reports'
  },
  {
    id: 'company-settings',
    name: 'Company Settings',
    description: 'Company configuration and settings',
    icon: SettingsIcon,
    category: 'settings',
    route: '/settings'
  },
  {
    id: 'customization',
    name: 'Customization',
    description: 'App customization and theming',
    icon: Cog,
    category: 'settings',
    route: '/customization'
  }
];

export const ModulesPage: React.FC = () => {
  const { config, updateConfig, exportConfig, importConfig } = useAppConfig();
  const [searchTerm, setSearchTerm] = useState('');
  const [filterEnabled, setFilterEnabled] = useState('all');
  const [showJsonEditor, setShowJsonEditor] = useState(false);

  const modulesWithStatus = modules.map(module => ({
    ...module,
    enabled: config.modules.enabled[module.id] ?? true
  }));

  const handleToggleEnabled = (id: string, enabled: boolean) => {
    updateConfig({
      modules: {
        ...config.modules,
        enabled: {
          ...config.modules.enabled,
          [id]: enabled
        }
      }
    });
    
    const moduleName = modules.find(m => m.id === id)?.name;
    toast.success(`${moduleName} ${enabled ? 'enabled' : 'disabled'}`);
  };

  const handleAction = (action: string, moduleId: string) => {
    const module = modules.find(m => m.id === moduleId);
    
    switch (action) {
      case 'open':
        if (module?.route) {
          window.location.href = module.route;
        }
        break;
      case 'create':
        toast.info(`Create action for ${module?.name}`);
        break;
      case 'edit':
        toast.info(`Edit action for ${module?.name}`);
        break;
      case 'delete':
        if (window.confirm(`Are you sure you want to delete ${module?.name}?`)) {
          toast.success(`${module?.name} deleted`);
        }
        break;
      case 'export':
        const moduleConfig = {
          id: moduleId,
          enabled: config.modules.enabled[moduleId],
          settings: config.modules.settings[moduleId] || {}
        };
        const blob = new Blob([JSON.stringify(moduleConfig, null, 2)], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `${moduleId}-config.json`;
        a.click();
        URL.revokeObjectURL(url);
        toast.success(`${module?.name} configuration exported`);
        break;
      case 'import':
        const input = document.createElement('input');
        input.type = 'file';
        input.accept = '.json';
        input.onchange = (e) => {
          const file = (e.target as HTMLInputElement).files?.[0];
          if (file) {
            const reader = new FileReader();
            reader.onload = (e) => {
              try {
                const content = e.target?.result as string;
                const imported = JSON.parse(content);
                updateConfig({
                  modules: {
                    ...config.modules,
                    enabled: {
                      ...config.modules.enabled,
                      [moduleId]: imported.enabled
                    },
                    settings: {
                      ...config.modules.settings,
                      [moduleId]: imported.settings
                    }
                  }
                });
                toast.success(`${module?.name} configuration imported`);
              } catch (error) {
                toast.error('Failed to import configuration');
              }
            };
            reader.readAsText(file);
          }
        };
        input.click();
        break;
      case 'refresh':
        toast.success(`${module?.name} refreshed`);
        break;
      case 'settings':
        toast.info(`Settings for ${module?.name}`);
        break;
      case 'export-all':
        const allConfig = {
          modules: config.modules,
          timestamp: new Date().toISOString()
        };
        const allBlob = new Blob([JSON.stringify(allConfig, null, 2)], { type: 'application/json' });
        const allUrl = URL.createObjectURL(allBlob);
        const allA = document.createElement('a');
        allA.href = allUrl;
        allA.download = 'all-modules-config.json';
        allA.click();
        URL.revokeObjectURL(allUrl);
        toast.success('All module configurations exported');
        break;
      default:
        toast.info(`${action} action for ${module?.name}`);
    }
  };

  return (
    <div className="flex-1 overflow-y-auto p-4 space-y-6 scrollbar-none">
      {/* Search and Filter */}
      <div className="bg-slate-800/40 backdrop-blur-xl rounded-2xl p-6 border border-yellow-400/30">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0">
          <div>
            <h3 className="text-lg font-semibold text-slate-50">Module Management</h3>
            <p className="text-sm text-slate-400 mt-1">
              Enable, disable, and configure application modules
            </p>
          </div>
          
          <div className="flex space-x-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-400" />
              <input
                type="text"
                placeholder="Search modules..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-2 bg-slate-700/50 border border-yellow-400/30 rounded-lg text-slate-50 placeholder-slate-400 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 backdrop-blur-sm"
              />
            </div>
            
            <div className="relative">
              <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-400" />
              <select
                value={filterEnabled}
                onChange={(e) => setFilterEnabled(e.target.value)}
                className="pl-10 pr-8 py-2 bg-slate-700/50 border border-yellow-400/30 rounded-lg text-slate-50 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 backdrop-blur-sm appearance-none"
              >
                <option value="all">All Modules</option>
                <option value="enabled">Enabled Only</option>
                <option value="disabled">Disabled Only</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Module Cards */}
      <div className="bg-slate-800/40 backdrop-blur-xl rounded-2xl p-6 border border-yellow-400/30">
        <CardGrid
          modules={modulesWithStatus}
          onToggleEnabled={handleToggleEnabled}
          onAction={handleAction}
          searchTerm={searchTerm}
          filterEnabled={filterEnabled}
        />
      </div>

      {/* Configuration */}
      <div className="bg-slate-800/40 backdrop-blur-xl rounded-2xl p-6 border border-yellow-400/30">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold text-slate-50">Module Configuration</h3>
          <button
            onClick={() => setShowJsonEditor(!showJsonEditor)}
            className="text-sm text-blue-400 hover:text-blue-300"
          >
            {showJsonEditor ? 'Hide JSON' : 'Show JSON'}
          </button>
        </div>

        {showJsonEditor && (
          <JsonEditor
            value={JSON.stringify(config.modules, null, 2)}
            onChange={() => {}} // Read-only
            onImport={importConfig}
            onExport={exportConfig}
            label="Module Configuration"
            description="Current module configuration in JSON format"
            readOnly
          />
        )}
      </div>
    </div>
  );
};