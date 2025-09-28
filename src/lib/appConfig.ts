// App Configuration Store with TypeScript types and validation
export interface AppConfig {
  theme: ThemeConfig;
  sidebar: SidebarConfig;
  modules: ModuleConfig;
  forms: Record<string, FormSchema>;
  tables: Record<string, TableSchema>;
  version: string;
  lastUpdated: string;
}

export interface ThemeConfig {
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
}

export interface SidebarConfig {
  order: string[];
  visibility: Record<string, boolean>;
  collapsed: boolean;
}

export interface ModuleConfig {
  enabled: Record<string, boolean>;
  settings: Record<string, any>;
}

export interface FormSchema {
  id: string;
  name: string;
  description: string;
  fields: FormField[];
  layout: 'single' | 'two-column' | 'three-column';
  submitText: string;
  cancelText: string;
  validation: FormValidation;
}

export interface FormField {
  id: string;
  type: 'text' | 'number' | 'email' | 'phone' | 'select' | 'date' | 'textarea' | 'toggle' | 'checkbox' | 'radio';
  label: string;
  placeholder?: string;
  required: boolean;
  width: 'full' | 'half' | 'third' | 'quarter';
  options?: { value: string; label: string }[];
  validation?: FieldValidation;
  defaultValue?: any;
  helpText?: string;
}

export interface FormValidation {
  required: string[];
  rules: Record<string, ValidationRule[]>;
}

export interface FieldValidation {
  min?: number;
  max?: number;
  pattern?: string;
  custom?: string;
}

export interface ValidationRule {
  type: 'min' | 'max' | 'pattern' | 'email' | 'phone' | 'custom';
  value?: any;
  message: string;
}

export interface TableSchema {
  id: string;
  name: string;
  description: string;
  columns: TableColumn[];
  pagination: boolean;
  search: boolean;
  filters: boolean;
  actions: TableAction[];
}

export interface TableColumn {
  id: string;
  header: string;
  key: string;
  type: 'text' | 'number' | 'badge' | 'date' | 'currency' | 'actions' | 'avatar' | 'progress';
  sortable: boolean;
  width?: string;
  align: 'left' | 'center' | 'right';
  badgeMap?: Record<string, { color: string; label: string }>;
  format?: string;
  visible: boolean;
}

export interface TableAction {
  id: string;
  label: string;
  icon: string;
  action: string;
  variant: 'primary' | 'secondary' | 'danger';
  condition?: string;
}

// Default configuration
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
  },
  modules: {
    enabled: {
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
    settings: {}
  },
  forms: {},
  tables: {},
  version: '1.0.0',
  lastUpdated: new Date().toISOString()
};

// Configuration manager class
export class AppConfigManager {
  private static instance: AppConfigManager;
  private config: AppConfig;
  private listeners: Set<(config: AppConfig) => void> = new Set();
  private history: AppConfig[] = [];
  private historyIndex: number = -1;
  private maxHistory: number = 10;

  private constructor() {
    this.config = this.loadConfig();
    this.applyTheme();
  }

  static getInstance(): AppConfigManager {
    if (!AppConfigManager.instance) {
      AppConfigManager.instance = new AppConfigManager();
    }
    return AppConfigManager.instance;
  }

  // Load configuration from localStorage with fallback to defaults
  private loadConfig(): AppConfig {
    try {
      const stored = localStorage.getItem('app_config');
      if (stored) {
        const parsed = JSON.parse(stored);
        return this.mergeWithDefaults(parsed);
      }
    } catch (error) {
      console.warn('Failed to load app config from localStorage:', error);
    }
    return { ...defaultConfig };
  }

  // Merge stored config with defaults to handle new properties
  private mergeWithDefaults(stored: Partial<AppConfig>): AppConfig {
    return {
      theme: { ...defaultConfig.theme, ...stored.theme },
      sidebar: { ...defaultConfig.sidebar, ...stored.sidebar },
      modules: { ...defaultConfig.modules, ...stored.modules },
      forms: { ...defaultConfig.forms, ...stored.forms },
      tables: { ...defaultConfig.tables, ...stored.tables },
      version: stored.version || defaultConfig.version,
      lastUpdated: stored.lastUpdated || defaultConfig.lastUpdated
    };
  }

  // Save configuration to localStorage and optionally to API
  private saveConfig(config: AppConfig) {
    try {
      localStorage.setItem('app_config', JSON.stringify(config));
      
      // Try to save to API if available
      this.saveToAPI(config).catch(error => {
        console.warn('Failed to save config to API:', error);
      });
    } catch (error) {
      console.error('Failed to save app config:', error);
    }
  }

  // Save to API endpoint
  private async saveToAPI(config: AppConfig): Promise<void> {
    try {
      const response = await fetch('/api/app-config', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ config })
      });
      
      if (!response.ok) {
        throw new Error(`API save failed: ${response.status}`);
      }
    } catch (error) {
      // Silently fail if API is not available
      throw error;
    }
  }

  // Apply theme to document
  private applyTheme() {
    const { theme } = this.config;
    const root = document.documentElement;
    
    // Apply CSS custom properties
    root.style.setProperty('--color-primary', theme.colors.primary);
    root.style.setProperty('--color-secondary', theme.colors.secondary);
    root.style.setProperty('--color-success', theme.colors.success);
    root.style.setProperty('--color-warning', theme.colors.warning);
    root.style.setProperty('--color-danger', theme.colors.danger);
    root.style.setProperty('--color-surface', theme.colors.surface);
    root.style.setProperty('--color-text', theme.colors.text);
    
    // Apply radius
    const radiusMap = {
      none: '0px',
      sm: '0.125rem',
      md: '0.375rem',
      lg: '0.5rem',
      xl: '0.75rem'
    };
    root.style.setProperty('--border-radius', radiusMap[theme.radius]);
    
    // Apply density
    const densityMap = {
      compact: '0.5rem',
      comfortable: '1rem',
      spacious: '1.5rem'
    };
    root.style.setProperty('--spacing-unit', densityMap[theme.density]);
    
    // Apply layout settings
    document.body.classList.toggle('header-fixed', theme.headerFixed);
    document.body.classList.toggle('sidebar-collapsed', theme.sidebarCollapsed);
    document.body.classList.toggle('glass-effect', theme.glassEffect);
  }

  // Public API
  getConfig(): AppConfig {
    return { ...this.config };
  }

  updateConfig(updates: Partial<AppConfig>) {
    // Save current state to history
    this.addToHistory(this.config);
    
    // Update configuration
    this.config = {
      ...this.config,
      ...updates,
      lastUpdated: new Date().toISOString()
    };
    
    // Apply theme if theme was updated
    if (updates.theme) {
      this.applyTheme();
    }
    
    // Save and notify listeners
    this.saveConfig(this.config);
    this.notifyListeners();
  }

  resetToDefaults() {
    this.addToHistory(this.config);
    this.config = { ...defaultConfig };
    this.applyTheme();
    this.saveConfig(this.config);
    this.notifyListeners();
  }

  exportConfig(): string {
    return JSON.stringify(this.config, null, 2);
  }

  importConfig(jsonString: string): boolean {
    try {
      const imported = JSON.parse(jsonString);
      const validated = this.validateConfig(imported);
      
      if (validated) {
        this.addToHistory(this.config);
        this.config = this.mergeWithDefaults(imported);
        this.applyTheme();
        this.saveConfig(this.config);
        this.notifyListeners();
        return true;
      }
    } catch (error) {
      console.error('Failed to import config:', error);
    }
    return false;
  }

  // History management for undo/redo
  private addToHistory(config: AppConfig) {
    // Remove any history after current index
    this.history = this.history.slice(0, this.historyIndex + 1);
    
    // Add new state
    this.history.push({ ...config });
    this.historyIndex = this.history.length - 1;
    
    // Limit history size
    if (this.history.length > this.maxHistory) {
      this.history.shift();
      this.historyIndex--;
    }
  }

  undo(): boolean {
    if (this.historyIndex > 0) {
      this.historyIndex--;
      this.config = { ...this.history[this.historyIndex] };
      this.applyTheme();
      this.saveConfig(this.config);
      this.notifyListeners();
      return true;
    }
    return false;
  }

  redo(): boolean {
    if (this.historyIndex < this.history.length - 1) {
      this.historyIndex++;
      this.config = { ...this.history[this.historyIndex] };
      this.applyTheme();
      this.saveConfig(this.config);
      this.notifyListeners();
      return true;
    }
    return false;
  }

  // Validation
  private validateConfig(config: any): boolean {
    // Basic validation - ensure required properties exist
    if (!config || typeof config !== 'object') return false;
    if (!config.theme || !config.sidebar || !config.modules) return false;
    if (!config.theme.colors || !config.sidebar.order) return false;
    
    // Validate color format
    const colorRegex = /^#[0-9A-F]{6}$/i;
    const colors = config.theme.colors;
    for (const [key, value] of Object.entries(colors)) {
      if (typeof value !== 'string' || !colorRegex.test(value as string)) {
        console.error(`Invalid color format for ${key}: ${value}`);
        return false;
      }
    }
    
    return true;
  }

  // Event listeners
  subscribe(listener: (config: AppConfig) => void) {
    this.listeners.add(listener);
    return () => this.listeners.delete(listener);
  }

  private notifyListeners() {
    this.listeners.forEach(listener => listener(this.config));
  }
}

// Export singleton instance
export const appConfigManager = AppConfigManager.getInstance();

// Utility functions
export const getContrastRatio = (color1: string, color2: string): number => {
  const getLuminance = (color: string): number => {
    const hex = color.replace('#', '');
    const r = parseInt(hex.substr(0, 2), 16) / 255;
    const g = parseInt(hex.substr(2, 2), 16) / 255;
    const b = parseInt(hex.substr(4, 2), 16) / 255;
    
    const [rs, gs, bs] = [r, g, b].map(c => {
      return c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4);
    });
    
    return 0.2126 * rs + 0.7152 * gs + 0.0722 * bs;
  };

  const l1 = getLuminance(color1);
  const l2 = getLuminance(color2);
  const lighter = Math.max(l1, l2);
  const darker = Math.min(l1, l2);
  
  return (lighter + 0.05) / (darker + 0.05);
};

export const isValidHexColor = (color: string): boolean => {
  return /^#[0-9A-F]{6}$/i.test(color);
};