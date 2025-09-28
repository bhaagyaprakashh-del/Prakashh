import React from 'react';
import { Navigate } from 'react-router-dom';
import AdminDashboard from '../pages/dashboards/AdminDashboard';
import EmployeeDashboard from '../pages/dashboards/EmployeeDashboard';
import AgentDashboard from '../pages/dashboards/AgentDashboard';
import SubscriberDashboard from '../pages/dashboards/SubscriberDashboard';

export type AppRoute = {
  path: string;                    // e.g., "/settings/users"
  key: string;                     // unique key, e.g., "settings.users"
  title: string;
  element: React.ReactNode;        // lazy component
  parent?: string;                 // module key for grouping
  exact?: boolean;
  hidden?: boolean;
};

// Lazy imports to keep bundle small
const DashboardHome = React.lazy(() => import('../components/Dashboard/DashboardHome').then(module => ({ default: module.DashboardHome })));
const AllLeads = React.lazy(() => import('../components/CRM/AllLeads').then(module => ({ default: module.AllLeads })));
const LeadsKanban = React.lazy(() => import('../components/CRM/LeadsKanban').then(module => ({ default: module.LeadsKanban })));
const LeadsKanbanBoard = React.lazy(() => import('../pages/Leads/LeadsKanban').then(module => ({ default: module.LeadsKanban })));
const NewLead = React.lazy(() => import('../components/CRM/NewLead').then(module => ({ default: module.NewLead })));
const Lead360 = React.lazy(() => import('../components/CRM/Lead360').then(module => ({ default: module.Lead360 })));
const Conversions = React.lazy(() => import('../components/CRM/Conversions').then(module => ({ default: module.Conversions })));
const OrdersReceipts = React.lazy(() => import('../components/CRM/OrdersReceipts').then(module => ({ default: module.OrdersReceipts })));
const LeadsReports = React.lazy(() => import('../components/CRM/LeadsReports').then(module => ({ default: module.LeadsReports })));
const MyTasks = React.lazy(() => import('../components/Tasks/MyTasks').then(module => ({ default: module.MyTasks })));
const TaskBoard = React.lazy(() => import('../components/Tasks/TaskBoard').then(module => ({ default: module.TaskBoard })));
const TicketsInbox = React.lazy(() => import('../components/Tasks/TicketsInbox').then(module => ({ default: module.TicketsInbox })));
const SLAPriority = React.lazy(() => import('../components/Tasks/SLAPriority').then(module => ({ default: module.SLAPriority })));
const TasksReports = React.lazy(() => import('../components/Tasks/TasksReports').then(module => ({ default: module.TasksReports })));
const Campaigns = React.lazy(() => import('../components/Campaigns/Campaigns').then(module => ({ default: module.Campaigns })));
const EmailJourneys = React.lazy(() => import('../components/Campaigns/EmailJourneys').then(module => ({ default: module.EmailJourneys })));
const ChatBroadcast = React.lazy(() => import('../components/Campaigns/ChatBroadcast').then(module => ({ default: module.ChatBroadcast })));
const Templates = React.lazy(() => import('../components/Campaigns/Templates').then(module => ({ default: module.Templates })));
const MonthWeekDay = React.lazy(() => import('../components/Calendar/MonthWeekDay').then(module => ({ default: module.MonthWeekDay })));
const MyEvents = React.lazy(() => import('../components/Calendar/MyEvents').then(module => ({ default: module.MyEvents })));
const TeamView = React.lazy(() => import('../components/Calendar/TeamView').then(module => ({ default: module.TeamView })));
const AllSubscribers = React.lazy(() => import('../components/Subscribers/AllSubscribers').then(module => ({ default: module.AllSubscribers })));
const NewSubscriber = React.lazy(() => import('../components/Subscribers/NewSubscriber').then(module => ({ default: module.NewSubscriber })));
const Subscriber360 = React.lazy(() => import('../components/Subscribers/Subscriber360').then(module => ({ default: module.Subscriber360 })));
const SubscribersReports = React.lazy(() => import('../components/Subscribers/SubscribersReports').then(module => ({ default: module.SubscribersReports })));
const AgentDirectory = React.lazy(() => import('../components/Agents/AgentDirectory').then(module => ({ default: module.AgentDirectory })));
const AddAgent = React.lazy(() => import('../components/Agents/AddAgent').then(module => ({ default: module.AddAgent })));
const TargetsRanking = React.lazy(() => import('../components/Agents/TargetsRanking').then(module => ({ default: module.TargetsRanking })));
const AgentDailyDiary = React.lazy(() => import('../components/Agents/DailyDiary').then(module => ({ default: module.default })));
const GroupsOverview = React.lazy(() => import('../components/ChitFund/GroupsOverview').then(module => ({ default: module.GroupsOverview })));
const CreateAllocateGroups = React.lazy(() => import('../components/ChitFund/CreateAllocateGroups').then(module => ({ default: module.CreateAllocateGroups })));
const ListOfGroups = React.lazy(() => import('../components/ChitFund/ListOfGroups').then(module => ({ default: module.ListOfGroups })));
const Group360 = React.lazy(() => import('../components/ChitFund/Group360').then(module => ({ default: module.Group360 })));
const ChitReports = React.lazy(() => import('../components/ChitFund/ChitReports').then(module => ({ default: module.ChitReports })));
const EmployeeDirectory = React.lazy(() => import('../components/HRMS/EmployeeDirectory').then(module => ({ default: module.EmployeeDirectory })));
const NewEmployee = React.lazy(() => import('../components/HRMS/NewEmployee').then(module => ({ default: module.NewEmployee })));
const Employee360 = React.lazy(() => import('../components/HRMS/Employee360').then(module => ({ default: module.Employee360 })));
const AttendanceLogs = React.lazy(() => import('../components/HRMS/AttendanceLogs').then(module => ({ default: module.AttendanceLogs })));
const PayrollRuns = React.lazy(() => import('../components/HRMS/PayrollRuns').then(module => ({ default: module.PayrollRuns })));
const HRMSReports = React.lazy(() => import('../components/HRMS/HRMSReports').then(module => ({ default: module.HRMSReports })));
const ReportsDashboard = React.lazy(() => import('../components/Reports/ReportsDashboard').then(module => ({ default: module.ReportsDashboard })));
const MyReports = React.lazy(() => import('../components/Reports/MyReports').then(module => ({ default: module.MyReports })));
const ScheduledReports = React.lazy(() => import('../components/Reports/ScheduledReports').then(module => ({ default: module.ScheduledReports })));
const UploadsImport = React.lazy(() => import('../components/Reports/UploadsImport').then(module => ({ default: module.UploadsImport })));
const CompanyProfile = React.lazy(() => import('../components/Company/CompanyProfile').then(module => ({ default: module.CompanyProfile })));
const Branches = React.lazy(() => import('../components/Company/Branches').then(module => ({ default: module.Branches })));
const Departments = React.lazy(() => import('../components/Company/Departments').then(module => ({ default: module.Departments })));
const RolesPermissions = React.lazy(() => import('../components/Company/RolesPermissions').then(module => ({ default: module.RolesPermissions })));
const UsersComponent = React.lazy(() => import('../pages/settings/UsersPage'));
const AddUserComponent = React.lazy(() => import('../components/Users/AddUser').then(module => ({ default: module.AddUser })));
const Products = React.lazy(() => import('../components/Company/Products').then(module => ({ default: module.Products })));
const TemplatesDMS = React.lazy(() => import('../components/Company/TemplatesDMS').then(module => ({ default: module.TemplatesDMS })));
const AuditLogs = React.lazy(() => import('../components/Company/AuditLogs').then(module => ({ default: module.AuditLogs })));
const LegacyMembers = React.lazy(() => import('../components/Members').then(module => ({ default: module.Members })));
const LegacySchemes = React.lazy(() => import('../components/Schemes').then(module => ({ default: module.Schemes })));
const LegacyPayments = React.lazy(() => import('../components/Payments').then(module => ({ default: module.Payments })));

// Stub components for missing pages
const PlaceholderPage: React.FC<{ title: string; description: string }> = ({ title, description }) => (
  <div className="flex flex-col items-center justify-center h-96 text-center">
    <div className="bg-slate-700/30 backdrop-blur-sm rounded-full p-4 mb-4 border border-slate-600/50">
      <div className="h-16 w-16 bg-slate-600/50 rounded-full"></div>
    </div>
    <h2 className="text-2xl font-bold text-white mb-2">{title}</h2>
    <p className="text-slate-400 max-w-md">{description}</p>
    <div className="mt-6 px-6 py-3 bg-blue-500/20 text-blue-400 rounded-lg text-sm border border-blue-500/30 backdrop-blur-sm">
      This module is coming soon! The foundation is ready for implementation.
    </div>
  </div>
);

export const routes: AppRoute[] = [
  // Dashboard
  { 
    path: "/dashboard", 
    key: "dashboard.home", 
    title: "Dashboard", 
    element: <DashboardHome onPageChange={(page: string) => window.location.href = `/${page}`} />, 
    parent: "dashboard" 
  },

  // Role-based Dashboards
  { path: "/dash/admin", key: "dash.admin", title: "Admin Dashboard", element: <AdminDashboard /> },
  { path: "/dash/employee", key: "dash.employee", title: "Employee Dashboard", element: <EmployeeDashboard /> },
  { path: "/dash/agent", key: "dash.agent", title: "Agent Dashboard", element: <AgentDashboard /> },
  { path: "/dash/subscriber", key: "dash.subscriber", title: "Subscriber Dashboard", element: <SubscriberDashboard /> },

  // Leads & Sales
  { 
    path: "/leads-all", 
    key: "leads.all", 
    title: "All Leads (Table)", 
    element: <AllLeads />, 
    parent: "leads" 
  },
  { 
    path: "/leads-kanban", 
    key: "leads.kanban", 
    title: "Leads Pipeline (Kanban)", 
    element: <LeadsKanbanBoard />, 
    parent: "leads" 
  },
  { 
    path: "/leads-new", 
    key: "leads.new", 
    title: "Add New Lead", 
    element: <NewLead onBack={() => window.history.back()} onSave={() => {
      // Trigger a page refresh to show the new lead
      window.dispatchEvent(new Event('storage'));
      window.location.href = '/leads-all';
    }} />, 
    parent: "leads" 
  },
  { 
    path: "/leads-360", 
    key: "leads.360", 
    title: "Lead 360 View", 
    element: <Lead360 leadId="1" onBack={() => window.history.back()} />, 
    parent: "leads" 
  },
  { 
    path: "/leads-conversions", 
    key: "leads.conversions", 
    title: "Conversions & Win Analysis", 
    element: <Conversions />, 
    parent: "leads" 
  },
  { 
    path: "/leads-orders", 
    key: "leads.orders", 
    title: "Orders & Receipts", 
    element: <OrdersReceipts />, 
    parent: "leads" 
  },
  { 
    path: "/leads-reports", 
    key: "leads.reports", 
    title: "Leads & Sales Reports", 
    element: <LeadsReports />, 
    parent: "leads" 
  },

  // Tasks & Tickets
  { 
    path: "/tasks-my", 
    key: "tasks.my", 
    title: "My Tasks / Team Tasks", 
    element: <MyTasks />, 
    parent: "tasks" 
  },
  { 
    path: "/tasks-board", 
    key: "tasks.board", 
    title: "Task Board (Kanban)", 
    element: <TaskBoard />, 
    parent: "tasks" 
  },
  { 
    path: "/tickets-inbox", 
    key: "tickets.inbox", 
    title: "Tickets (Inbox, My Tickets)", 
    element: <TicketsInbox />, 
    parent: "tasks" 
  },
  { 
    path: "/tickets-sla", 
    key: "tickets.sla", 
    title: "SLA & Priority Management", 
    element: <SLAPriority />, 
    parent: "tasks" 
  },
  { 
    path: "/tasks-reports", 
    key: "tasks.reports", 
    title: "Tasks & Tickets Reports", 
    element: <TasksReports />, 
    parent: "tasks" 
  },

  // Campaigns & Messaging
  { 
    path: "/campaigns-all", 
    key: "campaigns.all", 
    title: "Campaigns", 
    element: <Campaigns />, 
    parent: "campaigns" 
  },
  { 
    path: "/email-journeys", 
    key: "campaigns.email", 
    title: "Email / SMS Journeys", 
    element: <EmailJourneys />, 
    parent: "campaigns" 
  },
  { 
    path: "/chat-broadcast", 
    key: "campaigns.chat", 
    title: "Chat / Broadcast", 
    element: <ChatBroadcast />, 
    parent: "campaigns" 
  },
  { 
    path: "/templates", 
    key: "campaigns.templates", 
    title: "Templates", 
    element: <Templates />, 
    parent: "campaigns" 
  },

  // Calendar
  { 
    path: "/calendar-month", 
    key: "calendar.month", 
    title: "Month / Week / Day View", 
    element: <MonthWeekDay />, 
    parent: "calendar" 
  },
  { 
    path: "/calendar-my", 
    key: "calendar.my", 
    title: "My Events", 
    element: <MyEvents />, 
    parent: "calendar" 
  },
  { 
    path: "/calendar-team", 
    key: "calendar.team", 
    title: "Team View", 
    element: <TeamView />, 
    parent: "calendar" 
  },

  // Subscribers
  { 
    path: "/subscribers-all", 
    key: "subscribers.all", 
    title: "All Subscribers (Table)", 
    element: <AllSubscribers />, 
    parent: "subscribers" 
  },
  { 
    path: "/subscribers-new", 
    key: "subscribers.new", 
    title: "Add New Subscriber", 
    element: <NewSubscriber onBack={() => window.history.back()} onSave={() => window.location.href = '/subscribers-all'} />, 
    parent: "subscribers" 
  },
  { 
    path: "/subscribers-360", 
    key: "subscribers.360", 
    title: "Subscriber 360 View", 
    element: <Subscriber360 subscriberId="1" onBack={() => window.history.back()} />, 
    parent: "subscribers" 
  },
  { 
    path: "/subscribers-reports", 
    key: "subscribers.reports", 
    title: "Subscribers Reports", 
    element: <SubscribersReports />, 
    parent: "subscribers" 
  },

  // Agents
  { 
    path: "/agents-directory", 
    key: "agents.directory", 
    title: "Agent Directory (List)", 
    element: <AgentDirectory />, 
    parent: "agents" 
  },
  { 
    path: "/agents-add", 
    key: "agents.add", 
    title: "Add New Agent", 
    element: <AddAgent onBack={() => window.history.back()} onSave={() => window.location.href = '/agents-directory'} />, 
    parent: "agents" 
  },
  { 
    path: "/agents-targets", 
    key: "agents.targets", 
    title: "Targets & Rankings", 
    element: <TargetsRanking />, 
    parent: "agents" 
  },
  { 
    path: "/agents-diary", 
    key: "agents.diary", 
    title: "Daily Diary", 
    element: <AgentDailyDiary />, 
    parent: "agents" 
  },

  // Chit Groups
  { 
    path: "/chit-overview", 
    key: "chit.overview", 
    title: "Branch Overview", 
    element: <GroupsOverview />, 
    parent: "chit" 
  },
  { 
    path: "/chit-create", 
    key: "chit.create", 
    title: "Create / Allocate Groups", 
    element: <CreateAllocateGroups onBack={() => window.history.back()} onSave={() => window.location.href = '/chit-list'} />, 
    parent: "chit" 
  },
  { 
    path: "/chit-list", 
    key: "chit.list", 
    title: "List of Groups", 
    element: <ListOfGroups />, 
    parent: "chit" 
  },
  { 
    path: "/chit-360", 
    key: "chit.360", 
    title: "Group 360 View", 
    element: <Group360 groupId="1" onBack={() => window.history.back()} />, 
    parent: "chit" 
  },
  { 
    path: "/chit-reports", 
    key: "chit.reports", 
    title: "Chit Groups Reports", 
    element: <ChitReports />, 
    parent: "chit" 
  },

  // Employees (HRMS)
  { 
    path: "/hrms-directory", 
    key: "hrms.directory", 
    title: "Employee Directory", 
    element: <EmployeeDirectory />, 
    parent: "hrms" 
  },
  { 
    path: "/hrms-new-employee", 
    key: "hrms.new", 
    title: "Add New Employee", 
    element: <NewEmployee onBack={() => window.history.back()} onSave={() => window.location.href = '/hrms-directory'} />, 
    parent: "hrms" 
  },
  { 
    path: "/hrms-employee-360", 
    key: "hrms.360", 
    title: "Employee 360", 
    element: <Employee360 employeeId="1" onBack={() => window.history.back()} />, 
    parent: "hrms" 
  },
  { 
    path: "/hrms-attendance", 
    key: "hrms.attendance", 
    title: "Attendance Logs & Approvals", 
    element: <AttendanceLogs />, 
    parent: "hrms" 
  },
  { 
    path: "/hrms-payroll", 
    key: "hrms.payroll", 
    title: "Payroll Runs & Payslips", 
    element: <PayrollRuns />, 
    parent: "hrms" 
  },
  { 
    path: "/hrms-reports", 
    key: "hrms.reports", 
    title: "HRMS Reports", 
    element: <HRMSReports />, 
    parent: "hrms" 
  },

  // Reports Hub
  { 
    path: "/reports-dashboard", 
    key: "reports.dashboard", 
    title: "Reports Dashboard", 
    element: <ReportsDashboard />, 
    parent: "reports" 
  },
  { 
    path: "/reports-my", 
    key: "reports.my", 
    title: "My Reports / Shared Reports", 
    element: <MyReports />, 
    parent: "reports" 
  },
  { 
    path: "/reports-scheduled", 
    key: "reports.scheduled", 
    title: "Scheduled Reports", 
    element: <ScheduledReports />, 
    parent: "reports" 
  },
  { 
    path: "/reports-uploads", 
    key: "reports.uploads", 
    title: "Uploads & Import Center", 
    element: <UploadsImport />, 
    parent: "reports" 
  },

  // Company & Settings
  { 
    path: "/company-profile-branding", 
    key: "settings.profile", 
    title: "Company Profile & Branding", 
    element: <CompanyProfile />, 
    parent: "settings" 
  },
  { 
    path: "/branches", 
    key: "settings.branches", 
    title: "Branch Network", 
    element: <Branches />, 
    parent: "settings" 
  },
  { 
    path: "/departments", 
    key: "settings.departments", 
    title: "Department Structure", 
    element: <Departments />, 
    parent: "settings" 
  },
  { 
    path: "/roles-permissions", 
    key: "settings.roles", 
    title: "Roles & Permissions", 
    element: <RolesPermissions />, 
    parent: "settings" 
  },
  { 
    path: "/settings/users", 
    key: "settings.users", 
    title: "Users", 
    element: <UsersComponent />, 
    parent: "settings" 
  },
  { 
    path: "/users", 
    key: "settings.users", 
    title: "User Management", 
    element: <UsersComponent />, 
    parent: "settings" 
  },
  { 
    path: "/users/add", 
    key: "settings.users.add", 
    title: "Add New User", 
    element: <AddUserComponent onBack={() => window.history.back()} onSave={() => window.location.href = '/users'} />, 
    parent: "settings" 
  },
  { 
    path: "/products", 
    key: "settings.products", 
    title: "Products (Chit Schemes)", 
    element: <Products />, 
    parent: "settings" 
  },
  { 
    path: "/templates-dms", 
    key: "settings.templates", 
    title: "Templates & DMS", 
    element: <TemplatesDMS />, 
    parent: "settings" 
  },
  { 
    path: "/audit-logs", 
    key: "settings.audit", 
    title: "Audit Logs & Error Log", 
    element: <AuditLogs />, 
    parent: "settings" 
  },

  // Legacy Routes (for backward compatibility)
  { 
    path: "/members", 
    key: "legacy.members", 
    title: "Members", 
    element: <LegacyMembers />, 
    parent: "legacy" 
  },
  { 
    path: "/schemes", 
    key: "legacy.schemes", 
    title: "Schemes", 
    element: <LegacySchemes />, 
    parent: "legacy" 
  },
  { 
    path: "/payments", 
    key: "legacy.payments", 
    title: "Payments", 
    element: <LegacyPayments />, 
    parent: "legacy" 
  },

  // Customization
  { 
    path: "/custom-theme", 
    key: "custom.theme", 
    title: "Theme Customization", 
    element: <PlaceholderPage title="Theme Customization" description="Customize colors, typography, and visual design elements." />, 
    parent: "custom" 
  },
  { 
    path: "/custom-sidebar", 
    key: "custom.sidebar", 
    title: "Navigation Settings", 
    element: <PlaceholderPage title="Navigation Settings" description="Customize sidebar layout, order, and visibility options." />, 
    parent: "custom" 
  },
  { 
    path: "/custom-modules", 
    key: "custom.modules", 
    title: "Module Configuration", 
    element: <PlaceholderPage title="Module Configuration" description="Enable/disable features and configure module-specific settings." />, 
    parent: "custom" 
  },
  { 
    path: "/custom-forms", 
    key: "custom.forms", 
    title: "Form Customization", 
    element: <PlaceholderPage title="Form Customization" description="Customize form fields, validation, and conditional logic." />, 
    parent: "custom" 
  }
];

// Route lookup helpers
export const getRouteByPath = (path: string): AppRoute | undefined => {
  return routes.find(route => route.path === path);
};

export const getRouteByKey = (key: string): AppRoute | undefined => {
  return routes.find(route => route.key === key);
};

// Route audit function for development
export const auditRoutes = () => {
  console.group('🔍 Route Audit');
  
  const missingRoutes: string[] = [];
  const validRoutes: string[] = [];
  
  routes.forEach(route => {
    try {
      if (route.element) {
        validRoutes.push(`✅ ${route.path} → ${route.title}`);
      } else {
        missingRoutes.push(`❌ ${route.path} → Missing component`);
      }
    } catch (error) {
      missingRoutes.push(`⚠️ ${route.path} → Component error: ${error}`);
    }
  });

  console.log('Valid Routes:', validRoutes.length);
  validRoutes.forEach(route => console.log(route));
  
  if (missingRoutes.length > 0) {
    console.log('\nMissing/Error Routes:', missingRoutes.length);
    missingRoutes.forEach(route => console.log(route));
  }
  
  console.groupEnd();
  
  return {
    total: routes.length,
    valid: validRoutes.length,
    missing: missingRoutes.length,
    missingRoutes
  };
};