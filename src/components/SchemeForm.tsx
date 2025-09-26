import React, { useState } from 'react';
import { ArrowLeft, Save, Users } from 'lucide-react';
import { ChitScheme } from '../types';
import { storage } from '../utils/storage';

interface SchemeFormProps {
  scheme: ChitScheme | null;
  onSubmit: (data: Partial<ChitScheme>) => void;
  onCancel: () => void;
}

export const SchemeForm: React.FC<SchemeFormProps> = ({ scheme, onSubmit, onCancel }) => {
  const [formData, setFormData] = useState({
    name: scheme?.name || '',
    totalAmount: scheme?.totalAmount || 0,
    monthlyContribution: scheme?.monthlyContribution || 0,
    duration: scheme?.duration || 12,
    startDate: scheme?.startDate || new Date().toISOString().split('T')[0],
    status: scheme?.status || 'pending',
    members: scheme?.members || [],
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const availableMembers = storage.getMembers();

  const calculateEndDate = (startDate: string, duration: number) => {
    const start = new Date(startDate);
    start.setMonth(start.getMonth() + duration);
    return start.toISOString().split('T')[0];
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Scheme name is required';
    }

    if (formData.totalAmount <= 0) {
      newErrors.totalAmount = 'Total amount must be greater than 0';
    }

    if (formData.monthlyContribution <= 0) {
      newErrors.monthlyContribution = 'Monthly contribution must be greater than 0';
    }

    if (formData.duration <= 0) {
      newErrors.duration = 'Duration must be greater than 0';
    }

    if (!formData.startDate) {
      newErrors.startDate = 'Start date is required';
    }

    // Check if monthly contribution * duration matches total amount
    const calculatedTotal = formData.monthlyContribution * formData.duration * formData.members.length;
    if (calculatedTotal !== formData.totalAmount && formData.members.length > 0) {
      newErrors.totalAmount = `Total should be ${formData.monthlyContribution * formData.duration * formData.members.length} based on ${formData.members.length} members × ${formData.monthlyContribution} × ${formData.duration} months`;
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      const endDate = calculateEndDate(formData.startDate, formData.duration);
      onSubmit({
        ...formData,
        endDate,
      });
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: ['totalAmount', 'monthlyContribution', 'duration'].includes(name) 
        ? parseFloat(value) || 0 
        : value,
    }));
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleMemberToggle = (memberId: string) => {
    setFormData(prev => ({
      ...prev,
      members: prev.members.includes(memberId)
        ? prev.members.filter(id => id !== memberId)
        : [...prev.members, memberId],
    }));
  };

  const calculateSuggestedAmount = () => {
    if (formData.members.length > 0 && formData.monthlyContribution > 0 && formData.duration > 0) {
      return formData.monthlyContribution * formData.duration * formData.members.length;
    }
    return 0;
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <button
            onClick={onCancel}
            className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-md transition-colors duration-200"
          >
            <ArrowLeft className="h-5 w-5" />
          </button>
          <div>
            <h1 className="text-3xl font-bold text-gray-900">
              {scheme ? 'Edit Scheme' : 'Create New Scheme'}
            </h1>
            <p className="mt-2 text-sm text-gray-600">
              {scheme ? 'Update scheme details' : 'Set up a new chit fund scheme'}
            </p>
          </div>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="bg-white shadow rounded-lg">
        <div className="px-6 py-8 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="md:col-span-2">
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                Scheme Name *
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className={`w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                  errors.name ? 'border-red-300 focus:border-red-500' : 'border-gray-300 focus:border-blue-500'
                }`}
                placeholder="Enter scheme name"
              />
              {errors.name && <p className="mt-1 text-sm text-red-600">{errors.name}</p>}
            </div>

            <div>
              <label htmlFor="totalAmount" className="block text-sm font-medium text-gray-700 mb-1">
                Total Amount (₹) *
              </label>
              <input
                type="number"
                id="totalAmount"
                name="totalAmount"
                value={formData.totalAmount}
                onChange={handleChange}
                className={`w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                  errors.totalAmount ? 'border-red-300 focus:border-red-500' : 'border-gray-300 focus:border-blue-500'
                }`}
                placeholder="100000"
              />
              {errors.totalAmount && <p className="mt-1 text-sm text-red-600">{errors.totalAmount}</p>}
              {calculateSuggestedAmount() > 0 && (
                <p className="mt-1 text-sm text-blue-600">
                  Suggested: ₹{calculateSuggestedAmount().toLocaleString('en-IN')}
                </p>
              )}
            </div>

            <div>
              <label htmlFor="monthlyContribution" className="block text-sm font-medium text-gray-700 mb-1">
                Monthly Contribution (₹) *
              </label>
              <input
                type="number"
                id="monthlyContribution"
                name="monthlyContribution"
                value={formData.monthlyContribution}
                onChange={handleChange}
                className={`w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                  errors.monthlyContribution ? 'border-red-300 focus:border-red-500' : 'border-gray-300 focus:border-blue-500'
                }`}
                placeholder="5000"
              />
              {errors.monthlyContribution && <p className="mt-1 text-sm text-red-600">{errors.monthlyContribution}</p>}
            </div>

            <div>
              <label htmlFor="duration" className="block text-sm font-medium text-gray-700 mb-1">
                Duration (Months) *
              </label>
              <input
                type="number"
                id="duration"
                name="duration"
                value={formData.duration}
                onChange={handleChange}
                className={`w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                  errors.duration ? 'border-red-300 focus:border-red-500' : 'border-gray-300 focus:border-blue-500'
                }`}
                placeholder="12"
              />
              {errors.duration && <p className="mt-1 text-sm text-red-600">{errors.duration}</p>}
            </div>

            <div>
              <label htmlFor="startDate" className="block text-sm font-medium text-gray-700 mb-1">
                Start Date *
              </label>
              <input
                type="date"
                id="startDate"
                name="startDate"
                value={formData.startDate}
                onChange={handleChange}
                className={`w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                  errors.startDate ? 'border-red-300 focus:border-red-500' : 'border-gray-300 focus:border-blue-500'
                }`}
              />
              {errors.startDate && <p className="mt-1 text-sm text-red-600">{errors.startDate}</p>}
              {formData.startDate && (
                <p className="mt-1 text-sm text-gray-500">
                  End Date: {calculateEndDate(formData.startDate, formData.duration)}
                </p>
              )}
            </div>

            <div>
              <label htmlFor="status" className="block text-sm font-medium text-gray-700 mb-1">
                Status
              </label>
              <select
                id="status"
                name="status"
                value={formData.status}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="pending">Pending</option>
                <option value="active">Active</option>
                <option value="completed">Completed</option>
              </select>
            </div>
          </div>

          {/* Member Selection */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-3">
              <Users className="inline h-4 w-4 mr-1" />
              Select Members ({formData.members.length} selected)
            </label>
            <div className="border border-gray-300 rounded-md max-h-60 overflow-y-auto">
              {availableMembers.length === 0 ? (
                <div className="p-4 text-center text-gray-500">
                  <p>No members available. Add members first to assign them to schemes.</p>
                </div>
              ) : (
                <div className="space-y-2 p-2">
                  {availableMembers.map((member) => (
                    <label
                      key={member.id}
                      className="flex items-center space-x-3 p-2 hover:bg-gray-50 rounded-md cursor-pointer"
                    >
                      <input
                        type="checkbox"
                        checked={formData.members.includes(member.id)}
                        onChange={() => handleMemberToggle(member.id)}
                        className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                      />
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-gray-900">{member.name}</p>
                        <p className="text-sm text-gray-500 truncate">{member.email}</p>
                      </div>
                      <div className="text-xs text-gray-400">
                        Score: {member.creditScore}
                      </div>
                    </label>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Calculation Summary */}
          {formData.members.length > 0 && (
            <div className="bg-blue-50 border border-blue-200 rounded-md p-4">
              <h4 className="text-sm font-medium text-blue-900 mb-2">Scheme Summary</h4>
              <div className="text-sm text-blue-800 space-y-1">
                <p>Members: {formData.members.length}</p>
                <p>Monthly Collection: ₹{(formData.monthlyContribution * formData.members.length).toLocaleString('en-IN')}</p>
                <p>Total Collection: ₹{(formData.monthlyContribution * formData.duration * formData.members.length).toLocaleString('en-IN')}</p>
                <p>Duration: {formData.duration} months</p>
              </div>
            </div>
          )}
        </div>

        <div className="px-6 py-4 bg-gray-50 border-t border-gray-200 flex justify-end space-x-3">
          <button
            type="button"
            onClick={onCancel}
            className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors duration-200"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="inline-flex items-center px-4 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-md shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors duration-200"
          >
            <Save className="h-4 w-4 mr-2" />
            {scheme ? 'Update Scheme' : 'Create Scheme'}
          </button>
        </div>
      </form>
    </div>
  );
};