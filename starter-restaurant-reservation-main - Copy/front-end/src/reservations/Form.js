import React, { useState } from "react";
import { useHistory } from "react-router-dom";

import { today } from "../utils/date-time";

export default function Form({
  submitHandler,
  initialState = {
    first_name: "",
    last_name: "",
    mobile_number: "",
    reservation_date: today(),
    reservation_time: "",
    people: "1",
  },
}) {
  const [reservation, setReservation] = useState(initialState);
  const history = useHistory();

  function changeHandler({ target: { name, value } }) {
    setReservation((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  }

  function handleSubmit(evt) {
    evt.preventDefault();
    evt.stopPropagation();
    submitHandler(reservation);
  }

  return (
    <form className="needs-validation" onSubmit={handleSubmit} noValidate>
      <div className="form-row">
        <div className="col-md-4 mb-3">
          <label htmlFor="first_name">First name</label>
          <input
            name="first_name"
            type="text"
            className="form-control"
            id="first_name"
            placeholder={reservation.first_name}
            value={reservation.first_name}
            onChange={changeHandler}
            required
          />
          <div className="valid-feedback">Looks good!</div>
        </div>
        <div className="col-md-4 mb-3">
          <label htmlFor="last_name">Last name</label>
          <input
            name="last_name"
            type="text"
            className="form-control"
            id="last_name"
            placeholder={reservation.last_name}
            value={reservation.last_name}
            onChange={changeHandler}
            required
          />
          <div className="valid-feedback">Looks good!</div>
        </div>
        <div className="col-md-4 mb-3">
          <label htmlFor="mobile_number">Phone number</label>
          <div className="input-group">
            <div className="input-group-prepend">
              <span className="input-group-text" id="inputGroupPrepend">
                #
              </span>
            </div>
            <input
              name="mobile_number"
              type="text"
              className="form-control"
              id="mobile_number"
              placeholder={reservation.mobile_number}
              value={reservation.mobile_number}
              onChange={changeHandler}
              aria-describedby="inputGroupPrepend"
              required
            />
            <div className="invalid-feedback">
              Please type a valid phone number.
            </div>
          </div>
        </div>
      </div>
      <div className="form-row">
        <div className="col-md-6 mb-3">
          <label htmlFor="reservation_date">Date</label>
          <input
            name="reservation_date"
            pattern="\d{4}-\d{2}-\d{2}"
            type="date"
            placeholder={reservation.reservation_date}
            value={reservation.reservation_date}
            onChange={changeHandler}
            className="form-control"
            id="reservation_date"
            required
          />
          <div className="invalid-feedback">Please provide a valid date.</div>
        </div>
        <div className="col-md-3 mb-3">
          <label htmlFor="reservation_time">Time</label>
          <input
            type="time"
            name="reservation_time"
            className="form-control"
            placeholder={reservation.reservation_time}
            value={reservation.reservation_time}
            onChange={changeHandler}
            id="reservation_time"
            required
          />
          <div className="invalid-feedback">Please select a valid time.</div>
        </div>
        <div className="col-md-3 mb-3">
          <label htmlFor="people">Party Size</label>
          <input
            name="people"
            type="number"
            className="form-control"
            placeholder={reservation.people}
            value={reservation.people}
            onChange={changeHandler}
            id="people"
            required
          />
          <div className="invalid-feedback">
            There must be at least 1 person in your party.
          </div>
        </div>
      </div>
      <button className="btn btn-primary" type="submit">
        Submit
      </button>
      <button
        onClick={() => history.goBack()}
        className="btn btn-warning m-2"
      >
        Cancel
      </button>
    </form>
  );
}
