import React, { useState } from 'react';
import {
  Plus,
  Search,
  Edit,
  Trash2,
  MapPin,
  Phone,
  Mail,
  Users,
  Building,
  Calendar,
  MoreVertical,
  Eye,
  Settings
} from 'lucide-react';

interface Branch {
  id: string;
  name: string;
  code: string;
  address: string;
  city: string;
  state: string;
  phone: string;
  email: string;
  manager: string;
  employeeCount: number;
  status: 'active' | 'inactive';
  createdAt: string;
  revenue: number;
}

const sampleBranches: Branch[] = [
  {
    id: '1',
    name: 'Bangalore Main Branch',
    code: 'BLR-001',
    address: '123 MG Road, Bangalore',
    city: 'Bangalore',
    state: 'Karnataka',
    phone: '+91 98765 43210',
    email: 'bangalore@ramnirmalchits.com',
    manager: 'Rajesh Kumar',
    employeeCount: 25,
    status: 'active',
    createdAt: '2020-01-15',
    revenue: 5000000
  },
  {
    id: '2',
    name: 'Chennai Branch',
    code: 'CHN-002',
    address: '456 Anna Salai, Chennai',
    city: 'Chennai',
    state: 'Tamil Nadu',
    phone: '+91 98765 43211',
    email: 'chennai@ramnirmalchits.com',
    manager: 'Priya Sharma',
    employeeCount: 18,
    status: 'active',
    createdAt: '2021-03-20',
    revenue: 3500000
  },
  {
    id: '3',
    name: 'Hyderabad Branch',
    code: 'HYD-003',
    address: '789 Banjara Hills, Hyderabad',
    city: 'Hyderabad',
    state: 'Telangana',
    phone: '+91 98765 43212',
    email: 'hyderabad@ramnirmalchits.com',
    manager: 'Amit Patel',
    employeeCount: 15,
    status: 'active',
    createdAt: '2022-06-10',
    revenue: 2800000
  }
];

const BranchCard: React.FC<{ branch: Branch }> = ({ branch }) => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800 border-green-200';
      case 'inactive': return 'bg-red-100 text-red-800 border-red-200';
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

  return (
    <div className="bg-slate-800/40 backdrop-blur-xl rounded-2xl p-6 border border-yellow-400/30 hover:border-yellow-400/50 transition-all">
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center space-x-3">
          <div className="p-3 bg-blue-500/20 rounded-xl border border-yellow-400/30">
            <Building className="h-6 w-6 text-blue-400" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-slate-50">{branch.name}</h3>
            <p className="text-sm text-slate-400">{branch.code}</p>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium border ${getStatusColor(branch.status)}`}>
            {branch.status.toUpperCase()}
          </span>
          <button className="p-2 text-slate-400 hover:text-slate-50 hover:bg-slate-700/50 rounded-lg transition-all">
            <MoreVertical className="h-4 w-4" />
          </button>
        </div>
      </div>

      <div className="space-y-3 mb-4">
        <div className="flex items-center text-sm text-slate-300">
          <MapPin className="h-4 w-4 mr-2 text-slate-500" />
          <span>{branch.address}, {branch.city}, {branch.state}</span>
        </div>
        <div className="flex items-center text-sm text-slate-300">
          <Phone className="h-4 w-4 mr-2 text-slate-500" />
          <span>{branch.phone}</span>
        </div>
        <div className="flex items-center text-sm text-slate-300">
          <Mail className="h-4 w-4 mr-2 text-slate-500" />
          <span>{branch.email}</span>
        </div>
        <div className="flex items-center text-sm text-slate-300">
          <Users className="h-4 w-4 mr-2 text-slate-500" />
          <span>Manager: {branch.manager}</span>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 mb-4 pt-4 border-t border-yellow-400/20">
        <div>
          <p className="text-xs text-slate-500">Employees</p>
          <p className="text-lg font-semibold text-slate-50">{branch.employeeCount}</p>
        </div>
        <div>
          <p className="text-xs text-slate-500">Revenue</p>
          <p className="text-lg font-semibold text-green-400">{formatCurrency(branch.revenue)}</p>
        </div>
      </div>

      <div className="flex justify-between items-center">
        <div className="flex items-center text-xs text-slate-500">
          <Calendar className="h-3 w-3 mr-1" />
          <span>Since {new Date(branch.createdAt).getFullYear()}</span>
        </div>
        <div className="flex space-x-2">
          <button className="p-2 text-slate-400 hover:text-blue-400 hover:bg-blue-500/10 rounded-lg transition-all">
            <Eye className="h-4 w-4" />
          </button>
          <button className="p-2 text-slate-400 hover:text-green-400 hover:bg-green-500/10 rounded-lg transition-all">
            <Edit className="h-4 w-4" />
          </button>
          <button className="p-2 text-slate-400 hover:text-red-400 hover:bg-red-500/10 rounded-lg transition-all">
            <Trash2 className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );
};

export const Branches: React.FC = () => {
  const [branches] = useState<Branch[]>(sampleBranches);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState<string>('all');

  const filteredBranches = branches.filter(branch => {
    const matchesSearch = branch.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         branch.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         branch.city.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterStatus === 'all' || branch.status === filterStatus;
    return matchesSearch && matchesFilter;
  });

  const stats = {
    total: branches.length,
    active: branches.filter(b => b.status === 'active').length,
    inactive: branches.filter(b => b.status === 'inactive').length,
    totalEmployees: branches.reduce((sum, b) => sum + b.employeeCount, 0),
    totalRevenue: branches.reduce((sum, b) => sum + b.revenue, 0)
  };

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
          <h1 className="text-2xl font-bold text-slate-50">Branch Network</h1>
          <p className="mt-1 text-sm text-slate-400">
            Manage your branch locations and operations
          </p>
        </div>
        <button className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-lg shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all">
          <Plus className="h-4 w-4 mr-2" />
          Add Branch
        </button>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto p-4 space-y-6 scrollbar-none">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
          <div className="bg-slate-800/40 backdrop-blur-xl p-4 rounded-xl border border-yellow-400/30">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-400">Total Branches</p>
                <p className="text-2xl font-bold text-slate-50">{stats.total}</p>
              </div>
              <Building className="h-8 w-8 text-blue-400" />
            </div>
          </div>
          <div className="bg-slate-800/40 backdrop-blur-xl p-4 rounded-xl border border-yellow-400/30">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-400">Active</p>
                <p className="text-2xl font-bold text-green-400">{stats.active}</p>
              </div>
              <div className="h-8 w-8 bg-green-500/20 rounded-lg flex items-center justify-center">
                <div className="h-3 w-3 bg-green-400 rounded-full"></div>
              </div>
            </div>
          </div>
          <div className="bg-slate-800/40 backdrop-blur-xl p-4 rounded-xl border border-yellow-400/30">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-400">Inactive</p>
                <p className="text-2xl font-bold text-red-400">{stats.inactive}</p>
              </div>
              <div className="h-8 w-8 bg-red-500/20 rounded-lg flex items-center justify-center">
                <div className="h-3 w-3 bg-red-400 rounded-full"></div>
              </div>
            </div>
          </div>
          <div className="bg-slate-800/40 backdrop-blur-xl p-4 rounded-xl border border-yellow-400/30">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-400">Total Employees</p>
                <p className="text-2xl font-bold text-purple-400">{stats.totalEmployees}</p>
              </div>
              <Users className="h-8 w-8 text-purple-400" />
            </div>
          </div>
          <div className="bg-slate-800/40 backdrop-blur-xl p-4 rounded-xl border border-yellow-400/30">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-400">Total Revenue</p>
                <p className="text-xl font-bold text-yellow-400">{formatCurrency(stats.totalRevenue)}</p>
              </div>
              <div className="h-8 w-8 bg-yellow-500/20 rounded-lg flex items-center justify-center">
                <span className="text-yellow-400 font-bold">₹</span>
              </div>
            </div>
          </div>
        </div>

        {/* Filters */}
        <div className="bg-slate-800/40 backdrop-blur-xl rounded-xl p-4 border border-yellow-400/30">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-500 h-4 w-4" />
              <input
                type="text"
                placeholder="Search branches..."
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
              <option value="inactive">Inactive</option>
            </select>
            <div className="text-sm text-slate-400 flex items-center">
              Showing: <span className="font-semibold ml-1 text-slate-50">{filteredBranches.length}</span> branches
            </div>
          </div>
        </div>

        {/* Branches Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredBranches.map((branch) => (
            <BranchCard key={branch.id} branch={branch} />
          ))}
        </div>

        {filteredBranches.length === 0 && (
          <div className="text-center py-12">
            <Building className="h-12 w-12 mx-auto text-slate-500 mb-4" />
            <h3 className="text-lg font-medium text-slate-50 mb-2">No branches found</h3>
            <p className="text-sm text-slate-400">Try adjusting your search criteria or add a new branch.</p>
          </div>
        )}
      </div>
    </div>
  );
};