const { default: produce } = require("immer");
const { INCREMENT, DECREMENT } = require("./identifiers");
const initialState = require("./initialStates");

const reducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case INCREMENT:
      // return { ...state, count: state.count + payload.value };
      return produce(state, (draftState) => {
        draftState.count += payload.value;
      });

    case DECREMENT:
      // return { ...state, count: state.count - payload.value };
      return produce(state, (draftState) => {
        draftState.count -= payload.value;
      });

    default:
      return state;
  }
};

module.exports = reducer;
