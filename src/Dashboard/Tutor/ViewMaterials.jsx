import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

import toast from "react-hot-toast";
import useAxiosSecure from "../../hook/useAxiosSecure";
import useAuth from "../../hook/useAuth";
import { imageUpload } from "../../common/ImageUpload";
import LoadingSpinner from "../../common/LoadingSpinner";

const ViewMaterials = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();
  const [editId, setEditId] = useState(null);
  const [editData, setEditData] = useState({
    title: "",
    driveLink: "",
    imageURL: "",
  });

  // Get all materials uploaded by tutor
  const { data: materials = [], isLoading } = useQuery({
    queryKey: ["materials", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/materials?email=${user.email}`);
      return res.data;
    },
  });

  // Delete material
  const deleteMaterial = useMutation({
    mutationFn: async (id) => await axiosSecure.delete(`/materials/${id}`),
    onSuccess: () => {
      toast.success("Deleted successfully");
      queryClient.invalidateQueries(["materials", user?.email]);
    },
  });

  // Update material
  const updateMaterial = useMutation({
    mutationFn: async ({ id, updated }) =>
      await axiosSecure.patch(`/materials/${id}`, updated),
    onSuccess: () => {
      toast.success("Material updated");
      setEditId(null);
      queryClient.invalidateQueries(["materials", user?.email]);
    },
  });

  const handleEdit = (material) => {
    setEditId(material._id);
    setEditData({
      title: material.title,
      driveLink: material.driveLink,
      imageURL: material.imageURL,
    });
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    const form = e.target;
    const title = form.title.value;
    const driveLink = form.driveLink.value;
    let imageURL = editData.imageURL;

    const imageFile = form.image.files[0];
    if (imageFile) {
      imageURL = await imageUpload(imageFile);
    }

    updateMaterial.mutate({
      id: editId,
      updated: { title, driveLink, imageURL },
    });
  };

  return (
    <div className="max-w-5xl mx-auto p-4 space-y-4">
      <h1 className="text-2xl font-bold mb-4">📚 Your Uploaded Materials</h1>

      {isLoading ? (
        <LoadingSpinner />
      ) : materials.length === 0 ? (
        <p>No materials uploaded yet.</p>
      ) : (
        materials.map((material) => (
          <div key={material._id} className="card bg-base-100 shadow p-4">
            {editId === material._id ? (
              <form
                onSubmit={handleUpdate}
                className="grid grid-cols-1 md:grid-cols-2 gap-4"
              >
                <div>
                  <label className="label">Title</label>
                  <input
                    defaultValue={editData.title}
                    name="title"
                    className="input input-bordered w-full"
                  />
                </div>
                <div>
                  <label className="label">Drive Link</label>
                  <input
                    defaultValue={editData.driveLink}
                    name="driveLink"
                    className="input input-bordered w-full"
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="label">Change Image (optional)</label>
                  <input
                    name="image"
                    type="file"
                    className="file-input w-full"
                  />
                </div>
                <div className="md:col-span-2 flex gap-3">
                  <button className="btn btn-sm btn-primary">💾 Save</button>
                  <button
                    type="button"
                    className="btn btn-sm"
                    onClick={() => setEditId(null)}
                  >
                    ❌ Cancel
                  </button>
                </div>
              </form>
            ) : (
              <div className="flex gap-5">
                <img
                  src={material.imageURL}
                  alt="Material"
                  className="h-40 object-cover rounded my-2 flex-1"
                />
                <div className="flex-2">
                  <h2 className="text-lg font-semibold">{material.title}</h2>

                  <p>
                    <a
                      href={material.driveLink}
                      target="_blank"
                      rel="noreferrer"
                      className="link text-blue-600"
                    >
                      🔗 View Google Drive Resource
                    </a>
                  </p>
                  <div className="flex gap-2 mt-2">
                    <button
                      className="btn btn-sm btn-info"
                      onClick={() => handleEdit(material)}
                    >
                      ✏️ Edit
                    </button>
                    <button
                      className="btn btn-sm btn-error"
                      onClick={() => deleteMaterial.mutate(material._id)}
                    >
                      🗑️ Delete
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        ))
      )}
    </div>
  );
};

export default ViewMaterials;
