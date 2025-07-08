import React from "react";
import { useQuery } from "@tanstack/react-query";
import { format } from "date-fns";
import { Link } from "react-router";
import useAxiosSecure from "../hook/useAxiosSecure";

const AllStudySessions = () => {
    const axiosSecure = useAxiosSecure()
  const {
    data: allSessions = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["allSession"],
    queryFn: async () => {
      const { data } = await axiosSecure("/all-sessions");
      // Sort descending by createdAt
      return data.sort(
        (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
      );
    },
  });

  const getStatus = (regEndDate) => {
    const today = new Date();
    const end = new Date(regEndDate);
    return end >= today ? "Ongoing" : "Closed";
  };

  if (isLoading) {
    return <div className="text-center text-xl py-20">Loading sessions...</div>;
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-center mb-8">
        📚 All Study Sessions
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {allSessions.map((session) => {
          const status = getStatus(session.regEnd);

          return (
            <div
              key={session._id}
              className="card shadow-md bg-base-100 border border-base-300"
            >
              <div className="card-body">
                <h2 className="card-title">{session.title}</h2>
                <p className="text-sm text-gray-500">
                  Duration: {session.duration} weeks
                </p>
                <p className="mt-2">{session.description.slice(0, 100)}...</p>

                <div className="mt-4 flex items-center justify-between">
                  <span
                    className={`badge ${
                      status === "Ongoing" ? "badge-success" : "badge-error"
                    }`}
                  >
                    {status}
                  </span>
                  <Link to={`/session/${session._id}`} className="btn btn-sm">
                    Read More
                  </Link>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default AllStudySessions;
