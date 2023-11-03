/**
 * List handler for reservation resources
 */
const service = require("./reservations.service");
const asyncErrorBoundary = require("../errors/asyncErrorBoundary");

async function list(req, res, next) {
  let data;
  if (req.query.mobile_number) {
    data = await service.search(req.query.mobile_number);
  } else {
    data = await service.listReservations(req.query.date);
  }
  res.json({ data });
}

function getReservationById(req, res, next) {
  res.json({ data: res.locals.reservation });
}

function errorValidation(req, res, next) {
  let errors = [];
  const { data } = req.body;
  if (!req.body.data) {
    next({ status: 400, message: "data cannot be empty" });
    // errors.push("data cannot be empty")
  }
  if (!data.first_name || data.first_name === "") {
    // next({ status: 400, message: "first_name cannot be empty" });
    errors.push("first_name cannot be empty");
  }
  if (!data.last_name || data.last_name === "") {
    // next({ status: 400, message: "last_name cannot be empty" });
    errors.push("last_name cannot be empty");
  }
  if (!data.mobile_number || data.mobile_number === "") {
    // next({ status: 400, message: "mobile_number cannot be empty" });
    errors.push("mobile_number cannot be empty");
  }
  if (!data.people || !data.people > 0 || !Number.isInteger(data.people)) {
    // next({ status: 400, message: "people must be a number > 0" });
    errors.push("people must be a number > 0");
  }
  if (data.status && data.status !== "booked") {
    // next({ status: 400, message: "" });
    errors.push(
      `A new reservation must have a status of booked. You entered ${data.status}.`
    );
  }

  const dateFormat = /\d\d\d\d-\d\d-\d\d/;
  const timeFormat = /\d\d:\d\d/;
  if (!data.reservation_date || !data.reservation_date.match(dateFormat)) {
    // next({
    //   status: 400,
    //   message: "reservation_date must be a date",
    // });
    errors.push("reservation_date must be a date");
  }
  if (!data.reservation_time || !data.reservation_time.match(timeFormat)) {
    // next({
    //   status: 400,
    //   message: "reservation_time must be a time",
    // });
    errors.push("reservation_time must be a time");
  }

  if (dateIsInPast(data.reservation_date)) {
    // next({
    //   status: 400,
    //   message: "reservation_date must be in the future",
    // });
    errors.push("reservation_date must be in the future");
  }
  const dateAndTime = `${data.reservation_date} ${data.reservation_time}`;
  if (isTuesday(dateAndTime)) {
    // next({
    //   status: 400,
    //   message: "The restaurant is closed on Tuesday",
    // });
    errors.push("The restaurant is closed on Tuesday");
  }
  const reservationTime = new Date(
    `${req.body.data.reservation_date} ${req.body.data.reservation_time}`
  );
  if (reservationTime.getHours() === 10 && reservationTime.getMinutes() < 30) {
    errors.push("The restaurant is open from 10:30AM to 9:30PM");
  }
  if (reservationTime.getHours() === 21 && reservationTime.getMinutes() > 30) {
    errors.push("The restaurant is open from 10:30AM to 9:30PM");
  }
  if (reservationTime.getHours() < 10) {
    errors.push("The restaurant is open from 10:30AM to 9:30PM");
  }
  if (reservationTime.getHours() > 21) {
    errors.push("The restaurant is open from 10:30AM to 9:30PM");
  }

  if (errors.length) {
    next({
      status: 400,
      message: errors.join(", "),
    });
  }

  next();
}

const isTuesday = (date) => {
  const newDate = new Date(date);
  if (newDate.getDay() == 2) return true;
  return false;
};

const dateIsInPast = (date) => {
  const today = new Date();
  const checkedDate = new Date(date);
  return today > checkedDate;
};

async function create(req, res, next) {
  const newReservation = await service.create(req.body.data);
  res.status(201).json({ data: newReservation });
}

async function reservationIdExists(req, res, next) {
  const { reservation_id } = req.params;
  const reservation = await service.getReservationById(reservation_id);
  if (reservation) {
    res.locals.reservation = reservation;
    return next();
  }
  return next({
    status: 404,
    message: `Reservation ${reservation_id} cannot be found.`,
  });
}

function statusValid(req, res, next) {
  const { status } = req.body.data;
  const resStatus = res.locals.reservation.status;
  if (
    status !== "booked" &&
    status !== "seated" &&
    status !== "finished" &&
    status !== "cancelled"
  ) {
    return next({
      status: 400,
      message:
        "Status is unknown. Status must be booked, seated, cancelled, or finished",
    });
    // errors.push("Request status must be booked, seated, or finished")
  }
  if (resStatus === "finished") {
    return next({
      status: 400,
      message: "A finished reservation cannot be updated",
    });
    // errors.push("A finished reservation cannot be updated")
  }

  next();
}

async function updateStatus(req, res, next) {
  const { status } = req.body.data;
  const { reservation_id } = req.params;
  const updatedReservation = await service.updateStatus(status, reservation_id);
  res.status(200).json({ data: updatedReservation });
}

async function updateReservation(req, res, next) {
  const { reservation_id } = req.params;
  const updatedReservation = {
    ...req.body.data,
    reservation_id: reservation_id,
  };
  let data = await service.updateReservation(updatedReservation);
  res.json({ data });
}

module.exports = {
  list: [asyncErrorBoundary(list)],
  getReservationById: [
    asyncErrorBoundary(reservationIdExists),
    getReservationById,
  ],
  create: [errorValidation, asyncErrorBoundary(create)],
  updateStatus: [
    asyncErrorBoundary(reservationIdExists),
    statusValid,
    asyncErrorBoundary(updateStatus),
  ],
  updateReservation: [asyncErrorBoundary(reservationIdExists), errorValidation, asyncErrorBoundary(updateReservation)],
};
