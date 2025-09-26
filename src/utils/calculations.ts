import { Member, ChitScheme, Payment } from '../types';
import { storage } from './storage';

export const calculateDashboardStats = () => {
  const members = storage.getMembers();
  const schemes = storage.getSchemes();
  const payments = storage.getPayments();

  const totalMembers = members.length;
  const activeSchemes = schemes.filter(s => s.status === 'active').length;
  
  const totalCollections = payments
    .filter(p => p.status === 'paid')
    .reduce((sum, p) => sum + p.amount, 0);

  const pendingPayments = payments.filter(p => p.status === 'pending').length;
  
  const overduePayments = payments.filter(p => {
    if (p.status === 'pending') {
      const dueDate = new Date(p.dueDate);
      const today = new Date();
      return dueDate < today;
    }
    return false;
  }).length;

  const monthlyTarget = schemes
    .filter(s => s.status === 'active')
    .reduce((sum, s) => sum + (s.monthlyContribution * s.members.length), 0);

  return {
    totalMembers,
    activeSchemes,
    totalCollections,
    pendingPayments,
    overduePayments,
    monthlyTarget,
  };
};

export const calculateMemberStats = (memberId: string) => {
  const payments = storage.getPayments().filter(p => p.memberId === memberId);
  const totalPaid = payments.filter(p => p.status === 'paid').reduce((sum, p) => sum + p.amount, 0);
  const pending = payments.filter(p => p.status === 'pending').length;
  const overdue = payments.filter(p => {
    if (p.status === 'pending') {
      const dueDate = new Date(p.dueDate);
      const today = new Date();
      return dueDate < today;
    }
    return false;
  }).length;

  return { totalPaid, pending, overdue };
};

export const calculateSchemeProgress = (scheme: ChitScheme) => {
  const progressPercentage = (scheme.currentMonth / scheme.duration) * 100;
  const totalCollected = scheme.currentMonth * scheme.monthlyContribution * scheme.members.length;
  const remainingAmount = scheme.totalAmount - totalCollected;
  
  return {
    progressPercentage,
    totalCollected,
    remainingAmount,
    isCompleted: progressPercentage >= 100,
  };
};

export const formatCurrency = (amount: number): string => {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(amount);
};

export const formatDate = (dateString: string): string => {
  return new Intl.DateTimeFormat('en-IN', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  }).format(new Date(dateString));
};