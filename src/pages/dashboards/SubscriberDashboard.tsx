import React from 'react';
import {
  CreditCard,
  Calendar,
  FileText,
  HelpCircle,
  User,
  DollarSign,
  Clock,
  CheckCircle,
  Activity,
  Bell,
  Download,
  Eye
} from 'lucide-react';

const SubscriberDashboard: React.FC = () => {
  const kpis = [
    { label: 'Active Chits', value: '3', icon: FileText, color: 'text-blue-400', change: '2 ongoing' },
    { label: 'Total Investment', value: '₹1.2L', icon: DollarSign, color: 'text-green-400', change: 'This year' },
    { label: 'Next Payment', value: '₹5K', icon: Calendar, color: 'text-yellow-400', change: 'Due Mar 20' },
    { label: 'Completed Chits', value: '2', icon: CheckCircle, color: 'text-purple-400', change: 'All time' }
  ];

  const quickActions = [
    { title: 'My Profile', description: 'Update personal information', icon: User, action: '/profile-my' },
    { title: 'My Chits', description: 'View chit fund details', icon: FileText, action: '/chits-my' },
    { title: 'Make Payment', description: 'Pay monthly installments', icon: CreditCard, action: '/payments-my' },
    { title: 'Support', description: 'Get help and assistance', icon: HelpCircle, action: '/support-my' }
  ];

  const recentTransactions = [
    { description: 'Monthly payment - Chit Fund A', amount: '₹5,000', date: '2024-03-10', status: 'completed' },
    { description: 'Monthly payment - Chit Fund B', amount: '₹3,000', date: '2024-03-05', status: 'completed' },
    { description: 'Bonus payout - Chit Fund C', amount: '₹2,500', date: '2024-02-28', status: 'received' },
    { description: 'Monthly payment - Chit Fund A', amount: '₹5,000', date: '2024-02-10', status: 'completed' }
  ];

  return (
    <div className="h-full flex flex-col bg-slate-900 overflow-hidden">
      {/* Header */}
      <div className="flex justify-between items-center p-4 border-b border-yellow-400/30 flex-shrink-0">
        <div>
          <h1 className="text-2xl font-bold text-slate-50">Subscriber Dashboard</h1>
          <p className="mt-1 text-sm text-slate-400">
            Your chit fund investments and payment management
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

        {/* Recent Transactions */}
        <div className="bg-slate-800/40 backdrop-blur-xl rounded-2xl p-6 border border-yellow-400/30">
          <h3 className="text-lg font-semibold text-slate-50 mb-6">Recent Transactions</h3>
          <div className="space-y-3">
            {recentTransactions.map((transaction, index) => (
              <div key={index} className="flex items-center justify-between p-4 bg-slate-700/30 rounded-xl border border-yellow-400/20">
                <div className="flex items-center space-x-3">
                  <div className={`w-3 h-3 rounded-full ${
                    transaction.status === 'completed' ? 'bg-green-400' :
                    transaction.status === 'received' ? 'bg-blue-400' : 'bg-yellow-400'
                  }`} />
                  <div>
                    <p className="text-slate-50 font-medium">{transaction.description}</p>
                    <p className="text-slate-400 text-sm">{transaction.date}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className={`font-semibold ${
                    transaction.status === 'received' ? 'text-green-400' : 'text-slate-50'
                  }`}>
                    {transaction.status === 'received' ? '+' : '-'}{transaction.amount}
                  </p>
                  <button className="text-blue-400 hover:text-blue-300 text-sm">
                    <Eye className="h-4 w-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SubscriberDashboard;