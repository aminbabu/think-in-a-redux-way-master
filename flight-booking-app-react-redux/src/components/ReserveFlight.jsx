import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { flightReserveCreator } from "../redux/flightReservation/creators";
import Button from "./Button";
import frameIcon from "../assets/img/icons/Frame.svg";
import userIcon from "../assets/img/icons/Vector (1).svg";
import briefcaseIcon from "../assets/img/icons/Vector (3).svg";

export default function ReserveFlight() {
  const state = useSelector((state) => state);
  const dispatch = useDispatch();
  const [payload, setPayload] = useState({
    from: "",
    to: "",
    date: "",
    guests: "",
    ticketClassName: "",
  });

  const handleChange = (e) => {
    e.preventDefault();

    const target = e.target;
    const name = target.name;
    const value = target.value;

    const inputData = { [name]: value };

    setPayload({ ...payload, ...inputData });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    dispatch(flightReserveCreator({ id: Date.now(), ...payload }));

    setPayload({
      from: "",
      to: "",
      date: "",
      guests: "",
      ticketClassName: "",
    });
  };

  // destructure the local payload state
  const { from, to, date, guests, ticketClassName } = payload;

  return (
    <div className="mt-[160px] mx-4 md:mt-[160px] relative">
      <div className="bg-white rounded-md max-w-6xl w-full mx-auto">
        <form onSubmit={handleSubmit} className="first-hero lws-inputform">
          {/* From */}
          <div className="des-from">
            <p>Destination From</p>
            <div className="flex flex-row">
              <img src={frameIcon} alt="" />
              <select
                className="outline-none px-2 py-2 w-full"
                name="from"
                id="lws-from"
                required
                value={from}
                onChange={handleChange}
              >
                <option value="" hidden>
                  Please Select
                </option>
                <option>Dhaka</option>
                <option>Sylhet</option>
                <option>Saidpur</option>
                <option>Cox's Bazar</option>
              </select>
            </div>
          </div>

          {/* To */}
          <div className="des-from">
            <p>Destination To</p>
            <div className="flex flex-row">
              <img src={frameIcon} alt="" />
              <select
                className="outline-none px-2 py-2 w-full"
                name="to"
                id="lws-to"
                required
                value={to}
                onChange={handleChange}
              >
                <option value="" hidden>
                  Please Select
                </option>
                <option>Dhaka</option>
                <option>Sylhet</option>
                <option>Saidpur</option>
                <option>Cox's Bazar</option>
              </select>
            </div>
          </div>

          {/* Date */}
          <div className="des-from">
            <p>Journey Date</p>
            <input
              type="date"
              className="outline-none px-2 py-2 w-full date"
              name="date"
              id="lws-date"
              required
              value={date}
              onChange={handleChange}
            />
          </div>

          {/* Guests */}
          <div className="des-from">
            <p>Guests</p>
            <div className="flex flex-row">
              <img src={userIcon} alt="" />
              <select
                className="outline-none px-2 py-2 w-full"
                name="guests"
                id="lws-guests"
                required
                value={guests}
                onChange={handleChange}
              >
                <option value="" hidden>
                  Please Select
                </option>
                <option value="1">1 Person</option>
                <option value="2">2 Persons</option>
                <option value="3">3 Persons</option>
                <option value="4">4 Persons</option>
              </select>
            </div>
          </div>

          {/* Class */}
          <div className="des-from !border-r-0">
            <p>Class</p>
            <div className="flex flex-row">
              <img src={briefcaseIcon} alt="" />
              <select
                className="outline-none px-2 py-2 w-full"
                name="ticketClassName"
                id="lws-ticketClassName"
                required
                value={ticketClassName}
                onChange={handleChange}
              >
                <option value="" hidden>
                  Please Select
                </option>
                <option>Business</option>
                <option>Economy</option>
              </select>
            </div>
          </div>

          <Button id="lws-addCity" type="submit" disabled={state.length >= 3}>
            <svg
              width="15px"
              height="15px"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="2"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 4.5v15m7.5-7.5h-15"
              />
            </svg>
            <span className="text-sm">Book</span>
          </Button>
        </form>
      </div>
    </div>
  );
}
