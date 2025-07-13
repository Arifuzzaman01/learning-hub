import axios from "axios";
import React from "react";
import toast from "react-hot-toast";
const axiosSecure = axios.create({
  baseURL: `https://learn-hub-five-tau.vercel.app`,
  withCredentials: true,
});

const useAxiosSecure = () => {
  axiosSecure.interceptors.request.use(
    (config) => {
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

  // ⚠️ Response Interceptor
  axiosSecure.interceptors.response.use(
    (response) => response,
    (error) => {
      if (error.response?.status === 401 || error.response?.status === 403) {
        toast.error("Unauthorized access. Please login again.");
        // Optional: logout or redirect
      } else if (error.response?.status === 500) {
        toast.error("Server Error! Try again later.");
      }

      return Promise.reject(error);
    }
  );
  return axiosSecure;
};

export default useAxiosSecure;
