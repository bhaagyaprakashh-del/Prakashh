import { useState, useEffect, createContext, useContext, ReactNode } from 'react';

export interface AppConfig {
  theme: {
    colors: {
      primary: string;
      secondary: string;
      success: string;
      warning: string;
      danger: string;
      surface: string;
      text: string;
    };
    radius: 'none' | 'sm' | 'md' | 'lg' | 'xl';
    density: 'compact' | 'comfortable' | 'spacious';
    headerFixed: boolean;
    sidebarCollapsed: boolean;
    glassEffect: boolean;
  };
  sidebar: {
    order: string[];
    items: Array<{
      id: string;
      visible: boolean;
    }>;
  };
  company: {
    companyName: string;
    brandName: string;
    logoSidebar?: string;
    logoLogin?: string;
    logoHeader?: string;
  };
  modules: Record<string, {
    enabled: boolean;
    config: any;
  }>;
  forms: Record<string, any>;
  tables: Record<string, any>;
}

const defaultConfig: AppConfig = {
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
  },
  sidebar: {
    order: [],
    items: []
  },
  company: {
    companyName: 'Ramnirmalchits CRM',
    brandName: 'Ramnirmalchits'
  },
  modules: {},
  forms: {},
  tables: {}
};

interface AppConfigContextType {
  config: AppConfig;
  updateConfig: (updates: Partial<AppConfig>) => void;
  resetToDefaults: () => void;
  exportConfig: () => string;
  importConfig: (jsonString: string) => boolean;
  undo: () => boolean;
  redo: () => boolean;
  canUndo: boolean;
  canRedo: boolean;
}

const AppConfigContext = createContext<AppConfigContextType | undefined>(undefined);

export const AppConfigProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [config, setConfig] = useState<AppConfig>(defaultConfig);
  const [history, setHistory] = useState<AppConfig[]>([defaultConfig]);
  const [historyIndex, setHistoryIndex] = useState(0);

  // Load config from localStorage on mount
  useEffect(() => {
    const savedConfig = localStorage.getItem('app_config');
    if (savedConfig) {
      try {
        const parsedConfig = JSON.parse(savedConfig);
        setConfig({ ...defaultConfig, ...parsedConfig });
      } catch (error) {
        console.error('Failed to parse saved config:', error);
      }
    }
  }, []);

  // Save config to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('app_config', JSON.stringify(config));
    applyTheme(config.theme);
  }, [config]);

  // Apply theme to document
  const applyTheme = (theme: AppConfig['theme']) => {
    const root = document.documentElement;
    root.style.setProperty('--color-primary', theme.colors.primary);
    root.style.setProperty('--color-secondary', theme.colors.secondary);
    root.style.setProperty('--color-success', theme.colors.success);
    root.style.setProperty('--color-warning', theme.colors.warning);
    root.style.setProperty('--color-danger', theme.colors.danger);
    root.style.setProperty('--color-surface', theme.colors.surface);
    root.style.setProperty('--color-text', theme.colors.text);
  };

  const updateConfig = (updates: Partial<AppConfig>) => {
    const newConfig = { ...config, ...updates };
    setConfig(newConfig);
    
    // Add to history for undo/redo
    const newHistory = history.slice(0, historyIndex + 1);
    newHistory.push(newConfig);
    setHistory(newHistory.slice(-10)); // Keep last 10 states
    setHistoryIndex(newHistory.length - 1);
  };

  const resetToDefaults = () => {
    updateConfig(defaultConfig);
  };

  const exportConfig = () => {
    return JSON.stringify(config, null, 2);
  };

  const importConfig = (jsonString: string): boolean => {
    try {
      const importedConfig = JSON.parse(jsonString);
      updateConfig(importedConfig);
      return true;
    } catch (error) {
      console.error('Failed to import config:', error);
      return false;
    }
  };

  const undo = (): boolean => {
    if (historyIndex > 0) {
      const newIndex = historyIndex - 1;
      setConfig(history[newIndex]);
      setHistoryIndex(newIndex);
      return true;
    }
    return false;
  };

  const redo = (): boolean => {
    if (historyIndex < history.length - 1) {
      const newIndex = historyIndex + 1;
      setConfig(history[newIndex]);
      setHistoryIndex(newIndex);
      return true;
    }
    return false;
  };

  const canUndo = historyIndex > 0;
  const canRedo = historyIndex < history.length - 1;

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.ctrlKey || e.metaKey) {
        if (e.key === 'z' && !e.shiftKey) {
          e.preventDefault();
          undo();
        } else if (e.key === 'y' || (e.key === 'z' && e.shiftKey)) {
          e.preventDefault();
          redo();
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [historyIndex, history]);

  return (
    <AppConfigContext.Provider value={{
      config,
      updateConfig,
      resetToDefaults,
      exportConfig,
      importConfig,
      undo,
      redo,
      canUndo,
      canRedo
    }}>
      {children}
    </AppConfigContext.Provider>
  );
};

export const useAppConfig = () => {
  const context = useContext(AppConfigContext);
  if (context === undefined) {
    throw new Error('useAppConfig must be used within an AppConfigProvider');
  }
  return context;
};