/**
 * Defines the router for tables resources.
 *
 * @type {Router}
 */
const methodNotAllowed = require("../errors/methodNotAllowed");

const router = require("express").Router();
const controller = require("./tables.controller");

router
  .route("/:table_id/seat")
  .put(controller.update)
  .delete(controller.destroy)
  .all(methodNotAllowed);

router
  .route("/")
  .get(controller.list)
  .post(controller.create)
  .all(methodNotAllowed);

module.exports = router;
