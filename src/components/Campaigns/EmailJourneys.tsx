import React, { useState, useMemo } from 'react';
import {
  Plus,
  Search,
  Edit,
  Trash2,
  Eye,
  Play,
  Pause,
  Copy,
  Mail,
  MessageSquare,
  Clock,
  Users,
  TrendingUp,
  Target,
  Award,
  CheckCircle,
  XCircle,
  AlertTriangle,
  Calendar,
  Filter,
  Download,
  Settings,
  MoreVertical,
  Zap,
  Star,
  Activity,
  ArrowRight,
  GitBranch,
  Timer
} from 'lucide-react';
import { EmailJourney, JourneyStep } from '../../types/campaigns';

const sampleJourneys: EmailJourney[] = [
  {
    id: '1',
    name: 'New Member Onboarding Journey',
    description: 'Complete onboarding sequence for new chit fund members',
    status: 'active',
    triggerEvent: 'member_registered',
    entryConditions: [
      { field: 'registration_status', operator: 'equals', value: 'completed' }
    ],
    exitConditions: [
      { field: 'onboarding_completed', operator: 'equals', value: 'true' }
    ],
    steps: [
      {
        id: 'step_1',
        name: 'Welcome Email',
        type: 'email',
        order: 1,
        subject: 'Welcome to Ramnirmalchits Family!',
        content: 'Welcome email content...',
        enteredCount: 450,
        completedCount: 425,
        openRate: 85.0,
        clickRate: 35.0,
        isActive: true,
        canSkip: false
      },
      {
        id: 'step_2',
        name: 'Wait 1 Day',
        type: 'wait',
        order: 2,
        waitDuration: 1440, // 24 hours
        waitUnit: 'minutes',
        enteredCount: 425,
        completedCount: 425,
        isActive: true,
        canSkip: false
      },
      {
        id: 'step_3',
        name: 'Getting Started Guide',
        type: 'email',
        order: 3,
        subject: 'Your Complete Guide to Chit Funds',
        content: 'Getting started guide content...',
        enteredCount: 425,
        completedCount: 398,
        openRate: 78.0,
        clickRate: 42.0,
        isActive: true,
        canSkip: false
      }
    ],
    totalEntered: 450,
    totalCompleted: 398,
    totalExited: 15,
    currentActive: 37,
    completionRate: 88.4,
    avgTimeToComplete: 72, // 3 days
    conversionRate: 25.8,
    createdAt: '2024-02-01',
    createdBy: 'marketing@ramnirmalchits.com',
    updatedAt: '2024-03-15',
    updatedBy: 'marketing@ramnirmalchits.com',
    timezone: 'Asia/Kolkata',
    isRecurring: true
  },
  {
    id: '2',
    name: 'Payment Reminder Journey',
    description: 'Automated payment reminder sequence for overdue installments',
    status: 'active',
    triggerEvent: 'payment_overdue',
    entryConditions: [
      { field: 'days_overdue', operator: 'greater_than', value: '1' }
    ],
    exitConditions: [
      { field: 'payment_status', operator: 'equals', value: 'paid' }
    ],
    steps: [
      {
        id: 'step_4',
        name: 'First Reminder',
        type: 'email',
        order: 1,
        subject: 'Payment Reminder - {scheme_name}',
        content: 'First reminder content...',
        enteredCount: 180,
        completedCount: 165,
        openRate: 92.0,
        clickRate: 28.0,
        isActive: true,
        canSkip: false
      },
      {
        id: 'step_5',
        name: 'Wait 3 Days',
        type: 'wait',
        order: 2,
        waitDuration: 4320, // 72 hours
        waitUnit: 'minutes',
        enteredCount: 165,
        completedCount: 145,
        isActive: true,
        canSkip: false
      },
      {
        id: 'step_6',
        name: 'Final Notice',
        type: 'email',
        order: 3,
        subject: 'Final Payment Notice - Action Required',
        content: 'Final notice content...',
        enteredCount: 145,
        completedCount: 125,
        openRate: 95.0,
        clickRate: 45.0,
        isActive: true,
        canSkip: false
      }
    ],
    totalEntered: 180,
    totalCompleted: 125,
    totalExited: 35,
    currentActive: 20,
    completionRate: 69.4,
    avgTimeToComplete: 96, // 4 days
    conversionRate: 78.5,
    createdAt: '2024-01-15',
    createdBy: 'operations@ramnirmalchits.com',
    updatedAt: '2024-03-14',
    updatedBy: 'operations@ramnirmalchits.com',
    timezone: 'Asia/Kolkata',
    isRecurring: true
  },
  {
    id: '3',
    name: 'Win-Back Campaign Journey',
    description: 'Re-engagement journey for inactive members',
    status: 'paused',
    triggerEvent: 'member_inactive',
    entryConditions: [
      { field: 'last_activity', operator: 'greater_than', value: '90' }
    ],
    exitConditions: [
      { field: 'engagement_score', operator: 'greater_than', value: '50' }
    ],
    steps: [
      {
        id: 'step_7',
        name: 'We Miss You Email',
        type: 'email',
        order: 1,
        subject: 'We Miss You! Special Offers Inside',
        content: 'Win-back email content...',
        enteredCount: 85,
        completedCount: 72,
        openRate: 45.0,
        clickRate: 18.0,
        isActive: true,
        canSkip: false
      }
    ],
    totalEntered: 85,
    totalCompleted: 72,
    totalExited: 8,
    currentActive: 5,
    completionRate: 84.7,
    avgTimeToComplete: 48, // 2 days
    conversionRate: 15.2,
    createdAt: '2024-02-20',
    createdBy: 'marketing@ramnirmalchits.com',
    updatedAt: '2024-03-10',
    updatedBy: 'marketing@ramnirmalchits.com',
    timezone: 'Asia/Kolkata',
    isRecurring: true
  }
];

const JourneyCard: React.FC<{ journey: EmailJourney }> = React.memo(({ journey }) => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800 border-green-200';
      case 'paused': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'completed': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'draft': return 'bg-gray-100 text-gray-800 border-gray-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  return (
    <div className="bg-slate-800/40 backdrop-blur-xl rounded-2xl p-6 border border-yellow-400/30 hover:border-yellow-400/50 transition-all">
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center space-x-3">
          <div className="p-3 bg-purple-500/20 rounded-xl border border-yellow-400/30">
            <GitBranch className="h-6 w-6 text-purple-400" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-slate-50">{journey.name}</h3>
            <p className="text-sm text-slate-400">{journey.description}</p>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium border ${getStatusColor(journey.status)}`}>
            {journey.status.toUpperCase()}
          </span>
          <button className="p-2 text-slate-400 hover:text-slate-50 hover:bg-slate-700/50 rounded-lg transition-all">
            <MoreVertical className="h-4 w-4" />
          </button>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 mb-4">
        <div className="space-y-2">
          <div className="flex items-center justify-between text-sm">
            <span className="text-slate-400">Total Entered</span>
            <span className="text-slate-50 font-medium">{journey.totalEntered}</span>
          </div>
          <div className="flex items-center justify-between text-sm">
            <span className="text-slate-400">Completed</span>
            <span className="text-green-400 font-medium">{journey.totalCompleted}</span>
          </div>
          <div className="flex items-center justify-between text-sm">
            <span className="text-slate-400">Currently Active</span>
            <span className="text-blue-400 font-medium">{journey.currentActive}</span>
          </div>
        </div>
        <div className="space-y-2">
          <div className="flex items-center justify-between text-sm">
            <span className="text-slate-400">Completion Rate</span>
            <span className="text-purple-400 font-medium">{journey.completionRate}%</span>
          </div>
          <div className="flex items-center justify-between text-sm">
            <span className="text-slate-400">Conversion Rate</span>
            <span className="text-orange-400 font-medium">{journey.conversionRate}%</span>
          </div>
          <div className="flex items-center justify-between text-sm">
            <span className="text-slate-400">Avg Time</span>
            <span className="text-yellow-400 font-medium">{journey.avgTimeToComplete}h</span>
          </div>
        </div>
      </div>

      {/* Journey Steps Preview */}
      <div className="mb-4 p-3 bg-slate-700/30 rounded-xl border border-yellow-400/20">
        <p className="text-xs text-slate-500 mb-2">Journey Steps ({journey.steps.length}):</p>
        <div className="flex items-center space-x-2 overflow-x-auto">
          {journey.steps.map((step, index) => (
            <div key={step.id} className="flex items-center space-x-1 flex-shrink-0">
              <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-medium ${
                step.type === 'email' ? 'bg-blue-500/20 text-blue-400' :
                step.type === 'sms' ? 'bg-green-500/20 text-green-400' :
                step.type === 'wait' ? 'bg-yellow-500/20 text-yellow-400' :
                'bg-purple-500/20 text-purple-400'
              } border border-yellow-400/30`}>
                {step.type === 'email' ? <Mail className="h-3 w-3" /> :
                 step.type === 'sms' ? <MessageSquare className="h-3 w-3" /> :
                 step.type === 'wait' ? <Clock className="h-3 w-3" /> :
                 <Settings className="h-3 w-3" />}
              </div>
              {index < journey.steps.length - 1 && (
                <ArrowRight className="h-3 w-3 text-slate-500" />
              )}
            </div>
          ))}
        </div>
      </div>

      <div className="flex justify-between items-center pt-4 border-t border-yellow-400/20">
        <div className="flex items-center text-xs text-slate-500">
          <Calendar className="h-3 w-3 mr-1" />
          <span>Created {new Date(journey.createdAt).toLocaleDateString()}</span>
        </div>
        <div className="flex space-x-2">
          <button className="p-2 text-slate-400 hover:text-blue-400 hover:bg-blue-500/10 rounded-lg transition-all">
            <Eye className="h-4 w-4" />
          </button>
          <button className="p-2 text-slate-400 hover:text-green-400 hover:bg-green-500/10 rounded-lg transition-all">
            <Activity className="h-4 w-4" />
          </button>
          <button className="p-2 text-slate-400 hover:text-purple-400 hover:bg-purple-500/10 rounded-lg transition-all">
            <Copy className="h-4 w-4" />
          </button>
          {journey.status === 'paused' ? (
            <button className="p-2 text-slate-400 hover:text-green-400 hover:bg-green-500/10 rounded-lg transition-all">
              <Play className="h-4 w-4" />
            </button>
          ) : (
            <button className="p-2 text-slate-400 hover:text-yellow-400 hover:bg-yellow-500/10 rounded-lg transition-all">
              <Pause className="h-4 w-4" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
});

export const EmailJourneys: React.FC = () => {
  const [journeys] = useState<EmailJourney[]>(sampleJourneys);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState<string>('all');

  const filteredJourneys = useMemo(() => journeys.filter(journey => {
    const matchesSearch = journey.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         journey.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === 'all' || journey.status === filterStatus;
    
    return matchesSearch && matchesStatus;
  }), [journeys, searchTerm, filterStatus]);

  const stats = useMemo(() => ({
    total: journeys.length,
    active: journeys.filter(j => j.status === 'active').length,
    paused: journeys.filter(j => j.status === 'paused').length,
    completed: journeys.filter(j => j.status === 'completed').length,
    draft: journeys.filter(j => j.status === 'draft').length,
    totalEntered: journeys.reduce((sum, j) => sum + j.totalEntered, 0),
    totalCompleted: journeys.reduce((sum, j) => sum + j.totalCompleted, 0),
    currentActive: journeys.reduce((sum, j) => sum + j.currentActive, 0),
    avgCompletionRate: journeys.length > 0 ? journeys.reduce((sum, j) => sum + j.completionRate, 0) / journeys.length : 0,
    avgConversionRate: journeys.length > 0 ? journeys.reduce((sum, j) => sum + j.conversionRate, 0) / journeys.length : 0,
    totalSteps: journeys.reduce((sum, j) => sum + j.steps.length, 0)
  }), [journeys]);

  return (
    <div className="h-full flex flex-col bg-slate-900 overflow-hidden">
      {/* Header */}
      <div className="flex justify-between items-center p-4 border-b border-yellow-400/30 flex-shrink-0">
        <div>
          <h1 className="text-2xl font-bold text-slate-50">Email / SMS Journeys</h1>
          <p className="mt-1 text-sm text-slate-400">
            Create automated email and SMS journeys for customer engagement
          </p>
        </div>
        <div className="flex space-x-3">
          <button className="inline-flex items-center px-4 py-2 border border-yellow-400/30 text-sm font-medium rounded-lg text-slate-50 bg-slate-700/50 hover:bg-slate-700 transition-all backdrop-blur-sm">
            <Download className="h-4 w-4 mr-2" />
            Export Report
          </button>
          <button className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-lg shadow-sm text-white bg-blue-600 hover:bg-blue-700 transition-all">
            <Plus className="h-4 w-4 mr-2" />
            Create Journey
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto p-4 space-y-6 scrollbar-none">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-5 lg:grid-cols-10 gap-4">
          <div className="bg-slate-800/40 backdrop-blur-xl p-4 rounded-xl border border-yellow-400/30">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-400">Total Journeys</p>
                <p className="text-2xl font-bold text-slate-50">{stats.total}</p>
              </div>
              <GitBranch className="h-8 w-8 text-blue-400" />
            </div>
          </div>
          <div className="bg-slate-800/40 backdrop-blur-xl p-4 rounded-xl border border-yellow-400/30">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-400">Active</p>
                <p className="text-2xl font-bold text-green-400">{stats.active}</p>
              </div>
              <Play className="h-8 w-8 text-green-400" />
            </div>
          </div>
          <div className="bg-slate-800/40 backdrop-blur-xl p-4 rounded-xl border border-yellow-400/30">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-400">Paused</p>
                <p className="text-2xl font-bold text-yellow-400">{stats.paused}</p>
              </div>
              <Pause className="h-8 w-8 text-yellow-400" />
            </div>
          </div>
          <div className="bg-slate-800/40 backdrop-blur-xl p-4 rounded-xl border border-yellow-400/30">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-400">Completed</p>
                <p className="text-2xl font-bold text-blue-400">{stats.completed}</p>
              </div>
              <CheckCircle className="h-8 w-8 text-blue-400" />
            </div>
          </div>
          <div className="bg-slate-800/40 backdrop-blur-xl p-4 rounded-xl border border-yellow-400/30">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-400">Draft</p>
                <p className="text-2xl font-bold text-gray-400">{stats.draft}</p>
              </div>
              <Edit className="h-8 w-8 text-gray-400" />
            </div>
          </div>
          <div className="bg-slate-800/40 backdrop-blur-xl p-4 rounded-xl border border-yellow-400/30">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-400">Total Entered</p>
                <p className="text-2xl font-bold text-purple-400">{stats.totalEntered}</p>
              </div>
              <Users className="h-8 w-8 text-purple-400" />
            </div>
          </div>
          <div className="bg-slate-800/40 backdrop-blur-xl p-4 rounded-xl border border-yellow-400/30">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-400">Completed</p>
                <p className="text-2xl font-bold text-emerald-400">{stats.totalCompleted}</p>
              </div>
              <Award className="h-8 w-8 text-emerald-400" />
            </div>
          </div>
          <div className="bg-slate-800/40 backdrop-blur-xl p-4 rounded-xl border border-yellow-400/30">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-400">Currently Active</p>
                <p className="text-2xl font-bold text-orange-400">{stats.currentActive}</p>
              </div>
              <Activity className="h-8 w-8 text-orange-400" />
            </div>
          </div>
          <div className="bg-slate-800/40 backdrop-blur-xl p-4 rounded-xl border border-yellow-400/30">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-400">Avg Completion</p>
                <p className="text-2xl font-bold text-indigo-400">{stats.avgCompletionRate.toFixed(1)}%</p>
              </div>
              <Target className="h-8 w-8 text-indigo-400" />
            </div>
          </div>
          <div className="bg-slate-800/40 backdrop-blur-xl p-4 rounded-xl border border-yellow-400/30">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-400">Avg Conversion</p>
                <p className="text-2xl font-bold text-pink-400">{stats.avgConversionRate.toFixed(1)}%</p>
              </div>
              <TrendingUp className="h-8 w-8 text-pink-400" />
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
                placeholder="Search journeys..."
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
              <option value="paused">Paused</option>
              <option value="completed">Completed</option>
              <option value="draft">Draft</option>
            </select>
            <div className="text-sm text-slate-400">
              Showing: <span className="font-semibold text-slate-50">{filteredJourneys.length}</span> journeys
            </div>
          </div>
        </div>

        {/* Journeys Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {filteredJourneys.map((journey) => (
            <JourneyCard key={journey.id} journey={journey} />
          ))}
        </div>

        {filteredJourneys.length === 0 && (
          <div className="text-center py-12">
            <GitBranch className="h-12 w-12 mx-auto text-slate-500 mb-4" />
            <h3 className="text-lg font-medium text-slate-50 mb-2">No journeys found</h3>
            <p className="text-sm text-slate-400">Try adjusting your search criteria or create a new journey.</p>
          </div>
        )}
      </div>
    </div>
  );
};