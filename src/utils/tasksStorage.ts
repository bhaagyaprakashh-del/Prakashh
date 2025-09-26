import { Task, Ticket } from '../types/tasks';

const STORAGE_KEYS = {
  TASKS: 'crm_tasks',
  TICKETS: 'crm_tickets',
};

export const tasksStorage = {
  // Tasks
  getTasks: (): Task[] => {
    const data = localStorage.getItem(STORAGE_KEYS.TASKS);
    return data ? JSON.parse(data) : [];
  },

  saveTasks: (tasks: Task[]) => {
    localStorage.setItem(STORAGE_KEYS.TASKS, JSON.stringify(tasks));
  },

  addTask: (task: Task) => {
    const tasks = tasksStorage.getTasks();
    tasks.push(task);
    tasksStorage.saveTasks(tasks);
  },

  updateTask: (updatedTask: Task) => {
    const tasks = tasksStorage.getTasks();
    const index = tasks.findIndex(t => t.id === updatedTask.id);
    if (index !== -1) {
      tasks[index] = updatedTask;
      tasksStorage.saveTasks(tasks);
    }
  },

  updateTaskStatus: (taskId: string, status: Task['status']) => {
    const tasks = tasksStorage.getTasks();
    const index = tasks.findIndex(t => t.id === taskId);
    if (index !== -1) {
      tasks[index].status = status;
      tasks[index].updatedAt = new Date().toISOString();
      if (status === 'completed') {
        tasks[index].completedAt = new Date().toISOString();
        tasks[index].progressPercentage = 100;
      }
      tasksStorage.saveTasks(tasks);
    }
  },

  deleteTask: (taskId: string) => {
    const tasks = tasksStorage.getTasks().filter(t => t.id !== taskId);
    tasksStorage.saveTasks(tasks);
  },

  // Tickets
  getTickets: (): Ticket[] => {
    const data = localStorage.getItem(STORAGE_KEYS.TICKETS);
    return data ? JSON.parse(data) : [];
  },

  saveTickets: (tickets: Ticket[]) => {
    localStorage.setItem(STORAGE_KEYS.TICKETS, JSON.stringify(tickets));
  },

  addTicket: (ticket: Ticket) => {
    const tickets = tasksStorage.getTickets();
    tickets.push(ticket);
    tasksStorage.saveTickets(tickets);
  },

  updateTicket: (updatedTicket: Ticket) => {
    const tickets = tasksStorage.getTickets();
    const index = tickets.findIndex(t => t.id === updatedTicket.id);
    if (index !== -1) {
      tickets[index] = updatedTicket;
      tasksStorage.saveTickets(tickets);
    }
  },

  updateTicketStatus: (ticketId: string, status: Ticket['status']) => {
    const tickets = tasksStorage.getTickets();
    const index = tickets.findIndex(t => t.id === ticketId);
    if (index !== -1) {
      tickets[index].status = status;
      tickets[index].updatedAt = new Date().toISOString();
      if (status === 'resolved') {
        tickets[index].resolvedAt = new Date().toISOString();
      }
      tasksStorage.saveTickets(tickets);
    }
  },

  deleteTicket: (ticketId: string) => {
    const tickets = tasksStorage.getTickets().filter(t => t.id !== ticketId);
    tasksStorage.saveTickets(tickets);
  },
};

// Initialize with sample data if empty
export const initializeSampleTasksAndTickets = () => {
  if (tasksStorage.getTasks().length === 0) {
    const sampleTasks: Task[] = [
      {
        id: '1',
        title: 'Follow up with TechCorp lead',
        description: 'Call TechCorp to discuss premium chit scheme proposal',
        type: 'call',
        priority: 'high',
        status: 'todo',
        assignedTo: 'Priya Sharma',
        assignedBy: 'Rajesh Kumar',
        dueDate: '2024-03-20',
        estimatedHours: 1,
        tags: ['sales', 'follow-up', 'high-priority'],
        attachments: [],
        comments: [],
        subtasks: [],
        createdAt: '2024-03-15T10:00:00',
        updatedAt: '2024-03-15T10:00:00',
        watchers: [],
        collaborators: [],
        progressPercentage: 0
      },
      {
        id: '2',
        title: 'Prepare monthly sales report',
        description: 'Compile sales data and create comprehensive monthly report',
        type: 'documentation',
        priority: 'medium',
        status: 'in-progress',
        assignedTo: 'Karthik Nair',
        assignedBy: 'Rajesh Kumar',
        dueDate: '2024-03-25',
        estimatedHours: 4,
        tags: ['reporting', 'sales', 'monthly'],
        attachments: [],
        comments: [],
        subtasks: [],
        createdAt: '2024-03-10T14:30:00',
        updatedAt: '2024-03-15T16:20:00',
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
        status: 'completed',
        assignedTo: 'Priya Sharma',
        assignedBy: 'Rajesh Kumar',
        dueDate: '2024-03-18',
        completedAt: '2024-03-17T15:45:00',
        estimatedHours: 3,
        actualHours: 2.5,
        tags: ['documentation', 'crm', 'training'],
        attachments: [],
        comments: [],
        subtasks: [],
        createdAt: '2024-03-12T11:15:00',
        updatedAt: '2024-03-17T15:45:00',
        startedAt: '2024-03-16T10:00:00',
        watchers: [],
        collaborators: [],
        progressPercentage: 100
      }
    ];

    const sampleTickets: Ticket[] = [
      {
        id: '1',
        ticketNumber: 'TKT-2024-001',
        subject: 'Unable to access chit group information',
        description: 'Customer cannot view their chit group details in the portal',
        category: 'technical',
        priority: 'high',
        status: 'open',
        customerId: 'cust_001',
        customerName: 'Rajesh Gupta',
        customerEmail: 'rajesh@techcorp.com',
        customerPhone: '+91 98765 43210',
        assignedTo: 'Karthik Nair',
        assignedBy: 'System',
        department: 'Technical Support',
        slaLevel: 'standard',
        slaDeadline: '2024-03-16T18:00:00',
        createdAt: '2024-03-15T14:00:00',
        updatedAt: '2024-03-15T14:00:00',
        responses: [],
        internalNotes: [],
        tags: ['portal', 'access-issue'],
        source: 'email'
      },
      {
        id: '2',
        ticketNumber: 'TKT-2024-002',
        subject: 'Payment not reflecting in account',
        description: 'Customer made payment yesterday but it is not showing in their account',
        category: 'billing',
        priority: 'critical',
        status: 'in-progress',
        customerId: 'cust_002',
        customerName: 'Sunita Reddy',
        customerEmail: 'sunita@gmail.com',
        customerPhone: '+91 98765 43211',
        assignedTo: 'Priya Sharma',
        assignedBy: 'Karthik Nair',
        department: 'Customer Service',
        slaLevel: 'priority',
        slaDeadline: '2024-03-15T20:00:00',
        createdAt: '2024-03-14T16:30:00',
        updatedAt: '2024-03-15T10:15:00',
        firstResponseAt: '2024-03-14T17:00:00',
        responses: [
          {
            id: 'resp_1',
            ticketId: '2',
            message: 'Thank you for contacting us. We are investigating the payment issue.',
            isCustomerResponse: false,
            createdBy: 'Priya Sharma',
            createdAt: '2024-03-14T17:00:00',
            attachments: [],
            isPublic: true
          }
        ],
        internalNotes: [
          {
            id: 'note_1',
            ticketId: '2',
            note: 'Checking with accounts team for payment reconciliation',
            createdBy: 'Priya Sharma',
            createdAt: '2024-03-15T10:15:00',
            isPrivate: true
          }
        ],
        tags: ['payment', 'urgent', 'billing'],
        source: 'phone'
      },
      {
        id: '3',
        ticketNumber: 'TKT-2024-003',
        subject: 'Request for scheme information',
        description: 'Customer wants information about available chit fund schemes',
        category: 'general',
        priority: 'medium',
        status: 'resolved',
        customerId: 'cust_003',
        customerName: 'Amit Sharma',
        customerEmail: 'amit@startupinc.com',
        customerPhone: '+91 98765 43212',
        assignedTo: 'Karthik Nair',
        assignedBy: 'System',
        department: 'Sales',
        slaLevel: 'standard',
        slaDeadline: '2024-03-14T18:00:00',
        createdAt: '2024-03-13T11:20:00',
        updatedAt: '2024-03-13T16:30:00',
        firstResponseAt: '2024-03-13T12:00:00',
        resolvedAt: '2024-03-13T16:30:00',
        responses: [
          {
            id: 'resp_2',
            ticketId: '3',
            message: 'I have sent you detailed information about our chit fund schemes via email.',
            isCustomerResponse: false,
            createdBy: 'Karthik Nair',
            createdAt: '2024-03-13T16:30:00',
            attachments: [],
            isPublic: true
          }
        ],
        internalNotes: [],
        tags: ['information', 'schemes'],
        source: 'website'
      }
    ];

    tasksStorage.saveTasks(sampleTasks);
    tasksStorage.saveTickets(sampleTickets);
  }
};