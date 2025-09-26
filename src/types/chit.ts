// Enhanced Chit Fund Types
export interface ChitGroup {
  id: string;
  name: string;
  code: string;
  totalAmount: number;
  installmentAmount: number;
  duration: number; // in months
  startDate: string;
  endDate: string;
  status: 'pending' | 'active' | 'completed' | 'suspended';
  branchId: string;
  agentId: string;
  members: ChitMember[];
  auctions: ChitAuction[];
  installments: ChitInstallment[];
  commissionPercentage: number;
  createdAt: string;
  updatedAt: string;
}

export interface ChitMember {
  id: string;
  groupId: string;
  memberId: string;
  memberNumber: number;
  joiningDate: string;
  status: 'active' | 'inactive' | 'defaulter' | 'withdrawn';
  guarantor?: string;
  documents: ChitDocument[];
  totalPaid: number;
  totalDue: number;
  prizeReceived?: boolean;
  prizeMonth?: number;
  prizeAmount?: number;
}

export interface ChitAuction {
  id: string;
  groupId: string;
  month: number;
  auctionDate: string;
  winnerId: string;
  discountAmount: number;
  prizeAmount: number;
  status: 'scheduled' | 'live' | 'completed' | 'cancelled';
  bids: ChitBid[];
  conductedBy: string;
  witnessedBy: string[];
  createdAt: string;
}

export interface ChitBid {
  id: string;
  auctionId: string;
  memberId: string;
  bidAmount: number;
  timestamp: string;
  isWinning: boolean;
}

export interface ChitInstallment {
  id: string;
  groupId: string;
  memberId: string;
  month: number;
  dueAmount: number;
  paidAmount: number;
  dueDate: string;
  paidDate?: string;
  status: 'pending' | 'paid' | 'partial' | 'overdue';
  paymentMethod?: 'cash' | 'bank' | 'upi' | 'cheque';
  receiptNumber?: string;
  penalty?: number;
  collectedBy?: string;
}

export interface ChitDocument {
  id: string;
  type: 'id-proof' | 'address-proof' | 'income-proof' | 'photo' | 'signature' | 'guarantor-id' | 'other';
  name: string;
  url: string;
  uploadedAt: string;
  verifiedBy?: string;
  verifiedAt?: string;
  status: 'pending' | 'verified' | 'rejected';
}

export interface SuretyMember {
  id: string;
  name: string;
  phone: string;
  email: string;
  address: string;
  idProof: string;
  addressProof: string;
  incomeProof: string;
  guaranteedGroups: string[];
  maxGuaranteeAmount: number;
  currentGuaranteeAmount: number;
  status: 'active' | 'inactive' | 'blacklisted';
  verificationStatus: 'pending' | 'verified' | 'rejected';
  verifiedBy?: string;
  verifiedAt?: string;
  createdAt: string;
}