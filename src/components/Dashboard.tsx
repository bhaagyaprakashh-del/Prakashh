import React from 'react';
import { Users, CreditCard, DollarSign, AlertTriangle, TrendingUp, Calendar } from 'lucide-react';
import { calculateDashboardStats, formatCurrency } from '../utils/calculations';
import { storage } from '../utils/storage';

export const Dashboard: React.FC = () => {
  const stats = calculateDashboardStats();
  const recentPayments = storage.getPayments()
    .filter(p => p.status === 'paid')
    .sort((a, b) => new Date(b.paidDate || '').getTime() - new Date(a.paidDate || '').getTime())
    .slice(0, 5);

  const members = storage.getMembers();
  const schemes = storage.getSchemes().filter(s => s.status === 'active');

  const statCards = [
    {
      name: 'Total Members',
      value: stats.totalMembers,
      icon: Users,
      color: 'bg-blue-500',
      change: '+12%',
      changeType: 'positive',
    },
    {
      name: 'Active Schemes',
      value: stats.activeSchemes,
      icon: CreditCard,
      color: 'bg-green-500',
      change: '+3%',
      changeType: 'positive',
    },
    {
      name: 'Total Collections',
      value: formatCurrency(stats.totalCollections),
      icon: DollarSign,
      color: 'bg-purple-500',
      change: '+8%',
      changeType: 'positive',
    },
    {
      name: 'Pending Payments',
      value: stats.pendingPayments,
      icon: AlertTriangle,
      color: 'bg-yellow-500',
      change: '-2%',
      changeType: 'negative',
    },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
        <p className="mt-2 text-sm text-gray-600">
          Welcome back! Here's what's happening with your chit funds today.
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {statCards.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <div
              key={index}
              className="relative bg-white pt-5 px-4 pb-12 sm:pt-6 sm:px-6 shadow rounded-lg overflow-hidden"
            >
              <dt>
                <div className={`absolute ${stat.color} rounded-md p-3`}>
                  <Icon className="h-6 w-6 text-white" />
                </div>
                <p className="ml-16 text-sm font-medium text-gray-500 truncate">{stat.name}</p>
              </dt>
              <dd className="ml-16 pb-6 flex items-baseline sm:pb-7">
                <p className="text-2xl font-semibold text-gray-900">{stat.value}</p>
                <p
                  className={`ml-2 flex items-baseline text-sm font-semibold ${
                    stat.changeType === 'positive' ? 'text-green-600' : 'text-red-600'
                  }`}
                >
                  <TrendingUp className="self-center flex-shrink-0 h-4 w-4" />
                  <span className="sr-only">
                    {stat.changeType === 'positive' ? 'Increased' : 'Decreased'} by
                  </span>
                  {stat.change}
                </p>
              </dd>
            </div>
          );
        })}
      </div>

      {/* Recent Activity and Quick Actions */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        {/* Recent Payments */}
        <div className="bg-white shadow rounded-lg">
          <div className="px-4 py-5 sm:p-6">
            <h3 className="text-lg leading-6 font-medium text-gray-900 mb-4">Recent Payments</h3>
            <div className="flow-root">
              <ul className="-my-5 divide-y divide-gray-200">
                {recentPayments.map((payment) => {
                  const member = members.find(m => m.id === payment.memberId);
                  const scheme = schemes.find(s => s.id === payment.schemeId);
                  return (
                    <li key={payment.id} className="py-4">
                      <div className="flex items-center space-x-4">
                        <div className="flex-shrink-0">
                          <div className="h-8 w-8 bg-green-100 rounded-full flex items-center justify-center">
                            <DollarSign className="h-4 w-4 text-green-600" />
                          </div>
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium text-gray-900 truncate">
                            {member?.name}
                          </p>
                          <p className="text-sm text-gray-500 truncate">
                            {scheme?.name} • {formatCurrency(payment.amount)}
                          </p>
                        </div>
                        <div className="flex-shrink-0 text-sm text-gray-500">
                          {payment.paidDate}
                        </div>
                      </div>
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>
        </div>

        {/* Active Schemes Overview */}
        <div className="bg-white shadow rounded-lg">
          <div className="px-4 py-5 sm:p-6">
            <h3 className="text-lg leading-6 font-medium text-gray-900 mb-4">Active Schemes</h3>
            <div className="space-y-4">
              {schemes.slice(0, 4).map((scheme) => {
                const progress = (scheme.currentMonth / scheme.duration) * 100;
                return (
                  <div key={scheme.id} className="border border-gray-200 rounded-lg p-4">
                    <div className="flex justify-between items-center mb-2">
                      <h4 className="text-sm font-medium text-gray-900">{scheme.name}</h4>
                      <span className="text-sm text-gray-500">
                        {scheme.currentMonth}/{scheme.duration} months
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                        style={{ width: `${progress}%` }}
                      ></div>
                    </div>
                    <div className="mt-2 flex justify-between text-sm text-gray-600">
                      <span>{formatCurrency(scheme.monthlyContribution)} / month</span>
                      <span>{scheme.members.length} members</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* Monthly Target Progress */}
      <div className="bg-white shadow rounded-lg">
        <div className="px-4 py-5 sm:p-6">
          <h3 className="text-lg leading-6 font-medium text-gray-900 mb-4">Monthly Collection Target</h3>
          <div className="flex items-center justify-between mb-4">
            <div>
              <p className="text-sm text-gray-600">Target: {formatCurrency(stats.monthlyTarget)}</p>
              <p className="text-sm text-gray-600">Collected: {formatCurrency(stats.totalCollections)}</p>
            </div>
            <div className="text-right">
              <p className="text-2xl font-bold text-gray-900">
                {Math.round((stats.totalCollections / stats.monthlyTarget) * 100)}%
              </p>
              <p className="text-sm text-gray-500">Complete</p>
            </div>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-3">
            <div
              className="bg-gradient-to-r from-blue-500 to-green-500 h-3 rounded-full transition-all duration-500"
              style={{ width: `${Math.min((stats.totalCollections / stats.monthlyTarget) * 100, 100)}%` }}
            ></div>
          </div>
        </div>
      </div>
    </div>
  );
};