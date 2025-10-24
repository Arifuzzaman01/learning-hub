import React from "react";
import useAxiosSecure from "./useAxiosSecure";
import useAuth from "./useAuth";
import { useQuery } from "@tanstack/react-query";

/**
 * Custom hook for fetching user role
 * 
 * Fetches the current user's role from the backend API using React Query.
 * The role is cached and automatically refetched when needed.
 * 
 * @returns {Object} Role information
 * @returns {string|null} return.role - User's role (admin, tutor, student) or null
 * @returns {boolean} return.roleLoading - Loading state for role fetching
 */
const useRole = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();
  
  const { data: role, isLoading:roleLoading } = useQuery({
    queryKey: ["role", user?.email],
    queryFn: async () => {
      const { data } = await axiosSecure(`user?email=${user?.email}`);
      return data.role;
    },
    enabled: !!user?.email, // Only fetch if user email exists
  });
  
  return { role, roleLoading };
};

export default useRole;