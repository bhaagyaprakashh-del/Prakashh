import React, { useState, useMemo } from 'react';
import {
  Building,
  Users,
  DollarSign,
  TrendingUp,
  Calendar,
  CheckCircle,
  Clock,
  AlertTriangle,
  CreditCard,
  Target,
  Award,
  Activity,
  Eye,
  Plus,
  Filter,
  Download,
  RefreshCw,
  MoreVertical,
  Star,
  Zap,
  BarChart3,
  PieChart
} from 'lucide-react';
import { ChitGroup } from '../../types/chit';

const sampleGroups: ChitGroup[] = [
  {
    id: '1',
    name: 'Premium Gold A1',
    code: 'PGA1-2024',
    totalAmount: 1000000,
    installmentAmount: 50000,
    duration: 20,
    startDate: '2024-01-01',
    endDate: '2025-08-31',
    status: 'active',
    branchId: 'branch_001',
    agentId: 'agent_001',
    members: [],
    auctions: [],
    installments: [],
    commissionPercentage: 5,
    createdAt: '2023-12-15',
    updatedAt: '2024-03-15'
  },
  {
    id: '2',
    name: 'Silver Monthly B1',
    code: 'SMB1-2024',
    totalAmount: 300000,
    installmentAmount: 25000,
    duration: 12,
    startDate: '2024-02-01',
    endDate: '2025-01-31',
    status: 'active',
    branchId: 'branch_001',
    agentId: 'agent_002',
    members: [],
    auctions: [],
    installments: [],
    commissionPercentage: 4,
    createdAt: '2024-01-20',
    updatedAt: '2024-03-14'
  },
  {
    id: '3',
    name: 'Basic Savings C1',
    code: 'BSC1-2024',
    totalAmount: 100000,
    installmentAmount: 10000,
    duration: 10,
    startDate: '2024-03-01',
    endDate: '2024-12-31',
    status: 'active',
    branchId: 'branch_002',
    agentId: 'agent_003',
    members: [],
    auctions: [],
    installments: [],
    commissionPercentage: 3,
    createdAt: '2024-02-25',
    updatedAt: '2024-03-10'
  }
];

const GroupCard: React.FC<{ group: ChitGroup }> = React.memo(({ group }) => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800 border-green-200';
      case 'completed': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'pending': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'suspended': return 'bg-red-100 text-red-800 border-red-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const calculateProgress = () => {
    const startDate = new Date(group.startDate);
    const endDate = new Date(group.endDate);
    const now = new Date();
    
    if (now < startDate) return 0;
    if (now > endDate) return 100;
    
    const totalDuration = endDate.getTime() - startDate.getTime();
    const elapsed = now.getTime() - startDate.getTime();
    return (elapsed / totalDuration) * 100;
  };

  const progress = calculateProgress();

  return (
    <div className="bg-slate-800/40 backdrop-blur-xl rounded-2xl p-6 border border-yellow-400/30 hover:border-yellow-400/50 transition-all">
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center space-x-3">
          <div className="p-3 bg-blue-500/20 rounded-xl border border-yellow-400/30">
            <CreditCard className="h-6 w-6 text-blue-400" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-slate-50">{group.name}</h3>
            <p className="text-sm text-slate-400">{group.code}</p>
          </div>
        </div>
        <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium border ${getStatusColor(group.status)}`}>
          {group.status.toUpperCase()}
        </span>
      </div>

      <div className="space-y-3 mb-4">
        <div className="flex items-center justify-between text-sm">
          <span className="text-slate-400">Total Amount</span>
          <span className="text-slate-50 font-medium">{formatCurrency(group.totalAmount)}</span>
        </div>
        <div className="flex items-center justify-between text-sm">
          <span className="text-slate-400">Monthly Installment</span>
          <span className="text-green-400 font-medium">{formatCurrency(group.installmentAmount)}</span>
        </div>
        <div className="flex items-center justify-between text-sm">
          <span className="text-slate-400">Duration</span>
          <span className="text-slate-50">{group.duration} months</span>
        </div>
        <div className="flex items-center justify-between text-sm">
          <span className="text-slate-400">Commission</span>
          <span className="text-purple-400">{group.commissionPercentage}%</span>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="mb-4">
        <div className="flex justify-between text-sm text-slate-400 mb-1">
          <span>Progress</span>
          <span>{Math.round(progress)}%</span>
        </div>
        <div className="w-full bg-slate-700/50 rounded-full h-2 border border-yellow-400/20">
          <div
            className="bg-gradient-to-r from-blue-500 to-green-500 h-2 rounded-full transition-all duration-300"
            style={{ width: `${Math.min(progress, 100)}%` }}
          ></div>
        </div>
      </div>

      <div className="flex justify-between items-center pt-4 border-t border-yellow-400/20">
        <div className="flex items-center text-xs text-slate-500">
          <Calendar className="h-3 w-3 mr-1" />
          <span>Started {new Date(group.startDate).toLocaleDateString()}</span>
        </div>
        <div className="flex space-x-2">
          <button className="p-2 text-slate-400 hover:text-blue-400 hover:bg-blue-500/10 rounded-lg transition-all">
            <Eye className="h-4 w-4" />
          </button>
          <button className="p-2 text-slate-400 hover:text-green-400 hover:bg-green-500/10 rounded-lg transition-all">
            <Users className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );
});

export const GroupsOverview: React.FC = () => {
  const [groups] = useState<ChitGroup[]>(sampleGroups);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [selectedBranch, setSelectedBranch] = useState<string>('all');

  const filteredGroups = useMemo(() => groups.filter(group => {
    const matchesSearch = group.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         group.code.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === 'all' || group.status === filterStatus;
    const matchesBranch = selectedBranch === 'all' || group.branchId === selectedBranch;
    
    return matchesSearch && matchesStatus && matchesBranch;
  }), [groups, searchTerm, filterStatus, selectedBranch]);

  const stats = useMemo(() => ({
    totalGroups: groups.length,
    activeGroups: groups.filter(g => g.status === 'active').length,
    completedGroups: groups.filter(g => g.status === 'completed').length,
    pendingGroups: groups.filter(g => g.status === 'pending').length,
    suspendedGroups: groups.filter(g => g.status === 'suspended').length,
    totalValue: groups.reduce((sum, g) => sum + g.totalAmount, 0),
    monthlyCollection: groups.reduce((sum, g) => sum + g.installmentAmount, 0),
    avgCommission: groups.length > 0 ? groups.reduce((sum, g) => sum + g.commissionPercentage, 0) / groups.length : 0
  }), [groups]);

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0,
    }).format(amount);
  };

  return (
    <div className="h-full flex flex-col bg-slate-900 overflow-hidden">
      {/* Header */}
      <div className="flex justify-between items-center p-4 border-b border-yellow-400/30 flex-shrink-0">
        <div>
          <h1 className="text-2xl font-bold text-slate-50">Branch Overview</h1>
          <p className="mt-1 text-sm text-slate-400">
            Monitor chit group operations across all branches with real-time metrics
          </p>
        </div>
        <div className="flex space-x-3">
          <button className="inline-flex items-center px-4 py-2 border border-yellow-400/30 text-sm font-medium rounded-lg text-slate-50 bg-slate-700/50 hover:bg-slate-700 transition-all backdrop-blur-sm">
            <RefreshCw className="h-4 w-4 mr-2" />
            Refresh Data
          </button>
          <button className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-lg shadow-sm text-white bg-blue-600 hover:bg-blue-700 transition-all">
            <Plus className="h-4 w-4 mr-2" />
            Create Group
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto p-4 space-y-6 scrollbar-none">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 lg:grid-cols-8 gap-4">
          <div className="bg-slate-800/40 backdrop-blur-xl p-4 rounded-xl border border-yellow-400/30">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-400">Total Groups</p>
                <p className="text-2xl font-bold text-slate-50">{stats.totalGroups}</p>
              </div>
              <Building className="h-8 w-8 text-blue-400" />
            </div>
          </div>
          <div className="bg-slate-800/40 backdrop-blur-xl p-4 rounded-xl border border-yellow-400/30">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-400">Active</p>
                <p className="text-2xl font-bold text-green-400">{stats.activeGroups}</p>
              </div>
              <CheckCircle className="h-8 w-8 text-green-400" />
            </div>
          </div>
          <div className="bg-slate-800/40 backdrop-blur-xl p-4 rounded-xl border border-yellow-400/30">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-400">Completed</p>
                <p className="text-2xl font-bold text-blue-400">{stats.completedGroups}</p>
              </div>
              <Award className="h-8 w-8 text-blue-400" />
            </div>
          </div>
          <div className="bg-slate-800/40 backdrop-blur-xl p-4 rounded-xl border border-yellow-400/30">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-400">Pending</p>
                <p className="text-2xl font-bold text-yellow-400">{stats.pendingGroups}</p>
              </div>
              <Clock className="h-8 w-8 text-yellow-400" />
            </div>
          </div>
          <div className="bg-slate-800/40 backdrop-blur-xl p-4 rounded-xl border border-yellow-400/30">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-400">Suspended</p>
                <p className="text-2xl font-bold text-red-400">{stats.suspendedGroups}</p>
              </div>
              <AlertTriangle className="h-8 w-8 text-red-400" />
            </div>
          </div>
          <div className="bg-slate-800/40 backdrop-blur-xl p-4 rounded-xl border border-yellow-400/30">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-400">Avg Commission</p>
                <p className="text-2xl font-bold text-purple-400">{stats.avgCommission.toFixed(1)}%</p>
              </div>
              <Target className="h-8 w-8 text-purple-400" />
            </div>
          </div>
          <div className="bg-slate-800/40 backdrop-blur-xl p-4 rounded-xl border border-yellow-400/30">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-400">Total Value</p>
                <p className="text-xl font-bold text-emerald-400">{formatCurrency(stats.totalValue)}</p>
              </div>
              <DollarSign className="h-8 w-8 text-emerald-400" />
            </div>
          </div>
          <div className="bg-slate-800/40 backdrop-blur-xl p-4 rounded-xl border border-yellow-400/30">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-400">Monthly Collection</p>
                <p className="text-xl font-bold text-orange-400">{formatCurrency(stats.monthlyCollection)}</p>
              </div>
              <TrendingUp className="h-8 w-8 text-orange-400" />
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
                placeholder="Search groups..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-2 bg-slate-700/50 border border-yellow-400/30 rounded-lg w-full text-slate-50 placeholder-slate-400 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 backdrop-blur-sm"
              />
            </div>
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="px-3 py-2 bg-slate-700/50 border border-yellow-400/30 rounded-lg text-slate-50 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 backdrop-blur-sm"
            >
              <option value="all">All Status</option>
              <option value="active">Active</option>
              <option value="completed">Completed</option>
              <option value="pending">Pending</option>
              <option value="suspended">Suspended</option>
            </select>
            <select
              value={selectedBranch}
              onChange={(e) => setSelectedBranch(e.target.value)}
              className="px-3 py-2 bg-slate-700/50 border border-yellow-400/30 rounded-lg text-slate-50 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 backdrop-blur-sm"
            >
              <option value="all">All Branches</option>
              <option value="branch_001">Bangalore Main</option>
              <option value="branch_002">Chennai Branch</option>
              <option value="branch_003">Hyderabad Branch</option>
            </select>
            <div className="text-sm text-slate-400">
              Showing: <span className="font-semibold text-slate-50">{filteredGroups.length}</span> groups
            </div>
          </div>
        </div>

        {/* Groups Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {filteredGroups.map((group) => (
            <GroupCard key={group.id} group={group} />
          ))}
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-slate-800/40 backdrop-blur-xl rounded-2xl p-6 border border-yellow-400/30">
            <h3 className="text-lg font-semibold text-slate-50 mb-4 flex items-center">
              <BarChart3 className="h-5 w-5 mr-2" />
              Monthly Collections Trend
            </h3>
            <div className="h-64 flex items-center justify-center border-2 border-dashed border-yellow-400/30 rounded-xl">
              <div className="text-center">
                <BarChart3 className="h-12 w-12 mx-auto text-slate-400 mb-2" />
                <p className="text-slate-400">Collections Chart</p>
                <p className="text-slate-500 text-sm">Interactive chart coming soon</p>
              </div>
            </div>
          </div>

          <div className="bg-slate-800/40 backdrop-blur-xl rounded-2xl p-6 border border-yellow-400/30">
            <h3 className="text-lg font-semibold text-slate-50 mb-4 flex items-center">
              <PieChart className="h-5 w-5 mr-2" />
              Group Status Distribution
            </h3>
            <div className="h-64 flex items-center justify-center border-2 border-dashed border-yellow-400/30 rounded-xl">
              <div className="text-center">
                <PieChart className="h-12 w-12 mx-auto text-slate-400 mb-2" />
                <p className="text-slate-400">Status Distribution</p>
                <p className="text-slate-500 text-sm">Interactive chart coming soon</p>
              </div>
            </div>
          </div>
        </div>

        {filteredGroups.length === 0 && (
          <div className="text-center py-12">
            <Building className="h-12 w-12 mx-auto text-slate-500 mb-4" />
            <h3 className="text-lg font-medium text-slate-50 mb-2">No groups found</h3>
            <p className="text-sm text-slate-400">Try adjusting your search criteria or create a new chit group.</p>
          </div>
        )}
      </div>
    </div>
  );
};