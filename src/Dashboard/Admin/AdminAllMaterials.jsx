import { useQuery } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import { FaTrashAlt, FaExternalLinkAlt, FaDownload } from "react-icons/fa";
import useAxiosSecure from "../../hook/useAxiosSecure";
import Swal from "sweetalert2";

const AdminAllMaterials = () => {
  const axiosSecure = useAxiosSecure();

  const {
    data: materials = [],
    refetch,
    isLoading,
  } = useQuery({
    queryKey: ["admin-materials"],
    queryFn: async () => {
      const res = await axiosSecure.get("/admin/materials");
      return res.data;
    },
  });

  const handleDelete = async (id) => {
  const result = await Swal.fire({
    title: "Are you sure?",
    text: "You won't be able to revert this!",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#d33",
    cancelButtonColor: "#3085d6",
    confirmButtonText: "Yes, delete it!",
  });

  if (result.isConfirmed) {
    try {
      const res = await axiosSecure.delete(`/admin/materials/${id}`);
      if (res.data.deletedCount > 0) {
        Swal.fire("Deleted!", "The material has been removed.", "success");
        refetch();
      } else {
        Swal.fire("Error!", "Failed to delete material.", "error");
      }
    } catch (error) {
      Swal.fire("Error!", "Something went wrong.", "error");
    }
  }
};

  if (isLoading)
    return <p className="text-center py-10">Loading materials...</p>;

  return (
    <div className="p-5 max-w-7xl mx-auto">
      <h2 className="text-2xl font-bold mb-6">
        📦 All Uploaded Study Materials
      </h2>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {materials.map((item) => (
          <div
            key={item._id}
            className="bg-white rounded-xl shadow-md p-4 space-y-2 relative"
          >
            <img
              src={item.image}
              alt={item.title}
              className="w-full h-48 object-cover rounded-md"
            />

            <h3 className="text-lg font-semibold">{item.title}</h3>
            <p className="text-sm text-gray-600">Tutor: {item.tutorEmail}</p>

            <div className="flex gap-4 text-blue-600 items-center text-sm mt-2">
              <a
                href={item.driveLink}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:underline flex items-center gap-1"
              >
                <FaExternalLinkAlt /> View Link
              </a>
              <a
                href={item.image}
                download
                className="hover:underline flex items-center gap-1"
              >
                <FaDownload /> Download
              </a>
            </div>

            <button
              onClick={() => handleDelete(item._id)}
              className="btn btn-sm btn-error absolute top-2 right-2"
              title="Delete Material"
            >
              <FaTrashAlt />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminAllMaterials;
