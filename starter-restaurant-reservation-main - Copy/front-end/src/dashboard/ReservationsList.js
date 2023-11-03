import React from "react";
import { Link } from "react-router-dom"
import { updateResStatus } from "../utils/api";
import { useHistory } from "react-router";
import { formatAsTime } from "../utils/date-time"

/**
 * Defines the dashboard page.
 * @param date
 *  the date for which the user wants to view reservations.
 * @returns {JSX.Element}
 */
function ReservationsList({ date, reservations }) {
  const history = useHistory();
  async function handleCancel(evt, status, reservation_id) {
    evt.preventDefault();
    evt.stopPropagation();
    if (
      window.confirm(
        "Do you want to cancel this reservation? \nThis cannot be undone."
      )
    ) {
      const ac = new AbortController();
      await updateResStatus(status, reservation_id, ac.signal);
      history.push("/dashboard");
      return () => ac.abort();
    }
  }

  let mappedReservations = reservations.map((reservation) => {
    const buttons = (
      <td>
        <Link
          to={`/reservations/${reservation.reservation_id}/seat`}
          className="btn btn-primary"
        >
          Seat
        </Link>
        <Link
          to={`/reservations/${reservation.reservation_id}/edit`}
          className="btn btn-secondary ml-2"
        >
          Edit
        </Link>
        <button
          onClick={(evt) =>
            handleCancel(evt, "cancelled", reservation.reservation_id)
          }
          data-reservation-id-cancel={reservation.reservation_id}
          className="btn btn-warning ml-2"
        >
          Cancel
        </button>
      </td>
    );

    return (
      <tr key={reservation.reservation_id}>
        <th scope="row">{reservation.reservation_id}</th>
        <td>{reservation.first_name}</td>
        <td>{reservation.last_name}</td>
        <td>{reservation.mobile_number}</td>
        <td>{reservation.reservation_date}</td>
        <td>{formatAsTime(reservation.reservation_time)}</td>
        <td>{reservation.people}</td>
        <td data-reservation-id-status={reservation.reservation_id}>
          {reservation.status}
        </td>
        {reservation.status === "booked" ? buttons : null}
      </tr>
    );
  });

  return (
    <main>
      <table className="table table-dark table-striped table-hover">
        <thead>
          <tr>
            <th scope="col">Id</th>
            <th scope="col">First</th>
            <th scope="col">Last</th>
            <th scope="col">Mobile Number</th>
            <th scope="col">Reservation Date</th>
            <th scope="col">Reservation Time</th>
            <th scope="col">Party Size</th>
            <th scope="col">Status</th>
          </tr>
        </thead>
        <tbody>{reservations.length ? mappedReservations : null}</tbody>
      </table>
    </main>
  );
}

export default ReservationsList;
