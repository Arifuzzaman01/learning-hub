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
        toast.success("Note created successfully!");
        reset();
      }
    } catch (err) {
      toast.error("Failed to create note. Please try again.");
      console.error(err);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-4" role="main" aria-labelledby="create-note-heading">
      <h1 id="create-note-heading" className="text-3xl font-bold text-center mb-6">Create a New Note</h1>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 bg-base-100 p-6 rounded-lg shadow-md">
        <div className="form-control">
          <label htmlFor="email" className="label">
            <span className="label-text">Email Address</span>
          </label>
          <input
            type="email"
            id="email"
            readOnly
            defaultValue={user?.email}
            {...register("email")}
            className="input input-bordered w-full bg-base-200"
            aria-describedby="email-help"
          />
          <div id="email-help" className="label-text-alt text-gray-500 mt-1">Your email address (read-only)</div>
        </div>

        <div className="form-control">
          <label htmlFor="title" className="label">
            <span className="label-text">Note Title</span>
          </label>
          <input
            type="text"
            id="title"
            placeholder="Enter note title"
            {...register("title", { required: "Title is required" })}
            className="input input-bordered w-full"
            aria-describedby="title-help"
            aria-invalid={errors.title ? "true" : "false"}
          />
          <div id="title-help" className="label-text-alt text-gray-500 mt-1">Enter a title for your note</div>
          {errors.title && <p className="text-error text-sm mt-1" role="alert">{errors.title.message}</p>}
        </div>

        <div className="form-control">
          <label htmlFor="description" className="label">
            <span className="label-text">Note Content</span>
          </label>
          <textarea
            id="description"
            placeholder="Write your note content here..."
            {...register("description", { required: "Description is required" })}
            className="textarea textarea-bordered w-full h-32"
            aria-describedby="description-help"
            aria-invalid={errors.description ? "true" : "false"}
          ></textarea>
          <div id="description-help" className="label-text-alt text-gray-500 mt-1">Enter the content of your note</div>
          {errors.description && <p className="text-error text-sm mt-1" role="alert">{errors.description.message}</p>}
        </div>

        <div className="form-control mt-6">
          <button type="submit" className="btn btn-primary w-full">
            Save Note
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateNote;