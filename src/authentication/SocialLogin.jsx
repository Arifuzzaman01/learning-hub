import React, { useCallback, useState } from "react";
import useAuth from "../hook/useAuth";
import toast from "react-hot-toast";
import { saveUserInDB } from "../utils/utils";
import { useLocation, useNavigate } from "react-router";

const SocialLogin = ({ reg }) => {
  const { googleLogin } = useAuth();
  const location = useLocation()
  const from = location?.state?.from || "/";
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false);
  
  const handleGoogleLogin = useCallback(async () => {
    setLoading(true);
    try {
      const result = await googleLogin();
      
      // Prepare user info
      const userInfo = {
        name: result?.user?.displayName,
        email: result?.user?.email,
        imageURL: result?.user?.photoURL,
        role: "student",
        createdAt: new Date().toISOString(),
        lastLoggedAt: new Date().toISOString(),
      };
      
      // Save user to database
      await saveUserInDB(userInfo);
      
      toast.success("Google login successful");
      navigate(from, {replace: true});
    } catch (err) {
      console.log("Google login error:", err);
      toast.error("Google login failed. Please try again.");
    } finally {
      setLoading(false);
    }
  }, [googleLogin, navigate, from]);

  return (
    <div>
      {/* Google */}
      <button
        onClick={handleGoogleLogin}
        className={`btn btn-primary w-full ${reg && "rounded-tl-full"} ${loading ? 'loading' : ''}`}
        disabled={loading}
      >
        {loading ? 'Logging in with Google...' : 'Google Login'}
      </button>
    </div>
  );
};

export default React.memo(SocialLogin);