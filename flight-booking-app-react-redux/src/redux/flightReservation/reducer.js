import { FLIGHT_CANCEL, FLIGHT_RESERVE } from "./identifiers";

const initialState = [];

const flightReservationReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case FLIGHT_RESERVE:
      return [...state, { ...payload }];

    case FLIGHT_CANCEL:
      return state.filter((flight) => flight.id !== payload);

    default:
      return [...state];
  }
};

export default flightReservationReducer;
