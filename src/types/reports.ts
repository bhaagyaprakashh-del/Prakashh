// Reports Hub Core Types
export interface Report {
  id: string;
  name: string;
  description: string;
  category: 'sales' | 'financial' | 'operational' | 'hr' | 'compliance' | 'custom';
  type: 'standard' | 'custom' | 'scheduled' | 'adhoc';
  format: 'pdf' | 'excel' | 'csv' | 'json' | 'html';
  
  // Report Configuration
  dataSource: string;
  parameters: ReportParameter[];
  filters: ReportFilter[];
  columns: ReportColumn[];
  
  // Scheduling
  isScheduled: boolean;
  scheduleConfig?: ScheduleConfig;
  
  // Access Control
  visibility: 'public' | 'private' | 'shared';
  sharedWith: string[];
  permissions: {
    canView: string[];
    canEdit: string[];
    canDelete: string[];
    canSchedule: string[];
  };
  
  // Performance
  executionTime?: number; // in seconds
  lastRunTime?: string;
  lastRunStatus: 'success' | 'failed' | 'running' | 'cancelled';
  lastRunBy?: string;
  runCount: number;
  
  // File Information
  fileSize?: number;
  filePath?: string;
  downloadCount: number;
  
  // Metadata
  createdAt: string;
  createdBy: string;
  updatedAt: string;
  updatedBy: string;
  tags: string[];
  notes: string;
  
  // Dependencies
  dependencies: string[];
  dependents: string[];
}

export interface ReportParameter {
  id: string;
  name: string;
  label: string;
  type: 'text' | 'number' | 'date' | 'select' | 'multiselect' | 'boolean';
  isRequired: boolean;
  defaultValue?: any;
  options?: { value: string; label: string }[];
  validation?: string;
  description?: string;
}

export interface ReportFilter {
  id: string;
  field: string;
  operator: 'equals' | 'not_equals' | 'contains' | 'starts_with' | 'ends_with' | 'greater_than' | 'less_than' | 'between' | 'in' | 'not_in';
  value: any;
  dataType: 'string' | 'number' | 'date' | 'boolean';
  isActive: boolean;
}

export interface ReportColumn {
  id: string;
  name: string;
  label: string;
  dataType: 'string' | 'number' | 'date' | 'currency' | 'percentage' | 'boolean';
  isVisible: boolean;
  order: number;
  width?: number;
  alignment: 'left' | 'center' | 'right';
  formatting?: string;
  aggregation?: 'sum' | 'avg' | 'count' | 'min' | 'max';
}

export interface ScheduleConfig {
  frequency: 'daily' | 'weekly' | 'monthly' | 'quarterly' | 'yearly' | 'custom';
  interval: number;
  daysOfWeek?: number[];
  dayOfMonth?: number;
  monthOfYear?: number;
  time: string;
  timezone: string;
  startDate: string;
  endDate?: string;
  isActive: boolean;
  recipients: string[];
  emailSubject?: string;
  emailBody?: string;
}

export interface ReportExecution {
  id: string;
  reportId: string;
  reportName: string;
  status: 'queued' | 'running' | 'completed' | 'failed' | 'cancelled';
  startTime: string;
  endTime?: string;
  duration?: number;
  executedBy: string;
  parameters: Record<string, any>;
  
  // Results
  recordCount?: number;
  fileSize?: number;
  filePath?: string;
  downloadUrl?: string;
  
  // Error Information
  errorMessage?: string;
  errorCode?: string;
  stackTrace?: string;
  
  // Progress
  progressPercentage: number;
  currentStep?: string;
  estimatedTimeRemaining?: number;
  
  // Metadata
  createdAt: string;
  updatedAt: string;
}

export interface ReportTemplate {
  id: string;
  name: string;
  description: string;
  category: string;
  industry: string;
  
  // Template Configuration
  structure: ReportStructure;
  sampleData: any[];
  previewImage?: string;
  
  // Usage
  usageCount: number;
  rating: number;
  reviews: TemplateReview[];
  
  // Metadata
  version: string;
  author: string;
  createdAt: string;
  updatedAt: string;
  tags: string[];
  isPublic: boolean;
  isPremium: boolean;
}

export interface ReportStructure {
  sections: ReportSection[];
  charts: ReportChart[];
  tables: ReportTable[];
  styling: ReportStyling;
}

export interface ReportSection {
  id: string;
  name: string;
  type: 'header' | 'summary' | 'chart' | 'table' | 'text' | 'image';
  order: number;
  content: any;
  styling?: any;
}

export interface ReportChart {
  id: string;
  name: string;
  type: 'bar' | 'line' | 'pie' | 'doughnut' | 'area' | 'scatter' | 'gauge';
  dataSource: string;
  xAxis: string;
  yAxis: string[];
  colors: string[];
  options: any;
}

export interface ReportTable {
  id: string;
  name: string;
  dataSource: string;
  columns: ReportColumn[];
  sorting: { column: string; direction: 'asc' | 'desc' }[];
  grouping?: string[];
  totals?: string[];
}

export interface ReportStyling {
  theme: 'light' | 'dark' | 'corporate' | 'modern';
  primaryColor: string;
  secondaryColor: string;
  fontFamily: string;
  fontSize: number;
  headerStyle: any;
  tableStyle: any;
}

export interface TemplateReview {
  id: string;
  userId: string;
  userName: string;
  rating: number;
  comment: string;
  createdAt: string;
}

export interface DataImport {
  id: string;
  name: string;
  description: string;
  sourceType: 'csv' | 'excel' | 'json' | 'xml' | 'api' | 'database';
  
  // File Information
  fileName?: string;
  fileSize?: number;
  filePath?: string;
  
  // Import Configuration
  targetTable: string;
  mapping: FieldMapping[];
  validationRules: ValidationRule[];
  
  // Processing
  status: 'uploaded' | 'validating' | 'processing' | 'completed' | 'failed';
  totalRecords: number;
  processedRecords: number;
  validRecords: number;
  invalidRecords: number;
  duplicateRecords: number;
  
  // Results
  importedRecords: number;
  skippedRecords: number;
  errorRecords: number;
  errors: ImportError[];
  warnings: ImportWarning[];
  
  // Progress
  progressPercentage: number;
  currentStep: string;
  estimatedTimeRemaining?: number;
  
  // Metadata
  createdAt: string;
  createdBy: string;
  updatedAt: string;
  completedAt?: string;
  
  // Settings
  allowDuplicates: boolean;
  updateExisting: boolean;
  skipErrors: boolean;
  batchSize: number;
}

export interface FieldMapping {
  sourceField: string;
  targetField: string;
  dataType: 'string' | 'number' | 'date' | 'boolean' | 'email' | 'phone';
  isRequired: boolean;
  transformation?: string;
  defaultValue?: any;
}

export interface ValidationRule {
  field: string;
  rule: 'required' | 'unique' | 'format' | 'range' | 'custom';
  parameters: any;
  errorMessage: string;
}

export interface ImportError {
  row: number;
  field: string;
  value: any;
  error: string;
  severity: 'error' | 'warning';
}

export interface ImportWarning {
  row: number;
  field: string;
  value: any;
  warning: string;
  action: 'skipped' | 'corrected' | 'ignored';
}

export interface ReportDashboard {
  id: string;
  name: string;
  description: string;
  
  // Layout
  layout: DashboardLayout;
  widgets: DashboardWidget[];
  
  // Access Control
  visibility: 'public' | 'private' | 'shared';
  sharedWith: string[];
  
  // Refresh Settings
  autoRefresh: boolean;
  refreshInterval: number; // in minutes
  lastRefreshed: string;
  
  // Metadata
  createdAt: string;
  createdBy: string;
  updatedAt: string;
  updatedBy: string;
  tags: string[];
}

export interface DashboardLayout {
  columns: number;
  rows: number;
  gridSize: number;
  spacing: number;
}

export interface DashboardWidget {
  id: string;
  name: string;
  type: 'chart' | 'table' | 'metric' | 'text' | 'image' | 'iframe';
  reportId?: string;
  
  // Position and Size
  x: number;
  y: number;
  width: number;
  height: number;
  
  // Configuration
  config: any;
  refreshInterval?: number;
  
  // Data
  data?: any;
  lastUpdated?: string;
  
  // Styling
  styling: any;
}

export interface ReportStats {
  totalReports: number;
  myReports: number;
  sharedReports: number;
  scheduledReports: number;
  runningReports: number;
  failedReports: number;
  totalExecutions: number;
  avgExecutionTime: number;
  totalDownloads: number;
  storageUsed: number;
  popularReports: Report[];
  recentReports: Report[];
}