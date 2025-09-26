import React, { useState } from 'react';
import { Plus, MoreVertical, Phone, Mail, Calendar } from 'lucide-react';
import { Lead } from '../../types/crm';
import { formatCurrency } from '../../utils/calculations';

const sampleLeads: Lead[] = [
  {
    id: '1',
    name: 'John Doe',
    email: 'john@example.com',
    phone: '+91 98765 43210',
    company: 'Acme Corp',
    source: 'website',
    status: 'new',
    priority: 'high',
    value: 100000,
    assignedTo: 'agent1',
    createdAt: '2024-03-15',
    updatedAt: '2024-03-15',
    notes: [],
    tags: ['enterprise', 'hot'],
    nextFollowUp: '2024-03-16'
  },
  {
    id: '2',
    name: 'Jane Smith',
    email: 'jane@example.com',
    phone: '+91 98765 43211',
    company: 'TechStart Inc',
    source: 'referral',
    status: 'contacted',
    priority: 'medium',
    value: 50000,
    assignedTo: 'agent2',
    createdAt: '2024-03-14',
    updatedAt: '2024-03-15',
    notes: ['Initial call completed', 'Interested in premium package'],
    tags: ['tech'],
    nextFollowUp: '2024-03-17'
  }
];

const statusColumns = [
  { id: 'new', title: 'New Leads', color: 'bg-blue-100 border-blue-300' },
  { id: 'contacted', title: 'Contacted', color: 'bg-yellow-100 border-yellow-300' },
  { id: 'qualified', title: 'Qualified', color: 'bg-purple-100 border-purple-300' },
  { id: 'proposal', title: 'Proposal', color: 'bg-orange-100 border-orange-300' },
  { id: 'negotiation', title: 'Negotiation', color: 'bg-pink-100 border-pink-300' },
  { id: 'won', title: 'Won', color: 'bg-green-100 border-green-300' },
  { id: 'lost', title: 'Lost', color: 'bg-red-100 border-red-300' }
];

const LeadCard: React.FC<{ lead: Lead }> = ({ lead }) => {
  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'bg-red-100 text-red-800';
      case 'medium': return 'bg-yellow-100 text-yellow-800';
      case 'low': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition-shadow cursor-pointer">
      <div className="flex items-start justify-between mb-3">
        <div>
          <h4 className="font-semibold text-gray-900 mb-1">{lead.name}</h4>
          {lead.company && <p className="text-sm text-gray-600">{lead.company}</p>}
        </div>
        <button className="p-1 hover:bg-gray-100 rounded">
          <MoreVertical className="h-4 w-4 text-gray-400" />
        </button>
      </div>

      <div className="space-y-2 mb-3">
        <div className="flex items-center text-sm text-gray-600">
          <Mail className="h-3 w-3 mr-2" />
          <span className="truncate">{lead.email}</span>
        </div>
        <div className="flex items-center text-sm text-gray-600">
          <Phone className="h-3 w-3 mr-2" />
          <span>{lead.phone}</span>
        </div>
        {lead.nextFollowUp && (
          <div className="flex items-center text-sm text-gray-600">
            <Calendar className="h-3 w-3 mr-2" />
            <span>Follow-up: {lead.nextFollowUp}</span>
          </div>
        )}
      </div>

      <div className="flex items-center justify-between mb-3">
        <span className="text-lg font-semibold text-gray-900">
          {formatCurrency(lead.value)}
        </span>
        <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getPriorityColor(lead.priority)}`}>
          {lead.priority}
        </span>
      </div>

      {lead.tags.length > 0 && (
        <div className="flex flex-wrap gap-1">
          {lead.tags.map((tag, index) => (
            <span key={index} className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-blue-100 text-blue-800">
              {tag}
            </span>
          ))}
        </div>
      )}
    </div>
  );
};

export const LeadsKanban: React.FC = () => {
  const [leads] = useState<Lead[]>(sampleLeads);

  const getLeadsByStatus = (status: string) => {
    return leads.filter(lead => lead.status === status);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Leads Pipeline</h2>
          <p className="text-sm text-gray-600 mt-1">Manage your sales pipeline with drag-and-drop interface</p>
        </div>
        <button className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700">
          <Plus className="h-4 w-4 mr-2" />
          Add Lead
        </button>
      </div>

      <div className="flex space-x-6 overflow-x-auto pb-4">
        {statusColumns.map((column) => {
          const columnLeads = getLeadsByStatus(column.id);
          return (
            <div key={column.id} className="flex-shrink-0 w-80">
              <div className={`rounded-lg border-2 border-dashed p-4 ${column.color}`}>
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-semibold text-gray-900">{column.title}</h3>
                  <div className="flex items-center space-x-2">
                    <span className="bg-white px-2 py-1 rounded-full text-sm font-medium text-gray-600">
                      {columnLeads.length}
                    </span>
                    <button className="p-1 hover:bg-white hover:bg-opacity-50 rounded">
                      <Plus className="h-4 w-4 text-gray-600" />
                    </button>
                  </div>
                </div>

                <div className="space-y-3 max-h-96 overflow-y-auto">
                  {columnLeads.map((lead) => (
                    <LeadCard key={lead.id} lead={lead} />
                  ))}
                  {columnLeads.length === 0 && (
                    <div className="text-center py-8 text-gray-500">
                      <p className="text-sm">No leads in this stage</p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};