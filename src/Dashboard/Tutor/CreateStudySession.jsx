import React from "react";
import { useForm } from "react-hook-form";
import useAuth from "../../hook/useAuth";
import useAxiosSecure from "../../hook/useAxiosSecure";
import toast from "react-hot-toast";

const CreateStudySession = () => {
  const { user, role } = useAuth(); // assume role is 'admin' | 'tutor'
  const axiosSecure = useAxiosSecure();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const onSubmit = async (data) => {
    try {
      const result = await axiosSecure.post("/session", data);
      if (result?.data?.insertedId) {
        toast.success("Study session created successfully!");
        reset();
      } else {
        toast.error("Failed to create study session. Please try again.");
      }
    } catch (error) {
      console.error("Error creating study session:", error);
      toast.error("Failed to create study session. Please try again.");
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-4" role="main" aria-labelledby="create-session-heading">
      <h2 id="create-session-heading" className="text-3xl font-bold text-center mb-6">
        Create Study Session
      </h2>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-base-100 p-6 rounded-lg shadow-md"
      >
        {/* Session Title */}
        <div className="form-control">
          <label className="label">
            <span className="label-text">Session Title</span>
          </label>
          <input
            {...register("title", { required: "Title is required" })}
            type="text"
            placeholder="Enter session title"
            className="input input-bordered w-full"
          />
          {errors.title && (
            <p className="text-error text-sm mt-1" role="alert">{errors.title.message}</p>
          )}
        </div>

        {/* Session Duration */}
        <div className="form-control">
          <label className="label">
            <span className="label-text">Session Duration</span>
          </label>
          <input
            {...register("duration", { required: "Duration is required" })}
            type="text"
            placeholder="e.g. 6 weeks"
            className="input input-bordered w-full"
          />
          {errors.duration && (
            <p className="text-error text-sm mt-1" role="alert">{errors.duration.message}</p>
          )}
        </div>

        {/* Tutor Name (read-only) */}
        <div className="form-control">
          <label className="label">
            <span className="label-text">Tutor Name</span>
          </label>
          <input
            {...register("tutorName")}
            type="text"
            defaultValue={user?.displayName}
            readOnly
            className="input input-bordered w-full bg-base-200"
          />
        </div>

        {/* Tutor Email (read-only) */}
        <div className="form-control">
          <label className="label">
            <span className="label-text">Tutor Email</span>
          </label>
          <input
            {...register("tutorEmail")}
            type="email"
            defaultValue={user?.email}
            readOnly
            className="input input-bordered w-full bg-base-200"
          />
        </div>

        {/* Registration Start Date */}
        <div className="form-control">
          <label className="label">
            <span className="label-text">Registration Start Date</span>
          </label>
          <input
            {...register("regStart", { required: "Registration start date is required" })}
            type="date"
            className="input input-bordered w-full"
          />
          {errors.regStart && (
            <p className="text-error text-sm mt-1" role="alert">{errors.regStart.message}</p>
          )}
        </div>

        {/* Registration End Date */}
        <div className="form-control">
          <label className="label">
            <span className="label-text">Registration End Date</span>
          </label>
          <input
            {...register("regEnd", { required: "Registration end date is required" })}
            type="date"
            className="input input-bordered w-full"
          />
          {errors.regEnd && (
            <p className="text-error text-sm mt-1" role="alert">{errors.regEnd.message}</p>
          )}
        </div>

        {/* Class Start Date */}
        <div className="form-control">
          <label className="label">
            <span className="label-text">Class Start Date</span>
          </label>
          <input
            {...register("classStart", { required: "Class start date is required" })}
            type="date"
            className="input input-bordered w-full"
          />
          {errors.classStart && (
            <p className="text-error text-sm mt-1" role="alert">{errors.classStart.message}</p>
          )}
        </div>

        {/* Class End Date */}
        <div className="form-control">
          <label className="label">
            <span className="label-text">Class End Date</span>
          </label>
          <input
            {...register("classEnd", { required: "Class end date is required" })}
            type="date"
            className="input input-bordered w-full"
          />
          {errors.classEnd && (
            <p className="text-error text-sm mt-1" role="alert">{errors.classEnd.message}</p>
          )}
        </div>

        {/* Registration Fee (only editable by admin) */}
        <div className="form-control">
          <label className="label">
            <span className="label-text">Registration Fee</span>
          </label>
          <select
            {...register("fee")}
            className="select select-bordered w-full"
          >
            <option value="free">Free</option>
            <option value="paid">Paid</option>
          </select>
        </div>

        {/* Status (default: pending) */}
        <div className="form-control">
          <label className="label">
            <span className="label-text">Status</span>
          </label>
          <select
            {...register("status")}
            className="select select-bordered w-full"
          >
            <option value="pending">Pending</option>
            <option value="approved" disabled>
              Approved (admin only)
            </option>
          </select>
        </div>

        {/* Session Description - full width */}
        <div className="md:col-span-2 form-control">
          <label className="label">
            <span className="label-text">Session Description</span>
          </label>
          <textarea
            {...register("description", { required: "Description is required" })}
            rows={4}
            placeholder="Write something about the session..."
            className="textarea textarea-bordered w-full"
          ></textarea>
          {errors.description && (
            <p className="text-error text-sm mt-1" role="alert">{errors.description.message}</p>
          )}
        </div>

        {/* Submit Button - full width */}
        <div className="md:col-span-2 form-control mt-6">
          <button type="submit" className="btn btn-primary w-full">
            Create Session
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateStudySession;