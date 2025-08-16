import { Navigate, useLocation } from "react-router";
import useAuth from "../hook/useAuth";
import LoadingSpinner from "../common/LoadingSpinner";

const PrivateRoute = ({ children }) => {
  const { user, loading } = useAuth();
  const location = useLocation();
  if (loading) return <LoadingSpinner />;

  if (!user || !user?.email)
    return <Navigate state={{ from: location?.pathname }} to="/login" />;

  return children;
};

export default PrivateRoute;
