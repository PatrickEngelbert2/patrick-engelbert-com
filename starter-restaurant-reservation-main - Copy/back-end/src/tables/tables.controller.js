/**
 * List handler for reservation resources
 */
const service = require("./tables.service");
const asyncErrorBoundary = require("../errors/asyncErrorBoundary");

async function list(req, res, next) {
  const data = await service.listTables();
  res.json({ data });
}

function errorValidation(req, res, next) {
  let errors = [];
  const { data } = req.body;
  if (!req.body.data) {
    next({ status: 400, message: "data cannot be empty" });
    // errors.push("data cannot be empty");
  }
  if (
    !data.table_name ||
    data.table_name === "" ||
    data.table_name.length < 2
  ) {
    // next({ status: 400, message: "table_name cannot be empty" });
    errors.push("table_name cannot be empty");
  }
  if (
    !data.capacity ||
    !data.capacity > 0 ||
    !Number.isInteger(data.capacity)
  ) {
    // next({ status: 400, message: "capacity must be an integer > 0" });
    errors.push("capacity must be an integer > 0");
  }
  if (errors.length) {
    next({
      status: 400,
      message: errors.join(", "),
    });
  }

  next();
}

async function create(req, res, next) {
  const newTable = await service.create(req.body.data);
  res.status(201).json({ data: newTable });
}

async function updateErrorValidation(req, res, next) {
  let errors = [];
  const { table_id } = req.params;
  if (!req.body.data) {
    next({ status: 400, message: "data cannot be empty" });
  }
  const { reservation_id } = req.body.data;
  if (!reservation_id) {
    next({ status: 400, message: "reservation_id cannot be empty" });
  }
  const reservation = await service.getReservationById(reservation_id);
  if (!reservation) {
    return next({
      status: 404,
      message: `Reservation ${reservation_id} cannot be found.`,
    });
  }
  if (reservation.status === "seated") {
    return next({
      status: 400,
      message: `Reservation ${reservation_id} is already seated.`,
    });
  }
  const table = await service.read(table_id);
  if (table.capacity < reservation.people) {
    errors.push(
      `Table capacity of ${table.capacity} is less than reservation party size of ${reservation.people}.`
    );
  }
  if (table.reservation_id) {
    errors.push(`This table is occupied and cannot be assigned a new party.`);
  }
  if (errors.length) {
    next({
      status: 400,
      message: errors.join(", "),
    });
  }

  next();
}

async function reservationIdExists(req, res, next) {
  const { reservation_id } = req.params;
  const reservation = await service.getReservationById(reservation_id);
  if (reservation) next();
  return next({
    status: 404,
    message: `Reservation ${reservation_id} cannot be found.`,
  });
}

async function update(req, res, next) {
  const { reservation_id } = req.body.data;
  const { table_id } = req.params;
  const data = await service.update(reservation_id, table_id);
  res.json({ data });
}

async function tableIdExists(req, res, next) {
  const { table_id } = req.params;
  const table = await service.read(table_id);
  if (!table) {
    return next({ status: 404, message: `Table ${table_id} cannot be found.` });
  }
  if (table.reservation_id === null) {
    return next({ status: 400, message: `Table is not occupied.` });
  }
  res.locals.reservation_id = table.reservation_id;
  return next();
}

async function unseat(req, res, next) {
  await service.destroy(res.locals.reservation_id);
  const data = await service.resStatusFinished(res.locals.reservation_id);
  res.status(200).json({data});
}

module.exports = {
  list: [asyncErrorBoundary(list)],
  create: [errorValidation, asyncErrorBoundary(create)],
  update: [
    asyncErrorBoundary(updateErrorValidation),
    asyncErrorBoundary(update),
  ],
  destroy: [asyncErrorBoundary(tableIdExists), asyncErrorBoundary(unseat)],
};
