import React, { useState } from 'react';
import { useMemo } from 'react';
import {
  Plus,
  Search,
  Edit,
  Trash2,
  Users as UsersIcon,
  Shield,
  Mail,
  Phone,
  MapPin,
  Calendar,
  Clock,
  Eye,
  MoreVertical,
  UserCheck,
  UserX,
  Crown,
  Star,
  Building,
  Filter,
  Download,
  Upload,
  Settings,
  Key,
  AlertTriangle,
  CheckCircle,
  XCircle,
  Briefcase,
  GraduationCap,
  Globe,
  Smartphone,
  Lock,
  Unlock
} from 'lucide-react';

interface User {
  id: string;
  // Basic Information
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  alternatePhone?: string;
  
  // Profile Information
  avatar?: string;
  dateOfBirth?: string;
  gender: 'male' | 'female' | 'other' | 'prefer-not-to-say';
  maritalStatus: 'single' | 'married' | 'divorced' | 'widowed';
  
  // Address Information
  address: string;
  city: string;
  state: string;
  country: string;
  postalCode: string;
  
  // User Category
  category: 'employee' | 'agent' | 'subscriber';
  
  // Professional Information
  employeeId?: string;
  designation: string;
  department: string;
  branch: string;
  joiningDate: string;
  reportingManager?: string;
  
  // System Information
  roleId: string;
  roleName: string;
  status: 'active' | 'inactive' | 'suspended' | 'pending';
  lastLogin?: string;
  loginCount: number;
  
  // Security & Access
  twoFactorEnabled: boolean;
  passwordLastChanged: string;
  accountLocked: boolean;
  failedLoginAttempts: number;
  
  // Additional Information
  skills: string[];
  languages: string[];
  emergencyContact: {
    name: string;
    relationship: string;
    phone: string;
  };
  
  // Future Links
  linkedEmployee?: string;
  linkedAgent?: string;
  linkedSubscriber?: string;
  
  // Metadata
  createdAt: string;
  createdBy: string;
  updatedAt: string;
  updatedBy: string;
  notes: string;
}

const sampleUsers: User[] = [
  {
    id: '1',
    firstName: 'Prakashh',
    lastName: 'Admin',
    email: 'prakashh@ramnirmalchits.com',
    phone: '+91 98765 43210',
    alternatePhone: '+91 98765 43211',
    dateOfBirth: '1985-06-15',
    gender: 'male',
    maritalStatus: 'married',
    address: '123 Tech Park, Electronic City',
    city: 'Bangalore',
    state: 'Karnataka',
    country: 'India',
    postalCode: '560100',
    category: 'employee',
    employeeId: 'EMP001',
    designation: 'Chief Executive Officer',
    department: 'Executive',
    branch: 'Bangalore Main',
    joiningDate: '2020-01-01',
    roleId: '1',
    roleName: 'Super Administrator',
    status: 'active',
    lastLogin: '2024-03-15T14:08:55',
    loginCount: 1250,
    twoFactorEnabled: true,
    passwordLastChanged: '2024-02-15',
    accountLocked: false,
    failedLoginAttempts: 0,
    skills: ['Leadership', 'Strategic Planning', 'Business Development'],
    languages: ['English', 'Hindi', 'Kannada'],
    emergencyContact: {
      name: 'Priya Prakashh',
      relationship: 'Spouse',
      phone: '+91 98765 43212'
    },
    createdAt: '2020-01-01',
    createdBy: 'System',
    updatedAt: '2024-03-15',
    updatedBy: 'prakashh@ramnirmalchits.com',
    notes: 'Founder and CEO of the company'
  },
  {
    id: '2',
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
    category: 'employee',
    employeeId: 'EMP002',
    designation: 'Branch Manager',
    department: 'Operations',
    branch: 'Bangalore Main',
    joiningDate: '2020-02-15',
    reportingManager: 'Prakashh Admin',
    roleId: '2',
    roleName: 'Branch Manager',
    status: 'active',
    lastLogin: '2024-03-15T09:30:00',
    loginCount: 890,
    twoFactorEnabled: true,
    passwordLastChanged: '2024-01-20',
    accountLocked: false,
    failedLoginAttempts: 0,
    skills: ['Team Management', 'Operations', 'Customer Relations'],
    languages: ['English', 'Hindi', 'Tamil'],
    emergencyContact: {
      name: 'Sunita Kumar',
      relationship: 'Spouse',
      phone: '+91 98765 43214'
    },
    createdAt: '2020-02-15',
    createdBy: 'prakashh@ramnirmalchits.com',
    updatedAt: '2024-03-10',
    updatedBy: 'prakashh@ramnirmalchits.com',
    notes: 'Experienced branch manager with excellent track record'
  },
  {
    id: '3',
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
    category: 'employee',
    employeeId: 'EMP003',
    designation: 'Sales Executive',
    department: 'Sales & Marketing',
    branch: 'Bangalore Main',
    joiningDate: '2021-06-01',
    reportingManager: 'Rajesh Kumar',
    roleId: '3',
    roleName: 'Sales Executive',
    status: 'active',
    lastLogin: '2024-03-14T16:45:00',
    loginCount: 456,
    twoFactorEnabled: false,
    passwordLastChanged: '2024-03-01',
    accountLocked: false,
    failedLoginAttempts: 0,
    skills: ['Sales', 'Customer Acquisition', 'Lead Generation'],
    languages: ['English', 'Hindi', 'Kannada'],
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
    firstName: 'Karthik',
    lastName: 'Nair',
    email: 'karthik.nair@agents.ramnirmalchits.com',
    phone: '+91 98765 43217',
    dateOfBirth: '1989-08-12',
    gender: 'male',
    maritalStatus: 'married',
    address: '456 Jayanagar, Bangalore',
    city: 'Bangalore',
    state: 'Karnataka',
    country: 'India',
    postalCode: '560041',
    category: 'agent',
    employeeId: 'AGT001',
    designation: 'Senior Sales Agent',
    department: 'Sales & Marketing',
    branch: 'Bangalore South',
    joiningDate: '2021-03-10',
    reportingManager: 'Rajesh Kumar',
    roleId: '6',
    roleName: 'Sales Agent',
    status: 'active',
    lastLogin: '2024-03-14T18:30:00',
    loginCount: 324,
    twoFactorEnabled: true,
    passwordLastChanged: '2024-02-20',
    accountLocked: false,
    failedLoginAttempts: 0,
    skills: ['Customer Relations', 'Chit Fund Sales', 'Territory Management'],
    languages: ['English', 'Hindi', 'Kannada', 'Malayalam'],
    emergencyContact: {
      name: 'Meera Nair',
      relationship: 'Spouse',
      phone: '+91 98765 43218'
    },
    linkedAgent: 'AGT001',
    createdAt: '2021-03-10',
    createdBy: 'rajesh.kumar@ramnirmalchits.com',
    updatedAt: '2024-02-20',
    updatedBy: 'karthik.nair@agents.ramnirmalchits.com',
    notes: 'Top performing agent with excellent customer relationships'
  },
  {
    id: '5',
    firstName: 'Anita',
    lastName: 'Desai',
    email: 'anita.desai@subscribers.ramnirmalchits.com',
    phone: '+91 98765 43219',
    dateOfBirth: '1992-12-05',
    gender: 'female',
    maritalStatus: 'single',
    address: '789 Indiranagar, Bangalore',
    city: 'Bangalore',
    state: 'Karnataka',
    country: 'India',
    postalCode: '560038',
    category: 'subscriber',
    employeeId: 'SUB001',
    designation: 'Premium Subscriber',
    department: 'Customer',
    branch: 'Bangalore Main',
    joiningDate: '2022-06-15',
    roleId: '7',
    roleName: 'Subscriber',
    status: 'active',
    lastLogin: '2024-03-13T10:45:00',
    loginCount: 89,
    twoFactorEnabled: false,
    passwordLastChanged: '2024-01-10',
    accountLocked: false,
    failedLoginAttempts: 0,
    skills: ['Investment Planning', 'Financial Literacy'],
    languages: ['English', 'Hindi', 'Gujarati'],
    emergencyContact: {
      name: 'Ramesh Desai',
      relationship: 'Father',
      phone: '+91 98765 43220'
    },
    linkedSubscriber: 'SUB001',
    createdAt: '2022-06-15',
    createdBy: 'karthik.nair@agents.ramnirmalchits.com',
    updatedAt: '2024-01-10',
    updatedBy: 'anita.desai@subscribers.ramnirmalchits.com',
    notes: 'Active subscriber in multiple chit groups'
  },
  {
    id: '6',
    firstName: 'Vikram',
    lastName: 'Singh',
    email: 'vikram.singh@agents.ramnirmalchits.com',
    phone: '+91 98765 43221',
    dateOfBirth: '1986-04-18',
    gender: 'male',
    maritalStatus: 'married',
    address: '321 HSR Layout, Bangalore',
    city: 'Bangalore',
    state: 'Karnataka',
    country: 'India',
    postalCode: '560102',
    category: 'agent',
    employeeId: 'AGT002',
    designation: 'Field Sales Agent',
    department: 'Sales & Marketing',
    branch: 'Bangalore East',
    joiningDate: '2020-11-20',
    reportingManager: 'Rajesh Kumar',
    roleId: '6',
    roleName: 'Sales Agent',
    status: 'active',
    lastLogin: '2024-03-12T16:20:00',
    loginCount: 567,
    twoFactorEnabled: true,
    passwordLastChanged: '2024-01-25',
    accountLocked: false,
    failedLoginAttempts: 0,
    skills: ['Field Sales', 'Customer Onboarding', 'Market Research'],
    languages: ['English', 'Hindi', 'Punjabi'],
    emergencyContact: {
      name: 'Simran Singh',
      relationship: 'Spouse',
      phone: '+91 98765 43222'
    },
    linkedAgent: 'AGT002',
    createdAt: '2020-11-20',
    createdBy: 'rajesh.kumar@ramnirmalchits.com',
    updatedAt: '2024-01-25',
    updatedBy: 'vikram.singh@agents.ramnirmalchits.com',
    notes: 'Experienced field agent with strong rural market presence'
  },
  {
    id: '7',
    firstName: 'Deepika',
    lastName: 'Rao',
    email: 'deepika.rao@subscribers.ramnirmalchits.com',
    phone: '+91 98765 43223',
    dateOfBirth: '1988-09-25',
    gender: 'female',
    maritalStatus: 'married',
    address: '654 Whitefield, Bangalore',
    city: 'Bangalore',
    state: 'Karnataka',
    country: 'India',
    postalCode: '560066',
    category: 'subscriber',
    employeeId: 'SUB002',
    designation: 'Gold Subscriber',
    department: 'Customer',
    branch: 'Bangalore East',
    joiningDate: '2021-09-12',
    roleId: '7',
    roleName: 'Subscriber',
    status: 'active',
    lastLogin: '2024-03-11T14:30:00',
    loginCount: 156,
    twoFactorEnabled: true,
    passwordLastChanged: '2024-02-05',
    accountLocked: false,
    failedLoginAttempts: 0,
    skills: ['Investment Management', 'Risk Assessment'],
    languages: ['English', 'Kannada', 'Tamil'],
    emergencyContact: {
      name: 'Suresh Rao',
      relationship: 'Spouse',
      phone: '+91 98765 43224'
    },
    linkedSubscriber: 'SUB002',
    createdAt: '2021-09-12',
    createdBy: 'vikram.singh@agents.ramnirmalchits.com',
    updatedAt: '2024-02-05',
    updatedBy: 'deepika.rao@subscribers.ramnirmalchits.com',
    notes: 'Long-term subscriber with multiple high-value investments'
  }
];

const UserCard: React.FC<{ user: User }> = ({ user }) => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800 border-green-200';
      case 'inactive': return 'bg-gray-100 text-gray-800 border-gray-200';
      case 'suspended': return 'bg-red-100 text-red-800 border-red-200';
      case 'pending': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'employee': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'agent': return 'bg-purple-100 text-purple-800 border-purple-200';
      case 'subscriber': return 'bg-orange-100 text-orange-800 border-orange-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'employee': return Briefcase;
      case 'agent': return UserCheck;
      case 'subscriber': return Users;
      default: return Users;
    }
  };

  const getRoleIcon = (roleName: string) => {
    if (roleName.includes('Administrator')) return Crown;
    if (roleName.includes('Manager')) return Star;
    if (roleName.includes('Executive')) return UserCheck;
    return Shield;
  };

  const RoleIcon = getRoleIcon(user.roleName);
  const CategoryIcon = getCategoryIcon(user.category);

  return (
    <div className="bg-slate-800/40 backdrop-blur-xl rounded-2xl p-6 border border-yellow-400/30 hover:border-yellow-400/50 transition-all">
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center space-x-3">
          <div className="h-12 w-12 bg-slate-600/50 rounded-full flex items-center justify-center text-slate-50 font-semibold text-lg border border-yellow-400/30">
            {user.firstName.charAt(0)}{user.lastName.charAt(0)}
          </div>
          <div>
            <h3 className="text-lg font-semibold text-slate-50">{user.firstName} {user.lastName}</h3>
            <p className="text-sm text-slate-400">{user.designation}</p>
            <p className="text-xs text-slate-500">{user.employeeId}</p>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium border ${getCategoryColor(user.category)}`}>
            <CategoryIcon className="h-3 w-3 mr-1" />
            {user.category.toUpperCase()}
          </span>
          <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium border ${getStatusColor(user.status)}`}>
            {user.status.toUpperCase()}
          </span>
          <button className="p-2 text-slate-400 hover:text-slate-50 hover:bg-slate-700/50 rounded-lg transition-all">
            <MoreVertical className="h-4 w-4" />
          </button>
        </div>
      </div>

      <div className="space-y-2 mb-4">
        <div className="flex items-center text-sm text-slate-300">
          <Mail className="h-4 w-4 mr-2 text-slate-500" />
          <span className="truncate">{user.email}</span>
        </div>
        <div className="flex items-center text-sm text-slate-300">
          <Phone className="h-4 w-4 mr-2 text-slate-500" />
          <span>{user.phone}</span>
        </div>
        <div className="flex items-center text-sm text-slate-300">
          <Building className="h-4 w-4 mr-2 text-slate-500" />
          <span>{user.department} • {user.branch}</span>
        </div>
        <div className="flex items-center text-sm text-slate-300">
          <RoleIcon className="h-4 w-4 mr-2 text-slate-500" />
          <span>{user.roleName}</span>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 mb-4 pt-4 border-t border-yellow-400/20">
        <div>
          <p className="text-xs text-slate-500">Last Login</p>
          <p className="text-sm font-medium text-slate-50">
            {user.lastLogin ? new Date(user.lastLogin).toLocaleDateString() : 'Never'}
          </p>
        </div>
        <div>
          <p className="text-xs text-slate-500">Login Count</p>
          <p className="text-sm font-medium text-slate-50">{user.loginCount}</p>
        </div>
        <div>
          <p className="text-xs text-slate-500">2FA Status</p>
          <div className="flex items-center space-x-1">
            {user.twoFactorEnabled ? (
              <Lock className="h-3 w-3 text-green-400" />
            ) : (
              <Unlock className="h-3 w-3 text-red-400" />
            )}
            <p className={`text-sm font-medium ${user.twoFactorEnabled ? 'text-green-400' : 'text-red-400'}`}>
              {user.twoFactorEnabled ? 'Enabled' : 'Disabled'}
            </p>
          </div>
        </div>
        <div>
          <p className="text-xs text-slate-500">Joined</p>
          <p className="text-sm font-medium text-slate-50">
            {new Date(user.joiningDate).toLocaleDateString()}
          </p>
        </div>
      </div>

      {/* Skills */}
      {user.skills.length > 0 && (
        <div className="mb-4">
          <p className="text-xs text-slate-500 mb-2">Skills</p>
          <div className="flex flex-wrap gap-1">
            {user.skills.slice(0, 3).map((skill, index) => (
              <span key={index} className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-blue-100 text-blue-800 border border-blue-200">
                {skill}
              </span>
            ))}
            {user.skills.length > 3 && (
              <span className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-slate-100 text-slate-800 border border-slate-200">
                +{user.skills.length - 3} more
              </span>
            )}
          </div>
        </div>
      )}

      <div className="flex justify-between items-center pt-4 border-t border-yellow-400/20">
        <div className="flex items-center text-xs text-slate-500">
          <Calendar className="h-3 w-3 mr-1" />
          <span>Updated {new Date(user.updatedAt).toLocaleDateString()}</span>
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
};

const UserTable: React.FC<{ users: User[] }> = ({ users }) => {
  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'employee': return 'bg-blue-100 text-blue-800';
      case 'agent': return 'bg-purple-100 text-purple-800';
      case 'subscriber': return 'bg-orange-100 text-orange-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="bg-slate-800/40 backdrop-blur-xl rounded-2xl border border-yellow-400/30 overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-slate-700/50 border-b border-yellow-400/20">
            <tr>
              <th className="px-6 py-4 text-left text-xs font-medium text-slate-300 uppercase tracking-wider">User</th>
              <th className="px-6 py-4 text-left text-xs font-medium text-slate-300 uppercase tracking-wider">Category</th>
              <th className="px-6 py-4 text-left text-xs font-medium text-slate-300 uppercase tracking-wider">Role & Department</th>
              <th className="px-6 py-4 text-left text-xs font-medium text-slate-300 uppercase tracking-wider">Contact</th>
              <th className="px-6 py-4 text-left text-xs font-medium text-slate-300 uppercase tracking-wider">Status</th>
              <th className="px-6 py-4 text-left text-xs font-medium text-slate-300 uppercase tracking-wider">Last Login</th>
              <th className="px-6 py-4 text-left text-xs font-medium text-slate-300 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-yellow-400/20">
            {users.map((user) => (
              <tr key={user.id} className="hover:bg-slate-700/20 transition-colors">
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center space-x-3">
                    <div className="h-10 w-10 bg-slate-600/50 rounded-full flex items-center justify-center text-slate-50 font-medium border border-yellow-400/30">
                      {user.firstName.charAt(0)}{user.lastName.charAt(0)}
                    </div>
                    <div>
                      <p className="text-sm font-medium text-slate-50">{user.firstName} {user.lastName}</p>
                      <p className="text-xs text-slate-400">{user.employeeId}</p>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getCategoryColor(user.category)}`}>
                    {user.category}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div>
                    <p className="text-sm font-medium text-slate-50">{user.roleName}</p>
                    <p className="text-xs text-slate-400">{user.department}</p>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div>
                    <p className="text-sm text-slate-300">{user.email}</p>
                    <p className="text-xs text-slate-400">{user.phone}</p>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                    user.status === 'active' ? 'bg-green-100 text-green-800' :
                    user.status === 'inactive' ? 'bg-gray-100 text-gray-800' :
                    user.status === 'suspended' ? 'bg-red-100 text-red-800' :
                    'bg-yellow-100 text-yellow-800'
                  }`}>
                    {user.status}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-300">
                  {user.lastLogin ? new Date(user.lastLogin).toLocaleDateString() : 'Never'}
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
};

export const Users: React.FC = () => {
  const [users] = useState<User[]>(sampleUsers);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [filterRole, setFilterRole] = useState<string>('all');
  const [filterDepartment, setFilterDepartment] = useState<string>('all');
  const [filterCategory, setFilterCategory] = useState<string>('all');
  const [viewMode, setViewMode] = useState<'cards' | 'table'>('cards');

  const filteredUsers = useMemo(() => users.filter(user => {
    const matchesSearch = user.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         user.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         user.employeeId?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === 'all' || user.status === filterStatus;
    const matchesRole = filterRole === 'all' || user.roleName === filterRole;
    const matchesDepartment = filterDepartment === 'all' || user.department === filterDepartment;
    const matchesCategory = filterCategory === 'all' || user.category === filterCategory;
    
    return matchesSearch && matchesStatus && matchesRole && matchesDepartment && matchesCategory;
  }), [users, searchTerm, filterStatus, filterRole, filterDepartment, filterCategory]);

  const stats = useMemo(() => ({
    total: users.length,
    active: users.filter(u => u.status === 'active').length,
    inactive: users.filter(u => u.status === 'inactive').length,
    suspended: users.filter(u => u.status === 'suspended').length,
    pending: users.filter(u => u.status === 'pending').length,
    employees: users.filter(u => u.category === 'employee').length,
    agents: users.filter(u => u.category === 'agent').length,
    subscribers: users.filter(u => u.category === 'subscriber').length,
    twoFactorEnabled: users.filter(u => u.twoFactorEnabled).length,
    recentLogins: users.filter(u => u.lastLogin && new Date(u.lastLogin) > new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)).length
  }), [users]);

  const uniqueRoles = useMemo(() => [...new Set(users.map(u => u.roleName))], [users]);
  const uniqueDepartments = useMemo(() => [...new Set(users.map(u => u.department))], [users]);

  return (
    <div className="h-full flex flex-col bg-slate-900 overflow-hidden">
      {/* Header */}
      <div className="flex justify-between items-center p-4 border-b border-yellow-400/30 flex-shrink-0">
        <div>
          <h1 className="text-2xl font-bold text-slate-50">User Management</h1>
          <p className="mt-1 text-sm text-slate-400">
            Manage employees, agents, and subscribers with comprehensive user profiles
          </p>
        </div>
        <div className="flex space-x-3">
          <button className="inline-flex items-center px-4 py-2 border border-yellow-400/30 text-sm font-medium rounded-lg text-slate-50 bg-slate-700/50 hover:bg-slate-700 transition-all backdrop-blur-sm">
            <Upload className="h-4 w-4 mr-2" />
            Import Users
          </button>
          <button className="inline-flex items-center px-4 py-2 border border-yellow-400/30 text-sm font-medium rounded-lg text-slate-50 bg-slate-700/50 hover:bg-slate-700 transition-all backdrop-blur-sm">
            <Download className="h-4 w-4 mr-2" />
            Export
          </button>
          <button className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-lg shadow-sm text-white bg-blue-600 hover:bg-blue-700 transition-all">
            <Plus className="h-4 w-4 mr-2" />
            Add User
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto p-4 space-y-6 scrollbar-none">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 lg:grid-cols-10 gap-4">
          <div className="bg-slate-800/40 backdrop-blur-xl p-4 rounded-xl border border-yellow-400/30">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-400">Total Users</p>
                <p className="text-2xl font-bold text-slate-50">{stats.total}</p>
              </div>
              <UsersIcon className="h-8 w-8 text-blue-400" />
            </div>
          </div>
          <div className="bg-slate-800/40 backdrop-blur-xl p-4 rounded-xl border border-yellow-400/30">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-400">Employees</p>
                <p className="text-2xl font-bold text-blue-400">{stats.employees}</p>
              </div>
              <Briefcase className="h-8 w-8 text-blue-400" />
            </div>
          </div>
          <div className="bg-slate-800/40 backdrop-blur-xl p-4 rounded-xl border border-yellow-400/30">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-400">Agents</p>
                <p className="text-2xl font-bold text-purple-400">{stats.agents}</p>
              </div>
              <UserCheck className="h-8 w-8 text-purple-400" />
            </div>
          </div>
          <div className="bg-slate-800/40 backdrop-blur-xl p-4 rounded-xl border border-yellow-400/30">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-400">Subscribers</p>
                <p className="text-2xl font-bold text-orange-400">{stats.subscribers}</p>
              </div>
              <UsersIcon className="h-8 w-8 text-orange-400" />
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
                <p className="text-sm text-slate-400">Suspended</p>
                <p className="text-2xl font-bold text-red-400">{stats.suspended}</p>
              </div>
              <AlertTriangle className="h-8 w-8 text-red-400" />
            </div>
          </div>
          <div className="bg-slate-800/40 backdrop-blur-xl p-4 rounded-xl border border-yellow-400/30">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-400">Pending</p>
                <p className="text-2xl font-bold text-yellow-400">{stats.pending}</p>
              </div>
              <Clock className="h-8 w-8 text-yellow-400" />
            </div>
          </div>
          <div className="bg-slate-800/40 backdrop-blur-xl p-4 rounded-xl border border-yellow-400/30">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-400">2FA Enabled</p>
                <p className="text-2xl font-bold text-purple-400">{stats.twoFactorEnabled}</p>
              </div>
              <Lock className="h-8 w-8 text-purple-400" />
            </div>
          </div>
          <div className="bg-slate-800/40 backdrop-blur-xl p-4 rounded-xl border border-yellow-400/30">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-400">Recent Logins</p>
                <p className="text-2xl font-bold text-emerald-400">{stats.recentLogins}</p>
              </div>
              <UserCheck className="h-8 w-8 text-emerald-400" />
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
                placeholder="Search users..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-2 bg-slate-700/50 border border-yellow-400/30 rounded-lg w-full text-slate-50 placeholder-slate-400 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 backdrop-blur-sm"
              />
            </div>
            <select
              value={filterCategory}
              onChange={(e) => setFilterCategory(e.target.value)}
              className="px-3 py-2 bg-slate-700/50 border border-yellow-400/30 rounded-lg text-slate-50 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 backdrop-blur-sm"
            >
              <option value="all">All Categories</option>
              <option value="employee">Employees</option>
              <option value="agent">Agents</option>
              <option value="subscriber">Subscribers</option>
            </select>
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="px-3 py-2 bg-slate-700/50 border border-yellow-400/30 rounded-lg text-slate-50 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 backdrop-blur-sm"
            >
              <option value="all">All Status</option>
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
              <option value="suspended">Suspended</option>
              <option value="pending">Pending</option>
            </select>
            <select
              value={filterRole}
              onChange={(e) => setFilterRole(e.target.value)}
              className="px-3 py-2 bg-slate-700/50 border border-yellow-400/30 rounded-lg text-slate-50 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 backdrop-blur-sm"
            >
              <option value="all">All Roles</option>
              {uniqueRoles.map(role => (
                <option key={role} value={role}>{role}</option>
              ))}
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
            <div className="flex items-center justify-between">
              <div className="text-sm text-slate-400">
                Showing: <span className="font-semibold text-slate-50">{filteredUsers.length}</span> users
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
        </div>

        {/* Users Display */}
        {viewMode === 'cards' ? (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {filteredUsers.map((user) => (
              <UserCard key={user.id} user={user} />
            ))}
          </div>
        ) : (
          <div className="max-h-[600px] overflow-y-auto">
            <UserTable users={filteredUsers} />
          </div>
        )}

        {filteredUsers.length === 0 && (
          <div className="text-center py-12">
            <UsersIcon className="h-12 w-12 mx-auto text-slate-500 mb-4" />
            <h3 className="text-lg font-medium text-slate-50 mb-2">No users found</h3>
            <p className="text-sm text-slate-400">Try adjusting your search criteria or add a new user.</p>
          </div>
        )}
      </div>
    </div>
  );
};