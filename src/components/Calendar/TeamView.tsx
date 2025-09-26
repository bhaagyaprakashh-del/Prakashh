import React, { useState, useMemo } from 'react';
import {
  Plus,
  Search,
  Users,
  Calendar as CalendarIcon,
  Clock,
  MapPin,
  Phone,
  Mail,
  Building,
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
  Flag,
  Zap,
  Eye,
  Edit,
  Video,
  Bell
} from 'lucide-react';

interface TeamMember {
  id: string;
  name: string;
  email: string;
  phone: string;
  department: string;
  designation: string;
  branch: string;
  status: 'available' | 'busy' | 'away' | 'offline';
  workingHours: {
    start: string;
    end: string;
    timezone: string;
  };
  currentActivity?: string;
  nextAvailable?: string;
  avatar?: string;
  skills: string[];
  lastSeen: string;
}

interface TeamEvent {
  id: string;
  title: string;
  description: string;
  startTime: string;
  endTime: string;
  date: string;
  type: 'meeting' | 'training' | 'review' | 'planning' | 'presentation' | 'workshop';
  organizer: string;
  attendees: string[];
  department: string;
  location?: string;
  isVirtual: boolean;
  meetingLink?: string;
  status: 'scheduled' | 'in-progress' | 'completed' | 'cancelled';
  priority: 'low' | 'medium' | 'high' | 'critical';
  tags: string[];
  notes: string;
}

const sampleTeamMembers: TeamMember[] = [
  {
    id: '1',
    name: 'Priya Sharma',
    email: 'priya.sharma@ramnirmalchits.com',
    phone: '+91 98765 43215',
    department: 'Sales & Marketing',
    designation: 'Senior Sales Executive',
    branch: 'Bangalore Main',
    status: 'available',
    workingHours: {
      start: '09:00',
      end: '18:00',
      timezone: 'Asia/Kolkata'
    },
    currentActivity: 'Available for meetings',
    skills: ['Sales', 'Customer Relations', 'Lead Generation'],
    lastSeen: '2024-03-15T14:30:00'
  },
  {
    id: '2',
    name: 'Karthik Nair',
    email: 'karthik.nair@ramnirmalchits.com',
    phone: '+91 98765 43217',
    department: 'Operations',
    designation: 'Chit Fund Manager',
    branch: 'Bangalore South',
    status: 'busy',
    workingHours: {
      start: '09:30',
      end: '18:30',
      timezone: 'Asia/Kolkata'
    },
    currentActivity: 'In client meeting',
    nextAvailable: '15:30',
    skills: ['Chit Fund Operations', 'Customer Service', 'Team Management'],
    lastSeen: '2024-03-15T14:00:00'
  },
  {
    id: '3',
    name: 'Rajesh Kumar',
    email: 'rajesh.kumar@ramnirmalchits.com',
    phone: '+91 98765 43213',
    department: 'Operations',
    designation: 'Branch Manager',
    branch: 'Bangalore Main',
    status: 'available',
    workingHours: {
      start: '08:30',
      end: '17:30',
      timezone: 'Asia/Kolkata'
    },
    currentActivity: 'Available for discussions',
    skills: ['Management', 'Operations', 'Strategic Planning'],
    lastSeen: '2024-03-15T13:45:00'
  },
  {
    id: '4',
    name: 'Vikram Singh',
    email: 'vikram.singh@ramnirmalchits.com',
    phone: '+91 98765 43221',
    department: 'Sales & Marketing',
    designation: 'Business Development Manager',
    branch: 'Bangalore East',
    status: 'away',
    workingHours: {
      start: '09:00',
      end: '18:00',
      timezone: 'Asia/Kolkata'
    },
    currentActivity: 'Field visit',
    nextAvailable: '16:00',
    skills: ['Business Development', 'Market Research', 'Client Relations'],
    lastSeen: '2024-03-15T12:30:00'
  },
  {
    id: '5',
    name: 'Anita Desai',
    email: 'anita.desai@ramnirmalchits.com',
    phone: '+91 98765 43219',
    department: 'Customer Service',
    designation: 'Customer Relations Manager',
    branch: 'Bangalore Main',
    status: 'available',
    workingHours: {
      start: '10:00',
      end: '19:00',
      timezone: 'Asia/Kolkata'
    },
    currentActivity: 'Handling customer queries',
    skills: ['Customer Service', 'Problem Resolution', 'Communication'],
    lastSeen: '2024-03-15T14:15:00'
  },
  {
    id: '6',
    name: 'Deepika Rao',
    email: 'deepika.rao@ramnirmalchits.com',
    phone: '+91 98765 43223',
    department: 'Human Resources',
    designation: 'HR Manager',
    branch: 'Bangalore Main',
    status: 'offline',
    workingHours: {
      start: '09:00',
      end: '17:00',
      timezone: 'Asia/Kolkata'
    },
    skills: ['HR Management', 'Recruitment', 'Employee Relations'],
    lastSeen: '2024-03-14T17:00:00'
  }
];

const sampleTeamEvents: TeamEvent[] = [
  {
    id: '1',
    title: 'Weekly Sales Team Meeting',
    description: 'Review weekly performance and discuss upcoming targets',
    startTime: '10:00',
    endTime: '11:00',
    date: '2024-03-18',
    type: 'meeting',
    organizer: 'Rajesh Kumar',
    attendees: ['Priya Sharma', 'Vikram Singh', 'Sales Team'],
    department: 'Sales & Marketing',
    location: 'Conference Room A',
    isVirtual: true,
    meetingLink: 'https://meet.google.com/weekly-sales',
    status: 'scheduled',
    priority: 'high',
    tags: ['weekly', 'sales', 'performance'],
    notes: 'Bring weekly reports and target proposals'
  },
  {
    id: '2',
    title: 'Product Training - New Features',
    description: 'Training on new CRM features and system updates',
    startTime: '14:00',
    endTime: '16:00',
    date: '2024-03-19',
    type: 'training',
    organizer: 'HR Team',
    attendees: ['All Staff'],
    department: 'All Departments',
    location: 'Training Hall',
    isVirtual: false,
    status: 'scheduled',
    priority: 'medium',
    tags: ['training', 'crm', 'mandatory'],
    notes: 'Mandatory training for all team members'
  },
  {
    id: '3',
    title: 'Customer Service Review',
    description: 'Monthly review of customer service metrics and improvements',
    startTime: '11:30',
    endTime: '12:30',
    date: '2024-03-20',
    type: 'review',
    organizer: 'Anita Desai',
    attendees: ['Customer Service Team', 'Management'],
    department: 'Customer Service',
    location: 'Meeting Room B',
    isVirtual: false,
    status: 'scheduled',
    priority: 'medium',
    tags: ['review', 'customer-service', 'monthly'],
    notes: 'Prepare customer satisfaction reports'
  }
];

const TeamMemberCard: React.FC<{ member: TeamMember }> = React.memo(({ member }) => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'available': return 'bg-green-100 text-green-800 border-green-200';
      case 'busy': return 'bg-red-100 text-red-800 border-red-200';
      case 'away': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'offline': return 'bg-gray-100 text-gray-800 border-gray-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'available': return CheckCircle;
      case 'busy': return XCircle;
      case 'away': return Clock;
      case 'offline': return AlertTriangle;
      default: return Clock;
    }
  };

  const StatusIcon = getStatusIcon(member.status);

  return (
    <div className="bg-slate-800/40 backdrop-blur-xl rounded-2xl p-6 border border-yellow-400/30 hover:border-yellow-400/50 transition-all">
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center space-x-3">
          <div className="h-12 w-12 bg-slate-600/50 rounded-full flex items-center justify-center text-slate-50 font-semibold text-lg border border-yellow-400/30">
            {member.name.split(' ').map(n => n[0]).join('')}
          </div>
          <div>
            <h3 className="text-lg font-semibold text-slate-50">{member.name}</h3>
            <p className="text-sm text-slate-400">{member.designation}</p>
            <p className="text-xs text-slate-500">{member.department}</p>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium border ${getStatusColor(member.status)}`}>
            <StatusIcon className="h-3 w-3 mr-1" />
            {member.status.toUpperCase()}
          </span>
        </div>
      </div>

      <div className="space-y-2 mb-4">
        <div className="flex items-center text-sm text-slate-300">
          <Mail className="h-4 w-4 mr-2 text-slate-500" />
          <span className="truncate">{member.email}</span>
        </div>
        <div className="flex items-center text-sm text-slate-300">
          <Phone className="h-4 w-4 mr-2 text-slate-500" />
          <span>{member.phone}</span>
        </div>
        <div className="flex items-center text-sm text-slate-300">
          <Building className="h-4 w-4 mr-2 text-slate-500" />
          <span>{member.branch}</span>
        </div>
        <div className="flex items-center text-sm text-slate-300">
          <Clock className="h-4 w-4 mr-2 text-slate-500" />
          <span>{member.workingHours.start} - {member.workingHours.end}</span>
        </div>
      </div>

      {member.currentActivity && (
        <div className="mb-4 p-3 bg-slate-700/30 rounded-xl border border-yellow-400/20">
          <p className="text-sm text-slate-300">{member.currentActivity}</p>
          {member.nextAvailable && (
            <p className="text-xs text-blue-400 mt-1">Next available: {member.nextAvailable}</p>
          )}
        </div>
      )}

      {member.skills.length > 0 && (
        <div className="mb-4">
          <p className="text-xs text-slate-500 mb-2">Skills:</p>
          <div className="flex flex-wrap gap-1">
            {member.skills.slice(0, 3).map((skill, index) => (
              <span key={index} className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-blue-100 text-blue-800 border border-blue-200">
                {skill}
              </span>
            ))}
            {member.skills.length > 3 && (
              <span className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-slate-100 text-slate-800 border border-slate-200">
                +{member.skills.length - 3} more
              </span>
            )}
          </div>
        </div>
      )}

      <div className="flex justify-between items-center pt-4 border-t border-yellow-400/20">
        <div className="flex items-center text-xs text-slate-500">
          <Activity className="h-3 w-3 mr-1" />
          <span>Last seen: {new Date(member.lastSeen).toLocaleDateString()}</span>
        </div>
        <div className="flex space-x-2">
          <button className="p-2 text-slate-400 hover:text-blue-400 hover:bg-blue-500/10 rounded-lg transition-all">
            <Phone className="h-4 w-4" />
          </button>
          <button className="p-2 text-slate-400 hover:text-green-400 hover:bg-green-500/10 rounded-lg transition-all">
            <Mail className="h-4 w-4" />
          </button>
          <button className="p-2 text-slate-400 hover:text-purple-400 hover:bg-purple-500/10 rounded-lg transition-all">
            <CalendarIcon className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );
});

const TeamEventCard: React.FC<{ event: TeamEvent }> = React.memo(({ event }) => {
  const getTypeColor = (type: string) => {
    switch (type) {
      case 'meeting': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'training': return 'bg-orange-100 text-orange-800 border-orange-200';
      case 'review': return 'bg-purple-100 text-purple-800 border-purple-200';
      case 'planning': return 'bg-green-100 text-green-800 border-green-200';
      case 'presentation': return 'bg-pink-100 text-pink-800 border-pink-200';
      case 'workshop': return 'bg-indigo-100 text-indigo-800 border-indigo-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'bg-green-100 text-green-800 border-green-200';
      case 'in-progress': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'cancelled': return 'bg-red-100 text-red-800 border-red-200';
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

  return (
    <div className="bg-slate-800/40 backdrop-blur-xl rounded-2xl p-6 border border-yellow-400/30 hover:border-yellow-400/50 transition-all">
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center space-x-3">
          <div className="p-3 bg-blue-500/20 rounded-xl border border-yellow-400/30">
            <Users className="h-6 w-6 text-blue-400" />
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
            <User className="h-4 w-4 mr-2 text-slate-500" />
            <span>Organizer: {event.organizer}</span>
          </div>
          <div className="flex items-center text-sm text-slate-300">
            <Users className="h-4 w-4 mr-2 text-slate-500" />
            <span>{event.attendees.length} attendees</span>
          </div>
          <div className="flex items-center text-sm text-slate-300">
            <Building className="h-4 w-4 mr-2 text-slate-500" />
            <span>{event.department}</span>
          </div>
        </div>
      </div>

      {event.tags.length > 0 && (
        <div className="mb-4">
          <div className="flex flex-wrap gap-1">
            {event.tags.slice(0, 3).map((tag, index) => (
              <span key={index} className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-purple-100 text-purple-800 border border-purple-200">
                #{tag}
              </span>
            ))}
            {event.tags.length > 3 && (
              <span className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-slate-100 text-slate-800 border border-slate-200">
                +{event.tags.length - 3} more
              </span>
            )}
          </div>
        </div>
      )}

      <div className="flex justify-between items-center pt-4 border-t border-yellow-400/20">
        <div className="flex items-center text-xs text-slate-500">
          {event.isVirtual ? (
            <Video className="h-3 w-3 mr-1" />
          ) : (
            <MapPin className="h-3 w-3 mr-1" />
          )}
          <span>{event.isVirtual ? 'Virtual Meeting' : 'In-Person'}</span>
        </div>
        <div className="flex space-x-2">
          <button className="p-2 text-slate-400 hover:text-blue-400 hover:bg-blue-500/10 rounded-lg transition-all">
            <Eye className="h-4 w-4" />
          </button>
          <button className="p-2 text-slate-400 hover:text-green-400 hover:bg-green-500/10 rounded-lg transition-all">
            <Edit className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );
});

export const TeamView: React.FC = () => {
  const [teamMembers] = useState<TeamMember[]>(sampleTeamMembers);
  const [teamEvents] = useState<TeamEvent[]>(sampleTeamEvents);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterDepartment, setFilterDepartment] = useState<string>('all');
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [activeTab, setActiveTab] = useState<'members' | 'events'>('members');

  const filteredMembers = useMemo(() => teamMembers.filter(member => {
    const matchesSearch = member.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         member.designation.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         member.department.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesDepartment = filterDepartment === 'all' || member.department === filterDepartment;
    const matchesStatus = filterStatus === 'all' || member.status === filterStatus;
    
    return matchesSearch && matchesDepartment && matchesStatus;
  }), [teamMembers, searchTerm, filterDepartment, filterStatus]);

  const filteredEvents = useMemo(() => teamEvents.filter(event => {
    const matchesSearch = event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         event.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         event.organizer.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesDepartment = filterDepartment === 'all' || event.department === filterDepartment || event.department === 'All Departments';
    
    return matchesSearch && matchesDepartment;
  }), [teamEvents, searchTerm, filterDepartment]);

  const stats = useMemo(() => ({
    totalMembers: teamMembers.length,
    availableMembers: teamMembers.filter(m => m.status === 'available').length,
    busyMembers: teamMembers.filter(m => m.status === 'busy').length,
    awayMembers: teamMembers.filter(m => m.status === 'away').length,
    offlineMembers: teamMembers.filter(m => m.status === 'offline').length,
    departments: new Set(teamMembers.map(m => m.department)).size,
    totalEvents: teamEvents.length,
    todayEvents: teamEvents.filter(e => e.date === new Date().toISOString().split('T')[0]).length,
    upcomingEvents: teamEvents.filter(e => new Date(e.date + 'T' + e.startTime) > new Date()).length,
    meetings: teamEvents.filter(e => e.type === 'meeting').length,
    trainings: teamEvents.filter(e => e.type === 'training').length
  }), [teamMembers, teamEvents]);

  const uniqueDepartments = useMemo(() => [...new Set(teamMembers.map(m => m.department))], [teamMembers]);

  const tabs = [
    { id: 'members', name: 'Team Members', icon: Users, count: teamMembers.length },
    { id: 'events', name: 'Team Events', icon: CalendarIcon, count: teamEvents.length }
  ];

  return (
    <div className="h-full flex flex-col bg-slate-900 overflow-hidden">
      {/* Header */}
      <div className="flex justify-between items-center p-4 border-b border-yellow-400/30 flex-shrink-0">
        <div>
          <h1 className="text-2xl font-bold text-slate-50">Team View</h1>
          <p className="mt-1 text-sm text-slate-400">
            Monitor team availability, schedules, and collaborative events
          </p>
        </div>
        <div className="flex space-x-3">
          <div className="flex bg-slate-700/50 backdrop-blur-sm rounded-lg p-1 border border-yellow-400/20">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as 'members' | 'events')}
                  className={`px-3 py-1 text-sm rounded-md transition-colors flex items-center ${
                    activeTab === tab.id
                      ? 'bg-blue-500 text-slate-50'
                      : 'text-slate-300 hover:text-slate-50'
                  }`}
                >
                  <Icon className="h-4 w-4 mr-2" />
                  {tab.name}
                  <span className="ml-2 bg-slate-700/50 text-slate-300 px-2 py-1 rounded-full text-xs">
                    {tab.count}
                  </span>
                </button>
              );
            })}
          </div>
          <button className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-lg shadow-sm text-white bg-blue-600 hover:bg-blue-700 transition-all">
            <Plus className="h-4 w-4 mr-2" />
            {activeTab === 'members' ? 'Add Member' : 'Create Event'}
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto p-4 space-y-6 scrollbar-none">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-5 lg:grid-cols-10 gap-4">
          <div className="bg-slate-800/40 backdrop-blur-xl p-4 rounded-xl border border-yellow-400/30">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-400">Total Members</p>
                <p className="text-2xl font-bold text-slate-50">{stats.totalMembers}</p>
              </div>
              <Users className="h-8 w-8 text-blue-400" />
            </div>
          </div>
          <div className="bg-slate-800/40 backdrop-blur-xl p-4 rounded-xl border border-yellow-400/30">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-400">Available</p>
                <p className="text-2xl font-bold text-green-400">{stats.availableMembers}</p>
              </div>
              <CheckCircle className="h-8 w-8 text-green-400" />
            </div>
          </div>
          <div className="bg-slate-800/40 backdrop-blur-xl p-4 rounded-xl border border-yellow-400/30">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-400">Busy</p>
                <p className="text-2xl font-bold text-red-400">{stats.busyMembers}</p>
              </div>
              <XCircle className="h-8 w-8 text-red-400" />
            </div>
          </div>
          <div className="bg-slate-800/40 backdrop-blur-xl p-4 rounded-xl border border-yellow-400/30">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-400">Away</p>
                <p className="text-2xl font-bold text-yellow-400">{stats.awayMembers}</p>
              </div>
              <Clock className="h-8 w-8 text-yellow-400" />
            </div>
          </div>
          <div className="bg-slate-800/40 backdrop-blur-xl p-4 rounded-xl border border-yellow-400/30">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-400">Departments</p>
                <p className="text-2xl font-bold text-purple-400">{stats.departments}</p>
              </div>
              <Building className="h-8 w-8 text-purple-400" />
            </div>
          </div>
          <div className="bg-slate-800/40 backdrop-blur-xl p-4 rounded-xl border border-yellow-400/30">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-400">Total Events</p>
                <p className="text-2xl font-bold text-orange-400">{stats.totalEvents}</p>
              </div>
              <CalendarIcon className="h-8 w-8 text-orange-400" />
            </div>
          </div>
          <div className="bg-slate-800/40 backdrop-blur-xl p-4 rounded-xl border border-yellow-400/30">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-400">Today</p>
                <p className="text-2xl font-bold text-emerald-400">{stats.todayEvents}</p>
              </div>
              <Star className="h-8 w-8 text-emerald-400" />
            </div>
          </div>
          <div className="bg-slate-800/40 backdrop-blur-xl p-4 rounded-xl border border-yellow-400/30">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-400">Upcoming</p>
                <p className="text-2xl font-bold text-indigo-400">{stats.upcomingEvents}</p>
              </div>
              <TrendingUp className="h-8 w-8 text-indigo-400" />
            </div>
          </div>
          <div className="bg-slate-800/40 backdrop-blur-xl p-4 rounded-xl border border-yellow-400/30">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-400">Meetings</p>
                <p className="text-2xl font-bold text-pink-400">{stats.meetings}</p>
              </div>
              <Users className="h-8 w-8 text-pink-400" />
            </div>
          </div>
          <div className="bg-slate-800/40 backdrop-blur-xl p-4 rounded-xl border border-yellow-400/30">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-400">Trainings</p>
                <p className="text-2xl font-bold text-cyan-400">{stats.trainings}</p>
              </div>
              <Award className="h-8 w-8 text-cyan-400" />
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
                placeholder={`Search ${activeTab}...`}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-2 bg-slate-700/50 border border-yellow-400/30 rounded-lg w-full text-slate-50 placeholder-slate-400 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 backdrop-blur-sm"
              />
            </div>
            <select
              value={filterDepartment}
              onChange={(e) => setFilterDepartment(e.target.value)}
              className="px-3 py-2 bg-slate-700/50 border border-yellow-400/30 rounded-lg text-slate-50 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 backdrop-blur-sm"
            >
              <option value="all">All Departments</option>
              {uniqueDepartments.map(dept => (
                <option key={dept} value={dept}>{dept}</option>
              ))}
            </select>
            {activeTab === 'members' && (
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="px-3 py-2 bg-slate-700/50 border border-yellow-400/30 rounded-lg text-slate-50 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 backdrop-blur-sm"
              >
                <option value="all">All Status</option>
                <option value="available">Available</option>
                <option value="busy">Busy</option>
                <option value="away">Away</option>
                <option value="offline">Offline</option>
              </select>
            )}
            <div className="text-sm text-slate-400">
              Showing: <span className="font-semibold text-slate-50">
                {activeTab === 'members' ? filteredMembers.length : filteredEvents.length}
              </span> {activeTab}
            </div>
          </div>
        </div>

        {/* Content Display */}
        {activeTab === 'members' ? (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {filteredMembers.map((member) => (
              <TeamMemberCard key={member.id} member={member} />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {filteredEvents.map((event) => (
              <TeamEventCard key={event.id} event={event} />
            ))}
          </div>
        )}

        {((activeTab === 'members' && filteredMembers.length === 0) || 
          (activeTab === 'events' && filteredEvents.length === 0)) && (
          <div className="text-center py-12">
            {activeTab === 'members' ? (
              <Users className="h-12 w-12 mx-auto text-slate-500 mb-4" />
            ) : (
              <CalendarIcon className="h-12 w-12 mx-auto text-slate-500 mb-4" />
            )}
            <h3 className="text-lg font-medium text-slate-50 mb-2">
              No {activeTab} found
            </h3>
            <p className="text-sm text-slate-400">Try adjusting your search criteria or filters.</p>
          </div>
        )}
      </div>
    </div>
  );
};