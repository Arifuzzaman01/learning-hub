import React from "react";
import useAxiosSecure from "./useAxiosSecure";
import useAuth from "./useAuth";
import { useQuery } from "@tanstack/react-query";

const useRole = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();
  const { data: role, isLoading:roleLoading } = useQuery({
    queryKey: ["role", user?.email],
    queryFn: async () => {
      const { data } = await axiosSecure(`user?email=${user?.email}`);
      return data.role;
    },
  });
  console.log(role);
  return { role, roleLoading };
};

export default useRole;
