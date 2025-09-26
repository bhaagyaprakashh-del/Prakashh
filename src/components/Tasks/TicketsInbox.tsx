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

const sampleTickets: Ticket[] = [
  {
    id: '1',
    ticketNumber: 'TKT-2024-001',
    subject: 'Unable to access chit group details',
    description: 'Customer cannot view their chit group information in the portal.',
    category: 'technical',
    priority: 'high',
    status: 'open',
    customerId: 'cust_001',
    customerName: 'Rajesh Gupta',
    customerEmail: 'rajesh.gupta@techcorp.com',
    customerPhone: '+91 98765 43210',
    assignedTo: 'Karthik Nair',
    assignedBy: 'System',
    department: 'Technical Support',
    slaLevel: 'priority',
    slaDeadline: '2024-03-16T14:00:00',
    createdAt: '2024-03-15T10:00:00',
    updatedAt: '2024-03-15T10:00:00',
    responses: [],
    internalNotes: [],
    tags: ['portal', 'access-issue'],
    source: 'email'
  },
  {
    id: '2',
    ticketNumber: 'TKT-2024-002',
    subject: 'Payment not reflecting in account',
    description: 'Customer made payment 3 days ago but it is not showing in their account balance.',
    category: 'billing',
    priority: 'critical',
    status: 'in-progress',
    customerId: 'cust_002',
    customerName: 'Sunita Reddy',
    customerEmail: 'sunita.reddy@gmail.com',
    customerPhone: '+91 98765 43211',
    assignedTo: 'Amit Patel',
    assignedBy: 'Rajesh Kumar',
    department: 'Finance',
    slaLevel: 'vip',
    slaDeadline: '2024-03-15T16:00:00',
    responseTime: 45,
    createdAt: '2024-03-14T14:30:00',
    updatedAt: '2024-03-15T09:15:00',
    firstResponseAt: '2024-03-14T15:15:00',
    responses: [],
    internalNotes: [],
    tags: ['payment', 'billing'],
    source: 'phone'
  }
];

export const TicketsInbox: React.FC = () => {
  const [tickets] = useState<Ticket[]>(sampleTickets);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [viewMode, setViewMode] = useState<'inbox' | 'my'>('inbox');

  const currentUser = 'Karthik Nair';

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
                  <button className="p-2 text-slate-400 hover:text-green-400 hover:bg-green-500/10 rounded-lg transition-all">
                    <MessageSquare className="h-4 w-4" />
                  </button>
                  <button className="p-2 text-slate-400 hover:text-purple-400 hover:bg-purple-500/10 rounded-lg transition-all">
                    <Edit className="h-4 w-4" />
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