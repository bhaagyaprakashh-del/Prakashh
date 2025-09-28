import React, { useState, useMemo } from 'react';
import {
  Search,
  Filter,
  Download,
  RefreshCw,
  Calendar,
  Clock,
  CheckCircle,
  XCircle,
  AlertTriangle,
  Activity,
  Database,
  Eye,
  FileText,
  Target
} from 'lucide-react';
import { useIntegrationStore } from '../../stores/integrationStore';

export const IntegrateLogs: React.FC = () => {
  const { logs, modules } = useIntegrationStore();
  const [searchTerm, setSearchTerm] = useState('');
  const [filterModule, setFilterModule] = useState<string>('all');
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [filterAction, setFilterAction] = useState<string>('all');
  const [dateRange, setDateRange] = useState({ start: '', end: '' });

  const filteredLogs = useMemo(() => logs.filter(log => {
    const matchesSearch = log.module.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         log.action.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         log.scope.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesModule = filterModule === 'all' || log.module === filterModule;
    const matchesStatus = filterStatus === 'all' || log.status === filterStatus;
    const matchesAction = filterAction === 'all' || log.action === filterAction;
    
    let matchesDate = true;
    if (dateRange.start) {
      matchesDate = matchesDate && new Date(log.timestamp) >= new Date(dateRange.start);
    }
    if (dateRange.end) {
      matchesDate = matchesDate && new Date(log.timestamp) <= new Date(dateRange.end);
    }
    
    return matchesSearch && matchesModule && matchesStatus && matchesAction && matchesDate;
  }), [logs, searchTerm, filterModule, filterStatus, filterAction, dateRange]);

  const stats = useMemo(() => ({
    total: logs.length,
    success: logs.filter(l => l.status === 'success').length,
    error: logs.filter(l => l.status === 'error').length,
    warning: logs.filter(l => l.status === 'warning').length,
    totalRecords: logs.reduce((sum, l) => sum + l.recordsProcessed, 0),
    avgDuration: logs.length > 0 ? logs.reduce((sum, l) => sum + l.duration, 0) / logs.length : 0
  }), [logs]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'success': return 'bg-green-100 text-green-800 border-green-200';
      case 'error': return 'bg-red-100 text-red-800 border-red-200';
      case 'warning': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'success': return CheckCircle;
      case 'error': return XCircle;
      case 'warning': return AlertTriangle;
      default: return Activity;
    }
  };

  const handleExportLogs = () => {
    const csvContent = [
      ['Time', 'Module', 'Action', 'Scope', 'Duration', 'Created', 'Updated', 'Failed', 'Status'].join(','),
      ...filteredLogs.map(log => [
        log.timestamp,
        log.module,
        log.action,
        log.scope,
        log.duration,
        log.recordsCreated,
        log.recordsUpdated,
        log.recordsFailed,
        log.status
      ].join(','))
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `integration-logs-${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="h-full flex flex-col bg-slate-900 overflow-hidden">
      {/* Header */}
      <div className="flex justify-between items-center p-4 border-b border-yellow-400/30 flex-shrink-0">
        <div>
          <h1 className="text-2xl font-bold text-slate-50">Integration Logs</h1>
          <p className="mt-1 text-sm text-slate-400">
            Runs, errors, warnings, durations, counts; filterable, exportable
          </p>
        </div>
        <div className="flex space-x-3">
          <button
            onClick={handleExportLogs}
            className="inline-flex items-center px-4 py-2 border border-yellow-400/30 text-sm font-medium rounded-lg text-slate-50 bg-slate-700/50 hover:bg-slate-700 transition-all backdrop-blur-sm"
          >
            <Download className="h-4 w-4 mr-2" />
            Export CSV
          </button>
          <button
            onClick={() => {/* Refresh logs */}}
            className="inline-flex items-center px-4 py-2 border border-yellow-400/30 text-sm font-medium rounded-lg text-slate-50 bg-slate-700/50 hover:bg-slate-700 transition-all backdrop-blur-sm"
          >
            <RefreshCw className="h-4 w-4 mr-2" />
            Refresh
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto p-4 space-y-6 scrollbar-none">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-6 gap-4">
          <div className="bg-slate-800/40 backdrop-blur-xl p-4 rounded-xl border border-yellow-400/30">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-400">Total Logs</p>
                <p className="text-2xl font-bold text-slate-50">{stats.total}</p>
              </div>
              <FileText className="h-8 w-8 text-blue-400" />
            </div>
          </div>
          <div className="bg-slate-800/40 backdrop-blur-xl p-4 rounded-xl border border-yellow-400/30">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-400">Success</p>
                <p className="text-2xl font-bold text-green-400">{stats.success}</p>
              </div>
              <CheckCircle className="h-8 w-8 text-green-400" />
            </div>
          </div>
          <div className="bg-slate-800/40 backdrop-blur-xl p-4 rounded-xl border border-yellow-400/30">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-400">Errors</p>
                <p className="text-2xl font-bold text-red-400">{stats.error}</p>
              </div>
              <XCircle className="h-8 w-8 text-red-400" />
            </div>
          </div>
          <div className="bg-slate-800/40 backdrop-blur-xl p-4 rounded-xl border border-yellow-400/30">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-400">Warnings</p>
                <p className="text-2xl font-bold text-yellow-400">{stats.warning}</p>
              </div>
              <AlertTriangle className="h-8 w-8 text-yellow-400" />
            </div>
          </div>
          <div className="bg-slate-800/40 backdrop-blur-xl p-4 rounded-xl border border-yellow-400/30">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-400">Records</p>
                <p className="text-2xl font-bold text-purple-400">{stats.totalRecords.toLocaleString()}</p>
              </div>
              <Database className="h-8 w-8 text-purple-400" />
            </div>
          </div>
          <div className="bg-slate-800/40 backdrop-blur-xl p-4 rounded-xl border border-yellow-400/30">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-400">Avg Duration</p>
                <p className="text-2xl font-bold text-orange-400">{stats.avgDuration.toFixed(1)}s</p>
              </div>
              <Clock className="h-8 w-8 text-orange-400" />
            </div>
          </div>
        </div>

        {/* Filters */}
        <div className="bg-slate-800/40 backdrop-blur-xl rounded-xl p-4 border border-yellow-400/30">
          <div className="grid grid-cols-1 md:grid-cols-6 gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-500 h-4 w-4" />
              <input
                type="text"
                placeholder="Search logs..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-2 bg-slate-700/50 border border-yellow-400/30 rounded-lg w-full text-slate-50 placeholder-slate-400 focus:ring-2 focus:ring-blue-500 backdrop-blur-sm"
              />
            </div>
            <select
              value={filterModule}
              onChange={(e) => setFilterModule(e.target.value)}
              className="px-3 py-2 bg-slate-700/50 border border-yellow-400/30 rounded-lg text-slate-50 focus:ring-2 focus:ring-blue-500 backdrop-blur-sm"
            >
              <option value="all">All Modules</option>
              {modules.map(module => (
                <option key={module.id} value={module.id}>{module.name}</option>
              ))}
            </select>
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="px-3 py-2 bg-slate-700/50 border border-yellow-400/30 rounded-lg text-slate-50 focus:ring-2 focus:ring-blue-500 backdrop-blur-sm"
            >
              <option value="all">All Status</option>
              <option value="success">Success</option>
              <option value="error">Error</option>
              <option value="warning">Warning</option>
            </select>
            <select
              value={filterAction}
              onChange={(e) => setFilterAction(e.target.value)}
              className="px-3 py-2 bg-slate-700/50 border border-yellow-400/30 rounded-lg text-slate-50 focus:ring-2 focus:ring-blue-500 backdrop-blur-sm"
            >
              <option value="all">All Actions</option>
              <option value="sync">Sync</option>
              <option value="import">Import</option>
              <option value="export">Export</option>
              <option value="validate">Validate</option>
            </select>
            <input
              type="date"
              value={dateRange.start}
              onChange={(e) => setDateRange(prev => ({ ...prev, start: e.target.value }))}
              className="px-3 py-2 bg-slate-700/50 border border-yellow-400/30 rounded-lg text-slate-50 focus:ring-2 focus:ring-blue-500 backdrop-blur-sm"
              placeholder="Start date"
            />
            <input
              type="date"
              value={dateRange.end}
              onChange={(e) => setDateRange(prev => ({ ...prev, end: e.target.value }))}
              className="px-3 py-2 bg-slate-700/50 border border-yellow-400/30 rounded-lg text-slate-50 focus:ring-2 focus:ring-blue-500 backdrop-blur-sm"
              placeholder="End date"
            />
          </div>
        </div>

        {/* Logs Table */}
        <div className="bg-slate-800/40 backdrop-blur-xl rounded-2xl border border-yellow-400/30 overflow-hidden">
          <div className="overflow-x-auto max-h-[600px] overflow-y-auto">
            <table className="w-full">
              <thead className="bg-slate-700/50 border-b border-yellow-400/20 sticky top-0">
                <tr>
                  <th className="px-4 py-3 text-left text-xs font-medium text-slate-300 uppercase">Time</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-slate-300 uppercase">Module</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-slate-300 uppercase">Action</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-slate-300 uppercase">Scope</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-slate-300 uppercase">Duration</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-slate-300 uppercase">Created</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-slate-300 uppercase">Updated</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-slate-300 uppercase">Failed</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-slate-300 uppercase">Status</th>
                  <th className="px-4 py-3 text-center text-xs font-medium text-slate-300 uppercase">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-yellow-400/20">
                {filteredLogs.map((log) => {
                  const StatusIcon = getStatusIcon(log.status);
                  return (
                    <tr key={log.id} className="hover:bg-slate-700/20 transition-colors">
                      <td className="px-4 py-3 text-slate-50 text-sm">
                        {new Date(log.timestamp).toLocaleString()}
                      </td>
                      <td className="px-4 py-3 text-slate-50 text-sm font-medium">
                        {log.module}
                      </td>
                      <td className="px-4 py-3 text-slate-300 text-sm capitalize">
                        {log.action}
                      </td>
                      <td className="px-4 py-3 text-slate-300 text-sm">
                        {log.scope}
                      </td>
                      <td className="px-4 py-3 text-slate-300 text-sm">
                        {log.duration.toFixed(1)}s
                      </td>
                      <td className="px-4 py-3 text-green-400 text-sm font-medium">
                        {log.recordsCreated}
                      </td>
                      <td className="px-4 py-3 text-blue-400 text-sm font-medium">
                        {log.recordsUpdated}
                      </td>
                      <td className="px-4 py-3 text-red-400 text-sm font-medium">
                        {log.recordsFailed}
                      </td>
                      <td className="px-4 py-3">
                        <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium border ${getStatusColor(log.status)}`}>
                          <StatusIcon className="h-3 w-3 mr-1" />
                          {log.status.toUpperCase()}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-center">
                        <button className="p-1 text-blue-400 hover:text-blue-300 hover:bg-blue-500/10 rounded transition-all">
                          <Eye className="h-4 w-4" />
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>

        {filteredLogs.length === 0 && (
          <div className="text-center py-12">
            <FileText className="h-12 w-12 mx-auto text-slate-500 mb-4" />
            <h3 className="text-lg font-medium text-slate-50 mb-2">No logs found</h3>
            <p className="text-sm text-slate-400">Try adjusting your search criteria or run some integration operations.</p>
          </div>
        )}
      </div>
    </div>
  );
};