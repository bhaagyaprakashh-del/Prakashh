import React, { useState, useMemo } from 'react';
import {
  Plus,
  Search,
  Edit,
  Trash2,
  Eye,
  Users,
  Calendar,
  DollarSign,
  TrendingUp,
  Building,
  CreditCard,
  CheckCircle,
  Clock,
  AlertTriangle,
  Star,
  Target,
  Award,
  Activity,
  Filter,
  Download,
  Upload,
  MoreVertical,
  Gavel,
  Receipt,
  UserCheck
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
  },
  {
    id: '4',
    name: 'Quick Return D1',
    code: 'QRD1-2023',
    totalAmount: 60000,
    installmentAmount: 10000,
    duration: 6,
    startDate: '2023-06-01',
    endDate: '2023-11-30',
    status: 'completed',
    branchId: 'branch_001',
    agentId: 'agent_001',
    members: [],
    auctions: [],
    installments: [],
    commissionPercentage: 4,
    createdAt: '2023-05-15',
    updatedAt: '2023-11-30'
  },
  {
    id: '5',
    name: 'Corporate Chit E1',
    code: 'CCE1-2024',
    totalAmount: 2500000,
    installmentAmount: 100000,
    duration: 25,
    startDate: '2024-04-01',
    endDate: '2026-04-30',
    status: 'pending',
    branchId: 'branch_003',
    agentId: 'agent_004',
    members: [],
    auctions: [],
    installments: [],
    commissionPercentage: 6,
    createdAt: '2024-03-10',
    updatedAt: '2024-03-15'
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
  const memberCount = group.members?.length || 0;
  const auctionCount = group.auctions?.length || 0;

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
        <div className="flex items-center space-x-2">
          <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium border ${getStatusColor(group.status)}`}>
            {group.status.toUpperCase()}
          </span>
          <button className="p-2 text-slate-400 hover:text-slate-50 hover:bg-slate-700/50 rounded-lg transition-all">
            <MoreVertical className="h-4 w-4" />
          </button>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 mb-4">
        <div className="space-y-2">
          <div className="flex items-center justify-between text-sm">
            <span className="text-slate-400">Total Amount</span>
            <span className="text-slate-50 font-medium">{formatCurrency(group.totalAmount)}</span>
          </div>
          <div className="flex items-center justify-between text-sm">
            <span className="text-slate-400">Monthly</span>
            <span className="text-green-400 font-medium">{formatCurrency(group.installmentAmount)}</span>
          </div>
          <div className="flex items-center justify-between text-sm">
            <span className="text-slate-400">Duration</span>
            <span className="text-slate-50">{group.duration} months</span>
          </div>
        </div>
        <div className="space-y-2">
          <div className="flex items-center justify-between text-sm">
            <span className="text-slate-400">Members</span>
            <span className="text-blue-400 font-medium">{memberCount}</span>
          </div>
          <div className="flex items-center justify-between text-sm">
            <span className="text-slate-400">Auctions</span>
            <span className="text-purple-400 font-medium">{auctionCount}</span>
          </div>
          <div className="flex items-center justify-between text-sm">
            <span className="text-slate-400">Commission</span>
            <span className="text-orange-400">{group.commissionPercentage}%</span>
          </div>
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
            className={`h-2 rounded-full transition-all duration-300 ${
              group.status === 'completed' ? 'bg-blue-500' :
              progress >= 80 ? 'bg-green-500' :
              progress >= 50 ? 'bg-yellow-500' : 'bg-orange-500'
            }`}
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
          <button className="p-2 text-slate-400 hover:text-purple-400 hover:bg-purple-500/10 rounded-lg transition-all">
            <Gavel className="h-4 w-4" />
          </button>
          <button className="p-2 text-slate-400 hover:text-orange-400 hover:bg-orange-500/10 rounded-lg transition-all">
            <Edit className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );
});

export const ListOfGroups: React.FC = () => {
  const [groups] = useState<ChitGroup[]>(sampleGroups);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [filterBranch, setFilterBranch] = useState<string>('all');
  const [viewMode, setViewMode] = useState<'cards' | 'table'>('cards');

  const filteredGroups = useMemo(() => groups.filter(group => {
    const matchesSearch = group.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         group.code.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === 'all' || group.status === filterStatus;
    const matchesBranch = filterBranch === 'all' || group.branchId === filterBranch;
    
    return matchesSearch && matchesStatus && matchesBranch;
  }), [groups, searchTerm, filterStatus, filterBranch]);

  const stats = useMemo(() => ({
    totalGroups: groups.length,
    activeGroups: groups.filter(g => g.status === 'active').length,
    completedGroups: groups.filter(g => g.status === 'completed').length,
    pendingGroups: groups.filter(g => g.status === 'pending').length,
    suspendedGroups: groups.filter(g => g.status === 'suspended').length,
    totalValue: groups.reduce((sum, g) => sum + g.totalAmount, 0),
    monthlyCollection: groups.filter(g => g.status === 'active').reduce((sum, g) => sum + g.installmentAmount, 0),
    avgDuration: groups.length > 0 ? groups.reduce((sum, g) => sum + g.duration, 0) / groups.length : 0
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
          <h1 className="text-2xl font-bold text-slate-50">List of Groups</h1>
          <p className="mt-1 text-sm text-slate-400">
            Comprehensive list of all chit fund groups with detailed management
          </p>
        </div>
        <div className="flex space-x-3">
          <button className="inline-flex items-center px-4 py-2 border border-yellow-400/30 text-sm font-medium rounded-lg text-slate-50 bg-slate-700/50 hover:bg-slate-700 transition-all backdrop-blur-sm">
            <Download className="h-4 w-4 mr-2" />
            Export
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
                <p className="text-sm text-slate-400">Avg Duration</p>
                <p className="text-2xl font-bold text-purple-400">{stats.avgDuration.toFixed(0)}m</p>
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

        {/* Filters and View Toggle */}
        <div className="bg-slate-800/40 backdrop-blur-xl rounded-xl p-4 border border-yellow-400/30">
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4 items-center">
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
              value={filterBranch}
              onChange={(e) => setFilterBranch(e.target.value)}
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
            <div className="flex bg-slate-700/50 backdrop-blur-sm rounded-lg p-1 border border-yellow-400/20">
              <button
                onClick={() => setViewMode('cards')}
                className={`px-3 py-1 text-sm rounded-md transition-colors ${
                  viewMode === 'cards'
                    ? 'bg-blue-500 text-slate-50'
                    : 'text-slate-300 hover:text-slate-50'
                }`}
              >
                Cards
              </button>
              <button
                onClick={() => setViewMode('table')}
                className={`px-3 py-1 text-sm rounded-md transition-colors ${
                  viewMode === 'table'
                    ? 'bg-blue-500 text-slate-50'
                    : 'text-slate-300 hover:text-slate-50'
                }`}
              >
                Table
              </button>
            </div>
          </div>
        </div>

        {/* Groups Display */}
        {viewMode === 'cards' ? (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {filteredGroups.map((group) => (
              <GroupCard key={group.id} group={group} />
            ))}
          </div>
        ) : (
          <div className="bg-slate-800/40 backdrop-blur-xl rounded-2xl border border-yellow-400/30 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-slate-700/50 border-b border-yellow-400/20">
                  <tr>
                    <th className="px-6 py-4 text-left text-xs font-medium text-slate-300 uppercase tracking-wider">Group</th>
                    <th className="px-6 py-4 text-left text-xs font-medium text-slate-300 uppercase tracking-wider">Amount</th>
                    <th className="px-6 py-4 text-left text-xs font-medium text-slate-300 uppercase tracking-wider">Duration</th>
                    <th className="px-6 py-4 text-left text-xs font-medium text-slate-300 uppercase tracking-wider">Members</th>
                    <th className="px-6 py-4 text-left text-xs font-medium text-slate-300 uppercase tracking-wider">Status</th>
                    <th className="px-6 py-4 text-left text-xs font-medium text-slate-300 uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-yellow-400/20">
                  {filteredGroups.map((group) => (
                    <tr key={group.id} className="hover:bg-slate-700/20 transition-colors">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div>
                          <p className="text-sm font-medium text-slate-50">{group.name}</p>
                          <p className="text-xs text-slate-400">{group.code}</p>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div>
                          <p className="text-sm font-medium text-slate-50">{formatCurrency(group.totalAmount)}</p>
                          <p className="text-xs text-green-400">{formatCurrency(group.installmentAmount)}/month</p>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-50">
                        {group.duration} months
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-50">
                        {group.members?.length || 0}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(group.status)}`}>
                          {group.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <div className="flex space-x-2">
                          <button className="text-blue-400 hover:text-blue-300">
                            <Eye className="h-4 w-4" />
                          </button>
                          <button className="text-green-400 hover:text-green-300">
                            <Users className="h-4 w-4" />
                          </button>
                          <button className="text-purple-400 hover:text-purple-300">
                            <Gavel className="h-4 w-4" />
                          </button>
                          <button className="text-orange-400 hover:text-orange-300">
                            <Edit className="h-4 w-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

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