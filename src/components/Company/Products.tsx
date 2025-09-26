import React, { useState, useMemo } from 'react';
import {
  Plus,
  Search,
  Edit,
  Trash2,
  CreditCard,
  Users,
  Calendar,
  DollarSign,
  TrendingUp,
  Eye,
  MoreVertical,
  Target,
  Award,
  Clock,
  Percent,
  Building,
  Filter,
  Download,
  Upload,
  Settings,
  CheckCircle,
  XCircle,
  AlertTriangle,
  Star,
  Copy,
  Link
} from 'lucide-react';

interface ChitScheme {
  id: string;
  schemeName: string;
  period: number; // in months
  totalTickets: number;
  totalSubscribers: number;
  minimumBid: number;
  maximumBid: number;
  companyCommission: number; // percentage
  
  // Additional fields for better management
  schemeCode: string;
  ticketValue: number;
  status: 'active' | 'inactive' | 'draft' | 'completed';
  startDate?: string;
  endDate?: string;
  description: string;
  category: 'premium' | 'standard' | 'basic';
  
  // Calculated fields
  totalValue: number;
  monthlyCollection: number;
  commissionAmount: number;
  
  // Metadata
  createdAt: string;
  createdBy: string;
  updatedAt: string;
  updatedBy: string;
  
  // Future integration
  linkedGroups: number; // Number of groups created from this scheme
  activeGroups: number;
  completedGroups: number;
}

const sampleSchemes: ChitScheme[] = [
  {
    id: '1',
    schemeName: 'Premium Gold Chit',
    schemeCode: 'PGC-2024',
    period: 20,
    totalTickets: 20,
    totalSubscribers: 20,
    ticketValue: 50000,
    minimumBid: 5000,
    maximumBid: 15000,
    companyCommission: 5,
    status: 'active',
    startDate: '2024-01-01',
    endDate: '2025-08-31',
    description: 'Premium chit scheme for high-value investments with flexible bidding options',
    category: 'premium',
    totalValue: 1000000,
    monthlyCollection: 50000,
    commissionAmount: 2500,
    createdAt: '2023-12-01',
    createdBy: 'prakashh@ramnirmalchits.com',
    updatedAt: '2024-03-15',
    updatedBy: 'prakashh@ramnirmalchits.com',
    linkedGroups: 5,
    activeGroups: 3,
    completedGroups: 2
  },
  {
    id: '2',
    schemeName: 'Silver Monthly Chit',
    schemeCode: 'SMC-2024',
    period: 12,
    totalTickets: 12,
    totalSubscribers: 12,
    ticketValue: 25000,
    minimumBid: 2000,
    maximumBid: 8000,
    companyCommission: 4,
    status: 'active',
    startDate: '2024-02-01',
    endDate: '2025-01-31',
    description: 'Standard monthly chit scheme suitable for middle-income subscribers',
    category: 'standard',
    totalValue: 300000,
    monthlyCollection: 25000,
    commissionAmount: 1000,
    createdAt: '2023-11-15',
    createdBy: 'rajesh.kumar@ramnirmalchits.com',
    updatedAt: '2024-02-20',
    updatedBy: 'rajesh.kumar@ramnirmalchits.com',
    linkedGroups: 8,
    activeGroups: 6,
    completedGroups: 2
  },
  {
    id: '3',
    schemeName: 'Basic Savings Chit',
    schemeCode: 'BSC-2024',
    period: 10,
    totalTickets: 10,
    totalSubscribers: 10,
    ticketValue: 10000,
    minimumBid: 500,
    maximumBid: 3000,
    companyCommission: 3,
    status: 'active',
    startDate: '2024-03-01',
    endDate: '2024-12-31',
    description: 'Entry-level chit scheme for small savers and first-time subscribers',
    category: 'basic',
    totalValue: 100000,
    monthlyCollection: 10000,
    commissionAmount: 300,
    createdAt: '2024-01-10',
    createdBy: 'priya.sharma@ramnirmalchits.com',
    updatedAt: '2024-03-01',
    updatedBy: 'priya.sharma@ramnirmalchits.com',
    linkedGroups: 12,
    activeGroups: 10,
    completedGroups: 2
  },
  {
    id: '4',
    schemeName: 'Corporate Chit Plus',
    schemeCode: 'CCP-2024',
    period: 24,
    totalTickets: 25,
    totalSubscribers: 25,
    ticketValue: 100000,
    minimumBid: 10000,
    maximumBid: 30000,
    companyCommission: 6,
    status: 'draft',
    description: 'High-value corporate chit scheme for business investments and large subscribers',
    category: 'premium',
    totalValue: 2500000,
    monthlyCollection: 100000,
    commissionAmount: 6000,
    createdAt: '2024-03-10',
    createdBy: 'prakashh@ramnirmalchits.com',
    updatedAt: '2024-03-15',
    updatedBy: 'prakashh@ramnirmalchits.com',
    linkedGroups: 0,
    activeGroups: 0,
    completedGroups: 0
  },
  {
    id: '5',
    schemeName: 'Quick Return Chit',
    schemeCode: 'QRC-2023',
    period: 6,
    totalTickets: 6,
    totalSubscribers: 6,
    ticketValue: 15000,
    minimumBid: 1000,
    maximumBid: 4000,
    companyCommission: 4.5,
    status: 'completed',
    startDate: '2023-06-01',
    endDate: '2023-11-30',
    description: 'Short-term chit scheme for quick returns and emergency funding',
    category: 'standard',
    totalValue: 90000,
    monthlyCollection: 15000,
    commissionAmount: 675,
    createdAt: '2023-05-01',
    createdBy: 'rajesh.kumar@ramnirmalchits.com',
    updatedAt: '2023-11-30',
    updatedBy: 'system@ramnirmalchits.com',
    linkedGroups: 15,
    activeGroups: 0,
    completedGroups: 15
  }
];

const SchemeCard: React.FC<{ scheme: ChitScheme }> = React.memo(({ scheme }) => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800 border-green-200';
      case 'inactive': return 'bg-gray-100 text-gray-800 border-gray-200';
      case 'draft': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'completed': return 'bg-blue-100 text-blue-800 border-blue-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'premium': return 'bg-purple-100 text-purple-800 border-purple-200';
      case 'standard': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'basic': return 'bg-green-100 text-green-800 border-green-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'premium': return Star;
      case 'standard': return Award;
      case 'basic': return CheckCircle;
      default: return CreditCard;
    }
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const CategoryIcon = getCategoryIcon(scheme.category);

  return (
    <div className="bg-slate-800/40 backdrop-blur-xl rounded-2xl p-6 border border-yellow-400/30 hover:border-yellow-400/50 transition-all">
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center space-x-3">
          <div className="p-3 bg-blue-500/20 rounded-xl border border-yellow-400/30">
            <CategoryIcon className="h-6 w-6 text-blue-400" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-slate-50">{scheme.schemeName}</h3>
            <p className="text-sm text-slate-400">{scheme.schemeCode}</p>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium border ${getCategoryColor(scheme.category)}`}>
            {scheme.category.toUpperCase()}
          </span>
          <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium border ${getStatusColor(scheme.status)}`}>
            {scheme.status.toUpperCase()}
          </span>
          <button className="p-2 text-slate-400 hover:text-slate-50 hover:bg-slate-700/50 rounded-lg transition-all">
            <MoreVertical className="h-4 w-4" />
          </button>
        </div>
      </div>

      <p className="text-sm text-slate-300 mb-4">{scheme.description}</p>

      <div className="grid grid-cols-2 gap-4 mb-4">
        <div className="space-y-2">
          <div className="flex items-center justify-between text-sm">
            <span className="text-slate-400">Period</span>
            <span className="text-slate-50 font-medium">{scheme.period} months</span>
          </div>
          <div className="flex items-center justify-between text-sm">
            <span className="text-slate-400">Total Tickets</span>
            <span className="text-slate-50 font-medium">{scheme.totalTickets}</span>
          </div>
          <div className="flex items-center justify-between text-sm">
            <span className="text-slate-400">Subscribers</span>
            <span className="text-slate-50 font-medium">{scheme.totalSubscribers}</span>
          </div>
        </div>
        <div className="space-y-2">
          <div className="flex items-center justify-between text-sm">
            <span className="text-slate-400">Ticket Value</span>
            <span className="text-slate-50 font-medium">{formatCurrency(scheme.ticketValue)}</span>
          </div>
          <div className="flex items-center justify-between text-sm">
            <span className="text-slate-400">Commission</span>
            <span className="text-slate-50 font-medium">{scheme.companyCommission}%</span>
          </div>
          <div className="flex items-center justify-between text-sm">
            <span className="text-slate-400">Total Value</span>
            <span className="text-green-400 font-medium">{formatCurrency(scheme.totalValue)}</span>
          </div>
        </div>
      </div>

      <div className="mb-4 pt-4 border-t border-yellow-400/20">
        <div className="flex justify-between text-sm text-slate-400 mb-1">
          <span>Bid Range</span>
          <span>{formatCurrency(scheme.minimumBid)} - {formatCurrency(scheme.maximumBid)}</span>
        </div>
        <div className="w-full bg-slate-700/50 rounded-full h-2 border border-yellow-400/20">
          <div
            className="bg-gradient-to-r from-green-500 to-blue-500 h-2 rounded-full"
            style={{ width: `${(scheme.minimumBid / scheme.maximumBid) * 100}%` }}
          ></div>
        </div>
      </div>

      {scheme.linkedGroups > 0 && (
        <div className="grid grid-cols-3 gap-2 mb-4 text-center">
          <div className="bg-slate-700/30 rounded-lg p-2">
            <p className="text-xs text-slate-500">Total Groups</p>
            <p className="text-sm font-semibold text-slate-50">{scheme.linkedGroups}</p>
          </div>
          <div className="bg-slate-700/30 rounded-lg p-2">
            <p className="text-xs text-slate-500">Active</p>
            <p className="text-sm font-semibold text-green-400">{scheme.activeGroups}</p>
          </div>
          <div className="bg-slate-700/30 rounded-lg p-2">
            <p className="text-xs text-slate-500">Completed</p>
            <p className="text-sm font-semibold text-blue-400">{scheme.completedGroups}</p>
          </div>
        </div>
      )}

      <div className="flex justify-between items-center pt-4 border-t border-yellow-400/20">
        <div className="flex items-center text-xs text-slate-500">
          <Calendar className="h-3 w-3 mr-1" />
          <span>Updated {new Date(scheme.updatedAt).toLocaleDateString()}</span>
        </div>
        <div className="flex space-x-2">
          <button className="p-2 text-slate-400 hover:text-blue-400 hover:bg-blue-500/10 rounded-lg transition-all" title="View Details">
            <Eye className="h-4 w-4" />
          </button>
          <button className="p-2 text-slate-400 hover:text-purple-400 hover:bg-purple-500/10 rounded-lg transition-all" title="Create Group">
            <Link className="h-4 w-4" />
          </button>
          <button className="p-2 text-slate-400 hover:text-orange-400 hover:bg-orange-500/10 rounded-lg transition-all" title="Duplicate">
            <Copy className="h-4 w-4" />
          </button>
          <button className="p-2 text-slate-400 hover:text-green-400 hover:bg-green-500/10 rounded-lg transition-all" title="Edit">
            <Edit className="h-4 w-4" />
          </button>
          <button className="p-2 text-slate-400 hover:text-red-400 hover:bg-red-500/10 rounded-lg transition-all" title="Delete">
            <Trash2 className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );
});

const SchemeTable: React.FC<{ schemes: ChitScheme[] }> = React.memo(({ schemes }) => {
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800';
      case 'inactive': return 'bg-gray-100 text-gray-800';
      case 'draft': return 'bg-yellow-100 text-yellow-800';
      case 'completed': return 'bg-blue-100 text-blue-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="bg-slate-800/40 backdrop-blur-xl rounded-2xl border border-yellow-400/30 overflow-hidden">
      <div className="overflow-x-auto max-h-[600px] overflow-y-auto">
        <table className="w-full">
          <thead className="bg-slate-700/50 border-b border-yellow-400/20 sticky top-0">
            <tr>
              <th className="px-6 py-4 text-left text-xs font-medium text-slate-300 uppercase tracking-wider">Scheme</th>
              <th className="px-6 py-4 text-left text-xs font-medium text-slate-300 uppercase tracking-wider">Period & Tickets</th>
              <th className="px-6 py-4 text-left text-xs font-medium text-slate-300 uppercase tracking-wider">Values</th>
              <th className="px-6 py-4 text-left text-xs font-medium text-slate-300 uppercase tracking-wider">Bid Range</th>
              <th className="px-6 py-4 text-left text-xs font-medium text-slate-300 uppercase tracking-wider">Commission</th>
              <th className="px-6 py-4 text-left text-xs font-medium text-slate-300 uppercase tracking-wider">Status</th>
              <th className="px-6 py-4 text-left text-xs font-medium text-slate-300 uppercase tracking-wider">Groups</th>
              <th className="px-6 py-4 text-left text-xs font-medium text-slate-300 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-yellow-400/20">
            {schemes.map((scheme) => (
              <tr key={scheme.id} className="hover:bg-slate-700/20 transition-colors">
                <td className="px-6 py-4 whitespace-nowrap">
                  <div>
                    <p className="text-sm font-medium text-slate-50">{scheme.schemeName}</p>
                    <p className="text-xs text-slate-400">{scheme.schemeCode}</p>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div>
                    <p className="text-sm text-slate-50">{scheme.period} months</p>
                    <p className="text-xs text-slate-400">{scheme.totalTickets} tickets</p>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div>
                    <p className="text-sm font-medium text-slate-50">{formatCurrency(scheme.ticketValue)}</p>
                    <p className="text-xs text-green-400">{formatCurrency(scheme.totalValue)} total</p>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div>
                    <p className="text-sm text-slate-50">{formatCurrency(scheme.minimumBid)}</p>
                    <p className="text-xs text-slate-400">to {formatCurrency(scheme.maximumBid)}</p>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div>
                    <p className="text-sm font-medium text-slate-50">{scheme.companyCommission}%</p>
                    <p className="text-xs text-yellow-400">{formatCurrency(scheme.commissionAmount)}</p>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(scheme.status)}`}>
                    {scheme.status}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex space-x-1">
                    <span className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-blue-100 text-blue-800">
                      {scheme.linkedGroups}
                    </span>
                    {scheme.activeGroups > 0 && (
                      <span className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-green-100 text-green-800">
                        {scheme.activeGroups} active
                      </span>
                    )}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <div className="flex space-x-2">
                    <button className="text-blue-400 hover:text-blue-300" title="View">
                      <Eye className="h-4 w-4" />
                    </button>
                    <button className="text-purple-400 hover:text-purple-300" title="Create Group">
                      <Link className="h-4 w-4" />
                    </button>
                    <button className="text-green-400 hover:text-green-300" title="Edit">
                      <Edit className="h-4 w-4" />
                    </button>
                    <button className="text-red-400 hover:text-red-300" title="Delete">
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

export const Products: React.FC = () => {
  const [schemes] = useState<ChitScheme[]>(sampleSchemes);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [filterCategory, setFilterCategory] = useState<string>('all');
  const [viewMode, setViewMode] = useState<'cards' | 'table'>('cards');

  const filteredSchemes = useMemo(() => schemes.filter(scheme => {
    const matchesSearch = scheme.schemeName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         scheme.schemeCode.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         scheme.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === 'all' || scheme.status === filterStatus;
    const matchesCategory = filterCategory === 'all' || scheme.category === filterCategory;
    
    return matchesSearch && matchesStatus && matchesCategory;
  }), [schemes, searchTerm, filterStatus, filterCategory]);

  const stats = useMemo(() => ({
    total: schemes.length,
    active: schemes.filter(s => s.status === 'active').length,
    draft: schemes.filter(s => s.status === 'draft').length,
    completed: schemes.filter(s => s.status === 'completed').length,
    inactive: schemes.filter(s => s.status === 'inactive').length,
    premium: schemes.filter(s => s.category === 'premium').length,
    standard: schemes.filter(s => s.category === 'standard').length,
    basic: schemes.filter(s => s.category === 'basic').length,
    totalValue: schemes.reduce((sum, s) => sum + s.totalValue, 0),
    totalCommission: schemes.reduce((sum, s) => sum + s.commissionAmount, 0),
    totalGroups: schemes.reduce((sum, s) => sum + s.linkedGroups, 0),
    activeGroups: schemes.reduce((sum, s) => sum + s.activeGroups, 0)
  }), [schemes]);

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
          <h1 className="text-2xl font-bold text-slate-50">Products (Chit Schemes)</h1>
          <p className="mt-1 text-sm text-slate-400">
            Manage chit scheme templates for creating groups and managing subscriptions
          </p>
        </div>
        <div className="flex space-x-3">
          <button className="inline-flex items-center px-4 py-2 border border-yellow-400/30 text-sm font-medium rounded-lg text-slate-50 bg-slate-700/50 hover:bg-slate-700 transition-all backdrop-blur-sm">
            <Upload className="h-4 w-4 mr-2" />
            Import Schemes
          </button>
          <button className="inline-flex items-center px-4 py-2 border border-yellow-400/30 text-sm font-medium rounded-lg text-slate-50 bg-slate-700/50 hover:bg-slate-700 transition-all backdrop-blur-sm">
            <Download className="h-4 w-4 mr-2" />
            Export
          </button>
          <button className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-lg shadow-sm text-white bg-blue-600 hover:bg-blue-700 transition-all">
            <Plus className="h-4 w-4 mr-2" />
            Create Scheme
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto p-4 space-y-6 scrollbar-none">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 lg:grid-cols-12 gap-4">
          <div className="bg-slate-800/40 backdrop-blur-xl p-4 rounded-xl border border-yellow-400/30">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-400">Total Schemes</p>
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
                <p className="text-sm text-slate-400">Draft</p>
                <p className="text-2xl font-bold text-yellow-400">{stats.draft}</p>
              </div>
              <Edit className="h-8 w-8 text-yellow-400" />
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
                <p className="text-sm text-slate-400">Premium</p>
                <p className="text-2xl font-bold text-purple-400">{stats.premium}</p>
              </div>
              <Star className="h-8 w-8 text-purple-400" />
            </div>
          </div>
          <div className="bg-slate-800/40 backdrop-blur-xl p-4 rounded-xl border border-yellow-400/30">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-400">Standard</p>
                <p className="text-2xl font-bold text-blue-400">{stats.standard}</p>
              </div>
              <Award className="h-8 w-8 text-blue-400" />
            </div>
          </div>
          <div className="bg-slate-800/40 backdrop-blur-xl p-4 rounded-xl border border-yellow-400/30">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-400">Basic</p>
                <p className="text-2xl font-bold text-green-400">{stats.basic}</p>
              </div>
              <CheckCircle className="h-8 w-8 text-green-400" />
            </div>
          </div>
          <div className="bg-slate-800/40 backdrop-blur-xl p-4 rounded-xl border border-yellow-400/30">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-400">Total Groups</p>
                <p className="text-2xl font-bold text-orange-400">{stats.totalGroups}</p>
              </div>
              <Building className="h-8 w-8 text-orange-400" />
            </div>
          </div>
          <div className="bg-slate-800/40 backdrop-blur-xl p-4 rounded-xl border border-yellow-400/30">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-400">Active Groups</p>
                <p className="text-2xl font-bold text-emerald-400">{stats.activeGroups}</p>
              </div>
              <TrendingUp className="h-8 w-8 text-emerald-400" />
            </div>
          </div>
          <div className="bg-slate-800/40 backdrop-blur-xl p-4 rounded-xl border border-yellow-400/30 md:col-span-2">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-400">Total Value</p>
                <p className="text-xl font-bold text-yellow-400">{formatCurrency(stats.totalValue)}</p>
              </div>
              <DollarSign className="h-8 w-8 text-yellow-400" />
            </div>
          </div>
          <div className="bg-slate-800/40 backdrop-blur-xl p-4 rounded-xl border border-yellow-400/30">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-400">Commission</p>
                <p className="text-xl font-bold text-pink-400">{formatCurrency(stats.totalCommission)}</p>
              </div>
              <Percent className="h-8 w-8 text-pink-400" />
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
                placeholder="Search schemes..."
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
              <option value="draft">Draft</option>
              <option value="completed">Completed</option>
              <option value="inactive">Inactive</option>
            </select>
            <select
              value={filterCategory}
              onChange={(e) => setFilterCategory(e.target.value)}
              className="px-3 py-2 bg-slate-700/50 border border-yellow-400/30 rounded-lg text-slate-50 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 backdrop-blur-sm"
            >
              <option value="all">All Categories</option>
              <option value="premium">Premium</option>
              <option value="standard">Standard</option>
              <option value="basic">Basic</option>
            </select>
            <div className="text-sm text-slate-400">
              Showing: <span className="font-semibold text-slate-50">{filteredSchemes.length}</span> schemes
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

        {/* Schemes Display */}
        {viewMode === 'cards' ? (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {filteredSchemes.map((scheme) => (
              <SchemeCard key={scheme.id} scheme={scheme} />
            ))}
          </div>
        ) : (
          <SchemeTable schemes={filteredSchemes} />
        )}

        {filteredSchemes.length === 0 && (
          <div className="text-center py-12">
            <CreditCard className="h-12 w-12 mx-auto text-slate-500 mb-4" />
            <h3 className="text-lg font-medium text-slate-50 mb-2">No schemes found</h3>
            <p className="text-sm text-slate-400">Try adjusting your search criteria or create a new chit scheme.</p>
          </div>
        )}
      </div>
    </div>
  );
};