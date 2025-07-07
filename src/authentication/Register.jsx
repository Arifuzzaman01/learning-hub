import React, { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { Link } from "react-router";

const Register = () => {
  const [eyeChange, setEyeChange] = useState(false);
  const handleRegister = (e) => {
    e.preventDefault();
    const form = e.target;
    const name = form.name.value;
    const photo = form.photo.files[0];
    const email = form.email.value;
    const password = form.password.value;
    const role = form.role.value;
    const userInfo = {
      name,
      photo,
      email,
      password,
      role,
    };
    console.log(userInfo);
  };
  return (
    <div className="flex justify-center items-center h-[calc(100vh-64px)]">
      <div className="card bg-base-100 w-full max-w-3/5 shrink-0 shadow-2xl ">
        <div className="card-body">
          <h1 className="text-3xl font-bold">Please Register here</h1>
          <form
            onSubmit={handleRegister}
            className="fieldset md:grid grid-cols-2 gap-5"
          >
            {/* name */}
            <div>
              <label className="label">Your Full Name</label>
              <input
                type="text"
                name="name"
                className="input"
                placeholder="your full name"
                required
              />
            </div>
            {/* email */}
            <div>
              {" "}
              <label className="label">Email</label>
              <input
                type="email"
                name="email"
                className="input"
                placeholder="Email"
                required
              />
            </div>
            {/* photo */}
            <div>
              <label className="label">Choses Your Profile Pic</label>

              <input
                type="file"
                name="photo"
                className="input cursor-pointer"
                required
              />
            </div>

            <div className="relative">
              {/* password */}
              <label className="label">Password</label>
              <input
                type={eyeChange ? "text" : "password"}
                name="password"
                className="input"
                placeholder="Password"
                required
              />
              <div
                onClick={() => setEyeChange(!eyeChange)}
                className="absolute top-8 z-10 right-3"
              >
                {eyeChange ? <FaEyeSlash size={16} /> : <FaEye size={16} />}
              </div>
            </div>
            {/* role */}
            <div>
              {" "}
              <label className="label">Select a Role</label> <br />
              <select
                name="role"
                required
                className="p-[10px] border mr-3 border-gray-300 rounded-sm w-full"
              >
                <option value="student">Student</option>
                <option value="tutor">Tutor</option>
                <option value="admin">Admin</option>
              </select>
            </div>
            <div className="flex mt-4">
              <button
                type="submit"
                className="btn btn-neutral  flex-1 rounded-br-full"
              >
                Login
              </button>
              <button
                type="button"
                className="btn btn-primary flex-1 rounded-tl-full"
              >
                Social Login
              </button>
            </div>
          </form>

          <p className="text-center">
            Already have an account? Please{" "}
            <Link to="/login" className="text-blue-600 underline">
              Login
            </Link>{" "}
            here.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
