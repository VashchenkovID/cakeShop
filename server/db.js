const { Sequelize } = require("sequelize");

module.exports = new Sequelize("cakes", "postgres", "qwerasdfzxcv", {
  dialect: "postgres",
  host: "84.38.180.242",
  port: "5432",
});
