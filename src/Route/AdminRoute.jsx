import { Navigate } from "react-router";
import useAuth from "../hook/useAuth";
import useRole from "../hook/useRole";
import LoadingSpinner from "../common/LoadingSpinner";

const AdminRoute = ({ children }) => {
  const { user, loading } = useAuth(); // role = admin / tutor / student
  const { role, roleLoading } = useRole();

  if (loading || roleLoading) return <LoadingSpinner />;
  console.log(role);

  if (user && role === "admin") return children;

  return <Navigate to="/" />;
};
export default AdminRoute;
