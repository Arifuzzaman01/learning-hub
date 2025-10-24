import { Navigate, useLocation } from "react-router";
import useAuth from "../hook/useAuth";
import LoadingSpinner from "../common/LoadingSpinner";
import React from "react";

/**
 * Private route protection component
 * 
 * Protects routes that require authentication. Redirects unauthenticated
 * users to the login page while preserving the intended destination.
 * 
 * @param {Object} props - Component props
 * @param {React.ReactNode} props.children - Child components to protect
 * @returns {React.ReactNode} Protected children or redirect
 */
const PrivateRoute = React.memo(({ children }) => {
  const { user, loading } = useAuth();
  const location = useLocation();
  
  // Show loading spinner while checking authentication state
  if (loading) return <LoadingSpinner />;
  
  // Redirect to login if not authenticated
  if (!user || !user?.email) {
    return <Navigate state={{ from: location?.pathname }} to="/login" replace />;
  }
  
  // Render protected content
  return children;
});

export default PrivateRoute;