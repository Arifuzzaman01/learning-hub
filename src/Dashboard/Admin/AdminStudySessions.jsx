import { useEffect, useState } from "react";

import toast from "react-hot-toast";
import { FaCheck, FaTimes, FaEdit, FaTrash } from "react-icons/fa";
import { Dialog } from "@headlessui/react";
import useAxiosSecure from "../../hook/useAxiosSecure";
const AdminStudySessions = () => {
  const axiosSecure = useAxiosSecure();
  const [sessions, setSessions] = useState([]);
  const [approveModal, setApproveModal] = useState(null); // session data
  const [isUpdate, setIsUpdate] = useState(null);
  const [feeType, setFeeType] = useState("free");
  const [amount, setAmount] = useState(0);
  const [updateSession, setUpdateSession] = useState(null); // holds session object
  const [updateFeeType, setUpdateFeeType] = useState("free");
  const [updateAmount, setUpdateAmount] = useState(0);

  const fetchSessions = async () => {
    const { data } = await axiosSecure.get("/all-sessions");
    setSessions(data);
  };

  useEffect(() => {
    fetchSessions();
  }, []);

  const handleApprove = async () => {
    try {
      const res = await axiosSecure.patch(
        `/session/approve/${approveModal._id}`,
        {
          fee: feeType === "paid" ? amount : 0,
        }
      );
      if (res.data.modifiedCount > 0) {
        toast.success("Session approved");
        setApproveModal(null);
        fetchSessions();
      }
    } catch (err) {
      toast.error("Approval failed");
    }
  };

  const handleReject = async (id) => {
    const confirm = window.confirm("Are you sure to reject this session?");
    if (!confirm) return;

    try {
      const res = await axiosSecure.patch(`/session/reject/${id}`);
      if (res.data.modifiedCount > 0) {
        toast.success("Session rejected");
        fetchSessions();
      }
    } catch (err) {
      toast.error("Rejection failed");
    }
  };

  const handleDelete = async (id) => {
    const confirm = window.confirm("Are you sure to delete this session?");
    if (!confirm) return;

    try {
      const res = await axiosSecure.delete(`/session/${id}`);
      if (res.data.deletedCount > 0) {
        toast.success("Session deleted");
        fetchSessions();
      }
    } catch (err) {
      toast.error("Delete failed");
    }
  };
  const handleUpdateSubmit = async () => {
    try {
      const res = await axiosSecure.patch(
        `/session/update/${updateSession._id}`,
        {
          fee: updateFeeType === "paid" ? updateAmount : 0,
        }
      );

      if (res.data.modifiedCount > 0) {
        toast.success("Session updated successfully");
        setUpdateSession(null);
        fetchSessions();
      }
    } catch (err) {
      toast.error("Failed to update session");
    }
  };
  const handleUpdate = (session) => {
    setUpdateSession(session);
    setUpdateFeeType(session.fee > 0 ? "paid" : "free");
    setUpdateAmount(session.fee || 0);
  };

  return (
    <div className="max-w-6xl mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">📋 All Study Sessions</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {sessions.map((session) => (
          <div
            key={session._id}
            className="card bg-base-100 shadow-md p-4 space-y-2"
          >
            <h3 className="text-xl font-semibold">{session.title}</h3>
            <p>
              <span className="font-semibold">Tutor:</span> {session.tutorName}
            </p>
            <p>
              <span className="font-semibold">Status:</span>
              <span
                className={`ml-2 badge ${
                  session.status === "approved"
                    ? "badge-success"
                    : session.status === "pending"
                    ? "badge-warning"
                    : "badge-error"
                }`}
              >
                {session.status}
              </span>
            </p>

            {session.status === "pending" && (
              <div className="flex gap-2 mt-2">
                <button
                  onClick={() => setApproveModal(session)}
                  className="btn btn-success btn-sm flex-1"
                >
                  <FaCheck /> Approve
                </button>
                <button
                  onClick={() => handleReject(session._id)}
                  className="btn btn-error btn-sm flex-1"
                >
                  <FaTimes /> Reject
                </button>
              </div>
            )}

            {session.status === "approved" && (
              <div className="flex gap-2 mt-2">
                <button
                  onClick={() => handleUpdate(session)}
                  className="btn btn-sm btn-info flex-1"
                >
                  <FaEdit /> Update
                </button>

                <button
                  onClick={() => handleDelete(session._id)}
                  className="btn btn-sm btn-outline btn-error flex-1"
                >
                  <FaTrash /> Delete
                </button>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Modal for Approve Session */}
      <Dialog
        open={!!approveModal}
        onClose={() => setApproveModal(null)}
        className="relative z-50"
      >
        <div className="fixed inset-0 bg-black/40" aria-hidden="true" />
        <div className="fixed inset-0 flex items-center justify-center p-4">
          <Dialog.Panel className="w-full max-w-md bg-white p-6 rounded-lg shadow space-y-4">
            <Dialog.Title className="text-lg font-bold">
              Approve: {approveModal?.title}
            </Dialog.Title>

            <div>
              <label className="label">Is this session Free or Paid?</label>
              <select
                value={feeType}
                onChange={(e) => setFeeType(e.target.value)}
                className="select select-bordered w-full"
              >
                <option value="free">Free</option>
                <option value="paid">Paid</option>
              </select>
            </div>

            {feeType === "paid" && (
              <div>
                <label className="label">Enter Registration Fee</label>
                <input
                  type="number"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  className="input input-bordered w-full"
                  placeholder="Amount"
                />
              </div>
            )}

            <div className="flex justify-end gap-2">
              <button className="btn" onClick={() => setApproveModal(null)}>
                Cancel
              </button>
              <button className="btn btn-primary" onClick={handleApprove}>
                Approve Now
              </button>
            </div>
          </Dialog.Panel>
        </div>
      </Dialog>
      {/* update modal */}
      <Dialog
        open={!!updateSession}
        onClose={() => setUpdateSession(null)}
        className="relative z-50"
      >
        <div className="fixed inset-0 bg-black/40" aria-hidden="true" />
        <div className="fixed inset-0 flex items-center justify-center p-4">
          <Dialog.Panel className="w-full max-w-md bg-white p-6 rounded-lg shadow space-y-4">
            <Dialog.Title className="text-lg font-bold">
              Update: {updateSession?.title}
            </Dialog.Title>

            <div>
              <label className="label">Is this session Free or Paid?</label>
              <select
                value={updateFeeType}
                onChange={(e) => setUpdateFeeType(e.target.value)}
                className="select select-bordered w-full"
              >
                <option value="free">Free</option>
                <option value="paid">Paid</option>
              </select>
            </div>

            {updateFeeType === "paid" && (
              <div>
                <label className="label">Enter Registration Fee</label>
                <input
                  type="number"
                  value={updateAmount}
                  onChange={(e) => setUpdateAmount(e.target.value)}
                  className="input input-bordered w-full"
                  placeholder="Amount"
                />
              </div>
            )}

            <div className="flex justify-end gap-2">
              <button className="btn" onClick={() => setUpdateSession(null)}>
                Cancel
              </button>
              <button className="btn btn-primary" onClick={handleUpdateSubmit}>
                Update Now
              </button>
            </div>
          </Dialog.Panel>
        </div>
      </Dialog>
    </div>
  );
};

export default AdminStudySessions;
