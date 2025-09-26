import { Lead } from '../types/crm';

const STORAGE_KEY = 'crm_leads';

export const leadsStorage = {
  // Get all leads
  getLeads: (): Lead[] => {
    const data = localStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : [];
  },

  // Save leads array
  saveLeads: (leads: Lead[]) => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(leads));
  },

  // Add new lead
  addLead: (lead: Lead) => {
    const leads = leadsStorage.getLeads();
    leads.push(lead);
    leadsStorage.saveLeads(leads);
    return lead;
  },

  // Update existing lead
  updateLead: (updatedLead: Lead) => {
    const leads = leadsStorage.getLeads();
    const index = leads.findIndex(l => l.id === updatedLead.id);
    if (index !== -1) {
      leads[index] = updatedLead;
      leadsStorage.saveLeads(leads);
      return updatedLead;
    }
    throw new Error('Lead not found');
  },

  // Delete lead
  deleteLead: (leadId: string) => {
    const leads = leadsStorage.getLeads().filter(l => l.id !== leadId);
    leadsStorage.saveLeads(leads);
  },

  // Get lead by ID
  getLeadById: (leadId: string): Lead | null => {
    const leads = leadsStorage.getLeads();
    return leads.find(l => l.id === leadId) || null;
  },

  // Search leads
  searchLeads: (searchTerm: string): Lead[] => {
    const leads = leadsStorage.getLeads();
    const term = searchTerm.toLowerCase();
    return leads.filter(lead => 
      lead.name.toLowerCase().includes(term) ||
      lead.email.toLowerCase().includes(term) ||
      lead.company.toLowerCase().includes(term) ||
      lead.phone.includes(term)
    );
  },

  // Filter leads by status
  filterByStatus: (status: string): Lead[] => {
    const leads = leadsStorage.getLeads();
    return status === 'all' ? leads : leads.filter(l => l.status === status);
  },

  // Get leads by assigned user
  getLeadsByAssignee: (assignee: string): Lead[] => {
    const leads = leadsStorage.getLeads();
    return leads.filter(l => l.assignedTo === assignee);
  },

  // Update lead status
  updateLeadStatus: (leadId: string, newStatus: Lead['status']) => {
    const leads = leadsStorage.getLeads();
    const index = leads.findIndex(l => l.id === leadId);
    if (index !== -1) {
      leads[index].status = newStatus;
      leads[index].updatedAt = new Date().toISOString().split('T')[0];
      leadsStorage.saveLeads(leads);
      return leads[index];
    }
    throw new Error('Lead not found');
  },

  // Add note to lead
  addNote: (leadId: string, note: string) => {
    const leads = leadsStorage.getLeads();
    const index = leads.findIndex(l => l.id === leadId);
    if (index !== -1) {
      leads[index].notes.push(note);
      leads[index].updatedAt = new Date().toISOString().split('T')[0];
      leadsStorage.saveLeads(leads);
      return leads[index];
    }
    throw new Error('Lead not found');
  },

  // Add tag to lead
  addTag: (leadId: string, tag: string) => {
    const leads = leadsStorage.getLeads();
    const index = leads.findIndex(l => l.id === leadId);
    if (index !== -1 && !leads[index].tags.includes(tag)) {
      leads[index].tags.push(tag);
      leads[index].updatedAt = new Date().toISOString().split('T')[0];
      leadsStorage.saveLeads(leads);
      return leads[index];
    }
    throw new Error('Lead not found or tag already exists');
  },

  // Get statistics
  getStats: () => {
    const leads = leadsStorage.getLeads();
    return {
      total: leads.length,
      new: leads.filter(l => l.status === 'new').length,
      contacted: leads.filter(l => l.status === 'contacted').length,
      qualified: leads.filter(l => l.status === 'qualified').length,
      proposal: leads.filter(l => l.status === 'proposal').length,
      negotiation: leads.filter(l => l.status === 'negotiation').length,
      won: leads.filter(l => l.status === 'won').length,
      lost: leads.filter(l => l.status === 'lost').length,
      totalValue: leads.reduce((sum, l) => sum + l.value, 0),
      avgValue: leads.length > 0 ? leads.reduce((sum, l) => sum + l.value, 0) / leads.length : 0
    };
  }
};

// Initialize with sample data if empty
export const initializeLeadsData = () => {
  if (leadsStorage.getLeads().length === 0) {
    const sampleLeads: Lead[] = [
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
        notes: ['Referred by existing member'],
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
      }
    ];

    leadsStorage.saveLeads(sampleLeads);
  }
};