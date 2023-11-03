import React, { useEffect, useState } from "react";
import { listReservations } from "../utils/api";
import { next, previous } from "../utils/date-time";
import ErrorAlert from "../layout/ErrorAlert";
import useQuery from "../utils/useQuery";
import ReservationsList from "./ReservationsList";
import Tables from "./Tables";
import { useHistory } from "react-router";

/**
 * Defines the dashboard page.
 * @param date
 *  the date for which the user wants to view reservations.
 * @returns {JSX.Element}
 */
function Dashboard({ date }) {
  const [reservations, setReservations] = useState([]);
  const [reservationsError, setReservationsError] = useState(null);
  const history = useHistory();
  const query = useQuery();
  const getDate = query.get("date");
  if (getDate) date = getDate;
  useEffect(loadDashboard, [date]);

  function handleDateChange(isNext, isToday = false) {
    if (isNext) {
      history.push(`/dashboard/?date=${next(date)}`);
    }
    if (!isNext && !isToday) {
      history.push(`/dashboard/?date=${previous(date)}`);
    }
    if (isToday) {
      history.push(`/dashboard`);
    }
  }

  function loadDashboard() {
    const abortController = new AbortController();
    setReservationsError(null);
    listReservations({ date }, abortController.signal)
      .then(setReservations)
      .catch(setReservationsError);
    return () => abortController.abort();
  }

  return (
    <main>
      <h1>Dashboard</h1>
      <div className="d-md-flex mb-3">
        <h4 className="mb-0">Reservations for date</h4>
      </div>
      <ErrorAlert error={reservationsError} />
      <button
        onClick={() => handleDateChange(true)}
        className="btn btn-primary m-2"
      >
        Next
      </button>
      <button
        onClick={() => handleDateChange(false)}
        className="btn btn-secondary m-2"
      >
        Back
      </button>
      <button
        onClick={() => handleDateChange(false, true)}
        className="btn btn-warning m-2"
      >
        Today
      </button>
      <ReservationsList reservations={reservations} />
      <Tables />
    </main>
  );
}

export default Dashboard;
