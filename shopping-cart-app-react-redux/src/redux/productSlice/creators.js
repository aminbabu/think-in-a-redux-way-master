import {
  ADD_PRODUCT,
  INCREASE_QUANTITY,
  DECREASE_QUANTITY,
  RESET_QUANTITY,
} from "./identifiers";

export const createProduct = (product) => {
  return {
    type: ADD_PRODUCT,
    payload: { ...product },
  };
};

export const increaseQuantity = (id, quantity, increaseBy) => {
  return {
    type: INCREASE_QUANTITY,
    payload: { id, quantity, increaseBy },
  };
};

export const decreaseQuantity = (id, quantity, decreaseBy) => {
  return {
    type: DECREASE_QUANTITY,
    payload: { id, quantity, decreaseBy },
  };
};

export const resetQuantity = (id, quantity) => {
  return {
    type: RESET_QUANTITY,
    payload: { id, quantity },
  };
};
