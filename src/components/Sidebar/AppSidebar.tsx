import React from 'react';

interface AppSidebarProps {
  currentPage: string;
  onPageChange: (page: string) => void;
}

export const AppSidebar: React.FC<AppSidebarProps> = ({ currentPage, onPageChange }) => {
  const menuItems = [
    { id: 'auctions', label: 'Auctions', icon: '🏷️' },
    { id: 'users', label: 'Users', icon: '👥' },
  ];

  return (
    <div className="sidebar w-64 bg-gray-800 text-white h-full overflow-auto">
      <div className="p-4">
        <h2 className="text-lg font-semibold mb-4">RMC System</h2>
        <nav>
          <ul className="space-y-2">
            {menuItems.map((item) => (
              <li key={item.id}>
                <button
                  onClick={() => onPageChange(item.id)}
                  className={`w-full text-left px-3 py-2 rounded-md transition-colors ${
                    currentPage === item.id
                      ? 'bg-indigo-600 text-white'
                      : 'text-gray-300 hover:bg-gray-700 hover:text-white'
                  }`}
                >
                  <span className="mr-3">{item.icon}</span>
                  {item.label}
                </button>
              </li>
            ))}
          </ul>
        </nav>
      </div>
      
      {/* Add some tall content to test scrollbar */}
      <div className="p-4 space-y-4">
        {Array.from({ length: 20 }, (_, i) => (
          <div key={i} className="text-xs text-gray-400">
            Menu item {i + 1}
          </div>
        ))}
      </div>
    </div>
  );
};