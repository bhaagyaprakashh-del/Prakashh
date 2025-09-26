import React, { useState } from 'react';
import {
  ArrowLeft,
  Edit,
  Mail,
  Phone,
  Building,
  Calendar,
  DollarSign,
  User,
  Tag,
  Clock,
  MessageSquare,
  FileText,
  Activity,
  TrendingUp,
  Target,
  Award,
  CheckCircle,
  AlertTriangle,
  Plus,
  Send,
  Download
} from 'lucide-react';
import { Lead } from '../../types/crm';
import { formatCurrency } from '../../utils/calculations';

interface Lead360Props {
  leadId: string;
  onBack: () => void;
}

const sampleLead: Lead = {
  id: '1',
  name: 'Rajesh Gupta',
  email: 'rajesh.gupta@techcorp.com',
  phone: '+91 98765 43210',
  company: 'TechCorp Solutions',
  source: 'website',
  status: 'proposal',
  priority: 'high',
  value: 500000,
  assignedTo: 'Priya Sharma',
  createdAt: '2024-03-15',
  updatedAt: '2024-03-15',
  notes: [
    'Initial inquiry about premium chit schemes',
    'Interested in corporate packages for employees',
    'Budget confirmed during discovery call',
    'Proposal sent with customized terms'
  ],
  tags: ['enterprise', 'hot-lead', 'corporate', 'budget-confirmed'],
  nextFollowUp: '2024-03-20'
};

const activities = [
  {
    id: '1',
    type: 'call',
    title: 'Discovery Call Completed',
    description: 'Had detailed discussion about chit fund requirements',
    timestamp: '2024-03-15T14:30:00',
    user: 'Priya Sharma',
    duration: '45 minutes'
  },
  {
    id: '2',
    type: 'email',
    title: 'Proposal Sent',
    description: 'Sent customized proposal with premium scheme options',
    timestamp: '2024-03-15T16:15:00',
    user: 'Priya Sharma'
  },
  {
    id: '3',
    type: 'note',
    title: 'Budget Confirmed',
    description: 'Client confirmed budget of ₹5,00,000 for corporate scheme',
    timestamp: '2024-03-14T11:20:00',
    user: 'Priya Sharma'
  },
  {
    id: '4',
    type: 'meeting',
    title: 'Initial Meeting Scheduled',
    description: 'Meeting scheduled for next week to discuss terms',
    timestamp: '2024-03-13T09:45:00',
    user: 'Priya Sharma'
  }
];

const ActivityIcon: React.FC<{ type: string }> = ({ type }) => {
  switch (type) {
    case 'call': return <Phone className="h-4 w-4" />;
    case 'email': return <Mail className="h-4 w-4" />;
    case 'meeting': return <Calendar className="h-4 w-4" />;
    case 'note': return <MessageSquare className="h-4 w-4" />;
    default: return <Activity className="h-4 w-4" />;
  }
};

const getActivityColor = (type: string) => {
  switch (type) {
    case 'call': return 'bg-green-500/20 text-green-400 border-green-500/30';
    case 'email': return 'bg-blue-500/20 text-blue-400 border-blue-500/30';
    case 'meeting': return 'bg-purple-500/20 text-purple-400 border-purple-500/30';
    case 'note': return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30';
    default: return 'bg-gray-500/20 text-gray-400 border-gray-500/30';
  }
};

export const Lead360: React.FC<Lead360Props> = ({ leadId, onBack }) => {
  const [lead] = useState<Lead>(sampleLead);
  const [activeTab, setActiveTab] = useState('overview');
  const [newNote, setNewNote] = useState('');

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'new': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'contacted': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'qualified': return 'bg-purple-100 text-purple-800 border-purple-200';
      case 'proposal': return 'bg-orange-100 text-orange-800 border-orange-200';
      case 'negotiation': return 'bg-pink-100 text-pink-800 border-pink-200';
      case 'won': return 'bg-green-100 text-green-800 border-green-200';
      case 'lost': return 'bg-red-100 text-red-800 border-red-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'critical': return 'bg-red-500';
      case 'high': return 'bg-orange-500';
      case 'medium': return 'bg-yellow-500';
      case 'low': return 'bg-green-500';
      default: return 'bg-gray-500';
    }
  };

  const tabs = [
    { id: 'overview', name: 'Overview', icon: User },
    { id: 'activity', name: 'Activity Timeline', icon: Activity },
    { id: 'communications', name: 'Communications', icon: MessageSquare },
    { id: 'documents', name: 'Documents', icon: FileText }
  ];

  const addNote = () => {
    if (newNote.trim()) {
      // Add note logic here
      setNewNote('');
    }
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case 'overview':
        return (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Lead Information */}
            <div className="bg-slate-800/40 backdrop-blur-xl rounded-2xl p-6 border border-yellow-400/30">
              <h3 className="text-lg font-semibold text-slate-50 mb-4 flex items-center">
                <User className="h-5 w-5 mr-2" />
                Lead Information
              </h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-slate-400">Lead Source</span>
                  <span className="text-slate-50 capitalize">{lead.source.replace('-', ' ')}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Created Date</span>
                  <span className="text-slate-50">{new Date(lead.createdAt).toLocaleDateString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Last Updated</span>
                  <span className="text-slate-50">{new Date(lead.updatedAt).toLocaleDateString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Assigned To</span>
                  <span className="text-slate-50">{lead.assignedTo}</span>
                </div>
              </div>
            </div>

            {/* Contact Information */}
            <div className="bg-slate-800/40 backdrop-blur-xl rounded-2xl p-6 border border-yellow-400/30">
              <h3 className="text-lg font-semibold text-slate-50 mb-4 flex items-center">
                <Building className="h-5 w-5 mr-2" />
                Contact Details
              </h3>
              <div className="space-y-3">
                <div className="flex items-center space-x-3">
                  <Mail className="h-4 w-4 text-slate-400" />
                  <span className="text-slate-50">{lead.email}</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Phone className="h-4 w-4 text-slate-400" />
                  <span className="text-slate-50">{lead.phone}</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Building className="h-4 w-4 text-slate-400" />
                  <span className="text-slate-50">{lead.company}</span>
                </div>
                {lead.nextFollowUp && (
                  <div className="flex items-center space-x-3">
                    <Calendar className="h-4 w-4 text-slate-400" />
                    <span className="text-blue-400">Next: {new Date(lead.nextFollowUp).toLocaleDateString()}</span>
                  </div>
                )}
              </div>
            </div>

            {/* Lead Value & Status */}
            <div className="bg-slate-800/40 backdrop-blur-xl rounded-2xl p-6 border border-yellow-400/30">
              <h3 className="text-lg font-semibold text-slate-50 mb-4 flex items-center">
                <DollarSign className="h-5 w-5 mr-2" />
                Value & Status
              </h3>
              <div className="space-y-4">
                <div className="text-center p-4 bg-slate-700/30 rounded-xl border border-yellow-400/20">
                  <p className="text-sm text-slate-400 mb-1">Lead Value</p>
                  <p className="text-3xl font-bold text-green-400">{formatCurrency(lead.value)}</p>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-slate-400">Status</span>
                  <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium border ${getStatusColor(lead.status)}`}>
                    {lead.status.toUpperCase()}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-slate-400">Priority</span>
                  <div className="flex items-center space-x-2">
                    <div className={`w-3 h-3 rounded-full ${getPriorityColor(lead.priority)}`}></div>
                    <span className="text-slate-50 capitalize">{lead.priority}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Tags */}
            <div className="bg-slate-800/40 backdrop-blur-xl rounded-2xl p-6 border border-yellow-400/30">
              <h3 className="text-lg font-semibold text-slate-50 mb-4 flex items-center">
                <Tag className="h-5 w-5 mr-2" />
                Tags & Labels
              </h3>
              <div className="flex flex-wrap gap-2">
                {lead.tags.map((tag, index) => (
                  <span key={index} className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-blue-100 text-blue-800 border border-blue-200">
                    #{tag}
                  </span>
                ))}
              </div>
            </div>

            {/* Notes */}
            <div className="bg-slate-800/40 backdrop-blur-xl rounded-2xl p-6 border border-yellow-400/30 lg:col-span-2">
              <h3 className="text-lg font-semibold text-slate-50 mb-4 flex items-center">
                <MessageSquare className="h-5 w-5 mr-2" />
                Notes & Comments
              </h3>
              <div className="space-y-3">
                {lead.notes.map((note, index) => (
                  <div key={index} className="p-3 bg-slate-700/30 rounded-lg border border-yellow-400/20">
                    <p className="text-sm text-slate-300">{note}</p>
                    <p className="text-xs text-slate-500 mt-1">Added on {new Date(lead.createdAt).toLocaleDateString()}</p>
                  </div>
                ))}
              </div>
              
              <div className="mt-4 flex space-x-2">
                <input
                  type="text"
                  value={newNote}
                  onChange={(e) => setNewNote(e.target.value)}
                  className="flex-1 px-3 py-2 bg-slate-700/50 border border-yellow-400/30 rounded-lg text-slate-50 placeholder-slate-400 focus:ring-2 focus:ring-blue-500 backdrop-blur-sm"
                  placeholder="Add a note..."
                  onKeyPress={(e) => e.key === 'Enter' && addNote()}
                />
                <button
                  onClick={addNote}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  <Plus className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>
        );

      case 'activity':
        return (
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-semibold text-slate-50">Activity Timeline</h3>
              <button className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                <Plus className="h-4 w-4 mr-2" />
                Log Activity
              </button>
            </div>
            
            <div className="space-y-4">
              {activities.map((activity, index) => (
                <div key={activity.id} className="bg-slate-800/40 backdrop-blur-xl rounded-xl p-4 border border-yellow-400/30">
                  <div className="flex items-start space-x-4">
                    <div className={`p-2 rounded-lg border ${getActivityColor(activity.type)}`}>
                      <ActivityIcon type={activity.type} />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="text-slate-50 font-medium">{activity.title}</h4>
                        <span className="text-xs text-slate-400">
                          {new Date(activity.timestamp).toLocaleString()}
                        </span>
                      </div>
                      <p className="text-slate-300 text-sm mb-2">{activity.description}</p>
                      <div className="flex items-center space-x-4 text-xs text-slate-500">
                        <span>By {activity.user}</span>
                        {activity.duration && <span>Duration: {activity.duration}</span>}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );

      default:
        return (
          <div className="text-center py-12">
            <div className="bg-slate-700/30 backdrop-blur-sm rounded-full p-4 mb-4 border border-slate-600/50 inline-block">
              <FileText className="h-16 w-16 text-slate-400" />
            </div>
            <h3 className="text-xl font-bold text-slate-50 mb-2">{tabs.find(t => t.id === activeTab)?.name}</h3>
            <p className="text-slate-400">This section is coming soon!</p>
          </div>
        );
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
          <div className="flex items-center space-x-4">
            <div className="h-16 w-16 bg-slate-600/50 rounded-full flex items-center justify-center text-slate-50 font-bold text-xl border border-yellow-400/30">
              {lead.name.split(' ').map(n => n[0]).join('')}
            </div>
            <div>
              <h1 className="text-2xl font-bold text-slate-50">{lead.name}</h1>
              <p className="text-slate-400">{lead.company}</p>
              <div className="flex items-center space-x-3 mt-1">
                <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium border ${getStatusColor(lead.status)}`}>
                  {lead.status.toUpperCase()}
                </span>
                <div className="flex items-center space-x-1">
                  <div className={`w-3 h-3 rounded-full ${getPriorityColor(lead.priority)}`}></div>
                  <span className="text-slate-400 text-sm capitalize">{lead.priority} priority</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="flex space-x-3">
          <button className="inline-flex items-center px-4 py-2 border border-yellow-400/30 text-sm font-medium rounded-lg text-slate-50 bg-slate-700/50 hover:bg-slate-700 transition-all backdrop-blur-sm">
            <Phone className="h-4 w-4 mr-2" />
            Call
          </button>
          <button className="inline-flex items-center px-4 py-2 border border-yellow-400/30 text-sm font-medium rounded-lg text-slate-50 bg-slate-700/50 hover:bg-slate-700 transition-all backdrop-blur-sm">
            <Mail className="h-4 w-4 mr-2" />
            Email
          </button>
          <button className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-lg shadow-sm text-white bg-blue-600 hover:bg-blue-700 transition-all">
            <Edit className="h-4 w-4 mr-2" />
            Edit Lead
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="border-b border-yellow-400/30 bg-slate-800/40 backdrop-blur-xl flex-shrink-0">
        <nav className="flex space-x-4 px-4 overflow-x-auto" aria-label="Tabs">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`${
                  activeTab === tab.id
                    ? 'border-blue-500 text-blue-400'
                    : 'border-transparent text-slate-400 hover:text-slate-300 hover:border-slate-300'
                } whitespace-nowrap py-3 px-2 border-b-2 font-medium text-sm flex items-center transition-all`}
              >
                <Icon className="h-4 w-4 mr-2" />
                {tab.name}
              </button>
            );
          })}
        </nav>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto p-4 scrollbar-none">
        {renderTabContent()}
      </div>
    </div>
  );
};