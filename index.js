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

//* All responses only to "/"
app.all("/", (req, res) => {
  res.send("TODO APP");
});

//* Use responses to all routes except "/"
// app.use("/todo", (req, res) => {
//   res.send("TODO APP");
// });

//* json to obj and obj to json
app.use(express.json());

//* express to DB connection
// https://sequelize.org/docs/v6/getting-started/
const { Sequelize, DataTypes } = require("sequelize");
const sequelize = new Sequelize("sqlite:./db.sqlite3"); // (RDMS:address)

//* create MODEL
// const TODO = sequelize.define(`table / model name`, {"model details"});
const TODO = sequelize.define(`todos`, {
  //! id field auto generated
  // id: {
  //   type: DataTypes.BIGINT,
  //   autoIncrement: true, // default false
  //   primaryKey: true, // default false
  //   unique: true, // default false
  //   allowNull: false, // default true
  //   defaultValue: "default value",
  //   comment: "my comment",
  //   field: "custom name",
  // },
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  description: DataTypes.TEXT, // just type
  // description: {
  //   type: DataTypes.TEXT,
  // },
  priority: {
    type: DataTypes.TINYINT,
    allowNull: false,
    defaultValue: 0, // -1: low, 0: normal, 1: high
  },
  isDone: {
    type: DataTypes.BOOLEAN,
    // allowNull: false,
    defaultValue: false, // false: not done, true: done
  },
  //! createdAt & updatedAt auto generated
  // createdAt: {
  //   type: DataTypes.DATE,
  //   defaultValue: DataTypes.NOW,
  // },
  // updatedAt: {
  //   type: DataTypes.DATE,
  //   defaultValue: DataTypes.NOW,
  // }
});

//* SYNC SEQUELIZE
// sequelize.sync() //! run once
// sequelize.sync({force: true}) //! if later needed = DROP tables + re-CREATE tables
// sequelize.sync({alter: true}) //! if later needed = BACK-UP db + DROP tables + re-CREATE tables + RECOVER old db

//* async method for connecting to db
sequelize
  .authenticate()
  .then(() => {
    console.log("Todo DB connected");
    return sequelize.sync(); // Make sure the model is synced
  })
  .catch((err) => console.log(`Todo DB not connected`, err));

//* ROUTER
const router = express.Router();
app.use(router);

//* Middleware
// Middleware to validate request body
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

//* CRUD Operations

// LIST all todos
router.get("/todos", async (req, res) => {
  try {
    const todos = await TODO.findAll();
    if (!todos) {
      res.status(404).send({
        error: true,
        errorCode: res.statusCode,
        message: "There is no todo item",
      });
    }
    res.status(200).send({
      error: false,
      status: true,
      data: todos,
    });
  } catch (err) {
    throw new Error(err.message);
  }
});

// CREATE todo
router.post("/todos", validateTodoBody, async (req, res) => {
  try {
    const newTodo = await TODO.create(req.body);
    res.status(201).send({
      error: false,
      status: true,
      data: newTodo,
    });
  } catch (err) {
    throw new Error(err.message);
  }
});

// READ todo (Single todo)
router.get("/todos/:id", async (req, res) => {
  try {
    const { id } = req.params;
    // const todo = await TODO.findOne({where: {id: req.params.id}});
    const todo = await TODO.findByPk(id);
    if (!todo) {
      res.status(404).send({
        error: true,
        errorCode: res.statusCode,
        message: `Todo with id number ${id} was not found`,
      });
    }
    res.send({
      error: false,
      status: true,
      data: todo,
    });
  } catch (err) {
    throw new Error(err.message);
  }
});

// UPDATE todo
// DELETE todo

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

app.use(errorHandler);

app.listen(PORT, () => console.log(`server runned http://${HOST}:${PORT}`));
