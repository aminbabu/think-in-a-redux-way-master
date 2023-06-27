import { useDispatch, useSelector } from "react-redux";
import { flightRemoveCreator } from "../redux/flightReservation/creators";
import Flight from "./Flight";

export default function Flights() {
  const flights = useSelector((state) => state);
  const dispatch = useDispatch();

  const handleRemove = (id) => {
    dispatch(flightRemoveCreator(id));
  };

  return (
    <>
      {flights.length && (
        <div className="table-container">
          <table className="booking-table">
            <thead className="bg-gray-100/50">
              <tr className="text-black text-left">
                <th>Destination From</th>
                <th>Destination To</th>
                <th className="text-center">Journey Date</th>
                <th className="text-center">Guests</th>
                <th className="text-center">Class</th>
                <th className="text-center">Delete</th>
              </tr>
            </thead>
            <tbody
              className="divide-y divide-gray-300/20"
              id="lws-previewBooked"
            >
              {flights.map((flight) => (
                <Flight
                  key={flight.id}
                  from={flight.from}
                  to={flight.to}
                  date={flight.date}
                  guests={flight.guests}
                  ticketClass={flight.ticketClassName}
                  handler={() => handleRemove(flight.id)}
                />
              ))}
            </tbody>
          </table>
        </div>
      )}
    </>
  );
}
