import React, { useState, useMemo } from 'react';
import {
  Plus,
  Search,
  Filter,
  Inbox,
  User,
  Clock,
  AlertTriangle,
  CheckCircle,
  MessageSquare,
  Phone,
  Mail,
  Calendar,
  Tag,
  Eye,
  Edit,
  Archive,
  Star,
  Flag,
  Users,
  Target,
  Award,
  TrendingUp,
  Zap,
  MoreVertical
} from 'lucide-react';
import { Ticket } from '../../types/tasks';
import { tasksStorage } from '../../utils/tasksStorage';
import toast from 'react-hot-toast';

export const TicketsInbox: React.FC = () => {
  const [tickets, setTickets] = useState<Ticket[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [viewMode, setViewMode] = useState<'inbox' | 'my'>('inbox');
  const [showTicketForm, setShowTicketForm] = useState(false);
  const [editingTicket, setEditingTicket] = useState<Ticket | null>(null);

  const currentUser = 'Karthik Nair';

  // Load tickets on component mount
  useEffect(() => {
    const loadedTickets = tasksStorage.getTickets();
    setTickets(loadedTickets);
  }, []);

  const filteredTickets = useMemo(() => {
    let filtered = tickets;

    if (viewMode === 'my') {
      filtered = filtered.filter(ticket => ticket.assignedTo === currentUser);
    }

    return filtered.filter(ticket => {
      const matchesSearch = ticket.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           ticket.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           ticket.ticketNumber.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesStatus = filterStatus === 'all' || ticket.status === filterStatus;
      
      return matchesSearch && matchesStatus;
    });
  }, [tickets, searchTerm, filterStatus, viewMode, currentUser]);

  const stats = useMemo(() => ({
    total: viewMode === 'my' ? tickets.filter(t => t.assignedTo === currentUser).length : tickets.length,
    open: filteredTickets.filter(t => t.status === 'open').length,
    inProgress: filteredTickets.filter(t => t.status === 'in-progress').length,
    resolved: filteredTickets.filter(t => t.status === 'resolved').length,
    closed: filteredTickets.filter(t => t.status === 'closed').length,
    escalated: filteredTickets.filter(t => t.status === 'escalated').length,
    critical: filteredTickets.filter(t => t.priority === 'critical').length,
    high: filteredTickets.filter(t => t.priority === 'high').length,
    overdue: filteredTickets.filter(t => new Date(t.slaDeadline) < new Date() && !['resolved', 'closed'].includes(t.status)).length
  }), [filteredTickets, viewMode, tickets, currentUser]);

  const handleCreateTicket = () => {
    setEditingTicket(null);
    setShowTicketForm(true);
  };

  const handleEditTicket = (ticket: Ticket) => {
    setEditingTicket(ticket);
    setShowTicketForm(true);
  };

  const handleDeleteTicket = async (ticketId: string) => {
    if (window.confirm('Are you sure you want to delete this ticket?')) {
      try {
        tasksStorage.deleteTicket(ticketId);
        setTickets(tasksStorage.getTickets());
        toast.success('Ticket deleted successfully');
      } catch (error) {
        toast.error('Failed to delete ticket');
      }
    }
  };

  const handleStatusChange = async (ticketId: string, newStatus: Ticket['status']) => {
    try {
      tasksStorage.updateTicketStatus(ticketId, newStatus);
      setTickets(tasksStorage.getTickets());
      toast.success(`Ticket status updated to ${newStatus}`);
    } catch (error) {
      toast.error('Failed to update ticket status');
    }
  };

  const handleTicketSubmit = async (ticketData: Partial<Ticket>) => {
    try {
      if (editingTicket) {
        const updatedTicket = { ...editingTicket, ...ticketData } as Ticket;
        tasksStorage.updateTicket(updatedTicket);
        toast.success('Ticket updated successfully');
      } else {
        const newTicket: Ticket = {
          id: Date.now().toString(),
          ticketNumber: `TKT-${new Date().getFullYear()}-${String(Date.now()).slice(-3)}`,
          subject: ticketData.subject!,
          description: ticketData.description!,
          category: ticketData.category!,
          priority: ticketData.priority!,
          status: 'open',
          customerId: ticketData.customerId!,
          customerName: ticketData.customerName!,
          customerEmail: ticketData.customerEmail!,
          customerPhone: ticketData.customerPhone!,
          assignedTo: ticketData.assignedTo,
          assignedBy: currentUser,
          department: ticketData.department!,
          slaLevel: 'standard',
          slaDeadline: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(), // 24 hours from now
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
          responses: [],
          internalNotes: [],
          tags: ticketData.tags || [],
          source: 'portal'
        };
        tasksStorage.addTicket(newTicket);
        toast.success('Ticket created successfully');
      }
      setTickets(tasksStorage.getTickets());
      setShowTicketForm(false);
    } catch (error) {
      toast.error('Failed to save ticket');
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'open': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'in-progress': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'resolved': return 'bg-green-100 text-green-800 border-green-200';
      case 'closed': return 'bg-gray-100 text-gray-800 border-gray-200';
      case 'escalated': return 'bg-red-100 text-red-800 border-red-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  if (showTicketForm) {
    return (
      <TicketForm
        ticket={editingTicket}
        onSubmit={handleTicketSubmit}
        onCancel={() => setShowTicketForm(false)}
      />
    );
  }

  return (
    <div className="h-full flex flex-col bg-slate-900 overflow-hidden">
      {/* Header */}
      <div className="flex justify-between items-center p-4 border-b border-yellow-400/30 flex-shrink-0">
        <div>
          <h1 className="text-2xl font-bold text-slate-50">
            {viewMode === 'inbox' ? 'Tickets Inbox' : 'My Tickets'}
          </h1>
          <p className="mt-1 text-sm text-slate-400">
            {viewMode === 'inbox' 
              ? 'Manage all customer support tickets and requests'
              : 'Your assigned tickets and support cases'
            }
          </p>
        </div>
        <div className="flex space-x-3">
          <div className="flex bg-slate-700/50 backdrop-blur-sm rounded-lg p-1 border border-yellow-400/20">
            <button
              onClick={() => setViewMode('inbox')}
              className={`px-3 py-1 text-sm rounded-md transition-colors ${
                viewMode === 'inbox'
                  ? 'bg-blue-500 text-slate-50'
                  : 'text-slate-300 hover:text-slate-50'
              }`}
            >
              Inbox
            </button>
            <button
              onClick={() => setViewMode('my')}
              className={`px-3 py-1 text-sm rounded-md transition-colors ${
                viewMode === 'my'
                  ? 'bg-blue-500 text-slate-50'
                  : 'text-slate-300 hover:text-slate-50'
              }`}
            >
              My Tickets
            </button>
          </div>
          <button className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-lg shadow-sm text-white bg-blue-600 hover:bg-blue-700 transition-all">
            <Plus className="h-4 w-4 mr-2" />
            Create Ticket
          </button>
          <button
            onClick={handleCreateTicket}
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-lg shadow-sm text-white bg-blue-600 hover:bg-blue-700 transition-all"
          >
            <Plus className="h-4 w-4 mr-2" />
            New Ticket
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto p-4 space-y-6 scrollbar-none">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 lg:grid-cols-9 gap-4">
          <div className="bg-slate-800/40 backdrop-blur-xl p-4 rounded-xl border border-yellow-400/30">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-400">Total Tickets</p>
                <p className="text-2xl font-bold text-slate-50">{stats.total}</p>
              </div>
              <Inbox className="h-8 w-8 text-blue-400" />
            </div>
          </div>
          <div className="bg-slate-800/40 backdrop-blur-xl p-4 rounded-xl border border-yellow-400/30">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-400">Open</p>
                <p className="text-2xl font-bold text-blue-400">{stats.open}</p>
              </div>
              <Flag className="h-8 w-8 text-blue-400" />
            </div>
          </div>
          <div className="bg-slate-800/40 backdrop-blur-xl p-4 rounded-xl border border-yellow-400/30">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-400">In Progress</p>
                <p className="text-2xl font-bold text-yellow-400">{stats.inProgress}</p>
              </div>
              <Clock className="h-8 w-8 text-yellow-400" />
            </div>
          </div>
          <div className="bg-slate-800/40 backdrop-blur-xl p-4 rounded-xl border border-yellow-400/30">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-400">Resolved</p>
                <p className="text-2xl font-bold text-green-400">{stats.resolved}</p>
              </div>
              <CheckCircle className="h-8 w-8 text-green-400" />
            </div>
          </div>
          <div className="bg-slate-800/40 backdrop-blur-xl p-4 rounded-xl border border-yellow-400/30">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-400">Closed</p>
                <p className="text-2xl font-bold text-gray-400">{stats.closed}</p>
              </div>
              <Archive className="h-8 w-8 text-gray-400" />
            </div>
          </div>
          <div className="bg-slate-800/40 backdrop-blur-xl p-4 rounded-xl border border-yellow-400/30">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-400">Escalated</p>
                <p className="text-2xl font-bold text-red-400">{stats.escalated}</p>
              </div>
              <AlertTriangle className="h-8 w-8 text-red-400" />
            </div>
          </div>
          <div className="bg-slate-800/40 backdrop-blur-xl p-4 rounded-xl border border-yellow-400/30">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-400">Critical</p>
                <p className="text-2xl font-bold text-red-400">{stats.critical}</p>
              </div>
              <Zap className="h-8 w-8 text-red-400" />
            </div>
          </div>
          <div className="bg-slate-800/40 backdrop-blur-xl p-4 rounded-xl border border-yellow-400/30">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-400">High Priority</p>
                <p className="text-2xl font-bold text-orange-400">{stats.high}</p>
              </div>
              <TrendingUp className="h-8 w-8 text-orange-400" />
            </div>
          </div>
          <div className="bg-slate-800/40 backdrop-blur-xl p-4 rounded-xl border border-yellow-400/30">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-400">Overdue</p>
                <p className="text-2xl font-bold text-red-400">{stats.overdue}</p>
              </div>
              <Flag className="h-8 w-8 text-red-400" />
            </div>
          </div>
        </div>

        {/* Filters */}
        <div className="bg-slate-800/40 backdrop-blur-xl rounded-xl p-4 border border-yellow-400/30">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-center">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-500 h-4 w-4" />
              <input
                type="text"
                placeholder="Search tickets..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-2 bg-slate-700/50 border border-yellow-400/30 rounded-lg w-full text-slate-50 placeholder-slate-400 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 backdrop-blur-sm"
              />
            </div>
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="px-3 py-2 bg-slate-700/50 border border-yellow-400/30 rounded-lg text-slate-50 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 backdrop-blur-sm"
            >
              <option value="all">All Status</option>
              <option value="open">Open</option>
              <option value="in-progress">In Progress</option>
              <option value="resolved">Resolved</option>
              <option value="closed">Closed</option>
              <option value="escalated">Escalated</option>
            </select>
            <div className="text-sm text-slate-400">
              Showing: <span className="font-semibold text-slate-50">{filteredTickets.length}</span> tickets
            </div>
          </div>
        </div>

        {/* Tickets Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {filteredTickets.map((ticket) => (
            <div key={ticket.id} className="bg-slate-800/40 backdrop-blur-xl rounded-2xl p-6 border border-yellow-400/30">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="text-lg font-semibold text-slate-50">{ticket.ticketNumber}</h3>
                  <p className="text-sm text-slate-400">{ticket.customerName}</p>
                </div>
                <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium border ${getStatusColor(ticket.status)}`}>
                  {ticket.status.replace('-', ' ').toUpperCase()}
                </span>
              </div>

              <h4 className="text-slate-50 font-medium mb-2">{ticket.subject}</h4>
              <p className="text-sm text-slate-300 mb-4 line-clamp-2">{ticket.description}</p>

              <div className="space-y-2 mb-4">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-slate-400">Customer</span>
                  <span className="text-slate-50 font-medium">{ticket.customerName}</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-slate-400">Assigned To</span>
                  <span className="text-slate-300">{ticket.assignedTo}</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-slate-400">Priority</span>
                  <span className={`font-medium ${
                    ticket.priority === 'critical' ? 'text-red-400' :
                    ticket.priority === 'high' ? 'text-orange-400' :
                    ticket.priority === 'medium' ? 'text-yellow-400' : 'text-green-400'
                  }`}>
                    {ticket.priority.toUpperCase()}
                  </span>
                </div>
              </div>

              <div className="flex justify-between items-center pt-4 border-t border-yellow-400/20">
                <div className="flex items-center text-xs text-slate-500">
                  <Calendar className="h-3 w-3 mr-1" />
                  <span>Created {new Date(ticket.createdAt).toLocaleDateString()}</span>
                </div>
                <div className="flex space-x-2">
                  <button className="p-2 text-slate-400 hover:text-blue-400 hover:bg-blue-500/10 rounded-lg transition-all">
                    <Eye className="h-4 w-4" />
                  </button>
                  <button 
                    onClick={() => handleEditTicket(ticket)}
                    className="p-2 text-slate-400 hover:text-green-400 hover:bg-green-500/10 rounded-lg transition-all"
                  >
                    <Edit className="h-4 w-4" />
                  </button>
                  <button 
                    onClick={() => handleDeleteTicket(ticket.id)}
                    className="p-2 text-slate-400 hover:text-red-400 hover:bg-red-500/10 rounded-lg transition-all"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                  {ticket.status === 'open' && (
                    <button 
                      onClick={() => handleStatusChange(ticket.id, 'in-progress')}
                      className="p-2 text-slate-400 hover:text-blue-400 hover:bg-blue-500/10 rounded-lg transition-all"
                      title="Start Working"
                    >
                      <Play className="h-4 w-4" />
                    </button>
                  )}
                  {ticket.status === 'in-progress' && (
                    <button 
                      onClick={() => handleStatusChange(ticket.id, 'resolved')}
                      className="p-2 text-slate-400 hover:text-green-400 hover:bg-green-500/10 rounded-lg transition-all"
                      title="Mark Resolved"
                    >
                      <CheckCircle className="h-4 w-4" />
                    </button>
                  )}
                  <button className="p-2 text-slate-400 hover:text-purple-400 hover:bg-purple-500/10 rounded-lg transition-all">
                    <MessageSquare className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredTickets.length === 0 && (
          <div className="text-center py-12">
            <Inbox className="h-12 w-12 mx-auto text-slate-500 mb-4" />
            <h3 className="text-lg font-medium text-slate-50 mb-2">No tickets found</h3>
            <p className="text-sm text-slate-400">
              {viewMode === 'inbox' 
                ? 'No tickets match your current filters.'
                : 'You have no tickets assigned.'
              }
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

// Ticket Form Component
const TicketForm: React.FC<{
  ticket: Ticket | null;
  onSubmit: (data: Partial<Ticket>) => void;
  onCancel: () => void;
}> = ({ ticket, onSubmit, onCancel }) => {
  const [formData, setFormData] = useState({
    subject: ticket?.subject || '',
    description: ticket?.description || '',
    category: ticket?.category || 'general',
    priority: ticket?.priority || 'medium',
    customerId: ticket?.customerId || '',
    customerName: ticket?.customerName || '',
    customerEmail: ticket?.customerEmail || '',
    customerPhone: ticket?.customerPhone || '',
    assignedTo: ticket?.assignedTo || '',
    department: ticket?.department || 'Customer Service',
    tags: ticket?.tags || []
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [newTag, setNewTag] = useState('');

  const categories = [
    { value: 'technical', label: 'Technical' },
    { value: 'billing', label: 'Billing' },
    { value: 'general', label: 'General' },
    { value: 'complaint', label: 'Complaint' },
    { value: 'feature-request', label: 'Feature Request' },
    { value: 'bug-report', label: 'Bug Report' },
    { value: 'account', label: 'Account' },
    { value: 'chit-fund', label: 'Chit Fund' }
  ];

  const departments = [
    'Customer Service',
    'Technical Support',
    'Finance',
    'Operations',
    'Sales & Marketing'
  ];

  const teamMembers = [
    'Karthik Nair',
    'Priya Sharma',
    'Amit Patel',
    'Rajesh Kumar',
    'Vikram Singh'
  ];

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.subject.trim()) {
      newErrors.subject = 'Subject is required';
    }

    if (!formData.description.trim()) {
      newErrors.description = 'Description is required';
    }

    if (!formData.customerName.trim()) {
      newErrors.customerName = 'Customer name is required';
    }

    if (!formData.customerEmail.trim()) {
      newErrors.customerEmail = 'Customer email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.customerEmail)) {
      newErrors.customerEmail = 'Please enter a valid email';
    }

    if (!formData.customerPhone.trim()) {
      newErrors.customerPhone = 'Customer phone is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      onSubmit({
        ...formData,
        customerId: formData.customerId || `cust_${Date.now()}`
      });
    }
  };

  const handleChange = (field: string, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const addTag = () => {
    if (newTag.trim() && !formData.tags.includes(newTag.trim())) {
      setFormData(prev => ({
        ...prev,
        tags: [...prev.tags, newTag.trim()]
      }));
      setNewTag('');
    }
  };

  const removeTag = (tagToRemove: string) => {
    setFormData(prev => ({
      ...prev,
      tags: prev.tags.filter(tag => tag !== tagToRemove)
    }));
  };

  return (
    <div className="h-full flex flex-col bg-slate-900 overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-yellow-400/30 flex-shrink-0">
        <div className="flex items-center space-x-4">
          <button
            onClick={onCancel}
            className="p-2 text-slate-400 hover:text-slate-50 hover:bg-slate-700/50 rounded-lg transition-all"
          >
            <ArrowLeft className="h-5 w-5" />
          </button>
          <div>
            <h1 className="text-2xl font-bold text-slate-50">
              {ticket ? 'Edit Ticket' : 'Create New Ticket'}
            </h1>
            <p className="mt-1 text-sm text-slate-400">
              {ticket ? 'Update ticket information' : 'Create a new support ticket'}
            </p>
          </div>
        </div>
      </div>

      {/* Form Content */}
      <div className="flex-1 overflow-y-auto p-6 scrollbar-none">
        <div className="max-w-4xl mx-auto">
          <form onSubmit={handleSubmit} className="bg-slate-800/40 backdrop-blur-xl rounded-2xl p-8 border border-yellow-400/30 space-y-6">
            
            {/* Customer Information */}
            <div>
              <h3 className="text-lg font-semibold text-slate-50 mb-4 flex items-center">
                <User className="h-5 w-5 mr-2" />
                Customer Information
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-slate-50 mb-2">Customer Name *</label>
                  <input
                    type="text"
                    value={formData.customerName}
                    onChange={(e) => handleChange('customerName', e.target.value)}
                    className={`w-full px-3 py-2 bg-slate-700/50 border rounded-lg text-slate-50 placeholder-slate-400 focus:ring-2 focus:ring-blue-500 backdrop-blur-sm ${
                      errors.customerName ? 'border-red-500' : 'border-yellow-400/30'
                    }`}
                    placeholder="Enter customer name"
                  />
                  {errors.customerName && <p className="mt-1 text-sm text-red-400">{errors.customerName}</p>}
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-50 mb-2">Customer Email *</label>
                  <input
                    type="email"
                    value={formData.customerEmail}
                    onChange={(e) => handleChange('customerEmail', e.target.value)}
                    className={`w-full px-3 py-2 bg-slate-700/50 border rounded-lg text-slate-50 placeholder-slate-400 focus:ring-2 focus:ring-blue-500 backdrop-blur-sm ${
                      errors.customerEmail ? 'border-red-500' : 'border-yellow-400/30'
                    }`}
                    placeholder="customer@example.com"
                  />
                  {errors.customerEmail && <p className="mt-1 text-sm text-red-400">{errors.customerEmail}</p>}
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-50 mb-2">Customer Phone *</label>
                  <input
                    type="tel"
                    value={formData.customerPhone}
                    onChange={(e) => handleChange('customerPhone', e.target.value)}
                    className={`w-full px-3 py-2 bg-slate-700/50 border rounded-lg text-slate-50 placeholder-slate-400 focus:ring-2 focus:ring-blue-500 backdrop-blur-sm ${
                      errors.customerPhone ? 'border-red-500' : 'border-yellow-400/30'
                    }`}
                    placeholder="+91 98765 43210"
                  />
                  {errors.customerPhone && <p className="mt-1 text-sm text-red-400">{errors.customerPhone}</p>}
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-50 mb-2">Customer ID</label>
                  <input
                    type="text"
                    value={formData.customerId}
                    onChange={(e) => handleChange('customerId', e.target.value)}
                    className="w-full px-3 py-2 bg-slate-700/50 border border-yellow-400/30 rounded-lg text-slate-50 placeholder-slate-400 focus:ring-2 focus:ring-blue-500 backdrop-blur-sm"
                    placeholder="Customer ID (optional)"
                  />
                </div>
              </div>
            </div>

            {/* Ticket Details */}
            <div>
              <h3 className="text-lg font-semibold text-slate-50 mb-4 flex items-center">
                <Ticket className="h-5 w-5 mr-2" />
                Ticket Details
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-slate-50 mb-2">Subject *</label>
                  <input
                    type="text"
                    value={formData.subject}
                    onChange={(e) => handleChange('subject', e.target.value)}
                    className={`w-full px-3 py-2 bg-slate-700/50 border rounded-lg text-slate-50 placeholder-slate-400 focus:ring-2 focus:ring-blue-500 backdrop-blur-sm ${
                      errors.subject ? 'border-red-500' : 'border-yellow-400/30'
                    }`}
                    placeholder="Brief description of the issue"
                  />
                  {errors.subject && <p className="mt-1 text-sm text-red-400">{errors.subject}</p>}
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-50 mb-2">Category</label>
                  <select
                    value={formData.category}
                    onChange={(e) => handleChange('category', e.target.value)}
                    className="w-full px-3 py-2 bg-slate-700/50 border border-yellow-400/30 rounded-lg text-slate-50 focus:ring-2 focus:ring-blue-500 backdrop-blur-sm"
                  >
                    {categories.map(category => (
                      <option key={category.value} value={category.value}>{category.label}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-50 mb-2">Priority</label>
                  <select
                    value={formData.priority}
                    onChange={(e) => handleChange('priority', e.target.value)}
                    className="w-full px-3 py-2 bg-slate-700/50 border border-yellow-400/30 rounded-lg text-slate-50 focus:ring-2 focus:ring-blue-500 backdrop-blur-sm"
                  >
                    <option value="low">Low</option>
                    <option value="medium">Medium</option>
                    <option value="high">High</option>
                    <option value="critical">Critical</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-50 mb-2">Department</label>
                  <select
                    value={formData.department}
                    onChange={(e) => handleChange('department', e.target.value)}
                    className="w-full px-3 py-2 bg-slate-700/50 border border-yellow-400/30 rounded-lg text-slate-50 focus:ring-2 focus:ring-blue-500 backdrop-blur-sm"
                  >
                    {departments.map(dept => (
                      <option key={dept} value={dept}>{dept}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-50 mb-2">Assign To</label>
                  <select
                    value={formData.assignedTo || ''}
                    onChange={(e) => handleChange('assignedTo', e.target.value)}
                    className="w-full px-3 py-2 bg-slate-700/50 border border-yellow-400/30 rounded-lg text-slate-50 focus:ring-2 focus:ring-blue-500 backdrop-blur-sm"
                  >
                    <option value="">Unassigned</option>
                    {teamMembers.map(member => (
                      <option key={member} value={member}>{member}</option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-50 mb-2">Description *</label>
              <textarea
                rows={4}
                value={formData.description}
                onChange={(e) => handleChange('description', e.target.value)}
                className={`w-full px-3 py-2 bg-slate-700/50 border rounded-lg text-slate-50 placeholder-slate-400 focus:ring-2 focus:ring-blue-500 backdrop-blur-sm ${
                  errors.description ? 'border-red-500' : 'border-yellow-400/30'
                }`}
                placeholder="Describe the issue in detail"
              />
              {errors.description && <p className="mt-1 text-sm text-red-400">{errors.description}</p>}
            </div>

            {/* Tags */}
            <div>
              <label className="block text-sm font-medium text-slate-50 mb-2">Tags</label>
              <div className="flex space-x-2 mb-3">
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
                  <Plus className="h-4 w-4" />
                </button>
              </div>
              <div className="flex flex-wrap gap-2">
                {formData.tags.map((tag, index) => (
                  <span key={index} className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-blue-100 text-blue-800 border border-blue-200">
                    #{tag}
                    <button
                      type="button"
                      onClick={() => removeTag(tag)}
                      className="ml-2 text-blue-600 hover:text-blue-800"
                    >
                      <X className="h-3 w-3" />
                    </button>
                  </span>
                ))}
              </div>
            </div>

            {/* Form Actions */}
            <div className="flex justify-end space-x-3 pt-6 border-t border-yellow-400/20">
              <button
                type="button"
                onClick={onCancel}
                className="px-6 py-2 text-sm font-medium text-slate-300 bg-slate-700/50 border border-yellow-400/30 rounded-lg hover:bg-slate-700 transition-all backdrop-blur-sm"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="inline-flex items-center px-6 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-lg shadow-sm hover:bg-blue-700 transition-all"
              >
                <Save className="h-4 w-4 mr-2" />
                {ticket ? 'Update Ticket' : 'Create Ticket'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};