"use strict";

/* ---------------------------------- */
/*       EXPRESSJS TODO MODEL         */
/* ---------------------------------- */

const { sequelize, DataTypes } = require("../configs/connectDB");

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
    // type: DataTypes.TINYINT, // sqlite
    type: DataTypes.INTEGER, // postgre
    allowNull: false,
    defaultValue: 0, // -1: low, 0: normal, 1: high
  },
  isDone: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: false, // false: not done, true: done
    // validate: {
    //   isBoolean(value) {
    //     if (typeof value !== "boolean") {
    //       throw new Error("isDone must be a boolean value");
    //     }
    //   },
    // },
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
sequelize.sync(); //! run once
// sequelize.sync({force: true}) //! if later needed = DROP tables + re-CREATE tables
// sequelize.sync({ alter: true }); //! if later needed = BACK-UP db + DROP tables + re-CREATE tables + RECOVER old db

//* async method for connecting to db
sequelize
  .authenticate()
  .then(() => {
    console.log("Todo DB connected");
    return sequelize.sync(); // Make sure the model is synced
  })
  .catch((err) => console.log(`Todo DB not connected`, err));

module.exports = TODO;
