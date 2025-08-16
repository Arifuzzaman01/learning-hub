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
import { IoMdArrowRoundBack } from "react-icons/io";
import { Link, NavLink, Outlet } from "react-router";
import useRole from "../hook/useRole";
import Logo from "../common/Logo";
import LoadingSpinner from "../common/LoadingSpinner";
import Profile from "./Profile";
import useAuth from "../hook/useAuth";

const DashboardLayout = () => {
  const { role, isLoading } = useRole();
  const {user}= useAuth()
  // console.log(user);
  if (isLoading) return <LoadingSpinner />;
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
          <div className="flex-1 text-xl font-semibold uppercase">{role} Dashboard</div>
        </div>

        {/* Page content here */}
        <div className="p-6">
          <Outlet />
        </div>
      </div>

      {/* Sidebar */}
      <div className="drawer-side">
        <label htmlFor="my-drawer-2" className="drawer-overlay"></label>
        <aside className="w-80 min-h-full bg-base-200 p-4 flex flex-col justify-between">
          <div>
            <Link to="/" className="w-32 font-bold mb-6 text-center">
            <div className="w-40">
              <Logo></Logo>
            </div>
          </Link>
          <ul className="menu space-y-2">
            
            <li>
              <NavLink
                to="/dashboard"
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
          </div>
          <div>
            <Link className="flex gap-3 items-center ml-4 mb-5 hover:bg-white p-2 rounded-md hover:scale-105 duration-100 border border-gray-400" to="/dashboard/profile">
            <img className="w-10 rounded-full border-2 border-blue-500" src={user?.photoURL} alt="" />
            Profile
            </Link>
            
          </div>
        </aside>
        <Toaster position="top-right" reverseOrder={false} />
      </div>
    </div>
  );
};

export default DashboardLayout;
