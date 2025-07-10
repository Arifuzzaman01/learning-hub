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
    console.log("Form Data:", data);
    // done: send to backend
    const result = await axiosSecure.post("/session", data);
    console.log(result?.data);
    if (result?.data?.insertedId) {
      toast.success("Created study session");
      reset();
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-4 bg-base-200 shadow rounded-md">
      <h2 className="text-2xl font-bold mb-6 text-center">
        📚 Create Study Session
      </h2>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="grid grid-cols-1 md:grid-cols-2 gap-4"
      >
        {/* Session Title */}
        <div>
          <label className="label">Session Title</label>
          <input
            {...register("title", { required: true })}
            type="text"
            placeholder="Enter session title"
            className="input input-bordered w-full"
          />
          {errors.title && (
            <p className="text-error text-sm mt-1">Title is required</p>
          )}
        </div>

        {/* Session Duration */}
        <div>
          <label className="label">Session Duration</label>
          <input
            {...register("duration", { required: true })}
            type="text"
            placeholder="e.g. 6 weeks"
            className="input input-bordered w-full"
          />
        </div>

        {/* Tutor Name (read-only) */}
        <div>
          <label className="label">Tutor Name</label>
          <input
            {...register("tutorName")}
            type="text"
            defaultValue={user?.displayName}
            readOnly
            className="input input-bordered w-full bg-gray-100"
          />
        </div>

        {/* Tutor Email (read-only) */}
        <div>
          <label className="label">Tutor Email</label>
          <input
            {...register("tutorEmail")}
            type="email"
            defaultValue={user?.email}
            readOnly
            className="input input-bordered w-full bg-gray-100"
          />
        </div>

        {/* Registration Start Date */}
        <div>
          <label className="label">Registration Start Date</label>
          <input
            {...register("regStart", { required: true })}
            type="date"
            className="input input-bordered w-full"
          />
        </div>

        {/* Registration End Date */}
        <div>
          <label className="label">Registration End Date</label>
          <input
            {...register("regEnd", { required: true })}
            type="date"
            className="input input-bordered w-full"
          />
        </div>

        {/* Class Start Date */}
        <div>
          <label className="label">Class Start Date</label>
          <input
            {...register("classStart", { required: true })}
            type="date"
            className="input input-bordered w-full"
          />
        </div>

        {/* Class End Date */}
        <div>
          <label className="label">Class End Date</label>
          <input
            {...register("classEnd", { required: true })}
            type="date"
            className="input input-bordered w-full"
          />
        </div>

        {/* Registration Fee (only editable by admin) */}
        <div>
          <label className="label">Registration Fee</label>
          {/* <input
            type="number"
            defaultValue={0}
            readOnly={role !== "admin"}
            className={`input input-bordered w-full ${
              role !== "admin" ? "bg-gray-100" : ""
            }`}
          /> */}
          <select
            {...register("fee")}
            className="w-full select select-bordered"
          >
            <option defaultValue='free' value="free">Free</option>
            <option value="paid">Paid</option>
          </select>
        </div>

        {/* Status (default: pending) */}
        <div>
          <label className="label">Status</label>
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
        <div className="md:col-span-2">
          <label className="label">Session Description</label>
          <textarea
            {...register("description", { required: true })}
            rows={4}
            placeholder="Write something about the session..."
            className="textarea textarea-bordered w-full"
          ></textarea>
          {errors.description && (
            <p className="text-error text-sm mt-1">Description is required</p>
          )}
        </div>

        {/* Submit Button - full width */}
        <div className="md:col-span-2 text-center mt-4">
          <button type="submit" className="btn btn-primary px-10 w-full">
            Create Session
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateStudySession;
