const knex = require("../db/connection");

function listReservations(date) {
  return knex("reservations")
    .select("*")
    .where({ reservation_date: date })
    .whereNot({ status: "finished" })
    .whereNot({ status: "cancelled" })
    .orderBy("reservation_time");
}

function search(mobile_number) {
  return knex("reservations")
    .whereRaw(
      "translate(mobile_number, '() -', '') like ?",
      `%${mobile_number.replace(/\D/g, "")}%`
    )
    .orderBy("reservation_date");
}

function create(newReservation) {
  return knex("reservations")
    .insert(newReservation)
    .returning("*")
    .then((res) => res[0]);
}

function getReservationById(reservation_id) {
  return knex("reservations").select("*").where({ reservation_id }).first();
}

function updateStatus(status, reservation_id) {
  return knex("reservations")
    .select("*")
    .where({ reservation_id })
    .update({ status })
    .returning("*")
    .then((res) => res[0]);
}

function updateReservation(updatedReservation) {
  return knex("reservations")
    .select("*")
    .where({ reservation_id: updatedReservation.reservation_id })
    .update(updatedReservation, "*")
    .then(res => res[0]);
}

module.exports = {
  listReservations,
  search,
  getReservationById,
  create,
  updateStatus,
  updateReservation,
};
