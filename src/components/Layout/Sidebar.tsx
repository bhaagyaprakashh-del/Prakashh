import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Search, ChevronRight } from 'lucide-react';
import { NavigationItem, navigation } from '../../config/navigation';
import { ActionButton } from '../UI/ActionButton';
import { useActions } from '../../hooks/useActions';
import { useAuth } from '../../hooks/useAuth';
import { useAppConfig } from '../../hooks/useAppConfig';

interface SidebarProps {
  isCollapsed: boolean;
  onToggleCollapsed: () => void;
}

interface FlyoutPanelProps {
  item: NavigationItem;
  isOpen: boolean;
  onClose: () => void;
  position: { top: number; left: number };
}

const FlyoutPanel: React.FC<FlyoutPanelProps> = ({ item, isOpen, onClose, position }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { navigateTo } = useActions();

  if (!isOpen || !item.children) return null;

  const handleSubPageClick = (subPageId: string) => {
    navigateTo(`/${subPageId}`);
    onClose();
  };

  const currentPath = location.pathname.slice(1);

  return (
    <>
      {/* Backdrop */}
      <div className="fixed inset-0 z-40" onClick={onClose} />
      
      {/* Flyout Panel */}
      <div 
        className="fixed z-50 w-80 bg-slate-800/80 backdrop-blur-xl border border-yellow-400/40 rounded-2xl shadow-2xl overflow-hidden"
        style={{
          top: position.top,
          left: position.left,
          maxHeight: 'calc(100vh - 100px)'
        }}
      >
        {/* Header */}
        <div className="p-4 border-b border-yellow-400/30">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-blue-500/20 rounded-lg border border-yellow-400/30">
              <item.icon className="h-5 w-5 text-blue-400" />
            </div>
            <div>
              <h3 className="text-slate-50 font-semibold">{item.name}</h3>
              <p className="text-slate-400 text-sm">{item.children.length} pages available</p>
            </div>
          </div>
        </div>

        {/* Sub-pages */}
        <div className="p-2 max-h-96 overflow-y-auto scrollbar-none">
          {item.children.map((subPage) => {
            const SubIcon = subPage.icon;
            const isActive = currentPath === subPage.id;
            
            return (
              <ActionButton
                key={subPage.id}
                action="navigate"
                target={`/${subPage.id}`}
                onClick={() => handleSubPageClick(subPage.id)}
                variant="secondary"
                className={`w-full flex items-center space-x-3 p-3 rounded-xl transition-all group border ${
                  isActive 
                    ? 'bg-transparent text-blue-400 border-yellow-400/70' 
                    : 'bg-transparent text-slate-300 hover:text-slate-50 border-yellow-400/30 hover:border-yellow-400/50'
                }`}
              >
                <div className={`p-2 rounded-lg transition-all ${
                  isActive 
                    ? 'bg-transparent border border-yellow-400/50' 
                    : 'bg-transparent border border-yellow-400/30 group-hover:border-yellow-400/40'
                }`}>
                  <SubIcon className={`h-4 w-4 ${isActive ? 'text-blue-400' : 'text-slate-400 group-hover:text-slate-300'}`} />
                </div>
                <div className="flex-1 text-left">
                  <p className="font-medium">{subPage.name}</p>
                </div>
                <ChevronRight className={`h-4 w-4 transition-all ${
                  isActive ? 'text-blue-400' : 'text-slate-500 group-hover:text-slate-300'
                }`} />
              </ActionButton>
            );
          })}
        </div>
      </div>
    </>
  );
};

const SidebarItem: React.FC<{
  item: NavigationItem;
  isCollapsed: boolean;
  onOpenFlyout: (item: NavigationItem, position: { top: number; left: number }) => void;
}> = ({ item, isCollapsed, onOpenFlyout }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { navigateTo } = useActions();
  
  const Icon = item.icon;
  const currentPath = location.pathname.slice(1);
  const isActive = currentPath === item.id || (item.children && item.children.some(child => currentPath === child.id));

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    if (item.children && item.children.length > 0) {
      // Open flyout for modules with children
      const rect = event.currentTarget.getBoundingClientRect();
      const position = {
        top: rect.top,
        left: rect.right + 8
      };
      onOpenFlyout(item, position);
    } else {
      // Direct navigation for modules without children
      navigateTo(`/${item.id}`);
    }
  };

  const itemClasses = `
    group flex items-center w-full text-left ${isCollapsed ? 'px-2 py-3 justify-center' : 'px-4 py-3'} text-sm font-medium rounded-xl transition-all duration-200 mb-2 border border-yellow-400
    ${isActive 
      ? 'bg-transparent text-blue-400 backdrop-blur-sm shadow-lg' 
      : 'bg-transparent text-slate-300 hover:text-slate-50 hover:border-yellow-300 backdrop-blur-sm'
    }
  `;

  const iconClasses = `
    flex-shrink-0 h-5 w-5 transition-colors duration-200 ${isCollapsed ? '' : 'mr-3'}
    ${isActive ? 'text-blue-400' : 'text-slate-500 group-hover:text-slate-300'}
  `;

  return (
    <ActionButton
      action={item.children ? "open-flyout" : "navigate"}
      target={item.children ? undefined : `/${item.id}`}
      onClick={handleClick}
      className={`${itemClasses} border-0`}
      variant="secondary"
      title={isCollapsed ? item.name : undefined}
    >
      <Icon className={iconClasses} />
      {!isCollapsed && (
        <>
          <span className="flex-1 truncate text-left">{item.name}</span>
          {item.children && item.children.length > 0 && (
            <ChevronRight className={`h-4 w-4 transition-colors ${
              isActive ? 'text-blue-400' : 'text-slate-500 group-hover:text-slate-300'
            }`} />
          )}
        </>
      )}
    </ActionButton>
  );
};

export const Sidebar: React.FC<SidebarProps> = ({
  isCollapsed,
  onToggleCollapsed
}) => {
  const { authState } = useAuth();
  const { config } = useAppConfig();
  const [searchTerm, setSearchTerm] = useState('');
  const [flyoutItem, setFlyoutItem] = useState<NavigationItem | null>(null);
  const [flyoutPosition, setFlyoutPosition] = useState({ top: 0, left: 0 });

  const handleOpenFlyout = (item: NavigationItem, position: { top: number; left: number }) => {
    setFlyoutItem(item);
    setFlyoutPosition(position);
  };

  const handleCloseFlyout = () => {
    setFlyoutItem(null);
  };

  // Filter navigation based on user role and visibility settings
  const filteredNavigation = navigation.filter(item => {
    // Hide customization module for non-admin users
    if (item.id === 'customization' && authState.user?.role !== 'admin') {
      return false;
    }
    
    // Apply search filter
    const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase());
    
    // Apply visibility settings from config
    const isVisible = config.sidebar?.items?.find(sidebarItem => sidebarItem.id === item.id)?.visible !== false;
    
    return matchesSearch && isVisible;
  });

  // Apply custom order from config
  const orderedNavigation = config.sidebar?.order 
    ? config.sidebar.order
        .map(id => filteredNavigation.find(item => item.id === id))
        .filter(Boolean)
        .concat(filteredNavigation.filter(item => !config.sidebar.order.includes(item.id)))
    : filteredNavigation;

  // Get user info for profile section
  const user = authState.user;
  const userInitials = user ? `${user.firstName.charAt(0)}${user.lastName.charAt(0)}` : 'U';
  const userName = user ? `${user.firstName} ${user.lastName}` : 'User';
  const userRole = user?.role || 'user';

  // Get company branding
  const companyName = config.company?.companyName || 'Ramnirmalchits CRM';
  const brandName = config.company?.brandName || 'Ramnirmalchits';
  const companyLogo = config.company?.logoSidebar;

  return (
    <>
      <div className={`bg-slate-900 border-r border-yellow-400/30 transition-all duration-300 flex flex-col h-full ${
        isCollapsed ? 'w-16' : 'w-64'
      } scrollbar-thin scrollbar-track-transparent scrollbar-thumb-yellow-400/20 hover:scrollbar-thumb-yellow-400/40 scrollbar-thumb-rounded-full overflow-y-auto`}>
        {/* Header */}
        <div className="p-4 border-b border-yellow-400/30 flex-shrink-0">
          <div className="flex items-center">
            {companyLogo ? (
              <img 
                src={companyLogo} 
                alt={brandName}
                className={`transition-all duration-300 ${
                  isCollapsed ? 'h-8 w-8' : 'h-10 w-10'
                }`}
              />
            ) : (
              <div className={`bg-gradient-to-br from-blue-500 to-blue-700 rounded-lg flex items-center justify-center border border-yellow-400/40 transition-all duration-300 ${
                isCollapsed ? 'h-8 w-8' : 'h-10 w-10'
              }`}>
                <span className={`text-white font-bold ${isCollapsed ? 'text-sm' : 'text-lg'}`}>
                  R
                </span>
              </div>
            )}
            {!isCollapsed && (
              <div className="ml-3">
                <h1 className="text-lg font-bold text-slate-50">{brandName}</h1>
                <p className="text-xs text-slate-400">CRM System</p>
              </div>
            )}
          </div>
        </div>

        {/* User Profile */}
        {!isCollapsed && (
          <div className="p-4 border-b border-yellow-400/30 flex-shrink-0">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-700 rounded-full flex items-center justify-center border border-yellow-400/40">
                <span className="text-white font-semibold text-sm">{userInitials}</span>
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-slate-50 truncate">{userName}</p>
                <p className="text-xs text-slate-400 capitalize">{userRole}</p>
              </div>
            </div>
          </div>
        )}

        {/* Search */}
        {!isCollapsed && (
          <div className="p-4 flex-shrink-0">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-400" />
              <input
                type="text"
                placeholder="Search modules..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 bg-slate-800/50 border border-yellow-400/30 rounded-lg text-slate-50 placeholder-slate-400 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
              />
            </div>
          </div>
        )}

        {/* Navigation */}
        <nav className="flex-1 p-4 space-y-2 overflow-y-auto scrollbar-thin scrollbar-track-transparent scrollbar-thumb-yellow-400/20 hover:scrollbar-thumb-yellow-400/40 scrollbar-thumb-rounded-full">
          {orderedNavigation.map((item) => (
            <NavigationItemComponent
              key={item.id}
              item={item}
              isCollapsed={isCollapsed}
              isActive={isActive}
              onItemClick={handleItemClick}
              onItemHover={handleItemHover}
              onItemLeave={handleItemLeave}
            />
          ))}
        </nav>
      </div>

      {/* Flyout Menu */}
      {flyoutItem && isCollapsed && (
        <div
          className="fixed bg-slate-800 border border-yellow-400/30 rounded-lg shadow-xl z-50 min-w-48 backdrop-blur-xl"
          style={{
            top: flyoutPosition.top,
            left: flyoutPosition.left,
          }}
          onMouseEnter={() => setFlyoutItem(flyoutItem)}
          onMouseLeave={handleCloseFlyout}
        >
          <div className="p-2">
            <div className="px-3 py-2 text-sm font-medium text-slate-50 border-b border-yellow-400/20 mb-2">
              {flyoutItem.name}
            </div>
            {flyoutItem.children?.map((child) => (
              <button
                key={child.id}
                onClick={() => handleItemClick(child)}
                className={`w-full text-left px-3 py-2 text-sm rounded-lg transition-all flex items-center ${
                  isActive(child.id)
                    ? 'bg-blue-500/20 text-blue-400 border border-blue-500/30'
                    : 'text-slate-300 hover:text-slate-50 hover:bg-slate-700/50'
                }`}
              >
                <child.icon className="h-4 w-4 mr-3 flex-shrink-0" />
                {child.name}
              </button>
            ))}
          </div>
        </div>
      )}
    </>
  );
};

// Navigation Item Component
interface NavigationItemProps {
  item: NavigationItem;
  isCollapsed: boolean;
  isActive: (id: string) => boolean;
  onItemClick: (item: NavigationItem) => void;
  onItemHover: (item: NavigationItem, event: React.MouseEvent) => void;
  onItemLeave: () => void;
}

const NavigationItemComponent: React.FC<NavigationItemProps> = ({
  item,
  isCollapsed,
  isActive,
  onItemClick,
  onItemHover,
  onItemLeave
}) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const hasChildren = item.children && item.children.length > 0;
  const isItemActive = isActive(item.id) || (hasChildren && item.children.some(child => isActive(child.id)));

  const handleClick = () => {
    if (hasChildren && !isCollapsed) {
      setIsExpanded(!isExpanded);
    } else {
      onItemClick(item);
    }
  };

  return (
    <div>
      <button
        onClick={handleClick}
        onMouseEnter={(e) => isCollapsed && hasChildren && onItemHover(item, e)}
        onMouseLeave={onItemLeave}
        className={`w-full flex items-center px-3 py-3 text-sm font-medium rounded-xl transition-all border ${
          isItemActive
            ? 'bg-blue-500/20 text-blue-400 border-blue-500/30'
            : 'text-slate-300 hover:text-slate-50 hover:bg-slate-700/50 border-yellow-400'
        } ${isCollapsed ? 'justify-center' : 'justify-between'}`}
      >
        <div className="flex items-center">
          <item.icon className={`flex-shrink-0 ${isCollapsed ? 'h-5 w-5' : 'h-5 w-5 mr-3'}`} />
          {!isCollapsed && <span className="truncate">{item.name}</span>}
        </div>
        {!isCollapsed && hasChildren && (
          <ChevronRight 
            className={`h-4 w-4 transition-transform ${isExpanded ? 'rotate-90' : ''}`} 
          />
        )}
      </button>

      {/* Expanded Children */}
      {!isCollapsed && hasChildren && isExpanded && (
        <div className="ml-4 mt-2 space-y-1 border-l border-yellow-400/30 pl-4">
          {item.children.map((child) => (
            <button
              key={child.id}
              onClick={() => onItemClick(child)}
              className={`w-full flex items-center px-3 py-2 text-sm rounded-lg transition-all border ${
                isActive(child.id)
                  ? 'bg-blue-500/20 text-blue-400 border-blue-500/30'
                  : 'text-slate-400 hover:text-slate-50 hover:bg-slate-700/50 border-yellow-400'
              }`}
            >
              <child.icon className="h-4 w-4 mr-3 flex-shrink-0" />
              <span className="truncate">{child.name}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

  return (
    <>
      <div className={`${isCollapsed ? 'w-16' : 'w-80'} bg-slate-900/95 border-r border-yellow-400/30 flex flex-col h-full shadow-xl backdrop-blur-xl transition-all duration-300`}>
        {/* User Profile Section */}
        <div className={`${isCollapsed ? 'p-3' : 'p-6'} border-b border-yellow-400/30 transition-all duration-300`}>
          <div className={`flex items-center ${isCollapsed ? 'justify-center' : 'space-x-3'} mb-4`}>
            <div className="h-12 w-12 bg-gradient-to-br from-blue-500 to-blue-700 rounded-full flex items-center justify-center border border-yellow-400/40 shadow-lg">
              <span className="text-slate-50 text-lg font-semibold">P</span>
            </div>
            {!isCollapsed && (
              <div className="transition-opacity duration-300">
                <h3 className="text-slate-50 font-semibold">Prakashh</h3>
                <div className="flex items-center space-x-2">
                  <div className="h-2 w-2 bg-emerald-400 rounded-full shadow-sm"></div>
                  <span className="text-emerald-400 text-sm">Online</span>
                </div>
              </div>
            )}
          </div>

          {/* Search */}
          {!isCollapsed && (
            <div className="relative transition-opacity duration-300">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-500 h-4 w-4" />
              <input
                type="text"
                placeholder="Search modules..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-12 py-2.5 bg-slate-800/60 border border-yellow-400/30 rounded-lg text-sm text-slate-50 placeholder-slate-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 w-full transition-all backdrop-blur-sm"
              />
              <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                <kbd className="px-2 py-1 text-xs font-semibold text-slate-300 bg-slate-700/60 border border-yellow-400/30 rounded shadow-sm backdrop-blur-sm">
                  ⌘K
                </kbd>
              </div>
            </div>
          )}
        </div>

        {/* Navigation */}
        <nav className={`flex-1 ${isCollapsed ? 'p-2' : 'p-4'} space-y-2 overflow-y-auto transition-all duration-300 scrollbar-thin scrollbar-track-transparent scrollbar-thumb-yellow-400/20 hover:scrollbar-thumb-yellow-400/40`}>
          {filteredNavigation.map((item) => (
            <SidebarItem
              key={item.id}
              item={item}
              isCollapsed={isCollapsed}
              onOpenFlyout={handleOpenFlyout}
            />
          ))}
        </nav>

        {/* Footer */}
        {!isCollapsed && (
          <div className="p-4 border-t border-yellow-400/30 transition-opacity duration-300">
            <div className="text-center text-slate-400 text-xs">
              <p>Ramnirmalchits ERP & CRM</p>
              <p className="text-slate-500">v2.0.0 - Build 2024.1</p>
            </div>
          </div>
        )}
      </div>

      {/* Flyout Panel */}
      <FlyoutPanel
        item={flyoutItem!}
        isOpen={!!flyoutItem}
        onClose={handleCloseFlyout}
        position={flyoutPosition}
      />
    </>
  );
};