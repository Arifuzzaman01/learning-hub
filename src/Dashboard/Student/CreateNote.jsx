import React from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import useAxiosSecure from "../../hook/useAxiosSecure";
import useAuth from "../../hook/useAuth";


const CreateNote = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    try {
      const res = await axiosSecure.post("/notes", data);
      if (res.data.insertedId) {
        toast.success("✅ Note created successfully!");
        reset();
      }
    } catch (err) {
      toast.error("Failed to create note. Please try again.");
      console.error(err);
    }
  };

  return (
    <div className="max-w-xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">📝 Create a Note</h1>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">

        <div>
          <label className="label">Email</label>
          <input
            type="email"
            readOnly
            defaultValue={user?.email}
            {...register("email")}
            className="input input-bordered w-full"
          />
        </div>

        <div>
          <label className="label">Title</label>
          <input
            type="text"
            placeholder="Note title"
            {...register("title", { required: true })}
            className="input input-bordered w-full"
          />
          {errors.title && <p className="text-red-500 text-sm">Title is required</p>}
        </div>

        <div>
          <label className="label">Description</label>
          <textarea
            placeholder="Write your note..."
            {...register("description", { required: true })}
            className="textarea textarea-bordered w-full"
          ></textarea>
          {errors.description && <p className="text-red-500 text-sm">Description is required</p>}
        </div>

        <button type="submit" className="btn btn-primary w-full">
          ➕ Save Note
        </button>
      </form>
    </div>
  );
};

export default CreateNote;
