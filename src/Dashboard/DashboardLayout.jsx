import React from "react";
import { NavLink, Outlet } from 'react-router';

const DashboardLayout = () => {
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
          <h2 className="text-2xl font-bold mb-6 text-center">📚 Study Panel</h2>
          <ul className="menu space-y-2">
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
                to="mySessions"
                className={({ isActive }) =>
                  isActive ? "active font-bold text-primary" : undefined
                }
              >
                📅 My Sessions
              </NavLink>
            </li>
            <li>
              <NavLink
                to="allUsers"
                className={({ isActive }) =>
                  isActive ? "active font-bold text-primary" : undefined
                }
              >
                👥 All Users
              </NavLink>
            </li>
            <li>
              <NavLink
                to="reviews"
                className={({ isActive }) =>
                  isActive ? "active font-bold text-primary" : undefined
                }
              >
                ⭐ Reviews
              </NavLink>
            </li>
          </ul>
        </aside>
      </div>
    </div>
  );
};

export default DashboardLayout;
