import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router";
import nagativeSymble from "../../assets/nagative-symble.png";
import useAxiosSecure from "../../hook/useAxiosSecure";
import useAuth from "../../hook/useAuth";
import LoadingSpinner from "../../common/LoadingSpinner";

const BookedSessions = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const { data: sessions = [], isLoading } = useQuery({
    queryKey: ["bookedSessions", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/bookings?email=${user.email}`);
      return res.data;
    },
  });
  console.log(sessions);

  if (isLoading) return <LoadingSpinner />;

  return (
    <div>
      {sessions.length == 0 ? (
        <div className="flex flex-col h-[60vh] justify-center items-center ">
          <p className="text-center text-red-600 text-4xl font-bold">
            You have not booking any session!!
          </p>
          <img src={nagativeSymble} alt="" />
        </div>
      ) : (
        <div className="grid md:grid-cols-2 gap-4 p-4">
          {sessions.map((s) => (
            <div key={s.sessionId} className="card bg-base-100 shadow-md p-4">
              <h2 className="text-xl font-bold">{s.title}</h2>
              <p>Tutor: {s.tutorEmail}</p>
              <Link
                to={`/dashboard/booked-sessions/${s.sessionId}`}
                className="btn btn-sm btn-primary mt-3"
              >
                View Details
              </Link>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default BookedSessions;
