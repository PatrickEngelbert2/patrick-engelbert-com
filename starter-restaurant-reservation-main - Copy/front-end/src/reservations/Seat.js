import React, { useEffect, useState } from "react";
import { useParams, useHistory } from "react-router-dom";
import { listTables, seatTable } from "../utils/api";
import ErrorAlert from "../layout/ErrorAlert";

/**
 * Defines the dashboard page.
 * @param date
 *  the date for which the user wants to view reservations.
 * @returns {JSX.Element}
 */
export default function Seat() {
  const [tables, setTables] = useState([]);
  const [tablesError, setTablesError] = useState(null);
  const history = useHistory();
  const [selected, setSelected] = useState(null);
  useEffect(loadTables, []);
  const { reservation_id } = useParams();

  function loadTables() {
    const abortController = new AbortController();
    setTablesError(null);
    listTables(abortController.signal).then(setTables).catch(setTablesError);
    return () => abortController.abort();
  }

  const handleSubmit = async (evt) => {
    evt.preventDefault();
    evt.stopPropagation();
    const ac = new AbortController();
    await seatTable(selected, reservation_id, ac.signal)
      .then((response) => history.push(`/dashboard`))
      .catch(setTablesError);
    return () => ac.abort();
  };

  let mappedTableOptions = tables.map((table) => (
    <option value={table.table_id} key={table.table_id}>
      {table.table_name} - {table.capacity}
    </option>
  ));

  return (
    <div>
      <h1>Seating</h1>
      <ErrorAlert error={tablesError} />
      <form className="needs-validation" onSubmit={handleSubmit} noValidate>
        <div className="form-row">
          <div className="col-md-4 mb-3">
            <label htmlFor="table_id">Table Number</label>
            <div className="valid-feedback">Looks good!</div>
            <select
              name="table_id"
              className="form-control form-select"
              size={tables.length + 1}
              id="table_id"
              multiple
              onChange={({ target }) => setSelected(target.value)}
              aria-label="multiple select example"
              required
            >
              {tables.length ? mappedTableOptions : null}
            </select>
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
