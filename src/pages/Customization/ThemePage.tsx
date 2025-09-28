import React, { useState } from 'react';
import { Eye, RotateCcw, Save, Palette, Monitor, Smartphone, Tablet } from 'lucide-react';
import { useAppConfig } from '../../hooks/useAppConfig';
import { ColorPicker } from '../../components/customization/ColorPicker';
import { LayoutPicker } from '../../components/customization/LayoutPicker';
import { JsonEditor } from '../../components/customization/JsonEditor';
import toast from 'react-hot-toast';

const radiusOptions = [
  { id: 'none', name: 'None', description: 'Sharp corners', icon: Monitor, preview: 'Sharp' },
  { id: 'sm', name: 'Small', description: 'Slightly rounded', icon: Smartphone, preview: 'Small' },
  { id: 'md', name: 'Medium', description: 'Moderately rounded', icon: Tablet, preview: 'Medium' },
  { id: 'lg', name: 'Large', description: 'Well rounded', icon: Monitor, preview: 'Large' },
  { id: 'xl', name: 'Extra Large', description: 'Very rounded', icon: Monitor, preview: 'XL' }
];

const densityOptions = [
  { id: 'compact', name: 'Compact', description: 'Tight spacing', icon: Monitor, preview: 'Compact' },
  { id: 'comfortable', name: 'Comfortable', description: 'Balanced spacing', icon: Tablet, preview: 'Comfortable' },
  { id: 'spacious', name: 'Spacious', description: 'Generous spacing', icon: Monitor, preview: 'Spacious' }
];

export const ThemePage: React.FC = () => {
  const { config, updateConfig, resetToDefaults, exportConfig, importConfig } = useAppConfig();
  const [showJsonEditor, setShowJsonEditor] = useState(false);

  const handleColorChange = (colorKey: string, value: string) => {
    updateConfig({
      theme: {
        ...config.theme,
        colors: {
          ...config.theme.colors,
          [colorKey]: value
        }
      }
    });
  };

  const handleLayoutChange = (key: string, value: any) => {
    updateConfig({
      theme: {
        ...config.theme,
        [key]: value
      }
    });
  };

  const handleResetTheme = () => {
    if (window.confirm('Reset theme settings to defaults?')) {
      updateConfig({
        theme: {
          colors: {
            primary: '#3b82f6',
            secondary: '#1e293b',
            success: '#10b981',
            warning: '#f59e0b',
            danger: '#ef4444',
            surface: '#0f172a',
            text: '#f8fafc'
          },
          radius: 'md',
          density: 'comfortable',
          headerFixed: true,
          sidebarCollapsed: false,
          glassEffect: true
        }
      });
      toast.success('Theme reset to defaults');
    }
  };

  const handleApplyGlobally = () => {
    // Theme is already applied globally through the context
    toast.success('Theme applied globally');
  };

  return (
    <div className="flex-1 overflow-y-auto p-4 space-y-6 scrollbar-none">
      {/* Color Scheme */}
      <div className="bg-slate-800/40 backdrop-blur-xl rounded-2xl p-6 border border-yellow-400/30">
        <h3 className="text-lg font-semibold text-slate-50 mb-6 flex items-center">
          <Palette className="h-5 w-5 mr-2" />
          Color Scheme
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <ColorPicker
            label="Primary Color"
            value={config.theme.colors.primary}
            onChange={(value) => handleColorChange('primary', value)}
            description="Main brand color used for buttons and highlights"
            showContrast
            contrastWith={config.theme.colors.surface}
          />
          
          <ColorPicker
            label="Secondary Color"
            value={config.theme.colors.secondary}
            onChange={(value) => handleColorChange('secondary', value)}
            description="Secondary color for backgrounds and surfaces"
          />
          
          <ColorPicker
            label="Success Color"
            value={config.theme.colors.success}
            onChange={(value) => handleColorChange('success', value)}
            description="Color for success states and positive actions"
          />
          
          <ColorPicker
            label="Warning Color"
            value={config.theme.colors.warning}
            onChange={(value) => handleColorChange('warning', value)}
            description="Color for warnings and caution states"
          />
          
          <ColorPicker
            label="Danger Color"
            value={config.theme.colors.danger}
            onChange={(value) => handleColorChange('danger', value)}
            description="Color for errors and destructive actions"
          />
          
          <ColorPicker
            label="Surface Color"
            value={config.theme.colors.surface}
            onChange={(value) => handleColorChange('surface', value)}
            description="Background color for cards and surfaces"
          />
          
          <ColorPicker
            label="Text Color"
            value={config.theme.colors.text}
            onChange={(value) => handleColorChange('text', value)}
            description="Primary text color"
            showContrast
            contrastWith={config.theme.colors.surface}
          />
        </div>
      </div>

      {/* Layout Settings */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-slate-800/40 backdrop-blur-xl rounded-2xl p-6 border border-yellow-400/30">
          <LayoutPicker
            label="Border Radius"
            value={config.theme.radius}
            options={radiusOptions}
            onChange={(value) => handleLayoutChange('radius', value)}
            description="Roundness of corners for UI elements"
          />
        </div>

        <div className="bg-slate-800/40 backdrop-blur-xl rounded-2xl p-6 border border-yellow-400/30">
          <LayoutPicker
            label="Density"
            value={config.theme.density}
            options={densityOptions}
            onChange={(value) => handleLayoutChange('density', value)}
            description="Spacing between UI elements"
          />
        </div>
      </div>

      {/* Layout Toggles */}
      <div className="bg-slate-800/40 backdrop-blur-xl rounded-2xl p-6 border border-yellow-400/30">
        <h3 className="text-lg font-semibold text-slate-50 mb-6">Layout Options</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="flex items-center justify-between p-4 bg-slate-700/30 rounded-xl border border-yellow-400/20">
            <div>
              <p className="text-sm font-medium text-slate-50">Fixed Header</p>
              <p className="text-xs text-slate-400">Keep header visible when scrolling</p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={config.theme.headerFixed}
                onChange={(e) => handleLayoutChange('headerFixed', e.target.checked)}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-slate-600 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
            </label>
          </div>

          <div className="flex items-center justify-between p-4 bg-slate-700/30 rounded-xl border border-yellow-400/20">
            <div>
              <p className="text-sm font-medium text-slate-50">Collapsed Sidebar</p>
              <p className="text-xs text-slate-400">Start with sidebar collapsed</p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={config.theme.sidebarCollapsed}
                onChange={(e) => handleLayoutChange('sidebarCollapsed', e.target.checked)}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-slate-600 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
            </label>
          </div>

          <div className="flex items-center justify-between p-4 bg-slate-700/30 rounded-xl border border-yellow-400/20">
            <div>
              <p className="text-sm font-medium text-slate-50">Glass Effect</p>
              <p className="text-xs text-slate-400">Enable glassmorphism effects</p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={config.theme.glassEffect}
                onChange={(e) => handleLayoutChange('glassEffect', e.target.checked)}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-slate-600 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
            </label>
          </div>
        </div>
      </div>

      {/* Live Preview */}
      <div className="bg-slate-800/40 backdrop-blur-xl rounded-2xl p-6 border border-yellow-400/30">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold text-slate-50 flex items-center">
            <Eye className="h-5 w-5 mr-2" />
            Live Preview
          </h3>
          <button
            onClick={() => setShowJsonEditor(!showJsonEditor)}
            className="text-sm text-blue-400 hover:text-blue-300"
          >
            {showJsonEditor ? 'Hide JSON' : 'Show JSON'}
          </button>
        </div>

        {showJsonEditor ? (
          <JsonEditor
            value={JSON.stringify(config.theme, null, 2)}
            onChange={() => {}} // Read-only for theme preview
            onImport={importConfig}
            onExport={exportConfig}
            label="Theme Configuration"
            description="Current theme configuration in JSON format"
            readOnly
          />
        ) : (
          <div className="space-y-4">
            {/* Sample UI Elements */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {/* Sample Card */}
              <div 
                className="p-4 rounded-xl border backdrop-blur-sm"
                style={{ 
                  backgroundColor: config.theme.colors.surface + '40',
                  borderColor: config.theme.colors.primary + '30',
                  borderRadius: config.theme.radius === 'none' ? '0' : 
                              config.theme.radius === 'sm' ? '0.125rem' :
                              config.theme.radius === 'md' ? '0.375rem' :
                              config.theme.radius === 'lg' ? '0.5rem' : '0.75rem'
                }}
              >
                <h4 className="font-semibold mb-2" style={{ color: config.theme.colors.text }}>
                  Sample Card
                </h4>
                <p className="text-sm opacity-80" style={{ color: config.theme.colors.text }}>
                  This is how cards will look with your theme
                </p>
              </div>

              {/* Sample Buttons */}
              <div className="space-y-2">
                <button
                  className="w-full px-4 py-2 rounded-lg font-medium transition-all"
                  style={{ 
                    backgroundColor: config.theme.colors.primary,
                    color: '#ffffff',
                    borderRadius: config.theme.radius === 'none' ? '0' : 
                                config.theme.radius === 'sm' ? '0.125rem' :
                                config.theme.radius === 'md' ? '0.375rem' :
                                config.theme.radius === 'lg' ? '0.5rem' : '0.75rem'
                  }}
                >
                  Primary Button
                </button>
                <button
                  className="w-full px-4 py-2 rounded-lg font-medium transition-all"
                  style={{ 
                    backgroundColor: config.theme.colors.success,
                    color: '#ffffff',
                    borderRadius: config.theme.radius === 'none' ? '0' : 
                                config.theme.radius === 'sm' ? '0.125rem' :
                                config.theme.radius === 'md' ? '0.375rem' :
                                config.theme.radius === 'lg' ? '0.5rem' : '0.75rem'
                  }}
                >
                  Success Button
                </button>
                <button
                  className="w-full px-4 py-2 rounded-lg font-medium transition-all"
                  style={{ 
                    backgroundColor: config.theme.colors.danger,
                    color: '#ffffff',
                    borderRadius: config.theme.radius === 'none' ? '0' : 
                                config.theme.radius === 'sm' ? '0.125rem' :
                                config.theme.radius === 'md' ? '0.375rem' :
                                config.theme.radius === 'lg' ? '0.5rem' : '0.75rem'
                  }}
                >
                  Danger Button
                </button>
              </div>

              {/* Sample Table */}
              <div 
                className="rounded-xl border overflow-hidden"
                style={{ 
                  backgroundColor: config.theme.colors.surface + '40',
                  borderColor: config.theme.colors.primary + '30',
                  borderRadius: config.theme.radius === 'none' ? '0' : 
                              config.theme.radius === 'sm' ? '0.125rem' :
                              config.theme.radius === 'md' ? '0.375rem' :
                              config.theme.radius === 'lg' ? '0.5rem' : '0.75rem'
                }}
              >
                <div className="p-3 border-b" style={{ borderColor: config.theme.colors.primary + '20' }}>
                  <h5 className="font-medium" style={{ color: config.theme.colors.text }}>Sample Table</h5>
                </div>
                <div className="p-3 space-y-2">
                  <div className="flex justify-between text-sm">
                    <span style={{ color: config.theme.colors.text }}>Item 1</span>
                    <span style={{ color: config.theme.colors.success }}>Active</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span style={{ color: config.theme.colors.text }}>Item 2</span>
                    <span style={{ color: config.theme.colors.warning }}>Pending</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Action Buttons */}
      <div className="flex justify-end space-x-4">
        <button
          onClick={handleResetTheme}
          className="inline-flex items-center px-6 py-3 border border-red-500/30 text-sm font-medium rounded-xl text-red-400 bg-red-500/10 hover:bg-red-500/20 transition-all"
        >
          <RotateCcw className="h-4 w-4 mr-2" />
          Reset Theme
        </button>
        <button
          onClick={handleApplyGlobally}
          className="inline-flex items-center px-6 py-3 border border-blue-500/30 text-sm font-medium rounded-xl text-blue-400 bg-blue-500/10 hover:bg-blue-500/20 transition-all"
        >
          <Save className="h-4 w-4 mr-2" />
          Apply Globally
        </button>
      </div>
    </div>
  );
};