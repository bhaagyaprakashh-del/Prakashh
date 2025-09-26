import React, { useState, useMemo } from 'react';
import {
  Plus,
  Search,
  Edit,
  Trash2,
  Eye,
  Send,
  MessageSquare,
  Users,
  Clock,
  CheckCircle,
  XCircle,
  AlertTriangle,
  Calendar,
  Filter,
  Download,
  Settings,
  MoreVertical,
  Smartphone,
  Globe,
  Bell,
  Star,
  Target,
  TrendingUp,
  Award,
  Activity,
  Zap,
  Phone,
  Mail,
  Image,
  FileText,
  Paperclip
} from 'lucide-react';
import { BroadcastMessage, Conversation } from '../../types/campaigns';

const sampleBroadcasts: BroadcastMessage[] = [
  {
    id: '1',
    name: 'Auction Reminder Broadcast',
    content: 'Your chit group auction is tomorrow at 10 AM. Don\'t miss this opportunity!',
    messageType: 'text',
    audienceType: 'segment',
    targetSegments: ['active-members', 'group-a1'],
    customRecipients: [],
    totalRecipients: 320,
    scheduledAt: '2024-03-16T09:00:00',
    timezone: 'Asia/Kolkata',
    platforms: ['whatsapp', 'sms'],
    status: 'scheduled',
    sentCount: 0,
    deliveredCount: 0,
    readCount: 0,
    failedCount: 0,
    deliveryRate: 0,
    readRate: 0,
    responseRate: 0,
    attachments: [],
    estimatedCost: 1600,
    actualCost: 0,
    createdAt: '2024-03-15',
    createdBy: 'operations@ramnirmalchits.com',
    updatedAt: '2024-03-15'
  },
  {
    id: '2',
    name: 'Festival Greetings',
    content: 'Wishing you and your family a very Happy Diwali! May this festival bring prosperity and joy to your life.',
    messageType: 'image',
    audienceType: 'all',
    targetSegments: [],
    customRecipients: [],
    totalRecipients: 5000,
    platforms: ['whatsapp', 'telegram'],
    status: 'sent',
    sentCount: 5000,
    deliveredCount: 4950,
    readCount: 4200,
    failedCount: 50,
    deliveryRate: 99.0,
    readRate: 84.8,
    responseRate: 15.2,
    attachments: [
      {
        id: 'att_1',
        name: 'diwali-greetings.jpg',
        type: 'image/jpeg',
        size: 245760,
        url: '/images/diwali-greetings.jpg',
        thumbnailUrl: '/images/diwali-greetings-thumb.jpg'
      }
    ],
    estimatedCost: 25000,
    actualCost: 24750,
    createdAt: '2024-03-10',
    createdBy: 'marketing@ramnirmalchits.com',
    updatedAt: '2024-03-12'
  },
  {
    id: '3',
    name: 'New Scheme Announcement',
    content: 'Exciting news! We\'re launching a new premium chit scheme with enhanced benefits. Register now for early bird offers!',
    messageType: 'text',
    audienceType: 'segment',
    targetSegments: ['high-value-customers', 'prospects'],
    customRecipients: [],
    totalRecipients: 1200,
    platforms: ['whatsapp', 'sms', 'email'],
    status: 'sent',
    sentCount: 1200,
    deliveredCount: 1180,
    readCount: 950,
    failedCount: 20,
    deliveryRate: 98.3,
    readRate: 80.5,
    responseRate: 22.8,
    attachments: [],
    estimatedCost: 12000,
    actualCost: 11800,
    createdAt: '2024-03-08',
    createdBy: 'priya.sharma@ramnirmalchits.com',
    updatedAt: '2024-03-10'
  },
  {
    id: '4',
    name: 'Payment Confirmation',
    content: 'Thank you! Your payment of ₹{amount} for {scheme_name} has been received successfully. Receipt: {receipt_number}',
    messageType: 'template',
    audienceType: 'custom',
    targetSegments: [],
    customRecipients: ['recent-payers'],
    totalRecipients: 450,
    platforms: ['whatsapp', 'sms'],
    status: 'running',
    sentCount: 380,
    deliveredCount: 375,
    readCount: 370,
    failedCount: 5,
    deliveryRate: 98.7,
    readRate: 98.7,
    responseRate: 5.2,
    attachments: [],
    estimatedCost: 2250,
    actualCost: 1900,
    createdAt: '2024-03-01',
    createdBy: 'accounts@ramnirmalchits.com',
    updatedAt: '2024-03-15'
  }
];

const sampleConversations: Conversation[] = [
  {
    id: '1',
    customerId: 'cust_001',
    customerName: 'Rajesh Gupta',
    customerPhone: '+91 98765 43210',
    customerEmail: 'rajesh@techcorp.com',
    subject: 'Chit scheme inquiry',
    status: 'open',
    priority: 'high',
    assignedTo: 'Priya Sharma',
    assignedAt: '2024-03-15T10:00:00',
    department: 'Sales',
    messages: [],
    lastMessageAt: '2024-03-15T14:30:00',
    lastMessageBy: 'Rajesh Gupta',
    responseTime: 45,
    messageCount: 8,
    platform: 'whatsapp',
    platformId: 'wa_001',
    tags: ['inquiry', 'premium-scheme'],
    category: 'sales',
    createdAt: '2024-03-15T10:00:00',
    updatedAt: '2024-03-15T14:30:00'
  },
  {
    id: '2',
    customerId: 'cust_002',
    customerName: 'Sunita Reddy',
    customerPhone: '+91 98765 43211',
    customerEmail: 'sunita@gmail.com',
    subject: 'Payment issue',
    status: 'in-progress',
    priority: 'critical',
    assignedTo: 'Karthik Nair',
    assignedAt: '2024-03-14T16:00:00',
    department: 'Support',
    messages: [],
    lastMessageAt: '2024-03-15T12:15:00',
    lastMessageBy: 'Karthik Nair',
    responseTime: 30,
    resolutionTime: 120,
    messageCount: 12,
    platform: 'webchat',
    platformId: 'chat_002',
    tags: ['payment', 'urgent'],
    category: 'support',
    createdAt: '2024-03-14T16:00:00',
    updatedAt: '2024-03-15T12:15:00',
    satisfaction: 4
  }
];

const BroadcastCard: React.FC<{ broadcast: BroadcastMessage }> = React.memo(({ broadcast }) => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'sent': return 'bg-green-100 text-green-800 border-green-200';
      case 'sending': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'scheduled': return 'bg-purple-100 text-purple-800 border-purple-200';
      case 'draft': return 'bg-gray-100 text-gray-800 border-gray-200';
      case 'failed': return 'bg-red-100 text-red-800 border-red-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getMessageTypeIcon = (type: string) => {
    switch (type) {
      case 'text': return MessageSquare;
      case 'image': return Image;
      case 'template': return FileText;
      case 'document': return Paperclip;
      default: return MessageSquare;
    }
  };

  const TypeIcon = getMessageTypeIcon(broadcast.messageType);

  return (
    <div className="bg-slate-800/40 backdrop-blur-xl rounded-2xl p-6 border border-yellow-400/30 hover:border-yellow-400/50 transition-all">
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center space-x-3">
          <div className="p-3 bg-green-500/20 rounded-xl border border-yellow-400/30">
            <TypeIcon className="h-6 w-6 text-green-400" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-slate-50">{broadcast.name}</h3>
            <p className="text-sm text-slate-400 capitalize">{broadcast.messageType} message</p>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium border ${getStatusColor(broadcast.status)}`}>
            {broadcast.status.toUpperCase()}
          </span>
          <button className="p-2 text-slate-400 hover:text-slate-50 hover:bg-slate-700/50 rounded-lg transition-all">
            <MoreVertical className="h-4 w-4" />
          </button>
        </div>
      </div>

      <p className="text-sm text-slate-300 mb-4 line-clamp-2">{broadcast.content}</p>

      <div className="grid grid-cols-2 gap-4 mb-4">
        <div className="space-y-2">
          <div className="flex items-center justify-between text-sm">
            <span className="text-slate-400">Recipients</span>
            <span className="text-slate-50 font-medium">{broadcast.totalRecipients.toLocaleString()}</span>
          </div>
          <div className="flex items-center justify-between text-sm">
            <span className="text-slate-400">Sent</span>
            <span className="text-blue-400 font-medium">{broadcast.sentCount.toLocaleString()}</span>
          </div>
          <div className="flex items-center justify-between text-sm">
            <span className="text-slate-400">Delivered</span>
            <span className="text-green-400 font-medium">{broadcast.deliveredCount.toLocaleString()}</span>
          </div>
        </div>
        <div className="space-y-2">
          <div className="flex items-center justify-between text-sm">
            <span className="text-slate-400">Read</span>
            <span className="text-purple-400 font-medium">{broadcast.readCount.toLocaleString()}</span>
          </div>
          <div className="flex items-center justify-between text-sm">
            <span className="text-slate-400">Failed</span>
            <span className="text-red-400 font-medium">{broadcast.failedCount.toLocaleString()}</span>
          </div>
          <div className="flex items-center justify-between text-sm">
            <span className="text-slate-400">Response Rate</span>
            <span className="text-orange-400 font-medium">{broadcast.responseRate}%</span>
          </div>
        </div>
      </div>

      {/* Platforms */}
      <div className="mb-4">
        <p className="text-xs text-slate-500 mb-2">Platforms:</p>
        <div className="flex flex-wrap gap-1">
          {broadcast.platforms.map((platform, index) => (
            <span key={index} className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-blue-100 text-blue-800 border border-blue-200 capitalize">
              {platform}
            </span>
          ))}
        </div>
      </div>

      {broadcast.scheduledAt && (
        <div className="mb-4 p-3 bg-slate-700/30 rounded-xl border border-yellow-400/20">
          <div className="flex items-center justify-between text-sm">
            <span className="text-slate-400">Scheduled</span>
            <span className="text-purple-400 font-medium">{new Date(broadcast.scheduledAt).toLocaleString()}</span>
          </div>
        </div>
      )}

      <div className="flex justify-between items-center pt-4 border-t border-yellow-400/20">
        <div className="flex items-center text-xs text-slate-500">
          <Calendar className="h-3 w-3 mr-1" />
          <span>Created {new Date(broadcast.createdAt).toLocaleDateString()}</span>
        </div>
        <div className="flex space-x-2">
          <button className="p-2 text-slate-400 hover:text-blue-400 hover:bg-blue-500/10 rounded-lg transition-all">
            <Eye className="h-4 w-4" />
          </button>
          <button className="p-2 text-slate-400 hover:text-green-400 hover:bg-green-500/10 rounded-lg transition-all">
            <Activity className="h-4 w-4" />
          </button>
          <button className="p-2 text-slate-400 hover:text-purple-400 hover:bg-purple-500/10 rounded-lg transition-all">
            <Copy className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );
});

const ConversationCard: React.FC<{ conversation: Conversation }> = React.memo(({ conversation }) => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'open': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'in-progress': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'resolved': return 'bg-green-100 text-green-800 border-green-200';
      case 'closed': return 'bg-gray-100 text-gray-800 border-gray-200';
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

  const getPlatformIcon = (platform: string) => {
    switch (platform) {
      case 'whatsapp': return MessageSquare;
      case 'telegram': return MessageSquare;
      case 'facebook': return MessageSquare;
      case 'instagram': return MessageSquare;
      case 'webchat': return Globe;
      case 'sms': return Smartphone;
      default: return MessageSquare;
    }
  };

  const PlatformIcon = getPlatformIcon(conversation.platform);

  return (
    <div className="bg-slate-800/40 backdrop-blur-xl rounded-2xl p-6 border border-yellow-400/30 hover:border-yellow-400/50 transition-all">
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center space-x-3">
          <div className="h-12 w-12 bg-slate-600/50 rounded-full flex items-center justify-center text-slate-50 font-semibold border border-yellow-400/30">
            {conversation.customerName.split(' ').map(n => n[0]).join('')}
          </div>
          <div>
            <h3 className="text-lg font-semibold text-slate-50">{conversation.customerName}</h3>
            <p className="text-sm text-slate-400">{conversation.subject}</p>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <div className={`w-3 h-3 rounded-full ${getPriorityColor(conversation.priority)}`} title={`${conversation.priority} priority`}></div>
          <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium border ${getStatusColor(conversation.status)}`}>
            {conversation.status.replace('-', ' ').toUpperCase()}
          </span>
        </div>
      </div>

      <div className="space-y-2 mb-4">
        <div className="flex items-center text-sm text-slate-300">
          <PlatformIcon className="h-4 w-4 mr-2 text-slate-500" />
          <span className="capitalize">{conversation.platform}</span>
        </div>
        <div className="flex items-center text-sm text-slate-300">
          <Phone className="h-4 w-4 mr-2 text-slate-500" />
          <span>{conversation.customerPhone}</span>
        </div>
        <div className="flex items-center text-sm text-slate-300">
          <Users className="h-4 w-4 mr-2 text-slate-500" />
          <span>Assigned to: {conversation.assignedTo}</span>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 mb-4 pt-4 border-t border-yellow-400/20">
        <div>
          <p className="text-xs text-slate-500">Messages</p>
          <p className="text-lg font-semibold text-slate-50">{conversation.messageCount}</p>
        </div>
        <div>
          <p className="text-xs text-slate-500">Response Time</p>
          <p className="text-lg font-semibold text-blue-400">{conversation.responseTime}m</p>
        </div>
      </div>

      {/* Tags */}
      {conversation.tags.length > 0 && (
        <div className="mb-4">
          <div className="flex flex-wrap gap-1">
            {conversation.tags.map((tag, index) => (
              <span key={index} className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-blue-100 text-blue-800 border border-blue-200">
                #{tag}
              </span>
            ))}
          </div>
        </div>
      )}

      {conversation.satisfaction && (
        <div className="mb-4 p-3 bg-green-500/10 border border-green-500/30 rounded-lg">
          <div className="flex items-center justify-between">
            <span className="text-sm text-green-400">Satisfaction</span>
            <div className="flex items-center space-x-1">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className={`h-4 w-4 ${i < conversation.satisfaction! ? 'text-yellow-400 fill-current' : 'text-slate-500'}`} />
              ))}
            </div>
          </div>
        </div>
      )}

      <div className="flex justify-between items-center pt-4 border-t border-yellow-400/20">
        <div className="flex items-center text-xs text-slate-500">
          <Clock className="h-3 w-3 mr-1" />
          <span>Last message {new Date(conversation.lastMessageAt).toLocaleDateString()}</span>
        </div>
        <div className="flex space-x-2">
          <button className="p-2 text-slate-400 hover:text-blue-400 hover:bg-blue-500/10 rounded-lg transition-all">
            <Eye className="h-4 w-4" />
          </button>
          <button className="p-2 text-slate-400 hover:text-green-400 hover:bg-green-500/10 rounded-lg transition-all">
            <MessageSquare className="h-4 w-4" />
          </button>
          <button className="p-2 text-slate-400 hover:text-purple-400 hover:bg-purple-500/10 rounded-lg transition-all">
            <Phone className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );
});

export const ChatBroadcast: React.FC = () => {
  const [broadcasts] = useState<BroadcastMessage[]>(sampleBroadcasts);
  const [conversations] = useState<Conversation[]>(sampleConversations);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [activeTab, setActiveTab] = useState('broadcasts');

  const filteredBroadcasts = useMemo(() => broadcasts.filter(broadcast => {
    const matchesSearch = broadcast.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         broadcast.content.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === 'all' || broadcast.status === filterStatus;
    
    return matchesSearch && matchesStatus;
  }), [broadcasts, searchTerm, filterStatus]);

  const filteredConversations = useMemo(() => conversations.filter(conversation => {
    const matchesSearch = conversation.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         conversation.subject?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === 'all' || conversation.status === filterStatus;
    
    return matchesSearch && matchesStatus;
  }), [conversations, searchTerm, filterStatus]);

  const broadcastStats = useMemo(() => ({
    total: broadcasts.length,
    sent: broadcasts.filter(b => b.status === 'sent').length,
    scheduled: broadcasts.filter(b => b.status === 'scheduled').length,
    sending: broadcasts.filter(b => b.status === 'sending').length,
    draft: broadcasts.filter(b => b.status === 'draft').length,
    failed: broadcasts.filter(b => b.status === 'failed').length,
    totalRecipients: broadcasts.reduce((sum, b) => sum + b.totalRecipients, 0),
    totalSent: broadcasts.reduce((sum, b) => sum + b.sentCount, 0),
    avgDeliveryRate: broadcasts.length > 0 ? broadcasts.reduce((sum, b) => sum + b.deliveryRate, 0) / broadcasts.length : 0,
    avgReadRate: broadcasts.length > 0 ? broadcasts.reduce((sum, b) => sum + b.readRate, 0) / broadcasts.length : 0,
    totalCost: broadcasts.reduce((sum, b) => sum + b.actualCost, 0)
  }), [broadcasts]);

  const conversationStats = useMemo(() => ({
    total: conversations.length,
    open: conversations.filter(c => c.status === 'open').length,
    inProgress: conversations.filter(c => c.status === 'in-progress').length,
    resolved: conversations.filter(c => c.status === 'resolved').length,
    closed: conversations.filter(c => c.status === 'closed').length,
    avgResponseTime: conversations.length > 0 ? conversations.reduce((sum, c) => sum + (c.responseTime || 0), 0) / conversations.length : 0,
    totalMessages: conversations.reduce((sum, c) => sum + c.messageCount, 0)
  }), [conversations]);

  const tabs = [
    { id: 'broadcasts', name: 'Broadcasts', icon: Send, count: broadcasts.length },
    { id: 'conversations', name: 'Conversations', icon: MessageSquare, count: conversations.length }
  ];

  return (
    <div className="h-full flex flex-col bg-slate-900 overflow-hidden">
      {/* Header */}
      <div className="flex justify-between items-center p-4 border-b border-yellow-400/30 flex-shrink-0">
        <div>
          <h1 className="text-2xl font-bold text-slate-50">Chat / Broadcast</h1>
          <p className="mt-1 text-sm text-slate-400">
            Manage broadcast messages and customer conversations
          </p>
        </div>
        <div className="flex space-x-3">
          <button className="inline-flex items-center px-4 py-2 border border-yellow-400/30 text-sm font-medium rounded-lg text-slate-50 bg-slate-700/50 hover:bg-slate-700 transition-all backdrop-blur-sm">
            <Settings className="h-4 w-4 mr-2" />
            Chat Settings
          </button>
          <button className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-lg shadow-sm text-white bg-blue-600 hover:bg-blue-700 transition-all">
            <Plus className="h-4 w-4 mr-2" />
            New Broadcast
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
                <span className="ml-2 bg-slate-700/50 text-slate-300 px-2 py-1 rounded-full text-xs">
                  {tab.count}
                </span>
              </button>
            );
          })}
        </nav>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto p-4 space-y-6 scrollbar-none">
        {/* Stats Cards */}
        {activeTab === 'broadcasts' ? (
          <div className="grid grid-cols-1 md:grid-cols-5 lg:grid-cols-11 gap-4">
            <div className="bg-slate-800/40 backdrop-blur-xl p-4 rounded-xl border border-yellow-400/30">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-slate-400">Total Broadcasts</p>
                  <p className="text-2xl font-bold text-slate-50">{broadcastStats.total}</p>
                </div>
                <Send className="h-8 w-8 text-blue-400" />
              </div>
            </div>
            <div className="bg-slate-800/40 backdrop-blur-xl p-4 rounded-xl border border-yellow-400/30">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-slate-400">Sent</p>
                  <p className="text-2xl font-bold text-green-400">{broadcastStats.sent}</p>
                </div>
                <CheckCircle className="h-8 w-8 text-green-400" />
              </div>
            </div>
            <div className="bg-slate-800/40 backdrop-blur-xl p-4 rounded-xl border border-yellow-400/30">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-slate-400">Scheduled</p>
                  <p className="text-2xl font-bold text-purple-400">{broadcastStats.scheduled}</p>
                </div>
                <Calendar className="h-8 w-8 text-purple-400" />
              </div>
            </div>
            <div className="bg-slate-800/40 backdrop-blur-xl p-4 rounded-xl border border-yellow-400/30">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-slate-400">Sending</p>
                  <p className="text-2xl font-bold text-blue-400">{broadcastStats.sending}</p>
                </div>
                <Activity className="h-8 w-8 text-blue-400" />
              </div>
            </div>
            <div className="bg-slate-800/40 backdrop-blur-xl p-4 rounded-xl border border-yellow-400/30">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-slate-400">Draft</p>
                  <p className="text-2xl font-bold text-yellow-400">{broadcastStats.draft}</p>
                </div>
                <Edit className="h-8 w-8 text-yellow-400" />
              </div>
            </div>
            <div className="bg-slate-800/40 backdrop-blur-xl p-4 rounded-xl border border-yellow-400/30">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-slate-400">Failed</p>
                  <p className="text-2xl font-bold text-red-400">{broadcastStats.failed}</p>
                </div>
                <XCircle className="h-8 w-8 text-red-400" />
              </div>
            </div>
            <div className="bg-slate-800/40 backdrop-blur-xl p-4 rounded-xl border border-yellow-400/30">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-slate-400">Recipients</p>
                  <p className="text-2xl font-bold text-orange-400">{broadcastStats.totalRecipients.toLocaleString()}</p>
                </div>
                <Users className="h-8 w-8 text-orange-400" />
              </div>
            </div>
            <div className="bg-slate-800/40 backdrop-blur-xl p-4 rounded-xl border border-yellow-400/30">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-slate-400">Messages Sent</p>
                  <p className="text-2xl font-bold text-emerald-400">{broadcastStats.totalSent.toLocaleString()}</p>
                </div>
                <MessageSquare className="h-8 w-8 text-emerald-400" />
              </div>
            </div>
            <div className="bg-slate-800/40 backdrop-blur-xl p-4 rounded-xl border border-yellow-400/30">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-slate-400">Delivery Rate</p>
                  <p className="text-2xl font-bold text-indigo-400">{broadcastStats.avgDeliveryRate.toFixed(1)}%</p>
                </div>
                <Target className="h-8 w-8 text-indigo-400" />
              </div>
            </div>
            <div className="bg-slate-800/40 backdrop-blur-xl p-4 rounded-xl border border-yellow-400/30">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-slate-400">Read Rate</p>
                  <p className="text-2xl font-bold text-pink-400">{broadcastStats.avgReadRate.toFixed(1)}%</p>
                </div>
                <Eye className="h-8 w-8 text-pink-400" />
              </div>
            </div>
            <div className="bg-slate-800/40 backdrop-blur-xl p-4 rounded-xl border border-yellow-400/30">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-slate-400">Total Cost</p>
                  <p className="text-2xl font-bold text-red-400">₹{broadcastStats.totalCost.toLocaleString()}</p>
                </div>
                <div className="h-8 w-8 bg-red-500/20 rounded-lg flex items-center justify-center">
                  <span className="text-red-400 font-bold">₹</span>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-4 lg:grid-cols-7 gap-4">
            <div className="bg-slate-800/40 backdrop-blur-xl p-4 rounded-xl border border-yellow-400/30">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-slate-400">Conversations</p>
                  <p className="text-2xl font-bold text-slate-50">{conversationStats.total}</p>
                </div>
                <MessageSquare className="h-8 w-8 text-blue-400" />
              </div>
            </div>
            <div className="bg-slate-800/40 backdrop-blur-xl p-4 rounded-xl border border-yellow-400/30">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-slate-400">Open</p>
                  <p className="text-2xl font-bold text-blue-400">{conversationStats.open}</p>
                </div>
                <AlertTriangle className="h-8 w-8 text-blue-400" />
              </div>
            </div>
            <div className="bg-slate-800/40 backdrop-blur-xl p-4 rounded-xl border border-yellow-400/30">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-slate-400">In Progress</p>
                  <p className="text-2xl font-bold text-yellow-400">{conversationStats.inProgress}</p>
                </div>
                <Clock className="h-8 w-8 text-yellow-400" />
              </div>
            </div>
            <div className="bg-slate-800/40 backdrop-blur-xl p-4 rounded-xl border border-yellow-400/30">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-slate-400">Resolved</p>
                  <p className="text-2xl font-bold text-green-400">{conversationStats.resolved}</p>
                </div>
                <CheckCircle className="h-8 w-8 text-green-400" />
              </div>
            </div>
            <div className="bg-slate-800/40 backdrop-blur-xl p-4 rounded-xl border border-yellow-400/30">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-slate-400">Closed</p>
                  <p className="text-2xl font-bold text-gray-400">{conversationStats.closed}</p>
                </div>
                <Archive className="h-8 w-8 text-gray-400" />
              </div>
            </div>
            <div className="bg-slate-800/40 backdrop-blur-xl p-4 rounded-xl border border-yellow-400/30">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-slate-400">Avg Response</p>
                  <p className="text-2xl font-bold text-purple-400">{conversationStats.avgResponseTime.toFixed(0)}m</p>
                </div>
                <Timer className="h-8 w-8 text-purple-400" />
              </div>
            </div>
            <div className="bg-slate-800/40 backdrop-blur-xl p-4 rounded-xl border border-yellow-400/30">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-slate-400">Total Messages</p>
                  <p className="text-2xl font-bold text-orange-400">{conversationStats.totalMessages}</p>
                </div>
                <Activity className="h-8 w-8 text-orange-400" />
              </div>
            </div>
          </div>
        )}

        {/* Filters */}
        <div className="bg-slate-800/40 backdrop-blur-xl rounded-xl p-4 border border-yellow-400/30">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
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
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="px-3 py-2 bg-slate-700/50 border border-yellow-400/30 rounded-lg text-slate-50 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 backdrop-blur-sm"
            >
              <option value="all">All Status</option>
              {activeTab === 'broadcasts' ? (
                <>
                  <option value="sent">Sent</option>
                  <option value="scheduled">Scheduled</option>
                  <option value="sending">Sending</option>
                  <option value="draft">Draft</option>
                  <option value="failed">Failed</option>
                </>
              ) : (
                <>
                  <option value="open">Open</option>
                  <option value="in-progress">In Progress</option>
                  <option value="resolved">Resolved</option>
                  <option value="closed">Closed</option>
                </>
              )}
            </select>
            <div className="text-sm text-slate-400">
              Showing: <span className="font-semibold text-slate-50">
                {activeTab === 'broadcasts' ? filteredBroadcasts.length : filteredConversations.length}
              </span> {activeTab}
            </div>
          </div>
        </div>

        {/* Content Display */}
        {activeTab === 'broadcasts' ? (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {filteredBroadcasts.map((broadcast) => (
              <BroadcastCard key={broadcast.id} broadcast={broadcast} />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {filteredConversations.map((conversation) => (
              <ConversationCard key={conversation.id} conversation={conversation} />
            ))}
          </div>
        )}

        {((activeTab === 'broadcasts' && filteredBroadcasts.length === 0) || 
          (activeTab === 'conversations' && filteredConversations.length === 0)) && (
          <div className="text-center py-12">
            {activeTab === 'broadcasts' ? (
              <Send className="h-12 w-12 mx-auto text-slate-500 mb-4" />
            ) : (
              <MessageSquare className="h-12 w-12 mx-auto text-slate-500 mb-4" />
            )}
            <h3 className="text-lg font-medium text-slate-50 mb-2">
              No {activeTab} found
            </h3>
            <p className="text-sm text-slate-400">Try adjusting your search criteria or create a new {activeTab.slice(0, -1)}.</p>
          </div>
        )}
      </div>
    </div>
  );
};