import React, { useState } from 'react';
import { Plus, Users, Calendar, DollarSign, TrendingUp, Gavel } from 'lucide-react';
import { ChitGroup } from '../../types/chit';
import { formatCurrency, formatDate } from '../../utils/calculations';

const sampleGroups: ChitGroup[] = [
  {
    id: '1',
    name: 'Premium Gold A1',
    code: 'PGA1-2024',
    totalAmount: 1000000,
    installmentAmount: 50000,
    duration: 20,
    startDate: '2024-01-01',
    endDate: '2025-08-31',
    status: 'active',
    branchId: 'branch1',
    agentId: 'agent1',
    members: [],
    auctions: [],
    installments: [],
    commissionPercentage: 5,
    createdAt: '2024-01-01',
    updatedAt: '2024-03-15'
  },
  {
    id: '2',
    name: 'Silver Monthly B2',
    code: 'SMB2-2024',
    totalAmount: 500000,
    installmentAmount: 25000,
    duration: 20,
    startDate: '2024-02-01',
    endDate: '2025-09-30',
    status: 'active',
    branchId: 'branch1',
    agentId: 'agent2',
    members: [],
    auctions: [],
    installments: [],
    commissionPercentage: 5,
    createdAt: '2024-02-01',
    updatedAt: '2024-03-15'
  }
];

const GroupCard: React.FC<{ group: ChitGroup }> = ({ group }) => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'completed': return 'bg-blue-100 text-blue-800';
      case 'suspended': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const progress = ((new Date().getTime() - new Date(group.startDate).getTime()) / 
                   (new Date(group.endDate).getTime() - new Date(group.startDate).getTime())) * 100;

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="text-lg font-semibold text-gray-900 mb-1">{group.name}</h3>
          <p className="text-sm text-gray-600">{group.code}</p>
        </div>
        <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(group.status)}`}>
          {group.status.toUpperCase()}
        </span>
      </div>

      <div className="grid grid-cols-2 gap-4 mb-4">
        <div className="flex items-center space-x-2">
          <DollarSign className="h-4 w-4 text-gray-400" />
          <div>
            <p className="text-xs text-gray-500">Total Amount</p>
            <p className="text-sm font-semibold text-gray-900">{formatCurrency(group.totalAmount)}</p>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <TrendingUp className="h-4 w-4 text-gray-400" />
          <div>
            <p className="text-xs text-gray-500">Monthly</p>
            <p className="text-sm font-semibold text-gray-900">{formatCurrency(group.installmentAmount)}</p>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <Users className="h-4 w-4 text-gray-400" />
          <div>
            <p className="text-xs text-gray-500">Members</p>
            <p className="text-sm font-semibold text-gray-900">{group.members.length}</p>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <Calendar className="h-4 w-4 text-gray-400" />
          <div>
            <p className="text-xs text-gray-500">Duration</p>
            <p className="text-sm font-semibold text-gray-900">{group.duration} months</p>
          </div>
        </div>
      </div>

      <div className="mb-4">
        <div className="flex justify-between text-sm text-gray-600 mb-1">
          <span>Progress</span>
          <span>{Math.round(Math.min(progress, 100))}%</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div
            className="bg-gradient-to-r from-blue-500 to-green-500 h-2 rounded-full transition-all duration-300"
            style={{ width: `${Math.min(progress, 100)}%` }}
          ></div>
        </div>
      </div>

      <div className="flex justify-between text-sm text-gray-600">
        <span>Start: {formatDate(group.startDate)}</span>
        <span>End: {formatDate(group.endDate)}</span>
      </div>

      <div className="mt-4 pt-4 border-t border-gray-100 flex justify-between">
        <button className="text-blue-600 hover:text-blue-800 text-sm font-medium">
          View Details
        </button>
        <button className="flex items-center text-green-600 hover:text-green-800 text-sm font-medium">
          <Gavel className="h-3 w-3 mr-1" />
          Auction
        </button>
      </div>
    </div>
  );
};

export const GroupsOverview: React.FC = () => {
  const [groups] = useState<ChitGroup[]>(sampleGroups);
  
  const stats = {
    total: groups.length,
    active: groups.filter(g => g.status === 'active').length,
    pending: groups.filter(g => g.status === 'pending').length,
    completed: groups.filter(g => g.status === 'completed').length,
    totalValue: groups.reduce((sum, g) => sum + g.totalAmount, 0)
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Chit Groups</h2>
          <p className="text-sm text-gray-600 mt-1">Manage all your chit fund groups</p>
        </div>
        <button className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700">
          <Plus className="h-4 w-4 mr-2" />
          Create Group
        </button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
        <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Total Groups</p>
              <p className="text-2xl font-bold text-gray-900">{stats.total}</p>
            </div>
            <Users className="h-8 w-8 text-blue-500" />
          </div>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Active</p>
              <p className="text-2xl font-bold text-green-600">{stats.active}</p>
            </div>
            <TrendingUp className="h-8 w-8 text-green-500" />
          </div>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Pending</p>
              <p className="text-2xl font-bold text-yellow-600">{stats.pending}</p>
            </div>
            <Calendar className="h-8 w-8 text-yellow-500" />
          </div>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Completed</p>
              <p className="text-2xl font-bold text-blue-600">{stats.completed}</p>
            </div>
            <Users className="h-8 w-8 text-blue-500" />
          </div>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Total Value</p>
              <p className="text-xl font-bold text-purple-600">{formatCurrency(stats.totalValue)}</p>
            </div>
            <DollarSign className="h-8 w-8 text-purple-500" />
          </div>
        </div>
      </div>

      {/* Groups Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {groups.map((group) => (
          <GroupCard key={group.id} group={group} />
        ))}
      </div>

      {groups.length === 0 && (
        <div className="text-center py-12">
          <Users className="h-12 w-12 mx-auto text-gray-400 mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">No chit groups found</h3>
          <p className="text-sm text-gray-600">Get started by creating your first chit group.</p>
        </div>
      )}
    </div>
  );
};