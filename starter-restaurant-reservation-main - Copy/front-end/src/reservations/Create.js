import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import ErrorAlert from "../layout/ErrorAlert";
import { createReservation } from "../utils/api";
import Form from "./Form";

export default function Create() {
  const history = useHistory();
  const [createError, setCreateError] = useState(null);
  const submitHandler = (reservation) => {
    reservation.people = Number(reservation.people);
    const ac = new AbortController();
    createReservation(reservation, ac.signal)
      .then((res) =>
        history.push(`/dashboard?date=${reservation.reservation_date}`)
      )
      .catch(setCreateError);
    return () => ac.abort();
  };

  return (
    <div>
      <h1>Create a new reservation</h1>
      <ErrorAlert error={createError} />
      <Form submitHandler={submitHandler} />
    </div>
  );
}
