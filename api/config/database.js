// config/database.js
const { Sequelize } = require("sequelize");

const sequelize = new Sequelize("messenger", "root", "", {
  host: "localhost",
  dialect: "mysql",
});

module.exports = sequelize;
