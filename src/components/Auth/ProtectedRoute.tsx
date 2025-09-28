import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { Loader2 } from 'lucide-react';

interface ProtectedRouteProps {
  children: React.ReactNode;
  requiredRole?: string;
  requiredPermission?: string;
}

export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ 
  children, 
  requiredRole,
  requiredPermission 
}) => {
  const { authState, isLoading } = useAuth();
  const location = useLocation();

  if (isLoading) {
    return (
      <div className="min-h-screen bg-slate-900 flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="h-8 w-8 animate-spin text-blue-400 mx-auto mb-4" />
          <p className="text-slate-400">Loading...</p>
        </div>
      </div>
    );
  }

  if (!authState.isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // Check role requirement
  if (requiredRole && authState.user?.role !== requiredRole) {
    return (
      <div className="min-h-screen bg-slate-900 flex items-center justify-center">
        <div className="text-center">
          <div className="bg-red-500/20 rounded-full p-4 mb-4 inline-block">
            <Lock className="h-8 w-8 text-red-400" />
          </div>
          <h2 className="text-xl font-bold text-slate-50 mb-2">Access Denied</h2>
          <p className="text-slate-400">You don't have permission to access this page.</p>
        </div>
      </div>
    );
  }

  // Check permission requirement
  if (requiredPermission && authState.user?.permissions) {
    const hasPermission = authState.user.permissions.includes('*') || 
                         authState.user.permissions.includes(requiredPermission);
    
    if (!hasPermission) {
      return (
        <div className="min-h-screen bg-slate-900 flex items-center justify-center">
          <div className="text-center">
            <div className="bg-red-500/20 rounded-full p-4 mb-4 inline-block">
              <Lock className="h-8 w-8 text-red-400" />
            </div>
            <h2 className="text-xl font-bold text-slate-50 mb-2">Insufficient Permissions</h2>
            <p className="text-slate-400">You don't have the required permissions for this action.</p>
          </div>
        </div>
      );
    }
  }

  return <>{children}</>;
};