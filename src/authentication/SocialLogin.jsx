import React from "react";
import useAuth from "../hook/useAuth";
import toast from "react-hot-toast";
import { saveUserInDB } from "../utils/utils";
import { useLocation, useNavigate } from "react-router";

const SocialLogin = ({ reg }) => {
  const { googleLogin, setLoading } = useAuth();
  const location = useLocation()
   const from = location?.state?.from || "/";
  const navigate = useNavigate()
  const handleGoogleLogin = () => {
    googleLogin()
      .then(async (result) => {
        setLoading(false);
        // console.log(result);
        const userInfo = {
          name: result?.user?.displayName,
          email: result?.user?.email,
          imageURL: result?.user?.photoURL,
          role: "student",
          createdAt: new Date().toISOString(),
          lastCreatedAt: new Date().toISOString(),
        };
        await saveUserInDB(userInfo);
        toast.success("Google logIn Successful");
        // 
        navigate(from, {replace: true})
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <div>
      {/* Google */}
      <button
        onClick={handleGoogleLogin}
        className={`btn btn-primary   w-full ${reg && "rounded-tl-full"}`}
      >
        Google LogIn
      </button>
    </div>
  );
};

export default SocialLogin;
