import { Member, ChitScheme, Payment, Auction } from '../types';

const STORAGE_KEYS = {
  MEMBERS: 'chitfunds_members',
  SCHEMES: 'chitfunds_schemes',
  PAYMENTS: 'chitfunds_payments',
  AUCTIONS: 'chitfunds_auctions',
};

export const storage = {
  // Members
  getMembers: (): Member[] => {
    const data = localStorage.getItem(STORAGE_KEYS.MEMBERS);
    return data ? JSON.parse(data) : [];
  },

  saveMembers: (members: Member[]) => {
    localStorage.setItem(STORAGE_KEYS.MEMBERS, JSON.stringify(members));
  },

  addMember: (member: Member) => {
    const members = storage.getMembers();
    members.push(member);
    storage.saveMembers(members);
  },

  updateMember: (updatedMember: Member) => {
    const members = storage.getMembers();
    const index = members.findIndex(m => m.id === updatedMember.id);
    if (index !== -1) {
      members[index] = updatedMember;
      storage.saveMembers(members);
    }
  },

  deleteMember: (memberId: string) => {
    const members = storage.getMembers().filter(m => m.id !== memberId);
    storage.saveMembers(members);
  },

  // Schemes
  getSchemes: (): ChitScheme[] => {
    const data = localStorage.getItem(STORAGE_KEYS.SCHEMES);
    return data ? JSON.parse(data) : [];
  },

  saveSchemes: (schemes: ChitScheme[]) => {
    localStorage.setItem(STORAGE_KEYS.SCHEMES, JSON.stringify(schemes));
  },

  addScheme: (scheme: ChitScheme) => {
    const schemes = storage.getSchemes();
    schemes.push(scheme);
    storage.saveSchemes(schemes);
  },

  updateScheme: (updatedScheme: ChitScheme) => {
    const schemes = storage.getSchemes();
    const index = schemes.findIndex(s => s.id === updatedScheme.id);
    if (index !== -1) {
      schemes[index] = updatedScheme;
      storage.saveSchemes(schemes);
    }
  },

  deleteScheme: (schemeId: string) => {
    const schemes = storage.getSchemes().filter(s => s.id !== schemeId);
    storage.saveSchemes(schemes);
  },

  // Payments
  getPayments: (): Payment[] => {
    const data = localStorage.getItem(STORAGE_KEYS.PAYMENTS);
    return data ? JSON.parse(data) : [];
  },

  savePayments: (payments: Payment[]) => {
    localStorage.setItem(STORAGE_KEYS.PAYMENTS, JSON.stringify(payments));
  },

  addPayment: (payment: Payment) => {
    const payments = storage.getPayments();
    payments.push(payment);
    storage.savePayments(payments);
  },

  updatePayment: (updatedPayment: Payment) => {
    const payments = storage.getPayments();
    const index = payments.findIndex(p => p.id === updatedPayment.id);
    if (index !== -1) {
      payments[index] = updatedPayment;
      storage.savePayments(payments);
    }
  },

  // Auctions
  getAuctions: (): Auction[] => {
    const data = localStorage.getItem(STORAGE_KEYS.AUCTIONS);
    return data ? JSON.parse(data) : [];
  },

  saveAuctions: (auctions: Auction[]) => {
    localStorage.setItem(STORAGE_KEYS.AUCTIONS, JSON.stringify(auctions));
  },

  addAuction: (auction: Auction) => {
    const auctions = storage.getAuctions();
    auctions.push(auction);
    storage.saveAuctions(auctions);
  },
};

// Initialize with sample data if empty
export const initializeSampleData = () => {
  if (storage.getMembers().length === 0) {
    const sampleMembers: Member[] = [
      {
        id: '1',
        name: 'Rajesh Kumar',
        email: 'rajesh@example.com',
        phone: '+91 98765 43210',
        address: '123 MG Road, Bangalore',
        joinDate: '2024-01-15',
        status: 'active',
        creditScore: 85,
        totalContributions: 25000,
        schemes: ['scheme1'],
      },
      {
        id: '2',
        name: 'Priya Sharma',
        email: 'priya@example.com',
        phone: '+91 98765 43211',
        address: '456 Park Street, Delhi',
        joinDate: '2024-01-20',
        status: 'active',
        creditScore: 92,
        totalContributions: 30000,
        schemes: ['scheme1', 'scheme2'],
      },
      {
        id: '3',
        name: 'Amit Patel',
        email: 'amit@example.com',
        phone: '+91 98765 43212',
        address: '789 Brigade Road, Mumbai',
        joinDate: '2024-02-01',
        status: 'active',
        creditScore: 78,
        totalContributions: 15000,
        schemes: ['scheme2'],
      },
    ];

    const sampleSchemes: ChitScheme[] = [
      {
        id: 'scheme1',
        name: 'Premium Gold Chit',
        totalAmount: 100000,
        monthlyContribution: 5000,
        duration: 20,
        startDate: '2024-01-01',
        endDate: '2025-08-31',
        status: 'active',
        members: ['1', '2'],
        currentMonth: 3,
        auctionHistory: [],
      },
      {
        id: 'scheme2',
        name: 'Silver Monthly Chit',
        totalAmount: 50000,
        monthlyContribution: 2500,
        duration: 20,
        startDate: '2024-02-01',
        endDate: '2025-09-30',
        status: 'active',
        members: ['2', '3'],
        currentMonth: 2,
        auctionHistory: [],
      },
    ];

    const samplePayments: Payment[] = [
      {
        id: 'pay1',
        memberId: '1',
        schemeId: 'scheme1',
        amount: 5000,
        dueDate: '2024-03-01',
        paidDate: '2024-02-28',
        status: 'paid',
        method: 'upi',
      },
      {
        id: 'pay2',
        memberId: '2',
        schemeId: 'scheme1',
        amount: 5000,
        dueDate: '2024-03-01',
        status: 'pending',
        method: 'bank',
      },
    ];

    storage.saveMembers(sampleMembers);
    storage.saveSchemes(sampleSchemes);
    storage.savePayments(samplePayments);
  }
};