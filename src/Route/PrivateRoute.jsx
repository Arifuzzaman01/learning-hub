import { Navigate, useLocation } from "react-router";
import useAuth from "../hook/useAuth";

const PrivateRoute = ({ children }) => {
  const { user, loading } = useAuth();
  const location = useLocation();
  if (loading) return <p>Loading...</p>;

  if (!user || !user?.email)
    return <Navigate state={{ from: location?.pathname }} to="/login" />;

  return children;
};

export default PrivateRoute;
