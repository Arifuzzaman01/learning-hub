import React from "react";
import { useParams } from "react-router";
import { useQuery } from "@tanstack/react-query";

import { format } from "date-fns";
import toast from "react-hot-toast";
import useAxiosSecure from "../hook/useAxiosSecure";

const SessionDetails = () => {
  const { id } = useParams();
  const axiosSecure = useAxiosSecure();
  const { data, isLoading } = useQuery({
    queryKey: ["session", id],
    queryFn: async () => {
      const res = await axiosSecure.get(`/session/${id}`);
      return res.data;
    },
  });
  console.log(data);
  if (isLoading) return <p className="text-center py-10">Loading...</p>;

  const { session } = data || {};
  const isClosed = new Date(session?.regEnd) < new Date();

  const handleBooking = () => {
    // TODO: post booking logic here
    toast.success("Booked this session!");
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-base-200 rounded shadow-md">
      <h1 className="text-3xl font-bold mb-2">{session.title}</h1>
      <p className="text-gray-500 mb-4">
        👨‍🏫 Tutor: {session.tutorName} | ⭐ Average Rating:{" "}
        {/* {averageRating || "No ratings yet"} */}
      </p>

      <div className="mb-4">
        <p className="mb-2 text-lg font-semibold">📄 Description:</p>
        <p className="text-sm text-gray-700">{session.description}</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
        <div>
          <p>
            🗓️ Registration Start: {format(new Date(session.regStart), "PPP")}
          </p>
          <p>🗓️ Registration End: {format(new Date(session.regEnd), "PPP")}</p>
        </div>
        <div>
          <p>📚 Class Start: {format(new Date(session.classStart), "PPP")}</p>
          <p>📚 Class End: {format(new Date(session.classEnd), "PPP")}</p>
        </div>
        <div>
          <p>⏳ Duration: {session.duration} weeks</p>
          <p>
            💵 Registration Fee: {Number(session.fee) === 0 ? "Free" : `$${session.fee}`}
          </p>
        </div>
        <div>
          <p>📌 Status: {session.status}</p>
          <p>📅 Created: {format(new Date(session.createdAt), "PPP")}</p>
        </div>
      </div>

      <div className="mt-6">
        {isClosed ? (
          <button className="btn btn-disabled w-full">
            📌 Registration Closed
          </button>
        ) : (
          <button onClick={handleBooking} className="btn btn-primary w-full">
            📥 Book Now
          </button>
        )}
      </div>

      {/* <div className="mt-10">
        <h2 className="text-xl font-bold mb-2">
          📝 Student Reviews ({reviews.length})
        </h2>
        {reviews.length > 0 ? (
          <div className="space-y-4">
            {reviews.map((review, idx) => (
              <div key={idx} className="bg-base-100 p-4 rounded shadow-sm">
                <p className="font-semibold">{review.reviewerName}</p>
                <p className="text-sm text-gray-500">
                  Rating: {review.rating}⭐
                </p>
                <p className="mt-1 text-sm">{review.comment}</p>
              </div>
            ))}
          </div>
        ) : (
          <p>No reviews yet.</p>
        )}
      </div> */}
    </div>
  );
};

export default SessionDetails;
