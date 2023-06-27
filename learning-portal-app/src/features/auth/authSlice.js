import { createSlice } from "@reduxjs/toolkit";

// auth slice initial state
export const initialState = {
  accessToken: undefined,
  user: null,
};

// auth slice
export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    userLogedIn: (state, { payload }) => {
      state.accessToken = payload.accessToken;
      state.user = payload.user;
    },
    userLogedOut: (state) => {
      state.accessToken = undefined;
      state.user = null;
    },
  },
});

export const { userLogedIn, userLogedOut } = authSlice.actions;
