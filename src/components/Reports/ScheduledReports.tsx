import React, { useState, useMemo } from 'react';
import {
  Plus,
  Search,
  Edit,
  Trash2,
  Eye,
  Play,
  Pause,
  Calendar,
  Clock,
  Users,
  Mail,
  CheckCircle,
  XCircle,
  AlertTriangle,
  Activity,
  Settings,
  Download,
  Send,
  Bell,
  Target,
  Award,
  TrendingUp,
  Zap,
  MoreVertical,
  RefreshCw,
  Filter,
  FileText,
  Database,
  Globe
} from 'lucide-react';
import { Report, ScheduleConfig } from '../../types/reports';

const sampleScheduledReports: Report[] = [
  {
    id: '1',
    name: 'Daily Sales Summary',
    description: 'Daily sales performance and lead conversion metrics',
    category: 'sales',
    type: 'standard',
    format: 'pdf',
    dataSource: 'daily_sales',
    parameters: [],
    filters: [],
    columns: [],
    isScheduled: true,
    scheduleConfig: {
      frequency: 'daily',
      interval: 1,
      time: '08:00',
      timezone: 'Asia/Kolkata',
      startDate: '2024-01-01',
      isActive: true,
      recipients: ['sales@ramnirmalchits.com', 'management@ramnirmalchits.com'],
      emailSubject: 'Daily Sales Report - {date}',
      emailBody: 'Please find attached the daily sales summary report.'
    },
    visibility: 'shared',
    sharedWith: ['sales-team', 'management'],
    permissions: {
      canView: ['sales-team', 'management'],
      canEdit: ['sales-manager'],
      canDelete: ['admin'],
      canSchedule: ['sales-manager']
    },
    executionTime: 30,
    lastRunTime: '2024-03-15T08:00:00',
    lastRunStatus: 'success',
    lastRunBy: 'system',
    runCount: 74,
    fileSize: 1048576,
    downloadCount: 245,
    createdAt: '2024-01-01',
    createdBy: 'sales@ramnirmalchits.com',
    updatedAt: '2024-03-15',
    updatedBy: 'system',
    tags: ['daily', 'sales', 'automated'],
    notes: 'Critical daily report for sales tracking',
    dependencies: [],
    dependents: []
  },
  {
    id: '2',
    name: 'Weekly Chit Fund Collections',
    description: 'Weekly collection summary across all branches and groups',
    category: 'operational',
    type: 'standard',
    format: 'excel',
    dataSource: 'collections_data',
    parameters: [],
    filters: [],
    columns: [],
    isScheduled: true,
    scheduleConfig: {
      frequency: 'weekly',
      interval: 1,
      daysOfWeek: [1], // Monday
      time: '09:00',
      timezone: 'Asia/Kolkata',
      startDate: '2024-01-01',
      isActive: true,
      recipients: ['operations@ramnirmalchits.com', 'finance@ramnirmalchits.com'],
      emailSubject: 'Weekly Collections Report - Week {week_number}',
      emailBody: 'Weekly collections summary attached for your review.'
    },
    visibility: 'shared',
    sharedWith: ['operations-team', 'finance-team'],
    permissions: {
      canView: ['operations-team', 'finance-team'],
      canEdit: ['operations-manager'],
      canDelete: ['admin'],
      canSchedule: ['operations-manager']
    },
    executionTime: 120,
    lastRunTime: '2024-03-11T09:00:00',
    lastRunStatus: 'success',
    lastRunBy: 'system',
    runCount: 11,
    fileSize: 2097152,
    downloadCount: 89,
    createdAt: '2024-01-01',
    createdBy: 'operations@ramnirmalchits.com',
    updatedAt: '2024-03-11',
    updatedBy: 'system',
    tags: ['weekly', 'collections', 'operations'],
    notes: 'Essential weekly collections tracking',
    dependencies: [],
    dependents: []
  },
  {
    id: '3',
    name: 'Monthly HR Compliance Report',
    description: 'Monthly HR compliance and statutory reporting',
    category: 'hr',
    type: 'standard',
    format: 'pdf',
    dataSource: 'hr_compliance',
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
      recipients: ['hr@ramnirmalchits.com', 'compliance@ramnirmalchits.com'],
      emailSubject: 'Monthly HR Compliance Report - {month} {year}',
      emailBody: 'Monthly HR compliance report for regulatory submission.'
    },
    visibility: 'private',
    sharedWith: [],
    permissions: {
      canView: ['hr-team', 'compliance-team'],
      canEdit: ['hr-manager'],
      canDelete: ['admin'],
      canSchedule: ['hr-manager']
    },
    executionTime: 180,
    lastRunTime: '2024-03-05T10:00:00',
    lastRunStatus: 'success',
    lastRunBy: 'system',
    runCount: 3,
    fileSize: 3145728,
    downloadCount: 15,
    createdAt: '2024-01-01',
    createdBy: 'hr@ramnirmalchits.com',
    updatedAt: '2024-03-05',
    updatedBy: 'system',
    tags: ['monthly', 'hr', 'compliance'],
    notes: 'Critical compliance report for authorities',
    dependencies: [],
    dependents: []
  },
  {
    id: '4',
    name: 'Quarterly Financial Summary',
    description: 'Comprehensive quarterly financial performance report',
    category: 'financial',
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
      recipients: ['finance@ramnirmalchits.com', 'management@ramnirmalchits.com'],
      emailSubject: 'Quarterly Financial Report - Q{quarter} {year}',
      emailBody: 'Quarterly financial performance summary for board review.'
    },
    visibility: 'private',
    sharedWith: [],
    permissions: {
      canView: ['finance-team', 'management'],
      canEdit: ['finance-manager'],
      canDelete: ['admin'],
      canSchedule: ['finance-manager']
    },
    executionTime: 300,
    lastRunTime: '2024-01-15T09:00:00',
    lastRunStatus: 'success',
    lastRunBy: 'system',
    runCount: 1,
    fileSize: 5242880,
    downloadCount: 8,
    createdAt: '2024-01-01',
    createdBy: 'finance@ramnirmalchits.com',
    updatedAt: '2024-01-15',
    updatedBy: 'system',
    tags: ['quarterly', 'financial', 'board'],
    notes: 'Board presentation report',
    dependencies: [],
    dependents: []
  },
  {
    id: '5',
    name: 'Agent Performance Weekly',
    description: 'Weekly agent performance and ranking report',
    category: 'sales',
    type: 'standard',
    format: 'html',
    dataSource: 'agent_performance',
    parameters: [],
    filters: [],
    columns: [],
    isScheduled: true,
    scheduleConfig: {
      frequency: 'weekly',
      interval: 1,
      daysOfWeek: [5], // Friday
      time: '17:00',
      timezone: 'Asia/Kolkata',
      startDate: '2024-01-01',
      isActive: false, // Paused
      recipients: ['agents@ramnirmalchits.com'],
      emailSubject: 'Weekly Agent Performance Report',
      emailBody: 'Weekly performance summary and rankings.'
    },
    visibility: 'shared',
    sharedWith: ['sales-team', 'agents'],
    permissions: {
      canView: ['sales-team', 'agents'],
      canEdit: ['sales-manager'],
      canDelete: ['admin'],
      canSchedule: ['sales-manager']
    },
    executionTime: 45,
    lastRunTime: '2024-03-01T17:00:00',
    lastRunStatus: 'success',
    lastRunBy: 'system',
    runCount: 9,
    fileSize: 1572864,
    downloadCount: 67,
    createdAt: '2024-01-01',
    createdBy: 'sales@ramnirmalchits.com',
    updatedAt: '2024-03-01',
    updatedBy: 'system',
    tags: ['weekly', 'agents', 'performance'],
    notes: 'Currently paused for review',
    dependencies: [],
    dependents: []
  }
];

const ScheduledReportCard: React.FC<{ report: Report }> = React.memo(({ report }) => {
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

  const getFrequencyIcon = (frequency: string) => {
    switch (frequency) {
      case 'daily': return Clock;
      case 'weekly': return Calendar;
      case 'monthly': return Calendar;
      case 'quarterly': return Calendar;
      case 'yearly': return Calendar;
      default: return Clock;
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

  const getNextRunTime = () => {
    if (!report.scheduleConfig) return 'Not scheduled';
    
    const now = new Date();
    const schedule = report.scheduleConfig;
    let nextRun = new Date();

    switch (schedule.frequency) {
      case 'daily':
        nextRun.setDate(now.getDate() + 1);
        break;
      case 'weekly':
        const daysUntilNext = (schedule.daysOfWeek?.[0] || 1) - now.getDay();
        nextRun.setDate(now.getDate() + (daysUntilNext <= 0 ? daysUntilNext + 7 : daysUntilNext));
        break;
      case 'monthly':
        nextRun.setMonth(now.getMonth() + 1);
        nextRun.setDate(schedule.dayOfMonth || 1);
        break;
      case 'quarterly':
        nextRun.setMonth(now.getMonth() + 3);
        nextRun.setDate(schedule.dayOfMonth || 1);
        break;
    }

    const [hours, minutes] = schedule.time.split(':');
    nextRun.setHours(parseInt(hours), parseInt(minutes), 0, 0);

    return nextRun.toLocaleString();
  };

  const FrequencyIcon = getFrequencyIcon(report.scheduleConfig?.frequency || 'daily');
  const FormatIcon = getFormatIcon(report.format);
  const isActive = report.scheduleConfig?.isActive;

  return (
    <div className="bg-slate-800/40 backdrop-blur-xl rounded-2xl p-6 border border-yellow-400/30 hover:border-yellow-400/50 transition-all">
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center space-x-3">
          <div className={`p-3 rounded-xl border border-yellow-400/30 ${
            isActive ? 'bg-green-500/20' : 'bg-gray-500/20'
          }`}>
            <FrequencyIcon className={`h-6 w-6 ${isActive ? 'text-green-400' : 'text-gray-400'}`} />
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
          <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium border ${
            isActive ? 'bg-green-100 text-green-800 border-green-200' : 'bg-gray-100 text-gray-800 border-gray-200'
          }`}>
            {isActive ? 'ACTIVE' : 'PAUSED'}
          </span>
          <button className="p-2 text-slate-400 hover:text-slate-50 hover:bg-slate-700/50 rounded-lg transition-all">
            <MoreVertical className="h-4 w-4" />
          </button>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 mb-4">
        <div className="space-y-2">
          <div className="flex items-center justify-between text-sm">
            <span className="text-slate-400">Frequency</span>
            <span className="text-slate-50 font-medium capitalize">{report.scheduleConfig?.frequency}</span>
          </div>
          <div className="flex items-center justify-between text-sm">
            <span className="text-slate-400">Time</span>
            <span className="text-slate-50 font-medium">{report.scheduleConfig?.time}</span>
          </div>
          <div className="flex items-center justify-between text-sm">
            <span className="text-slate-400">Recipients</span>
            <span className="text-slate-50 font-medium">{report.scheduleConfig?.recipients.length}</span>
          </div>
        </div>
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
            <span className="text-slate-400">File Size</span>
            <span className="text-slate-300">{report.fileSize ? formatFileSize(report.fileSize) : 'N/A'}</span>
          </div>
        </div>
      </div>

      {/* Schedule Details */}
      <div className="mb-4 p-3 bg-slate-700/30 rounded-xl border border-yellow-400/20">
        <div className="flex items-center justify-between text-sm mb-2">
          <span className="text-slate-400">Next Run</span>
          <span className="text-blue-400 font-medium">{getNextRunTime()}</span>
        </div>
        <div className="flex items-center justify-between text-sm">
          <span className="text-slate-400">Last Run</span>
          <span className={`font-medium ${
            report.lastRunStatus === 'success' ? 'text-green-400' :
            report.lastRunStatus === 'failed' ? 'text-red-400' : 'text-yellow-400'
          }`}>
            {report.lastRunTime ? new Date(report.lastRunTime).toLocaleDateString() : 'Never'}
          </span>
        </div>
      </div>

      {/* Recipients */}
      {report.scheduleConfig?.recipients && report.scheduleConfig.recipients.length > 0 && (
        <div className="mb-4">
          <p className="text-xs text-slate-500 mb-2">Recipients ({report.scheduleConfig.recipients.length}):</p>
          <div className="flex flex-wrap gap-1">
            {report.scheduleConfig.recipients.slice(0, 2).map((recipient, index) => (
              <span key={index} className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-purple-100 text-purple-800 border border-purple-200">
                {recipient}
              </span>
            ))}
            {report.scheduleConfig.recipients.length > 2 && (
              <span className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-slate-100 text-slate-800 border border-slate-200">
                +{report.scheduleConfig.recipients.length - 2} more
              </span>
            )}
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
          <span>Created {new Date(report.createdAt).toLocaleDateString()}</span>
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
          {isActive ? (
            <button className="p-2 text-slate-400 hover:text-yellow-400 hover:bg-yellow-500/10 rounded-lg transition-all">
              <Pause className="h-4 w-4" />
            </button>
          ) : (
            <button className="p-2 text-slate-400 hover:text-green-400 hover:bg-green-500/10 rounded-lg transition-all">
              <Play className="h-4 w-4" />
            </button>
          )}
          <button className="p-2 text-slate-400 hover:text-orange-400 hover:bg-orange-500/10 rounded-lg transition-all">
            <Edit className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );
});

export const ScheduledReports: React.FC = () => {
  const [reports] = useState<Report[]>(sampleScheduledReports);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategory, setFilterCategory] = useState<string>('all');
  const [filterFrequency, setFilterFrequency] = useState<string>('all');
  const [filterStatus, setFilterStatus] = useState<string>('all');

  const filteredReports = useMemo(() => reports.filter(report => {
    const matchesSearch = report.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         report.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         report.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesCategory = filterCategory === 'all' || report.category === filterCategory;
    const matchesFrequency = filterFrequency === 'all' || report.scheduleConfig?.frequency === filterFrequency;
    const matchesStatus = filterStatus === 'all' || 
                         (filterStatus === 'active' && report.scheduleConfig?.isActive) ||
                         (filterStatus === 'paused' && !report.scheduleConfig?.isActive);
    
    return matchesSearch && matchesCategory && matchesFrequency && matchesStatus;
  }), [reports, searchTerm, filterCategory, filterFrequency, filterStatus]);

  const stats = useMemo(() => ({
    total: reports.length,
    active: reports.filter(r => r.scheduleConfig?.isActive).length,
    paused: reports.filter(r => !r.scheduleConfig?.isActive).length,
    daily: reports.filter(r => r.scheduleConfig?.frequency === 'daily').length,
    weekly: reports.filter(r => r.scheduleConfig?.frequency === 'weekly').length,
    monthly: reports.filter(r => r.scheduleConfig?.frequency === 'monthly').length,
    quarterly: reports.filter(r => r.scheduleConfig?.frequency === 'quarterly').length,
    totalRuns: reports.reduce((sum, r) => sum + r.runCount, 0),
    successfulRuns: reports.filter(r => r.lastRunStatus === 'success').length,
    failedRuns: reports.filter(r => r.lastRunStatus === 'failed').length,
    totalRecipients: reports.reduce((sum, r) => sum + (r.scheduleConfig?.recipients.length || 0), 0),
    avgExecutionTime: reports.length > 0 ? reports.reduce((sum, r) => sum + (r.executionTime || 0), 0) / reports.length : 0
  }), [reports]);

  return (
    <div className="h-full flex flex-col bg-slate-900 overflow-hidden">
      {/* Header */}
      <div className="flex justify-between items-center p-4 border-b border-yellow-400/30 flex-shrink-0">
        <div>
          <h1 className="text-2xl font-bold text-slate-50">Scheduled Reports</h1>
          <p className="mt-1 text-sm text-slate-400">
            Manage automated report generation and delivery schedules
          </p>
        </div>
        <div className="flex space-x-3">
          <button className="inline-flex items-center px-4 py-2 border border-yellow-400/30 text-sm font-medium rounded-lg text-slate-50 bg-slate-700/50 hover:bg-slate-700 transition-all backdrop-blur-sm">
            <RefreshCw className="h-4 w-4 mr-2" />
            Refresh Status
          </button>
          <button className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-lg shadow-sm text-white bg-blue-600 hover:bg-blue-700 transition-all">
            <Plus className="h-4 w-4 mr-2" />
            Schedule Report
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto p-4 space-y-6 scrollbar-none">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 lg:grid-cols-11 gap-4">
          <div className="bg-slate-800/40 backdrop-blur-xl p-4 rounded-xl border border-yellow-400/30">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-400">Total Scheduled</p>
                <p className="text-2xl font-bold text-slate-50">{stats.total}</p>
              </div>
              <Calendar className="h-8 w-8 text-blue-400" />
            </div>
          </div>
          <div className="bg-slate-800/40 backdrop-blur-xl p-4 rounded-xl border border-yellow-400/30">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-400">Active</p>
                <p className="text-2xl font-bold text-green-400">{stats.active}</p>
              </div>
              <CheckCircle className="h-8 w-8 text-green-400" />
            </div>
          </div>
          <div className="bg-slate-800/40 backdrop-blur-xl p-4 rounded-xl border border-yellow-400/30">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-400">Paused</p>
                <p className="text-2xl font-bold text-yellow-400">{stats.paused}</p>
              </div>
              <Pause className="h-8 w-8 text-yellow-400" />
            </div>
          </div>
          <div className="bg-slate-800/40 backdrop-blur-xl p-4 rounded-xl border border-yellow-400/30">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-400">Daily</p>
                <p className="text-2xl font-bold text-blue-400">{stats.daily}</p>
              </div>
              <Clock className="h-8 w-8 text-blue-400" />
            </div>
          </div>
          <div className="bg-slate-800/40 backdrop-blur-xl p-4 rounded-xl border border-yellow-400/30">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-400">Weekly</p>
                <p className="text-2xl font-bold text-purple-400">{stats.weekly}</p>
              </div>
              <Calendar className="h-8 w-8 text-purple-400" />
            </div>
          </div>
          <div className="bg-slate-800/40 backdrop-blur-xl p-4 rounded-xl border border-yellow-400/30">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-400">Monthly</p>
                <p className="text-2xl font-bold text-orange-400">{stats.monthly}</p>
              </div>
              <Calendar className="h-8 w-8 text-orange-400" />
            </div>
          </div>
          <div className="bg-slate-800/40 backdrop-blur-xl p-4 rounded-xl border border-yellow-400/30">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-400">Quarterly</p>
                <p className="text-2xl font-bold text-emerald-400">{stats.quarterly}</p>
              </div>
              <Target className="h-8 w-8 text-emerald-400" />
            </div>
          </div>
          <div className="bg-slate-800/40 backdrop-blur-xl p-4 rounded-xl border border-yellow-400/30">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-400">Successful</p>
                <p className="text-2xl font-bold text-green-400">{stats.successfulRuns}</p>
              </div>
              <Award className="h-8 w-8 text-green-400" />
            </div>
          </div>
          <div className="bg-slate-800/40 backdrop-blur-xl p-4 rounded-xl border border-yellow-400/30">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-400">Failed</p>
                <p className="text-2xl font-bold text-red-400">{stats.failedRuns}</p>
              </div>
              <XCircle className="h-8 w-8 text-red-400" />
            </div>
          </div>
          <div className="bg-slate-800/40 backdrop-blur-xl p-4 rounded-xl border border-yellow-400/30">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-400">Recipients</p>
                <p className="text-2xl font-bold text-indigo-400">{stats.totalRecipients}</p>
              </div>
              <Mail className="h-8 w-8 text-indigo-400" />
            </div>
          </div>
          <div className="bg-slate-800/40 backdrop-blur-xl p-4 rounded-xl border border-yellow-400/30">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-400">Avg Time</p>
                <p className="text-2xl font-bold text-pink-400">{stats.avgExecutionTime.toFixed(1)}s</p>
              </div>
              <TrendingUp className="h-8 w-8 text-pink-400" />
            </div>
          </div>
        </div>

        {/* Filters */}
        <div className="bg-slate-800/40 backdrop-blur-xl rounded-xl p-4 border border-yellow-400/30">
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4 items-center">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-500 h-4 w-4" />
              <input
                type="text"
                placeholder="Search scheduled reports..."
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
            </select>
            <select
              value={filterFrequency}
              onChange={(e) => setFilterFrequency(e.target.value)}
              className="px-3 py-2 bg-slate-700/50 border border-yellow-400/30 rounded-lg text-slate-50 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 backdrop-blur-sm"
            >
              <option value="all">All Frequencies</option>
              <option value="daily">Daily</option>
              <option value="weekly">Weekly</option>
              <option value="monthly">Monthly</option>
              <option value="quarterly">Quarterly</option>
              <option value="yearly">Yearly</option>
            </select>
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="px-3 py-2 bg-slate-700/50 border border-yellow-400/30 rounded-lg text-slate-50 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 backdrop-blur-sm"
            >
              <option value="all">All Status</option>
              <option value="active">Active</option>
              <option value="paused">Paused</option>
            </select>
            <div className="text-sm text-slate-400">
              Showing: <span className="font-semibold text-slate-50">{filteredReports.length}</span> reports
            </div>
          </div>
        </div>

        {/* Reports Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {filteredReports.map((report) => (
            <ScheduledReportCard key={report.id} report={report} />
          ))}
        </div>

        {filteredReports.length === 0 && (
          <div className="text-center py-12">
            <Calendar className="h-12 w-12 mx-auto text-slate-500 mb-4" />
            <h3 className="text-lg font-medium text-slate-50 mb-2">No scheduled reports found</h3>
            <p className="text-sm text-slate-400">Try adjusting your search criteria or schedule a new report.</p>
          </div>
        )}
      </div>
    </div>
  );
};