import { Navigate } from "react-router";
import useAuth from "../hook/useAuth";
import useRole from "../hook/useRole";
import LoadingSpinner from "../common/LoadingSpinner";
import React from "react";

/**
 * Admin route protection component
 * 
 * Protects routes that require admin privileges. Redirects non-admin
 * users to the home page.
 * 
 * @param {Object} props - Component props
 * @param {React.ReactNode} props.children - Child components to protect
 * @returns {React.ReactNode} Protected children or redirect
 */
const AdminRoute = React.memo(({ children }) => {
  const { user, loading } = useAuth();
  const { role, roleLoading } = useRole();

  // Show loading spinner while checking authentication and role
  if (loading || roleLoading) return <LoadingSpinner />;

  // Allow access if user is authenticated and has admin role
  if (user && role === "admin") return children;

  // Redirect to home page if not authorized
  return <Navigate to="/" replace />;
});

export default AdminRoute;