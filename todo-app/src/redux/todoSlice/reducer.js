import { getNextID } from "../../lib/functions";
import {
  ADDED,
  COMPLETEDALL,
  CLEARCOMPLETED,
  CHANGEDPRIORITY,
  DELETE,
  COMPLETEDTOGGLE,
} from "./identifiers";
import initialState from "./initialState";

const reducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case ADDED:
      return [
        ...state,
        {
          id: getNextID(state),
          text: payload.text,
          completed: false,
        },
      ];

    case COMPLETEDTOGGLE:
      return state.map((todo) =>
        todo.id !== payload.id
          ? todo
          : {
              ...todo,
              completed: !todo?.completed,
            }
      );

    case CHANGEDPRIORITY:
      return state.map((todo) =>
        todo.id !== payload.id
          ? todo
          : {
              ...todo,
              priority: payload.priority,
            }
      );

    case DELETE:
      return state.filter((todo) => todo.id !== payload.id);

    case COMPLETEDALL:
      return state.map((todo) => {
        return {
          ...todo,
          completed: true,
        };
      });

    case CLEARCOMPLETED:
      return state.filter((todo) => !todo.completed);

    default:
      return state;
  }
};

export default reducer;
