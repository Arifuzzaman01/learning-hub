import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { useQuery } from "@tanstack/react-query";

import { format } from "date-fns";
import toast from "react-hot-toast";
import useAxiosSecure from "../hook/useAxiosSecure";
import useAuth from "../hook/useAuth";

const SessionDetails = () => {
  const { user } = useAuth();
  const { id } = useParams();
  const axiosSecure = useAxiosSecure();
  const [isBooking, setIsBooking] = useState(false);
  const navigate = useNavigate()

  const { data, isLoading } = useQuery({
    queryKey: ["session", id],
    queryFn: async () => {
      const res = await axiosSecure.get(`/session/${id}`);
      return res.data;
    },
  });

  const session = data?.session;
  const reviews = data?.reviews;
  const averageRating = data?.averageRating;
  const isClosed = session && new Date(session.regEnd) < new Date();

  // ✅ Check localStorage only when session._id is defined
  useEffect(() => {
    if (session && session._id) {
      const booked = localStorage.getItem(`booked-${session._id}`);
      if (booked === "true") {
        setIsBooking(true);
      }
    }
  }, [session]);

  const handleBooking = async (id) => {
    console.log(id);
    // const bookingInfo = {
    //   studentEmail: user.email,
    //   sessionId: session._id,
    //   sessionTitle: session.title,
    //   tutorEmail: session.tutorEmail,
    // };

    // try {
    //   const res = await axiosSecure.post("/bookings", bookingInfo);
    //   if (res?.data?.insertedId) {
    //     toast.success("🎉 Session booked successfully!");
    //     localStorage.setItem(`booked-${session._id}`, "true");
    //     setIsBooking(true);
    //     //   TODO: Navigate payment pages
    //   } else {
    //     toast.error("Booking failed.");
    //   }
    // } catch (err) {
    //   toast.error("Something went wrong.");
    // }
    navigate(`/session-payment/${id}`)
  };

  if (isLoading) return <p className="text-center py-10">Loading...</p>;

  if (!session) return <p>Session not found</p>;
  return (
    <div className="max-w-4xl mx-auto p-6 bg-base-200 rounded shadow-md my-10">
      <h1 className="text-3xl font-bold mb-2">{session.title}</h1>
      <p className="text-gray-500 mb-4">
        👨‍🏫 Tutor: {session.tutorName} | ⭐ Average Rating:{" "}
        {averageRating || "No ratings yet"}
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
            💵 Registration Fee:{" "}
            {Number(session.fee) === 0 ? "Free" : `$${session.fee}`}
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
          <button
            disabled={isBooking || isClosed}
            onClick={()=>handleBooking(session._id)}
            className="btn btn-primary w-full"
          >
            📥 Book Now
          </button>
        )}
      </div>

      <div className="mt-10">
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
      </div>
    </div>
  );
};

export default SessionDetails;
