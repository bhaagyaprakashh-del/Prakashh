import React, { useState, useEffect } from 'react';
import { Toaster } from 'react-hot-toast';
import { MainLayout } from './components/Layout/MainLayout';
import { DashboardHome } from './components/Dashboard/DashboardHome';
import { LeadsKanban } from './components/CRM/LeadsKanban';
import { GroupsOverview } from './components/ChitFund/GroupsOverview';
import { CompanyProfile } from './components/Company/CompanyProfile';
import { Members } from './components/Members';
import { Schemes } from './components/Schemes';
import { Payments } from './components/Payments';
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
  const [currentPage, setCurrentPage] = useState('dashboard');

  useEffect(() => {
    // Initialize sample data on first load
    initializeSampleData();
  }, []);

  const getPageTitle = (page: string) => {
    const titles: Record<string, { title: string; subtitle?: string }> = {
      'dashboard': { title: 'Dashboard', subtitle: 'Overview of your business performance' },
      'leads': { title: 'Leads', subtitle: 'Manage your sales pipeline' },
      'tasks': { title: 'Tasks', subtitle: 'Track and manage tasks' },
      'tickets': { title: 'Support Tickets', subtitle: 'Customer support management' },
      'calendar': { title: 'Calendar', subtitle: 'Schedule and events' },
      'customers': { title: 'Customers', subtitle: 'Customer relationship management' },
      'agents': { title: 'Agents', subtitle: 'Sales team management' },
      'sales': { title: 'Sales', subtitle: 'Revenue and sales analytics' },
      'chit-groups': { title: 'Chit Groups', subtitle: 'Manage chit fund groups' },
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
      'branches': { title: 'Branches', subtitle: 'Branch management' },
      'departments': { title: 'Departments', subtitle: 'Department structure' },
      'users': { title: 'Users & Roles', subtitle: 'User management and permissions' },
      'templates': { title: 'Templates & DMS', subtitle: 'Document management system' },
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

  const renderPage = () => {
    switch (currentPage) {
      case 'dashboard':
        return <DashboardHome onPageChange={setCurrentPage} />;
      
      // CRM Core
      case 'leads':
        return <LeadsKanban />;
      case 'tasks':
        return <PlaceholderPage title="Task Management" description="Organize and track your team's tasks with priority-based workflows." />;
      case 'tickets':
        return <PlaceholderPage title="Support Tickets" description="Manage customer support tickets with SLA tracking and automated workflows." />;
      case 'calendar':
        return <PlaceholderPage title="Calendar" description="Schedule meetings, follow-ups, and important events across your organization." />;
      case 'customers':
        return <PlaceholderPage title="Customer Management" description="Comprehensive customer profiles with interaction history and analytics." />;
      case 'agents':
        return <PlaceholderPage title="Sales Agents" description="Manage your sales team with targets, leaderboards, and performance tracking." />;
      case 'sales':
        return <PlaceholderPage title="Sales Analytics" description="Track conversions, revenue, and sales performance metrics." />;
      
      // Chit Operations
      case 'chit-groups':
        return <GroupsOverview />;
      case 'auctions':
        return <PlaceholderPage title="Auctions & Settlements" description="Conduct live auctions and manage prize settlements." />;
      case 'collections':
        return <PlaceholderPage title="Collections" description="Track payments, generate receipts, and manage collection reports." />;
      case 'surety':
        return <PlaceholderPage title="Surety Management" description="Manage guarantors, verification, and surety documentation." />;
      
      // HRMS
      case 'employees':
        return <PlaceholderPage title="Employee Directory" description="Comprehensive employee management with profiles and organizational structure." />;
      case 'attendance':
        return <PlaceholderPage title="Attendance System" description="Track employee attendance with QR kiosk and automated reporting." />;
      case 'payroll':
        return <PlaceholderPage title="Payroll Management" description="Process payroll, generate payslips, and manage salary components." />;
      case 'projects':
        return <PlaceholderPage title="Project Management" description="Manage projects, assignments, and track time across teams." />;
      
      // Messaging
      case 'email-journeys':
        return <PlaceholderPage title="Email Marketing" description="Create automated email journeys and marketing campaigns." />;
      case 'chat':
        return <PlaceholderPage title="Chat System" description="Unified inbox for customer communication and support." />;
      
      // Reports
      case 'reports-hub':
        return <PlaceholderPage title="Reports Dashboard" description="Access all your business reports and analytics in one place." />;
      case 'report-builder':
        return <PlaceholderPage title="Custom Reports" description="Build custom reports with drag-and-drop interface." />;
      case 'uploads':
        return <PlaceholderPage title="Data Import" description="Import data from CSV files with validation and mapping tools." />;
      
      // Integrations
      case 'integrations-hub':
        return <PlaceholderPage title="Integration Center" description="Connect with third-party services and manage API integrations." />;
      case 'bank':
        return <PlaceholderPage title="Bank Integration" description="Import and reconcile bank statements automatically." />;
      
      // Company & Settings
      case 'company-management':
        return <CompanyProfile />;
      case 'company-profile-branding':
        return <CompanyProfile />;
      case 'branches':
        return <PlaceholderPage title="Branch Network" description="Manage multiple branches and their operational details." />;
      case 'departments':
        return <PlaceholderPage title="Department Structure" description="Organize your company structure with departments and hierarchies." />;
      case 'users':
        return <PlaceholderPage title="User Management" description="Manage user accounts, roles, and permissions across the system." />;
      case 'templates':
        return <PlaceholderPage title="Document Templates" description="Create and manage document templates with merge fields." />;
      case 'admin':
        return <PlaceholderPage title="System Administration" description="Monitor system health, manage backups, and view audit logs." />;
      
      // Customization
      case 'theme':
        return <PlaceholderPage title="Theme Customization" description="Customize colors, typography, and visual design elements." />;
      case 'sidebar':
        return <PlaceholderPage title="Navigation Settings" description="Customize sidebar layout, order, and visibility options." />;
      case 'modules':
        return <PlaceholderPage title="Module Configuration" description="Enable/disable features and configure module-specific settings." />;
      case 'forms':
        return <PlaceholderPage title="Form Customization" description="Customize form fields, validation, and conditional logic." />;
      
      // Legacy Components (for backward compatibility)
      case 'members':
        return <Members />;
      case 'schemes':
        return <Schemes />;
      case 'payments':
        return <Payments />;
      
      default:
        return <DashboardHome onPageChange={setCurrentPage} />;
    }
  };

  const pageConfig = getPageTitle(currentPage);

  return (
    <div className="min-h-screen bg-gray-50">
      <Toaster position="top-right" />
      <MainLayout
        currentPage={currentPage}
        onPageChange={setCurrentPage}
        title={pageConfig.title}
        subtitle={pageConfig.subtitle}
      >
        {renderPage()}
      </MainLayout>
    </div>
  );
}

export default App;