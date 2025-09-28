import React, { useState } from 'react';
import {
  ArrowLeft,
  Edit,
  Mail,
  Phone,
  MapPin,
  Calendar,
  Building,
  User,
  CreditCard,
  FileText,
  Clock,
  Award,
  Target,
  TrendingUp,
  Users,
  CheckCircle,
  AlertTriangle,
  Download,
  Upload,
  Star,
  DollarSign,
  Shield,
  Activity
} from 'lucide-react';
import { Subscriber, SubscriberActivity, SubscriberScheme } from '../../types/subscribers';

interface Subscriber360Props {
  subscriberId: string;
  onBack: () => void;
}

const sampleSubscriber: Subscriber = {
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
};

const sampleActivities: SubscriberActivity[] = [
  {
    id: '1',
    subscriberId: '1',
    type: 'payment',
    title: 'Monthly Payment Received',
    description: 'Payment of ₹5,000 received for Premium Gold Chit',
    amount: 5000,
    schemeId: 'scheme_001',
    schemeName: 'Premium Gold Chit',
    timestamp: '2024-03-14T10:30:00',
    performedBy: 'Anita Desai',
    status: 'success'
  },
  {
    id: '2',
    subscriberId: '1',
    type: 'kyc-update',
    title: 'KYC Documents Updated',
    description: 'Updated address proof document',
    timestamp: '2024-03-10T14:15:00',
    performedBy: 'Priya Sharma',
    status: 'success'
  },
  {
    id: '3',
    subscriberId: '1',
    type: 'scheme-join',
    title: 'Joined New Scheme',
    description: 'Enrolled in Silver Monthly Chit scheme',
    schemeId: 'scheme_002',
    schemeName: 'Silver Monthly Chit',
    timestamp: '2024-03-05T11:20:00',
    performedBy: 'Anita Desai',
    status: 'success'
  }
];

const sampleSchemes: SubscriberScheme[] = [
  {
    id: '1',
    subscriberId: '1',
    schemeId: 'scheme_001',
    schemeName: 'Premium Gold Chit',
    joiningDate: '2022-06-15',
    status: 'active',
    memberNumber: 5,
    totalInstallments: 20,
    paidInstallments: 18,
    pendingInstallments: 2,
    totalPaid: 90000,
    totalDue: 10000,
    prizeReceived: false
  },
  {
    id: '2',
    subscriberId: '1',
    schemeId: 'scheme_002',
    schemeName: 'Silver Monthly Chit',
    joiningDate: '2024-03-05',
    status: 'active',
    memberNumber: 8,
    totalInstallments: 12,
    paidInstallments: 1,
    pendingInstallments: 11,
    totalPaid: 2500,
    totalDue: 27500,
    prizeReceived: false
  },
  {
    id: '3',
    subscriberId: '1',
    schemeId: 'scheme_003',
    schemeName: 'Quick Return Chit',
    joiningDate: '2023-01-10',
    status: 'completed',
    memberNumber: 3,
    totalInstallments: 6,
    paidInstallments: 6,
    pendingInstallments: 0,
    totalPaid: 30000,
    totalDue: 0,
    prizeReceived: true,
    prizeAmount: 25000,
    prizeMonth: 4,
    completionDate: '2023-06-30'
  }
];

export const Subscriber360: React.FC<Subscriber360Props> = ({ subscriberId, onBack }) => {
  const [subscriber] = useState<Subscriber>(sampleSubscriber);
  const [activities] = useState<SubscriberActivity[]>(sampleActivities);
  const [schemes] = useState<SubscriberScheme[]>(sampleSchemes);
  const [activeTab, setActiveTab] = useState('overview');

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
      return `${years} years ${months} months`;
    }
    return `${months} months`;
  };

  const tabs = [
    { id: 'overview', name: 'Overview', icon: User },
    { id: 'schemes', name: 'Chit Schemes', icon: CreditCard },
    { id: 'payments', name: 'Payment History', icon: DollarSign },
    { id: 'activity', name: 'Activity Timeline', icon: Activity },
    { id: 'documents', name: 'Documents', icon: FileText }
  ];

  const renderTabContent = () => {
    switch (activeTab) {
      case 'overview':
        return (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Personal Information */}
            <div className="bg-slate-800/40 backdrop-blur-xl rounded-2xl p-6 border border-yellow-400/30">
              <h3 className="text-lg font-semibold text-slate-50 mb-4 flex items-center">
                <User className="h-5 w-5 mr-2" />
                Personal Information
              </h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-slate-400">Date of Birth</span>
                  <span className="text-slate-50">{new Date(subscriber.dateOfBirth).toLocaleDateString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Gender</span>
                  <span className="text-slate-50 capitalize">{subscriber.gender}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Marital Status</span>
                  <span className="text-slate-50 capitalize">{subscriber.maritalStatus}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Occupation</span>
                  <span className="text-slate-50">{subscriber.occupation}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Annual Income</span>
                  <span className="text-slate-50">{formatCurrency(subscriber.annualIncome)}</span>
                </div>
              </div>
            </div>

            {/* Financial Summary */}
            <div className="bg-slate-800/40 backdrop-blur-xl rounded-2xl p-6 border border-yellow-400/30">
              <h3 className="text-lg font-semibold text-slate-50 mb-4 flex items-center">
                <DollarSign className="h-5 w-5 mr-2" />
                Financial Summary
              </h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-slate-400">Total Investments</span>
                  <span className="text-green-400 font-semibold">{formatCurrency(subscriber.totalInvestments)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Current Balance</span>
                  <span className="text-blue-400 font-semibold">{formatCurrency(subscriber.currentBalance)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Total Returns</span>
                  <span className="text-purple-400 font-semibold">{formatCurrency(subscriber.totalReturns)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Credit Score</span>
                  <span className="text-orange-400 font-semibold">{subscriber.creditScore}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Risk Profile</span>
                  <span className="text-slate-50 capitalize">{subscriber.riskProfile}</span>
                </div>
              </div>
            </div>

            {/* Membership Details */}
            <div className="bg-slate-800/40 backdrop-blur-xl rounded-2xl p-6 border border-yellow-400/30">
              <h3 className="text-lg font-semibold text-slate-50 mb-4 flex items-center">
                <Award className="h-5 w-5 mr-2" />
                Membership Details
              </h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-slate-400">Member Since</span>
                  <span className="text-slate-50">{calculateTenure(subscriber.joiningDate)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Membership Type</span>
                  <span className="text-blue-400">{subscriber.membershipType}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Tier</span>
                  <span className="text-purple-400">{subscriber.membershipTier}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Total Schemes</span>
                  <span className="text-slate-50">{subscriber.totalSchemes}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Active Schemes</span>
                  <span className="text-green-400">{subscriber.activeSchemes.length}</span>
                </div>
              </div>
            </div>
          </div>
        );

      case 'schemes':
        return (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-slate-800/40 backdrop-blur-xl p-4 rounded-xl border border-yellow-400/30">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-slate-400">Active Schemes</p>
                    <p className="text-2xl font-bold text-green-400">{schemes.filter(s => s.status === 'active').length}</p>
                  </div>
                  <CreditCard className="h-8 w-8 text-green-400" />
                </div>
              </div>
              <div className="bg-slate-800/40 backdrop-blur-xl p-4 rounded-xl border border-yellow-400/30">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-slate-400">Completed</p>
                    <p className="text-2xl font-bold text-blue-400">{schemes.filter(s => s.status === 'completed').length}</p>
                  </div>
                  <CheckCircle className="h-8 w-8 text-blue-400" />
                </div>
              </div>
              <div className="bg-slate-800/40 backdrop-blur-xl p-4 rounded-xl border border-yellow-400/30">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-slate-400">Total Paid</p>
                    <p className="text-2xl font-bold text-purple-400">{formatCurrency(schemes.reduce((sum, s) => sum + s.totalPaid, 0))}</p>
                  </div>
                  <DollarSign className="h-8 w-8 text-purple-400" />
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
              {schemes.map((scheme) => (
                <div key={scheme.id} className="bg-slate-800/40 backdrop-blur-xl rounded-2xl p-6 border border-yellow-400/30">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h4 className="text-lg font-semibold text-slate-50">{scheme.schemeName}</h4>
                      <p className="text-sm text-slate-400">Member #{scheme.memberNumber}</p>
                    </div>
                    <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium border ${
                      scheme.status === 'active' ? 'bg-green-100 text-green-800 border-green-200' :
                      scheme.status === 'completed' ? 'bg-blue-100 text-blue-800 border-blue-200' :
                      'bg-gray-100 text-gray-800 border-gray-200'
                    }`}>
                      {scheme.status.toUpperCase()}
                    </span>
                  </div>

                  <div className="space-y-2 mb-4">
                    <div className="flex justify-between text-sm">
                      <span className="text-slate-400">Paid Installments</span>
                      <span className="text-green-400">{scheme.paidInstallments}/{scheme.totalInstallments}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-slate-400">Total Paid</span>
                      <span className="text-slate-50">{formatCurrency(scheme.totalPaid)}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-slate-400">Pending Amount</span>
                      <span className="text-red-400">{formatCurrency(scheme.totalDue)}</span>
                    </div>
                  </div>

                  {scheme.prizeReceived && (
                    <div className="mb-4 p-3 bg-green-500/10 border border-green-500/30 rounded-lg">
                      <p className="text-green-400 text-sm font-medium">Prize Received!</p>
                      <p className="text-green-300 text-sm">₹{scheme.prizeAmount?.toLocaleString()} in month {scheme.prizeMonth}</p>
                    </div>
                  )}

                  <div className="flex justify-between items-center pt-4 border-t border-yellow-400/20">
                    <div className="text-xs text-slate-500">
                      Joined {new Date(scheme.joiningDate).toLocaleDateString()}
                    </div>
                    <button className="p-2 text-slate-400 hover:text-blue-400 hover:bg-blue-500/10 rounded-lg transition-all">
                      <Eye className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );

      case 'activity':
        return (
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-semibold text-slate-50">Activity Timeline</h3>
            </div>
            
            <div className="space-y-4">
              {activities.map((activity) => (
                <div key={activity.id} className="bg-slate-800/40 backdrop-blur-xl rounded-xl p-4 border border-yellow-400/30">
                  <div className="flex items-start space-x-4">
                    <div className={`p-2 rounded-lg border ${
                      activity.type === 'payment' ? 'bg-green-500/20 text-green-400 border-green-500/30' :
                      activity.type === 'kyc-update' ? 'bg-blue-500/20 text-blue-400 border-blue-500/30' :
                      activity.type === 'scheme-join' ? 'bg-purple-500/20 text-purple-400 border-purple-500/30' :
                      'bg-gray-500/20 text-gray-400 border-gray-500/30'
                    }`}>
                      {activity.type === 'payment' && <DollarSign className="h-4 w-4" />}
                      {activity.type === 'kyc-update' && <Shield className="h-4 w-4" />}
                      {activity.type === 'scheme-join' && <CreditCard className="h-4 w-4" />}
                      {!['payment', 'kyc-update', 'scheme-join'].includes(activity.type) && <Activity className="h-4 w-4" />}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="text-slate-50 font-medium">{activity.title}</h4>
                        <span className="text-xs text-slate-400">
                          {new Date(activity.timestamp).toLocaleString()}
                        </span>
                      </div>
                      <p className="text-slate-300 text-sm mb-2">{activity.description}</p>
                      <div className="flex items-center space-x-4 text-xs text-slate-500">
                        <span>By {activity.performedBy}</span>
                        {activity.amount && <span>Amount: {formatCurrency(activity.amount)}</span>}
                        {activity.schemeName && <span>Scheme: {activity.schemeName}</span>}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );

      default:
        return (
          <div className="text-center py-12">
            <div className="bg-slate-700/30 backdrop-blur-sm rounded-full p-4 mb-4 border border-slate-600/50 inline-block">
              <FileText className="h-16 w-16 text-slate-400" />
            </div>
            <h3 className="text-xl font-bold text-slate-50 mb-2">{tabs.find(t => t.id === activeTab)?.name}</h3>
            <p className="text-slate-400">This section is coming soon!</p>
          </div>
        );
    }
  };

  return (
    <div className="h-full flex flex-col bg-slate-900 overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-yellow-400/30 flex-shrink-0">
        <div className="flex items-center space-x-4">
          <button
            onClick={onBack}
            className="p-2 text-slate-400 hover:text-slate-50 hover:bg-slate-700/50 rounded-lg transition-all"
          >
            <ArrowLeft className="h-5 w-5" />
          </button>
          <div className="flex items-center space-x-4">
            <div className="h-16 w-16 bg-slate-600/50 rounded-full flex items-center justify-center text-slate-50 font-bold text-xl border border-yellow-400/30">
              {subscriber.firstName.charAt(0)}{subscriber.lastName.charAt(0)}
            </div>
            <div>
              <h1 className="text-2xl font-bold text-slate-50">{subscriber.firstName} {subscriber.lastName}</h1>
              <p className="text-slate-400">{subscriber.subscriberId} • {subscriber.membershipTier} Member</p>
              <div className="flex items-center space-x-3 mt-1">
                <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium border ${
                  subscriber.status === 'active' ? 'bg-green-100 text-green-800 border-green-200' :
                  'bg-gray-100 text-gray-800 border-gray-200'
                }`}>
                  {subscriber.status.toUpperCase()}
                </span>
                <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium border ${
                  subscriber.kycStatus === 'verified' ? 'bg-green-100 text-green-800 border-green-200' :
                  'bg-yellow-100 text-yellow-800 border-yellow-200'
                }`}>
                  KYC {subscriber.kycStatus.toUpperCase()}
                </span>
              </div>
            </div>
          </div>
        </div>
        <div className="flex space-x-3">
          <button className="inline-flex items-center px-4 py-2 border border-yellow-400/30 text-sm font-medium rounded-lg text-slate-50 bg-slate-700/50 hover:bg-slate-700 transition-all backdrop-blur-sm">
            <Download className="h-4 w-4 mr-2" />
            Export Profile
          </button>
          <button className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-lg shadow-sm text-white bg-blue-600 hover:bg-blue-700 transition-all">
            <Edit className="h-4 w-4 mr-2" />
            Edit Subscriber
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="border-b border-yellow-400/30 bg-slate-800/40 backdrop-blur-xl flex-shrink-0">
        <nav className="flex space-x-4 px-4 overflow-x-auto" aria-label="Tabs">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`${
                  activeTab === tab.id
                    ? 'border-blue-500 text-blue-400'
                    : 'border-transparent text-slate-400 hover:text-slate-300 hover:border-slate-300'
                } whitespace-nowrap py-3 px-2 border-b-2 font-medium text-sm flex items-center transition-all`}
              >
                <Icon className="h-4 w-4 mr-2" />
                {tab.name}
              </button>
            );
          })}
        </nav>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto p-4 scrollbar-none">
        {renderTabContent()}
      </div>
    </div>
  );
};