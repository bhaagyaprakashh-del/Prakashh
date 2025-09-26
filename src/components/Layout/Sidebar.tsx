import React, { useState } from 'react';
import { ChevronRight, Search, X } from 'lucide-react';
import { NavigationItem, navigation } from '../../config/navigation';

interface SidebarProps {
  currentPage: string;
  onPageChange: (page: string) => void;
  isCollapsed: boolean;
  onToggleCollapsed: () => void;
}

interface ChildPageModalProps {
  module: NavigationItem;
  onClose: () => void;
  onNavigate: (page: string) => void;
}

const ChildPageModal: React.FC<ChildPageModalProps> = ({ module, onClose, onNavigate }) => {
  const handleNavigate = (pageId: string) => {
    onNavigate(pageId);
    onClose();
  };

  const Icon = module.icon;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
      />
      
      {/* Modal */}
      <div className="relative bg-slate-800/80 backdrop-blur-xl border border-yellow-400/40 rounded-2xl shadow-2xl max-w-2xl w-full mx-4 max-h-[80vh] overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-yellow-400/30">
          <div className="flex items-center space-x-3">
            <div className="p-3 bg-slate-700/60 rounded-xl border border-yellow-400/30 backdrop-blur-sm">
              <Icon className="h-6 w-6 text-blue-400" />
            </div>
            <div>
              <h2 className="text-xl font-semibold text-slate-50">{module.name}</h2>
              <p className="text-slate-300 text-sm">Select a page to navigate</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-slate-300 hover:text-slate-50 hover:bg-slate-700/50 rounded-lg transition-all border border-yellow-400/20 hover:border-yellow-400/40 backdrop-blur-sm"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-3 max-h-96 overflow-y-auto">
          {module.children?.map((child) => {
            const ChildIcon = child.icon;
            return (
              <button
                key={child.id}
                onClick={() => handleNavigate(child.id)}
                className="w-full flex items-center justify-between p-4 bg-slate-700/40 hover:bg-slate-700/60 border border-yellow-400/20 hover:border-yellow-400/40 rounded-xl transition-all group backdrop-blur-sm"
              >
                <div className="flex items-center space-x-3">
                  <div className="p-2 bg-slate-600/50 rounded-lg group-hover:bg-slate-600/70 transition-all border border-yellow-400/20 backdrop-blur-sm">
                    <ChildIcon className="h-5 w-5 text-slate-300 group-hover:text-slate-50" />
                  </div>
                  <div className="text-left">
                    <h3 className="text-slate-50 font-medium">{child.name}</h3>
                    <p className="text-slate-300 text-sm">Navigate to {child.name.toLowerCase()}</p>
                  </div>
                </div>
                <ChevronRight className="h-5 w-5 text-slate-500 group-hover:text-slate-300 transition-all" />
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};

const SidebarItem: React.FC<{
  item: NavigationItem;
  currentPage: string;
  onPageChange: (page: string) => void;
  onOpenModal: (item: NavigationItem) => void;
}> = ({ item, currentPage, onPageChange, onOpenModal }) => {
  const Icon = item.icon;
  const hasChildren = item.children && item.children.length > 0;
  const isActive = currentPage === item.id || (item.children?.some(child => currentPage === child.id));

  const handleClick = () => {
    if (hasChildren) {
      onOpenModal(item);
    } else {
      onPageChange(item.id);
    }
  };

  const itemClasses = `
    group flex items-center w-full text-left px-4 py-3 text-sm font-medium rounded-xl transition-all duration-200 mb-2
    ${isActive 
      ? 'bg-blue-500/20 text-blue-400 border border-yellow-400/50 backdrop-blur-sm shadow-lg' 
      : 'text-slate-300 hover:bg-slate-700/50 hover:text-slate-50 border border-yellow-400/20 hover:border-yellow-400/40 backdrop-blur-sm'
    }
  `;

  const iconClasses = `
    flex-shrink-0 h-5 w-5 transition-colors duration-200 mr-3
    ${isActive ? 'text-blue-400' : 'text-slate-500 group-hover:text-slate-300'}
  `;

  return (
    <button onClick={handleClick} className={itemClasses}>
      <Icon className={iconClasses} />
      <span className="flex-1 truncate text-left">{item.name}</span>
      {hasChildren && (
        <ChevronRight className="h-4 w-4 ml-2 text-slate-500 group-hover:text-slate-300 transition-colors" />
      )}
    </button>
  );
};

export const Sidebar: React.FC<SidebarProps> = ({
  currentPage,
  onPageChange,
  isCollapsed,
  onToggleCollapsed
}) => {
  const [selectedModule, setSelectedModule] = useState<NavigationItem | null>(null);
  const [searchTerm, setSearchTerm] = useState('');

  const handleOpenModal = (item: NavigationItem) => {
    setSelectedModule(item);
  };

  const handleCloseModal = () => {
    setSelectedModule(null);
  };

  const filteredNavigation = navigation.filter(item =>
    item.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <>
      <div className="w-80 bg-slate-900/95 border-r border-yellow-400/30 flex flex-col h-full shadow-xl backdrop-blur-xl">
        {/* User Profile Section */}
        <div className="p-6 border-b border-yellow-400/30">
          <div className="flex items-center space-x-3 mb-4">
            <div className="h-12 w-12 bg-gradient-to-br from-blue-500 to-blue-700 rounded-full flex items-center justify-center border border-yellow-400/40 shadow-lg">
              <span className="text-slate-50 text-lg font-semibold">P</span>
            </div>
            <div>
              <h3 className="text-slate-50 font-semibold">Prakashh</h3>
              <div className="flex items-center space-x-2">
                <div className="h-2 w-2 bg-emerald-400 rounded-full shadow-sm"></div>
                <span className="text-emerald-400 text-sm">Online</span>
              </div>
            </div>
          </div>

          {/* Search */}
          <div className="relative">
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
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
          {filteredNavigation.map((item) => (
            <SidebarItem
              key={item.id}
              item={item}
              currentPage={currentPage}
              onPageChange={onPageChange}
              onOpenModal={handleOpenModal}
            />
          ))}
        </nav>

        {/* Footer */}
        <div className="p-4 border-t border-yellow-400/30">
          <div className="text-center text-slate-400 text-xs">
            <p>Ramnirmalchits ERP & CRM</p>
            <p className="text-slate-500">v2.0.0 - Build 2024.1</p>
          </div>
        </div>
      </div>

      {/* Child Page Modal */}
      {selectedModule && (
        <ChildPageModal
          module={selectedModule}
          onClose={handleCloseModal}
          onNavigate={onPageChange}
        />
      )}
    </>
  );
};