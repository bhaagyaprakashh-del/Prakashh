import React from 'react';
import {
  Users,
  Building,
  DollarSign,
  TrendingUp,
  BarChart3,
  Settings,
  Shield,
  Activity,
  Target,
  Award,
  CheckCircle,
  AlertTriangle,
  Clock,
  Eye,
  Plus,
  RefreshCw
} from 'lucide-react';

const AdminDashboard: React.FC = () => {
  const kpis = [
    { label: 'Total Users', value: '156', icon: Users, color: 'text-blue-400', change: '+12' },
    { label: 'Active Branches', value: '8', icon: Building, color: 'text-green-400', change: '+1' },
    { label: 'Monthly Revenue', value: '₹45.2L', icon: DollarSign, color: 'text-emerald-400', change: '+15.2%' },
    { label: 'System Health', value: '98.5%', icon: Activity, color: 'text-purple-400', change: '+0.5%' },
    { label: 'Compliance Score', value: '94%', icon: Shield, color: 'text-orange-400', change: '+2%' },
    { label: 'User Satisfaction', value: '4.8/5', icon: Award, color: 'text-yellow-400', change: '+0.2' }
  ];

  const quickActions = [
    { title: 'Manage Users', description: 'Add, edit, or disable user accounts', icon: Users, action: '/users' },
    { title: 'System Settings', description: 'Configure system parameters', icon: Settings, action: '/settings' },
    { title: 'View Reports', description: 'Access business intelligence', icon: BarChart3, action: '/reports-dashboard' },
    { title: 'Audit Logs', description: 'Review system activities', icon: Activity, action: '/audit-logs' },
    { title: 'Backup & Security', description: 'Manage data protection', icon: Shield, action: '/security' },
    { title: 'Branch Management', description: 'Oversee branch operations', icon: Building, action: '/branches' }
  ];

  const recentActivities = [
    { action: 'New user "Karthik Nair" added to system', time: '2 hours ago', type: 'success' },
    { action: 'System backup completed successfully', time: '4 hours ago', type: 'info' },
    { action: 'Security alert: Failed login attempts detected', time: '6 hours ago', type: 'warning' },
    { action: 'Monthly compliance report generated', time: '1 day ago', type: 'success' },
    { action: 'Database optimization completed', time: '2 days ago', type: 'info' }
  ];

  return (
    <div className="h-full flex flex-col bg-slate-900 overflow-hidden">
      {/* Header */}
      <div className="flex justify-between items-center p-4 border-b border-yellow-400/30 flex-shrink-0">
        <div>
          <h1 className="text-2xl font-bold text-slate-50">Admin Dashboard</h1>
          <p className="mt-1 text-sm text-slate-400">
            System administration and management overview
          </p>
        </div>
        <div className="flex space-x-3">
          <button className="inline-flex items-center px-4 py-2 border border-yellow-400/30 text-sm font-medium rounded-lg text-slate-50 bg-slate-700/50 hover:bg-slate-700 transition-all backdrop-blur-sm">
            <RefreshCw className="h-4 w-4 mr-2" />
            Refresh
          </button>
          <button className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-lg shadow-sm text-white bg-blue-600 hover:bg-blue-700 transition-all">
            <Settings className="h-4 w-4 mr-2" />
            System Settings
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto p-4 space-y-6 thin-scroll">
        {/* KPI Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {kpis.map((kpi, index) => {
            const Icon = kpi.icon;
            return (
              <div key={index} className="bg-slate-800/40 backdrop-blur-xl rounded-2xl p-6 border border-yellow-400/30">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <p className="text-slate-400 text-sm">{kpi.label}</p>
                    <p className={`text-3xl font-bold ${kpi.color}`}>{kpi.value}</p>
                    <p className="text-green-400 text-sm mt-1">{kpi.change}</p>
                  </div>
                  <div className="p-4 bg-slate-700/30 rounded-xl border border-yellow-400/30">
                    <Icon className={`h-8 w-8 ${kpi.color}`} />
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Quick Actions */}
        <div className="bg-slate-800/40 backdrop-blur-xl rounded-2xl p-6 border border-yellow-400/30">
          <h3 className="text-lg font-semibold text-slate-50 mb-6 flex items-center">
            <Target className="h-5 w-5 mr-2" />
            Quick Actions
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {quickActions.map((action, index) => {
              const Icon = action.icon;
              return (
                <button
                  key={index}
                  onClick={() => window.location.href = action.action}
                  className="flex items-center space-x-3 p-4 bg-slate-700/30 hover:bg-slate-700/50 rounded-xl border border-yellow-400/20 hover:border-yellow-400/40 transition-all group text-left"
                >
                  <div className="p-3 bg-blue-500/20 rounded-lg border border-yellow-400/30 group-hover:bg-blue-500/30 transition-all">
                    <Icon className="h-6 w-6 text-blue-400" />
                  </div>
                  <div>
                    <p className="text-slate-50 font-medium">{action.title}</p>
                    <p className="text-slate-400 text-sm">{action.description}</p>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Recent Activities */}
        <div className="bg-slate-800/40 backdrop-blur-xl rounded-2xl p-6 border border-yellow-400/30">
          <h3 className="text-lg font-semibold text-slate-50 mb-6 flex items-center">
            <Activity className="h-5 w-5 mr-2" />
            Recent System Activities
          </h3>
          <div className="space-y-3">
            {recentActivities.map((activity, index) => (
              <div key={index} className="flex items-center space-x-3 p-3 bg-slate-700/30 rounded-xl border border-yellow-400/20">
                <div className={`w-2 h-2 rounded-full ${
                  activity.type === 'success' ? 'bg-green-400' :
                  activity.type === 'warning' ? 'bg-yellow-400' : 'bg-blue-400'
                }`} />
                <div className="flex-1">
                  <p className="text-sm text-slate-50">{activity.action}</p>
                  <p className="text-xs text-slate-400">{activity.time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;