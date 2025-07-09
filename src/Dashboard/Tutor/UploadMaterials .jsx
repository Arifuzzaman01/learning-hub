import { useQuery } from "@tanstack/react-query";

import toast from "react-hot-toast";

import { useForm } from "react-hook-form";
import { imageUpload } from "../../common/ImageUpload";
import useAxiosSecure from "../../hook/useAxiosSecure";
import useAuth from "../../hook/useAuth";

const UploadMaterials = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const { data: sessions = [], isLoading } = useQuery({
    queryKey: ["approvedSessions", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(
        `/approved-sessions?email=${user.email}`
      );
      return res.data;
    },
  });

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    try {
      const imageFile = data.image[0];
      const uploadRes = await imageUpload(imageFile);
      const imageURL = uploadRes;

      const materialData = {
        title: data.title,
        sessionId: data.sessionId,
        tutorEmail: user.email,
        imageURL,
        driveLink: data.driveLink,
      };

      const res = await axiosSecure.post("/materials", materialData);
      if (res.data.insertedId) {
        toast.success("📁 Material uploaded!");
        reset();
      }
    } catch (err) {
      console.error(err);
      toast.error("Failed to upload material.");
    }
  };

  if (isLoading) return <p className="text-center py-10">Loading...</p>;

  return (
    <div className="max-w-3xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">📤 Upload Study Materials</h1>

      {sessions.length === 0 ? (
        <p>No approved sessions available for uploading materials.</p>
      ) : (
        sessions.map((session) => (
          <div
            key={session._id}
            className="collapse collapse-arrow bg-base-100 border border-base-300"
          >
            <input type="radio" name="my-accordion-2" defaultChecked />
            <div className="collapse-title font-semibold">
              <h2 className="font-bold">{session.title}</h2>
            </div>
            <div className="collapse-content text-sm">
              <div className="card bg-base-100 shadow-md p-4 my-4">
                <form
                  onSubmit={handleSubmit(onSubmit)}
                  className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4"
                >
                  <input
                    type="hidden"
                    value={session._id}
                    {...register("sessionId")}
                  />
                  <div className="md:col-span-2">
                    <label className="label">Title</label>
                    <input
                      type="text"
                      placeholder="Material Title"
                      {...register("title", { required: true })}
                      className="input input-bordered w-full"
                    />
                    {errors.title && (
                      <p className="text-red-500">Title required</p>
                    )}
                  </div>

                  <div>
                    <label className="label">Tutor Email</label>
                    <input
                      type="email"
                      value={user.email}
                      readOnly
                      className="input input-bordered w-full"
                    />
                  </div>

                  <div>
                    <label className="label">Upload Image</label>
                    <input
                      type="file"
                      accept="image/*"
                      {...register("image", { required: true })}
                      className="file-input file-input-bordered w-full"
                    />
                  </div>

                  <div className="md:col-span-2">
                    <label className="label">Google Drive Link</label>
                    <input
                      type="url"
                      placeholder="https://drive.google.com/..."
                      {...register("driveLink", { required: true })}
                      className="input input-bordered w-full"
                    />
                  </div>

                  <button type="submit" className="btn btn-primary col-span-2">
                    ➕ Upload Material
                  </button>
                </form>
              </div>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default UploadMaterials;
