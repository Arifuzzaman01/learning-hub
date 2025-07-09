import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import toast from "react-hot-toast";
import { FaTrash, FaEdit } from "react-icons/fa";
import useAxiosSecure from "../../hook/useAxiosSecure";
import useAuth from "../../hook/useAuth";


const ManageNotes = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();
  const [editNote, setEditNote] = useState(null);

  const { data: notes = [], isLoading } = useQuery({
    queryKey: ["notes", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/notes?email=${user.email}`);
      return res.data;
    },
  });

  const deleteNote = useMutation({
    mutationFn: async (id) => {
      await axiosSecure.delete(`/notes/${id}`);
    },
    onSuccess: () => {
      toast.success("🗑️ Note deleted");
      queryClient.invalidateQueries(["notes", user.email]);
    },
  });

  const updateNote = useMutation({
    mutationFn: async ({ id, title, description }) => {
      await axiosSecure.patch(`/notes/${id}`, { title, description });
    },
    onSuccess: () => {
      toast.success("✅ Note updated");
      queryClient.invalidateQueries(["notes", user.email]);
      setEditNote(null);
    },
  });

  const handleUpdate = (e) => {
    e.preventDefault();
    const title = e.target.title.value;
    const description = e.target.description.value;
    updateNote.mutate({ id: editNote._id, title, description });
  };

  if (isLoading) return <p className="text-center py-10">Loading...</p>;

  return (
    <div className="max-w-4xl mx-auto p-4 space-y-4">
      <h2 className="text-2xl font-bold mb-4">📚 Manage Your Notes</h2>

      {notes.map((note) => (
        <div key={note._id} className="card bg-base-100 shadow-md p-4">
          {editNote && editNote._id === note._id ? (
            <form onSubmit={handleUpdate} className="space-y-2">
              <input
                name="title"
                defaultValue={editNote.title}
                className="input input-bordered w-full"
              />
              <textarea
                name="description"
                defaultValue={editNote.description}
                className="textarea textarea-bordered w-full"
              ></textarea>
              <div className="flex gap-2">
                <button type="submit" className="btn btn-primary btn-sm">
                  💾 Save
                </button>
                <button onClick={() => setEditNote(null)} className="btn btn-ghost btn-sm">
                  ❌ Cancel
                </button>
              </div>
            </form>
          ) : (
            <>
              <h3 className="text-lg font-bold">{note.title}</h3>
              <p className="mb-2">{note.description}</p>
              <div className="flex gap-4">
                <button
                  onClick={() => setEditNote(note)}
                  className="btn btn-sm btn-info flex items-center gap-1"
                >
                  <FaEdit /> Edit
                </button>
                <button
                  onClick={() => deleteNote.mutate(note._id)}
                  className="btn btn-sm btn-error flex items-center gap-1"
                >
                  <FaTrash /> Delete
                </button>
              </div>
            </>
          )}
        </div>
      ))}
    </div>
  );
};

export default ManageNotes;
