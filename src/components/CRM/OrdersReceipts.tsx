import React, { useState, useMemo } from 'react';
import { Plus, Search, Download, Eye, Edit, FileText, DollarSign, Calendar, CheckCircle, Clock, AlertTriangle, Users, CreditCard, Receipt, Package, Truck, Star, Filter, MoreVertical, Printer as Print, Send, Archive } from 'lucide-react';
import { formatCurrency } from '../../utils/calculations';

interface Order {
  id: string;
  orderNumber: string;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  chitScheme: string;
  membershipType: 'Individual' | 'Corporate' | 'Enterprise';
  orderValue: number;
  paidAmount: number;
  pendingAmount: number;
  orderDate: string;
  dueDate: string;
  status: 'pending' | 'confirmed' | 'processing' | 'completed' | 'cancelled';
  paymentStatus: 'pending' | 'partial' | 'paid' | 'overdue';
  paymentMethod: 'cash' | 'bank' | 'upi' | 'cheque' | 'card';
  assignedTo: string;
  receipts: Receipt[];
  notes: string[];
}

interface Receipt {
  id: string;
  receiptNumber: string;
  orderId: string;
  amount: number;
  paymentDate: string;
  paymentMethod: string;
  status: 'generated' | 'sent' | 'acknowledged';
  generatedBy: string;
  sentAt?: string;
  acknowledgedAt?: string;
}

const sampleOrders: Order[] = [
  {
    id: '1',
    orderNumber: 'ORD-2024-001',
    customerName: 'Meera Nair',
    customerEmail: 'meera@consultancy.com',
    customerPhone: '+91 98765 43215',
    chitScheme: 'Premium Gold Chit',
    membershipType: 'Corporate',
    orderValue: 300000,
    paidAmount: 300000,
    pendingAmount: 0,
    orderDate: '2024-03-14',
    dueDate: '2024-03-21',
    status: 'completed',
    paymentStatus: 'paid',
    paymentMethod: 'bank',
    assignedTo: 'Priya Sharma',
    receipts: [
      {
        id: 'RCP-001',
        receiptNumber: 'RCP-2024-001',
        orderId: '1',
        amount: 300000,
        paymentDate: '2024-03-14',
        paymentMethod: 'bank',
        status: 'acknowledged',
        generatedBy: 'Priya Sharma',
        sentAt: '2024-03-14',
        acknowledgedAt: '2024-03-15'
      }
    ],
    notes: ['Deal closed successfully', 'Payment received via bank transfer']
  },
  {
    id: '2',
    orderNumber: 'ORD-2024-002',
    customerName: 'Kiran Kumar',
    customerEmail: 'kiran.kumar@retailchain.com',
    customerPhone: '+91 98765 43214',
    chitScheme: 'Corporate Chit Plus',
    membershipType: 'Enterprise',
    orderValue: 950000,
    paidAmount: 475000,
    pendingAmount: 475000,
    orderDate: '2024-03-12',
    dueDate: '2024-03-26',
    status: 'processing',
    paymentStatus: 'partial',
    paymentMethod: 'bank',
    assignedTo: 'Rajesh Kumar',
    receipts: [
      {
        id: 'RCP-002',
        receiptNumber: 'RCP-2024-002',
        orderId: '2',
        amount: 475000,
        paymentDate: '2024-03-12',
        paymentMethod: 'bank',
        status: 'sent',
        generatedBy: 'Rajesh Kumar',
        sentAt: '2024-03-12'
      }
    ],
    notes: ['First installment received', 'Waiting for second payment']
  },
  {
    id: '3',
    orderNumber: 'ORD-2024-003',
    customerName: 'Anita Desai',
    customerEmail: 'anita@individual.com',
    customerPhone: '+91 98765 43216',
    chitScheme: 'Silver Monthly Chit',
    membershipType: 'Individual',
    orderValue: 150000,
    paidAmount: 0,
    pendingAmount: 150000,
    orderDate: '2024-03-10',
    dueDate: '2024-03-17',
    status: 'confirmed',
    paymentStatus: 'overdue',
    paymentMethod: 'upi',
    assignedTo: 'Karthik Nair',
    receipts: [],
    notes: ['Order confirmed', 'Payment pending', 'Follow up required']
  }
];

const OrderCard: React.FC<{ order: Order }> = React.memo(({ order }) => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'bg-green-100 text-green-800 border-green-200';
      case 'processing': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'confirmed': return 'bg-purple-100 text-purple-800 border-purple-200';
      case 'pending': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'cancelled': return 'bg-red-100 text-red-800 border-red-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getPaymentStatusColor = (status: string) => {
    switch (status) {
      case 'paid': return 'bg-green-100 text-green-800 border-green-200';
      case 'partial': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'pending': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'overdue': return 'bg-red-100 text-red-800 border-red-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getMembershipColor = (type: string) => {
    switch (type) {
      case 'Enterprise': return 'bg-purple-100 text-purple-800 border-purple-200';
      case 'Corporate': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'Individual': return 'bg-green-100 text-green-800 border-green-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const paymentProgress = (order.paidAmount / order.orderValue) * 100;

  return (
    <div className="bg-slate-800/40 backdrop-blur-xl rounded-2xl p-6 border border-yellow-400/30 hover:border-yellow-400/50 transition-all">
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center space-x-3">
          <div className="p-3 bg-blue-500/20 rounded-xl border border-yellow-400/30">
            <Package className="h-6 w-6 text-blue-400" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-slate-50">{order.orderNumber}</h3>
            <p className="text-sm text-slate-400">{order.customerName}</p>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium border ${getMembershipColor(order.membershipType)}`}>
            {order.membershipType}
          </span>
          <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium border ${getStatusColor(order.status)}`}>
            {order.status.toUpperCase()}
          </span>
          <button className="p-2 text-slate-400 hover:text-slate-50 hover:bg-slate-700/50 rounded-lg transition-all">
            <MoreVertical className="h-4 w-4" />
          </button>
        </div>
      </div>

      <div className="space-y-2 mb-4">
        <div className="flex items-center text-sm text-slate-300">
          <CreditCard className="h-4 w-4 mr-2 text-slate-500" />
          <span>{order.chitScheme}</span>
        </div>
        <div className="flex items-center text-sm text-slate-300">
          <Users className="h-4 w-4 mr-2 text-slate-500" />
          <span>Assigned to: {order.assignedTo}</span>
        </div>
        <div className="flex items-center text-sm text-slate-300">
          <Calendar className="h-4 w-4 mr-2 text-slate-500" />
          <span>Due: {new Date(order.dueDate).toLocaleDateString()}</span>
        </div>
      </div>

      <div className="mb-4 p-3 bg-slate-700/30 rounded-xl border border-yellow-400/20">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm text-slate-400">Order Value</span>
          <span className="text-xl font-bold text-blue-400">{formatCurrency(order.orderValue)}</span>
        </div>
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm text-slate-400">Paid Amount</span>
          <span className="text-green-400 font-medium">{formatCurrency(order.paidAmount)}</span>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-sm text-slate-400">Pending</span>
          <span className="text-red-400 font-medium">{formatCurrency(order.pendingAmount)}</span>
        </div>
      </div>

      {/* Payment Progress */}
      <div className="mb-4">
        <div className="flex justify-between text-sm text-slate-400 mb-1">
          <span>Payment Progress</span>
          <span>{Math.round(paymentProgress)}%</span>
        </div>
        <div className="w-full bg-slate-700/50 rounded-full h-2 border border-yellow-400/20">
          <div
            className="bg-gradient-to-r from-green-500 to-blue-500 h-2 rounded-full transition-all duration-300"
            style={{ width: `${paymentProgress}%` }}
          ></div>
        </div>
      </div>

      <div className="flex justify-between items-center pt-4 border-t border-yellow-400/20">
        <div className="flex items-center space-x-2">
          <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium border ${getPaymentStatusColor(order.paymentStatus)}`}>
            {order.paymentStatus.toUpperCase()}
          </span>
        </div>
        <div className="flex space-x-2">
          <button className="p-2 text-slate-400 hover:text-blue-400 hover:bg-blue-500/10 rounded-lg transition-all">
            <Eye className="h-4 w-4" />
          </button>
          <button className="p-2 text-slate-400 hover:text-green-400 hover:bg-green-500/10 rounded-lg transition-all">
            <Print className="h-4 w-4" />
          </button>
          <button className="p-2 text-slate-400 hover:text-purple-400 hover:bg-purple-500/10 rounded-lg transition-all">
            <Send className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );
});

const ReceiptCard: React.FC<{ receipt: Receipt }> = React.memo(({ receipt }) => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'acknowledged': return 'bg-green-100 text-green-800 border-green-200';
      case 'sent': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'generated': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  return (
    <div className="bg-slate-800/40 backdrop-blur-xl rounded-2xl p-6 border border-yellow-400/30 hover:border-yellow-400/50 transition-all">
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center space-x-3">
          <div className="p-3 bg-green-500/20 rounded-xl border border-yellow-400/30">
            <Receipt className="h-6 w-6 text-green-400" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-slate-50">{receipt.receiptNumber}</h3>
            <p className="text-sm text-slate-400">Payment Receipt</p>
          </div>
        </div>
        <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium border ${getStatusColor(receipt.status)}`}>
          {receipt.status.toUpperCase()}
        </span>
      </div>

      <div className="space-y-3 mb-4">
        <div className="flex items-center justify-between text-sm">
          <span className="text-slate-400">Amount</span>
          <span className="text-xl font-bold text-green-400">{formatCurrency(receipt.amount)}</span>
        </div>
        <div className="flex items-center justify-between text-sm">
          <span className="text-slate-400">Payment Date</span>
          <span className="text-slate-50">{new Date(receipt.paymentDate).toLocaleDateString()}</span>
        </div>
        <div className="flex items-center justify-between text-sm">
          <span className="text-slate-400">Payment Method</span>
          <span className="text-slate-50 capitalize">{receipt.paymentMethod}</span>
        </div>
        <div className="flex items-center justify-between text-sm">
          <span className="text-slate-400">Generated By</span>
          <span className="text-slate-300">{receipt.generatedBy}</span>
        </div>
      </div>

      <div className="flex justify-between items-center pt-4 border-t border-yellow-400/20">
        <div className="flex items-center text-xs text-slate-500">
          <Calendar className="h-3 w-3 mr-1" />
          <span>Generated {new Date(receipt.paymentDate).toLocaleDateString()}</span>
        </div>
        <div className="flex space-x-2">
          <button className="p-2 text-slate-400 hover:text-blue-400 hover:bg-blue-500/10 rounded-lg transition-all">
            <Eye className="h-4 w-4" />
          </button>
          <button className="p-2 text-slate-400 hover:text-green-400 hover:bg-green-500/10 rounded-lg transition-all">
            <Download className="h-4 w-4" />
          </button>
          <button className="p-2 text-slate-400 hover:text-purple-400 hover:bg-purple-500/10 rounded-lg transition-all">
            <Print className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );
});

export const OrdersReceipts: React.FC = () => {
  const [orders] = useState<Order[]>(sampleOrders);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [filterPaymentStatus, setFilterPaymentStatus] = useState<string>('all');
  const [activeTab, setActiveTab] = useState('orders');

  const allReceipts = useMemo(() => {
    return orders.flatMap(order => order.receipts);
  }, [orders]);

  const filteredOrders = useMemo(() => orders.filter(order => {
    const matchesSearch = order.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         order.orderNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         order.chitScheme.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === 'all' || order.status === filterStatus;
    const matchesPaymentStatus = filterPaymentStatus === 'all' || order.paymentStatus === filterPaymentStatus;
    
    return matchesSearch && matchesStatus && matchesPaymentStatus;
  }), [orders, searchTerm, filterStatus, filterPaymentStatus]);

  const filteredReceipts = useMemo(() => allReceipts.filter(receipt => {
    const matchesSearch = receipt.receiptNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         receipt.generatedBy.toLowerCase().includes(searchTerm.toLowerCase());
    
    return matchesSearch;
  }), [allReceipts, searchTerm]);

  const stats = useMemo(() => ({
    totalOrders: orders.length,
    completed: orders.filter(o => o.status === 'completed').length,
    processing: orders.filter(o => o.status === 'processing').length,
    pending: orders.filter(o => o.status === 'pending').length,
    cancelled: orders.filter(o => o.status === 'cancelled').length,
    totalValue: orders.reduce((sum, o) => sum + o.orderValue, 0),
    paidAmount: orders.reduce((sum, o) => sum + o.paidAmount, 0),
    pendingAmount: orders.reduce((sum, o) => sum + o.pendingAmount, 0),
    totalReceipts: allReceipts.length,
    receiptsGenerated: allReceipts.filter(r => r.status === 'generated').length,
    receiptsSent: allReceipts.filter(r => r.status === 'sent').length,
    receiptsAcknowledged: allReceipts.filter(r => r.status === 'acknowledged').length,
    avgOrderValue: orders.length > 0 ? orders.reduce((sum, o) => sum + o.orderValue, 0) / orders.length : 0
  }), [orders, allReceipts]);

  const tabs = [
    { id: 'orders', name: 'Orders', icon: Package, count: orders.length },
    { id: 'receipts', name: 'Receipts', icon: Receipt, count: allReceipts.length }
  ];

  return (
    <div className="h-full flex flex-col bg-slate-900 overflow-hidden">
      {/* Header */}
      <div className="flex justify-between items-center p-4 border-b border-yellow-400/30 flex-shrink-0">
        <div>
          <h1 className="text-2xl font-bold text-slate-50">Orders & Receipts</h1>
          <p className="mt-1 text-sm text-slate-400">
            Manage customer orders and payment receipts
          </p>
        </div>
        <div className="flex space-x-3">
          <button className="inline-flex items-center px-4 py-2 border border-yellow-400/30 text-sm font-medium rounded-lg text-slate-50 bg-slate-700/50 hover:bg-slate-700 transition-all backdrop-blur-sm">
            <Download className="h-4 w-4 mr-2" />
            Export Report
          </button>
          <button className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-lg shadow-sm text-white bg-blue-600 hover:bg-blue-700 transition-all">
            <Plus className="h-4 w-4 mr-2" />
            Create Order
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="border-b border-yellow-400/30 bg-slate-800/40 backdrop-blur-xl flex-shrink-0">
        <nav className="flex space-x-4 px-4 overflow-x-auto" aria-label="Tabs">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`${
                  activeTab === tab.id
                    ? 'border-blue-500 text-blue-400'
                    : 'border-transparent text-slate-400 hover:text-slate-300 hover:border-slate-300'
                } whitespace-nowrap py-3 px-2 border-b-2 font-medium text-sm flex items-center transition-all`}
              >
                <Icon className="h-4 w-4 mr-2" />
                {tab.name}
                <span className="ml-2 bg-slate-700/50 text-slate-300 px-2 py-1 rounded-full text-xs">
                  {tab.count}
                </span>
              </button>
            );
          })}
        </nav>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto p-4 space-y-6 scrollbar-none">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 lg:grid-cols-12 gap-4">
          <div className="bg-slate-800/40 backdrop-blur-xl p-4 rounded-xl border border-yellow-400/30">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-400">Total Orders</p>
                <p className="text-2xl font-bold text-slate-50">{stats.totalOrders}</p>
              </div>
              <Package className="h-8 w-8 text-blue-400" />
            </div>
          </div>
          <div className="bg-slate-800/40 backdrop-blur-xl p-4 rounded-xl border border-yellow-400/30">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-400">Completed</p>
                <p className="text-2xl font-bold text-green-400">{stats.completed}</p>
              </div>
              <CheckCircle className="h-8 w-8 text-green-400" />
            </div>
          </div>
          <div className="bg-slate-800/40 backdrop-blur-xl p-4 rounded-xl border border-yellow-400/30">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-400">Processing</p>
                <p className="text-2xl font-bold text-blue-400">{stats.processing}</p>
              </div>
              <Clock className="h-8 w-8 text-blue-400" />
            </div>
          </div>
          <div className="bg-slate-800/40 backdrop-blur-xl p-4 rounded-xl border border-yellow-400/30">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-400">Pending</p>
                <p className="text-2xl font-bold text-yellow-400">{stats.pending}</p>
              </div>
              <AlertTriangle className="h-8 w-8 text-yellow-400" />
            </div>
          </div>
          <div className="bg-slate-800/40 backdrop-blur-xl p-4 rounded-xl border border-yellow-400/30">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-400">Receipts</p>
                <p className="text-2xl font-bold text-purple-400">{stats.totalReceipts}</p>
              </div>
              <Receipt className="h-8 w-8 text-purple-400" />
            </div>
          </div>
          <div className="bg-slate-800/40 backdrop-blur-xl p-4 rounded-xl border border-yellow-400/30">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-400">Sent</p>
                <p className="text-2xl font-bold text-orange-400">{stats.receiptsSent}</p>
              </div>
              <Send className="h-8 w-8 text-orange-400" />
            </div>
          </div>
          <div className="bg-slate-800/40 backdrop-blur-xl p-4 rounded-xl border border-yellow-400/30">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-400">Acknowledged</p>
                <p className="text-2xl font-bold text-emerald-400">{stats.receiptsAcknowledged}</p>
              </div>
              <Star className="h-8 w-8 text-emerald-400" />
            </div>
          </div>
          <div className="bg-slate-800/40 backdrop-blur-xl p-4 rounded-xl border border-yellow-400/30 md:col-span-2">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-400">Total Value</p>
                <p className="text-xl font-bold text-blue-400">{formatCurrency(stats.totalValue)}</p>
              </div>
              <DollarSign className="h-8 w-8 text-blue-400" />
            </div>
          </div>
          <div className="bg-slate-800/40 backdrop-blur-xl p-4 rounded-xl border border-yellow-400/30 md:col-span-2">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-400">Paid Amount</p>
                <p className="text-xl font-bold text-green-400">{formatCurrency(stats.paidAmount)}</p>
              </div>
              <CheckCircle className="h-8 w-8 text-green-400" />
            </div>
          </div>
          <div className="bg-slate-800/40 backdrop-blur-xl p-4 rounded-xl border border-yellow-400/30">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-400">Pending</p>
                <p className="text-xl font-bold text-red-400">{formatCurrency(stats.pendingAmount)}</p>
              </div>
              <AlertTriangle className="h-8 w-8 text-red-400" />
            </div>
          </div>
        </div>

        {/* Filters */}
        <div className="bg-slate-800/40 backdrop-blur-xl rounded-xl p-4 border border-yellow-400/30">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-center">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-500 h-4 w-4" />
              <input
                type="text"
                placeholder="Search orders..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-2 bg-slate-700/50 border border-yellow-400/30 rounded-lg w-full text-slate-50 placeholder-slate-400 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 backdrop-blur-sm"
              />
            </div>
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="px-3 py-2 bg-slate-700/50 border border-yellow-400/30 rounded-lg text-slate-50 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 backdrop-blur-sm"
            >
              <option value="all">All Status</option>
              <option value="pending">Pending</option>
              <option value="confirmed">Confirmed</option>
              <option value="processing">Processing</option>
              <option value="completed">Completed</option>
              <option value="cancelled">Cancelled</option>
            </select>
            <select
              value={filterPaymentStatus}
              onChange={(e) => setFilterPaymentStatus(e.target.value)}
              className="px-3 py-2 bg-slate-700/50 border border-yellow-400/30 rounded-lg text-slate-50 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 backdrop-blur-sm"
            >
              <option value="all">All Payment Status</option>
              <option value="paid">Paid</option>
              <option value="partial">Partial</option>
              <option value="pending">Pending</option>
              <option value="overdue">Overdue</option>
            </select>
            <div className="text-sm text-slate-400">
              Showing: <span className="font-semibold text-slate-50">
                {activeTab === 'orders' ? filteredOrders.length : filteredReceipts.length}
              </span> {activeTab === 'orders' ? 'orders' : 'receipts'}
            </div>
          </div>
        </div>

        {/* Content Display */}
        {activeTab === 'orders' ? (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {filteredOrders.map((order) => (
              <OrderCard key={order.id} order={order} />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {filteredReceipts.map((receipt) => (
              <ReceiptCard key={receipt.id} receipt={receipt} />
            ))}
          </div>
        )}

        {((activeTab === 'orders' && filteredOrders.length === 0) || 
          (activeTab === 'receipts' && filteredReceipts.length === 0)) && (
          <div className="text-center py-12">
            {activeTab === 'orders' ? (
              <Package className="h-12 w-12 mx-auto text-slate-500 mb-4" />
            ) : (
              <Receipt className="h-12 w-12 mx-auto text-slate-500 mb-4" />
            )}
            <h3 className="text-lg font-medium text-slate-50 mb-2">
              No {activeTab === 'orders' ? 'orders' : 'receipts'} found
            </h3>
            <p className="text-sm text-slate-400">Try adjusting your search criteria or create a new order.</p>
          </div>
        )}
      </div>
    </div>
  );
};