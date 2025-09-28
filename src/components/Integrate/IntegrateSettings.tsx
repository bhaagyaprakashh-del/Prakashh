import React, { useState } from 'react';
import {
  Settings,
  Save,
  RefreshCw,
  Clock,
  Shield,
  Database,
  Bell,
  CheckCircle,
  XCircle,
  AlertTriangle,
  Target,
  Zap
} from 'lucide-react';
import { useIntegrationStore } from '../../stores/integrationStore';

export const IntegrateSettings: React.FC = () => {
  const { modules, settings, updateSettings } = useIntegrationStore();
  const [localSettings, setLocalSettings] = useState(settings);
  const [isSaving, setIsSaving] = useState(false);

  const handleToggleModule = (moduleId: string) => {
    setLocalSettings(prev => ({
      ...prev,
      enabledModules: prev.enabledModules.includes(moduleId)
        ? prev.enabledModules.filter(id => id !== moduleId)
        : [...prev.enabledModules, moduleId]
    }));
  };

  const handleSave = async () => {
    setIsSaving(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    updateSettings(localSettings);
    setIsSaving(false);
  };

  const schedulePresets = [
    { value: 'hourly', label: 'Every Hour' },
    { value: 'daily_6', label: 'Daily at 6:00 AM' },
    { value: 'daily_18', label: 'Daily at 6:00 PM' },
    { value: 'weekly_mon', label: 'Weekly on Monday' },
    { value: 'monthly_1', label: 'Monthly on 1st' },
    { value: 'custom', label: 'Custom Cron' }
  ];

  const conflictPolicies = [
    { value: 'prefer_existing', label: 'Prefer Existing Data' },
    { value: 'prefer_incoming', label: 'Prefer Incoming Data' },
    { value: 'ask_user', label: 'Ask User to Resolve' },
    { value: 'skip_conflict', label: 'Skip Conflicted Records' }
  ];

  const validationLevels = [
    { value: 'strict', label: 'Strict - Fail on any validation error' },
    { value: 'moderate', label: 'Moderate - Warn on minor issues' },
    { value: 'lenient', label: 'Lenient - Allow most data through' }
  ];

  return (
    <div className="h-full flex flex-col bg-slate-900 overflow-hidden">
      {/* Header */}
      <div className="flex justify-between items-center p-4 border-b border-yellow-400/30 flex-shrink-0">
        <div>
          <h1 className="text-2xl font-bold text-slate-50">Integration Settings</h1>
          <p className="mt-1 text-sm text-slate-400">
            Configure modules, scheduling, and integration policies
          </p>
        </div>
        <button
          onClick={handleSave}
          disabled={isSaving}
          className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50"
        >
          {isSaving ? (
            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
          ) : (
            <Save className="h-4 w-4 mr-2" />
          )}
          {isSaving ? 'Saving...' : 'Save Settings'}
        </button>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto p-4 space-y-6 scrollbar-none">
        {/* Module Toggles */}
        <div className="bg-slate-800/40 backdrop-blur-xl rounded-2xl p-6 border border-yellow-400/30">
          <h3 className="text-lg font-semibold text-slate-50 mb-4 flex items-center">
            <Database className="h-5 w-5 mr-2" />
            Module Integration Scope
          </h3>
          <p className="text-sm text-slate-400 mb-6">
            Enable or disable modules from integration operations
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {modules.map((module) => (
              <div key={module.id} className="bg-slate-700/30 rounded-xl p-4 border border-yellow-400/20">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="p-2 bg-blue-500/20 rounded-lg border border-yellow-400/30">
                      <Database className="h-5 w-5 text-blue-400" />
                    </div>
                    <div>
                      <h4 className="text-slate-50 font-medium">{module.name}</h4>
                      <p className="text-slate-400 text-sm">{module.recordCount} records</p>
                    </div>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={localSettings.enabledModules.includes(module.id)}
                      onChange={() => handleToggleModule(module.id)}
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-slate-600 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                  </label>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Scheduling */}
        <div className="bg-slate-800/40 backdrop-blur-xl rounded-2xl p-6 border border-yellow-400/30">
          <h3 className="text-lg font-semibold text-slate-50 mb-4 flex items-center">
            <Clock className="h-5 w-5 mr-2" />
            Automatic Scheduling
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-slate-50 mb-2">Schedule Preset</label>
              <select
                value={localSettings.schedule}
                onChange={(e) => setLocalSettings(prev => ({ ...prev, schedule: e.target.value }))}
                className="w-full px-3 py-2 bg-slate-700/50 border border-yellow-400/30 rounded-lg text-slate-50 focus:ring-2 focus:ring-blue-500 backdrop-blur-sm"
              >
                {schedulePresets.map(preset => (
                  <option key={preset.value} value={preset.value}>{preset.label}</option>
                ))}
              </select>
            </div>
            
            {localSettings.schedule === 'custom' && (
              <div>
                <label className="block text-sm font-medium text-slate-50 mb-2">Custom Cron Expression</label>
                <input
                  type="text"
                  value={localSettings.customCron || ''}
                  onChange={(e) => setLocalSettings(prev => ({ ...prev, customCron: e.target.value }))}
                  className="w-full px-3 py-2 bg-slate-700/50 border border-yellow-400/30 rounded-lg text-slate-50 placeholder-slate-400 focus:ring-2 focus:ring-blue-500 backdrop-blur-sm"
                  placeholder="0 6 * * *"
                />
              </div>
            )}
            
            <div>
              <label className="block text-sm font-medium text-slate-50 mb-2">Timezone</label>
              <select
                value={localSettings.timezone}
                onChange={(e) => setLocalSettings(prev => ({ ...prev, timezone: e.target.value }))}
                className="w-full px-3 py-2 bg-slate-700/50 border border-yellow-400/30 rounded-lg text-slate-50 focus:ring-2 focus:ring-blue-500 backdrop-blur-sm"
              >
                <option value="Asia/Kolkata">Asia/Kolkata (IST)</option>
                <option value="America/New_York">America/New_York (EST)</option>
                <option value="Europe/London">Europe/London (GMT)</option>
                <option value="Asia/Dubai">Asia/Dubai (GST)</option>
              </select>
            </div>
            
            <div className="flex items-center space-x-3">
              <label className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  checked={localSettings.autoSync}
                  onChange={(e) => setLocalSettings(prev => ({ ...prev, autoSync: e.target.checked }))}
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                />
                <span className="text-slate-50">Enable Auto Sync</span>
              </label>
            </div>
          </div>
        </div>

        {/* Policies */}
        <div className="bg-slate-800/40 backdrop-blur-xl rounded-2xl p-6 border border-yellow-400/30">
          <h3 className="text-lg font-semibold text-slate-50 mb-4 flex items-center">
            <Shield className="h-5 w-5 mr-2" />
            Integration Policies
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-slate-50 mb-2">Conflict Resolution</label>
              <select
                value={localSettings.conflictPolicy}
                onChange={(e) => setLocalSettings(prev => ({ ...prev, conflictPolicy: e.target.value as any }))}
                className="w-full px-3 py-2 bg-slate-700/50 border border-yellow-400/30 rounded-lg text-slate-50 focus:ring-2 focus:ring-blue-500 backdrop-blur-sm"
              >
                {conflictPolicies.map(policy => (
                  <option key={policy.value} value={policy.value}>{policy.label}</option>
                ))}
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-slate-50 mb-2">Validation Strictness</label>
              <select
                value={localSettings.validationLevel}
                onChange={(e) => setLocalSettings(prev => ({ ...prev, validationLevel: e.target.value as any }))}
                className="w-full px-3 py-2 bg-slate-700/50 border border-yellow-400/30 rounded-lg text-slate-50 focus:ring-2 focus:ring-blue-500 backdrop-blur-sm"
              >
                {validationLevels.map(level => (
                  <option key={level.value} value={level.value}>{level.label}</option>
                ))}
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-slate-50 mb-2">Default Batch Size</label>
              <input
                type="number"
                value={localSettings.defaultBatchSize}
                onChange={(e) => setLocalSettings(prev => ({ ...prev, defaultBatchSize: parseInt(e.target.value) || 100 }))}
                className="w-full px-3 py-2 bg-slate-700/50 border border-yellow-400/30 rounded-lg text-slate-50 placeholder-slate-400 focus:ring-2 focus:ring-blue-500 backdrop-blur-sm"
                
                min="1"
                max="1000"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-slate-50 mb-2">Retry Attempts</label>
              <input
                type="number"
                value={localSettings.retryAttempts}
                onChange={(e) => setLocalSettings(prev => ({ ...prev, retryAttempts: parseInt(e.target.value) || 3 }))}
                className="w-full px-3 py-2 bg-slate-700/50 border border-yellow-400/30 rounded-lg text-slate-50 placeholder-slate-400 focus:ring-2 focus:ring-blue-500 backdrop-blur-sm"
                min="0"
                max="10"
              />
            </div>
          </div>
        </div>

        {/* Notifications */}
        <div className="bg-slate-800/40 backdrop-blur-xl rounded-2xl p-6 border border-yellow-400/30">
          <h3 className="text-lg font-semibold text-slate-50 mb-4 flex items-center">
            <Bell className="h-5 w-5 mr-2" />
            Notifications
          </h3>
          
          <div className="space-y-4">
            <label className="flex items-center justify-between">
              <div>
                <span className="text-slate-50">Sync Completion</span>
                <p className="text-sm text-slate-400">Notify when sync operations complete</p>
              </div>
              <input
                type="checkbox"
                checked={localSettings.notifications.syncComplete}
                onChange={(e) => setLocalSettings(prev => ({
                  ...prev,
                  notifications: { ...prev.notifications, syncComplete: e.target.checked }
                }))}
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              />
            </label>
            
            <label className="flex items-center justify-between">
              <div>
                <span className="text-slate-50">Sync Errors</span>
                <p className="text-sm text-slate-400">Notify when sync operations fail</p>
              </div>
              <input
                type="checkbox"
                checked={localSettings.notifications.syncError}
                onChange={(e) => setLocalSettings(prev => ({
                  ...prev,
                  notifications: { ...prev.notifications, syncError: e.target.checked }
                }))}
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              />
            </label>
            
            <label className="flex items-center justify-between">
              <div>
                <span className="text-slate-50">Conflicts Detected</span>
                <p className="text-sm text-slate-400">Notify when data conflicts are detected</p>
              </div>
              <input
                type="checkbox"
                checked={localSettings.notifications.conflictsDetected}
                onChange={(e) => setLocalSettings(prev => ({
                  ...prev,
                  notifications: { ...prev.notifications, conflictsDetected: e.target.checked }
                }))}
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              />
            </label>
            
            <label className="flex items-center justify-between">
              <div>
                <span className="text-slate-50">Weekly Summary</span>
                <p className="text-sm text-slate-400">Send weekly integration summary report</p>
              </div>
              <input
                type="checkbox"
                checked={localSettings.notifications.weeklySummary}
                onChange={(e) => setLocalSettings(prev => ({
                  ...prev,
                  notifications: { ...prev.notifications, weeklySummary: e.target.checked }
                }))}
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              />
            </label>
          </div>
        </div>

        {/* Advanced Settings */}
        <div className="bg-slate-800/40 backdrop-blur-xl rounded-2xl p-6 border border-yellow-400/30">
          <h3 className="text-lg font-semibold text-slate-50 mb-4 flex items-center">
            <Zap className="h-5 w-5 mr-2" />
            Advanced Settings
          </h3>
          
          <div className="space-y-4">
            <label className="flex items-center justify-between">
              <div>
                <span className="text-slate-50">Enable Debug Logging</span>
                <p className="text-sm text-slate-400">Log detailed debug information for troubleshooting</p>
              </div>
              <input
                type="checkbox"
                checked={localSettings.debugMode}
                onChange={(e) => setLocalSettings(prev => ({ ...prev, debugMode: e.target.checked }))}
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              />
            </label>
            
            <label className="flex items-center justify-between">
              <div>
                <span className="text-slate-50">Parallel Processing</span>
                <p className="text-sm text-slate-400">Process multiple modules simultaneously</p>
              </div>
              <input
                type="checkbox"
                checked={localSettings.parallelProcessing}
                onChange={(e) => setLocalSettings(prev => ({ ...prev, parallelProcessing: e.target.checked }))}
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              />
            </label>
            
            <label className="flex items-center justify-between">
              <div>
                <span className="text-slate-50">Data Compression</span>
                <p className="text-sm text-slate-400">Compress data during transfer to reduce bandwidth</p>
              </div>
              <input
                type="checkbox"
                checked={localSettings.compression}
                onChange={(e) => setLocalSettings(prev => ({ ...prev, compression: e.target.checked }))}
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              />
            </label>
          </div>
        </div>
      </div>
    </div>
  );
};