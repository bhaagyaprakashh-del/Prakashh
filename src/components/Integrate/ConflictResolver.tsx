import React, { useState } from 'react';
import { GitMerge, ArrowLeft, ArrowRight, CheckCircle, XCircle, AlertTriangle, Eye, CreditCard as Edit, Save, RefreshCw, Filter, Search } from 'lucide-react';
import { useIntegrationStore } from '../../stores/integrationStore';

interface DataConflict {
  id: string;
  moduleId: string;
  recordId: string;
  recordName: string;
  conflictType: 'stale_write' | 'unique_key_clash' | 'validation_fail';
  existing: Record<string, any>;
  incoming: Record<string, any>;
  conflictFields: string[];
  resolution?: 'accept_existing' | 'accept_incoming' | 'merge';
  mergedData?: Record<string, any>;
  timestamp: string;
  status: 'pending' | 'resolved' | 'ignored';
}

const sampleConflicts: DataConflict[] = [
  {
    id: 'conflict_1',
    moduleId: 'leads',
    recordId: 'lead_001',
    recordName: 'TechCorp Solutions',
    conflictType: 'stale_write',
    existing: {
      name: 'TechCorp Solutions',
      email: 'contact@techcorp.com',
      phone: '+91 98765 43210',
      status: 'qualified',
      lastModified: '2024-03-14T10:30:00'
    },
    incoming: {
      name: 'TechCorp Solutions Pvt Ltd',
      email: 'info@techcorp.com',
      phone: '+91 98765 43210',
      status: 'proposal',
      lastModified: '2024-03-13T15:20:00'
    },
    conflictFields: ['name', 'email', 'status'],
    timestamp: '2024-03-15T14:30:00',
    status: 'pending'
  },
  {
    id: 'conflict_2',
    moduleId: 'subscribers',
    recordId: 'sub_002',
    recordName: 'Anita Desai',
    conflictType: 'unique_key_clash',
    existing: {
      name: 'Anita Desai',
      email: 'anita@example.com',
      phone: '+91 98765 43219',
      subscriberId: 'SUB001'
    },
    incoming: {
      name: 'Anita D',
      email: 'anita@example.com',
      phone: '+91 98765 43220',
      subscriberId: 'SUB002'
    },
    conflictFields: ['email'],
    timestamp: '2024-03-15T12:15:00',
    status: 'pending'
  }
];

const ConflictCard: React.FC<{
  conflict: DataConflict;
  onResolve: (conflictId: string, resolution: any) => void;
}> = ({ conflict, onResolve }) => {
  const [selectedResolution, setSelectedResolution] = useState<'existing' | 'incoming' | 'merge'>('existing');
  const [mergedData, setMergedData] = useState<Record<string, any>>(conflict.existing);

  const getConflictTypeColor = (type: string) => {
    switch (type) {
      case 'stale_write': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'unique_key_clash': return 'bg-red-100 text-red-800 border-red-200';
      case 'validation_fail': return 'bg-orange-100 text-orange-800 border-orange-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const handleResolve = () => {
    const resolution = {
      type: selectedResolution,
      data: selectedResolution === 'merge' ? mergedData : 
            selectedResolution === 'incoming' ? conflict.incoming : conflict.existing
    };
    onResolve(conflict.id, resolution);
  };

  const handleFieldMerge = (field: string, value: any, source: 'existing' | 'incoming') => {
    setMergedData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div className="bg-slate-800/40 backdrop-blur-xl rounded-2xl p-6 border border-yellow-400/30">
      <div className="flex items-start justify-between mb-4">
        <div>
          <h3 className="text-lg font-semibold text-slate-50">{conflict.recordName}</h3>
          <p className="text-sm text-slate-400">{conflict.moduleId} • {conflict.recordId}</p>
        </div>
        <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium border ${getConflictTypeColor(conflict.conflictType)}`}>
          {conflict.conflictType.replace('_', ' ').toUpperCase()}
        </span>
      </div>

      {/* Resolution Options */}
      <div className="mb-6">
        <div className="flex space-x-4">
          <label className="flex items-center space-x-2">
            <input
              type="radio"
              name={`resolution_${conflict.id}`}
              value="existing"
              checked={selectedResolution === 'existing'}
              onChange={(e) => setSelectedResolution('existing')}
              className="h-4 w-4 text-blue-600 focus:ring-blue-500"
            />
            <span className="text-slate-50">Keep Existing</span>
          </label>
          <label className="flex items-center space-x-2">
            <input
              type="radio"
              name={`resolution_${conflict.id}`}
              value="incoming"
              checked={selectedResolution === 'incoming'}
              onChange={(e) => setSelectedResolution('incoming')}
              className="h-4 w-4 text-blue-600 focus:ring-blue-500"
            />
            <span className="text-slate-50">Accept Incoming</span>
          </label>
          <label className="flex items-center space-x-2">
            <input
              type="radio"
              name={`resolution_${conflict.id}`}
              value="merge"
              checked={selectedResolution === 'merge'}
              onChange={(e) => setSelectedResolution('merge')}
              className="h-4 w-4 text-blue-600 focus:ring-blue-500"
            />
            <span className="text-slate-50">Merge Fields</span>
          </label>
        </div>
      </div>

      {/* Side-by-side Diff */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        <div className="bg-slate-700/30 rounded-xl p-4 border border-yellow-400/20">
          <h4 className="text-sm font-semibold text-slate-50 mb-3 flex items-center">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Existing Data
          </h4>
          <div className="space-y-2">
            {Object.entries(conflict.existing).map(([key, value]) => (
              <div key={key} className="flex justify-between items-center">
                <span className="text-slate-400 text-sm">{key}:</span>
                <div className="flex items-center space-x-2">
                  <span className={`text-sm ${conflict.conflictFields.includes(key) ? 'text-red-400' : 'text-slate-50'}`}>
                    {String(value)}
                  </span>
                  {selectedResolution === 'merge' && conflict.conflictFields.includes(key) && (
                    <button
                      onClick={() => handleFieldMerge(key, value, 'existing')}
                      className="p-1 text-blue-400 hover:text-blue-300 hover:bg-blue-500/10 rounded transition-all"
                    >
                      <ArrowRight className="h-3 w-3" />
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-slate-700/30 rounded-xl p-4 border border-yellow-400/20">
          <h4 className="text-sm font-semibold text-slate-50 mb-3 flex items-center">
            <ArrowRight className="h-4 w-4 mr-2" />
            Incoming Data
          </h4>
          <div className="space-y-2">
            {Object.entries(conflict.incoming).map(([key, value]) => (
              <div key={key} className="flex justify-between items-center">
                <span className="text-slate-400 text-sm">{key}:</span>
                <div className="flex items-center space-x-2">
                  <span className={`text-sm ${conflict.conflictFields.includes(key) ? 'text-green-400' : 'text-slate-50'}`}>
                    {String(value)}
                  </span>
                  {selectedResolution === 'merge' && conflict.conflictFields.includes(key) && (
                    <button
                      onClick={() => handleFieldMerge(key, value, 'incoming')}
                      className="p-1 text-blue-400 hover:text-blue-300 hover:bg-blue-500/10 rounded transition-all"
                    >
                      <ArrowLeft className="h-3 w-3" />
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Merge Preview */}
      {selectedResolution === 'merge' && (
        <div className="bg-blue-500/10 border border-blue-500/30 rounded-xl p-4 mb-6">
          <h4 className="text-sm font-semibold text-blue-400 mb-3">Merged Result Preview</h4>
          <div className="space-y-2">
            {Object.entries(mergedData).map(([key, value]) => (
              <div key={key} className="flex justify-between">
                <span className="text-slate-400 text-sm">{key}:</span>
                <span className="text-slate-50 text-sm">{String(value)}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="flex justify-end space-x-3">
        <button
          onClick={() => onResolve(conflict.id, { type: 'ignore' })}
          className="px-4 py-2 text-sm font-medium text-slate-300 bg-slate-700/50 border border-yellow-400/30 rounded-lg hover:bg-slate-700 transition-all backdrop-blur-sm"
        >
          Ignore
        </button>
        <button
          onClick={handleResolve}
          className="inline-flex items-center px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
        >
          <Save className="h-4 w-4 mr-2" />
          Apply Resolution
        </button>
      </div>
    </div>
  );
};

export const ConflictResolver: React.FC = () => {
  const [conflicts, setConflicts] = useState<DataConflict[]>(sampleConflicts);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterModule, setFilterModule] = useState<string>('all');
  const [filterType, setFilterType] = useState<string>('all');

  const { modules } = useIntegrationStore();

  const filteredConflicts = conflicts.filter(conflict => {
    const matchesSearch = conflict.recordName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         conflict.recordId.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesModule = filterModule === 'all' || conflict.moduleId === filterModule;
    const matchesType = filterType === 'all' || conflict.conflictType === filterType;
    
    return matchesSearch && matchesModule && matchesType && conflict.status === 'pending';
  });

  const handleResolveConflict = (conflictId: string, resolution: any) => {
    setConflicts(prev => prev.map(conflict => 
      conflict.id === conflictId 
        ? { ...conflict, status: 'resolved', resolution: resolution.type, mergedData: resolution.data }
        : conflict
    ));
  };

  const stats = {
    total: conflicts.length,
    pending: conflicts.filter(c => c.status === 'pending').length,
    resolved: conflicts.filter(c => c.status === 'resolved').length,
    staleWrites: conflicts.filter(c => c.conflictType === 'stale_write').length,
    uniqueClashes: conflicts.filter(c => c.conflictType === 'unique_key_clash').length,
    validationFails: conflicts.filter(c => c.conflictType === 'validation_fail').length
  };

  return (
    <div className="h-full flex flex-col bg-slate-900 overflow-hidden">
      {/* Header */}
      <div className="flex justify-between items-center p-4 border-b border-yellow-400/30 flex-shrink-0">
        <div>
          <h1 className="text-2xl font-bold text-slate-50">Conflict Resolver</h1>
          <p className="mt-1 text-sm text-slate-400">
            Record-level diff/merge UI for data conflicts
          </p>
        </div>
        <button
          onClick={() => {/* Refresh conflicts */}}
          className="inline-flex items-center px-4 py-2 border border-yellow-400/30 text-sm font-medium rounded-lg text-slate-50 bg-slate-700/50 hover:bg-slate-700 transition-all backdrop-blur-sm"
        >
          <RefreshCw className="h-4 w-4 mr-2" />
          Refresh
        </button>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto p-4 space-y-6 scrollbar-none">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-6 gap-4">
          <div className="bg-slate-800/40 backdrop-blur-xl p-4 rounded-xl border border-yellow-400/30">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-400">Total Conflicts</p>
                <p className="text-2xl font-bold text-slate-50">{stats.total}</p>
              </div>
              <GitMerge className="h-8 w-8 text-red-400" />
            </div>
          </div>
          <div className="bg-slate-800/40 backdrop-blur-xl p-4 rounded-xl border border-yellow-400/30">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-400">Pending</p>
                <p className="text-2xl font-bold text-yellow-400">{stats.pending}</p>
              </div>
              <AlertTriangle className="h-8 w-8 text-yellow-400" />
            </div>
          </div>
          <div className="bg-slate-800/40 backdrop-blur-xl p-4 rounded-xl border border-yellow-400/30">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-400">Resolved</p>
                <p className="text-2xl font-bold text-green-400">{stats.resolved}</p>
              </div>
              <CheckCircle className="h-8 w-8 text-green-400" />
            </div>
          </div>
          <div className="bg-slate-800/40 backdrop-blur-xl p-4 rounded-xl border border-yellow-400/30">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-400">Stale Writes</p>
                <p className="text-2xl font-bold text-orange-400">{stats.staleWrites}</p>
              </div>
              <Edit className="h-8 w-8 text-orange-400" />
            </div>
          </div>
          <div className="bg-slate-800/40 backdrop-blur-xl p-4 rounded-xl border border-yellow-400/30">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-400">Key Clashes</p>
                <p className="text-2xl font-bold text-red-400">{stats.uniqueClashes}</p>
              </div>
              <XCircle className="h-8 w-8 text-red-400" />
            </div>
          </div>
          <div className="bg-slate-800/40 backdrop-blur-xl p-4 rounded-xl border border-yellow-400/30">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-400">Validation Fails</p>
                <p className="text-2xl font-bold text-purple-400">{stats.validationFails}</p>
              </div>
              <AlertTriangle className="h-8 w-8 text-purple-400" />
            </div>
          </div>
        </div>

        {/* Filters */}
        <div className="bg-slate-800/40 backdrop-blur-xl rounded-xl p-4 border border-yellow-400/30">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-500 h-4 w-4" />
              <input
                type="text"
                placeholder="Search conflicts..."
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
              value={filterType}
              onChange={(e) => setFilterType(e.target.value)}
              className="px-3 py-2 bg-slate-700/50 border border-yellow-400/30 rounded-lg text-slate-50 focus:ring-2 focus:ring-blue-500 backdrop-blur-sm"
            >
              <option value="all">All Types</option>
              <option value="stale_write">Stale Write</option>
              <option value="unique_key_clash">Unique Key Clash</option>
              <option value="validation_fail">Validation Fail</option>
            </select>
            <div className="text-sm text-slate-400">
              {filteredConflicts.length} pending conflicts
            </div>
          </div>
        </div>

        {/* Conflicts List */}
        <div className="space-y-6">
          {filteredConflicts.map((conflict) => (
            <ConflictCard
              key={conflict.id}
              conflict={conflict}
              onResolve={handleResolveConflict}
            />
          ))}
        </div>

        {filteredConflicts.length === 0 && (
          <div className="text-center py-12">
            <CheckCircle className="h-12 w-12 mx-auto text-green-400 mb-4" />
            <h3 className="text-lg font-medium text-slate-50 mb-2">No conflicts to resolve</h3>
            <p className="text-sm text-slate-400">All data conflicts have been resolved or there are no conflicts.</p>
          </div>
        )}
      </div>
    </div>
  );
};