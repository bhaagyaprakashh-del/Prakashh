import React, { useState } from 'react';
import { AuctionsPage } from './components/Auctions/AuctionsPage';
import { UsersPage } from './components/Users/UsersPage';

type Page = 'auctions' | 'users';

function App() {
  const [currentPage, setCurrentPage] = useState<Page>('auctions');

  const renderPage = () => {
    switch (currentPage) {
      case 'auctions':
        return <AuctionsPage />;
      case 'users':
        return <UsersPage />;
      default:
        return <AuctionsPage />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Navigation */}
      <nav className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex">
              <div className="flex-shrink-0 flex items-center">
                <h1 className="text-xl font-bold text-gray-900">RMC System</h1>
              </div>
              <div className="ml-6 flex space-x-8">
                <button
                  onClick={() => setCurrentPage('auctions')}
                  className={`inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium ${
                    currentPage === 'auctions'
                      ? 'border-indigo-500 text-gray-900'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  Auctions
                </button>
                <button
                  onClick={() => setCurrentPage('users')}
                  className={`inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium ${
                    currentPage === 'users'
                      ? 'border-indigo-500 text-gray-900'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  Users
                </button>
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto">
        {renderPage()}
      </main>
    </div>
  );
}

export default App;