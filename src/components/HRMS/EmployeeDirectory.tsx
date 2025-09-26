import React, { useState, useMemo } from 'react';
import {
  Plus,
  Search,
  Edit,
  Trash2,
  Users,
  Mail,
  Phone,
  MapPin,
  Calendar,
  Building,
  User,
  Eye,
  MoreVertical,
  Filter,
  Download,
  Upload,
  UserCheck,
  UserX,
  Clock,
  Award,
  Briefcase,
  GraduationCap,
  Star,
  CheckCircle,
  XCircle,
  AlertTriangle
} from 'lucide-react';
import { Employee } from '../../types/hrms';

const sampleEmployees: Employee[] = [
  {
    id: '1',
    employeeId: 'EMP001',
    firstName: 'Prakashh',
    lastName: 'Admin',
    email: 'prakashh@ramnirmalchits.com',
    phone: '+91 98765 43210',
    dateOfBirth: '1985-06-15',
    gender: 'male',
    maritalStatus: 'married',
    address: '123 Tech Park, Electronic City',
    city: 'Bangalore',
    state: 'Karnataka',
    country: 'India',
    postalCode: '560100',
    designation: 'Chief Executive Officer',
    department: 'Executive',
    branch: 'Bangalore Main',
    joiningDate: '2020-01-01',
    probationPeriod: 0,
    employmentType: 'permanent',
    workLocation: 'office',
    teamMembers: ['2', '3', '4'],
    basicSalary: 150000,
    allowances: { hra: 60000, transport: 5000, medical: 10000, special: 25000 },
    deductions: { pf: 18000, esi: 0, tax: 35000, other: 0 },
    bankAccount: {
      accountNumber: '1234567890',
      bankName: 'HDFC Bank',
      ifscCode: 'HDFC0001234',
      accountHolderName: 'Prakashh Admin'
    },
    documents: {},
    skills: ['Leadership', 'Strategic Planning', 'Business Development'],
    qualifications: [
      { degree: 'MBA', institution: 'IIM Bangalore', year: '2008', percentage: 85 }
    ],
    experience: [],
    status: 'active',
    emergencyContact: {
      name: 'Priya Prakashh',
      relationship: 'Spouse',
      phone: '+91 98765 43212'
    },
    createdAt: '2020-01-01',
    createdBy: 'system',
    updatedAt: '2024-03-15',
    updatedBy: 'prakashh@ramnirmalchits.com',
    notes: 'Founder and CEO of the company'
  },
  {
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
    skills: ['Team Management', 'Operations', 'Customer Relations'],
    qualifications: [
      { degree: 'B.Com', institution: 'Bangalore University', year: '2010', percentage: 78 }
    ],
    experience: [
      { company: 'Previous Finance Co', designation: 'Assistant Manager', duration: '2015-2020', responsibilities: 'Branch operations and team management' }
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
  },
  {
    id: '3',
    employeeId: 'EMP003',
    firstName: 'Priya',
    lastName: 'Sharma',
    email: 'priya.sharma@ramnirmalchits.com',
    phone: '+91 98765 43215',
    dateOfBirth: '1990-07-18',
    gender: 'female',
    maritalStatus: 'single',
    address: '789 Koramangala, Bangalore',
    city: 'Bangalore',
    state: 'Karnataka',
    country: 'India',
    postalCode: '560034',
    designation: 'Sales Executive',
    department: 'Sales & Marketing',
    branch: 'Bangalore Main',
    joiningDate: '2021-06-01',
    reportingManager: 'Rajesh Kumar',
    probationPeriod: 3,
    employmentType: 'permanent',
    workLocation: 'hybrid',
    teamMembers: [],
    basicSalary: 45000,
    allowances: { hra: 18000, transport: 2000, medical: 3000, special: 5000 },
    deductions: { pf: 5400, esi: 380, tax: 5000, other: 0 },
    bankAccount: {
      accountNumber: '3456789012',
      bankName: 'ICICI Bank',
      ifscCode: 'ICIC0001234',
      accountHolderName: 'Priya Sharma'
    },
    documents: {},
    skills: ['Sales', 'Customer Acquisition', 'Lead Generation'],
    qualifications: [
      { degree: 'BBA', institution: 'Christ University', year: '2012', percentage: 82 }
    ],
    experience: [
      { company: 'Sales Corp', designation: 'Sales Associate', duration: '2019-2021', responsibilities: 'Lead generation and customer acquisition' }
    ],
    status: 'active',
    emergencyContact: {
      name: 'Ramesh Sharma',
      relationship: 'Father',
      phone: '+91 98765 43216'
    },
    createdAt: '2021-06-01',
    createdBy: 'rajesh.kumar@ramnirmalchits.com',
    updatedAt: '2024-03-01',
    updatedBy: 'priya.sharma@ramnirmalchits.com',
    notes: 'Top performing sales executive'
  },
  {
    id: '4',
    employeeId: 'EMP004',
    firstName: 'Amit',
    lastName: 'Patel',
    email: 'amit.patel@ramnirmalchits.com',
    phone: '+91 98765 43217',
    dateOfBirth: '1987-11-25',
    gender: 'male',
    maritalStatus: 'married',
    address: '321 Whitefield, Bangalore',
    city: 'Bangalore',
    state: 'Karnataka',
    country: 'India',
    postalCode: '560066',
    designation: 'Finance Manager',
    department: 'Finance & Accounts',
    branch: 'Bangalore Main',
    joiningDate: '2020-08-15',
    reportingManager: 'Prakashh Admin',
    probationPeriod: 6,
    employmentType: 'permanent',
    workLocation: 'office',
    teamMembers: ['6'],
    basicSalary: 75000,
    allowances: { hra: 30000, transport: 3000, medical: 5000, special: 8000 },
    deductions: { pf: 9000, esi: 0, tax: 12000, other: 0 },
    bankAccount: {
      accountNumber: '4567890123',
      bankName: 'Axis Bank',
      ifscCode: 'UTIB0001234',
      accountHolderName: 'Amit Patel'
    },
    documents: {},
    skills: ['Financial Analysis', 'Accounting', 'Compliance'],
    qualifications: [
      { degree: 'CA', institution: 'ICAI', year: '2010', percentage: 88 }
    ],
    experience: [
      { company: 'Audit Firm', designation: 'Senior Associate', duration: '2010-2020', responsibilities: 'Financial auditing and compliance' }
    ],
    status: 'active',
    emergencyContact: {
      name: 'Neha Patel',
      relationship: 'Spouse',
      phone: '+91 98765 43218'
    },
    createdAt: '2020-08-15',
    createdBy: 'prakashh@ramnirmalchits.com',
    updatedAt: '2024-02-20',
    updatedBy: 'amit.patel@ramnirmalchits.com',
    notes: 'Experienced finance professional with strong compliance background'
  },
  {
    id: '5',
    employeeId: 'EMP005',
    firstName: 'Sunita',
    lastName: 'Reddy',
    email: 'sunita.reddy@ramnirmalchits.com',
    phone: '+91 98765 43219',
    dateOfBirth: '1989-04-12',
    gender: 'female',
    maritalStatus: 'married',
    address: '654 HSR Layout, Bangalore',
    city: 'Bangalore',
    state: 'Karnataka',
    country: 'India',
    postalCode: '560102',
    designation: 'HR Manager',
    department: 'Human Resources',
    branch: 'Bangalore Main',
    joiningDate: '2021-01-10',
    reportingManager: 'Prakashh Admin',
    probationPeriod: 6,
    employmentType: 'permanent',
    workLocation: 'office',
    teamMembers: [],
    basicSalary: 65000,
    allowances: { hra: 26000, transport: 2500, medical: 4000, special: 6500 },
    deductions: { pf: 7800, esi: 550, tax: 8000, other: 0 },
    bankAccount: {
      accountNumber: '5678901234',
      bankName: 'Kotak Bank',
      ifscCode: 'KKBK0001234',
      accountHolderName: 'Sunita Reddy'
    },
    documents: {},
    skills: ['Recruitment', 'Employee Relations', 'Training & Development'],
    qualifications: [
      { degree: 'MBA HR', institution: 'Symbiosis', year: '2011', percentage: 80 }
    ],
    experience: [
      { company: 'HR Solutions', designation: 'HR Executive', duration: '2015-2021', responsibilities: 'Recruitment and employee engagement' }
    ],
    status: 'active',
    emergencyContact: {
      name: 'Ravi Reddy',
      relationship: 'Spouse',
      phone: '+91 98765 43220'
    },
    createdAt: '2021-01-10',
    createdBy: 'prakashh@ramnirmalchits.com',
    updatedAt: '2024-01-15',
    updatedBy: 'sunita.reddy@ramnirmalchits.com',
    notes: 'Dedicated HR professional with strong recruitment skills'
  },
  {
    id: '6',
    employeeId: 'EMP006',
    firstName: 'Karthik',
    lastName: 'Nair',
    email: 'karthik.nair@ramnirmalchits.com',
    phone: '+91 98765 43221',
    dateOfBirth: '1991-09-08',
    gender: 'male',
    maritalStatus: 'single',
    address: '987 Indiranagar, Bangalore',
    city: 'Bangalore',
    state: 'Karnataka',
    country: 'India',
    postalCode: '560038',
    designation: 'Accountant',
    department: 'Finance & Accounts',
    branch: 'Bangalore Main',
    joiningDate: '2022-03-01',
    reportingManager: 'Amit Patel',
    probationPeriod: 3,
    employmentType: 'permanent',
    workLocation: 'office',
    teamMembers: [],
    basicSalary: 35000,
    allowances: { hra: 14000, transport: 1500, medical: 2500, special: 3000 },
    deductions: { pf: 4200, esi: 295, tax: 2000, other: 0 },
    bankAccount: {
      accountNumber: '6789012345',
      bankName: 'Canara Bank',
      ifscCode: 'CNRB0001234',
      accountHolderName: 'Karthik Nair'
    },
    documents: {},
    skills: ['Accounting', 'Tally', 'GST Compliance'],
    qualifications: [
      { degree: 'B.Com', institution: 'Kerala University', year: '2013', percentage: 75 }
    ],
    experience: [
      { company: 'Accounting Firm', designation: 'Junior Accountant', duration: '2018-2022', responsibilities: 'Books maintenance and GST filing' }
    ],
    status: 'active',
    emergencyContact: {
      name: 'Meera Nair',
      relationship: 'Mother',
      phone: '+91 98765 43222'
    },
    createdAt: '2022-03-01',
    createdBy: 'amit.patel@ramnirmalchits.com',
    updatedAt: '2024-02-10',
    updatedBy: 'karthik.nair@ramnirmalchits.com',
    notes: 'Detail-oriented accountant with good technical skills'
  }
];

const EmployeeCard: React.FC<{ employee: Employee }> = React.memo(({ employee }) => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800 border-green-200';
      case 'inactive': return 'bg-gray-100 text-gray-800 border-gray-200';
      case 'terminated': return 'bg-red-100 text-red-800 border-red-200';
      case 'on-leave': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getEmploymentTypeColor = (type: string) => {
    switch (type) {
      case 'permanent': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'contract': return 'bg-orange-100 text-orange-800 border-orange-200';
      case 'intern': return 'bg-purple-100 text-purple-800 border-purple-200';
      case 'consultant': return 'bg-pink-100 text-pink-800 border-pink-200';
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

  const calculateTenure = (joiningDate: string) => {
    const joining = new Date(joiningDate);
    const now = new Date();
    const diffTime = Math.abs(now.getTime() - joining.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    const years = Math.floor(diffDays / 365);
    const months = Math.floor((diffDays % 365) / 30);
    
    if (years > 0) {
      return `${years}y ${months}m`;
    }
    return `${months}m`;
  };

  return (
    <div className="bg-slate-800/40 backdrop-blur-xl rounded-2xl p-6 border border-yellow-400/30 hover:border-yellow-400/50 transition-all">
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center space-x-3">
          <div className="h-12 w-12 bg-slate-600/50 rounded-full flex items-center justify-center text-slate-50 font-semibold text-lg border border-yellow-400/30">
            {employee.firstName.charAt(0)}{employee.lastName.charAt(0)}
          </div>
          <div>
            <h3 className="text-lg font-semibold text-slate-50">{employee.firstName} {employee.lastName}</h3>
            <p className="text-sm text-slate-400">{employee.designation}</p>
            <p className="text-xs text-slate-500">{employee.employeeId}</p>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium border ${getEmploymentTypeColor(employee.employmentType)}`}>
            {employee.employmentType.toUpperCase()}
          </span>
          <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium border ${getStatusColor(employee.status)}`}>
            {employee.status.toUpperCase()}
          </span>
          <button className="p-2 text-slate-400 hover:text-slate-50 hover:bg-slate-700/50 rounded-lg transition-all">
            <MoreVertical className="h-4 w-4" />
          </button>
        </div>
      </div>

      <div className="space-y-2 mb-4">
        <div className="flex items-center text-sm text-slate-300">
          <Mail className="h-4 w-4 mr-2 text-slate-500" />
          <span className="truncate">{employee.email}</span>
        </div>
        <div className="flex items-center text-sm text-slate-300">
          <Phone className="h-4 w-4 mr-2 text-slate-500" />
          <span>{employee.phone}</span>
        </div>
        <div className="flex items-center text-sm text-slate-300">
          <Building className="h-4 w-4 mr-2 text-slate-500" />
          <span>{employee.department} • {employee.branch}</span>
        </div>
        <div className="flex items-center text-sm text-slate-300">
          <User className="h-4 w-4 mr-2 text-slate-500" />
          <span>{employee.reportingManager || 'No Manager'}</span>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 mb-4 pt-4 border-t border-yellow-400/20">
        <div>
          <p className="text-xs text-slate-500">Tenure</p>
          <p className="text-sm font-semibold text-slate-50">{calculateTenure(employee.joiningDate)}</p>
        </div>
        <div>
          <p className="text-xs text-slate-500">Basic Salary</p>
          <p className="text-sm font-semibold text-green-400">{formatCurrency(employee.basicSalary)}</p>
        </div>
        <div>
          <p className="text-xs text-slate-500">Team Size</p>
          <p className="text-sm font-semibold text-slate-50">{employee.teamMembers.length}</p>
        </div>
        <div>
          <p className="text-xs text-slate-500">Work Location</p>
          <p className="text-sm font-semibold text-blue-400 capitalize">{employee.workLocation}</p>
        </div>
      </div>

      {/* Skills */}
      {employee.skills.length > 0 && (
        <div className="mb-4">
          <p className="text-xs text-slate-500 mb-2">Skills</p>
          <div className="flex flex-wrap gap-1">
            {employee.skills.slice(0, 3).map((skill, index) => (
              <span key={index} className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-blue-100 text-blue-800 border border-blue-200">
                {skill}
              </span>
            ))}
            {employee.skills.length > 3 && (
              <span className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-slate-100 text-slate-800 border border-slate-200">
                +{employee.skills.length - 3} more
              </span>
            )}
          </div>
        </div>
      )}

      <div className="flex justify-between items-center pt-4 border-t border-yellow-400/20">
        <div className="flex items-center text-xs text-slate-500">
          <Calendar className="h-3 w-3 mr-1" />
          <span>Joined {new Date(employee.joiningDate).toLocaleDateString()}</span>
        </div>
        <div className="flex space-x-2">
          <button className="p-2 text-slate-400 hover:text-blue-400 hover:bg-blue-500/10 rounded-lg transition-all">
            <Eye className="h-4 w-4" />
          </button>
          <button className="p-2 text-slate-400 hover:text-green-400 hover:bg-green-500/10 rounded-lg transition-all">
            <Edit className="h-4 w-4" />
          </button>
          <button className="p-2 text-slate-400 hover:text-red-400 hover:bg-red-500/10 rounded-lg transition-all">
            <Trash2 className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );
});

const EmployeeTable: React.FC<{ employees: Employee[] }> = React.memo(({ employees }) => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800';
      case 'inactive': return 'bg-gray-100 text-gray-800';
      case 'terminated': return 'bg-red-100 text-red-800';
      case 'on-leave': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
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
    <div className="bg-slate-800/40 backdrop-blur-xl rounded-2xl border border-yellow-400/30 overflow-hidden">
      <div className="overflow-x-auto max-h-[600px] overflow-y-auto">
        <table className="w-full">
          <thead className="bg-slate-700/50 border-b border-yellow-400/20 sticky top-0">
            <tr>
              <th className="px-6 py-4 text-left text-xs font-medium text-slate-300 uppercase tracking-wider">Employee</th>
              <th className="px-6 py-4 text-left text-xs font-medium text-slate-300 uppercase tracking-wider">Department</th>
              <th className="px-6 py-4 text-left text-xs font-medium text-slate-300 uppercase tracking-wider">Contact</th>
              <th className="px-6 py-4 text-left text-xs font-medium text-slate-300 uppercase tracking-wider">Salary</th>
              <th className="px-6 py-4 text-left text-xs font-medium text-slate-300 uppercase tracking-wider">Status</th>
              <th className="px-6 py-4 text-left text-xs font-medium text-slate-300 uppercase tracking-wider">Joining Date</th>
              <th className="px-6 py-4 text-left text-xs font-medium text-slate-300 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-yellow-400/20">
            {employees.map((employee) => (
              <tr key={employee.id} className="hover:bg-slate-700/20 transition-colors">
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center space-x-3">
                    <div className="h-10 w-10 bg-slate-600/50 rounded-full flex items-center justify-center text-slate-50 font-medium border border-yellow-400/30">
                      {employee.firstName.charAt(0)}{employee.lastName.charAt(0)}
                    </div>
                    <div>
                      <p className="text-sm font-medium text-slate-50">{employee.firstName} {employee.lastName}</p>
                      <p className="text-xs text-slate-400">{employee.employeeId} • {employee.designation}</p>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div>
                    <p className="text-sm font-medium text-slate-50">{employee.department}</p>
                    <p className="text-xs text-slate-400">{employee.branch}</p>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div>
                    <p className="text-sm text-slate-300">{employee.email}</p>
                    <p className="text-xs text-slate-400">{employee.phone}</p>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div>
                    <p className="text-sm font-medium text-slate-50">{formatCurrency(employee.basicSalary)}</p>
                    <p className="text-xs text-slate-400">{employee.employmentType}</p>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(employee.status)}`}>
                    {employee.status}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-300">
                  {new Date(employee.joiningDate).toLocaleDateString()}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <div className="flex space-x-2">
                    <button className="text-blue-400 hover:text-blue-300">
                      <Eye className="h-4 w-4" />
                    </button>
                    <button className="text-green-400 hover:text-green-300">
                      <Edit className="h-4 w-4" />
                    </button>
                    <button className="text-red-400 hover:text-red-300">
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
});

export const EmployeeDirectory: React.FC = () => {
  const [employees] = useState<Employee[]>(sampleEmployees);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [filterDepartment, setFilterDepartment] = useState<string>('all');
  const [filterEmploymentType, setFilterEmploymentType] = useState<string>('all');
  const [viewMode, setViewMode] = useState<'cards' | 'table'>('cards');

  const filteredEmployees = useMemo(() => employees.filter(employee => {
    const matchesSearch = employee.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         employee.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         employee.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         employee.employeeId.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === 'all' || employee.status === filterStatus;
    const matchesDepartment = filterDepartment === 'all' || employee.department === filterDepartment;
    const matchesEmploymentType = filterEmploymentType === 'all' || employee.employmentType === filterEmploymentType;
    
    return matchesSearch && matchesStatus && matchesDepartment && matchesEmploymentType;
  }), [employees, searchTerm, filterStatus, filterDepartment, filterEmploymentType]);

  const stats = useMemo(() => ({
    total: employees.length,
    active: employees.filter(e => e.status === 'active').length,
    inactive: employees.filter(e => e.status === 'inactive').length,
    terminated: employees.filter(e => e.status === 'terminated').length,
    onLeave: employees.filter(e => e.status === 'on-leave').length,
    permanent: employees.filter(e => e.employmentType === 'permanent').length,
    contract: employees.filter(e => e.employmentType === 'contract').length,
    intern: employees.filter(e => e.employmentType === 'intern').length,
    consultant: employees.filter(e => e.employmentType === 'consultant').length,
    totalSalary: employees.reduce((sum, e) => sum + e.basicSalary, 0),
    avgSalary: employees.length > 0 ? employees.reduce((sum, e) => sum + e.basicSalary, 0) / employees.length : 0
  }), [employees]);

  const uniqueDepartments = useMemo(() => [...new Set(employees.map(e => e.department))], [employees]);

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0,
    }).format(amount);
  };

  return (
    <div className="h-full flex flex-col bg-slate-900 overflow-hidden">
      {/* Header */}
      <div className="flex justify-between items-center p-4 border-b border-yellow-400/30 flex-shrink-0">
        <div>
          <h1 className="text-2xl font-bold text-slate-50">Employee Directory</h1>
          <p className="mt-1 text-sm text-slate-400">
            Comprehensive employee management with profiles and organizational structure
          </p>
        </div>
        <div className="flex space-x-3">
          <button className="inline-flex items-center px-4 py-2 border border-yellow-400/30 text-sm font-medium rounded-lg text-slate-50 bg-slate-700/50 hover:bg-slate-700 transition-all backdrop-blur-sm">
            <Upload className="h-4 w-4 mr-2" />
            Import Employees
          </button>
          <button className="inline-flex items-center px-4 py-2 border border-yellow-400/30 text-sm font-medium rounded-lg text-slate-50 bg-slate-700/50 hover:bg-slate-700 transition-all backdrop-blur-sm">
            <Download className="h-4 w-4 mr-2" />
            Export
          </button>
          <button className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-lg shadow-sm text-white bg-blue-600 hover:bg-blue-700 transition-all">
            <Plus className="h-4 w-4 mr-2" />
            Add Employee
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto p-4 space-y-6 scrollbar-none">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 lg:grid-cols-11 gap-4">
          <div className="bg-slate-800/40 backdrop-blur-xl p-4 rounded-xl border border-yellow-400/30">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-400">Total</p>
                <p className="text-2xl font-bold text-slate-50">{stats.total}</p>
              </div>
              <Users className="h-8 w-8 text-blue-400" />
            </div>
          </div>
          <div className="bg-slate-800/40 backdrop-blur-xl p-4 rounded-xl border border-yellow-400/30">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-400">Active</p>
                <p className="text-2xl font-bold text-green-400">{stats.active}</p>
              </div>
              <CheckCircle className="h-8 w-8 text-green-400" />
            </div>
          </div>
          <div className="bg-slate-800/40 backdrop-blur-xl p-4 rounded-xl border border-yellow-400/30">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-400">Inactive</p>
                <p className="text-2xl font-bold text-gray-400">{stats.inactive}</p>
              </div>
              <XCircle className="h-8 w-8 text-gray-400" />
            </div>
          </div>
          <div className="bg-slate-800/40 backdrop-blur-xl p-4 rounded-xl border border-yellow-400/30">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-400">On Leave</p>
                <p className="text-2xl font-bold text-yellow-400">{stats.onLeave}</p>
              </div>
              <Clock className="h-8 w-8 text-yellow-400" />
            </div>
          </div>
          <div className="bg-slate-800/40 backdrop-blur-xl p-4 rounded-xl border border-yellow-400/30">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-400">Permanent</p>
                <p className="text-2xl font-bold text-blue-400">{stats.permanent}</p>
              </div>
              <UserCheck className="h-8 w-8 text-blue-400" />
            </div>
          </div>
          <div className="bg-slate-800/40 backdrop-blur-xl p-4 rounded-xl border border-yellow-400/30">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-400">Contract</p>
                <p className="text-2xl font-bold text-orange-400">{stats.contract}</p>
              </div>
              <Briefcase className="h-8 w-8 text-orange-400" />
            </div>
          </div>
          <div className="bg-slate-800/40 backdrop-blur-xl p-4 rounded-xl border border-yellow-400/30">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-400">Interns</p>
                <p className="text-2xl font-bold text-purple-400">{stats.intern}</p>
              </div>
              <GraduationCap className="h-8 w-8 text-purple-400" />
            </div>
          </div>
          <div className="bg-slate-800/40 backdrop-blur-xl p-4 rounded-xl border border-yellow-400/30">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-400">Consultants</p>
                <p className="text-2xl font-bold text-pink-400">{stats.consultant}</p>
              </div>
              <Star className="h-8 w-8 text-pink-400" />
            </div>
          </div>
          <div className="bg-slate-800/40 backdrop-blur-xl p-4 rounded-xl border border-yellow-400/30">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-400">Terminated</p>
                <p className="text-2xl font-bold text-red-400">{stats.terminated}</p>
              </div>
              <UserX className="h-8 w-8 text-red-400" />
            </div>
          </div>
          <div className="bg-slate-800/40 backdrop-blur-xl p-4 rounded-xl border border-yellow-400/30 md:col-span-2">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-400">Total Salary</p>
                <p className="text-xl font-bold text-yellow-400">{formatCurrency(stats.totalSalary)}</p>
              </div>
              <div className="h-8 w-8 bg-yellow-500/20 rounded-lg flex items-center justify-center">
                <span className="text-yellow-400 font-bold">₹</span>
              </div>
            </div>
          </div>
        </div>

        {/* Filters and View Toggle */}
        <div className="bg-slate-800/40 backdrop-blur-xl rounded-xl p-4 border border-yellow-400/30">
          <div className="grid grid-cols-1 md:grid-cols-6 gap-4 items-center">
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
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="px-3 py-2 bg-slate-700/50 border border-yellow-400/30 rounded-lg text-slate-50 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 backdrop-blur-sm"
            >
              <option value="all">All Status</option>
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
              <option value="terminated">Terminated</option>
              <option value="on-leave">On Leave</option>
            </select>
            <select
              value={filterDepartment}
              onChange={(e) => setFilterDepartment(e.target.value)}
              className="px-3 py-2 bg-slate-700/50 border border-yellow-400/30 rounded-lg text-slate-50 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 backdrop-blur-sm"
            >
              <option value="all">All Departments</option>
              {uniqueDepartments.map(dept => (
                <option key={dept} value={dept}>{dept}</option>
              ))}
            </select>
            <select
              value={filterEmploymentType}
              onChange={(e) => setFilterEmploymentType(e.target.value)}
              className="px-3 py-2 bg-slate-700/50 border border-yellow-400/30 rounded-lg text-slate-50 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 backdrop-blur-sm"
            >
              <option value="all">All Types</option>
              <option value="permanent">Permanent</option>
              <option value="contract">Contract</option>
              <option value="intern">Intern</option>
              <option value="consultant">Consultant</option>
            </select>
            <div className="text-sm text-slate-400">
              Showing: <span className="font-semibold text-slate-50">{filteredEmployees.length}</span> employees
            </div>
            <div className="flex bg-slate-700/50 backdrop-blur-sm rounded-lg p-1 border border-yellow-400/20">
              <button
                onClick={() => setViewMode('cards')}
                className={`px-3 py-1 text-sm rounded-md transition-colors ${
                  viewMode === 'cards'
                    ? 'bg-blue-500 text-slate-50'
                    : 'text-slate-300 hover:text-slate-50'
                }`}
              >
                Cards
              </button>
              <button
                onClick={() => setViewMode('table')}
                className={`px-3 py-1 text-sm rounded-md transition-colors ${
                  viewMode === 'table'
                    ? 'bg-blue-500 text-slate-50'
                    : 'text-slate-300 hover:text-slate-50'
                }`}
              >
                Table
              </button>
            </div>
          </div>
        </div>

        {/* Employees Display */}
        {viewMode === 'cards' ? (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {filteredEmployees.map((employee) => (
              <EmployeeCard key={employee.id} employee={employee} />
            ))}
          </div>
        ) : (
          <div className="max-h-[600px] overflow-y-auto">
            <EmployeeTable employees={filteredEmployees} />
          </div>
        )}

        {filteredEmployees.length === 0 && (
          <div className="text-center py-12">
            <Users className="h-12 w-12 mx-auto text-slate-500 mb-4" />
            <h3 className="text-lg font-medium text-slate-50 mb-2">No employees found</h3>
            <p className="text-sm text-slate-400">Try adjusting your search criteria or add a new employee.</p>
          </div>
        )}
      </div>
    </div>
  );
};