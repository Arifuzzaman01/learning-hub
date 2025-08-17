import React from "react";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../hook/useAxiosSecure";
import useAuth from "../hook/useAuth";
import LoadingSpinner from "../common/LoadingSpinner";
import bg from "../assets/flowerWatermark.jpg"

const Profile = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();

  // Fetch user data
  const { data: userData = {}, isLoading } = useQuery({
    queryKey: ["user"],
    queryFn: async () => {
      const { data } = await axiosSecure.get(`/user?email=${user?.email}`);
      return data;
    },
  });
  console.log(userData);
  if (isLoading) {
    return <LoadingSpinner />;
  }

  return (
    <div className="max-w-3xl mx-auto px-4 py-1 text-gray-800">
      {/* Profile Image */}
      <div className="flex justify-center -mb-20">
        <img
          className="rounded-full w-28 h-28 md:w-40 md:h-40 border-4 bg-gray-100 border-white shadow-md"
          src={userData.imageURL}
          alt={userData.name}
        />
      </div>

      {/* Profile Details */}
      <div className="border-4 border-gray-300 w-[90%] mx-auto min-h-[60vh] rounded-md p-6 pt-24 shadow-md bg-cover"
       style={{
        backgroundImage: `url(${bg})`
    }}>
        <h2 className="text-2xl font-bold text-center mb-4">{userData.name}</h2>
        <p className="text-center text-gray-600 mb-6 text-xl">
          ({userData.role})
        </p>

        <div className="text-center">
          
            <p>
              <span className="">User ID:</span> {userData._id}
            </p>
            <p>
              <span className="font-semibold">Email:</span> {userData.email}
            </p>
          <p>
            <span className="font-semibold">Created At:</span>{" "}
            {new Date(userData.createdAt).toLocaleDateString()}
          </p>
          

          
        </div>
      </div>
    </div>
  );
};

export default Profile;
