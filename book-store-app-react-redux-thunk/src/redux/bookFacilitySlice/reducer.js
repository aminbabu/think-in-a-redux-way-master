import { EDIT_BOOK } from "./identifiers";
import initialState from "./initialState";

const reducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case EDIT_BOOK:
      return {
        ...state,
        editableBook: { ...payload.book },
        isUpdated: payload.isUpdated,
      };

    default:
      return state;
  }
};

export default reducer;
