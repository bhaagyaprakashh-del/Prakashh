import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { LogOut, CheckCircle, Loader2 } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';

export const LogoutPage: React.FC = () => {
  const navigate = useNavigate();
  const { logout, user } = useAuth();
  const [isLoggingOut, setIsLoggingOut] = useState(true);
  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    const performLogout = async () => {
      // Simulate logout process
      await new Promise(resolve => setTimeout(resolve, 1500));
      logout();
      setIsLoggingOut(false);
      setIsComplete(true);
      
      // Redirect to login after showing success message
      setTimeout(() => {
        navigate('/login');
      }, 2000);
    };

    performLogout();
  }, [logout, navigate]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center p-4">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23334155' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='1'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-50"></div>
      
      <div className="relative">
        {/* Logout Modal */}
        <div className="bg-slate-800/40 backdrop-blur-xl border border-yellow-400/30 rounded-2xl shadow-2xl p-8 text-center max-w-md mx-auto">
          {isLoggingOut ? (
            <>
              <div className="mb-6">
                <div className="w-16 h-16 bg-blue-500/20 rounded-full flex items-center justify-center mx-auto mb-4 border border-yellow-400/30">
                  <Loader2 className="h-8 w-8 text-blue-400 animate-spin" />
                </div>
                <h2 className="text-2xl font-bold text-slate-50 mb-2">Signing Out</h2>
                <p className="text-slate-400">Please wait while we securely log you out...</p>
              </div>
              
              {user && (
                <div className="bg-slate-700/30 rounded-xl p-4 border border-yellow-400/20">
                  <p className="text-slate-300 text-sm">Goodbye, {user.name}!</p>
                  <p className="text-slate-500 text-xs">Your session is being terminated</p>
                </div>
              )}
            </>
          ) : isComplete ? (
            <>
              <div className="mb-6">
                <div className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-4 border border-green-500/30">
                  <CheckCircle className="h-8 w-8 text-green-400" />
                </div>
                <h2 className="text-2xl font-bold text-slate-50 mb-2">Signed Out Successfully</h2>
                <p className="text-slate-400">You have been securely logged out</p>
              </div>
              
              <div className="bg-green-500/10 border border-green-500/30 rounded-lg p-4">
                <p className="text-green-400 text-sm">
                  Redirecting to login page...
                </p>
              </div>
            </>
          ) : null}
        </div>
      </div>
    </div>
  );
};