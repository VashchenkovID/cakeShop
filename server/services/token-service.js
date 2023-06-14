const jwt = require("jsonwebtoken");
const { Token } = require("../models/models");
const ApiError = require("../Error/ApiError");
class TokenService {
  generateTokens(payload) {
    const accessToken = jwt.sign(payload, process.env.JWT_ACCESS_SECRET_KEY, {
      expiresIn: "24h",
    });
    const refreshToken = jwt.sign(payload, process.env.JWT_REFRESH_SECRET_KEY, {
      expiresIn: "30d",
    });
    return { accessToken, refreshToken };
  }
  async saveToken(userId, refreshToken) {
    const tokenData = await Token.findOne({ where: { UserId: userId } });
    if (tokenData) {
      tokenData.refreshToken = refreshToken;
      return tokenData.save();
    }
    const token = await Token.create({
      UserId: userId,
      refreshToken: refreshToken,
    });
    return token;
  }
  validateAccessToken(token) {
    try {
      const userData = jwt.verify(
        token,
        process.env.JWT_ACCESS_SECRET_KEY,
        function (err, decoded) {
          if (err) {
            console.log("err");
          } else {
            return decoded;
          }
        }
      );
      return userData;
    } catch (e) {
      return null;
    }
  }

  validateRefreshToken(token) {
    try {
      const userData = jwt.verify(token, process.env.JWT_REFRESH_SECRET_KEY);
      return userData;
    } catch (e) {
      return null;
    }
  }

  async removeToken(refreshToken) {
    return await Token.destroy({ where: { refreshToken } });
  }
  async findToken(refreshToken) {
    return await Token.findOne({ where: { refreshToken: refreshToken } });
  }
}
module.exports = new TokenService();
