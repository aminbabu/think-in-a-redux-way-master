import { combineReducers } from "redux";
import counterReducer from "./counter/reducer";
import dynamicCounterReducer from "./dynamicCounter/reducer";

const rootReducer = combineReducers({
  counter: counterReducer,
  dynamicCounter: dynamicCounterReducer,
});

export default rootReducer;
