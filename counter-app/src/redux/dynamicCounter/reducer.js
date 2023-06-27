import { DYNAMIC_INCREMENT, DYNAMIC_DECREMENT } from "./identifiers";

const initialState = {
  payload: 0,
};

const dynamicCounterReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case DYNAMIC_INCREMENT:
      return { ...state, payload: state.payload + payload };

    case DYNAMIC_DECREMENT:
      return {
        ...state,
        payload: state.payload > payload ? state.payload - payload : 0,
      };

    default:
      return state;
  }
};

export default dynamicCounterReducer;
