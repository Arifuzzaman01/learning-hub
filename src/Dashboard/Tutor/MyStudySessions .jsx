import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

import toast from "react-hot-toast";
import useAxiosSecure from "./../../hook/useAxiosSecure";
import useAuth from "./../../hook/useAuth";
import LoadingSpinner from "../../common/LoadingSpinner";

const MyStudySessions = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();

  const { data: sessions = [], isLoading } = useQuery({
    queryKey: ["mySessions", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/tutor-sessions?email=${user.email}`);
      return res.data;
    },
  });

  const resendMutation = useMutation({
    mutationFn: async (id) => {
      await axiosSecure.patch(`/session/resend-request/${id}`);
    },
    onSuccess: () => {
      toast.success("✅ Request sent again for approval");
      queryClient.invalidateQueries(["mySessions", user?.email]);
    },
  });

  if (isLoading) return <LoadingSpinner />;

  return (
    <div className="p-4 space-y-4">
      <h1 className="text-2xl font-bold">📋 My Study Sessions</h1>

      {sessions.length === 0 && <p>No sessions found.</p>}

      {sessions.map((session) => (
        <div
          key={session._id}
          className="bg-base-100 shadow p-4 border rounded-md space-y-1 flex gap-5"
        >
              <div className="border-r-2 pr-5 border-gray-400 flex-1">
                  <h2 className="text-lg font-semibold">{session.title}</h2>
          <p>
            Status:{" "}
            <span
              className={`badge ${
                session.status === "approved"
                  ? "badge-success"
                  : session.status === "rejected"
                  ? "badge-error"
                  : "badge-warning"
              }`}
            >
              {session.status}
            </span>
          </p>

          {session.status === "rejected" && (
            <button
              onClick={() => resendMutation.mutate(session._id)}
              className="btn btn-sm btn-outline btn-warning mt-2"
            >
              🔄 Resend Approval Request
            </button>
          )}
          </div>

          <p className="flex-2">{session.description}</p>
        </div>
      ))}
    </div>
  );
};

export default MyStudySessions;
