import React, { useState, useMemo } from 'react';
import { Target, Award, TrendingUp, Users, DollarSign, Calendar, Star, Trophy, Medal, Crown, Zap, Activity, CheckCircle, AlertTriangle, Clock, Filter, Download, RefreshCw, Eye, CreditCard as Edit, Plus, MoreVertical } from 'lucide-react';
import { Agent, AgentTarget, AgentRanking } from '../../types/agents';

const sampleTargets: AgentTarget[] = [
  {
    id: '1',
    agentId: '1',
    period: 'monthly',
    targetType: 'sales',
    targetValue: 250000,
    achievedValue: 180000,
    unit: 'amount',
    startDate: '2024-03-01',
    endDate: '2024-03-31',
    status: 'active',
    setBy: 'Rajesh Kumar',
    setDate: '2024-02-28',
    notes: 'Increased target due to good performance'
  },
  {
    id: '2',
    agentId: '2',
    period: 'monthly',
    targetType: 'customers',
    targetValue: 15,
    achievedValue: 8,
    unit: 'count',
    startDate: '2024-03-01',
    endDate: '2024-03-31',
    status: 'active',
    setBy: 'Vikram Singh',
    setDate: '2024-02-28'
  },
  {
    id: '3',
    agentId: '3',
    period: 'quarterly',
    targetType: 'revenue',
    targetValue: 540000,
    achievedValue: 485000,
    unit: 'amount',
    startDate: '2024-01-01',
    endDate: '2024-03-31',
    status: 'achieved',
    setBy: 'Rajesh Kumar',
    setDate: '2023-12-15'
  }
];

const sampleRankings: AgentRanking[] = [
  {
    rank: 1,
    agentId: '3',
    agentName: 'Suresh Kumar',
    branch: 'Bangalore West',
    totalScore: 95.8,
    salesScore: 98.2,
    customerScore: 94.8,
    qualityScore: 94.5,
    monthlyAchievement: 91.7,
    quarterlyAchievement: 89.8,
    badge: 'champion',
    trend: 'up',
    previousRank: 2
  },
  {
    rank: 2,
    agentId: '1',
    agentName: 'Vikram Singh',
    branch: 'Bangalore East',
    totalScore: 92.4,
    salesScore: 89.5,
    customerScore: 96.8,
    qualityScore: 90.9,
    monthlyAchievement: 72.0,
    quarterlyAchievement: 86.7,
    badge: 'star',
    trend: 'down',
    previousRank: 1
  },
  {
    rank: 3,
    agentId: '2',
    agentName: 'Priya Reddy',
    branch: 'Bangalore East',
    totalScore: 85.6,
    salesScore: 82.3,
    customerScore: 89.2,
    qualityScore: 85.3,
    monthlyAchievement: 72.5,
    quarterlyAchievement: 70.0,
    badge: 'performer',
    trend: 'up',
    previousRank: 4
  },
  {
    rank: 4,
    agentId: '4',
    agentName: 'Anjali Sharma',
    branch: 'Bangalore Central',
    totalScore: 78.9,
    salesScore: 75.8,
    customerScore: 82.1,
    qualityScore: 78.8,
    monthlyAchievement: 79.2,
    quarterlyAchievement: 79.2,
    badge: 'rookie',
    trend: 'stable',
    previousRank: 4
  }
];

const TargetCard: React.FC<{ target: AgentTarget }> = React.memo(({ target }) => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'achieved': return 'bg-green-100 text-green-800 border-green-200';
      case 'active': return 'bg-blue-100 text-blue-800 border-blue-200';
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
      case 'schemes': return Target;
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
            <p className="text-sm text-slate-400 capitalize">{target.period} • {new Date(target.startDate).toLocaleDateString()}</p>
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
          <span className={`font-medium ${achievementPercentage >= 100 ? 'text-green-400' : achievementPercentage >= 80 ? 'text-blue-400' : 'text-red-400'}`}>
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
              achievementPercentage >= 80 ? 'bg-blue-500' :
              achievementPercentage >= 60 ? 'bg-yellow-500' : 'bg-red-500'
            }`}
            style={{ width: `${Math.min(achievementPercentage, 100)}%` }}
          ></div>
        </div>
      </div>

      <div className="flex justify-between items-center pt-4 border-t border-yellow-400/20">
        <div className="flex items-center text-xs text-slate-500">
          <Calendar className="h-3 w-3 mr-1" />
          <span>Set by {target.setBy}</span>
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

const RankingCard: React.FC<{ ranking: AgentRanking }> = React.memo(({ ranking }) => {
  const getRankColor = (rank: number) => {
    if (rank === 1) return 'text-yellow-400';
    if (rank === 2) return 'text-gray-300';
    if (rank === 3) return 'text-orange-400';
    return 'text-slate-400';
  };

  const getRankIcon = (rank: number) => {
    if (rank === 1) return Crown;
    if (rank === 2) return Medal;
    if (rank === 3) return Trophy;
    return Star;
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
      case 'up': return <TrendingUp className="h-4 w-4 text-green-400" />;
      case 'down': return <TrendingUp className="h-4 w-4 text-red-400 transform rotate-180" />;
      case 'stable': return <Activity className="h-4 w-4 text-yellow-400" />;
      default: return <Activity className="h-4 w-4 text-gray-400" />;
    }
  };

  const RankIcon = getRankIcon(ranking.rank);

  return (
    <div className="bg-slate-800/40 backdrop-blur-xl rounded-2xl p-6 border border-yellow-400/30 hover:border-yellow-400/50 transition-all">
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center space-x-3">
          <div className={`p-3 rounded-xl border border-yellow-400/30 ${
            ranking.rank <= 3 ? 'bg-yellow-500/20' : 'bg-slate-500/20'
          }`}>
            <RankIcon className={`h-6 w-6 ${getRankColor(ranking.rank)}`} />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-slate-50 flex items-center">
              #{ranking.rank} {ranking.agentName}
              {getTrendIcon(ranking.trend)}
            </h3>
            <p className="text-sm text-slate-400">{ranking.branch}</p>
          </div>
        </div>
        <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium border ${getBadgeColor(ranking.badge)}`}>
          {ranking.badge.toUpperCase()}
        </span>
      </div>

      <div className="grid grid-cols-2 gap-4 mb-4">
        <div className="space-y-2">
          <div className="flex items-center justify-between text-sm">
            <span className="text-slate-400">Total Score</span>
            <span className="text-slate-50 font-bold">{ranking.totalScore.toFixed(1)}</span>
          </div>
          <div className="flex items-center justify-between text-sm">
            <span className="text-slate-400">Sales Score</span>
            <span className="text-blue-400 font-medium">{ranking.salesScore.toFixed(1)}</span>
          </div>
          <div className="flex items-center justify-between text-sm">
            <span className="text-slate-400">Customer Score</span>
            <span className="text-green-400 font-medium">{ranking.customerScore.toFixed(1)}</span>
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

      {/* Score Progress */}
      <div className="mb-4">
        <div className="flex justify-between text-sm text-slate-400 mb-1">
          <span>Overall Performance</span>
          <span>{ranking.totalScore.toFixed(1)}/100</span>
        </div>
        <div className="w-full bg-slate-700/50 rounded-full h-2 border border-yellow-400/20">
          <div
            className={`h-2 rounded-full transition-all duration-300 ${
              ranking.totalScore >= 90 ? 'bg-green-500' :
              ranking.totalScore >= 80 ? 'bg-blue-500' :
              ranking.totalScore >= 70 ? 'bg-yellow-500' : 'bg-red-500'
            }`}
            style={{ width: `${ranking.totalScore}%` }}
          ></div>
        </div>
      </div>

      <div className="flex justify-between items-center pt-4 border-t border-yellow-400/20">
        <div className="flex items-center text-xs text-slate-500">
          <span>Previous rank: #{ranking.previousRank}</span>
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

export const TargetsRanking: React.FC = () => {
  const [targets] = useState<AgentTarget[]>(sampleTargets);
  const [rankings] = useState<AgentRanking[]>(sampleRankings);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterPeriod, setFilterPeriod] = useState<string>('all');
  const [activeTab, setActiveTab] = useState('targets');

  const filteredTargets = useMemo(() => targets.filter(target => {
    const matchesSearch = target.targetType.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesPeriod = filterPeriod === 'all' || target.period === filterPeriod;
    
    return matchesSearch && matchesPeriod;
  }), [targets, searchTerm, filterPeriod]);

  const filteredRankings = useMemo(() => rankings.filter(ranking => {
    const matchesSearch = ranking.agentName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         ranking.branch.toLowerCase().includes(searchTerm.toLowerCase());
    
    return matchesSearch;
  }), [rankings, searchTerm]);

  const targetStats = useMemo(() => ({
    total: targets.length,
    active: targets.filter(t => t.status === 'active').length,
    achieved: targets.filter(t => t.status === 'achieved').length,
    missed: targets.filter(t => t.status === 'missed').length,
    extended: targets.filter(t => t.status === 'extended').length,
    avgAchievement: targets.length > 0 ? targets.reduce((sum, t) => sum + (t.achievedValue / t.targetValue * 100), 0) / targets.length : 0
  }), [targets]);

  const rankingStats = useMemo(() => ({
    totalAgents: rankings.length,
    champions: rankings.filter(r => r.badge === 'champion').length,
    stars: rankings.filter(r => r.badge === 'star').length,
    performers: rankings.filter(r => r.badge === 'performer').length,
    rookies: rankings.filter(r => r.badge === 'rookie').length,
    avgScore: rankings.length > 0 ? rankings.reduce((sum, r) => sum + r.totalScore, 0) / rankings.length : 0,
    topPerformer: rankings[0]?.agentName || 'N/A'
  }), [rankings]);

  const tabs = [
    { id: 'targets', name: 'Targets & Goals', icon: Target, count: targets.length },
    { id: 'rankings', name: 'Agent Rankings', icon: Award, count: rankings.length }
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
        {activeTab === 'targets' ? (
          <div className="grid grid-cols-1 md:grid-cols-6 gap-4">
            <div className="bg-slate-800/40 backdrop-blur-xl p-4 rounded-xl border border-yellow-400/30">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-slate-400">Total Targets</p>
                  <p className="text-2xl font-bold text-slate-50">{targetStats.total}</p>
                </div>
                <Target className="h-8 w-8 text-blue-400" />
              </div>
            </div>
            <div className="bg-slate-800/40 backdrop-blur-xl p-4 rounded-xl border border-yellow-400/30">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-slate-400">Active</p>
                  <p className="text-2xl font-bold text-blue-400">{targetStats.active}</p>
                </div>
                <Activity className="h-8 w-8 text-blue-400" />
              </div>
            </div>
            <div className="bg-slate-800/40 backdrop-blur-xl p-4 rounded-xl border border-yellow-400/30">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-slate-400">Achieved</p>
                  <p className="text-2xl font-bold text-green-400">{targetStats.achieved}</p>
                </div>
                <CheckCircle className="h-8 w-8 text-green-400" />
              </div>
            </div>
            <div className="bg-slate-800/40 backdrop-blur-xl p-4 rounded-xl border border-yellow-400/30">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-slate-400">Missed</p>
                  <p className="text-2xl font-bold text-red-400">{targetStats.missed}</p>
                </div>
                <AlertTriangle className="h-8 w-8 text-red-400" />
              </div>
            </div>
            <div className="bg-slate-800/40 backdrop-blur-xl p-4 rounded-xl border border-yellow-400/30">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-slate-400">Extended</p>
                  <p className="text-2xl font-bold text-yellow-400">{targetStats.extended}</p>
                </div>
                <Clock className="h-8 w-8 text-yellow-400" />
              </div>
            </div>
            <div className="bg-slate-800/40 backdrop-blur-xl p-4 rounded-xl border border-yellow-400/30">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-slate-400">Avg Achievement</p>
                  <p className="text-2xl font-bold text-purple-400">{targetStats.avgAchievement.toFixed(1)}%</p>
                </div>
                <TrendingUp className="h-8 w-8 text-purple-400" />
              </div>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-6 gap-4">
            <div className="bg-slate-800/40 backdrop-blur-xl p-4 rounded-xl border border-yellow-400/30">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-slate-400">Total Agents</p>
                  <p className="text-2xl font-bold text-slate-50">{rankingStats.totalAgents}</p>
                </div>
                <Users className="h-8 w-8 text-blue-400" />
              </div>
            </div>
            <div className="bg-slate-800/40 backdrop-blur-xl p-4 rounded-xl border border-yellow-400/30">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-slate-400">Champions</p>
                  <p className="text-2xl font-bold text-red-400">{rankingStats.champions}</p>
                </div>
                <Crown className="h-8 w-8 text-red-400" />
              </div>
            </div>
            <div className="bg-slate-800/40 backdrop-blur-xl p-4 rounded-xl border border-yellow-400/30">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-slate-400">Stars</p>
                  <p className="text-2xl font-bold text-yellow-400">{rankingStats.stars}</p>
                </div>
                <Star className="h-8 w-8 text-yellow-400" />
              </div>
            </div>
            <div className="bg-slate-800/40 backdrop-blur-xl p-4 rounded-xl border border-yellow-400/30">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-slate-400">Performers</p>
                  <p className="text-2xl font-bold text-blue-400">{rankingStats.performers}</p>
                </div>
                <Award className="h-8 w-8 text-blue-400" />
              </div>
            </div>
            <div className="bg-slate-800/40 backdrop-blur-xl p-4 rounded-xl border border-yellow-400/30">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-slate-400">Rookies</p>
                  <p className="text-2xl font-bold text-green-400">{rankingStats.rookies}</p>
                </div>
                <Zap className="h-8 w-8 text-green-400" />
              </div>
            </div>
            <div className="bg-slate-800/40 backdrop-blur-xl p-4 rounded-xl border border-yellow-400/30">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-slate-400">Avg Score</p>
                  <p className="text-2xl font-bold text-purple-400">{rankingStats.avgScore.toFixed(1)}</p>
                </div>
                <TrendingUp className="h-8 w-8 text-purple-400" />
              </div>
            </div>
          </div>
        )}

        {/* Filters */}
        <div className="bg-slate-800/40 backdrop-blur-xl rounded-xl p-4 border border-yellow-400/30">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-500 h-4 w-4" />
              <input
                type="text"
                placeholder={`Search ${activeTab}...`}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-2 bg-slate-700/50 border border-yellow-400/30 rounded-lg w-full text-slate-50 placeholder-slate-400 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 backdrop-blur-sm"
              />
            </div>
            {activeTab === 'targets' && (
              <select
                value={filterPeriod}
                onChange={(e) => setFilterPeriod(e.target.value)}
                className="px-3 py-2 bg-slate-700/50 border border-yellow-400/30 rounded-lg text-slate-50 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 backdrop-blur-sm"
              >
                <option value="all">All Periods</option>
                <option value="monthly">Monthly</option>
                <option value="quarterly">Quarterly</option>
                <option value="yearly">Yearly</option>
              </select>
            )}
            <div className="text-sm text-slate-400">
              Showing: <span className="font-semibold text-slate-50">
                {activeTab === 'targets' ? filteredTargets.length : filteredRankings.length}
              </span> {activeTab}
            </div>
          </div>
        </div>

        {/* Content Display */}
        {activeTab === 'targets' ? (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {filteredTargets.map((target) => (
              <TargetCard key={target.id} target={target} />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {filteredRankings.map((ranking) => (
              <RankingCard key={ranking.agentId} ranking={ranking} />
            ))}
          </div>
        )}

        {((activeTab === 'targets' && filteredTargets.length === 0) || 
          (activeTab === 'rankings' && filteredRankings.length === 0)) && (
          <div className="text-center py-12">
            {activeTab === 'targets' ? (
              <Target className="h-12 w-12 mx-auto text-slate-500 mb-4" />
            ) : (
              <Award className="h-12 w-12 mx-auto text-slate-500 mb-4" />
            )}
            <h3 className="text-lg font-medium text-slate-50 mb-2">
              No {activeTab} found
            </h3>
            <p className="text-sm text-slate-400">Try adjusting your search criteria.</p>
          </div>
        )}
      </div>
    </div>
  );
};