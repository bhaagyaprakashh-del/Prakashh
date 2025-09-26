import React, { useState, useMemo } from 'react';
import {
  Plus,
  Search,
  Edit,
  Trash2,
  Eye,
  Share2,
  Download,
  Play,
  Pause,
  Copy,
  Star,
  Clock,
  Users,
  Lock,
  Unlock,
  Calendar,
  FileText,
  BarChart3,
  Filter,
  Settings,
  MoreVertical,
  CheckCircle,
  XCircle,
  AlertTriangle,
  Activity,
  Target,
  Award,
  TrendingUp,
  Zap,
  Database,
  Globe,
  Mail,
  Send
} from 'lucide-react';
import { User } from 'lucide-react';
import { Report } from '../../types/reports';
import { formatFileSize } from '../../utils/calculations';

const sampleMyReports: Report[] = [
  {
    id: '1',
    name: 'My Sales Performance Dashboard',
    description: 'Personal sales metrics and performance tracking',
    category: 'sales',
    type: 'custom',
    format: 'pdf',
    dataSource: 'personal_sales',
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
      recipients: ['priya.sharma@ramnirmalchits.com'],
      emailSubject: 'Weekly Sales Performance Report'
    },
    visibility: 'private',
    sharedWith: [],
    permissions: {
      canView: ['priya.sharma@ramnirmalchits.com'],
      canEdit: ['priya.sharma@ramnirmalchits.com'],
      canDelete: ['priya.sharma@ramnirmalchits.com'],
      canSchedule: ['priya.sharma@ramnirmalchits.com']
    },
    executionTime: 25,
    lastRunTime: '2024-03-11T08:00:00',
    lastRunStatus: 'success',
    lastRunBy: 'priya.sharma@ramnirmalchits.com',
    runCount: 12,
    fileSize: 1048576,
    downloadCount: 24,
    createdAt: '2024-01-15',
    createdBy: 'priya.sharma@ramnirmalchits.com',
    updatedAt: '2024-03-11',
    updatedBy: 'priya.sharma@ramnirmalchits.com',
    tags: ['personal', 'sales', 'performance'],
    notes: 'My personal sales tracking dashboard',
    dependencies: [],
    dependents: []
  },
  {
    id: '2',
    name: 'Customer Portfolio Analysis',
    description: 'Analysis of my customer portfolio and relationship metrics',
    category: 'sales',
    type: 'custom',
    format: 'excel',
    dataSource: 'customer_portfolio',
    parameters: [],
    filters: [],
    columns: [],
    isScheduled: false,
    visibility: 'private',
    sharedWith: [],
    permissions: {
      canView: ['priya.sharma@ramnirmalchits.com'],
      canEdit: ['priya.sharma@ramnirmalchits.com'],
      canDelete: ['priya.sharma@ramnirmalchits.com'],
      canSchedule: ['priya.sharma@ramnirmalchits.com']
    },
    executionTime: 35,
    lastRunTime: '2024-03-10T16:30:00',
    lastRunStatus: 'success',
    lastRunBy: 'priya.sharma@ramnirmalchits.com',
    runCount: 8,
    fileSize: 2097152,
    downloadCount: 15,
    createdAt: '2024-02-01',
    createdBy: 'priya.sharma@ramnirmalchits.com',
    updatedAt: '2024-03-10',
    updatedBy: 'priya.sharma@ramnirmalchits.com',
    tags: ['customer', 'portfolio', 'analysis'],
    notes: 'Track my customer relationships and performance',
    dependencies: [],
    dependents: []
  }
];

const sampleSharedReports: Report[] = [
  {
    id: '3',
    name: 'Branch Performance Comparison',
    description: 'Comparative analysis of all branch performance metrics',
    category: 'operational',
    type: 'standard',
    format: 'pdf',
    dataSource: 'branch_data',
    parameters: [],
    filters: [],
    columns: [],
    isScheduled: true,
    scheduleConfig: {
      frequency: 'monthly',
      interval: 1,
      dayOfMonth: 5,
      time: '09:00',
      timezone: 'Asia/Kolkata',
      startDate: '2024-01-01',
      isActive: true,
      recipients: ['management@ramnirmalchits.com'],
      emailSubject: 'Monthly Branch Performance Report'
    },
    visibility: 'shared',
    sharedWith: ['management', 'branch-managers'],
    permissions: {
      canView: ['management', 'branch-managers'],
      canEdit: ['operations-manager'],
      canDelete: ['admin'],
      canSchedule: ['operations-manager']
    },
    executionTime: 90,
    lastRunTime: '2024-03-05T09:00:00',
    lastRunStatus: 'success',
    lastRunBy: 'system',
    runCount: 8,
    fileSize: 3145728,
    downloadCount: 45,
    createdAt: '2024-01-01',
    createdBy: 'operations@ramnirmalchits.com',
    updatedAt: '2024-03-05',
    updatedBy: 'system',
    tags: ['branch', 'performance', 'comparison'],
    notes: 'Shared with all branch managers for performance review',
    dependencies: [],
    dependents: []
  },
  {
    id: '4',
    name: 'Team Sales Leaderboard',
    description: 'Sales team rankings and achievement tracking',
    category: 'sales',
    type: 'standard',
    format: 'html',
    dataSource: 'sales_team',
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
      isActive: true,
      recipients: ['sales-team@ramnirmalchits.com'],
      emailSubject: 'Weekly Sales Leaderboard'
    },
    visibility: 'shared',
    sharedWith: ['sales-team'],
    permissions: {
      canView: ['sales-team'],
      canEdit: ['sales-manager'],
      canDelete: ['admin'],
      canSchedule: ['sales-manager']
    },
    executionTime: 15,
    lastRunTime: '2024-03-08T17:00:00',
    lastRunStatus: 'success',
    lastRunBy: 'system',
    runCount: 28,
    fileSize: 524288,
    downloadCount: 112,
    createdAt: '2024-01-01',
    createdBy: 'sales@ramnirmalchits.com',
    updatedAt: '2024-03-08',
    updatedBy: 'system',
    tags: ['sales', 'leaderboard', 'team'],
    notes: 'Motivational leaderboard shared with sales team',
    dependencies: [],
    dependents: []
  }
];

const ReportCard: React.FC<{ report: Report; isShared?: boolean }> = React.memo(({ report, isShared = false }) => {
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
            <h3 className="text-lg font-semibold text-slate-50 flex items-center">
              {report.name}
              {isShared && (
                <Share2 className="h-4 w-4 ml-2 text-blue-400" title="Shared Report" />
              )}
            </h3>
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
          {!isShared && (
            <>
              <button className="p-2 text-slate-400 hover:text-orange-400 hover:bg-orange-500/10 rounded-lg transition-all">
                <Share2 className="h-4 w-4" />
              </button>
              <button className="p-2 text-slate-400 hover:text-yellow-400 hover:bg-yellow-500/10 rounded-lg transition-all">
                <Edit className="h-4 w-4" />
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
});

export const MyReports: React.FC = () => {
  const [myReports] = useState<Report[]>(sampleMyReports);
  const [sharedReports] = useState<Report[]>(sampleSharedReports);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategory, setFilterCategory] = useState<string>('all');
  const [activeTab, setActiveTab] = useState('my-reports');

  const filteredMyReports = useMemo(() => myReports.filter(report => {
    const matchesSearch = report.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         report.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         report.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesCategory = filterCategory === 'all' || report.category === filterCategory;
    
    return matchesSearch && matchesCategory;
  }), [myReports, searchTerm, filterCategory]);

  const filteredSharedReports = useMemo(() => sharedReports.filter(report => {
    const matchesSearch = report.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         report.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         report.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesCategory = filterCategory === 'all' || report.category === filterCategory;
    
    return matchesSearch && matchesCategory;
  }), [sharedReports, searchTerm, filterCategory]);

  const myStats = useMemo(() => ({
    total: myReports.length,
    scheduled: myReports.filter(r => r.isScheduled).length,
    private: myReports.filter(r => r.visibility === 'private').length,
    shared: myReports.filter(r => r.visibility === 'shared').length,
    totalRuns: myReports.reduce((sum, r) => sum + r.runCount, 0),
    totalDownloads: myReports.reduce((sum, r) => sum + r.downloadCount, 0),
    avgExecutionTime: myReports.length > 0 ? myReports.reduce((sum, r) => sum + (r.executionTime || 0), 0) / myReports.length : 0,
    storageUsed: myReports.reduce((sum, r) => sum + (r.fileSize || 0), 0)
  }), [myReports]);

  const sharedStats = useMemo(() => ({
    total: sharedReports.length,
    canEdit: sharedReports.filter(r => r.permissions.canEdit.includes('current-user')).length,
    viewOnly: sharedReports.filter(r => !r.permissions.canEdit.includes('current-user')).length,
    totalDownloads: sharedReports.reduce((sum, r) => sum + r.downloadCount, 0)
  }), [sharedReports]);

  const tabs = [
    { id: 'my-reports', name: 'My Reports', icon: User, count: myReports.length },
    { id: 'shared-reports', name: 'Shared Reports', icon: Share2, count: sharedReports.length }
  ];

  return (
    <div className="h-full flex flex-col bg-slate-900 overflow-hidden">
      {/* Header */}
      <div className="flex justify-between items-center p-4 border-b border-yellow-400/30 flex-shrink-0">
        <div>
          <h1 className="text-2xl font-bold text-slate-50">My Reports / Shared Reports</h1>
          <p className="mt-1 text-sm text-slate-400">
            Manage your personal reports and access shared team reports
          </p>
        </div>
        <div className="flex space-x-3">
          <button className="inline-flex items-center px-4 py-2 border border-yellow-400/30 text-sm font-medium rounded-lg text-slate-50 bg-slate-700/50 hover:bg-slate-700 transition-all backdrop-blur-sm">
            <Settings className="h-4 w-4 mr-2" />
            Report Settings
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
                <span className="ml-2 bg-slate-700/50 text-slate-300 px-2 py-1 rounded-full text-xs">
                  {tab.count}
                </span>
              </button>
            );
          })}
        </nav>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto p-4 space-y-6 scrollbar-none">
        {/* Stats Cards */}
        {activeTab === 'my-reports' ? (
          <div className="grid grid-cols-1 md:grid-cols-4 lg:grid-cols-8 gap-4">
            <div className="bg-slate-800/40 backdrop-blur-xl p-4 rounded-xl border border-yellow-400/30">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-slate-400">My Reports</p>
                  <p className="text-2xl font-bold text-slate-50">{myStats.total}</p>
                </div>
                <User className="h-8 w-8 text-blue-400" />
              </div>
            </div>
            <div className="bg-slate-800/40 backdrop-blur-xl p-4 rounded-xl border border-yellow-400/30">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-slate-400">Scheduled</p>
                  <p className="text-2xl font-bold text-purple-400">{myStats.scheduled}</p>
                </div>
                <Calendar className="h-8 w-8 text-purple-400" />
              </div>
            </div>
            <div className="bg-slate-800/40 backdrop-blur-xl p-4 rounded-xl border border-yellow-400/30">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-slate-400">Private</p>
                  <p className="text-2xl font-bold text-red-400">{myStats.private}</p>
                </div>
                <Lock className="h-8 w-8 text-red-400" />
              </div>
            </div>
            <div className="bg-slate-800/40 backdrop-blur-xl p-4 rounded-xl border border-yellow-400/30">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-slate-400">Shared</p>
                  <p className="text-2xl font-bold text-green-400">{myStats.shared}</p>
                </div>
                <Share2 className="h-8 w-8 text-green-400" />
              </div>
            </div>
            <div className="bg-slate-800/40 backdrop-blur-xl p-4 rounded-xl border border-yellow-400/30">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-slate-400">Total Runs</p>
                  <p className="text-2xl font-bold text-orange-400">{myStats.totalRuns}</p>
                </div>
                <Activity className="h-8 w-8 text-orange-400" />
              </div>
            </div>
            <div className="bg-slate-800/40 backdrop-blur-xl p-4 rounded-xl border border-yellow-400/30">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-slate-400">Downloads</p>
                  <p className="text-2xl font-bold text-emerald-400">{myStats.totalDownloads}</p>
                </div>
                <Download className="h-8 w-8 text-emerald-400" />
              </div>
            </div>
            <div className="bg-slate-800/40 backdrop-blur-xl p-4 rounded-xl border border-yellow-400/30">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-slate-400">Avg Time</p>
                  <p className="text-2xl font-bold text-yellow-400">{myStats.avgExecutionTime.toFixed(1)}s</p>
                </div>
                <Clock className="h-8 w-8 text-yellow-400" />
              </div>
            </div>
            <div className="bg-slate-800/40 backdrop-blur-xl p-4 rounded-xl border border-yellow-400/30">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-slate-400">Storage Used</p>
                  <p className="text-xl font-bold text-indigo-400">{formatFileSize(myStats.storageUsed)}</p>
                </div>
                <Database className="h-8 w-8 text-indigo-400" />
              </div>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="bg-slate-800/40 backdrop-blur-xl p-4 rounded-xl border border-yellow-400/30">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-slate-400">Shared Reports</p>
                  <p className="text-2xl font-bold text-slate-50">{sharedStats.total}</p>
                </div>
                <Share2 className="h-8 w-8 text-blue-400" />
              </div>
            </div>
            <div className="bg-slate-800/40 backdrop-blur-xl p-4 rounded-xl border border-yellow-400/30">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-slate-400">Can Edit</p>
                  <p className="text-2xl font-bold text-green-400">{sharedStats.canEdit}</p>
                </div>
                <Edit className="h-8 w-8 text-green-400" />
              </div>
            </div>
            <div className="bg-slate-800/40 backdrop-blur-xl p-4 rounded-xl border border-yellow-400/30">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-slate-400">View Only</p>
                  <p className="text-2xl font-bold text-yellow-400">{sharedStats.viewOnly}</p>
                </div>
                <Eye className="h-8 w-8 text-yellow-400" />
              </div>
            </div>
            <div className="bg-slate-800/40 backdrop-blur-xl p-4 rounded-xl border border-yellow-400/30">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-slate-400">Downloads</p>
                  <p className="text-2xl font-bold text-purple-400">{sharedStats.totalDownloads}</p>
                </div>
                <Download className="h-8 w-8 text-purple-400" />
              </div>
            </div>
          </div>
        )}

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
              Showing: <span className="font-semibold text-slate-50">
                {activeTab === 'my-reports' ? filteredMyReports.length : filteredSharedReports.length}
              </span> reports
            </div>
          </div>
        </div>

        {/* Reports Display */}
        {activeTab === 'my-reports' ? (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {filteredMyReports.map((report) => (
              <ReportCard key={report.id} report={report} isShared={false} />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {filteredSharedReports.map((report) => (
              <ReportCard key={report.id} report={report} isShared={true} />
            ))}
          </div>
        )}

        {((activeTab === 'my-reports' && filteredMyReports.length === 0) || 
          (activeTab === 'shared-reports' && filteredSharedReports.length === 0)) && (
          <div className="text-center py-12">
            <FileText className="h-12 w-12 mx-auto text-slate-500 mb-4" />
            <h3 className="text-lg font-medium text-slate-50 mb-2">No reports found</h3>
            <p className="text-sm text-slate-400">
              {activeTab === 'my-reports' 
                ? 'Create your first report to get started with analytics.'
                : 'No reports have been shared with you yet.'
              }
            </p>
          </div>
        )}
      </div>
    </div>
  );
};