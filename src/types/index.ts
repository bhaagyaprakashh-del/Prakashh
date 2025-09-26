export interface Member {
  id: string;
  name: string;
  email: string;
  phone: string;
  address: string;
  joinDate: string;
  status: 'active' | 'inactive' | 'suspended';
  creditScore: number;
  totalContributions: number;
  schemes: string[];
}

export interface ChitScheme {
  id: string;
  name: string;
  totalAmount: number;
  monthlyContribution: number;
  duration: number; // in months
  startDate: string;
  endDate: string;
  status: 'active' | 'completed' | 'pending';
  members: string[];
  currentMonth: number;
  auctionHistory: Auction[];
}

export interface Payment {
  id: string;
  memberId: string;
  schemeId: string;
  amount: number;
  dueDate: string;
  paidDate?: string;
  status: 'pending' | 'paid' | 'overdue';
  method: 'cash' | 'bank' | 'upi' | 'cheque';
}

export interface Auction {
  id: string;
  schemeId: string;
  month: number;
  winnerId: string;
  bidAmount: number;
  auctionDate: string;
  participants: AuctionBid[];
}

export interface AuctionBid {
  memberId: string;
  bidAmount: number;
  timestamp: string;
}

export interface DashboardStats {
  totalMembers: number;
  activeSchemes: number;
  totalCollections: number;
  pendingPayments: number;
  overduePayments: number;
  monthlyTarget: number;
}