import useAuth from "hooks/useAuth";
import { Navigate, Outlet } from "react-router-dom";

const AdminRoute = () => {
  const { autenticated, isAdmin } = useAuth();

  return autenticated && isAdmin ? <Outlet /> : <Navigate to="/admin" />;
};

export default AdminRoute;
