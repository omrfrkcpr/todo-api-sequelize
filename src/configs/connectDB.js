"use strict";

/* ---------------------------------- */
/*      EXPRESSJS TODO CONFIG         */
/* ---------------------------------- */

//* express to DB connection
// https://sequelize.org/docs/v6/getting-started/
const { Sequelize, DataTypes } = require("sequelize");

const DB = process.env.DB_NAME;
const postgre_username = process.env.POSTGRE_USERNAME;
const postgre_password = process.env.POSTGRE_PASSWORD;
const postgre_port = process.env.POSTGRE_PORT;

let sequelize;

if (DB === "SQLITE") {
  // const sequelize = new Sequelize("RDB_name:address");
  sequelize = new Sequelize("sqlite:./db.sqlite3");
} else if (DB === "POSTGRE") {
  // sequelize = new Sequelize("postgres://USERNAME:PASSWORD@HOST:PORT/todo");
  sequelize = new Sequelize(
    `postgres://${postgre_username}:${postgre_password}@${process.env.HOST}:${postgre_port}/todo`
  );
}

module.exports = { sequelize, DataTypes };
