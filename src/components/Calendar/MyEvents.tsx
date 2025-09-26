import React, { useState, useMemo } from 'react';
import {
  Plus,
  Search,
  Edit,
  Trash2,
  Eye,
  Calendar as CalendarIcon,
  Clock,
  Users,
  MapPin,
  Phone,
  Video,
  Mail,
  Bell,
  CheckCircle,
  XCircle,
  AlertTriangle,
  Activity,
  Star,
  Target,
  Award,
  TrendingUp,
  Filter,
  Download,
  Settings,
  MoreVertical,
  User,
  Building,
  Flag,
  Zap
} from 'lucide-react';

interface MyEvent {
  id: string;
  title: string;
  description: string;
  startTime: string;
  endTime: string;
  date: string;
  type: 'meeting' | 'call' | 'follow-up' | 'auction' | 'training' | 'personal' | 'deadline' | 'reminder';
  priority: 'low' | 'medium' | 'high' | 'critical';
  status: 'scheduled' | 'in-progress' | 'completed' | 'cancelled' | 'rescheduled';
  attendees: string[];
  location?: string;
  isVirtual: boolean;
  meetingLink?: string;
  createdBy: string;
  assignedTo: string;
  relatedTo?: {
    type: 'lead' | 'customer' | 'group' | 'employee' | 'task';
    id: string;
    name: string;
  };
  reminders: {
    time: number; // minutes before
    method: 'email' | 'sms' | 'push' | 'popup';
    sent: boolean;
  }[];
  isRecurring: boolean;
  recurrencePattern?: string;
  tags: string[];
  notes: string;
  createdAt: string;
  updatedAt: string;
}

const sampleMyEvents: MyEvent[] = [
  {
    id: '1',
    title: 'Client Meeting - TechCorp Solutions',
    description: 'Present premium chit scheme proposal and discuss terms',
    startTime: '10:00',
    endTime: '11:30',
    date: '2024-03-16',
    type: 'meeting',
    priority: 'high',
    status: 'scheduled',
    attendees: ['Priya Sharma', 'Rajesh Gupta', 'TechCorp Team'],
    location: 'TechCorp Office, Koramangala',
    isVirtual: false,
    createdBy: 'Priya Sharma',
    assignedTo: 'Priya Sharma',
    relatedTo: {
      type: 'lead',
      id: 'lead_001',
      name: 'TechCorp Solutions'
    },
    reminders: [
      { time: 15, method: 'push', sent: false },
      { time: 60, method: 'email', sent: false }
    ],
    isRecurring: false,
    tags: ['sales', 'proposal', 'high-value', 'corporate'],
    notes: 'Bring printed proposal, business cards, and company brochures. Confirm parking arrangements.',
    createdAt: '2024-03-14T16:30:00',
    updatedAt: '2024-03-15T09:15:00'
  },
  {
    id: '2',
    title: 'Follow-up Call - Sunita Reddy',
    description: 'Follow-up on silver scheme interest and answer questions',
    startTime: '14:30',
    endTime: '15:00',
    date: '2024-03-17',
    type: 'call',
    priority: 'medium',
    status: 'scheduled',
    attendees: ['Priya Sharma'],
    isVirtual: true,
    createdBy: 'Priya Sharma',
    assignedTo: 'Priya Sharma',
    relatedTo: {
      type: 'lead',
      id: 'lead_002',
      name: 'Sunita Reddy'
    },
    reminders: [
      { time: 10, method: 'popup', sent: false },
      { time: 30, method: 'sms', sent: false }
    ],
    isRecurring: false,
    tags: ['follow-up', 'sales', 'silver-scheme'],
    notes: 'Prepare answers for common questions about silver scheme benefits and payment schedule.',
    createdAt: '2024-03-15T11:20:00',
    updatedAt: '2024-03-15T11:20:00'
  }
];

const EventCard: React.FC<{ event: MyEvent }> = React.memo(({ event }) => {
  const getTypeColor = (type: string) => {
    switch (type) {
      case 'meeting': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'call': return 'bg-green-100 text-green-800 border-green-200';
      case 'follow-up': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'auction': return 'bg-purple-100 text-purple-800 border-purple-200';
      case 'training': return 'bg-orange-100 text-orange-800 border-orange-200';
      case 'personal': return 'bg-pink-100 text-pink-800 border-pink-200';
      case 'deadline': return 'bg-red-100 text-red-800 border-red-200';
      case 'reminder': return 'bg-indigo-100 text-indigo-800 border-indigo-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'bg-green-100 text-green-800 border-green-200';
      case 'in-progress': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'cancelled': return 'bg-red-100 text-red-800 border-red-200';
      case 'rescheduled': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'scheduled': return 'bg-purple-100 text-purple-800 border-purple-200';
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

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'meeting': return Users;
      case 'call': return Phone;
      case 'follow-up': return Bell;
      case 'auction': return Star;
      case 'training': return Award;
      case 'personal': return User;
      case 'deadline': return Flag;
      case 'reminder': return Bell;
      default: return CalendarIcon;
    }
  };

  const TypeIcon = getTypeIcon(event.type);

  return (
    <div className="bg-slate-800/40 backdrop-blur-xl rounded-2xl p-6 border border-yellow-400/30 hover:border-yellow-400/50 transition-all">
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center space-x-3">
          <div className="p-3 bg-blue-500/20 rounded-xl border border-yellow-400/30">
            <TypeIcon className="h-6 w-6 text-blue-400" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-slate-50">{event.title}</h3>
            <p className="text-sm text-slate-400">{event.description}</p>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <div className={`w-3 h-3 rounded-full ${getPriorityColor(event.priority)}`} title={`${event.priority} priority`}></div>
          <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium border ${getTypeColor(event.type)}`}>
            {event.type.toUpperCase()}
          </span>
          <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium border ${getStatusColor(event.status)}`}>
            {event.status.replace('-', ' ').toUpperCase()}
          </span>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 mb-4">
        <div className="space-y-2">
          <div className="flex items-center text-sm text-slate-300">
            <CalendarIcon className="h-4 w-4 mr-2 text-slate-500" />
            <span>{new Date(event.date).toLocaleDateString()}</span>
          </div>
          <div className="flex items-center text-sm text-slate-300">
            <Clock className="h-4 w-4 mr-2 text-slate-500" />
            <span>{event.startTime} - {event.endTime}</span>
          </div>
          {event.location && (
            <div className="flex items-center text-sm text-slate-300">
              <MapPin className="h-4 w-4 mr-2 text-slate-500" />
              <span className="truncate">{event.location}</span>
            </div>
          )}
        </div>
        <div className="space-y-2">
          <div className="flex items-center text-sm text-slate-300">
            <Users className="h-4 w-4 mr-2 text-slate-500" />
            <span>{event.attendees.length} attendees</span>
          </div>
          {event.isVirtual && (
            <div className="flex items-center text-sm text-slate-300">
              <Video className="h-4 w-4 mr-2 text-slate-500" />
              <span>Virtual Meeting</span>
            </div>
          )}
          {event.relatedTo && (
            <div className="flex items-center text-sm text-slate-300">
              <Building className="h-4 w-4 mr-2 text-slate-500" />
              <span className="truncate">{event.relatedTo.name}</span>
            </div>
          )}
        </div>
      </div>

      <div className="flex justify-between items-center pt-4 border-t border-yellow-400/20">
        <div className="text-xs text-slate-500">
          Created: {new Date(event.createdAt).toLocaleDateString()}
          {event.isRecurring && (
            <span className="ml-2 inline-flex items-center px-2 py-1 rounded-full text-xs bg-indigo-100 text-indigo-800 border border-indigo-200">
              Recurring
            </span>
          )}
        </div>
        <div className="flex space-x-2">
          <button className="p-2 text-slate-400 hover:text-blue-400 hover:bg-blue-500/10 rounded-lg transition-all">
            <Eye className="h-4 w-4" />
          </button>
          <button className="p-2 text-slate-400 hover:text-green-400 hover:bg-green-500/10 rounded-lg transition-all">
            <Edit className="h-4 w-4" />
          </button>
          <button className="p-2 text-slate-400 hover:text-red-400 hover:bg-red-500/10 rounded-lg transition-all">
            <Trash2 className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );
});

export const MyEvents: React.FC = () => {
  const [events] = useState<MyEvent[]>(sampleMyEvents);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState<string>('all');
  const [filterStatus, setFilterStatus] = useState<string>('all');

  const filteredEvents = useMemo(() => events.filter(event => {
    const matchesSearch = event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         event.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = filterType === 'all' || event.type === filterType;
    const matchesStatus = filterStatus === 'all' || event.status === filterStatus;
    
    return matchesSearch && matchesType && matchesStatus;
  }), [events, searchTerm, filterType, filterStatus]);

  const stats = useMemo(() => ({
    totalEvents: events.length,
    todayEvents: events.filter(e => e.date === new Date().toISOString().split('T')[0]).length,
    upcomingEvents: events.filter(e => new Date(e.date + 'T' + e.startTime) > new Date()).length,
    completedEvents: events.filter(e => e.status === 'completed').length,
    meetings: events.filter(e => e.type === 'meeting').length,
    calls: events.filter(e => e.type === 'call').length
  }), [events]);

  return (
    <div className="h-full flex flex-col bg-slate-900 overflow-hidden">
      {/* Header */}
      <div className="flex justify-between items-center p-4 border-b border-yellow-400/30 flex-shrink-0">
        <div>
          <h1 className="text-2xl font-bold text-slate-50">My Events</h1>
          <p className="mt-1 text-sm text-slate-400">
            Manage your personal events, meetings, and important activities
          </p>
        </div>
        <div className="flex space-x-3">
          <button className="inline-flex items-center px-4 py-2 border border-yellow-400/30 text-sm font-medium rounded-lg text-slate-50 bg-slate-700/50 hover:bg-slate-700 transition-all backdrop-blur-sm">
            <Download className="h-4 w-4 mr-2" />
            Export Events
          </button>
          <button className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-lg shadow-sm text-white bg-blue-600 hover:bg-blue-700 transition-all">
            <Plus className="h-4 w-4 mr-2" />
            Create Event
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto p-4 space-y-6 scrollbar-none">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-6 gap-4">
          <div className="bg-slate-800/40 backdrop-blur-xl p-4 rounded-xl border border-yellow-400/30">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-400">Total Events</p>
                <p className="text-2xl font-bold text-slate-50">{stats.totalEvents}</p>
              </div>
              <CalendarIcon className="h-8 w-8 text-blue-400" />
            </div>
          </div>
          <div className="bg-slate-800/40 backdrop-blur-xl p-4 rounded-xl border border-yellow-400/30">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-400">Today</p>
                <p className="text-2xl font-bold text-green-400">{stats.todayEvents}</p>
              </div>
              <Clock className="h-8 w-8 text-green-400" />
            </div>
          </div>
          <div className="bg-slate-800/40 backdrop-blur-xl p-4 rounded-xl border border-yellow-400/30">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-400">Upcoming</p>
                <p className="text-2xl font-bold text-orange-400">{stats.upcomingEvents}</p>
              </div>
              <TrendingUp className="h-8 w-8 text-orange-400" />
            </div>
          </div>
          <div className="bg-slate-800/40 backdrop-blur-xl p-4 rounded-xl border border-yellow-400/30">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-400">Completed</p>
                <p className="text-2xl font-bold text-emerald-400">{stats.completedEvents}</p>
              </div>
              <CheckCircle className="h-8 w-8 text-emerald-400" />
            </div>
          </div>
          <div className="bg-slate-800/40 backdrop-blur-xl p-4 rounded-xl border border-yellow-400/30">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-400">Meetings</p>
                <p className="text-2xl font-bold text-blue-400">{stats.meetings}</p>
              </div>
              <Users className="h-8 w-8 text-blue-400" />
            </div>
          </div>
          <div className="bg-slate-800/40 backdrop-blur-xl p-4 rounded-xl border border-yellow-400/30">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-400">Calls</p>
                <p className="text-2xl font-bold text-green-400">{stats.calls}</p>
              </div>
              <Phone className="h-8 w-8 text-green-400" />
            </div>
          </div>
        </div>

        {/* Filters */}
        <div className="bg-slate-800/40 backdrop-blur-xl rounded-xl p-4 border border-yellow-400/30">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-500 h-4 w-4" />
              <input
                type="text"
                placeholder="Search events..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-2 bg-slate-700/50 border border-yellow-400/30 rounded-lg w-full text-slate-50 placeholder-slate-400 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 backdrop-blur-sm"
              />
            </div>
            <select
              value={filterType}
              onChange={(e) => setFilterType(e.target.value)}
              className="px-3 py-2 bg-slate-700/50 border border-yellow-400/30 rounded-lg text-slate-50 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 backdrop-blur-sm"
            >
              <option value="all">All Types</option>
              <option value="meeting">Meetings</option>
              <option value="call">Calls</option>
              <option value="follow-up">Follow-ups</option>
              <option value="auction">Auctions</option>
              <option value="training">Training</option>
              <option value="personal">Personal</option>
              <option value="deadline">Deadlines</option>
            </select>
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="px-3 py-2 bg-slate-700/50 border border-yellow-400/30 rounded-lg text-slate-50 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 backdrop-blur-sm"
            >
              <option value="all">All Status</option>
              <option value="scheduled">Scheduled</option>
              <option value="in-progress">In Progress</option>
              <option value="completed">Completed</option>
              <option value="cancelled">Cancelled</option>
            </select>
            <div className="text-sm text-slate-400">
              Showing: <span className="font-semibold text-slate-50">{filteredEvents.length}</span> events
            </div>
          </div>
        </div>

        {/* Events Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {filteredEvents.map((event) => (
            <EventCard key={event.id} event={event} />
          ))}
        </div>

        {filteredEvents.length === 0 && (
          <div className="text-center py-12">
            <CalendarIcon className="h-12 w-12 mx-auto text-slate-500 mb-4" />
            <h3 className="text-lg font-medium text-slate-50 mb-2">No events found</h3>
            <p className="text-sm text-slate-400">Try adjusting your search criteria or create a new event.</p>
          </div>
        )}
      </div>
    </div>
  );
};