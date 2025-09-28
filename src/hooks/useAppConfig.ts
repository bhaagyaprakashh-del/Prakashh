import { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { AppConfig, appConfigManager } from '../lib/appConfig';

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
  const [config, setConfig] = useState<AppConfig>(appConfigManager.getConfig());
  const [canUndo, setCanUndo] = useState(false);
  const [canRedo, setCanRedo] = useState(false);

  useEffect(() => {
    const unsubscribe = appConfigManager.subscribe((newConfig) => {
      setConfig(newConfig);
    });

    // Keyboard shortcuts for undo/redo
    const handleKeyDown = (event: KeyboardEvent) => {
      if ((event.ctrlKey || event.metaKey) && event.key === 'z' && !event.shiftKey) {
        event.preventDefault();
        const success = appConfigManager.undo();
        setCanUndo(success);
      } else if ((event.ctrlKey || event.metaKey) && (event.key === 'y' || (event.key === 'z' && event.shiftKey))) {
        event.preventDefault();
        const success = appConfigManager.redo();
        setCanRedo(success);
      }
    };

    document.addEventListener('keydown', handleKeyDown);

    return () => {
      unsubscribe();
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  const updateConfig = (updates: Partial<AppConfig>) => {
    appConfigManager.updateConfig(updates);
  };

  const resetToDefaults = () => {
    appConfigManager.resetToDefaults();
  };

  const exportConfig = () => {
    return appConfigManager.exportConfig();
  };

  const importConfig = (jsonString: string) => {
    return appConfigManager.importConfig(jsonString);
  };

  const undo = () => {
    return appConfigManager.undo();
  };

  const redo = () => {
    return appConfigManager.redo();
  };

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