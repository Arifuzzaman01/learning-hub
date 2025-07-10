import { Navigate } from "react-router";
import useAuth from "../hook/useAuth";
import useRole from "../hook/useRole";

const StudentRoute = ({ children }) => {
  const { user, loading } = useAuth(); // role = admin / tutor / student
  const { role, roleLoading } = useRole();

  if (loading || roleLoading) return <p>Loading...</p>;
  console.log(role);

  if (user && role === "student") return children;

  return <Navigate to="/" />;
};
export default StudentRoute;
