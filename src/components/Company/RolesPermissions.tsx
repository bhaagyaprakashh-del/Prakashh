import React, { useState } from 'react';
import {
  Plus,
  Search,
  Edit,
  Trash2,
  Users,
  Shield,
  Key,
  Settings,
  Eye,
  Check,
  X,
  Lock,
  Unlock,
  UserCheck,
  AlertTriangle,
  Crown,
  Star,
  Calendar,
  MoreVertical
} from 'lucide-react';

interface Permission {
  id: string;
  name: string;
  module: string;
  description: string;
  actions: string[];
}

interface Role {
  id: string;
  name: string;
  description: string;
  permissions: string[];
  userCount: number;
  isSystem: boolean;
  color: string;
  createdAt: string;
  lastModified: string;
}

interface User {
  id: string;
  name: string;
  email: string;
  roleId: string;
  status: 'active' | 'inactive';
  lastLogin?: string;
}

const samplePermissions: Permission[] = [
  {
    id: 'leads-view',
    name: 'View Leads',
    module: 'Leads & Sales',
    description: 'View lead information and pipeline',
    actions: ['read']
  },
  {
    id: 'leads-manage',
    name: 'Manage Leads',
    module: 'Leads & Sales',
    description: 'Create, edit, and delete leads',
    actions: ['create', 'update', 'delete']
  },
  {
    id: 'chit-view',
    name: 'View Chit Groups',
    module: 'Chit Operations',
    description: 'View chit group information',
    actions: ['read']
  },
  {
    id: 'chit-manage',
    name: 'Manage Chit Groups',
    module: 'Chit Operations',
    description: 'Create and manage chit groups',
    actions: ['create', 'update', 'delete']
  },
  {
    id: 'employees-view',
    name: 'View Employees',
    module: 'HRMS',
    description: 'View employee directory',
    actions: ['read']
  },
  {
    id: 'employees-manage',
    name: 'Manage Employees',
    module: 'HRMS',
    description: 'Manage employee records and payroll',
    actions: ['create', 'update', 'delete']
  },
  {
    id: 'reports-view',
    name: 'View Reports',
    module: 'Reports',
    description: 'Access business reports and analytics',
    actions: ['read']
  },
  {
    id: 'settings-manage',
    name: 'System Settings',
    module: 'Administration',
    description: 'Manage system configuration',
    actions: ['create', 'update', 'delete']
  }
];

const sampleRoles: Role[] = [
  {
    id: '1',
    name: 'Super Administrator',
    description: 'Full system access with all permissions',
    permissions: samplePermissions.map(p => p.id),
    userCount: 1,
    isSystem: true,
    color: 'bg-red-500',
    createdAt: '2020-01-01',
    lastModified: '2024-03-15'
  },
  {
    id: '2',
    name: 'Branch Manager',
    description: 'Manage branch operations and staff',
    permissions: ['leads-view', 'leads-manage', 'chit-view', 'chit-manage', 'employees-view', 'reports-view'],
    userCount: 5,
    isSystem: false,
    color: 'bg-blue-500',
    createdAt: '2020-01-15',
    lastModified: '2024-02-20'
  },
  {
    id: '3',
    name: 'Sales Executive',
    description: 'Handle leads and customer interactions',
    permissions: ['leads-view', 'leads-manage', 'chit-view'],
    userCount: 15,
    isSystem: false,
    color: 'bg-green-500',
    createdAt: '2020-02-01',
    lastModified: '2024-01-10'
  },
  {
    id: '4',
    name: 'HR Manager',
    description: 'Manage human resources and payroll',
    permissions: ['employees-view', 'employees-manage', 'reports-view'],
    userCount: 2,
    isSystem: false,
    color: 'bg-purple-500',
    createdAt: '2020-03-01',
    lastModified: '2024-03-01'
  },
  {
    id: '5',
    name: 'Accountant',
    description: 'Financial operations and reporting',
    permissions: ['chit-view', 'reports-view'],
    userCount: 3,
    isSystem: false,
    color: 'bg-yellow-500',
    createdAt: '2020-04-01',
    lastModified: '2024-02-15'
  }
];

const sampleUsers: User[] = [
  {
    id: '1',
    name: 'Prakashh',
    email: 'prakashh@ramnirmalchits.com',
    roleId: '1',
    status: 'active',
    lastLogin: '2024-03-15T14:08:55'
  },
  {
    id: '2',
    name: 'Rajesh Kumar',
    email: 'rajesh@ramnirmalchits.com',
    roleId: '2',
    status: 'active',
    lastLogin: '2024-03-15T09:30:00'
  },
  {
    id: '3',
    name: 'Priya Sharma',
    email: 'priya@ramnirmalchits.com',
    roleId: '3',
    status: 'active',
    lastLogin: '2024-03-14T16:45:00'
  }
];

const RoleCard: React.FC<{ role: Role; permissions: Permission[] }> = ({ role, permissions }) => {
  const getRoleIcon = (roleName: string) => {
    if (roleName.includes('Administrator')) return Crown;
    if (roleName.includes('Manager')) return Star;
    if (roleName.includes('Executive')) return UserCheck;
    return Shield;
  };

  const Icon = getRoleIcon(role.name);
  const rolePermissions = permissions.filter(p => role.permissions.includes(p.id));

  return (
    <div className="bg-slate-800/40 backdrop-blur-xl rounded-2xl p-6 border border-yellow-400/30 hover:border-yellow-400/50 transition-all">
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center space-x-3">
          <div className={`p-3 ${role.color}/20 rounded-xl border border-yellow-400/30`}>
            <Icon className={`h-6 w-6 ${role.color.replace('bg-', 'text-')}`} />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-slate-50 flex items-center">
              {role.name}
              {role.isSystem && (
                <Lock className="h-4 w-4 ml-2 text-yellow-400" title="System Role" />
              )}
            </h3>
            <p className="text-sm text-slate-400">{role.description}</p>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800 border border-green-200">
            ACTIVE
          </span>
          <button className="p-2 text-slate-400 hover:text-slate-50 hover:bg-slate-700/50 rounded-lg transition-all">
            <MoreVertical className="h-4 w-4" />
          </button>
        </div>
      </div>

      <div className="space-y-3 mb-4">
        <div className="flex items-center justify-between text-sm">
          <span className="text-slate-400">Users Assigned</span>
          <span className="text-slate-50 font-medium">{role.userCount}</span>
        </div>
        <div className="flex items-center justify-between text-sm">
          <span className="text-slate-400">Permissions</span>
          <span className="text-slate-50 font-medium">{role.permissions.length}</span>
        </div>
        <div className="flex items-center justify-between text-sm">
          <span className="text-slate-400">Last Modified</span>
          <span className="text-slate-300">{new Date(role.lastModified).toLocaleDateString()}</span>
        </div>
      </div>

      {/* Permission Preview */}
      <div className="mb-4">
        <p className="text-xs text-slate-500 mb-2">Key Permissions:</p>
        <div className="flex flex-wrap gap-1">
          {rolePermissions.slice(0, 3).map((permission) => (
            <span key={permission.id} className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-blue-100 text-blue-800 border border-blue-200">
              {permission.name}
            </span>
          ))}
          {rolePermissions.length > 3 && (
            <span className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-slate-100 text-slate-800 border border-slate-200">
              +{rolePermissions.length - 3} more
            </span>
          )}
        </div>
      </div>

      <div className="flex justify-between items-center pt-4 border-t border-yellow-400/20">
        <div className="flex items-center text-xs text-slate-500">
          <Calendar className="h-3 w-3 mr-1" />
          <span>Created {new Date(role.createdAt).getFullYear()}</span>
        </div>
        <div className="flex space-x-2">
          <button className="p-2 text-slate-400 hover:text-blue-400 hover:bg-blue-500/10 rounded-lg transition-all">
            <Eye className="h-4 w-4" />
          </button>
          {!role.isSystem && (
            <>
              <button className="p-2 text-slate-400 hover:text-green-400 hover:bg-green-500/10 rounded-lg transition-all">
                <Edit className="h-4 w-4" />
              </button>
              <button className="p-2 text-slate-400 hover:text-red-400 hover:bg-red-500/10 rounded-lg transition-all">
                <Trash2 className="h-4 w-4" />
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

const PermissionMatrix: React.FC<{ roles: Role[]; permissions: Permission[] }> = ({ roles, permissions }) => {
  const modules = [...new Set(permissions.map(p => p.module))];

  return (
    <div className="bg-slate-800/40 backdrop-blur-xl rounded-2xl p-6 border border-yellow-400/30">
      <h3 className="text-lg font-semibold text-slate-50 mb-4 flex items-center">
        <Key className="h-5 w-5 mr-2" />
        Permission Matrix
      </h3>
      
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-yellow-400/20">
              <th className="text-left py-3 px-4 text-slate-300 font-medium">Permission</th>
              {roles.map((role) => (
                <th key={role.id} className="text-center py-3 px-2 text-slate-300 font-medium min-w-[100px]">
                  <div className="flex flex-col items-center">
                    <span className="text-xs">{role.name}</span>
                    <div className={`w-3 h-3 ${role.color} rounded-full mt-1`}></div>
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {modules.map((module) => (
              <React.Fragment key={module}>
                <tr>
                  <td colSpan={roles.length + 1} className="py-2 px-4 text-sm font-medium text-blue-400 bg-slate-700/20">
                    {module}
                  </td>
                </tr>
                {permissions.filter(p => p.module === module).map((permission) => (
                  <tr key={permission.id} className="border-b border-slate-700/30 hover:bg-slate-700/20">
                    <td className="py-3 px-4">
                      <div>
                        <p className="text-sm font-medium text-slate-50">{permission.name}</p>
                        <p className="text-xs text-slate-400">{permission.description}</p>
                      </div>
                    </td>
                    {roles.map((role) => (
                      <td key={role.id} className="text-center py-3 px-2">
                        {role.permissions.includes(permission.id) ? (
                          <Check className="h-5 w-5 text-green-400 mx-auto" />
                        ) : (
                          <X className="h-5 w-5 text-slate-600 mx-auto" />
                        )}
                      </td>
                    ))}
                  </tr>
                ))}
              </React.Fragment>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

const UserRoleAssignment: React.FC<{ users: User[]; roles: Role[] }> = ({ users, roles }) => {
  return (
    <div className="bg-slate-800/40 backdrop-blur-xl rounded-2xl p-6 border border-yellow-400/30">
      <h3 className="text-lg font-semibold text-slate-50 mb-4 flex items-center">
        <Users className="h-5 w-5 mr-2" />
        User Role Assignments
      </h3>
      
      <div className="space-y-3">
        {users.map((user) => {
          const userRole = roles.find(r => r.id === user.roleId);
          return (
            <div key={user.id} className="flex items-center justify-between p-4 bg-slate-700/30 rounded-xl border border-yellow-400/20">
              <div className="flex items-center space-x-3">
                <div className="h-10 w-10 bg-slate-600/50 rounded-full flex items-center justify-center text-slate-50 font-medium border border-yellow-400/30">
                  {user.name.charAt(0)}
                </div>
                <div>
                  <p className="text-sm font-medium text-slate-50">{user.name}</p>
                  <p className="text-xs text-slate-400">{user.email}</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-3">
                <div className="text-right">
                  <p className="text-sm font-medium text-slate-50">{userRole?.name}</p>
                  <p className="text-xs text-slate-400">
                    {user.lastLogin ? `Last login: ${new Date(user.lastLogin).toLocaleDateString()}` : 'Never logged in'}
                  </p>
                </div>
                
                <div className={`w-3 h-3 rounded-full ${userRole?.color || 'bg-gray-500'}`}></div>
                
                <div className="flex items-center space-x-1">
                  <div className={`w-2 h-2 rounded-full ${user.status === 'active' ? 'bg-green-400' : 'bg-red-400'}`}></div>
                  <span className={`text-xs ${user.status === 'active' ? 'text-green-400' : 'text-red-400'}`}>
                    {user.status}
                  </span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export const RolesPermissions: React.FC = () => {
  const [roles] = useState<Role[]>(sampleRoles);
  const [permissions] = useState<Permission[]>(samplePermissions);
  const [users] = useState<User[]>(sampleUsers);
  const [searchTerm, setSearchTerm] = useState('');
  const [activeTab, setActiveTab] = useState('roles');

  const filteredRoles = roles.filter(role =>
    role.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    role.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const stats = {
    totalRoles: roles.length,
    systemRoles: roles.filter(r => r.isSystem).length,
    customRoles: roles.filter(r => !r.isSystem).length,
    totalUsers: users.length,
    activeUsers: users.filter(u => u.status === 'active').length,
    totalPermissions: permissions.length
  };

  const tabs = [
    { id: 'roles', name: 'Roles Overview', icon: Shield },
    { id: 'permissions', name: 'Permission Matrix', icon: Key },
    { id: 'users', name: 'User Assignments', icon: Users }
  ];

  return (
    <div className="h-full flex flex-col bg-slate-900 overflow-hidden">
      {/* Header */}
      <div className="flex justify-between items-center p-4 border-b border-yellow-400/30 flex-shrink-0">
        <div>
          <h1 className="text-2xl font-bold text-slate-50">Roles & Permissions</h1>
          <p className="mt-1 text-sm text-slate-400">
            Manage user roles, permissions, and access control
          </p>
        </div>
        <div className="flex space-x-3">
          <button className="inline-flex items-center px-4 py-2 border border-yellow-400/30 text-sm font-medium rounded-lg text-slate-50 bg-slate-700/50 hover:bg-slate-700 transition-all backdrop-blur-sm">
            <Key className="h-4 w-4 mr-2" />
            Manage Permissions
          </button>
          <button className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-lg shadow-sm text-white bg-blue-600 hover:bg-blue-700 transition-all">
            <Plus className="h-4 w-4 mr-2" />
            Create Role
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
      <div className="flex-1 overflow-y-auto p-4 space-y-6 scrollbar-none">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-6 gap-4">
          <div className="bg-slate-800/40 backdrop-blur-xl p-4 rounded-xl border border-yellow-400/30">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-400">Total Roles</p>
                <p className="text-2xl font-bold text-slate-50">{stats.totalRoles}</p>
              </div>
              <Shield className="h-8 w-8 text-blue-400" />
            </div>
          </div>
          <div className="bg-slate-800/40 backdrop-blur-xl p-4 rounded-xl border border-yellow-400/30">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-400">System Roles</p>
                <p className="text-2xl font-bold text-red-400">{stats.systemRoles}</p>
              </div>
              <Lock className="h-8 w-8 text-red-400" />
            </div>
          </div>
          <div className="bg-slate-800/40 backdrop-blur-xl p-4 rounded-xl border border-yellow-400/30">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-400">Custom Roles</p>
                <p className="text-2xl font-bold text-green-400">{stats.customRoles}</p>
              </div>
              <Unlock className="h-8 w-8 text-green-400" />
            </div>
          </div>
          <div className="bg-slate-800/40 backdrop-blur-xl p-4 rounded-xl border border-yellow-400/30">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-400">Total Users</p>
                <p className="text-2xl font-bold text-purple-400">{stats.totalUsers}</p>
              </div>
              <Users className="h-8 w-8 text-purple-400" />
            </div>
          </div>
          <div className="bg-slate-800/40 backdrop-blur-xl p-4 rounded-xl border border-yellow-400/30">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-400">Active Users</p>
                <p className="text-2xl font-bold text-emerald-400">{stats.activeUsers}</p>
              </div>
              <UserCheck className="h-8 w-8 text-emerald-400" />
            </div>
          </div>
          <div className="bg-slate-800/40 backdrop-blur-xl p-4 rounded-xl border border-yellow-400/30">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-400">Permissions</p>
                <p className="text-2xl font-bold text-yellow-400">{stats.totalPermissions}</p>
              </div>
              <Key className="h-8 w-8 text-yellow-400" />
            </div>
          </div>
        </div>

        {/* Tab Content */}
        {activeTab === 'roles' && (
          <>
            {/* Search and Filters */}
            <div className="bg-slate-800/40 backdrop-blur-xl rounded-xl p-4 border border-yellow-400/30">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-500 h-4 w-4" />
                  <input
                    type="text"
                    placeholder="Search roles..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 pr-4 py-2 bg-slate-700/50 border border-yellow-400/30 rounded-lg w-full text-slate-50 placeholder-slate-400 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 backdrop-blur-sm"
                  />
                </div>
                <select className="px-3 py-2 bg-slate-700/50 border border-yellow-400/30 rounded-lg text-slate-50 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 backdrop-blur-sm">
                  <option value="all">All Roles</option>
                  <option value="system">System Roles</option>
                  <option value="custom">Custom Roles</option>
                </select>
                <div className="text-sm text-slate-400 flex items-center">
                  Showing: <span className="font-semibold ml-1 text-slate-50">{filteredRoles.length}</span> roles
                </div>
              </div>
            </div>

            {/* Roles Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredRoles.map((role) => (
                <RoleCard key={role.id} role={role} permissions={permissions} />
              ))}
            </div>
          </>
        )}

        {activeTab === 'permissions' && (
          <PermissionMatrix roles={roles} permissions={permissions} />
        )}

        {activeTab === 'users' && (
          <UserRoleAssignment users={users} roles={roles} />
        )}

        {filteredRoles.length === 0 && activeTab === 'roles' && (
          <div className="text-center py-12">
            <Shield className="h-12 w-12 mx-auto text-slate-500 mb-4" />
            <h3 className="text-lg font-medium text-slate-50 mb-2">No roles found</h3>
            <p className="text-sm text-slate-400">Try adjusting your search criteria or create a new role.</p>
          </div>
        )}
      </div>
    </div>
  );
};