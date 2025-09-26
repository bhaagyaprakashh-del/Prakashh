import React from 'react';
import { Search, Bell, Grid3X3, Settings, HelpCircle, User } from 'lucide-react';

interface HeaderProps {
  title: string;
  subtitle?: string;
}

export const Header: React.FC<HeaderProps> = ({ title, subtitle }) => {
  return (
    <header className="bg-slate-900 border-b border-yellow-400/30 sticky top-0 z-50 shadow-sm backdrop-blur-xl">
      <div className="flex items-center justify-between px-6 py-3">
        {/* Left Section - Logo and Navigation */}
        <div className="flex items-center space-x-6">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-blue-700 rounded-lg flex items-center justify-center border border-yellow-400/30">
              <span className="text-slate-50 font-bold text-sm">R</span>
            </div>
            <div>
              <h1 className="text-slate-50 font-semibold text-lg">Ramnirmalchits ERP & CRM</h1>
              <p className="text-slate-300 text-xs">v2.0.0</p>
            </div>
          </div>
          
          <div className="h-6 w-px bg-yellow-400/30"></div>
          
          <nav className="flex items-center space-x-1">
            <span className="text-slate-300 text-sm">Home</span>
            <span className="text-slate-500 mx-2">/</span>
            <span className="text-slate-50 text-sm font-medium">{title}</span>
          </nav>
        </div>

        {/* Center Section - Search */}
        <div className="flex-1 max-w-2xl mx-8">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-500 h-4 w-4" />
            <input
              type="text"
              placeholder="Search modules... (Ctrl/⌘+K)"
              className="w-full pl-10 pr-16 py-2.5 bg-slate-800/50 border border-yellow-400/30 rounded-lg text-sm text-slate-50 placeholder-slate-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all backdrop-blur-sm"
            />
            <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
              <kbd className="px-2 py-1 text-xs font-semibold text-slate-300 bg-slate-700/50 border border-yellow-400/30 rounded shadow-sm backdrop-blur-sm">
                ⌘K
              </kbd>
            </div>
          </div>
        </div>

        {/* Right Section - Actions and User */}
        <div className="flex items-center space-x-3">
          {/* Action Buttons */}
          <button className="p-2 text-slate-300 hover:text-slate-50 hover:bg-slate-700/50 rounded-lg transition-all border border-yellow-400/20 hover:border-yellow-400/40">
            <Grid3X3 className="h-5 w-5" />
          </button>
          
          <button className="p-2 text-slate-300 hover:text-slate-50 hover:bg-slate-700/50 rounded-lg transition-all border border-yellow-400/20 hover:border-yellow-400/40">
            <Settings className="h-5 w-5" />
          </button>
          
          <button className="p-2 text-slate-300 hover:text-slate-50 hover:bg-slate-700/50 rounded-lg transition-all border border-yellow-400/20 hover:border-yellow-400/40">
            <HelpCircle className="h-5 w-5" />
          </button>

          {/* Notifications */}
          <button className="relative p-2 text-slate-300 hover:text-slate-50 hover:bg-slate-700/50 rounded-lg transition-all border border-yellow-400/20 hover:border-yellow-400/40">
            <Bell className="h-5 w-5" />
            <span className="absolute -top-1 -right-1 h-5 w-5 bg-red-500 text-slate-50 text-xs rounded-full flex items-center justify-center font-medium border border-yellow-400/30">
              1
            </span>
          </button>

          {/* Divider */}
          <div className="h-6 w-px bg-yellow-400/30"></div>

          {/* Current Time */}
          <div className="text-slate-300 text-sm font-medium hidden lg:block">
            Thu, 11 Sept, 2025, 14:08:55 IST
          </div>

          {/* User Profile */}
          <div className="flex items-center space-x-3">
            <div className="h-9 w-9 bg-gradient-to-br from-blue-500 to-blue-700 rounded-full flex items-center justify-center border border-yellow-400/30">
              <span className="text-slate-50 text-sm font-semibold">P</span>
            </div>
            <div className="text-left hidden lg:block">
              <p className="text-slate-50 text-sm font-medium">Prakashh</p>
              <p className="text-slate-300 text-xs">Administrator</p>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};