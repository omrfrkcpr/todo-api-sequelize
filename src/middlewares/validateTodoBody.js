"use strict";

//* Middleware to validate request body
const validateTodoBody = (req, res, next) => {
  // const { title, description, priority, isDone } = req.body;
  const allowedKeys = ["title", "description", "priority", "isDone"];
  const keys = Object.keys(req.body);

  const isValid = keys.every((key) => allowedKeys.includes(key));

  if (!isValid) {
    return res.status(403).send({
      errorCode: 403,
      message: "Invalid request body",
    });
  }
  next();
};

module.exports = validateTodoBody;
