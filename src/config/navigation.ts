import { 
  Home, BarChart3, Target, Bell, Users, Kanban, Plus, Eye, TrendingUp, FileText, 
  CheckSquare, Ticket, Clock, MessageSquare, Mail, Calendar, UserCheck, Building, 
  Award, CreditCard, DollarSign, Upload, Settings, Palette, List, Edit
} from 'lucide-react';

export interface NavigationItem {
  id: string;
  name: string;
  icon: any;
  children?: NavigationItem[];
}

export const navigation: NavigationItem[] = [
  {
    id: 'dashboard',
    name: 'Dashboard',
    icon: Home,
    children: [
      { id: 'dashboard-overview', name: 'Overview', icon: BarChart3 },
      { id: 'dashboard-kpis', name: 'KPIs & Charts', icon: Target },
      { id: 'dashboard-today', name: 'Today\'s Actions', icon: Calendar },
      { id: 'dashboard-alerts', name: 'Alerts & Notifications', icon: Bell }
    ]
  },
  {
    id: 'leads-sales',
    name: 'Leads & Sales',
    icon: Users,
    children: [
      { id: 'leads-all', name: 'All Leads (Table)', icon: List },
      { id: 'leads-kanban', name: 'Kanban View', icon: Kanban },
      { id: 'leads-new', name: 'New Lead', icon: Plus },
      { id: 'leads-360', name: 'Lead 360', icon: Eye },
      { id: 'leads-conversions', name: 'Conversions', icon: TrendingUp },
      { id: 'leads-orders', name: 'Orders & Receipts', icon: FileText },
      { id: 'leads-reports', name: 'Reports', icon: BarChart3 }
    ]
  },
  {
    id: 'tasks-tickets',
    name: 'Tasks & Tickets',
    icon: CheckSquare,
    children: [
      { id: 'tasks-my', name: 'My Tasks / Team Tasks', icon: Users },
      { id: 'tasks-board', name: 'Task Board (Status)', icon: Kanban },
      { id: 'tickets-inbox', name: 'Tickets (Inbox, My Tickets)', icon: Ticket },
      { id: 'tickets-sla', name: 'SLA / Priority', icon: Clock },
      { id: 'tasks-reports', name: 'Reports', icon: BarChart3 }
    ]
  },
  {
    id: 'campaigns-messaging',
    name: 'Campaigns & Messaging',
    icon: MessageSquare,
    children: [
      { id: 'campaigns-all', name: 'Campaigns', icon: MessageSquare },
      { id: 'campaigns-journeys', name: 'Email / SMS Journeys', icon: Mail },
      { id: 'campaigns-chat', name: 'Chat / Broadcast', icon: MessageSquare },
      { id: 'campaigns-templates', name: 'Templates', icon: FileText }
    ]
  },
  {
    id: 'calendar',
    name: 'Calendar',
    icon: Calendar,
    children: [
      { id: 'calendar-month', name: 'Month / Week / Day View', icon: Calendar },
      { id: 'calendar-my', name: 'My Events', icon: Users },
      { id: 'calendar-team', name: 'Team View', icon: Users }
    ]
  },
  {
    id: 'subscribers',
    name: 'Subscribers',
    icon: UserCheck,
    children: [
      { id: 'subscribers-all', name: 'All Subscribers (Table)', icon: List },
      { id: 'subscribers-new', name: 'New Subscriber', icon: Plus },
      { id: 'subscribers-360', name: 'Subscriber 360', icon: Eye },
      { id: 'subscribers-reports', name: 'Reports', icon: BarChart3 }
    ]
  },
  {
    id: 'agents',
    name: 'Agents',
    icon: Building,
    children: [
      { id: 'agents-directory', name: 'Directory (List)', icon: List },
      { id: 'agents-add', name: 'Add Agent', icon: Plus },
      { id: 'agents-targets', name: 'Targets & Rankings', icon: Award },
      { id: 'agents-diary', name: 'Daily Diary', icon: FileText }
    ]
  },
  {
    id: 'chit-groups',
    name: 'Chit Groups',
    icon: CreditCard,
    children: [
      { id: 'chit-overview', name: 'Branch Overview', icon: Building },
      { id: 'chit-create', name: 'Create / Allocate Groups', icon: Plus },
      { id: 'chit-list', name: 'List of Groups', icon: List },
      { id: 'chit-360', name: 'Group 360', icon: Eye },
      { id: 'chit-reports', name: 'Reports', icon: BarChart3 }
    ]
  },
  {
    id: 'employees',
    name: 'Employees (HRMS Lite)',
    icon: Users,
    children: [
      { id: 'employees-directory', name: 'Directory', icon: List },
      { id: 'employees-new', name: 'New Employee', icon: Plus },
      { id: 'employees-360', name: 'Employee 360', icon: Eye },
      { id: 'employees-attendance', name: 'Attendance Logs & Approvals', icon: CheckSquare },
      { id: 'employees-payroll', name: 'Payroll Runs & Payslips', icon: DollarSign },
      { id: 'employees-reports', name: 'Reports', icon: BarChart3 }
    ]
  },
  {
    id: 'reports-hub',
    name: 'Reports Hub',
    icon: BarChart3,
    children: [
      { id: 'reports-dashboard', name: 'Reports Dashboard', icon: BarChart3 },
      { id: 'reports-my', name: 'My Reports / Shared Reports', icon: FileText },
      { id: 'reports-scheduled', name: 'Scheduled Reports', icon: Clock },
      { id: 'reports-uploads', name: 'Uploads & Import Center', icon: Upload }
    ]
  },
  {
    id: 'company-settings',
    name: 'Company & Settings',
    icon: Settings,
    children: [
      { id: 'company-profile-branding', name: 'Company Profile & Branding', icon: Building },
      { id: 'company-branches', name: 'Branches & Departments', icon: Building },
      { id: 'company-roles', name: 'Roles & Permissions', icon: Users },
      { id: 'company-users', name: 'Users', icon: Users },
      { id: 'company-products', name: 'Products', icon: CreditCard },
      { id: 'company-templates', name: 'Templates / DMS', icon: FileText },
      { id: 'company-audit', name: 'Audit Logs & Error Log', icon: FileText }
    ]
  },
  {
    id: 'customization',
    name: 'Customization',
    icon: Palette,
    children: [
      { id: 'custom-theme', name: 'Theme (Colors, Layout)', icon: Palette },
      { id: 'custom-sidebar', name: 'Sidebar Order & Visibility', icon: List },
      { id: 'custom-modules', name: 'Module Management', icon: Settings },
      { id: 'custom-forms', name: 'Form Editor', icon: Edit }
    ]
  }
];