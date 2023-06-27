import { userLogedIn } from "features/auth/authSlice";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

const useAuthCheck = () => {
  const [authChecked, setAuthChecked] = useState(false);

  const dispatch = useDispatch();

  // side effects
  useEffect(() => {
    const localAuth = localStorage.getItem("auth");

    if (localAuth) {
      const { accessToken, user } = JSON.parse(localAuth) || {};

      if (accessToken && user) {
        dispatch(userLogedIn({ accessToken, user }));
      }
    }

    setAuthChecked(true);
  }, [dispatch]);

  return authChecked;
};

export default useAuthCheck;
