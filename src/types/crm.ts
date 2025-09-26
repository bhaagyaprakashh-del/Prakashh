// CRM Core Types
export interface Lead {
  id: string;
  name: string;
  email: string;
  phone: string;
  company?: string;
  source: 'website' | 'referral' | 'cold-call' | 'social-media' | 'advertisement';
  status: 'new' | 'contacted' | 'qualified' | 'proposal' | 'negotiation' | 'won' | 'lost';
  priority: 'low' | 'medium' | 'high';
  value: number;
  assignedTo?: string;
  createdAt: string;
  updatedAt: string;
  notes: string[];
  tags: string[];
  nextFollowUp?: string;
}

export interface Task {
  id: string;
  title: string;
  description: string;
  type: 'call' | 'email' | 'meeting' | 'follow-up' | 'demo' | 'other';
  priority: 'low' | 'medium' | 'high';
  status: 'pending' | 'in-progress' | 'completed' | 'cancelled';
  assignedTo: string;
  assignedBy: string;
  dueDate: string;
  completedAt?: string;
  leadId?: string;
  customerId?: string;
  createdAt: string;
  updatedAt: string;
}

export interface CrmTicket {
  id: string;
  subject: string;
  description: string;
  category: 'technical' | 'billing' | 'general' | 'complaint' | 'feature-request';
  priority: 'low' | 'medium' | 'high' | 'critical';
  status: 'open' | 'in-progress' | 'resolved' | 'closed';
  customerId: string;
  assignedTo?: string;
  createdAt: string;
  updatedAt: string;
  resolvedAt?: string;
  slaDeadline: string;
  responses: CrmTicketResponse[];
}

export interface CrmTicketResponse {
  id: string;
  ticketId: string;
  message: string;
  isInternal: boolean;
  createdBy: string;
  createdAt: string;
  attachments?: string[];
}

export interface Customer {
  id: string;
  name: string;
  email: string;
  phone: string;
  company?: string;
  address: string;
  status: 'active' | 'inactive' | 'suspended';
  tags: string[];
  createdAt: string;
  totalValue: number;
  lastContact?: string;
}

// User Management Types
export interface User {
  id: string;
  email: string;
  name: string;
  role: string;
  permissions: string[];
  status: 'active' | 'inactive';
  lastLogin?: string;
  createdAt: string;
  avatar?: string;
  phone?: string;
  department?: string;
  branch?: string;
}

export interface Role {
  id: string;
  name: string;
  description: string;
  permissions: Permission[];
  createdAt: string;
}

export interface Permission {
  id: string;
  name: string;
  module: string;
  actions: string[];
}

// HRMS Types
export interface Employee {
  id: string;
  employeeId: string;
  name: string;
  email: string;
  phone: string;
  department: string;
  designation: string;
  branch: string;
  joiningDate: string;
  status: 'active' | 'inactive' | 'on-leave';
  salary: number;
  manager?: string;
  userId?: string;
}

export interface Attendance {
  id: string;
  employeeId: string;
  date: string;
  checkIn?: string;
  checkOut?: string;
  breakTime: number; // in minutes
  workHours: number;
  status: 'present' | 'absent' | 'half-day' | 'on-leave';
  location?: string;
}

// Company Structure Types
export interface Branch {
  id: string;
  name: string;
  code: string;
  address: string;
  phone: string;
  email: string;
  manager: string;
  status: 'active' | 'inactive';
  createdAt: string;
}

export interface Department {
  id: string;
  name: string;
  description: string;
  head: string;
  budget?: number;
  status: 'active' | 'inactive';
  createdAt: string;
}
</thinking>

I'll create a comprehensive CRM system with all the modules you\'ve outlined. This will be a major restructure to build a full-featured business management platform with core CRM, chit fund operations, HRMS, and more.

<boltArtifact id="comprehensive-crm-system" title="Comprehensive CRM with Chit Fund Operations">