import React, { useState } from 'react';
import {
  ArrowLeft,
  Edit,
  Mail,
  Phone,
  MapPin,
  Calendar,
  Building,
  User,
  CreditCard,
  FileText,
  Clock,
  Award,
  Target,
  TrendingUp,
  Users,
  CheckCircle,
  AlertTriangle,
  Download,
  Upload,
  Star,
  Briefcase,
  GraduationCap
} from 'lucide-react';
import { Employee, Attendance, LeaveRequest } from '../../types/hrms';

interface Employee360Props {
  employeeId: string;
  onBack: () => void;
}

const sampleEmployee: Employee = {
  id: '2',
  employeeId: 'EMP002',
  firstName: 'Rajesh',
  lastName: 'Kumar',
  email: 'rajesh.kumar@ramnirmalchits.com',
  phone: '+91 98765 43213',
  dateOfBirth: '1988-03-22',
  gender: 'male',
  maritalStatus: 'married',
  address: '456 Residency Road, Bangalore',
  city: 'Bangalore',
  state: 'Karnataka',
  country: 'India',
  postalCode: '560025',
  designation: 'Branch Manager',
  department: 'Operations',
  branch: 'Bangalore Main',
  joiningDate: '2020-02-15',
  reportingManager: 'Prakashh Admin',
  probationPeriod: 6,
  employmentType: 'permanent',
  workLocation: 'office',
  teamMembers: ['3', '5'],
  basicSalary: 80000,
  allowances: { hra: 32000, transport: 3000, medical: 5000, special: 10000 },
  deductions: { pf: 9600, esi: 675, tax: 15000, other: 0 },
  bankAccount: {
    accountNumber: '2345678901',
    bankName: 'SBI',
    ifscCode: 'SBIN0001234',
    accountHolderName: 'Rajesh Kumar'
  },
  documents: {},
  skills: ['Team Management', 'Operations', 'Customer Relations', 'Leadership', 'Strategic Planning'],
  qualifications: [
    { degree: 'B.Com', institution: 'Bangalore University', year: '2010', percentage: 78 },
    { degree: 'MBA', institution: 'Symbiosis', year: '2015', percentage: 85 }
  ],
  experience: [
    { company: 'Previous Finance Co', designation: 'Assistant Manager', duration: '2015-2020', responsibilities: 'Branch operations and team management' },
    { company: 'Banking Corp', designation: 'Executive', duration: '2012-2015', responsibilities: 'Customer service and operations' }
  ],
  status: 'active',
  emergencyContact: {
    name: 'Sunita Kumar',
    relationship: 'Spouse',
    phone: '+91 98765 43214'
  },
  createdAt: '2020-02-15',
  createdBy: 'prakashh@ramnirmalchits.com',
  updatedAt: '2024-03-10',
  updatedBy: 'rajesh.kumar@ramnirmalchits.com',
  notes: 'Experienced branch manager with excellent track record'
};

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
    qrCodeUsed: true,
    kioskId: 'KIOSK_BLR_001',
    approvalStatus: 'auto-approved',
    isRegularized: false,
    createdAt: '2024-03-15T09:00:00Z',
    updatedAt: '2024-03-15T18:30:00Z'
  },
  {
    id: '2',
    employeeId: '2',
    date: '2024-03-14',
    checkIn: '09:15:00',
    checkOut: '18:00:00',
    breakTime: 45,
    workHours: 8,
    overtimeHours: 0,
    status: 'present',
    attendanceType: 'regular',
    qrCodeUsed: true,
    kioskId: 'KIOSK_BLR_001',
    approvalStatus: 'auto-approved',
    isRegularized: false,
    createdAt: '2024-03-14T09:15:00Z',
    updatedAt: '2024-03-14T18:00:00Z'
  }
];

const sampleLeaves: LeaveRequest[] = [
  {
    id: '1',
    employeeId: '2',
    leaveType: 'casual',
    startDate: '2024-03-20',
    endDate: '2024-03-22',
    totalDays: 3,
    reason: 'Family function',
    status: 'approved',
    appliedDate: '2024-03-10',
    approvedBy: 'Prakashh Admin',
    approvedDate: '2024-03-11',
    isHalfDay: false
  }
];

export const Employee360: React.FC<Employee360Props> = ({ employeeId, onBack }) => {
  const [employee] = useState<Employee>(sampleEmployee);
  const [attendance] = useState<Attendance[]>(sampleAttendance);
  const [leaves] = useState<LeaveRequest[]>(sampleLeaves);
  const [activeTab, setActiveTab] = useState('overview');

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const calculateTenure = (joiningDate: string) => {
    const joining = new Date(joiningDate);
    const now = new Date();
    const diffTime = Math.abs(now.getTime() - joining.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    const years = Math.floor(diffDays / 365);
    const months = Math.floor((diffDays % 365) / 30);
    
    if (years > 0) {
      return `${years} years ${months} months`;
    }
    return `${months} months`;
  };

  const grossSalary = employee.basicSalary + 
    employee.allowances.hra + 
    employee.allowances.transport + 
    employee.allowances.medical + 
    employee.allowances.special;

  const totalDeductions = employee.deductions.pf + 
    employee.deductions.esi + 
    employee.deductions.tax + 
    employee.deductions.other;

  const netSalary = grossSalary - totalDeductions;

  const tabs = [
    { id: 'overview', name: 'Overview', icon: User },
    { id: 'attendance', name: 'Attendance', icon: Clock },
    { id: 'leaves', name: 'Leaves', icon: Calendar },
    { id: 'payroll', name: 'Payroll', icon: CreditCard },
    { id: 'documents', name: 'Documents', icon: FileText },
    { id: 'performance', name: 'Performance', icon: TrendingUp }
  ];

  const renderTabContent = () => {
    switch (activeTab) {
      case 'overview':
        return (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Personal Information */}
            <div className="bg-slate-800/40 backdrop-blur-xl rounded-2xl p-6 border border-yellow-400/30">
              <h3 className="text-lg font-semibold text-slate-50 mb-4 flex items-center">
                <User className="h-5 w-5 mr-2" />
                Personal Information
              </h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-slate-400">Date of Birth</span>
                  <span className="text-slate-50">{new Date(employee.dateOfBirth).toLocaleDateString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Gender</span>
                  <span className="text-slate-50 capitalize">{employee.gender}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Marital Status</span>
                  <span className="text-slate-50 capitalize">{employee.maritalStatus}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Blood Group</span>
                  <span className="text-slate-50">{employee.bloodGroup || 'Not specified'}</span>
                </div>
              </div>
            </div>

            {/* Professional Information */}
            <div className="bg-slate-800/40 backdrop-blur-xl rounded-2xl p-6 border border-yellow-400/30">
              <h3 className="text-lg font-semibold text-slate-50 mb-4 flex items-center">
                <Briefcase className="h-5 w-5 mr-2" />
                Professional Details
              </h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-slate-400">Employee ID</span>
                  <span className="text-slate-50">{employee.employeeId}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Tenure</span>
                  <span className="text-slate-50">{calculateTenure(employee.joiningDate)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Employment Type</span>
                  <span className="text-slate-50 capitalize">{employee.employmentType}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Work Location</span>
                  <span className="text-slate-50 capitalize">{employee.workLocation}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Team Size</span>
                  <span className="text-slate-50">{employee.teamMembers.length} members</span>
                </div>
              </div>
            </div>

            {/* Emergency Contact */}
            <div className="bg-slate-800/40 backdrop-blur-xl rounded-2xl p-6 border border-yellow-400/30">
              <h3 className="text-lg font-semibold text-slate-50 mb-4 flex items-center">
                <Phone className="h-5 w-5 mr-2" />
                Emergency Contact
              </h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-slate-400">Name</span>
                  <span className="text-slate-50">{employee.emergencyContact.name}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Relationship</span>
                  <span className="text-slate-50 capitalize">{employee.emergencyContact.relationship}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Phone</span>
                  <span className="text-slate-50">{employee.emergencyContact.phone}</span>
                </div>
              </div>
            </div>

            {/* Skills */}
            <div className="bg-slate-800/40 backdrop-blur-xl rounded-2xl p-6 border border-yellow-400/30">
              <h3 className="text-lg font-semibold text-slate-50 mb-4 flex items-center">
                <Star className="h-5 w-5 mr-2" />
                Skills & Expertise
              </h3>
              <div className="flex flex-wrap gap-2">
                {employee.skills.map((skill, index) => (
                  <span key={index} className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-blue-100 text-blue-800 border border-blue-200">
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            {/* Qualifications */}
            <div className="bg-slate-800/40 backdrop-blur-xl rounded-2xl p-6 border border-yellow-400/30">
              <h3 className="text-lg font-semibold text-slate-50 mb-4 flex items-center">
                <GraduationCap className="h-5 w-5 mr-2" />
                Education
              </h3>
              <div className="space-y-3">
                {employee.qualifications.map((qual, index) => (
                  <div key={index} className="border-l-2 border-blue-500 pl-4">
                    <p className="text-slate-50 font-medium">{qual.degree}</p>
                    <p className="text-slate-400 text-sm">{qual.institution} • {qual.year}</p>
                    {qual.percentage && <p className="text-slate-300 text-sm">{qual.percentage}%</p>}
                  </div>
                ))}
              </div>
            </div>

            {/* Experience */}
            <div className="bg-slate-800/40 backdrop-blur-xl rounded-2xl p-6 border border-yellow-400/30">
              <h3 className="text-lg font-semibold text-slate-50 mb-4 flex items-center">
                <Briefcase className="h-5 w-5 mr-2" />
                Work Experience
              </h3>
              <div className="space-y-4">
                {employee.experience.map((exp, index) => (
                  <div key={index} className="border-l-2 border-green-500 pl-4">
                    <p className="text-slate-50 font-medium">{exp.designation}</p>
                    <p className="text-slate-400 text-sm">{exp.company} • {exp.duration}</p>
                    <p className="text-slate-300 text-sm mt-1">{exp.responsibilities}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        );

      case 'attendance':
        return (
          <div className="space-y-6">
            {/* Attendance Stats */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="bg-slate-800/40 backdrop-blur-xl p-4 rounded-xl border border-yellow-400/30">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-slate-400">This Month</p>
                    <p className="text-2xl font-bold text-green-400">22</p>
                  </div>
                  <CheckCircle className="h-8 w-8 text-green-400" />
                </div>
              </div>
              <div className="bg-slate-800/40 backdrop-blur-xl p-4 rounded-xl border border-yellow-400/30">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-slate-400">Absent</p>
                    <p className="text-2xl font-bold text-red-400">1</p>
                  </div>
                  <AlertTriangle className="h-8 w-8 text-red-400" />
                </div>
              </div>
              <div className="bg-slate-800/40 backdrop-blur-xl p-4 rounded-xl border border-yellow-400/30">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-slate-400">Late Arrivals</p>
                    <p className="text-2xl font-bold text-yellow-400">3</p>
                  </div>
                  <Clock className="h-8 w-8 text-yellow-400" />
                </div>
              </div>
              <div className="bg-slate-800/40 backdrop-blur-xl p-4 rounded-xl border border-yellow-400/30">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-slate-400">Overtime</p>
                    <p className="text-2xl font-bold text-blue-400">12h</p>
                  </div>
                  <TrendingUp className="h-8 w-8 text-blue-400" />
                </div>
              </div>
            </div>

            {/* Recent Attendance */}
            <div className="bg-slate-800/40 backdrop-blur-xl rounded-2xl border border-yellow-400/30 overflow-hidden">
              <div className="p-6 border-b border-yellow-400/20">
                <h3 className="text-lg font-semibold text-slate-50">Recent Attendance</h3>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-slate-700/50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-slate-300 uppercase">Date</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-slate-300 uppercase">Check In</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-slate-300 uppercase">Check Out</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-slate-300 uppercase">Work Hours</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-slate-300 uppercase">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-yellow-400/20">
                    {attendance.map((record) => (
                      <tr key={record.id} className="hover:bg-slate-700/20">
                        <td className="px-6 py-4 text-slate-50">{new Date(record.date).toLocaleDateString()}</td>
                        <td className="px-6 py-4 text-slate-300">{record.checkIn || '-'}</td>
                        <td className="px-6 py-4 text-slate-300">{record.checkOut || '-'}</td>
                        <td className="px-6 py-4 text-slate-300">{record.workHours}h</td>
                        <td className="px-6 py-4">
                          <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                            record.status === 'present' ? 'bg-green-100 text-green-800' :
                            record.status === 'absent' ? 'bg-red-100 text-red-800' :
                            'bg-yellow-100 text-yellow-800'
                          }`}>
                            {record.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        );

      case 'payroll':
        return (
          <div className="space-y-6">
            {/* Salary Breakdown */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="bg-slate-800/40 backdrop-blur-xl rounded-2xl p-6 border border-yellow-400/30">
                <h3 className="text-lg font-semibold text-slate-50 mb-4">Salary Breakdown</h3>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-slate-400">Basic Salary</span>
                    <span className="text-slate-50 font-medium">{formatCurrency(employee.basicSalary)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">HRA</span>
                    <span className="text-slate-50">{formatCurrency(employee.allowances.hra)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Transport</span>
                    <span className="text-slate-50">{formatCurrency(employee.allowances.transport)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Medical</span>
                    <span className="text-slate-50">{formatCurrency(employee.allowances.medical)}</span>
                  </div>
                  <div className="flex justify-between border-t border-yellow-400/20 pt-3">
                    <span className="text-slate-400 font-medium">Gross Salary</span>
                    <span className="text-green-400 font-semibold">{formatCurrency(grossSalary)}</span>
                  </div>
                  <div className="flex justify-between border-t border-yellow-400/20 pt-3">
                    <span className="text-slate-400 font-medium">Net Salary</span>
                    <span className="text-blue-400 font-semibold">{formatCurrency(netSalary)}</span>
                  </div>
                </div>
              </div>

              <div className="bg-slate-800/40 backdrop-blur-xl rounded-2xl p-6 border border-yellow-400/30">
                <h3 className="text-lg font-semibold text-slate-50 mb-4">Bank Details</h3>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-slate-400">Bank Name</span>
                    <span className="text-slate-50">{employee.bankAccount.bankName}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Account Number</span>
                    <span className="text-slate-50">****{employee.bankAccount.accountNumber.slice(-4)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">IFSC Code</span>
                    <span className="text-slate-50">{employee.bankAccount.ifscCode}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Account Holder</span>
                    <span className="text-slate-50">{employee.bankAccount.accountHolderName}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );

      default:
        return (
          <div className="text-center py-12">
            <div className="bg-slate-700/30 backdrop-blur-sm rounded-full p-4 mb-4 border border-slate-600/50 inline-block">
              <FileText className="h-16 w-16 text-slate-400" />
            </div>
            <h3 className="text-xl font-bold text-slate-50 mb-2">{tabs.find(t => t.id === activeTab)?.name}</h3>
            <p className="text-slate-400">This section is coming soon!</p>
          </div>
        );
    }
  };

  return (
    <div className="h-full flex flex-col bg-slate-900 overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-yellow-400/30 flex-shrink-0">
        <div className="flex items-center space-x-4">
          <button
            onClick={onBack}
            className="p-2 text-slate-400 hover:text-slate-50 hover:bg-slate-700/50 rounded-lg transition-all"
          >
            <ArrowLeft className="h-5 w-5" />
          </button>
          <div className="flex items-center space-x-4">
            <div className="h-16 w-16 bg-slate-600/50 rounded-full flex items-center justify-center text-slate-50 font-bold text-xl border border-yellow-400/30">
              {employee.firstName.charAt(0)}{employee.lastName.charAt(0)}
            </div>
            <div>
              <h1 className="text-2xl font-bold text-slate-50">{employee.firstName} {employee.lastName}</h1>
              <p className="text-slate-400">{employee.designation} • {employee.department}</p>
              <p className="text-slate-500 text-sm">{employee.employeeId} • {employee.branch}</p>
            </div>
          </div>
        </div>
        <div className="flex space-x-3">
          <button className="inline-flex items-center px-4 py-2 border border-yellow-400/30 text-sm font-medium rounded-lg text-slate-50 bg-slate-700/50 hover:bg-slate-700 transition-all backdrop-blur-sm">
            <Download className="h-4 w-4 mr-2" />
            Export Profile
          </button>
          <button className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-lg shadow-sm text-white bg-blue-600 hover:bg-blue-700 transition-all">
            <Edit className="h-4 w-4 mr-2" />
            Edit Employee
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
              </button>
            );
          })}
        </nav>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto p-4 scrollbar-none">
        {renderTabContent()}
      </div>
    </div>
  );
};