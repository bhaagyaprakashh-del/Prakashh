import React, { useState, useMemo } from 'react';
import {
  Plus,
  Search,
  Filter,
  Calendar,
  Clock,
  Users,
  CheckCircle,
  AlertTriangle,
  Play,
  Pause,
  RotateCcw,
  Eye,
  Edit,
  Trash2,
  MessageSquare,
  Paperclip,
  Star,
  Flag,
  User,
  Target,
  Award,
  TrendingUp,
  Zap,
  MoreVertical,
  Download,
  Upload
} from 'lucide-react';
import { Task } from '../../types/tasks';

const sampleTasks: Task[] = [
  {
    id: '1',
    title: 'Follow up with TechCorp Solutions',
    description: 'Call Rajesh Gupta to discuss premium chit scheme proposal',
    type: 'call',
    priority: 'high',
    status: 'todo',
    assignedTo: 'Priya Sharma',
    assignedBy: 'Rajesh Kumar',
    dueDate: '2024-03-16',
    estimatedHours: 1,
    leadId: 'lead_001',
    tags: ['sales', 'follow-up'],
    attachments: [],
    comments: [],
    subtasks: [],
    createdAt: '2024-03-15',
    updatedAt: '2024-03-15',
    watchers: ['Rajesh Kumar'],
    collaborators: [],
    progressPercentage: 0
  },
  {
    id: '2',
    title: 'Prepare monthly sales report',
    description: 'Compile sales data for March 2024',
    type: 'documentation',
    priority: 'medium',
    status: 'in-progress',
    assignedTo: 'Karthik Nair',
    assignedBy: 'Rajesh Kumar',
    dueDate: '2024-03-20',
    estimatedHours: 4,
    actualHours: 2,
    tags: ['reporting', 'sales'],
    attachments: [],
    comments: [],
    subtasks: [],
    createdAt: '2024-03-14',
    updatedAt: '2024-03-15',
    startedAt: '2024-03-15T09:00:00',
    watchers: [],
    collaborators: [],
    progressPercentage: 60
  }
];

export const MyTasks: React.FC = () => {
  const [tasks] = useState<Task[]>(sampleTasks);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [viewMode, setViewMode] = useState<'my' | 'team'>('my');

  const currentUser = 'Priya Sharma';

  const filteredTasks = useMemo(() => {
    let filtered = tasks;

    if (viewMode === 'my') {
      filtered = filtered.filter(task => task.assignedTo === currentUser);
    }

    return filtered.filter(task => {
      const matchesSearch = task.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           task.description.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesStatus = filterStatus === 'all' || task.status === filterStatus;
      
      return matchesSearch && matchesStatus;
    });
  }, [tasks, searchTerm, filterStatus, viewMode, currentUser]);

  const stats = useMemo(() => ({
    total: viewMode === 'my' ? tasks.filter(t => t.assignedTo === currentUser).length : tasks.length,
    todo: filteredTasks.filter(t => t.status === 'todo').length,
    inProgress: filteredTasks.filter(t => t.status === 'in-progress').length,
    review: filteredTasks.filter(t => t.status === 'review').length,
    completed: filteredTasks.filter(t => t.status === 'completed').length,
    blocked: filteredTasks.filter(t => t.status === 'blocked').length,
    overdue: filteredTasks.filter(t => new Date(t.dueDate) < new Date() && t.status !== 'completed').length
  }), [filteredTasks, viewMode, tasks, currentUser]);

  return (
    <div className="h-full flex flex-col bg-slate-900 overflow-hidden">
      {/* Header */}
      <div className="flex justify-between items-center p-4 border-b border-yellow-400/30 flex-shrink-0">
        <div>
          <h1 className="text-2xl font-bold text-slate-50">
            {viewMode === 'my' ? 'My Tasks' : 'Team Tasks'}
          </h1>
          <p className="mt-1 text-sm text-slate-400">
            {viewMode === 'my' 
              ? 'Manage your personal tasks and assignments'
              : 'Overview of all team tasks and collaborative work'
            }
          </p>
        </div>
        <div className="flex space-x-3">
          <div className="flex bg-slate-700/50 backdrop-blur-sm rounded-lg p-1 border border-yellow-400/20">
            <button
              onClick={() => setViewMode('my')}
              className={`px-3 py-1 text-sm rounded-md transition-colors ${
                viewMode === 'my'
                  ? 'bg-blue-500 text-slate-50'
                  : 'text-slate-300 hover:text-slate-50'
              }`}
            >
              My Tasks
            </button>
            <button
              onClick={() => setViewMode('team')}
              className={`px-3 py-1 text-sm rounded-md transition-colors ${
                viewMode === 'team'
                  ? 'bg-blue-500 text-slate-50'
                  : 'text-slate-300 hover:text-slate-50'
              }`}
            >
              Team Tasks
            </button>
          </div>
          <button className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-lg shadow-sm text-white bg-blue-600 hover:bg-blue-700 transition-all">
            <Plus className="h-4 w-4 mr-2" />
            New Task
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto p-4 space-y-6 scrollbar-none">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 lg:grid-cols-7 gap-4">
          <div className="bg-slate-800/40 backdrop-blur-xl p-4 rounded-xl border border-yellow-400/30">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-400">Total Tasks</p>
                <p className="text-2xl font-bold text-slate-50">{stats.total}</p>
              </div>
              <CheckCircle className="h-8 w-8 text-blue-400" />
            </div>
          </div>
          <div className="bg-slate-800/40 backdrop-blur-xl p-4 rounded-xl border border-yellow-400/30">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-400">To Do</p>
                <p className="text-2xl font-bold text-yellow-400">{stats.todo}</p>
              </div>
              <Clock className="h-8 w-8 text-yellow-400" />
            </div>
          </div>
          <div className="bg-slate-800/40 backdrop-blur-xl p-4 rounded-xl border border-yellow-400/30">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-400">In Progress</p>
                <p className="text-2xl font-bold text-blue-400">{stats.inProgress}</p>
              </div>
              <Play className="h-8 w-8 text-blue-400" />
            </div>
          </div>
          <div className="bg-slate-800/40 backdrop-blur-xl p-4 rounded-xl border border-yellow-400/30">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-400">Review</p>
                <p className="text-2xl font-bold text-purple-400">{stats.review}</p>
              </div>
              <Eye className="h-8 w-8 text-purple-400" />
            </div>
          </div>
          <div className="bg-slate-800/40 backdrop-blur-xl p-4 rounded-xl border border-yellow-400/30">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-400">Completed</p>
                <p className="text-2xl font-bold text-green-400">{stats.completed}</p>
              </div>
              <Award className="h-8 w-8 text-green-400" />
            </div>
          </div>
          <div className="bg-slate-800/40 backdrop-blur-xl p-4 rounded-xl border border-yellow-400/30">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-400">Blocked</p>
                <p className="text-2xl font-bold text-red-400">{stats.blocked}</p>
              </div>
              <AlertTriangle className="h-8 w-8 text-red-400" />
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
                placeholder="Search tasks..."
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
              <option value="todo">To Do</option>
              <option value="in-progress">In Progress</option>
              <option value="review">Review</option>
              <option value="completed">Completed</option>
              <option value="blocked">Blocked</option>
            </select>
            <div className="text-sm text-slate-400">
              Showing: <span className="font-semibold text-slate-50">{filteredTasks.length}</span> tasks
            </div>
          </div>
        </div>

        {/* Tasks Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {filteredTasks.map((task) => (
            <div key={task.id} className="bg-slate-800/40 backdrop-blur-xl rounded-2xl p-6 border border-yellow-400/30">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="text-lg font-semibold text-slate-50">{task.title}</h3>
                  <p className="text-sm text-slate-400 capitalize">{task.type}</p>
                </div>
                <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                  task.status === 'completed' ? 'bg-green-100 text-green-800' :
                  task.status === 'in-progress' ? 'bg-blue-100 text-blue-800' :
                  task.status === 'todo' ? 'bg-yellow-100 text-yellow-800' :
                  'bg-gray-100 text-gray-800'
                }`}>
                  {task.status.replace('-', ' ').toUpperCase()}
                </span>
              </div>

              <p className="text-sm text-slate-300 mb-4">{task.description}</p>

              <div className="space-y-2 mb-4">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-slate-400">Assigned To</span>
                  <span className="text-slate-50 font-medium">{task.assignedTo}</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-slate-400">Due Date</span>
                  <span className="text-slate-50">{new Date(task.dueDate).toLocaleDateString()}</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-slate-400">Estimated</span>
                  <span className="text-slate-300">{task.estimatedHours}h</span>
                </div>
              </div>

              {/* Progress Bar */}
              <div className="mb-4">
                <div className="flex justify-between text-sm text-slate-400 mb-1">
                  <span>Progress</span>
                  <span>{task.progressPercentage}%</span>
                </div>
                <div className="w-full bg-slate-700/50 rounded-full h-2 border border-yellow-400/20">
                  <div
                    className="bg-gradient-to-r from-blue-500 to-green-500 h-2 rounded-full transition-all duration-300"
                    style={{ width: `${task.progressPercentage}%` }}
                  ></div>
                </div>
              </div>

              <div className="flex justify-between items-center pt-4 border-t border-yellow-400/20">
                <div className="flex items-center text-xs text-slate-500">
                  <Calendar className="h-3 w-3 mr-1" />
                  <span>Created {new Date(task.createdAt).toLocaleDateString()}</span>
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
          ))}
        </div>

        {filteredTasks.length === 0 && (
          <div className="text-center py-12">
            <CheckCircle className="h-12 w-12 mx-auto text-slate-500 mb-4" />
            <h3 className="text-lg font-medium text-slate-50 mb-2">No tasks found</h3>
            <p className="text-sm text-slate-400">
              {viewMode === 'my' 
                ? 'You have no tasks assigned. Great job staying on top of your work!'
                : 'No team tasks match your current filters.'
              }
            </p>
          </div>
        )}
      </div>
    </div>
  );
};