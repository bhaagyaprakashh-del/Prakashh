import React, { useState } from 'react';
import { ArrowLeft, Save, Plus, Users, CreditCard, Building, Target, Calendar, DollarSign, User, CheckCircle, AlertTriangle } from 'lucide-react';

interface CreateAllocateGroupsProps {
  onBack: () => void;
  onSave: (groupData: any) => void;
}

export const CreateAllocateGroups: React.FC<CreateAllocateGroupsProps> = ({ onBack, onSave }) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    groupName: '',
    schemeId: '',
    totalAmount: 0,
    installmentAmount: 0,
    duration: 12,
    startDate: new Date().toISOString().split('T')[0],
    branchId: '',
    agentId: '',
    commissionPercentage: 5,
    maxMembers: 20,
    selectedMembers: [] as string[],
    notes: ''
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  const steps = [
    { id: 1, name: 'Group Details', icon: CreditCard },
    { id: 2, name: 'Financial Setup', icon: DollarSign },
    { id: 3, name: 'Member Allocation', icon: Users },
    { id: 4, name: 'Review & Create', icon: CheckCircle }
  ];

  const schemes = [
    { id: 'scheme1', name: 'Premium Gold Chit', ticketValue: 50000, duration: 20 },
    { id: 'scheme2', name: 'Silver Monthly Chit', ticketValue: 25000, duration: 12 },
    { id: 'scheme3', name: 'Basic Savings Chit', ticketValue: 10000, duration: 10 }
  ];

  const branches = [
    'Bangalore Main', 'Bangalore South', 'Bangalore East', 'Bangalore West',
    'Chennai Branch', 'Hyderabad Branch', 'Mumbai Branch'
  ];

  const agents = [
    'Karthik Nair', 'Vikram Singh', 'Priya Reddy', 'Suresh Kumar', 'Anjali Sharma'
  ];

  const availableMembers = [
    { id: 'sub1', name: 'Anita Desai', email: 'anita@example.com', creditScore: 85 },
    { id: 'sub2', name: 'Deepika Rao', email: 'deepika@example.com', creditScore: 92 },
    { id: 'sub3', name: 'Ravi Patel', email: 'ravi@example.com', creditScore: 78 },
    { id: 'sub4', name: 'Meera Nair', email: 'meera@example.com', creditScore: 88 },
    { id: 'sub5', name: 'Arjun Singh', email: 'arjun@example.com', creditScore: 75 }
  ];

  const handleInputChange = (field: string, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const handleMemberToggle = (memberId: string) => {
    setFormData(prev => ({
      ...prev,
      selectedMembers: prev.selectedMembers.includes(memberId)
        ? prev.selectedMembers.filter(id => id !== memberId)
        : [...prev.selectedMembers, memberId]
    }));
  };

  const validateStep = (step: number) => {
    const newErrors: Record<string, string> = {};

    switch (step) {
      case 1:
        if (!formData.groupName.trim()) newErrors.groupName = 'Group name is required';
        if (!formData.schemeId) newErrors.schemeId = 'Please select a scheme';
        if (!formData.branchId) newErrors.branchId = 'Please select a branch';
        if (!formData.agentId) newErrors.agentId = 'Please assign an agent';
        break;
      case 2:
        if (formData.totalAmount <= 0) newErrors.totalAmount = 'Total amount must be greater than 0';
        if (formData.installmentAmount <= 0) newErrors.installmentAmount = 'Installment amount must be greater than 0';
        if (formData.duration <= 0) newErrors.duration = 'Duration must be greater than 0';
        break;
      case 3:
        if (formData.selectedMembers.length === 0) newErrors.selectedMembers = 'Please select at least one member';
        break;
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validateStep(currentStep)) {
      setCurrentStep(prev => Math.min(prev + 1, 4));
    }
  };

  const handlePrevious = () => {
    setCurrentStep(prev => Math.max(prev - 1, 1));
  };

  const handleSubmit = () => {
    if (validateStep(currentStep)) {
      const groupData = {
        ...formData,
        id: Date.now().toString(),
        code: `${formData.groupName.substring(0, 3).toUpperCase()}${Date.now().toString().slice(-3)}`,
        status: 'pending',
        members: formData.selectedMembers.map((memberId, index) => ({
          id: `mem_${index + 1}`,
          groupId: Date.now().toString(),
          memberId,
          memberNumber: index + 1,
          joiningDate: formData.startDate,
          status: 'active',
          documents: [],
          totalPaid: 0,
          totalDue: formData.totalAmount,
          prizeReceived: false
        })),
        auctions: [],
        installments: [],
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
                  value={formData.groupName}
                  onChange={(e) => handleInputChange('groupName', e.target.value)}
                  className={`w-full px-3 py-2 bg-slate-700/50 border rounded-lg text-slate-50 placeholder-slate-400 focus:ring-2 focus:ring-blue-500 backdrop-blur-sm ${
                    errors.groupName ? 'border-red-500' : 'border-yellow-400/30'
                  }`}
                  placeholder="Enter group name"
                />
                {errors.groupName && <p className="mt-1 text-sm text-red-400">{errors.groupName}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-50 mb-2">Chit Scheme *</label>
                <select
                  value={formData.schemeId}
                  onChange={(e) => handleInputChange('schemeId', e.target.value)}
                  className={`w-full px-3 py-2 bg-slate-700/50 border rounded-lg text-slate-50 focus:ring-2 focus:ring-blue-500 backdrop-blur-sm ${
                    errors.schemeId ? 'border-red-500' : 'border-yellow-400/30'
                  }`}
                >
                  <option value="">Select Scheme</option>
                  {schemes.map(scheme => (
                    <option key={scheme.id} value={scheme.id}>{scheme.name}</option>
                  ))}
                </select>
                {errors.schemeId && <p className="mt-1 text-sm text-red-400">{errors.schemeId}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-50 mb-2">Branch *</label>
                <select
                  value={formData.branchId}
                  onChange={(e) => handleInputChange('branchId', e.target.value)}
                  className={`w-full px-3 py-2 bg-slate-700/50 border rounded-lg text-slate-50 focus:ring-2 focus:ring-blue-500 backdrop-blur-sm ${
                    errors.branchId ? 'border-red-500' : 'border-yellow-400/30'
                  }`}
                >
                  <option value="">Select Branch</option>
                  {branches.map(branch => (
                    <option key={branch} value={branch}>{branch}</option>
                  ))}
                </select>
                {errors.branchId && <p className="mt-1 text-sm text-red-400">{errors.branchId}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-50 mb-2">Assigned Agent *</label>
                <select
                  value={formData.agentId}
                  onChange={(e) => handleInputChange('agentId', e.target.value)}
                  className={`w-full px-3 py-2 bg-slate-700/50 border rounded-lg text-slate-50 focus:ring-2 focus:ring-blue-500 backdrop-blur-sm ${
                    errors.agentId ? 'border-red-500' : 'border-yellow-400/30'
                  }`}
                >
                  <option value="">Select Agent</option>
                  {agents.map(agent => (
                    <option key={agent} value={agent}>{agent}</option>
                  ))}
                </select>
                {errors.agentId && <p className="mt-1 text-sm text-red-400">{errors.agentId}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-50 mb-2">Start Date</label>
                <input
                  type="date"
                  value={formData.startDate}
                  onChange={(e) => handleInputChange('startDate', e.target.value)}
                  className="w-full px-3 py-2 bg-slate-700/50 border border-yellow-400/30 rounded-lg text-slate-50 focus:ring-2 focus:ring-blue-500 backdrop-blur-sm"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-50 mb-2">Commission (%)</label>
                <input
                  type="number"
                  step="0.1"
                  value={formData.commissionPercentage}
                  onChange={(e) => handleInputChange('commissionPercentage', parseFloat(e.target.value) || 0)}
                  className="w-full px-3 py-2 bg-slate-700/50 border border-yellow-400/30 rounded-lg text-slate-50 placeholder-slate-400 focus:ring-2 focus:ring-blue-500 backdrop-blur-sm"
                  placeholder="5.0"
                />
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
                  value={formData.totalAmount}
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
                  value={formData.installmentAmount}
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
                  value={formData.duration}
                  onChange={(e) => handleInputChange('duration', parseInt(e.target.value) || 0)}
                  className={`w-full px-3 py-2 bg-slate-700/50 border rounded-lg text-slate-50 placeholder-slate-400 focus:ring-2 focus:ring-blue-500 backdrop-blur-sm ${
                    errors.duration ? 'border-red-500' : 'border-yellow-400/30'
                  }`}
                  placeholder="20"
                />
                {errors.duration && <p className="mt-1 text-sm text-red-400">{errors.duration}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-50 mb-2">Maximum Members</label>
                <input
                  type="number"
                  value={formData.maxMembers}
                  onChange={(e) => handleInputChange('maxMembers', parseInt(e.target.value) || 0)}
                  className="w-full px-3 py-2 bg-slate-700/50 border border-yellow-400/30 rounded-lg text-slate-50 placeholder-slate-400 focus:ring-2 focus:ring-blue-500 backdrop-blur-sm"
                  placeholder="20"
                />
              </div>
            </div>

            {/* Financial Summary */}
            {formData.installmentAmount > 0 && formData.duration > 0 && formData.selectedMembers.length > 0 && (
              <div className="bg-blue-50 border border-blue-200 rounded-md p-4">
                <h4 className="text-sm font-medium text-blue-900 mb-2">Financial Summary</h4>
                <div className="text-sm text-blue-800 space-y-1">
                  <p>Monthly Collection: ₹{(formData.installmentAmount * formData.selectedMembers.length).toLocaleString('en-IN')}</p>
                  <p>Total Collection: ₹{(formData.installmentAmount * formData.duration * formData.selectedMembers.length).toLocaleString('en-IN')}</p>
                  <p>Commission per Month: ₹{((formData.installmentAmount * formData.selectedMembers.length * formData.commissionPercentage) / 100).toLocaleString('en-IN')}</p>
                </div>
              </div>
            )}
          </div>
        );

      case 3:
        return (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-semibold text-slate-50">Select Members ({formData.selectedMembers.length} selected)</h3>
              <div className="text-sm text-slate-400">
                Maximum: {formData.maxMembers} members
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {availableMembers.map((member) => (
                <div
                  key={member.id}
                  className={`p-4 border rounded-xl cursor-pointer transition-all ${
                    formData.selectedMembers.includes(member.id)
                      ? 'bg-blue-500/20 border-blue-500/50 text-slate-50'
                      : 'bg-slate-700/30 border-yellow-400/30 text-slate-300 hover:border-yellow-400/50'
                  }`}
                  onClick={() => handleMemberToggle(member.id)}
                >
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-medium">{member.name}</h4>
                    <div className="flex items-center space-x-2">
                      <span className="text-xs">Score: {member.creditScore}</span>
                      {formData.selectedMembers.includes(member.id) && (
                        <CheckCircle className="h-4 w-4 text-blue-400" />
                      )}
                    </div>
                  </div>
                  <p className="text-sm opacity-75">{member.email}</p>
                  <div className="mt-2">
                    <div className="w-full bg-slate-600/50 rounded-full h-2">
                      <div
                        className={`h-2 rounded-full ${
                          member.creditScore >= 80 ? 'bg-green-500' :
                          member.creditScore >= 60 ? 'bg-yellow-500' : 'bg-red-500'
                        }`}
                        style={{ width: `${member.creditScore}%` }}
                      ></div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {errors.selectedMembers && <p className="text-sm text-red-400">{errors.selectedMembers}</p>}
          </div>
        );

      case 4:
        return (
          <div className="space-y-6">
            <h3 className="text-lg font-semibold text-slate-50">Review Group Details</h3>
            
            <div className="bg-slate-700/30 rounded-xl p-6 border border-yellow-400/20">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-slate-400">Group Name</span>
                    <span className="text-slate-50 font-medium">{formData.groupName}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Branch</span>
                    <span className="text-slate-50">{formData.branchId}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Agent</span>
                    <span className="text-slate-50">{formData.agentId}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Start Date</span>
                    <span className="text-slate-50">{new Date(formData.startDate).toLocaleDateString()}</span>
                  </div>
                </div>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-slate-400">Total Amount</span>
                    <span className="text-green-400 font-medium">₹{formData.totalAmount.toLocaleString('en-IN')}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Monthly Installment</span>
                    <span className="text-blue-400 font-medium">₹{formData.installmentAmount.toLocaleString('en-IN')}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Duration</span>
                    <span className="text-slate-50">{formData.duration} months</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Members</span>
                    <span className="text-purple-400 font-medium">{formData.selectedMembers.length}</span>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-50 mb-2">Additional Notes</label>
              <textarea
                rows={4}
                value={formData.notes}
                onChange={(e) => handleInputChange('notes', e.target.value)}
                className="w-full px-3 py-2 bg-slate-700/50 border border-yellow-400/30 rounded-lg text-slate-50 placeholder-slate-400 focus:ring-2 focus:ring-blue-500 backdrop-blur-sm"
                placeholder="Any additional notes about this group"
              />
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