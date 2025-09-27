import React, { useState } from 'react';
import { Plus, Search, Edit, Trash2, Mail, Phone, MapPin, Calendar } from 'lucide-react';
import { Member } from '../types';
import { storage } from '../utils/storage';
import { calculateMemberStats, formatCurrency, formatDate } from '../utils/calculations';
import { MemberForm } from './MemberForm';
import { ActionButton } from './UI/ActionButton';
import { ActionCard } from './UI/ActionCard';
import { Modal } from './UI/Modal';
import { ConfirmDialog } from './UI/ConfirmDialog';
import { useModal } from '../hooks/useModal';
import { useActions } from '../hooks/useActions';
import toast from 'react-hot-toast';

export const Members: React.FC = () => {
  const [members, setMembers] = useState<Member[]>(storage.getMembers());
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedMember, setSelectedMember] = useState<Member | null>(null);
  const [filterStatus, setFilterStatus] = useState<string>('all');
  
  const { isLoading } = useActions();
  const formModal = useModal();
  const confirmModal = useModal();
  const [memberToDelete, setMemberToDelete] = useState<Member | null>(null);

  const filteredMembers = members.filter(member => {
    const matchesSearch = member.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         member.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         member.phone.includes(searchTerm);
    const matchesFilter = filterStatus === 'all' || member.status === filterStatus;
    return matchesSearch && matchesFilter;
  });

  const handleAddMember = () => {
    setSelectedMember(null);
    formModal.openModal();
  };

  const handleEditMember = (member: Member) => {
    setSelectedMember(member);
    formModal.openModal(member);
  };

  const handleDeleteMember = (member: Member) => {
    setMemberToDelete(member);
    confirmModal.openModal();
  };

  const confirmDelete = () => {
    if (memberToDelete) {
      storage.deleteMember(memberToDelete.id);
      setMembers(storage.getMembers());
      toast.success('Member deleted successfully');
      confirmModal.closeModal();
      setMemberToDelete(null);
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
    formModal.closeModal();
    toast.success(selectedMember ? 'Member updated successfully' : 'Member added successfully');
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800';
      case 'inactive': return 'bg-gray-100 text-gray-800';
      case 'suspended': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <>
      <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Members</h1>
          <p className="mt-2 text-sm text-gray-600">
            Manage your chit fund members and their information
          </p>
        </div>
        <ActionButton
          action="open-modal"
          target="add-member"
          onClick={handleAddMember}
          variant="primary"
        >
          <Plus className="h-4 w-4 mr-2" />
          Add Member
        </ActionButton>
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
            <ActionCard 
              key={member.id} 
              className="bg-white shadow rounded-lg overflow-hidden p-0"
              action="view-member"
              id={member.id}
            >
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
                  <ActionButton
                    action="edit-member"
                    id={member.id}
                    onClick={() => handleEditMember(member)}
                    variant="secondary"
                    size="sm"
                    className="p-2"
                  >
                    <Edit className="h-4 w-4" />
                  </ActionButton>
                  <ActionButton
                    action="delete-member"
                    id={member.id}
                    onClick={() => handleDeleteMember(member)}
                    variant="danger"
                    size="sm"
                    className="p-2"
                  >
                    <Trash2 className="h-4 w-4" />
                  </ActionButton>
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
            </ActionCard>
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

      {/* Add/Edit Member Modal */}
      <Modal
        isOpen={formModal.isOpen}
        onClose={formModal.closeModal}
        title={selectedMember ? 'Edit Member' : 'Add New Member'}
        size="lg"
      >
        <MemberForm
          member={selectedMember}
          onSubmit={handleFormSubmit}
          onCancel={formModal.closeModal}
        />
      </Modal>

      {/* Delete Confirmation Dialog */}
      <ConfirmDialog
        isOpen={confirmModal.isOpen}
        onClose={confirmModal.closeModal}
        onConfirm={confirmDelete}
        title="Delete Member"
        message={`Are you sure you want to delete ${memberToDelete?.name}? This action cannot be undone.`}
        confirmText="Delete"
        cancelText="Cancel"
        type="danger"
        isLoading={isLoading['delete-member']}
      />
    </>
  );
};