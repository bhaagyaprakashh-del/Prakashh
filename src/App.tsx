import React, { useState, useEffect } from 'react';
import { Routes, Route, useLocation, Navigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { AuthProvider } from './contexts/AuthContext';
import { ProtectedRoute } from './components/Auth/ProtectedRoute';
import { LoginPage } from './components/Auth/LoginPage';
import { LogoutPage } from './components/Auth/LogoutPage';
import { MainLayout } from './components/Layout/MainLayout';
import { routes, auditRoutes } from './config/routes.tsx';
import { initializeSampleData } from './utils/storage';

// Not Found Redirect Component
const NotFoundRedirect: React.FC = () => {
  const location = useLocation();
  
  useEffect(() => {
    console.warn(`🚨 Route not found: ${location.pathname}`);
  }, [location.pathname]);
  
  return <Navigate to="/dashboard" replace />;
};

function App() {
  const location = useLocation();
  const [selectedEmployeeId, setSelectedEmployeeId] = useState<string>('');

  useEffect(() => {
    // Initialize sample data on first load
    initializeSampleData();
    
    // Run route audit in development
    if (process.env.NODE_ENV === 'development') {
      auditRoutes();
    }
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
      'custom-theme': { title: 'Theme Settings', subtitle: 'Customize appearance' },
      'custom-sidebar': { title: 'Sidebar Settings', subtitle: 'Navigation customization' },
      'custom-modules': { title: 'Module Management', subtitle: 'Feature toggles and settings' },
      'custom-forms': { title: 'Form Editor', subtitle: 'Customize forms and fields' },
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
    <AuthProvider>
      <div className="min-h-screen bg-gray-50">
        <Toaster position="top-right" />
        <Routes>
          {/* Public Routes */}
          <Route path="/login" element={<LoginPage />} />
          <Route path="/logout" element={<LogoutPage />} />
          
          {/* Protected Routes */}
          <Route path="/*" element={
            <ProtectedRoute>
              <MainLayout
                title={pageConfig.title}
                subtitle={pageConfig.subtitle}
              >
                <React.Suspense fallback={
                  <div className="flex items-center justify-center h-96">
                    <div className="text-center">
                      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-400 mx-auto mb-4"></div>
                      <p className="text-slate-400">Loading...</p>
                    </div>
                  </div>
                }>
                  <Routes>
                    {/* Root redirect */}
                    <Route path="/" element={<Navigate to="/dashboard" replace />} />
                    
                    {/* Dynamic routes from registry */}
                    {routes.map(route => (
                      <Route 
                        key={route.key} 
                        path={route.path} 
                        element={route.element} 
                      />
                    ))}
                    
                    {/* Catch all route */}
                    <Route path="*" element={<NotFoundRedirect />} />
                  </Routes>
                </React.Suspense>
              </MainLayout>
            </ProtectedRoute>
          } />
        </Routes>
      </div>
    </AuthProvider>
  );
}

export default App;