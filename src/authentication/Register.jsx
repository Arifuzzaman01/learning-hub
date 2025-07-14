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
  const { updateUser, signUpUser } = useAuth();
  // console.log(user);
  const navigate = useNavigate()
  const axiosSecure = useAxiosSecure();
  const handleRegister = async (e) => {
    e.preventDefault();
    const form = e.target;
    const name = form.name.value;
    const photoUrl = form?.photo?.files[0];
    const email = form.email.value;
    const password = form.password.value;
    const role = form.role.value;
    const imageURL = await imageUpload(photoUrl);
    console.log(imageURL);

    const userInfo = {
      name,
      email,

      imageURL,
      role,
      createdAt: new Date().toISOString(),
      lastLoggedAt: new Date().toISOString(),
    };
    console.log(userInfo);
    signUpUser(email, password)
      .then(async (result) => {
        console.log(result.user);
        //add user in database
        const { data } = await axiosSecure.post("/users", userInfo);
        console.log(data);
        // Update user profile
        updateUser({
          displayName: name,
          photoURL: imageURL,
        }).then(() => {
          toast.success("Register Successful")
          navigate("/")
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className="flex justify-center items-center h-[calc(100vh-64px)]">
      <div className="card bg-base-100 w-full max-w-3/5 shrink-0 shadow-2xl ">
        <div className="card-body">
          <h1 className="text-3xl font-bold">Please Register here</h1>
          {/* <img src={imgLink} alt="imgbb" /> */}
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
                accept="image/*"
                className="input cursor-pointer file-input file-input-bordered"
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
                className="absolute top-8 z-10 right-6 "
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
              </select>
            </div>
            <div className="flex mt-4">
              <button
                type="submit"
                className="btn btn-neutral  flex-1 rounded-br-full"
              >
                Login
              </button>
              <div className="flex-1 rounded-tl-full w-full">
                <SocialLogin reg={"reg"} />
              </div>
            </div>
          </form>

          <p className="text-center">
            Already have an account? Please{" "}
            <Link to="/login" className="text-blue-600 underline">
              Register
            </Link>{" "}
            here.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
