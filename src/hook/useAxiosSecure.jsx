import axios from "axios";
import React from "react";
import toast from "react-hot-toast";

/**
 * Axios instance with security configurations
 * 
 * This creates a secure axios instance with interceptors for handling
 * authentication tokens and common error responses.
 * 
 * @returns {Object} Configured axios instance
 */
const axiosSecure = axios.create({
  baseURL: `https://learn-hub-five-tau.vercel.app`,
  withCredentials: true,
});

/**
 * Custom hook for secure API requests
 * 
 * Provides an axios instance configured for secure API communication
 * with automatic error handling and token management.
 * 
 * @returns {Object} Configured axios instance with interceptors
 */
const useAxiosSecure = () => {
  // Request interceptor
  axiosSecure.interceptors.request.use(
    (config) => {
      // Add any request preprocessing here if needed
      return config;
    },
    (error) => {
      console.error("Request error:", error);
      toast.error("Network error. Please check your connection.");
      return Promise.reject(error);
    }
  );

  // Response interceptor for error handling
  axiosSecure.interceptors.response.use(
    (response) => response,
    (error) => {
      console.error("Response error:", error);
      
      if (error.response?.status === 401 || error.response?.status === 403) {
        toast.error("Unauthorized access. Please login again.");
        // Optional: logout or redirect
      } else if (error.response?.status === 500) {
        toast.error("Server Error! Try again later.");
      } else if (error.response?.status === 400) {
        toast.error("Bad request. Please check your input.");
      } else if (error.response?.status === 404) {
        toast.error("Resource not found.");
      } else if (error.response?.status >= 500) {
        toast.error("Server error. Please try again later.");
      } else if (error.code === 'ECONNABORTED') {
        toast.error("Request timeout. Please try again.");
      } else if (error.message === 'Network Error') {
        toast.error("Network error. Please check your connection.");
      } else {
        toast.error("An unexpected error occurred. Please try again.");
      }

      return Promise.reject(error);
    }
  );
  
  return axiosSecure;
};

export default useAxiosSecure;