import React, { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { Link, useLocation, useNavigate } from "react-router";
import useAuth from "../hook/useAuth";
import { saveUserInDB } from "../utils/utils";
import toast from "react-hot-toast";
import SocialLogin from "./SocialLogin";

const Login = () => {
  const [eyeChange, setEyeChange] = useState(false);
  const [loading, setLoading] = useState(false);
  const { singInUser } = useAuth();
  const location = useLocation();
  const from = location?.state?.from || "/";
  const navigate = useNavigate();
  
  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    const form = e.target;
    const email = form.email.value;
    const password = form.password.value;
    const user = { email, password };
    
    try {
      const result = await singInUser(email, password);
      console.log("Login result:", result);
      
      // Save user to database
      await saveUserInDB(user);
      
      toast.success("Login Successful");
      navigate(from, { replace: true });
    } catch (err) {
      console.log("Login error:", err);
      toast.error("Login failed. Please check your credentials.");
    } finally {
      setLoading(false);
    }
  };
  
  return (
    <div className="flex justify-center items-center min-h-screen bg-base-200 py-8">
      <div className="card bg-base-100 w-full max-w-md shadow-xl" role="main" aria-labelledby="login-heading">
        <div className="card-body">
          <h1 id="login-heading" className="text-3xl font-bold text-center mb-6">Login to Your Account</h1>
          <form onSubmit={handleLogin} className="space-y-4">
            {/* email */}
            <div className="form-control">
              <label htmlFor="email" className="label">
                <span className="label-text">Email Address</span>
              </label>
              <input
                type="email"
                id="email"
                name="email"
                className="input input-bordered"
                placeholder="Enter your email"
                required
                aria-describedby="email-help"
                disabled={loading}
              />
              <div id="email-help" className="label-text-alt text-gray-500 mt-1">Enter your registered email address</div>
            </div>
            
            {/* password */}
            <div className="form-control">
              <label htmlFor="password" className="label">
                <span className="label-text">Password</span>
              </label>
              <div className="relative">
                <input
                  type={eyeChange ? "text" : "password"}
                  id="password"
                  name="password"
                  className="input input-bordered w-full"
                  placeholder="Enter your password"
                  required
                  aria-describedby="password-help"
                  disabled={loading}
                />
                <button
                  type="button"
                  onClick={() => setEyeChange(!eyeChange)}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                  aria-label={eyeChange ? "Hide password" : "Show password"}
                  disabled={loading}
                >
                  {eyeChange ? <FaEyeSlash size={20} /> : <FaEye size={20} />}
                </button>
              </div>
              <div id="password-help" className="label-text-alt text-gray-500 mt-1">Enter your password</div>
            </div>
            
            <div className="form-control">
              <a href="#forgot-password" className="link link-hover text-sm">Forgot password?</a>
            </div>
            
            <div className="form-control mt-6">
              <button 
                type="submit" 
                className={`btn btn-primary w-full ${loading ? 'loading' : ''}`}
                disabled={loading}
              >
                {loading ? 'Logging in...' : 'Login'}
              </button>
            </div>
          </form>
          
          <div className="divider my-2">OR</div>
          
          <div className="form-control">
            <SocialLogin />
          </div>
          
          <p className="text-center text-sm mt-4">
            Don't have an account?{" "}
            <Link className="link link-primary" to="/register">
              Create an account
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;