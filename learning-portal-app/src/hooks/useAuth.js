import { selectAuth } from "features/auth/authSelectos";
import { useSelector } from "react-redux";

const useAuth = () => {
  const { accessToken, user } = useSelector(selectAuth);

  let autenticated = false;
  let isAdmin = false;

  if (accessToken && user) {
    autenticated = true;
  }

  if (user?.role === "admin") {
    isAdmin = true;
  }

  return { autenticated, isAdmin };
};

export default useAuth;
