import { CHANGEDSTATUS, CHANGEDPRIORITIES } from "./identifiers";
import initialState from "./initialState";

const reducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case CHANGEDSTATUS:
      return {
        ...state,
        status: payload.status,
      };

    case CHANGEDPRIORITIES:
      const { priority, priorityType } = payload;

      switch (priorityType) {
        case "selected":
          return {
            ...state,
            priorities: [...state.priorities, priority],
          };
        case "removed":
          return {
            ...state,
            priorities: state.priorities.filter(
              (existingPriority) => existingPriority !== priority
            ),
          };

        default:
          return state;
      }

    default:
      return state;
  }
};

export default reducer;
