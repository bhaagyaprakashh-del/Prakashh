import React, { useState, useMemo } from 'react';
import {
  Trophy,
  Target,
  TrendingUp,
  TrendingDown,
  Award,
  Star,
  Crown,
  Medal,
  Zap,
  Users,
  DollarSign,
  Calendar,
  BarChart3,
  PieChart,
  LineChart,
  Filter,
  Download,
  RefreshCw,
  Eye,
  Edit,
  Plus,
  Settings,
  Flag,
  CheckCircle,
  AlertTriangle,
  Clock,
  Activity
} from 'lucide-react';
import { Agent, AgentRanking, AgentTarget } from '../../types/agents';

const sampleRankings: AgentRanking[] = [
  {
    rank: 1,
    agentId: 'AGT002',
    agentName: 'Vikram Singh',
    branch: 'Bangalore East',
    totalScore: 95.8,
    salesScore: 98.5,
    customerScore: 92.0,
    qualityScore: 97.0,
    monthlyAchievement: 86.7,
    quarterlyAchievement: 91.7,
    badge: 'champion',
    trend: 'stable',
    previousRank: 1
  },
  {
    rank: 2,
    agentId: 'AGT001',
    agentName: 'Karthik Nair',
    branch: 'Bangalore South',
    totalScore: 89.2,
    salesScore: 85.0,
    customerScore: 95.5,
    qualityScore: 87.0,
    monthlyAchievement: 85.0,
    quarterlyAchievement: 80.0,
    badge: 'star',
    trend: 'up',
    previousRank: 3
  },
  {
    rank: 3,
    agentId: 'AGT003',
    agentName: 'Priya Reddy',
    branch: 'Bangalore East',
    totalScore: 82.5,
    salesScore: 95.0,
    customerScore: 89.2,
    qualityScore: 63.3,
    monthlyAchievement: 95.0,
    quarterlyAchievement: 91.7,
    badge: 'performer',
    trend: 'up',
    previousRank: 4
  },
  {
    rank: 4,
    agentId: 'AGT004',
    agentName: 'Suresh Kumar',
    branch: 'Bangalore West',
    totalScore: 78.9,
    salesScore: 84.5,
    customerScore: 90.8,
    qualityScore: 61.5,
    monthlyAchievement: 84.5,
    quarterlyAchievement: 84.8,
    badge: 'performer',
    trend: 'down',
    previousRank: 2
  },
  {
    rank: 5,
    agentId: 'AGT005',
    agentName: 'Anjali Sharma',
    branch: 'Bangalore Central',
    totalScore: 72.3,
    salesScore: 95.0,
    customerScore: 93.3,
    qualityScore: 28.6,
    monthlyAchievement: 95.0,
    quarterlyAchievement: 91.1,
    badge: 'rookie',
    trend: 'up',
    previousRank: 6
  }
];

const sampleTargets: AgentTarget[] = [
  {
    id: '1',
    agentId: 'AGT001',
    period: 'monthly',
    targetType: 'sales',
    targetValue: 500000,
    achievedValue: 425000,
    unit: 'amount',
    startDate: '2024-03-01',
    endDate: '2024-03-31',
    status: 'active',
    setBy: 'Rajesh Kumar',
    setDate: '2024-02-28',
    notes: 'Focus on premium schemes this month'
  },
  {
    id: '2',
    agentId: 'AGT001',
    period: 'quarterly',
    targetType: 'customers',
    targetValue: 30,
    achievedValue: 25,
    unit: 'count',
    startDate: '2024-01-01',
    endDate: '2024-03-31',
    status: 'active',
    setBy: 'Rajesh Kumar',
    setDate: '2024-01-01',
    notes: 'New customer acquisition target'
  }
];

const RankingCard: React.FC<{ ranking: AgentRanking; index: number }> = React.memo(({ ranking, index }) => {
  const getRankIcon = (rank: number) => {
    switch (rank) {
      case 1: return Crown;
      case 2: return Medal;
      case 3: return Award;
      default: return Trophy;
    }
  };

  const getRankColor = (rank: number) => {
    switch (rank) {
      case 1: return 'text-yellow-400';
      case 2: return 'text-gray-300';
      case 3: return 'text-orange-400';
      default: return 'text-slate-400';
    }
  };

  const getBadgeColor = (badge: string) => {
    switch (badge) {
      case 'champion': return 'bg-red-100 text-red-800 border-red-200';
      case 'star': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'performer': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'rookie': return 'bg-green-100 text-green-800 border-green-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case 'up': return TrendingUp;
      case 'down': return TrendingDown;
      default: return Activity;
    }
  };

  const getTrendColor = (trend: string) => {
    switch (trend) {
      case 'up': return 'text-green-400';
      case 'down': return 'text-red-400';
      default: return 'text-slate-400';
    }
  };

  const RankIcon = getRankIcon(ranking.rank);
  const TrendIcon = getTrendIcon(ranking.trend);

  return (
    <div className={`bg-slate-800/40 backdrop-blur-xl rounded-2xl p-6 border transition-all ${
      ranking.rank <= 3 ? 'border-yellow-400/50 shadow-lg' : 'border-yellow-400/30 hover:border-yellow-400/50'
    }`}>
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center space-x-3">
          <div className={`p-3 rounded-xl border border-yellow-400/30 ${
            ranking.rank === 1 ? 'bg-yellow-500/20' :
            ranking.rank === 2 ? 'bg-gray-500/20' :
            ranking.rank === 3 ? 'bg-orange-500/20' : 'bg-blue-500/20'
          }`}>
            <RankIcon className={`h-6 w-6 ${getRankColor(ranking.rank)}`} />
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <h3 className="text-lg font-semibold text-slate-50">#{ranking.rank}</h3>
              <h4 className="text-lg font-semibold text-slate-50">{ranking.agentName}</h4>
            </div>
            <p className="text-sm text-slate-400">{ranking.branch}</p>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium border ${getBadgeColor(ranking.badge)}`}>
            {ranking.badge.toUpperCase()}
          </span>
          <div className="flex items-center space-x-1">
            <TrendIcon className={`h-4 w-4 ${getTrendColor(ranking.trend)}`} />
            <span className="text-xs text-slate-400">
              {ranking.previousRank > ranking.rank ? `+${ranking.previousRank - ranking.rank}` :
               ranking.previousRank < ranking.rank ? `-${ranking.rank - ranking.previousRank}` : '0'}
            </span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 mb-4">
        <div className="space-y-2">
          <div className="flex items-center justify-between text-sm">
            <span className="text-slate-400">Total Score</span>
            <span className="text-slate-50 font-bold">{ranking.totalScore.toFixed(1)}</span>
          </div>
          <div className="flex items-center justify-between text-sm">
            <span className="text-slate-400">Sales Score</span>
            <span className="text-green-400 font-medium">{ranking.salesScore.toFixed(1)}</span>
          </div>
          <div className="flex items-center justify-between text-sm">
            <span className="text-slate-400">Customer Score</span>
            <span className="text-blue-400 font-medium">{ranking.customerScore.toFixed(1)}</span>
          </div>
        </div>
        <div className="space-y-2">
          <div className="flex items-center justify-between text-sm">
            <span className="text-slate-400">Quality Score</span>
            <span className="text-purple-400 font-medium">{ranking.qualityScore.toFixed(1)}</span>
          </div>
          <div className="flex items-center justify-between text-sm">
            <span className="text-slate-400">Monthly</span>
            <span className="text-orange-400 font-medium">{ranking.monthlyAchievement.toFixed(1)}%</span>
          </div>
          <div className="flex items-center justify-between text-sm">
            <span className="text-slate-400">Quarterly</span>
            <span className="text-yellow-400 font-medium">{ranking.quarterlyAchievement.toFixed(1)}%</span>
          </div>
        </div>
      </div>

      {/* Score Progress Bar */}
      <div className="mb-4">
        <div className="flex justify-between text-sm text-slate-400 mb-1">
          <span>Overall Performance</span>
          <span>{ranking.totalScore.toFixed(1)}/100</span>
        </div>
        <div className="w-full bg-slate-700/50 rounded-full h-3 border border-yellow-400/20">
          <div
            className={`h-3 rounded-full transition-all duration-300 ${
              ranking.totalScore >= 90 ? 'bg-green-500' :
              ranking.totalScore >= 80 ? 'bg-yellow-500' :
              ranking.totalScore >= 70 ? 'bg-orange-500' : 'bg-red-500'
            }`}
            style={{ width: `${ranking.totalScore}%` }}
          ></div>
        </div>
      </div>

      <div className="flex justify-between items-center pt-4 border-t border-yellow-400/20">
        <div className="flex items-center text-xs text-slate-500">
          <Activity className="h-3 w-3 mr-1" />
          <span>Performance Score: {ranking.totalScore.toFixed(1)}</span>
        </div>
        <div className="flex space-x-2">
          <button className="p-2 text-slate-400 hover:text-blue-400 hover:bg-blue-500/10 rounded-lg transition-all">
            <Eye className="h-4 w-4" />
          </button>
          <button className="p-2 text-slate-400 hover:text-green-400 hover:bg-green-500/10 rounded-lg transition-all">
            <Target className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );
});

const TargetCard: React.FC<{ target: AgentTarget }> = React.memo(({ target }) => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'achieved': return 'bg-green-100 text-green-800 border-green-200';
      case 'missed': return 'bg-red-100 text-red-800 border-red-200';
      case 'extended': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'sales': return DollarSign;
      case 'customers': return Users;
      case 'revenue': return TrendingUp;
      case 'schemes': return Award;
      default: return Target;
    }
  };

  const formatValue = (value: number, unit: string) => {
    if (unit === 'amount') {
      return new Intl.NumberFormat('en-IN', {
        style: 'currency',
        currency: 'INR',
        maximumFractionDigits: 0,
      }).format(value);
    }
    return value.toString();
  };

  const achievementPercentage = (target.achievedValue / target.targetValue) * 100;
  const TypeIcon = getTypeIcon(target.targetType);

  return (
    <div className="bg-slate-800/40 backdrop-blur-xl rounded-2xl p-6 border border-yellow-400/30 hover:border-yellow-400/50 transition-all">
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center space-x-3">
          <div className="p-3 bg-blue-500/20 rounded-xl border border-yellow-400/30">
            <TypeIcon className="h-6 w-6 text-blue-400" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-slate-50 capitalize">{target.targetType} Target</h3>
            <p className="text-sm text-slate-400 capitalize">{target.period} • {target.unit}</p>
          </div>
        </div>
        <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium border ${getStatusColor(target.status)}`}>
          {target.status.toUpperCase()}
        </span>
      </div>

      <div className="space-y-3 mb-4">
        <div className="flex items-center justify-between text-sm">
          <span className="text-slate-400">Target</span>
          <span className="text-slate-50 font-medium">{formatValue(target.targetValue, target.unit)}</span>
        </div>
        <div className="flex items-center justify-between text-sm">
          <span className="text-slate-400">Achieved</span>
          <span className="text-green-400 font-medium">{formatValue(target.achievedValue, target.unit)}</span>
        </div>
        <div className="flex items-center justify-between text-sm">
          <span className="text-slate-400">Achievement</span>
          <span className={`font-medium ${
            achievementPercentage >= 100 ? 'text-green-400' :
            achievementPercentage >= 80 ? 'text-yellow-400' : 'text-red-400'
          }`}>
            {achievementPercentage.toFixed(1)}%
          </span>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="mb-4">
        <div className="w-full bg-slate-700/50 rounded-full h-3 border border-yellow-400/20">
          <div
            className={`h-3 rounded-full transition-all duration-300 ${
              achievementPercentage >= 100 ? 'bg-green-500' :
              achievementPercentage >= 80 ? 'bg-yellow-500' : 'bg-red-500'
            }`}
            style={{ width: `${Math.min(achievementPercentage, 100)}%` }}
          ></div>
        </div>
      </div>

      <div className="flex justify-between items-center pt-4 border-t border-yellow-400/20">
        <div className="flex items-center text-xs text-slate-500">
          <Calendar className="h-3 w-3 mr-1" />
          <span>{new Date(target.startDate).toLocaleDateString()} - {new Date(target.endDate).toLocaleDateString()}</span>
        </div>
        <div className="flex space-x-2">
          <button className="p-2 text-slate-400 hover:text-blue-400 hover:bg-blue-500/10 rounded-lg transition-all">
            <Eye className="h-4 w-4" />
          </button>
          <button className="p-2 text-slate-400 hover:text-green-400 hover:bg-green-500/10 rounded-lg transition-all">
            <Edit className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );
});

export const TargetsRanking: React.FC = () => {
  const [rankings] = useState<AgentRanking[]>(sampleRankings);
  const [targets] = useState<AgentTarget[]>(sampleTargets);
  const [activeTab, setActiveTab] = useState('rankings');
  const [selectedPeriod, setSelectedPeriod] = useState('current-month');

  const stats = useMemo(() => ({
    totalAgents: rankings.length,
    champions: rankings.filter(r => r.badge === 'champion').length,
    stars: rankings.filter(r => r.badge === 'star').length,
    performers: rankings.filter(r => r.badge === 'performer').length,
    rookies: rankings.filter(r => r.badge === 'rookie').length,
    avgScore: rankings.reduce((sum, r) => sum + r.totalScore, 0) / rankings.length,
    topPerformer: rankings[0]?.agentName || 'N/A',
    avgAchievement: rankings.reduce((sum, r) => sum + r.monthlyAchievement, 0) / rankings.length,
    totalTargets: targets.length,
    activeTargets: targets.filter(t => t.status === 'active').length,
    achievedTargets: targets.filter(t => t.status === 'achieved').length,
    missedTargets: targets.filter(t => t.status === 'missed').length
  }), [rankings, targets]);

  const tabs = [
    { id: 'rankings', name: 'Agent Rankings', icon: Trophy, count: rankings.length },
    { id: 'targets', name: 'Targets & Goals', icon: Target, count: targets.length }
  ];

  return (
    <div className="h-full flex flex-col bg-slate-900 overflow-hidden">
      {/* Header */}
      <div className="flex justify-between items-center p-4 border-b border-yellow-400/30 flex-shrink-0">
        <div>
          <h1 className="text-2xl font-bold text-slate-50">Targets & Rankings</h1>
          <p className="mt-1 text-sm text-slate-400">
            Track agent performance, rankings, and target achievements
          </p>
        </div>
        <div className="flex space-x-3">
          <select
            value={selectedPeriod}
            onChange={(e) => setSelectedPeriod(e.target.value)}
            className="px-3 py-2 bg-slate-700/50 border border-yellow-400/30 rounded-lg text-slate-50 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 backdrop-blur-sm"
          >
            <option value="current-month">Current Month</option>
            <option value="current-quarter">Current Quarter</option>
            <option value="current-year">Current Year</option>
          </select>
          <button className="inline-flex items-center px-4 py-2 border border-yellow-400/30 text-sm font-medium rounded-lg text-slate-50 bg-slate-700/50 hover:bg-slate-700 transition-all backdrop-blur-sm">
            <RefreshCw className="h-4 w-4 mr-2" />
            Refresh Rankings
          </button>
          <button className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-lg shadow-sm text-white bg-blue-600 hover:bg-blue-700 transition-all">
            <Plus className="h-4 w-4 mr-2" />
            Set Target
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
                <span className="ml-2 bg-slate-700/50 text-slate-300 px-2 py-1 rounded-full text-xs">
                  {tab.count}
                </span>
              </button>
            );
          })}
        </nav>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto p-4 space-y-6 scrollbar-none">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 lg:grid-cols-12 gap-4">
          <div className="bg-slate-800/40 backdrop-blur-xl p-4 rounded-xl border border-yellow-400/30">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-400">Total Agents</p>
                <p className="text-2xl font-bold text-slate-50">{stats.totalAgents}</p>
              </div>
              <Users className="h-8 w-8 text-blue-400" />
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
                <p className="text-sm text-slate-400">Avg Score</p>
                <p className="text-2xl font-bold text-purple-400">{stats.avgScore.toFixed(1)}</p>
              </div>
              <BarChart3 className="h-8 w-8 text-purple-400" />
            </div>
          </div>
          <div className="bg-slate-800/40 backdrop-blur-xl p-4 rounded-xl border border-yellow-400/30">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-400">Top Performer</p>
                <p className="text-lg font-bold text-yellow-400">{stats.topPerformer}</p>
              </div>
              <Trophy className="h-8 w-8 text-yellow-400" />
            </div>
          </div>
          <div className="bg-slate-800/40 backdrop-blur-xl p-4 rounded-xl border border-yellow-400/30">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-400">Avg Achievement</p>
                <p className="text-2xl font-bold text-orange-400">{stats.avgAchievement.toFixed(1)}%</p>
              </div>
              <Target className="h-8 w-8 text-orange-400" />
            </div>
          </div>
          <div className="bg-slate-800/40 backdrop-blur-xl p-4 rounded-xl border border-yellow-400/30">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-400">Active Targets</p>
                <p className="text-2xl font-bold text-emerald-400">{stats.activeTargets}</p>
              </div>
              <Flag className="h-8 w-8 text-emerald-400" />
            </div>
          </div>
          <div className="bg-slate-800/40 backdrop-blur-xl p-4 rounded-xl border border-yellow-400/30">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-400">Achieved</p>
                <p className="text-2xl font-bold text-green-400">{stats.achievedTargets}</p>
              </div>
              <CheckCircle className="h-8 w-8 text-green-400" />
            </div>
          </div>
          <div className="bg-slate-800/40 backdrop-blur-xl p-4 rounded-xl border border-yellow-400/30">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-400">Missed</p>
                <p className="text-2xl font-bold text-red-400">{stats.missedTargets}</p>
              </div>
              <AlertTriangle className="h-8 w-8 text-red-400" />
            </div>
          </div>
          <div className="bg-slate-800/40 backdrop-blur-xl p-4 rounded-xl border border-yellow-400/30">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-400">Total Targets</p>
                <p className="text-2xl font-bold text-indigo-400">{stats.totalTargets}</p>
              </div>
              <Activity className="h-8 w-8 text-indigo-400" />
            </div>
          </div>
        </div>

        {/* Tab Content */}
        {activeTab === 'rankings' ? (
          <>
            {/* Top 3 Podium */}
            <div className="bg-slate-800/40 backdrop-blur-xl rounded-2xl p-6 border border-yellow-400/30">
              <h3 className="text-lg font-semibold text-slate-50 mb-6 flex items-center">
                <Trophy className="h-5 w-5 mr-2" />
                Top Performers Podium
              </h3>
              <div className="flex items-end justify-center space-x-8">
                {/* 2nd Place */}
                {rankings[1] && (
                  <div className="text-center">
                    <div className="w-20 h-16 bg-gray-500/20 rounded-t-lg flex items-center justify-center border border-yellow-400/30 mb-2">
                      <Medal className="h-8 w-8 text-gray-300" />
                    </div>
                    <div className="bg-slate-700/30 rounded-lg p-3 border border-yellow-400/20">
                      <p className="text-sm font-semibold text-slate-50">{rankings[1].agentName}</p>
                      <p className="text-xs text-slate-400">Score: {rankings[1].totalScore.toFixed(1)}</p>
                    </div>
                  </div>
                )}

                {/* 1st Place */}
                {rankings[0] && (
                  <div className="text-center">
                    <div className="w-24 h-20 bg-yellow-500/20 rounded-t-lg flex items-center justify-center border border-yellow-400/50 mb-2">
                      <Crown className="h-10 w-10 text-yellow-400" />
                    </div>
                    <div className="bg-slate-700/30 rounded-lg p-4 border border-yellow-400/30">
                      <p className="text-lg font-bold text-slate-50">{rankings[0].agentName}</p>
                      <p className="text-sm text-yellow-400">Score: {rankings[0].totalScore.toFixed(1)}</p>
                      <p className="text-xs text-slate-500">🏆 Champion</p>
                    </div>
                  </div>
                )}

                {/* 3rd Place */}
                {rankings[2] && (
                  <div className="text-center">
                    <div className="w-20 h-12 bg-orange-500/20 rounded-t-lg flex items-center justify-center border border-yellow-400/30 mb-2">
                      <Award className="h-6 w-6 text-orange-400" />
                    </div>
                    <div className="bg-slate-700/30 rounded-lg p-3 border border-yellow-400/20">
                      <p className="text-sm font-semibold text-slate-50">{rankings[2].agentName}</p>
                      <p className="text-xs text-slate-400">Score: {rankings[2].totalScore.toFixed(1)}</p>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Rankings Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
              {rankings.map((ranking, index) => (
                <RankingCard key={ranking.agentId} ranking={ranking} index={index} />
              ))}
            </div>
          </>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {targets.map((target) => (
              <TargetCard key={target.id} target={target} />
            ))}
          </div>
        )}

        {/* Chart Placeholders */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-slate-800/40 backdrop-blur-xl rounded-2xl p-6 border border-yellow-400/30">
            <h3 className="text-lg font-semibold text-slate-50 mb-4 flex items-center">
              <BarChart3 className="h-5 w-5 mr-2" />
              Performance Trends
            </h3>
            <div className="h-64 flex items-center justify-center border-2 border-dashed border-yellow-400/30 rounded-xl">
              <div className="text-center">
                <BarChart3 className="h-12 w-12 mx-auto text-slate-400 mb-2" />
                <p className="text-slate-400">Performance Chart</p>
                <p className="text-slate-500 text-sm">Interactive chart coming soon</p>
              </div>
            </div>
          </div>

          <div className="bg-slate-800/40 backdrop-blur-xl rounded-2xl p-6 border border-yellow-400/30">
            <h3 className="text-lg font-semibold text-slate-50 mb-4 flex items-center">
              <PieChart className="h-5 w-5 mr-2" />
              Target Achievement Distribution
            </h3>
            <div className="h-64 flex items-center justify-center border-2 border-dashed border-yellow-400/30 rounded-xl">
              <div className="text-center">
                <PieChart className="h-12 w-12 mx-auto text-slate-400 mb-2" />
                <p className="text-slate-400">Achievement Chart</p>
                <p className="text-slate-500 text-sm">Interactive chart coming soon</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};