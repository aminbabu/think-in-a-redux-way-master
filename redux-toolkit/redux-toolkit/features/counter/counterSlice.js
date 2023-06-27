const { createSlice } = require("@reduxjs/toolkit");

const initialState = { count: 0 };

const counterSlice = createSlice({
  name: "counter",
  initialState,
  reducers: {
    increment: (state, { payload }) => {
      state.count += payload;
    },
    decrement: (state, { payload }) => {
      state.count -= payload;
    },
  },
});

module.exports = counterSlice.reducer;
module.exports.counterActions = counterSlice.actions;
