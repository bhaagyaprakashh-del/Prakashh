import React, { useState } from 'react';
import {
  ArrowLeft,
  Edit,
  Users,
  Calendar,
  DollarSign,
  Gavel,
  CheckCircle,
  Clock,
  AlertTriangle,
  User,
  Building,
  Target,
  Award,
  Star,
  TrendingUp,
  Activity,
  Eye,
  Send,
  Download,
  Upload,
  Plus,
  Phone,
  Mail,
  MapPin,
  CreditCard,
  FileText,
  Settings,
  Play,
  Pause,
  RotateCcw
} from 'lucide-react';
import { ChitGroup, ChitMember, ChitAuction, ChitInstallment } from '../../types/chit';

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
    },
    {
      id: 'mem3',
      groupId: '1',
      memberId: 'SUB003',
      memberNumber: 3,
      joiningDate: '2024-01-01',
      status: 'defaulter',
      documents: [],
      totalPaid: 100000,
      totalDue: 900000,
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
      bids: [
        {
          id: 'bid1',
          auctionId: 'auc1',
          memberId: 'SUB001',
          bidAmount: 5000,
          timestamp: '2024-03-15T10:30:00',
          isWinning: true
        },
        {
          id: 'bid2',
          auctionId: 'auc1',
          memberId: 'SUB002',
          bidAmount: 3000,
          timestamp: '2024-03-15T10:25:00',
          isWinning: false
        }
      ],
      conductedBy: 'Karthik Nair',
      witnessedBy: ['Rajesh Kumar', 'Branch Manager'],
      createdAt: '2024-03-15'
    }
  ],
  installments: [
    {
      id: 'inst1',
      groupId: '1',
      memberId: 'SUB001',
      month: 1,
      dueAmount: 50000,
      paidAmount: 50000,
      dueDate: '2024-01-31',
      paidDate: '2024-01-28',
      status: 'paid',
      paymentMethod: 'upi',
      receiptNumber: 'RCP001',
      collectedBy: 'Karthik Nair'
    },
    {
      id: 'inst2',
      groupId: '1',
      memberId: 'SUB002',
      month: 1,
      dueAmount: 50000,
      paidAmount: 50000,
      dueDate: '2024-01-31',
      paidDate: '2024-01-30',
      status: 'paid',
      paymentMethod: 'bank',
      receiptNumber: 'RCP002',
      collectedBy: 'Karthik Nair'
    }
  ],
  commissionPercentage: 5,
  createdAt: '2024-01-01',
  updatedAt: '2024-03-15'
};

const subscribers = [
  { id: 'SUB001', name: 'Anita Desai', email: 'anita@example.com', phone: '+91 98765 43219' },
  { id: 'SUB002', name: 'Deepika Rao', email: 'deepika@example.com', phone: '+91 98765 43223' },
  { id: 'SUB003', name: 'Ravi Patel', email: 'ravi@example.com', phone: '+91 98765 43225' },
  { id: 'SUB004', name: 'Meera Nair', email: 'meera@example.com', phone: '+91 98765 43227' },
  { id: 'SUB005', name: 'Arjun Singh', email: 'arjun@example.com', phone: '+91 98765 43229' }
];

const MemberCard: React.FC<{ member: ChitMember; subscriber: any }> = React.memo(({ member, subscriber }) => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800 border-green-200';
      case 'inactive': return 'bg-gray-100 text-gray-800 border-gray-200';
      case 'defaulter': return 'bg-red-100 text-red-800 border-red-200';
      case 'withdrawn': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
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

  const paymentProgress = member.totalPaid / (member.totalPaid + member.totalDue) * 100;

  return (
    <div className="bg-slate-800/40 backdrop-blur-xl rounded-2xl p-6 border border-yellow-400/30 hover:border-yellow-400/50 transition-all">
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center space-x-3">
          <div className="h-12 w-12 bg-slate-600/50 rounded-full flex items-center justify-center text-slate-50 font-bold text-lg border border-yellow-400/30">
            {member.memberNumber}
          </div>
          <div>
            <h3 className="text-lg font-semibold text-slate-50">{subscriber?.name || 'Unknown'}</h3>
            <p className="text-sm text-slate-400">Member #{member.memberNumber}</p>
            <p className="text-xs text-slate-500">{member.memberId}</p>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium border ${getStatusColor(member.status)}`}>
            {member.status.toUpperCase()}
          </span>
          {member.prizeReceived && (
            <Award className="h-5 w-5 text-yellow-400" title="Prize Winner" />
          )}
        </div>
      </div>

      <div className="space-y-2 mb-4">
        <div className="flex items-center text-sm text-slate-300">
          <Mail className="h-4 w-4 mr-2 text-slate-500" />
          <span>{subscriber?.email || 'N/A'}</span>
        </div>
        <div className="flex items-center text-sm text-slate-300">
          <Phone className="h-4 w-4 mr-2 text-slate-500" />
          <span>{subscriber?.phone || 'N/A'}</span>
        </div>
        <div className="flex items-center text-sm text-slate-300">
          <Calendar className="h-4 w-4 mr-2 text-slate-500" />
          <span>Joined: {new Date(member.joiningDate).toLocaleDateString()}</span>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 mb-4">
        <div>
          <p className="text-xs text-slate-500">Total Paid</p>
          <p className="text-lg font-semibold text-green-400">{formatCurrency(member.totalPaid)}</p>
        </div>
        <div>
          <p className="text-xs text-slate-500">Total Due</p>
          <p className="text-lg font-semibold text-red-400">{formatCurrency(member.totalDue)}</p>
        </div>
      </div>

      {/* Payment Progress */}
      <div className="mb-4">
        <div className="flex justify-between text-sm text-slate-400 mb-1">
          <span>Payment Progress</span>
          <span>{Math.round(paymentProgress)}%</span>
        </div>
        <div className="w-full bg-slate-700/50 rounded-full h-2 border border-yellow-400/20">
          <div
            className="bg-gradient-to-r from-green-500 to-blue-500 h-2 rounded-full transition-all duration-300"
            style={{ width: `${paymentProgress}%` }}
          ></div>
        </div>
      </div>

      {member.prizeReceived && (
        <div className="mb-4 p-3 bg-yellow-500/10 border border-yellow-500/30 rounded-lg">
          <div className="flex items-center justify-between">
            <span className="text-yellow-400 text-sm font-medium">Prize Winner</span>
            <span className="text-yellow-300 font-semibold">
              {formatCurrency(member.prizeAmount || 0)} (Month {member.prizeMonth})
            </span>
          </div>
        </div>
      )}

      <div className="flex justify-between items-center pt-4 border-t border-yellow-400/20">
        <div className="flex items-center text-xs text-slate-500">
          <Activity className="h-3 w-3 mr-1" />
          <span>Status: {member.status}</span>
        </div>
        <div className="flex space-x-2">
          <button className="p-2 text-slate-400 hover:text-blue-400 hover:bg-blue-500/10 rounded-lg transition-all">
            <Eye className="h-4 w-4" />
          </button>
          <button className="p-2 text-slate-400 hover:text-green-400 hover:bg-green-500/10 rounded-lg transition-all">
            <Phone className="h-4 w-4" />
          </button>
          <button className="p-2 text-slate-400 hover:text-purple-400 hover:bg-purple-500/10 rounded-lg transition-all">
            <Mail className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );
});

const VacantTicketCard: React.FC<{ ticketNumber: number; onAllocate: () => void }> = ({ ticketNumber, onAllocate }) => {
  return (
    <div className="bg-slate-800/40 backdrop-blur-xl rounded-2xl p-6 border-2 border-dashed border-yellow-400/30 hover:border-yellow-400/50 transition-all">
      <div className="text-center">
        <div className="h-12 w-12 bg-slate-600/50 rounded-full flex items-center justify-center text-slate-50 font-bold text-lg border border-yellow-400/30 mx-auto mb-3">
          {ticketNumber}
        </div>
        <h3 className="text-lg font-semibold text-slate-50 mb-2">Vacant Ticket</h3>
        <p className="text-sm text-slate-400 mb-4">Ticket #{ticketNumber} is available for allocation</p>
        <button
          onClick={onAllocate}
          className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          <Plus className="h-4 w-4 mr-2" />
          Allocate Member
        </button>
      </div>
    </div>
  );
};

const AuctionCard: React.FC<{ auction: ChitAuction }> = React.memo(({ auction }) => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'bg-green-100 text-green-800 border-green-200';
      case 'live': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'scheduled': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'cancelled': return 'bg-red-100 text-red-800 border-red-200';
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

  const winner = subscribers.find(s => s.id === auction.winnerId);

  return (
    <div className="bg-slate-800/40 backdrop-blur-xl rounded-2xl p-6 border border-yellow-400/30">
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center space-x-3">
          <div className="p-3 bg-purple-500/20 rounded-xl border border-yellow-400/30">
            <Gavel className="h-6 w-6 text-purple-400" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-slate-50">Month {auction.month} Auction</h3>
            <p className="text-sm text-slate-400">{new Date(auction.auctionDate).toLocaleDateString()}</p>
          </div>
        </div>
        <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium border ${getStatusColor(auction.status)}`}>
          {auction.status.toUpperCase()}
        </span>
      </div>

      <div className="space-y-3 mb-4">
        <div className="flex items-center justify-between text-sm">
          <span className="text-slate-400">Winner</span>
          <span className="text-slate-50 font-medium">{winner?.name || 'Unknown'}</span>
        </div>
        <div className="flex items-center justify-between text-sm">
          <span className="text-slate-400">Discount Amount</span>
          <span className="text-yellow-400 font-medium">{formatCurrency(auction.discountAmount)}</span>
        </div>
        <div className="flex items-center justify-between text-sm">
          <span className="text-slate-400">Prize Amount</span>
          <span className="text-green-400 font-medium">{formatCurrency(auction.prizeAmount)}</span>
        </div>
        <div className="flex items-center justify-between text-sm">
          <span className="text-slate-400">Total Bids</span>
          <span className="text-slate-50">{auction.bids.length}</span>
        </div>
      </div>

      <div className="flex justify-between items-center pt-4 border-t border-yellow-400/20">
        <div className="flex items-center text-xs text-slate-500">
          <User className="h-3 w-3 mr-1" />
          <span>Conducted by {auction.conductedBy}</span>
        </div>
        <div className="flex space-x-2">
          <button className="p-2 text-slate-400 hover:text-blue-400 hover:bg-blue-500/10 rounded-lg transition-all">
            <Eye className="h-4 w-4" />
          </button>
          <button className="p-2 text-slate-400 hover:text-green-400 hover:bg-green-500/10 rounded-lg transition-all">
            <Download className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );
});

export const Group360: React.FC<Group360Props> = ({ groupId, onBack }) => {
  const [group] = useState<ChitGroup>(sampleGroup);
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
    return Math.round((elapsed / totalDuration) * 100);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800 border-green-200';
      case 'pending': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'completed': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'suspended': return 'bg-red-100 text-red-800 border-red-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const progress = calculateProgress();
  const totalMembers = group.members.length;
  const activeMembers = group.members.filter(m => m.status === 'active').length;
  const defaulters = group.members.filter(m => m.status === 'defaulter').length;
  const totalCollected = group.members.reduce((sum, m) => sum + m.totalPaid, 0);
  const pendingCollection = group.members.reduce((sum, m) => sum + m.totalDue, 0);
  const vacantTickets = 20 - totalMembers; // Assuming 20 total tickets for this group

  const tabs = [
    { id: 'overview', name: 'Overview', icon: Eye },
    { id: 'members', name: 'Members & Tickets', icon: Users },
    { id: 'auctions', name: 'Auctions', icon: Gavel },
    { id: 'payments', name: 'Payments', icon: DollarSign },
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
                  <span className="text-slate-400">Total Amount</span>
                  <span className="text-slate-50">{formatCurrency(group.totalAmount)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Monthly Installment</span>
                  <span className="text-slate-50">{formatCurrency(group.installmentAmount)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Duration</span>
                  <span className="text-slate-50">{group.duration} months</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Commission</span>
                  <span className="text-slate-50">{group.commissionPercentage}%</span>
                </div>
              </div>
            </div>

            {/* Branch & Agent */}
            <div className="bg-slate-800/40 backdrop-blur-xl rounded-2xl p-6 border border-yellow-400/30">
              <h3 className="text-lg font-semibold text-slate-50 mb-4 flex items-center">
                <Building className="h-5 w-5 mr-2" />
                Branch & Agent
              </h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-slate-400">Branch</span>
                  <span className="text-slate-50 font-medium">{group.branchId}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Assigned Agent</span>
                  <span className="text-slate-50">{group.agentId}</span>
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
                  <span className="text-slate-400">Created</span>
                  <span className="text-slate-50">{new Date(group.createdAt).toLocaleDateString()}</span>
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
                  <span className="text-slate-400">Total Collected</span>
                  <span className="text-green-400 font-semibold">{formatCurrency(totalCollected)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Pending Collection</span>
                  <span className="text-red-400 font-semibold">{formatCurrency(pendingCollection)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Commission Earned</span>
                  <span className="text-purple-400 font-semibold">{formatCurrency(totalCollected * group.commissionPercentage / 100)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Collection Rate</span>
                  <span className="text-blue-400 font-semibold">{Math.round((totalCollected / group.totalAmount) * 100)}%</span>
                </div>
              </div>
            </div>

            {/* Member Statistics */}
            <div className="bg-slate-800/40 backdrop-blur-xl rounded-2xl p-6 border border-yellow-400/30">
              <h3 className="text-lg font-semibold text-slate-50 mb-4 flex items-center">
                <Users className="h-5 w-5 mr-2" />
                Member Statistics
              </h3>
              <div className="grid grid-cols-2 gap-4">
                <div className="text-center p-3 bg-blue-500/10 rounded-lg border border-blue-500/30">
                  <p className="text-2xl font-bold text-blue-400">{totalMembers}</p>
                  <p className="text-xs text-blue-300">Total Members</p>
                </div>
                <div className="text-center p-3 bg-green-500/10 rounded-lg border border-green-500/30">
                  <p className="text-2xl font-bold text-green-400">{activeMembers}</p>
                  <p className="text-xs text-green-300">Active</p>
                </div>
                <div className="text-center p-3 bg-red-500/10 rounded-lg border border-red-500/30">
                  <p className="text-2xl font-bold text-red-400">{defaulters}</p>
                  <p className="text-xs text-red-300">Defaulters</p>
                </div>
                <div className="text-center p-3 bg-yellow-500/10 rounded-lg border border-yellow-500/30">
                  <p className="text-2xl font-bold text-yellow-400">{vacantTickets}</p>
                  <p className="text-xs text-yellow-300">Vacant</p>
                </div>
              </div>
            </div>

            {/* Group Progress */}
            <div className="bg-slate-800/40 backdrop-blur-xl rounded-2xl p-6 border border-yellow-400/30 lg:col-span-2">
              <h3 className="text-lg font-semibold text-slate-50 mb-4 flex items-center">
                <TrendingUp className="h-5 w-5 mr-2" />
                Group Progress Timeline
              </h3>
              <div className="mb-4">
                <div className="flex justify-between text-sm text-slate-400 mb-2">
                  <span>Overall Progress</span>
                  <span>{progress}% Complete</span>
                </div>
                <div className="w-full bg-slate-700/50 rounded-full h-3 border border-yellow-400/20">
                  <div
                    className="bg-gradient-to-r from-blue-500 to-green-500 h-3 rounded-full transition-all duration-300"
                    style={{ width: `${progress}%` }}
                  ></div>
                </div>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
                <div>
                  <p className="text-slate-400 text-sm">Start Date</p>
                  <p className="text-slate-50 font-medium">{new Date(group.startDate).toLocaleDateString()}</p>
                </div>
                <div>
                  <p className="text-slate-400 text-sm">End Date</p>
                  <p className="text-slate-50 font-medium">{new Date(group.endDate).toLocaleDateString()}</p>
                </div>
                <div>
                  <p className="text-slate-400 text-sm">Auctions Held</p>
                  <p className="text-purple-400 font-medium">{group.auctions.length}</p>
                </div>
                <div>
                  <p className="text-slate-400 text-sm">Remaining Months</p>
                  <p className="text-orange-400 font-medium">{Math.max(0, group.duration - Math.ceil(progress * group.duration / 100))}</p>
                </div>
              </div>
            </div>
          </div>
        );

      case 'members':
        return (
          <div className="space-y-6">
            {/* Member Stats */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="bg-slate-800/40 backdrop-blur-xl p-4 rounded-xl border border-yellow-400/30">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-slate-400">Allocated Tickets</p>
                    <p className="text-2xl font-bold text-blue-400">{totalMembers}</p>
                  </div>
                  <Users className="h-8 w-8 text-blue-400" />
                </div>
              </div>
              <div className="bg-slate-800/40 backdrop-blur-xl p-4 rounded-xl border border-yellow-400/30">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-slate-400">Vacant Tickets</p>
                    <p className="text-2xl font-bold text-yellow-400">{vacantTickets}</p>
                  </div>
                  <Target className="h-8 w-8 text-yellow-400" />
                </div>
              </div>
              <div className="bg-slate-800/40 backdrop-blur-xl p-4 rounded-xl border border-yellow-400/30">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-slate-400">Active Members</p>
                    <p className="text-2xl font-bold text-green-400">{activeMembers}</p>
                  </div>
                  <CheckCircle className="h-8 w-8 text-green-400" />
                </div>
              </div>
              <div className="bg-slate-800/40 backdrop-blur-xl p-4 rounded-xl border border-yellow-400/30">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-slate-400">Defaulters</p>
                    <p className="text-2xl font-bold text-red-400">{defaulters}</p>
                  </div>
                  <AlertTriangle className="h-8 w-8 text-red-400" />
                </div>
              </div>
            </div>

            {/* Allocated Members */}
            <div>
              <h3 className="text-lg font-semibold text-slate-50 mb-4">Allocated Members ({totalMembers})</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                {group.members.map((member) => {
                  const subscriber = subscribers.find(s => s.id === member.memberId);
                  return (
                    <MemberCard key={member.id} member={member} subscriber={subscriber} />
                  );
                })}
              </div>
            </div>

            {/* Vacant Tickets */}
            {vacantTickets > 0 && (
              <div>
                <h3 className="text-lg font-semibold text-slate-50 mb-4">Vacant Tickets ({vacantTickets})</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
                  {[...Array(Math.min(vacantTickets, 8))].map((_, index) => (
                    <VacantTicketCard
                      key={index}
                      ticketNumber={totalMembers + index + 1}
                      onAllocate={() => console.log(`Allocate ticket ${totalMembers + index + 1}`)}
                    />
                  ))}
                  {vacantTickets > 8 && (
                    <div className="bg-slate-800/40 backdrop-blur-xl rounded-2xl p-6 border border-yellow-400/30 flex items-center justify-center">
                      <div className="text-center">
                        <p className="text-2xl font-bold text-slate-50">+{vacantTickets - 8}</p>
                        <p className="text-sm text-slate-400">More vacant tickets</p>
                        <button className="mt-2 text-blue-400 hover:text-blue-300 text-sm">
                          View All
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        );

      case 'auctions':
        return (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-semibold text-slate-50">Auction History</h3>
              <button className="inline-flex items-center px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors">
                <Gavel className="h-4 w-4 mr-2" />
                Conduct Auction
              </button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
              {group.auctions.map((auction) => (
                <AuctionCard key={auction.id} auction={auction} />
              ))}
              {group.auctions.length === 0 && (
                <div className="col-span-full text-center py-12">
                  <Gavel className="h-12 w-12 mx-auto text-slate-500 mb-4" />
                  <h3 className="text-lg font-medium text-slate-50 mb-2">No auctions conducted yet</h3>
                  <p className="text-sm text-slate-400">Start the first auction for this group.</p>
                </div>
              )}
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
            <div className="p-3 bg-blue-500/20 rounded-xl border border-yellow-400/30">
              <CreditCard className="h-8 w-8 text-blue-400" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-slate-50">{group.name}</h1>
              <p className="text-slate-400">{group.code} • {group.branchId}</p>
              <div className="flex items-center space-x-3 mt-1">
                <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium border ${getStatusColor(group.status)}`}>
                  {group.status.toUpperCase()}
                </span>
                <span className="text-slate-500 text-sm">
                  {totalMembers} members • {group.duration} months
                </span>
              </div>
            </div>
          </div>
        </div>
        <div className="flex space-x-3">
          <button className="inline-flex items-center px-4 py-2 border border-yellow-400/30 text-sm font-medium rounded-lg text-slate-50 bg-slate-700/50 hover:bg-slate-700 transition-all backdrop-blur-sm">
            <Gavel className="h-4 w-4 mr-2" />
            Conduct Auction
          </button>
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