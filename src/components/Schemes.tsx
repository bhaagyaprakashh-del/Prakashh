import React, { useState } from 'react';
import { Plus, Search, CreditCard as Edit, Trash2, Users, Calendar, DollarSign, TrendingUp } from 'lucide-react';
import { ChitScheme } from '../types';
import { storage } from '../utils/storage';
import { calculateSchemeProgress, formatCurrency, formatDate } from '../utils/calculations';
import { SchemeForm } from './SchemeForm';
import { ActionButton } from './UI/ActionButton';
import { ActionCard } from './UI/ActionCard';
import { Modal } from './UI/Modal';
import { ConfirmDialog } from './UI/ConfirmDialog';
import { useModal } from '../hooks/useModal';
import { useActions } from '../hooks/useActions';
import toast from 'react-hot-toast';

export const Schemes: React.FC = () => {
  const [schemes, setSchemes] = useState<ChitScheme[]>(storage.getSchemes());
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedScheme, setSelectedScheme] = useState<ChitScheme | null>(null);
  const [filterStatus, setFilterStatus] = useState<string>('all');
  
  const { isLoading } = useActions();
  const formModal = useModal();
  const confirmModal = useModal();
  const [schemeToDelete, setSchemeToDelete] = useState<ChitScheme | null>(null);

  const filteredSchemes = schemes.filter(scheme => {
    const matchesSearch = scheme.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterStatus === 'all' || scheme.status === filterStatus;
    return matchesSearch && matchesFilter;
  });

  const handleAddScheme = () => {
    setSelectedScheme(null);
    formModal.openModal();
  };

  const handleEditScheme = (scheme: ChitScheme) => {
    setSelectedScheme(scheme);
    formModal.openModal(scheme);
  };

  const handleDeleteScheme = (scheme: ChitScheme) => {
    setSchemeToDelete(scheme);
    confirmModal.openModal();
  };

  const confirmDelete = () => {
    if (schemeToDelete) {
      storage.deleteScheme(schemeToDelete.id);
      setSchemes(storage.getSchemes());
      toast.success('Scheme deleted successfully');
      confirmModal.closeModal();
      setSchemeToDelete(null);
    }
  };

  const handleFormSubmit = (schemeData: Partial<ChitScheme>) => {
    if (selectedScheme) {
      const updatedScheme = { ...selectedScheme, ...schemeData } as ChitScheme;
      storage.updateScheme(updatedScheme);
    } else {
      const newScheme: ChitScheme = {
        id: Date.now().toString(),
        name: schemeData.name!,
        totalAmount: schemeData.totalAmount!,
        monthlyContribution: schemeData.monthlyContribution!,
        duration: schemeData.duration!,
        startDate: schemeData.startDate!,
        endDate: schemeData.endDate!,
        status: schemeData.status!,
        members: schemeData.members || [],
        currentMonth: 1,
        auctionHistory: [],
      };
      storage.addScheme(newScheme);
    }
    setSchemes(storage.getSchemes());
    formModal.closeModal();
    toast.success(selectedScheme ? 'Scheme updated successfully' : 'Scheme created successfully');
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800';
      case 'completed': return 'bg-blue-100 text-blue-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <>
      <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Chit Schemes</h1>
          <p className="mt-2 text-sm text-gray-600">
            Manage your chit fund schemes and track their progress
          </p>
        </div>
        <ActionButton
          action="create-scheme"
          onClick={handleAddScheme}
          variant="primary"
        >
          <Plus className="h-4 w-4 mr-2" />
          Create Scheme
        </ActionButton>
      </div>

      {/* Filters and Search */}
      <div className="bg-white shadow rounded-lg p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <input
              type="text"
              placeholder="Search schemes..."
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
            <option value="pending">Pending</option>
            <option value="completed">Completed</option>
          </select>
          <div className="text-sm text-gray-600 flex items-center">
            Total Schemes: <span className="font-semibold ml-1">{filteredSchemes.length}</span>
          </div>
        </div>
      </div>

      {/* Schemes Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredSchemes.map((scheme) => {
          const progress = calculateSchemeProgress(scheme);
          const members = storage.getMembers();
          const schemeMembers = members.filter(m => scheme.members.includes(m.id));
          
          return (
            <ActionCard 
              key={scheme.id} 
              className="bg-white shadow rounded-lg overflow-hidden p-0"
              action="view-scheme"
              id={scheme.id}
            >
              <div className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-gray-900 truncate">{scheme.name}</h3>
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(scheme.status)}`}>
                    {scheme.status}
                  </span>
                </div>

                {/* Progress bar */}
                <div className="mb-4">
                  <div className="flex justify-between text-sm text-gray-600 mb-1">
                    <span>Progress</span>
                    <span>{Math.round(progress.progressPercentage)}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-gradient-to-r from-blue-500 to-green-500 h-2 rounded-full transition-all duration-300"
                      style={{ width: `${Math.min(progress.progressPercentage, 100)}%` }}
                    ></div>
                  </div>
                  <div className="flex justify-between text-xs text-gray-500 mt-1">
                    <span>Month {scheme.currentMonth}</span>
                    <span>of {scheme.duration}</span>
                  </div>
                </div>

                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center text-sm text-gray-600">
                      <DollarSign className="h-4 w-4 mr-1" />
                      <span>Total Amount</span>
                    </div>
                    <span className="text-sm font-semibold text-gray-900">
                      {formatCurrency(scheme.totalAmount)}
                    </span>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center text-sm text-gray-600">
                      <TrendingUp className="h-4 w-4 mr-1" />
                      <span>Monthly</span>
                    </div>
                    <span className="text-sm font-semibold text-gray-900">
                      {formatCurrency(scheme.monthlyContribution)}
                    </span>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center text-sm text-gray-600">
                      <Users className="h-4 w-4 mr-1" />
                      <span>Members</span>
                    </div>
                    <span className="text-sm font-semibold text-gray-900">
                      {scheme.members.length}
                    </span>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center text-sm text-gray-600">
                      <Calendar className="h-4 w-4 mr-1" />
                      <span>Start Date</span>
                    </div>
                    <span className="text-sm font-semibold text-gray-900">
                      {formatDate(scheme.startDate)}
                    </span>
                  </div>
                </div>

                <div className="mt-4 pt-4 border-t border-gray-200">
                  <div className="flex justify-between text-sm">
                    <div>
                      <p className="text-gray-500">Collected</p>
                      <p className="font-semibold text-green-600">{formatCurrency(progress.totalCollected)}</p>
                    </div>
                    <div>
                      <p className="text-gray-500">Remaining</p>
                      <p className="font-semibold text-orange-600">{formatCurrency(progress.remainingAmount)}</p>
                    </div>
                  </div>
                </div>

                <div className="mt-4 flex justify-end space-x-2">
                  <ActionButton
                    action="edit-scheme"
                    id={scheme.id}
                    onClick={() => handleEditScheme(scheme)}
                    variant="secondary"
                    size="sm"
                    className="p-2"
                  >
                    <Edit className="h-4 w-4" />
                  </ActionButton>
                  <ActionButton
                    action="delete-scheme"
                    id={scheme.id}
                    onClick={() => handleDeleteScheme(scheme)}
                    variant="danger"
                    size="sm"
                    className="p-2"
                  >
                    <Trash2 className="h-4 w-4" />
                  </ActionButton>
                </div>
              </div>
            </ActionCard>
          );
        })}
      </div>

      {filteredSchemes.length === 0 && (
        <div className="text-center py-12">
          <div className="text-gray-500">
            <DollarSign className="h-12 w-12 mx-auto mb-4 opacity-50" />
            <p className="text-lg font-medium">No schemes found</p>
            <p className="text-sm">Try adjusting your search criteria or create a new scheme.</p>
          </div>
        </div>
      )}
      </div>

      {/* Add/Edit Scheme Modal */}
      <Modal
        isOpen={formModal.isOpen}
        onClose={formModal.closeModal}
        title={selectedScheme ? 'Edit Scheme' : 'Create New Scheme'}
        size="lg"
      >
        <SchemeForm
          scheme={selectedScheme}
          onSubmit={handleFormSubmit}
          onCancel={formModal.closeModal}
        />
      </Modal>

      {/* Delete Confirmation Dialog */}
      <ConfirmDialog
        isOpen={confirmModal.isOpen}
        onClose={confirmModal.closeModal}
        onConfirm={confirmDelete}
        title="Delete Scheme"
        message={`Are you sure you want to delete "${schemeToDelete?.name}"? This action cannot be undone.`}
        confirmText="Delete"
        cancelText="Cancel"
        type="danger"
        isLoading={isLoading['delete-scheme']}
      />
    </>
  );
};