import React, { useContext } from "react";
import { AuthContext } from "../provider/AuthContext";

const useAuth = () => {
  const authContext = useContext(AuthContext);
  return authContext;
};

export default useAuth;
