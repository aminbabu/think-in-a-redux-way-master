import {
  ADD_TO_CART,
  REMOVE_FROM_CART,
  INCREASE_QUANTITY,
  DECREASE_QUANTITY,
} from "./identifiers";
import initialState from "./initialState";

const reducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case ADD_TO_CART:
      const { product, quantity, operationType } = payload;

      switch (operationType) {
        case "new":
          return [...state, { ...product, quantity }];

        case "existing":
          return state.map((cartProduct) =>
            cartProduct.id !== product.id
              ? { ...cartProduct }
              : { ...cartProduct, quantity: cartProduct.quantity + quantity }
          );

        default:
          return state;
      }

    case INCREASE_QUANTITY:
      return state.map((product) =>
        product.id !== payload.id
          ? { ...product }
          : {
              ...product,
              quantity: payload.quantity
                ? product.quantity + payload.increaseBy
                : product.quantity,
            }
      );

    case DECREASE_QUANTITY:
      return state.map((product) =>
        product.id !== payload.id
          ? { ...product }
          : {
              ...product,
              quantity:
                product.quantity > 1
                  ? product.quantity - payload.decreaseBy
                  : product.quantity,
            }
      );

    case REMOVE_FROM_CART:
      return state.filter((product) => product.id !== payload.id);

    default:
      return state;
  }
};

export default reducer;
