import React, { useState } from 'react';
import { ArrowLeft, Save, Users, CreditCard, Calendar, DollarSign, Building, User, Plus, X, Target, Award } from 'lucide-react';
import { ChitGroup } from '../../types/chit';

interface CreateAllocateGroupsProps {
  onBack: () => void;
  onSave: (group: Partial<ChitGroup>) => void;
}

export const CreateAllocateGroups: React.FC<CreateAllocateGroupsProps> = ({ onBack, onSave }) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<Partial<ChitGroup>>({
    name: '',
    code: '',
    totalAmount: 0,
    installmentAmount: 0,
    duration: 12,
    startDate: new Date().toISOString().split('T')[0],
    status: 'pending',
    branchId: '',
    agentId: '',
    members: [],
    auctions: [],
    installments: [],
    commissionPercentage: 5
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  const steps = [
    { id: 1, name: 'Basic Info', icon: CreditCard },
    { id: 2, name: 'Financial Details', icon: DollarSign },
    { id: 3, name: 'Assignment', icon: Building },
    { id: 4, name: 'Member Allocation', icon: Users },
    { id: 5, name: 'Review', icon: Target }
  ];

  const branches = [
    { id: 'branch_001', name: 'Bangalore Main' },
    { id: 'branch_002', name: 'Chennai Branch' },
    { id: 'branch_003', name: 'Hyderabad Branch' }
  ];

  const agents = [
    { id: 'agent_001', name: 'Priya Sharma' },
    { id: 'agent_002', name: 'Karthik Nair' },
    { id: 'agent_003', name: 'Vikram Singh' }
  ];

  const handleInputChange = (field: string, value: any) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
    
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const validateStep = (step: number) => {
    const newErrors: Record<string, string> = {};

    switch (step) {
      case 1:
        if (!formData.name?.trim()) newErrors.name = 'Group name is required';
        if (!formData.code?.trim()) newErrors.code = 'Group code is required';
        break;
      case 2:
        if (!formData.totalAmount || formData.totalAmount <= 0) newErrors.totalAmount = 'Total amount is required';
        if (!formData.installmentAmount || formData.installmentAmount <= 0) newErrors.installmentAmount = 'Installment amount is required';
        if (!formData.duration || formData.duration <= 0) newErrors.duration = 'Duration is required';
        break;
      case 3:
        if (!formData.branchId?.trim()) newErrors.branchId = 'Branch is required';
        if (!formData.agentId?.trim()) newErrors.agentId = 'Agent is required';
        break;
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validateStep(currentStep)) {
      setCurrentStep(prev => Math.min(prev + 1, 5));
    }
  };

  const handlePrevious = () => {
    setCurrentStep(prev => Math.max(prev - 1, 1));
  };

  const handleSubmit = () => {
    if (validateStep(currentStep)) {
      const endDate = new Date(formData.startDate!);
      endDate.setMonth(endDate.getMonth() + (formData.duration || 12));
      
      const groupData = {
        ...formData,
        id: Date.now().toString(),
        endDate: endDate.toISOString().split('T')[0],
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      };
      onSave(groupData);
    }
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-slate-50 mb-2">Group Name *</label>
                <input
                  type="text"
                  value={formData.name || ''}
                  onChange={(e) => handleInputChange('name', e.target.value)}
                  className={`w-full px-3 py-2 bg-slate-700/50 border rounded-lg text-slate-50 placeholder-slate-400 focus:ring-2 focus:ring-blue-500 backdrop-blur-sm ${
                    errors.name ? 'border-red-500' : 'border-yellow-400/30'
                  }`}
                  placeholder="Premium Gold A1"
                />
                {errors.name && <p className="mt-1 text-sm text-red-400">{errors.name}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-50 mb-2">Group Code *</label>
                <input
                  type="text"
                  value={formData.code || ''}
                  onChange={(e) => handleInputChange('code', e.target.value)}
                  className={`w-full px-3 py-2 bg-slate-700/50 border rounded-lg text-slate-50 placeholder-slate-400 focus:ring-2 focus:ring-blue-500 backdrop-blur-sm ${
                    errors.code ? 'border-red-500' : 'border-yellow-400/30'
                  }`}
                  placeholder="PGA1-2024"
                />
                {errors.code && <p className="mt-1 text-sm text-red-400">{errors.code}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-50 mb-2">Start Date</label>
                <input
                  type="date"
                  value={formData.startDate || ''}
                  onChange={(e) => handleInputChange('startDate', e.target.value)}
                  className="w-full px-3 py-2 bg-slate-700/50 border border-yellow-400/30 rounded-lg text-slate-50 focus:ring-2 focus:ring-blue-500 backdrop-blur-sm"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-50 mb-2">Status</label>
                <select
                  value={formData.status || 'pending'}
                  onChange={(e) => handleInputChange('status', e.target.value)}
                  className="w-full px-3 py-2 bg-slate-700/50 border border-yellow-400/30 rounded-lg text-slate-50 focus:ring-2 focus:ring-blue-500 backdrop-blur-sm"
                >
                  <option value="pending">Pending</option>
                  <option value="active">Active</option>
                  <option value="completed">Completed</option>
                  <option value="suspended">Suspended</option>
                </select>
              </div>
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-slate-50 mb-2">Total Amount (₹) *</label>
                <input
                  type="number"
                  value={formData.totalAmount || ''}
                  onChange={(e) => handleInputChange('totalAmount', parseFloat(e.target.value) || 0)}
                  className={`w-full px-3 py-2 bg-slate-700/50 border rounded-lg text-slate-50 placeholder-slate-400 focus:ring-2 focus:ring-blue-500 backdrop-blur-sm ${
                    errors.totalAmount ? 'border-red-500' : 'border-yellow-400/30'
                  }`}
                  placeholder="1000000"
                />
                {errors.totalAmount && <p className="mt-1 text-sm text-red-400">{errors.totalAmount}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-50 mb-2">Monthly Installment (₹) *</label>
                <input
                  type="number"
                  value={formData.installmentAmount || ''}
                  onChange={(e) => handleInputChange('installmentAmount', parseFloat(e.target.value) || 0)}
                  className={`w-full px-3 py-2 bg-slate-700/50 border rounded-lg text-slate-50 placeholder-slate-400 focus:ring-2 focus:ring-blue-500 backdrop-blur-sm ${
                    errors.installmentAmount ? 'border-red-500' : 'border-yellow-400/30'
                  }`}
                  placeholder="50000"
                />
                {errors.installmentAmount && <p className="mt-1 text-sm text-red-400">{errors.installmentAmount}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-50 mb-2">Duration (Months) *</label>
                <input
                  type="number"
                  value={formData.duration || ''}
                  onChange={(e) => handleInputChange('duration', parseInt(e.target.value) || 0)}
                  className={`w-full px-3 py-2 bg-slate-700/50 border rounded-lg text-slate-50 placeholder-slate-400 focus:ring-2 focus:ring-blue-500 backdrop-blur-sm ${
                    errors.duration ? 'border-red-500' : 'border-yellow-400/30'
                  }`}
                  placeholder="20"
                />
                {errors.duration && <p className="mt-1 text-sm text-red-400">{errors.duration}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-50 mb-2">Commission (%)</label>
                <input
                  type="number"
                  step="0.1"
                  value={formData.commissionPercentage || ''}
                  onChange={(e) => handleInputChange('commissionPercentage', parseFloat(e.target.value) || 0)}
                  className="w-full px-3 py-2 bg-slate-700/50 border border-yellow-400/30 rounded-lg text-slate-50 placeholder-slate-400 focus:ring-2 focus:ring-blue-500 backdrop-blur-sm"
                  placeholder="5.0"
                />
              </div>
            </div>

            {/* Calculation Summary */}
            {formData.totalAmount && formData.installmentAmount && formData.duration && (
              <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
                <h4 className="text-sm font-medium text-blue-900 mb-2">Financial Summary</h4>
                <div className="text-sm text-blue-800 space-y-1">
                  <p>Total Amount: ₹{formData.totalAmount.toLocaleString('en-IN')}</p>
                  <p>Monthly Collection: ₹{formData.installmentAmount.toLocaleString('en-IN')}</p>
                  <p>Duration: {formData.duration} months</p>
                  <p>Commission: {formData.commissionPercentage}%</p>
                </div>
              </div>
            )}
          </div>
        );

      case 3:
        return (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-slate-50 mb-2">Branch *</label>
                <select
                  value={formData.branchId || ''}
                  onChange={(e) => handleInputChange('branchId', e.target.value)}
                  className={`w-full px-3 py-2 bg-slate-700/50 border rounded-lg text-slate-50 focus:ring-2 focus:ring-blue-500 backdrop-blur-sm ${
                    errors.branchId ? 'border-red-500' : 'border-yellow-400/30'
                  }`}
                >
                  <option value="">Select Branch</option>
                  {branches.map(branch => (
                    <option key={branch.id} value={branch.id}>{branch.name}</option>
                  ))}
                </select>
                {errors.branchId && <p className="mt-1 text-sm text-red-400">{errors.branchId}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-50 mb-2">Assigned Agent *</label>
                <select
                  value={formData.agentId || ''}
                  onChange={(e) => handleInputChange('agentId', e.target.value)}
                  className={`w-full px-3 py-2 bg-slate-700/50 border rounded-lg text-slate-50 focus:ring-2 focus:ring-blue-500 backdrop-blur-sm ${
                    errors.agentId ? 'border-red-500' : 'border-yellow-400/30'
                  }`}
                >
                  <option value="">Select Agent</option>
                  {agents.map(agent => (
                    <option key={agent.id} value={agent.id}>{agent.name}</option>
                  ))}
                </select>
                {errors.agentId && <p className="mt-1 text-sm text-red-400">{errors.agentId}</p>}
              </div>
            </div>
          </div>
        );

      case 4:
        return (
          <div className="space-y-6">
            <div className="text-center py-12 border-2 border-dashed border-yellow-400/30 rounded-xl">
              <Users className="h-12 w-12 mx-auto text-slate-400 mb-4" />
              <h3 className="text-lg font-medium text-slate-50 mb-2">Member Allocation</h3>
              <p className="text-sm text-slate-400 mb-4">Allocate members to this chit group</p>
              <button className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                <Plus className="h-4 w-4 mr-2" />
                Add Members
              </button>
            </div>
          </div>
        );

      case 5:
        return (
          <div className="space-y-6">
            <h3 className="text-lg font-semibold text-slate-50">Review Group Details</h3>
            
            <div className="bg-slate-700/30 rounded-xl p-6 border border-yellow-400/20">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-slate-400">Group Name</span>
                    <span className="text-slate-50 font-medium">{formData.name}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Group Code</span>
                    <span className="text-slate-50">{formData.code}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Total Amount</span>
                    <span className="text-green-400 font-medium">₹{formData.totalAmount?.toLocaleString('en-IN')}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Monthly Installment</span>
                    <span className="text-blue-400 font-medium">₹{formData.installmentAmount?.toLocaleString('en-IN')}</span>
                  </div>
                </div>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-slate-400">Duration</span>
                    <span className="text-slate-50">{formData.duration} months</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Commission</span>
                    <span className="text-purple-400">{formData.commissionPercentage}%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Branch</span>
                    <span className="text-slate-50">{branches.find(b => b.id === formData.branchId)?.name}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Agent</span>
                    <span className="text-slate-50">{agents.find(a => a.id === formData.agentId)?.name}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="h-full flex flex-col bg-slate-900 overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-yellow-400/30 flex-shrink-0">
        <div className="flex items-center space-x-4">
          <button
            onClick={onBack}
            className="p-2 text-slate-400 hover:text-slate-50 hover:bg-slate-700/50 rounded-lg transition-all"
          >
            <ArrowLeft className="h-5 w-5" />
          </button>
          <div>
            <h1 className="text-2xl font-bold text-slate-50">Create / Allocate Groups</h1>
            <p className="mt-1 text-sm text-slate-400">
              Step {currentStep} of {steps.length}: {steps.find(s => s.id === currentStep)?.name}
            </p>
          </div>
        </div>
      </div>

      {/* Progress Steps */}
      <div className="p-4 border-b border-yellow-400/30 bg-slate-800/40 backdrop-blur-xl flex-shrink-0">
        <div className="flex items-center justify-between">
          {steps.map((step, index) => {
            const Icon = step.icon;
            const isActive = currentStep === step.id;
            const isCompleted = currentStep > step.id;
            
            return (
              <div key={step.id} className="flex items-center">
                <div className={`flex items-center justify-center w-10 h-10 rounded-full border-2 transition-all ${
                  isActive ? 'bg-blue-500 border-blue-500 text-white' :
                  isCompleted ? 'bg-green-500 border-green-500 text-white' :
                  'bg-slate-700/50 border-yellow-400/30 text-slate-400'
                }`}>
                  <Icon className="h-5 w-5" />
                </div>
                <div className="ml-3">
                  <p className={`text-sm font-medium ${
                    isActive ? 'text-blue-400' :
                    isCompleted ? 'text-green-400' : 'text-slate-400'
                  }`}>
                    {step.name}
                  </p>
                </div>
                {index < steps.length - 1 && (
                  <div className={`flex-1 h-0.5 mx-4 ${
                    isCompleted ? 'bg-green-500' : 'bg-slate-600'
                  }`} />
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Form Content */}
      <div className="flex-1 overflow-y-auto p-6 scrollbar-none">
        <div className="max-w-4xl mx-auto">
          <div className="bg-slate-800/40 backdrop-blur-xl rounded-2xl p-8 border border-yellow-400/30">
            {renderStepContent()}
          </div>
        </div>
      </div>

      {/* Navigation Buttons */}
      <div className="p-4 border-t border-yellow-400/30 bg-slate-800/40 backdrop-blur-xl flex justify-between flex-shrink-0">
        <button
          onClick={handlePrevious}
          disabled={currentStep === 1}
          className="px-4 py-2 text-sm font-medium text-slate-300 bg-slate-700/50 border border-yellow-400/30 rounded-lg hover:bg-slate-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed backdrop-blur-sm"
        >
          Previous
        </button>
        
        <div className="flex space-x-3">
          <button
            onClick={onBack}
            className="px-4 py-2 text-sm font-medium text-slate-300 bg-slate-700/50 border border-yellow-400/30 rounded-lg hover:bg-slate-700 transition-all backdrop-blur-sm"
          >
            Cancel
          </button>
          
          {currentStep === steps.length ? (
            <button
              onClick={handleSubmit}
              className="inline-flex items-center px-6 py-2 text-sm font-medium text-white bg-green-600 border border-transparent rounded-lg shadow-sm hover:bg-green-700 transition-all"
            >
              <Save className="h-4 w-4 mr-2" />
              Create Group
            </button>
          ) : (
            <button
              onClick={handleNext}
              className="px-6 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-lg shadow-sm hover:bg-blue-700 transition-all"
            >
              Next
            </button>
          )}
        </div>
      </div>
    </div>
  );
};