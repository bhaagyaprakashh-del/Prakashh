import React, { useState } from 'react';
import { ArrowLeft, Save, User, Building, DollarSign, Tag, Calendar, Phone, Mail, Globe } from 'lucide-react';
import { Lead } from '../../types/crm';
import { ActionButton } from '../UI/ActionButton';
import { useActions } from '../../hooks/useActions';
import toast from 'react-hot-toast';

interface NewLeadProps {
  onBack: () => void;
  onSave: (lead: Partial<Lead>) => void;
}

export const NewLead: React.FC<NewLeadProps> = ({ onBack, onSave }) => {
  const [formData, setFormData] = useState<Partial<Lead>>({
    name: '',
    email: '',
    phone: '',
    company: '',
    source: 'website',
    status: 'new',
    priority: 'medium',
    value: 0,
    assignedTo: '',
    notes: [],
    tags: [],
    nextFollowUp: ''
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [newTag, setNewTag] = useState('');
  const [newNote, setNewNote] = useState('');
  const { isLoading } = useActions();

  const sources = [
    { value: 'website', label: 'Website' },
    { value: 'referral', label: 'Referral' },
    { value: 'cold-call', label: 'Cold Call' },
    { value: 'social-media', label: 'Social Media' },
    { value: 'advertisement', label: 'Advertisement' }
  ];

  const priorities = [
    { value: 'low', label: 'Low', color: 'text-green-600' },
    { value: 'medium', label: 'Medium', color: 'text-yellow-600' },
    { value: 'high', label: 'High', color: 'text-orange-600' },
    { value: 'critical', label: 'Critical', color: 'text-red-600' }
  ];

  const salesTeam = [
    'Priya Sharma',
    'Karthik Nair',
    'Vikram Singh',
    'Rajesh Kumar'
  ];

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.name?.trim()) {
      newErrors.name = 'Lead name is required';
    }

    if (!formData.email?.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email';
    }

    if (!formData.phone?.trim()) {
      newErrors.phone = 'Phone number is required';
    }

    if (!formData.value || formData.value <= 0) {
      newErrors.value = 'Lead value must be greater than 0';
    }

    if (!formData.assignedTo?.trim()) {
      newErrors.assignedTo = 'Please assign the lead to a team member';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      const leadData = {
        ...formData,
        id: Date.now().toString(),
        createdAt: new Date().toISOString().split('T')[0],
        updatedAt: new Date().toISOString().split('T')[0]
      };
      onSave(leadData);
      toast.success('Lead created successfully');
    }
  };

  const handleChange = (field: keyof Lead, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const addTag = () => {
    if (newTag.trim() && !formData.tags?.includes(newTag.trim())) {
      setFormData(prev => ({
        ...prev,
        tags: [...(prev.tags || []), newTag.trim()]
      }));
      setNewTag('');
    }
  };

  const removeTag = (tagToRemove: string) => {
    setFormData(prev => ({
      ...prev,
      tags: prev.tags?.filter(tag => tag !== tagToRemove) || []
    }));
  };

  const addNote = () => {
    if (newNote.trim()) {
      setFormData(prev => ({
        ...prev,
        notes: [...(prev.notes || []), newNote.trim()]
      }));
      setNewNote('');
    }
  };

  const removeNote = (index: number) => {
    setFormData(prev => ({
      ...prev,
      notes: prev.notes?.filter((_, i) => i !== index) || []
    }));
  };

  return (
    <div className="h-full flex flex-col bg-slate-900 overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-yellow-400/30 flex-shrink-0">
        <div className="flex items-center space-x-4">
          <ActionButton
            action="navigate-back"
            onClick={onBack}
            variant="secondary"
            size="sm"
            className="p-2"
          >
            <ArrowLeft className="h-5 w-5" />
          </ActionButton>
          <div>
            <h1 className="text-2xl font-bold text-slate-50">Add New Lead</h1>
            <p className="mt-1 text-sm text-slate-400">
              Capture new lead information and assign to sales team
            </p>
          </div>
        </div>
      </div>

      {/* Form Content */}
      <div className="flex-1 overflow-y-auto p-6 scrollbar-none">
        <div className="max-w-4xl mx-auto">
          <form onSubmit={handleSubmit} className="bg-slate-800/40 backdrop-blur-xl rounded-2xl p-8 border border-yellow-400/30 space-y-8">
            
            {/* Basic Information */}
            <div>
              <h3 className="text-lg font-semibold text-slate-50 mb-4 flex items-center">
                <User className="h-5 w-5 mr-2" />
                Basic Information
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-slate-50 mb-2">Lead Name *</label>
                  <input
                    type="text"
                    value={formData.name || ''}
                    onChange={(e) => handleChange('name', e.target.value)}
                    className={`w-full px-3 py-2 bg-slate-700/50 border rounded-lg text-slate-50 placeholder-slate-400 focus:ring-2 focus:ring-blue-500 backdrop-blur-sm ${
                      errors.name ? 'border-red-500' : 'border-yellow-400/30'
                    }`}
                    placeholder="Enter lead name"
                  />
                  {errors.name && <p className="mt-1 text-sm text-red-400">{errors.name}</p>}
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-50 mb-2">Company</label>
                  <input
                    type="text"
                    value={formData.company || ''}
                    onChange={(e) => handleChange('company', e.target.value)}
                    className="w-full px-3 py-2 bg-slate-700/50 border border-yellow-400/30 rounded-lg text-slate-50 placeholder-slate-400 focus:ring-2 focus:ring-blue-500 backdrop-blur-sm"
                    placeholder="Company name (optional)"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-50 mb-2">Email *</label>
                  <input
                    type="email"
                    value={formData.email || ''}
                    onChange={(e) => handleChange('email', e.target.value)}
                    className={`w-full px-3 py-2 bg-slate-700/50 border rounded-lg text-slate-50 placeholder-slate-400 focus:ring-2 focus:ring-blue-500 backdrop-blur-sm ${
                      errors.email ? 'border-red-500' : 'border-yellow-400/30'
                    }`}
                    placeholder="lead@example.com"
                  />
                  {errors.email && <p className="mt-1 text-sm text-red-400">{errors.email}</p>}
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-50 mb-2">Phone *</label>
                  <input
                    type="tel"
                    value={formData.phone || ''}
                    onChange={(e) => handleChange('phone', e.target.value)}
                    className={`w-full px-3 py-2 bg-slate-700/50 border rounded-lg text-slate-50 placeholder-slate-400 focus:ring-2 focus:ring-blue-500 backdrop-blur-sm ${
                      errors.phone ? 'border-red-500' : 'border-yellow-400/30'
                    }`}
                    placeholder="+91 98765 43210"
                  />
                  {errors.phone && <p className="mt-1 text-sm text-red-400">{errors.phone}</p>}
                </div>
              </div>
            </div>

            {/* Lead Details */}
            <div>
              <h3 className="text-lg font-semibold text-slate-50 mb-4 flex items-center">
                <Building className="h-5 w-5 mr-2" />
                Lead Details
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-slate-50 mb-2">Lead Source</label>
                  <select
                    value={formData.source || 'website'}
                    onChange={(e) => handleChange('source', e.target.value)}
                    className="w-full px-3 py-2 bg-slate-700/50 border border-yellow-400/30 rounded-lg text-slate-50 focus:ring-2 focus:ring-blue-500 backdrop-blur-sm"
                  >
                    {sources.map(source => (
                      <option key={source.value} value={source.value}>{source.label}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-50 mb-2">Priority</label>
                  <select
                    value={formData.priority || 'medium'}
                    onChange={(e) => handleChange('priority', e.target.value)}
                    className="w-full px-3 py-2 bg-slate-700/50 border border-yellow-400/30 rounded-lg text-slate-50 focus:ring-2 focus:ring-blue-500 backdrop-blur-sm"
                  >
                    {priorities.map(priority => (
                      <option key={priority.value} value={priority.value}>{priority.label}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-50 mb-2">Lead Value (₹) *</label>
                  <input
                    type="number"
                    value={formData.value || ''}
                    onChange={(e) => handleChange('value', parseFloat(e.target.value) || 0)}
                    className={`w-full px-3 py-2 bg-slate-700/50 border rounded-lg text-slate-50 placeholder-slate-400 focus:ring-2 focus:ring-blue-500 backdrop-blur-sm ${
                      errors.value ? 'border-red-500' : 'border-yellow-400/30'
                    }`}
                    placeholder="100000"
                  />
                  {errors.value && <p className="mt-1 text-sm text-red-400">{errors.value}</p>}
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-50 mb-2">Assign To *</label>
                  <select
                    value={formData.assignedTo || ''}
                    onChange={(e) => handleChange('assignedTo', e.target.value)}
                    className={`w-full px-3 py-2 bg-slate-700/50 border rounded-lg text-slate-50 focus:ring-2 focus:ring-blue-500 backdrop-blur-sm ${
                      errors.assignedTo ? 'border-red-500' : 'border-yellow-400/30'
                    }`}
                  >
                    <option value="">Select team member</option>
                    {salesTeam.map(member => (
                      <option key={member} value={member}>{member}</option>
                    ))}
                  </select>
                  {errors.assignedTo && <p className="mt-1 text-sm text-red-400">{errors.assignedTo}</p>}
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-50 mb-2">Next Follow-up</label>
                  <input
                    type="date"
                    value={formData.nextFollowUp || ''}
                    onChange={(e) => handleChange('nextFollowUp', e.target.value)}
                    className="w-full px-3 py-2 bg-slate-700/50 border border-yellow-400/30 rounded-lg text-slate-50 focus:ring-2 focus:ring-blue-500 backdrop-blur-sm"
                  />
                </div>
              </div>
            </div>

            {/* Tags */}
            <div>
              <h3 className="text-lg font-semibold text-slate-50 mb-4 flex items-center">
                <Tag className="h-5 w-5 mr-2" />
                Tags & Labels
              </h3>
              <div className="space-y-4">
                <div className="flex space-x-2">
                  <input
                    type="text"
                    value={newTag}
                    onChange={(e) => setNewTag(e.target.value)}
                    className="flex-1 px-3 py-2 bg-slate-700/50 border border-yellow-400/30 rounded-lg text-slate-50 placeholder-slate-400 focus:ring-2 focus:ring-blue-500 backdrop-blur-sm"
                    placeholder="Add a tag"
                    onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addTag())}
                  />
                  <button
                    type="button"
                    onClick={addTag}
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    Add Tag
                  </button>
                </div>
                <div className="flex flex-wrap gap-2">
                  {formData.tags?.map((tag, index) => (
                    <span key={index} className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-blue-100 text-blue-800 border border-blue-200">
                      #{tag}
                      <button
                        type="button"
                        onClick={() => removeTag(tag)}
                        className="ml-2 text-blue-600 hover:text-blue-800"
                      >
                        ×
                      </button>
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Notes */}
            <div>
              <h3 className="text-lg font-semibold text-slate-50 mb-4 flex items-center">
                <Calendar className="h-5 w-5 mr-2" />
                Notes & Comments
              </h3>
              <div className="space-y-4">
                <div className="flex space-x-2">
                  <input
                    type="text"
                    value={newNote}
                    onChange={(e) => setNewNote(e.target.value)}
                    className="flex-1 px-3 py-2 bg-slate-700/50 border border-yellow-400/30 rounded-lg text-slate-50 placeholder-slate-400 focus:ring-2 focus:ring-blue-500 backdrop-blur-sm"
                    placeholder="Add a note"
                    onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addNote())}
                  />
                  <button
                    type="button"
                    onClick={addNote}
                    className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                  >
                    Add Note
                  </button>
                </div>
                <div className="space-y-2">
                  {formData.notes?.map((note, index) => (
                    <div key={index} className="flex items-center justify-between p-3 bg-slate-700/30 rounded-lg border border-yellow-400/20">
                      <span className="text-sm text-slate-300">{note}</span>
                      <button
                        type="button"
                        onClick={() => removeNote(index)}
                        className="text-red-400 hover:text-red-300"
                      >
                        ×
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Form Actions */}
            <div className="flex justify-end space-x-3 pt-6 border-t border-yellow-400/20">
              <ActionButton
                action="cancel"
                onClick={onBack}
                variant="secondary"
              >
                Cancel
              </ActionButton>
              <ActionButton
                action="submit-form"
                type="submit"
                variant="primary"
                isLoading={isLoading['submit-form']}
              >
                <Save className="h-4 w-4 mr-2" />
                Save Lead
              </ActionButton>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};