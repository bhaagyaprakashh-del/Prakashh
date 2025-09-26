import React, { useState } from 'react';
import { ArrowLeft, Save, Upload, X, Plus, User, Briefcase, CreditCard, FileText, Phone, MapPin } from 'lucide-react';
import { Employee } from '../../types/hrms';

interface NewEmployeeProps {
  onBack: () => void;
  onSave: (employee: Partial<Employee>) => void;
}

export const NewEmployee: React.FC<NewEmployeeProps> = ({ onBack, onSave }) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<Partial<Employee>>({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    dateOfBirth: '',
    gender: 'male',
    maritalStatus: 'single',
    address: '',
    city: '',
    state: '',
    country: 'India',
    postalCode: '',
    designation: '',
    department: '',
    branch: '',
    joiningDate: new Date().toISOString().split('T')[0],
    probationPeriod: 6,
    employmentType: 'permanent',
    workLocation: 'office',
    basicSalary: 0,
    allowances: { hra: 0, transport: 0, medical: 0, special: 0 },
    deductions: { pf: 0, esi: 0, tax: 0, other: 0 },
    bankAccount: {
      accountNumber: '',
      bankName: '',
      ifscCode: '',
      accountHolderName: ''
    },
    skills: [],
    qualifications: [],
    experience: [],
    status: 'active',
    emergencyContact: {
      name: '',
      relationship: '',
      phone: ''
    },
    teamMembers: [],
    documents: {},
    notes: ''
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [newSkill, setNewSkill] = useState('');

  const steps = [
    { id: 1, name: 'Personal Info', icon: User },
    { id: 2, name: 'Professional', icon: Briefcase },
    { id: 3, name: 'Compensation', icon: CreditCard },
    { id: 4, name: 'Documents', icon: FileText },
    { id: 5, name: 'Emergency', icon: Phone }
  ];

  const departments = [
    'Executive', 'Operations', 'Sales & Marketing', 'Finance & Accounts', 
    'Human Resources', 'Information Technology', 'Customer Service'
  ];

  const branches = [
    'Bangalore Main', 'Chennai Branch', 'Hyderabad Branch', 'Mumbai Branch'
  ];

  const handleInputChange = (field: string, value: any) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
    
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const handleNestedChange = (parent: string, field: string, value: any) => {
    setFormData(prev => ({
      ...prev,
      [parent]: {
        ...prev[parent as keyof Employee],
        [field]: value
      }
    }));
  };

  const addSkill = () => {
    if (newSkill.trim() && !formData.skills?.includes(newSkill.trim())) {
      setFormData(prev => ({
        ...prev,
        skills: [...(prev.skills || []), newSkill.trim()]
      }));
      setNewSkill('');
    }
  };

  const removeSkill = (skillToRemove: string) => {
    setFormData(prev => ({
      ...prev,
      skills: prev.skills?.filter(skill => skill !== skillToRemove) || []
    }));
  };

  const validateStep = (step: number) => {
    const newErrors: Record<string, string> = {};

    switch (step) {
      case 1:
        if (!formData.firstName?.trim()) newErrors.firstName = 'First name is required';
        if (!formData.lastName?.trim()) newErrors.lastName = 'Last name is required';
        if (!formData.email?.trim()) newErrors.email = 'Email is required';
        if (!formData.phone?.trim()) newErrors.phone = 'Phone is required';
        if (!formData.dateOfBirth) newErrors.dateOfBirth = 'Date of birth is required';
        break;
      case 2:
        if (!formData.designation?.trim()) newErrors.designation = 'Designation is required';
        if (!formData.department?.trim()) newErrors.department = 'Department is required';
        if (!formData.branch?.trim()) newErrors.branch = 'Branch is required';
        if (!formData.joiningDate) newErrors.joiningDate = 'Joining date is required';
        break;
      case 3:
        if (!formData.basicSalary || formData.basicSalary <= 0) newErrors.basicSalary = 'Basic salary is required';
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
      const employeeData = {
        ...formData,
        employeeId: `EMP${String(Date.now()).slice(-3)}`,
        createdAt: new Date().toISOString(),
        createdBy: 'current-user@ramnirmalchits.com',
        updatedAt: new Date().toISOString(),
        updatedBy: 'current-user@ramnirmalchits.com'
      };
      onSave(employeeData);
    }
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-slate-50 mb-2">First Name *</label>
                <input
                  type="text"
                  value={formData.firstName || ''}
                  onChange={(e) => handleInputChange('firstName', e.target.value)}
                  className={`w-full px-3 py-2 bg-slate-700/50 border rounded-lg text-slate-50 placeholder-slate-400 focus:ring-2 focus:ring-blue-500 backdrop-blur-sm ${
                    errors.firstName ? 'border-red-500' : 'border-yellow-400/30'
                  }`}
                  placeholder="Enter first name"
                />
                {errors.firstName && <p className="mt-1 text-sm text-red-400">{errors.firstName}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-50 mb-2">Last Name *</label>
                <input
                  type="text"
                  value={formData.lastName || ''}
                  onChange={(e) => handleInputChange('lastName', e.target.value)}
                  className={`w-full px-3 py-2 bg-slate-700/50 border rounded-lg text-slate-50 placeholder-slate-400 focus:ring-2 focus:ring-blue-500 backdrop-blur-sm ${
                    errors.lastName ? 'border-red-500' : 'border-yellow-400/30'
                  }`}
                  placeholder="Enter last name"
                />
                {errors.lastName && <p className="mt-1 text-sm text-red-400">{errors.lastName}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-50 mb-2">Email *</label>
                <input
                  type="email"
                  value={formData.email || ''}
                  onChange={(e) => handleInputChange('email', e.target.value)}
                  className={`w-full px-3 py-2 bg-slate-700/50 border rounded-lg text-slate-50 placeholder-slate-400 focus:ring-2 focus:ring-blue-500 backdrop-blur-sm ${
                    errors.email ? 'border-red-500' : 'border-yellow-400/30'
                  }`}
                  placeholder="employee@ramnirmalchits.com"
                />
                {errors.email && <p className="mt-1 text-sm text-red-400">{errors.email}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-50 mb-2">Phone *</label>
                <input
                  type="tel"
                  value={formData.phone || ''}
                  onChange={(e) => handleInputChange('phone', e.target.value)}
                  className={`w-full px-3 py-2 bg-slate-700/50 border rounded-lg text-slate-50 placeholder-slate-400 focus:ring-2 focus:ring-blue-500 backdrop-blur-sm ${
                    errors.phone ? 'border-red-500' : 'border-yellow-400/30'
                  }`}
                  placeholder="+91 98765 43210"
                />
                {errors.phone && <p className="mt-1 text-sm text-red-400">{errors.phone}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-50 mb-2">Date of Birth *</label>
                <input
                  type="date"
                  value={formData.dateOfBirth || ''}
                  onChange={(e) => handleInputChange('dateOfBirth', e.target.value)}
                  className={`w-full px-3 py-2 bg-slate-700/50 border rounded-lg text-slate-50 focus:ring-2 focus:ring-blue-500 backdrop-blur-sm ${
                    errors.dateOfBirth ? 'border-red-500' : 'border-yellow-400/30'
                  }`}
                />
                {errors.dateOfBirth && <p className="mt-1 text-sm text-red-400">{errors.dateOfBirth}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-50 mb-2">Gender</label>
                <select
                  value={formData.gender || 'male'}
                  onChange={(e) => handleInputChange('gender', e.target.value)}
                  className="w-full px-3 py-2 bg-slate-700/50 border border-yellow-400/30 rounded-lg text-slate-50 focus:ring-2 focus:ring-blue-500 backdrop-blur-sm"
                >
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="other">Other</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-50 mb-2">Address</label>
              <textarea
                rows={3}
                value={formData.address || ''}
                onChange={(e) => handleInputChange('address', e.target.value)}
                className="w-full px-3 py-2 bg-slate-700/50 border border-yellow-400/30 rounded-lg text-slate-50 placeholder-slate-400 focus:ring-2 focus:ring-blue-500 backdrop-blur-sm"
                placeholder="Enter complete address"
              />
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-slate-50 mb-2">Designation *</label>
                <input
                  type="text"
                  value={formData.designation || ''}
                  onChange={(e) => handleInputChange('designation', e.target.value)}
                  className={`w-full px-3 py-2 bg-slate-700/50 border rounded-lg text-slate-50 placeholder-slate-400 focus:ring-2 focus:ring-blue-500 backdrop-blur-sm ${
                    errors.designation ? 'border-red-500' : 'border-yellow-400/30'
                  }`}
                  placeholder="Enter designation"
                />
                {errors.designation && <p className="mt-1 text-sm text-red-400">{errors.designation}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-50 mb-2">Department *</label>
                <select
                  value={formData.department || ''}
                  onChange={(e) => handleInputChange('department', e.target.value)}
                  className={`w-full px-3 py-2 bg-slate-700/50 border rounded-lg text-slate-50 focus:ring-2 focus:ring-blue-500 backdrop-blur-sm ${
                    errors.department ? 'border-red-500' : 'border-yellow-400/30'
                  }`}
                >
                  <option value="">Select Department</option>
                  {departments.map(dept => (
                    <option key={dept} value={dept}>{dept}</option>
                  ))}
                </select>
                {errors.department && <p className="mt-1 text-sm text-red-400">{errors.department}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-50 mb-2">Branch *</label>
                <select
                  value={formData.branch || ''}
                  onChange={(e) => handleInputChange('branch', e.target.value)}
                  className={`w-full px-3 py-2 bg-slate-700/50 border rounded-lg text-slate-50 focus:ring-2 focus:ring-blue-500 backdrop-blur-sm ${
                    errors.branch ? 'border-red-500' : 'border-yellow-400/30'
                  }`}
                >
                  <option value="">Select Branch</option>
                  {branches.map(branch => (
                    <option key={branch} value={branch}>{branch}</option>
                  ))}
                </select>
                {errors.branch && <p className="mt-1 text-sm text-red-400">{errors.branch}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-50 mb-2">Joining Date *</label>
                <input
                  type="date"
                  value={formData.joiningDate || ''}
                  onChange={(e) => handleInputChange('joiningDate', e.target.value)}
                  className={`w-full px-3 py-2 bg-slate-700/50 border rounded-lg text-slate-50 focus:ring-2 focus:ring-blue-500 backdrop-blur-sm ${
                    errors.joiningDate ? 'border-red-500' : 'border-yellow-400/30'
                  }`}
                />
                {errors.joiningDate && <p className="mt-1 text-sm text-red-400">{errors.joiningDate}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-50 mb-2">Employment Type</label>
                <select
                  value={formData.employmentType || 'permanent'}
                  onChange={(e) => handleInputChange('employmentType', e.target.value)}
                  className="w-full px-3 py-2 bg-slate-700/50 border border-yellow-400/30 rounded-lg text-slate-50 focus:ring-2 focus:ring-blue-500 backdrop-blur-sm"
                >
                  <option value="permanent">Permanent</option>
                  <option value="contract">Contract</option>
                  <option value="intern">Intern</option>
                  <option value="consultant">Consultant</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-50 mb-2">Work Location</label>
                <select
                  value={formData.workLocation || 'office'}
                  onChange={(e) => handleInputChange('workLocation', e.target.value)}
                  className="w-full px-3 py-2 bg-slate-700/50 border border-yellow-400/30 rounded-lg text-slate-50 focus:ring-2 focus:ring-blue-500 backdrop-blur-sm"
                >
                  <option value="office">Office</option>
                  <option value="remote">Remote</option>
                  <option value="hybrid">Hybrid</option>
                </select>
              </div>
            </div>

            {/* Skills Section */}
            <div>
              <label className="block text-sm font-medium text-slate-50 mb-2">Skills</label>
              <div className="flex space-x-2 mb-3">
                <input
                  type="text"
                  value={newSkill}
                  onChange={(e) => setNewSkill(e.target.value)}
                  className="flex-1 px-3 py-2 bg-slate-700/50 border border-yellow-400/30 rounded-lg text-slate-50 placeholder-slate-400 focus:ring-2 focus:ring-blue-500 backdrop-blur-sm"
                  placeholder="Add a skill"
                  onKeyPress={(e) => e.key === 'Enter' && addSkill()}
                />
                <button
                  type="button"
                  onClick={addSkill}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  <Plus className="h-4 w-4" />
                </button>
              </div>
              <div className="flex flex-wrap gap-2">
                {formData.skills?.map((skill, index) => (
                  <span key={index} className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-blue-100 text-blue-800 border border-blue-200">
                    {skill}
                    <button
                      type="button"
                      onClick={() => removeSkill(skill)}
                      className="ml-2 text-blue-600 hover:text-blue-800"
                    >
                      <X className="h-3 w-3" />
                    </button>
                  </span>
                ))}
              </div>
            </div>
          </div>
        );

      case 3:
        return (
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-slate-50 mb-2">Basic Salary (₹) *</label>
              <input
                type="number"
                value={formData.basicSalary || ''}
                onChange={(e) => handleInputChange('basicSalary', parseFloat(e.target.value) || 0)}
                className={`w-full px-3 py-2 bg-slate-700/50 border rounded-lg text-slate-50 placeholder-slate-400 focus:ring-2 focus:ring-blue-500 backdrop-blur-sm ${
                  errors.basicSalary ? 'border-red-500' : 'border-yellow-400/30'
                }`}
                placeholder="50000"
              />
              {errors.basicSalary && <p className="mt-1 text-sm text-red-400">{errors.basicSalary}</p>}
            </div>

            <div>
              <h3 className="text-lg font-semibold text-slate-50 mb-4">Allowances</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-50 mb-2">HRA (₹)</label>
                  <input
                    type="number"
                    value={formData.allowances?.hra || ''}
                    onChange={(e) => handleNestedChange('allowances', 'hra', parseFloat(e.target.value) || 0)}
                    className="w-full px-3 py-2 bg-slate-700/50 border border-yellow-400/30 rounded-lg text-slate-50 placeholder-slate-400 focus:ring-2 focus:ring-blue-500 backdrop-blur-sm"
                    placeholder="20000"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-50 mb-2">Transport (₹)</label>
                  <input
                    type="number"
                    value={formData.allowances?.transport || ''}
                    onChange={(e) => handleNestedChange('allowances', 'transport', parseFloat(e.target.value) || 0)}
                    className="w-full px-3 py-2 bg-slate-700/50 border border-yellow-400/30 rounded-lg text-slate-50 placeholder-slate-400 focus:ring-2 focus:ring-blue-500 backdrop-blur-sm"
                    placeholder="2000"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-50 mb-2">Medical (₹)</label>
                  <input
                    type="number"
                    value={formData.allowances?.medical || ''}
                    onChange={(e) => handleNestedChange('allowances', 'medical', parseFloat(e.target.value) || 0)}
                    className="w-full px-3 py-2 bg-slate-700/50 border border-yellow-400/30 rounded-lg text-slate-50 placeholder-slate-400 focus:ring-2 focus:ring-blue-500 backdrop-blur-sm"
                    placeholder="3000"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-50 mb-2">Special (₹)</label>
                  <input
                    type="number"
                    value={formData.allowances?.special || ''}
                    onChange={(e) => handleNestedChange('allowances', 'special', parseFloat(e.target.value) || 0)}
                    className="w-full px-3 py-2 bg-slate-700/50 border border-yellow-400/30 rounded-lg text-slate-50 placeholder-slate-400 focus:ring-2 focus:ring-blue-500 backdrop-blur-sm"
                    placeholder="5000"
                  />
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-slate-50 mb-4">Bank Details</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-50 mb-2">Account Number</label>
                  <input
                    type="text"
                    value={formData.bankAccount?.accountNumber || ''}
                    onChange={(e) => handleNestedChange('bankAccount', 'accountNumber', e.target.value)}
                    className="w-full px-3 py-2 bg-slate-700/50 border border-yellow-400/30 rounded-lg text-slate-50 placeholder-slate-400 focus:ring-2 focus:ring-blue-500 backdrop-blur-sm"
                    placeholder="1234567890"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-50 mb-2">Bank Name</label>
                  <input
                    type="text"
                    value={formData.bankAccount?.bankName || ''}
                    onChange={(e) => handleNestedChange('bankAccount', 'bankName', e.target.value)}
                    className="w-full px-3 py-2 bg-slate-700/50 border border-yellow-400/30 rounded-lg text-slate-50 placeholder-slate-400 focus:ring-2 focus:ring-blue-500 backdrop-blur-sm"
                    placeholder="HDFC Bank"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-50 mb-2">IFSC Code</label>
                  <input
                    type="text"
                    value={formData.bankAccount?.ifscCode || ''}
                    onChange={(e) => handleNestedChange('bankAccount', 'ifscCode', e.target.value)}
                    className="w-full px-3 py-2 bg-slate-700/50 border border-yellow-400/30 rounded-lg text-slate-50 placeholder-slate-400 focus:ring-2 focus:ring-blue-500 backdrop-blur-sm"
                    placeholder="HDFC0001234"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-50 mb-2">Account Holder Name</label>
                  <input
                    type="text"
                    value={formData.bankAccount?.accountHolderName || ''}
                    onChange={(e) => handleNestedChange('bankAccount', 'accountHolderName', e.target.value)}
                    className="w-full px-3 py-2 bg-slate-700/50 border border-yellow-400/30 rounded-lg text-slate-50 placeholder-slate-400 focus:ring-2 focus:ring-blue-500 backdrop-blur-sm"
                    placeholder="Account holder name"
                  />
                </div>
              </div>
            </div>
          </div>
        );

      case 4:
        return (
          <div className="space-y-6">
            <div className="text-center py-12 border-2 border-dashed border-yellow-400/30 rounded-xl">
              <Upload className="h-12 w-12 mx-auto text-slate-400 mb-4" />
              <h3 className="text-lg font-medium text-slate-50 mb-2">Document Upload</h3>
              <p className="text-sm text-slate-400 mb-4">Upload employee documents (Resume, ID Proof, etc.)</p>
              <button className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                <Upload className="h-4 w-4 mr-2" />
                Choose Files
              </button>
            </div>
          </div>
        );

      case 5:
        return (
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold text-slate-50 mb-4">Emergency Contact</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-50 mb-2">Contact Name</label>
                  <input
                    type="text"
                    value={formData.emergencyContact?.name || ''}
                    onChange={(e) => handleNestedChange('emergencyContact', 'name', e.target.value)}
                    className="w-full px-3 py-2 bg-slate-700/50 border border-yellow-400/30 rounded-lg text-slate-50 placeholder-slate-400 focus:ring-2 focus:ring-blue-500 backdrop-blur-sm"
                    placeholder="Emergency contact name"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-50 mb-2">Relationship</label>
                  <select
                    value={formData.emergencyContact?.relationship || ''}
                    onChange={(e) => handleNestedChange('emergencyContact', 'relationship', e.target.value)}
                    className="w-full px-3 py-2 bg-slate-700/50 border border-yellow-400/30 rounded-lg text-slate-50 focus:ring-2 focus:ring-blue-500 backdrop-blur-sm"
                  >
                    <option value="">Select Relationship</option>
                    <option value="spouse">Spouse</option>
                    <option value="parent">Parent</option>
                    <option value="sibling">Sibling</option>
                    <option value="friend">Friend</option>
                    <option value="other">Other</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-50 mb-2">Phone Number</label>
                  <input
                    type="tel"
                    value={formData.emergencyContact?.phone || ''}
                    onChange={(e) => handleNestedChange('emergencyContact', 'phone', e.target.value)}
                    className="w-full px-3 py-2 bg-slate-700/50 border border-yellow-400/30 rounded-lg text-slate-50 placeholder-slate-400 focus:ring-2 focus:ring-blue-500 backdrop-blur-sm"
                    placeholder="+91 98765 43210"
                  />
                </div>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-50 mb-2">Additional Notes</label>
              <textarea
                rows={4}
                value={formData.notes || ''}
                onChange={(e) => handleInputChange('notes', e.target.value)}
                className="w-full px-3 py-2 bg-slate-700/50 border border-yellow-400/30 rounded-lg text-slate-50 placeholder-slate-400 focus:ring-2 focus:ring-blue-500 backdrop-blur-sm"
                placeholder="Any additional notes about the employee"
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
            <h1 className="text-2xl font-bold text-slate-50">Add New Employee</h1>
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
              Save Employee
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