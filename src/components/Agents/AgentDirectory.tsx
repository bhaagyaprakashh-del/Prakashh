import React, { useState, useMemo } from 'react';
import {
  Plus,
  Search,
  Edit,
  Trash2,
  Eye,
  Mail,
  Phone,
  MapPin,
  Calendar,
  DollarSign,
  Users,
  Star,
  CheckCircle,
  XCircle,
  AlertTriangle,
  Clock,
  Award,
  Target,
  TrendingUp,
  Filter,
  Download,
  Upload,
  MoreVertical,
  User,
  Building,
  CreditCard,
  Shield,
  Flag,
  Zap,
  Crown,
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
    firstName: 'Karthik',
    lastName: 'Nair',
    email: 'karthik.nair@agents.ramnirmalchits.com',
    phone: '+91 98765 43217',
    alternatePhone: '+91 98765 43218',
    dateOfBirth: '1989-08-12',
    gender: 'male',
    maritalStatus: 'married',
    address: '456 Jayanagar, Bangalore',
    city: 'Bangalore',
    state: 'Karnataka',
    country: 'India',
    postalCode: '560041',
    designation: 'Senior Sales Agent',
    department: 'Sales & Marketing',
    branch: 'Bangalore South',
    joiningDate: '2021-03-10',
    employmentType: 'permanent',
    workLocation: 'field',
    reportingManager: 'Rajesh Kumar',
    teamMembers: [],
    territory: 'South Bangalore',
    coverageArea: ['Jayanagar', 'BTM Layout', 'JP Nagar', 'Banashankari'],
    transportMode: 'bike',
    monthlyTarget: 500000,
    quarterlyTarget: 1500000,
    yearlyTarget: 6000000,
    currentMonthAchievement: 425000,
    currentQuarterAchievement: 1200000,
    currentYearAchievement: 3800000,
    commissionStructure: {
      baseCommission: 2.5,
      bonusThreshold: 110,
      bonusCommission: 1.0,
      penaltyThreshold: 80,
      penaltyDeduction: 0.5
    },
    totalCustomers: 85,
    activeCustomers: 78,
    newCustomersThisMonth: 12,
    customerRetentionRate: 92.5,
    totalSales: 3800000,
    monthlyEarnings: 12500,
    quarterlyEarnings: 35000,
    yearlyEarnings: 95000,
    pendingCommissions: 8500,
    currentRank: 2,
    previousRank: 3,
    rankingCategory: 'star',
    achievements: [
      {
        id: 'ach_1',
        title: 'Top Performer Q1 2024',
        description: 'Achieved 120% of quarterly target',
        achievedDate: '2024-03-31',
        category: 'sales',
        points: 100,
        badge: 'gold-star',
        isPublic: true
      }
    ],
    skills: ['Customer Relations', 'Chit Fund Sales', 'Territory Management', 'Digital Marketing'],
    certifications: ['Certified Sales Professional', 'Financial Products Specialist'],
    trainingCompleted: ['Sales Fundamentals', 'Customer Service Excellence', 'Digital Tools'],
    trainingPending: ['Advanced Negotiation', 'Leadership Skills'],
    status: 'active',
    lastLogin: '2024-03-14T18:30:00',
    loginCount: 324,
    emergencyContact: {
      name: 'Meera Nair',
      relationship: 'Spouse',
      phone: '+91 98765 43219'
    },
    createdAt: '2021-03-10',
    createdBy: 'rajesh.kumar@ramnirmalchits.com',
    updatedAt: '2024-03-14',
    updatedBy: 'karthik.nair@agents.ramnirmalchits.com',
    notes: 'Top performing agent with excellent customer relationships'
  },
  {
    id: '2',
    agentId: 'AGT002',
    firstName: 'Vikram',
    lastName: 'Singh',
    email: 'vikram.singh@agents.ramnirmalchits.com',
    phone: '+91 98765 43221',
    dateOfBirth: '1986-04-18',
    gender: 'male',
    maritalStatus: 'married',
    address: '321 HSR Layout, Bangalore',
    city: 'Bangalore',
    state: 'Karnataka',
    country: 'India',
    postalCode: '560102',
    designation: 'Field Sales Agent',
    department: 'Sales & Marketing',
    branch: 'Bangalore East',
    joiningDate: '2020-11-20',
    employmentType: 'permanent',
    workLocation: 'field',
    reportingManager: 'Rajesh Kumar',
    teamMembers: [],
    territory: 'East Bangalore',
    coverageArea: ['HSR Layout', 'Koramangala', 'Sarjapur', 'Whitefield'],
    transportMode: 'car',
    monthlyTarget: 600000,
    quarterlyTarget: 1800000,
    yearlyTarget: 7200000,
    currentMonthAchievement: 520000,
    currentQuarterAchievement: 1650000,
    currentYearAchievement: 4200000,
    commissionStructure: {
      baseCommission: 3.0,
      bonusThreshold: 105,
      bonusCommission: 1.5,
      penaltyThreshold: 75,
      penaltyDeduction: 1.0
    },
    totalCustomers: 120,
    activeCustomers: 110,
    newCustomersThisMonth: 18,
    customerRetentionRate: 88.5,
    totalSales: 4200000,
    monthlyEarnings: 18500,
    quarterlyEarnings: 52000,
    yearlyEarnings: 126000,
    pendingCommissions: 12000,
    currentRank: 1,
    previousRank: 1,
    rankingCategory: 'champion',
    achievements: [
      {
        id: 'ach_2',
        title: 'Sales Champion 2024',
        description: 'Highest sales achievement for 3 consecutive months',
        achievedDate: '2024-03-15',
        category: 'sales',
        points: 150,
        badge: 'champion',
        isPublic: true
      }
    ],
    skills: ['Field Sales', 'Customer Onboarding', 'Market Research', 'Team Leadership'],
    certifications: ['Advanced Sales Techniques', 'Customer Relationship Management'],
    trainingCompleted: ['Sales Mastery', 'Leadership Development', 'Market Analysis'],
    trainingPending: ['Digital Transformation'],
    status: 'active',
    lastLogin: '2024-03-15T08:45:00',
    loginCount: 567,
    emergencyContact: {
      name: 'Simran Singh',
      relationship: 'Spouse',
      phone: '+91 98765 43222'
    },
    createdAt: '2020-11-20',
    createdBy: 'rajesh.kumar@ramnirmalchits.com',
    updatedAt: '2024-03-15',
    updatedBy: 'vikram.singh@agents.ramnirmalchits.com',
    notes: 'Experienced field agent with strong rural market presence'
  },
  {
    id: '3',
    agentId: 'AGT003',
    firstName: 'Priya',
    lastName: 'Reddy',
    email: 'priya.reddy@agents.ramnirmalchits.com',
    phone: '+91 98765 43225',
    dateOfBirth: '1991-06-22',
    gender: 'female',
    maritalStatus: 'single',
    address: '789 Marathahalli, Bangalore',
    city: 'Bangalore',
    state: 'Karnataka',
    country: 'India',
    postalCode: '560037',
    designation: 'Sales Agent',
    department: 'Sales & Marketing',
    branch: 'Bangalore East',
    joiningDate: '2022-01-15',
    employmentType: 'permanent',
    workLocation: 'hybrid',
    reportingManager: 'Vikram Singh',
    teamMembers: [],
    territory: 'Central Bangalore',
    coverageArea: ['Marathahalli', 'Brookefield', 'ITPL', 'Varthur'],
    transportMode: 'bike',
    monthlyTarget: 400000,
    quarterlyTarget: 1200000,
    yearlyTarget: 4800000,
    currentMonthAchievement: 380000,
    currentQuarterAchievement: 1100000,
    currentYearAchievement: 2900000,
    commissionStructure: {
      baseCommission: 2.0,
      bonusThreshold: 110,
      bonusCommission: 0.8,
      penaltyThreshold: 85,
      penaltyDeduction: 0.3
    },
    totalCustomers: 65,
    activeCustomers: 58,
    newCustomersThisMonth: 8,
    customerRetentionRate: 89.2,
    totalSales: 2900000,
    monthlyEarnings: 9500,
    quarterlyEarnings: 28000,
    yearlyEarnings: 58000,
    pendingCommissions: 6200,
    currentRank: 3,
    previousRank: 4,
    rankingCategory: 'performer',
    achievements: [
      {
        id: 'ach_3',
        title: 'Rising Star 2024',
        description: 'Fastest growing agent in Q1',
        achievedDate: '2024-03-31',
        category: 'sales',
        points: 75,
        badge: 'rising-star',
        isPublic: true
      }
    ],
    skills: ['Digital Marketing', 'Customer Acquisition', 'Social Media', 'Lead Generation'],
    certifications: ['Digital Sales Certification'],
    trainingCompleted: ['Digital Sales', 'Customer Psychology', 'Social Media Marketing'],
    trainingPending: ['Advanced Analytics', 'Team Management'],
    status: 'active',
    lastLogin: '2024-03-14T19:15:00',
    loginCount: 189,
    emergencyContact: {
      name: 'Lakshmi Reddy',
      relationship: 'Mother',
      phone: '+91 98765 43226'
    },
    createdAt: '2022-01-15',
    createdBy: 'vikram.singh@agents.ramnirmalchits.com',
    updatedAt: '2024-03-14',
    updatedBy: 'priya.reddy@agents.ramnirmalchits.com',
    notes: 'Promising young agent with strong digital skills'
  },
  {
    id: '4',
    agentId: 'AGT004',
    firstName: 'Suresh',
    lastName: 'Kumar',
    email: 'suresh.kumar@agents.ramnirmalchits.com',
    phone: '+91 98765 43227',
    dateOfBirth: '1984-12-08',
    gender: 'male',
    maritalStatus: 'married',
    address: '654 Rajajinagar, Bangalore',
    city: 'Bangalore',
    state: 'Karnataka',
    country: 'India',
    postalCode: '560010',
    designation: 'Senior Field Agent',
    department: 'Sales & Marketing',
    branch: 'Bangalore West',
    joiningDate: '2019-08-05',
    employmentType: 'permanent',
    workLocation: 'field',
    reportingManager: 'Rajesh Kumar',
    teamMembers: ['5'],
    territory: 'West Bangalore',
    coverageArea: ['Rajajinagar', 'Vijayanagar', 'Basaveshwaranagar', 'Malleshwaram'],
    transportMode: 'bike',
    monthlyTarget: 550000,
    quarterlyTarget: 1650000,
    yearlyTarget: 6600000,
    currentMonthAchievement: 465000,
    currentQuarterAchievement: 1400000,
    currentYearAchievement: 3600000,
    commissionStructure: {
      baseCommission: 2.8,
      bonusThreshold: 108,
      bonusCommission: 1.2,
      penaltyThreshold: 82,
      penaltyDeduction: 0.8
    },
    totalCustomers: 95,
    activeCustomers: 85,
    newCustomersThisMonth: 10,
    customerRetentionRate: 90.8,
    totalSales: 3600000,
    monthlyEarnings: 14200,
    quarterlyEarnings: 42000,
    yearlyEarnings: 100800,
    pendingCommissions: 9800,
    currentRank: 4,
    previousRank: 2,
    rankingCategory: 'performer',
    achievements: [
      {
        id: 'ach_4',
        title: 'Customer Retention Expert',
        description: 'Highest customer retention rate for 6 months',
        achievedDate: '2024-02-28',
        category: 'customer-service',
        points: 80,
        badge: 'retention-expert',
        isPublic: true
      }
    ],
    skills: ['Customer Retention', 'Territory Management', 'Rural Marketing', 'Relationship Building'],
    certifications: ['Territory Management Specialist', 'Customer Service Excellence'],
    trainingCompleted: ['Territory Planning', 'Customer Retention', 'Rural Sales'],
    trainingPending: ['Digital Tools'],
    status: 'active',
    lastLogin: '2024-03-13T17:20:00',
    loginCount: 445,
    emergencyContact: {
      name: 'Kavitha Kumar',
      relationship: 'Spouse',
      phone: '+91 98765 43228'
    },
    createdAt: '2019-08-05',
    createdBy: 'rajesh.kumar@ramnirmalchits.com',
    updatedAt: '2024-03-13',
    updatedBy: 'suresh.kumar@agents.ramnirmalchits.com',
    notes: 'Experienced agent with strong customer relationships'
  },
  {
    id: '5',
    agentId: 'AGT005',
    firstName: 'Anjali',
    lastName: 'Sharma',
    email: 'anjali.sharma@agents.ramnirmalchits.com',
    phone: '+91 98765 43229',
    dateOfBirth: '1993-02-14',
    gender: 'female',
    maritalStatus: 'single',
    address: '123 Indiranagar, Bangalore',
    city: 'Bangalore',
    state: 'Karnataka',
    country: 'India',
    postalCode: '560038',
    designation: 'Junior Sales Agent',
    department: 'Sales & Marketing',
    branch: 'Bangalore Central',
    joiningDate: '2023-06-01',
    employmentType: 'contract',
    workLocation: 'hybrid',
    reportingManager: 'Suresh Kumar',
    teamMembers: [],
    territory: 'Central Bangalore',
    coverageArea: ['Indiranagar', 'Domlur', 'Ulsoor', 'Shivajinagar'],
    transportMode: 'public',
    monthlyTarget: 300000,
    quarterlyTarget: 900000,
    yearlyTarget: 3600000,
    currentMonthAchievement: 285000,
    currentQuarterAchievement: 820000,
    currentYearAchievement: 1800000,
    commissionStructure: {
      baseCommission: 1.8,
      bonusThreshold: 115,
      bonusCommission: 0.7,
      penaltyThreshold: 90,
      penaltyDeduction: 0.2
    },
    totalCustomers: 45,
    activeCustomers: 42,
    newCustomersThisMonth: 6,
    customerRetentionRate: 93.3,
    totalSales: 1800000,
    monthlyEarnings: 6800,
    quarterlyEarnings: 19500,
    yearlyEarnings: 32400,
    pendingCommissions: 4200,
    currentRank: 5,
    previousRank: 6,
    rankingCategory: 'rookie',
    achievements: [
      {
        id: 'ach_5',
        title: 'Rookie of the Year',
        description: 'Outstanding performance in first year',
        achievedDate: '2024-01-31',
        category: 'sales',
        points: 50,
        badge: 'rookie-star',
        isPublic: true
      }
    ],
    skills: ['Social Media Marketing', 'Customer Acquisition', 'Digital Communication'],
    certifications: ['Basic Sales Training'],
    trainingCompleted: ['Sales Basics', 'Product Knowledge', 'Customer Communication'],
    trainingPending: ['Advanced Sales', 'Territory Management', 'Leadership Basics'],
    status: 'active',
    lastLogin: '2024-03-15T12:30:00',
    loginCount: 156,
    emergencyContact: {
      name: 'Rajesh Sharma',
      relationship: 'Father',
      phone: '+91 98765 43230'
    },
    createdAt: '2023-06-01',
    createdBy: 'suresh.kumar@agents.ramnirmalchits.com',
    updatedAt: '2024-03-15',
    updatedBy: 'anjali.sharma@agents.ramnirmalchits.com',
    notes: 'Promising new agent with strong digital skills'
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
      case 'car': return Car;
      case 'bike': return Bike;
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
    return Math.round((achieved / target) * 100);
  };

  const TransportIcon = getTransportIcon(agent.transportMode);
  const monthlyAchievement = calculateAchievementPercentage(agent.currentMonthAchievement, agent.monthlyTarget);

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
          <Building className="h-4 w-4 mr-2 text-slate-500" />
          <span>{agent.branch} • {agent.territory}</span>
        </div>
        <div className="flex items-center text-sm text-slate-300">
          <TransportIcon className="h-4 w-4 mr-2 text-slate-500" />
          <span className="capitalize">{agent.transportMode} • {agent.coverageArea.length} areas</span>
        </div>
      </div>

      {/* Monthly Target Progress */}
      <div className="mb-4 p-3 bg-slate-700/30 rounded-xl border border-yellow-400/20">
        <div className="flex justify-between text-sm text-slate-400 mb-1">
          <span>Monthly Target</span>
          <span>{monthlyAchievement}%</span>
        </div>
        <div className="w-full bg-slate-700/50 rounded-full h-2 border border-yellow-400/20">
          <div
            className={`h-2 rounded-full transition-all duration-300 ${
              monthlyAchievement >= 100 ? 'bg-green-500' :
              monthlyAchievement >= 80 ? 'bg-yellow-500' : 'bg-red-500'
            }`}
            style={{ width: `${Math.min(monthlyAchievement, 100)}%` }}
          ></div>
        </div>
        <div className="flex justify-between text-xs text-slate-500 mt-1">
          <span>{formatCurrency(agent.currentMonthAchievement)}</span>
          <span>{formatCurrency(agent.monthlyTarget)}</span>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 mb-4">
        <div>
          <p className="text-xs text-slate-500">Total Sales</p>
          <p className="text-lg font-semibold text-green-400">{formatCurrency(agent.totalSales)}</p>
        </div>
        <div>
          <p className="text-xs text-slate-500">Monthly Earnings</p>
          <p className="text-lg font-semibold text-blue-400">{formatCurrency(agent.monthlyEarnings)}</p>
        </div>
        <div>
          <p className="text-xs text-slate-500">Customers</p>
          <p className="text-lg font-semibold text-purple-400">{agent.totalCustomers}</p>
        </div>
        <div>
          <p className="text-xs text-slate-500">Retention Rate</p>
          <p className="text-lg font-semibold text-orange-400">{agent.customerRetentionRate}%</p>
        </div>
      </div>

      {/* Skills Preview */}
      {agent.skills.length > 0 && (
        <div className="mb-4">
          <p className="text-xs text-slate-500 mb-2">Key Skills:</p>
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
          <span>Joined {new Date(agent.joiningDate).toLocaleDateString()}</span>
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
});

const AgentTable: React.FC<{ agents: Agent[] }> = React.memo(({ agents }) => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800';
      case 'inactive': return 'bg-gray-100 text-gray-800';
      case 'suspended': return 'bg-red-100 text-red-800';
      case 'on-leave': return 'bg-yellow-100 text-yellow-800';
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
              <th className="px-6 py-4 text-left text-xs font-medium text-slate-300 uppercase tracking-wider">Agent</th>
              <th className="px-6 py-4 text-left text-xs font-medium text-slate-300 uppercase tracking-wider">Territory</th>
              <th className="px-6 py-4 text-left text-xs font-medium text-slate-300 uppercase tracking-wider">Performance</th>
              <th className="px-6 py-4 text-left text-xs font-medium text-slate-300 uppercase tracking-wider">Customers</th>
              <th className="px-6 py-4 text-left text-xs font-medium text-slate-300 uppercase tracking-wider">Earnings</th>
              <th className="px-6 py-4 text-left text-xs font-medium text-slate-300 uppercase tracking-wider">Status</th>
              <th className="px-6 py-4 text-left text-xs font-medium text-slate-300 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-yellow-400/20">
            {agents.map((agent) => (
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
                    <p className="text-xs text-slate-400">{agent.branch} • {agent.coverageArea.length} areas</p>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div>
                    <p className="text-sm font-medium text-slate-50">Rank #{agent.currentRank}</p>
                    <p className="text-xs text-slate-400">{Math.round((agent.currentMonthAchievement / agent.monthlyTarget) * 100)}% of target</p>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div>
                    <p className="text-sm font-medium text-slate-50">{agent.totalCustomers}</p>
                    <p className="text-xs text-green-400">{agent.activeCustomers} active</p>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div>
                    <p className="text-sm font-medium text-slate-50">{formatCurrency(agent.monthlyEarnings)}</p>
                    <p className="text-xs text-yellow-400">{formatCurrency(agent.pendingCommissions)} pending</p>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(agent.status)}`}>
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
    champions: agents.filter(a => a.rankingCategory === 'champion').length,
    stars: agents.filter(a => a.rankingCategory === 'star').length,
    performers: agents.filter(a => a.rankingCategory === 'performer').length,
    rookies: agents.filter(a => a.rankingCategory === 'rookie').length,
    totalSales: agents.reduce((sum, a) => sum + a.totalSales, 0),
    totalEarnings: agents.reduce((sum, a) => sum + a.monthlyEarnings, 0),
    totalCustomers: agents.reduce((sum, a) => sum + a.totalCustomers, 0),
    avgRetention: agents.length > 0 ? agents.reduce((sum, a) => sum + a.customerRetentionRate, 0) / agents.length : 0
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
        <div className="grid grid-cols-1 md:grid-cols-4 lg:grid-cols-12 gap-4">
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
                <p className="text-sm text-slate-400">Champions</p>
                <p className="text-2xl font-bold text-red-400">{stats.champions}</p>
              </div>
              <Crown className="h-8 w-8 text-red-400" />
            </div>
          </div>
          <div className="bg-slate-800/40 backdrop-blur-xl p-4 rounded-xl border border-yellow-400/30">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-400">Stars</p>
                <p className="text-2xl font-bold text-yellow-400">{stats.stars}</p>
              </div>
              <Star className="h-8 w-8 text-yellow-400" />
            </div>
          </div>
          <div className="bg-slate-800/40 backdrop-blur-xl p-4 rounded-xl border border-yellow-400/30">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-400">Performers</p>
                <p className="text-2xl font-bold text-blue-400">{stats.performers}</p>
              </div>
              <Award className="h-8 w-8 text-blue-400" />
            </div>
          </div>
          <div className="bg-slate-800/40 backdrop-blur-xl p-4 rounded-xl border border-yellow-400/30">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-400">Rookies</p>
                <p className="text-2xl font-bold text-green-400">{stats.rookies}</p>
              </div>
              <Zap className="h-8 w-8 text-green-400" />
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
                <p className="text-sm text-slate-400">Customers</p>
                <p className="text-2xl font-bold text-purple-400">{stats.totalCustomers}</p>
              </div>
              <Users className="h-8 w-8 text-purple-400" />
            </div>
          </div>
          <div className="bg-slate-800/40 backdrop-blur-xl p-4 rounded-xl border border-yellow-400/30">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-400">Avg Retention</p>
                <p className="text-2xl font-bold text-orange-400">{stats.avgRetention.toFixed(1)}%</p>
              </div>
              <Target className="h-8 w-8 text-orange-400" />
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
                <p className="text-sm text-slate-400">Earnings</p>
                <p className="text-xl font-bold text-emerald-400">{formatCurrency(stats.totalEarnings)}</p>
              </div>
              <TrendingUp className="h-8 w-8 text-emerald-400" />
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
          <AgentTable agents={filteredAgents} />
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
}