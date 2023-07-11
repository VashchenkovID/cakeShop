const { Sequelize } = require("sequelize");

module.exports = new Sequelize("cakes", "postgres", "qwerasdfzxcv", {
  dialect: "postgres",
  host: "188.68.221.241",
  port: "5432",
});
