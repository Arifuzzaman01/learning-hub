import React, { createContext, useEffect, useState } from "react";
import { AuthContext } from "./AuthContext";
import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile,
} from "firebase/auth";
import { auth } from "../fibrebase/firebase.init";
import useAxiosSecure from "../hook/useAxiosSecure";
import toast from "react-hot-toast";

/**
 * Authentication Provider Component
 * 
 * This component provides authentication context to the entire application.
 * It handles user authentication state, login/logout functionality, and
 * integrates with Firebase Authentication.
 * 
 * @param {Object} props - Component props
 * @param {React.ReactNode} props.children - Child components to wrap with auth context
 */
const AuthProvider = ({ children }) => {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);
  const provider = new GoogleAuthProvider();
  const axiosSecure = useAxiosSecure();
  
  /**
   * Sign up a new user with email and password
   * @param {string} email - User's email address
   * @param {string} password - User's password
   * @returns {Promise} Firebase user creation result
   */
  const signUpUser = async (email, password) => {
    setLoading(true);
    try {
      const result = await createUserWithEmailAndPassword(auth, email, password);
      return result;
    } catch (error) {
      console.error("Sign up error:", error);
      toast.error("Failed to create account. Please try again.");
      throw error;
    } finally {
      setLoading(false);
    }
  };
  
  /**
   * Sign in an existing user with email and password
   * @param {string} email - User's email address
   * @param {string} password - User's password
   * @returns {Promise} Firebase sign in result
   */
  const singInUser = async (email, password) => {
    setLoading(true);
    try {
      const result = await signInWithEmailAndPassword(auth, email, password);
      return result;
    } catch (error) {
      console.error("Sign in error:", error);
      toast.error("Failed to sign in. Please check your credentials.");
      throw error;
    } finally {
      setLoading(false);
    }
  };

  /**
   * Update user profile information
   * @param {Object} profileInfo - Profile information to update
   * @returns {Promise} Firebase profile update result
   */
  const updateUser = async (profileInfo) => {
    setLoading(true);
    try {
      const result = await updateProfile(auth.currentUser, profileInfo);
      return result;
    } catch (error) {
      console.error("Update profile error:", error);
      toast.error("Failed to update profile. Please try again.");
      throw error;
    } finally {
      setLoading(false);
    }
  };
  
  /**
   * Log out the current user
   * @returns {Promise} Firebase sign out result
   */
  const logOutUser = async () => {
    try {
      const result = await signOut(auth);
      toast.success("Logged out successfully");
      return result;
    } catch (error) {
      console.error("Logout error:", error);
      toast.error("Failed to logout. Please try again.");
      throw error;
    }
  };
  
  /**
   * Sign in using Google authentication
   * @returns {Promise} Firebase Google sign in result
   */
  const googleLogin = async () => {
    setLoading(true);
    try {
      const result = await signInWithPopup(auth, provider);
      return result;
    } catch (error) {
      console.error("Google login error:", error);
      toast.error("Failed to login with Google. Please try again.");
      throw error;
    } finally {
      setLoading(false);
    }
  };
  
  // Handle authentication state changes
  useEffect(() => {
    const unSubscribe = onAuthStateChanged(auth, async (currentUser) => {
      setUser(currentUser);
      // Get JWT token for authenticated users
      if (currentUser?.email) {
        try {
          const userData = { email: currentUser?.email };
          const { data } = await axiosSecure.post("/jwt", userData, {
            withCredentials: true,
          });
          console.log("JWT token received:", data);
        } catch (error) {
          console.error("JWT token error:", error);
          toast.error("Authentication error. Please log in again.");
        }
      }
      setLoading(false);
    });
    
    return () => {
      unSubscribe();
    };
  }, []);
  
  const userInfo = {
    user,
    signUpUser,
    updateUser,
    singInUser,
    logOutUser,
    googleLogin,
    setLoading,
    loading,
  };

  return (
    <AuthContext.Provider value={userInfo}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;