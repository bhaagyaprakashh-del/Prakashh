import React, { useState, useMemo } from 'react';
import { Plus, Search, CreditCard as Edit, Trash2, Eye, Calendar, Clock, MapPin, Phone, Mail, Users, Car, DollarSign, CheckCircle, XCircle, AlertTriangle, Star, Target, Award, TrendingUp, Activity, Filter, Download, Upload, Settings, MoreVertical, User, Building, Navigation, Smile, Meh, Frown, Battery, ThumbsUp, MessageSquare, FileText, Send } from 'lucide-react';
import { DailyDiary, DiaryActivity } from '../../types/agents';

const sampleDiaries: DailyDiary[] = [
  {
    id: '1',
    agentId: 'AGT001',
    date: '2024-03-15',
    activities: [
      {
        id: 'act_1',
        time: '09:30',
        type: 'customer-visit',
        description: 'Visited Rajesh Gupta at TechCorp office',
        customerId: 'cust_001',
        customerName: 'Rajesh Gupta',
        location: 'TechCorp Office, Koramangala',
        duration: 45,
        outcome: 'successful',
        nextAction: 'Send proposal by Monday',
        notes: 'Very interested in premium schemes, budget confirmed'
      },
      {
        id: 'act_2',
        time: '11:00',
        type: 'phone-call',
        description: 'Follow-up call with Sunita Reddy',
        customerId: 'cust_002',
        customerName: 'Sunita Reddy',
        duration: 20,
        outcome: 'successful',
        nextAction: 'Schedule demo next week',
        notes: 'Ready to proceed with silver scheme'
      },
      {
        id: 'act_3',
        time: '14:30',
        type: 'documentation',
        description: 'Completed KYC verification for 3 new members',
        duration: 90,
        outcome: 'successful',
        notes: 'All documents verified and uploaded to system'
      },
      {
        id: 'act_4',
        time: '16:00',
        type: 'travel',
        description: 'Travel to Whitefield area for prospect meetings',
        location: 'Whitefield',
        duration: 60,
        outcome: 'successful',
        notes: 'Covered 3 prospect visits in the area'
      }
    ],
    customerVisits: 4,
    newProspects: 2,
    followUps: 3,
    closedDeals: 1,
    salesAmount: 150000,
    commissionsEarned: 3750,
    expensesIncurred: 450,
    travelDistance: 45,
    areasVisited: ['Koramangala', 'Whitefield', 'HSR Layout'],
    transportCost: 200,
    callsMade: 8,
    emailsSent: 5,
    whatsappMessages: 12,
    documentsCollected: 6,
    summary: 'Productive day with good customer interactions and one deal closure',
    challenges: 'Traffic delays in Whitefield area affected schedule',
    achievements: 'Closed premium scheme deal with Rajesh Gupta',
    tomorrowPlan: 'Focus on follow-ups and demo preparations',
    moodRating: 4,
    energyLevel: 4,
    satisfactionLevel: 5,
    isSubmitted: true,
    submittedAt: '2024-03-15T18:30:00',
    approvedBy: 'Rajesh Kumar',
    approvedAt: '2024-03-16T09:00:00',
    createdAt: '2024-03-15T18:30:00',
    updatedAt: '2024-03-16T09:00:00'
  },
  {
    id: '2',
    agentId: 'AGT002',
    date: '2024-03-15',
    activities: [
      {
        id: 'act_5',
        time: '10:00',
        type: 'customer-visit',
        description: 'New prospect meeting at Manufacturing Ltd',
        customerId: 'cust_003',
        customerName: 'Manufacturing Ltd',
        location: 'Electronic City',
        duration: 60,
        outcome: 'successful',
        nextAction: 'Prepare detailed proposal',
        notes: 'Large corporate prospect, interested in bulk schemes'
      },
      {
        id: 'act_6',
        time: '12:00',
        type: 'meeting',
        description: 'Team meeting with branch manager',
        location: 'Branch Office',
        duration: 30,
        outcome: 'successful',
        notes: 'Discussed monthly targets and new strategies'
      },
      {
        id: 'act_7',
        time: '15:00',
        type: 'follow-up',
        description: 'Follow-up with existing customers for renewals',
        duration: 120,
        outcome: 'partial',
        nextAction: 'Schedule renewal meetings',
        notes: '5 out of 8 customers confirmed renewals'
      }
    ],
    customerVisits: 6,
    newProspects: 3,
    followUps: 8,
    closedDeals: 2,
    salesAmount: 280000,
    commissionsEarned: 8400,
    expensesIncurred: 650,
    travelDistance: 65,
    areasVisited: ['Electronic City', 'Sarjapur', 'Whitefield', 'Marathahalli'],
    transportCost: 350,
    callsMade: 15,
    emailsSent: 8,
    whatsappMessages: 20,
    documentsCollected: 12,
    summary: 'Excellent day with high customer engagement and good sales',
    challenges: 'Some customers need more time for decision making',
    achievements: 'Secured large corporate prospect and multiple renewals',
    tomorrowPlan: 'Prepare proposals and schedule follow-up meetings',
    moodRating: 5,
    energyLevel: 4,
    satisfactionLevel: 5,
    isSubmitted: true,
    submittedAt: '2024-03-15T19:00:00',
    approvedBy: 'Rajesh Kumar',
    approvedAt: '2024-03-16T08:30:00',
    createdAt: '2024-03-15T19:00:00',
    updatedAt: '2024-03-16T08:30:00'
  },
  {
    id: '3',
    agentId: 'AGT003',
    date: '2024-03-15',
    activities: [
      {
        id: 'act_8',
        time: '09:00',
        type: 'training',
        description: 'Attended digital marketing workshop',
        location: 'Training Center',
        duration: 180,
        outcome: 'successful',
        notes: 'Learned new social media strategies for lead generation'
      },
      {
        id: 'act_9',
        time: '13:30',
        type: 'customer-visit',
        description: 'Prospect meeting with startup founder',
        customerId: 'cust_004',
        customerName: 'Tech Startup',
        location: 'Indiranagar',
        duration: 45,
        outcome: 'partial',
        nextAction: 'Send information packet',
        notes: 'Interested but needs to discuss with co-founder'
      }
    ],
    customerVisits: 3,
    newProspects: 2,
    followUps: 4,
    closedDeals: 0,
    salesAmount: 0,
    commissionsEarned: 0,
    expensesIncurred: 300,
    travelDistance: 25,
    areasVisited: ['Indiranagar', 'Domlur'],
    transportCost: 150,
    callsMade: 6,
    emailsSent: 3,
    whatsappMessages: 8,
    documentsCollected: 2,
    summary: 'Training day with some customer interactions',
    challenges: 'Balancing training time with customer visits',
    achievements: 'Completed digital marketing certification',
    tomorrowPlan: 'Apply new digital strategies and focus on conversions',
    moodRating: 4,
    energyLevel: 3,
    satisfactionLevel: 4,
    isSubmitted: true,
    submittedAt: '2024-03-15T17:45:00',
    createdAt: '2024-03-15T17:45:00',
    updatedAt: '2024-03-15T17:45:00'
  }
];

const agents = [
  { id: 'AGT001', name: 'Karthik Nair', branch: 'Bangalore South' },
  { id: 'AGT002', name: 'Vikram Singh', branch: 'Bangalore East' },
  { id: 'AGT003', name: 'Priya Reddy', branch: 'Bangalore East' },
  { id: 'AGT004', name: 'Suresh Kumar', branch: 'Bangalore West' },
  { id: 'AGT005', name: 'Anjali Sharma', branch: 'Bangalore Central' }
];

const DiaryCard: React.FC<{ diary: DailyDiary }> = React.memo(({ diary }) => {
  const agent = agents.find(a => a.id === diary.agentId);
  
  const getActivityIcon = (type: string) => {
    switch (type) {
      case 'customer-visit': return Users;
      case 'phone-call': return Phone;
      case 'email': return Mail;
      case 'follow-up': return CheckCircle;
      case 'documentation': return FileText;
      case 'travel': return Car;
      case 'training': return Star;
      case 'meeting': return Users;
      default: return Activity;
    }
  };

  const getOutcomeColor = (outcome: string) => {
    switch (outcome) {
      case 'successful': return 'text-green-400';
      case 'partial': return 'text-yellow-400';
      case 'unsuccessful': return 'text-red-400';
      case 'rescheduled': return 'text-blue-400';
      default: return 'text-slate-400';
    }
  };

  const getMoodIcon = (rating: number) => {
    if (rating >= 4) return Smile;
    if (rating >= 3) return Meh;
    return Frown;
  };

  const getMoodColor = (rating: number) => {
    if (rating >= 4) return 'text-green-400';
    if (rating >= 3) return 'text-yellow-400';
    return 'text-red-400';
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const MoodIcon = getMoodIcon(diary.moodRating);

  return (
    <div className="bg-slate-800/40 backdrop-blur-xl rounded-2xl p-6 border border-yellow-400/30 hover:border-yellow-400/50 transition-all">
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center space-x-3">
          <div className="h-12 w-12 bg-slate-600/50 rounded-full flex items-center justify-center text-slate-50 font-semibold border border-yellow-400/30">
            {agent?.name.split(' ').map(n => n[0]).join('') || 'AG'}
          </div>
          <div>
            <h3 className="text-lg font-semibold text-slate-50">{agent?.name || 'Unknown Agent'}</h3>
            <p className="text-sm text-slate-400">{new Date(diary.date).toLocaleDateString()}</p>
            <p className="text-xs text-slate-500">{agent?.branch}</p>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          {diary.isSubmitted ? (
            <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800 border border-green-200">
              <CheckCircle className="h-3 w-3 mr-1" />
              SUBMITTED
            </span>
          ) : (
            <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800 border border-yellow-200">
              <Clock className="h-3 w-3 mr-1" />
              DRAFT
            </span>
          )}
          <button className="p-2 text-slate-400 hover:text-slate-50 hover:bg-slate-700/50 rounded-lg transition-all">
            <MoreVertical className="h-4 w-4" />
          </button>
        </div>
      </div>

      {/* Daily Metrics */}
      <div className="grid grid-cols-2 gap-4 mb-4">
        <div className="space-y-2">
          <div className="flex items-center justify-between text-sm">
            <span className="text-slate-400">Customer Visits</span>
            <span className="text-slate-50 font-medium">{diary.customerVisits}</span>
          </div>
          <div className="flex items-center justify-between text-sm">
            <span className="text-slate-400">New Prospects</span>
            <span className="text-blue-400 font-medium">{diary.newProspects}</span>
          </div>
          <div className="flex items-center justify-between text-sm">
            <span className="text-slate-400">Follow-ups</span>
            <span className="text-purple-400 font-medium">{diary.followUps}</span>
          </div>
          <div className="flex items-center justify-between text-sm">
            <span className="text-slate-400">Closed Deals</span>
            <span className="text-green-400 font-medium">{diary.closedDeals}</span>
          </div>
        </div>
        <div className="space-y-2">
          <div className="flex items-center justify-between text-sm">
            <span className="text-slate-400">Sales Amount</span>
            <span className="text-green-400 font-medium">{formatCurrency(diary.salesAmount)}</span>
          </div>
          <div className="flex items-center justify-between text-sm">
            <span className="text-slate-400">Commissions</span>
            <span className="text-yellow-400 font-medium">{formatCurrency(diary.commissionsEarned)}</span>
          </div>
          <div className="flex items-center justify-between text-sm">
            <span className="text-slate-400">Travel Distance</span>
            <span className="text-slate-300">{diary.travelDistance} km</span>
          </div>
          <div className="flex items-center justify-between text-sm">
            <span className="text-slate-400">Areas Visited</span>
            <span className="text-slate-300">{diary.areasVisited.length}</span>
          </div>
        </div>
      </div>

      {/* Activities Preview */}
      <div className="mb-4 p-3 bg-slate-700/30 rounded-xl border border-yellow-400/20">
        <p className="text-xs text-slate-500 mb-2">Key Activities ({diary.activities.length}):</p>
        <div className="space-y-2">
          {diary.activities.slice(0, 3).map((activity) => {
            const ActivityIcon = getActivityIcon(activity.type);
            return (
              <div key={activity.id} className="flex items-center space-x-2">
                <ActivityIcon className="h-3 w-3 text-slate-500" />
                <span className="text-xs text-slate-300">{activity.time}</span>
                <span className="text-xs text-slate-300 truncate">{activity.description}</span>
                <span className={`text-xs ${getOutcomeColor(activity.outcome)}`}>
                  {activity.outcome}
                </span>
              </div>
            );
          })}
          {diary.activities.length > 3 && (
            <p className="text-xs text-slate-500">+{diary.activities.length - 3} more activities</p>
          )}
        </div>
      </div>

      {/* Mood and Energy */}
      <div className="mb-4 p-3 bg-slate-700/30 rounded-xl border border-yellow-400/20">
        <div className="grid grid-cols-3 gap-4 text-center">
          <div>
            <div className="flex items-center justify-center mb-1">
              <MoodIcon className={`h-5 w-5 ${getMoodColor(diary.moodRating)}`} />
            </div>
            <p className="text-xs text-slate-500">Mood</p>
            <p className="text-sm font-medium text-slate-50">{diary.moodRating}/5</p>
          </div>
          <div>
            <div className="flex items-center justify-center mb-1">
              <Battery className={`h-5 w-5 ${getMoodColor(diary.energyLevel)}`} />
            </div>
            <p className="text-xs text-slate-500">Energy</p>
            <p className="text-sm font-medium text-slate-50">{diary.energyLevel}/5</p>
          </div>
          <div>
            <div className="flex items-center justify-center mb-1">
              <ThumbsUp className={`h-5 w-5 ${getMoodColor(diary.satisfactionLevel)}`} />
            </div>
            <p className="text-xs text-slate-500">Satisfaction</p>
            <p className="text-sm font-medium text-slate-50">{diary.satisfactionLevel}/5</p>
          </div>
        </div>
      </div>

      {/* Summary */}
      <div className="mb-4">
        <p className="text-xs text-slate-500 mb-1">Daily Summary:</p>
        <p className="text-sm text-slate-300 line-clamp-2">{diary.summary}</p>
      </div>

      <div className="flex justify-between items-center pt-4 border-t border-yellow-400/20">
        <div className="flex items-center text-xs text-slate-500">
          <Calendar className="h-3 w-3 mr-1" />
          <span>
            {diary.isSubmitted 
              ? `Submitted ${diary.submittedAt ? new Date(diary.submittedAt).toLocaleDateString() : ''}`
              : 'Draft'
            }
          </span>
        </div>
        <div className="flex space-x-2">
          <button className="p-2 text-slate-400 hover:text-blue-400 hover:bg-blue-500/10 rounded-lg transition-all">
            <Eye className="h-4 w-4" />
          </button>
          <button className="p-2 text-slate-400 hover:text-green-400 hover:bg-green-500/10 rounded-lg transition-all">
            <Edit className="h-4 w-4" />
          </button>
          {!diary.isSubmitted && (
            <button className="p-2 text-slate-400 hover:text-purple-400 hover:bg-purple-500/10 rounded-lg transition-all">
              <Send className="h-4 w-4" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
});

const AgentDailyDiary: React.FC = () => {
  const [diaries] = useState<DailyDiary[]>(sampleDiaries);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterAgent, setFilterAgent] = useState<string>('all');
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);

  const filteredDiaries = useMemo(() => diaries.filter(diary => {
    const agent = agents.find(a => a.id === diary.agentId);
    const matchesSearch = agent?.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         diary.summary.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesAgent = filterAgent === 'all' || diary.agentId === filterAgent;
    const matchesStatus = filterStatus === 'all' || 
                         (filterStatus === 'submitted' && diary.isSubmitted) ||
                         (filterStatus === 'draft' && !diary.isSubmitted);
    const matchesDate = diary.date === selectedDate;
    
    return matchesSearch && matchesAgent && matchesStatus && matchesDate;
  }), [diaries, searchTerm, filterAgent, filterStatus, selectedDate]);

  const stats = useMemo(() => ({
    totalDiaries: diaries.length,
    submitted: diaries.filter(d => d.isSubmitted).length,
    draft: diaries.filter(d => !d.isSubmitted).length,
    approved: diaries.filter(d => d.approvedBy).length,
    pending: diaries.filter(d => d.isSubmitted && !d.approvedBy).length,
    totalVisits: diaries.reduce((sum, d) => sum + d.customerVisits, 0),
    totalSales: diaries.reduce((sum, d) => sum + d.salesAmount, 0),
    totalCommissions: diaries.reduce((sum, d) => sum + d.commissionsEarned, 0),
    totalDistance: diaries.reduce((sum, d) => sum + d.travelDistance, 0),
    avgMood: diaries.length > 0 ? diaries.reduce((sum, d) => sum + d.moodRating, 0) / diaries.length : 0,
    avgEnergy: diaries.length > 0 ? diaries.reduce((sum, d) => sum + d.energyLevel, 0) / diaries.length : 0,
    avgSatisfaction: diaries.length > 0 ? diaries.reduce((sum, d) => sum + d.satisfactionLevel, 0) / diaries.length : 0
  }), [diaries]);

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const getMoodIcon = (rating: number) => {
    if (rating >= 4) return Smile;
    if (rating >= 3) return Meh;
    return Frown;
  };

  const getMoodColor = (rating: number) => {
    if (rating >= 4) return 'text-green-400';
    if (rating >= 3) return 'text-yellow-400';
    return 'text-red-400';
  };

  const MoodIcon = getMoodIcon(stats.avgMood);

  return (
    <div className="h-full flex flex-col bg-slate-900 overflow-hidden">
      {/* Header */}
      <div className="flex justify-between items-center p-4 border-b border-yellow-400/30 flex-shrink-0">
        <div>
          <h1 className="text-2xl font-bold text-slate-50">Daily Diary</h1>
          <p className="mt-1 text-sm text-slate-400">
            Track daily activities, visits, and performance metrics
          </p>
        </div>
        <div className="flex space-x-3">
          <button className="inline-flex items-center px-4 py-2 border border-yellow-400/30 text-sm font-medium rounded-lg text-slate-50 bg-slate-700/50 hover:bg-slate-700 transition-all backdrop-blur-sm">
            <Download className="h-4 w-4 mr-2" />
            Export Report
          </button>
          <button className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-lg shadow-sm text-white bg-blue-600 hover:bg-blue-700 transition-all">
            <Plus className="h-4 w-4 mr-2" />
            New Diary Entry
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
                <p className="text-sm text-slate-400">Total Entries</p>
                <p className="text-2xl font-bold text-slate-50">{stats.totalDiaries}</p>
              </div>
              <FileText className="h-8 w-8 text-blue-400" />
            </div>
          </div>
          <div className="bg-slate-800/40 backdrop-blur-xl p-4 rounded-xl border border-yellow-400/30">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-400">Submitted</p>
                <p className="text-2xl font-bold text-green-400">{stats.submitted}</p>
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
                <p className="text-sm text-slate-400">Approved</p>
                <p className="text-2xl font-bold text-purple-400">{stats.approved}</p>
              </div>
              <Award className="h-8 w-8 text-purple-400" />
            </div>
          </div>
          <div className="bg-slate-800/40 backdrop-blur-xl p-4 rounded-xl border border-yellow-400/30">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-400">Customer Visits</p>
                <p className="text-2xl font-bold text-orange-400">{stats.totalVisits}</p>
              </div>
              <Users className="h-8 w-8 text-orange-400" />
            </div>
          </div>
          <div className="bg-slate-800/40 backdrop-blur-xl p-4 rounded-xl border border-yellow-400/30">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-400">Travel Distance</p>
                <p className="text-2xl font-bold text-indigo-400">{stats.totalDistance}km</p>
              </div>
              <Navigation className="h-8 w-8 text-indigo-400" />
            </div>
          </div>
          <div className="bg-slate-800/40 backdrop-blur-xl p-4 rounded-xl border border-yellow-400/30">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-400">Avg Mood</p>
                <p className="text-2xl font-bold text-emerald-400">{stats.avgMood.toFixed(1)}/5</p>
              </div>
              <MoodIcon className={`h-8 w-8 ${getMoodColor(stats.avgMood)}`} />
            </div>
          </div>
          <div className="bg-slate-800/40 backdrop-blur-xl p-4 rounded-xl border border-yellow-400/30">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-400">Avg Energy</p>
                <p className="text-2xl font-bold text-pink-400">{stats.avgEnergy.toFixed(1)}/5</p>
              </div>
              <Battery className="h-8 w-8 text-pink-400" />
            </div>
          </div>
          <div className="bg-slate-800/40 backdrop-blur-xl p-4 rounded-xl border border-yellow-400/30">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-400">Satisfaction</p>
                <p className="text-2xl font-bold text-cyan-400">{stats.avgSatisfaction.toFixed(1)}/5</p>
              </div>
              <ThumbsUp className="h-8 w-8 text-cyan-400" />
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
                <p className="text-sm text-slate-400">Commissions</p>
                <p className="text-xl font-bold text-yellow-400">{formatCurrency(stats.totalCommissions)}</p>
              </div>
              <Star className="h-8 w-8 text-yellow-400" />
            </div>
          </div>
        </div>

        {/* Filters */}
        <div className="bg-slate-800/40 backdrop-blur-xl rounded-xl p-4 border border-yellow-400/30">
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4 items-center">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-500 h-4 w-4" />
              <input
                type="text"
                placeholder="Search diaries..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-2 bg-slate-700/50 border border-yellow-400/30 rounded-lg w-full text-slate-50 placeholder-slate-400 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 backdrop-blur-sm"
              />
            </div>
            <input
              type="date"
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
              className="px-3 py-2 bg-slate-700/50 border border-yellow-400/30 rounded-lg text-slate-50 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 backdrop-blur-sm"
            />
            <select
              value={filterAgent}
              onChange={(e) => setFilterAgent(e.target.value)}
              className="px-3 py-2 bg-slate-700/50 border border-yellow-400/30 rounded-lg text-slate-50 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 backdrop-blur-sm"
            >
              <option value="all">All Agents</option>
              {agents.map(agent => (
                <option key={agent.id} value={agent.id}>{agent.name}</option>
              ))}
            </select>
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="px-3 py-2 bg-slate-700/50 border border-yellow-400/30 rounded-lg text-slate-50 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 backdrop-blur-sm"
            >
              <option value="all">All Status</option>
              <option value="submitted">Submitted</option>
              <option value="draft">Draft</option>
            </select>
            <div className="text-sm text-slate-400">
              Showing: <span className="font-semibold text-slate-50">{filteredDiaries.length}</span> entries
            </div>
          </div>
        </div>

        {/* Diaries Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {filteredDiaries.map((diary) => (
            <DiaryCard key={diary.id} diary={diary} />
          ))}
        </div>

        {filteredDiaries.length === 0 && (
          <div className="text-center py-12">
            <FileText className="h-12 w-12 mx-auto text-slate-500 mb-4" />
            <h3 className="text-lg font-medium text-slate-50 mb-2">No diary entries found</h3>
            <p className="text-sm text-slate-400">Try adjusting your search criteria or date filter.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default AgentDailyDiary;