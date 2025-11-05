import { Navigate, useLocation } from "react-router-dom";
import { useAuthStore } from "@/store/auth";
import { Permission } from "@/lib/types";

interface ProtectedRouteProps {
  children: React.ReactNode;
  permissions?: Permission[];
  requireAll?: boolean; // If true, user must have ALL permissions, otherwise just one
}

export const ProtectedRoute = ({ 
  children, 
  permissions = [], 
  requireAll = false 
}: ProtectedRouteProps) => {
  const { isAuthenticated, firstTimeLogin, hasPermission, hasAllPermissions, hasAnyPermission } = useAuthStore();
  const location = useLocation();

  // Check if user is authenticated
  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // Redirect to change password if first time login
  if (firstTimeLogin) {
    return <Navigate to="/change-password" replace />;
  }

  // Check permissions if specified
  if (permissions.length > 0) {
    const hasRequiredPermissions = requireAll 
      ? hasAllPermissions(permissions)
      : hasAnyPermission(permissions);

    if (!hasRequiredPermissions) {
      return <Navigate to="/unauthorized" replace />;
    }
  }

  return <>{children}</>;
};