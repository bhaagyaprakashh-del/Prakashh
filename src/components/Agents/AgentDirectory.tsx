import React, { useState, useMemo } from 'react';
import {
  Plus,
  Search,
  Edit,
  Trash2,
  Users,
  Mail,
  Phone,
  MapPin,
  Calendar,
  Building,
  User,
  Eye,
  MoreVertical,
  Filter,
  Download,
  Upload,
  UserCheck,
  Target,
  Award,
  TrendingUp,
  DollarSign,
  Star,
  CheckCircle,
  XCircle,
  AlertTriangle,
  Clock,
  Briefcase,
  Car,
  Bike,
  Navigation
} from 'lucide-react';
import { Agent } from '../../types/agents';

const sampleAgents: Agent[] = [
  {
    id: '1',
    agentId: 'AGT001',
    firstName: 'Vikram',
    lastName: 'Singh',
    email: 'vikram.singh@agents.ramnirmalchits.com',
    phone: '+91 98765 43221',
    dateOfBirth: '1985-04-15',
    gender: 'male',
    maritalStatus: 'married',
    address: '123 Agent Colony, Bangalore',
    city: 'Bangalore',
    state: 'Karnataka',
    country: 'India',
    postalCode: '560001',
    designation: 'Senior Sales Agent',
    department: 'Sales & Marketing',
    branch: 'Bangalore East',
    joiningDate: '2020-11-20',
    employmentType: 'permanent',
    workLocation: 'field',
    teamMembers: ['2', '4'],
    territory: 'Bangalore East Zone',
    coverageArea: ['Whitefield', 'Marathahalli', 'Brookefield', 'ITPL'],
    transportMode: 'bike',
    monthlyTarget: 250000,
    quarterlyTarget: 750000,
    yearlyTarget: 3000000,
    currentMonthAchievement: 180000,
    currentQuarterAchievement: 520000,
    currentYearAchievement: 2100000,
    commissionStructure: {
      baseCommission: 3.5,
      bonusThreshold: 200000,
      bonusCommission: 1.0,
      penaltyThreshold: 100000,
      penaltyDeduction: 0.5
    },
    totalCustomers: 85,
    activeCustomers: 78,
    newCustomersThisMonth: 12,
    customerRetentionRate: 92.5,
    totalSales: 2100000,
    monthlyEarnings: 8500,
    quarterlyEarnings: 25200,
    yearlyEarnings: 98500,
    pendingCommissions: 5200,
    currentRank: 2,
    previousRank: 3,
    rankingCategory: 'star',
    achievements: [
      {
        id: 'ach_1',
        title: 'Top Performer Q1 2024',
        description: 'Achieved highest sales in Q1',
        achievedDate: '2024-03-31',
        category: 'sales',
        points: 100,
        badge: 'gold-star',
        isPublic: true
      }
    ],
    skills: ['Sales', 'Customer Relations', 'Territory Management', 'Digital Marketing'],
    certifications: ['Certified Sales Professional', 'Digital Marketing Certified'],
    trainingCompleted: ['Sales Excellence', 'Customer Service', 'Digital Tools'],
    trainingPending: ['Advanced Negotiation'],
    status: 'active',
    lastLogin: '2024-03-15T14:30:00',
    loginCount: 245,
    emergencyContact: {
      name: 'Priya Singh',
      relationship: 'Spouse',
      phone: '+91 98765 43222'
    },
    createdAt: '2020-11-20',
    createdBy: 'hr@ramnirmalchits.com',
    updatedAt: '2024-03-15',
    updatedBy: 'vikram.singh@agents.ramnirmalchits.com',
    notes: 'Top performing agent with excellent customer relationships'
  },
  {
    id: '2',
    agentId: 'AGT002',
    firstName: 'Priya',
    lastName: 'Reddy',
    email: 'priya.reddy@agents.ramnirmalchits.com',
    phone: '+91 98765 43225',
    dateOfBirth: '1990-07-22',
    gender: 'female',
    maritalStatus: 'single',
    address: '456 Sales Avenue, Bangalore',
    city: 'Bangalore',
    state: 'Karnataka',
    country: 'India',
    postalCode: '560034',
    designation: 'Sales Agent',
    department: 'Sales & Marketing',
    branch: 'Bangalore East',
    joiningDate: '2022-01-15',
    reportingManager: 'Vikram Singh',
    employmentType: 'permanent',
    workLocation: 'field',
    teamMembers: [],
    territory: 'Bangalore South Zone',
    coverageArea: ['Koramangala', 'BTM Layout', 'HSR Layout', 'Electronic City'],
    transportMode: 'car',
    monthlyTarget: 200000,
    quarterlyTarget: 600000,
    yearlyTarget: 2400000,
    currentMonthAchievement: 145000,
    currentQuarterAchievement: 420000,
    currentYearAchievement: 1680000,
    commissionStructure: {
      baseCommission: 3.0,
      bonusThreshold: 180000,
      bonusCommission: 0.8,
      penaltyThreshold: 80000,
      penaltyDeduction: 0.3
    },
    totalCustomers: 62,
    activeCustomers: 58,
    newCustomersThisMonth: 8,
    customerRetentionRate: 89.2,
    totalSales: 1680000,
    monthlyEarnings: 6200,
    quarterlyEarnings: 18500,
    yearlyEarnings: 72800,
    pendingCommissions: 3800,
    currentRank: 5,
    previousRank: 6,
    rankingCategory: 'performer',
    achievements: [],
    skills: ['Customer Acquisition', 'Lead Generation', 'Relationship Building'],
    certifications: ['Sales Foundation'],
    trainingCompleted: ['Basic Sales', 'Customer Service'],
    trainingPending: ['Advanced Sales Techniques', 'Digital Marketing'],
    status: 'active',
    lastLogin: '2024-03-14T19:15:00',
    loginCount: 156,
    emergencyContact: {
      name: 'Ramesh Reddy',
      relationship: 'Father',
      phone: '+91 98765 43226'
    },
    createdAt: '2022-01-15',
    createdBy: 'vikram.singh@agents.ramnirmalchits.com',
    updatedAt: '2024-03-14',
    updatedBy: 'priya.reddy@agents.ramnirmalchits.com',
    notes: 'Promising agent with good growth potential'
  },
  {
    id: '3',
    agentId: 'AGT003',
    firstName: 'Suresh',
    lastName: 'Kumar',
    email: 'suresh.kumar@agents.ramnirmalchits.com',
    phone: '+91 98765 43227',
    dateOfBirth: '1982-12-10',
    gender: 'male',
    maritalStatus: 'married',
    address: '789 Field Agent Street, Bangalore',
    city: 'Bangalore',
    state: 'Karnataka',
    country: 'India',
    postalCode: '560068',
    designation: 'Field Sales Agent',
    department: 'Sales & Marketing',
    branch: 'Bangalore West',
    joiningDate: '2019-08-05',
    employmentType: 'permanent',
    workLocation: 'field',
    teamMembers: [],
    territory: 'Bangalore West Zone',
    coverageArea: ['Rajajinagar', 'Vijayanagar', 'Basaveshwaranagar', 'Malleshwaram'],
    transportMode: 'bike',
    monthlyTarget: 180000,
    quarterlyTarget: 540000,
    yearlyTarget: 2160000,
    currentMonthAchievement: 165000,
    currentQuarterAchievement: 485000,
    currentYearAchievement: 1950000,
    commissionStructure: {
      baseCommission: 3.2,
      bonusThreshold: 160000,
      bonusCommission: 0.8,
      penaltyThreshold: 90000,
      penaltyDeduction: 0.4
    },
    totalCustomers: 95,
    activeCustomers: 88,
    newCustomersThisMonth: 6,
    customerRetentionRate: 94.8,
    totalSales: 1950000,
    monthlyEarnings: 7200,
    quarterlyEarnings: 21800,
    yearlyEarnings: 85600,
    pendingCommissions: 4100,
    currentRank: 3,
    previousRank: 4,
    rankingCategory: 'performer',
    achievements: [
      {
        id: 'ach_2',
        title: 'Customer Retention Champion',
        description: 'Highest customer retention rate',
        achievedDate: '2024-02-29',
        category: 'customer-service',
        points: 75,
        badge: 'retention-champion',
        isPublic: true
      }
    ],
    skills: ['Field Sales', 'Customer Retention', 'Territory Management'],
    certifications: ['Field Sales Expert'],
    trainingCompleted: ['Field Sales Mastery', 'Customer Retention'],
    trainingPending: ['Digital Tools Training'],
    status: 'active',
    lastLogin: '2024-03-13T17:20:00',
    loginCount: 189,
    emergencyContact: {
      name: 'Lakshmi Kumar',
      relationship: 'Spouse',
      phone: '+91 98765 43228'
    },
    createdAt: '2019-08-05',
    createdBy: 'hr@ramnirmalchits.com',
    updatedAt: '2024-03-13',
    updatedBy: 'suresh.kumar@agents.ramnirmalchits.com',
    notes: 'Experienced field agent with strong territory knowledge'
  },
  {
    id: '4',
    agentId: 'AGT004',
    firstName: 'Anjali',
    lastName: 'Sharma',
    email: 'anjali.sharma@agents.ramnirmalchits.com',
    phone: '+91 98765 43229',
    dateOfBirth: '1995-03-18',
    gender: 'female',
    maritalStatus: 'single',
    address: '321 New Agent Road, Bangalore',
    city: 'Bangalore',
    state: 'Karnataka',
    country: 'India',
    postalCode: '560078',
    designation: 'Junior Sales Agent',
    department: 'Sales & Marketing',
    branch: 'Bangalore Central',
    joiningDate: '2023-06-01',
    reportingManager: 'Vikram Singh',
    employmentType: 'permanent',
    workLocation: 'field',
    teamMembers: [],
    territory: 'Bangalore Central Zone',
    coverageArea: ['MG Road', 'Brigade Road', 'Commercial Street', 'Shivajinagar'],
    transportMode: 'public',
    monthlyTarget: 120000,
    quarterlyTarget: 360000,
    yearlyTarget: 1440000,
    currentMonthAchievement: 95000,
    currentQuarterAchievement: 285000,
    currentYearAchievement: 950000,
    commissionStructure: {
      baseCommission: 2.8,
      bonusThreshold: 100000,
      bonusCommission: 0.5,
      penaltyThreshold: 60000,
      penaltyDeduction: 0.2
    },
    totalCustomers: 35,
    activeCustomers: 32,
    newCustomersThisMonth: 5,
    customerRetentionRate: 85.7,
    totalSales: 950000,
    monthlyEarnings: 3800,
    quarterlyEarnings: 11200,
    yearlyEarnings: 42500,
    pendingCommissions: 2100,
    currentRank: 8,
    previousRank: 9,
    rankingCategory: 'rookie',
    achievements: [],
    skills: ['Customer Service', 'Lead Generation', 'Communication'],
    certifications: [],
    trainingCompleted: ['Basic Sales Training', 'Product Knowledge'],
    trainingPending: ['Advanced Sales', 'Territory Management', 'Digital Marketing'],
    status: 'active',
    lastLogin: '2024-03-15T12:30:00',
    loginCount: 78,
    emergencyContact: {
      name: 'Ravi Sharma',
      relationship: 'Father',
      phone: '+91 98765 43230'
    },
    createdAt: '2023-06-01',
    createdBy: 'vikram.singh@agents.ramnirmalchits.com',
    updatedAt: '2024-03-15',
    updatedBy: 'anjali.sharma@agents.ramnirmalchits.com',
    notes: 'New agent showing good progress and learning attitude'
  }
];

const AgentCard: React.FC<{ agent: Agent }> = React.memo(({ agent }) => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800 border-green-200';
      case 'inactive': return 'bg-gray-100 text-gray-800 border-gray-200';
      case 'suspended': return 'bg-red-100 text-red-800 border-red-200';
      case 'on-leave': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getRankingColor = (category: string) => {
    switch (category) {
      case 'legend': return 'bg-purple-100 text-purple-800 border-purple-200';
      case 'champion': return 'bg-red-100 text-red-800 border-red-200';
      case 'star': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'performer': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'rookie': return 'bg-green-100 text-green-800 border-green-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getTransportIcon = (mode: string) => {
    switch (mode) {
      case 'bike': return Bike;
      case 'car': return Car;
      case 'public': return Navigation;
      case 'walking': return User;
      default: return Navigation;
    }
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const calculateAchievementPercentage = (achieved: number, target: number) => {
    return target > 0 ? (achieved / target) * 100 : 0;
  };

  const calculateTenure = (joiningDate: string) => {
    const joining = new Date(joiningDate);
    const now = new Date();
    const diffTime = Math.abs(now.getTime() - joining.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    const years = Math.floor(diffDays / 365);
    const months = Math.floor((diffDays % 365) / 30);
    
    if (years > 0) {
      return `${years}y ${months}m`;
    }
    return `${months}m`;
  };

  const TransportIcon = getTransportIcon(agent.transportMode);
  const monthlyAchievementPercentage = calculateAchievementPercentage(agent.currentMonthAchievement, agent.monthlyTarget);

  return (
    <div className="bg-slate-800/40 backdrop-blur-xl rounded-2xl p-6 border border-yellow-400/30 hover:border-yellow-400/50 transition-all">
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center space-x-3">
          <div className="h-12 w-12 bg-slate-600/50 rounded-full flex items-center justify-center text-slate-50 font-semibold text-lg border border-yellow-400/30">
            {agent.firstName.charAt(0)}{agent.lastName.charAt(0)}
          </div>
          <div>
            <h3 className="text-lg font-semibold text-slate-50">{agent.firstName} {agent.lastName}</h3>
            <p className="text-sm text-slate-400">{agent.designation}</p>
            <p className="text-xs text-slate-500">{agent.agentId} • Rank #{agent.currentRank}</p>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium border ${getRankingColor(agent.rankingCategory)}`}>
            {agent.rankingCategory.toUpperCase()}
          </span>
          <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium border ${getStatusColor(agent.status)}`}>
            {agent.status.toUpperCase()}
          </span>
          <button className="p-2 text-slate-400 hover:text-slate-50 hover:bg-slate-700/50 rounded-lg transition-all">
            <MoreVertical className="h-4 w-4" />
          </button>
        </div>
      </div>

      <div className="space-y-2 mb-4">
        <div className="flex items-center text-sm text-slate-300">
          <Mail className="h-4 w-4 mr-2 text-slate-500" />
          <span className="truncate">{agent.email}</span>
        </div>
        <div className="flex items-center text-sm text-slate-300">
          <Phone className="h-4 w-4 mr-2 text-slate-500" />
          <span>{agent.phone}</span>
        </div>
        <div className="flex items-center text-sm text-slate-300">
          <MapPin className="h-4 w-4 mr-2 text-slate-500" />
          <span className="truncate">{agent.territory}</span>
        </div>
        <div className="flex items-center text-sm text-slate-300">
          <TransportIcon className="h-4 w-4 mr-2 text-slate-500" />
          <span className="capitalize">{agent.transportMode} transport</span>
        </div>
      </div>

      {/* Monthly Target Progress */}
      <div className="mb-4">
        <div className="flex justify-between text-sm text-slate-400 mb-1">
          <span>Monthly Target</span>
          <span>{monthlyAchievementPercentage.toFixed(1)}%</span>
        </div>
        <div className="w-full bg-slate-700/50 rounded-full h-2 border border-yellow-400/20">
          <div
            className={`h-2 rounded-full transition-all duration-300 ${
              monthlyAchievementPercentage >= 100 ? 'bg-green-500' :
              monthlyAchievementPercentage >= 80 ? 'bg-blue-500' :
              monthlyAchievementPercentage >= 60 ? 'bg-yellow-500' : 'bg-red-500'
            }`}
            style={{ width: `${Math.min(monthlyAchievementPercentage, 100)}%` }}
          ></div>
        </div>
        <div className="flex justify-between text-xs text-slate-500 mt-1">
          <span>{formatCurrency(agent.currentMonthAchievement)}</span>
          <span>{formatCurrency(agent.monthlyTarget)}</span>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 mb-4 pt-4 border-t border-yellow-400/20">
        <div>
          <p className="text-xs text-slate-500">Total Customers</p>
          <p className="text-lg font-semibold text-slate-50">{agent.totalCustomers}</p>
        </div>
        <div>
          <p className="text-xs text-slate-500">Active Customers</p>
          <p className="text-lg font-semibold text-green-400">{agent.activeCustomers}</p>
        </div>
        <div>
          <p className="text-xs text-slate-500">Monthly Earnings</p>
          <p className="text-lg font-semibold text-blue-400">{formatCurrency(agent.monthlyEarnings)}</p>
        </div>
        <div>
          <p className="text-xs text-slate-500">Retention Rate</p>
          <p className="text-lg font-semibold text-purple-400">{agent.customerRetentionRate}%</p>
        </div>
      </div>

      {/* Skills */}
      {agent.skills.length > 0 && (
        <div className="mb-4">
          <p className="text-xs text-slate-500 mb-2">Skills</p>
          <div className="flex flex-wrap gap-1">
            {agent.skills.slice(0, 3).map((skill, index) => (
              <span key={index} className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-blue-100 text-blue-800 border border-blue-200">
                {skill}
              </span>
            ))}
            {agent.skills.length > 3 && (
              <span className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-slate-100 text-slate-800 border border-slate-200">
                +{agent.skills.length - 3} more
              </span>
            )}
          </div>
        </div>
      )}

      <div className="flex justify-between items-center pt-4 border-t border-yellow-400/20">
        <div className="flex items-center text-xs text-slate-500">
          <Calendar className="h-3 w-3 mr-1" />
          <span>Agent for {calculateTenure(agent.joiningDate)}</span>
        </div>
        <div className="flex space-x-2">
          <button className="p-2 text-slate-400 hover:text-blue-400 hover:bg-blue-500/10 rounded-lg transition-all">
            <Eye className="h-4 w-4" />
          </button>
          <button className="p-2 text-slate-400 hover:text-green-400 hover:bg-green-500/10 rounded-lg transition-all">
            <Edit className="h-4 w-4" />
          </button>
          <button className="p-2 text-slate-400 hover:text-purple-400 hover:bg-purple-500/10 rounded-lg transition-all">
            <Target className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );
});

export const AgentDirectory: React.FC = () => {
  const [agents] = useState<Agent[]>(sampleAgents);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [filterBranch, setFilterBranch] = useState<string>('all');
  const [filterRanking, setFilterRanking] = useState<string>('all');
  const [viewMode, setViewMode] = useState<'cards' | 'table'>('cards');

  const filteredAgents = useMemo(() => agents.filter(agent => {
    const matchesSearch = agent.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         agent.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         agent.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         agent.agentId.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === 'all' || agent.status === filterStatus;
    const matchesBranch = filterBranch === 'all' || agent.branch === filterBranch;
    const matchesRanking = filterRanking === 'all' || agent.rankingCategory === filterRanking;
    
    return matchesSearch && matchesStatus && matchesBranch && matchesRanking;
  }), [agents, searchTerm, filterStatus, filterBranch, filterRanking]);

  const stats = useMemo(() => ({
    total: agents.length,
    active: agents.filter(a => a.status === 'active').length,
    inactive: agents.filter(a => a.status === 'inactive').length,
    suspended: agents.filter(a => a.status === 'suspended').length,
    onLeave: agents.filter(a => a.status === 'on-leave').length,
    legend: agents.filter(a => a.rankingCategory === 'legend').length,
    champion: agents.filter(a => a.rankingCategory === 'champion').length,
    star: agents.filter(a => a.rankingCategory === 'star').length,
    performer: agents.filter(a => a.rankingCategory === 'performer').length,
    rookie: agents.filter(a => a.rankingCategory === 'rookie').length,
    totalCustomers: agents.reduce((sum, a) => sum + a.totalCustomers, 0),
    totalSales: agents.reduce((sum, a) => sum + a.totalSales, 0),
    avgRetentionRate: agents.length > 0 ? agents.reduce((sum, a) => sum + a.customerRetentionRate, 0) / agents.length : 0,
    totalEarnings: agents.reduce((sum, a) => sum + a.yearlyEarnings, 0)
  }), [agents]);

  const uniqueBranches = useMemo(() => [...new Set(agents.map(a => a.branch))], [agents]);

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
          <h1 className="text-2xl font-bold text-slate-50">Agent Directory (List)</h1>
          <p className="mt-1 text-sm text-slate-400">
            Comprehensive agent management with performance tracking and territory management
          </p>
        </div>
        <div className="flex space-x-3">
          <button className="inline-flex items-center px-4 py-2 border border-yellow-400/30 text-sm font-medium rounded-lg text-slate-50 bg-slate-700/50 hover:bg-slate-700 transition-all backdrop-blur-sm">
            <Upload className="h-4 w-4 mr-2" />
            Import Agents
          </button>
          <button className="inline-flex items-center px-4 py-2 border border-yellow-400/30 text-sm font-medium rounded-lg text-slate-50 bg-slate-700/50 hover:bg-slate-700 transition-all backdrop-blur-sm">
            <Download className="h-4 w-4 mr-2" />
            Export
          </button>
          <button className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-lg shadow-sm text-white bg-blue-600 hover:bg-blue-700 transition-all">
            <Plus className="h-4 w-4 mr-2" />
            Add Agent
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto p-4 space-y-6 scrollbar-none">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 lg:grid-cols-14 gap-4">
          <div className="bg-slate-800/40 backdrop-blur-xl p-4 rounded-xl border border-yellow-400/30">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-400">Total Agents</p>
                <p className="text-2xl font-bold text-slate-50">{stats.total}</p>
              </div>
              <Users className="h-8 w-8 text-blue-400" />
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
                <p className="text-sm text-slate-400">Inactive</p>
                <p className="text-2xl font-bold text-gray-400">{stats.inactive}</p>
              </div>
              <XCircle className="h-8 w-8 text-gray-400" />
            </div>
          </div>
          <div className="bg-slate-800/40 backdrop-blur-xl p-4 rounded-xl border border-yellow-400/30">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-400">On Leave</p>
                <p className="text-2xl font-bold text-yellow-400">{stats.onLeave}</p>
              </div>
              <Clock className="h-8 w-8 text-yellow-400" />
            </div>
          </div>
          <div className="bg-slate-800/40 backdrop-blur-xl p-4 rounded-xl border border-yellow-400/30">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-400">Legend</p>
                <p className="text-2xl font-bold text-purple-400">{stats.legend}</p>
              </div>
              <Star className="h-8 w-8 text-purple-400" />
            </div>
          </div>
          <div className="bg-slate-800/40 backdrop-blur-xl p-4 rounded-xl border border-yellow-400/30">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-400">Champion</p>
                <p className="text-2xl font-bold text-red-400">{stats.champion}</p>
              </div>
              <Award className="h-8 w-8 text-red-400" />
            </div>
          </div>
          <div className="bg-slate-800/40 backdrop-blur-xl p-4 rounded-xl border border-yellow-400/30">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-400">Star</p>
                <p className="text-2xl font-bold text-yellow-400">{stats.star}</p>
              </div>
              <Star className="h-8 w-8 text-yellow-400" />
            </div>
          </div>
          <div className="bg-slate-800/40 backdrop-blur-xl p-4 rounded-xl border border-yellow-400/30">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-400">Performer</p>
                <p className="text-2xl font-bold text-blue-400">{stats.performer}</p>
              </div>
              <TrendingUp className="h-8 w-8 text-blue-400" />
            </div>
          </div>
          <div className="bg-slate-800/40 backdrop-blur-xl p-4 rounded-xl border border-yellow-400/30">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-400">Rookie</p>
                <p className="text-2xl font-bold text-green-400">{stats.rookie}</p>
              </div>
              <UserCheck className="h-8 w-8 text-green-400" />
            </div>
          </div>
          <div className="bg-slate-800/40 backdrop-blur-xl p-4 rounded-xl border border-yellow-400/30">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-400">Total Customers</p>
                <p className="text-2xl font-bold text-orange-400">{stats.totalCustomers}</p>
              </div>
              <Building className="h-8 w-8 text-orange-400" />
            </div>
          </div>
          <div className="bg-slate-800/40 backdrop-blur-xl p-4 rounded-xl border border-yellow-400/30">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-400">Avg Retention</p>
                <p className="text-2xl font-bold text-emerald-400">{stats.avgRetentionRate.toFixed(1)}%</p>
              </div>
              <Target className="h-8 w-8 text-emerald-400" />
            </div>
          </div>
          <div className="bg-slate-800/40 backdrop-blur-xl p-4 rounded-xl border border-yellow-400/30 md:col-span-2">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-400">Total Sales</p>
                <p className="text-xl font-bold text-green-400">{formatCurrency(stats.totalSales)}</p>
              </div>
              <DollarSign className="h-8 w-8 text-green-400" />
            </div>
          </div>
          <div className="bg-slate-800/40 backdrop-blur-xl p-4 rounded-xl border border-yellow-400/30">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-400">Total Earnings</p>
                <p className="text-xl font-bold text-yellow-400">{formatCurrency(stats.totalEarnings)}</p>
              </div>
              <Award className="h-8 w-8 text-yellow-400" />
            </div>
          </div>
        </div>

        {/* Filters and View Toggle */}
        <div className="bg-slate-800/40 backdrop-blur-xl rounded-xl p-4 border border-yellow-400/30">
          <div className="grid grid-cols-1 md:grid-cols-6 gap-4 items-center">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-500 h-4 w-4" />
              <input
                type="text"
                placeholder="Search agents..."
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
              <option value="suspended">Suspended</option>
              <option value="on-leave">On Leave</option>
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
            <select
              value={filterRanking}
              onChange={(e) => setFilterRanking(e.target.value)}
              className="px-3 py-2 bg-slate-700/50 border border-yellow-400/30 rounded-lg text-slate-50 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 backdrop-blur-sm"
            >
              <option value="all">All Rankings</option>
              <option value="legend">Legend</option>
              <option value="champion">Champion</option>
              <option value="star">Star</option>
              <option value="performer">Performer</option>
              <option value="rookie">Rookie</option>
            </select>
            <div className="text-sm text-slate-400">
              Showing: <span className="font-semibold text-slate-50">{filteredAgents.length}</span> agents
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

        {/* Agents Display */}
        {viewMode === 'cards' ? (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {filteredAgents.map((agent) => (
              <AgentCard key={agent.id} agent={agent} />
            ))}
          </div>
        ) : (
          <div className="bg-slate-800/40 backdrop-blur-xl rounded-2xl border border-yellow-400/30 overflow-hidden">
            <div className="overflow-x-auto max-h-[600px] overflow-y-auto">
              <table className="w-full">
                <thead className="bg-slate-700/50 border-b border-yellow-400/20 sticky top-0">
                  <tr>
                    <th className="px-6 py-4 text-left text-xs font-medium text-slate-300 uppercase tracking-wider">Agent</th>
                    <th className="px-6 py-4 text-left text-xs font-medium text-slate-300 uppercase tracking-wider">Territory</th>
                    <th className="px-6 py-4 text-left text-xs font-medium text-slate-300 uppercase tracking-wider">Performance</th>
                    <th className="px-6 py-4 text-left text-xs font-medium text-slate-300 uppercase tracking-wider">Customers</th>
                    <th className="px-6 py-4 text-left text-xs font-medium text-slate-300 uppercase tracking-wider">Ranking</th>
                    <th className="px-6 py-4 text-left text-xs font-medium text-slate-300 uppercase tracking-wider">Status</th>
                    <th className="px-6 py-4 text-left text-xs font-medium text-slate-300 uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-yellow-400/20">
                  {filteredAgents.map((agent) => (
                    <tr key={agent.id} className="hover:bg-slate-700/20 transition-colors">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center space-x-3">
                          <div className="h-10 w-10 bg-slate-600/50 rounded-full flex items-center justify-center text-slate-50 font-medium border border-yellow-400/30">
                            {agent.firstName.charAt(0)}{agent.lastName.charAt(0)}
                          </div>
                          <div>
                            <p className="text-sm font-medium text-slate-50">{agent.firstName} {agent.lastName}</p>
                            <p className="text-xs text-slate-400">{agent.agentId} • {agent.designation}</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div>
                          <p className="text-sm font-medium text-slate-50">{agent.territory}</p>
                          <p className="text-xs text-slate-400">{agent.branch}</p>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div>
                          <p className="text-sm font-medium text-slate-50">{formatCurrency(agent.currentMonthAchievement)}</p>
                          <p className="text-xs text-slate-400">of {formatCurrency(agent.monthlyTarget)}</p>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div>
                          <p className="text-sm font-medium text-slate-50">{agent.totalCustomers}</p>
                          <p className="text-xs text-green-400">{agent.activeCustomers} active</p>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center space-x-2">
                          <span className="text-sm font-medium text-slate-50">#{agent.currentRank}</span>
                          <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium border ${getRankingColor(agent.rankingCategory)}`}>
                            {agent.rankingCategory}
                          </span>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium border ${getStatusColor(agent.status)}`}>
                          {agent.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <div className="flex space-x-2">
                          <button className="text-blue-400 hover:text-blue-300">
                            <Eye className="h-4 w-4" />
                          </button>
                          <button className="text-green-400 hover:text-green-300">
                            <Edit className="h-4 w-4" />
                          </button>
                          <button className="text-purple-400 hover:text-purple-300">
                            <Target className="h-4 w-4" />
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

        {filteredAgents.length === 0 && (
          <div className="text-center py-12">
            <Users className="h-12 w-12 mx-auto text-slate-500 mb-4" />
            <h3 className="text-lg font-medium text-slate-50 mb-2">No agents found</h3>
            <p className="text-sm text-slate-400">Try adjusting your search criteria or add a new agent.</p>
          </div>
        )}
      </div>
    </div>
  );
};