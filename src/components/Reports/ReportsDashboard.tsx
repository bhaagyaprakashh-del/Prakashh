import React, { useState, useMemo } from 'react';
import {
  Plus,
  Search,
  BarChart3,
  PieChart,
  LineChart,
  TrendingUp,
  DollarSign,
  Users,
  Calendar,
  Clock,
  Download,
  Eye,
  Edit,
  Play,
  Pause,
  RefreshCw,
  Filter,
  Settings,
  Star,
  Award,
  Target,
  Activity,
  Zap,
  CheckCircle,
  XCircle,
  AlertTriangle,
  FileText,
  Database,
  Globe,
  Lock,
  Share2,
  MoreVertical
} from 'lucide-react';
import { Report, ReportExecution } from '../../types/reports';

const sampleReports: Report[] = [
  {
    id: '1',
    name: 'Monthly Sales Performance',
    description: 'Comprehensive sales analysis with lead conversion and revenue metrics',
    category: 'sales',
    type: 'standard',
    format: 'pdf',
    dataSource: 'sales_data',
    parameters: [],
    filters: [],
    columns: [],
    isScheduled: true,
    scheduleConfig: {
      frequency: 'monthly',
      interval: 1,
      dayOfMonth: 1,
      time: '09:00',
      timezone: 'Asia/Kolkata',
      startDate: '2024-01-01',
      isActive: true,
      recipients: ['sales@ramnirmalchits.com'],
      emailSubject: 'Monthly Sales Report - {month} {year}'
    },
    visibility: 'shared',
    sharedWith: ['sales-team', 'management'],
    permissions: {
      canView: ['sales-team', 'management'],
      canEdit: ['sales-manager'],
      canDelete: ['admin'],
      canSchedule: ['sales-manager']
    },
    executionTime: 45,
    lastRunTime: '2024-03-01T09:00:00',
    lastRunStatus: 'success',
    lastRunBy: 'system',
    runCount: 15,
    fileSize: 2048576,
    downloadCount: 89,
    createdAt: '2024-01-01',
    createdBy: 'rajesh.kumar@ramnirmalchits.com',
    updatedAt: '2024-03-01',
    updatedBy: 'system',
    tags: ['sales', 'monthly', 'performance'],
    notes: 'Key performance indicators for sales team',
    dependencies: [],
    dependents: []
  },
  {
    id: '2',
    name: 'Chit Fund Portfolio Analysis',
    description: 'Detailed analysis of all chit fund groups, collections, and member performance',
    category: 'operational',
    type: 'standard',
    format: 'excel',
    dataSource: 'chit_operations',
    parameters: [],
    filters: [],
    columns: [],
    isScheduled: true,
    scheduleConfig: {
      frequency: 'weekly',
      interval: 1,
      daysOfWeek: [1], // Monday
      time: '08:00',
      timezone: 'Asia/Kolkata',
      startDate: '2024-01-01',
      isActive: true,
      recipients: ['operations@ramnirmalchits.com'],
      emailSubject: 'Weekly Chit Fund Portfolio Report'
    },
    visibility: 'shared',
    sharedWith: ['operations-team', 'management'],
    permissions: {
      canView: ['operations-team', 'management'],
      canEdit: ['operations-manager'],
      canDelete: ['admin'],
      canSchedule: ['operations-manager']
    },
    executionTime: 120,
    lastRunTime: '2024-03-11T08:00:00',
    lastRunStatus: 'success',
    lastRunBy: 'system',
    runCount: 42,
    fileSize: 5242880,
    downloadCount: 156,
    createdAt: '2024-01-01',
    createdBy: 'operations@ramnirmalchits.com',
    updatedAt: '2024-03-11',
    updatedBy: 'system',
    tags: ['chit-fund', 'portfolio', 'weekly'],
    notes: 'Comprehensive chit fund operations overview',
    dependencies: [],
    dependents: []
  },
  {
    id: '3',
    name: 'Employee Attendance Summary',
    description: 'Monthly attendance report with overtime, leaves, and productivity metrics',
    category: 'hr',
    type: 'standard',
    format: 'pdf',
    dataSource: 'hr_attendance',
    parameters: [],
    filters: [],
    columns: [],
    isScheduled: true,
    scheduleConfig: {
      frequency: 'monthly',
      interval: 1,
      dayOfMonth: 5,
      time: '10:00',
      timezone: 'Asia/Kolkata',
      startDate: '2024-01-01',
      isActive: true,
      recipients: ['hr@ramnirmalchits.com'],
      emailSubject: 'Monthly Attendance Report - {month} {year}'
    },
    visibility: 'private',
    sharedWith: [],
    permissions: {
      canView: ['hr-team', 'management'],
      canEdit: ['hr-manager'],
      canDelete: ['admin'],
      canSchedule: ['hr-manager']
    },
    executionTime: 30,
    lastRunTime: '2024-03-05T10:00:00',
    lastRunStatus: 'success',
    lastRunBy: 'system',
    runCount: 8,
    fileSize: 1048576,
    downloadCount: 34,
    createdAt: '2024-01-01',
    createdBy: 'hr@ramnirmalchits.com',
    updatedAt: '2024-03-05',
    updatedBy: 'system',
    tags: ['hr', 'attendance', 'monthly'],
    notes: 'HR compliance and attendance tracking',
    dependencies: [],
    dependents: []
  },
  {
    id: '4',
    name: 'Financial Compliance Report',
    description: 'Regulatory compliance report for financial authorities',
    category: 'compliance',
    type: 'standard',
    format: 'pdf',
    dataSource: 'financial_data',
    parameters: [],
    filters: [],
    columns: [],
    isScheduled: true,
    scheduleConfig: {
      frequency: 'quarterly',
      interval: 1,
      dayOfMonth: 15,
      time: '09:00',
      timezone: 'Asia/Kolkata',
      startDate: '2024-01-01',
      isActive: true,
      recipients: ['compliance@ramnirmalchits.com'],
      emailSubject: 'Quarterly Compliance Report - Q{quarter} {year}'
    },
    visibility: 'private',
    sharedWith: [],
    permissions: {
      canView: ['compliance-team', 'management'],
      canEdit: ['compliance-manager'],
      canDelete: ['admin'],
      canSchedule: ['compliance-manager']
    },
    executionTime: 180,
    lastRunTime: '2024-01-15T09:00:00',
    lastRunStatus: 'success',
    lastRunBy: 'system',
    runCount: 4,
    fileSize: 3145728,
    downloadCount: 12,
    createdAt: '2024-01-01',
    createdBy: 'compliance@ramnirmalchits.com',
    updatedAt: '2024-01-15',
    updatedBy: 'system',
    tags: ['compliance', 'quarterly', 'regulatory'],
    notes: 'Critical compliance report for regulatory submission',
    dependencies: [],
    dependents: []
  },
  {
    id: '5',
    name: 'Customer Acquisition Analysis',
    description: 'Analysis of customer acquisition channels, costs, and conversion rates',
    category: 'sales',
    type: 'custom',
    format: 'excel',
    dataSource: 'customer_data',
    parameters: [],
    filters: [],
    columns: [],
    isScheduled: false,
    visibility: 'shared',
    sharedWith: ['marketing-team', 'sales-team'],
    permissions: {
      canView: ['marketing-team', 'sales-team'],
      canEdit: ['marketing-manager'],
      canDelete: ['admin'],
      canSchedule: ['marketing-manager']
    },
    executionTime: 60,
    lastRunTime: '2024-03-10T14:30:00',
    lastRunStatus: 'success',
    lastRunBy: 'priya.sharma@ramnirmalchits.com',
    runCount: 23,
    fileSize: 1572864,
    downloadCount: 67,
    createdAt: '2024-02-01',
    createdBy: 'priya.sharma@ramnirmalchits.com',
    updatedAt: '2024-03-10',
    updatedBy: 'priya.sharma@ramnirmalchits.com',
    tags: ['customer', 'acquisition', 'marketing'],
    notes: 'Custom analysis for marketing optimization',
    dependencies: [],
    dependents: []
  }
];

const sampleExecutions: ReportExecution[] = [
  {
    id: '1',
    reportId: '1',
    reportName: 'Monthly Sales Performance',
    status: 'completed',
    startTime: '2024-03-01T09:00:00',
    endTime: '2024-03-01T09:00:45',
    duration: 45,
    executedBy: 'system',
    parameters: { month: 'February', year: '2024' },
    recordCount: 1250,
    fileSize: 2048576,
    filePath: '/reports/monthly-sales-feb-2024.pdf',
    downloadUrl: '/download/monthly-sales-feb-2024.pdf',
    progressPercentage: 100,
    createdAt: '2024-03-01T09:00:00',
    updatedAt: '2024-03-01T09:00:45'
  },
  {
    id: '2',
    reportId: '2',
    reportName: 'Chit Fund Portfolio Analysis',
    status: 'running',
    startTime: '2024-03-15T14:30:00',
    executedBy: 'operations@ramnirmalchits.com',
    parameters: { week: '11', year: '2024' },
    progressPercentage: 65,
    currentStep: 'Processing member data',
    estimatedTimeRemaining: 42,
    createdAt: '2024-03-15T14:30:00',
    updatedAt: '2024-03-15T14:32:15'
  },
  {
    id: '3',
    reportId: '3',
    reportName: 'Employee Attendance Summary',
    status: 'failed',
    startTime: '2024-03-05T10:00:00',
    endTime: '2024-03-05T10:02:30',
    duration: 150,
    executedBy: 'system',
    parameters: { month: 'February', year: '2024' },
    errorMessage: 'Database connection timeout',
    errorCode: 'DB_TIMEOUT_001',
    progressPercentage: 45,
    currentStep: 'Failed during data extraction',
    createdAt: '2024-03-05T10:00:00',
    updatedAt: '2024-03-05T10:02:30'
  }
];

const ReportCard: React.FC<{ report: Report }> = React.memo(({ report }) => {
  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'sales': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'financial': return 'bg-green-100 text-green-800 border-green-200';
      case 'operational': return 'bg-purple-100 text-purple-800 border-purple-200';
      case 'hr': return 'bg-orange-100 text-orange-800 border-orange-200';
      case 'compliance': return 'bg-red-100 text-red-800 border-red-200';
      case 'custom': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'success': return 'bg-green-100 text-green-800 border-green-200';
      case 'failed': return 'bg-red-100 text-red-800 border-red-200';
      case 'running': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'cancelled': return 'bg-gray-100 text-gray-800 border-gray-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getFormatIcon = (format: string) => {
    switch (format) {
      case 'pdf': return FileText;
      case 'excel': return Database;
      case 'csv': return FileText;
      case 'json': return Database;
      case 'html': return Globe;
      default: return FileText;
    }
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const FormatIcon = getFormatIcon(report.format);

  return (
    <div className="bg-slate-800/40 backdrop-blur-xl rounded-2xl p-6 border border-yellow-400/30 hover:border-yellow-400/50 transition-all">
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center space-x-3">
          <div className="p-3 bg-blue-500/20 rounded-xl border border-yellow-400/30">
            <BarChart3 className="h-6 w-6 text-blue-400" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-slate-50">{report.name}</h3>
            <p className="text-sm text-slate-400">{report.description}</p>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium border ${getCategoryColor(report.category)}`}>
            {report.category.toUpperCase()}
          </span>
          <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium border ${getStatusColor(report.lastRunStatus)}`}>
            {report.lastRunStatus.toUpperCase()}
          </span>
          <button className="p-2 text-slate-400 hover:text-slate-50 hover:bg-slate-700/50 rounded-lg transition-all">
            <MoreVertical className="h-4 w-4" />
          </button>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 mb-4">
        <div className="space-y-2">
          <div className="flex items-center justify-between text-sm">
            <span className="text-slate-400">Format</span>
            <div className="flex items-center space-x-1">
              <FormatIcon className="h-3 w-3 text-slate-400" />
              <span className="text-slate-50 font-medium uppercase">{report.format}</span>
            </div>
          </div>
          <div className="flex items-center justify-between text-sm">
            <span className="text-slate-400">Run Count</span>
            <span className="text-slate-50 font-medium">{report.runCount}</span>
          </div>
          <div className="flex items-center justify-between text-sm">
            <span className="text-slate-400">Downloads</span>
            <span className="text-slate-50 font-medium">{report.downloadCount}</span>
          </div>
        </div>
        <div className="space-y-2">
          <div className="flex items-center justify-between text-sm">
            <span className="text-slate-400">File Size</span>
            <span className="text-slate-300">{report.fileSize ? formatFileSize(report.fileSize) : 'N/A'}</span>
          </div>
          <div className="flex items-center justify-between text-sm">
            <span className="text-slate-400">Execution Time</span>
            <span className="text-slate-300">{report.executionTime}s</span>
          </div>
          <div className="flex items-center justify-between text-sm">
            <span className="text-slate-400">Visibility</span>
            <div className="flex items-center space-x-1">
              {report.visibility === 'private' ? (
                <Lock className="h-3 w-3 text-slate-400" />
              ) : (
                <Share2 className="h-3 w-3 text-slate-400" />
              )}
              <span className="text-slate-300 capitalize">{report.visibility}</span>
            </div>
          </div>
        </div>
      </div>

      {report.isScheduled && report.scheduleConfig && (
        <div className="mb-4 p-3 bg-blue-500/10 border border-blue-500/30 rounded-lg">
          <div className="flex items-center justify-between text-sm">
            <span className="text-blue-400">Scheduled</span>
            <span className="text-blue-300 capitalize">
              {report.scheduleConfig.frequency} at {report.scheduleConfig.time}
            </span>
          </div>
        </div>
      )}

      {/* Tags */}
      {report.tags.length > 0 && (
        <div className="mb-4">
          <div className="flex flex-wrap gap-1">
            {report.tags.slice(0, 3).map((tag, index) => (
              <span key={index} className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-blue-100 text-blue-800 border border-blue-200">
                #{tag}
              </span>
            ))}
            {report.tags.length > 3 && (
              <span className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-slate-100 text-slate-800 border border-slate-200">
                +{report.tags.length - 3} more
              </span>
            )}
          </div>
        </div>
      )}

      <div className="flex justify-between items-center pt-4 border-t border-yellow-400/20">
        <div className="flex items-center text-xs text-slate-500">
          <Calendar className="h-3 w-3 mr-1" />
          <span>Last run {report.lastRunTime ? new Date(report.lastRunTime).toLocaleDateString() : 'Never'}</span>
        </div>
        <div className="flex space-x-2">
          <button className="p-2 text-slate-400 hover:text-blue-400 hover:bg-blue-500/10 rounded-lg transition-all">
            <Eye className="h-4 w-4" />
          </button>
          <button className="p-2 text-slate-400 hover:text-green-400 hover:bg-green-500/10 rounded-lg transition-all">
            <Play className="h-4 w-4" />
          </button>
          <button className="p-2 text-slate-400 hover:text-purple-400 hover:bg-purple-500/10 rounded-lg transition-all">
            <Download className="h-4 w-4" />
          </button>
          <button className="p-2 text-slate-400 hover:text-orange-400 hover:bg-orange-500/10 rounded-lg transition-all">
            <Edit className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );
});

const ExecutionCard: React.FC<{ execution: ReportExecution }> = React.memo(({ execution }) => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'bg-green-100 text-green-800 border-green-200';
      case 'running': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'failed': return 'bg-red-100 text-red-800 border-red-200';
      case 'queued': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'cancelled': return 'bg-gray-100 text-gray-800 border-gray-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed': return CheckCircle;
      case 'running': return Activity;
      case 'failed': return XCircle;
      case 'queued': return Clock;
      case 'cancelled': return AlertTriangle;
      default: return Clock;
    }
  };

  const StatusIcon = getStatusIcon(execution.status);

  return (
    <div className="bg-slate-800/40 backdrop-blur-xl rounded-2xl p-6 border border-yellow-400/30 hover:border-yellow-400/50 transition-all">
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center space-x-3">
          <div className="p-3 bg-green-500/20 rounded-xl border border-yellow-400/30">
            <StatusIcon className="h-6 w-6 text-green-400" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-slate-50">{execution.reportName}</h3>
            <p className="text-sm text-slate-400">Executed by {execution.executedBy}</p>
          </div>
        </div>
        <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium border ${getStatusColor(execution.status)}`}>
          {execution.status.toUpperCase()}
        </span>
      </div>

      <div className="space-y-3 mb-4">
        <div className="flex items-center justify-between text-sm">
          <span className="text-slate-400">Start Time</span>
          <span className="text-slate-50">{new Date(execution.startTime).toLocaleString()}</span>
        </div>
        {execution.endTime && (
          <div className="flex items-center justify-between text-sm">
            <span className="text-slate-400">Duration</span>
            <span className="text-slate-50">{execution.duration}s</span>
          </div>
        )}
        {execution.recordCount && (
          <div className="flex items-center justify-between text-sm">
            <span className="text-slate-400">Records</span>
            <span className="text-slate-50">{execution.recordCount.toLocaleString()}</span>
          </div>
        )}
      </div>

      {execution.status === 'running' && (
        <div className="mb-4">
          <div className="flex justify-between text-sm text-slate-400 mb-1">
            <span>Progress</span>
            <span>{execution.progressPercentage}%</span>
          </div>
          <div className="w-full bg-slate-700/50 rounded-full h-2 border border-yellow-400/20">
            <div
              className="bg-gradient-to-r from-blue-500 to-green-500 h-2 rounded-full transition-all duration-300"
              style={{ width: `${execution.progressPercentage}%` }}
            ></div>
          </div>
          {execution.currentStep && (
            <p className="text-xs text-slate-400 mt-1">{execution.currentStep}</p>
          )}
        </div>
      )}

      {execution.errorMessage && (
        <div className="mb-4 p-3 bg-red-500/10 border border-red-500/30 rounded-lg">
          <p className="text-sm text-red-400">{execution.errorMessage}</p>
          {execution.errorCode && (
            <p className="text-xs text-red-300 mt-1">Error Code: {execution.errorCode}</p>
          )}
        </div>
      )}

      <div className="flex justify-between items-center pt-4 border-t border-yellow-400/20">
        <div className="flex items-center text-xs text-slate-500">
          <Clock className="h-3 w-3 mr-1" />
          <span>Started {new Date(execution.startTime).toLocaleDateString()}</span>
        </div>
        <div className="flex space-x-2">
          <button className="p-2 text-slate-400 hover:text-blue-400 hover:bg-blue-500/10 rounded-lg transition-all">
            <Eye className="h-4 w-4" />
          </button>
          {execution.downloadUrl && (
            <button className="p-2 text-slate-400 hover:text-green-400 hover:bg-green-500/10 rounded-lg transition-all">
              <Download className="h-4 w-4" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
});

export const ReportsDashboard: React.FC = () => {
  const [reports] = useState<Report[]>(sampleReports);
  const [executions] = useState<ReportExecution[]>(sampleExecutions);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategory, setFilterCategory] = useState<string>('all');
  const [activeTab, setActiveTab] = useState('overview');

  const filteredReports = useMemo(() => reports.filter(report => {
    const matchesSearch = report.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         report.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         report.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesCategory = filterCategory === 'all' || report.category === filterCategory;
    
    return matchesSearch && matchesCategory;
  }), [reports, searchTerm, filterCategory]);

  const stats = useMemo(() => ({
    totalReports: reports.length,
    scheduledReports: reports.filter(r => r.isScheduled).length,
    runningReports: executions.filter(e => e.status === 'running').length,
    failedReports: executions.filter(e => e.status === 'failed').length,
    completedToday: executions.filter(e => e.status === 'completed' && 
      new Date(e.startTime).toDateString() === new Date().toDateString()).length,
    totalExecutions: executions.length,
    avgExecutionTime: executions.filter(e => e.duration).length > 0 ? 
      executions.filter(e => e.duration).reduce((sum, e) => sum + (e.duration || 0), 0) / executions.filter(e => e.duration).length : 0,
    totalDownloads: reports.reduce((sum, r) => sum + r.downloadCount, 0),
    storageUsed: reports.reduce((sum, r) => sum + (r.fileSize || 0), 0),
    salesReports: reports.filter(r => r.category === 'sales').length,
    hrReports: reports.filter(r => r.category === 'hr').length,
    operationalReports: reports.filter(r => r.category === 'operational').length,
    complianceReports: reports.filter(r => r.category === 'compliance').length
  }), [reports, executions]);

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const tabs = [
    { id: 'overview', name: 'Overview', icon: BarChart3 },
    { id: 'reports', name: 'All Reports', icon: FileText, count: reports.length },
    { id: 'executions', name: 'Recent Executions', icon: Activity, count: executions.length }
  ];

  return (
    <div className="h-full flex flex-col bg-slate-900 overflow-hidden">
      {/* Header */}
      <div className="flex justify-between items-center p-4 border-b border-yellow-400/30 flex-shrink-0">
        <div>
          <h1 className="text-2xl font-bold text-slate-50">Reports Dashboard</h1>
          <p className="mt-1 text-sm text-slate-400">
            Central hub for all business reports, analytics, and data insights
          </p>
        </div>
        <div className="flex space-x-3">
          <button className="inline-flex items-center px-4 py-2 border border-yellow-400/30 text-sm font-medium rounded-lg text-slate-50 bg-slate-700/50 hover:bg-slate-700 transition-all backdrop-blur-sm">
            <RefreshCw className="h-4 w-4 mr-2" />
            Refresh All
          </button>
          <button className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-lg shadow-sm text-white bg-blue-600 hover:bg-blue-700 transition-all">
            <Plus className="h-4 w-4 mr-2" />
            Create Report
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="border-b border-yellow-400/30 bg-slate-800/40 backdrop-blur-xl flex-shrink-0">
        <nav className="flex space-x-4 px-4 overflow-x-auto" aria-label="Tabs">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`${
                  activeTab === tab.id
                    ? 'border-blue-500 text-blue-400'
                    : 'border-transparent text-slate-400 hover:text-slate-300 hover:border-slate-300'
                } whitespace-nowrap py-3 px-2 border-b-2 font-medium text-sm flex items-center transition-all`}
              >
                <Icon className="h-4 w-4 mr-2" />
                {tab.name}
                {tab.count && (
                  <span className="ml-2 bg-slate-700/50 text-slate-300 px-2 py-1 rounded-full text-xs">
                    {tab.count}
                  </span>
                )}
              </button>
            );
          })}
        </nav>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto p-4 space-y-6 scrollbar-none">
        {activeTab === 'overview' && (
          <>
            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 lg:grid-cols-12 gap-4">
              <div className="bg-slate-800/40 backdrop-blur-xl p-4 rounded-xl border border-yellow-400/30">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-slate-400">Total Reports</p>
                    <p className="text-2xl font-bold text-slate-50">{stats.totalReports}</p>
                  </div>
                  <FileText className="h-8 w-8 text-blue-400" />
                </div>
              </div>
              <div className="bg-slate-800/40 backdrop-blur-xl p-4 rounded-xl border border-yellow-400/30">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-slate-400">Scheduled</p>
                    <p className="text-2xl font-bold text-purple-400">{stats.scheduledReports}</p>
                  </div>
                  <Calendar className="h-8 w-8 text-purple-400" />
                </div>
              </div>
              <div className="bg-slate-800/40 backdrop-blur-xl p-4 rounded-xl border border-yellow-400/30">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-slate-400">Running</p>
                    <p className="text-2xl font-bold text-blue-400">{stats.runningReports}</p>
                  </div>
                  <Activity className="h-8 w-8 text-blue-400" />
                </div>
              </div>
              <div className="bg-slate-800/40 backdrop-blur-xl p-4 rounded-xl border border-yellow-400/30">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-slate-400">Failed</p>
                    <p className="text-2xl font-bold text-red-400">{stats.failedReports}</p>
                  </div>
                  <XCircle className="h-8 w-8 text-red-400" />
                </div>
              </div>
              <div className="bg-slate-800/40 backdrop-blur-xl p-4 rounded-xl border border-yellow-400/30">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-slate-400">Completed Today</p>
                    <p className="text-2xl font-bold text-green-400">{stats.completedToday}</p>
                  </div>
                  <CheckCircle className="h-8 w-8 text-green-400" />
                </div>
              </div>
              <div className="bg-slate-800/40 backdrop-blur-xl p-4 rounded-xl border border-yellow-400/30">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-slate-400">Sales Reports</p>
                    <p className="text-2xl font-bold text-blue-400">{stats.salesReports}</p>
                  </div>
                  <TrendingUp className="h-8 w-8 text-blue-400" />
                </div>
              </div>
              <div className="bg-slate-800/40 backdrop-blur-xl p-4 rounded-xl border border-yellow-400/30">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-slate-400">HR Reports</p>
                    <p className="text-2xl font-bold text-orange-400">{stats.hrReports}</p>
                  </div>
                  <Users className="h-8 w-8 text-orange-400" />
                </div>
              </div>
              <div className="bg-slate-800/40 backdrop-blur-xl p-4 rounded-xl border border-yellow-400/30">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-slate-400">Operational</p>
                    <p className="text-2xl font-bold text-emerald-400">{stats.operationalReports}</p>
                  </div>
                  <Target className="h-8 w-8 text-emerald-400" />
                </div>
              </div>
              <div className="bg-slate-800/40 backdrop-blur-xl p-4 rounded-xl border border-yellow-400/30">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-slate-400">Compliance</p>
                    <p className="text-2xl font-bold text-red-400">{stats.complianceReports}</p>
                  </div>
                  <Award className="h-8 w-8 text-red-400" />
                </div>
              </div>
              <div className="bg-slate-800/40 backdrop-blur-xl p-4 rounded-xl border border-yellow-400/30">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-slate-400">Avg Execution</p>
                    <p className="text-2xl font-bold text-yellow-400">{stats.avgExecutionTime.toFixed(1)}s</p>
                  </div>
                  <Clock className="h-8 w-8 text-yellow-400" />
                </div>
              </div>
              <div className="bg-slate-800/40 backdrop-blur-xl p-4 rounded-xl border border-yellow-400/30">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-slate-400">Downloads</p>
                    <p className="text-2xl font-bold text-indigo-400">{stats.totalDownloads}</p>
                  </div>
                  <Download className="h-8 w-8 text-indigo-400" />
                </div>
              </div>
              <div className="bg-slate-800/40 backdrop-blur-xl p-4 rounded-xl border border-yellow-400/30">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-slate-400">Storage Used</p>
                    <p className="text-xl font-bold text-pink-400">{formatFileSize(stats.storageUsed)}</p>
                  </div>
                  <Database className="h-8 w-8 text-pink-400" />
                </div>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="bg-slate-800/40 backdrop-blur-xl rounded-2xl p-6 border border-yellow-400/30 hover:border-yellow-400/50 transition-all cursor-pointer">
                <div className="flex items-center space-x-3 mb-4">
                  <div className="p-3 bg-blue-500/20 rounded-xl border border-yellow-400/30">
                    <Plus className="h-6 w-6 text-blue-400" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-slate-50">Create New Report</h3>
                    <p className="text-sm text-slate-400">Build custom reports with our drag-and-drop builder</p>
                  </div>
                </div>
              </div>

              <div className="bg-slate-800/40 backdrop-blur-xl rounded-2xl p-6 border border-yellow-400/30 hover:border-yellow-400/50 transition-all cursor-pointer">
                <div className="flex items-center space-x-3 mb-4">
                  <div className="p-3 bg-green-500/20 rounded-xl border border-yellow-400/30">
                    <Calendar className="h-6 w-6 text-green-400" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-slate-50">Schedule Reports</h3>
                    <p className="text-sm text-slate-400">Automate report generation and delivery</p>
                  </div>
                </div>
              </div>

              <div className="bg-slate-800/40 backdrop-blur-xl rounded-2xl p-6 border border-yellow-400/30 hover:border-yellow-400/50 transition-all cursor-pointer">
                <div className="flex items-center space-x-3 mb-4">
                  <div className="p-3 bg-purple-500/20 rounded-xl border border-yellow-400/30">
                    <Database className="h-6 w-6 text-purple-400" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-slate-50">Import Data</h3>
                    <p className="text-sm text-slate-400">Upload and process data from various sources</p>
                  </div>
                </div>
              </div>

              <div className="bg-slate-800/40 backdrop-blur-xl rounded-2xl p-6 border border-yellow-400/30 hover:border-yellow-400/50 transition-all cursor-pointer">
                <div className="flex items-center space-x-3 mb-4">
                  <div className="p-3 bg-orange-500/20 rounded-xl border border-yellow-400/30">
                    <Star className="h-6 w-6 text-orange-400" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-slate-50">Report Templates</h3>
                    <p className="text-sm text-slate-400">Browse and use pre-built report templates</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Charts Section */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="bg-slate-800/40 backdrop-blur-xl rounded-2xl p-6 border border-yellow-400/30">
                <h3 className="text-lg font-semibold text-slate-50 mb-4 flex items-center">
                  <BarChart3 className="h-5 w-5 mr-2" />
                  Report Usage Trends
                </h3>
                <div className="h-64 flex items-center justify-center border-2 border-dashed border-yellow-400/30 rounded-xl">
                  <div className="text-center">
                    <BarChart3 className="h-12 w-12 mx-auto text-slate-400 mb-2" />
                    <p className="text-slate-400">Usage Trends Chart</p>
                    <p className="text-slate-500 text-sm">Interactive chart coming soon</p>
                  </div>
                </div>
              </div>

              <div className="bg-slate-800/40 backdrop-blur-xl rounded-2xl p-6 border border-yellow-400/30">
                <h3 className="text-lg font-semibold text-slate-50 mb-4 flex items-center">
                  <PieChart className="h-5 w-5 mr-2" />
                  Report Categories
                </h3>
                <div className="h-64 flex items-center justify-center border-2 border-dashed border-yellow-400/30 rounded-xl">
                  <div className="text-center">
                    <PieChart className="h-12 w-12 mx-auto text-slate-400 mb-2" />
                    <p className="text-slate-400">Category Distribution</p>
                    <p className="text-slate-500 text-sm">Interactive chart coming soon</p>
                  </div>
                </div>
              </div>
            </div>
          </>
        )}

        {activeTab === 'reports' && (
          <>
            {/* Filters */}
            <div className="bg-slate-800/40 backdrop-blur-xl rounded-xl p-4 border border-yellow-400/30">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-500 h-4 w-4" />
                  <input
                    type="text"
                    placeholder="Search reports..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 pr-4 py-2 bg-slate-700/50 border border-yellow-400/30 rounded-lg w-full text-slate-50 placeholder-slate-400 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 backdrop-blur-sm"
                  />
                </div>
                <select
                  value={filterCategory}
                  onChange={(e) => setFilterCategory(e.target.value)}
                  className="px-3 py-2 bg-slate-700/50 border border-yellow-400/30 rounded-lg text-slate-50 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 backdrop-blur-sm"
                >
                  <option value="all">All Categories</option>
                  <option value="sales">Sales</option>
                  <option value="financial">Financial</option>
                  <option value="operational">Operational</option>
                  <option value="hr">HR</option>
                  <option value="compliance">Compliance</option>
                  <option value="custom">Custom</option>
                </select>
                <div className="text-sm text-slate-400">
                  Showing: <span className="font-semibold text-slate-50">{filteredReports.length}</span> reports
                </div>
              </div>
            </div>

            {/* Reports Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
              {filteredReports.map((report) => (
                <ReportCard key={report.id} report={report} />
              ))}
            </div>
          </>
        )}

        {activeTab === 'executions' && (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {executions.map((execution) => (
              <ExecutionCard key={execution.id} execution={execution} />
            ))}
          </div>
        )}

        {filteredReports.length === 0 && activeTab === 'reports' && (
          <div className="text-center py-12">
            <FileText className="h-12 w-12 mx-auto text-slate-500 mb-4" />
            <h3 className="text-lg font-medium text-slate-50 mb-2">No reports found</h3>
            <p className="text-sm text-slate-400">Try adjusting your search criteria or create a new report.</p>
          </div>
        )}
      </div>
    </div>
  );
};