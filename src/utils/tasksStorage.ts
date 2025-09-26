import { Task, Ticket } from '../types';

const TASKS_STORAGE_KEY = 'crm_tasks';
const TICKETS_STORAGE_KEY = 'crm_tickets';

export const tasksStorage = {
  // Tasks CRUD Operations
  getTasks: (): Task[] => {
    const data = localStorage.getItem(TASKS_STORAGE_KEY);
    return data ? JSON.parse(data) : [];
  },

  saveTasks: (tasks: Task[]) => {
    localStorage.setItem(TASKS_STORAGE_KEY, JSON.stringify(tasks));
  },

  addTask: (task: Task) => {
    const tasks = tasksStorage.getTasks();
    tasks.push(task);
    tasksStorage.saveTasks(tasks);
    return task;
  },

  updateTask: (updatedTask: Task) => {
    const tasks = tasksStorage.getTasks();
    const index = tasks.findIndex(t => t.id === updatedTask.id);
    if (index !== -1) {
      tasks[index] = { ...updatedTask, updatedAt: new Date().toISOString() };
      tasksStorage.saveTasks(tasks);
      return tasks[index];
    }
    throw new Error('Task not found');
  },

  deleteTask: (taskId: string) => {
    const tasks = tasksStorage.getTasks().filter(t => t.id !== taskId);
    tasksStorage.saveTasks(tasks);
  },

  getTaskById: (taskId: string): Task | null => {
    const tasks = tasksStorage.getTasks();
    return tasks.find(t => t.id === taskId) || null;
  },

  updateTaskStatus: (taskId: string, newStatus: Task['status']) => {
    const tasks = tasksStorage.getTasks();
    const index = tasks.findIndex(t => t.id === taskId);
    if (index !== -1) {
      tasks[index].status = newStatus;
      tasks[index].updatedAt = new Date().toISOString();
      if (newStatus === 'completed') {
        tasks[index].completedAt = new Date().toISOString();
        tasks[index].progressPercentage = 100;
      }
      tasksStorage.saveTasks(tasks);
      return tasks[index];
    }
    throw new Error('Task not found');
  },

  getTasksByAssignee: (assignee: string): Task[] => {
    const tasks = tasksStorage.getTasks();
    return tasks.filter(t => t.assignedTo === assignee);
  },

  searchTasks: (searchTerm: string): Task[] => {
    const tasks = tasksStorage.getTasks();
    const term = searchTerm.toLowerCase();
    return tasks.filter(task => 
      task.title.toLowerCase().includes(term) ||
      task.description.toLowerCase().includes(term) ||
      task.assignedTo.toLowerCase().includes(term)
    );
  },

  // Tickets CRUD Operations
  getTickets: (): Ticket[] => {
    const data = localStorage.getItem(TICKETS_STORAGE_KEY);
    return data ? JSON.parse(data) : [];
  },

  saveTickets: (tickets: Ticket[]) => {
    localStorage.setItem(TICKETS_STORAGE_KEY, JSON.stringify(tickets));
  },

  addTicket: (ticket: Ticket) => {
    const tickets = tasksStorage.getTickets();
    tickets.push(ticket);
    tasksStorage.saveTickets(tickets);
    return ticket;
  },

  updateTicket: (updatedTicket: Ticket) => {
    const tickets = tasksStorage.getTickets();
    const index = tickets.findIndex(t => t.id === updatedTicket.id);
    if (index !== -1) {
      tickets[index] = { ...updatedTicket, updatedAt: new Date().toISOString() };
      tasksStorage.saveTickets(tickets);
      return tickets[index];
    }
    throw new Error('Ticket not found');
  },

  deleteTicket: (ticketId: string) => {
    const tickets = tasksStorage.getTickets().filter(t => t.id !== ticketId);
    tasksStorage.saveTickets(tickets);
  },

  getTicketById: (ticketId: string): Ticket | null => {
    const tickets = tasksStorage.getTickets();
    return tickets.find(t => t.id === ticketId) || null;
  },

  updateTicketStatus: (ticketId: string, newStatus: Ticket['status']) => {
    const tickets = tasksStorage.getTickets();
    const index = tickets.findIndex(t => t.id === ticketId);
    if (index !== -1) {
      tickets[index].status = newStatus;
      tickets[index].updatedAt = new Date().toISOString();
      if (newStatus === 'resolved') {
        tickets[index].resolvedAt = new Date().toISOString();
      } else if (newStatus === 'closed') {
        tickets[index].closedAt = new Date().toISOString();
      }
      tasksStorage.saveTickets(tickets);
      return tickets[index];
    }
    throw new Error('Ticket not found');
  },

  getTicketsByAssignee: (assignee: string): Ticket[] => {
    const tickets = tasksStorage.getTickets();
    return tickets.filter(t => t.assignedTo === assignee);
  },

  searchTickets: (searchTerm: string): Ticket[] => {
    const tickets = tasksStorage.getTickets();
    const term = searchTerm.toLowerCase();
    return tickets.filter(ticket => 
      ticket.subject.toLowerCase().includes(term) ||
      ticket.customerName.toLowerCase().includes(term) ||
      ticket.ticketNumber.toLowerCase().includes(term)
    );
  },

  // Statistics
  getTaskStats: () => {
    const tasks = tasksStorage.getTasks();
    return {
      total: tasks.length,
      todo: tasks.filter(t => t.status === 'todo').length,
      inProgress: tasks.filter(t => t.status === 'in-progress').length,
      review: tasks.filter(t => t.status === 'review').length,
      completed: tasks.filter(t => t.status === 'completed').length,
      blocked: tasks.filter(t => t.status === 'blocked').length,
      cancelled: tasks.filter(t => t.status === 'cancelled').length,
      overdue: tasks.filter(t => new Date(t.dueDate) < new Date() && t.status !== 'completed').length
    };
  },

  getTicketStats: () => {
    const tickets = tasksStorage.getTickets();
    return {
      total: tickets.length,
      open: tickets.filter(t => t.status === 'open').length,
      inProgress: tickets.filter(t => t.status === 'in-progress').length,
      waitingCustomer: tickets.filter(t => t.status === 'waiting-customer').length,
      resolved: tickets.filter(t => t.status === 'resolved').length,
      closed: tickets.filter(t => t.status === 'closed').length,
      escalated: tickets.filter(t => t.status === 'escalated').length
    };
  }
};

// Initialize with sample data if empty
export const initializeTasksData = () => {
  if (tasksStorage.getTasks().length === 0) {
    const sampleTasks: Task[] = [
      {
        id: '1',
        title: 'Follow up with TechCorp Solutions',
        description: 'Call Rajesh Gupta to discuss premium chit scheme proposal and answer any questions',
        type: 'call',
        priority: 'high',
        status: 'todo',
        assignedTo: 'Priya Sharma',
        assignedBy: 'Rajesh Kumar',
        dueDate: '2024-03-16',
        estimatedHours: 1,
        leadId: 'lead_001',
        tags: ['sales', 'follow-up', 'high-value'],
        attachments: [],
        comments: [],
        subtasks: [],
        createdAt: '2024-03-15',
        updatedAt: '2024-03-15',
        watchers: ['Rajesh Kumar'],
        collaborators: [],
        progressPercentage: 0
      },
      {
        id: '2',
        title: 'Prepare monthly sales report',
        description: 'Compile sales data for March 2024 including lead conversion rates and revenue analysis',
        type: 'documentation',
        priority: 'medium',
        status: 'in-progress',
        assignedTo: 'Karthik Nair',
        assignedBy: 'Rajesh Kumar',
        dueDate: '2024-03-20',
        estimatedHours: 4,
        actualHours: 2,
        tags: ['reporting', 'sales', 'monthly'],
        attachments: [],
        comments: [],
        subtasks: [],
        createdAt: '2024-03-14',
        updatedAt: '2024-03-15',
        startedAt: '2024-03-15T09:00:00',
        watchers: [],
        collaborators: [],
        progressPercentage: 60
      },
      {
        id: '3',
        title: 'Update CRM system documentation',
        description: 'Update user manual and training materials for new CRM features',
        type: 'documentation',
        priority: 'low',
        status: 'review',
        assignedTo: 'Vikram Singh',
        assignedBy: 'Priya Sharma',
        dueDate: '2024-03-25',
        estimatedHours: 6,
        actualHours: 5,
        tags: ['documentation', 'training'],
        attachments: [],
        comments: [],
        subtasks: [],
        createdAt: '2024-03-12',
        updatedAt: '2024-03-15',
        watchers: ['Priya Sharma'],
        collaborators: [],
        progressPercentage: 90
      },
      {
        id: '4',
        title: 'Conduct Premium Gold A1 auction',
        description: 'Organize and conduct monthly auction for Premium Gold chit group',
        type: 'meeting',
        priority: 'critical',
        status: 'completed',
        assignedTo: 'Karthik Nair',
        assignedBy: 'Rajesh Kumar',
        dueDate: '2024-03-15',
        estimatedHours: 2,
        actualHours: 2,
        completedAt: '2024-03-15T16:00:00',
        tags: ['auction', 'chit-group', 'monthly'],
        attachments: [],
        comments: [],
        subtasks: [],
        createdAt: '2024-03-10',
        updatedAt: '2024-03-15',
        watchers: ['Rajesh Kumar'],
        collaborators: [],
        progressPercentage: 100
      }
    ];

    const sampleTickets: Ticket[] = [
      {
        id: '1',
        ticketNumber: 'TKT-2024-001',
        subject: 'Unable to access chit group details',
        description: 'Customer cannot view their chit group information in the member portal. Getting error message when trying to login.',
        category: 'technical',
        priority: 'high',
        status: 'open',
        customerId: 'cust_001',
        customerName: 'Rajesh Gupta',
        customerEmail: 'rajesh.gupta@techcorp.com',
        customerPhone: '+91 98765 43210',
        assignedTo: 'Karthik Nair',
        assignedBy: 'System',
        department: 'Technical Support',
        slaLevel: 'priority',
        slaDeadline: '2024-03-16T14:00:00',
        createdAt: '2024-03-15T10:00:00',
        updatedAt: '2024-03-15T10:00:00',
        responses: [],
        internalNotes: [],
        tags: ['portal', 'access-issue', 'login-problem'],
        source: 'email'
      },
      {
        id: '2',
        ticketNumber: 'TKT-2024-002',
        subject: 'Payment not reflecting in account',
        description: 'Customer made payment 3 days ago via bank transfer but it is not showing in their account balance. Transaction ID: TXN123456789',
        category: 'billing',
        priority: 'critical',
        status: 'in-progress',
        customerId: 'cust_002',
        customerName: 'Sunita Reddy',
        customerEmail: 'sunita.reddy@gmail.com',
        customerPhone: '+91 98765 43211',
        assignedTo: 'Amit Patel',
        assignedBy: 'Rajesh Kumar',
        department: 'Finance',
        slaLevel: 'vip',
        slaDeadline: '2024-03-15T16:00:00',
        responseTime: 45,
        createdAt: '2024-03-14T14:30:00',
        updatedAt: '2024-03-15T09:15:00',
        firstResponseAt: '2024-03-14T15:15:00',
        responses: [],
        internalNotes: [],
        tags: ['payment', 'billing', 'bank-transfer'],
        source: 'phone'
      },
      {
        id: '3',
        ticketNumber: 'TKT-2024-003',
        subject: 'Request for scheme change',
        description: 'Customer wants to switch from Basic Savings to Silver Monthly scheme. Need to process the change request.',
        category: 'general',
        priority: 'medium',
        status: 'resolved',
        customerId: 'cust_003',
        customerName: 'Meera Nair',
        customerEmail: 'meera@consultancy.com',
        customerPhone: '+91 98765 43215',
        assignedTo: 'Priya Sharma',
        assignedBy: 'Customer Service',
        department: 'Customer Service',
        slaLevel: 'standard',
        slaDeadline: '2024-03-18T17:00:00',
        responseTime: 120,
        resolutionTime: 1440,
        createdAt: '2024-03-13T11:00:00',
        updatedAt: '2024-03-14T16:30:00',
        firstResponseAt: '2024-03-13T13:00:00',
        resolvedAt: '2024-03-14T16:30:00',
        responses: [],
        internalNotes: [],
        tags: ['scheme-change', 'upgrade', 'customer-request'],
        source: 'chat',
        satisfaction: 5
      }
    ];

    tasksStorage.saveTasks(sampleTasks);
    tasksStorage.saveTickets(sampleTickets);
  }
};