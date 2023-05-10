const jwt = require("jsonwebtoken");
const { Token } = require("../models/models");

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
}
module.exports = new TokenService();
