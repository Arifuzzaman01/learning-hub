import React, { useCallback } from "react";
import { Link, NavLink } from "react-router";
import useAuth from "../hook/useAuth";
import toast from "react-hot-toast";
// import logo from "../assets/hub-logo.png"
import Logo from "../common/Logo";

const Navbar = React.memo(() => {
  const { user, logOutUser } = useAuth();
  
  const handleLogOut = useCallback(() => {
    logOutUser()
      .then((result) => {
        toast.success("LogOut Successful");
      })
      .catch((err) => {
        console.log(err);
      });
  }, [logOutUser]);

  const link = (
    <>
      <NavLink className="mx-2 hover:text-blue-600 font-bold" to="/">
        Home
      </NavLink>
      <NavLink className="mx-2 hover:text-blue-600 font-bold" to="/all-study-session">
        All Study Session
      </NavLink>
      <NavLink className="mx-2 hover:text-blue-600 font-bold" to="/all-tutor-page">
        All Tutor
      </NavLink>
      <NavLink className="mx-2 hover:text-blue-600 font-bold" to="/dashboard">
        Dashboard
      </NavLink>
    </>
  );
  
  return (
    <div className="navbar bg-base-100 shadow-sm sticky top-0 z-20" role="navigation" aria-label="Main navigation">
      <div className="navbar-start">
        <div className="dropdown">
          <button 
            tabIndex={0} 
            className="btn btn-ghost lg:hidden"
            aria-label="Open menu"
            aria-expanded="false"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />
            </svg>
          </button>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
            role="menu"
          >
            {link}
          </ul>
        </div>
        <div className="w-32">
          <Logo />
        </div>
      </div>
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1" role="menubar">
          {link}
        </ul>
      </div>
      <div className="navbar-end">
        <div className="mr-2" >
          {user && (
            <img
              className="w-12 h-12 p-1 rounded-full"
              src={user?.photoURL}
              alt={`Profile picture of ${user?.displayName || user?.email}`}
              title={user?.email}
            />
          )}
        </div>
        {user ? (
          <Link 
            onClick={handleLogOut} 
            to="/login" 
            className="btn btn-primary"
            aria-label="Log out"
          >
            LogOut
          </Link>
        ) : (
          <Link 
            to="/login" 
            className="btn btn-primary"
            aria-label="Log in"
          >
            LogIn
          </Link>
        )}
      </div>
    </div>
  );
});

export default Navbar;