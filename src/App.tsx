import React, { useState, useEffect } from 'react';
import { Routes, Route, useLocation, Navigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { MainLayout } from './components/Layout/MainLayout';
import { DashboardHome } from './components/Dashboard/DashboardHome';
import { LeadsKanban } from './components/CRM/LeadsKanban';
import { GroupsOverview } from './components/ChitFund/GroupsOverview';
import { CompanyProfile } from './components/Company/CompanyProfile';
import { Branches } from './components/Company/Branches';
import { Departments } from './components/Company/Departments';
import { RolesPermissions } from './components/Company/RolesPermissions';
import { Users } from './components/Company/Users';
import { Products } from './components/Company/Products';
import { TemplatesDMS } from './components/Company/TemplatesDMS';
import { AuditLogs } from './components/Company/AuditLogs';
import { Campaigns } from './components/Campaigns/Campaigns';
import { EmailJourneys } from './components/Campaigns/EmailJourneys';
import { ChatBroadcast } from './components/Campaigns/ChatBroadcast';
import { Templates } from './components/Campaigns/Templates';
import { EmployeeDirectory } from './components/HRMS/EmployeeDirectory';
import { NewEmployee } from './components/HRMS/NewEmployee';
import { Employee360 } from './components/HRMS/Employee360';
import { AttendanceLogs } from './components/HRMS/AttendanceLogs';
import { PayrollRuns } from './components/HRMS/PayrollRuns';
import { HRMSReports } from './components/HRMS/HRMSReports';
import { AllLeads } from './components/CRM/AllLeads';
import { NewLead } from './components/CRM/NewLead';
import { Lead360 } from './components/CRM/Lead360';
import { Conversions } from './components/CRM/Conversions';
import { OrdersReceipts } from './components/CRM/OrdersReceipts';
import { LeadsReports } from './components/CRM/LeadsReports';
import { ListOfGroups } from './components/ChitFund/ListOfGroups';
import { Group360 } from './components/ChitFund/Group360';
import { Members } from './components/Members';
import { Schemes } from './components/Schemes';
import { Payments } from './components/Payments';
import { MyTasks } from './components/Tasks/MyTasks';
import { TaskBoard } from './components/Tasks/TaskBoard';
import { TicketsInbox } from './components/Tasks/TicketsInbox';
import { SLAPriority } from './components/Tasks/SLAPriority';
import { TasksReports } from './components/Tasks/TasksReports';
import { AgentDirectory } from './components/Agents/AgentDirectory';
import { AddAgent } from './components/Agents/AddAgent';
import { TargetsRanking } from './components/Agents/TargetsRanking';
import AgentDailyDiary from './components/Agents/DailyDiary';
import { ReportsDashboard } from './components/Reports/ReportsDashboard';
import { MyReports } from './components/Reports/MyReports';
import { ScheduledReports } from './components/Reports/ScheduledReports';
import { UploadsImport } from './components/Reports/UploadsImport';
import { AllSubscribers } from './components/Subscribers/AllSubscribers';
import { NewSubscriber } from './components/Subscribers/NewSubscriber';
import { Subscriber360 } from './components/Subscribers/Subscriber360';
import { SubscribersReports } from './components/Subscribers/SubscribersReports';
import { CreateAllocateGroups } from './components/ChitFund/CreateAllocateGroups';
import { ChitReports } from './components/ChitFund/ChitReports';
import { MonthWeekDay } from './components/Calendar/MonthWeekDay';
import { MyEvents } from './components/Calendar/MyEvents';
import { TeamView } from './components/Calendar/TeamView';
import { initializeSampleData } from './utils/storage';

// Placeholder components for other pages
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

function App() {
  const location = useLocation();
  const [selectedEmployeeId, setSelectedEmployeeId] = useState<string>('');

  useEffect(() => {
    // Initialize sample data on first load
    initializeSampleData();
  }, []);

  const getPageTitle = (path: string) => {
    const page = path.slice(1) || 'dashboard'; // Remove leading slash, default to dashboard
    const titles: Record<string, { title: string; subtitle?: string }> = {
      'dashboard': { title: 'Dashboard', subtitle: 'Overview of your business performance' },
      'leads': { title: 'Leads', subtitle: 'Manage your sales pipeline' },
      'leads-all': { title: 'All Leads (Table)', subtitle: 'Comprehensive lead management with advanced filtering' },
      'leads-kanban': { title: 'Leads Pipeline (Kanban)', subtitle: 'Visual pipeline management with drag-and-drop' },
      'leads-new': { title: 'Add New Lead', subtitle: 'Capture new lead information and assign to sales team' },
      'leads-360': { title: 'Lead 360 View', subtitle: 'Complete lead profile with activity timeline and communications' },
      'leads-conversions': { title: 'Conversions & Win Analysis', subtitle: 'Track successful conversions and sales performance' },
      'leads-orders': { title: 'Orders & Receipts', subtitle: 'Manage customer orders and payment receipts' },
      'leads-reports': { title: 'Leads & Sales Reports', subtitle: 'Comprehensive sales analytics and performance reporting' },
      'tasks-my': { title: 'My Tasks / Team Tasks', subtitle: 'Manage personal and team task assignments with collaboration tools' },
      'tasks-board': { title: 'Task Board (Kanban)', subtitle: 'Visual task management with drag-and-drop workflow' },
      'tickets-inbox': { title: 'Tickets (Inbox, My Tickets)', subtitle: 'Customer support ticket management with SLA tracking' },
      'tickets-sla': { title: 'SLA & Priority Management', subtitle: 'Manage service level agreements, priority rules, and escalation policies' },
      'tasks-reports': { title: 'Tasks & Tickets Reports', subtitle: 'Comprehensive analytics for task management and customer support' },
      'calendar': { title: 'Calendar', subtitle: 'Schedule and events' },
      'customers': { title: 'Customers', subtitle: 'Customer relationship management' },
      'agents': { title: 'Agents', subtitle: 'Sales team management' },
      'sales': { title: 'Sales', subtitle: 'Revenue and sales analytics' },
      'chit-groups': { title: 'Chit Groups', subtitle: 'Manage chit fund groups' },
      'chit-overview': { title: 'Branch Overview', subtitle: 'Monitor chit group operations across all branches with real-time metrics' },
      'chit-create': { title: 'Create / Allocate Groups', subtitle: 'Create new chit groups and allocate tickets to subscribers' },
      'chit-list': { title: 'List of Groups', subtitle: 'Comprehensive list of all chit fund groups with detailed management' },
      'chit-360': { title: 'Group 360 View', subtitle: 'Complete group profile with members, auctions, and financial tracking' },
      'chit-reports': { title: 'Chit Groups Reports', subtitle: 'Comprehensive analytics and reporting for chit fund operations' },
      'auctions': { title: 'Auctions', subtitle: 'Auction management and settlements' },
      'collections': { title: 'Collections', subtitle: 'Payment collections and receipts' },
      'surety': { title: 'Surety Management', subtitle: 'Guarantor and surety tracking' },
      'employees': { title: 'Employees', subtitle: 'Human resource management' },
      'attendance': { title: 'Attendance', subtitle: 'Employee attendance tracking' },
      'payroll': { title: 'Payroll', subtitle: 'Salary and payroll management' },
      'projects': { title: 'Projects', subtitle: 'Work and project management' },
      'email-journeys': { title: 'Email Marketing', subtitle: 'Email campaigns and journeys' },
      'chat': { title: 'Chat', subtitle: 'Customer communication' },
      'reports-hub': { title: 'Reports Hub', subtitle: 'Business intelligence and analytics' },
      'report-builder': { title: 'Report Builder', subtitle: 'Custom report creation' },
      'uploads': { title: 'Data Uploads', subtitle: 'Import and data management' },
      'integrations-hub': { title: 'Integrations', subtitle: 'Third-party integrations' },
      'bank': { title: 'Bank Import', subtitle: 'Bank CSV import and reconciliation' },
      'company-management': { title: 'Company Profile', subtitle: 'Company settings and branding' },
      'company-profile': { title: 'Company Profile & Branding', subtitle: 'Manage company information and visual identity' },
      'branches': { title: 'Branch Network', subtitle: 'Manage multiple branches and their operational details' },
      'departments': { title: 'Department Structure', subtitle: 'Organize your company structure with departments and hierarchies' },
      'roles-permissions': { title: 'Roles & Permissions', subtitle: 'Manage user roles, permissions, and access control' },
      'users': { title: 'User Management', subtitle: 'Manage user accounts, roles, and access permissions' },
      'products': { title: 'Products (Chit Schemes)', subtitle: 'Manage chit scheme templates and configurations' },
      'templates': { title: 'Templates & DMS', subtitle: 'Document management system with templates and merge fields' },
      'audit-logs': { title: 'Audit Logs & Error Log', subtitle: 'Monitor system activities, user actions, and track errors for security and debugging' },
      'hrms-directory': { title: 'Employee Directory', subtitle: 'Comprehensive employee management with profiles and organizational structure' },
      'hrms-new-employee': { title: 'Add New Employee', subtitle: 'Create new employee profile with complete information' },
      'hrms-employee-360': { title: 'Employee 360', subtitle: 'Complete employee profile with attendance, payroll, and performance data' },
      'hrms-attendance': { title: 'Attendance Logs & Approvals', subtitle: 'QR code based attendance system with automated tracking and approval workflows' },
      'hrms-payroll': { title: 'Payroll Runs & Payslips', subtitle: 'Process payroll, generate payslips, and manage salary components' },
      'hrms-reports': { title: 'HRMS Reports', subtitle: 'Comprehensive HR analytics and reporting dashboard' },
      'agents-directory': { title: 'Agent Directory (List)', subtitle: 'Comprehensive agent management with performance tracking and territory management' },
      'agents-add': { title: 'Add New Agent', subtitle: 'Create new agent profile with territory and target assignments' },
      'agents-targets': { title: 'Targets & Rankings', subtitle: 'Track agent performance, rankings, and target achievements' },
      'agents-diary': { title: 'Daily Diary', subtitle: 'Track daily activities, visits, and performance metrics' },
      'reports-dashboard': { title: 'Reports Dashboard', subtitle: 'Central hub for all business reports, analytics, and data insights' },
      'reports-my': { title: 'My Reports / Shared Reports', subtitle: 'Manage your personal reports and access shared team reports' },
      'reports-scheduled': { title: 'Scheduled Reports', subtitle: 'Manage automated report generation and delivery schedules' },
      'reports-uploads': { title: 'Uploads & Import Center', subtitle: 'Upload, validate, and import data from various sources with automated processing' },
      'subscribers-all': { title: 'All Subscribers (Table)', subtitle: 'Comprehensive subscriber management with detailed profiles and investment tracking' },
      'subscribers-new': { title: 'Add New Subscriber', subtitle: 'Create new subscriber profile with complete KYC and membership information' },
      'subscribers-360': { title: 'Subscriber 360 View', subtitle: 'Complete subscriber profile with schemes, payments, and activity timeline' },
      'subscribers-reports': { title: 'Subscribers Reports', subtitle: 'Comprehensive subscriber analytics and performance reporting' },
      'admin': { title: 'Administration', subtitle: 'System administration' },
      'theme': { title: 'Theme Settings', subtitle: 'Customize appearance' },
      'sidebar': { title: 'Sidebar Settings', subtitle: 'Navigation customization' },
      'modules': { title: 'Module Management', subtitle: 'Feature toggles and settings' },
      'forms': { title: 'Form Editor', subtitle: 'Customize forms and fields' },
      'members': { title: 'Members', subtitle: 'Member management (Legacy)' },
      'schemes': { title: 'Schemes', subtitle: 'Scheme management (Legacy)' },
      'payments': { title: 'Payments', subtitle: 'Payment tracking (Legacy)' }
    };
    return titles[page] || { title: 'Page Not Found' };
  };

  const pageConfig = getPageTitle(location.pathname);

  // Navigation helpers for components that need programmatic navigation
  const navigateToPage = (page: string) => {
    window.location.href = `/${page}`;
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Toaster position="top-right" />
      <MainLayout
        title={pageConfig.title}
        subtitle={pageConfig.subtitle}
      >
        <Routes>
          {/* Dashboard */}
          <Route path="/" element={<Navigate to="/dashboard" replace />} />
          <Route path="/dashboard" element={<DashboardHome onPageChange={navigateToPage} />} />
          
          {/* CRM Core */}
          <Route path="/leads-all" element={<AllLeads />} />
          <Route path="/leads-kanban" element={<LeadsKanban />} />
          <Route path="/leads-new" element={<NewLead onBack={() => window.history.back()} onSave={() => navigateToPage('leads-all')} />} />
          <Route path="/leads-360" element={<Lead360 leadId="1" onBack={() => window.history.back()} />} />
          <Route path="/leads-conversions" element={<Conversions />} />
          <Route path="/leads-orders" element={<OrdersReceipts />} />
          <Route path="/leads-reports" element={<LeadsReports />} />
          
          {/* Tasks & Tickets */}
          <Route path="/tasks-my" element={<MyTasks />} />
          <Route path="/tasks-board" element={<TaskBoard />} />
          <Route path="/tickets-inbox" element={<TicketsInbox />} />
          <Route path="/tickets-sla" element={<SLAPriority />} />
          <Route path="/tasks-reports" element={<TasksReports />} />
          
          {/* Campaigns & Messaging */}
          <Route path="/campaigns-all" element={<Campaigns />} />
          <Route path="/email-journeys" element={<EmailJourneys />} />
          <Route path="/chat-broadcast" element={<ChatBroadcast />} />
          <Route path="/templates" element={<Templates />} />
          
          {/* Calendar */}
          <Route path="/calendar-month" element={<MonthWeekDay />} />
          <Route path="/calendar-my" element={<MyEvents />} />
          <Route path="/calendar-team" element={<TeamView />} />
          
          {/* Subscribers */}
          <Route path="/subscribers-all" element={<AllSubscribers />} />
          <Route path="/subscribers-new" element={<NewSubscriber onBack={() => window.history.back()} onSave={() => navigateToPage('subscribers-all')} />} />
          <Route path="/subscribers-360" element={<Subscriber360 subscriberId="1" onBack={() => window.history.back()} />} />
          <Route path="/subscribers-reports" element={<SubscribersReports />} />
          
          {/* Agents */}
          <Route path="/agents-directory" element={<AgentDirectory />} />
          <Route path="/agents-add" element={<AddAgent onBack={() => window.history.back()} onSave={() => navigateToPage('agents-directory')} />} />
          <Route path="/agents-targets" element={<TargetsRanking />} />
          <Route path="/agents-diary" element={<AgentDailyDiary />} />
          
          {/* Chit Groups */}
          <Route path="/chit-overview" element={<GroupsOverview />} />
          <Route path="/chit-create" element={<CreateAllocateGroups onBack={() => window.history.back()} onSave={() => navigateToPage('chit-list')} />} />
          <Route path="/chit-list" element={<ListOfGroups />} />
          <Route path="/chit-360" element={<Group360 groupId="1" onBack={() => window.history.back()} />} />
          <Route path="/chit-reports" element={<ChitReports />} />
          
          {/* HRMS Lite */}
          <Route path="/hrms-directory" element={<EmployeeDirectory />} />
          <Route path="/hrms-new-employee" element={<NewEmployee onBack={() => window.history.back()} onSave={() => navigateToPage('hrms-directory')} />} />
          <Route path="/hrms-employee-360" element={<Employee360 employeeId={selectedEmployeeId} onBack={() => window.history.back()} />} />
          <Route path="/hrms-attendance" element={<AttendanceLogs />} />
          <Route path="/hrms-payroll" element={<PayrollRuns />} />
          <Route path="/hrms-reports" element={<HRMSReports />} />
          
          {/* Reports Hub */}
          <Route path="/reports-dashboard" element={<ReportsDashboard />} />
          <Route path="/reports-my" element={<MyReports />} />
          <Route path="/reports-scheduled" element={<ScheduledReports />} />
          <Route path="/reports-uploads" element={<UploadsImport />} />
          
          {/* Company & Settings */}
          <Route path="/company-profile-branding" element={<CompanyProfile />} />
          <Route path="/branches" element={<Branches />} />
          <Route path="/departments" element={<Departments />} />
          <Route path="/roles-permissions" element={<RolesPermissions />} />
          <Route path="/users" element={<Users />} />
          <Route path="/products" element={<Products />} />
          <Route path="/templates" element={<TemplatesDMS />} />
          <Route path="/audit-logs" element={<AuditLogs />} />
          
          {/* Legacy Components (for backward compatibility) */}
          <Route path="/members" element={<Members />} />
          <Route path="/schemes" element={<Schemes />} />
          <Route path="/payments" element={<Payments />} />
          
          {/* Placeholder routes for future implementation */}
          <Route path="/dashboard-overview" element={<DashboardHome onPageChange={navigateToPage} />} />
          <Route path="/dashboard-kpis" element={<PlaceholderPage title="KPIs & Charts" description="Key performance indicators and business metrics visualization." />} />
          <Route path="/dashboard-today" element={<PlaceholderPage title="Today's Actions" description="Today's priority tasks, meetings, and important activities." />} />
          <Route path="/dashboard-alerts" element={<PlaceholderPage title="Alerts & Notifications" description="System alerts, notifications, and important announcements." />} />
          
          {/* Customization */}
          <Route path="/custom-theme" element={<PlaceholderPage title="Theme Customization" description="Customize colors, typography, and visual design elements." />} />
          <Route path="/custom-sidebar" element={<PlaceholderPage title="Navigation Settings" description="Customize sidebar layout, order, and visibility options." />} />
          <Route path="/custom-modules" element={<PlaceholderPage title="Module Configuration" description="Enable/disable features and configure module-specific settings." />} />
          <Route path="/custom-forms" element={<PlaceholderPage title="Form Customization" description="Customize form fields, validation, and conditional logic." />} />
          
          {/* Catch all route */}
          <Route path="*" element={<Navigate to="/dashboard" replace />} />
        </Routes>
      </MainLayout>
    </div>
  );
}

export default App;