import React, { useState, useMemo } from 'react';
import { Plus, Search, CreditCard as Edit, Trash2, Eye, Users, Calendar, DollarSign, TrendingUp, CheckCircle, Clock, AlertTriangle, Gavel, Target, Award, Star, Filter, Download, Upload, MoreVertical, Building, User, CreditCard, Activity, MapPin, Phone, Mail } from 'lucide-react';
import { ChitGroup } from '../../types/chit';
import { ActionButton } from '../UI/ActionButton';
import { ActionCard } from '../UI/ActionCard';
import { useActions } from '../../hooks/useActions';
import toast from 'react-hot-toast';

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
    branchId: 'Bangalore Main',
    agentId: 'Karthik Nair',
    members: [
      {
        id: 'mem1',
        groupId: '1',
        memberId: 'SUB001',
        memberNumber: 1,
        joiningDate: '2024-01-01',
        status: 'active',
        documents: [],
        totalPaid: 200000,
        totalDue: 800000,
        prizeReceived: false
      },
      {
        id: 'mem2',
        groupId: '1',
        memberId: 'SUB002',
        memberNumber: 2,
        joiningDate: '2024-01-01',
        status: 'active',
        documents: [],
        totalPaid: 200000,
        totalDue: 800000,
        prizeReceived: false
      }
    ],
    auctions: [
      {
        id: 'auc1',
        groupId: '1',
        month: 3,
        auctionDate: '2024-03-15',
        winnerId: 'SUB001',
        discountAmount: 5000,
        prizeAmount: 45000,
        status: 'completed',
        bids: [],
        conductedBy: 'Karthik Nair',
        witnessedBy: ['Rajesh Kumar'],
        createdAt: '2024-03-15'
      }
    ],
    installments: [],
    commissionPercentage: 5,
    createdAt: '2024-01-01',
    updatedAt: '2024-03-15'
  },
  {
    id: '2',
    name: 'Silver Monthly B2',
    code: 'SMB2-2024',
    totalAmount: 300000,
    installmentAmount: 25000,
    duration: 12,
    startDate: '2024-02-01',
    endDate: '2025-01-31',
    status: 'active',
    branchId: 'Bangalore East',
    agentId: 'Vikram Singh',
    members: [
      {
        id: 'mem3',
        groupId: '2',
        memberId: 'SUB003',
        memberNumber: 1,
        joiningDate: '2024-02-01',
        status: 'active',
        documents: [],
        totalPaid: 50000,
        totalDue: 250000,
        prizeReceived: false
      }
    ],
    auctions: [],
    installments: [],
    commissionPercentage: 4,
    createdAt: '2024-02-01',
    updatedAt: '2024-03-15'
  },
  {
    id: '3',
    name: 'Basic Savings C3',
    code: 'BSC3-2024',
    totalAmount: 100000,
    installmentAmount: 10000,
    duration: 10,
    startDate: '2024-03-01',
    endDate: '2024-12-31',
    status: 'pending',
    branchId: 'Bangalore South',
    agentId: 'Priya Reddy',
    members: [],
    auctions: [],
    installments: [],
    commissionPercentage: 3,
    createdAt: '2024-03-01',
    updatedAt: '2024-03-15'
  },
  {
    id: '4',
    name: 'Corporate Chit D4',
    code: 'CCD4-2024',
    totalAmount: 2500000,
    installmentAmount: 100000,
    duration: 25,
    startDate: '2024-01-15',
    endDate: '2026-01-31',
    status: 'active',
    branchId: 'Chennai Branch',
    agentId: 'Suresh Kumar',
    members: [
      {
        id: 'mem4',
        groupId: '4',
        memberId: 'SUB004',
        memberNumber: 1,
        joiningDate: '2024-01-15',
        status: 'active',
        documents: [],
        totalPaid: 300000,
        totalDue: 2200000,
        prizeReceived: false
      },
      {
        id: 'mem5',
        groupId: '4',
        memberId: 'SUB005',
        memberNumber: 2,
        joiningDate: '2024-01-15',
        status: 'defaulter',
        documents: [],
        totalPaid: 150000,
        totalDue: 2350000,
        prizeReceived: false
      }
    ],
    auctions: [],
    installments: [],
    commissionPercentage: 6,
    createdAt: '2024-01-15',
    updatedAt: '2024-03-15'
  },
  {
    id: '5',
    name: 'Quick Return E5',
    code: 'QRE5-2023',
    totalAmount: 60000,
    installmentAmount: 10000,
    duration: 6,
    startDate: '2023-06-01',
    endDate: '2023-11-30',
    status: 'completed',
    branchId: 'Hyderabad Branch',
    agentId: 'Anjali Sharma',
    members: [
      {
        id: 'mem6',
        groupId: '5',
        memberId: 'SUB006',
        memberNumber: 1,
        joiningDate: '2023-06-01',
        status: 'active',
        documents: [],
        totalPaid: 60000,
        totalDue: 0,
        prizeReceived: true,
        prizeAmount: 55000,
        prizeMonth: 4
      }
    ],
    auctions: [
      {
        id: 'auc2',
        groupId: '5',
        month: 4,
        auctionDate: '2023-09-15',
        winnerId: 'SUB006',
        discountAmount: 5000,
        prizeAmount: 55000,
        status: 'completed',
        bids: [],
        conductedBy: 'Anjali Sharma',
        witnessedBy: ['Branch Manager'],
        createdAt: '2023-09-15'
      }
    ],
    installments: [],
    commissionPercentage: 4,
    createdAt: '2023-06-01',
    updatedAt: '2023-11-30'
  }
];

const GroupCard: React.FC<{ group: ChitGroup }> = React.memo(({ group }) => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800 border-green-200';
      case 'pending': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'completed': return 'bg-blue-100 text-blue-800 border-blue-200';
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
    return Math.round((elapsed / totalDuration) * 100);
  };

  const progress = calculateProgress();
  const totalMembers = group.members.length;
  const activeMembers = group.members.filter(m => m.status === 'active').length;
  const defaulters = group.members.filter(m => m.status === 'defaulter').length;
  const totalCollected = group.members.reduce((sum, m) => sum + m.totalPaid, 0);
  const pendingCollection = group.members.reduce((sum, m) => sum + m.totalDue, 0);
  
  const { navigateTo } = useActions();

  const handleViewGroup = () => {
    navigateTo(`/chit-360?id=${group.id}`);
  };

  const handleConductAuction = () => {
    navigateTo(`/auction?groupId=${group.id}`);
  };

  const handleEditGroup = () => {
    navigateTo(`/chit-edit?id=${group.id}`);
  };

  return (
    <ActionCard 
      action="view-group"
      id={group.id}
      onClick={handleViewGroup}
      className="p-6"
    >
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

      {/* Progress Bar */}
      <div className="mb-4">
        <div className="flex justify-between text-sm text-slate-400 mb-1">
          <span>Group Progress</span>
          <span>{progress}%</span>
        </div>
        <div className="w-full bg-slate-700/50 rounded-full h-2 border border-yellow-400/20">
          <div
            className="bg-gradient-to-r from-blue-500 to-green-500 h-2 rounded-full transition-all duration-300"
            style={{ width: `${Math.min(progress, 100)}%` }}
          ></div>
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
            <span className="text-blue-400 font-medium">{formatCurrency(group.installmentAmount)}</span>
          </div>
          <div className="flex items-center justify-between text-sm">
            <span className="text-slate-400">Duration</span>
            <span className="text-slate-50">{group.duration} months</span>
          </div>
        </div>
        <div className="space-y-2">
          <div className="flex items-center justify-between text-sm">
            <span className="text-slate-400">Total Members</span>
            <span className="text-slate-50 font-medium">{totalMembers}</span>
          </div>
          <div className="flex items-center justify-between text-sm">
            <span className="text-slate-400">Active</span>
            <span className="text-green-400 font-medium">{activeMembers}</span>
          </div>
          <div className="flex items-center justify-between text-sm">
            <span className="text-slate-400">Defaulters</span>
            <span className="text-red-400 font-medium">{defaulters}</span>
          </div>
        </div>
      </div>

      <div className="mb-4 p-3 bg-slate-700/30 rounded-xl border border-yellow-400/20">
        <div className="flex items-center justify-between text-sm mb-2">
          <span className="text-slate-400">Collected</span>
          <span className="text-green-400 font-medium">{formatCurrency(totalCollected)}</span>
        </div>
        <div className="flex items-center justify-between text-sm">
          <span className="text-slate-400">Pending</span>
          <span className="text-red-400 font-medium">{formatCurrency(pendingCollection)}</span>
        </div>
      </div>

      <div className="space-y-2 mb-4">
        <div className="flex items-center text-sm text-slate-300">
          <Building className="h-4 w-4 mr-2 text-slate-500" />
          <span>{group.branchId}</span>
        </div>
        <div className="flex items-center text-sm text-slate-300">
          <User className="h-4 w-4 mr-2 text-slate-500" />
          <span>Agent: {group.agentId}</span>
        </div>
        <div className="flex items-center text-sm text-slate-300">
          <Calendar className="h-4 w-4 mr-2 text-slate-500" />
          <span>{new Date(group.startDate).toLocaleDateString()} - {new Date(group.endDate).toLocaleDateString()}</span>
        </div>
      </div>

      <div className="flex justify-between items-center pt-4 border-t border-yellow-400/20">
        <div className="flex items-center text-xs text-slate-500">
          <Activity className="h-3 w-3 mr-1" />
          <span>Updated {new Date(group.updatedAt).toLocaleDateString()}</span>
        </div>
        <div className="flex space-x-2">
          <ActionButton
            action="view-group"
            id={group.id}
            onClick={handleViewGroup}
            variant="secondary"
            size="sm"
            className="p-2"
          >
            <Eye className="h-4 w-4" />
          </ActionButton>
          <ActionButton
            action="conduct-auction"
            id={group.id}
            onClick={handleConductAuction}
            variant="secondary"
            size="sm"
            className="p-2"
          >
            <Gavel className="h-4 w-4" />
          </ActionButton>
          <ActionButton
            action="edit-group"
            id={group.id}
            onClick={handleEditGroup}
            variant="secondary"
            size="sm"
            className="p-2"
          >
            <Edit className="h-4 w-4" />
          </ActionButton>
          <ActionButton
            action="delete-group"
            id={group.id}
            confirm="Are you sure you want to delete this group?"
            variant="danger"
            size="sm"
            className="p-2"
          >
            <Trash2 className="h-4 w-4" />
          </ActionButton>
        </div>
      </div>
    </ActionCard>
  );
});

const GroupTable: React.FC<{ groups: ChitGroup[] }> = React.memo(({ groups }) => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'completed': return 'bg-blue-100 text-blue-800';
      case 'suspended': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0,
    }).format(amount);
  };

  return (
    <div className="bg-slate-800/40 backdrop-blur-xl rounded-2xl border border-yellow-400/30 overflow-hidden">
      <div className="overflow-x-auto max-h-[600px] overflow-y-auto">
        <table className="w-full">
          <thead className="bg-slate-700/50 border-b border-yellow-400/20 sticky top-0">
            <tr>
              <th className="px-6 py-4 text-left text-xs font-medium text-slate-300 uppercase tracking-wider">Group</th>
              <th className="px-6 py-4 text-left text-xs font-medium text-slate-300 uppercase tracking-wider">Branch & Agent</th>
              <th className="px-6 py-4 text-left text-xs font-medium text-slate-300 uppercase tracking-wider">Financial</th>
              <th className="px-6 py-4 text-left text-xs font-medium text-slate-300 uppercase tracking-wider">Members</th>
              <th className="px-6 py-4 text-left text-xs font-medium text-slate-300 uppercase tracking-wider">Status</th>
              <th className="px-6 py-4 text-left text-xs font-medium text-slate-300 uppercase tracking-wider">Duration</th>
              <th className="px-6 py-4 text-left text-xs font-medium text-slate-300 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-yellow-400/20">
            {groups.map((group) => (
              <tr key={group.id} className="hover:bg-slate-700/20 transition-colors">
                <td className="px-6 py-4 whitespace-nowrap">
                  <div>
                    <p className="text-sm font-medium text-slate-50">{group.name}</p>
                    <p className="text-xs text-slate-400">{group.code}</p>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div>
                    <p className="text-sm font-medium text-slate-50">{group.branchId}</p>
                    <p className="text-xs text-slate-400">Agent: {group.agentId}</p>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div>
                    <p className="text-sm font-medium text-slate-50">{formatCurrency(group.totalAmount)}</p>
                    <p className="text-xs text-blue-400">{formatCurrency(group.installmentAmount)} monthly</p>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div>
                    <p className="text-sm font-medium text-slate-50">{group.members.length}</p>
                    <p className="text-xs text-green-400">{group.members.filter(m => m.status === 'active').length} active</p>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(group.status)}`}>
                    {group.status}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div>
                    <p className="text-sm text-slate-50">{group.duration} months</p>
                    <p className="text-xs text-slate-400">{new Date(group.startDate).toLocaleDateString()}</p>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <div className="flex space-x-2">
                    <button className="text-blue-400 hover:text-blue-300">
                      <Eye className="h-4 w-4" />
                    </button>
                    <button className="text-purple-400 hover:text-purple-300">
                      <Gavel className="h-4 w-4" />
                    </button>
                    <button className="text-green-400 hover:text-green-300">
                      <Edit className="h-4 w-4" />
                    </button>
                    <button className="text-red-400 hover:text-red-300">
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
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
  
  const { navigateTo } = useActions();

  const handleCreateGroup = () => {
    navigateTo('/chit-create');
  };

  const filteredGroups = useMemo(() => groups.filter(group => {
    const matchesSearch = group.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         group.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         group.branchId.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === 'all' || group.status === filterStatus;
    const matchesBranch = filterBranch === 'all' || group.branchId === filterBranch;
    
    return matchesSearch && matchesStatus && matchesBranch;
  }), [groups, searchTerm, filterStatus, filterBranch]);

  const stats = useMemo(() => ({
    total: groups.length,
    active: groups.filter(g => g.status === 'active').length,
    pending: groups.filter(g => g.status === 'pending').length,
    completed: groups.filter(g => g.status === 'completed').length,
    suspended: groups.filter(g => g.status === 'suspended').length,
    totalMembers: groups.reduce((sum, g) => sum + g.members.length, 0),
    totalValue: groups.reduce((sum, g) => sum + g.totalAmount, 0),
    totalCollected: groups.reduce((sum, g) => sum + g.members.reduce((memberSum, m) => memberSum + m.totalPaid, 0), 0),
    totalPending: groups.reduce((sum, g) => sum + g.members.reduce((memberSum, m) => memberSum + m.totalDue, 0), 0),
    upcomingAuctions: groups.filter(g => g.status === 'active').length * 2, // Mock data
    defaulters: groups.reduce((sum, g) => sum + g.members.filter(m => m.status === 'defaulter').length, 0)
  }), [groups]);

  const uniqueBranches = useMemo(() => [...new Set(groups.map(g => g.branchId))], [groups]);

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
            <Upload className="h-4 w-4 mr-2" />
            Import Groups
          </button>
          <button className="inline-flex items-center px-4 py-2 border border-yellow-400/30 text-sm font-medium rounded-lg text-slate-50 bg-slate-700/50 hover:bg-slate-700 transition-all backdrop-blur-sm">
            <Download className="h-4 w-4 mr-2" />
            Export
          </button>
          <ActionButton
            action="create-group"
            onClick={handleCreateGroup}
            variant="primary"
          >
            <Plus className="h-4 w-4 mr-2" />
            Create Group
          </ActionButton>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto p-4 space-y-6 scrollbar-none">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 lg:grid-cols-11 gap-4">
          <div className="bg-slate-800/40 backdrop-blur-xl p-4 rounded-xl border border-yellow-400/30">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-400">Total Groups</p>
                <p className="text-2xl font-bold text-slate-50">{stats.total}</p>
              </div>
              <CreditCard className="h-8 w-8 text-blue-400" />
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
                <p className="text-sm text-slate-400">Pending</p>
                <p className="text-2xl font-bold text-yellow-400">{stats.pending}</p>
              </div>
              <Clock className="h-8 w-8 text-yellow-400" />
            </div>
          </div>
          <div className="bg-slate-800/40 backdrop-blur-xl p-4 rounded-xl border border-yellow-400/30">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-400">Completed</p>
                <p className="text-2xl font-bold text-blue-400">{stats.completed}</p>
              </div>
              <Award className="h-8 w-8 text-blue-400" />
            </div>
          </div>
          <div className="bg-slate-800/40 backdrop-blur-xl p-4 rounded-xl border border-yellow-400/30">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-400">Suspended</p>
                <p className="text-2xl font-bold text-red-400">{stats.suspended}</p>
              </div>
              <AlertTriangle className="h-8 w-8 text-red-400" />
            </div>
          </div>
          <div className="bg-slate-800/40 backdrop-blur-xl p-4 rounded-xl border border-yellow-400/30">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-400">Total Members</p>
                <p className="text-2xl font-bold text-purple-400">{stats.totalMembers}</p>
              </div>
              <Users className="h-8 w-8 text-purple-400" />
            </div>
          </div>
          <div className="bg-slate-800/40 backdrop-blur-xl p-4 rounded-xl border border-yellow-400/30">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-400">Defaulters</p>
                <p className="text-2xl font-bold text-red-400">{stats.defaulters}</p>
              </div>
              <AlertTriangle className="h-8 w-8 text-red-400" />
            </div>
          </div>
          <div className="bg-slate-800/40 backdrop-blur-xl p-4 rounded-xl border border-yellow-400/30">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-400">Auctions</p>
                <p className="text-2xl font-bold text-orange-400">{stats.upcomingAuctions}</p>
              </div>
              <Gavel className="h-8 w-8 text-orange-400" />
            </div>
          </div>
          <div className="bg-slate-800/40 backdrop-blur-xl p-4 rounded-xl border border-yellow-400/30 md:col-span-2">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-400">Total Portfolio</p>
                <p className="text-xl font-bold text-emerald-400">{formatCurrency(stats.totalValue)}</p>
              </div>
              <DollarSign className="h-8 w-8 text-emerald-400" />
            </div>
          </div>
          <div className="bg-slate-800/40 backdrop-blur-xl p-4 rounded-xl border border-yellow-400/30">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-400">Collected</p>
                <p className="text-xl font-bold text-green-400">{formatCurrency(stats.totalCollected)}</p>
              </div>
              <TrendingUp className="h-8 w-8 text-green-400" />
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
              <option value="pending">Pending</option>
              <option value="completed">Completed</option>
              <option value="suspended">Suspended</option>
            </select>
            <select
              value={filterBranch}
              onChange={(e) => setFilterBranch(e.target.value)}
              className="px-3 py-2 bg-slate-700/50 border border-yellow-400/30 rounded-lg text-slate-50 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 backdrop-blur-sm"
            >
              <option value="all">All Branches</option>
              {uniqueBranches.map(branch => (
                <option key={branch} value={branch}>{branch}</option>
              ))}
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
          <GroupTable groups={filteredGroups} />
        )}

        {filteredGroups.length === 0 && (
          <div className="text-center py-12">
            <CreditCard className="h-12 w-12 mx-auto text-slate-500 mb-4" />
            <h3 className="text-lg font-medium text-slate-50 mb-2">No groups found</h3>
            <p className="text-sm text-slate-400">Try adjusting your search criteria or create a new group.</p>
          </div>
        )}
      </div>
    </div>
  );
};