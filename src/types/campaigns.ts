// Campaigns & Messaging Core Types
export interface Campaign {
  id: string;
  name: string;
  description: string;
  type: 'email' | 'sms' | 'whatsapp' | 'push' | 'multi-channel';
  status: 'draft' | 'scheduled' | 'running' | 'paused' | 'completed' | 'cancelled';
  
  // Targeting
  targetAudience: string[];
  segmentId?: string;
  totalRecipients: number;
  
  // Content
  subject?: string;
  content: string;
  templateId?: string;
  
  // Scheduling
  scheduledAt?: string;
  startDate?: string;
  endDate?: string;
  timezone: string;
  
  // Performance
  sentCount: number;
  deliveredCount: number;
  openedCount: number;
  clickedCount: number;
  unsubscribedCount: number;
  bounceCount: number;
  
  // Metrics
  openRate: number;
  clickRate: number;
  conversionRate: number;
  unsubscribeRate: number;
  bounceRate: number;
  
  // Budget & Cost
  budget?: number;
  costPerSend: number;
  totalCost: number;
  
  // Metadata
  createdAt: string;
  createdBy: string;
  updatedAt: string;
  updatedBy: string;
  
  // A/B Testing
  isABTest: boolean;
  abTestVariants?: CampaignVariant[];
  
  // Automation
  isAutomated: boolean;
  triggers?: CampaignTrigger[];
  
  // Tags and Categories
  tags: string[];
  category: string;
  priority: 'low' | 'medium' | 'high' | 'critical';
}

export interface CampaignVariant {
  id: string;
  name: string;
  subject?: string;
  content: string;
  percentage: number;
  sentCount: number;
  openRate: number;
  clickRate: number;
  conversionRate: number;
}

export interface CampaignTrigger {
  id: string;
  name: string;
  event: string;
  conditions: TriggerCondition[];
  delay?: number; // in minutes
  isActive: boolean;
}

export interface TriggerCondition {
  field: string;
  operator: 'equals' | 'not_equals' | 'contains' | 'greater_than' | 'less_than';
  value: string;
}

export interface EmailJourney {
  id: string;
  name: string;
  description: string;
  status: 'draft' | 'active' | 'paused' | 'completed';
  
  // Journey Configuration
  triggerEvent: string;
  entryConditions: TriggerCondition[];
  exitConditions: TriggerCondition[];
  
  // Journey Steps
  steps: JourneyStep[];
  
  // Performance
  totalEntered: number;
  totalCompleted: number;
  totalExited: number;
  currentActive: number;
  
  // Metrics
  completionRate: number;
  avgTimeToComplete: number; // in hours
  conversionRate: number;
  
  // Metadata
  createdAt: string;
  createdBy: string;
  updatedAt: string;
  updatedBy: string;
  
  // Settings
  timezone: string;
  isRecurring: boolean;
  maxEntries?: number;
}

export interface JourneyStep {
  id: string;
  name: string;
  type: 'email' | 'sms' | 'wait' | 'condition' | 'action';
  order: number;
  
  // Content (for email/sms steps)
  subject?: string;
  content?: string;
  templateId?: string;
  
  // Wait step
  waitDuration?: number; // in minutes
  waitUnit?: 'minutes' | 'hours' | 'days';
  
  // Condition step
  conditions?: TriggerCondition[];
  trueStepId?: string;
  falseStepId?: string;
  
  // Action step
  actionType?: string;
  actionData?: any;
  
  // Performance
  enteredCount: number;
  completedCount: number;
  openRate?: number;
  clickRate?: number;
  
  // Settings
  isActive: boolean;
  canSkip: boolean;
}

export interface ChatMessage {
  id: string;
  conversationId: string;
  senderId: string;
  senderName: string;
  senderType: 'customer' | 'agent' | 'system' | 'bot';
  
  // Message Content
  content: string;
  messageType: 'text' | 'image' | 'file' | 'template' | 'quick-reply' | 'location';
  attachments: MessageAttachment[];
  
  // Message Status
  status: 'sent' | 'delivered' | 'read' | 'failed';
  timestamp: string;
  
  // Threading
  replyToId?: string;
  isForwarded: boolean;
  forwardedFrom?: string;
  
  // Metadata
  platform: 'whatsapp' | 'telegram' | 'facebook' | 'instagram' | 'webchat' | 'sms';
  deviceInfo?: string;
  location?: string;
  
  // AI/Bot
  isFromBot: boolean;
  botConfidence?: number;
  intent?: string;
  entities?: any[];
}

export interface MessageAttachment {
  id: string;
  name: string;
  type: string;
  size: number;
  url: string;
  thumbnailUrl?: string;
}

export interface Conversation {
  id: string;
  customerId: string;
  customerName: string;
  customerPhone: string;
  customerEmail?: string;
  
  // Conversation Details
  subject?: string;
  status: 'open' | 'in-progress' | 'resolved' | 'closed';
  priority: 'low' | 'medium' | 'high' | 'critical';
  
  // Assignment
  assignedTo?: string;
  assignedAt?: string;
  department: string;
  
  // Conversation Flow
  messages: ChatMessage[];
  lastMessageAt: string;
  lastMessageBy: string;
  
  // Metrics
  responseTime?: number; // in minutes
  resolutionTime?: number; // in minutes
  messageCount: number;
  
  // Platform
  platform: 'whatsapp' | 'telegram' | 'facebook' | 'instagram' | 'webchat' | 'sms';
  platformId: string;
  
  // Tags and Categories
  tags: string[];
  category?: string;
  
  // Metadata
  createdAt: string;
  updatedAt: string;
  
  // Customer Satisfaction
  satisfaction?: number; // 1-5 rating
  feedback?: string;
}

export interface BroadcastMessage {
  id: string;
  name: string;
  content: string;
  messageType: 'text' | 'image' | 'template' | 'document';
  
  // Targeting
  audienceType: 'all' | 'segment' | 'custom';
  targetSegments: string[];
  customRecipients: string[];
  totalRecipients: number;
  
  // Scheduling
  scheduledAt?: string;
  timezone: string;
  
  // Platform
  platforms: ('whatsapp' | 'telegram' | 'sms' | 'email')[];
  
  // Performance
  status: 'draft' | 'scheduled' | 'sending' | 'sent' | 'failed';
  sentCount: number;
  deliveredCount: number;
  readCount: number;
  failedCount: number;
  
  // Metrics
  deliveryRate: number;
  readRate: number;
  responseRate: number;
  
  // Content
  attachments: MessageAttachment[];
  templateId?: string;
  
  // Metadata
  createdAt: string;
  createdBy: string;
  updatedAt: string;
  
  // Cost
  estimatedCost: number;
  actualCost: number;
}

export interface MessageTemplate {
  id: string;
  name: string;
  description: string;
  category: 'welcome' | 'promotional' | 'transactional' | 'reminder' | 'notification' | 'support';
  
  // Template Content
  subject?: string;
  content: string;
  messageType: 'text' | 'html' | 'rich-text';
  
  // Platform Support
  platforms: ('email' | 'sms' | 'whatsapp' | 'telegram' | 'push')[];
  
  // Variables
  variables: TemplateVariable[];
  
  // Design
  backgroundColor?: string;
  textColor?: string;
  buttonColor?: string;
  headerImage?: string;
  footerText?: string;
  
  // Usage
  usageCount: number;
  lastUsed?: string;
  
  // Status
  status: 'active' | 'draft' | 'archived';
  isApproved: boolean;
  approvedBy?: string;
  approvedAt?: string;
  
  // Metadata
  createdAt: string;
  createdBy: string;
  updatedAt: string;
  updatedBy: string;
  
  // Performance
  avgOpenRate?: number;
  avgClickRate?: number;
  avgConversionRate?: number;
}

export interface TemplateVariable {
  name: string;
  type: 'text' | 'number' | 'date' | 'currency' | 'boolean';
  description: string;
  defaultValue?: string;
  isRequired: boolean;
  validation?: string;
}

export interface Segment {
  id: string;
  name: string;
  description: string;
  
  // Segment Rules
  conditions: SegmentCondition[];
  operator: 'AND' | 'OR';
  
  // Metrics
  memberCount: number;
  lastUpdated: string;
  
  // Usage
  campaignCount: number;
  journeyCount: number;
  
  // Metadata
  createdAt: string;
  createdBy: string;
  updatedAt: string;
  
  // Settings
  isAutoUpdate: boolean;
  updateFrequency?: 'daily' | 'weekly' | 'monthly';
}

export interface SegmentCondition {
  field: string;
  operator: 'equals' | 'not_equals' | 'contains' | 'starts_with' | 'ends_with' | 'greater_than' | 'less_than' | 'in' | 'not_in';
  value: string | string[];
  dataType: 'string' | 'number' | 'date' | 'boolean';
}