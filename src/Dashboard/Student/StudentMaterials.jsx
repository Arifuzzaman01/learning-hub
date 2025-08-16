import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import useAuth from "../../hook/useAuth";
import useAxiosSecure from "../../hook/useAxiosSecure";
import nagativeSymble from "../../assets/nagative-symble.png";
import LoadingSpinner from "../../common/LoadingSpinner";

const StudentMaterials = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const [selectedSessionId, setSelectedSessionId] = useState(null);

  // Get all booked sessions
  const { data: bookings = [], isLoading } = useQuery({
    queryKey: ["bookedSessions", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/bookings?email=${user.email}`);
      return res.data;
    },
  });

  // Get materials by selected session ID
  const { data: materials = [] } = useQuery({
    queryKey: ["sessionMaterials", selectedSessionId],
    enabled: !!selectedSessionId,
    queryFn: async () => {
      const res = await axiosSecure.get(
        `/materials/session/${selectedSessionId}`
      );
      return res.data;
    },
  });
  // console.log(bookings);
  if (isLoading) return <LoadingSpinner />;

  return (
    <div className="max-w-5xl mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">📚 Your Study Materials</h2>

      {/* Step 1: Show booked sessions */}
      {bookings.length !== 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
          {bookings.map((book) => (
            <button
              key={book.sessionId}
              onClick={() => setSelectedSessionId(book.sessionId)}
              className={`btn ${
                selectedSessionId === book.sessionId
                  ? "btn-primary"
                  : "btn-outline"
              } w-full py-8`}
            >
              View Materials for Session ID: {book.sessionId.slice(-6)} <br />
              Session Title : {book?.sessionTitle}
            </button>
          ))}
        </div>
      ) : (
        <div className="flex flex-col h-[60vh] justify-center items-center ">
          <p className="text-center text-red-600 text-4xl font-bold">
            You have not receive any materials yet!!
          </p>
          <img src={nagativeSymble} alt="" />
        </div>
      )}

      {/* Step 2: Show materials by session */}
      {selectedSessionId && (
        <>
          <h3 className="text-xl font-semibold mb-3">
            Materials for Session ID: {selectedSessionId}
          </h3>

          {materials.length === 0 ? (
            <p>No materials uploaded for this session yet.</p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {materials.map((item) => (
                <div key={item._id} className="card shadow p-4 bg-base-100">
                  <h4 className="font-bold text-lg mb-2">{item.title}</h4>
                  <img
                    src={item.imageURL}
                    alt={item.title}
                    className="h-48 w-full object-cover rounded"
                  />
                  <div className="flex justify-between items-center mt-2">
                    <a
                      href={item.imageURL}
                      download
                      className="btn btn-sm btn-outline"
                    >
                      ⬇ Download Image
                    </a>
                    <a
                      href={item.driveLink}
                      target="_blank"
                      rel="noreferrer"
                      className="btn btn-sm btn-primary"
                    >
                      🔗 Google Drive
                    </a>
                  </div>
                </div>
              ))}
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default StudentMaterials;
