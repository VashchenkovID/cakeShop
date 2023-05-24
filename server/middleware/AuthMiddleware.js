const jwt = require("jsonwebtoken");
const TokenService = require("../services/token-service");

module.exports = function (req, res, next) {
  if (req.method === "OPTIONS") {
    next();
  }
  try {
    const token = req.headers.authorization.split(" ")[1]; // Bearer asfasnfkajsfnjk
    if (!token) {
      return res.status(401).json({ message: "Не авторизован" });
    }
    req.user = TokenService.validateAccessToken();
    next();
  } catch (e) {
    res.status(401).json({ message: "Не авторизован" });
  }
};
