import useAuth from "hooks/useAuth";
import { Navigate, Outlet } from "react-router-dom";

const StudentRoute = () => {
  const { autenticated } = useAuth();

  return autenticated ? <Outlet /> : <Navigate to="/" />;
};

export default StudentRoute;
