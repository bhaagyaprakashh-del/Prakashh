import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { ProtectedRoute } from '../components/ProtectedRoute';
import { LoginPage } from '../pages/LoginPage';
import { LogoutPage } from '../pages/LogoutPage';
import { UserSettingsPage } from '../pages/UserSettingsPage';
import { AuctionsPage } from '../components/Auctions/AuctionsPage';
import { UsersPage } from '../components/Users/UsersPage';
import { KanbanBoard } from '../components/Kanban/KanbanBoard';
import { NotificationsPage } from '../modules/notifications/NotificationsPage';

// Dashboard Components (placeholders)
const AdminDashboard = () => <div className="p-6"><h1 className="text-2xl font-bold">Admin Dashboard</h1></div>;
const EmployeeDashboard = () => <div className="p-6"><h1 className="text-2xl font-bold">Employee Dashboard</h1></div>;
const AgentDashboard = () => <div className="p-6"><h1 className="text-2xl font-bold">Agent Dashboard</h1></div>;
const SubscriberDashboard = () => <div className="p-6"><h1 className="text-2xl font-bold">Subscriber Dashboard</h1></div>;

// Leads Components
const LeadsList = () => <div className="p-6"><h1 className="text-2xl font-bold">Leads List</h1></div>;
const Lead360 = () => <div className="p-6"><h1 className="text-2xl font-bold">Lead 360 View</h1></div>;
const NewLead = () => <div className="p-6"><h1 className="text-2xl font-bold">New Lead</h1></div>;
const ImportLeads = () => <div className="p-6"><h1 className="text-2xl font-bold">Import Leads</h1></div>;

// Tasks Components
const TaskBoard = () => <div className="p-6"><h1 className="text-2xl font-bold">Task Board</h1></div>;
const TasksList = () => <div className="p-6"><h1 className="text-2xl font-bold">Tasks List</h1></div>;
const TaskCalendar = () => <div className="p-6"><h1 className="text-2xl font-bold">Task Calendar</h1></div>;
const TicketsList = () => <div className="p-6"><h1 className="text-2xl font-bold">Support Tickets</h1></div>;
const NewTicket = () => <div className="p-6"><h1 className="text-2xl font-bold">New Ticket</h1></div>;

// Messaging Components
const Campaigns = () => <div className="p-6"><h1 className="text-2xl font-bold">Campaigns</h1></div>;
const Broadcasts = () => <div className="p-6"><h1 className="text-2xl font-bold">Broadcasts</h1></div>;
const Templates = () => <div className="p-6"><h1 className="text-2xl font-bold">Message Templates</h1></div>;
const MessageAnalytics = () => <div className="p-6"><h1 className="text-2xl font-bold">Message Analytics</h1></div>;

// Calendar Components
const CalendarMonth = () => <div className="p-6"><h1 className="text-2xl font-bold">Calendar</h1></div>;
const EventsList = () => <div className="p-6"><h1 className="text-2xl font-bold">Events</h1></div>;
const NewEvent = () => <div className="p-6"><h1 className="text-2xl font-bold">New Event</h1></div>;

// Subscribers Components
const SubscribersList = () => <div className="p-6"><h1 className="text-2xl font-bold">Subscribers</h1></div>;
const Subscriber360 = () => <div className="p-6"><h1 className="text-2xl font-bold">Subscriber 360</h1></div>;
const NewSubscriber = () => <div className="p-6"><h1 className="text-2xl font-bold">New Subscriber</h1></div>;
const Payments = () => <div className="p-6"><h1 className="text-2xl font-bold">Payments</h1></div>;
const Collections = () => <div className="p-6"><h1 className="text-2xl font-bold">Collections</h1></div>;

// Agents Components
const AgentsList = () => <div className="p-6"><h1 className="text-2xl font-bold">Agents</h1></div>;
const Agent360 = () => <div className="p-6"><h1 className="text-2xl font-bold">Agent 360</h1></div>;
const AgentPerformance = () => <div className="p-6"><h1 className="text-2xl font-bold">Performance</h1></div>;
const AgentTargets = () => <div className="p-6"><h1 className="text-2xl font-bold">Targets</h1></div>;
const AgentDiary = () => <div className="p-6"><h1 className="text-2xl font-bold">Agent Diary</h1></div>;

// Chit Groups Components
const ChitGroupsList = () => <div className="p-6"><h1 className="text-2xl font-bold">Chit Groups</h1></div>;
const ChitGroup360 = () => <div className="p-6"><h1 className="text-2xl font-bold">Chit Group 360</h1></div>;
const ChitCollections = () => <div className="p-6"><h1 className="text-2xl font-bold">Chit Collections</h1></div>;

// HRMS Components
const EmployeeDirectory = () => <div className="p-6"><h1 className="text-2xl font-bold">Employee Directory</h1></div>;
const Attendance = () => <div className="p-6"><h1 className="text-2xl font-bold">Attendance</h1></div>;
const Payroll = () => <div className="p-6"><h1 className="text-2xl font-bold">Payroll</h1></div>;
const LeaveManagement = () => <div className="p-6"><h1 className="text-2xl font-bold">Leave Management</h1></div>;

// Reports Components
const ReportsDashboard = () => <div className="p-6"><h1 className="text-2xl font-bold">Reports Dashboard</h1></div>;
const ReportBuilder = () => <div className="p-6"><h1 className="text-2xl font-bold">Report Builder</h1></div>;
const ScheduledReports = () => <div className="p-6"><h1 className="text-2xl font-bold">Scheduled Reports</h1></div>;

// Settings Components
const CompanySettings = () => <div className="p-6"><h1 className="text-2xl font-bold">Company Settings</h1></div>;
const UserManagement = () => <div className="p-6"><h1 className="text-2xl font-bold">User Management</h1></div>;
const RolesPermissions = () => <div className="p-6"><h1 className="text-2xl font-bold">Roles & Permissions</h1></div>;
const BranchManagement = () => <div className="p-6"><h1 className="text-2xl font-bold">Branch Management</h1></div>;

// Customization Components
const ThemeSettings = () => <div className="p-6"><h1 className="text-2xl font-bold">Theme Settings</h1></div>;
const SidebarSettings = () => <div className="p-6"><h1 className="text-2xl font-bold">Sidebar Settings</h1></div>;
const ModuleSettings = () => <div className="p-6"><h1 className="text-2xl font-bold">Module Settings</h1></div>;

export const AppRoutes: React.FC = () => {
  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/login" element={<LoginPage />} />
      <Route path="/logout" element={<LogoutPage />} />
      
      {/* Protected Routes */}
      <Route path="/" element={<ProtectedRoute><Navigate to="/auctions" replace /></ProtectedRoute>} />
      
      {/* Dashboard Routes */}
      <Route path="/dash/admin" element={<ProtectedRoute><AdminDashboard /></ProtectedRoute>} />
      <Route path="/dash/employee" element={<ProtectedRoute><EmployeeDashboard /></ProtectedRoute>} />
      <Route path="/dash/agent" element={<ProtectedRoute><AgentDashboard /></ProtectedRoute>} />
      <Route path="/dash/subscriber" element={<ProtectedRoute><SubscriberDashboard /></ProtectedRoute>} />
      
      {/* Existing Routes */}
      <Route path="/auctions" element={<ProtectedRoute><AuctionsPage /></ProtectedRoute>} />
      <Route path="/users" element={<ProtectedRoute><UsersPage /></ProtectedRoute>} />
      <Route path="/leads/kanban" element={<ProtectedRoute><KanbanBoard /></ProtectedRoute>} />
      <Route path="/notifications" element={<ProtectedRoute><NotificationsPage /></ProtectedRoute>} />
      <Route path="/settings" element={<ProtectedRoute><UserSettingsPage /></ProtectedRoute>} />
      
      {/* Leads & Sales Routes */}
      <Route path="/leads/list" element={<ProtectedRoute><LeadsList /></ProtectedRoute>} />
      <Route path="/leads/360/:id" element={<ProtectedRoute><Lead360 /></ProtectedRoute>} />
      <Route path="/leads/new" element={<ProtectedRoute><NewLead /></ProtectedRoute>} />
      <Route path="/leads/import" element={<ProtectedRoute><ImportLeads /></ProtectedRoute>} />
      
      {/* Tasks & Tickets Routes */}
      <Route path="/tasks/board" element={<ProtectedRoute><TaskBoard /></ProtectedRoute>} />
      <Route path="/tasks/list" element={<ProtectedRoute><TasksList /></ProtectedRoute>} />
      <Route path="/tasks/calendar" element={<ProtectedRoute><TaskCalendar /></ProtectedRoute>} />
      <Route path="/tickets/list" element={<ProtectedRoute><TicketsList /></ProtectedRoute>} />
      <Route path="/tickets/new" element={<ProtectedRoute><NewTicket /></ProtectedRoute>} />
      
      {/* Messaging Routes */}
      <Route path="/messaging/campaigns" element={<ProtectedRoute><Campaigns /></ProtectedRoute>} />
      <Route path="/messaging/broadcasts" element={<ProtectedRoute><Broadcasts /></ProtectedRoute>} />
      <Route path="/messaging/templates" element={<ProtectedRoute><Templates /></ProtectedRoute>} />
      <Route path="/messaging/analytics" element={<ProtectedRoute><MessageAnalytics /></ProtectedRoute>} />
      
      {/* Calendar Routes */}
      <Route path="/calendar/month" element={<ProtectedRoute><CalendarMonth /></ProtectedRoute>} />
      <Route path="/calendar/events" element={<ProtectedRoute><EventsList /></ProtectedRoute>} />
      <Route path="/calendar/new-event" element={<ProtectedRoute><NewEvent /></ProtectedRoute>} />
      
      {/* Subscribers Routes */}
      <Route path="/subscribers/list" element={<ProtectedRoute><SubscribersList /></ProtectedRoute>} />
      <Route path="/subscribers/360/:id" element={<ProtectedRoute><Subscriber360 /></ProtectedRoute>} />
      <Route path="/subscribers/new" element={<ProtectedRoute><NewSubscriber /></ProtectedRoute>} />
      <Route path="/subscribers/payments" element={<ProtectedRoute><Payments /></ProtectedRoute>} />
      <Route path="/subscribers/collections" element={<ProtectedRoute><Collections /></ProtectedRoute>} />
      
      {/* Agents Routes */}
      <Route path="/agents/list" element={<ProtectedRoute><AgentsList /></ProtectedRoute>} />
      <Route path="/agents/360/:id" element={<ProtectedRoute><Agent360 /></ProtectedRoute>} />
      <Route path="/agents/performance" element={<ProtectedRoute><AgentPerformance /></ProtectedRoute>} />
      <Route path="/agents/targets" element={<ProtectedRoute><AgentTargets /></ProtectedRoute>} />
      <Route path="/agents/diary" element={<ProtectedRoute><AgentDiary /></ProtectedRoute>} />
      
      {/* Chit Groups Routes */}
      <Route path="/chit/list" element={<ProtectedRoute><ChitGroupsList /></ProtectedRoute>} />
      <Route path="/chit/360/:id" element={<ProtectedRoute><ChitGroup360 /></ProtectedRoute>} />
      <Route path="/chit/auctions" element={<ProtectedRoute><AuctionsPage /></ProtectedRoute>} />
      <Route path="/chit/collections" element={<ProtectedRoute><ChitCollections /></ProtectedRoute>} />
      
      {/* HRMS Routes */}
      <Route path="/hrms/directory" element={<ProtectedRoute><EmployeeDirectory /></ProtectedRoute>} />
      <Route path="/hrms/attendance" element={<ProtectedRoute><Attendance /></ProtectedRoute>} />
      <Route path="/hrms/payroll" element={<ProtectedRoute><Payroll /></ProtectedRoute>} />
      <Route path="/hrms/leaves" element={<ProtectedRoute><LeaveManagement /></ProtectedRoute>} />
      
      {/* Reports Routes */}
      <Route path="/reports/dashboard" element={<ProtectedRoute><ReportsDashboard /></ProtectedRoute>} />
      <Route path="/reports/builder" element={<ProtectedRoute><ReportBuilder /></ProtectedRoute>} />
      <Route path="/reports/scheduled" element={<ProtectedRoute><ScheduledReports /></ProtectedRoute>} />
      
      {/* Settings Routes */}
      <Route path="/settings/company" element={<ProtectedRoute><CompanySettings /></ProtectedRoute>} />
      <Route path="/settings/users" element={<ProtectedRoute><UserManagement /></ProtectedRoute>} />
      <Route path="/settings/roles" element={<ProtectedRoute><RolesPermissions /></ProtectedRoute>} />
      <Route path="/settings/branches" element={<ProtectedRoute><BranchManagement /></ProtectedRoute>} />
      
      {/* Customization Routes */}
      <Route path="/customize/theme" element={<ProtectedRoute><ThemeSettings /></ProtectedRoute>} />
      <Route path="/customize/sidebar" element={<ProtectedRoute><SidebarSettings /></ProtectedRoute>} />
      <Route path="/customize/modules" element={<ProtectedRoute><ModuleSettings /></ProtectedRoute>} />
      
      {/* Fallback */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};