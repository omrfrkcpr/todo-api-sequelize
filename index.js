"use strict";

// npm i express dotenv
// npm i express-async-error
// npm install sequelize sqlite3

require("dotenv").config();

const PORT = process.env?.PORT || 8000;
const HOST = process.env?.HOST || "127.0.0.1";

const express = require("express");
const app = express();

// All responses only to "/"
app.all("/", (req, res) => {
  res.send("TODO APP");
});

// Use responses to all routes except "/"
app.use("/todo", (req, res) => {
  res.send("TODO APP");
});

// json to obj and obj to json
app.use(express.json());

// error control
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

app.listen(PORT, () => console.log(`server runned http://${HOST}:${PORT}`));
