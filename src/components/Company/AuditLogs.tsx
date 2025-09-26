import React, { useState, useMemo } from 'react';
import {
  Search,
  Download,
  RefreshCw,
  Activity,
  Bug,
  CheckCircle,
  XCircle,
  AlertTriangle,
  Info,
  Clock,
  Users,
  Database,
  Terminal,
  Zap,
  Eye,
  MoreVertical,
  Calendar,
  Edit,
  Archive,
  Star,
  Lock
} from 'lucide-react';

interface AuditLog {
  id: string;
  timestamp: string;
  userId: string;
  userName: string;
  userEmail: string;
  action: string;
  module: string;
  resourceType: string;
  resourceId?: string;
  resourceName?: string;
  ipAddress: string;
  sessionId: string;
  severity: 'low' | 'medium' | 'high' | 'critical';
  status: 'success' | 'failed' | 'warning';
  duration?: number;
  location?: string;
  device?: string;
}

interface ErrorLog {
  id: string;
  timestamp: string;
  level: 'error' | 'warning' | 'info' | 'debug';
  message: string;
  module: string;
  component?: string;
  userId?: string;
  userName?: string;
  errorCode?: string;
  httpStatus?: number;
  resolved: boolean;
  resolvedBy?: string;
  resolvedAt?: string;
  resolution?: string;
  occurrences: number;
  affectedUsers?: number;
  environment: 'production' | 'staging' | 'development';
}

const sampleAuditLogs: AuditLog[] = [
  {
    id: '1',
    timestamp: '2024-03-15T14:08:55Z',
    userId: '1',
    userName: 'Prakashh',
    userEmail: 'prakashh@ramnirmalchits.com',
    action: 'CREATE',
    module: 'Chit Groups',
    resourceType: 'chit_group',
    resourceId: 'group_001',
    resourceName: 'Premium Gold A1',
    ipAddress: '192.168.1.100',
    sessionId: 'sess_abc123',
    severity: 'medium',
    status: 'success',
    duration: 1250,
    location: 'Bangalore, India',
    device: 'Desktop'
  },
  {
    id: '2',
    timestamp: '2024-03-15T13:45:22Z',
    userId: '2',
    userName: 'Rajesh Kumar',
    userEmail: 'rajesh@ramnirmalchits.com',
    action: 'UPDATE',
    module: 'Users',
    resourceType: 'user',
    resourceId: 'user_003',
    resourceName: 'Priya Sharma',
    ipAddress: '192.168.1.101',
    sessionId: 'sess_def456',
    severity: 'high',
    status: 'success',
    duration: 890,
    location: 'Bangalore, India',
    device: 'Laptop'
  },
  {
    id: '3',
    timestamp: '2024-03-15T12:30:15Z',
    userId: '3',
    userName: 'Priya Sharma',
    userEmail: 'priya@ramnirmalchits.com',
    action: 'LOGIN',
    module: 'Authentication',
    resourceType: 'session',
    ipAddress: '192.168.1.102',
    sessionId: 'sess_ghi789',
    severity: 'low',
    status: 'success',
    duration: 2100,
    location: 'Bangalore, India',
    device: 'Mobile'
  },
  {
    id: '4',
    timestamp: '2024-03-15T11:15:33Z',
    userId: '4',
    userName: 'Amit Patel',
    userEmail: 'amit@ramnirmalchits.com',
    action: 'DELETE',
    module: 'Templates',
    resourceType: 'template',
    resourceId: 'temp_old_001',
    resourceName: 'Old Agreement Template v1.0',
    ipAddress: '192.168.1.103',
    sessionId: 'sess_jkl012',
    severity: 'critical',
    status: 'success',
    duration: 450,
    location: 'Mumbai, India',
    device: 'Desktop'
  },
  {
    id: '5',
    timestamp: '2024-03-15T09:45:07Z',
    userId: '5',
    userName: 'Unknown User',
    userEmail: 'unknown@example.com',
    action: 'LOGIN_FAILED',
    module: 'Authentication',
    resourceType: 'session',
    ipAddress: '203.192.45.123',
    sessionId: 'sess_failed_001',
    severity: 'critical',
    status: 'failed',
    duration: 150,
    location: 'Unknown',
    device: 'Desktop'
  }
];

const sampleErrorLogs: ErrorLog[] = [
  {
    id: '1',
    timestamp: '2024-03-15T14:15:30Z',
    level: 'error',
    message: 'Database connection timeout while processing chit group creation',
    module: 'Chit Groups',
    component: 'ChitGroupService',
    userId: '1',
    userName: 'Prakashh',
    errorCode: 'DB_TIMEOUT_001',
    httpStatus: 500,
    resolved: true,
    resolvedBy: 'System Admin',
    resolvedAt: '2024-03-15T14:30:00Z',
    resolution: 'Increased database connection timeout and optimized query',
    occurrences: 3,
    affectedUsers: 1,
    environment: 'production'
  },
  {
    id: '2',
    timestamp: '2024-03-15T13:22:45Z',
    level: 'warning',
    message: 'High memory usage detected in report generation module',
    module: 'Reports',
    component: 'ReportGenerator',
    errorCode: 'MEM_HIGH_001',
    resolved: false,
    occurrences: 12,
    affectedUsers: 5,
    environment: 'production'
  },
  {
    id: '3',
    timestamp: '2024-03-15T12:08:12Z',
    level: 'error',
    message: 'Payment gateway API returned invalid response',
    module: 'Payments',
    component: 'PaymentService',
    userId: '3',
    userName: 'Priya Sharma',
    errorCode: 'PAY_API_001',
    httpStatus: 502,
    resolved: true,
    resolvedBy: 'Technical Team',
    resolvedAt: '2024-03-15T12:45:00Z',
    resolution: 'Updated payment gateway integration and added retry logic',
    occurrences: 1,
    affectedUsers: 1,
    environment: 'production'
  },
  {
    id: '4',
    timestamp: '2024-03-15T11:35:28Z',
    level: 'info',
    message: 'Scheduled backup completed successfully',
    module: 'System',
    component: 'BackupService',
    resolved: true,
    occurrences: 1,
    environment: 'production'
  },
  {
    id: '5',
    timestamp: '2024-03-15T10:18:55Z',
    level: 'error',
    message: 'Email service failed to send notification',
    module: 'Notifications',
    component: 'EmailService',
    errorCode: 'EMAIL_SMTP_001',
    httpStatus: 503,
    resolved: false,
    occurrences: 8,
    affectedUsers: 15,
    environment: 'production'
  }
];

const AuditLogCard: React.FC<{ log: AuditLog }> = React.memo(({ log }) => {
  const getActionColor = (action: string) => {
    switch (action.toLowerCase()) {
      case 'create': return 'bg-green-100 text-green-800 border-green-200';
      case 'update': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'delete': return 'bg-red-100 text-red-800 border-red-200';
      case 'login': return 'bg-purple-100 text-purple-800 border-purple-200';
      case 'logout': return 'bg-gray-100 text-gray-800 border-gray-200';
      case 'export': return 'bg-orange-100 text-orange-800 border-orange-200';
      case 'login_failed': return 'bg-red-100 text-red-800 border-red-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'critical': return 'bg-red-500';
      case 'high': return 'bg-orange-500';
      case 'medium': return 'bg-yellow-500';
      case 'low': return 'bg-green-500';
      default: return 'bg-gray-500';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'success': return CheckCircle;
      case 'failed': return XCircle;
      case 'warning': return AlertTriangle;
      default: return Info;
    }
  };

  const StatusIcon = getStatusIcon(log.status);

  return (
    <div className="bg-slate-800/40 backdrop-blur-xl rounded-2xl p-6 border border-yellow-400/30 hover:border-yellow-400/50 transition-all">
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center space-x-3">
          <div className="p-3 bg-blue-500/20 rounded-xl border border-yellow-400/30">
            <Activity className="h-6 w-6 text-blue-400" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-slate-50">{log.action}</h3>
            <p className="text-sm text-slate-400">{log.module} • {log.resourceType}</p>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium border ${getActionColor(log.action)}`}>
            {log.action}
          </span>
          <div className={`w-3 h-3 rounded-full ${getSeverityColor(log.severity)}`} title={`${log.severity} severity`}></div>
        </div>
      </div>

      <div className="space-y-2 mb-4">
        <div className="flex items-center justify-between text-sm">
          <span className="text-slate-400">User</span>
          <span className="text-slate-50 font-medium">{log.userName}</span>
        </div>
        <div className="flex items-center justify-between text-sm">
          <span className="text-slate-400">Resource</span>
          <span className="text-slate-300">{log.resourceName || log.resourceId || 'N/A'}</span>
        </div>
        <div className="flex items-center justify-between text-sm">
          <span className="text-slate-400">IP Address</span>
          <span className="text-slate-300">{log.ipAddress}</span>
        </div>
        <div className="flex items-center justify-between text-sm">
          <span className="text-slate-400">Duration</span>
          <span className="text-slate-300">{log.duration}ms</span>
        </div>
      </div>

      <div className="flex justify-between items-center pt-4 border-t border-yellow-400/20">
        <div className="flex items-center text-xs text-slate-500">
          <Clock className="h-3 w-3 mr-1" />
          <span>{new Date(log.timestamp).toLocaleString()}</span>
        </div>
        <div className="flex items-center space-x-2">
          <StatusIcon className={`h-4 w-4 ${
            log.status === 'success' ? 'text-green-400' :
            log.status === 'failed' ? 'text-red-400' : 'text-yellow-400'
          }`} />
          <span className={`text-xs ${
            log.status === 'success' ? 'text-green-400' :
            log.status === 'failed' ? 'text-red-400' : 'text-yellow-400'
          }`}>
            {log.status.toUpperCase()}
          </span>
        </div>
      </div>
    </div>
  );
});

const ErrorLogCard: React.FC<{ log: ErrorLog }> = React.memo(({ log }) => {
  const getLevelColor = (level: string) => {
    switch (level) {
      case 'error': return 'bg-red-100 text-red-800 border-red-200';
      case 'warning': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'info': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'debug': return 'bg-gray-100 text-gray-800 border-gray-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getLevelIcon = (level: string) => {
    switch (level) {
      case 'error': return XCircle;
      case 'warning': return AlertTriangle;
      case 'info': return Info;
      case 'debug': return Bug;
      default: return Info;
    }
  };

  const LevelIcon = getLevelIcon(log.level);

  return (
    <div className="bg-slate-800/40 backdrop-blur-xl rounded-2xl p-6 border border-yellow-400/30 hover:border-yellow-400/50 transition-all">
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center space-x-3">
          <div className={`p-3 rounded-xl border border-yellow-400/30 ${
            log.level === 'error' ? 'bg-red-500/20' :
            log.level === 'warning' ? 'bg-yellow-500/20' :
            log.level === 'info' ? 'bg-blue-500/20' : 'bg-gray-500/20'
          }`}>
            <LevelIcon className={`h-6 w-6 ${
              log.level === 'error' ? 'text-red-400' :
              log.level === 'warning' ? 'text-yellow-400' :
              log.level === 'info' ? 'text-blue-400' : 'text-gray-400'
            }`} />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-slate-50">{log.module}</h3>
            <p className="text-sm text-slate-400">{log.component || 'System'}</p>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium border ${getLevelColor(log.level)}`}>
            {log.level.toUpperCase()}
          </span>
          {log.resolved ? (
            <CheckCircle className="h-4 w-4 text-green-400" title="Resolved" />
          ) : (
            <Clock className="h-4 w-4 text-yellow-400" title="Pending" />
          )}
        </div>
      </div>

      <p className="text-sm text-slate-300 mb-4">{log.message}</p>

      <div className="grid grid-cols-2 gap-4 mb-4">
        <div className="space-y-2">
          <div className="flex items-center justify-between text-sm">
            <span className="text-slate-400">Error Code</span>
            <span className="text-slate-50 font-medium">{log.errorCode || 'N/A'}</span>
          </div>
          <div className="flex items-center justify-between text-sm">
            <span className="text-slate-400">Occurrences</span>
            <span className="text-slate-50 font-medium">{log.occurrences}</span>
          </div>
        </div>
        <div className="space-y-2">
          <div className="flex items-center justify-between text-sm">
            <span className="text-slate-400">HTTP Status</span>
            <span className="text-slate-300">{log.httpStatus || 'N/A'}</span>
          </div>
          <div className="flex items-center justify-between text-sm">
            <span className="text-slate-400">Environment</span>
            <span className="text-slate-300 capitalize">{log.environment}</span>
          </div>
        </div>
      </div>

      {log.resolved && log.resolution && (
        <div className="mb-4 p-3 bg-green-500/10 border border-green-500/30 rounded-lg">
          <p className="text-xs text-green-400 mb-1">Resolution:</p>
          <p className="text-sm text-slate-300">{log.resolution}</p>
          <p className="text-xs text-slate-500 mt-1">
            Resolved by {log.resolvedBy} on {log.resolvedAt ? new Date(log.resolvedAt).toLocaleDateString() : 'N/A'}
          </p>
        </div>
      )}

      <div className="flex justify-between items-center pt-4 border-t border-yellow-400/20">
        <div className="flex items-center text-xs text-slate-500">
          <Clock className="h-3 w-3 mr-1" />
          <span>{new Date(log.timestamp).toLocaleString()}</span>
        </div>
        <div className="flex space-x-2">
          <button className="p-2 text-slate-400 hover:text-blue-400 hover:bg-blue-500/10 rounded-lg transition-all" title="View Details">
            <Eye className="h-4 w-4" />
          </button>
          {!log.resolved && (
            <button className="p-2 text-slate-400 hover:text-green-400 hover:bg-green-500/10 rounded-lg transition-all" title="Mark Resolved">
              <CheckCircle className="h-4 w-4" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
});

export const AuditLogs: React.FC = () => {
  const [auditLogs] = useState<AuditLog[]>(sampleAuditLogs);
  const [errorLogs] = useState<ErrorLog[]>(sampleErrorLogs);
  const [searchTerm, setSearchTerm] = useState('');
  const [activeTab, setActiveTab] = useState('audit');
  const [filterSeverity, setFilterSeverity] = useState<string>('all');
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [filterModule, setFilterModule] = useState<string>('all');
  const [filterLevel, setFilterLevel] = useState<string>('all');

  const filteredAuditLogs = useMemo(() => auditLogs.filter(log => {
    const matchesSearch = log.userName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         log.action.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         log.module.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesSeverity = filterSeverity === 'all' || log.severity === filterSeverity;
    const matchesStatus = filterStatus === 'all' || log.status === filterStatus;
    const matchesModule = filterModule === 'all' || log.module === filterModule;
    
    return matchesSearch && matchesSeverity && matchesStatus && matchesModule;
  }), [auditLogs, searchTerm, filterSeverity, filterStatus, filterModule]);

  const filteredErrorLogs = useMemo(() => errorLogs.filter(log => {
    const matchesSearch = log.message.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         log.module.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesLevel = filterLevel === 'all' || log.level === filterLevel;
    const matchesModule = filterModule === 'all' || log.module === filterModule;
    const matchesStatus = filterStatus === 'all' || 
                         (filterStatus === 'resolved' && log.resolved) ||
                         (filterStatus === 'unresolved' && !log.resolved);
    
    return matchesSearch && matchesLevel && matchesModule && matchesStatus;
  }), [errorLogs, searchTerm, filterLevel, filterModule, filterStatus]);

  const auditStats = useMemo(() => ({
    total: auditLogs.length,
    success: auditLogs.filter(l => l.status === 'success').length,
    failed: auditLogs.filter(l => l.status === 'failed').length,
    warning: auditLogs.filter(l => l.status === 'warning').length,
    critical: auditLogs.filter(l => l.severity === 'critical').length,
    high: auditLogs.filter(l => l.severity === 'high').length,
    medium: auditLogs.filter(l => l.severity === 'medium').length,
    low: auditLogs.filter(l => l.severity === 'low').length,
    uniqueUsers: new Set(auditLogs.map(l => l.userId)).size,
    uniqueModules: new Set(auditLogs.map(l => l.module)).size
  }), [auditLogs]);

  const errorStats = useMemo(() => ({
    total: errorLogs.length,
    errors: errorLogs.filter(l => l.level === 'error').length,
    warnings: errorLogs.filter(l => l.level === 'warning').length,
    info: errorLogs.filter(l => l.level === 'info').length,
    debug: errorLogs.filter(l => l.level === 'debug').length,
    resolved: errorLogs.filter(l => l.resolved).length,
    unresolved: errorLogs.filter(l => !l.resolved).length,
    totalOccurrences: errorLogs.reduce((sum, l) => sum + l.occurrences, 0),
    affectedUsers: errorLogs.reduce((sum, l) => sum + (l.affectedUsers || 0), 0),
    uniqueModules: new Set(errorLogs.map(l => l.module)).size
  }), [errorLogs]);

  const uniqueModules = useMemo(() => {
    const auditModules = auditLogs.map(l => l.module);
    const errorModules = errorLogs.map(l => l.module);
    return [...new Set([...auditModules, ...errorModules])];
  }, [auditLogs, errorLogs]);

  const tabs = [
    { id: 'audit', name: 'Audit Logs', icon: Activity, count: auditLogs.length },
    { id: 'errors', name: 'Error Logs', icon: Bug, count: errorLogs.length }
  ];

  return (
    <div className="h-full flex flex-col bg-slate-900 overflow-hidden">
      {/* Header */}
      <div className="flex justify-between items-center p-4 border-b border-yellow-400/30 flex-shrink-0">
        <div>
          <h1 className="text-2xl font-bold text-slate-50">Audit Logs & Error Log</h1>
          <p className="mt-1 text-sm text-slate-400">
            Monitor system activities, user actions, and track errors for security and debugging
          </p>
        </div>
        <div className="flex space-x-3">
          <button className="inline-flex items-center px-4 py-2 border border-yellow-400/30 text-sm font-medium rounded-lg text-slate-50 bg-slate-700/50 hover:bg-slate-700 transition-all backdrop-blur-sm">
            <Download className="h-4 w-4 mr-2" />
            Export Logs
          </button>
          <button className="inline-flex items-center px-4 py-2 border border-yellow-400/30 text-sm font-medium rounded-lg text-slate-50 bg-slate-700/50 hover:bg-slate-700 transition-all backdrop-blur-sm">
            <RefreshCw className="h-4 w-4 mr-2" />
            Refresh
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
        {activeTab === 'audit' ? (
          <div className="grid grid-cols-1 md:grid-cols-5 lg:grid-cols-10 gap-4">
            <div className="bg-slate-800/40 backdrop-blur-xl p-4 rounded-xl border border-yellow-400/30">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-slate-400">Total Logs</p>
                  <p className="text-2xl font-bold text-slate-50">{auditStats.total}</p>
                </div>
                <Activity className="h-8 w-8 text-blue-400" />
              </div>
            </div>
            <div className="bg-slate-800/40 backdrop-blur-xl p-4 rounded-xl border border-yellow-400/30">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-slate-400">Success</p>
                  <p className="text-2xl font-bold text-green-400">{auditStats.success}</p>
                </div>
                <CheckCircle className="h-8 w-8 text-green-400" />
              </div>
            </div>
            <div className="bg-slate-800/40 backdrop-blur-xl p-4 rounded-xl border border-yellow-400/30">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-slate-400">Failed</p>
                  <p className="text-2xl font-bold text-red-400">{auditStats.failed}</p>
                </div>
                <XCircle className="h-8 w-8 text-red-400" />
              </div>
            </div>
            <div className="bg-slate-800/40 backdrop-blur-xl p-4 rounded-xl border border-yellow-400/30">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-slate-400">Warning</p>
                  <p className="text-2xl font-bold text-yellow-400">{auditStats.warning}</p>
                </div>
                <AlertTriangle className="h-8 w-8 text-yellow-400" />
              </div>
            </div>
            <div className="bg-slate-800/40 backdrop-blur-xl p-4 rounded-xl border border-yellow-400/30">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-slate-400">Critical</p>
                  <p className="text-2xl font-bold text-red-400">{auditStats.critical}</p>
                </div>
                <Zap className="h-8 w-8 text-red-400" />
              </div>
            </div>
            <div className="bg-slate-800/40 backdrop-blur-xl p-4 rounded-xl border border-yellow-400/30">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-slate-400">High</p>
                  <p className="text-2xl font-bold text-orange-400">{auditStats.high}</p>
                </div>
                <AlertTriangle className="h-8 w-8 text-orange-400" />
              </div>
            </div>
            <div className="bg-slate-800/40 backdrop-blur-xl p-4 rounded-xl border border-yellow-400/30">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-slate-400">Medium</p>
                  <p className="text-2xl font-bold text-yellow-400">{auditStats.medium}</p>
                </div>
                <Info className="h-8 w-8 text-yellow-400" />
              </div>
            </div>
            <div className="bg-slate-800/40 backdrop-blur-xl p-4 rounded-xl border border-yellow-400/30">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-slate-400">Low</p>
                  <p className="text-2xl font-bold text-green-400">{auditStats.low}</p>
                </div>
                <CheckCircle className="h-8 w-8 text-green-400" />
              </div>
            </div>
            <div className="bg-slate-800/40 backdrop-blur-xl p-4 rounded-xl border border-yellow-400/30">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-slate-400">Users</p>
                  <p className="text-2xl font-bold text-purple-400">{auditStats.uniqueUsers}</p>
                </div>
                <Users className="h-8 w-8 text-purple-400" />
              </div>
            </div>
            <div className="bg-slate-800/40 backdrop-blur-xl p-4 rounded-xl border border-yellow-400/30">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-slate-400">Modules</p>
                  <p className="text-2xl font-bold text-indigo-400">{auditStats.uniqueModules}</p>
                </div>
                <Database className="h-8 w-8 text-indigo-400" />
              </div>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-5 lg:grid-cols-10 gap-4">
            <div className="bg-slate-800/40 backdrop-blur-xl p-4 rounded-xl border border-yellow-400/30">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-slate-400">Total Errors</p>
                  <p className="text-2xl font-bold text-slate-50">{errorStats.total}</p>
                </div>
                <Bug className="h-8 w-8 text-red-400" />
              </div>
            </div>
            <div className="bg-slate-800/40 backdrop-blur-xl p-4 rounded-xl border border-yellow-400/30">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-slate-400">Errors</p>
                  <p className="text-2xl font-bold text-red-400">{errorStats.errors}</p>
                </div>
                <XCircle className="h-8 w-8 text-red-400" />
              </div>
            </div>
            <div className="bg-slate-800/40 backdrop-blur-xl p-4 rounded-xl border border-yellow-400/30">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-slate-400">Warnings</p>
                  <p className="text-2xl font-bold text-yellow-400">{errorStats.warnings}</p>
                </div>
                <AlertTriangle className="h-8 w-8 text-yellow-400" />
              </div>
            </div>
            <div className="bg-slate-800/40 backdrop-blur-xl p-4 rounded-xl border border-yellow-400/30">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-slate-400">Info</p>
                  <p className="text-2xl font-bold text-blue-400">{errorStats.info}</p>
                </div>
                <Info className="h-8 w-8 text-blue-400" />
              </div>
            </div>
            <div className="bg-slate-800/40 backdrop-blur-xl p-4 rounded-xl border border-yellow-400/30">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-slate-400">Debug</p>
                  <p className="text-2xl font-bold text-gray-400">{errorStats.debug}</p>
                </div>
                <Terminal className="h-8 w-8 text-gray-400" />
              </div>
            </div>
            <div className="bg-slate-800/40 backdrop-blur-xl p-4 rounded-xl border border-yellow-400/30">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-slate-400">Resolved</p>
                  <p className="text-2xl font-bold text-green-400">{errorStats.resolved}</p>
                </div>
                <CheckCircle className="h-8 w-8 text-green-400" />
              </div>
            </div>
            <div className="bg-slate-800/40 backdrop-blur-xl p-4 rounded-xl border border-yellow-400/30">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-slate-400">Unresolved</p>
                  <p className="text-2xl font-bold text-orange-400">{errorStats.unresolved}</p>
                </div>
                <Clock className="h-8 w-8 text-orange-400" />
              </div>
            </div>
            <div className="bg-slate-800/40 backdrop-blur-xl p-4 rounded-xl border border-yellow-400/30">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-slate-400">Occurrences</p>
                  <p className="text-2xl font-bold text-purple-400">{errorStats.totalOccurrences}</p>
                </div>
                <RefreshCw className="h-8 w-8 text-purple-400" />
              </div>
            </div>
            <div className="bg-slate-800/40 backdrop-blur-xl p-4 rounded-xl border border-yellow-400/30">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-slate-400">Affected Users</p>
                  <p className="text-2xl font-bold text-pink-400">{errorStats.affectedUsers}</p>
                </div>
                <Users className="h-8 w-8 text-pink-400" />
              </div>
            </div>
            <div className="bg-slate-800/40 backdrop-blur-xl p-4 rounded-xl border border-yellow-400/30">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-slate-400">Modules</p>
                  <p className="text-2xl font-bold text-indigo-400">{errorStats.uniqueModules}</p>
                </div>
                <Database className="h-8 w-8 text-indigo-400" />
              </div>
            </div>
          </div>
        )}

        {/* Filters */}
        <div className="bg-slate-800/40 backdrop-blur-xl rounded-xl p-4 border border-yellow-400/30">
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4 items-center">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-500 h-4 w-4" />
              <input
                type="text"
                placeholder="Search logs..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-2 bg-slate-700/50 border border-yellow-400/30 rounded-lg w-full text-slate-50 placeholder-slate-400 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 backdrop-blur-sm"
              />
            </div>
            <select
              value={filterModule}
              onChange={(e) => setFilterModule(e.target.value)}
              className="px-3 py-2 bg-slate-700/50 border border-yellow-400/30 rounded-lg text-slate-50 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 backdrop-blur-sm"
            >
              <option value="all">All Modules</option>
              {uniqueModules.map(module => (
                <option key={module} value={module}>{module}</option>
              ))}
            </select>
            {activeTab === 'audit' ? (
              <>
                <select
                  value={filterSeverity}
                  onChange={(e) => setFilterSeverity(e.target.value)}
                  className="px-3 py-2 bg-slate-700/50 border border-yellow-400/30 rounded-lg text-slate-50 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 backdrop-blur-sm"
                >
                  <option value="all">All Severity</option>
                  <option value="critical">Critical</option>
                  <option value="high">High</option>
                  <option value="medium">Medium</option>
                  <option value="low">Low</option>
                </select>
                <select
                  value={filterStatus}
                  onChange={(e) => setFilterStatus(e.target.value)}
                  className="px-3 py-2 bg-slate-700/50 border border-yellow-400/30 rounded-lg text-slate-50 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 backdrop-blur-sm"
                >
                  <option value="all">All Status</option>
                  <option value="success">Success</option>
                  <option value="failed">Failed</option>
                  <option value="warning">Warning</option>
                </select>
              </>
            ) : (
              <>
                <select
                  value={filterLevel}
                  onChange={(e) => setFilterLevel(e.target.value)}
                  className="px-3 py-2 bg-slate-700/50 border border-yellow-400/30 rounded-lg text-slate-50 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 backdrop-blur-sm"
                >
                  <option value="all">All Levels</option>
                  <option value="error">Error</option>
                  <option value="warning">Warning</option>
                  <option value="info">Info</option>
                  <option value="debug">Debug</option>
                </select>
                <select
                  value={filterStatus}
                  onChange={(e) => setFilterStatus(e.target.value)}
                  className="px-3 py-2 bg-slate-700/50 border border-yellow-400/30 rounded-lg text-slate-50 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 backdrop-blur-sm"
                >
                  <option value="all">All Status</option>
                  <option value="resolved">Resolved</option>
                  <option value="unresolved">Unresolved</option>
                </select>
              </>
            )}
            <div className="text-sm text-slate-400">
              Showing: <span className="font-semibold text-slate-50">
                {activeTab === 'audit' ? filteredAuditLogs.length : filteredErrorLogs.length}
              </span> logs
            </div>
          </div>
        </div>

        {/* Logs Display */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {activeTab === 'audit' ? (
            filteredAuditLogs.map((log) => (
              <AuditLogCard key={log.id} log={log} />
            ))
          ) : (
            filteredErrorLogs.map((log) => (
              <ErrorLogCard key={log.id} log={log} />
            ))
          )}
        </div>

        {((activeTab === 'audit' && filteredAuditLogs.length === 0) || 
          (activeTab === 'errors' && filteredErrorLogs.length === 0)) && (
          <div className="text-center py-12">
            {activeTab === 'audit' ? (
              <Activity className="h-12 w-12 mx-auto text-slate-500 mb-4" />
            ) : (
              <Bug className="h-12 w-12 mx-auto text-slate-500 mb-4" />
            )}
            <h3 className="text-lg font-medium text-slate-50 mb-2">No logs found</h3>
            <p className="text-sm text-slate-400">Try adjusting your search criteria or filters.</p>
          </div>
        )}
      </div>
    </div>
  );
};