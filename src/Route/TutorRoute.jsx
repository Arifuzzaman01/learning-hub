import { Navigate } from "react-router";
import useAuth from "../hook/useAuth";
import useRole from "../hook/useRole";
import LoadingSpinner from "../common/LoadingSpinner";

const TutorRoute = ({ children }) => {
  const { user, loading } = useAuth(); // role = admin / tutor / student
  const { role, roleLoading } = useRole();

  if (loading || roleLoading) return <LoadingSpinner />;
  console.log(role);

  if (user && role === "tutor") return children;

  return <Navigate to="/" />;
};
export default TutorRoute;
