import React, { useState, useMemo } from 'react';
import {
  Plus,
  Search,
  Edit,
  Trash2,
  Eye,
  Users,
  Mail,
  Phone,
  MapPin,
  Calendar,
  CreditCard,
  Star,
  CheckCircle,
  XCircle,
  AlertTriangle,
  Filter,
  Download,
  Upload,
  MoreVertical,
  User,
  Building,
  Award,
  Target,
  TrendingUp,
  DollarSign,
  Clock,
  Shield
} from 'lucide-react';
import { Subscriber } from '../../types/subscribers';

const sampleSubscribers: Subscriber[] = [
  {
    id: '1',
    subscriberId: 'SUB001',
    firstName: 'Anita',
    lastName: 'Desai',
    email: 'anita.desai@gmail.com',
    phone: '+91 98765 43219',
    dateOfBirth: '1985-08-15',
    gender: 'female',
    maritalStatus: 'married',
    occupation: 'Business Owner',
    annualIncome: 800000,
    address: '123 Residency Road, Bangalore',
    city: 'Bangalore',
    state: 'Karnataka',
    country: 'India',
    postalCode: '560025',
    membershipType: 'Individual',
    membershipTier: 'Gold',
    joiningDate: '2022-06-15',
    status: 'active',
    creditScore: 85,
    totalInvestments: 300000,
    currentBalance: 45000,
    totalReturns: 25000,
    activeSchemes: ['scheme_001', 'scheme_002'],
    completedSchemes: ['scheme_003'],
    totalSchemes: 3,
    kycStatus: 'verified',
    kycVerifiedDate: '2022-06-20',
    documents: [],
    nominee: {
      name: 'Rajesh Desai',
      relationship: 'Spouse',
      phone: '+91 98765 43220',
      address: '123 Residency Road, Bangalore',
      idProof: 'AADHAR123456789'
    },
    emergencyContact: {
      name: 'Priya Desai',
      relationship: 'Sister',
      phone: '+91 98765 43221'
    },
    assignedAgent: 'Priya Sharma',
    branch: 'Bangalore Main',
    communicationPreferences: {
      email: true,
      sms: true,
      whatsapp: true,
      phone: false,
      preferredTime: 'evening',
      language: 'English'
    },
    riskProfile: 'low',
    riskFactors: [],
    paymentHistory: {
      onTimePayments: 18,
      latePayments: 2,
      missedPayments: 0,
      averageDelayDays: 1.5
    },
    tags: ['premium-customer', 'referral-source'],
    notes: 'Excellent payment history, potential for premium schemes',
    lastLogin: '2024-03-14T16:30:00',
    loginCount: 45,
    accountLocked: false,
    createdAt: '2022-06-15',
    createdBy: 'priya.sharma@ramnirmalchits.com',
    updatedAt: '2024-03-14',
    updatedBy: 'anita.desai@gmail.com'
  },
  {
    id: '2',
    subscriberId: 'SUB002',
    firstName: 'Deepika',
    lastName: 'Rao',
    email: 'deepika.rao@techcorp.com',
    phone: '+91 98765 43223',
    dateOfBirth: '1990-03-22',
    gender: 'female',
    maritalStatus: 'single',
    occupation: 'Software Engineer',
    annualIncome: 1200000,
    address: '456 Electronic City, Bangalore',
    city: 'Bangalore',
    state: 'Karnataka',
    country: 'India',
    postalCode: '560100',
    membershipType: 'Corporate',
    membershipTier: 'Platinum',
    joiningDate: '2021-09-12',
    status: 'active',
    creditScore: 92,
    totalInvestments: 750000,
    currentBalance: 125000,
    totalReturns: 85000,
    activeSchemes: ['scheme_001', 'scheme_004'],
    completedSchemes: ['scheme_005', 'scheme_006'],
    totalSchemes: 4,
    kycStatus: 'verified',
    kycVerifiedDate: '2021-09-15',
    documents: [],
    nominee: {
      name: 'Ramesh Rao',
      relationship: 'Father',
      phone: '+91 98765 43224',
      address: '789 Koramangala, Bangalore',
      idProof: 'AADHAR987654321'
    },
    emergencyContact: {
      name: 'Sunita Rao',
      relationship: 'Mother',
      phone: '+91 98765 43225'
    },
    assignedAgent: 'Vikram Singh',
    branch: 'Bangalore East',
    referredBy: 'Anita Desai',
    communicationPreferences: {
      email: true,
      sms: false,
      whatsapp: true,
      phone: true,
      preferredTime: 'morning',
      language: 'English'
    },
    riskProfile: 'low',
    riskFactors: [],
    paymentHistory: {
      onTimePayments: 32,
      latePayments: 1,
      missedPayments: 0,
      averageDelayDays: 0.5
    },
    tags: ['corporate', 'high-value', 'tech-professional'],
    notes: 'High-value customer with excellent track record',
    lastLogin: '2024-03-15T09:15:00',
    loginCount: 128,
    accountLocked: false,
    createdAt: '2021-09-12',
    createdBy: 'vikram.singh@ramnirmalchits.com',
    updatedAt: '2024-03-15',
    updatedBy: 'deepika.rao@techcorp.com'
  },
  {
    id: '3',
    subscriberId: 'SUB003',
    firstName: 'Ravi',
    lastName: 'Patel',
    email: 'ravi.patel@startup.com',
    phone: '+91 98765 43225',
    dateOfBirth: '1988-11-08',
    gender: 'male',
    maritalStatus: 'married',
    occupation: 'Entrepreneur',
    annualIncome: 600000,
    address: '321 HSR Layout, Bangalore',
    city: 'Bangalore',
    state: 'Karnataka',
    country: 'India',
    postalCode: '560102',
    membershipType: 'Individual',
    membershipTier: 'Silver',
    joiningDate: '2023-01-20',
    status: 'active',
    creditScore: 78,
    totalInvestments: 150000,
    currentBalance: 25000,
    totalReturns: 12000,
    activeSchemes: ['scheme_002'],
    completedSchemes: [],
    totalSchemes: 1,
    kycStatus: 'verified',
    kycVerifiedDate: '2023-01-25',
    documents: [],
    nominee: {
      name: 'Neha Patel',
      relationship: 'Spouse',
      phone: '+91 98765 43226',
      address: '321 HSR Layout, Bangalore',
      idProof: 'AADHAR456789123'
    },
    emergencyContact: {
      name: 'Kiran Patel',
      relationship: 'Brother',
      phone: '+91 98765 43227'
    },
    assignedAgent: 'Karthik Nair',
    branch: 'Bangalore Main',
    communicationPreferences: {
      email: true,
      sms: true,
      whatsapp: false,
      phone: true,
      preferredTime: 'afternoon',
      language: 'English'
    },
    riskProfile: 'medium',
    riskFactors: ['new-customer'],
    paymentHistory: {
      onTimePayments: 12,
      latePayments: 2,
      missedPayments: 0,
      averageDelayDays: 2.0
    },
    tags: ['startup', 'entrepreneur'],
    notes: 'Growing business owner, potential for expansion',
    lastLogin: '2024-03-13T14:20:00',
    loginCount: 67,
    accountLocked: false,
    createdAt: '2023-01-20',
    createdBy: 'karthik.nair@ramnirmalchits.com',
    updatedAt: '2024-03-13',
    updatedBy: 'ravi.patel@startup.com'
  },
  {
    id: '4',
    subscriberId: 'SUB004',
    firstName: 'Meera',
    lastName: 'Nair',
    email: 'meera.nair@consultancy.com',
    phone: '+91 98765 43227',
    dateOfBirth: '1992-05-30',
    gender: 'female',
    maritalStatus: 'single',
    occupation: 'Consultant',
    annualIncome: 900000,
    address: '654 Indiranagar, Bangalore',
    city: 'Bangalore',
    state: 'Karnataka',
    country: 'India',
    postalCode: '560038',
    membershipType: 'Individual',
    membershipTier: 'Basic',
    joiningDate: '2023-08-10',
    status: 'inactive',
    creditScore: 65,
    totalInvestments: 50000,
    currentBalance: 8000,
    totalReturns: 2000,
    activeSchemes: [],
    completedSchemes: ['scheme_007'],
    totalSchemes: 1,
    kycStatus: 'pending',
    documents: [],
    nominee: {
      name: 'Suresh Nair',
      relationship: 'Father',
      phone: '+91 98765 43228',
      address: '987 Koramangala, Bangalore',
      idProof: 'AADHAR789123456'
    },
    emergencyContact: {
      name: 'Lakshmi Nair',
      relationship: 'Mother',
      phone: '+91 98765 43229'
    },
    assignedAgent: 'Priya Sharma',
    branch: 'Bangalore South',
    communicationPreferences: {
      email: true,
      sms: false,
      whatsapp: true,
      phone: false,
      preferredTime: 'evening',
      language: 'English'
    },
    riskProfile: 'medium',
    riskFactors: ['kyc-pending', 'inactive'],
    paymentHistory: {
      onTimePayments: 8,
      latePayments: 1,
      missedPayments: 1,
      averageDelayDays: 3.0
    },
    tags: ['inactive', 'kyc-pending'],
    notes: 'KYC verification pending, follow up required',
    lastLogin: '2024-02-20T11:30:00',
    loginCount: 23,
    accountLocked: false,
    createdAt: '2023-08-10',
    createdBy: 'priya.sharma@ramnirmalchits.com',
    updatedAt: '2024-02-20',
    updatedBy: 'meera.nair@consultancy.com'
  }
];

const SubscriberCard: React.FC<{ subscriber: Subscriber }> = React.memo(({ subscriber }) => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800 border-green-200';
      case 'inactive': return 'bg-gray-100 text-gray-800 border-gray-200';
      case 'suspended': return 'bg-red-100 text-red-800 border-red-200';
      case 'pending': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'defaulter': return 'bg-red-100 text-red-800 border-red-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getTierColor = (tier: string) => {
    switch (tier) {
      case 'Platinum': return 'bg-purple-100 text-purple-800 border-purple-200';
      case 'Gold': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'Silver': return 'bg-gray-100 text-gray-800 border-gray-200';
      case 'Basic': return 'bg-blue-100 text-blue-800 border-blue-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getKycStatusColor = (status: string) => {
    switch (status) {
      case 'verified': return 'bg-green-100 text-green-800 border-green-200';
      case 'pending': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'rejected': return 'bg-red-100 text-red-800 border-red-200';
      case 'expired': return 'bg-orange-100 text-orange-800 border-orange-200';
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

  return (
    <div className="bg-slate-800/40 backdrop-blur-xl rounded-2xl p-6 border border-yellow-400/30 hover:border-yellow-400/50 transition-all">
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center space-x-3">
          <div className="h-12 w-12 bg-slate-600/50 rounded-full flex items-center justify-center text-slate-50 font-semibold text-lg border border-yellow-400/30">
            {subscriber.firstName.charAt(0)}{subscriber.lastName.charAt(0)}
          </div>
          <div>
            <h3 className="text-lg font-semibold text-slate-50">{subscriber.firstName} {subscriber.lastName}</h3>
            <p className="text-sm text-slate-400">{subscriber.subscriberId}</p>
            <p className="text-xs text-slate-500">{subscriber.occupation}</p>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium border ${getTierColor(subscriber.membershipTier)}`}>
            {subscriber.membershipTier}
          </span>
          <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium border ${getStatusColor(subscriber.status)}`}>
            {subscriber.status.toUpperCase()}
          </span>
          <button className="p-2 text-slate-400 hover:text-slate-50 hover:bg-slate-700/50 rounded-lg transition-all">
            <MoreVertical className="h-4 w-4" />
          </button>
        </div>
      </div>

      <div className="space-y-2 mb-4">
        <div className="flex items-center text-sm text-slate-300">
          <Mail className="h-4 w-4 mr-2 text-slate-500" />
          <span className="truncate">{subscriber.email}</span>
        </div>
        <div className="flex items-center text-sm text-slate-300">
          <Phone className="h-4 w-4 mr-2 text-slate-500" />
          <span>{subscriber.phone}</span>
        </div>
        <div className="flex items-center text-sm text-slate-300">
          <MapPin className="h-4 w-4 mr-2 text-slate-500" />
          <span className="truncate">{subscriber.city}, {subscriber.state}</span>
        </div>
        <div className="flex items-center text-sm text-slate-300">
          <User className="h-4 w-4 mr-2 text-slate-500" />
          <span>Agent: {subscriber.assignedAgent}</span>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 mb-4 pt-4 border-t border-yellow-400/20">
        <div>
          <p className="text-xs text-slate-500">Total Investment</p>
          <p className="text-lg font-semibold text-green-400">{formatCurrency(subscriber.totalInvestments)}</p>
        </div>
        <div>
          <p className="text-xs text-slate-500">Current Balance</p>
          <p className="text-lg font-semibold text-blue-400">{formatCurrency(subscriber.currentBalance)}</p>
        </div>
        <div>
          <p className="text-xs text-slate-500">Credit Score</p>
          <p className="text-lg font-semibold text-purple-400">{subscriber.creditScore}</p>
        </div>
        <div>
          <p className="text-xs text-slate-500">Active Schemes</p>
          <p className="text-lg font-semibold text-orange-400">{subscriber.activeSchemes.length}</p>
        </div>
      </div>

      {/* KYC Status */}
      <div className="mb-4">
        <div className="flex items-center justify-between">
          <span className="text-sm text-slate-400">KYC Status</span>
          <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium border ${getKycStatusColor(subscriber.kycStatus)}`}>
            {subscriber.kycStatus === 'verified' && <CheckCircle className="h-3 w-3 mr-1" />}
            {subscriber.kycStatus === 'pending' && <Clock className="h-3 w-3 mr-1" />}
            {subscriber.kycStatus === 'rejected' && <XCircle className="h-3 w-3 mr-1" />}
            {subscriber.kycStatus.toUpperCase()}
          </span>
        </div>
      </div>

      {/* Tags */}
      {subscriber.tags.length > 0 && (
        <div className="mb-4">
          <div className="flex flex-wrap gap-1">
            {subscriber.tags.slice(0, 3).map((tag, index) => (
              <span key={index} className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-blue-100 text-blue-800 border border-blue-200">
                #{tag}
              </span>
            ))}
            {subscriber.tags.length > 3 && (
              <span className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-slate-100 text-slate-800 border border-slate-200">
                +{subscriber.tags.length - 3} more
              </span>
            )}
          </div>
        </div>
      )}

      <div className="flex justify-between items-center pt-4 border-t border-yellow-400/20">
        <div className="flex items-center text-xs text-slate-500">
          <Calendar className="h-3 w-3 mr-1" />
          <span>Member for {calculateTenure(subscriber.joiningDate)}</span>
        </div>
        <div className="flex space-x-2">
          <button className="p-2 text-slate-400 hover:text-blue-400 hover:bg-blue-500/10 rounded-lg transition-all">
            <Eye className="h-4 w-4" />
          </button>
          <button className="p-2 text-slate-400 hover:text-green-400 hover:bg-green-500/10 rounded-lg transition-all">
            <Edit className="h-4 w-4" />
          </button>
          <button className="p-2 text-slate-400 hover:text-purple-400 hover:bg-purple-500/10 rounded-lg transition-all">
            <CreditCard className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );
});

export const AllSubscribers: React.FC = () => {
  const [subscribers] = useState<Subscriber[]>(sampleSubscribers);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [filterTier, setFilterTier] = useState<string>('all');
  const [filterKyc, setFilterKyc] = useState<string>('all');
  const [viewMode, setViewMode] = useState<'cards' | 'table'>('cards');

  const filteredSubscribers = useMemo(() => subscribers.filter(subscriber => {
    const matchesSearch = subscriber.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         subscriber.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         subscriber.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         subscriber.subscriberId.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === 'all' || subscriber.status === filterStatus;
    const matchesTier = filterTier === 'all' || subscriber.membershipTier === filterTier;
    const matchesKyc = filterKyc === 'all' || subscriber.kycStatus === filterKyc;
    
    return matchesSearch && matchesStatus && matchesTier && matchesKyc;
  }), [subscribers, searchTerm, filterStatus, filterTier, filterKyc]);

  const stats = useMemo(() => ({
    total: subscribers.length,
    active: subscribers.filter(s => s.status === 'active').length,
    inactive: subscribers.filter(s => s.status === 'inactive').length,
    suspended: subscribers.filter(s => s.status === 'suspended').length,
    pending: subscribers.filter(s => s.status === 'pending').length,
    defaulter: subscribers.filter(s => s.status === 'defaulter').length,
    platinum: subscribers.filter(s => s.membershipTier === 'Platinum').length,
    gold: subscribers.filter(s => s.membershipTier === 'Gold').length,
    silver: subscribers.filter(s => s.membershipTier === 'Silver').length,
    basic: subscribers.filter(s => s.membershipTier === 'Basic').length,
    kycVerified: subscribers.filter(s => s.kycStatus === 'verified').length,
    kycPending: subscribers.filter(s => s.kycStatus === 'pending').length,
    totalInvestments: subscribers.reduce((sum, s) => sum + s.totalInvestments, 0),
    avgCreditScore: subscribers.length > 0 ? subscribers.reduce((sum, s) => sum + s.creditScore, 0) / subscribers.length : 0
  }), [subscribers]);

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
          <h1 className="text-2xl font-bold text-slate-50">All Subscribers (Table View)</h1>
          <p className="mt-1 text-sm text-slate-400">
            Comprehensive subscriber management with detailed profiles and investment tracking
          </p>
        </div>
        <div className="flex space-x-3">
          <button className="inline-flex items-center px-4 py-2 border border-yellow-400/30 text-sm font-medium rounded-lg text-slate-50 bg-slate-700/50 hover:bg-slate-700 transition-all backdrop-blur-sm">
            <Upload className="h-4 w-4 mr-2" />
            Import Subscribers
          </button>
          <button className="inline-flex items-center px-4 py-2 border border-yellow-400/30 text-sm font-medium rounded-lg text-slate-50 bg-slate-700/50 hover:bg-slate-700 transition-all backdrop-blur-sm">
            <Download className="h-4 w-4 mr-2" />
            Export
          </button>
          <button className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-lg shadow-sm text-white bg-blue-600 hover:bg-blue-700 transition-all">
            <Plus className="h-4 w-4 mr-2" />
            Add Subscriber
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
                <p className="text-sm text-slate-400">Total</p>
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
                <p className="text-sm text-slate-400">Pending</p>
                <p className="text-2xl font-bold text-yellow-400">{stats.pending}</p>
              </div>
              <Clock className="h-8 w-8 text-yellow-400" />
            </div>
          </div>
          <div className="bg-slate-800/40 backdrop-blur-xl p-4 rounded-xl border border-yellow-400/30">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-400">Defaulter</p>
                <p className="text-2xl font-bold text-red-400">{stats.defaulter}</p>
              </div>
              <AlertTriangle className="h-8 w-8 text-red-400" />
            </div>
          </div>
          <div className="bg-slate-800/40 backdrop-blur-xl p-4 rounded-xl border border-yellow-400/30">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-400">Platinum</p>
                <p className="text-2xl font-bold text-purple-400">{stats.platinum}</p>
              </div>
              <Star className="h-8 w-8 text-purple-400" />
            </div>
          </div>
          <div className="bg-slate-800/40 backdrop-blur-xl p-4 rounded-xl border border-yellow-400/30">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-400">Gold</p>
                <p className="text-2xl font-bold text-yellow-400">{stats.gold}</p>
              </div>
              <Award className="h-8 w-8 text-yellow-400" />
            </div>
          </div>
          <div className="bg-slate-800/40 backdrop-blur-xl p-4 rounded-xl border border-yellow-400/30">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-400">Silver</p>
                <p className="text-2xl font-bold text-gray-400">{stats.silver}</p>
              </div>
              <Target className="h-8 w-8 text-gray-400" />
            </div>
          </div>
          <div className="bg-slate-800/40 backdrop-blur-xl p-4 rounded-xl border border-yellow-400/30">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-400">Basic</p>
                <p className="text-2xl font-bold text-blue-400">{stats.basic}</p>
              </div>
              <Building className="h-8 w-8 text-blue-400" />
            </div>
          </div>
          <div className="bg-slate-800/40 backdrop-blur-xl p-4 rounded-xl border border-yellow-400/30">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-400">KYC Verified</p>
                <p className="text-2xl font-bold text-emerald-400">{stats.kycVerified}</p>
              </div>
              <Shield className="h-8 w-8 text-emerald-400" />
            </div>
          </div>
          <div className="bg-slate-800/40 backdrop-blur-xl p-4 rounded-xl border border-yellow-400/30">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-400">KYC Pending</p>
                <p className="text-2xl font-bold text-orange-400">{stats.kycPending}</p>
              </div>
              <AlertTriangle className="h-8 w-8 text-orange-400" />
            </div>
          </div>
          <div className="bg-slate-800/40 backdrop-blur-xl p-4 rounded-xl border border-yellow-400/30">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-400">Avg Credit Score</p>
                <p className="text-2xl font-bold text-indigo-400">{stats.avgCreditScore.toFixed(0)}</p>
              </div>
              <TrendingUp className="h-8 w-8 text-indigo-400" />
            </div>
          </div>
          <div className="bg-slate-800/40 backdrop-blur-xl p-4 rounded-xl border border-yellow-400/30 md:col-span-2">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-400">Total Investments</p>
                <p className="text-xl font-bold text-green-400">{formatCurrency(stats.totalInvestments)}</p>
              </div>
              <DollarSign className="h-8 w-8 text-green-400" />
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
                placeholder="Search subscribers..."
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
              <option value="pending">Pending</option>
              <option value="defaulter">Defaulter</option>
            </select>
            <select
              value={filterTier}
              onChange={(e) => setFilterTier(e.target.value)}
              className="px-3 py-2 bg-slate-700/50 border border-yellow-400/30 rounded-lg text-slate-50 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 backdrop-blur-sm"
            >
              <option value="all">All Tiers</option>
              <option value="Platinum">Platinum</option>
              <option value="Gold">Gold</option>
              <option value="Silver">Silver</option>
              <option value="Basic">Basic</option>
            </select>
            <select
              value={filterKyc}
              onChange={(e) => setFilterKyc(e.target.value)}
              className="px-3 py-2 bg-slate-700/50 border border-yellow-400/30 rounded-lg text-slate-50 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 backdrop-blur-sm"
            >
              <option value="all">All KYC</option>
              <option value="verified">Verified</option>
              <option value="pending">Pending</option>
              <option value="rejected">Rejected</option>
              <option value="expired">Expired</option>
            </select>
            <div className="text-sm text-slate-400">
              Showing: <span className="font-semibold text-slate-50">{filteredSubscribers.length}</span> subscribers
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

        {/* Subscribers Display */}
        {viewMode === 'cards' ? (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {filteredSubscribers.map((subscriber) => (
              <SubscriberCard key={subscriber.id} subscriber={subscriber} />
            ))}
          </div>
        ) : (
          <div className="bg-slate-800/40 backdrop-blur-xl rounded-2xl border border-yellow-400/30 overflow-hidden">
            <div className="overflow-x-auto max-h-[600px] overflow-y-auto">
              <table className="w-full">
                <thead className="bg-slate-700/50 border-b border-yellow-400/20 sticky top-0">
                  <tr>
                    <th className="px-6 py-4 text-left text-xs font-medium text-slate-300 uppercase tracking-wider">Subscriber</th>
                    <th className="px-6 py-4 text-left text-xs font-medium text-slate-300 uppercase tracking-wider">Contact</th>
                    <th className="px-6 py-4 text-left text-xs font-medium text-slate-300 uppercase tracking-wider">Membership</th>
                    <th className="px-6 py-4 text-left text-xs font-medium text-slate-300 uppercase tracking-wider">Investment</th>
                    <th className="px-6 py-4 text-left text-xs font-medium text-slate-300 uppercase tracking-wider">KYC Status</th>
                    <th className="px-6 py-4 text-left text-xs font-medium text-slate-300 uppercase tracking-wider">Status</th>
                    <th className="px-6 py-4 text-left text-xs font-medium text-slate-300 uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-yellow-400/20">
                  {filteredSubscribers.map((subscriber) => (
                    <tr key={subscriber.id} className="hover:bg-slate-700/20 transition-colors">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center space-x-3">
                          <div className="h-10 w-10 bg-slate-600/50 rounded-full flex items-center justify-center text-slate-50 font-medium border border-yellow-400/30">
                            {subscriber.firstName.charAt(0)}{subscriber.lastName.charAt(0)}
                          </div>
                          <div>
                            <p className="text-sm font-medium text-slate-50">{subscriber.firstName} {subscriber.lastName}</p>
                            <p className="text-xs text-slate-400">{subscriber.subscriberId}</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div>
                          <p className="text-sm text-slate-300">{subscriber.email}</p>
                          <p className="text-xs text-slate-400">{subscriber.phone}</p>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div>
                          <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium border ${getTierColor(subscriber.membershipTier)}`}>
                            {subscriber.membershipTier}
                          </span>
                          <p className="text-xs text-slate-400 mt-1">{subscriber.membershipType}</p>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div>
                          <p className="text-sm font-medium text-slate-50">{formatCurrency(subscriber.totalInvestments)}</p>
                          <p className="text-xs text-slate-400">{subscriber.activeSchemes.length} active schemes</p>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium border ${getKycStatusColor(subscriber.kycStatus)}`}>
                          {subscriber.kycStatus}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium border ${getStatusColor(subscriber.status)}`}>
                          {subscriber.status}
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
                            <CreditCard className="h-4 w-4" />
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

        {filteredSubscribers.length === 0 && (
          <div className="text-center py-12">
            <Users className="h-12 w-12 mx-auto text-slate-500 mb-4" />
            <h3 className="text-lg font-medium text-slate-50 mb-2">No subscribers found</h3>
            <p className="text-sm text-slate-400">Try adjusting your search criteria or add a new subscriber.</p>
          </div>
        )}
      </div>
    </div>
  );
};