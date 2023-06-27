import { combineReducers } from "redux";
import bookReducer from "./bookSlice/reducer";
import filterReducer from "./filterSlice/reducer";
import bookFacilityReducer from "./bookFacilitySlice/reducer";

const reducer = combineReducers({
  books: bookReducer,
  filters: filterReducer,
  facilities: bookFacilityReducer,
});

export default reducer;
