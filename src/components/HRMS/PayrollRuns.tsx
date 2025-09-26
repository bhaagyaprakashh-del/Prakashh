import React, { useState, useMemo } from 'react';
import {
  Plus,
  Search,
  Download,
  Eye,
  Edit,
  Trash2,
  DollarSign,
  Users,
  Calendar,
  CheckCircle,
  Clock,
  AlertTriangle,
  FileText,
  Send,
  Play,
  Pause,
  RotateCcw,
  TrendingUp,
  Target,
  Award,
  Zap,
  MoreVertical,
  Filter,
  Upload,
  Settings,
  Mail,
  Phone
} from 'lucide-react';
import { PayrollRun, Payslip } from '../../types/hrms';

const samplePayrollRuns: PayrollRun[] = [
  {
    id: '1',
    runName: 'March 2024 Salary',
    payPeriod: 'March 2024',
    startDate: '2024-03-01',
    endDate: '2024-03-31',
    status: 'completed',
    totalEmployees: 6,
    processedEmployees: 6,
    totalGrossPay: 515000,
    totalDeductions: 115000,
    totalNetPay: 400000,
    createdBy: 'sunita.reddy@ramnirmalchits.com',
    createdAt: '2024-03-28',
    processedAt: '2024-03-30',
    approvedBy: 'prakashh@ramnirmalchits.com',
    approvedAt: '2024-03-31',
    payslips: []
  },
  {
    id: '2',
    runName: 'February 2024 Salary',
    payPeriod: 'February 2024',
    startDate: '2024-02-01',
    endDate: '2024-02-29',
    status: 'completed',
    totalEmployees: 6,
    processedEmployees: 6,
    totalGrossPay: 515000,
    totalDeductions: 115000,
    totalNetPay: 400000,
    createdBy: 'sunita.reddy@ramnirmalchits.com',
    createdAt: '2024-02-28',
    processedAt: '2024-02-29',
    approvedBy: 'prakashh@ramnirmalchits.com',
    approvedAt: '2024-03-01',
    payslips: []
  },
  {
    id: '3',
    runName: 'April 2024 Salary',
    payPeriod: 'April 2024',
    startDate: '2024-04-01',
    endDate: '2024-04-30',
    status: 'processing',
    totalEmployees: 6,
    processedEmployees: 4,
    totalGrossPay: 0,
    totalDeductions: 0,
    totalNetPay: 0,
    createdBy: 'sunita.reddy@ramnirmalchits.com',
    createdAt: '2024-04-01',
    payslips: []
  }
];

const samplePayslips: Payslip[] = [
  {
    id: '1',
    payrollRunId: '1',
    employeeId: '1',
    payPeriod: 'March 2024',
    basicSalary: 150000,
    allowances: { hra: 60000, transport: 5000, medical: 10000, special: 25000, overtime: 0 },
    grossPay: 250000,
    deductions: { pf: 18000, esi: 0, tax: 35000, advance: 0, other: 0 },
    totalDeductions: 53000,
    netPay: 197000,
    workingDays: 31,
    presentDays: 31,
    absentDays: 0,
    leavesTaken: 0,
    overtimeHours: 0,
    status: 'sent',
    generatedAt: '2024-03-30',
    sentAt: '2024-03-31'
  },
  {
    id: '2',
    payrollRunId: '1',
    employeeId: '2',
    payPeriod: 'March 2024',
    basicSalary: 80000,
    allowances: { hra: 32000, transport: 3000, medical: 5000, special: 10000, overtime: 2000 },
    grossPay: 132000,
    deductions: { pf: 9600, esi: 675, tax: 15000, advance: 0, other: 0 },
    totalDeductions: 25275,
    netPay: 106725,
    workingDays: 31,
    presentDays: 30,
    absentDays: 1,
    leavesTaken: 0,
    overtimeHours: 8,
    status: 'acknowledged',
    generatedAt: '2024-03-30',
    sentAt: '2024-03-31',
    acknowledgedAt: '2024-04-01'
  }
];

const employees = [
  { id: '1', name: 'Prakashh Admin', department: 'Executive' },
  { id: '2', name: 'Rajesh Kumar', department: 'Operations' },
  { id: '3', name: 'Priya Sharma', department: 'Sales & Marketing' },
  { id: '4', name: 'Amit Patel', department: 'Finance & Accounts' },
  { id: '5', name: 'Sunita Reddy', department: 'Human Resources' },
  { id: '6', name: 'Karthik Nair', department: 'Finance & Accounts' }
];

const PayrollRunCard: React.FC<{ run: PayrollRun }> = React.memo(({ run }) => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'bg-green-100 text-green-800 border-green-200';
      case 'processing': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'draft': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'cancelled': return 'bg-red-100 text-red-800 border-red-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed': return CheckCircle;
      case 'processing': return Clock;
      case 'draft': return Edit;
      case 'cancelled': return AlertTriangle;
      default: return Clock;
    }
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const StatusIcon = getStatusIcon(run.status);
  const progressPercentage = (run.processedEmployees / run.totalEmployees) * 100;

  return (
    <div className="bg-slate-800/40 backdrop-blur-xl rounded-2xl p-6 border border-yellow-400/30 hover:border-yellow-400/50 transition-all">
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center space-x-3">
          <div className="p-3 bg-green-500/20 rounded-xl border border-yellow-400/30">
            <DollarSign className="h-6 w-6 text-green-400" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-slate-50">{run.runName}</h3>
            <p className="text-sm text-slate-400">{run.payPeriod}</p>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium border ${getStatusColor(run.status)}`}>
            <StatusIcon className="h-3 w-3 mr-1" />
            {run.status.toUpperCase()}
          </span>
          <button className="p-2 text-slate-400 hover:text-slate-50 hover:bg-slate-700/50 rounded-lg transition-all">
            <MoreVertical className="h-4 w-4" />
          </button>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="mb-4">
        <div className="flex justify-between text-sm text-slate-400 mb-1">
          <span>Processing Progress</span>
          <span>{run.processedEmployees}/{run.totalEmployees} employees</span>
        </div>
        <div className="w-full bg-slate-700/50 rounded-full h-2 border border-yellow-400/20">
          <div
            className="bg-gradient-to-r from-blue-500 to-green-500 h-2 rounded-full transition-all duration-300"
            style={{ width: `${progressPercentage}%` }}
          ></div>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 mb-4">
        <div className="space-y-2">
          <div className="flex items-center justify-between text-sm">
            <span className="text-slate-400">Gross Pay</span>
            <span className="text-slate-50 font-medium">{formatCurrency(run.totalGrossPay)}</span>
          </div>
          <div className="flex items-center justify-between text-sm">
            <span className="text-slate-400">Deductions</span>
            <span className="text-red-400 font-medium">{formatCurrency(run.totalDeductions)}</span>
          </div>
          <div className="flex items-center justify-between text-sm">
            <span className="text-slate-400">Net Pay</span>
            <span className="text-green-400 font-medium">{formatCurrency(run.totalNetPay)}</span>
          </div>
        </div>
        <div className="space-y-2">
          <div className="flex items-center justify-between text-sm">
            <span className="text-slate-400">Created</span>
            <span className="text-slate-300">{new Date(run.createdAt).toLocaleDateString()}</span>
          </div>
          <div className="flex items-center justify-between text-sm">
            <span className="text-slate-400">Processed</span>
            <span className="text-slate-300">{run.processedAt ? new Date(run.processedAt).toLocaleDateString() : 'Pending'}</span>
          </div>
          <div className="flex items-center justify-between text-sm">
            <span className="text-slate-400">Approved</span>
            <span className="text-slate-300">{run.approvedAt ? new Date(run.approvedAt).toLocaleDateString() : 'Pending'}</span>
          </div>
        </div>
      </div>

      <div className="flex justify-between items-center pt-4 border-t border-yellow-400/20">
        <div className="flex items-center text-xs text-slate-500">
          <Calendar className="h-3 w-3 mr-1" />
          <span>{new Date(run.startDate).toLocaleDateString()} - {new Date(run.endDate).toLocaleDateString()}</span>
        </div>
        <div className="flex space-x-2">
          <button className="p-2 text-slate-400 hover:text-blue-400 hover:bg-blue-500/10 rounded-lg transition-all">
            <Eye className="h-4 w-4" />
          </button>
          <button className="p-2 text-slate-400 hover:text-green-400 hover:bg-green-500/10 rounded-lg transition-all">
            <Download className="h-4 w-4" />
          </button>
          {run.status === 'draft' && (
            <button className="p-2 text-slate-400 hover:text-orange-400 hover:bg-orange-500/10 rounded-lg transition-all">
              <Play className="h-4 w-4" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
});

const PayslipCard: React.FC<{ payslip: Payslip }> = React.memo(({ payslip }) => {
  const employee = employees.find(e => e.id === payslip.employeeId);
  
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'acknowledged': return 'bg-green-100 text-green-800 border-green-200';
      case 'sent': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'generated': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0,
    }).format(amount);
  };

  return (
    <div className="bg-slate-800/40 backdrop-blur-xl rounded-2xl p-6 border border-yellow-400/30 hover:border-yellow-400/50 transition-all">
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center space-x-3">
          <div className="h-12 w-12 bg-slate-600/50 rounded-full flex items-center justify-center text-slate-50 font-semibold border border-yellow-400/30">
            {employee?.name.split(' ').map(n => n[0]).join('') || 'UK'}
          </div>
          <div>
            <h3 className="text-lg font-semibold text-slate-50">{employee?.name || 'Unknown'}</h3>
            <p className="text-sm text-slate-400">{employee?.department}</p>
            <p className="text-xs text-slate-500">{payslip.payPeriod}</p>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium border ${getStatusColor(payslip.status)}`}>
            {payslip.status.toUpperCase()}
          </span>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 mb-4">
        <div className="space-y-2">
          <div className="flex items-center justify-between text-sm">
            <span className="text-slate-400">Basic Salary</span>
            <span className="text-slate-50 font-medium">{formatCurrency(payslip.basicSalary)}</span>
          </div>
          <div className="flex items-center justify-between text-sm">
            <span className="text-slate-400">Gross Pay</span>
            <span className="text-blue-400 font-medium">{formatCurrency(payslip.grossPay)}</span>
          </div>
          <div className="flex items-center justify-between text-sm">
            <span className="text-slate-400">Net Pay</span>
            <span className="text-green-400 font-semibold">{formatCurrency(payslip.netPay)}</span>
          </div>
        </div>
        <div className="space-y-2">
          <div className="flex items-center justify-between text-sm">
            <span className="text-slate-400">Working Days</span>
            <span className="text-slate-50">{payslip.workingDays}</span>
          </div>
          <div className="flex items-center justify-between text-sm">
            <span className="text-slate-400">Present Days</span>
            <span className="text-green-400">{payslip.presentDays}</span>
          </div>
          <div className="flex items-center justify-between text-sm">
            <span className="text-slate-400">Overtime</span>
            <span className="text-blue-400">{payslip.overtimeHours}h</span>
          </div>
        </div>
      </div>

      <div className="flex justify-between items-center pt-4 border-t border-yellow-400/20">
        <div className="flex items-center text-xs text-slate-500">
          <Calendar className="h-3 w-3 mr-1" />
          <span>Generated {new Date(payslip.generatedAt).toLocaleDateString()}</span>
        </div>
        <div className="flex space-x-2">
          <button className="p-2 text-slate-400 hover:text-blue-400 hover:bg-blue-500/10 rounded-lg transition-all">
            <Eye className="h-4 w-4" />
          </button>
          <button className="p-2 text-slate-400 hover:text-green-400 hover:bg-green-500/10 rounded-lg transition-all">
            <Download className="h-4 w-4" />
          </button>
          {payslip.status === 'generated' && (
            <button className="p-2 text-slate-400 hover:text-purple-400 hover:bg-purple-500/10 rounded-lg transition-all">
              <Send className="h-4 w-4" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
});

export const PayrollRuns: React.FC = () => {
  const [payrollRuns] = useState<PayrollRun[]>(samplePayrollRuns);
  const [payslips] = useState<Payslip[]>(samplePayslips);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [activeTab, setActiveTab] = useState('runs');

  const filteredRuns = useMemo(() => payrollRuns.filter(run => {
    const matchesSearch = run.runName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         run.payPeriod.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === 'all' || run.status === filterStatus;
    
    return matchesSearch && matchesStatus;
  }), [payrollRuns, searchTerm, filterStatus]);

  const filteredPayslips = useMemo(() => payslips.filter(payslip => {
    const employee = employees.find(e => e.id === payslip.employeeId);
    const matchesSearch = employee?.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         payslip.payPeriod.toLowerCase().includes(searchTerm.toLowerCase());
    
    return matchesSearch;
  }), [payslips, searchTerm]);

  const stats = useMemo(() => ({
    totalRuns: payrollRuns.length,
    completed: payrollRuns.filter(r => r.status === 'completed').length,
    processing: payrollRuns.filter(r => r.status === 'processing').length,
    draft: payrollRuns.filter(r => r.status === 'draft').length,
    totalEmployees: payrollRuns.reduce((sum, r) => sum + r.totalEmployees, 0) / payrollRuns.length,
    totalGrossPay: payrollRuns.filter(r => r.status === 'completed').reduce((sum, r) => sum + r.totalGrossPay, 0),
    totalNetPay: payrollRuns.filter(r => r.status === 'completed').reduce((sum, r) => sum + r.totalNetPay, 0),
    totalDeductions: payrollRuns.filter(r => r.status === 'completed').reduce((sum, r) => sum + r.totalDeductions, 0),
    payslipsGenerated: payslips.length,
    payslipsSent: payslips.filter(p => p.status === 'sent' || p.status === 'acknowledged').length,
    payslipsAcknowledged: payslips.filter(p => p.status === 'acknowledged').length,
    avgNetPay: payslips.length > 0 ? payslips.reduce((sum, p) => sum + p.netPay, 0) / payslips.length : 0
  }), [payrollRuns, payslips]);

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const tabs = [
    { id: 'runs', name: 'Payroll Runs', icon: DollarSign, count: payrollRuns.length },
    { id: 'payslips', name: 'Payslips', icon: FileText, count: payslips.length }
  ];

  return (
    <div className="h-full flex flex-col bg-slate-900 overflow-hidden">
      {/* Header */}
      <div className="flex justify-between items-center p-4 border-b border-yellow-400/30 flex-shrink-0">
        <div>
          <h1 className="text-2xl font-bold text-slate-50">Payroll Runs & Payslips</h1>
          <p className="mt-1 text-sm text-slate-400">
            Process payroll, generate payslips, and manage salary components
          </p>
        </div>
        <div className="flex space-x-3">
          <button className="inline-flex items-center px-4 py-2 border border-yellow-400/30 text-sm font-medium rounded-lg text-slate-50 bg-slate-700/50 hover:bg-slate-700 transition-all backdrop-blur-sm">
            <Download className="h-4 w-4 mr-2" />
            Export Report
          </button>
          <button className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-lg shadow-sm text-white bg-blue-600 hover:bg-blue-700 transition-all">
            <Plus className="h-4 w-4 mr-2" />
            New Payroll Run
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
        <div className="grid grid-cols-1 md:grid-cols-4 lg:grid-cols-12 gap-4">
          <div className="bg-slate-800/40 backdrop-blur-xl p-4 rounded-xl border border-yellow-400/30">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-400">Total Runs</p>
                <p className="text-2xl font-bold text-slate-50">{stats.totalRuns}</p>
              </div>
              <DollarSign className="h-8 w-8 text-blue-400" />
            </div>
          </div>
          <div className="bg-slate-800/40 backdrop-blur-xl p-4 rounded-xl border border-yellow-400/30">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-400">Completed</p>
                <p className="text-2xl font-bold text-green-400">{stats.completed}</p>
              </div>
              <CheckCircle className="h-8 w-8 text-green-400" />
            </div>
          </div>
          <div className="bg-slate-800/40 backdrop-blur-xl p-4 rounded-xl border border-yellow-400/30">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-400">Processing</p>
                <p className="text-2xl font-bold text-blue-400">{stats.processing}</p>
              </div>
              <Clock className="h-8 w-8 text-blue-400" />
            </div>
          </div>
          <div className="bg-slate-800/40 backdrop-blur-xl p-4 rounded-xl border border-yellow-400/30">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-400">Draft</p>
                <p className="text-2xl font-bold text-yellow-400">{stats.draft}</p>
              </div>
              <Edit className="h-8 w-8 text-yellow-400" />
            </div>
          </div>
          <div className="bg-slate-800/40 backdrop-blur-xl p-4 rounded-xl border border-yellow-400/30">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-400">Payslips</p>
                <p className="text-2xl font-bold text-purple-400">{stats.payslipsGenerated}</p>
              </div>
              <FileText className="h-8 w-8 text-purple-400" />
            </div>
          </div>
          <div className="bg-slate-800/40 backdrop-blur-xl p-4 rounded-xl border border-yellow-400/30">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-400">Sent</p>
                <p className="text-2xl font-bold text-orange-400">{stats.payslipsSent}</p>
              </div>
              <Send className="h-8 w-8 text-orange-400" />
            </div>
          </div>
          <div className="bg-slate-800/40 backdrop-blur-xl p-4 rounded-xl border border-yellow-400/30">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-400">Acknowledged</p>
                <p className="text-2xl font-bold text-emerald-400">{stats.payslipsAcknowledged}</p>
              </div>
              <Award className="h-8 w-8 text-emerald-400" />
            </div>
          </div>
          <div className="bg-slate-800/40 backdrop-blur-xl p-4 rounded-xl border border-yellow-400/30 md:col-span-2">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-400">Total Gross Pay</p>
                <p className="text-xl font-bold text-blue-400">{formatCurrency(stats.totalGrossPay)}</p>
              </div>
              <TrendingUp className="h-8 w-8 text-blue-400" />
            </div>
          </div>
          <div className="bg-slate-800/40 backdrop-blur-xl p-4 rounded-xl border border-yellow-400/30 md:col-span-2">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-400">Total Net Pay</p>
                <p className="text-xl font-bold text-green-400">{formatCurrency(stats.totalNetPay)}</p>
              </div>
              <Target className="h-8 w-8 text-green-400" />
            </div>
          </div>
          <div className="bg-slate-800/40 backdrop-blur-xl p-4 rounded-xl border border-yellow-400/30">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-400">Avg Net Pay</p>
                <p className="text-xl font-bold text-yellow-400">{formatCurrency(stats.avgNetPay)}</p>
              </div>
              <Zap className="h-8 w-8 text-yellow-400" />
            </div>
          </div>
        </div>

        {/* Filters */}
        <div className="bg-slate-800/40 backdrop-blur-xl rounded-xl p-4 border border-yellow-400/30">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-center">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-500 h-4 w-4" />
              <input
                type="text"
                placeholder="Search payroll..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-2 bg-slate-700/50 border border-yellow-400/30 rounded-lg w-full text-slate-50 placeholder-slate-400 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 backdrop-blur-sm"
              />
            </div>
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="px-3 py-2 bg-slate-700/50 border border-yellow-400/30 rounded-lg text-slate-50 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 backdrop-blur-sm"
            >
              <option value="all">All Status</option>
              <option value="completed">Completed</option>
              <option value="processing">Processing</option>
              <option value="draft">Draft</option>
              <option value="cancelled">Cancelled</option>
            </select>
            <div className="text-sm text-slate-400">
              Showing: <span className="font-semibold text-slate-50">
                {activeTab === 'runs' ? filteredRuns.length : filteredPayslips.length}
              </span> {activeTab === 'runs' ? 'runs' : 'payslips'}
            </div>
            <div className="flex justify-end">
              <button className="inline-flex items-center px-3 py-2 border border-yellow-400/30 text-sm font-medium rounded-lg text-slate-50 bg-slate-700/50 hover:bg-slate-700 transition-all backdrop-blur-sm">
                <Filter className="h-4 w-4 mr-2" />
                More Filters
              </button>
            </div>
          </div>
        </div>

        {/* Content Display */}
        {activeTab === 'runs' ? (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {filteredRuns.map((run) => (
              <PayrollRunCard key={run.id} run={run} />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {filteredPayslips.map((payslip) => (
              <PayslipCard key={payslip.id} payslip={payslip} />
            ))}
          </div>
        )}

        {((activeTab === 'runs' && filteredRuns.length === 0) || 
          (activeTab === 'payslips' && filteredPayslips.length === 0)) && (
          <div className="text-center py-12">
            {activeTab === 'runs' ? (
              <DollarSign className="h-12 w-12 mx-auto text-slate-500 mb-4" />
            ) : (
              <FileText className="h-12 w-12 mx-auto text-slate-500 mb-4" />
            )}
            <h3 className="text-lg font-medium text-slate-50 mb-2">
              No {activeTab === 'runs' ? 'payroll runs' : 'payslips'} found
            </h3>
            <p className="text-sm text-slate-400">Try adjusting your search criteria or create a new payroll run.</p>
          </div>
        )}
      </div>
    </div>
  );
};