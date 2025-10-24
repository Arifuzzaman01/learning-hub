import { data, Link, useParams } from "react-router";
import { useForm } from "react-hook-form";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { IoArrowBack } from "react-icons/io5";
import toast from "react-hot-toast";
import useAxiosSecure from "../../hook/useAxiosSecure";
import useAuth from "../../hook/useAuth";

const SessionDetailsWithReview = () => {
  const { id } = useParams();
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();
  const queryClient = useQueryClient();
  const { register, handleSubmit, reset } = useForm();

  const { data: session = {} } = useQuery({
    queryKey: ["sessionDetails", id],
    queryFn: async () => {
      const res = await axiosSecure.get(`/session/${id}`);
      return res.data?.session;
    },
  });
  // console.log(session);
  const { data: reviews = [] } = useQuery({
    queryKey: ["reviews", id],
    queryFn: async () => {
      const res = await axiosSecure.get(`/reviews/${id}`);
      return res.data;
    },
  });

  const reviewMutation = useMutation({
    mutationFn: (reviewData) => axiosSecure.post("/reviews", reviewData),
    onSuccess: () => {
      toast.success("Review submitted!");
      queryClient.invalidateQueries(["reviews", id]);
      reset();
    },
  });
console.log(session);
  const onSubmit = (data) => {
    console.log(data);
    const reviewData = {
      sessionId: session?.id,
      sessionTitle: session?.title,
      tutorEmail: session?.tutorEmail,
      studentEmail: user.email,
      rating: parseFloat(data.rating),
      comment: data.comment,
    };
    reviewMutation.mutate(reviewData);
  };
  // console.log(data);
  return (
    <div className="max-w-3xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-2">{session?.title}</h1>
      <p className="mb-4">{session?.description}</p>
      <p className="mb-2 font-semibold">Duration: {session?.duration} hours</p>
      <p className="mb-2">Tutor: {session?.tutorEmail}</p>
      <p className="mb-2">
        Fee: {session?.fee === "0" ? "Free" : `$${session?.fee}`}
      </p>

      {/* Review Section */}
      <div className="mt-8 border-t pt-4">
        <h2 className="text-xl font-bold mb-2">⭐ Leave a Review</h2>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">
          <select
            {...register("rating", { required: true })}
            className="select select-bordered w-full"
          >
            <option value="">Select rating</option>
            {[5, 4, 3, 2, 1].map((n) => (
              <option key={n} value={n}>
                {n} Star{n > 1 ? "s" : ""}
              </option>
            ))}
          </select>
          <textarea
            {...register("comment")}
            className="textarea textarea-bordered w-full"
            placeholder="Write your review..."
          />
          <div className="flex gap-2">
            <Link className="btn btn-success" to="/dashboard/booked-sessions">
              <IoArrowBack /> Back
            </Link>
            <button type="submit" className="btn btn-primary flex-1">
              Submit Review
            </button>
          </div>
        </form>

        {/* Review List */}
        <div className="mt-6 space-y-4">
          <h3 className="font-semibold text-lg">All Reviews</h3>
          {reviews.length === 0 && <p>No reviews yet.</p>}
          {reviews.map((rev, idx) => (
            <div key={idx} className="bg-base-200 p-3 rounded">
              <p className="font-bold">{rev.studentEmail}</p>
              <p>⭐ {rev.rating}</p>
              <p>{rev.comment}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SessionDetailsWithReview;
