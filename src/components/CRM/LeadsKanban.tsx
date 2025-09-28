import React, { useState } from 'react';
import { Plus, MoreVertical, Phone, Mail, Calendar, DollarSign, Users, Building, Tag, Eye, Edit } from 'lucide-react';
import { Lead } from '../../types/crm';
import { formatCurrency } from '../../utils/calculations';

const getSampleLeads = (): Lead[] => {
  // Get leads from localStorage if available, otherwise use sample data
  const storedLeads = localStorage.getItem('crm_leads');
  if (storedLeads) {
    try {
      return JSON.parse(storedLeads);
    } catch (error) {
      console.error('Error parsing stored leads:', error);
    }
  }
  
  // Return sample data if no stored leads
  return [
  {
    id: '1',
    name: 'Rajesh Gupta',
    email: 'rajesh.gupta@techcorp.com',
    phone: '+91 98765 43210',
    company: 'TechCorp Solutions',
    source: 'website',
    status: 'new',
    priority: 'high',
    value: 500000,
    assignedTo: 'Priya Sharma',
    createdAt: '2024-03-15',
    updatedAt: '2024-03-15',
    notes: ['Initial inquiry about premium chit schemes'],
    tags: ['enterprise', 'hot-lead'],
    nextFollowUp: '2024-03-16'
  },
  {
    id: '2',
    name: 'Sunita Reddy',
    email: 'sunita.reddy@gmail.com',
    phone: '+91 98765 43211',
    company: 'Individual',
    source: 'referral',
    status: 'contacted',
    priority: 'medium',
    value: 100000,
    assignedTo: 'Karthik Nair',
    createdAt: '2024-03-14',
    updatedAt: '2024-03-15',
    notes: ['Initial call completed', 'Interested in monthly schemes'],
    tags: ['referral', 'individual'],
    nextFollowUp: '2024-03-17'
  },
  {
    id: '3',
    name: 'Amit Sharma',
    email: 'amit@startupinc.com',
    phone: '+91 98765 43212',
    company: 'StartupInc',
    source: 'cold-call',
    status: 'qualified',
    priority: 'high',
    value: 250000,
    assignedTo: 'Priya Sharma',
    createdAt: '2024-03-13',
    updatedAt: '2024-03-15',
    notes: ['Qualified during discovery call', 'Budget confirmed'],
    tags: ['startup', 'qualified'],
    nextFollowUp: '2024-03-18'
  },
  {
    id: '4',
    name: 'Deepika Rao',
    email: 'deepika.rao@manufacturing.com',
    phone: '+91 98765 43213',
    company: 'Manufacturing Ltd',
    source: 'social-media',
    status: 'proposal',
    priority: 'high',
    value: 750000,
    assignedTo: 'Vikram Singh',
    createdAt: '2024-03-12',
    updatedAt: '2024-03-15',
    notes: ['Proposal sent', 'Waiting for approval'],
    tags: ['manufacturing', 'proposal-sent'],
    nextFollowUp: '2024-03-20'
  },
  {
    id: '5',
    name: 'Kiran Kumar',
    email: 'kiran.kumar@retailchain.com',
    phone: '+91 98765 43214',
    company: 'Retail Chain Pvt Ltd',
    source: 'advertisement',
    status: 'negotiation',
    priority: 'critical',
    value: 1000000,
    assignedTo: 'Rajesh Kumar',
    createdAt: '2024-03-10',
    updatedAt: '2024-03-15',
    notes: ['In final negotiation', 'Ready to close'],
    tags: ['retail', 'high-value'],
    nextFollowUp: '2024-03-16'
  },
  {
    id: '6',
    name: 'Meera Nair',
    email: 'meera@consultancy.com',
    phone: '+91 98765 43215',
    company: 'Business Consultancy',
    source: 'referral',
    status: 'won',
    priority: 'high',
    value: 300000,
    assignedTo: 'Priya Sharma',
    createdAt: '2024-03-08',
    updatedAt: '2024-03-14',
    notes: ['Deal closed successfully'],
    tags: ['consultancy', 'closed-won']
  }
  ];
};

const statusColumns = [
  { id: 'new', title: 'New Leads', color: 'bg-blue-100 border-blue-300', count: 0 },
  { id: 'contacted', title: 'Contacted', color: 'bg-yellow-100 border-yellow-300', count: 0 },
  { id: 'qualified', title: 'Qualified', color: 'bg-purple-100 border-purple-300', count: 0 },
  { id: 'proposal', title: 'Proposal', color: 'bg-orange-100 border-orange-300', count: 0 },
  { id: 'negotiation', title: 'Negotiation', color: 'bg-pink-100 border-pink-300', count: 0 },
  { id: 'won', title: 'Won', color: 'bg-green-100 border-green-300', count: 0 },
  { id: 'lost', title: 'Lost', color: 'bg-red-100 border-red-300', count: 0 }
];

const LeadCard: React.FC<{ lead: Lead }> = ({ lead }) => {
  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'critical': return 'bg-red-100 text-red-800';
      case 'high': return 'bg-orange-100 text-orange-800';
      case 'medium': return 'bg-yellow-100 text-yellow-800';
      case 'low': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-200 hover:shadow-md transition-all cursor-pointer group">
      <div className="flex items-start justify-between mb-3">
        <div>
          <h4 className="font-semibold text-gray-900 mb-1">{lead.name}</h4>
          {lead.company && <p className="text-sm text-gray-600 flex items-center">
            <Building className="h-3 w-3 mr-1" />
            {lead.company}
          </p>}
        </div>
        <div className="flex items-center space-x-1">
          <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getPriorityColor(lead.priority)}`}>
            {lead.priority}
          </span>
          <button className="p-1 hover:bg-gray-100 rounded opacity-0 group-hover:opacity-100 transition-opacity">
            <MoreVertical className="h-4 w-4 text-gray-400" />
          </button>
        </div>
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
            <span>Follow-up: {new Date(lead.nextFollowUp).toLocaleDateString()}</span>
          </div>
        )}
      </div>

      <div className="flex items-center justify-between mb-3">
        <span className="text-lg font-semibold text-gray-900">
          {formatCurrency(lead.value)}
        </span>
        <span className="text-sm text-gray-500">
          {lead.assignedTo}
        </span>
      </div>

      {lead.tags.length > 0 && (
        <div className="flex flex-wrap gap-1 mb-3">
          {lead.tags.slice(0, 2).map((tag, index) => (
            <span key={index} className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-blue-100 text-blue-800">
              #{tag}
            </span>
          ))}
          {lead.tags.length > 2 && (
            <span className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-gray-100 text-gray-800">
              +{lead.tags.length - 2}
            </span>
          )}
        </div>
      )}

      <div className="flex justify-between items-center pt-3 border-t border-gray-100">
        <div className="flex space-x-1">
          <button className="p-1 text-blue-600 hover:bg-blue-50 rounded transition-colors">
            <Eye className="h-4 w-4" />
          </button>
          <button className="p-1 text-green-600 hover:bg-green-50 rounded transition-colors">
            <Phone className="h-4 w-4" />
          </button>
          <button className="p-1 text-purple-600 hover:bg-purple-50 rounded transition-colors">
            <Mail className="h-4 w-4" />
          </button>
        </div>
        <span className="text-xs text-gray-500">
          {new Date(lead.createdAt).toLocaleDateString()}
        </span>
      </div>
    </div>
  );
};

export const LeadsKanban: React.FC = () => {
  const [leads, setLeads] = useState<Lead[]>(() => getSampleLeads());

  // Refresh leads data when localStorage changes
  React.useEffect(() => {
    const handleStorageChange = () => {
      setLeads(getSampleLeads());
    };
    
    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  const getLeadsByStatus = (status: string) => {
    return leads.filter(lead => lead.status === status);
  };

  const totalValue = leads.reduce((sum, lead) => sum + lead.value, 0);
  const wonValue = leads.filter(l => l.status === 'won').reduce((sum, lead) => sum + lead.value, 0);
  const pipelineValue = leads.filter(l => !['won', 'lost'].includes(l.status)).reduce((sum, lead) => sum + lead.value, 0);

  return (
    <div className="h-full flex flex-col bg-slate-900 overflow-hidden">
      {/* Header */}
      <div className="flex justify-between items-center p-4 border-b border-yellow-400/30 flex-shrink-0">
        <div>
          <h1 className="text-2xl font-bold text-slate-50">Leads Pipeline (Kanban View)</h1>
          <p className="mt-1 text-sm text-slate-400">
            Manage your sales pipeline with drag-and-drop interface
          </p>
        </div>
        <div className="flex space-x-3">
          <div className="flex items-center space-x-4 text-sm">
            <div className="text-slate-300">
              Total: <span className="font-semibold text-green-400">{formatCurrency(totalValue)}</span>
            </div>
            <div className="text-slate-300">
              Pipeline: <span className="font-semibold text-blue-400">{formatCurrency(pipelineValue)}</span>
            </div>
            <div className="text-slate-300">
              Won: <span className="font-semibold text-emerald-400">{formatCurrency(wonValue)}</span>
            </div>
          </div>
          <button className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-lg shadow-sm text-white bg-blue-600 hover:bg-blue-700 transition-all">
            <Plus className="h-4 w-4 mr-2" />
            <a href="/leads-new" className="text-white no-underline">Add Lead</a>
          </button>
        </div>
      </div>

      {/* Kanban Board */}
      <div className="flex-1 overflow-x-auto p-4">
        <div className="flex space-x-6 h-full min-w-max">
          {statusColumns.map((column) => {
            const columnLeads = getLeadsByStatus(column.id);
            const columnValue = columnLeads.reduce((sum, lead) => sum + lead.value, 0);
            
            return (
              <div key={column.id} className="flex-shrink-0 w-80 h-full">
                <div className={`rounded-xl border-2 border-dashed p-4 h-full flex flex-col ${column.color}`}>
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <h3 className="font-semibold text-gray-900">{column.title}</h3>
                      <p className="text-sm text-gray-600">{formatCurrency(columnValue)}</p>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className="bg-white px-2 py-1 rounded-full text-sm font-medium text-gray-600">
                        {columnLeads.length}
                      </span>
                      <button className="p-1 hover:bg-white hover:bg-opacity-50 rounded">
                        <Plus className="h-4 w-4 text-gray-600" />
                      </button>
                    </div>
                  </div>

                  <div className="flex-1 space-y-3 overflow-y-auto scrollbar-thin">
                    {columnLeads.map((lead) => (
                      <LeadCard key={lead.id} lead={lead} />
                    ))}
                    {columnLeads.length === 0 && (
                      <div className="text-center py-8 text-gray-500">
                        <Users className="h-8 w-8 mx-auto mb-2 opacity-50" />
                        <p className="text-sm">No leads in this stage</p>
                        <button className="mt-2 text-blue-600 hover:text-blue-800 text-sm font-medium">
                          Add Lead
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};