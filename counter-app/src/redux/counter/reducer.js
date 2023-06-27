import { DECREMENT, INCREMENT } from "./identifiers";

const initialState = {
  payload: 0,
};

const counterReducer = (state = initialState, { type }) => {
  switch (type) {
    case INCREMENT:
      return { ...state, payload: state.payload + 1 };

    case DECREMENT:
      return {
        ...state,
        payload: state.payload > 0 ? state.payload - 1 : 0,
      };

    default:
      return state;
  }
};

export default counterReducer;
