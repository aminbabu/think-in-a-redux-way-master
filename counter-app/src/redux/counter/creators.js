import { INCREMENT, DECREMENT } from "./identifiers";

export const incrementCreator = () => {
  return {
    type: INCREMENT,
  };
};

export const decrementCreator = () => {
  return {
    type: DECREMENT,
  };
};
