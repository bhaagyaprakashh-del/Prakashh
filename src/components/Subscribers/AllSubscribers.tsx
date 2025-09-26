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
  Briefcase
} from 'lucide-react';
import { Subscriber } from '../../types/subscribers';

const sampleSubscribers: Subscriber[] = [
  {
    id: '1',
    subscriberId: 'SUB001',
    firstName: 'Anita',
    lastName: 'Desai',
    email: 'anita.desai@subscribers.ramnirmalchits.com',
    phone: '+91 98765 43219',
    alternatePhone: '+91 98765 43220',
    dateOfBirth: '1992-12-05',
    gender: 'female',
    maritalStatus: 'single',
    occupation: 'Software Engineer',
    annualIncome: 1200000,
    address: '789 Indiranagar, Bangalore',
    city: 'Bangalore',
    state: 'Karnataka',
    country: 'India',
    postalCode: '560038',
    membershipType: 'Individual',
    membershipTier: 'Gold',
    joiningDate: '2022-06-15',
    status: 'active',
    creditScore: 85,
    totalInvestments: 500000,
    currentBalance: 125000,
    totalReturns: 75000,
    activeSchemes: ['scheme1', 'scheme2'],
    completedSchemes: ['scheme3'],
    totalSchemes: 3,
    kycStatus: 'verified',
    kycVerifiedDate: '2022-06-20',
    documents: [
      {
        id: 'doc1',
        type: 'id-proof',
        name: 'Aadhaar Card',
        url: '/documents/aadhaar-anita.pdf',
        uploadedAt: '2022-06-15',
        verifiedBy: 'KYC Team',
        verifiedAt: '2022-06-20',
        status: 'verified'
      }
    ],
    nominee: {
      name: 'Ramesh Desai',
      relationship: 'Father',
      phone: '+91 98765 43221',
      address: '789 Indiranagar, Bangalore',
      idProof: 'Aadhaar: 1234-5678-9012'
    },
    emergencyContact: {
      name: 'Ramesh Desai',
      relationship: 'Father',
      phone: '+91 98765 43221'
    },
    assignedAgent: 'Karthik Nair',
    branch: 'Bangalore Main',
    referredBy: 'Existing Member',
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
    tags: ['premium', 'tech-professional', 'high-value'],
    notes: 'Active subscriber in multiple chit groups with excellent payment history',
    lastLogin: '2024-03-13T10:45:00',
    loginCount: 89,
    accountLocked: false,
    createdAt: '2022-06-15',
    createdBy: 'karthik.nair@agents.ramnirmalchits.com',
    updatedAt: '2024-01-10',
    updatedBy: 'anita.desai@subscribers.ramnirmalchits.com'
  },
  {
    id: '2',
    subscriberId: 'SUB002',
    firstName: 'Deepika',
    lastName: 'Rao',
    email: 'deepika.rao@subscribers.ramnirmalchits.com',
    phone: '+91 98765 43223',
    alternatePhone: '+91 98765 43224',
    dateOfBirth: '1988-09-25',
    gender: 'female',
    maritalStatus: 'married',
    occupation: 'Business Owner',
    annualIncome: 2500000,
    address: '654 Whitefield, Bangalore',
    city: 'Bangalore',
    state: 'Karnataka',
    country: 'India',
    postalCode: '560066',
    membershipType: 'Corporate',
    membershipTier: 'Platinum',
    joiningDate: '2021-09-12',
    status: 'active',
    creditScore: 92,
    totalInvestments: 1500000,
    currentBalance: 350000,
    totalReturns: 225000,
    activeSchemes: ['scheme1', 'scheme4', 'scheme5'],
    completedSchemes: ['scheme2', 'scheme3'],
    totalSchemes: 5,
    kycStatus: 'verified',
    kycVerifiedDate: '2021-09-15',
    documents: [
      {
        id: 'doc2',
        type: 'id-proof',
        name: 'PAN Card',
        url: '/documents/pan-deepika.pdf',
        uploadedAt: '2021-09-12',
        verifiedBy: 'KYC Team',
        verifiedAt: '2021-09-15',
        status: 'verified'
      }
    ],
    nominee: {
      name: 'Suresh Rao',
      relationship: 'Spouse',
      phone: '+91 98765 43225',
      address: '654 Whitefield, Bangalore',
      idProof: 'Aadhaar: 2345-6789-0123'
    },
    emergencyContact: {
      name: 'Suresh Rao',
      relationship: 'Spouse',
      phone: '+91 98765 43225'
    },
    assignedAgent: 'Vikram Singh',
    branch: 'Bangalore East',
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
      onTimePayments: 45,
      latePayments: 3,
      missedPayments: 0,
      averageDelayDays: 0.8
    },
    tags: ['corporate', 'high-value', 'platinum-member'],
    notes: 'Long-term subscriber with multiple high-value investments',
    lastLogin: '2024-03-11T14:30:00',
    loginCount: 156,
    accountLocked: false,
    createdAt: '2021-09-12',
    createdBy: 'vikram.singh@agents.ramnirmalchits.com',
    updatedAt: '2024-02-05',
    updatedBy: 'deepika.rao@subscribers.ramnirmalchits.com'
  },
  {
    id: '3',
    subscriberId: 'SUB003',
    firstName: 'Ravi',
    lastName: 'Patel',
    email: 'ravi.patel@subscribers.ramnirmalchits.com',
    phone: '+91 98765 43225',
    dateOfBirth: '1985-03-18',
    gender: 'male',
    maritalStatus: 'married',
    occupation: 'Doctor',
    annualIncome: 1800000,
    address: '321 Koramangala, Bangalore',
    city: 'Bangalore',
    state: 'Karnataka',
    country: 'India',
    postalCode: '560034',
    membershipType: 'Individual',
    membershipTier: 'Silver',
    joiningDate: '2023-01-20',
    status: 'active',
    creditScore: 78,
    totalInvestments: 300000,
    currentBalance: 85000,
    totalReturns: 45000,
    activeSchemes: ['scheme2'],
    completedSchemes: [],
    totalSchemes: 1,
    kycStatus: 'verified',
    kycVerifiedDate: '2023-01-25',
    documents: [
      {
        id: 'doc3',
        type: 'id-proof',
        name: 'Driving License',
        url: '/documents/dl-ravi.pdf',
        uploadedAt: '2023-01-20',
        verifiedBy: 'KYC Team',
        verifiedAt: '2023-01-25',
        status: 'verified'
      }
    ],
    nominee: {
      name: 'Priya Patel',
      relationship: 'Spouse',
      phone: '+91 98765 43226',
      address: '321 Koramangala, Bangalore',
      idProof: 'Aadhaar: 3456-7890-1234'
    },
    emergencyContact: {
      name: 'Priya Patel',
      relationship: 'Spouse',
      phone: '+91 98765 43226'
    },
    assignedAgent: 'Priya Reddy',
    branch: 'Bangalore Main',
    communicationPreferences: {
      email: true,
      sms: true,
      whatsapp: false,
      phone: true,
      preferredTime: 'afternoon',
      language: 'Hindi'
    },
    riskProfile: 'medium',
    riskFactors: ['new-subscriber'],
    paymentHistory: {
      onTimePayments: 12,
      latePayments: 1,
      missedPayments: 0,
      averageDelayDays: 2.0
    },
    tags: ['medical-professional', 'new-member'],
    notes: 'New subscriber with good payment discipline',
    lastLogin: '2024-03-10T16:20:00',
    loginCount: 45,
    accountLocked: false,
    createdAt: '2023-01-20',
    createdBy: 'priya.reddy@agents.ramnirmalchits.com',
    updatedAt: '2024-03-10',
    updatedBy: 'ravi.patel@subscribers.ramnirmalchits.com'
  },
  {
    id: '4',
    subscriberId: 'SUB004',
    firstName: 'Meera',
    lastName: 'Nair',
    email: 'meera.nair@subscribers.ramnirmalchits.com',
    phone: '+91 98765 43227',
    dateOfBirth: '1990-07-12',
    gender: 'female',
    maritalStatus: 'married',
    occupation: 'Teacher',
    annualIncome: 800000,
    address: '456 Jayanagar, Bangalore',
    city: 'Bangalore',
    state: 'Karnataka',
    country: 'India',
    postalCode: '560041',
    membershipType: 'Individual',
    membershipTier: 'Basic',
    joiningDate: '2023-08-10',
    status: 'active',
    creditScore: 72,
    totalInvestments: 150000,
    currentBalance: 45000,
    totalReturns: 15000,
    activeSchemes: ['scheme3'],
    completedSchemes: [],
    totalSchemes: 1,
    kycStatus: 'pending',
    documents: [
      {
        id: 'doc4',
        type: 'id-proof',
        name: 'Voter ID',
        url: '/documents/voter-meera.pdf',
        uploadedAt: '2023-08-10',
        status: 'pending'
      }
    ],
    nominee: {
      name: 'Kiran Nair',
      relationship: 'Spouse',
      phone: '+91 98765 43228',
      address: '456 Jayanagar, Bangalore',
      idProof: 'Aadhaar: 4567-8901-2345'
    },
    emergencyContact: {
      name: 'Kiran Nair',
      relationship: 'Spouse',
      phone: '+91 98765 43228'
    },
    assignedAgent: 'Suresh Kumar',
    branch: 'Bangalore South',
    communicationPreferences: {
      email: false,
      sms: true,
      whatsapp: true,
      phone: false,
      preferredTime: 'evening',
      language: 'Kannada'
    },
    riskProfile: 'medium',
    riskFactors: ['kyc-pending', 'new-subscriber'],
    paymentHistory: {
      onTimePayments: 6,
      latePayments: 1,
      missedPayments: 0,
      averageDelayDays: 3.0
    },
    tags: ['education-sector', 'basic-tier'],
    notes: 'KYC verification pending, good payment track record',
    lastLogin: '2024-03-08T19:15:00',
    loginCount: 23,
    accountLocked: false,
    createdAt: '2023-08-10',
    createdBy: 'suresh.kumar@agents.ramnirmalchits.com',
    updatedAt: '2024-03-08',
    updatedBy: 'meera.nair@subscribers.ramnirmalchits.com'
  },
  {
    id: '5',
    subscriberId: 'SUB005',
    firstName: 'Arjun',
    lastName: 'Singh',
    email: 'arjun.singh@subscribers.ramnirmalchits.com',
    phone: '+91 98765 43229',
    dateOfBirth: '1987-11-30',
    gender: 'male',
    maritalStatus: 'married',
    occupation: 'Business Consultant',
    annualIncome: 1500000,
    address: '123 HSR Layout, Bangalore',
    city: 'Bangalore',
    state: 'Karnataka',
    country: 'India',
    postalCode: '560102',
    membershipType: 'Corporate',
    membershipTier: 'Gold',
    joiningDate: '2022-03-08',
    status: 'suspended',
    creditScore: 65,
    totalInvestments: 800000,
    currentBalance: 0,
    totalReturns: 120000,
    activeSchemes: [],
    completedSchemes: ['scheme1', 'scheme2'],
    totalSchemes: 2,
    kycStatus: 'expired',
    kycVerifiedDate: '2022-03-15',
    documents: [
      {
        id: 'doc5',
        type: 'id-proof',
        name: 'Passport',
        url: '/documents/passport-arjun.pdf',
        uploadedAt: '2022-03-08',
        verifiedBy: 'KYC Team',
        verifiedAt: '2022-03-15',
        status: 'verified',
        expiryDate: '2024-03-15'
      }
    ],
    nominee: {
      name: 'Kavita Singh',
      relationship: 'Spouse',
      phone: '+91 98765 43230',
      address: '123 HSR Layout, Bangalore',
      idProof: 'Aadhaar: 5678-9012-3456'
    },
    emergencyContact: {
      name: 'Kavita Singh',
      relationship: 'Spouse',
      phone: '+91 98765 43230'
    },
    assignedAgent: 'Anjali Sharma',
    branch: 'Bangalore Central',
    communicationPreferences: {
      email: true,
      sms: true,
      whatsapp: false,
      phone: true,
      preferredTime: 'morning',
      language: 'Hindi'
    },
    riskProfile: 'high',
    riskFactors: ['kyc-expired', 'payment-delays', 'suspended-account'],
    paymentHistory: {
      onTimePayments: 15,
      latePayments: 8,
      missedPayments: 2,
      averageDelayDays: 12.5
    },
    tags: ['consultant', 'kyc-renewal-required'],
    notes: 'Account suspended due to KYC expiry and payment delays',
    lastLogin: '2024-02-20T11:30:00',
    loginCount: 67,
    accountLocked: true,
    createdAt: '2022-03-08',
    createdBy: 'anjali.sharma@agents.ramnirmalchits.com',
    updatedAt: '2024-02-20',
    updatedBy: 'system@ramnirmalchits.com'
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

  const getMembershipColor = (type: string) => {
    switch (type) {
      case 'Individual': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'Corporate': return 'bg-purple-100 text-purple-800 border-purple-200';
      case 'Enterprise': return 'bg-orange-100 text-orange-800 border-orange-200';
      case 'Premium': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getTierColor = (tier: string) => {
    switch (tier) {
      case 'Platinum': return 'bg-purple-100 text-purple-800 border-purple-200';
      case 'Gold': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'Silver': return 'bg-gray-100 text-gray-800 border-gray-200';
      case 'Basic': return 'bg-green-100 text-green-800 border-green-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getKYCColor = (status: string) => {
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
            <p className="text-sm text-slate-400">{subscriber.occupation}</p>
            <p className="text-xs text-slate-500">{subscriber.subscriberId}</p>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium border ${getMembershipColor(subscriber.membershipType)}`}>
            {subscriber.membershipType}
          </span>
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
          <Building className="h-4 w-4 mr-2 text-slate-500" />
          <span>{subscriber.branch} • {subscriber.assignedAgent}</span>
        </div>
        <div className="flex items-center text-sm text-slate-300">
          <MapPin className="h-4 w-4 mr-2 text-slate-500" />
          <span>{subscriber.city}, {subscriber.state}</span>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 mb-4 pt-4 border-t border-yellow-400/20">
        <div>
          <p className="text-xs text-slate-500">Credit Score</p>
          <div className="flex items-center space-x-2">
            <p className={`text-lg font-semibold ${
              subscriber.creditScore >= 80 ? 'text-green-400' :
              subscriber.creditScore >= 60 ? 'text-yellow-400' : 'text-red-400'
            }`}>
              {subscriber.creditScore}
            </p>
            <div className="flex-1 bg-slate-700/50 rounded-full h-2 border border-yellow-400/20">
              <div
                className={`h-2 rounded-full transition-all duration-300 ${
                  subscriber.creditScore >= 80 ? 'bg-green-500' :
                  subscriber.creditScore >= 60 ? 'bg-yellow-500' : 'bg-red-500'
                }`}
                style={{ width: `${subscriber.creditScore}%` }}
              ></div>
            </div>
          </div>
        </div>
        <div>
          <p className="text-xs text-slate-500">KYC Status</p>
          <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium border ${getKYCColor(subscriber.kycStatus)}`}>
            {subscriber.kycStatus.toUpperCase()}
          </span>
        </div>
        <div>
          <p className="text-xs text-slate-500">Total Investments</p>
          <p className="text-lg font-semibold text-green-400">{formatCurrency(subscriber.totalInvestments)}</p>
        </div>
        <div>
          <p className="text-xs text-slate-500">Active Schemes</p>
          <p className="text-lg font-semibold text-blue-400">{subscriber.activeSchemes.length}</p>
        </div>
        <div>
          <p className="text-xs text-slate-500">Current Balance</p>
          <p className="text-lg font-semibold text-purple-400">{formatCurrency(subscriber.currentBalance)}</p>
        </div>
        <div>
          <p className="text-xs text-slate-500">Tenure</p>
          <p className="text-lg font-semibold text-orange-400">{calculateTenure(subscriber.joiningDate)}</p>
        </div>
      </div>

      {/* Payment History */}
      <div className="mb-4 p-3 bg-slate-700/30 rounded-xl border border-yellow-400/20">
        <p className="text-xs text-slate-500 mb-2">Payment History:</p>
        <div className="grid grid-cols-3 gap-2 text-center">
          <div>
            <p className="text-sm font-semibold text-green-400">{subscriber.paymentHistory.onTimePayments}</p>
            <p className="text-xs text-slate-500">On Time</p>
          </div>
          <div>
            <p className="text-sm font-semibold text-yellow-400">{subscriber.paymentHistory.latePayments}</p>
            <p className="text-xs text-slate-500">Late</p>
          </div>
          <div>
            <p className="text-sm font-semibold text-red-400">{subscriber.paymentHistory.missedPayments}</p>
            <p className="text-xs text-slate-500">Missed</p>
          </div>
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
          <span>Joined {new Date(subscriber.joiningDate).toLocaleDateString()}</span>
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

const SubscriberTable: React.FC<{ subscribers: Subscriber[] }> = React.memo(({ subscribers }) => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800';
      case 'inactive': return 'bg-gray-100 text-gray-800';
      case 'suspended': return 'bg-red-100 text-red-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'defaulter': return 'bg-red-100 text-red-800';
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
              <th className="px-6 py-4 text-left text-xs font-medium text-slate-300 uppercase tracking-wider">Subscriber</th>
              <th className="px-6 py-4 text-left text-xs font-medium text-slate-300 uppercase tracking-wider">Membership</th>
              <th className="px-6 py-4 text-left text-xs font-medium text-slate-300 uppercase tracking-wider">Contact</th>
              <th className="px-6 py-4 text-left text-xs font-medium text-slate-300 uppercase tracking-wider">Investments</th>
              <th className="px-6 py-4 text-left text-xs font-medium text-slate-300 uppercase tracking-wider">Credit Score</th>
              <th className="px-6 py-4 text-left text-xs font-medium text-slate-300 uppercase tracking-wider">Status</th>
              <th className="px-6 py-4 text-left text-xs font-medium text-slate-300 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-yellow-400/20">
            {subscribers.map((subscriber) => (
              <tr key={subscriber.id} className="hover:bg-slate-700/20 transition-colors">
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center space-x-3">
                    <div className="h-10 w-10 bg-slate-600/50 rounded-full flex items-center justify-center text-slate-50 font-medium border border-yellow-400/30">
                      {subscriber.firstName.charAt(0)}{subscriber.lastName.charAt(0)}
                    </div>
                    <div>
                      <p className="text-sm font-medium text-slate-50">{subscriber.firstName} {subscriber.lastName}</p>
                      <p className="text-xs text-slate-400">{subscriber.subscriberId} • {subscriber.occupation}</p>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div>
                    <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium border ${getMembershipColor(subscriber.membershipType)} mb-1`}>
                      {subscriber.membershipType}
                    </span>
                    <p className="text-xs text-slate-400">{subscriber.membershipTier} Tier</p>
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
                    <p className="text-sm font-medium text-slate-50">{formatCurrency(subscriber.totalInvestments)}</p>
                    <p className="text-xs text-green-400">{subscriber.activeSchemes.length} active schemes</p>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center space-x-2">
                    <span className={`text-sm font-medium ${
                      subscriber.creditScore >= 80 ? 'text-green-400' :
                      subscriber.creditScore >= 60 ? 'text-yellow-400' : 'text-red-400'
                    }`}>
                      {subscriber.creditScore}
                    </span>
                    <div className="w-12 bg-slate-700/50 rounded-full h-2">
                      <div
                        className={`h-2 rounded-full ${
                          subscriber.creditScore >= 80 ? 'bg-green-500' :
                          subscriber.creditScore >= 60 ? 'bg-yellow-500' : 'bg-red-500'
                        }`}
                        style={{ width: `${subscriber.creditScore}%` }}
                      ></div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(subscriber.status)}`}>
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

export const AllSubscribers: React.FC = () => {
  const [subscribers] = useState<Subscriber[]>(sampleSubscribers);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [filterMembership, setFilterMembership] = useState<string>('all');
  const [filterTier, setFilterTier] = useState<string>('all');
  const [filterKYC, setFilterKYC] = useState<string>('all');
  const [viewMode, setViewMode] = useState<'cards' | 'table'>('cards');

  const filteredSubscribers = useMemo(() => subscribers.filter(subscriber => {
    const matchesSearch = subscriber.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         subscriber.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         subscriber.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         subscriber.subscriberId.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === 'all' || subscriber.status === filterStatus;
    const matchesMembership = filterMembership === 'all' || subscriber.membershipType === filterMembership;
    const matchesTier = filterTier === 'all' || subscriber.membershipTier === filterTier;
    const matchesKYC = filterKYC === 'all' || subscriber.kycStatus === filterKYC;
    
    return matchesSearch && matchesStatus && matchesMembership && matchesTier && matchesKYC;
  }), [subscribers, searchTerm, filterStatus, filterMembership, filterTier, filterKYC]);

  const stats = useMemo(() => ({
    total: subscribers.length,
    active: subscribers.filter(s => s.status === 'active').length,
    inactive: subscribers.filter(s => s.status === 'inactive').length,
    suspended: subscribers.filter(s => s.status === 'suspended').length,
    pending: subscribers.filter(s => s.status === 'pending').length,
    defaulter: subscribers.filter(s => s.status === 'defaulter').length,
    individual: subscribers.filter(s => s.membershipType === 'Individual').length,
    corporate: subscribers.filter(s => s.membershipType === 'Corporate').length,
    enterprise: subscribers.filter(s => s.membershipType === 'Enterprise').length,
    premium: subscribers.filter(s => s.membershipType === 'Premium').length,
    platinum: subscribers.filter(s => s.membershipTier === 'Platinum').length,
    gold: subscribers.filter(s => s.membershipTier === 'Gold').length,
    silver: subscribers.filter(s => s.membershipTier === 'Silver').length,
    basic: subscribers.filter(s => s.membershipTier === 'Basic').length,
    kycVerified: subscribers.filter(s => s.kycStatus === 'verified').length,
    kycPending: subscribers.filter(s => s.kycStatus === 'pending').length,
    kycExpired: subscribers.filter(s => s.kycStatus === 'expired').length,
    totalInvestments: subscribers.reduce((sum, s) => sum + s.totalInvestments, 0),
    avgCreditScore: subscribers.length > 0 ? subscribers.reduce((sum, s) => sum + s.creditScore, 0) / subscribers.length : 0,
    totalBalance: subscribers.reduce((sum, s) => sum + s.currentBalance, 0)
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
          <h1 className="text-2xl font-bold text-slate-50">All Subscribers (Table)</h1>
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
        <div className="grid grid-cols-1 md:grid-cols-4 lg:grid-cols-18 gap-4">
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
                <p className="text-sm text-slate-400">Suspended</p>
                <p className="text-2xl font-bold text-red-400">{stats.suspended}</p>
              </div>
              <XCircle className="h-8 w-8 text-red-400" />
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
                <p className="text-sm text-slate-400">Individual</p>
                <p className="text-2xl font-bold text-blue-400">{stats.individual}</p>
              </div>
              <User className="h-8 w-8 text-blue-400" />
            </div>
          </div>
          <div className="bg-slate-800/40 backdrop-blur-xl p-4 rounded-xl border border-yellow-400/30">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-400">Corporate</p>
                <p className="text-2xl font-bold text-purple-400">{stats.corporate}</p>
              </div>
              <Building className="h-8 w-8 text-purple-400" />
            </div>
          </div>
          <div className="bg-slate-800/40 backdrop-blur-xl p-4 rounded-xl border border-yellow-400/30">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-400">Enterprise</p>
                <p className="text-2xl font-bold text-orange-400">{stats.enterprise}</p>
              </div>
              <Briefcase className="h-8 w-8 text-orange-400" />
            </div>
          </div>
          <div className="bg-slate-800/40 backdrop-blur-xl p-4 rounded-xl border border-yellow-400/30">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-400">Premium</p>
                <p className="text-2xl font-bold text-yellow-400">{stats.premium}</p>
              </div>
              <Crown className="h-8 w-8 text-yellow-400" />
            </div>
          </div>
          <div className="bg-slate-800/40 backdrop-blur-xl p-4 rounded-xl border border-yellow-400/30">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-400">Platinum</p>
                <p className="text-2xl font-bold text-purple-400">{stats.platinum}</p>
              </div>
              <Crown className="h-8 w-8 text-purple-400" />
            </div>
          </div>
          <div className="bg-slate-800/40 backdrop-blur-xl p-4 rounded-xl border border-yellow-400/30">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-400">Gold</p>
                <p className="text-2xl font-bold text-yellow-400">{stats.gold}</p>
              </div>
              <Star className="h-8 w-8 text-yellow-400" />
            </div>
          </div>
          <div className="bg-slate-800/40 backdrop-blur-xl p-4 rounded-xl border border-yellow-400/30">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-400">Silver</p>
                <p className="text-2xl font-bold text-gray-400">{stats.silver}</p>
              </div>
              <Award className="h-8 w-8 text-gray-400" />
            </div>
          </div>
          <div className="bg-slate-800/40 backdrop-blur-xl p-4 rounded-xl border border-yellow-400/30">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-400">Basic</p>
                <p className="text-2xl font-bold text-green-400">{stats.basic}</p>
              </div>
              <Target className="h-8 w-8 text-green-400" />
            </div>
          </div>
          <div className="bg-slate-800/40 backdrop-blur-xl p-4 rounded-xl border border-yellow-400/30">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-400">KYC Verified</p>
                <p className="text-2xl font-bold text-green-400">{stats.kycVerified}</p>
              </div>
              <Shield className="h-8 w-8 text-green-400" />
            </div>
          </div>
          <div className="bg-slate-800/40 backdrop-blur-xl p-4 rounded-xl border border-yellow-400/30">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-400">KYC Pending</p>
                <p className="text-2xl font-bold text-yellow-400">{stats.kycPending}</p>
              </div>
              <Clock className="h-8 w-8 text-yellow-400" />
            </div>
          </div>
          <div className="bg-slate-800/40 backdrop-blur-xl p-4 rounded-xl border border-yellow-400/30">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-400">KYC Expired</p>
                <p className="text-2xl font-bold text-red-400">{stats.kycExpired}</p>
              </div>
              <AlertTriangle className="h-8 w-8 text-red-400" />
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
          <div className="grid grid-cols-1 md:grid-cols-7 gap-4 items-center">
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
              value={filterMembership}
              onChange={(e) => setFilterMembership(e.target.value)}
              className="px-3 py-2 bg-slate-700/50 border border-yellow-400/30 rounded-lg text-slate-50 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 backdrop-blur-sm"
            >
              <option value="all">All Membership</option>
              <option value="Individual">Individual</option>
              <option value="Corporate">Corporate</option>
              <option value="Enterprise">Enterprise</option>
              <option value="Premium">Premium</option>
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
              value={filterKYC}
              onChange={(e) => setFilterKYC(e.target.value)}
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
          <SubscriberTable subscribers={filteredSubscribers} />
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