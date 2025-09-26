import React, { useState, useMemo } from 'react';
import { Plus, Search, Filter, MoreVertical, Clock, Users, Flag, MessageSquare, Paperclip, Eye, CreditCard as Edit, Play, Pause, CheckCircle, AlertTriangle, Calendar, Target, Award, TrendingUp, Zap, Settings, RotateCcw, Mail, Phone } from 'lucide-react';
import { Task, TaskColumn } from '../../types/tasks';
import { tasksStorage } from '../../utils/tasksStorage';
import toast from 'react-hot-toast';

const taskColumns: TaskColumn[] = [
  { id: 'todo', name: 'To Do', status: 'todo', order: 1, color: 'bg-yellow-100 border-yellow-300', limit: 10, isCompleted: false },
  { id: 'in-progress', name: 'In Progress', status: 'in-progress', order: 2, color: 'bg-blue-100 border-blue-300', limit: 5, isCompleted: false },
  { id: 'review', name: 'Review', status: 'review', order: 3, color: 'bg-purple-100 border-purple-300', limit: 3, isCompleted: false },
  { id: 'completed', name: 'Completed', status: 'completed', order: 4, color: 'bg-green-100 border-green-300', limit: undefined, isCompleted: true },
  { id: 'blocked', name: 'Blocked', status: 'blocked', order: 5, color: 'bg-red-100 border-red-300', limit: undefined, isCompleted: false }
];

export const TaskBoard: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [searchTerm, setSearchTerm] = useState('');

  // Load tasks on component mount
  useEffect(() => {
    const loadedTasks = tasksStorage.getTasks();
    setTasks(loadedTasks);
  }, []);

  const filteredTasks = useMemo(() => tasks.filter(task => {
    const matchesSearch = task.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         task.description.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesSearch;
  }), [tasks, searchTerm]);

  const getTasksByStatus = (status: string) => {
    return filteredTasks.filter(task => task.status === status);
  };

  const stats = useMemo(() => ({
    total: tasks.length,
    todo: tasks.filter(t => t.status === 'todo').length,
    inProgress: tasks.filter(t => t.status === 'in-progress').length,
    review: tasks.filter(t => t.status === 'review').length,
    completed: tasks.filter(t => t.status === 'completed').length,
    blocked: tasks.filter(t => t.status === 'blocked').length,
    overdue: tasks.filter(t => new Date(t.dueDate) < new Date() && t.status !== 'completed').length
  }), [tasks]);

  const handleStatusChange = async (taskId: string, newStatus: Task['status']) => {
    try {
      tasksStorage.updateTaskStatus(taskId, newStatus);
      setTasks(tasksStorage.getTasks());
      toast.success(`Task moved to ${newStatus}`);
    } catch (error) {
      toast.error('Failed to update task status');
    }
  };

  return (
    <div className="h-full flex flex-col bg-slate-900 overflow-hidden">
      {/* Header */}
      <div className="flex justify-between items-center p-4 border-b border-yellow-400/30 flex-shrink-0">
        <div>
          <h1 className="text-2xl font-bold text-slate-50">Task Board (Kanban View)</h1>
          <p className="mt-1 text-sm text-slate-400">
            Visual task management with drag-and-drop workflow
          </p>
        </div>
        <div className="flex space-x-3">
          <button className="inline-flex items-center px-4 py-2 border border-yellow-400/30 text-sm font-medium rounded-lg text-slate-50 bg-slate-700/50 hover:bg-slate-700 transition-all backdrop-blur-sm">
            <Settings className="h-4 w-4 mr-2" />
            Board Settings
          </button>
          <button className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-lg shadow-sm text-white bg-blue-600 hover:bg-blue-700 transition-all">
            <Plus className="h-4 w-4 mr-2" />
            New Task
          </button>
        </div>
      </div>

      {/* Stats Bar */}
      <div className="p-4 bg-slate-800/40 backdrop-blur-xl border-b border-yellow-400/30 flex-shrink-0">
        <div className="grid grid-cols-2 md:grid-cols-6 gap-4">
          <div className="text-center">
            <p className="text-2xl font-bold text-slate-50">{stats.total}</p>
            <p className="text-xs text-slate-400">Total Tasks</p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-bold text-yellow-400">{stats.todo}</p>
            <p className="text-xs text-slate-400">To Do</p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-bold text-blue-400">{stats.inProgress}</p>
            <p className="text-xs text-slate-400">In Progress</p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-bold text-purple-400">{stats.review}</p>
            <p className="text-xs text-slate-400">Review</p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-bold text-green-400">{stats.completed}</p>
            <p className="text-xs text-slate-400">Completed</p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-bold text-red-400">{stats.overdue}</p>
            <p className="text-xs text-slate-400">Overdue</p>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="p-4 bg-slate-800/40 backdrop-blur-xl border-b border-yellow-400/30 flex-shrink-0">
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
      </div>

      {/* Kanban Board */}
      <div className="flex-1 overflow-x-auto p-4">
        <div className="flex space-x-6 h-full min-w-max">
          {taskColumns.map((column) => {
            const columnTasks = getTasksByStatus(column.status);
            
            return (
              <div key={column.id} className="flex-shrink-0 w-80 h-full">
                <div className={`rounded-xl border-2 border-dashed p-4 h-full flex flex-col ${column.color}`}>
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <h3 className="font-semibold text-gray-900">{column.name}</h3>
                      {column.limit && (
                        <p className="text-sm text-gray-600">{columnTasks.length}/{column.limit} limit</p>
                      )}
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className="bg-white px-2 py-1 rounded-full text-sm font-medium text-gray-600">
                        {columnTasks.length}
                      </span>
                      <button className="p-1 hover:bg-white hover:bg-opacity-50 rounded">
                        <Plus className="h-4 w-4 text-gray-600" />
                      </button>
                    </div>
                  </div>

                  <div className="flex-1 space-y-3 overflow-y-auto scrollbar-thin">
                    {columnTasks.map((task) => (
                      <div key={task.id} className="bg-white p-4 rounded-xl shadow-sm border border-gray-200 hover:shadow-md transition-all cursor-pointer">
                        <div className="flex items-start justify-between mb-3">
                          <div>
                            <h4 className="font-semibold text-gray-900 mb-1">{task.title}</h4>
                            <p className="text-sm text-gray-600 capitalize">{task.type}</p>
                          </div>
                          <div className={`w-3 h-3 rounded-full ${
                            task.priority === 'critical' ? 'bg-red-500' :
                            task.priority === 'high' ? 'bg-orange-500' :
                            task.priority === 'medium' ? 'bg-yellow-500' : 'bg-green-500'
                          }`}></div>
                        </div>

                        <p className="text-xs text-gray-600 mb-3 line-clamp-2">{task.description}</p>

                        {/* Progress Bar */}
                        <div className="mb-3">
                          <div className="flex justify-between text-xs text-gray-500 mb-1">
                            <span>Progress</span>
                            <span>{task.progressPercentage}%</span>
                          </div>
                          <div className="w-full bg-gray-200 rounded-full h-1">
                            <div
                              className="bg-blue-500 h-1 rounded-full transition-all duration-300"
                              style={{ width: `${task.progressPercentage}%` }}
                            ></div>
                          </div>
                        </div>

                        <div className="flex items-center justify-between text-xs text-gray-500 mb-3">
                          <div className="flex items-center space-x-1">
                            <Clock className="h-3 w-3" />
                            <span>{new Date(task.dueDate).toLocaleDateString()}</span>
                          </div>
                          <span>{task.estimatedHours}h</span>
                        </div>

                        <div className="flex justify-between items-center pt-3 border-t border-gray-100">
                          <div className="h-6 w-6 bg-gray-300 rounded-full flex items-center justify-center text-xs font-medium">
                            {task.assignedTo.split(' ').map(n => n[0]).join('')}
                          </div>
                          <div className="flex space-x-1">
                            <button className="p-1 text-blue-600 hover:bg-blue-50 rounded transition-colors">
                              <Eye className="h-4 w-4" />
                            </button>
                            <button 
                              onClick={() => handleStatusChange(task.id, 'in-progress')}
                              className="p-1 text-green-600 hover:bg-green-50 rounded transition-colors"
                              title="Start Task"
                            >
                              <Play className="h-4 w-4" />
                            </button>
                            <button className="p-1 text-purple-600 hover:bg-purple-50 rounded transition-colors">
                              <Edit className="h-4 w-4" />
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                    {columnTasks.length === 0 && (
                      <div className="text-center py-8 text-gray-500">
                        <CheckCircle className="h-8 w-8 mx-auto mb-2 opacity-50" />
                        <p className="text-sm">No tasks in this column</p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};