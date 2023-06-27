import { generateID } from "../../lib/functions";
import {
  ADD_PRODUCT,
  DECREASE_QUANTITY,
  INCREASE_QUANTITY,
  RESET_QUANTITY,
} from "./identifiers";
import initialState from "./initialState";

const reducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case ADD_PRODUCT:
      return [
        ...state,
        {
          id: generateID(state),
          ...payload,
        },
      ];

    case INCREASE_QUANTITY:
      return state.map((product) => {
        return product.id !== payload.id
          ? { ...product }
          : {
              ...product,
              quantity:
                payload.quantity > 1
                  ? product.quantity + payload.increaseBy
                  : product.quantity,
            };
      });

    case RESET_QUANTITY:
      return state.map((product) => {
        return product.id !== payload.id
          ? { ...product }
          : {
              ...product,
              quantity: product.quantity + payload.quantity,
            };
      });

    case DECREASE_QUANTITY:
      return state.map((product) => {
        return product.id !== payload.id
          ? { ...product }
          : {
              ...product,
              quantity: product.quantity
                ? product.quantity - payload.decreaseBy
                : product.quantity,
            };
      });

    default:
      return state;
  }
};

export default reducer;
