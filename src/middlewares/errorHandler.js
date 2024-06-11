"use strict";

//* error control

const errorHandler = (err, req, res, next) => {
  const errorStatusCode = res?.errorStatusCode || 500;
  res.status(errorStatusCode).send({
    error: true,
    status: false,
    message: err.message,
    // cause: err.cause,
    // stack: err.stack,
  });
};

module.exports = errorHandler;
