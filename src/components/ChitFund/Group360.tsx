import React, { useState } from 'react';
import {
  ArrowLeft,
  Edit,
  Users,
  Calendar,
  DollarSign,
  CreditCard,
  Gavel,
  Receipt,
  FileText,
  Clock,
  Award,
  Target,
  TrendingUp,
  CheckCircle,
  AlertTriangle,
  Download,
  Upload,
  Star,
  Activity,
  Building,
  Phone,
  Mail,
  MapPin
} from 'lucide-react';
import { ChitGroup, ChitMember, ChitAuction } from '../../types/chit';

interface Group360Props {
  groupId: string;
  onBack: () => void;
}

const sampleGroup: ChitGroup = {
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
};

const sampleMembers: ChitMember[] = [
  {
    id: '1',
    groupId: '1',
    memberId: 'member_001',
    memberNumber: 1,
    joiningDate: '2024-01-01',
    status: 'active',
    guarantor: 'Self',
    documents: [],
    totalPaid: 150000,
    totalDue: 850000,
    prizeReceived: false
  },
  {
    id: '2',
    groupId: '1',
    memberId: 'member_002',
    memberNumber: 2,
    joiningDate: '2024-01-01',
    status: 'active',
    guarantor: 'Rajesh Kumar',
    documents: [],
    totalPaid: 150000,
    totalDue: 850000,
    prizeReceived: false
  }
];

const sampleAuctions: ChitAuction[] = [
  {
    id: '1',
    groupId: '1',
    month: 1,
    auctionDate: '2024-01-15',
    winnerId: 'member_001',
    discountAmount: 8000,
    prizeAmount: 42000,
    status: 'completed',
    bids: [],
    conductedBy: 'Karthik Nair',
    witnessedBy: ['Priya Sharma', 'Rajesh Kumar'],
    createdAt: '2024-01-15'
  },
  {
    id: '2',
    groupId: '1',
    month: 2,
    auctionDate: '2024-02-15',
    winnerId: 'member_002',
    discountAmount: 6000,
    prizeAmount: 44000,
    status: 'completed',
    bids: [],
    conductedBy: 'Karthik Nair',
    witnessedBy: ['Priya Sharma', 'Vikram Singh'],
    createdAt: '2024-02-15'
  }
];

export const Group360: React.FC<Group360Props> = ({ groupId, onBack }) => {
  const [group] = useState<ChitGroup>(sampleGroup);
  const [members] = useState<ChitMember[]>(sampleMembers);
  const [auctions] = useState<ChitAuction[]>(sampleAuctions);
  const [activeTab, setActiveTab] = useState('overview');

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

  const tabs = [
    { id: 'overview', name: 'Overview', icon: CreditCard },
    { id: 'members', name: 'Members', icon: Users },
    { id: 'auctions', name: 'Auctions', icon: Gavel },
    { id: 'payments', name: 'Payments', icon: Receipt },
    { id: 'documents', name: 'Documents', icon: FileText }
  ];

  const renderTabContent = () => {
    switch (activeTab) {
      case 'overview':
        return (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Group Information */}
            <div className="bg-slate-800/40 backdrop-blur-xl rounded-2xl p-6 border border-yellow-400/30">
              <h3 className="text-lg font-semibold text-slate-50 mb-4 flex items-center">
                <CreditCard className="h-5 w-5 mr-2" />
                Group Information
              </h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-slate-400">Group Code</span>
                  <span className="text-slate-50 font-medium">{group.code}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Duration</span>
                  <span className="text-slate-50">{group.duration} months</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Start Date</span>
                  <span className="text-slate-50">{new Date(group.startDate).toLocaleDateString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">End Date</span>
                  <span className="text-slate-50">{new Date(group.endDate).toLocaleDateString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Commission</span>
                  <span className="text-purple-400">{group.commissionPercentage}%</span>
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
                  <span className="text-slate-400">Total Amount</span>
                  <span className="text-green-400 font-semibold">{formatCurrency(group.totalAmount)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Monthly Installment</span>
                  <span className="text-blue-400 font-semibold">{formatCurrency(group.installmentAmount)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Total Collected</span>
                  <span className="text-purple-400 font-semibold">{formatCurrency(members.reduce((sum, m) => sum + m.totalPaid, 0))}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Pending Amount</span>
                  <span className="text-red-400 font-semibold">{formatCurrency(members.reduce((sum, m) => sum + m.totalDue, 0))}</span>
                </div>
              </div>
            </div>

            {/* Member Statistics */}
            <div className="bg-slate-800/40 backdrop-blur-xl rounded-2xl p-6 border border-yellow-400/30">
              <h3 className="text-lg font-semibold text-slate-50 mb-4 flex items-center">
                <Users className="h-5 w-5 mr-2" />
                Member Statistics
              </h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-slate-400">Total Members</span>
                  <span className="text-slate-50 font-medium">{members.length}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Active Members</span>
                  <span className="text-green-400 font-medium">{members.filter(m => m.status === 'active').length}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Prize Winners</span>
                  <span className="text-purple-400 font-medium">{members.filter(m => m.prizeReceived).length}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Defaulters</span>
                  <span className="text-red-400 font-medium">{members.filter(m => m.status === 'defaulter').length}</span>
                </div>
              </div>
            </div>
          </div>
        );

      case 'members':
        return (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="bg-slate-800/40 backdrop-blur-xl p-4 rounded-xl border border-yellow-400/30">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-slate-400">Total Members</p>
                    <p className="text-2xl font-bold text-slate-50">{members.length}</p>
                  </div>
                  <Users className="h-8 w-8 text-blue-400" />
                </div>
              </div>
              <div className="bg-slate-800/40 backdrop-blur-xl p-4 rounded-xl border border-yellow-400/30">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-slate-400">Active</p>
                    <p className="text-2xl font-bold text-green-400">{members.filter(m => m.status === 'active').length}</p>
                  </div>
                  <CheckCircle className="h-8 w-8 text-green-400" />
                </div>
              </div>
              <div className="bg-slate-800/40 backdrop-blur-xl p-4 rounded-xl border border-yellow-400/30">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-slate-400">Prize Winners</p>
                    <p className="text-2xl font-bold text-purple-400">{members.filter(m => m.prizeReceived).length}</p>
                  </div>
                  <Award className="h-8 w-8 text-purple-400" />
                </div>
              </div>
              <div className="bg-slate-800/40 backdrop-blur-xl p-4 rounded-xl border border-yellow-400/30">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-slate-400">Defaulters</p>
                    <p className="text-2xl font-bold text-red-400">{members.filter(m => m.status === 'defaulter').length}</p>
                  </div>
                  <AlertTriangle className="h-8 w-8 text-red-400" />
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
              {members.map((member) => (
                <div key={member.id} className="bg-slate-800/40 backdrop-blur-xl rounded-2xl p-6 border border-yellow-400/30">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h4 className="text-lg font-semibold text-slate-50">Member #{member.memberNumber}</h4>
                      <p className="text-sm text-slate-400">ID: {member.memberId}</p>
                    </div>
                    <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium border ${
                      member.status === 'active' ? 'bg-green-100 text-green-800 border-green-200' :
                      member.status === 'defaulter' ? 'bg-red-100 text-red-800 border-red-200' :
                      'bg-gray-100 text-gray-800 border-gray-200'
                    }`}>
                      {member.status.toUpperCase()}
                    </span>
                  </div>

                  <div className="space-y-2 mb-4">
                    <div className="flex justify-between text-sm">
                      <span className="text-slate-400">Total Paid</span>
                      <span className="text-green-400 font-medium">{formatCurrency(member.totalPaid)}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-slate-400">Total Due</span>
                      <span className="text-red-400 font-medium">{formatCurrency(member.totalDue)}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-slate-400">Guarantor</span>
                      <span className="text-slate-50">{member.guarantor}</span>
                    </div>
                  </div>

                  {member.prizeReceived && (
                    <div className="mb-4 p-3 bg-green-500/10 border border-green-500/30 rounded-lg">
                      <p className="text-green-400 text-sm font-medium">Prize Received!</p>
                      <p className="text-green-300 text-sm">₹{member.prizeAmount?.toLocaleString()} in month {member.prizeMonth}</p>
                    </div>
                  )}

                  <div className="flex justify-between items-center pt-4 border-t border-yellow-400/20">
                    <div className="text-xs text-slate-500">
                      Joined {new Date(member.joiningDate).toLocaleDateString()}
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

      case 'auctions':
        return (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="bg-slate-800/40 backdrop-blur-xl p-4 rounded-xl border border-yellow-400/30">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-slate-400">Total Auctions</p>
                    <p className="text-2xl font-bold text-slate-50">{auctions.length}</p>
                  </div>
                  <Gavel className="h-8 w-8 text-purple-400" />
                </div>
              </div>
              <div className="bg-slate-800/40 backdrop-blur-xl p-4 rounded-xl border border-yellow-400/30">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-slate-400">Completed</p>
                    <p className="text-2xl font-bold text-green-400">{auctions.filter(a => a.status === 'completed').length}</p>
                  </div>
                  <CheckCircle className="h-8 w-8 text-green-400" />
                </div>
              </div>
              <div className="bg-slate-800/40 backdrop-blur-xl p-4 rounded-xl border border-yellow-400/30">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-slate-400">Scheduled</p>
                    <p className="text-2xl font-bold text-blue-400">{auctions.filter(a => a.status === 'scheduled').length}</p>
                  </div>
                  <Clock className="h-8 w-8 text-blue-400" />
                </div>
              </div>
              <div className="bg-slate-800/40 backdrop-blur-xl p-4 rounded-xl border border-yellow-400/30">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-slate-400">Total Prizes</p>
                    <p className="text-2xl font-bold text-yellow-400">{formatCurrency(auctions.reduce((sum, a) => sum + a.prizeAmount, 0))}</p>
                  </div>
                  <Award className="h-8 w-8 text-yellow-400" />
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {auctions.map((auction) => (
                <div key={auction.id} className="bg-slate-800/40 backdrop-blur-xl rounded-2xl p-6 border border-yellow-400/30">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h4 className="text-lg font-semibold text-slate-50">Month {auction.month} Auction</h4>
                      <p className="text-sm text-slate-400">{new Date(auction.auctionDate).toLocaleDateString()}</p>
                    </div>
                    <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium border ${
                      auction.status === 'completed' ? 'bg-green-100 text-green-800 border-green-200' :
                      auction.status === 'scheduled' ? 'bg-blue-100 text-blue-800 border-blue-200' :
                      'bg-yellow-100 text-yellow-800 border-yellow-200'
                    }`}>
                      {auction.status.toUpperCase()}
                    </span>
                  </div>

                  <div className="space-y-2 mb-4">
                    <div className="flex justify-between text-sm">
                      <span className="text-slate-400">Winner</span>
                      <span className="text-slate-50 font-medium">{auction.winnerId}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-slate-400">Discount Amount</span>
                      <span className="text-blue-400 font-medium">{formatCurrency(auction.discountAmount)}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-slate-400">Prize Amount</span>
                      <span className="text-green-400 font-medium">{formatCurrency(auction.prizeAmount)}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-slate-400">Conducted By</span>
                      <span className="text-slate-300">{auction.conductedBy}</span>
                    </div>
                  </div>

                  <div className="flex justify-end space-x-2 pt-4 border-t border-yellow-400/20">
                    <button className="p-2 text-slate-400 hover:text-blue-400 hover:bg-blue-500/10 rounded-lg transition-all">
                      <Eye className="h-4 w-4" />
                    </button>
                    <button className="p-2 text-slate-400 hover:text-green-400 hover:bg-green-500/10 rounded-lg transition-all">
                      <Download className="h-4 w-4" />
                    </button>
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
              {group.name.split(' ').map(n => n[0]).join('')}
            </div>
            <div>
              <h1 className="text-2xl font-bold text-slate-50">{group.name}</h1>
              <p className="text-slate-400">{group.code} • {group.duration} months</p>
              <div className="flex items-center space-x-3 mt-1">
                <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium border ${
                  group.status === 'active' ? 'bg-green-100 text-green-800 border-green-200' :
                  group.status === 'completed' ? 'bg-blue-100 text-blue-800 border-blue-200' :
                  'bg-yellow-100 text-yellow-800 border-yellow-200'
                }`}>
                  {group.status.toUpperCase()}
                </span>
                <span className="text-slate-400 text-sm">
                  Progress: {Math.round(calculateProgress())}%
                </span>
              </div>
            </div>
          </div>
        </div>
        <div className="flex space-x-3">
          <button className="inline-flex items-center px-4 py-2 border border-yellow-400/30 text-sm font-medium rounded-lg text-slate-50 bg-slate-700/50 hover:bg-slate-700 transition-all backdrop-blur-sm">
            <Download className="h-4 w-4 mr-2" />
            Export Data
          </button>
          <button className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-lg shadow-sm text-white bg-blue-600 hover:bg-blue-700 transition-all">
            <Edit className="h-4 w-4 mr-2" />
            Edit Group
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