const jwt = require("jsonwebtoken");
const TokenService = require("../services/token-service");

module.exports = function (req, res, next) {
  try {
    const authorizationHeader = req.headers.authorization;
    if (!authorizationHeader) {
      return next('Не авторизован');
    }

    const accessToken = authorizationHeader.split(" ")[1];
    if (!accessToken) {
      return next('Не авторизован');
    }

    const userData = TokenService.validateAccessToken(accessToken);
    if (!userData) {
      return next('Не авторизован');
    }

    req.user = userData;
    next();
  } catch (e) {
    return next('Не авторизован');
  }
};
