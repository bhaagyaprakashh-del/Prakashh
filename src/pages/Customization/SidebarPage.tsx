import React from 'react';
import { LayoutDashboard, Users, CheckSquare, Megaphone, Calendar, UserPlus, Shield, Users as Users2, Building, BarChart3, Settings as SettingsIcon, Cog } from 'lucide-react';
import { useAppConfig } from '../../hooks/useAppConfig';
import { DndList } from '../../components/customization/DndList';
import { JsonEditor } from '../../components/customization/JsonEditor';
import toast from 'react-hot-toast';

const sidebarItems = [
  { id: 'dashboard', name: 'Dashboard', icon: LayoutDashboard },
  { id: 'leads', name: 'Leads & Sales', icon: Users },
  { id: 'tasks', name: 'Tasks & Tickets', icon: CheckSquare },
  { id: 'campaigns', name: 'Campaigns & Messaging', icon: Megaphone },
  { id: 'calendar', name: 'Calendar', icon: Calendar },
  { id: 'subscribers', name: 'Subscribers', icon: UserPlus },
  { id: 'agents', name: 'Agents', icon: Shield },
  { id: 'chit-groups', name: 'Chit Groups', icon: Users2 },
  { id: 'employees-hrms', name: 'Employees HRMS', icon: Building },
  { id: 'reports-hub', name: 'Reports Hub', icon: BarChart3 },
  { id: 'company-settings', name: 'Company Settings', icon: SettingsIcon },
  { id: 'customization', name: 'Customization', icon: Cog }
];

export const SidebarPage: React.FC = () => {
  const { config, updateConfig, exportConfig, importConfig } = useAppConfig();

  const orderedItems = config.sidebar.order.map(id => {
    const item = sidebarItems.find(item => item.id === id);
    return item ? {
      ...item,
      visible: config.sidebar.visibility[id] ?? true
    } : null;
  }).filter(Boolean) as Array<{
    id: string;
    name: string;
    icon: React.ComponentType<any>;
    visible: boolean;
  }>;

  const handleReorder = (newOrder: string[]) => {
    updateConfig({
      sidebar: {
        ...config.sidebar,
        order: newOrder
      }
    });
    toast.success('Sidebar order updated');
  };

  const handleToggleVisibility = (id: string, visible: boolean) => {
    updateConfig({
      sidebar: {
        ...config.sidebar,
        visibility: {
          ...config.sidebar.visibility,
          [id]: visible
        }
      }
    });
    toast.success(`${sidebarItems.find(item => item.id === id)?.name} ${visible ? 'shown' : 'hidden'}`);
  };

  const handleReset = () => {
    if (window.confirm('Reset sidebar to default order and visibility?')) {
      updateConfig({
        sidebar: {
          order: [
            'dashboard',
            'leads',
            'tasks',
            'campaigns',
            'calendar',
            'subscribers',
            'agents',
            'chit-groups',
            'employees-hrms',
            'reports-hub',
            'company-settings',
            'customization'
          ],
          visibility: {
            'dashboard': true,
            'leads': true,
            'tasks': true,
            'campaigns': true,
            'calendar': true,
            'subscribers': true,
            'agents': true,
            'chit-groups': true,
            'employees-hrms': true,
            'reports-hub': true,
            'company-settings': true,
            'customization': true
          },
          collapsed: false
        }
      });
      toast.success('Sidebar reset to defaults');
    }
  };

  return (
    <div className="flex-1 overflow-y-auto p-4 space-y-6 scrollbar-none">
      {/* Sidebar Configuration */}
      <div className="bg-slate-800/40 backdrop-blur-xl rounded-2xl p-6 border border-yellow-400/30">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="text-lg font-semibold text-slate-50">Sidebar Order & Visibility</h3>
            <p className="text-sm text-slate-400 mt-1">
              Drag to reorder sidebar items and toggle their visibility
            </p>
          </div>
          <div className="text-sm text-slate-400">
            Visible: <span className="font-semibold text-slate-50">
              {Object.values(config.sidebar.visibility).filter(Boolean).length}
            </span> / {sidebarItems.length}
          </div>
        </div>

        <DndList
          items={orderedItems}
          onReorder={handleReorder}
          onToggleVisibility={handleToggleVisibility}
          onReset={handleReset}
        />
      </div>

      {/* Sidebar Settings */}
      <div className="bg-slate-800/40 backdrop-blur-xl rounded-2xl p-6 border border-yellow-400/30">
        <h3 className="text-lg font-semibold text-slate-50 mb-6">Sidebar Settings</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="flex items-center justify-between p-4 bg-slate-700/30 rounded-xl border border-yellow-400/20">
            <div>
              <p className="text-sm font-medium text-slate-50">Default Collapsed</p>
              <p className="text-xs text-slate-400">Start with sidebar collapsed on load</p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={config.sidebar.collapsed}
                onChange={(e) => updateConfig({
                  sidebar: {
                    ...config.sidebar,
                    collapsed: e.target.checked
                  }
                })}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-slate-600 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
            </label>
          </div>
        </div>
      </div>

      {/* Preview */}
      <div className="bg-slate-800/40 backdrop-blur-xl rounded-2xl p-6 border border-yellow-400/30">
        <h3 className="text-lg font-semibold text-slate-50 mb-6">Preview</h3>
        
        <div className="bg-slate-900/50 rounded-xl p-4 border border-yellow-400/20">
          <div className="text-xs text-slate-400 mb-3">Sidebar Preview (Current Order)</div>
          <div className="space-y-1">
            {orderedItems.map((item, index) => {
              const Icon = item.icon;
              return (
                <div
                  key={item.id}
                  className={`flex items-center space-x-3 p-2 rounded-lg transition-all ${
                    item.visible 
                      ? 'bg-slate-700/30 text-slate-50' 
                      : 'bg-slate-800/30 text-slate-500 opacity-50'
                  }`}
                >
                  <span className="text-xs text-slate-500 w-4">{index + 1}</span>
                  <Icon className="h-4 w-4" />
                  <span className="text-sm">{item.name}</span>
                  {!item.visible && (
                    <span className="text-xs text-slate-500 ml-auto">(Hidden)</span>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* JSON Configuration */}
      <div className="bg-slate-800/40 backdrop-blur-xl rounded-2xl p-6 border border-yellow-400/30">
        <JsonEditor
          value={JSON.stringify(config.sidebar, null, 2)}
          onChange={() => {}} // Read-only
          onImport={importConfig}
          onExport={exportConfig}
          label="Sidebar Configuration"
          description="Current sidebar configuration in JSON format"
          readOnly
        />
      </div>
    </div>
  );
};