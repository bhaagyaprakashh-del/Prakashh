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
import { tasksStorage } from '../../utils/tasksStorage';
import toast from 'react-hot-toast';

export const MyTasks: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [viewMode, setViewMode] = useState<'my' | 'team'>('my');
  const [showTaskForm, setShowTaskForm] = useState(false);
  const [editingTask, setEditingTask] = useState<Task | null>(null);

  const currentUser = 'Priya Sharma';

  // Load tasks on component mount
  useEffect(() => {
    const loadedTasks = tasksStorage.getTasks();
    setTasks(loadedTasks);
  }, []);

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

  const handleCreateTask = () => {
    setEditingTask(null);
    setShowTaskForm(true);
  };

  const handleEditTask = (task: Task) => {
    setEditingTask(task);
    setShowTaskForm(true);
  };

  const handleDeleteTask = async (taskId: string) => {
    if (window.confirm('Are you sure you want to delete this task?')) {
      try {
        tasksStorage.deleteTask(taskId);
        setTasks(tasksStorage.getTasks());
        toast.success('Task deleted successfully');
      } catch (error) {
        toast.error('Failed to delete task');
      }
    }
  };

  const handleStatusChange = async (taskId: string, newStatus: Task['status']) => {
    try {
      tasksStorage.updateTaskStatus(taskId, newStatus);
      setTasks(tasksStorage.getTasks());
      toast.success(`Task status updated to ${newStatus}`);
    } catch (error) {
      toast.error('Failed to update task status');
    }
  };

  const handleTaskSubmit = async (taskData: Partial<Task>) => {
    try {
      if (editingTask) {
        const updatedTask = { ...editingTask, ...taskData } as Task;
        tasksStorage.updateTask(updatedTask);
        toast.success('Task updated successfully');
      } else {
        const newTask: Task = {
          id: Date.now().toString(),
          title: taskData.title!,
          description: taskData.description!,
          type: taskData.type!,
          priority: taskData.priority!,
          status: 'todo',
          assignedTo: taskData.assignedTo!,
          assignedBy: currentUser,
          dueDate: taskData.dueDate!,
          estimatedHours: taskData.estimatedHours!,
          tags: taskData.tags || [],
          attachments: [],
          comments: [],
          subtasks: [],
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
          watchers: [],
          collaborators: [],
          progressPercentage: 0
        };
        tasksStorage.addTask(newTask);
        toast.success('Task created successfully');
      }
      setTasks(tasksStorage.getTasks());
      setShowTaskForm(false);
    } catch (error) {
      toast.error('Failed to save task');
    }
  };

  if (showTaskForm) {
    return (
      <TaskForm
        task={editingTask}
        onSubmit={handleTaskSubmit}
        onCancel={() => setShowTaskForm(false)}
      />
    );
  }

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
            Create Task
          </button>
          <button
            onClick={handleCreateTask}
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-lg shadow-sm text-white bg-blue-600 hover:bg-blue-700 transition-all"
          >
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
                  <button 
                    onClick={() => handleEditTask(task)}
                    className="p-2 text-slate-400 hover:text-green-400 hover:bg-green-500/10 rounded-lg transition-all"
                  >
                    <Edit className="h-4 w-4" />
                  </button>
                  <button 
                    onClick={() => handleDeleteTask(task.id)}
                    className="p-2 text-slate-400 hover:text-red-400 hover:bg-red-500/10 rounded-lg transition-all"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                  {task.status !== 'completed' && (
                    <button 
                      onClick={() => handleStatusChange(task.id, 'completed')}
                      className="p-2 text-slate-400 hover:text-green-400 hover:bg-green-500/10 rounded-lg transition-all"
                      title="Mark Complete"
                    >
                      <CheckCircle className="h-4 w-4" />
                    </button>
                  )}
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

// Task Form Component
const TaskForm: React.FC<{
  task: Task | null;
  onSubmit: (data: Partial<Task>) => void;
  onCancel: () => void;
}> = ({ task, onSubmit, onCancel }) => {
  const [formData, setFormData] = useState({
    title: task?.title || '',
    description: task?.description || '',
    type: task?.type || 'other',
    priority: task?.priority || 'medium',
    assignedTo: task?.assignedTo || '',
    dueDate: task?.dueDate || new Date().toISOString().split('T')[0],
    estimatedHours: task?.estimatedHours || 1,
    tags: task?.tags || []
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [newTag, setNewTag] = useState('');

  const teamMembers = [
    'Priya Sharma',
    'Karthik Nair', 
    'Rajesh Kumar',
    'Vikram Singh',
    'Amit Patel'
  ];

  const taskTypes = [
    { value: 'call', label: 'Call' },
    { value: 'email', label: 'Email' },
    { value: 'meeting', label: 'Meeting' },
    { value: 'follow-up', label: 'Follow-up' },
    { value: 'demo', label: 'Demo' },
    { value: 'documentation', label: 'Documentation' },
    { value: 'development', label: 'Development' },
    { value: 'review', label: 'Review' },
    { value: 'other', label: 'Other' }
  ];

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.title.trim()) {
      newErrors.title = 'Task title is required';
    }

    if (!formData.description.trim()) {
      newErrors.description = 'Task description is required';
    }

    if (!formData.assignedTo) {
      newErrors.assignedTo = 'Please assign the task to someone';
    }

    if (!formData.dueDate) {
      newErrors.dueDate = 'Due date is required';
    }

    if (formData.estimatedHours <= 0) {
      newErrors.estimatedHours = 'Estimated hours must be greater than 0';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      onSubmit(formData);
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
              {task ? 'Edit Task' : 'Create New Task'}
            </h1>
            <p className="mt-1 text-sm text-slate-400">
              {task ? 'Update task information' : 'Create a new task and assign to team member'}
            </p>
          </div>
        </div>
      </div>

      {/* Form Content */}
      <div className="flex-1 overflow-y-auto p-6 scrollbar-none">
        <div className="max-w-4xl mx-auto">
          <form onSubmit={handleSubmit} className="bg-slate-800/40 backdrop-blur-xl rounded-2xl p-8 border border-yellow-400/30 space-y-6">
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-slate-50 mb-2">Task Title *</label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) => handleChange('title', e.target.value)}
                  className={`w-full px-3 py-2 bg-slate-700/50 border rounded-lg text-slate-50 placeholder-slate-400 focus:ring-2 focus:ring-blue-500 backdrop-blur-sm ${
                    errors.title ? 'border-red-500' : 'border-yellow-400/30'
                  }`}
                  placeholder="Enter task title"
                />
                {errors.title && <p className="mt-1 text-sm text-red-400">{errors.title}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-50 mb-2">Task Type</label>
                <select
                  value={formData.type}
                  onChange={(e) => handleChange('type', e.target.value)}
                  className="w-full px-3 py-2 bg-slate-700/50 border border-yellow-400/30 rounded-lg text-slate-50 focus:ring-2 focus:ring-blue-500 backdrop-blur-sm"
                >
                  {taskTypes.map(type => (
                    <option key={type.value} value={type.value}>{type.label}</option>
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
                <label className="block text-sm font-medium text-slate-50 mb-2">Assign To *</label>
                <select
                  value={formData.assignedTo}
                  onChange={(e) => handleChange('assignedTo', e.target.value)}
                  className={`w-full px-3 py-2 bg-slate-700/50 border rounded-lg text-slate-50 focus:ring-2 focus:ring-blue-500 backdrop-blur-sm ${
                    errors.assignedTo ? 'border-red-500' : 'border-yellow-400/30'
                  }`}
                >
                  <option value="">Select team member</option>
                  {teamMembers.map(member => (
                    <option key={member} value={member}>{member}</option>
                  ))}
                </select>
                {errors.assignedTo && <p className="mt-1 text-sm text-red-400">{errors.assignedTo}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-50 mb-2">Due Date *</label>
                <input
                  type="date"
                  value={formData.dueDate}
                  onChange={(e) => handleChange('dueDate', e.target.value)}
                  className={`w-full px-3 py-2 bg-slate-700/50 border rounded-lg text-slate-50 focus:ring-2 focus:ring-blue-500 backdrop-blur-sm ${
                    errors.dueDate ? 'border-red-500' : 'border-yellow-400/30'
                  }`}
                />
                {errors.dueDate && <p className="mt-1 text-sm text-red-400">{errors.dueDate}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-50 mb-2">Estimated Hours *</label>
                <input
                  type="number"
                  min="0.5"
                  step="0.5"
                  value={formData.estimatedHours}
                  onChange={(e) => handleChange('estimatedHours', parseFloat(e.target.value) || 1)}
                  className={`w-full px-3 py-2 bg-slate-700/50 border rounded-lg text-slate-50 placeholder-slate-400 focus:ring-2 focus:ring-blue-500 backdrop-blur-sm ${
                    errors.estimatedHours ? 'border-red-500' : 'border-yellow-400/30'
                  }`}
                  placeholder="1.0"
                />
                {errors.estimatedHours && <p className="mt-1 text-sm text-red-400">{errors.estimatedHours}</p>}
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
                placeholder="Describe the task in detail"
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
                {task ? 'Update Task' : 'Create Task'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};