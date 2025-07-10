import React from "react";
import { Toaster } from "react-hot-toast";
import {
  FaBookOpen,
  FaBookReader,
  FaChalkboardTeacher,
  FaClipboardList,
  FaFolderOpen,
  FaHome,
  FaRegStickyNote,
} from "react-icons/fa";
import { NavLink, Outlet } from "react-router";
import useRole from "../hook/useRole";

const DashboardLayout = () => {
  const { role, isLoading } = useRole();
  if (isLoading) return <p>Loading...</p>;
  return (
    <div className="drawer lg:drawer-open bg-base-100 min-h-screen">
      {/* Sidebar toggle input for mobile */}
      <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />

      {/* Main content */}
      <div className="drawer-content flex flex-col">
        {/* Top Navbar */}
        <div className="w-full navbar bg-base-200 shadow-md px-4">
          <div className="flex-none lg:hidden">
            <label htmlFor="my-drawer-2" className="btn btn-square btn-ghost">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </label>
          </div>
          <div className="flex-1 text-xl font-semibold">Dashboard</div>
        </div>

        {/* Page content here */}
        <div className="p-6">
          <Outlet />
        </div>
      </div>

      {/* Sidebar */}
      <div className="drawer-side">
        <label htmlFor="my-drawer-2" className="drawer-overlay"></label>
        <aside className="w-80 min-h-full bg-base-200 p-4">
          <h2 className="text-2xl font-bold mb-6 text-center">
            📚 Study Panel
          </h2>
          <ul className="menu space-y-2">
            <li>
              <NavLink
                to="/"
                className={({ isActive }) =>
                  isActive ? "active font-bold text-primary" : undefined
                }
              >
                <FaHome size={20} /> Home
              </NavLink>
            </li>
            {/* Admin */}
            {role === "admin" && (
              <>
                <li>
                  <NavLink
                    to="/dashboard/allUsers"
                    className={({ isActive }) =>
                      isActive ? "active font-bold text-primary" : undefined
                    }
                  >
                    👥 All Users
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/dashboard/all-study-sessions"
                    className={({ isActive }) =>
                      isActive
                        ? "active font-bold text-primary flex items-center gap-2"
                        : "flex items-center gap-2"
                    }
                  >
                    <FaChalkboardTeacher />
                    All Study Sessions
                  </NavLink>
                </li>

                <li>
                  <NavLink
                    to="/dashboard/admin-all-materials"
                    className={({ isActive }) =>
                      isActive
                        ? "active font-bold text-primary flex items-center gap-2"
                        : "flex items-center gap-2"
                    }
                  >
                    <FaFolderOpen />
                    All Materials
                  </NavLink>
                </li>
              </>
            )}
            {/* TUTOR */}
            {role === "tutor" && (
              <>
                <li>
                  <NavLink
                    to="createStudy"
                    className={({ isActive }) =>
                      isActive ? "active font-bold text-primary" : undefined
                    }
                  >
                    ➕ Create Study Session
                  </NavLink>
                </li>

                <li>
                  <NavLink
                    to="/dashboard/my-study-sessions"
                    className={({ isActive }) =>
                      isActive ? "active font-bold text-primary" : undefined
                    }
                  >
                    📋 My All Study Sessions
                  </NavLink>
                </li>

                <li>
                  <NavLink
                    to="/dashboard/upload-materials"
                    className={({ isActive }) =>
                      isActive ? "active font-bold text-primary" : undefined
                    }
                  >
                    📁 Upload Materials
                  </NavLink>
                </li>

                <li>
                  <NavLink
                    to="/dashboard/view-materials"
                    className={({ isActive }) =>
                      isActive ? "active font-bold text-primary" : undefined
                    }
                  >
                    📚 View All Materials
                  </NavLink>
                </li>
              </>
            )}
            {/* <li>
              <NavLink
                to="reviews"
                className={({ isActive }) =>
                  isActive ? "active font-bold text-primary" : undefined
                }
              >
                ⭐ Reviews
              </NavLink>
            </li> */}
            {/* student */}
            {role === "student" && (
              <>
                <li>
                  <NavLink
                    to="/dashboard/booked-sessions"
                    className={({ isActive }) =>
                      isActive
                        ? "active font-bold text-primary flex items-center gap-2"
                        : "flex items-center gap-2"
                    }
                  >
                    <FaBookReader />
                    View Booked Sessions
                  </NavLink>
                </li>

                <li>
                  <NavLink
                    to="/dashboard/create-note"
                    className={({ isActive }) =>
                      isActive
                        ? "active font-bold text-primary flex items-center gap-2"
                        : "flex items-center gap-2"
                    }
                  >
                    <FaRegStickyNote />
                    Create Note
                  </NavLink>
                </li>

                <li>
                  <NavLink
                    to="/dashboard/personal-notes"
                    className={({ isActive }) =>
                      isActive
                        ? "active font-bold text-primary flex items-center gap-2"
                        : "flex items-center gap-2"
                    }
                  >
                    <FaClipboardList />
                    Manage Personal Notes
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/dashboard/view-student-materials"
                    className={({ isActive }) =>
                      isActive
                        ? "active font-bold text-primary flex items-center gap-2"
                        : "flex items-center gap-2"
                    }
                  >
                    <FaBookOpen />
                    View Study Materials
                  </NavLink>
                </li>
              </>
            )}
          </ul>
        </aside>
        <Toaster position="top-right" reverseOrder={false} />
      </div>
    </div>
  );
};

export default DashboardLayout;
