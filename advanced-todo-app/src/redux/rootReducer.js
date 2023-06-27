import { combineReducers } from "redux";
import todosReducer from "./todoSlice/reducer";
import todoFiltersReducer from "./filterSlice/reducer";

const rootReducer = combineReducers({
  todos: todosReducer,
  todoFilters: todoFiltersReducer,
});

export default rootReducer;
