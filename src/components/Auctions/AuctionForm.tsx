import React, { useState, useEffect } from 'react';
import { Auction } from '../../types/auction';

interface AuctionFormProps {
  mode: 'create' | 'edit';
  initial?: Auction;
  onSubmit: (data: Omit<Auction, 'id'>) => void;
  onCancel: () => void;
}

export const AuctionForm: React.FC<AuctionFormProps> = ({
  mode,
  initial,
  onSubmit,
  onCancel
}) => {
  const [formData, setFormData] = useState({
    groupCode: '',
    ticketValue: 0,
    tenureMonths: 0,
    monthNo: 1,
    date: '',
    winner: '',
    discount: 0,
    status: 'Scheduled' as const
  });
  
  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    if (initial) {
      setFormData({
        groupCode: initial.groupCode,
        ticketValue: initial.ticketValue,
        tenureMonths: initial.tenureMonths,
        monthNo: initial.monthNo,
        date: initial.date,
        winner: initial.winner || '',
        discount: initial.discount || 0,
        status: initial.status
      });
    }
  }, [initial]);

  const validate = (): boolean => {
    const newErrors: Record<string, string> = {};
    
    if (!formData.groupCode.trim()) {
      newErrors.groupCode = 'Group code is required';
    }
    
    if (formData.ticketValue <= 0) {
      newErrors.ticketValue = 'Ticket value must be greater than 0';
    }
    
    if (formData.tenureMonths <= 0) {
      newErrors.tenureMonths = 'Tenure months must be greater than 0';
    }
    
    if (formData.monthNo < 1 || formData.monthNo > formData.tenureMonths) {
      newErrors.monthNo = `Month number must be between 1 and ${formData.tenureMonths}`;
    }
    
    if (!formData.date) {
      newErrors.date = 'Date is required';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validate()) {
      onSubmit({
        ...formData,
        groupCode: formData.groupCode.trim(),
        winner: formData.winner.trim() || undefined,
        discount: formData.discount || undefined
      });
    }
  };

  const handleChange = (field: string, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-md max-h-[90vh] overflow-y-auto">
        <h2 className="text-xl font-bold mb-4">
          {mode === 'create' ? 'Add New Auction' : 'Edit Auction'}
        </h2>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Group Code *</label>
            <input
              type="text"
              value={formData.groupCode}
              onChange={(e) => handleChange('groupCode', e.target.value)}
              className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="e.g., RC-25-A"
            />
            {errors.groupCode && <p className="text-red-500 text-xs mt-1">{errors.groupCode}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Ticket Value *</label>
            <input
              type="number"
              value={formData.ticketValue}
              onChange={(e) => handleChange('ticketValue', Number(e.target.value))}
              className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              min="1"
            />
            {errors.ticketValue && <p className="text-red-500 text-xs mt-1">{errors.ticketValue}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Tenure Months *</label>
            <input
              type="number"
              value={formData.tenureMonths}
              onChange={(e) => handleChange('tenureMonths', Number(e.target.value))}
              className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              min="1"
            />
            {errors.tenureMonths && <p className="text-red-500 text-xs mt-1">{errors.tenureMonths}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Month No *</label>
            <input
              type="number"
              value={formData.monthNo}
              onChange={(e) => handleChange('monthNo', Number(e.target.value))}
              className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              min="1"
              max={formData.tenureMonths}
            />
            {errors.monthNo && <p className="text-red-500 text-xs mt-1">{errors.monthNo}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Date *</label>
            <input
              type="date"
              value={formData.date}
              onChange={(e) => handleChange('date', e.target.value)}
              className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
            {errors.date && <p className="text-red-500 text-xs mt-1">{errors.date}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Winner</label>
            <input
              type="text"
              value={formData.winner}
              onChange={(e) => handleChange('winner', e.target.value)}
              className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Subscriber code/name"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Discount</label>
            <input
              type="number"
              value={formData.discount}
              onChange={(e) => handleChange('discount', Number(e.target.value))}
              className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              min="0"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Status *</label>
            <select
              value={formData.status}
              onChange={(e) => handleChange('status', e.target.value)}
              className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="Scheduled">Scheduled</option>
              <option value="Completed">Completed</option>
              <option value="Cancelled">Cancelled</option>
            </select>
          </div>

          <div className="flex gap-2 pt-4">
            <button
              type="submit"
              className="flex-1 bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition-colors"
            >
              {mode === 'create' ? 'Create' : 'Update'}
            </button>
            <button
              type="button"
              onClick={onCancel}
              className="flex-1 bg-gray-300 text-gray-700 py-2 px-4 rounded hover:bg-gray-400 transition-colors"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};