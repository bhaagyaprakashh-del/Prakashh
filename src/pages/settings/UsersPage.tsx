import React, { useState, useMemo } from 'react';
import { Search, Filter, Plus, Eye, CreditCard as Edit, UserX, Users, Shield, Building, UserCheck, Crown, Star, Award, CheckCircle, XCircle, Clock, Mail, Phone, Calendar, MoreVertical, Download, Upload, Settings } from 'lucide-react';
import { UserCategory, UserRow, mockUsers, searchUsers, addUser, updateUser, deleteUser } from '../../data/users.mock';
import toast from 'react-hot-toast';
import { AddUser } from '../../components/Users/AddUser';

const UserCard: React.FC<{ user: UserRow }> = ({ user }) => {
  const getStatusColor = (status: string) => {
    return status === 'Active' 
      ? 'bg-green-100 text-green-800 border-green-200' 
      : 'bg-red-100 text-red-800 border-red-200';
  };

  const getCategoryColor = (category: UserCategory) => {
    switch (category) {
      case 'Admin': return 'bg-red-100 text-red-800 border-red-200';
      case 'Employees': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'Agents': return 'bg-purple-100 text-purple-800 border-purple-200';
      case 'Subscribers': return 'bg-green-100 text-green-800 border-green-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getCategoryIcon = (category: UserCategory) => {
    switch (category) {
      case 'Admin': return Crown;
      case 'Employees': return Building;
      case 'Agents': return UserCheck;
      case 'Subscribers': return Users;
      default: return Users;
    }
  };

  const CategoryIcon = getCategoryIcon(user.category);

  const handleView = () => {
    toast.success(`Viewing ${user.name}'s profile`);
  };

  const handleEdit = () => {
    toast.success(`Editing ${user.name}'s details`);
  };

  const handleDisable = () => {
    toast.success(`${user.status === 'Active' ? 'Disabled' : 'Enabled'} ${user.name}`);
  };

  return (
    <div className="bg-slate-800/40 backdrop-blur-xl rounded-2xl p-6 border border-yellow-400/30 hover:border-yellow-400/50 transition-all group">
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center space-x-3">
          {user.avatarUrl ? (
            <img
              src={user.avatarUrl}
              alt={user.name}
              className="w-12 h-12 rounded-full object-cover border border-yellow-400/30"
            />
          ) : (
            <div className="w-12 h-12 bg-slate-600/50 rounded-full flex items-center justify-center text-slate-50 font-semibold text-lg border border-yellow-400/30">
              {user.name.split(' ').map(n => n[0]).join('')}
            </div>
          )}
          <div>
            <h3 className="text-lg font-semibold text-slate-50">{user.name}</h3>
            <p className="text-sm text-slate-400">{user.role}</p>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium border ${getCategoryColor(user.category)}`}>
            <CategoryIcon className="h-3 w-3 mr-1" />
            {user.category}
          </span>
          <button className="p-2 text-slate-400 hover:text-slate-50 hover:bg-slate-700/50 rounded-lg transition-all opacity-0 group-hover:opacity-100">
            <MoreVertical className="h-4 w-4" />
          </button>
        </div>
      </div>

      <div className="space-y-2 mb-4">
        {user.email && (
          <div className="flex items-center text-sm text-slate-300">
            <Mail className="h-4 w-4 mr-2 text-slate-500" />
            <span className="truncate">{user.email}</span>
          </div>
        )}
        {user.phone && (
          <div className="flex items-center text-sm text-slate-300">
            <Phone className="h-4 w-4 mr-2 text-slate-500" />
            <span>{user.phone}</span>
          </div>
        )}
        {user.department && (
          <div className="flex items-center text-sm text-slate-300">
            <Building className="h-4 w-4 mr-2 text-slate-500" />
            <span>{user.department} • {user.branch}</span>
          </div>
        )}
      </div>

      <div className="flex items-center justify-between mb-4">
        <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium border ${getStatusColor(user.status)}`}>
          {user.status === 'Active' ? <CheckCircle className="h-3 w-3 mr-1" /> : <XCircle className="h-3 w-3 mr-1" />}
          {user.status}
        </span>
        {user.lastLogin && (
          <span className="text-xs text-slate-500">
            Last: {new Date(user.lastLogin).toLocaleDateString()}
          </span>
        )}
      </div>

      <div className="flex justify-end space-x-2 pt-4 border-t border-yellow-400/20 opacity-0 group-hover:opacity-100 transition-all">
        <button
          onClick={handleView}
          className="p-2 text-slate-400 hover:text-blue-400 hover:bg-blue-500/10 rounded-lg transition-all"
          title="View Profile"
        >
          <Eye className="h-4 w-4" />
        </button>
        <button
          onClick={handleEdit}
          className="p-2 text-slate-400 hover:text-green-400 hover:bg-green-500/10 rounded-lg transition-all"
          title="Edit User"
        >
          <Edit className="h-4 w-4" />
        </button>
        <button
          onClick={handleDisable}
          className={`p-2 text-slate-400 hover:bg-opacity-10 rounded-lg transition-all ${
            user.status === 'Active' 
              ? 'hover:text-red-400 hover:bg-red-500/10' 
              : 'hover:text-green-400 hover:bg-green-500/10'
          }`}
          title={user.status === 'Active' ? 'Disable User' : 'Enable User'}
        >
          <UserX className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
};

const UserTable: React.FC<{ users: UserRow[], setRefreshKey: React.Dispatch<React.SetStateAction<number>> }> = ({ users, setRefreshKey }) => {
  const getStatusColor = (status: string) => {
    return status === 'Active' 
      ? 'bg-green-100 text-green-800' 
      : 'bg-red-100 text-red-800';
  };

  const getCategoryColor = (category: UserCategory) => {
    switch (category) {
      case 'Admin': return 'bg-red-100 text-red-800';
      case 'Employees': return 'bg-blue-100 text-blue-800';
      case 'Agents': return 'bg-purple-100 text-purple-800';
      case 'Subscribers': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const handleView = (user: UserRow) => {
    toast.success(`Viewing ${user.name}'s profile`);
  };

  const handleEdit = (user: UserRow) => {
    toast.success(`Editing ${user.name}'s details`);
  };

  const handleDisable = (user: UserRow) => {
    const updatedUser = {
      ...user,
      status: user.status === 'Active' ? 'Inactive' as const : 'Active' as const
    };
    updateUser(updatedUser);
    setRefreshKey(prev => prev + 1); // Force re-render
    toast.success(`${user.status === 'Active' ? 'Disabled' : 'Enabled'} ${user.name}`);
  };

  return (
    <div className="bg-slate-800/40 backdrop-blur-xl rounded-2xl border border-yellow-400/30 overflow-hidden">
      <div className="overflow-x-auto max-h-96 overflow-y-auto thin-scroll">
        <table className="w-full">
          <thead className="bg-slate-700/50 border-b border-yellow-400/20 sticky top-0">
            <tr>
              <th className="px-6 py-4 text-left text-xs font-medium text-slate-300 uppercase tracking-wider">User</th>
              <th className="px-6 py-4 text-left text-xs font-medium text-slate-300 uppercase tracking-wider">Category</th>
              <th className="px-6 py-4 text-left text-xs font-medium text-slate-300 uppercase tracking-wider">Role</th>
              <th className="px-6 py-4 text-left text-xs font-medium text-slate-300 uppercase tracking-wider">Contact</th>
              <th className="px-6 py-4 text-left text-xs font-medium text-slate-300 uppercase tracking-wider">Status</th>
              <th className="px-6 py-4 text-left text-xs font-medium text-slate-300 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-yellow-400/20">
            {users.map((user) => (
              <tr key={user.id} className="hover:bg-slate-700/20 transition-colors">
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center space-x-3">
                    {user.avatarUrl ? (
                      <img
                        src={user.avatarUrl}
                        alt={user.name}
                        className="w-10 h-10 rounded-full object-cover border border-yellow-400/30"
                      />
                    ) : (
                      <div className="w-10 h-10 bg-slate-600/50 rounded-full flex items-center justify-center text-slate-50 font-medium border border-yellow-400/30">
                        {user.name.split(' ').map(n => n[0]).join('')}
                      </div>
                    )}
                    <div>
                      <p className="text-sm font-medium text-slate-50">{user.name}</p>
                      <p className="text-xs text-slate-400">{user.email}</p>
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
                    <p className="text-sm font-medium text-slate-50">{user.role}</p>
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
                  <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(user.status)}`}>
                    {user.status}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <div className="flex space-x-2">
                    <button
                      onClick={() => handleView(user)}
                      className="text-blue-400 hover:text-blue-300"
                      title="View Profile"
                    >
                      <Eye className="h-4 w-4" />
                    </button>
                    <button
                      onClick={() => handleEdit(user)}
                      className="text-green-400 hover:text-green-300"
                      title="Edit User"
                    >
                      <Edit className="h-4 w-4" />
                    </button>
                    <button
                      onClick={() => handleDisable(user)}
                      className={user.status === 'Active' ? 'text-red-400 hover:text-red-300' : 'text-green-400 hover:text-green-300'}
                      title={user.status === 'Active' ? 'Disable User' : 'Enable User'}
                    >
                      <UserX className="h-4 w-4" />
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

const UsersPage: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<UserCategory | 'All'>('All');
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState<'All' | 'Active' | 'Inactive'>('All');
  const [currentPage, setCurrentPage] = useState(1);
  const [showAddUser, setShowAddUser] = useState(false);
  const [refreshKey, setRefreshKey] = useState(0);
  const itemsPerPage = 12;

  const categories: Array<{ id: UserCategory | 'All'; name: string; icon: React.ComponentType<any> }> = [
    { id: 'All', name: 'All Users', icon: Users },
    { id: 'Admin', name: 'Admin', icon: Crown },
    { id: 'Employees', name: 'Employees', icon: Building },
    { id: 'Agents', name: 'Agents', icon: UserCheck },
    { id: 'Subscribers', name: 'Subscribers', icon: Users }
  ];

  const filteredUsers = useMemo(() => {
    let users = selectedCategory === 'All' ? mockUsers : mockUsers.filter(u => u.category === selectedCategory);
    
    if (searchTerm.trim()) {
      const searchLower = searchTerm.toLowerCase();
      users = users.filter(user => 
        user.name.toLowerCase().includes(searchLower) ||
        user.email?.toLowerCase().includes(searchLower) ||
        user.phone?.includes(searchTerm) ||
        user.role?.toLowerCase().includes(searchLower)
      );
    }

    if (filterStatus !== 'All') {
      users = users.filter(user => user.status === filterStatus);
    }

    return users;
  }, [selectedCategory, searchTerm, filterStatus]);

  const paginatedUsers = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return filteredUsers.slice(startIndex, startIndex + itemsPerPage);
  }, [filteredUsers, currentPage, itemsPerPage]);

  const totalPages = Math.ceil(filteredUsers.length / itemsPerPage);

  const stats = useMemo(() => ({
    total: mockUsers.length,
    active: mockUsers.filter(u => u.status === 'Active').length,
    inactive: mockUsers.filter(u => u.status === 'Inactive').length,
    admin: mockUsers.filter(u => u.category === 'Admin').length,
    employees: mockUsers.filter(u => u.category === 'Employees').length,
    agents: mockUsers.filter(u => u.category === 'Agents').length,
    subscribers: mockUsers.filter(u => u.category === 'Subscribers').length
  }), [refreshKey]); // Add refreshKey dependency to recalculate stats

  const handleAddUser = () => {
    setShowAddUser(true);
  };

  const handleSaveUser = (userData: any) => {
    // Add the new user to the mock data
    const newUser: UserRow = {
      id: userData.id || `user_${Date.now()}`,
      name: userData.name,
      email: userData.email,
      phone: userData.phone,
      category: userData.category,
      role: userData.role,
      status: userData.status,
      lastLogin: null,
      department: userData.department,
      branch: userData.branch,
      joiningDate: userData.joiningDate
    };
    
    addUser(newUser);
    setRefreshKey(prev => prev + 1); // Force re-render to show new user
    setShowAddUser(false);
    toast.success(`User ${userData.name} created successfully!`);
  };

  const handleCancelAddUser = () => {
    setShowAddUser(false);
  };

  const handleExport = () => {
    toast.success('Exporting user data');
  };

  const handleImport = () => {
    toast.success('Opening Import Users dialog');
  };

  // If showing add user form, render it instead of the main page
  if (showAddUser) {
    return (
      <AddUser
        onBack={handleCancelAddUser}
        onSave={handleSaveUser}
      />
    );
  }

  return (
    <div className="h-full flex flex-col bg-slate-900 overflow-hidden">
      {/* Header */}
      <div className="flex justify-between items-center p-4 border-b border-yellow-400/30 flex-shrink-0">
        <div>
          <h1 className="text-2xl font-bold text-slate-50">User Management</h1>
          <p className="mt-1 text-sm text-slate-400">
            Manage users across all categories with comprehensive profiles and access control
          </p>
        </div>
        <div className="flex space-x-3">
          <button
            onClick={handleImport}
            className="inline-flex items-center px-4 py-2 border border-yellow-400/30 text-sm font-medium rounded-lg text-slate-50 bg-slate-700/50 hover:bg-slate-700 transition-all backdrop-blur-sm"
          >
            <Upload className="h-4 w-4 mr-2" />
            Import Users
          </button>
          <button
            onClick={handleExport}
            className="inline-flex items-center px-4 py-2 border border-yellow-400/30 text-sm font-medium rounded-lg text-slate-50 bg-slate-700/50 hover:bg-slate-700 transition-all backdrop-blur-sm"
          >
            <Download className="h-4 w-4 mr-2" />
            Export
          </button>
          <button
            onClick={handleAddUser}
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-lg shadow-sm text-white bg-blue-600 hover:bg-blue-700 transition-all"
          >
            <Plus className="h-4 w-4 mr-2" />
            Add User
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto p-4 space-y-6 thin-scroll">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 lg:grid-cols-7 gap-4">
          <div className="bg-slate-800/40 backdrop-blur-xl p-4 rounded-xl border border-yellow-400/30">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-400">Total Users</p>
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
                <p className="text-2xl font-bold text-red-400">{stats.inactive}</p>
              </div>
              <XCircle className="h-8 w-8 text-red-400" />
            </div>
          </div>
          <div className="bg-slate-800/40 backdrop-blur-xl p-4 rounded-xl border border-yellow-400/30">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-400">Admin</p>
                <p className="text-2xl font-bold text-red-400">{stats.admin}</p>
              </div>
              <Crown className="h-8 w-8 text-red-400" />
            </div>
          </div>
          <div className="bg-slate-800/40 backdrop-blur-xl p-4 rounded-xl border border-yellow-400/30">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-400">Employees</p>
                <p className="text-2xl font-bold text-blue-400">{stats.employees}</p>
              </div>
              <Building className="h-8 w-8 text-blue-400" />
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
                <p className="text-2xl font-bold text-green-400">{stats.subscribers}</p>
              </div>
              <Users className="h-8 w-8 text-green-400" />
            </div>
          </div>
        </div>

        {/* Category Tabs */}
        <div className="bg-slate-800/40 backdrop-blur-xl rounded-xl p-4 border border-yellow-400/30">
          <div className="flex flex-wrap gap-2 mb-4">
            {categories.map((category) => {
              const Icon = category.icon;
              return (
                <button
                  key={category.id}
                  onClick={() => {
                    setSelectedCategory(category.id);
                    setCurrentPage(1);
                  }}
                  className={`inline-flex items-center px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                    selectedCategory === category.id
                      ? 'bg-blue-500 text-white border border-blue-400'
                      : 'bg-slate-700/50 text-slate-300 border border-yellow-400/30 hover:bg-slate-700 hover:text-slate-50'
                  }`}
                >
                  <Icon className="h-4 w-4 mr-2" />
                  {category.name}
                  <span className="ml-2 bg-slate-600/50 text-slate-300 px-2 py-1 rounded-full text-xs">
                    {category.id === 'All' ? stats.total : 
                     category.id === 'Admin' ? stats.admin :
                     category.id === 'Employees' ? stats.employees :
                     category.id === 'Agents' ? stats.agents :
                     stats.subscribers}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Filters */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
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
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value as 'All' | 'Active' | 'Inactive')}
              className="px-3 py-2 bg-slate-700/50 border border-yellow-400/30 rounded-lg text-slate-50 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 backdrop-blur-sm"
            >
              <option value="All">All Status</option>
              <option value="Active">Active</option>
              <option value="Inactive">Inactive</option>
            </select>
            <div className="text-sm text-slate-400 flex items-center">
              Showing: <span className="font-semibold ml-1 text-slate-50">{filteredUsers.length}</span> users
            </div>
          </div>
        </div>

        {/* User Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
          {paginatedUsers.map((user) => (
            <UserCard key={user.id} user={user} />
          ))}
        </div>

        {/* User Table */}
        <UserTable users={paginatedUsers} setRefreshKey={setRefreshKey} />

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="bg-slate-800/40 backdrop-blur-xl rounded-xl p-4 border border-yellow-400/30">
            <div className="flex items-center justify-between">
              <div className="text-sm text-slate-400">
                Showing {((currentPage - 1) * itemsPerPage) + 1} to {Math.min(currentPage * itemsPerPage, filteredUsers.length)} of {filteredUsers.length} users
              </div>
              <div className="flex space-x-2">
                <button
                  onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                  disabled={currentPage === 1}
                  className="px-3 py-2 text-sm font-medium text-slate-300 bg-slate-700/50 border border-yellow-400/30 rounded-lg hover:bg-slate-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed backdrop-blur-sm"
                >
                  Previous
                </button>
                <span className="px-3 py-2 text-sm font-medium text-slate-50 bg-blue-500 border border-blue-400 rounded-lg">
                  {currentPage} of {totalPages}
                </span>
                <button
                  onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                  disabled={currentPage === totalPages}
                  className="px-3 py-2 text-sm font-medium text-slate-300 bg-slate-700/50 border border-yellow-400/30 rounded-lg hover:bg-slate-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed backdrop-blur-sm"
                >
                  Next
                </button>
              </div>
            </div>
          </div>
        )}

        {filteredUsers.length === 0 && (
          <div className="text-center py-12">
            <Users className="h-12 w-12 mx-auto text-slate-500 mb-4" />
            <h3 className="text-lg font-medium text-slate-50 mb-2">No users found</h3>
            <p className="text-sm text-slate-400">Try adjusting your search criteria or add a new user.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default UsersPage;