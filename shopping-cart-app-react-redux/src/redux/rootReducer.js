import { combineReducers } from "redux";
import productReducer from "./productSlice/reducer";
import cartReducer from "./cartSlice/reducer";

const rootReducer = combineReducers({
  product: productReducer,
  cart: cartReducer,
});

export default rootReducer;
