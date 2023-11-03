const knex = require("../db/connection");

function listTables() {
  return knex("tables").select("*").orderBy("table_name");
}

function create(newTable) {
  return knex("tables")
    .insert(newTable)
    .returning("*")
    .then((res) => res[0]);
}

function read(table_id) {
  return knex("tables").select("*").where({ table_id }).first();
}

function getReservationById(reservation_id) {
  return knex("reservations").select("*").where({ reservation_id }).first();
}

function update(reservation_id, table_id) {
  return knex("tables")
    .select("*")
    .where({ table_id })
    .update({ reservation_id: reservation_id })
    .returning("*")
    .then((res) => res[0])
    .then(() => {
      return knex("reservations")
        .where({ reservation_id })
        .update({ status: "seated" })
    });
}

function destroy(reservation_id) {
  return knex("tables")
    .select("*")
    .where({ reservation_id })
    .update({ reservation_id: null });
}

function resStatusFinished(reservation_id) {
  return knex("reservations")
    .select("*")
    .where({ reservation_id })
    .update({ status: "finished" })
    .returning("*")
    .then((res) => res[0]);
}

module.exports = {
  listTables,
  getReservationById,
  create,
  read,
  update,
  destroy,
  resStatusFinished,
};
