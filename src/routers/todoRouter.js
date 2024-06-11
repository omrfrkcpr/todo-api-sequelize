"use strict";

/* ---------------------------------- */
/*        EXPRESSJS TODO ROUTER       */
/* ---------------------------------- */

const router = require("express").Router();

const validateTodoBody = require("../middlewares/validateTodoBody.js");

const {
  list,
  create,
  read,
  update,
  destroy,
} = require("../controllers/todoController.js");

router.route("/todos").get(list).post(validateTodoBody, create);

router
  .route("/todos/:id")
  .get(read)
  .put(validateTodoBody, update)
  .patch()
  .delete(destroy);

module.exports = router;
