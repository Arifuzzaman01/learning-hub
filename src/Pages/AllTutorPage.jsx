import React from "react";
import { useQuery } from "@tanstack/react-query";

import { FaStar } from "react-icons/fa";
import { Link } from "react-router";

import useAxiosSecure from "../hook/useAxiosSecure";
import useAuth from "../hook/useAuth";

const AllTutorPage = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();
  const { data: tutors, isLoading } = useQuery({
    queryKey: ["allTutors"],
    queryFn: async () => {
      const { data } = await axiosSecure.get(`/tutors`);
      return data;
    },
  });
  console.log(tutors);
  if (isLoading) return <p className="text-center py-10">Loading...</p>;

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <h2 className="text-3xl font-bold text-center mb-6">🎓 All Tutors</h2>
      <div className="grid grid-cols-1  md:grid-cols-2 lg:grid-cols-3 gap-6">
        {tutors?.map((tutor) => (
          <div
            key={tutor._id}
            className="card bg-base-100 shadow-md border p-5 hover:shadow-lg transition-all"
          >
            <div className="flex items-center gap-4">
              <img
                src={
                  tutor.imageURL || "https://i.ibb.co/NtnkXWz/default-user.png"
                }
                alt={tutor.name}
                className="w-16 h-16 rounded-full object-cover border"
              />
              <div>
                <h3 className="text-xl font-semibold">{tutor.name}</h3>
                <p className="text-gray-500 text-sm">{tutor.email}</p>
              </div>
            </div>

            <div className="mt-4 space-y-1">
              <p>
                <strong>📚 Total Sessions:</strong> {tutor.sessionsCount || 0}
              </p>
              <p className="flex items-center gap-2">
                <strong>⭐ Avg. Rating:</strong>{" "}
                {tutor.averageRating ? (
                  <>
                    <span>{tutor.averageRating.toFixed(1)}</span>
                    <FaStar className="text-yellow-400" />
                  </>
                ) : (
                  "No Ratings"
                )}
              </p>
              <p>
                <strong>📝 Total Reviews:</strong> {tutor.reviewCount || 0}
              </p>
            </div>
            {/* TODO */}
            {/* <div className="mt-4 text-center">
              <Link
                to={`/tutor-profile/${tutor._id}`}
                className="btn btn-outline btn-primary btn-sm"
              >
                View Profile
              </Link>
            </div> */}
          </div>
        ))}
      </div>
    </div>
  );
};

export default AllTutorPage;
