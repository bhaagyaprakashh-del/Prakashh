import React, { useState } from 'react';
import {
  BarChart3,
  Download,
  Calendar,
  Users,
  DollarSign,
  TrendingUp,
  Target,
  Award,
  PieChart,
  LineChart,
  Activity,
  Filter,
  RefreshCw,
  Eye,
  Share2,
  Settings,
  CheckCircle,
  AlertTriangle,
  Star,
  CreditCard,
  Shield
} from 'lucide-react';
import { formatCurrency } from '../../utils/calculations';

const ReportCard: React.FC<{
  title: string;
  description: string;
  icon: React.ComponentType<any>;
  color: string;
  lastGenerated?: string;
  frequency: string;
  onGenerate: () => void;
  onView: () => void;
}> = ({ title, description, icon: Icon, color, lastGenerated, frequency, onGenerate, onView }) => {
  return (
    <div className="bg-slate-800/40 backdrop-blur-xl rounded-2xl p-6 border border-yellow-400/30 hover:border-yellow-400/50 transition-all">
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center space-x-3">
          <div className={`p-3 ${color}/20 rounded-xl border border-yellow-400/30`}>
            <Icon className={`h-6 w-6 ${color.replace('bg-', 'text-')}`} />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-slate-50">{title}</h3>
            <p className="text-sm text-slate-400">{description}</p>
          </div>
        </div>
      </div>

      <div className="space-y-2 mb-4">
        <div className="flex items-center justify-between text-sm">
          <span className="text-slate-400">Frequency</span>
          <span className="text-slate-50 font-medium capitalize">{frequency}</span>
        </div>
        <div className="flex items-center justify-between text-sm">
          <span className="text-slate-400">Last Generated</span>
          <span className="text-slate-300">{lastGenerated || 'Never'}</span>
        </div>
      </div>

      <div className="flex justify-end space-x-2 pt-4 border-t border-yellow-400/20">
        <button
          onClick={onView}
          className="p-2 text-slate-400 hover:text-blue-400 hover:bg-blue-500/10 rounded-lg transition-all"
        >
          <Eye className="h-4 w-4" />
        </button>
        <button
          onClick={onGenerate}
          className="p-2 text-slate-400 hover:text-green-400 hover:bg-green-500/10 rounded-lg transition-all"
        >
          <Download className="h-4 w-4" />
        </button>
        <button className="p-2 text-slate-400 hover:text-purple-400 hover:bg-purple-500/10 rounded-lg transition-all">
          <Share2 className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
};

export const SubscribersReports: React.FC = () => {
  const [selectedPeriod, setSelectedPeriod] = useState('current-month');

  const reports = [
    {
      id: 'subscriber-portfolio',
      title: 'Subscriber Portfolio Report',
      description: 'Comprehensive subscriber analysis with investment patterns',
      icon: Users,
      color: 'bg-blue-500',
      lastGenerated: '2024-03-15',
      frequency: 'monthly'
    },
    {
      id: 'kyc-compliance',
      title: 'KYC Compliance Report',
      description: 'KYC verification status and compliance tracking',
      icon: Shield,
      color: 'bg-green-500',
      lastGenerated: '2024-03-14',
      frequency: 'weekly'
    },
    {
      id: 'payment-analysis',
      title: 'Payment Behavior Analysis',
      description: 'Payment patterns and default risk assessment',
      icon: DollarSign,
      color: 'bg-purple-500',
      lastGenerated: '2024-03-12',
      frequency: 'monthly'
    },
    {
      id: 'membership-trends',
      title: 'Membership Growth Trends',
      description: 'New subscriber acquisition and retention analysis',
      icon: TrendingUp,
      color: 'bg-orange-500',
      lastGenerated: '2024-03-10',
      frequency: 'monthly'
    },
    {
      id: 'risk-assessment',
      title: 'Risk Assessment Report',
      description: 'Credit risk analysis and portfolio health metrics',
      icon: Target,
      color: 'bg-red-500',
      lastGenerated: '2024-03-08',
      frequency: 'quarterly'
    },
    {
      id: 'tier-performance',
      title: 'Tier Performance Analysis',
      description: 'Performance comparison across membership tiers',
      icon: Award,
      color: 'bg-yellow-500',
      lastGenerated: '2024-03-05',
      frequency: 'monthly'
    }
  ];

  const quickStats = [
    { label: 'Total Subscribers', value: '2,847', icon: Users, color: 'text-blue-400' },
    { label: 'Active Members', value: '2,654', icon: CheckCircle, color: 'text-green-400' },
    { label: 'KYC Verified', value: '2,580', icon: Shield, color: 'text-purple-400' },
    { label: 'Total Investments', value: '₹45.2Cr', icon: DollarSign, color: 'text-emerald-400' },
    { label: 'Avg Credit Score', value: '782', icon: Star, color: 'text-yellow-400' },
    { label: 'Default Rate', value: '2.1%', icon: AlertTriangle, color: 'text-red-400' }
  ];

  const handleGenerateReport = (reportId: string) => {
    console.log(`Generating report: ${reportId}`);
    // Implement report generation logic
  };

  const handleViewReport = (reportId: string) => {
    console.log(`Viewing report: ${reportId}`);
    // Implement report viewing logic
  };

  return (
    <div className="h-full flex flex-col bg-slate-900 overflow-hidden">
      {/* Header */}
      <div className="flex justify-between items-center p-4 border-b border-yellow-400/30 flex-shrink-0">
        <div>
          <h1 className="text-2xl font-bold text-slate-50">Subscribers Reports</h1>
          <p className="mt-1 text-sm text-slate-400">
            Comprehensive subscriber analytics and performance reporting
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
            <RefreshCw className="h-4 w-4 mr-2" />
            Refresh Data
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto p-4 space-y-6 scrollbar-none">
        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {quickStats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <div key={index} className="bg-slate-800/40 backdrop-blur-xl p-4 rounded-xl border border-yellow-400/30">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-slate-400">{stat.label}</p>
                    <p className={`text-2xl font-bold ${stat.color}`}>{stat.value}</p>
                  </div>
                  <Icon className={`h-8 w-8 ${stat.color}`} />
                </div>
              </div>
            );
          })}
        </div>

        {/* Reports Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {reports.map((report) => (
            <ReportCard
              key={report.id}
              title={report.title}
              description={report.description}
              icon={report.icon}
              color={report.color}
              lastGenerated={report.lastGenerated}
              frequency={report.frequency}
              onGenerate={() => handleGenerateReport(report.id)}
              onView={() => handleViewReport(report.id)}
            />
          ))}
        </div>

        {/* Chart Placeholders */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-slate-800/40 backdrop-blur-xl rounded-2xl p-6 border border-yellow-400/30">
            <h3 className="text-lg font-semibold text-slate-50 mb-4 flex items-center">
              <BarChart3 className="h-5 w-5 mr-2" />
              Subscriber Growth Trends
            </h3>
            <div className="h-64 flex items-center justify-center border-2 border-dashed border-yellow-400/30 rounded-xl">
              <div className="text-center">
                <BarChart3 className="h-12 w-12 mx-auto text-slate-400 mb-2" />
                <p className="text-slate-400">Growth Chart</p>
                <p className="text-slate-500 text-sm">Interactive chart coming soon</p>
              </div>
            </div>
          </div>

          <div className="bg-slate-800/40 backdrop-blur-xl rounded-2xl p-6 border border-yellow-400/30">
            <h3 className="text-lg font-semibold text-slate-50 mb-4 flex items-center">
              <PieChart className="h-5 w-5 mr-2" />
              Membership Tier Distribution
            </h3>
            <div className="h-64 flex items-center justify-center border-2 border-dashed border-yellow-400/30 rounded-xl">
              <div className="text-center">
                <PieChart className="h-12 w-12 mx-auto text-slate-400 mb-2" />
                <p className="text-slate-400">Tier Distribution Chart</p>
                <p className="text-slate-500 text-sm">Interactive chart coming soon</p>
              </div>
            </div>
          </div>
        </div>

        {/* Recent Activity */}
        <div className="bg-slate-800/40 backdrop-blur-xl rounded-2xl p-6 border border-yellow-400/30">
          <h3 className="text-lg font-semibold text-slate-50 mb-4 flex items-center">
            <Activity className="h-5 w-5 mr-2" />
            Recent Subscriber Activities
          </h3>
          <div className="space-y-3">
            {[
              { action: 'New subscriber "Kiran Kumar" joined Premium tier', time: '2 hours ago', type: 'success' },
              { action: 'KYC verification completed for 5 subscribers', time: '4 hours ago', type: 'info' },
              { action: 'Payment received from "Deepika Rao" - ₹25,000', time: '6 hours ago', type: 'success' },
              { action: 'Subscriber "Meera Nair" upgraded to Gold tier', time: '1 day ago', type: 'info' },
              { action: 'Monthly compliance report generated', time: '2 days ago', type: 'success' }
            ].map((activity, index) => (
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