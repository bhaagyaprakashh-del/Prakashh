import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './auth/AuthContext';
import { ProtectedRoute } from './components/ProtectedRoute';
import { LoginPage } from './pages/LoginPage';
import { LogoutPage } from './pages/LogoutPage';
import { UserSettingsPage } from './pages/UserSettingsPage';
import { AuctionsPage } from './components/Auctions/AuctionsPage';
import { UsersPage } from './components/Users/UsersPage';
import { KanbanBoard } from './components/Kanban/KanbanBoard';
import { AppHeader } from './components/Header/AppHeader';
import { AppSidebar } from './components/Sidebar/AppSidebar';
import './styles/scrollbar.css';

const MainLayout: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<string>('auctions');

  const renderPage = () => {
    switch (currentPage) {
      case 'auctions':
        return <AuctionsPage />;
      case 'users':
        return <UsersPage />;
      case 'leads-kanban':
        return <KanbanBoard />;
      default:
        return <AuctionsPage />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex">
      {/* Sidebar */}
      <AppSidebar currentPage={currentPage} onPageChange={setCurrentPage} />
      
      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <header className="bg-white shadow-sm border-b h-16 flex items-center justify-between px-6">
          <div>
            <h1 className="text-xl font-bold text-gray-900">RMC System</h1>
          </div>
          <AppHeader />
        </header>
        
        {/* Page Content */}
        <main className="flex-1 overflow-auto">
          {renderPage()}
        </main>
      </div>
    </div>
  );
};

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          {/* Public Routes */}
          <Route path="/login" element={<LoginPage />} />
          <Route path="/logout" element={<LogoutPage />} />
          
          {/* Protected Routes */}
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <MainLayout />
              </ProtectedRoute>
            }
          />
          <Route
            path="/settings"
            element={
              <ProtectedRoute>
                <UserSettingsPage />
              </ProtectedRoute>
            }
          />
          
          {/* Redirect unknown routes to home */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;