import React, { useState, useMemo } from 'react';
import { Plus, Search, CreditCard as Edit, Trash2, Eye, Phone, Mail, Building, Calendar, DollarSign, TrendingUp, Users, Target, Award, CheckCircle, Clock, AlertTriangle, Filter, Download, Upload, MoreVertical, Star, Tag, MapPin, Globe, Zap } from 'lucide-react';
import { Lead } from '../../types/crm';
import { formatCurrency } from '../../utils/calculations';

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
  }
];

export const AllLeads: React.FC = () => {
  const [leads] = useState<Lead[]>(sampleLeads);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [viewMode, setViewMode] = useState<'cards' | 'table'>('table');

  const filteredLeads = useMemo(() => leads.filter(lead => {
    const matchesSearch = lead.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         lead.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         lead.company.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === 'all' || lead.status === filterStatus;
    
    return matchesSearch && matchesStatus;
  }), [leads, searchTerm, filterStatus]);

  const stats = useMemo(() => ({
    total: leads.length,
    new: leads.filter(l => l.status === 'new').length,
    contacted: leads.filter(l => l.status === 'contacted').length,
    qualified: leads.filter(l => l.status === 'qualified').length,
    proposal: leads.filter(l => l.status === 'proposal').length,
    negotiation: leads.filter(l => l.status === 'negotiation').length,
    won: leads.filter(l => l.status === 'won').length,
    lost: leads.filter(l => l.status === 'lost').length,
    totalValue: leads.reduce((sum, l) => sum + l.value, 0)
  }), [leads]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'new': return 'bg-blue-100 text-blue-800';
      case 'contacted': return 'bg-yellow-100 text-yellow-800';
      case 'qualified': return 'bg-purple-100 text-purple-800';
      case 'proposal': return 'bg-orange-100 text-orange-800';
      case 'negotiation': return 'bg-pink-100 text-pink-800';
      case 'won': return 'bg-green-100 text-green-800';
      case 'lost': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="h-full flex flex-col bg-slate-900 overflow-hidden">
      {/* Header */}
      <div className="flex justify-between items-center p-4 border-b border-yellow-400/30 flex-shrink-0">
        <div>
          <h1 className="text-2xl font-bold text-slate-50">All Leads (Table View)</h1>
          <p className="mt-1 text-sm text-slate-400">
            Comprehensive lead management with advanced filtering
          </p>
        </div>
        <div className="flex space-x-3">
          <button className="inline-flex items-center px-4 py-2 border border-yellow-400/30 text-sm font-medium rounded-lg text-slate-50 bg-slate-700/50 hover:bg-slate-700 transition-all backdrop-blur-sm">
            <Download className="h-4 w-4 mr-2" />
            Export
          </button>
          <button className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-lg shadow-sm text-white bg-blue-600 hover:bg-blue-700 transition-all">
            <Plus className="h-4 w-4 mr-2" />
            Add Lead
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
                <p className="text-sm text-slate-400">Total Leads</p>
                <p className="text-2xl font-bold text-slate-50">{stats.total}</p>
              </div>
              <Users className="h-8 w-8 text-blue-400" />
            </div>
          </div>
          <div className="bg-slate-800/40 backdrop-blur-xl p-4 rounded-xl border border-yellow-400/30">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-400">New</p>
                <p className="text-2xl font-bold text-blue-400">{stats.new}</p>
              </div>
              <Zap className="h-8 w-8 text-blue-400" />
            </div>
          </div>
          <div className="bg-slate-800/40 backdrop-blur-xl p-4 rounded-xl border border-yellow-400/30">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-400">Contacted</p>
                <p className="text-2xl font-bold text-yellow-400">{stats.contacted}</p>
              </div>
              <Phone className="h-8 w-8 text-yellow-400" />
            </div>
          </div>
          <div className="bg-slate-800/40 backdrop-blur-xl p-4 rounded-xl border border-yellow-400/30">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-400">Qualified</p>
                <p className="text-2xl font-bold text-purple-400">{stats.qualified}</p>
              </div>
              <CheckCircle className="h-8 w-8 text-purple-400" />
            </div>
          </div>
          <div className="bg-slate-800/40 backdrop-blur-xl p-4 rounded-xl border border-yellow-400/30">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-400">Proposal</p>
                <p className="text-2xl font-bold text-orange-400">{stats.proposal}</p>
              </div>
              <Target className="h-8 w-8 text-orange-400" />
            </div>
          </div>
          <div className="bg-slate-800/40 backdrop-blur-xl p-4 rounded-xl border border-yellow-400/30">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-400">Negotiation</p>
                <p className="text-2xl font-bold text-pink-400">{stats.negotiation}</p>
              </div>
              <TrendingUp className="h-8 w-8 text-pink-400" />
            </div>
          </div>
          <div className="bg-slate-800/40 backdrop-blur-xl p-4 rounded-xl border border-yellow-400/30">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-400">Won</p>
                <p className="text-2xl font-bold text-green-400">{stats.won}</p>
              </div>
              <Award className="h-8 w-8 text-green-400" />
            </div>
          </div>
          <div className="bg-slate-800/40 backdrop-blur-xl p-4 rounded-xl border border-yellow-400/30">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-400">Lost</p>
                <p className="text-2xl font-bold text-red-400">{stats.lost}</p>
              </div>
              <AlertTriangle className="h-8 w-8 text-red-400" />
            </div>
          </div>
          <div className="bg-slate-800/40 backdrop-blur-xl p-4 rounded-xl border border-yellow-400/30">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-400">Total Value</p>
                <p className="text-xl font-bold text-yellow-400">{formatCurrency(stats.totalValue)}</p>
              </div>
              <DollarSign className="h-8 w-8 text-yellow-400" />
            </div>
          </div>
        </div>

        {/* Filters */}
        <div className="bg-slate-800/40 backdrop-blur-xl rounded-xl p-4 border border-yellow-400/30">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-center">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-500 h-4 w-4" />
              <input
                type="text"
                placeholder="Search leads..."
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
              <option value="new">New</option>
              <option value="contacted">Contacted</option>
              <option value="qualified">Qualified</option>
              <option value="proposal">Proposal</option>
              <option value="negotiation">Negotiation</option>
              <option value="won">Won</option>
              <option value="lost">Lost</option>
            </select>
            <div className="text-sm text-slate-400">
              Showing: <span className="font-semibold text-slate-50">{filteredLeads.length}</span> leads
            </div>
            <div className="flex bg-slate-700/50 backdrop-blur-sm rounded-lg p-1 border border-yellow-400/20">
              <button
                onClick={() => setViewMode('table')}
                className={`px-3 py-1 text-sm rounded-md transition-colors ${
                  viewMode === 'table'
                    ? 'bg-blue-500 text-slate-50'
                    : 'text-slate-300 hover:text-slate-50'
                }`}
              >
                Table
              </button>
              <button
                onClick={() => setViewMode('cards')}
                className={`px-3 py-1 text-sm rounded-md transition-colors ${
                  viewMode === 'cards'
                    ? 'bg-blue-500 text-slate-50'
                    : 'text-slate-300 hover:text-slate-50'
                }`}
              >
                Cards
              </button>
            </div>
          </div>
        </div>

        {/* Leads Display */}
        {viewMode === 'table' ? (
          <div className="bg-slate-800/40 backdrop-blur-xl rounded-2xl border border-yellow-400/30 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-slate-700/50 border-b border-yellow-400/20">
                  <tr>
                    <th className="px-6 py-4 text-left text-xs font-medium text-slate-300 uppercase tracking-wider">Lead</th>
                    <th className="px-6 py-4 text-left text-xs font-medium text-slate-300 uppercase tracking-wider">Company</th>
                    <th className="px-6 py-4 text-left text-xs font-medium text-slate-300 uppercase tracking-wider">Contact</th>
                    <th className="px-6 py-4 text-left text-xs font-medium text-slate-300 uppercase tracking-wider">Value</th>
                    <th className="px-6 py-4 text-left text-xs font-medium text-slate-300 uppercase tracking-wider">Status</th>
                    <th className="px-6 py-4 text-left text-xs font-medium text-slate-300 uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-yellow-400/20">
                  {filteredLeads.map((lead) => (
                    <tr key={lead.id} className="hover:bg-slate-700/20 transition-colors">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center space-x-3">
                          <div className="h-10 w-10 bg-slate-600/50 rounded-full flex items-center justify-center text-slate-50 font-medium border border-yellow-400/30">
                            {lead.name.split(' ').map(n => n[0]).join('')}
                          </div>
                          <div>
                            <p className="text-sm font-medium text-slate-50">{lead.name}</p>
                            <p className="text-xs text-slate-400">Created {new Date(lead.createdAt).toLocaleDateString()}</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div>
                          <p className="text-sm font-medium text-slate-50">{lead.company}</p>
                          <p className="text-xs text-slate-400 capitalize">{lead.source.replace('-', ' ')}</p>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div>
                          <p className="text-sm text-slate-300">{lead.email}</p>
                          <p className="text-xs text-slate-400">{lead.phone}</p>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <p className="text-sm font-semibold text-green-400">{formatCurrency(lead.value)}</p>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(lead.status)}`}>
                          {lead.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <div className="flex space-x-2">
                          <button className="text-blue-400 hover:text-blue-300">
                            <Eye className="h-4 w-4" />
                          </button>
                          <button className="text-green-400 hover:text-green-300">
                            <Phone className="h-4 w-4" />
                          </button>
                          <button className="text-purple-400 hover:text-purple-300">
                            <Mail className="h-4 w-4" />
                          </button>
                          <button className="text-orange-400 hover:text-orange-300">
                            <Edit className="h-4 w-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {filteredLeads.map((lead) => (
              <div key={lead.id} className="bg-slate-800/40 backdrop-blur-xl rounded-2xl p-6 border border-yellow-400/30">
                <h3 className="text-lg font-semibold text-slate-50 mb-2">{lead.name}</h3>
                <p className="text-sm text-slate-400 mb-4">{lead.company}</p>
                <div className="space-y-2">
                  <p className="text-sm text-slate-300">{lead.email}</p>
                  <p className="text-sm text-slate-300">{lead.phone}</p>
                  <p className="text-lg font-bold text-green-400">{formatCurrency(lead.value)}</p>
                </div>
              </div>
            ))}
          </div>
        )}

        {filteredLeads.length === 0 && (
          <div className="text-center py-12">
            <Users className="h-12 w-12 mx-auto text-slate-500 mb-4" />
            <h3 className="text-lg font-medium text-slate-50 mb-2">No leads found</h3>
            <p className="text-sm text-slate-400">Try adjusting your search criteria or add a new lead.</p>
          </div>
        )}
      </div>
    </div>
  );
};