import React, { ReactNode } from 'react';
import { Sidebar } from './Sidebar';
import { Header } from './Header';

interface MainLayoutProps {
  children: ReactNode;
  currentPage: string;
  onPageChange: (page: string) => void;
  title: string;
  subtitle?: string;
}

export const MainLayout: React.FC<MainLayoutProps> = ({
  children,
  currentPage,
  onPageChange,
  title,
  subtitle
}) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-800 flex flex-col">
      {/* Header */}
      <Header title={title} subtitle={subtitle} />
      
      {/* Content Area */}
      <div className="flex flex-1">
        {/* Sidebar */}
        <Sidebar
          currentPage={currentPage}
          onPageChange={onPageChange}
          isCollapsed={false}
          onToggleCollapsed={() => {}}
        />

        {/* Main Content */}
        <div className="flex-1 flex flex-col overflow-hidden">
          <main className="flex-1 overflow-auto">
            <div className="h-full">
              {children}
            </div>
          </main>
        </div>
      </div>
    </div>
  );
};