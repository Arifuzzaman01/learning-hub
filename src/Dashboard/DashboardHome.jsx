import React from "react";

import {
  FaUserGraduate,
  FaChalkboardTeacher,
  FaUserShield,
} from "react-icons/fa";
import useAuth from "../hook/useAuth";

const DashboardHome = () => {
  const { user } = useAuth(); // assuming your hook provides `user` and `role`
const role = user?.role
  const getRoleIcon = () => {
    switch (role) {
      case "student":
        return <FaUserGraduate className="text-3xl text-primary" />;
      case "tutor":
        return <FaChalkboardTeacher className="text-3xl text-secondary" />;
      case "admin":
        return <FaUserShield className="text-3xl text-accent" />;
      default:
        return null;
    }
  };

  return (
    <div className="max-w-4xl mx-auto py-10 px-4">
      <div className="bg-base-200 rounded-xl shadow-lg p-8 text-center space-y-4">
        <div className="flex justify-center">{getRoleIcon()}</div>
        <h1 className="text-3xl font-bold text-primary">
          Welcome, {user?.displayName || "User"}!
        </h1>
        <p className="text-lg text-gray-500">
          <span className="capitalize font-semibold text-secondary">
            {role}
          </span>
          . <br />
          This is your personalized dashboard. Use the sidebar to explore your
          features.
        </p>
      </div>
    </div>
  );
};

export default DashboardHome;
