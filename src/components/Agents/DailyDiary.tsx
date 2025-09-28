import React, { useState, useMemo } from 'react';
import {
  Plus,
  Search,
  Calendar,
  Clock,
  MapPin,
  Phone,
  Mail,
  Users,
  Car,
  DollarSign,
  TrendingUp,
  Activity,
  CheckCircle,
  Eye,
  Edit,
  Save,
  Filter,
  Download,
  Upload,
  Star,
  Target,
  Award,
  Zap,
  MoreVertical,
  Smile,
  Meh,
  Frown
} from 'lucide-react';
import { DailyDiary, DiaryActivity } from '../../types/agents';

const sampleDiaries: DailyDiary[] = [
  {
    id: '1',
    agentId: '1',
    date: '2024-03-15',
    activities: [
      {
        id: 'act_1',
        time: '09:30',
        type: 'customer-visit',
        description: 'Met with Rajesh Kumar to discuss premium chit scheme',
        customerId: 'cust_001',
        customerName: 'Rajesh Kumar',
        location: 'TechCorp Office, Koramangala',
        duration: 90,
        outcome: 'successful',
        nextAction: 'Send proposal by Monday',
        notes: 'Very interested, budget confirmed'
      },
      {
        id: 'act_2',
        time: '11:30',
        type: 'phone-call',
        description: 'Follow-up call with Sunita Reddy',
        customerId: 'cust_002',
        customerName: 'Sunita Reddy',
        duration: 20,
        outcome: 'successful',
        nextAction: 'Schedule meeting next week',
        notes: 'Clarified scheme benefits'
      },
      {
        id: 'act_3',
        time: '14:00',
        type: 'travel',
        description: 'Travel to Whitefield area for customer visits',
        location: 'Whitefield',
        duration: 45,
        outcome: 'successful'
      },
      {
        id: 'act_4',
        time: '15:00',
        type: 'customer-visit',
        description: 'New prospect meeting - StartupInc',
        customerId: 'cust_003',
        customerName: 'Amit Sharma',
        location: 'StartupInc Office, Whitefield',
        duration: 60,
        outcome: 'partial',
        nextAction: 'Send detailed brochure',
        notes: 'Needs more information about flexible payment options'
      }
    ],
    customerVisits: 2,
    newProspects: 1,
    followUps: 1,
    closedDeals: 0,
    salesAmount: 0,
    commissionsEarned: 0,
    expensesIncurred: 450,
    travelDistance: 25,
    areasVisited: ['Koramangala', 'Whitefield'],
    transportCost: 200,
    callsMade: 5,
    emailsSent: 3,
    whatsappMessages: 8,
    documentsCollected: 2,
    summary: 'Productive day with good customer interactions. Two solid prospects identified.',
    challenges: 'Traffic delay in Whitefield area, need to plan better timing.',
    achievements: 'Successfully explained premium scheme benefits to high-value prospect.',
    tomorrowPlan: 'Follow up with Rajesh Kumar, send proposal. Schedule meeting with Sunita Reddy.',
    moodRating: 4,
    energyLevel: 4,
    satisfactionLevel: 4,
    isSubmitted: true,
    submittedAt: '2024-03-15T18:30:00',
    approvedBy: 'Rajesh Kumar',
    approvedAt: '2024-03-16T09:00:00',
    createdAt: '2024-03-15T18:30:00',
    updatedAt: '2024-03-16T09:00:00'
  },
  {
    id: '2',
    agentId: '1',
    date: '2024-03-14',
    activities: [
      {
        id: 'act_5',
        time: '10:00',
        type: 'phone-call',
        description: 'Cold call to Manufacturing Ltd',
        duration: 15,
        outcome: 'unsuccessful',
        notes: 'Not interested at this time'
      },
      {
        id: 'act_6',
        time: '11:00',
        type: 'documentation',
        description: 'Updated customer database with new leads',
        duration: 30,
        outcome: 'successful'
      },
      {
        id: 'act_7',
        time: '14:30',
        type: 'customer-visit',
        description: 'Existing customer check-in - Deepika Rao',
        customerId: 'cust_004',
        customerName: 'Deepika Rao',
        location: 'Electronic City',
        duration: 45,
        outcome: 'successful',
        notes: 'Happy with current scheme, considering additional investment'
      }
    ],
    customerVisits: 1,
    newProspects: 0,
    followUps: 2,
    closedDeals: 0,
    salesAmount: 0,
    commissionsEarned: 0,
    expensesIncurred: 300,
    travelDistance: 18,
    areasVisited: ['Electronic City'],
    transportCost: 150,
    callsMade: 8,
    emailsSent: 2,
    whatsappMessages: 5,
    documentsCollected: 0,
    summary: 'Mixed day with some challenges but good follow-up activities completed.',
    challenges: 'Several cold calls were unsuccessful, need to improve approach.',
    achievements: 'Maintained good relationship with existing customer.',
    tomorrowPlan: 'Focus on warm leads and scheduled appointments.',
    moodRating: 3,
    energyLevel: 3,
    satisfactionLevel: 3,
    isSubmitted: true,
    submittedAt: '2024-03-14T18:00:00',
    approvedBy: 'Rajesh Kumar',
    approvedAt: '2024-03-15T09:30:00',
    createdAt: '2024-03-14T18:00:00',
    updatedAt: '2024-03-15T09:30:00'
  }
];

const DiaryCard: React.FC<{ diary: DailyDiary }> = React.memo(({ diary }) => {
  const getOutcomeColor = (outcome: string) => {
    switch (outcome) {
      case 'successful': return 'bg-green-100 text-green-800 border-green-200';
      case 'partial': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'unsuccessful': return 'bg-red-100 text-red-800 border-red-200';
      case 'rescheduled': return 'bg-blue-100 text-blue-800 border-blue-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getActivityIcon = (type: string) => {
    switch (type) {
      case 'customer-visit': return Users;
      case 'phone-call': return Phone;
      case 'email': return Mail;
      case 'travel': return Car;
      case 'documentation': return Edit;
      case 'meeting': return Users;
      case 'training': return Award;
      default: return Activity;
    }
  };

  const getMoodIcon = (rating: number) => {
    if (rating >= 4) return Smile;
    if (rating >= 3) return Meh;
    return Frown;
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
          <div className="p-3 bg-blue-500/20 rounded-xl border border-yellow-400/30">
            <Calendar className="h-6 w-6 text-blue-400" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-slate-50">{new Date(diary.date).toLocaleDateString()}</h3>
            <p className="text-sm text-slate-400">Daily Activity Report</p>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <div className="flex items-center space-x-1">
            <MoodIcon className={`h-4 w-4 ${
              diary.moodRating >= 4 ? 'text-green-400' :
              diary.moodRating >= 3 ? 'text-yellow-400' : 'text-red-400'
            }`} />
            <span className="text-xs text-slate-400">Mood: {diary.moodRating}/5</span>
          </div>
          <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium border ${
            diary.isSubmitted ? 'bg-green-100 text-green-800 border-green-200' : 'bg-yellow-100 text-yellow-800 border-yellow-200'
          }`}>
            {diary.isSubmitted ? 'SUBMITTED' : 'DRAFT'}
          </span>
          <button className="p-2 text-slate-400 hover:text-slate-50 hover:bg-slate-700/50 rounded-lg transition-all">
            <MoreVertical className="h-4 w-4" />
          </button>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-4 gap-4 mb-4">
        <div className="text-center">
          <p className="text-xs text-slate-500">Visits</p>
          <p className="text-lg font-semibold text-blue-400">{diary.customerVisits}</p>
        </div>
        <div className="text-center">
          <p className="text-xs text-slate-500">New Prospects</p>
          <p className="text-lg font-semibold text-green-400">{diary.newProspects}</p>
        </div>
        <div className="text-center">
          <p className="text-xs text-slate-500">Follow-ups</p>
          <p className="text-lg font-semibold text-purple-400">{diary.followUps}</p>
        </div>
        <div className="text-center">
          <p className="text-xs text-slate-500">Calls</p>
          <p className="text-lg font-semibold text-orange-400">{diary.callsMade}</p>
        </div>
      </div>

      {/* Activities Preview */}
      <div className="mb-4">
        <p className="text-sm font-medium text-slate-50 mb-2">Activities ({diary.activities.length})</p>
        <div className="space-y-2">
          {diary.activities.slice(0, 3).map((activity) => {
            const ActivityIcon = getActivityIcon(activity.type);
            return (
              <div key={activity.id} className="flex items-center space-x-3 p-2 bg-slate-700/30 rounded-lg border border-yellow-400/20">
                <ActivityIcon className="h-4 w-4 text-blue-400" />
                <div className="flex-1">
                  <p className="text-sm text-slate-50">{activity.time} - {activity.description}</p>
                  {activity.customerName && (
                    <p className="text-xs text-slate-400">Customer: {activity.customerName}</p>
                  )}
                </div>
                <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium border ${getOutcomeColor(activity.outcome)}`}>
                  {activity.outcome}
                </span>
              </div>
            );
          })}
          {diary.activities.length > 3 && (
            <p className="text-xs text-slate-400 text-center">+{diary.activities.length - 3} more activities</p>
          )}
        </div>
      </div>

      {/* Summary */}
      <div className="mb-4 p-3 bg-slate-700/30 rounded-xl border border-yellow-400/20">
        <p className="text-sm text-slate-300">{diary.summary}</p>
      </div>

      {/* Travel & Expenses */}
      <div className="grid grid-cols-2 gap-4 mb-4 pt-4 border-t border-yellow-400/20">
        <div>
          <p className="text-xs text-slate-500">Travel Distance</p>
          <p className="text-sm font-semibold text-slate-50">{diary.travelDistance} km</p>
        </div>
        <div>
          <p className="text-xs text-slate-500">Expenses</p>
          <p className="text-sm font-semibold text-red-400">{formatCurrency(diary.expensesIncurred)}</p>
        </div>
      </div>

      <div className="flex justify-between items-center pt-4 border-t border-yellow-400/20">
        <div className="flex items-center text-xs text-slate-500">
          <Clock className="h-3 w-3 mr-1" />
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
          <button className="p-2 text-slate-400 hover:text-purple-400 hover:bg-purple-500/10 rounded-lg transition-all">
            <Download className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );
});

const AgentDailyDiary: React.FC = () => {
  const [diaries] = useState<DailyDiary[]>(sampleDiaries);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
  const [filterAgent, setFilterAgent] = useState<string>('all');

  const filteredDiaries = useMemo(() => diaries.filter(diary => {
    const matchesSearch = diary.summary.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         diary.achievements.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesDate = !selectedDate || diary.date === selectedDate;
    const matchesAgent = filterAgent === 'all' || diary.agentId === filterAgent;
    
    return matchesSearch && matchesDate && matchesAgent;
  }), [diaries, searchTerm, selectedDate, filterAgent]);

  const stats = useMemo(() => ({
    totalDiaries: diaries.length,
    submitted: diaries.filter(d => d.isSubmitted).length,
    draft: diaries.filter(d => !d.isSubmitted).length,
    approved: diaries.filter(d => d.approvedBy).length,
    totalVisits: diaries.reduce((sum, d) => sum + d.customerVisits, 0),
    totalProspects: diaries.reduce((sum, d) => sum + d.newProspects, 0),
    totalSales: diaries.reduce((sum, d) => sum + d.salesAmount, 0),
    totalExpenses: diaries.reduce((sum, d) => sum + d.expensesIncurred, 0),
    avgMoodRating: diaries.length > 0 ? diaries.reduce((sum, d) => sum + d.moodRating, 0) / diaries.length : 0,
    avgSatisfaction: diaries.length > 0 ? diaries.reduce((sum, d) => sum + d.satisfactionLevel, 0) / diaries.length : 0
  }), [diaries]);

  const agents = [
    { id: '1', name: 'Vikram Singh' },
    { id: '2', name: 'Priya Reddy' },
    { id: '3', name: 'Suresh Kumar' },
    { id: '4', name: 'Anjali Sharma' }
  ];

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
            New Entry
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto p-4 space-y-6 scrollbar-none">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 lg:grid-cols-10 gap-4">
          <div className="bg-slate-800/40 backdrop-blur-xl p-4 rounded-xl border border-yellow-400/30">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-400">Total Entries</p>
                <p className="text-2xl font-bold text-slate-50">{stats.totalDiaries}</p>
              </div>
              <Calendar className="h-8 w-8 text-blue-400" />
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
                <p className="text-sm text-slate-400">Total Visits</p>
                <p className="text-2xl font-bold text-orange-400">{stats.totalVisits}</p>
              </div>
              <Users className="h-8 w-8 text-orange-400" />
            </div>
          </div>
          <div className="bg-slate-800/40 backdrop-blur-xl p-4 rounded-xl border border-yellow-400/30">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-400">New Prospects</p>
                <p className="text-2xl font-bold text-emerald-400">{stats.totalProspects}</p>
              </div>
              <Star className="h-8 w-8 text-emerald-400" />
            </div>
          </div>
          <div className="bg-slate-800/40 backdrop-blur-xl p-4 rounded-xl border border-yellow-400/30">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-400">Sales Amount</p>
                <p className="text-2xl font-bold text-green-400">{formatCurrency(stats.totalSales)}</p>
              </div>
              <DollarSign className="h-8 w-8 text-green-400" />
            </div>
          </div>
          <div className="bg-slate-800/40 backdrop-blur-xl p-4 rounded-xl border border-yellow-400/30">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-400">Expenses</p>
                <p className="text-2xl font-bold text-red-400">{formatCurrency(stats.totalExpenses)}</p>
              </div>
              <Car className="h-8 w-8 text-red-400" />
            </div>
          </div>
          <div className="bg-slate-800/40 backdrop-blur-xl p-4 rounded-xl border border-yellow-400/30">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-400">Avg Mood</p>
                <p className="text-2xl font-bold text-indigo-400">{stats.avgMoodRating.toFixed(1)}/5</p>
              </div>
              <Smile className="h-8 w-8 text-indigo-400" />
            </div>
          </div>
          <div className="bg-slate-800/40 backdrop-blur-xl p-4 rounded-xl border border-yellow-400/30">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-400">Satisfaction</p>
                <p className="text-2xl font-bold text-pink-400">{stats.avgSatisfaction.toFixed(1)}/5</p>
              </div>
              <Target className="h-8 w-8 text-pink-400" />
            </div>
          </div>
        </div>

        {/* Filters */}
        <div className="bg-slate-800/40 backdrop-blur-xl rounded-xl p-4 border border-yellow-400/30">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-500 h-4 w-4" />
              <input
                type="text"
                placeholder="Search diary entries..."
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
            <div className="text-sm text-slate-400">
              Showing: <span className="font-semibold text-slate-50">{filteredDiaries.length}</span> entries
            </div>
          </div>
        </div>

        {/* Diary Entries */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {filteredDiaries.map((diary) => (
            <DiaryCard key={diary.id} diary={diary} />
          ))}
        </div>

        {filteredDiaries.length === 0 && (
          <div className="text-center py-12">
            <Calendar className="h-12 w-12 mx-auto text-slate-500 mb-4" />
            <h3 className="text-lg font-medium text-slate-50 mb-2">No diary entries found</h3>
            <p className="text-sm text-slate-400">Try adjusting your search criteria or create a new diary entry.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default AgentDailyDiary;