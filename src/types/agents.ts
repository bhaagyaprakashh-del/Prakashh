// Agents Core Types
export interface Agent {
  id: string;
  agentId: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  alternatePhone?: string;
  
  // Personal Information
  dateOfBirth: string;
  gender: 'male' | 'female' | 'other';
  maritalStatus: 'single' | 'married' | 'divorced' | 'widowed';
  
  // Address Information
  address: string;
  city: string;
  state: string;
  country: string;
  postalCode: string;
  
  // Professional Information
  designation: string;
  department: string;
  branch: string;
  joiningDate: string;
  employmentType: 'permanent' | 'contract' | 'freelance' | 'commission-only';
  workLocation: 'field' | 'office' | 'hybrid';
  
  // Reporting Structure
  reportingManager?: string;
  teamMembers: string[];
  
  // Territory and Coverage
  territory: string;
  coverageArea: string[];
  transportMode: 'bike' | 'car' | 'public' | 'walking';
  
  // Performance Metrics
  monthlyTarget: number;
  quarterlyTarget: number;
  yearlyTarget: number;
  currentMonthAchievement: number;
  currentQuarterAchievement: number;
  currentYearAchievement: number;
  
  // Commission Structure
  commissionStructure: {
    baseCommission: number; // percentage
    bonusThreshold: number;
    bonusCommission: number; // percentage
    penaltyThreshold: number;
    penaltyDeduction: number; // percentage
  };
  
  // Customer Portfolio
  totalCustomers: number;
  activeCustomers: number;
  newCustomersThisMonth: number;
  customerRetentionRate: number;
  
  // Financial Performance
  totalSales: number;
  monthlyEarnings: number;
  quarterlyEarnings: number;
  yearlyEarnings: number;
  pendingCommissions: number;
  
  // Rankings and Recognition
  currentRank: number;
  previousRank: number;
  rankingCategory: 'rookie' | 'performer' | 'star' | 'champion' | 'legend';
  achievements: AgentAchievement[];
  
  // Skills and Training
  skills: string[];
  certifications: string[];
  trainingCompleted: string[];
  trainingPending: string[];
  
  // System Information
  status: 'active' | 'inactive' | 'suspended' | 'on-leave';
  lastLogin?: string;
  loginCount: number;
  
  // Emergency Contact
  emergencyContact: {
    name: string;
    relationship: string;
    phone: string;
    address?: string;
  };
  
  // Metadata
  createdAt: string;
  createdBy: string;
  updatedAt: string;
  updatedBy: string;
  notes: string;
}

export interface AgentAchievement {
  id: string;
  title: string;
  description: string;
  achievedDate: string;
  category: 'sales' | 'customer-service' | 'training' | 'leadership' | 'innovation';
  points: number;
  badge: string;
  isPublic: boolean;
}

export interface AgentTarget {
  id: string;
  agentId: string;
  period: 'monthly' | 'quarterly' | 'yearly';
  targetType: 'sales' | 'customers' | 'revenue' | 'schemes';
  targetValue: number;
  achievedValue: number;
  unit: 'amount' | 'count' | 'percentage';
  startDate: string;
  endDate: string;
  status: 'active' | 'achieved' | 'missed' | 'extended';
  setBy: string;
  setDate: string;
  notes?: string;
}

export interface DailyDiary {
  id: string;
  agentId: string;
  date: string;
  
  // Daily Activities
  activities: DiaryActivity[];
  
  // Visits and Meetings
  customerVisits: number;
  newProspects: number;
  followUps: number;
  closedDeals: number;
  
  // Financial Summary
  salesAmount: number;
  commissionsEarned: number;
  expensesIncurred: number;
  
  // Travel and Coverage
  travelDistance: number; // in km
  areasVisited: string[];
  transportCost: number;
  
  // Performance Metrics
  callsMade: number;
  emailsSent: number;
  whatsappMessages: number;
  documentsCollected: number;
  
  // Daily Summary
  summary: string;
  challenges: string;
  achievements: string;
  tomorrowPlan: string;
  
  // Mood and Energy
  moodRating: number; // 1-5
  energyLevel: number; // 1-5
  satisfactionLevel: number; // 1-5
  
  // Approval
  isSubmitted: boolean;
  submittedAt?: string;
  approvedBy?: string;
  approvedAt?: string;
  rejectionReason?: string;
  
  // Metadata
  createdAt: string;
  updatedAt: string;
}

export interface DiaryActivity {
  id: string;
  time: string;
  type: 'customer-visit' | 'phone-call' | 'email' | 'follow-up' | 'documentation' | 'travel' | 'training' | 'meeting' | 'other';
  description: string;
  customerId?: string;
  customerName?: string;
  location?: string;
  duration: number; // in minutes
  outcome: 'successful' | 'partial' | 'unsuccessful' | 'rescheduled';
  nextAction?: string;
  notes?: string;
}

export interface AgentRanking {
  rank: number;
  agentId: string;
  agentName: string;
  branch: string;
  totalScore: number;
  salesScore: number;
  customerScore: number;
  qualityScore: number;
  monthlyAchievement: number;
  quarterlyAchievement: number;
  badge: string;
  trend: 'up' | 'down' | 'stable';
  previousRank: number;
}

export interface AgentStats {
  totalAgents: number;
  activeAgents: number;
  topPerformers: Agent[];
  averageAchievement: number;
  totalSales: number;
  totalCommissions: number;
  customerSatisfaction: number;
  territoryDistribution: {
    [territory: string]: number;
  };
  performanceDistribution: {
    excellent: number;
    good: number;
    average: number;
    needsImprovement: number;
  };
}