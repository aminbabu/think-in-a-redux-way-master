import { FLIGHT_CANCEL, FLIGHT_RESERVE } from "./identifiers";

export const flightReserveCreator = (payload) => {
  return {
    type: FLIGHT_RESERVE,
    payload: { ...payload },
  };
};

export const flightRemoveCreator = (id) => {
  return {
    type: FLIGHT_CANCEL,
    payload: id,
  };
};
