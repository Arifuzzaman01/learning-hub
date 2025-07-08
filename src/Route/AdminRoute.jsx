const AdminRoute = ({ children }) => {
  const { user, loading, role } = useAuth(); // role = admin / tutor / student

  if (loading) return <p>Loading...</p>;

  if (user && role === "admin") return children;

  return <Navigate to="/unauthorized" />;
};
