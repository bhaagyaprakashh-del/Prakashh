// Subscribers Core Types
export interface Subscriber {
  id: string;
  subscriberId: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  alternatePhone?: string;
  
  // Personal Information
  dateOfBirth: string;
  gender: 'male' | 'female' | 'other';
  maritalStatus: 'single' | 'married' | 'divorced' | 'widowed';
  occupation: string;
  annualIncome: number;
  
  // Address Information
  address: string;
  city: string;
  state: string;
  country: string;
  postalCode: string;
  
  // Subscription Details
  membershipType: 'Individual' | 'Corporate' | 'Enterprise' | 'Premium';
  membershipTier: 'Basic' | 'Silver' | 'Gold' | 'Platinum';
  joiningDate: string;
  status: 'active' | 'inactive' | 'suspended' | 'pending' | 'defaulter';
  
  // Financial Information
  creditScore: number;
  totalInvestments: number;
  currentBalance: number;
  totalReturns: number;
  
  // Chit Fund Participation
  activeSchemes: string[];
  completedSchemes: string[];
  totalSchemes: number;
  
  // KYC and Documentation
  kycStatus: 'pending' | 'verified' | 'rejected' | 'expired';
  kycVerifiedDate?: string;
  documents: SubscriberDocument[];
  
  // Nominee Information
  nominee: {
    name: string;
    relationship: string;
    phone: string;
    address: string;
    idProof: string;
  };
  
  // Emergency Contact
  emergencyContact: {
    name: string;
    relationship: string;
    phone: string;
    address?: string;
  };
  
  // Agent and Branch
  assignedAgent?: string;
  branch: string;
  referredBy?: string;
  
  // Communication Preferences
  communicationPreferences: {
    email: boolean;
    sms: boolean;
    whatsapp: boolean;
    phone: boolean;
    preferredTime: 'morning' | 'afternoon' | 'evening';
    language: string;
  };
  
  // Risk Assessment
  riskProfile: 'low' | 'medium' | 'high';
  riskFactors: string[];
  
  // Performance Metrics
  paymentHistory: {
    onTimePayments: number;
    latePayments: number;
    missedPayments: number;
    averageDelayDays: number;
  };
  
  // Tags and Notes
  tags: string[];
  notes: string;
  
  // System Information
  lastLogin?: string;
  loginCount: number;
  accountLocked: boolean;
  
  // Metadata
  createdAt: string;
  createdBy: string;
  updatedAt: string;
  updatedBy: string;
}

export interface SubscriberDocument {
  id: string;
  type: 'id-proof' | 'address-proof' | 'income-proof' | 'photo' | 'signature' | 'nominee-id' | 'bank-proof' | 'other';
  name: string;
  url: string;
  uploadedAt: string;
  verifiedBy?: string;
  verifiedAt?: string;
  status: 'pending' | 'verified' | 'rejected';
  expiryDate?: string;
  rejectionReason?: string;
}

export interface SubscriberActivity {
  id: string;
  subscriberId: string;
  type: 'payment' | 'scheme-join' | 'scheme-complete' | 'kyc-update' | 'profile-update' | 'login' | 'support-ticket' | 'auction-participation';
  title: string;
  description: string;
  amount?: number;
  schemeId?: string;
  schemeName?: string;
  timestamp: string;
  performedBy: string;
  status: 'success' | 'failed' | 'pending';
  metadata?: any;
}

export interface SubscriberScheme {
  id: string;
  subscriberId: string;
  schemeId: string;
  schemeName: string;
  joiningDate: string;
  status: 'active' | 'completed' | 'defaulted' | 'withdrawn';
  memberNumber: number;
  totalInstallments: number;
  paidInstallments: number;
  pendingInstallments: number;
  totalPaid: number;
  totalDue: number;
  prizeReceived: boolean;
  prizeAmount?: number;
  prizeMonth?: number;
  completionDate?: string;
  withdrawalDate?: string;
  withdrawalReason?: string;
}

export interface SubscriberPayment {
  id: string;
  subscriberId: string;
  schemeId: string;
  installmentNumber: number;
  amount: number;
  dueDate: string;
  paidDate?: string;
  status: 'pending' | 'paid' | 'partial' | 'overdue' | 'waived';
  paymentMethod?: 'cash' | 'bank' | 'upi' | 'cheque' | 'card';
  transactionId?: string;
  receiptNumber?: string;
  penalty?: number;
  discount?: number;
  collectedBy?: string;
  notes?: string;
}

export interface SubscriberStats {
  totalSubscribers: number;
  activeSubscribers: number;
  newThisMonth: number;
  totalInvestments: number;
  averageInvestment: number;
  topPerformers: Subscriber[];
  riskDistribution: {
    low: number;
    medium: number;
    high: number;
  };
  membershipDistribution: {
    individual: number;
    corporate: number;
    enterprise: number;
    premium: number;
  };
  kycCompliance: {
    verified: number;
    pending: number;
    rejected: number;
    expired: number;
  };
}