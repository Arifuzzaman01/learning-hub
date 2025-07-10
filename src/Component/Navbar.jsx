import React from "react";
import { Link, NavLink } from "react-router";
import useAuth from "../hook/useAuth";
import toast from "react-hot-toast";

const Navbar = () => {
  const { user, logOutUser } = useAuth();
  // console.log(user);
  // console.log(user);
  const handleLogOut = () => {
    logOutUser()
      .then((result) => {
        toast.success("LogOut Successful");
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const link = (
    <>
      <NavLink className="mx-2" to="/">
        Home
      </NavLink>
      <NavLink className="mx-2" to="/all-study-session">
        All Study Session
      </NavLink>
      <NavLink className="mx-2" to="/dashboard">
        Dashboard
      </NavLink>
    </>
  );
  return (
    <div className="navbar bg-base-100 shadow-sm sticky top-0 z-20">
      <div className="navbar-start">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              {" "}
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />{" "}
            </svg>
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
          >
            {link}
          </ul>
        </div>
        <a className="btn btn-ghost text-xl">daisyUI</a>
      </div>
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1">{link}</ul>
      </div>
      <div className="navbar-end">
        <div className="mr-2" >
          {user && (
            <img
              className="w-12 h-12 p-1 rounded-full"
              src={user?.photoURL}
              alt="profile"
            />
          )}
        </div>
        {user ? (
          <Link onClick={handleLogOut} to="/login" className="btn btn-primary">
            LogOut
          </Link>
        ) : (
          <Link to="/login" className="btn btn-primary">
            LogIn
          </Link>
        )}
      </div>
    </div>
  );
};

export default Navbar;
