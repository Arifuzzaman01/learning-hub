import React, { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { Link, useNavigate } from "react-router";
import { imageUpload } from "../common/ImageUpload";
import useAuth from "../hook/useAuth";
import useAxiosSecure from "../hook/useAxiosSecure";
import SocialLogin from "./SocialLogin";
import toast from "react-hot-toast";

const Register = () => {
  const [eyeChange, setEyeChange] = useState(false);
  const [loading, setLoading] = useState(false);
  const { updateUser, signUpUser } = useAuth();
  const navigate = useNavigate()
  const axiosSecure = useAxiosSecure();
  
  const handleRegister = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    const form = e.target;
    const name = form.name.value;
    const photoUrl = form?.photo?.files[0];
    const email = form.email.value;
    const password = form.password.value;
    const role = form.role.value;
    
    try {
      // Upload profile image
      const imageURL = await imageUpload(photoUrl);
      console.log("Image uploaded:", imageURL);

      const userInfo = {
        name,
        email,
        imageURL,
        role,
        createdAt: new Date().toISOString(),
        lastLoggedAt: new Date().toISOString(),
      };
      
      // Create user account
      await signUpUser(email, password);
      
      // Add user to database
      const { data } = await axiosSecure.post("/users", userInfo);
      console.log("User saved to database:", data);
      
      // Update user profile
      await updateUser({
        displayName: name,
        photoURL: imageURL,
      });
      
      toast.success("Registration Successful");
      navigate("/");
    } catch (error) {
      console.log("Registration error:", error);
      toast.error("Registration failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-base-200 py-8">
      <div className="card bg-base-100 w-full max-w-2xl shadow-xl" role="main" aria-labelledby="register-heading">
        <div className="card-body">
          <h1 id="register-heading" className="text-3xl font-bold text-center mb-6">Create Your Account</h1>
          <form onSubmit={handleRegister} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* name */}
              <div className="form-control">
                <label htmlFor="name" className="label">
                  <span className="label-text">Full Name</span>
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  className="input input-bordered"
                  placeholder="Enter your full name"
                  required
                  aria-describedby="name-help"
                  disabled={loading}
                />
                <div id="name-help" className="label-text-alt text-gray-500 mt-1">Enter your full name</div>
              </div>
              
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
                <div id="email-help" className="label-text-alt text-gray-500 mt-1">Enter your email address</div>
              </div>
              
              {/* photo */}
              <div className="form-control">
                <label htmlFor="photo" className="label">
                  <span className="label-text">Profile Picture</span>
                </label>
                <input
                  type="file"
                  id="photo"
                  name="photo"
                  accept="image/*"
                  className="file-input file-input-bordered w-full"
                  required
                  aria-describedby="photo-help"
                  disabled={loading}
                />
                <div id="photo-help" className="label-text-alt text-gray-500 mt-1">Upload a profile picture</div>
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
                    placeholder="Create a password"
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
                <div id="password-help" className="label-text-alt text-gray-500 mt-1">Create a strong password</div>
              </div>
              
              {/* role */}
              <div className="form-control">
                <label htmlFor="role" className="label">
                  <span className="label-text">Role</span>
                </label>
                <select
                  id="role"
                  name="role"
                  required
                  className="select select-bordered w-full"
                  aria-describedby="role-help"
                  disabled={loading}
                >
                  <option value="student">Student</option>
                </select>
                <div id="role-help" className="label-text-alt text-gray-500 mt-1">Select your role</div>
              </div>
            </div>
            
            <div className="form-control mt-6">
              <button 
                type="submit" 
                className={`btn btn-primary w-full ${loading ? 'loading' : ''}`}
                disabled={loading}
              >
                {loading ? 'Creating Account...' : 'Create Account'}
              </button>
            </div>
          </form>
          
          <div className="divider my-2">OR</div>
          
          <div className="form-control">
            <SocialLogin reg={"reg"} />
          </div>
          
          <p className="text-center text-sm mt-4">
            Already have an account?{" "}
            <Link to="/login" className="link link-primary">
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;