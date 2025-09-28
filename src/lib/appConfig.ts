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

export const defaultConfig: AppConfig = {
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

// Validation functions
export const validateConfig = (config: any): config is AppConfig => {
  return (
    config &&
    typeof config === 'object' &&
    config.theme &&
    config.sidebar &&
    config.company &&
    config.modules &&
    config.forms &&
    config.tables
  );
};

export const mergeConfig = (base: AppConfig, updates: Partial<AppConfig>): AppConfig => {
  return {
    ...base,
    ...updates,
    theme: { ...base.theme, ...updates.theme },
    sidebar: { ...base.sidebar, ...updates.sidebar },
    company: { ...base.company, ...updates.company },
    modules: { ...base.modules, ...updates.modules },
    forms: { ...base.forms, ...updates.forms },
    tables: { ...base.tables, ...updates.tables }
  };
};