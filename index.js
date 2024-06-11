"use strict";

// npm i express dotenv
// npm i express-async-error
// npm i sequelize sqlite3

const PORT = process.env?.PORT || 8000;
const HOST = process.env?.HOST || "127.0.0.1";

const express = require("express");
const app = express();
require("express-async-error");
require("dotenv").config();

// Middlewares
const errorHandler = require("./src/middlewares/errorHandler.js");

app.use(errorHandler);

//* json to obj and obj to json
app.use(express.json());

app.use(require("./src/routers/todoRouter"));

// All responses only to "/"
app.all("/", (req, res) => {
  res.send("TODO APP");
});

// Use responses to all routes except "/"
// app.use("/todo", (req, res) => {
//   res.send("TODO APP");
// });

app.listen(PORT, () => console.log(`server runned http://${HOST}:${PORT}`));
