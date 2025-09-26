import React, { useState, useMemo } from 'react';
import {
  Plus,
  Search,
  Edit,
  Trash2,
  Eye,
  Copy,
  Send,
  Mail,
  MessageSquare,
  Bell,
  FileText,
  Image,
  Paperclip,
  Calendar,
  Users,
  Star,
  CheckCircle,
  XCircle,
  Clock,
  Download,
  Upload,
  Settings,
  MoreVertical,
  Tag,
  Palette,
  Code,
  Globe,
  Smartphone,
  Monitor,
  Zap,
  Target,
  Award,
  TrendingUp
} from 'lucide-react';
import { MessageTemplate } from '../../types/campaigns';

const sampleTemplates: MessageTemplate[] = [
  {
    id: '1',
    name: 'Welcome Email Template',
    description: 'Welcome email for new chit fund members with onboarding information',
    category: 'welcome',
    subject: 'Welcome to {company_name} - Your Financial Journey Begins!',
    content: `Dear {member_name},

Welcome to the {company_name} family! We're excited to have you join our community of smart investors.

Your chit fund details:
- Scheme: {scheme_name}
- Monthly Contribution: ₹{monthly_amount}
- Duration: {duration} months
- Start Date: {start_date}

What's next?
1. Complete your KYC documentation
2. Set up auto-pay for convenience
3. Join our member WhatsApp group

If you have any questions, our team is here to help!

Best regards,
{company_name} Team`,
    messageType: 'html',
    platforms: ['email'],
    variables: [
      { name: 'member_name', type: 'text', description: 'Member full name', defaultValue: '', isRequired: true, validation: '' },
      { name: 'company_name', type: 'text', description: 'Company name', defaultValue: 'Ramnirmalchits', isRequired: true, validation: '' },
      { name: 'scheme_name', type: 'text', description: 'Chit scheme name', defaultValue: '', isRequired: true, validation: '' },
      { name: 'monthly_amount', type: 'currency', description: 'Monthly contribution amount', defaultValue: '', isRequired: true, validation: '' },
      { name: 'duration', type: 'number', description: 'Scheme duration in months', defaultValue: '', isRequired: true, validation: '' },
      { name: 'start_date', type: 'date', description: 'Scheme start date', defaultValue: '', isRequired: true, validation: '' }
    ],
    backgroundColor: '#ffffff',
    textColor: '#333333',
    buttonColor: '#3b82f6',
    headerImage: '/images/welcome-header.jpg',
    footerText: 'This email was sent by {company_name}. If you no longer wish to receive these emails, you can unsubscribe.',
    usageCount: 1250,
    lastUsed: '2024-03-14',
    status: 'active',
    isApproved: true,
    approvedBy: 'marketing@ramnirmalchits.com',
    approvedAt: '2024-01-15',
    createdAt: '2024-01-10',
    createdBy: 'marketing@ramnirmalchits.com',
    updatedAt: '2024-02-20',
    updatedBy: 'marketing@ramnirmalchits.com',
    avgOpenRate: 85.2,
    avgClickRate: 35.8,
    avgConversionRate: 25.4
  },
  {
    id: '2',
    name: 'Payment Reminder SMS',
    description: 'SMS template for payment reminders with personalized details',
    category: 'reminder',
    content: 'Hi {member_name}, your {scheme_name} payment of ₹{amount} is due on {due_date}. Pay now: {payment_link}. For help, call {support_phone}.',
    messageType: 'text',
    platforms: ['sms', 'whatsapp'],
    variables: [
      { name: 'member_name', type: 'text', description: 'Member name', defaultValue: '', isRequired: true, validation: '' },
      { name: 'scheme_name', type: 'text', description: 'Scheme name', defaultValue: '', isRequired: true, validation: '' },
      { name: 'amount', type: 'currency', description: 'Payment amount', defaultValue: '', isRequired: true, validation: '' },
      { name: 'due_date', type: 'date', description: 'Payment due date', defaultValue: '', isRequired: true, validation: '' },
      { name: 'payment_link', type: 'text', description: 'Payment portal link', defaultValue: '', isRequired: false, validation: '' },
      { name: 'support_phone', type: 'text', description: 'Support phone number', defaultValue: '+91 98765 43210', isRequired: false, validation: '' }
    ],
    usageCount: 8750,
    lastUsed: '2024-03-15',
    status: 'active',
    isApproved: true,
    approvedBy: 'operations@ramnirmalchits.com',
    approvedAt: '2024-01-20',
    createdAt: '2024-01-15',
    createdBy: 'operations@ramnirmalchits.com',
    updatedAt: '2024-03-01',
    updatedBy: 'operations@ramnirmalchits.com',
    avgOpenRate: 98.5,
    avgClickRate: 28.3,
    avgConversionRate: 78.9
  },
  {
    id: '3',
    name: 'Auction Notification',
    description: 'WhatsApp template for auction notifications with venue and timing details',
    category: 'notification',
    subject: 'Auction Alert - {scheme_name}',
    content: `🔔 AUCTION NOTIFICATION

Dear {member_name},

Your chit group "{scheme_name}" auction is scheduled:

📅 Date: {auction_date}
⏰ Time: {auction_time}
📍 Venue: {venue_address}

Important Notes:
• Bring your membership card
• Auction starts sharp at {auction_time}
• Minimum bid: ₹{min_bid}

Good luck! 🍀

{company_name}`,
    messageType: 'text',
    platforms: ['whatsapp', 'telegram'],
    variables: [
      { name: 'member_name', type: 'text', description: 'Member name', defaultValue: '', isRequired: true, validation: '' },
      { name: 'scheme_name', type: 'text', description: 'Chit scheme name', defaultValue: '', isRequired: true, validation: '' },
      { name: 'auction_date', type: 'date', description: 'Auction date', defaultValue: '', isRequired: true, validation: '' },
      { name: 'auction_time', type: 'text', description: 'Auction time', defaultValue: '', isRequired: true, validation: '' },
      { name: 'venue_address', type: 'text', description: 'Auction venue', defaultValue: '', isRequired: true, validation: '' },
      { name: 'min_bid', type: 'currency', description: 'Minimum bid amount', defaultValue: '', isRequired: true, validation: '' },
      { name: 'company_name', type: 'text', description: 'Company name', defaultValue: 'Ramnirmalchits', isRequired: false, validation: '' }
    ],
    usageCount: 420,
    lastUsed: '2024-03-10',
    status: 'active',
    isApproved: true,
    approvedBy: 'operations@ramnirmalchits.com',
    approvedAt: '2024-02-01',
    createdAt: '2024-01-25',
    createdBy: 'operations@ramnirmalchits.com',
    updatedAt: '2024-02-15',
    updatedBy: 'operations@ramnirmalchits.com',
    avgOpenRate: 95.8,
    avgClickRate: 45.2,
    avgConversionRate: 88.5
  },
  {
    id: '4',
    name: 'Promotional Offer Email',
    description: 'Promotional email template for special offers and new scheme launches',
    category: 'promotional',
    subject: '🎉 Special Offer: {offer_title} - Limited Time!',
    content: `<div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
  <header style="background: linear-gradient(135deg, #3b82f6, #1e40af); padding: 20px; text-align: center;">
    <h1 style="color: white; margin: 0;">{offer_title}</h1>
    <p style="color: #e0e7ff; margin: 10px 0 0 0;">{offer_subtitle}</p>
  </header>
  
  <main style="padding: 30px 20px;">
    <p>Dear {member_name},</p>
    
    <p>We're excited to announce our latest offer just for you!</p>
    
    <div style="background: #f8fafc; padding: 20px; border-radius: 8px; margin: 20px 0;">
      <h3 style="color: #1e40af; margin-top: 0;">Offer Details:</h3>
      <ul>
        <li>Scheme: {scheme_name}</li>
        <li>Special Rate: {special_rate}</li>
        <li>Valid Until: {expiry_date}</li>
      </ul>
    </div>
    
    <div style="text-align: center; margin: 30px 0;">
      <a href="{cta_link}" style="background: #3b82f6; color: white; padding: 12px 30px; text-decoration: none; border-radius: 6px; display: inline-block;">
        {cta_text}
      </a>
    </div>
    
    <p>This is a limited-time offer. Don't miss out!</p>
  </main>
  
  <footer style="background: #f1f5f9; padding: 20px; text-align: center; font-size: 12px; color: #64748b;">
    <p>{company_name} | {company_address} | {company_phone}</p>
  </footer>
</div>`,
    messageType: 'html',
    platforms: ['email'],
    variables: [
      { name: 'member_name', type: 'text', description: 'Member name', defaultValue: '', isRequired: true, validation: '' },
      { name: 'offer_title', type: 'text', description: 'Offer title', defaultValue: '', isRequired: true, validation: '' },
      { name: 'offer_subtitle', type: 'text', description: 'Offer subtitle', defaultValue: '', isRequired: false, validation: '' },
      { name: 'scheme_name', type: 'text', description: 'Scheme name', defaultValue: '', isRequired: true, validation: '' },
      { name: 'special_rate', type: 'text', description: 'Special offer rate', defaultValue: '', isRequired: true, validation: '' },
      { name: 'expiry_date', type: 'date', description: 'Offer expiry date', defaultValue: '', isRequired: true, validation: '' },
      { name: 'cta_link', type: 'text', description: 'Call-to-action link', defaultValue: '', isRequired: true, validation: '' },
      { name: 'cta_text', type: 'text', description: 'Call-to-action text', defaultValue: 'Apply Now', isRequired: false, validation: '' }
    ],
    backgroundColor: '#ffffff',
    textColor: '#333333',
    buttonColor: '#3b82f6',
    usageCount: 85,
    lastUsed: '2024-03-05',
    status: 'active',
    isApproved: true,
    approvedBy: 'marketing@ramnirmalchits.com',
    approvedAt: '2024-02-10',
    createdAt: '2024-02-05',
    createdBy: 'marketing@ramnirmalchits.com',
    updatedAt: '2024-02-25',
    updatedBy: 'marketing@ramnirmalchits.com',
    avgOpenRate: 72.4,
    avgClickRate: 18.6,
    avgConversionRate: 12.3
  },
  {
    id: '5',
    name: 'Payment Confirmation',
    description: 'Automated confirmation message for successful payments',
    category: 'transactional',
    content: '✅ Payment Confirmed!\n\nHi {member_name}, your payment of ₹{amount} for {scheme_name} has been received.\n\nReceipt: {receipt_number}\nDate: {payment_date}\nBalance: ₹{remaining_balance}\n\nThank you for your trust in us!',
    messageType: 'text',
    platforms: ['sms', 'whatsapp'],
    variables: [
      { name: 'member_name', type: 'text', description: 'Member name', defaultValue: '', isRequired: true, validation: '' },
      { name: 'amount', type: 'currency', description: 'Payment amount', defaultValue: '', isRequired: true, validation: '' },
      { name: 'scheme_name', type: 'text', description: 'Scheme name', defaultValue: '', isRequired: true, validation: '' },
      { name: 'receipt_number', type: 'text', description: 'Receipt number', defaultValue: '', isRequired: true, validation: '' },
      { name: 'payment_date', type: 'date', description: 'Payment date', defaultValue: '', isRequired: true, validation: '' },
      { name: 'remaining_balance', type: 'currency', description: 'Remaining balance', defaultValue: '', isRequired: false, validation: '' }
    ],
    usageCount: 3200,
    lastUsed: '2024-03-15',
    status: 'active',
    isApproved: true,
    approvedBy: 'accounts@ramnirmalchits.com',
    approvedAt: '2024-01-10',
    createdAt: '2024-01-05',
    createdBy: 'accounts@ramnirmalchits.com',
    updatedAt: '2024-02-10',
    updatedBy: 'accounts@ramnirmalchits.com',
    avgOpenRate: 99.2,
    avgClickRate: 15.8,
    avgConversionRate: 95.5
  },
  {
    id: '6',
    name: 'Birthday Wishes',
    description: 'Personalized birthday wishes for members with special offers',
    category: 'promotional',
    subject: '🎂 Happy Birthday {member_name}! Special Gift Inside',
    content: `🎉 Happy Birthday, {member_name}! 🎂

On your special day, we want to celebrate with you!

🎁 Birthday Special Offer:
• Extra 2% returns on new investments
• Zero processing fee for this month
• Priority customer service

This offer is valid until {offer_expiry}.

Wishing you happiness, prosperity, and many more successful years ahead!

Celebrate with us: {celebration_link}

Warm wishes,
{company_name} Family`,
    messageType: 'text',
    platforms: ['whatsapp', 'sms', 'email'],
    variables: [
      { name: 'member_name', type: 'text', description: 'Member name', defaultValue: '', isRequired: true, validation: '' },
      { name: 'offer_expiry', type: 'date', description: 'Offer expiry date', defaultValue: '', isRequired: true, validation: '' },
      { name: 'celebration_link', type: 'text', description: 'Celebration page link', defaultValue: '', isRequired: false, validation: '' },
      { name: 'company_name', type: 'text', description: 'Company name', defaultValue: 'Ramnirmalchits', isRequired: false, validation: '' }
    ],
    usageCount: 180,
    lastUsed: '2024-03-12',
    status: 'active',
    isApproved: true,
    approvedBy: 'marketing@ramnirmalchits.com',
    approvedAt: '2024-02-20',
    createdAt: '2024-02-15',
    createdBy: 'marketing@ramnirmalchits.com',
    updatedAt: '2024-03-01',
    updatedBy: 'marketing@ramnirmalchits.com',
    avgOpenRate: 92.5,
    avgClickRate: 42.1,
    avgConversionRate: 18.7
  },
  {
    id: '7',
    name: 'Support Ticket Response',
    description: 'Standard response template for customer support tickets',
    category: 'support',
    subject: 'Re: {ticket_subject} - Ticket #{ticket_number}',
    content: `Dear {customer_name},

Thank you for contacting {company_name} support.

We have received your inquiry regarding: {ticket_subject}

Ticket Details:
- Ticket Number: #{ticket_number}
- Priority: {priority}
- Assigned Agent: {agent_name}
- Expected Resolution: {resolution_time}

Our team is working on your request and will update you within {response_time}.

If you have any urgent concerns, please call us at {support_phone}.

Best regards,
{agent_name}
{company_name} Support Team`,
    messageType: 'text',
    platforms: ['email', 'sms'],
    variables: [
      { name: 'customer_name', type: 'text', description: 'Customer name', defaultValue: '', isRequired: true, validation: '' },
      { name: 'company_name', type: 'text', description: 'Company name', defaultValue: 'Ramnirmalchits', isRequired: false, validation: '' },
      { name: 'ticket_subject', type: 'text', description: 'Ticket subject', defaultValue: '', isRequired: true, validation: '' },
      { name: 'ticket_number', type: 'text', description: 'Ticket number', defaultValue: '', isRequired: true, validation: '' },
      { name: 'priority', type: 'text', description: 'Ticket priority', defaultValue: '', isRequired: true, validation: '' },
      { name: 'agent_name', type: 'text', description: 'Support agent name', defaultValue: '', isRequired: true, validation: '' },
      { name: 'resolution_time', type: 'text', description: 'Expected resolution time', defaultValue: '', isRequired: true, validation: '' },
      { name: 'response_time', type: 'text', description: 'Response time commitment', defaultValue: '', isRequired: true, validation: '' },
      { name: 'support_phone', type: 'text', description: 'Support phone', defaultValue: '+91 98765 43210', isRequired: false, validation: '' }
    ],
    usageCount: 650,
    lastUsed: '2024-03-13',
    status: 'active',
    isApproved: true,
    approvedBy: 'support@ramnirmalchits.com',
    approvedAt: '2024-01-30',
    createdAt: '2024-01-25',
    createdBy: 'support@ramnirmalchits.com',
    updatedAt: '2024-02-28',
    updatedBy: 'support@ramnirmalchits.com',
    avgOpenRate: 96.8,
    avgClickRate: 22.4,
    avgConversionRate: 85.2
  },
  {
    id: '8',
    name: 'Monthly Newsletter',
    description: 'Monthly newsletter template with company updates and financial tips',
    category: 'promotional',
    subject: '📰 {company_name} Monthly Newsletter - {month} {year}',
    content: 'Monthly newsletter content with company updates, financial tips, and member spotlights...',
    messageType: 'html',
    platforms: ['email'],
    variables: [
      { name: 'company_name', type: 'text', description: 'Company name', defaultValue: 'Ramnirmalchits', isRequired: false, validation: '' },
      { name: 'month', type: 'text', description: 'Newsletter month', defaultValue: '', isRequired: true, validation: '' },
      { name: 'year', type: 'text', description: 'Newsletter year', defaultValue: '', isRequired: true, validation: '' }
    ],
    backgroundColor: '#ffffff',
    textColor: '#374151',
    buttonColor: '#3b82f6',
    headerImage: '/images/newsletter-header.jpg',
    usageCount: 12,
    lastUsed: '2024-03-01',
    status: 'draft',
    isApproved: false,
    createdAt: '2024-02-28',
    createdBy: 'marketing@ramnirmalchits.com',
    updatedAt: '2024-03-05',
    updatedBy: 'marketing@ramnirmalchits.com'
  }
];

const TemplateCard: React.FC<{ template: MessageTemplate }> = React.memo(({ template }) => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800 border-green-200';
      case 'draft': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'archived': return 'bg-gray-100 text-gray-800 border-gray-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'welcome': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'promotional': return 'bg-purple-100 text-purple-800 border-purple-200';
      case 'transactional': return 'bg-green-100 text-green-800 border-green-200';
      case 'reminder': return 'bg-orange-100 text-orange-800 border-orange-200';
      case 'notification': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'support': return 'bg-red-100 text-red-800 border-red-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getMessageTypeIcon = (type: string) => {
    switch (type) {
      case 'text': return MessageSquare;
      case 'html': return Code;
      case 'rich-text': return FileText;
      default: return MessageSquare;
    }
  };

  const TypeIcon = getMessageTypeIcon(template.messageType);

  return (
    <div className="bg-slate-800/40 backdrop-blur-xl rounded-2xl p-6 border border-yellow-400/30 hover:border-yellow-400/50 transition-all">
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center space-x-3">
          <div className="p-3 bg-blue-500/20 rounded-xl border border-yellow-400/30">
            <TypeIcon className="h-6 w-6 text-blue-400" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-slate-50">{template.name}</h3>
            <p className="text-sm text-slate-400">{template.description}</p>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium border ${getCategoryColor(template.category)}`}>
            {template.category.toUpperCase()}
          </span>
          <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium border ${getStatusColor(template.status)}`}>
            {template.status.toUpperCase()}
          </span>
          <button className="p-2 text-slate-400 hover:text-slate-50 hover:bg-slate-700/50 rounded-lg transition-all">
            <MoreVertical className="h-4 w-4" />
          </button>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 mb-4">
        <div className="space-y-2">
          <div className="flex items-center justify-between text-sm">
            <span className="text-slate-400">Usage Count</span>
            <span className="text-slate-50 font-medium">{template.usageCount.toLocaleString()}</span>
          </div>
          <div className="flex items-center justify-between text-sm">
            <span className="text-slate-400">Variables</span>
            <span className="text-slate-50 font-medium">{template.variables.length}</span>
          </div>
          <div className="flex items-center justify-between text-sm">
            <span className="text-slate-400">Platforms</span>
            <span className="text-slate-50 font-medium">{template.platforms.length}</span>
          </div>
        </div>
        <div className="space-y-2">
          <div className="flex items-center justify-between text-sm">
            <span className="text-slate-400">Open Rate</span>
            <span className="text-green-400 font-medium">{template.avgOpenRate?.toFixed(1) || 'N/A'}%</span>
          </div>
          <div className="flex items-center justify-between text-sm">
            <span className="text-slate-400">Click Rate</span>
            <span className="text-blue-400 font-medium">{template.avgClickRate?.toFixed(1) || 'N/A'}%</span>
          </div>
          <div className="flex items-center justify-between text-sm">
            <span className="text-slate-400">Conversion</span>
            <span className="text-purple-400 font-medium">{template.avgConversionRate?.toFixed(1) || 'N/A'}%</span>
          </div>
        </div>
      </div>

      {/* Platforms */}
      <div className="mb-4">
        <p className="text-xs text-slate-500 mb-2">Supported Platforms:</p>
        <div className="flex flex-wrap gap-1">
          {template.platforms.map((platform, index) => (
            <span key={index} className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-blue-100 text-blue-800 border border-blue-200 capitalize">
              {platform}
            </span>
          ))}
        </div>
      </div>

      {/* Variables Preview */}
      {template.variables.length > 0 && (
        <div className="mb-4">
          <p className="text-xs text-slate-500 mb-2">Variables ({template.variables.length}):</p>
          <div className="flex flex-wrap gap-1">
            {template.variables.slice(0, 4).map((variable, index) => (
              <span key={index} className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-purple-100 text-purple-800 border border-purple-200">
                {variable.name}
              </span>
            ))}
            {template.variables.length > 4 && (
              <span className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-slate-100 text-slate-800 border border-slate-200">
                +{template.variables.length - 4} more
              </span>
            )}
          </div>
        </div>
      )}

      <div className="flex justify-between items-center pt-4 border-t border-yellow-400/20">
        <div className="flex items-center space-x-2">
          {template.isApproved ? (
            <CheckCircle className="h-4 w-4 text-green-400" title="Approved" />
          ) : (
            <Clock className="h-4 w-4 text-yellow-400" title="Pending Approval" />
          )}
          <div className="flex items-center text-xs text-slate-500">
            <Calendar className="h-3 w-3 mr-1" />
            <span>Last used {template.lastUsed ? new Date(template.lastUsed).toLocaleDateString() : 'Never'}</span>
          </div>
        </div>
        <div className="flex space-x-2">
          <button className="p-2 text-slate-400 hover:text-blue-400 hover:bg-blue-500/10 rounded-lg transition-all">
            <Eye className="h-4 w-4" />
          </button>
          <button className="p-2 text-slate-400 hover:text-green-400 hover:bg-green-500/10 rounded-lg transition-all">
            <Send className="h-4 w-4" />
          </button>
          <button className="p-2 text-slate-400 hover:text-purple-400 hover:bg-purple-500/10 rounded-lg transition-all">
            <Copy className="h-4 w-4" />
          </button>
          <button className="p-2 text-slate-400 hover:text-orange-400 hover:bg-orange-500/10 rounded-lg transition-all">
            <Edit className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );
});

export const Templates: React.FC = () => {
  const [templates] = useState<MessageTemplate[]>(sampleTemplates);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [filterCategory, setFilterCategory] = useState<string>('all');
  const [filterPlatform, setFilterPlatform] = useState<string>('all');

  const filteredTemplates = useMemo(() => templates.filter(template => {
    const matchesSearch = template.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         template.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         template.content.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === 'all' || template.status === filterStatus;
    const matchesCategory = filterCategory === 'all' || template.category === filterCategory;
    const matchesPlatform = filterPlatform === 'all' || template.platforms.includes(filterPlatform as any);
    
    return matchesSearch && matchesStatus && matchesCategory && matchesPlatform;
  }), [templates, searchTerm, filterStatus, filterCategory, filterPlatform]);

  const stats = useMemo(() => ({
    total: templates.length,
    active: templates.filter(t => t.status === 'active').length,
    draft: templates.filter(t => t.status === 'draft').length,
    archived: templates.filter(t => t.status === 'archived').length,
    approved: templates.filter(t => t.isApproved).length,
    pending: templates.filter(t => !t.isApproved).length,
    welcome: templates.filter(t => t.category === 'welcome').length,
    promotional: templates.filter(t => t.category === 'promotional').length,
    transactional: templates.filter(t => t.category === 'transactional').length,
    reminder: templates.filter(t => t.category === 'reminder').length,
    notification: templates.filter(t => t.category === 'notification').length,
    support: templates.filter(t => t.category === 'support').length,
    totalUsage: templates.reduce((sum, t) => sum + t.usageCount, 0),
    avgOpenRate: templates.filter(t => t.avgOpenRate).length > 0 ? 
      templates.filter(t => t.avgOpenRate).reduce((sum, t) => sum + (t.avgOpenRate || 0), 0) / templates.filter(t => t.avgOpenRate).length : 0,
    avgClickRate: templates.filter(t => t.avgClickRate).length > 0 ? 
      templates.filter(t => t.avgClickRate).reduce((sum, t) => sum + (t.avgClickRate || 0), 0) / templates.filter(t => t.avgClickRate).length : 0
  }), [templates]);

  return (
    <div className="h-full flex flex-col bg-slate-900 overflow-hidden">
      {/* Header */}
      <div className="flex justify-between items-center p-4 border-b border-yellow-400/30 flex-shrink-0">
        <div>
          <h1 className="text-2xl font-bold text-slate-50">Templates</h1>
          <p className="mt-1 text-sm text-slate-400">
            Create and manage message templates for campaigns and communications
          </p>
        </div>
        <div className="flex space-x-3">
          <button className="inline-flex items-center px-4 py-2 border border-yellow-400/30 text-sm font-medium rounded-lg text-slate-50 bg-slate-700/50 hover:bg-slate-700 transition-all backdrop-blur-sm">
            <Upload className="h-4 w-4 mr-2" />
            Import Templates
          </button>
          <button className="inline-flex items-center px-4 py-2 border border-yellow-400/30 text-sm font-medium rounded-lg text-slate-50 bg-slate-700/50 hover:bg-slate-700 transition-all backdrop-blur-sm">
            <Download className="h-4 w-4 mr-2" />
            Export
          </button>
          <button className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-lg shadow-sm text-white bg-blue-600 hover:bg-blue-700 transition-all">
            <Plus className="h-4 w-4 mr-2" />
            Create Template
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto p-4 space-y-6 scrollbar-none">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 lg:grid-cols-15 gap-4">
          <div className="bg-slate-800/40 backdrop-blur-xl p-4 rounded-xl border border-yellow-400/30">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-400">Total Templates</p>
                <p className="text-2xl font-bold text-slate-50">{stats.total}</p>
              </div>
              <FileText className="h-8 w-8 text-blue-400" />
            </div>
          </div>
          <div className="bg-slate-800/40 backdrop-blur-xl p-4 rounded-xl border border-yellow-400/30">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-400">Active</p>
                <p className="text-2xl font-bold text-green-400">{stats.active}</p>
              </div>
              <CheckCircle className="h-8 w-8 text-green-400" />
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
                <p className="text-sm text-slate-400">Approved</p>
                <p className="text-2xl font-bold text-emerald-400">{stats.approved}</p>
              </div>
              <Award className="h-8 w-8 text-emerald-400" />
            </div>
          </div>
          <div className="bg-slate-800/40 backdrop-blur-xl p-4 rounded-xl border border-yellow-400/30">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-400">Welcome</p>
                <p className="text-2xl font-bold text-blue-400">{stats.welcome}</p>
              </div>
              <Star className="h-8 w-8 text-blue-400" />
            </div>
          </div>
          <div className="bg-slate-800/40 backdrop-blur-xl p-4 rounded-xl border border-yellow-400/30">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-400">Promotional</p>
                <p className="text-2xl font-bold text-purple-400">{stats.promotional}</p>
              </div>
              <Target className="h-8 w-8 text-purple-400" />
            </div>
          </div>
          <div className="bg-slate-800/40 backdrop-blur-xl p-4 rounded-xl border border-yellow-400/30">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-400">Transactional</p>
                <p className="text-2xl font-bold text-green-400">{stats.transactional}</p>
              </div>
              <CheckCircle className="h-8 w-8 text-green-400" />
            </div>
          </div>
          <div className="bg-slate-800/40 backdrop-blur-xl p-4 rounded-xl border border-yellow-400/30">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-400">Reminder</p>
                <p className="text-2xl font-bold text-orange-400">{stats.reminder}</p>
              </div>
              <Bell className="h-8 w-8 text-orange-400" />
            </div>
          </div>
          <div className="bg-slate-800/40 backdrop-blur-xl p-4 rounded-xl border border-yellow-400/30">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-400">Notification</p>
                <p className="text-2xl font-bold text-yellow-400">{stats.notification}</p>
              </div>
              <Zap className="h-8 w-8 text-yellow-400" />
            </div>
          </div>
          <div className="bg-slate-800/40 backdrop-blur-xl p-4 rounded-xl border border-yellow-400/30">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-400">Support</p>
                <p className="text-2xl font-bold text-red-400">{stats.support}</p>
              </div>
              <Users className="h-8 w-8 text-red-400" />
            </div>
          </div>
          <div className="bg-slate-800/40 backdrop-blur-xl p-4 rounded-xl border border-yellow-400/30">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-400">Total Usage</p>
                <p className="text-2xl font-bold text-indigo-400">{stats.totalUsage.toLocaleString()}</p>
              </div>
              <TrendingUp className="h-8 w-8 text-indigo-400" />
            </div>
          </div>
          <div className="bg-slate-800/40 backdrop-blur-xl p-4 rounded-xl border border-yellow-400/30">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-400">Avg Open Rate</p>
                <p className="text-2xl font-bold text-pink-400">{stats.avgOpenRate.toFixed(1)}%</p>
              </div>
              <Eye className="h-8 w-8 text-pink-400" />
            </div>
          </div>
          <div className="bg-slate-800/40 backdrop-blur-xl p-4 rounded-xl border border-yellow-400/30">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-400">Avg Click Rate</p>
                <p className="text-2xl font-bold text-cyan-400">{stats.avgClickRate.toFixed(1)}%</p>
              </div>
              <Target className="h-8 w-8 text-cyan-400" />
            </div>
          </div>
          <div className="bg-slate-800/40 backdrop-blur-xl p-4 rounded-xl border border-yellow-400/30 md:col-span-2">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-400">Pending Approval</p>
                <p className="text-xl font-bold text-orange-400">{stats.pending}</p>
              </div>
              <Clock className="h-8 w-8 text-orange-400" />
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
                placeholder="Search templates..."
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
              <option value="active">Active</option>
              <option value="draft">Draft</option>
              <option value="archived">Archived</option>
            </select>
            <select
              value={filterCategory}
              onChange={(e) => setFilterCategory(e.target.value)}
              className="px-3 py-2 bg-slate-700/50 border border-yellow-400/30 rounded-lg text-slate-50 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 backdrop-blur-sm"
            >
              <option value="all">All Categories</option>
              <option value="welcome">Welcome</option>
              <option value="promotional">Promotional</option>
              <option value="transactional">Transactional</option>
              <option value="reminder">Reminder</option>
              <option value="notification">Notification</option>
              <option value="support">Support</option>
            </select>
            <select
              value={filterPlatform}
              onChange={(e) => setFilterPlatform(e.target.value)}
              className="px-3 py-2 bg-slate-700/50 border border-yellow-400/30 rounded-lg text-slate-50 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 backdrop-blur-sm"
            >
              <option value="all">All Platforms</option>
              <option value="email">Email</option>
              <option value="sms">SMS</option>
              <option value="whatsapp">WhatsApp</option>
              <option value="telegram">Telegram</option>
              <option value="push">Push</option>
            </select>
            <div className="text-sm text-slate-400">
              Showing: <span className="font-semibold text-slate-50">{filteredTemplates.length}</span> templates
            </div>
          </div>
        </div>

        {/* Templates Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {filteredTemplates.map((template) => (
            <TemplateCard key={template.id} template={template} />
          ))}
        </div>

        {filteredTemplates.length === 0 && (
          <div className="text-center py-12">
            <FileText className="h-12 w-12 mx-auto text-slate-500 mb-4" />
            <h3 className="text-lg font-medium text-slate-50 mb-2">No templates found</h3>
            <p className="text-sm text-slate-400">Try adjusting your search criteria or create a new template.</p>
          </div>
        )}
      </div>
    </div>
  );
};