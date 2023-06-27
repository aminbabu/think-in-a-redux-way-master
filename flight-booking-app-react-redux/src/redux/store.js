import { legacy_createStore as createStore } from "redux";
import flightReservationReducer from "./flightReservation/reducer";

const store = createStore(flightReservationReducer);

export default store;
