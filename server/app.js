require("dotenv").config();
const express = require("express");
const sequelize = require("./db");
const models = require("./models/models");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const fileUpload = require("express-fileupload");
const router = require("./routes/index");
const errorHandler = require("./middleware/ErrorHandlingMiddleware");
const path = require("path");

const PORT = process.env.PORT || 3000;

const corsOptions = {
  optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
  credentials: true,
  origin: true,
};

const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(cors({ ...corsOptions }));
app.use(express.static(path.resolve((__dirname, "static"))));
app.use(fileUpload({}));
app.use("/api", router);
// Последний middleware
app.use(errorHandler);

const start = async () => {
  try {
    await sequelize.authenticate();
    await sequelize.sync();
    app.listen(PORT, () => console.log(`Приложение запущено на порте ${PORT}`));
  } catch (e) {
    console.error("Произошла ошибка при запуске сервера", e.message);
  }
};
start().then();
