"use strict";

/* ---------------------------------- */
/*      EXPRESSJS TODO CONFIG         */
/* ---------------------------------- */

//* express to DB connection
// https://sequelize.org/docs/v6/getting-started/
const { Sequelize, DataTypes } = require("sequelize");
const sequelize = new Sequelize("sqlite:./db.sqlite3"); // (RDMS:address)

module.exports = { sequelize, DataTypes };
