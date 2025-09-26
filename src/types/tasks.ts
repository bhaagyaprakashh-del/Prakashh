// Tasks & Tickets Core Types

export interface Task {
  id: string;
  title: string;
  description: string;
  type: 'call' | 'email' | 'meeting' | 'follow-up' | 'demo' | 'documentation' | 'development' | 'review' | 'other';
  priority: 'low' | 'medium' | 'high' | 'critical';
  status: 'todo' | 'in-progress' | 'review' | 'completed' | 'cancelled' | 'blocked';
  assignedTo: string;
  assignedBy: string;
  dueDate: string;
  completedAt?: string;
  estimatedHours: number;
  actualHours?: number;
  
  // Related entities
  leadId?: string;
  customerId?: string;
  projectId?: string;
  ticketId?: string;
  
  // Task details
  tags: string[];
  attachments: TaskAttachment[];
  comments: TaskComment[];
  subtasks: SubTask[];
  
  // Tracking
  createdAt: string;
  updatedAt: string;
  startedAt?: string;
  
  // Team collaboration
  watchers: string[];
  collaborators: string[];
  
  // Progress tracking
  progressPercentage: number;
  blockedReason?: string;
  blockedBy?: string;
}

export interface SubTask {
  id: string;
  title: string;
  completed: boolean;
  assignedTo?: string;
  dueDate?: string;
  createdAt: string;
}

export interface TaskComment {
  id: string;
  taskId: string;
  message: string;
  createdBy: string;
  createdAt: string;
  isInternal: boolean;
  mentions: string[];
}

export interface TaskAttachment {
  id: string;
  name: string;
  url: string;
  type: string;
  size: number;
  uploadedBy: string;
  uploadedAt: string;
}

export interface Ticket {
  id: string;
  ticketNumber: string;
  subject: string;
  description: string;
  category: 'technical' | 'billing' | 'general' | 'complaint' | 'feature-request' | 'bug-report' | 'account' | 'chit-fund';
  priority: 'low' | 'medium' | 'high' | 'critical';
  status: 'open' | 'in-progress' | 'waiting-customer' | 'resolved' | 'closed' | 'escalated';
  
  // Customer information
  customerId: string;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  
  // Assignment
  assignedTo?: string;
  assignedBy?: string;
  department: string;
  
  // SLA tracking
  slaLevel: 'standard' | 'priority' | 'vip' | 'enterprise';
  slaDeadline: string;
  responseTime?: number; // in minutes
  resolutionTime?: number; // in minutes
  
  // Timestamps
  createdAt: string;
  updatedAt: string;
  firstResponseAt?: string;
  resolvedAt?: string;
  closedAt?: string;
  
  // Communication
  responses: TicketResponse[];
  internalNotes: TicketNote[];
  
  // Tracking
  tags: string[];
  source: 'email' | 'phone' | 'chat' | 'portal' | 'social' | 'walk-in';
  satisfaction?: number; // 1-5 rating
  
  // Escalation
  escalatedTo?: string;
  escalatedAt?: string;
  escalationReason?: string;
}

export interface TicketResponse {
  id: string;
  ticketId: string;
  message: string;
  isCustomerResponse: boolean;
  createdBy: string;
  createdAt: string;
  attachments: string[];
  isPublic: boolean;
}

export interface TicketNote {
  id: string;
  ticketId: string;
  note: string;
  createdBy: string;
  createdAt: string;
  isPrivate: boolean;
}

export interface SLAPolicy {
  id: string;
  name: string;
  description: string;
  level: 'standard' | 'priority' | 'vip' | 'enterprise';
  
  // Response times (in minutes)
  firstResponseTime: number;
  resolutionTime: number;
  escalationTime: number;
  
  // Conditions
  priority: string[];
  category: string[];
  customerType: string[];
  
  // Business hours
  businessHours: {
    start: string;
    end: string;
    timezone: string;
    workingDays: string[];
  };
  
  // Escalation rules
  escalationRules: EscalationRule[];
  
  // Status
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface EscalationRule {
  id: string;
  condition: string;
  action: string;
  escalateTo: string;
  notifyUsers: string[];
  delayMinutes: number;
}

export interface TaskBoard {
  id: string;
  name: string;
  description: string;
  columns: TaskColumn[];
  members: string[];
  isDefault: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface TaskColumn {
  id: string;
  name: string;
  status: string;
  order: number;
  color: string;
  limit?: number;
  isCompleted: boolean;
}

export const __DUMMY_EXPORT__ = true;