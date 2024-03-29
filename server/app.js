require("dotenv").config();
const express = require("express");
const sequelize = require("./db");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const fileUpload = require("express-fileupload");
const router = require("./routes/index");
const errorHandler = require("./middleware/ErrorHandlingMiddleware");
const path = require("path");

const PORT = process.env.PORT || 3000;

const corsOptions = {
  origin: [
    process.env.CLIENT_ADMIN_URL,
    process.env.CLIENT_CLIENT_URL,
    "http://84.38.180.242:5173",
    "http://84.38.180.242:3002",
    "http://kassandras-cake.ru",
  ],
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
