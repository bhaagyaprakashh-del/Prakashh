@@ .. @@
 import React from 'react';
 import { Navigate, Outlet, useLocation } from 'react-router-dom';
-import { useAuth } from '../contexts/AuthContext';
+import { useAuth, AppRole } from '../contexts/AuthContext';
 import { Loader2 } from 'lucide-react';
 
+function roleHome(role: AppRole): string {
+  switch(role) {
+    case "Admin": return "/dash/admin";
+    case "Employee": return "/dash/employee";
+    case "Agent": return "/dash/agent";
+    case "Subscriber": return "/dash/subscriber";
+    default: return "/dashboard";
+  }
+}
+
 const ProtectedRoute: React.FC = () => {
-  const { isAuthenticated, isLoading } = useAuth();
+  const { isAuthenticated, isLoading, user } = useAuth();
+  const location = useLocation();
 
   if (isLoading) {
     return (
@@ .. @@
   }
 
   if (!isAuthenticated) {
     return <Navigate to="/login" replace />;
   }
 
+  // Redirect to role-specific dashboard after login or when visiting root
+  if (user && (location.pathname === "/" || location.pathname.startsWith("/login"))) {
+    const home = roleHome(user.role);
+    return <Navigate to={home} replace />;
+  }
+
   return <Outlet />;
 };