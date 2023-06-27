import useAuth from "hooks/useAuth";
import { Navigate, Outlet } from "react-router-dom";

const PublicRoute = () => {
  const { autenticated, isAdmin } = useAuth();

  // decide what to render
  let content = <Outlet />;

  // if user is a student
  if (autenticated && !isAdmin) {
    content = <Navigate to="/course" />;
  }

  // if user is an admin
  if (autenticated && isAdmin) {
    content = <Navigate to="/admin/dashboard" />;
  }

  return content;
};

export default PublicRoute;
