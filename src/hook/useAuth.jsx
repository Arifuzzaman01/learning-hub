import React, { useContext } from "react";
import { AuthContext } from "../provider/AuthContext";

/**
 * Custom hook for accessing authentication context
 * 
 * Provides access to the authentication context values including
 * user state, authentication functions, and loading state.
 * 
 * @returns {Object} Authentication context values
 * @returns {Object|null} return.user - Current user object or null if not authenticated
 * @returns {Function} return.signUpUser - Function to sign up a new user
 * @returns {Function} return.updateUser - Function to update user profile
 * @returns {Function} return.singInUser - Function to sign in an existing user
 * @returns {Function} return.logOutUser - Function to log out the current user
 * @returns {Function} return.googleLogin - Function to sign in with Google
 * @returns {Function} return.setLoading - Function to set loading state
 * @returns {boolean} return.loading - Current loading state
 */
const useAuth = () => {
  const authContext = useContext(AuthContext);
  return authContext;
};

export default useAuth;