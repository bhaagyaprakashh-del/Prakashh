import React, { useState, useMemo } from 'react';
import {
  Search,
  Calendar,
  Clock,
  Users,
  CheckCircle,
  XCircle,
  AlertTriangle,
  QrCode,
  MapPin,
  Smartphone,
  Monitor,
  Download,
  Filter,
  Eye,
  Edit,
  Check,
  X,
  RefreshCw,
  Plus,
  Settings,
  Zap,
  Target,
  TrendingUp,
  Award
} from 'lucide-react';
import { Attendance, AttendanceKiosk } from '../../types/hrms';

const sampleAttendance: Attendance[] = [
  {
    id: '1',
    employeeId: '2',
    date: '2024-03-15',
    checkIn: '09:00:00',
    checkOut: '18:30:00',
    breakTime: 60,
    workHours: 8.5,
    overtimeHours: 0.5,
    status: 'present',
    attendanceType: 'regular',
    location: 'Bangalore Main Office',
    ipAddress: '192.168.1.100',
    deviceInfo: 'QR Kiosk - Main Entrance',
    qrCodeUsed: true,
    kioskId: 'KIOSK_BLR_001',
    approvalStatus: 'auto-approved',
    isRegularized: false,
    createdAt: '2024-03-15T09:00:00Z',
    updatedAt: '2024-03-15T18:30:00Z'
  },
  {
    id: '2',
    employeeId: '3',
    date: '2024-03-15',
    checkIn: '09:15:00',
    checkOut: '18:00:00',
    breakTime: 45,
    workHours: 8,
    overtimeHours: 0,
    status: 'present',
    attendanceType: 'regular',
    location: 'Bangalore Main Office',
    ipAddress: '192.168.1.101',
    deviceInfo: 'Mobile App - Android',
    qrCodeUsed: false,
    approvalStatus: 'pending',
    isRegularized: true,
    regularizationReason: 'Traffic delay',
    regularizedBy: 'Rajesh Kumar',
    regularizedAt: '2024-03-15T10:00:00Z',
    createdAt: '2024-03-15T09:15:00Z',
    updatedAt: '2024-03-15T18:00:00Z'
  },
  {
    id: '3',
    employeeId: '4',
    date: '2024-03-15',
    status: 'absent',
    attendanceType: 'regular',
    approvalStatus: 'pending',
    isRegularized: false,
    workHours: 0,
    overtimeHours: 0,
    breakTime: 0,
    createdAt: '2024-03-15T00:00:00Z',
    updatedAt: '2024-03-15T00:00:00Z'
  },
  {
    id: '4',
    employeeId: '5',
    date: '2024-03-15',
    checkIn: '10:30:00',
    checkOut: '14:30:00',
    breakTime: 30,
    workHours: 4,
    overtimeHours: 0,
    status: 'half-day',
    attendanceType: 'regular',
    location: 'Bangalore Main Office',
    qrCodeUsed: true,
    kioskId: 'KIOSK_BLR_002',
    approvalStatus: 'approved',
    approvedBy: 'Rajesh Kumar',
    approvedAt: '2024-03-15T11:00:00Z',
    isRegularized: false,
    createdAt: '2024-03-15T10:30:00Z',
    updatedAt: '2024-03-15T14:30:00Z'
  }
];

const sampleKiosks: AttendanceKiosk[] = [
  {
    id: '1',
    name: 'Main Entrance Kiosk',
    location: 'Ground Floor - Main Entrance',
    branch: 'Bangalore Main',
    qrCode: 'KIOSK_BLR_001_QR',
    ipAddress: '192.168.1.50',
    status: 'active',
    lastHeartbeat: '2024-03-15T14:08:55Z',
    totalScans: 1250,
    createdAt: '2024-01-01'
  },
  {
    id: '2',
    name: 'Second Floor Kiosk',
    location: 'Second Floor - Near Cafeteria',
    branch: 'Bangalore Main',
    qrCode: 'KIOSK_BLR_002_QR',
    ipAddress: '192.168.1.51',
    status: 'active',
    lastHeartbeat: '2024-03-15T14:07:30Z',
    totalScans: 890,
    createdAt: '2024-01-15'
  },
  {
    id: '3',
    name: 'Chennai Branch Kiosk',
    location: 'Main Entrance',
    branch: 'Chennai Branch',
    qrCode: 'KIOSK_CHN_001_QR',
    ipAddress: '192.168.2.50',
    status: 'maintenance',
    lastHeartbeat: '2024-03-14T16:30:00Z',
    totalScans: 650,
    createdAt: '2024-02-01'
  }
];

const employees = [
  { id: '2', name: 'Rajesh Kumar', department: 'Operations' },
  { id: '3', name: 'Priya Sharma', department: 'Sales & Marketing' },
  { id: '4', name: 'Amit Patel', department: 'Finance & Accounts' },
  { id: '5', name: 'Sunita Reddy', department: 'Human Resources' }
];

const AttendanceCard: React.FC<{ record: Attendance }> = React.memo(({ record }) => {
  const employee = employees.find(e => e.id === record.employeeId);
  
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'present': return 'bg-green-100 text-green-800 border-green-200';
      case 'absent': return 'bg-red-100 text-red-800 border-red-200';
      case 'half-day': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'on-leave': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'holiday': return 'bg-purple-100 text-purple-800 border-purple-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getApprovalColor = (status: string) => {
    switch (status) {
      case 'auto-approved': return 'bg-green-100 text-green-800';
      case 'approved': return 'bg-blue-100 text-blue-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'rejected': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
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
            <p className="text-xs text-slate-500">{new Date(record.date).toLocaleDateString()}</p>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium border ${getStatusColor(record.status)}`}>
            {record.status.toUpperCase()}
          </span>
          {record.qrCodeUsed && (
            <QrCode className="h-4 w-4 text-blue-400" title="QR Code Used" />
          )}
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 mb-4">
        <div className="space-y-2">
          <div className="flex items-center justify-between text-sm">
            <span className="text-slate-400">Check In</span>
            <span className="text-slate-50 font-medium">{record.checkIn || '-'}</span>
          </div>
          <div className="flex items-center justify-between text-sm">
            <span className="text-slate-400">Check Out</span>
            <span className="text-slate-50 font-medium">{record.checkOut || '-'}</span>
          </div>
          <div className="flex items-center justify-between text-sm">
            <span className="text-slate-400">Work Hours</span>
            <span className="text-green-400 font-medium">{record.workHours}h</span>
          </div>
        </div>
        <div className="space-y-2">
          <div className="flex items-center justify-between text-sm">
            <span className="text-slate-400">Break Time</span>
            <span className="text-slate-300">{record.breakTime}m</span>
          </div>
          <div className="flex items-center justify-between text-sm">
            <span className="text-slate-400">Overtime</span>
            <span className="text-blue-400 font-medium">{record.overtimeHours}h</span>
          </div>
          <div className="flex items-center justify-between text-sm">
            <span className="text-slate-400">Device</span>
            <span className="text-slate-300 text-xs">{record.qrCodeUsed ? 'QR Kiosk' : 'Mobile'}</span>
          </div>
        </div>
      </div>

      {record.isRegularized && (
        <div className="mb-4 p-3 bg-yellow-500/10 border border-yellow-500/30 rounded-lg">
          <p className="text-xs text-yellow-400 mb-1">Regularized:</p>
          <p className="text-sm text-slate-300">{record.regularizationReason}</p>
          <p className="text-xs text-slate-500 mt-1">
            By {record.regularizedBy} on {record.regularizedAt ? new Date(record.regularizedAt).toLocaleDateString() : 'N/A'}
          </p>
        </div>
      )}

      <div className="flex justify-between items-center pt-4 border-t border-yellow-400/20">
        <div className="flex items-center space-x-2">
          <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getApprovalColor(record.approvalStatus)}`}>
            {record.approvalStatus.replace('-', ' ').toUpperCase()}
          </span>
        </div>
        <div className="flex space-x-2">
          <button className="p-2 text-slate-400 hover:text-blue-400 hover:bg-blue-500/10 rounded-lg transition-all">
            <Eye className="h-4 w-4" />
          </button>
          {record.approvalStatus === 'pending' && (
            <>
              <button className="p-2 text-slate-400 hover:text-green-400 hover:bg-green-500/10 rounded-lg transition-all">
                <Check className="h-4 w-4" />
              </button>
              <button className="p-2 text-slate-400 hover:text-red-400 hover:bg-red-500/10 rounded-lg transition-all">
                <X className="h-4 w-4" />
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
});

const KioskCard: React.FC<{ kiosk: AttendanceKiosk }> = React.memo(({ kiosk }) => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800 border-green-200';
      case 'inactive': return 'bg-gray-100 text-gray-800 border-gray-200';
      case 'maintenance': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const isOnline = () => {
    const lastHeartbeat = new Date(kiosk.lastHeartbeat);
    const now = new Date();
    const diffMinutes = (now.getTime() - lastHeartbeat.getTime()) / (1000 * 60);
    return diffMinutes < 5; // Consider online if heartbeat within 5 minutes
  };

  return (
    <div className="bg-slate-800/40 backdrop-blur-xl rounded-2xl p-6 border border-yellow-400/30 hover:border-yellow-400/50 transition-all">
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center space-x-3">
          <div className="p-3 bg-blue-500/20 rounded-xl border border-yellow-400/30">
            <QrCode className="h-6 w-6 text-blue-400" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-slate-50">{kiosk.name}</h3>
            <p className="text-sm text-slate-400">{kiosk.location}</p>
            <p className="text-xs text-slate-500">{kiosk.branch}</p>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <div className={`w-3 h-3 rounded-full ${isOnline() ? 'bg-green-400' : 'bg-red-400'}`}></div>
          <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium border ${getStatusColor(kiosk.status)}`}>
            {kiosk.status.toUpperCase()}
          </span>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 mb-4">
        <div className="space-y-2">
          <div className="flex items-center justify-between text-sm">
            <span className="text-slate-400">IP Address</span>
            <span className="text-slate-50 font-medium">{kiosk.ipAddress}</span>
          </div>
          <div className="flex items-center justify-between text-sm">
            <span className="text-slate-400">Total Scans</span>
            <span className="text-green-400 font-medium">{kiosk.totalScans}</span>
          </div>
        </div>
        <div className="space-y-2">
          <div className="flex items-center justify-between text-sm">
            <span className="text-slate-400">Last Heartbeat</span>
            <span className="text-slate-300">{new Date(kiosk.lastHeartbeat).toLocaleTimeString()}</span>
          </div>
          <div className="flex items-center justify-between text-sm">
            <span className="text-slate-400">Status</span>
            <span className={`font-medium ${isOnline() ? 'text-green-400' : 'text-red-400'}`}>
              {isOnline() ? 'Online' : 'Offline'}
            </span>
          </div>
        </div>
      </div>

      <div className="flex justify-between items-center pt-4 border-t border-yellow-400/20">
        <div className="flex items-center text-xs text-slate-500">
          <Calendar className="h-3 w-3 mr-1" />
          <span>Installed {new Date(kiosk.createdAt).toLocaleDateString()}</span>
        </div>
        <div className="flex space-x-2">
          <button className="p-2 text-slate-400 hover:text-blue-400 hover:bg-blue-500/10 rounded-lg transition-all">
            <Eye className="h-4 w-4" />
          </button>
          <button className="p-2 text-slate-400 hover:text-green-400 hover:bg-green-500/10 rounded-lg transition-all">
            <Settings className="h-4 w-4" />
          </button>
          <button className="p-2 text-slate-400 hover:text-orange-400 hover:bg-orange-500/10 rounded-lg transition-all">
            <RefreshCw className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );
});

export const AttendanceLogs: React.FC = () => {
  const [attendance] = useState<Attendance[]>(sampleAttendance);
  const [kiosks] = useState<AttendanceKiosk[]>(sampleKiosks);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [filterApproval, setFilterApproval] = useState<string>('all');
  const [activeTab, setActiveTab] = useState('attendance');
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);

  const filteredAttendance = useMemo(() => attendance.filter(record => {
    const employee = employees.find(e => e.id === record.employeeId);
    const matchesSearch = employee?.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         employee?.department.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === 'all' || record.status === filterStatus;
    const matchesApproval = filterApproval === 'all' || record.approvalStatus === filterApproval;
    const matchesDate = record.date === selectedDate;
    
    return matchesSearch && matchesStatus && matchesApproval && matchesDate;
  }), [attendance, searchTerm, filterStatus, filterApproval, selectedDate]);

  const stats = useMemo(() => ({
    totalRecords: attendance.length,
    present: attendance.filter(a => a.status === 'present').length,
    absent: attendance.filter(a => a.status === 'absent').length,
    halfDay: attendance.filter(a => a.status === 'half-day').length,
    onLeave: attendance.filter(a => a.status === 'on-leave').length,
    pending: attendance.filter(a => a.approvalStatus === 'pending').length,
    regularized: attendance.filter(a => a.isRegularized).length,
    qrScans: attendance.filter(a => a.qrCodeUsed).length,
    avgWorkHours: attendance.length > 0 ? attendance.reduce((sum, a) => sum + a.workHours, 0) / attendance.length : 0,
    totalOvertime: attendance.reduce((sum, a) => sum + a.overtimeHours, 0),
    activeKiosks: kiosks.filter(k => k.status === 'active').length,
    totalKiosks: kiosks.length
  }), [attendance, kiosks]);

  const tabs = [
    { id: 'attendance', name: 'Attendance Logs', icon: Clock, count: attendance.length },
    { id: 'kiosks', name: 'QR Kiosks', icon: QrCode, count: kiosks.length },
    { id: 'approvals', name: 'Pending Approvals', icon: CheckCircle, count: stats.pending }
  ];

  return (
    <div className="h-full flex flex-col bg-slate-900 overflow-hidden">
      {/* Header */}
      <div className="flex justify-between items-center p-4 border-b border-yellow-400/30 flex-shrink-0">
        <div>
          <h1 className="text-2xl font-bold text-slate-50">Attendance Logs & Approvals</h1>
          <p className="mt-1 text-sm text-slate-400">
            QR code based attendance system with automated tracking and approval workflows
          </p>
        </div>
        <div className="flex space-x-3">
          <button className="inline-flex items-center px-4 py-2 border border-yellow-400/30 text-sm font-medium rounded-lg text-slate-50 bg-slate-700/50 hover:bg-slate-700 transition-all backdrop-blur-sm">
            <Download className="h-4 w-4 mr-2" />
            Export Report
          </button>
          <button className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-lg shadow-sm text-white bg-blue-600 hover:bg-blue-700 transition-all">
            <Plus className="h-4 w-4 mr-2" />
            Add Kiosk
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
                <p className="text-sm text-slate-400">Total Records</p>
                <p className="text-2xl font-bold text-slate-50">{stats.totalRecords}</p>
              </div>
              <Clock className="h-8 w-8 text-blue-400" />
            </div>
          </div>
          <div className="bg-slate-800/40 backdrop-blur-xl p-4 rounded-xl border border-yellow-400/30">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-400">Present</p>
                <p className="text-2xl font-bold text-green-400">{stats.present}</p>
              </div>
              <CheckCircle className="h-8 w-8 text-green-400" />
            </div>
          </div>
          <div className="bg-slate-800/40 backdrop-blur-xl p-4 rounded-xl border border-yellow-400/30">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-400">Absent</p>
                <p className="text-2xl font-bold text-red-400">{stats.absent}</p>
              </div>
              <XCircle className="h-8 w-8 text-red-400" />
            </div>
          </div>
          <div className="bg-slate-800/40 backdrop-blur-xl p-4 rounded-xl border border-yellow-400/30">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-400">Half Day</p>
                <p className="text-2xl font-bold text-yellow-400">{stats.halfDay}</p>
              </div>
              <AlertTriangle className="h-8 w-8 text-yellow-400" />
            </div>
          </div>
          <div className="bg-slate-800/40 backdrop-blur-xl p-4 rounded-xl border border-yellow-400/30">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-400">On Leave</p>
                <p className="text-2xl font-bold text-blue-400">{stats.onLeave}</p>
              </div>
              <Calendar className="h-8 w-8 text-blue-400" />
            </div>
          </div>
          <div className="bg-slate-800/40 backdrop-blur-xl p-4 rounded-xl border border-yellow-400/30">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-400">Pending</p>
                <p className="text-2xl font-bold text-orange-400">{stats.pending}</p>
              </div>
              <Clock className="h-8 w-8 text-orange-400" />
            </div>
          </div>
          <div className="bg-slate-800/40 backdrop-blur-xl p-4 rounded-xl border border-yellow-400/30">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-400">Regularized</p>
                <p className="text-2xl font-bold text-purple-400">{stats.regularized}</p>
              </div>
              <Edit className="h-8 w-8 text-purple-400" />
            </div>
          </div>
          <div className="bg-slate-800/40 backdrop-blur-xl p-4 rounded-xl border border-yellow-400/30">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-400">QR Scans</p>
                <p className="text-2xl font-bold text-indigo-400">{stats.qrScans}</p>
              </div>
              <QrCode className="h-8 w-8 text-indigo-400" />
            </div>
          </div>
          <div className="bg-slate-800/40 backdrop-blur-xl p-4 rounded-xl border border-yellow-400/30">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-400">Avg Hours</p>
                <p className="text-2xl font-bold text-emerald-400">{stats.avgWorkHours.toFixed(1)}h</p>
              </div>
              <Target className="h-8 w-8 text-emerald-400" />
            </div>
          </div>
          <div className="bg-slate-800/40 backdrop-blur-xl p-4 rounded-xl border border-yellow-400/30">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-400">Overtime</p>
                <p className="text-2xl font-bold text-pink-400">{stats.totalOvertime}h</p>
              </div>
              <TrendingUp className="h-8 w-8 text-pink-400" />
            </div>
          </div>
          <div className="bg-slate-800/40 backdrop-blur-xl p-4 rounded-xl border border-yellow-400/30">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-400">Active Kiosks</p>
                <p className="text-2xl font-bold text-cyan-400">{stats.activeKiosks}</p>
              </div>
              <Zap className="h-8 w-8 text-cyan-400" />
            </div>
          </div>
          <div className="bg-slate-800/40 backdrop-blur-xl p-4 rounded-xl border border-yellow-400/30">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-400">Total Kiosks</p>
                <p className="text-2xl font-bold text-violet-400">{stats.totalKiosks}</p>
              </div>
              <Monitor className="h-8 w-8 text-violet-400" />
            </div>
          </div>
        </div>

        {/* Filters */}
        <div className="bg-slate-800/40 backdrop-blur-xl rounded-xl p-4 border border-yellow-400/30">
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4 items-center">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-500 h-4 w-4" />
              <input
                type="text"
                placeholder="Search employees..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-2 bg-slate-700/50 border border-yellow-400/30 rounded-lg w-full text-slate-50 placeholder-slate-400 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 backdrop-blur-sm"
              />
            </div>
            <input
              type="date"
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
              className="px-3 py-2 bg-slate-700/50 border border-yellow-400/30 rounded-lg text-slate-50 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 backdrop-blur-sm"
            />
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="px-3 py-2 bg-slate-700/50 border border-yellow-400/30 rounded-lg text-slate-50 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 backdrop-blur-sm"
            >
              <option value="all">All Status</option>
              <option value="present">Present</option>
              <option value="absent">Absent</option>
              <option value="half-day">Half Day</option>
              <option value="on-leave">On Leave</option>
            </select>
            <select
              value={filterApproval}
              onChange={(e) => setFilterApproval(e.target.value)}
              className="px-3 py-2 bg-slate-700/50 border border-yellow-400/30 rounded-lg text-slate-50 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 backdrop-blur-sm"
            >
              <option value="all">All Approvals</option>
              <option value="auto-approved">Auto Approved</option>
              <option value="approved">Approved</option>
              <option value="pending">Pending</option>
              <option value="rejected">Rejected</option>
            </select>
            <div className="text-sm text-slate-400">
              Showing: <span className="font-semibold text-slate-50">{filteredAttendance.length}</span> records
            </div>
          </div>
        </div>

        {/* Tab Content */}
        {activeTab === 'attendance' && (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {filteredAttendance.map((record) => (
              <AttendanceCard key={record.id} record={record} />
            ))}
          </div>
        )}

        {activeTab === 'kiosks' && (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {kiosks.map((kiosk) => (
              <KioskCard key={kiosk.id} kiosk={kiosk} />
            ))}
          </div>
        )}

        {activeTab === 'approvals' && (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {filteredAttendance.filter(a => a.approvalStatus === 'pending').map((record) => (
              <AttendanceCard key={record.id} record={record} />
            ))}
          </div>
        )}

        {filteredAttendance.length === 0 && activeTab === 'attendance' && (
          <div className="text-center py-12">
            <Clock className="h-12 w-12 mx-auto text-slate-500 mb-4" />
            <h3 className="text-lg font-medium text-slate-50 mb-2">No attendance records found</h3>
            <p className="text-sm text-slate-400">Try adjusting your search criteria or date filter.</p>
          </div>
        )}
      </div>
    </div>
  );
};