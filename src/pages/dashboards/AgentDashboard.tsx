import React from 'react';
import {
  Target,
  TrendingUp,
  Users,
  DollarSign,
  Calendar,
  Phone,
  MapPin,
  Award,
  Activity,
  Clock,
  Plus,
  Eye
} from 'lucide-react';

const AgentDashboard: React.FC = () => {
  const kpis = [
    { label: 'Monthly Target', value: '₹2.5L', icon: Target, color: 'text-blue-400', change: '68% achieved' },
    { label: 'New Leads', value: '18', icon: Users, color: 'text-green-400', change: '+5 today' },
    { label: 'Conversions', value: '12', icon: TrendingUp, color: 'text-purple-400', change: '67% rate' },
    { label: 'Commission', value: '₹45K', icon: DollarSign, color: 'text-emerald-400', change: 'This month' }
  ];

  const quickActions = [
    { title: 'My Leads', description: 'Manage and follow up leads', icon: Users, action: '/leads-my' },
    { title: 'Schedule Meeting', description: 'Book client meetings', icon: Calendar, action: '/meetings-schedule' },
    { title: 'Call Customers', description: 'Make follow-up calls', icon: Phone, action: '/calls-my' },
    { title: 'Field Visits', description: 'Plan territory visits', icon: MapPin, action: '/visits-my' }
  ];

  const todaySchedule = [
    { time: '10:00 AM', activity: 'Client meeting - Rajesh Kumar', type: 'meeting' },
    { time: '12:30 PM', activity: 'Follow-up call - Priya Sharma', type: 'call' },
    { time: '2:00 PM', activity: 'Field visit - Bangalore East', type: 'visit' },
    { time: '4:30 PM', activity: 'Lead presentation - New prospect', type: 'meeting' }
  ];

  return (
    <div className="h-full flex flex-col bg-slate-900 overflow-hidden">
      {/* Header */}
      <div className="flex justify-between items-center p-4 border-b border-yellow-400/30 flex-shrink-0">
        <div>
          <h1 className="text-2xl font-bold text-slate-50">Agent Dashboard</h1>
          <p className="mt-1 text-sm text-slate-400">
            Your sales performance and customer management hub
          </p>
        </div>
        <div className="flex space-x-3">
          <button className="inline-flex items-center px-4 py-2 border border-yellow-400/30 text-sm font-medium rounded-lg text-slate-50 bg-slate-700/50 hover:bg-slate-700 transition-all backdrop-blur-sm">
            <Plus className="h-4 w-4 mr-2" />
            Add Lead
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

        {/* Today's Schedule */}
        <div className="bg-slate-800/40 backdrop-blur-xl rounded-2xl p-6 border border-yellow-400/30">
          <h3 className="text-lg font-semibold text-slate-50 mb-6">Today's Schedule</h3>
          <div className="space-y-3">
            {todaySchedule.map((item, index) => (
              <div key={index} className="flex items-center justify-between p-4 bg-slate-700/30 rounded-xl border border-yellow-400/20">
                <div className="flex items-center space-x-3">
                  <div className={`w-3 h-3 rounded-full ${
                    item.type === 'meeting' ? 'bg-blue-400' :
                    item.type === 'call' ? 'bg-green-400' : 'bg-purple-400'
                  }`} />
                  <div>
                    <p className="text-slate-50 font-medium">{item.activity}</p>
                    <p className="text-slate-400 text-sm">{item.time}</p>
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

export default AgentDashboard;