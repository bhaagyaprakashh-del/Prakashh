import React from 'react';
import {
  CheckSquare,
  Calendar,
  Clock,
  Users,
  FileText,
  TrendingUp,
  Target,
  Award,
  Activity,
  Bell,
  Plus,
  Eye
} from 'lucide-react';

const EmployeeDashboard: React.FC = () => {
  const kpis = [
    { label: 'Tasks Completed', value: '24', icon: CheckSquare, color: 'text-green-400', change: '+8 today' },
    { label: 'Pending Tasks', value: '6', icon: Clock, color: 'text-yellow-400', change: '2 overdue' },
    { label: 'Team Meetings', value: '3', icon: Users, color: 'text-blue-400', change: 'This week' },
    { label: 'Reports Submitted', value: '12', icon: FileText, color: 'text-purple-400', change: 'This month' }
  ];

  const quickActions = [
    { title: 'My Tasks', description: 'View and manage assigned tasks', icon: CheckSquare, action: '/tasks-my' },
    { title: 'Team Calendar', description: 'Check team schedules', icon: Calendar, action: '/calendar-team' },
    { title: 'Submit Report', description: 'Submit work reports', icon: FileText, action: '/reports-my' },
    { title: 'Time Tracking', description: 'Log work hours', icon: Clock, action: '/hrms-attendance' }
  ];

  const upcomingTasks = [
    { task: 'Complete monthly sales report', due: '2024-03-16', priority: 'high' },
    { task: 'Client follow-up calls', due: '2024-03-16', priority: 'medium' },
    { task: 'Team meeting preparation', due: '2024-03-17', priority: 'medium' },
    { task: 'Update customer database', due: '2024-03-18', priority: 'low' }
  ];

  return (
    <div className="h-full flex flex-col bg-slate-900 overflow-hidden">
      {/* Header */}
      <div className="flex justify-between items-center p-4 border-b border-yellow-400/30 flex-shrink-0">
        <div>
          <h1 className="text-2xl font-bold text-slate-50">Employee Dashboard</h1>
          <p className="mt-1 text-sm text-slate-400">
            Your personal workspace and task management
          </p>
        </div>
        <div className="flex space-x-3">
          <button className="inline-flex items-center px-4 py-2 border border-yellow-400/30 text-sm font-medium rounded-lg text-slate-50 bg-slate-700/50 hover:bg-slate-700 transition-all backdrop-blur-sm">
            <Bell className="h-4 w-4 mr-2" />
            Notifications
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto p-4 space-y-6 thin-scroll">
        {/* KPI Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {kpis.map((kpi, index) => {
            const Icon = kpi.icon;
            return (
              <div key={index} className="bg-slate-800/40 backdrop-blur-xl rounded-2xl p-6 border border-yellow-400/30">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <p className="text-slate-400 text-sm">{kpi.label}</p>
                    <p className={`text-3xl font-bold ${kpi.color}`}>{kpi.value}</p>
                    <p className="text-slate-400 text-sm mt-1">{kpi.change}</p>
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
          <h3 className="text-lg font-semibold text-slate-50 mb-6">Quick Actions</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
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

        {/* Upcoming Tasks */}
        <div className="bg-slate-800/40 backdrop-blur-xl rounded-2xl p-6 border border-yellow-400/30">
          <h3 className="text-lg font-semibold text-slate-50 mb-6">Upcoming Tasks</h3>
          
          <div className="space-y-3">
            {upcomingTasks.map((task, index) => (
              <div key={index} className="flex items-center justify-between p-4 bg-slate-700/30 rounded-xl border border-yellow-400/20">
                <div className="flex items-center space-x-3">
                  <div className={`w-3 h-3 rounded-full ${
                    task.priority === 'high' ? 'bg-red-400' :
                    task.priority === 'medium' ? 'bg-yellow-400' : 'bg-green-400'
                  }`} />
                  <div>
                    <p className="text-slate-50 font-medium">{task.task}</p>
                    <p className="text-slate-400 text-sm">Due: {task.due}</p>
                  </div>
                </div>
                <button className="text-blue-400 hover:text-blue-300">
                  <Eye className="h-4 w-4" />
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmployeeDashboard;