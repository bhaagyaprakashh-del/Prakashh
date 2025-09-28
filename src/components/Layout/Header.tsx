import React, { useState, useEffect, useRef, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, Bell, User, Menu, Upload, LogOut, ChevronDown, Clock, X, CheckCircle, AlertTriangle, Info, Settings, HelpCircle } from 'lucide-react';
import { navigation } from '../../config/navigation';
import { useAuth } from '../../contexts/AuthContext';

interface HeaderProps {
  title: string;
  subtitle?: string;
  onToggleSidebar: () => void;
}

interface ProfileDropdownProps {
  isOpen: boolean;
  onClose: () => void;
}

interface SearchDropdownProps {
  isOpen: boolean;
  searchTerm: string;
  onClose: () => void;
  onNavigate: (pageId: string) => void;
}

interface NotificationDropdownProps {
  isOpen: boolean;
  onClose: () => void;
}

interface Notification {
  id: string;
  title: string;
  message: string;
  type: 'info' | 'success' | 'warning' | 'error';
  timestamp: string;
  read: boolean;
  actionUrl?: string;
}

const sampleNotifications: Notification[] = [
  {
    id: '1',
    title: 'Payment Received',
    message: 'Payment of ₹50,000 received from Premium Gold A1 group',
    type: 'success',
    timestamp: '2024-03-15T14:30:00',
    read: false,
    actionUrl: '/chit-list'
  },
  {
    id: '2',
    title: 'Auction Reminder',
    message: 'Premium Gold A1 auction scheduled for tomorrow at 2 PM',
    type: 'info',
    timestamp: '2024-03-15T10:15:00',
    read: false,
    actionUrl: '/chit-360'
  },
  {
    id: '3',
    title: 'KYC Verification Required',
    message: '5 subscribers pending KYC verification',
    type: 'warning',
    timestamp: '2024-03-15T09:00:00',
    read: true,
    actionUrl: '/subscribers-all'
  }
];

const NotificationDropdown: React.FC<NotificationDropdownProps> = ({ isOpen, onClose }) => {
  const navigate = useNavigate();
  const [notifications, setNotifications] = useState<Notification[]>(sampleNotifications);

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case 'success': return CheckCircle;
      case 'warning': return AlertTriangle;
      case 'error': return AlertTriangle;
      default: return Info;
    }
  };

  const getNotificationColor = (type: string) => {
    switch (type) {
      case 'success': return 'text-green-400';
      case 'warning': return 'text-yellow-400';
      case 'error': return 'text-red-400';
      default: return 'text-blue-400';
    }
  };

  const handleNotificationClick = (notification: Notification) => {
    if (notification.actionUrl) {
      navigate(notification.actionUrl);
    }
    // Mark as read
    setNotifications(prev => 
      prev.map(n => n.id === notification.id ? { ...n, read: true } : n)
    );
    onClose();
  };

  const markAllAsRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, read: true })));
  };

  const unreadCount = notifications.filter(n => !n.read).length;

  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div className="fixed inset-0 z-40" onClick={onClose} />
      
      {/* Dropdown */}
      <div className="absolute right-0 top-full mt-2 w-96 bg-slate-800/90 backdrop-blur-xl border border-yellow-400/40 rounded-2xl shadow-2xl z-50 overflow-hidden">
        {/* Header */}
        <div className="p-4 border-b border-yellow-400/30">
          <div className="flex items-center justify-between">
            <h3 className="text-slate-50 font-semibold">Notifications</h3>
            <div className="flex items-center space-x-2">
              {unreadCount > 0 && (
                <button
                  onClick={markAllAsRead}
                  className="text-xs text-blue-400 hover:text-blue-300"
                >
                  Mark all read
                </button>
              )}
              <button
                onClick={onClose}
                className="p-1 text-slate-400 hover:text-slate-50 rounded"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Notifications List */}
        <div className="max-h-96 overflow-y-auto">
          {notifications.length > 0 ? (
            notifications.map((notification) => {
              const Icon = getNotificationIcon(notification.type);
              return (
                <button
                  key={notification.id}
                  onClick={() => handleNotificationClick(notification)}
                  className={`w-full p-4 text-left hover:bg-slate-700/50 transition-all border-b border-yellow-400/20 last:border-b-0 ${
                    !notification.read ? 'bg-blue-500/5' : ''
                  }`}
                >
                  <div className="flex items-start space-x-3">
                    <Icon className={`h-5 w-5 mt-0.5 ${getNotificationColor(notification.type)}`} />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between mb-1">
                        <p className={`text-sm font-medium ${notification.read ? 'text-slate-300' : 'text-slate-50'}`}>
                          {notification.title}
                        </p>
                        {!notification.read && (
                          <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                        )}
                      </div>
                      <p className="text-sm text-slate-400 line-clamp-2">
                        {notification.message}
                      </p>
                      <p className="text-xs text-slate-500 mt-1">
                        {new Date(notification.timestamp).toLocaleString()}
                      </p>
                    </div>
                  </div>
                </button>
              );
            })
          ) : (
            <div className="p-6 text-center">
              <Bell className="h-8 w-8 mx-auto text-slate-500 mb-2" />
              <p className="text-slate-400 text-sm">No notifications</p>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

const ProfileDropdown: React.FC<ProfileDropdownProps> = ({ isOpen, onClose }) => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [avatar, setAvatar] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleAvatarUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setAvatar(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleLogout = () => {
    navigate('/logout');
    onClose();
  };

  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div className="fixed inset-0 z-40" onClick={onClose} />
      
      {/* Dropdown */}
      <div className="absolute right-0 top-full mt-2 w-80 bg-slate-800/90 backdrop-blur-xl border border-yellow-400/40 rounded-2xl shadow-2xl z-50 overflow-hidden">
        {/* Profile Header */}
        <div className="p-6 border-b border-yellow-400/30">
          <div className="flex items-center space-x-4">
            <div className="relative">
              {avatar ? (
                <img
                  src={avatar}
                  alt="Profile"
                  className="h-16 w-16 rounded-full object-cover border-2 border-yellow-400/40"
                />
              ) : (
                <div className="h-16 w-16 bg-gradient-to-br from-blue-500 to-blue-700 rounded-full flex items-center justify-center border-2 border-yellow-400/40">
                  <span className="text-slate-50 text-xl font-semibold">P</span>
                </div>
              )}
              <button
                onClick={() => fileInputRef.current?.click()}
                className="absolute -bottom-1 -right-1 p-1.5 bg-blue-600 hover:bg-blue-700 rounded-full border-2 border-slate-800 transition-colors"
              >
                <Upload className="h-3 w-3 text-white" />
              </button>
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleAvatarUpload}
                className="hidden"
              />
            </div>
            <div>
              <h3 className="text-slate-50 font-semibold text-lg">{user?.name || 'User'}</h3>
              <p className="text-slate-300 text-sm">{user?.role || 'Role'}</p>
              <p className="text-slate-400 text-xs">{user?.email || 'email@example.com'}</p>
            </div>
          </div>
        </div>

        {/* Menu Items */}
        <div className="p-2">
          <button className="w-full flex items-center space-x-3 p-3 text-slate-300 hover:text-slate-50 hover:bg-slate-700/50 rounded-xl transition-all">
            <User className="h-5 w-5" />
            <span>My Profile</span>
          </button>
          <button className="w-full flex items-center space-x-3 p-3 text-slate-300 hover:text-slate-50 hover:bg-slate-700/50 rounded-xl transition-all">
            <Settings className="h-5 w-5" />
            <span>Account Settings</span>
          </button>
          <button className="w-full flex items-center space-x-3 p-3 text-slate-300 hover:text-slate-50 hover:bg-slate-700/50 rounded-xl transition-all">
            <Bell className="h-5 w-5" />
            <span>Notifications</span>
          </button>
          <button className="w-full flex items-center space-x-3 p-3 text-slate-300 hover:text-slate-50 hover:bg-slate-700/50 rounded-xl transition-all">
            <HelpCircle className="h-5 w-5" />
            <span>Help & Support</span>
          </button>
          
          <div className="border-t border-yellow-400/30 my-2"></div>
          
          <button
            onClick={handleLogout}
            className="w-full flex items-center space-x-3 p-3 text-red-300 hover:text-red-200 hover:bg-red-500/10 rounded-xl transition-all"
          >
            <LogOut className="h-5 w-5" />
            <span>Sign Out</span>
          </button>
        </div>
      </div>
    </>
  );
};

const SearchDropdown: React.FC<SearchDropdownProps> = ({ isOpen, searchTerm, onClose, onNavigate }) => {
  // Get main module pages for display
  const mainModulePages = useMemo(() => {
    const popularPages = [
      { id: 'dashboard', name: 'Dashboard', icon: navigation[0].icon, module: 'Overview' },
      { id: 'leads-all', name: 'All Leads', icon: navigation[1].children?.[0].icon, module: 'Leads & Sales' },
      { id: 'leads-kanban', name: 'Leads Pipeline', icon: navigation[1].children?.[1].icon, module: 'Leads & Sales' },
      { id: 'tasks-my', name: 'My Tasks', icon: navigation[2].children?.[0].icon, module: 'Tasks & Tickets' },
      { id: 'chit-list', name: 'Chit Groups', icon: navigation[7].children?.[2].icon, module: 'Chit Operations' },
      { id: 'subscribers-all', name: 'All Subscribers', icon: navigation[5].children?.[0].icon, module: 'Subscribers' },
      { id: 'agents-directory', name: 'Agent Directory', icon: navigation[6].children?.[0].icon, module: 'Agents' },
      { id: 'hrms-directory', name: 'Employee Directory', icon: navigation[8].children?.[0].icon, module: 'HRMS' },
      { id: 'reports-dashboard', name: 'Reports Dashboard', icon: navigation[9].children?.[0].icon, module: 'Reports' },
      { id: 'company-profile-branding', name: 'Company Profile', icon: navigation[10].children?.[0].icon, module: 'Settings' }
    ];
    return popularPages;
  }, []);

  const filteredItems = useMemo(() => {
    if (!searchTerm.trim()) {
      return mainModulePages;
    }

    return navigation.flatMap(module => {
      const moduleMatches = module.name.toLowerCase().includes(searchTerm.toLowerCase());
      const childMatches = module.children?.filter(child => 
        child.name.toLowerCase().includes(searchTerm.toLowerCase())
      ) || [];

      const results = [];
      
      if (moduleMatches) {
        results.push({
          id: module.id,
          name: module.name,
          type: 'module',
          icon: module.icon,
          path: module.children ? null : module.id,
          module: module.name
        });
      }

      childMatches.forEach(child => {
        results.push({
          id: child.id,
          name: child.name,
          type: 'page',
          icon: child.icon,
          path: child.id,
          parent: module.name,
          module: module.name
        });
      });

      return results;
    });
  }, [searchTerm, mainModulePages]);

  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div className="fixed inset-0 z-40" onClick={onClose} />
      
      {/* Dropdown */}
      <div className="absolute left-0 right-0 top-full mt-2 bg-slate-800/90 backdrop-blur-xl border border-yellow-400/40 rounded-2xl shadow-2xl z-50 max-h-96 overflow-hidden">
        <div className="p-4 border-b border-yellow-400/30">
          <h3 className="text-slate-50 font-medium text-sm">
            {searchTerm.trim() ? `Search Results (${filteredItems.length})` : 'Popular Pages'}
          </h3>
        </div>
        
        {filteredItems.length > 0 ? (
          <div className="p-2 max-h-80 overflow-y-auto">
            {filteredItems.map((item) => {
              const Icon = item.icon;
              return (
                <div
                  key={item.id}
                  className="flex items-center justify-between p-3 text-slate-300 hover:bg-slate-700/50 rounded-xl transition-all group"
                >
                  <div className="flex items-center space-x-3 flex-1">
                    <div className="p-2 bg-slate-700/50 rounded-lg group-hover:bg-slate-600/50 transition-all">
                      <Icon className="h-5 w-5 text-blue-400" />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-medium text-slate-50">{item.name}</p>
                      <p className="text-xs text-slate-400">{item.module}</p>
                    </div>
                  </div>
                  {item.path && (
                    <button
                      onClick={() => {
                        onNavigate(item.path!);
                        onClose();
                      }}
                      className="px-3 py-1 bg-blue-600 hover:bg-blue-700 text-white text-xs font-medium rounded-lg transition-all opacity-0 group-hover:opacity-100"
                    >
                      GO
                    </button>
                  )}
                </div>
              );
            })}
          </div>
        ) : (
          <div className="p-6 text-center">
            <Search className="h-8 w-8 mx-auto text-slate-500 mb-2" />
            <p className="text-slate-400 text-sm">
              {searchTerm.trim() ? `No results found for "${searchTerm}"` : 'Start typing to search...'}
            </p>
          </div>
        )}
      </div>
    </>
  );
};

export const Header: React.FC<HeaderProps> = ({ title, subtitle, onToggleSidebar }) => {
  const navigate = useNavigate();
  const [currentTime, setCurrentTime] = useState(new Date());
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isNotificationOpen, setIsNotificationOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  // Update time every second
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  // Handle keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if ((event.metaKey || event.ctrlKey) && event.key === 'k') {
        event.preventDefault();
        setIsSearchOpen(!isSearchOpen);
        setSearchTerm('');
      }
      if (event.key === 'Escape') {
        setIsSearchOpen(false);
        setIsProfileOpen(false);
        setIsNotificationOpen(false);
        setSearchTerm('');
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, []);

  const formatDateTime = (date: Date) => {
    const options: Intl.DateTimeFormatOptions = {
      weekday: 'short',
      day: 'numeric',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      timeZone: 'Asia/Kolkata',
      timeZoneName: 'short'
    };
    
    return date.toLocaleString('en-IN', options);
  };

  const handleSearchChange = (value: string) => {
    setSearchTerm(value);
    setIsSearchOpen(true);
  };

  const handleNavigate = (pageId: string) => {
    // Handle navigation with proper route resolution
    if (pageId.startsWith('/')) {
      navigate(pageId);
    } else {
      navigate(`/${pageId}`);
    }
    setIsSearchOpen(false);
    setSearchTerm('');
  };

  return (
    <header className="bg-slate-900/95 border-b border-yellow-400/30 sticky top-0 z-50 shadow-sm backdrop-blur-xl">
      <div className="flex items-center justify-between px-4 py-3">
        {/* Left Section - Logo and Navigation */}
        <div className="flex items-center space-x-4">
          {/* Hamburger Menu Button */}
          <button
            onClick={onToggleSidebar}
            className="p-2 text-slate-300 hover:text-slate-50 hover:bg-slate-700/50 rounded-lg transition-all"
          >
            <Menu className="h-5 w-5" />
          </button>
          
          {/* Logo */}
          <div className="flex items-center space-x-2">
            <div className="w-7 h-7 bg-gradient-to-br from-blue-500 to-blue-700 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">R</span>
            </div>
            <span className="text-slate-50 font-semibold">Ramnirmalchits CRM</span>
          </div>
        </div>

        {/* Center Section - Search */}
        <div className="flex-1 max-w-md mx-4 relative">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-500 h-4 w-4" />
            <input
              type="text"
              placeholder="Search modules..."
              value={searchTerm}
              onChange={(e) => handleSearchChange(e.target.value)}
              onFocus={() => setIsSearchOpen(true)}
              className="w-full pl-10 pr-4 py-2 bg-slate-800/50 border border-slate-600 rounded-lg text-sm text-slate-50 placeholder-slate-400 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
            />
          </div>
          
          {/* Search Dropdown */}
          <SearchDropdown
            isOpen={isSearchOpen}
            searchTerm={searchTerm}
            onClose={() => setIsSearchOpen(false)}
            onNavigate={handleNavigate}
          />
        </div>

        {/* Right Section - Actions and User */}
        <div className="flex items-center space-x-3">
          {/* Notifications */}
          <div className="relative">
            <button
              onClick={() => setIsNotificationOpen(!isNotificationOpen)}
              className="relative p-2 text-slate-300 hover:text-slate-50 hover:bg-slate-700/50 rounded-lg transition-all"
            >
            <Bell className="h-5 w-5" />
              <span className="absolute -top-1 -right-1 h-4 w-4 bg-red-500 text-white text-xs rounded-full flex items-center justify-center font-medium">
              3
            </span>
            </button>
            
            {/* Notification Dropdown */}
            <NotificationDropdown
              isOpen={isNotificationOpen}
              onClose={() => setIsNotificationOpen(false)}
            />
          </div>

          {/* Current Time */}
          <div className="text-slate-300 text-sm hidden lg:flex items-center space-x-2 bg-slate-800/50 px-3 py-2 rounded-lg">
            <Clock className="h-4 w-4" />
            <span>{formatDateTime(currentTime)}</span>
          </div>

          {/* User Profile */}
          <div className="relative">
            <button
              onClick={() => setIsProfileOpen(!isProfileOpen)}
              className="flex items-center space-x-2 p-2 text-slate-300 hover:text-slate-50 hover:bg-slate-700/50 rounded-lg transition-all"
            >
              <div className="h-8 w-8 bg-gradient-to-br from-blue-500 to-blue-700 rounded-full flex items-center justify-center">
                <span className="text-slate-50 text-sm font-semibold">P</span>
              </div>
              <ChevronDown className={`h-4 w-4 transition-transform ${isProfileOpen ? 'rotate-180' : ''}`} />
            </button>
            
            {/* Profile Dropdown */}
            <ProfileDropdown
              isOpen={isProfileOpen}
              onClose={() => setIsProfileOpen(false)}
            />
          </div>
        </div>
      </div>
    </header>
  );
};