import React, { useState } from 'react';
import {
  DollarSign,
  TrendingUp,
  Calendar,
  CheckCircle,
  Clock,
  AlertTriangle,
  Users,
  FileText,
  Plus,
  Eye,
  MoreHorizontal,
  Download,
  Target
} from 'lucide-react';

const StatCard: React.FC<{
  title: string;
  value: string;
  icon: React.ComponentType<any>;
  color: string;
  chart?: boolean;
  progress?: number;
  subtitle?: string;
  trend?: string;
}> = ({ title, value, icon: Icon, color, chart, progress, subtitle, trend }) => {
  return (
    <div className="bg-slate-800/40 backdrop-blur-xl rounded-2xl p-6 border border-yellow-400/30 hover:border-yellow-400/50 transition-all">
      <div className="flex items-center justify-between mb-4">
        <div>
          <p className="text-slate-300 text-sm mb-1">{title}</p>
          <p className="text-slate-50 text-2xl font-bold">{value}</p>
          {subtitle && <p className="text-slate-300 text-xs mt-1">{subtitle}</p>}
          {trend && <p className="text-emerald-500 text-sm mt-1">{trend}</p>}
        </div>
        <div className={`p-3 rounded-xl ${color} backdrop-blur-sm`}>
          <Icon className="h-6 w-6 text-slate-50" />
        </div>
      </div>
      
      {chart && (
        <div className="h-16 flex items-end space-x-1">
          {[...Array(12)].map((_, i) => (
            <div
              key={i}
              className="bg-blue-500/60 rounded-sm flex-1 backdrop-blur-sm"
              style={{ height: `${Math.random() * 100}%` }}
            />
          ))}
        </div>
      )}
      
      {progress !== undefined && (
        <div className="mt-4">
          <div className="flex justify-between text-sm text-slate-300 mb-1">
            <span>Tasks Not Finished</span>
            <span>{progress}/28</span>
          </div>
          <div className="w-full bg-slate-700/50 rounded-full h-2 backdrop-blur-sm border border-yellow-400/20">
            <div
              className="bg-blue-500 h-2 rounded-full"
              style={{ width: `${(progress / 28) * 100}%` }}
            />
          </div>
        </div>
      )}
    </div>
  );
};

const ProjectsChart: React.FC = () => {
  const [activeTab, setActiveTab] = useState('Week');
  const tabs = ['Week', 'Month', 'Year', 'All'];
  
  const chartData = [
    { month: 'Jan', value: 65 },
    { month: 'Feb', value: 45 },
    { month: 'Mar', value: 85 },
    { month: 'Apr', value: 35 },
    { month: 'May', value: 75 },
    { month: 'Jun', value: 55 },
    { month: 'Jul', value: 95 },
    { month: 'Aug', value: 25 },
    { month: 'Sep', value: 65 },
    { month: 'Oct', value: 45 },
    { month: 'Nov', value: 35 },
    { month: 'Dec', value: 85 }
  ];

  return (
    <div className="bg-slate-800/40 backdrop-blur-xl rounded-2xl p-6 border border-yellow-400/30 col-span-2">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-slate-50 text-lg font-semibold">Projects Overview</h3>
        <div className="flex bg-slate-700/50 backdrop-blur-sm rounded-lg p-1 border border-yellow-400/20">
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-3 py-1 text-sm rounded-md transition-colors ${
                activeTab === tab
                  ? 'bg-blue-500 text-slate-50 border border-yellow-400/30'
                  : 'text-slate-300 hover:text-slate-50'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>
      
      <div className="h-64 flex items-end justify-between space-x-2 mb-6">
        {chartData.map((item, index) => (
          <div key={item.month} className="flex flex-col items-center flex-1">
            <div className="w-full flex flex-col items-center space-y-1">
              <div
                className="w-8 bg-slate-600/60 rounded-sm backdrop-blur-sm"
                style={{ height: `${item.value * 2}px` }}
              />
              <div
                className="w-8 bg-green-500/80 rounded-sm backdrop-blur-sm"
                style={{ height: `${(item.value * 0.7) * 2}px` }}
              />
            </div>
            <span className="text-slate-300 text-xs mt-2">{item.month}</span>
          </div>
        ))}
      </div>
      
      <div className="grid grid-cols-4 gap-6 text-center">
        <div>
          <p className="text-slate-50 text-xl font-bold">12,721</p>
          <p className="text-slate-300 text-sm">Number of Projects</p>
        </div>
        <div>
          <p className="text-slate-50 text-xl font-bold">721</p>
          <p className="text-slate-300 text-sm">Active Projects</p>
        </div>
        <div>
          <p className="text-slate-50 text-xl font-bold">$2,50,523</p>
          <p className="text-slate-300 text-sm">Revenue</p>
        </div>
        <div>
          <p className="text-slate-50 text-xl font-bold">12,275h</p>
          <p className="text-slate-300 text-sm">Working Hours</p>
        </div>
      </div>
    </div>
  );
};

const ToDoList: React.FC = () => {
  const todos = [
    { id: 1, text: 'Complete this projects Monday', time: '2023-12-28 07:15:00', completed: false, priority: 'high' },
    { id: 2, text: 'Complete this projects Monday', time: '2023-12-28 07:15:00', completed: true, priority: 'low' },
    { id: 3, text: 'Complete this projects Monday', time: '2023-12-28 07:15:00', completed: false, priority: 'medium' },
    { id: 4, text: 'Complete this projects Monday', time: '2023-12-28 07:15:00', completed: false, priority: 'medium' }
  ];

  return (
    <div className="bg-slate-800/40 backdrop-blur-xl rounded-2xl p-6 border border-yellow-400/30">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-slate-50 text-lg font-semibold">My To Do Items</h3>
        <div className="flex items-center space-x-2">
          <button className="text-blue-500 text-sm hover:text-blue-400">View All</button>
          <button className="text-blue-500 text-sm hover:text-blue-400">+ Add To Do</button>
        </div>
      </div>
      
      <div className="space-y-4">
        {todos.map((todo) => (
          <div key={todo.id} className="flex items-center space-x-3 p-3 bg-slate-700/30 backdrop-blur-sm rounded-xl border border-yellow-400/20">
            <div className={`w-2 h-2 rounded-full ${
              todo.priority === 'high' ? 'bg-red-400' : 
              todo.priority === 'medium' ? 'bg-amber-500' : 'bg-emerald-500'
            }`} />
            <input
              type="checkbox"
              checked={todo.completed}
              className="w-4 h-4 text-blue-500 bg-slate-600/50 border-yellow-400/30 rounded focus:ring-blue-500"
            />
            <div className="flex-1">
              <p className={`text-sm ${todo.completed ? 'text-slate-500 line-through' : 'text-slate-50'}`}>
                {todo.text}
              </p>
              <p className="text-xs text-slate-400">{todo.time}</p>
            </div>
            <div className="flex space-x-1">
              <button className="p-1 text-slate-400 hover:text-slate-50">
                <Calendar className="h-4 w-4" />
              </button>
              <button className="p-1 text-slate-400 hover:text-slate-50">
                <FileText className="h-4 w-4" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const EarningsChart: React.FC = () => {
  const [activeTab, setActiveTab] = useState('Day');
  const tabs = ['Day', 'Week', 'Month', 'Year'];

  return (
    <div className="bg-slate-800/40 backdrop-blur-xl rounded-2xl p-6 border border-yellow-400/30">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-slate-50 text-lg font-semibold">Total Earning</h3>
        <div className="flex bg-slate-700/50 backdrop-blur-sm rounded-lg p-1 border border-yellow-400/20">
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-2 py-1 text-xs rounded-md transition-colors ${
                activeTab === tab
                  ? 'bg-blue-500 text-slate-50'
                  : 'text-slate-300 hover:text-slate-50'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>
      
      <p className="text-slate-50 text-3xl font-bold mb-6">$6,743.00</p>
      
      <div className="h-32 flex items-end justify-between">
        {[...Array(12)].map((_, i) => (
          <div
            key={i}
            className="bg-blue-500/60 rounded-sm w-4 backdrop-blur-sm"
            style={{ height: `${Math.random() * 100 + 20}%` }}
          />
        ))}
      </div>
      
      <div className="flex justify-between text-xs text-slate-300 mt-2">
        <span>May</span>
        <span>June</span>
        <span>July</span>
        <span>Aug</span>
        <span>Sep</span>
        <span>Oct</span>
      </div>
    </div>
  );
};

const ActiveProjects: React.FC = () => {
  const projects = [
    {
      name: 'Batman',
      lead: 'Liam Risher',
      progress: 53,
      assignees: ['LR', 'AB', 'CD'],
      status: 'In progress',
      dueDate: '06 Sep 2021',
      statusColor: 'bg-blue-500'
    },
    {
      name: 'Bender Project',
      lead: 'Oliver Noah',
      progress: 30,
      assignees: ['ON', 'EF', 'GH'],
      status: 'Pending',
      dueDate: '06 Sep 2021',
      statusColor: 'bg-red-500'
    },
    {
      name: 'Bigfish',
      lead: 'Donald Benjamin',
      progress: 30,
      assignees: ['DB', 'IJ', 'KL'],
      status: 'In progress',
      dueDate: '06 Sep 2021',
      statusColor: 'bg-red-500'
    },
    {
      name: 'Canary',
      lead: 'Elijah James',
      progress: 40,
      assignees: ['EJ', 'MN', 'OP'],
      status: 'Completed',
      dueDate: '06 Sep 2021',
      statusColor: 'bg-green-500'
    },
    {
      name: 'Casanova',
      lead: 'William Risher',
      progress: 53,
      assignees: ['WR', 'QR', 'ST'],
      status: 'In progress',
      dueDate: '06 Sep 2021',
      statusColor: 'bg-blue-500'
    }
  ];

  return (
    <div className="bg-slate-800/40 backdrop-blur-xl rounded-2xl p-6 border border-yellow-400/30 col-span-2">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-slate-50 text-lg font-semibold">Active Projects</h3>
        <button className="flex items-center text-blue-500 text-sm hover:text-blue-400 border border-yellow-400/20 px-3 py-1 rounded-lg hover:border-yellow-400/40 transition-all">
          <Download className="h-4 w-4 mr-1" />
          Export Report
        </button>
      </div>
      
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="text-slate-300 text-sm">
              <th className="text-left pb-4">Project Name</th>
              <th className="text-left pb-4">Project Lead</th>
              <th className="text-left pb-4">Progress</th>
              <th className="text-left pb-4">Assignee</th>
              <th className="text-left pb-4">Status</th>
              <th className="text-left pb-4">Due Date</th>
            </tr>
          </thead>
          <tbody className="space-y-4">
            {projects.map((project, index) => (
              <tr key={index} className="border-t border-yellow-400/20">
                <td className="py-4 text-slate-50 font-medium">{project.name}</td>
                <td className="py-4">
                  <div className="flex items-center space-x-2">
                    <div className="w-8 h-8 bg-slate-600/50 backdrop-blur-sm rounded-full flex items-center justify-center text-xs text-slate-50 border border-yellow-400/20">
                      {project.lead.split(' ').map(n => n[0]).join('')}
                    </div>
                    <span className="text-slate-300 text-sm">{project.lead}</span>
                  </div>
                </td>
                <td className="py-4">
                  <div className="flex items-center space-x-2">
                    <div className="w-16 bg-slate-700/50 backdrop-blur-sm rounded-full h-2 border border-yellow-400/20">
                      <div
                        className={`h-2 rounded-full ${project.statusColor}`}
                        style={{ width: `${project.progress}%` }}
                      />
                    </div>
                    <span className="text-slate-300 text-sm">{project.progress}%</span>
                  </div>
                </td>
                <td className="py-4">
                  <div className="flex -space-x-2">
                    {project.assignees.map((assignee, i) => (
                      <div
                        key={i}
                        className="w-6 h-6 bg-slate-600/50 backdrop-blur-sm rounded-full flex items-center justify-center text-xs text-slate-50 border-2 border-yellow-400/30"
                      >
                        {assignee}
                      </div>
                    ))}
                  </div>
                </td>
                <td className="py-4">
                  <span className={`px-2 py-1 rounded-full text-xs backdrop-blur-sm ${
                    project.status === 'Completed' ? 'bg-emerald-500/20 text-emerald-400 border border-yellow-400/30' :
                    project.status === 'In progress' ? 'bg-blue-500/20 text-blue-400 border border-yellow-400/30' :
                    'bg-red-500/20 text-red-400 border border-yellow-400/30'
                  }`}>
                    {project.status}
                  </span>
                </td>
                <td className="py-4 text-slate-300 text-sm">{project.dueDate}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      
      <div className="flex items-center justify-between mt-6 text-sm text-slate-300">
        <span>Showing 1 to 5 of 10 entries</span>
        <div className="flex items-center space-x-2">
          <button className="px-2 py-1 bg-slate-700/50 backdrop-blur-sm rounded hover:bg-slate-600/50 border border-yellow-400/20 hover:border-yellow-400/40">&lt;</button>
          <button className="px-2 py-1 bg-blue-500 text-slate-50 rounded border border-yellow-400/30">1</button>
          <button className="px-2 py-1 bg-slate-700/50 backdrop-blur-sm rounded hover:bg-slate-600/50 border border-yellow-400/20 hover:border-yellow-400/40">2</button>
          <button className="px-2 py-1 bg-slate-700/50 backdrop-blur-sm rounded hover:bg-slate-600/50 border border-yellow-400/20 hover:border-yellow-400/40">&gt;</button>
        </div>
      </div>
    </div>
  );
};

const ActiveUsers: React.FC = () => {
  const users = [
    { country: 'India', flag: '🇮🇳', percentage: 50 },
    { country: 'Canada', flag: '🇨🇦', percentage: 30 },
    { country: 'Russia', flag: '🇷🇺', percentage: 20 },
    { country: 'United Kingdom', flag: '🇬🇧', percentage: 40 },
    { country: 'Australia', flag: '🇦🇺', percentage: 60 },
    { country: 'United States', flag: '🇺🇸', percentage: 20 },
    { country: 'Pakistan', flag: '🇵🇰', percentage: 20 }
  ];

  return (
    <div className="bg-slate-800/40 backdrop-blur-xl rounded-2xl p-6 border border-yellow-400/30">
      <h3 className="text-slate-50 text-lg font-semibold mb-6">Active users</h3>
      
      <div className="mb-6">
        <div className="w-full h-48 bg-slate-700/30 backdrop-blur-sm rounded-xl flex items-center justify-center border border-yellow-400/20">
          <div className="text-slate-300 text-center">
            <div className="w-32 h-20 bg-slate-600/50 backdrop-blur-sm rounded mb-2 mx-auto border border-yellow-400/20"></div>
            <p className="text-sm">World Map Visualization</p>
          </div>
        </div>
      </div>
      
      <div className="space-y-3">
        {users.map((user, index) => (
          <div key={index} className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <span className="text-lg">{user.flag}</span>
              <span className="text-slate-300 text-sm">{user.country}</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-16 bg-slate-700/50 backdrop-blur-sm rounded-full h-2 border border-yellow-400/20">
                <div
                  className="bg-blue-500 h-2 rounded-full"
                  style={{ width: `${user.percentage}%` }}
                />
              </div>
              <span className="text-slate-300 text-sm w-8">{user.percentage}%</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export const DashboardHome: React.FC<{ onPageChange: (page: string) => void }> = ({ onPageChange }) => {
  return (
    <div className="h-full overflow-auto p-6 space-y-6">
      {/* Top Stats Row */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
        <StatCard
          title="Total Deposit"
          value="$1200.00"
          icon={DollarSign}
          color="bg-blue-500 border border-yellow-400/30"
          chart={true}
          trend="+12% from last month"
        />
        
        <div className="bg-slate-800/40 rounded-xl p-6 border border-yellow-400/30 shadow-sm backdrop-blur-xl">
          <div className="flex items-center justify-between mb-4">
            <div>
              <p className="text-slate-300 text-sm mb-1">All Projects</p>
              <div className="flex items-center space-x-4">
                <div className="w-16 h-16 bg-slate-700/50 rounded-full flex items-center justify-center relative border border-yellow-400/20">
                  <span className="text-slate-50 text-xl font-bold">62</span>
                  <svg className="absolute inset-0 w-16 h-16 transform -rotate-90">
                    <circle
                      cx="32"
                      cy="32"
                      r="28"
                      stroke="currentColor"
                      strokeWidth="4"
                      fill="none"
                      className="text-slate-600"
                    />
                    <circle
                      cx="32"
                      cy="32"
                      r="28"
                      stroke="currentColor"
                      strokeWidth="4"
                      fill="none"
                      strokeDasharray={`${2 * Math.PI * 28}`}
                      strokeDashoffset={`${2 * Math.PI * 28 * (1 - 0.7)}`}
                      className="text-blue-500"
                    />
                  </svg>
                </div>
                <div className="text-sm">
                  <div className="flex items-center space-x-2 mb-1">
                    <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                    <span className="text-slate-300">Complete</span>
                  </div>
                  <div className="flex items-center space-x-2 mb-1">
                    <div className="w-2 h-2 bg-amber-500 rounded-full"></div>
                    <span className="text-slate-300">Pending</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-slate-500 rounded-full"></div>
                    <span className="text-slate-300">Not Start</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <StatCard
          title="Total Expenses"
          value="$1200.00"
          icon={TrendingUp}
          color="bg-red-500 border border-yellow-400/30"
          chart={true}
          trend="-5% from last month"
        />
        
        <StatCard
          title="Total Deposit"
          value="20"
          icon={Target}
          color="bg-blue-500 border border-yellow-400/30"
          progress={20}
        />
        
        <EarningsChart />
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <ProjectsChart />
        <ToDoList />
      </div>

      {/* Bottom Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <ActiveProjects />
        <ActiveUsers />
      </div>
    </div>
  );
};