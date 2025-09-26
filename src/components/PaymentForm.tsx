import React, { useState } from 'react';
import { ArrowLeft, Save } from 'lucide-react';
import { Payment } from '../types';
import { storage } from '../utils/storage';

interface PaymentFormProps {
  payment: Payment | null;
  onSubmit: (data: Partial<Payment>) => void;
  onCancel: () => void;
}

export const PaymentForm: React.FC<PaymentFormProps> = ({ payment, onSubmit, onCancel }) => {
  const [formData, setFormData] = useState({
    memberId: payment?.memberId || '',
    schemeId: payment?.schemeId || '',
    amount: payment?.amount || 0,
    dueDate: payment?.dueDate || new Date().toISOString().split('T')[0],
    status: payment?.status || 'pending',
    method: payment?.method || 'upi',
    paidDate: payment?.paidDate || '',
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const members = storage.getMembers();
  const schemes = storage.getSchemes();

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.memberId) {
      newErrors.memberId = 'Please select a member';
    }

    if (!formData.schemeId) {
      newErrors.schemeId = 'Please select a scheme';
    }

    if (formData.amount <= 0) {
      newErrors.amount = 'Amount must be greater than 0';
    }

    if (!formData.dueDate) {
      newErrors.dueDate = 'Due date is required';
    }

    if (formData.status === 'paid' && !formData.paidDate) {
      newErrors.paidDate = 'Paid date is required when status is paid';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      onSubmit({
        ...formData,
        paidDate: formData.status === 'paid' ? formData.paidDate : undefined,
      });
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'amount' ? parseFloat(value) || 0 : value,
    }));
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
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
              {payment ? 'Edit Payment' : 'Add New Payment'}
            </h1>
            <p className="mt-2 text-sm text-gray-600">
              {payment ? 'Update payment information' : 'Record a new payment transaction'}
            </p>
          </div>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="bg-white shadow rounded-lg">
        <div className="px-6 py-8 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="memberId" className="block text-sm font-medium text-gray-700 mb-1">
                Member *
              </label>
              <select
                id="memberId"
                name="memberId"
                value={formData.memberId}
                onChange={handleChange}
                className={`w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                  errors.memberId ? 'border-red-300 focus:border-red-500' : 'border-gray-300 focus:border-blue-500'
                }`}
              >
                <option value="">Select a member</option>
                {members.map((member) => (
                  <option key={member.id} value={member.id}>
                    {member.name}
                  </option>
                ))}
              </select>
              {errors.memberId && <p className="mt-1 text-sm text-red-600">{errors.memberId}</p>}
            </div>

            <div>
              <label htmlFor="schemeId" className="block text-sm font-medium text-gray-700 mb-1">
                Scheme *
              </label>
              <select
                id="schemeId"
                name="schemeId"
                value={formData.schemeId}
                onChange={handleChange}
                className={`w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                  errors.schemeId ? 'border-red-300 focus:border-red-500' : 'border-gray-300 focus:border-blue-500'
                }`}
              >
                <option value="">Select a scheme</option>
                {schemes.map((scheme) => (
                  <option key={scheme.id} value={scheme.id}>
                    {scheme.name}
                  </option>
                ))}
              </select>
              {errors.schemeId && <p className="mt-1 text-sm text-red-600">{errors.schemeId}</p>}
            </div>

            <div>
              <label htmlFor="amount" className="block text-sm font-medium text-gray-700 mb-1">
                Amount (₹) *
              </label>
              <input
                type="number"
                id="amount"
                name="amount"
                value={formData.amount}
                onChange={handleChange}
                className={`w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                  errors.amount ? 'border-red-300 focus:border-red-500' : 'border-gray-300 focus:border-blue-500'
                }`}
                placeholder="5000"
              />
              {errors.amount && <p className="mt-1 text-sm text-red-600">{errors.amount}</p>}
            </div>

            <div>
              <label htmlFor="dueDate" className="block text-sm font-medium text-gray-700 mb-1">
                Due Date *
              </label>
              <input
                type="date"
                id="dueDate"
                name="dueDate"
                value={formData.dueDate}
                onChange={handleChange}
                className={`w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                  errors.dueDate ? 'border-red-300 focus:border-red-500' : 'border-gray-300 focus:border-blue-500'
                }`}
              />
              {errors.dueDate && <p className="mt-1 text-sm text-red-600">{errors.dueDate}</p>}
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
                <option value="paid">Paid</option>
              </select>
            </div>

            <div>
              <label htmlFor="method" className="block text-sm font-medium text-gray-700 mb-1">
                Payment Method
              </label>
              <select
                id="method"
                name="method"
                value={formData.method}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="cash">Cash</option>
                <option value="bank">Bank Transfer</option>
                <option value="upi">UPI</option>
                <option value="cheque">Cheque</option>
              </select>
            </div>
          </div>

          {formData.status === 'paid' && (
            <div>
              <label htmlFor="paidDate" className="block text-sm font-medium text-gray-700 mb-1">
                Paid Date *
              </label>
              <input
                type="date"
                id="paidDate"
                name="paidDate"
                value={formData.paidDate}
                onChange={handleChange}
                className={`w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                  errors.paidDate ? 'border-red-300 focus:border-red-500' : 'border-gray-300 focus:border-blue-500'
                }`}
              />
              {errors.paidDate && <p className="mt-1 text-sm text-red-600">{errors.paidDate}</p>}
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
            {payment ? 'Update Payment' : 'Add Payment'}
          </button>
        </div>
      </form>
    </div>
  );
};