// Route Registry for Chit Funds CRM
// Auto-generated registry of all application routes

export interface RouteMetadata {
  path: string;
  title: string;
  module: string;
  component: string;
  roles: string[];
  icon?: string;
  description?: string;
  parent?: string;
}

export const ROUTE_REGISTRY: RouteMetadata[] = [
  // Dashboard
  { path: '/dash/admin', title: 'Admin Dashboard', module: 'dashboard', component: 'AdminDashboard', roles: ['admin'] },
  { path: '/dash/employee', title: 'Employee Dashboard', module: 'dashboard', component: 'EmployeeDashboard', roles: ['employee'] },
  { path: '/dash/agent', title: 'Agent Dashboard', module: 'dashboard', component: 'AgentDashboard', roles: ['agent'] },
  { path: '/dash/subscriber', title: 'Subscriber Dashboard', module: 'dashboard', component: 'SubscriberDashboard', roles: ['subscriber'] },

  // Leads & Sales
  { path: '/leads/kanban', title: 'Leads Kanban', module: 'leads', component: 'LeadsKanban', roles: ['admin', 'employee', 'agent'] },
  { path: '/leads/list', title: 'Leads List', module: 'leads', component: 'LeadsList', roles: ['admin', 'employee', 'agent'] },
  { path: '/leads/360/:id', title: 'Lead 360 View', module: 'leads', component: 'Lead360', roles: ['admin', 'employee', 'agent'] },
  { path: '/leads/new', title: 'New Lead', module: 'leads', component: 'NewLead', roles: ['admin', 'employee', 'agent'] },
  { path: '/leads/import', title: 'Import Leads', module: 'leads', component: 'ImportLeads', roles: ['admin', 'employee'] },

  // Tasks & Tickets
  { path: '/tasks/board', title: 'Task Board', module: 'tasks', component: 'TaskBoard', roles: ['admin', 'employee', 'agent'] },
  { path: '/tasks/list', title: 'Tasks List', module: 'tasks', component: 'TasksList', roles: ['admin', 'employee', 'agent'] },
  { path: '/tasks/calendar', title: 'Task Calendar', module: 'tasks', component: 'TaskCalendar', roles: ['admin', 'employee', 'agent'] },
  { path: '/tickets/list', title: 'Support Tickets', module: 'tasks', component: 'TicketsList', roles: ['admin', 'employee'] },
  { path: '/tickets/new', title: 'New Ticket', module: 'tasks', component: 'NewTicket', roles: ['admin', 'employee', 'agent'] },

  // Campaigns & Messaging
  { path: '/messaging/campaigns', title: 'Campaigns', module: 'messaging', component: 'Campaigns', roles: ['admin', 'employee'] },
  { path: '/messaging/broadcasts', title: 'Broadcasts', module: 'messaging', component: 'Broadcasts', roles: ['admin', 'employee'] },
  { path: '/messaging/templates', title: 'Message Templates', module: 'messaging', component: 'Templates', roles: ['admin', 'employee'] },
  { path: '/messaging/analytics', title: 'Message Analytics', module: 'messaging', component: 'MessageAnalytics', roles: ['admin', 'employee'] },

  // Calendar
  { path: '/calendar/month', title: 'Calendar', module: 'calendar', component: 'CalendarMonth', roles: ['admin', 'employee', 'agent'] },
  { path: '/calendar/events', title: 'Events', module: 'calendar', component: 'EventsList', roles: ['admin', 'employee', 'agent'] },
  { path: '/calendar/new-event', title: 'New Event', module: 'calendar', component: 'NewEvent', roles: ['admin', 'employee', 'agent'] },

  // Subscribers
  { path: '/subscribers/list', title: 'Subscribers', module: 'subscribers', component: 'SubscribersList', roles: ['admin', 'employee', 'agent'] },
  { path: '/subscribers/360/:id', title: 'Subscriber 360', module: 'subscribers', component: 'Subscriber360', roles: ['admin', 'employee', 'agent'] },
  { path: '/subscribers/new', title: 'New Subscriber', module: 'subscribers', component: 'NewSubscriber', roles: ['admin', 'employee', 'agent'] },
  { path: '/subscribers/payments', title: 'Payments', module: 'subscribers', component: 'Payments', roles: ['admin', 'employee'] },
  { path: '/subscribers/collections', title: 'Collections', module: 'subscribers', component: 'Collections', roles: ['admin', 'employee', 'agent'] },

  // Agents
  { path: '/agents/list', title: 'Agents', module: 'agents', component: 'AgentsList', roles: ['admin', 'employee'] },
  { path: '/agents/360/:id', title: 'Agent 360', module: 'agents', component: 'Agent360', roles: ['admin', 'employee'] },
  { path: '/agents/performance', title: 'Performance', module: 'agents', component: 'AgentPerformance', roles: ['admin', 'employee'] },
  { path: '/agents/targets', title: 'Targets', module: 'agents', component: 'AgentTargets', roles: ['admin', 'employee'] },
  { path: '/agents/diary', title: 'Agent Diary', module: 'agents', component: 'AgentDiary', roles: ['admin', 'employee', 'agent'] },

  // Chit Groups
  { path: '/chit/list', title: 'Chit Groups', module: 'chitGroups', component: 'ChitGroupsList', roles: ['admin', 'employee'] },
  { path: '/chit/360/:id', title: 'Chit Group 360', module: 'chitGroups', component: 'ChitGroup360', roles: ['admin', 'employee'] },
  { path: '/chit/auctions', title: 'Auctions', module: 'chitGroups', component: 'Auctions', roles: ['admin', 'employee'] },
  { path: '/chit/collections', title: 'Chit Collections', module: 'chitGroups', component: 'ChitCollections', roles: ['admin', 'employee'] },

  // HRMS Lite
  { path: '/hrms/directory', title: 'Employee Directory', module: 'hrms', component: 'EmployeeDirectory', roles: ['admin', 'employee'] },
  { path: '/hrms/attendance', title: 'Attendance', module: 'hrms', component: 'Attendance', roles: ['admin', 'employee'] },
  { path: '/hrms/payroll', title: 'Payroll', module: 'hrms', component: 'Payroll', roles: ['admin'] },
  { path: '/hrms/leaves', title: 'Leave Management', module: 'hrms', component: 'LeaveManagement', roles: ['admin', 'employee'] },

  // Reports Hub
  { path: '/reports/dashboard', title: 'Reports Dashboard', module: 'reports', component: 'ReportsDashboard', roles: ['admin', 'employee'] },
  { path: '/reports/builder', title: 'Report Builder', module: 'reports', component: 'ReportBuilder', roles: ['admin', 'employee'] },
  { path: '/reports/scheduled', title: 'Scheduled Reports', module: 'reports', component: 'ScheduledReports', roles: ['admin', 'employee'] },

  // Company & Settings
  { path: '/settings/company', title: 'Company Settings', module: 'settings', component: 'CompanySettings', roles: ['admin'] },
  { path: '/settings/users', title: 'User Management', module: 'settings', component: 'UserManagement', roles: ['admin'] },
  { path: '/settings/roles', title: 'Roles & Permissions', module: 'settings', component: 'RolesPermissions', roles: ['admin'] },
  { path: '/settings/branches', title: 'Branch Management', module: 'settings', component: 'BranchManagement', roles: ['admin'] },

  // Customization
  { path: '/customize/theme', title: 'Theme Settings', module: 'customization', component: 'ThemeSettings', roles: ['admin'] },
  { path: '/customize/sidebar', title: 'Sidebar Settings', module: 'customization', component: 'SidebarSettings', roles: ['admin'] },
  { path: '/customize/modules', title: 'Module Settings', module: 'customization', component: 'ModuleSettings', roles: ['admin'] },

  // Notifications
  { path: '/notifications', title: 'Notifications', module: 'notifications', component: 'NotificationsPage', roles: ['admin', 'employee', 'agent', 'subscriber'] }
];

export const getRoutesByModule = (module: string): RouteMetadata[] => {
  return ROUTE_REGISTRY.filter(route => route.module === module);
};

export const getRoutesByRole = (role: string): RouteMetadata[] => {
  return ROUTE_REGISTRY.filter(route => route.roles.includes(role));
};

export const getRouteMetadata = (path: string): RouteMetadata | undefined => {
  return ROUTE_REGISTRY.find(route => route.path === path);
};

export const MODULES = [
  'dashboard',
  'leads',
  'tasks',
  'messaging',
  'calendar',
  'subscribers',
  'agents',
  'chitGroups',
  'hrms',
  'reports',
  'settings',
  'customization',
  'notifications'
];

export const TOTAL_ROUTES = ROUTE_REGISTRY.length;
export const TOTAL_MODULES = MODULES.length;