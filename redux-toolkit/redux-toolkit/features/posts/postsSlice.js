const { createSlice } = require("@reduxjs/toolkit");
const fetchPosts = require("./aysncWorks/fetchPosts");

const initialState = {
  loading: false,
  posts: [],
  error: "",
};

const postsSlice = createSlice({
  name: "posts",
  initialState,
  extraReducers: (builder) => {
    builder.addCase(fetchPosts.pending, (state) => {
      state.loading = true;
      state.error = "";
    });

    builder.addCase(fetchPosts.fulfilled, (state, { payload }) => {
      state.loading = false;
      state.posts = payload;
      state.error = "";
    });

    builder.addCase(fetchPosts.rejected, (state, { error }) => {
      state.loading = true;
      state.error = error.message;
    });
  },
});

module.exports = postsSlice.reducer;
module.exports.postActions = postsSlice.actions;
