import React, { useState } from 'react';
import {
  BarChart3,
  Download,
  Calendar,
  Users,
  Clock,
  DollarSign,
  TrendingUp,
  Target,
  Award,
  AlertTriangle,
  CheckCircle,
  FileText,
  Filter,
  RefreshCw,
  Eye,
  Share2,
  Settings,
  PieChart,
  LineChart,
  Activity
} from 'lucide-react';

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

export const HRMSReports: React.FC = () => {
  const [selectedPeriod, setSelectedPeriod] = useState('current-month');

  const reports = [
    {
      id: 'attendance-summary',
      title: 'Attendance Summary',
      description: 'Monthly attendance overview with present/absent statistics',
      icon: Clock,
      color: 'bg-blue-500',
      lastGenerated: '2024-03-15',
      frequency: 'monthly'
    },
    {
      id: 'payroll-summary',
      title: 'Payroll Summary',
      description: 'Salary disbursement and deduction analysis',
      icon: DollarSign,
      color: 'bg-green-500',
      lastGenerated: '2024-03-01',
      frequency: 'monthly'
    },
    {
      id: 'employee-performance',
      title: 'Employee Performance',
      description: 'Performance metrics and KPI tracking',
      icon: TrendingUp,
      color: 'bg-purple-500',
      lastGenerated: '2024-02-28',
      frequency: 'quarterly'
    },
    {
      id: 'leave-analysis',
      title: 'Leave Analysis',
      description: 'Leave patterns and balance tracking',
      icon: Calendar,
      color: 'bg-orange-500',
      lastGenerated: '2024-03-10',
      frequency: 'monthly'
    },
    {
      id: 'department-wise',
      title: 'Department Analytics',
      description: 'Department-wise employee and cost analysis',
      icon: Users,
      color: 'bg-indigo-500',
      lastGenerated: '2024-03-05',
      frequency: 'monthly'
    },
    {
      id: 'compliance-report',
      title: 'Compliance Report',
      description: 'PF, ESI, and statutory compliance tracking',
      icon: CheckCircle,
      color: 'bg-emerald-500',
      lastGenerated: '2024-03-12',
      frequency: 'monthly'
    }
  ];

  const quickStats = [
    { label: 'Total Employees', value: '6', icon: Users, color: 'text-blue-400' },
    { label: 'Present Today', value: '5', icon: CheckCircle, color: 'text-green-400' },
    { label: 'On Leave', value: '1', icon: Calendar, color: 'text-yellow-400' },
    { label: 'Avg Work Hours', value: '8.2h', icon: Clock, color: 'text-purple-400' },
    { label: 'Monthly Payroll', value: '₹4.0L', icon: DollarSign, color: 'text-emerald-400' },
    { label: 'Overtime Hours', value: '24h', icon: TrendingUp, color: 'text-orange-400' }
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
          <h1 className="text-2xl font-bold text-slate-50">HRMS Reports</h1>
          <p className="mt-1 text-sm text-slate-400">
            Comprehensive HR analytics and reporting dashboard
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
              Monthly Attendance Trends
            </h3>
            <div className="h-64 flex items-center justify-center border-2 border-dashed border-yellow-400/30 rounded-xl">
              <div className="text-center">
                <PieChart className="h-12 w-12 mx-auto text-slate-400 mb-2" />
                <p className="text-slate-400">Attendance Chart</p>
                <p className="text-slate-500 text-sm">Interactive chart coming soon</p>
              </div>
            </div>
          </div>

          <div className="bg-slate-800/40 backdrop-blur-xl rounded-2xl p-6 border border-yellow-400/30">
            <h3 className="text-lg font-semibold text-slate-50 mb-4 flex items-center">
              <LineChart className="h-5 w-5 mr-2" />
              Payroll Trends
            </h3>
            <div className="h-64 flex items-center justify-center border-2 border-dashed border-yellow-400/30 rounded-xl">
              <div className="text-center">
                <LineChart className="h-12 w-12 mx-auto text-slate-400 mb-2" />
                <p className="text-slate-400">Payroll Chart</p>
                <p className="text-slate-500 text-sm">Interactive chart coming soon</p>
              </div>
            </div>
          </div>
        </div>

        {/* Recent Activity */}
        <div className="bg-slate-800/40 backdrop-blur-xl rounded-2xl p-6 border border-yellow-400/30">
          <h3 className="text-lg font-semibold text-slate-50 mb-4 flex items-center">
            <Activity className="h-5 w-5 mr-2" />
            Recent HR Activities
          </h3>
          <div className="space-y-3">
            {[
              { action: 'Payroll run completed for March 2024', time: '2 hours ago', type: 'success' },
              { action: 'New employee Karthik Nair added', time: '1 day ago', type: 'info' },
              { action: 'Attendance regularization approved for Priya Sharma', time: '2 days ago', type: 'warning' },
              { action: 'Leave request approved for Rajesh Kumar', time: '3 days ago', type: 'info' },
              { action: 'Payslips sent to all employees', time: '1 week ago', type: 'success' }
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