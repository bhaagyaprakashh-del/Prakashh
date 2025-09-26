import React, { useState, useMemo } from 'react';
import {
  TrendingUp,
  Award,
  Target,
  DollarSign,
  Users,
  Calendar,
  CheckCircle,
  XCircle,
  Clock,
  BarChart3,
  PieChart,
  LineChart,
  Filter,
  Download,
  RefreshCw,
  Eye,
  Star,
  Zap,
  Activity
} from 'lucide-react';
import { Lead } from '../../types/crm';
import { formatCurrency } from '../../utils/calculations';

const sampleConversions = [
  {
    id: '1',
    leadName: 'Meera Nair',
    company: 'Business Consultancy',
    convertedDate: '2024-03-14',
    leadValue: 300000,
    actualValue: 300000,
    timeTaken: 6, // days
    touchPoints: 8,
    assignedTo: 'Priya Sharma',
    source: 'referral',
    conversionStage: 'won',
    chitScheme: 'Premium Gold Chit',
    membershipType: 'Corporate'
  },
  {
    id: '2',
    leadName: 'Kiran Kumar',
    company: 'Retail Chain Pvt Ltd',
    convertedDate: '2024-03-12',
    leadValue: 1000000,
    actualValue: 950000,
    timeTaken: 12,
    touchPoints: 15,
    assignedTo: 'Rajesh Kumar',
    source: 'advertisement',
    conversionStage: 'won',
    chitScheme: 'Corporate Chit Plus',
    membershipType: 'Enterprise'
  },
  {
    id: '3',
    leadName: 'Anita Desai',
    company: 'Individual',
    convertedDate: '2024-03-10',
    leadValue: 150000,
    actualValue: 150000,
    timeTaken: 4,
    touchPoints: 5,
    assignedTo: 'Karthik Nair',
    source: 'website',
    conversionStage: 'won',
    chitScheme: 'Silver Monthly Chit',
    membershipType: 'Individual'
  }
];

const ConversionCard: React.FC<{ conversion: any }> = React.memo(({ conversion }) => {
  const conversionRate = (conversion.actualValue / conversion.leadValue) * 100;
  
  return (
    <div className="bg-slate-800/40 backdrop-blur-xl rounded-2xl p-6 border border-yellow-400/30 hover:border-yellow-400/50 transition-all">
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center space-x-3">
          <div className="h-12 w-12 bg-green-500/20 rounded-full flex items-center justify-center border border-yellow-400/30">
            <Award className="h-6 w-6 text-green-400" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-slate-50">{conversion.leadName}</h3>
            <p className="text-sm text-slate-400">{conversion.company}</p>
          </div>
        </div>
        <div className="text-right">
          <p className="text-sm text-slate-400">Converted</p>
          <p className="text-sm text-green-400 font-medium">{new Date(conversion.convertedDate).toLocaleDateString()}</p>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 mb-4">
        <div className="space-y-2">
          <div className="flex items-center justify-between text-sm">
            <span className="text-slate-400">Lead Value</span>
            <span className="text-slate-50 font-medium">{formatCurrency(conversion.leadValue)}</span>
          </div>
          <div className="flex items-center justify-between text-sm">
            <span className="text-slate-400">Actual Value</span>
            <span className="text-green-400 font-medium">{formatCurrency(conversion.actualValue)}</span>
          </div>
          <div className="flex items-center justify-between text-sm">
            <span className="text-slate-400">Conversion Rate</span>
            <span className="text-blue-400 font-medium">{conversionRate.toFixed(1)}%</span>
          </div>
        </div>
        <div className="space-y-2">
          <div className="flex items-center justify-between text-sm">
            <span className="text-slate-400">Time Taken</span>
            <span className="text-slate-50">{conversion.timeTaken} days</span>
          </div>
          <div className="flex items-center justify-between text-sm">
            <span className="text-slate-400">Touch Points</span>
            <span className="text-slate-50">{conversion.touchPoints}</span>
          </div>
          <div className="flex items-center justify-between text-sm">
            <span className="text-slate-400">Assigned To</span>
            <span className="text-slate-300">{conversion.assignedTo}</span>
          </div>
        </div>
      </div>

      <div className="mb-4 p-3 bg-slate-700/30 rounded-lg border border-yellow-400/20">
        <div className="flex items-center justify-between text-sm mb-1">
          <span className="text-slate-400">Chit Scheme</span>
          <span className="text-blue-400 font-medium">{conversion.chitScheme}</span>
        </div>
        <div className="flex items-center justify-between text-sm">
          <span className="text-slate-400">Membership Type</span>
          <span className="text-purple-400">{conversion.membershipType}</span>
        </div>
      </div>

      <div className="flex justify-between items-center pt-4 border-t border-yellow-400/20">
        <div className="flex items-center text-xs text-slate-500">
          <span className="capitalize">{conversion.source.replace('-', ' ')} lead</span>
        </div>
        <div className="flex space-x-2">
          <button className="p-2 text-slate-400 hover:text-blue-400 hover:bg-blue-500/10 rounded-lg transition-all">
            <Eye className="h-4 w-4" />
          </button>
          <button className="p-2 text-slate-400 hover:text-green-400 hover:bg-green-500/10 rounded-lg transition-all">
            <Download className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );
});

export const Conversions: React.FC = () => {
  const [conversions] = useState(sampleConversions);
  const [selectedPeriod, setSelectedPeriod] = useState('current-month');

  const stats = useMemo(() => ({
    totalConversions: conversions.length,
    totalValue: conversions.reduce((sum, c) => sum + c.actualValue, 0),
    avgConversionTime: conversions.reduce((sum, c) => sum + c.timeTaken, 0) / conversions.length,
    avgTouchPoints: conversions.reduce((sum, c) => sum + c.touchPoints, 0) / conversions.length,
    conversionRate: 85.7, // Mock data
    topPerformer: 'Priya Sharma',
    bestSource: 'Referral',
    avgDealSize: conversions.reduce((sum, c) => sum + c.actualValue, 0) / conversions.length
  }), [conversions]);

  return (
    <div className="h-full flex flex-col bg-slate-900 overflow-hidden">
      {/* Header */}
      <div className="flex justify-between items-center p-4 border-b border-yellow-400/30 flex-shrink-0">
        <div>
          <h1 className="text-2xl font-bold text-slate-50">Conversions & Win Analysis</h1>
          <p className="mt-1 text-sm text-slate-400">
            Track successful conversions and analyze sales performance
          </p>
        </div>
        <div className="flex space-x-3">
          <select
            value={selectedPeriod}
            onChange={(e) => setSelectedPeriod(e.target.value)}
            className="px-3 py-2 bg-slate-700/50 border border-yellow-400/30 rounded-lg text-slate-50 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 backdrop-blur-sm"
          >
            <option value="current-month">Current Month</option>
            <option value="last-month">Last Month</option>
            <option value="current-quarter">Current Quarter</option>
            <option value="current-year">Current Year</option>
          </select>
          <button className="inline-flex items-center px-4 py-2 border border-yellow-400/30 text-sm font-medium rounded-lg text-slate-50 bg-slate-700/50 hover:bg-slate-700 transition-all backdrop-blur-sm">
            <Download className="h-4 w-4 mr-2" />
            Export Report
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto p-4 space-y-6 scrollbar-none">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 lg:grid-cols-8 gap-4">
          <div className="bg-slate-800/40 backdrop-blur-xl p-4 rounded-xl border border-yellow-400/30">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-400">Conversions</p>
                <p className="text-2xl font-bold text-green-400">{stats.totalConversions}</p>
              </div>
              <Award className="h-8 w-8 text-green-400" />
            </div>
          </div>
          <div className="bg-slate-800/40 backdrop-blur-xl p-4 rounded-xl border border-yellow-400/30">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-400">Conversion Rate</p>
                <p className="text-2xl font-bold text-blue-400">{stats.conversionRate}%</p>
              </div>
              <Target className="h-8 w-8 text-blue-400" />
            </div>
          </div>
          <div className="bg-slate-800/40 backdrop-blur-xl p-4 rounded-xl border border-yellow-400/30">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-400">Avg Time</p>
                <p className="text-2xl font-bold text-purple-400">{Math.round(stats.avgConversionTime)}d</p>
              </div>
              <Clock className="h-8 w-8 text-purple-400" />
            </div>
          </div>
          <div className="bg-slate-800/40 backdrop-blur-xl p-4 rounded-xl border border-yellow-400/30">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-400">Avg Touch Points</p>
                <p className="text-2xl font-bold text-orange-400">{Math.round(stats.avgTouchPoints)}</p>
              </div>
              <Activity className="h-8 w-8 text-orange-400" />
            </div>
          </div>
          <div className="bg-slate-800/40 backdrop-blur-xl p-4 rounded-xl border border-yellow-400/30">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-400">Top Performer</p>
                <p className="text-lg font-bold text-yellow-400">{stats.topPerformer}</p>
              </div>
              <Star className="h-8 w-8 text-yellow-400" />
            </div>
          </div>
          <div className="bg-slate-800/40 backdrop-blur-xl p-4 rounded-xl border border-yellow-400/30">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-400">Best Source</p>
                <p className="text-lg font-bold text-emerald-400">{stats.bestSource}</p>
              </div>
              <Zap className="h-8 w-8 text-emerald-400" />
            </div>
          </div>
          <div className="bg-slate-800/40 backdrop-blur-xl p-4 rounded-xl border border-yellow-400/30 md:col-span-2">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-400">Total Revenue</p>
                <p className="text-xl font-bold text-green-400">{formatCurrency(stats.totalValue)}</p>
              </div>
              <DollarSign className="h-8 w-8 text-green-400" />
            </div>
          </div>
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-slate-800/40 backdrop-blur-xl rounded-2xl p-6 border border-yellow-400/30">
            <h3 className="text-lg font-semibold text-slate-50 mb-4 flex items-center">
              <BarChart3 className="h-5 w-5 mr-2" />
              Conversion Funnel
            </h3>
            <div className="h-64 flex items-center justify-center border-2 border-dashed border-yellow-400/30 rounded-xl">
              <div className="text-center">
                <BarChart3 className="h-12 w-12 mx-auto text-slate-400 mb-2" />
                <p className="text-slate-400">Conversion Funnel Chart</p>
                <p className="text-slate-500 text-sm">Interactive chart coming soon</p>
              </div>
            </div>
          </div>

          <div className="bg-slate-800/40 backdrop-blur-xl rounded-2xl p-6 border border-yellow-400/30">
            <h3 className="text-lg font-semibold text-slate-50 mb-4 flex items-center">
              <PieChart className="h-5 w-5 mr-2" />
              Conversion by Source
            </h3>
            <div className="h-64 flex items-center justify-center border-2 border-dashed border-yellow-400/30 rounded-xl">
              <div className="text-center">
                <PieChart className="h-12 w-12 mx-auto text-slate-400 mb-2" />
                <p className="text-slate-400">Source Analysis Chart</p>
                <p className="text-slate-500 text-sm">Interactive chart coming soon</p>
              </div>
            </div>
          </div>
        </div>

        {/* Recent Conversions */}
        <div className="bg-slate-800/40 backdrop-blur-xl rounded-2xl p-6 border border-yellow-400/30">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-slate-50">Recent Conversions</h3>
            <button className="inline-flex items-center px-4 py-2 border border-yellow-400/30 text-sm font-medium rounded-lg text-slate-50 bg-slate-700/50 hover:bg-slate-700 transition-all backdrop-blur-sm">
              <Filter className="h-4 w-4 mr-2" />
              Filter
            </button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {conversions.map((conversion) => (
              <ConversionCard key={conversion.id} conversion={conversion} />
            ))}
          </div>
        </div>

        {/* Performance Metrics */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-slate-800/40 backdrop-blur-xl rounded-2xl p-6 border border-yellow-400/30">
            <h3 className="text-lg font-semibold text-slate-50 mb-4 flex items-center">
              <TrendingUp className="h-5 w-5 mr-2" />
              Sales Team Performance
            </h3>
            <div className="space-y-4">
              {[
                { name: 'Priya Sharma', conversions: 8, value: 2400000, rate: 92 },
                { name: 'Rajesh Kumar', conversions: 6, value: 1800000, rate: 88 },
                { name: 'Karthik Nair', conversions: 5, value: 1200000, rate: 85 },
                { name: 'Vikram Singh', conversions: 4, value: 950000, rate: 80 }
              ].map((performer, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-slate-700/30 rounded-lg border border-yellow-400/20">
                  <div className="flex items-center space-x-3">
                    <div className="h-8 w-8 bg-slate-600/50 rounded-full flex items-center justify-center text-slate-50 font-medium border border-yellow-400/30">
                      {performer.name.split(' ').map(n => n[0]).join('')}
                    </div>
                    <div>
                      <p className="text-sm font-medium text-slate-50">{performer.name}</p>
                      <p className="text-xs text-slate-400">{performer.conversions} conversions</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-medium text-green-400">{formatCurrency(performer.value)}</p>
                    <p className="text-xs text-blue-400">{performer.rate}% rate</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-slate-800/40 backdrop-blur-xl rounded-2xl p-6 border border-yellow-400/30">
            <h3 className="text-lg font-semibold text-slate-50 mb-4 flex items-center">
              <LineChart className="h-5 w-5 mr-2" />
              Monthly Conversion Trends
            </h3>
            <div className="h-64 flex items-center justify-center border-2 border-dashed border-yellow-400/30 rounded-xl">
              <div className="text-center">
                <LineChart className="h-12 w-12 mx-auto text-slate-400 mb-2" />
                <p className="text-slate-400">Monthly Trends Chart</p>
                <p className="text-slate-500 text-sm">Interactive chart coming soon</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};