import React, { useEffect } from 'react';
import { useAuth } from '../auth/AuthContext';
import { Link } from 'react-router-dom';

export const LogoutPage: React.FC = () => {
  const { logout } = useAuth();

  useEffect(() => {
    logout();
  }, [logout]);

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white rounded-lg shadow-md p-8 text-center">
        <div className="mb-6">
          <div className="mx-auto w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
            <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">You have been logged out</h1>
          <p className="text-gray-600">Thank you for using RMC System</p>
        </div>

        <Link
          to="/login"
          className="inline-block bg-indigo-600 text-white py-2 px-6 rounded-md hover:bg-indigo-700 transition-colors"
        >
          Go to Login
        </Link>
      </div>
    </div>
  );
};