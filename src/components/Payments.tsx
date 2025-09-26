import React, { useState } from 'react';
import { Search, Plus, Check, X, Clock, DollarSign } from 'lucide-react';
import { Payment } from '../types';
import { storage } from '../utils/storage';
import { formatCurrency, formatDate } from '../utils/calculations';
import { PaymentForm } from './PaymentForm';

export const Payments: React.FC = () => {
  const [payments, setPayments] = useState<Payment[]>(storage.getPayments());
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedPayment, setSelectedPayment] = useState<Payment | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [filterMethod, setFilterMethod] = useState<string>('all');

  const members = storage.getMembers();
  const schemes = storage.getSchemes();

  const filteredPayments = payments.filter(payment => {
    const member = members.find(m => m.id === payment.memberId);
    const scheme = schemes.find(s => s.id === payment.schemeId);
    
    const matchesSearch = member?.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         scheme?.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         payment.amount.toString().includes(searchTerm);
    const matchesStatus = filterStatus === 'all' || payment.status === filterStatus;
    const matchesMethod = filterMethod === 'all' || payment.method === filterMethod;
    
    return matchesSearch && matchesStatus && matchesMethod;
  });

  const handleAddPayment = () => {
    setSelectedPayment(null);
    setShowForm(true);
  };

  const handleEditPayment = (payment: Payment) => {
    setSelectedPayment(payment);
    setShowForm(true);
  };

  const handleMarkAsPaid = (paymentId: string) => {
    const payment = payments.find(p => p.id === paymentId);
    if (payment && payment.status === 'pending') {
      const updatedPayment = {
        ...payment,
        status: 'paid' as const,
        paidDate: new Date().toISOString().split('T')[0],
      };
      storage.updatePayment(updatedPayment);
      setPayments(storage.getPayments());
    }
  };

  const handleFormSubmit = (paymentData: Partial<Payment>) => {
    if (selectedPayment) {
      const updatedPayment = { ...selectedPayment, ...paymentData } as Payment;
      storage.updatePayment(updatedPayment);
    } else {
      const newPayment: Payment = {
        id: Date.now().toString(),
        memberId: paymentData.memberId!,
        schemeId: paymentData.schemeId!,
        amount: paymentData.amount!,
        dueDate: paymentData.dueDate!,
        status: paymentData.status!,
        method: paymentData.method!,
        paidDate: paymentData.paidDate,
      };
      storage.addPayment(newPayment);
    }
    setPayments(storage.getPayments());
    setShowForm(false);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'paid': return 'bg-green-100 text-green-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'overdue': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'paid': return <Check className="h-4 w-4" />;
      case 'pending': return <Clock className="h-4 w-4" />;
      case 'overdue': return <X className="h-4 w-4" />;
      default: return <Clock className="h-4 w-4" />;
    }
  };

  const isOverdue = (payment: Payment) => {
    if (payment.status === 'pending') {
      return new Date(payment.dueDate) < new Date();
    }
    return false;
  };

  const totalStats = {
    total: payments.length,
    paid: payments.filter(p => p.status === 'paid').length,
    pending: payments.filter(p => p.status === 'pending').length,
    overdue: payments.filter(p => isOverdue(p)).length,
    totalAmount: payments.filter(p => p.status === 'paid').reduce((sum, p) => sum + p.amount, 0),
  };

  if (showForm) {
    return (
      <PaymentForm
        payment={selectedPayment}
        onSubmit={handleFormSubmit}
        onCancel={() => setShowForm(false)}
      />
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Payments</h1>
          <p className="mt-2 text-sm text-gray-600">
            Track and manage all payment transactions
          </p>
        </div>
        <button
          onClick={handleAddPayment}
          className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors duration-200"
        >
          <Plus className="h-4 w-4 mr-2" />
          Add Payment
        </button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-5">
        <div className="bg-white overflow-hidden shadow rounded-lg">
          <div className="p-5">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <DollarSign className="h-6 w-6 text-gray-400" />
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-gray-500 truncate">Total Payments</dt>
                  <dd className="text-lg font-medium text-gray-900">{totalStats.total}</dd>
                </dl>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white overflow-hidden shadow rounded-lg">
          <div className="p-5">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <Check className="h-6 w-6 text-green-400" />
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-gray-500 truncate">Paid</dt>
                  <dd className="text-lg font-medium text-green-900">{totalStats.paid}</dd>
                </dl>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white overflow-hidden shadow rounded-lg">
          <div className="p-5">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <Clock className="h-6 w-6 text-yellow-400" />
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-gray-500 truncate">Pending</dt>
                  <dd className="text-lg font-medium text-yellow-900">{totalStats.pending}</dd>
                </dl>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white overflow-hidden shadow rounded-lg">
          <div className="p-5">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <X className="h-6 w-6 text-red-400" />
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-gray-500 truncate">Overdue</dt>
                  <dd className="text-lg font-medium text-red-900">{totalStats.overdue}</dd>
                </dl>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white overflow-hidden shadow rounded-lg">
          <div className="p-5">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <DollarSign className="h-6 w-6 text-blue-400" />
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-gray-500 truncate">Total Collected</dt>
                  <dd className="text-lg font-medium text-blue-900">{formatCurrency(totalStats.totalAmount)}</dd>
                </dl>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white shadow rounded-lg p-6">
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <input
              type="text"
              placeholder="Search payments..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 pr-4 py-2 border border-gray-300 rounded-md w-full focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="all">All Status</option>
            <option value="paid">Paid</option>
            <option value="pending">Pending</option>
          </select>
          <select
            value={filterMethod}
            onChange={(e) => setFilterMethod(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="all">All Methods</option>
            <option value="cash">Cash</option>
            <option value="bank">Bank Transfer</option>
            <option value="upi">UPI</option>
            <option value="cheque">Cheque</option>
          </select>
          <div className="text-sm text-gray-600 flex items-center">
            Total: <span className="font-semibold ml-1">{filteredPayments.length}</span>
          </div>
        </div>
      </div>

      {/* Payments Table */}
      <div className="bg-white shadow rounded-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Member</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Scheme</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Due Date</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Method</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredPayments.map((payment) => {
                const member = members.find(m => m.id === payment.memberId);
                const scheme = schemes.find(s => s.id === payment.schemeId);
                const overdue = isOverdue(payment);
                
                return (
                  <tr key={payment.id} className={overdue ? 'bg-red-50' : 'hover:bg-gray-50'}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div>
                        <div className="text-sm font-medium text-gray-900">{member?.name}</div>
                        <div className="text-sm text-gray-500">{member?.email}</div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {scheme?.name}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-semibold text-gray-900">
                      {formatCurrency(payment.amount)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {formatDate(payment.dueDate)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(overdue ? 'overdue' : payment.status)}`}>
                        {getStatusIcon(overdue ? 'overdue' : payment.status)}
                        <span className="ml-1">{overdue ? 'Overdue' : payment.status}</span>
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 capitalize">
                      {payment.method}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-2">
                      {payment.status === 'pending' && (
                        <button
                          onClick={() => handleMarkAsPaid(payment.id)}
                          className="text-green-600 hover:text-green-900"
                        >
                          Mark Paid
                        </button>
                      )}
                      <button
                        onClick={() => handleEditPayment(payment)}
                        className="text-blue-600 hover:text-blue-900"
                      >
                        Edit
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {filteredPayments.length === 0 && (
        <div className="text-center py-12">
          <DollarSign className="h-12 w-12 mx-auto text-gray-400 mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">No payments found</h3>
          <p className="text-sm text-gray-600">Try adjusting your search criteria or add a new payment.</p>
        </div>
      )}
    </div>
  );
};