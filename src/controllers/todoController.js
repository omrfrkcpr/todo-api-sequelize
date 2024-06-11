"use strict";

/* ---------------------------------- */
/*      EXPRESSJS TODO CONTROLLER     */
/* ---------------------------------- */

const TODO = require("../models/todoModel");

//* CRUD OPERATIONS
module.exports = {
  list: async (req, res) => {
    try {
      // const todos = await TODO.findAndCountAll();
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
        count: todos.length,
        data: todos,
      });
    } catch (err) {
      throw new Error(err.message);
    }
  },
  create: async (req, res) => {
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
  },
  read: async (req, res) => {
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
  },
  update: async (req, res) => {
    try {
      const { id } = req.params;
      const todo = await TODO.findByPk(id);
      if (!todo) {
        res.status(404).send({
          error: true,
          errorCode: res.statusCode,
          message: `Todo with id number ${id} was not found`,
        });
      }
      const updatedTodo = await todo.update(req.body);
      res.send({
        error: false,
        status: true,
        data: updatedTodo,
      });
    } catch (err) {
      throw new Error(err.message);
    }
  },
  destroy: async (req, res) => {
    try {
      const { id } = req.params;
      const todo = await TODO.findByPk(id);
      if (!todo) {
        res.status(404).send({
          error: true,
          errorCode: res.statusCode,
          message: `Todo with id number ${id} was not found`,
        });
      }
      await todo.destroy();
      res.send({
        error: false,
        status: true,
        message: `Todo with id number ${id} is successfully deleted`,
      });
    } catch (err) {
      throw new Error(err.message);
    }
  },

  // TASKS
  //* getUnclosedTasks
};
