import { DYNAMIC_INCREMENT, DYNAMIC_DECREMENT } from "./identifiers";

export const dynamicIncrementCreator = (value) => {
  return {
    type: DYNAMIC_INCREMENT,
    payload: value,
  };
};

export const dynamicDecrementCreator = (value) => {
  return {
    type: DYNAMIC_DECREMENT,
    payload: value,
  };
};
