import {
  ADD_TO_CART,
  REMOVE_FROM_CART,
  INCREASE_QUANTITY,
  DECREASE_QUANTITY,
} from "./identifiers";

export const addToCart = (product, quantity, operationType) => {
  return {
    type: ADD_TO_CART,
    payload: { product, quantity, operationType },
  };
};

export const removeFromCart = (id) => {
  return {
    type: REMOVE_FROM_CART,
    payload: { id },
  };
};

export const increaseQuantityInCart = (id, quantity, increaseBy) => {
  return {
    type: INCREASE_QUANTITY,
    payload: { id, quantity, increaseBy },
  };
};

export const decreaseQuantityInCart = (id, quantity, decreaseBy) => {
  return {
    type: DECREASE_QUANTITY,
    payload: { id, quantity, decreaseBy },
  };
};
