import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { createTable } from "../utils/api";
import ErrorAlert from "../layout/ErrorAlert";

export default function TableCreate() {
  const [createError, setCreateError] = useState(null);
  const history = useHistory();
  const initialState = {
    table_name: "",
    capacity: "",
  };
  const [table, setTable] = useState(initialState);

  function changeHandler({ target: { name, value } }) {
    setTable((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  }
  const handleSubmit = async (evt) => {
    evt.preventDefault();
    evt.stopPropagation();
    table.capacity = Number(table.capacity);
    const ac = new AbortController();
    await createTable(table, ac.signal)
      .then((response) => history.push(`/dashboard`))
      .catch(setCreateError);
    return () => ac.abort();
    // history.push(`/dashboard?date=${reservation.reservation_date}`);
  };

  return (
    <div>
      <h1>Create a new table</h1>
      <ErrorAlert error={createError} />
      <form className="needs-validation" onSubmit={handleSubmit} noValidate>
        <div className="form-row">
          <div className="col-md-4 mb-3">
            <label htmlFor="validationCustom01">Table name</label>
            <input
              name="table_name"
              type="text"
              className="form-control"
              id="table_name"
              value={table.table_name}
              onChange={changeHandler}
              required
            />
            <div className="valid-feedback">Looks good!</div>
          </div>
          <div className="col-md-1 mb-3">
            <label htmlFor="last_name">Capacity</label>
            <input
              name="capacity"
              type="number"
              className="form-control"
              id="capacity"
              value={table.capacity}
              onChange={changeHandler}
              required
            />
            <div className="valid-feedback">Looks good!</div>
          </div>
        </div>
        <button className="btn btn-primary" type="submit">
          Submit
        </button>
        <button onClick={history.goBack} className="btn btn-warning m-2">
          Cancel
        </button>
      </form>
    </div>
  );
}
