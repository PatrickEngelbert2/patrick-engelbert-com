import React, { useState } from "react";
import ErrorAlert from "../layout/ErrorAlert";
import ReservationsList from "../dashboard/ReservationsList";
import { listReservations } from "../utils/api";

export default function Search(handleSubmit) {
  const [error, setError] = useState(null);
  const [reservations, setReservations] = useState([]);
  const [number, setNumber] = useState("");
  //   useEffect(, []);
  const searchHandler = (evt, reservations) => {
    evt.preventDefault();
    evt.stopPropagation();
    const ac = new AbortController();
    listReservations({ mobile_number: number }, ac.signal)
      .then(setReservations)
      .catch(setError);
    return () => ac.abort();
  };

  return (
    <div>
      <h1>Search</h1>
      <ErrorAlert error={error} />
      <nav className="navbar navbar-dark bg-dark">
        <form className="form-inline" onSubmit={searchHandler}>
          <input
            className="form-control mr-sm-2"
            name="mobile_number"
            id="mobile_number"
            type="search"
            placeholder="Search by mobile num"
            aria-label="Search"
            onChange={(evt) => setNumber(evt.target.value)}
            required
          />
          <button className="btn btn-secondary my-2 my-sm-0" type="submit">
            Find
          </button>
        </form>
      </nav>
      <ReservationsList reservations={reservations} />
      {!reservations.length && <h3>No reservations found</h3>}
    </div>
  );
}
