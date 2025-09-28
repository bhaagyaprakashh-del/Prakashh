import React, { useState } from 'react';
import { Plus, Search, Edit, Trash2, Mail, Phone, MapPin, Calendar } from 'lucide-react';
import { Member } from '../types';
import { storage } from '../utils/storage';
import { calculateMemberStats, formatCurrency, formatDate } from '../utils/calculations';
import { MemberForm } from './MemberForm';

export const Members: React.FC = () => {
  const [members, setMembers] = useState<Member[]>(storage.getMembers());
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedMember, setSelectedMember] = useState<Member | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [filterStatus, setFilterStatus] = useState<string>('all');

  const filteredMembers = members.filter(member => {
    const matchesSearch = member.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         member.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         member.phone.includes(searchTerm);
    const matchesFilter = filterStatus === 'all' || member.status === filterStatus;
    return matchesSearch && matchesFilter;
  });

  const handleAddMember = () => {
    setSelectedMember(null);
    setShowForm(true);
  };

  const handleEditMember = (member: Member) => {
    setSelectedMember(member);
    setShowForm(true);
  };

  const handleDeleteMember = (memberId: string) => {
    if (window.confirm('Are you sure you want to delete this member?')) {
      storage.deleteMember(memberId);
      setMembers(storage.getMembers());
    }
  };

  const handleFormSubmit = (memberData: Partial<Member>) => {
    if (selectedMember) {
      const updatedMember = { ...selectedMember, ...memberData } as Member;
      storage.updateMember(updatedMember);
    } else {
      const newMember: Member = {
        id: Date.now().toString(),
        name: memberData.name!,
        email: memberData.email!,
        phone: memberData.phone!,
        address: memberData.address!,
        joinDate: memberData.joinDate!,
        status: memberData.status!,
        creditScore: memberData.creditScore || 75,
        totalContributions: 0,
        schemes: [],
      };
      storage.addMember(newMember);
    }
    setMembers(storage.getMembers());
    setShowForm(false);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800';
      case 'inactive': return 'bg-gray-100 text-gray-800';
      case 'suspended': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  if (showForm) {
    return (
      <MemberForm
        member={selectedMember}
        onSubmit={handleFormSubmit}
        onCancel={() => setShowForm(false)}
      />
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Members</h1>
          <p className="mt-2 text-sm text-gray-600">
            Manage your chit fund members and their information
          </p>
        </div>
        <button
          onClick={handleAddMember}
          className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors duration-200"
        >
          <Plus className="h-4 w-4 mr-2" />
          Add Member
        </button>
      </div>

      {/* Filters and Search */}
      <div className="bg-white shadow rounded-lg p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <input
              type="text"
              placeholder="Search members..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 pr-4 py-2 border border-gray-300 rounded-md w-full focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="all">All Status</option>
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
            <option value="suspended">Suspended</option>
          </select>
          <div className="text-sm text-gray-600 flex items-center">
            Total Members: <span className="font-semibold ml-1">{filteredMembers.length}</span>
          </div>
        </div>
      </div>

      {/* Members Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredMembers.map((member) => {
          const stats = calculateMemberStats(member.id);
          return (
            <div key={member.id} className="bg-white shadow rounded-lg overflow-hidden hover:shadow-lg transition-shadow duration-300">
              <div className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-gray-900">{member.name}</h3>
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(member.status)}`}>
                    {member.status}
                  </span>
                </div>

                <div className="space-y-2 text-sm text-gray-600">
                  <div className="flex items-center">
                    <Mail className="h-4 w-4 mr-2" />
                    <span className="truncate">{member.email}</span>
                  </div>
                  <div className="flex items-center">
                    <Phone className="h-4 w-4 mr-2" />
                    <span>{member.phone}</span>
                  </div>
                  <div className="flex items-center">
                    <MapPin className="h-4 w-4 mr-2" />
                    <span className="truncate">{member.address}</span>
                  </div>
                  <div className="flex items-center">
                    <Calendar className="h-4 w-4 mr-2" />
                    <span>Joined {formatDate(member.joinDate)}</span>
                  </div>
                </div>

                <div className="mt-4 pt-4 border-t border-gray-200">
                  <div className="flex justify-between text-sm">
                    <div>
                      <p className="text-gray-500">Credit Score</p>
                      <p className="font-semibold text-gray-900">{member.creditScore}</p>
                    </div>
                    <div>
                      <p className="text-gray-500">Total Paid</p>
                      <p className="font-semibold text-gray-900">{formatCurrency(stats.totalPaid)}</p>
                    </div>
                    <div>
                      <p className="text-gray-500">Schemes</p>
                      <p className="font-semibold text-gray-900">{member.schemes.length}</p>
                    </div>
                  </div>
                </div>

                <div className="mt-4 flex justify-end space-x-2">
                  <button
                    onClick={() => handleEditMember(member)}
                    className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-md transition-colors duration-200"
                  >
                    <Edit className="h-4 w-4" />
                  </button>
                  <button
                    onClick={() => handleDeleteMember(member.id)}
                    className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-md transition-colors duration-200"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              </div>

              {/* Progress bar for credit score */}
              <div className="px-6 pb-4">
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className={`h-2 rounded-full transition-all duration-300 ${
                      member.creditScore >= 80 ? 'bg-green-500' :
                      member.creditScore >= 60 ? 'bg-yellow-500' : 'bg-red-500'
                    }`}
                    style={{ width: `${member.creditScore}%` }}
                  ></div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {filteredMembers.length === 0 && (
        <div className="text-center py-12">
          <div className="text-gray-500">
            <Users className="h-12 w-12 mx-auto mb-4 opacity-50" />
            <p className="text-lg font-medium">No members found</p>
            <p className="text-sm">Try adjusting your search criteria or add a new member.</p>
          </div>
        </div>
      )}
    </div>
  );
};