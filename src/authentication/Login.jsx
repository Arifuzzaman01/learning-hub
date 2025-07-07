import React, { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { Link } from "react-router";

const Login = () => {
  const [eyeChange,setEyeChange] = useState(false)
  const handleLogin = (e) => {
    e.preventDefault();
    const form = e.target;
    const email = form.email.value;
    const password = form.password.value;
    console.log(email, password);
  };
  return (
    <div className="flex justify-center items-center h-screen">
      <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl ">
        <div className="card-body">
          <h1 className="text-3xl font-bold">Please LogIn here</h1>
          <form onSubmit={handleLogin} className="fieldset">
            {/* email */}
            <label className="label">Email</label>
            <input
              type="email"
              name="email"
              className="input"
              placeholder="Email"
              required
            />
            {/* password */}
            <label className="label">Password</label>
            <div className="relative">
              <input
                type={eyeChange ? "text":"password"}
                name="password"
                className="input"
                placeholder="Password"
                required
              />
              <div onClick={()=> setEyeChange(!eyeChange)} className="absolute top-2 right-6">
                 {eyeChange ? <FaEyeSlash size={16} /> : <FaEye size={16} />}
             </div>
            </div>
            <div>
              <a className="link link-hover">Forgot password?</a>
            </div>
            <button type="submit" className="btn btn-neutral mt-4">
              Login
            </button>
            <p>
              You have'nt an account? Please Create{" "}
              <Link className="text-blue-600 underline" to="/register">
                an account
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
