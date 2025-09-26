import React, { useState, useMemo } from 'react';
import {
  ChevronLeft,
  ChevronRight,
  Plus,
  Search,
  Filter,
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
  Download,
  Settings,
  MoreVertical,
  User,
  Building,
  Flag,
  Zap,
  Eye,
  Edit,
  Trash2
} from 'lucide-react';

interface CalendarEvent {
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
  tags: string[];
  notes: string;
}

const sampleEvents: CalendarEvent[] = [
  {
    id: '1',
    title: 'Client Meeting - TechCorp',
    description: 'Present premium chit scheme proposal',
    startTime: '10:00',
    endTime: '11:30',
    date: '2024-03-16',
    type: 'meeting',
    priority: 'high',
    status: 'scheduled',
    attendees: ['Priya Sharma', 'Rajesh Gupta'],
    location: 'TechCorp Office',
    isVirtual: false,
    createdBy: 'Priya Sharma',
    assignedTo: 'Priya Sharma',
    relatedTo: {
      type: 'lead',
      id: 'lead_001',
      name: 'TechCorp Solutions'
    },
    tags: ['sales', 'proposal', 'high-value'],
    notes: 'Bring printed proposal and business cards'
  },
  {
    id: '2',
    title: 'Premium Gold A1 Auction',
    description: 'Monthly auction for Premium Gold chit group',
    startTime: '14:00',
    endTime: '16:00',
    date: '2024-03-18',
    type: 'auction',
    priority: 'critical',
    status: 'scheduled',
    attendees: ['Karthik Nair', 'All Group Members'],
    location: 'Branch Office - Main Hall',
    isVirtual: false,
    createdBy: 'Karthik Nair',
    assignedTo: 'Karthik Nair',
    relatedTo: {
      type: 'group',
      id: 'group_001',
      name: 'Premium Gold A1'
    },
    tags: ['auction', 'chit-group', 'monthly'],
    notes: 'Ensure all members are notified and documents are ready'
  },
  {
    id: '3',
    title: 'Follow-up Call - Sunita Reddy',
    description: 'Follow-up on silver scheme interest',
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
    tags: ['follow-up', 'sales'],
    notes: 'Prepare answers for common questions'
  },
  {
    id: '4',
    title: 'Team Training - Digital Tools',
    description: 'Training on new CRM and digital marketing tools',
    startTime: '11:00',
    endTime: '12:30',
    date: '2024-03-19',
    type: 'training',
    priority: 'medium',
    status: 'scheduled',
    attendees: ['All Sales Team'],
    location: 'Training Room',
    isVirtual: false,
    createdBy: 'HR Team',
    assignedTo: 'Priya Sharma',
    tags: ['training', 'digital-tools', 'mandatory'],
    notes: 'Mandatory training session for all sales staff'
  },
  {
    id: '5',
    title: 'Monthly Sales Review',
    description: 'Review March performance and set April targets',
    startTime: '09:00',
    endTime: '10:30',
    date: '2024-03-20',
    type: 'meeting',
    priority: 'high',
    status: 'scheduled',
    attendees: ['Priya Sharma', 'Rajesh Kumar', 'Sales Team'],
    location: 'Conference Room A',
    isVirtual: true,
    meetingLink: 'https://meet.google.com/sales-review',
    createdBy: 'Rajesh Kumar',
    assignedTo: 'Priya Sharma',
    tags: ['review', 'sales', 'monthly'],
    notes: 'Prepare sales report and target proposals'
  },
  {
    id: '6',
    title: 'Customer Visit - StartupInc',
    description: 'Site visit to discuss startup chit options',
    startTime: '15:30',
    endTime: '16:30',
    date: '2024-03-21',
    type: 'meeting',
    priority: 'medium',
    status: 'scheduled',
    attendees: ['Priya Sharma'],
    location: 'StartupInc Office, HSR Layout',
    isVirtual: false,
    createdBy: 'Priya Sharma',
    assignedTo: 'Priya Sharma',
    relatedTo: {
      type: 'lead',
      id: 'lead_003',
      name: 'StartupInc'
    },
    tags: ['customer-visit', 'startup'],
    notes: 'Discuss flexible payment options'
  }
];

const CalendarGrid: React.FC<{ 
  currentDate: Date; 
  events: CalendarEvent[];
  onDateClick: (date: Date) => void;
}> = ({ currentDate, events, onDateClick }) => {
  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDayOfWeek = firstDay.getDay();

    const days = [];
    
    // Add empty cells for days before the first day of the month
    for (let i = 0; i < startingDayOfWeek; i++) {
      days.push(null);
    }
    
    // Add days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      days.push(new Date(year, month, day));
    }
    
    return days;
  };

  const getEventsForDate = (date: Date | null) => {
    if (!date) return [];
    const dateString = date.toISOString().split('T')[0];
    return events.filter(event => event.date === dateString);
  };

  const days = getDaysInMonth(currentDate);
  const today = new Date().toDateString();

  return (
    <div className="bg-slate-800/40 backdrop-blur-xl rounded-2xl border border-yellow-400/30 overflow-hidden">
      {/* Calendar Header */}
      <div className="grid grid-cols-7 bg-slate-700/50 border-b border-yellow-400/20">
        {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
          <div key={day} className="p-4 text-center text-sm font-medium text-slate-300 border-r border-yellow-400/20 last:border-r-0">
            {day}
          </div>
        ))}
      </div>

      {/* Calendar Body */}
      <div className="grid grid-cols-7">
        {days.map((date, index) => {
          const dayEvents = getEventsForDate(date);
          const isToday = date?.toDateString() === today;
          const isCurrentMonth = date?.getMonth() === currentDate.getMonth();

          return (
            <div
              key={index}
              onClick={() => date && onDateClick(date)}
              className={`min-h-[120px] p-2 border-r border-b border-yellow-400/20 last:border-r-0 cursor-pointer hover:bg-slate-700/20 transition-all ${
                isToday ? 'bg-blue-500/10 border-blue-500/30' : ''
              } ${!isCurrentMonth ? 'opacity-50' : ''}`}
            >
              {date && (
                <>
                  <div className={`text-sm font-medium mb-2 ${
                    isToday ? 'text-blue-400' : 'text-slate-50'
                  }`}>
                    {date.getDate()}
                  </div>
                  <div className="space-y-1">
                    {dayEvents.slice(0, 3).map((event) => (
                      <div
                        key={event.id}
                        className={`text-xs p-1 rounded truncate ${
                          event.type === 'meeting' ? 'bg-blue-500/20 text-blue-300' :
                          event.type === 'call' ? 'bg-green-500/20 text-green-300' :
                          event.type === 'auction' ? 'bg-purple-500/20 text-purple-300' :
                          event.type === 'deadline' ? 'bg-red-500/20 text-red-300' :
                          'bg-gray-500/20 text-gray-300'
                        }`}
                      >
                        {event.startTime} {event.title}
                      </div>
                    ))}
                    {dayEvents.length > 3 && (
                      <div className="text-xs text-slate-400 text-center">
                        +{dayEvents.length - 3} more
                      </div>
                    )}
                  </div>
                </>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

const EventCard: React.FC<{ event: CalendarEvent }> = ({ event }) => {
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
    <div className="bg-slate-800/40 backdrop-blur-xl rounded-xl p-4 border border-yellow-400/30 hover:border-yellow-400/50 transition-all">
      <div className="flex items-start justify-between mb-3">
        <div>
          <h4 className="text-slate-50 font-medium mb-1">{event.title}</h4>
          <p className="text-slate-400 text-sm">{event.description}</p>
        </div>
        <div className="flex items-center space-x-2">
          <div className={`w-3 h-3 rounded-full ${getPriorityColor(event.priority)}`}></div>
          <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium border ${getTypeColor(event.type)}`}>
            {event.type}
          </span>
        </div>
      </div>

      <div className="space-y-2 text-sm text-slate-300">
        <div className="flex items-center">
          <Clock className="h-4 w-4 mr-2 text-slate-500" />
          <span>{event.startTime} - {event.endTime}</span>
        </div>
        {event.location && (
          <div className="flex items-center">
            <MapPin className="h-4 w-4 mr-2 text-slate-500" />
            <span className="truncate">{event.location}</span>
          </div>
        )}
        <div className="flex items-center">
          <Users className="h-4 w-4 mr-2 text-slate-500" />
          <span>{event.attendees.length} attendees</span>
        </div>
      </div>

      <div className="flex justify-end space-x-2 mt-3 pt-3 border-t border-yellow-400/20">
        <button className="p-1 text-slate-400 hover:text-blue-400 hover:bg-blue-500/10 rounded transition-all">
          <Eye className="h-3 w-3" />
        </button>
        <button className="p-1 text-slate-400 hover:text-green-400 hover:bg-green-500/10 rounded transition-all">
          <Edit className="h-3 w-3" />
        </button>
      </div>
    </div>
  );
};

export const MonthWeekDay: React.FC = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [viewMode, setViewMode] = useState<'month' | 'week' | 'day'>('month');
  const [events] = useState<CalendarEvent[]>(sampleEvents);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState<string>('all');
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);

  const filteredEvents = useMemo(() => events.filter(event => {
    const matchesSearch = event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         event.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = filterType === 'all' || event.type === filterType;
    
    return matchesSearch && matchesType;
  }), [events, searchTerm, filterType]);

  const stats = useMemo(() => {
    const now = new Date();
    const today = now.toISOString().split('T')[0];
    const thisMonth = now.getMonth();
    const thisYear = now.getFullYear();

    return {
      totalEvents: events.length,
      todayEvents: events.filter(e => e.date === today).length,
      thisMonthEvents: events.filter(e => {
        const eventDate = new Date(e.date);
        return eventDate.getMonth() === thisMonth && eventDate.getFullYear() === thisYear;
      }).length,
      upcomingEvents: events.filter(e => new Date(e.date + 'T' + e.startTime) > now).length,
      meetings: events.filter(e => e.type === 'meeting').length,
      calls: events.filter(e => e.type === 'call').length,
      auctions: events.filter(e => e.type === 'auction').length,
      highPriority: events.filter(e => e.priority === 'high' || e.priority === 'critical').length,
      completed: events.filter(e => e.status === 'completed').length,
      scheduled: events.filter(e => e.status === 'scheduled').length
    };
  }, [events]);

  const navigateMonth = (direction: 'prev' | 'next') => {
    setCurrentDate(prev => {
      const newDate = new Date(prev);
      if (direction === 'prev') {
        newDate.setMonth(prev.getMonth() - 1);
      } else {
        newDate.setMonth(prev.getMonth() + 1);
      }
      return newDate;
    });
  };

  const goToToday = () => {
    setCurrentDate(new Date());
  };

  const handleDateClick = (date: Date) => {
    setSelectedDate(date);
  };

  const getSelectedDateEvents = () => {
    if (!selectedDate) return [];
    const dateString = selectedDate.toISOString().split('T')[0];
    return events.filter(event => event.date === dateString);
  };

  return (
    <div className="h-full flex flex-col bg-slate-900 overflow-hidden">
      {/* Header */}
      <div className="flex justify-between items-center p-4 border-b border-yellow-400/30 flex-shrink-0">
        <div>
          <h1 className="text-2xl font-bold text-slate-50">Calendar - {viewMode.charAt(0).toUpperCase() + viewMode.slice(1)} View</h1>
          <p className="mt-1 text-sm text-slate-400">
            Manage events, meetings, and important activities across different time views
          </p>
        </div>
        <div className="flex space-x-3">
          <div className="flex bg-slate-700/50 backdrop-blur-sm rounded-lg p-1 border border-yellow-400/20">
            <button
              onClick={() => setViewMode('month')}
              className={`px-3 py-1 text-sm rounded-md transition-colors ${
                viewMode === 'month'
                  ? 'bg-blue-500 text-slate-50'
                  : 'text-slate-300 hover:text-slate-50'
              }`}
            >
              Month
            </button>
            <button
              onClick={() => setViewMode('week')}
              className={`px-3 py-1 text-sm rounded-md transition-colors ${
                viewMode === 'week'
                  ? 'bg-blue-500 text-slate-50'
                  : 'text-slate-300 hover:text-slate-50'
              }`}
            >
              Week
            </button>
            <button
              onClick={() => setViewMode('day')}
              className={`px-3 py-1 text-sm rounded-md transition-colors ${
                viewMode === 'day'
                  ? 'bg-blue-500 text-slate-50'
                  : 'text-slate-300 hover:text-slate-50'
              }`}
            >
              Day
            </button>
          </div>
          <button className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-lg shadow-sm text-white bg-blue-600 hover:bg-blue-700 transition-all">
            <Plus className="h-4 w-4 mr-2" />
            Create Event
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
                <p className="text-sm text-slate-400">This Month</p>
                <p className="text-2xl font-bold text-purple-400">{stats.thisMonthEvents}</p>
              </div>
              <Target className="h-8 w-8 text-purple-400" />
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
          <div className="bg-slate-800/40 backdrop-blur-xl p-4 rounded-xl border border-yellow-400/30">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-400">Auctions</p>
                <p className="text-2xl font-bold text-purple-400">{stats.auctions}</p>
              </div>
              <Star className="h-8 w-8 text-purple-400" />
            </div>
          </div>
          <div className="bg-slate-800/40 backdrop-blur-xl p-4 rounded-xl border border-yellow-400/30">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-400">High Priority</p>
                <p className="text-2xl font-bold text-red-400">{stats.highPriority}</p>
              </div>
              <AlertTriangle className="h-8 w-8 text-red-400" />
            </div>
          </div>
          <div className="bg-slate-800/40 backdrop-blur-xl p-4 rounded-xl border border-yellow-400/30">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-400">Completed</p>
                <p className="text-2xl font-bold text-emerald-400">{stats.completed}</p>
              </div>
              <CheckCircle className="h-8 w-8 text-emerald-400" />
            </div>
          </div>
          <div className="bg-slate-800/40 backdrop-blur-xl p-4 rounded-xl border border-yellow-400/30">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-400">Scheduled</p>
                <p className="text-2xl font-bold text-yellow-400">{stats.scheduled}</p>
              </div>
              <Flag className="h-8 w-8 text-yellow-400" />
            </div>
          </div>
        </div>

        {/* Calendar Navigation */}
        <div className="bg-slate-800/40 backdrop-blur-xl rounded-xl p-4 border border-yellow-400/30">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <button
                onClick={() => navigateMonth('prev')}
                className="p-2 text-slate-400 hover:text-slate-50 hover:bg-slate-700/50 rounded-lg transition-all border border-yellow-400/20 hover:border-yellow-400/40"
              >
                <ChevronLeft className="h-5 w-5" />
              </button>
              <h2 className="text-xl font-semibold text-slate-50">
                {currentDate.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
              </h2>
              <button
                onClick={() => navigateMonth('next')}
                className="p-2 text-slate-400 hover:text-slate-50 hover:bg-slate-700/50 rounded-lg transition-all border border-yellow-400/20 hover:border-yellow-400/40"
              >
                <ChevronRight className="h-5 w-5" />
              </button>
            </div>
            
            <div className="flex items-center space-x-3">
              <button
                onClick={goToToday}
                className="px-4 py-2 text-sm font-medium text-slate-50 bg-slate-700/50 border border-yellow-400/30 rounded-lg hover:bg-slate-700 transition-all backdrop-blur-sm"
              >
                Today
              </button>
              
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-500 h-4 w-4" />
                <input
                  type="text"
                  placeholder="Search events..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 pr-4 py-2 bg-slate-700/50 border border-yellow-400/30 rounded-lg text-slate-50 placeholder-slate-400 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 backdrop-blur-sm w-64"
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
                <option value="auction">Auctions</option>
                <option value="training">Training</option>
                <option value="deadline">Deadlines</option>
              </select>
            </div>
          </div>
        </div>

        {/* Main Calendar Content */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Calendar Grid */}
          <div className="lg:col-span-3">
            <CalendarGrid 
              currentDate={currentDate}
              events={filteredEvents}
              onDateClick={handleDateClick}
            />
          </div>

          {/* Side Panel */}
          <div className="space-y-6">
            {/* Selected Date Events */}
            {selectedDate && (
              <div className="bg-slate-800/40 backdrop-blur-xl rounded-2xl p-6 border border-yellow-400/30">
                <h3 className="text-lg font-semibold text-slate-50 mb-4">
                  {selectedDate.toLocaleDateString('en-US', { 
                    weekday: 'long', 
                    month: 'long', 
                    day: 'numeric' 
                  })}
                </h3>
                <div className="space-y-3">
                  {getSelectedDateEvents().length > 0 ? (
                    getSelectedDateEvents().map((event) => (
                      <EventCard key={event.id} event={event} />
                    ))
                  ) : (
                    <div className="text-center py-8">
                      <CalendarIcon className="h-8 w-8 mx-auto text-slate-500 mb-2" />
                      <p className="text-slate-400 text-sm">No events on this date</p>
                      <button className="mt-2 text-blue-400 hover:text-blue-300 text-sm">
                        + Add Event
                      </button>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Quick Actions */}
            <div className="bg-slate-800/40 backdrop-blur-xl rounded-2xl p-6 border border-yellow-400/30">
              <h3 className="text-lg font-semibold text-slate-50 mb-4">Quick Actions</h3>
              <div className="space-y-3">
                <button className="w-full flex items-center space-x-3 p-3 bg-slate-700/30 hover:bg-slate-700/50 rounded-xl border border-yellow-400/20 hover:border-yellow-400/40 transition-all">
                  <Users className="h-5 w-5 text-blue-400" />
                  <span className="text-slate-50">Schedule Meeting</span>
                </button>
                <button className="w-full flex items-center space-x-3 p-3 bg-slate-700/30 hover:bg-slate-700/50 rounded-xl border border-yellow-400/20 hover:border-yellow-400/40 transition-all">
                  <Phone className="h-5 w-5 text-green-400" />
                  <span className="text-slate-50">Schedule Call</span>
                </button>
                <button className="w-full flex items-center space-x-3 p-3 bg-slate-700/30 hover:bg-slate-700/50 rounded-xl border border-yellow-400/20 hover:border-yellow-400/40 transition-all">
                  <Star className="h-5 w-5 text-purple-400" />
                  <span className="text-slate-50">Plan Auction</span>
                </button>
                <button className="w-full flex items-center space-x-3 p-3 bg-slate-700/30 hover:bg-slate-700/50 rounded-xl border border-yellow-400/20 hover:border-yellow-400/40 transition-all">
                  <Bell className="h-5 w-5 text-orange-400" />
                  <span className="text-slate-50">Set Reminder</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};