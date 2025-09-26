import React, { useState, useMemo } from 'react';
import {
  DollarSign,
  TrendingUp,
  Calendar,
  CheckCircle,
  Clock,
  AlertTriangle,
  Users,
  FileText,
  Plus,
  Eye,
  MoreHorizontal,
  Download,
  Target,
  Bell,
  Activity,
  Star,
  Award,
  CreditCard,
  Building,
  Phone,
  Mail,
  MapPin,
  Zap,
  BarChart3,
  PieChart,
  LineChart,
  RefreshCw,
  Filter,
  Settings,
  User,
  Shield,
  Gavel,
  XCircle
} from 'lucide-react';

const StatCard: React.FC<{
  title: string;
  value: string;
  icon: React.ComponentType<any>;
  color: string;
  change?: string;
  changeType?: 'positive' | 'negative';
}> = ({ title, value, icon: Icon, color, change, changeType }) => {
  return (
    <div className="bg-slate-800/40 backdrop-blur-xl rounded-2xl p-6 border border-yellow-400/30 hover:border-yellow-400/50 transition-all">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-slate-400 text-sm mb-1">{title}</p>
          <p className="text-slate-50 text-3xl font-bold">{value}</p>
          {change && (
            <p className={`text-sm mt-1 ${changeType === 'positive' ? 'text-green-400' : 'text-red-400'}`}>
              {change}
            </p>
          )}
        </div>
        <div className={`p-4 rounded-xl ${color}/20 border border-yellow-400/30`}>
          <Icon className={`h-8 w-8 ${color.replace('bg-', 'text-')}`} />
        </div>
      </div>
    </div>
  );
};

const ChartCard: React.FC<{
  title: string;
  icon: React.ComponentType<any>;
  children: React.ReactNode;
}> = ({ title, icon: Icon, children }) => {
  return (
    <div className="bg-slate-800/40 backdrop-blur-xl rounded-2xl p-6 border border-yellow-400/30">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-slate-50 text-lg font-semibold flex items-center">
          <Icon className="h-5 w-5 mr-2 text-blue-400" />
          {title}
        </h3>
        <button className="p-2 text-slate-400 hover:text-slate-50 hover:bg-slate-700/50 rounded-lg transition-all">
          <MoreHorizontal className="h-4 w-4" />
        </button>
      </div>
      {children}
    </div>
  );
};

const TodayActionCard: React.FC<{
  title: string;
  description: string;
  time: string;
  type: 'meeting' | 'call' | 'deadline' | 'follow-up';
  priority: 'high' | 'medium' | 'low';
  assignee: string;
}> = ({ title, description, time, type, priority, assignee }) => {
  const getTypeColor = (type: string) => {
    switch (type) {
      case 'meeting': return 'bg-blue-500/20 text-blue-400 border-blue-500/30';
      case 'call': return 'bg-green-500/20 text-green-400 border-green-500/30';
      case 'deadline': return 'bg-red-500/20 text-red-400 border-red-500/30';
      case 'follow-up': return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30';
      default: return 'bg-gray-500/20 text-gray-400 border-gray-500/30';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'bg-red-500';
      case 'medium': return 'bg-yellow-500';
      case 'low': return 'bg-green-500';
      default: return 'bg-gray-500';
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'meeting': return Users;
      case 'call': return Phone;
      case 'deadline': return Clock;
      case 'follow-up': return Bell;
      default: return Activity;
    }
  };

  const TypeIcon = getTypeIcon(type);

  return (
    <div className="bg-slate-700/30 rounded-xl p-4 border border-yellow-400/20 hover:border-yellow-400/40 transition-all">
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center space-x-3">
          <div className={`p-2 rounded-lg border ${getTypeColor(type)}`}>
            <TypeIcon className="h-4 w-4" />
          </div>
          <div>
            <h4 className="text-slate-50 font-medium">{title}</h4>
            <p className="text-slate-400 text-sm">{description}</p>
          </div>
        </div>
        <div className={`w-3 h-3 rounded-full ${getPriorityColor(priority)}`}></div>
      </div>
      
      <div className="flex items-center justify-between text-sm">
        <div className="flex items-center space-x-2">
          <Clock className="h-3 w-3 text-slate-500" />
          <span className="text-slate-300">{time}</span>
        </div>
        <span className="text-slate-400">{assignee}</span>
      </div>
    </div>
  );
};

const AlertCard: React.FC<{
  title: string;
  message: string;
  type: 'warning' | 'error' | 'info';
  timestamp: string;
  actionText?: string;
  onAction?: () => void;
}> = ({ title, message, type, timestamp, actionText, onAction }) => {
  const getAlertColor = (type: string) => {
    switch (type) {
      case 'warning': return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30';
      case 'error': return 'bg-red-500/20 text-red-400 border-red-500/30';
      case 'info': return 'bg-blue-500/20 text-blue-400 border-blue-500/30';
      default: return 'bg-gray-500/20 text-gray-400 border-gray-500/30';
    }
  };

  const getAlertIcon = (type: string) => {
    switch (type) {
      case 'warning': return AlertTriangle;
      case 'error': return XCircle;
      case 'info': return Bell;
      default: return Bell;
    }
  };

  const AlertIcon = getAlertIcon(type);

  return (
    <div className="bg-slate-700/30 rounded-xl p-4 border border-yellow-400/20">
      <div className="flex items-start space-x-3">
        <div className={`p-2 rounded-lg border ${getAlertColor(type)}`}>
          <AlertIcon className="h-4 w-4" />
        </div>
        <div className="flex-1">
          <h4 className="text-slate-50 font-medium mb-1">{title}</h4>
          <p className="text-slate-400 text-sm mb-2">{message}</p>
          <div className="flex items-center justify-between">
            <span className="text-slate-500 text-xs">{timestamp}</span>
            {actionText && onAction && (
              <button
                onClick={onAction}
                className="text-blue-400 hover:text-blue-300 text-xs font-medium"
              >
                {actionText}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

const UserActivityCard: React.FC<{
  user: {
    id: string;
    name: string;
    avatar?: string;
    role: string;
    department: string;
    status: 'online' | 'away' | 'offline';
    lastActivity: string;
    currentTask?: string;
    completedToday: number;
    location?: string;
  };
}> = ({ user }) => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'online': return 'bg-green-400';
      case 'away': return 'bg-yellow-400';
      case 'offline': return 'bg-gray-400';
      default: return 'bg-gray-400';
    }
  };

  return (
    <div className="bg-slate-700/30 rounded-xl p-4 border border-yellow-400/20 hover:border-yellow-400/40 transition-all">
      <div className="flex items-center space-x-3 mb-3">
        <div className="relative">
          <div className="h-12 w-12 bg-slate-600/50 rounded-full flex items-center justify-center text-slate-50 font-semibold border border-yellow-400/30">
            {user.name.split(' ').map(n => n[0]).join('')}
          </div>
          <div className={`absolute -bottom-1 -right-1 w-4 h-4 ${getStatusColor(user.status)} rounded-full border-2 border-slate-800`}></div>
        </div>
        <div className="flex-1">
          <h4 className="text-slate-50 font-medium">{user.name}</h4>
          <p className="text-slate-400 text-sm">{user.role}</p>
          <p className="text-slate-500 text-xs">{user.department}</p>
        </div>
      </div>

      <div className="space-y-2 text-sm">
        {user.currentTask && (
          <div className="flex items-center space-x-2">
            <Activity className="h-3 w-3 text-blue-400" />
            <span className="text-slate-300">{user.currentTask}</span>
          </div>
        )}
        <div className="flex items-center space-x-2">
          <CheckCircle className="h-3 w-3 text-green-400" />
          <span className="text-slate-300">{user.completedToday} tasks completed today</span>
        </div>
        {user.location && (
          <div className="flex items-center space-x-2">
            <MapPin className="h-3 w-3 text-purple-400" />
            <span className="text-slate-300">{user.location}</span>
          </div>
        )}
        <div className="flex items-center space-x-2">
          <Clock className="h-3 w-3 text-slate-500" />
          <span className="text-slate-400 text-xs">Last active: {user.lastActivity}</span>
        </div>
      </div>
    </div>
  );
};

export const DashboardHome: React.FC<{ onPageChange: (page: string) => void }> = ({ onPageChange }) => {
  const [selectedPeriod, setSelectedPeriod] = useState('today');

  // Sample data
  const todayActions = [
    {
      title: 'Client Meeting - TechCorp',
      description: 'Present premium chit scheme proposal',
      time: '10:00 AM',
      type: 'meeting' as const,
      priority: 'high' as const,
      assignee: 'Priya Sharma'
    },
    {
      title: 'Follow-up Call - Sunita Reddy',
      description: 'Discuss silver scheme options',
      time: '2:30 PM',
      type: 'call' as const,
      priority: 'medium' as const,
      assignee: 'Karthik Nair'
    },
    {
      title: 'Premium Gold A1 Auction',
      description: 'Monthly auction for group A1',
      time: '4:00 PM',
      type: 'deadline' as const,
      priority: 'high' as const,
      assignee: 'Vikram Singh'
    },
    {
      title: 'Payment Reminder - Group B2',
      description: 'Send payment reminders to members',
      time: '5:00 PM',
      type: 'follow-up' as const,
      priority: 'medium' as const,
      assignee: 'Priya Sharma'
    }
  ];

  const alerts = [
    {
      title: 'Payment Overdue Alert',
      message: '5 members have overdue payments in Silver Monthly B1 group',
      type: 'warning' as const,
      timestamp: '2 hours ago',
      actionText: 'View Details',
      onAction: () => onPageChange('chit-list')
    },
    {
      title: 'KYC Verification Required',
      message: '8 new subscribers pending KYC verification',
      type: 'info' as const,
      timestamp: '4 hours ago',
      actionText: 'Review KYC',
      onAction: () => onPageChange('subscribers-all')
    },
    {
      title: 'System Backup Completed',
      message: 'Daily system backup completed successfully',
      type: 'info' as const,
      timestamp: '6 hours ago'
    }
  ];

  const userActivities = [
    {
      id: '1',
      name: 'Priya Sharma',
      role: 'Senior Sales Executive',
      department: 'Sales & Marketing',
      status: 'online' as const,
      lastActivity: '2 minutes ago',
      currentTask: 'Preparing client presentation',
      completedToday: 8,
      location: 'Bangalore Main Office'
    },
    {
      id: '2',
      name: 'Karthik Nair',
      role: 'Chit Fund Manager',
      department: 'Operations',
      status: 'online' as const,
      lastActivity: '5 minutes ago',
      currentTask: 'Processing group payments',
      completedToday: 12,
      location: 'Bangalore South Branch'
    },
    {
      id: '3',
      name: 'Rajesh Kumar',
      role: 'Branch Manager',
      department: 'Operations',
      status: 'away' as const,
      lastActivity: '15 minutes ago',
      currentTask: 'Branch inspection visit',
      completedToday: 6,
      location: 'Field Visit'
    },
    {
      id: '4',
      name: 'Vikram Singh',
      role: 'Business Development',
      department: 'Sales & Marketing',
      status: 'online' as const,
      lastActivity: '1 minute ago',
      currentTask: 'Customer acquisition calls',
      completedToday: 15,
      location: 'Bangalore East Branch'
    },
    {
      id: '5',
      name: 'Anita Desai',
      role: 'Customer Relations',
      department: 'Customer Service',
      status: 'online' as const,
      lastActivity: '3 minutes ago',
      currentTask: 'Handling customer queries',
      completedToday: 9,
      location: 'Bangalore Main Office'
    },
    {
      id: '6',
      name: 'Deepika Rao',
      role: 'HR Manager',
      department: 'Human Resources',
      status: 'offline' as const,
      lastActivity: '2 hours ago',
      completedToday: 4,
      location: 'Bangalore Main Office'
    }
  ];

  const kpiData = [
    { label: 'Total Revenue', value: '₹45.2L', change: '+12.5%', changeType: 'positive' as const },
    { label: 'Active Groups', value: '38', change: '+3', changeType: 'positive' as const },
    { label: 'New Subscribers', value: '89', change: '+15.2%', changeType: 'positive' as const },
    { label: 'Collection Rate', value: '94.8%', change: '+2.1%', changeType: 'positive' as const },
    { label: 'Pending Payments', value: '₹8.5L', change: '-5.3%', changeType: 'positive' as const },
    { label: 'Customer Satisfaction', value: '4.7/5', change: '+0.2', changeType: 'positive' as const }
  ];

  const chartData = useMemo(() => {
    // Sample chart data
    return {
      revenue: [65, 45, 85, 35, 75, 55, 95, 25, 65, 45, 35, 85],
      groups: [12, 15, 18, 22, 28, 32, 35, 38, 42, 45, 48, 52],
      collections: [88, 92, 85, 94, 89, 96, 91, 94, 87, 93, 95, 94]
    };
  }, []);

  return (
    <div className="h-full flex flex-col bg-slate-900 overflow-hidden">
      {/* Header */}
      <div className="flex justify-between items-center p-4 border-b border-yellow-400/30 flex-shrink-0">
        <div>
          <h1 className="text-2xl font-bold text-slate-50">Dashboard Overview</h1>
          <p className="mt-1 text-sm text-slate-400">
            Comprehensive business overview with real-time metrics and insights
          </p>
        </div>
        <div className="flex space-x-3">
          <select
            value={selectedPeriod}
            onChange={(e) => setSelectedPeriod(e.target.value)}
            className="px-3 py-2 bg-slate-700/50 border border-yellow-400/30 rounded-lg text-slate-50 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 backdrop-blur-sm"
          >
            <option value="today">Today</option>
            <option value="week">This Week</option>
            <option value="month">This Month</option>
            <option value="quarter">This Quarter</option>
          </select>
          <button className="inline-flex items-center px-4 py-2 border border-yellow-400/30 text-sm font-medium rounded-lg text-slate-50 bg-slate-700/50 hover:bg-slate-700 transition-all backdrop-blur-sm">
            <RefreshCw className="h-4 w-4 mr-2" />
            Refresh
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto p-4 space-y-6 scrollbar-none">
        {/* Overview Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <StatCard
            title="Total Revenue"
            value="₹45.2L"
            icon={DollarSign}
            color="bg-green-500"
            change="+12.5% from last month"
            changeType="positive"
          />
          <StatCard
            title="Active Chit Groups"
            value="38"
            icon={CreditCard}
            color="bg-blue-500"
            change="+3 new groups"
            changeType="positive"
          />
          <StatCard
            title="Total Subscribers"
            value="2,847"
            icon={Users}
            color="bg-purple-500"
            change="+89 this month"
            changeType="positive"
          />
          <StatCard
            title="Collection Rate"
            value="94.8%"
            icon={Target}
            color="bg-orange-500"
            change="+2.1% improvement"
            changeType="positive"
          />
        </div>

        {/* KPIs & Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <ChartCard title="Revenue Trends" icon={BarChart3}>
            <div className="h-64 flex items-end justify-between space-x-2">
              {chartData.revenue.map((value, index) => (
                <div key={index} className="flex flex-col items-center flex-1">
                  <div
                    className="w-full bg-gradient-to-t from-blue-500 to-green-500 rounded-sm transition-all duration-300 hover:opacity-80"
                    style={{ height: `${value * 2}px` }}
                  />
                  <span className="text-slate-400 text-xs mt-2">
                    {['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'][index]}
                  </span>
                </div>
              ))}
            </div>
          </ChartCard>

          <ChartCard title="Group Performance" icon={PieChart}>
            <div className="h-64 flex items-center justify-center">
              <div className="relative w-48 h-48">
                <div className="absolute inset-0 rounded-full border-8 border-slate-700/50"></div>
                <div className="absolute inset-0 rounded-full border-8 border-green-500 border-t-transparent border-r-transparent transform rotate-45"></div>
                <div className="absolute inset-4 rounded-full border-8 border-blue-500 border-b-transparent border-l-transparent transform -rotate-45"></div>
                <div className="absolute inset-8 rounded-full border-8 border-purple-500 border-t-transparent border-r-transparent"></div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center">
                    <p className="text-2xl font-bold text-slate-50">38</p>
                    <p className="text-slate-400 text-sm">Active Groups</p>
                  </div>
                </div>
              </div>
            </div>
          </ChartCard>
        </div>

        {/* Today's Actions & Alerts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-slate-800/40 backdrop-blur-xl rounded-2xl p-6 border border-yellow-400/30">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-slate-50 text-lg font-semibold flex items-center">
                <Calendar className="h-5 w-5 mr-2 text-blue-400" />
                Today's Actions
              </h3>
              <button
                onClick={() => onPageChange('tasks-my')}
                className="text-blue-400 hover:text-blue-300 text-sm font-medium"
              >
                View All
              </button>
            </div>
            <div className="space-y-4">
              {todayActions.map((action, index) => (
                <TodayActionCard key={index} {...action} />
              ))}
            </div>
          </div>

          <div className="bg-slate-800/40 backdrop-blur-xl rounded-2xl p-6 border border-yellow-400/30">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-slate-50 text-lg font-semibold flex items-center">
                <Bell className="h-5 w-5 mr-2 text-orange-400" />
                Alerts & Notifications
              </h3>
              <button className="text-orange-400 hover:text-orange-300 text-sm font-medium">
                View All
              </button>
            </div>
            <div className="space-y-4">
              {alerts.map((alert, index) => (
                <AlertCard key={index} {...alert} />
              ))}
            </div>
          </div>
        </div>

        {/* KPIs Grid */}
        <div className="bg-slate-800/40 backdrop-blur-xl rounded-2xl p-6 border border-yellow-400/30">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-slate-50 text-lg font-semibold flex items-center">
              <BarChart3 className="h-5 w-5 mr-2 text-green-400" />
              Key Performance Indicators
            </h3>
            <button
              onClick={() => onPageChange('reports-dashboard')}
              className="text-green-400 hover:text-green-300 text-sm font-medium"
            >
              View Reports
            </button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {kpiData.map((kpi, index) => (
              <div key={index} className="bg-slate-700/30 rounded-xl p-4 border border-yellow-400/20">
                <div className="flex items-center justify-between mb-2">
                  <p className="text-slate-400 text-sm">{kpi.label}</p>
                  <TrendingUp className="h-4 w-4 text-green-400" />
                </div>
                <p className="text-slate-50 text-2xl font-bold mb-1">{kpi.value}</p>
                <p className={`text-sm ${kpi.changeType === 'positive' ? 'text-green-400' : 'text-red-400'}`}>
                  {kpi.change}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* User Activity */}
        <div className="bg-slate-800/40 backdrop-blur-xl rounded-2xl p-6 border border-yellow-400/30">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-slate-50 text-lg font-semibold flex items-center">
              <Users className="h-5 w-5 mr-2 text-purple-400" />
              Team Activity
            </h3>
            <button
              onClick={() => onPageChange('users')}
              className="text-purple-400 hover:text-purple-300 text-sm font-medium"
            >
              View All Users
            </button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {userActivities.map((user) => (
              <UserActivityCard key={user.id} user={user} />
            ))}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="bg-slate-800/40 backdrop-blur-xl rounded-2xl p-6 border border-yellow-400/30">
          <h3 className="text-slate-50 text-lg font-semibold mb-6 flex items-center">
            <Zap className="h-5 w-5 mr-2 text-yellow-400" />
            Quick Actions
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <button
              onClick={() => onPageChange('leads-new')}
              className="flex items-center space-x-3 p-4 bg-slate-700/30 hover:bg-slate-700/50 rounded-xl border border-yellow-400/20 hover:border-yellow-400/40 transition-all group"
            >
              <div className="p-3 bg-blue-500/20 rounded-lg border border-yellow-400/30 group-hover:bg-blue-500/30 transition-all">
                <Plus className="h-6 w-6 text-blue-400" />
              </div>
              <div>
                <p className="text-slate-50 font-medium">Add New Lead</p>
                <p className="text-slate-400 text-sm">Capture new prospects</p>
              </div>
            </button>

            <button
              onClick={() => onPageChange('chit-create')}
              className="flex items-center space-x-3 p-4 bg-slate-700/30 hover:bg-slate-700/50 rounded-xl border border-yellow-400/20 hover:border-yellow-400/40 transition-all group"
            >
              <div className="p-3 bg-green-500/20 rounded-lg border border-yellow-400/30 group-hover:bg-green-500/30 transition-all">
                <CreditCard className="h-6 w-6 text-green-400" />
              </div>
              <div>
                <p className="text-slate-50 font-medium">Create Chit Group</p>
                <p className="text-slate-400 text-sm">Start new group</p>
              </div>
            </button>

            <button
              onClick={() => onPageChange('subscribers-new')}
              className="flex items-center space-x-3 p-4 bg-slate-700/30 hover:bg-slate-700/50 rounded-xl border border-yellow-400/20 hover:border-yellow-400/40 transition-all group"
            >
              <div className="p-3 bg-purple-500/20 rounded-lg border border-yellow-400/30 group-hover:bg-purple-500/30 transition-all">
                <User className="h-6 w-6 text-purple-400" />
              </div>
              <div>
                <p className="text-slate-50 font-medium">Add Subscriber</p>
                <p className="text-slate-400 text-sm">Onboard new member</p>
              </div>
            </button>

            <button
              onClick={() => onPageChange('reports-dashboard')}
              className="flex items-center space-x-3 p-4 bg-slate-700/30 hover:bg-slate-700/50 rounded-xl border border-yellow-400/20 hover:border-yellow-400/40 transition-all group"
            >
              <div className="p-3 bg-orange-500/20 rounded-lg border border-yellow-400/30 group-hover:bg-orange-500/30 transition-all">
                <BarChart3 className="h-6 w-6 text-orange-400" />
              </div>
              <div>
                <p className="text-slate-50 font-medium">Generate Report</p>
                <p className="text-slate-400 text-sm">Business analytics</p>
              </div>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};