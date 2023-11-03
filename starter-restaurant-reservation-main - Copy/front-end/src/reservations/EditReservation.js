import React, { useState, useEffect } from "react";
import { useParams, useHistory } from "react-router-dom";
import ErrorAlert from "../layout/ErrorAlert";
import { updateReservation, getReservationById } from "../utils/api";
import Form from "./Form";
import { formatAsDate } from "../utils/date-time";

export default function EditReservation() {
  const { reservation_id } = useParams();
  useEffect(getReservation, [reservation_id]);
  const history = useHistory();
  const [createError, setCreateError] = useState(null);
  const [reservation, setReservation] = useState(null);

  function getReservation() {
    const abortController = new AbortController();
    setCreateError(null);
    getReservationById(reservation_id, abortController.signal)
      .then((res) => {
        setReservation(res);
      })
      .catch(setCreateError);
    return () => abortController.abort();
  }

  const submitHandler = (reservation) => {
    reservation.people = Number(reservation.people);
    const ac = new AbortController();
    updateReservation(reservation, ac.signal)
      .then((res) =>
        history.push(`/dashboard?date=${reservation.reservation_date}`)
      )
      .catch(setCreateError);
    return () => ac.abort();
  };

  if (reservation) {
    reservation.reservation_date = formatAsDate(reservation.reservation_date);
  }

  return (
    <div>
      <h1>Edit an existing reservation</h1>
      <ErrorAlert error={createError} />
      {reservation && (
        <Form submitHandler={submitHandler} initialState={reservation} />
      )}
    </div>
  );
}
