const { Sequelize } = require("sequelize");

module.exports = new Sequelize("myCakeShop", "postgres", "revolution67rus", {
  dialect: "postgres",
  host: "localhost",
  port: "5432",
});
