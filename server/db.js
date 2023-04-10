const { Sequelize } = require("sequelize");

module.exports = new Sequelize("cakeShopAlexa", "postgres", "revolution67rus", {
  dialect: "postgres",
  host: "localhost",
  port: "5432",
});
