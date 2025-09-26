import React, { useState, useMemo } from 'react';
import {
  Plus,
  Search,
  Edit,
  Trash2,
  Eye,
  Play,
  Pause,
  Copy,
  Send,
  Calendar,
  Users,
  Mail,
  MessageSquare,
  Smartphone,
  TrendingUp,
  Target,
  Award,
  DollarSign,
  Clock,
  CheckCircle,
  XCircle,
  AlertTriangle,
  BarChart3,
  PieChart,
  Filter,
  Download,
  Upload,
  Settings,
  MoreVertical,
  Zap,
  Star,
  Globe,
  Bell
} from 'lucide-react';
import { Campaign } from '../../types/campaigns';

const sampleCampaigns: Campaign[] = [
  {
    id: '1',
    name: 'Premium Chit Scheme Launch',
    description: 'Email campaign to promote new premium chit fund schemes to existing customers',
    type: 'email',
    status: 'completed',
    targetAudience: ['existing-customers', 'high-value'],
    totalRecipients: 2500,
    subject: 'Introducing Our New Premium Chit Schemes - Higher Returns Await!',
    content: 'Discover our latest premium chit fund schemes with enhanced benefits...',
    scheduledAt: '2024-03-10T09:00:00',
    sentCount: 2500,
    deliveredCount: 2450,
    openedCount: 1225,
    clickedCount: 368,
    unsubscribedCount: 12,
    bounceCount: 50,
    openRate: 50.0,
    clickRate: 15.0,
    conversionRate: 8.5,
    unsubscribeRate: 0.5,
    bounceRate: 2.0,
    budget: 25000,
    costPerSend: 10,
    totalCost: 25000,
    createdAt: '2024-03-05',
    createdBy: 'priya.sharma@ramnirmalchits.com',
    updatedAt: '2024-03-12',
    updatedBy: 'priya.sharma@ramnirmalchits.com',
    isABTest: true,
    abTestVariants: [
      {
        id: 'var_1',
        name: 'Variant A - Benefits Focus',
        subject: 'Higher Returns with Premium Chit Schemes',
        content: 'Focus on benefits and returns...',
        percentage: 50,
        sentCount: 1250,
        openRate: 52.0,
        clickRate: 16.0,
        conversionRate: 9.2
      },
      {
        id: 'var_2',
        name: 'Variant B - Trust Focus',
        subject: 'Trusted Premium Investment Options',
        content: 'Focus on trust and security...',
        percentage: 50,
        sentCount: 1250,
        openRate: 48.0,
        clickRate: 14.0,
        conversionRate: 7.8
      }
    ],
    isAutomated: false,
    tags: ['premium', 'chit-schemes', 'email', 'existing-customers'],
    category: 'promotional',
    priority: 'high',
    timezone: 'Asia/Kolkata'
  },
  {
    id: '2',
    name: 'Payment Reminder SMS',
    description: 'Automated SMS reminders for upcoming chit fund payments',
    type: 'sms',
    status: 'running',
    targetAudience: ['active-members'],
    totalRecipients: 1800,
    content: 'Dear {member_name}, your chit fund payment of ₹{amount} is due on {due_date}. Pay now to avoid penalties.',
    sentCount: 1650,
    deliveredCount: 1620,
    openedCount: 1620, // SMS auto-opened
    clickedCount: 245,
    unsubscribedCount: 5,
    bounceCount: 30,
    openRate: 100.0,
    clickRate: 15.1,
    conversionRate: 12.8,
    unsubscribeRate: 0.3,
    bounceRate: 1.8,
    costPerSend: 2,
    totalCost: 3300,
    createdAt: '2024-03-01',
    createdBy: 'karthik.nair@ramnirmalchits.com',
    updatedAt: '2024-03-15',
    updatedBy: 'system@ramnirmalchits.com',
    isABTest: false,
    isAutomated: true,
    triggers: [
      {
        id: 'trigger_1',
        name: 'Payment Due in 3 Days',
        event: 'payment_due_soon',
        conditions: [
          { field: 'days_to_due', operator: 'equals', value: '3' }
        ],
        delay: 0,
        isActive: true
      }
    ],
    tags: ['payment', 'reminder', 'sms', 'automated'],
    category: 'transactional',
    priority: 'medium',
    timezone: 'Asia/Kolkata'
  },
  {
    id: '3',
    name: 'New Member Welcome Series',
    description: 'Multi-channel welcome campaign for new chit fund members',
    type: 'multi-channel',
    status: 'running',
    targetAudience: ['new-members'],
    totalRecipients: 450,
    content: 'Welcome to our chit fund family! Here\'s everything you need to know...',
    sentCount: 420,
    deliveredCount: 410,
    openedCount: 328,
    clickedCount: 164,
    unsubscribedCount: 2,
    bounceCount: 10,
    openRate: 80.0,
    clickRate: 40.0,
    conversionRate: 25.0,
    unsubscribeRate: 0.5,
    bounceRate: 2.4,
    budget: 15000,
    costPerSend: 35,
    totalCost: 14700,
    createdAt: '2024-02-15',
    createdBy: 'rajesh.kumar@ramnirmalchits.com',
    updatedAt: '2024-03-14',
    updatedBy: 'rajesh.kumar@ramnirmalchits.com',
    isABTest: false,
    isAutomated: true,
    triggers: [
      {
        id: 'trigger_2',
        name: 'New Member Registration',
        event: 'member_registered',
        conditions: [
          { field: 'registration_status', operator: 'equals', value: 'completed' }
        ],
        delay: 60, // 1 hour delay
        isActive: true
      }
    ],
    tags: ['welcome', 'onboarding', 'multi-channel', 'new-members'],
    category: 'onboarding',
    priority: 'high',
    timezone: 'Asia/Kolkata'
  },
  {
    id: '4',
    name: 'Auction Notification Campaign',
    description: 'WhatsApp notifications for upcoming chit fund auctions',
    type: 'whatsapp',
    status: 'scheduled',
    targetAudience: ['group-members'],
    totalRecipients: 320,
    scheduledAt: '2024-03-20T10:00:00',
    content: 'Your chit group auction is scheduled for {auction_date} at {auction_time}. Join us at {venue}.',
    sentCount: 0,
    deliveredCount: 0,
    openedCount: 0,
    clickedCount: 0,
    unsubscribedCount: 0,
    bounceCount: 0,
    openRate: 0,
    clickRate: 0,
    conversionRate: 0,
    unsubscribeRate: 0,
    bounceRate: 0,
    costPerSend: 5,
    totalCost: 1600,
    createdAt: '2024-03-15',
    createdBy: 'vikram.singh@ramnirmalchits.com',
    updatedAt: '2024-03-15',
    updatedBy: 'vikram.singh@ramnirmalchits.com',
    isABTest: false,
    isAutomated: false,
    tags: ['auction', 'notification', 'whatsapp', 'group-members'],
    category: 'notification',
    priority: 'high',
    timezone: 'Asia/Kolkata'
  },
  {
    id: '5',
    name: 'Quarterly Newsletter',
    description: 'Quarterly company newsletter with updates and success stories',
    type: 'email',
    status: 'draft',
    targetAudience: ['all-customers', 'prospects'],
    totalRecipients: 5000,
    subject: 'Q1 2024 Newsletter - Your Financial Journey Continues',
    content: 'Dear valued customer, here are the highlights from Q1 2024...',
    budget: 50000,
    costPerSend: 10,
    totalCost: 50000,
    sentCount: 0,
    deliveredCount: 0,
    openedCount: 0,
    clickedCount: 0,
    unsubscribedCount: 0,
    bounceCount: 0,
    openRate: 0,
    clickRate: 0,
    conversionRate: 0,
    unsubscribeRate: 0,
    bounceRate: 0,
    createdAt: '2024-03-12',
    createdBy: 'marketing@ramnirmalchits.com',
    updatedAt: '2024-03-15',
    updatedBy: 'marketing@ramnirmalchits.com',
    isABTest: false,
    isAutomated: false,
    tags: ['newsletter', 'quarterly', 'updates', 'all-customers'],
    category: 'newsletter',
    priority: 'medium',
    timezone: 'Asia/Kolkata'
  }
];

const CampaignCard: React.FC<{ campaign: Campaign }> = React.memo(({ campaign }) => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'bg-green-100 text-green-800 border-green-200';
      case 'running': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'scheduled': return 'bg-purple-100 text-purple-800 border-purple-200';
      case 'paused': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'draft': return 'bg-gray-100 text-gray-800 border-gray-200';
      case 'cancelled': return 'bg-red-100 text-red-800 border-red-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'email': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'sms': return 'bg-green-100 text-green-800 border-green-200';
      case 'whatsapp': return 'bg-emerald-100 text-emerald-800 border-emerald-200';
      case 'push': return 'bg-purple-100 text-purple-800 border-purple-200';
      case 'multi-channel': return 'bg-orange-100 text-orange-800 border-orange-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'email': return Mail;
      case 'sms': return MessageSquare;
      case 'whatsapp': return MessageSquare;
      case 'push': return Bell;
      case 'multi-channel': return Globe;
      default: return Mail;
    }
  };

  const TypeIcon = getTypeIcon(campaign.type);

  return (
    <div className="bg-slate-800/40 backdrop-blur-xl rounded-2xl p-6 border border-yellow-400/30 hover:border-yellow-400/50 transition-all">
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center space-x-3">
          <div className="p-3 bg-blue-500/20 rounded-xl border border-yellow-400/30">
            <TypeIcon className="h-6 w-6 text-blue-400" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-slate-50">{campaign.name}</h3>
            <p className="text-sm text-slate-400">{campaign.description}</p>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium border ${getTypeColor(campaign.type)}`}>
            {campaign.type.toUpperCase()}
          </span>
          <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium border ${getStatusColor(campaign.status)}`}>
            {campaign.status.toUpperCase()}
          </span>
          <button className="p-2 text-slate-400 hover:text-slate-50 hover:bg-slate-700/50 rounded-lg transition-all">
            <MoreVertical className="h-4 w-4" />
          </button>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 mb-4">
        <div className="space-y-2">
          <div className="flex items-center justify-between text-sm">
            <span className="text-slate-400">Recipients</span>
            <span className="text-slate-50 font-medium">{campaign.totalRecipients.toLocaleString()}</span>
          </div>
          <div className="flex items-center justify-between text-sm">
            <span className="text-slate-400">Sent</span>
            <span className="text-blue-400 font-medium">{campaign.sentCount.toLocaleString()}</span>
          </div>
          <div className="flex items-center justify-between text-sm">
            <span className="text-slate-400">Delivered</span>
            <span className="text-green-400 font-medium">{campaign.deliveredCount.toLocaleString()}</span>
          </div>
        </div>
        <div className="space-y-2">
          <div className="flex items-center justify-between text-sm">
            <span className="text-slate-400">Open Rate</span>
            <span className="text-purple-400 font-medium">{campaign.openRate}%</span>
          </div>
          <div className="flex items-center justify-between text-sm">
            <span className="text-slate-400">Click Rate</span>
            <span className="text-orange-400 font-medium">{campaign.clickRate}%</span>
          </div>
          <div className="flex items-center justify-between text-sm">
            <span className="text-slate-400">Conversion</span>
            <span className="text-emerald-400 font-medium">{campaign.conversionRate}%</span>
          </div>
        </div>
      </div>

      {campaign.budget && (
        <div className="mb-4 p-3 bg-slate-700/30 rounded-xl border border-yellow-400/20">
          <div className="flex items-center justify-between text-sm">
            <span className="text-slate-400">Budget</span>
            <span className="text-yellow-400 font-medium">₹{campaign.budget.toLocaleString()}</span>
          </div>
          <div className="flex items-center justify-between text-sm">
            <span className="text-slate-400">Spent</span>
            <span className="text-red-400 font-medium">₹{campaign.totalCost.toLocaleString()}</span>
          </div>
        </div>
      )}

      {/* Tags */}
      {campaign.tags.length > 0 && (
        <div className="mb-4">
          <div className="flex flex-wrap gap-1">
            {campaign.tags.slice(0, 3).map((tag, index) => (
              <span key={index} className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-blue-100 text-blue-800 border border-blue-200">
                #{tag}
              </span>
            ))}
            {campaign.tags.length > 3 && (
              <span className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-slate-100 text-slate-800 border border-slate-200">
                +{campaign.tags.length - 3} more
              </span>
            )}
          </div>
        </div>
      )}

      <div className="flex justify-between items-center pt-4 border-t border-yellow-400/20">
        <div className="flex items-center text-xs text-slate-500">
          <Calendar className="h-3 w-3 mr-1" />
          <span>Created {new Date(campaign.createdAt).toLocaleDateString()}</span>
        </div>
        <div className="flex space-x-2">
          <button className="p-2 text-slate-400 hover:text-blue-400 hover:bg-blue-500/10 rounded-lg transition-all">
            <Eye className="h-4 w-4" />
          </button>
          <button className="p-2 text-slate-400 hover:text-green-400 hover:bg-green-500/10 rounded-lg transition-all">
            <BarChart3 className="h-4 w-4" />
          </button>
          <button className="p-2 text-slate-400 hover:text-purple-400 hover:bg-purple-500/10 rounded-lg transition-all">
            <Copy className="h-4 w-4" />
          </button>
          {campaign.status === 'draft' && (
            <button className="p-2 text-slate-400 hover:text-orange-400 hover:bg-orange-500/10 rounded-lg transition-all">
              <Send className="h-4 w-4" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
});

export const Campaigns: React.FC = () => {
  const [campaigns] = useState<Campaign[]>(sampleCampaigns);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [filterType, setFilterType] = useState<string>('all');
  const [filterCategory, setFilterCategory] = useState<string>('all');

  const filteredCampaigns = useMemo(() => campaigns.filter(campaign => {
    const matchesSearch = campaign.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         campaign.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         campaign.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesStatus = filterStatus === 'all' || campaign.status === filterStatus;
    const matchesType = filterType === 'all' || campaign.type === filterType;
    const matchesCategory = filterCategory === 'all' || campaign.category === filterCategory;
    
    return matchesSearch && matchesStatus && matchesType && matchesCategory;
  }), [campaigns, searchTerm, filterStatus, filterType, filterCategory]);

  const stats = useMemo(() => ({
    total: campaigns.length,
    running: campaigns.filter(c => c.status === 'running').length,
    completed: campaigns.filter(c => c.status === 'completed').length,
    scheduled: campaigns.filter(c => c.status === 'scheduled').length,
    draft: campaigns.filter(c => c.status === 'draft').length,
    paused: campaigns.filter(c => c.status === 'paused').length,
    cancelled: campaigns.filter(c => c.status === 'cancelled').length,
    email: campaigns.filter(c => c.type === 'email').length,
    sms: campaigns.filter(c => c.type === 'sms').length,
    whatsapp: campaigns.filter(c => c.type === 'whatsapp').length,
    multiChannel: campaigns.filter(c => c.type === 'multi-channel').length,
    totalRecipients: campaigns.reduce((sum, c) => sum + c.totalRecipients, 0),
    totalSent: campaigns.reduce((sum, c) => sum + c.sentCount, 0),
    avgOpenRate: campaigns.length > 0 ? campaigns.reduce((sum, c) => sum + c.openRate, 0) / campaigns.length : 0,
    avgClickRate: campaigns.length > 0 ? campaigns.reduce((sum, c) => sum + c.clickRate, 0) / campaigns.length : 0,
    totalCost: campaigns.reduce((sum, c) => sum + c.totalCost, 0)
  }), [campaigns]);

  return (
    <div className="h-full flex flex-col bg-slate-900 overflow-hidden">
      {/* Header */}
      <div className="flex justify-between items-center p-4 border-b border-yellow-400/30 flex-shrink-0">
        <div>
          <h1 className="text-2xl font-bold text-slate-50">Campaigns</h1>
          <p className="mt-1 text-sm text-slate-400">
            Create and manage marketing campaigns across multiple channels
          </p>
        </div>
        <div className="flex space-x-3">
          <button className="inline-flex items-center px-4 py-2 border border-yellow-400/30 text-sm font-medium rounded-lg text-slate-50 bg-slate-700/50 hover:bg-slate-700 transition-all backdrop-blur-sm">
            <Upload className="h-4 w-4 mr-2" />
            Import Contacts
          </button>
          <button className="inline-flex items-center px-4 py-2 border border-yellow-400/30 text-sm font-medium rounded-lg text-slate-50 bg-slate-700/50 hover:bg-slate-700 transition-all backdrop-blur-sm">
            <Download className="h-4 w-4 mr-2" />
            Export Report
          </button>
          <button className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-lg shadow-sm text-white bg-blue-600 hover:bg-blue-700 transition-all">
            <Plus className="h-4 w-4 mr-2" />
            Create Campaign
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto p-4 space-y-6 scrollbar-none">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 lg:grid-cols-16 gap-4">
          <div className="bg-slate-800/40 backdrop-blur-xl p-4 rounded-xl border border-yellow-400/30">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-400">Total Campaigns</p>
                <p className="text-2xl font-bold text-slate-50">{stats.total}</p>
              </div>
              <Target className="h-8 w-8 text-blue-400" />
            </div>
          </div>
          <div className="bg-slate-800/40 backdrop-blur-xl p-4 rounded-xl border border-yellow-400/30">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-400">Running</p>
                <p className="text-2xl font-bold text-blue-400">{stats.running}</p>
              </div>
              <Play className="h-8 w-8 text-blue-400" />
            </div>
          </div>
          <div className="bg-slate-800/40 backdrop-blur-xl p-4 rounded-xl border border-yellow-400/30">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-400">Completed</p>
                <p className="text-2xl font-bold text-green-400">{stats.completed}</p>
              </div>
              <CheckCircle className="h-8 w-8 text-green-400" />
            </div>
          </div>
          <div className="bg-slate-800/40 backdrop-blur-xl p-4 rounded-xl border border-yellow-400/30">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-400">Scheduled</p>
                <p className="text-2xl font-bold text-purple-400">{stats.scheduled}</p>
              </div>
              <Calendar className="h-8 w-8 text-purple-400" />
            </div>
          </div>
          <div className="bg-slate-800/40 backdrop-blur-xl p-4 rounded-xl border border-yellow-400/30">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-400">Draft</p>
                <p className="text-2xl font-bold text-yellow-400">{stats.draft}</p>
              </div>
              <Edit className="h-8 w-8 text-yellow-400" />
            </div>
          </div>
          <div className="bg-slate-800/40 backdrop-blur-xl p-4 rounded-xl border border-yellow-400/30">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-400">Email</p>
                <p className="text-2xl font-bold text-blue-400">{stats.email}</p>
              </div>
              <Mail className="h-8 w-8 text-blue-400" />
            </div>
          </div>
          <div className="bg-slate-800/40 backdrop-blur-xl p-4 rounded-xl border border-yellow-400/30">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-400">SMS</p>
                <p className="text-2xl font-bold text-green-400">{stats.sms}</p>
              </div>
              <MessageSquare className="h-8 w-8 text-green-400" />
            </div>
          </div>
          <div className="bg-slate-800/40 backdrop-blur-xl p-4 rounded-xl border border-yellow-400/30">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-400">WhatsApp</p>
                <p className="text-2xl font-bold text-emerald-400">{stats.whatsapp}</p>
              </div>
              <MessageSquare className="h-8 w-8 text-emerald-400" />
            </div>
          </div>
          <div className="bg-slate-800/40 backdrop-blur-xl p-4 rounded-xl border border-yellow-400/30">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-400">Multi-Channel</p>
                <p className="text-2xl font-bold text-orange-400">{stats.multiChannel}</p>
              </div>
              <Globe className="h-8 w-8 text-orange-400" />
            </div>
          </div>
          <div className="bg-slate-800/40 backdrop-blur-xl p-4 rounded-xl border border-yellow-400/30">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-400">Recipients</p>
                <p className="text-2xl font-bold text-indigo-400">{stats.totalRecipients.toLocaleString()}</p>
              </div>
              <Users className="h-8 w-8 text-indigo-400" />
            </div>
          </div>
          <div className="bg-slate-800/40 backdrop-blur-xl p-4 rounded-xl border border-yellow-400/30">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-400">Messages Sent</p>
                <p className="text-2xl font-bold text-pink-400">{stats.totalSent.toLocaleString()}</p>
              </div>
              <Send className="h-8 w-8 text-pink-400" />
            </div>
          </div>
          <div className="bg-slate-800/40 backdrop-blur-xl p-4 rounded-xl border border-yellow-400/30">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-400">Avg Open Rate</p>
                <p className="text-2xl font-bold text-cyan-400">{stats.avgOpenRate.toFixed(1)}%</p>
              </div>
              <Eye className="h-8 w-8 text-cyan-400" />
            </div>
          </div>
          <div className="bg-slate-800/40 backdrop-blur-xl p-4 rounded-xl border border-yellow-400/30">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-400">Avg Click Rate</p>
                <p className="text-2xl font-bold text-violet-400">{stats.avgClickRate.toFixed(1)}%</p>
              </div>
              <Target className="h-8 w-8 text-violet-400" />
            </div>
          </div>
          <div className="bg-slate-800/40 backdrop-blur-xl p-4 rounded-xl border border-yellow-400/30 md:col-span-2">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-400">Total Cost</p>
                <p className="text-xl font-bold text-red-400">₹{stats.totalCost.toLocaleString()}</p>
              </div>
              <DollarSign className="h-8 w-8 text-red-400" />
            </div>
          </div>
          <div className="bg-slate-800/40 backdrop-blur-xl p-4 rounded-xl border border-yellow-400/30">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-400">Paused</p>
                <p className="text-2xl font-bold text-gray-400">{stats.paused}</p>
              </div>
              <Pause className="h-8 w-8 text-gray-400" />
            </div>
          </div>
          <div className="bg-slate-800/40 backdrop-blur-xl p-4 rounded-xl border border-yellow-400/30">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-400">Cancelled</p>
                <p className="text-2xl font-bold text-red-400">{stats.cancelled}</p>
              </div>
              <XCircle className="h-8 w-8 text-red-400" />
            </div>
          </div>
        </div>

        {/* Filters */}
        <div className="bg-slate-800/40 backdrop-blur-xl rounded-xl p-4 border border-yellow-400/30">
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4 items-center">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-500 h-4 w-4" />
              <input
                type="text"
                placeholder="Search campaigns..."
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
              <option value="running">Running</option>
              <option value="completed">Completed</option>
              <option value="scheduled">Scheduled</option>
              <option value="draft">Draft</option>
              <option value="paused">Paused</option>
              <option value="cancelled">Cancelled</option>
            </select>
            <select
              value={filterType}
              onChange={(e) => setFilterType(e.target.value)}
              className="px-3 py-2 bg-slate-700/50 border border-yellow-400/30 rounded-lg text-slate-50 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 backdrop-blur-sm"
            >
              <option value="all">All Types</option>
              <option value="email">Email</option>
              <option value="sms">SMS</option>
              <option value="whatsapp">WhatsApp</option>
              <option value="push">Push</option>
              <option value="multi-channel">Multi-Channel</option>
            </select>
            <select
              value={filterCategory}
              onChange={(e) => setFilterCategory(e.target.value)}
              className="px-3 py-2 bg-slate-700/50 border border-yellow-400/30 rounded-lg text-slate-50 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 backdrop-blur-sm"
            >
              <option value="all">All Categories</option>
              <option value="promotional">Promotional</option>
              <option value="transactional">Transactional</option>
              <option value="onboarding">Onboarding</option>
              <option value="notification">Notification</option>
              <option value="newsletter">Newsletter</option>
            </select>
            <div className="text-sm text-slate-400">
              Showing: <span className="font-semibold text-slate-50">{filteredCampaigns.length}</span> campaigns
            </div>
          </div>
        </div>

        {/* Campaigns Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {filteredCampaigns.map((campaign) => (
            <CampaignCard key={campaign.id} campaign={campaign} />
          ))}
        </div>

        {filteredCampaigns.length === 0 && (
          <div className="text-center py-12">
            <Target className="h-12 w-12 mx-auto text-slate-500 mb-4" />
            <h3 className="text-lg font-medium text-slate-50 mb-2">No campaigns found</h3>
            <p className="text-sm text-slate-400">Try adjusting your search criteria or create a new campaign.</p>
          </div>
        )}
      </div>
    </div>
  );
};