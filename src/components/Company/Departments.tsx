import React, { useState } from 'react';
import {
  Plus,
  Search,
  Edit,
  Trash2,
  Users,
  DollarSign,
  Building,
  Calendar,
  MoreVertical,
  Eye,
  Target,
  TrendingUp,
  Award
} from 'lucide-react';

interface Department {
  id: string;
  name: string;
  description: string;
  head: string;
  headEmail: string;
  employeeCount: number;
  budget: number;
  budgetUsed: number;
  status: 'active' | 'inactive';
  createdAt: string;
  location: string;
  projects: number;
}

const sampleDepartments: Department[] = [
  {
    id: '1',
    name: 'Sales & Marketing',
    description: 'Customer acquisition, lead generation, and brand promotion',
    head: 'Rajesh Kumar',
    headEmail: 'rajesh.kumar@ramnirmalchits.com',
    employeeCount: 15,
    budget: 2000000,
    budgetUsed: 1200000,
    status: 'active',
    createdAt: '2020-01-15',
    location: 'Bangalore',
    projects: 8
  },
  {
    id: '2',
    name: 'Operations',
    description: 'Chit fund operations, member management, and auction coordination',
    head: 'Priya Sharma',
    headEmail: 'priya.sharma@ramnirmalchits.com',
    employeeCount: 22,
    budget: 1500000,
    budgetUsed: 980000,
    status: 'active',
    createdAt: '2020-01-15',
    location: 'Bangalore',
    projects: 12
  },
  {
    id: '3',
    name: 'Finance & Accounts',
    description: 'Financial planning, accounting, compliance, and audit management',
    head: 'Amit Patel',
    headEmail: 'amit.patel@ramnirmalchits.com',
    employeeCount: 8,
    budget: 800000,
    budgetUsed: 650000,
    status: 'active',
    createdAt: '2020-01-15',
    location: 'Bangalore',
    projects: 5
  },
  {
    id: '4',
    name: 'Human Resources',
    description: 'Employee management, recruitment, training, and development',
    head: 'Sunita Reddy',
    headEmail: 'sunita.reddy@ramnirmalchits.com',
    employeeCount: 5,
    budget: 600000,
    budgetUsed: 420000,
    status: 'active',
    createdAt: '2020-06-01',
    location: 'Bangalore',
    projects: 3
  },
  {
    id: '5',
    name: 'Information Technology',
    description: 'System development, maintenance, and digital transformation',
    head: 'Karthik Nair',
    headEmail: 'karthik.nair@ramnirmalchits.com',
    employeeCount: 6,
    budget: 1200000,
    budgetUsed: 850000,
    status: 'active',
    createdAt: '2021-03-15',
    location: 'Bangalore',
    projects: 7
  }
];

const DepartmentCard: React.FC<{ department: Department }> = ({ department }) => {
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

  const budgetPercentage = (department.budgetUsed / department.budget) * 100;

  const getDepartmentIcon = (name: string) => {
    switch (name.toLowerCase()) {
      case 'sales & marketing': return Target;
      case 'operations': return Building;
      case 'finance & accounts': return DollarSign;
      case 'human resources': return Users;
      case 'information technology': return TrendingUp;
      default: return Building;
    }
  };

  const Icon = getDepartmentIcon(department.name);

  return (
    <div className="bg-slate-800/40 backdrop-blur-xl rounded-2xl p-6 border border-yellow-400/30 hover:border-yellow-400/50 transition-all">
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center space-x-3">
          <div className="p-3 bg-blue-500/20 rounded-xl border border-yellow-400/30">
            <Icon className="h-6 w-6 text-blue-400" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-slate-50">{department.name}</h3>
            <p className="text-sm text-slate-400">{department.location}</p>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium border ${getStatusColor(department.status)}`}>
            {department.status.toUpperCase()}
          </span>
          <button className="p-2 text-slate-400 hover:text-slate-50 hover:bg-slate-700/50 rounded-lg transition-all">
            <MoreVertical className="h-4 w-4" />
          </button>
        </div>
      </div>

      <p className="text-sm text-slate-300 mb-4">{department.description}</p>

      <div className="space-y-3 mb-4">
        <div className="flex items-center justify-between text-sm">
          <span className="text-slate-400">Department Head</span>
          <span className="text-slate-50 font-medium">{department.head}</span>
        </div>
        <div className="flex items-center justify-between text-sm">
          <span className="text-slate-400">Email</span>
          <span className="text-slate-300">{department.headEmail}</span>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-4 mb-4 pt-4 border-t border-yellow-400/20">
        <div className="text-center">
          <p className="text-xs text-slate-500">Employees</p>
          <p className="text-lg font-semibold text-slate-50">{department.employeeCount}</p>
        </div>
        <div className="text-center">
          <p className="text-xs text-slate-500">Projects</p>
          <p className="text-lg font-semibold text-blue-400">{department.projects}</p>
        </div>
        <div className="text-center">
          <p className="text-xs text-slate-500">Budget Used</p>
          <p className="text-lg font-semibold text-yellow-400">{Math.round(budgetPercentage)}%</p>
        </div>
      </div>

      {/* Budget Progress */}
      <div className="mb-4">
        <div className="flex justify-between text-sm text-slate-400 mb-1">
          <span>Budget Utilization</span>
          <span>{formatCurrency(department.budgetUsed)} / {formatCurrency(department.budget)}</span>
        </div>
        <div className="w-full bg-slate-700/50 rounded-full h-2 border border-yellow-400/20">
          <div
            className={`h-2 rounded-full transition-all duration-300 ${
              budgetPercentage > 80 ? 'bg-red-500' : 
              budgetPercentage > 60 ? 'bg-yellow-500' : 'bg-green-500'
            }`}
            style={{ width: `${Math.min(budgetPercentage, 100)}%` }}
          ></div>
        </div>
      </div>

      <div className="flex justify-between items-center">
        <div className="flex items-center text-xs text-slate-500">
          <Calendar className="h-3 w-3 mr-1" />
          <span>Since {new Date(department.createdAt).getFullYear()}</span>
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

export const Departments: React.FC = () => {
  const [departments] = useState<Department[]>(sampleDepartments);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState<string>('all');

  const filteredDepartments = departments.filter(dept => {
    const matchesSearch = dept.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         dept.head.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         dept.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterStatus === 'all' || dept.status === filterStatus;
    return matchesSearch && matchesFilter;
  });

  const stats = {
    total: departments.length,
    active: departments.filter(d => d.status === 'active').length,
    inactive: departments.filter(d => d.status === 'inactive').length,
    totalEmployees: departments.reduce((sum, d) => sum + d.employeeCount, 0),
    totalBudget: departments.reduce((sum, d) => sum + d.budget, 0),
    totalProjects: departments.reduce((sum, d) => sum + d.projects, 0)
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
          <h1 className="text-2xl font-bold text-slate-50">Department Structure</h1>
          <p className="mt-1 text-sm text-slate-400">
            Organize your company structure with departments and hierarchies
          </p>
        </div>
        <button className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-lg shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all">
          <Plus className="h-4 w-4 mr-2" />
          Add Department
        </button>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto p-4 space-y-6 scrollbar-none">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-6 gap-4">
          <div className="bg-slate-800/40 backdrop-blur-xl p-4 rounded-xl border border-yellow-400/30">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-400">Departments</p>
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
                <p className="text-sm text-slate-400">Employees</p>
                <p className="text-2xl font-bold text-purple-400">{stats.totalEmployees}</p>
              </div>
              <Users className="h-8 w-8 text-purple-400" />
            </div>
          </div>
          <div className="bg-slate-800/40 backdrop-blur-xl p-4 rounded-xl border border-yellow-400/30">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-400">Projects</p>
                <p className="text-2xl font-bold text-orange-400">{stats.totalProjects}</p>
              </div>
              <Award className="h-8 w-8 text-orange-400" />
            </div>
          </div>
          <div className="bg-slate-800/40 backdrop-blur-xl p-4 rounded-xl border border-yellow-400/30 md:col-span-2">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-400">Total Budget</p>
                <p className="text-xl font-bold text-yellow-400">{formatCurrency(stats.totalBudget)}</p>
              </div>
              <div className="h-8 w-8 bg-yellow-500/20 rounded-lg flex items-center justify-center">
                <DollarSign className="h-5 w-5 text-yellow-400" />
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
                placeholder="Search departments..."
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
              Showing: <span className="font-semibold ml-1 text-slate-50">{filteredDepartments.length}</span> departments
            </div>
          </div>
        </div>

        {/* Departments Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredDepartments.map((department) => (
            <DepartmentCard key={department.id} department={department} />
          ))}
        </div>

        {filteredDepartments.length === 0 && (
          <div className="text-center py-12">
            <Building className="h-12 w-12 mx-auto text-slate-500 mb-4" />
            <h3 className="text-lg font-medium text-slate-50 mb-2">No departments found</h3>
            <p className="text-sm text-slate-400">Try adjusting your search criteria or add a new department.</p>
          </div>
        )}
      </div>
    </div>
  );
};