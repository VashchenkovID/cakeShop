const { Sequelize } = require("sequelize");

module.exports = new Sequelize(
  "alexaCake-store",
  "postgres",
  "revolution67rus",
  {
    dialect: "postgres",
    host: 'localhost',
    port:'5432'
  }
);
