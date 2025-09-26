import React, { useState, useMemo } from 'react';
import {
  Plus,
  Search,
  Edit,
  Trash2,
  Clock,
  AlertTriangle,
  Shield,
  Target,
  Award,
  Settings,
  Eye,
  CheckCircle,
  XCircle,
  Flag,
  Zap,
  TrendingUp,
  Users,
  Calendar,
  MoreVertical,
  Bell,
  Timer,
  Activity
} from 'lucide-react';
import { SLAPolicy } from '../../types/tasks';

const sampleSLAPolicies: SLAPolicy[] = [
  {
    id: '1',
    name: 'Enterprise SLA',
    description: 'Premium SLA for enterprise customers with fastest response times',
    level: 'enterprise',
    firstResponseTime: 15,
    resolutionTime: 240,
    escalationTime: 60,
    priority: ['critical', 'high'],
    category: ['technical', 'billing', 'complaint'],
    customerType: ['enterprise', 'corporate'],
    businessHours: {
      start: '09:00',
      end: '18:00',
      timezone: 'Asia/Kolkata',
      workingDays: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
    },
    escalationRules: [],
    isActive: true,
    createdAt: '2024-01-01',
    updatedAt: '2024-03-01'
  },
  {
    id: '2',
    name: 'Standard SLA',
    description: 'Default SLA for regular customers',
    level: 'standard',
    firstResponseTime: 120,
    resolutionTime: 1440,
    escalationTime: 480,
    priority: ['medium', 'low'],
    category: ['general', 'feature-request'],
    customerType: ['standard', 'basic'],
    businessHours: {
      start: '09:00',
      end: '18:00',
      timezone: 'Asia/Kolkata',
      workingDays: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday']
    },
    escalationRules: [],
    isActive: true,
    createdAt: '2024-01-01',
    updatedAt: '2024-01-10'
  }
];

export const SLAPriority: React.FC = () => {
  const [policies] = useState<SLAPolicy[]>(sampleSLAPolicies);
  const [searchTerm, setSearchTerm] = useState('');

  const filteredPolicies = useMemo(() => policies.filter(policy => {
    const matchesSearch = policy.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         policy.description.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesSearch;
  }), [policies, searchTerm]);

  const stats = useMemo(() => ({
    totalPolicies: policies.length,
    activePolicies: policies.filter(p => p.isActive).length,
    enterprise: policies.filter(p => p.level === 'enterprise').length,
    standard: policies.filter(p => p.level === 'standard').length
  }), [policies]);

  const formatTime = (minutes: number) => {
    if (minutes < 60) return `${minutes}m`;
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return mins > 0 ? `${hours}h ${mins}m` : `${hours}h`;
  };

  const getLevelColor = (level: string) => {
    switch (level) {
      case 'enterprise': return 'bg-purple-100 text-purple-800 border-purple-200';
      case 'vip': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'priority': return 'bg-orange-100 text-orange-800 border-orange-200';
      case 'standard': return 'bg-blue-100 text-blue-800 border-blue-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  return (
    <div className="h-full flex flex-col bg-slate-900 overflow-hidden">
      {/* Header */}
      <div className="flex justify-between items-center p-4 border-b border-yellow-400/30 flex-shrink-0">
        <div>
          <h1 className="text-2xl font-bold text-slate-50">SLA & Priority Management</h1>
          <p className="mt-1 text-sm text-slate-400">
            Manage service level agreements and priority rules
          </p>
        </div>
        <div className="flex space-x-3">
          <button className="inline-flex items-center px-4 py-2 border border-yellow-400/30 text-sm font-medium rounded-lg text-slate-50 bg-slate-700/50 hover:bg-slate-700 transition-all backdrop-blur-sm">
            <Settings className="h-4 w-4 mr-2" />
            SLA Settings
          </button>
          <button className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-lg shadow-sm text-white bg-blue-600 hover:bg-blue-700 transition-all">
            <Plus className="h-4 w-4 mr-2" />
            Create SLA Policy
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto p-4 space-y-6 scrollbar-none">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="bg-slate-800/40 backdrop-blur-xl p-4 rounded-xl border border-yellow-400/30">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-400">Total Policies</p>
                <p className="text-2xl font-bold text-slate-50">{stats.totalPolicies}</p>
              </div>
              <Shield className="h-8 w-8 text-blue-400" />
            </div>
          </div>
          <div className="bg-slate-800/40 backdrop-blur-xl p-4 rounded-xl border border-yellow-400/30">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-400">Active</p>
                <p className="text-2xl font-bold text-green-400">{stats.activePolicies}</p>
              </div>
              <CheckCircle className="h-8 w-8 text-green-400" />
            </div>
          </div>
          <div className="bg-slate-800/40 backdrop-blur-xl p-4 rounded-xl border border-yellow-400/30">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-400">Enterprise</p>
                <p className="text-2xl font-bold text-purple-400">{stats.enterprise}</p>
              </div>
              <Award className="h-8 w-8 text-purple-400" />
            </div>
          </div>
          <div className="bg-slate-800/40 backdrop-blur-xl p-4 rounded-xl border border-yellow-400/30">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-400">Standard</p>
                <p className="text-2xl font-bold text-blue-400">{stats.standard}</p>
              </div>
              <Target className="h-8 w-8 text-blue-400" />
            </div>
          </div>
        </div>

        {/* Search */}
        <div className="bg-slate-800/40 backdrop-blur-xl rounded-xl p-4 border border-yellow-400/30">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-500 h-4 w-4" />
            <input
              type="text"
              placeholder="Search SLA policies..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 pr-4 py-2 bg-slate-700/50 border border-yellow-400/30 rounded-lg w-full text-slate-50 placeholder-slate-400 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 backdrop-blur-sm"
            />
          </div>
        </div>

        {/* SLA Policies Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredPolicies.map((policy) => (
            <div key={policy.id} className="bg-slate-800/40 backdrop-blur-xl rounded-2xl p-6 border border-yellow-400/30">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="text-lg font-semibold text-slate-50">{policy.name}</h3>
                  <p className="text-sm text-slate-400">{policy.description}</p>
                </div>
                <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium border ${getLevelColor(policy.level)}`}>
                  {policy.level.toUpperCase()}
                </span>
              </div>

              <div className="grid grid-cols-2 gap-4 mb-4">
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-slate-400">First Response</span>
                    <span className="text-slate-50 font-medium">{formatTime(policy.firstResponseTime)}</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-slate-400">Resolution</span>
                    <span className="text-slate-50 font-medium">{formatTime(policy.resolutionTime)}</span>
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-slate-400">Escalation</span>
                    <span className="text-slate-50 font-medium">{formatTime(policy.escalationTime)}</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-slate-400">Status</span>
                    <span className={`font-medium ${policy.isActive ? 'text-green-400' : 'text-red-400'}`}>
                      {policy.isActive ? 'Active' : 'Inactive'}
                    </span>
                  </div>
                </div>
              </div>

              <div className="flex justify-between items-center pt-4 border-t border-yellow-400/20">
                <div className="flex items-center text-xs text-slate-500">
                  <Calendar className="h-3 w-3 mr-1" />
                  <span>Updated {new Date(policy.updatedAt).toLocaleDateString()}</span>
                </div>
                <div className="flex space-x-2">
                  <button className="p-2 text-slate-400 hover:text-blue-400 hover:bg-blue-500/10 rounded-lg transition-all">
                    <Eye className="h-4 w-4" />
                  </button>
                  <button className="p-2 text-slate-400 hover:text-green-400 hover:bg-green-500/10 rounded-lg transition-all">
                    <Edit className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredPolicies.length === 0 && (
          <div className="text-center py-12">
            <Shield className="h-12 w-12 mx-auto text-slate-500 mb-4" />
            <h3 className="text-lg font-medium text-slate-50 mb-2">No SLA policies found</h3>
            <p className="text-sm text-slate-400">Try adjusting your search criteria or create a new SLA policy.</p>
          </div>
        )}
      </div>
    </div>
  );
};