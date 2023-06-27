import { apiSlice } from "features/api/apiSlice";
import { userLogedIn } from "./authSlice";

// side effects (signin-signup)
const signinSignUpAuthQueryStarted = async (
  arg,
  { dispatch, queryFulfilled }
) => {
  try {
    // destructure query fulfulled data
    const { data } = await queryFulfilled;

    if (data?.accessToken && data?.user) {
      // prepare auth object
      const auth = {
        accessToken: data?.accessToken,
        user: data?.user,
      };

      // store auth object into browser's localstorage for future
      localStorage.setItem("auth", JSON.stringify(auth));

      // update redux store's auth slice
      dispatch(userLogedIn(auth));
    }
  } catch (error) {}
};

// auth api
export const authAPI = apiSlice.injectEndpoints({
  endpoints: (build) => ({
    signup: build.mutation({
      query: (data) => ({
        url: "/signup",
        method: "POST",
        body: data,
      }),
      onQueryStarted: signinSignUpAuthQueryStarted,
    }),
    signin: build.mutation({
      query: (data) => ({
        url: "/signin",
        method: "POST",
        body: data,
      }),
      onQueryStarted: signinSignUpAuthQueryStarted,
    }),
  }),
  overrideExisting: false,
});

export const { useSignupMutation, useSigninMutation } = authAPI;
