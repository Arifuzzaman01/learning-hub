import { useEffect, useState } from "react";

import { FaUserEdit } from "react-icons/fa";
import toast from "react-hot-toast";
import useAxiosSecure from "../../hook/useAxiosSecure";

const AllUsers = () => {
  const axiosSecure = useAxiosSecure();
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);

  const fetchUsers = async (searchTerm = "") => {
    setLoading(true);
    try {
      const { data } = await axiosSecure.get(`/usersForAdmin?search=${searchTerm}`);
      setUsers(data);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    fetchUsers(search);
  };

  const handleRoleUpdate = async (id, newRole) => {
    try {
      const res = await axiosSecure.patch(`/users/role/${id}`, { role: newRole });
      if (res.data.modifiedCount > 0) {
        toast.success(`✅ Role updated to ${newRole}`);
        fetchUsers(search);
      }
    } catch (error) {
      toast.error("❌ Failed to update role");
    }
  };

  return (
    <div className="max-w-5xl mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">👥 All Users</h2>

      {/* 🔍 Search bar */}
      <form onSubmit={handleSearch} className="mb-4 flex gap-2">
        <input
          type="text"
          placeholder="Search by name or email"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="input input-bordered w-full"
        />
        <button className="btn btn-primary">Search</button>
      </form>

      {/* 📋 Users table */}
      {loading ? (
        <p className="text-center">Loading users...</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="table w-full">
            <thead>
              <tr>
                <th>#</th>
                <th>Name</th>
                <th>Email</th>
                <th>Role</th>
                <th>Update Role</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user, i) => (
                <tr key={user._id}>
                  <td>{i + 1}</td>
                  <td>{user.name}</td>
                  <td>{user.email}</td>
                  <td className="capitalize">{user.role}</td>
                  <td>
                    <select
                      className="select select-sm select-bordered"
                      value={user.role}
                      onChange={(e) => handleRoleUpdate(user._id, e.target.value)}
                    >
                      <option value="student">Student</option>
                      <option value="tutor">Tutor</option>
                      <option value="admin">Admin</option>
                    </select>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default AllUsers;
