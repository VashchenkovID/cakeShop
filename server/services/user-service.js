const tokenService = require("./token-service");
const ApiError = require("../Error/ApiError");
const { User } = require("../models/models");

class UserService {
  async refresh(refreshToken) {
    if (!refreshToken) {
      throw ApiError.forbidden("Не авторизован");
    }
    const userData = tokenService.validateRefreshToken(refreshToken);
    const tokenFromDb = await tokenService.findToken(refreshToken);
    if (!userData || !tokenFromDb) {
      throw ApiError.forbidden("Не авторизован");
    }
    const user = await User.findOne({ where: { id: userData.id } });
    const tokens = tokenService.generateTokens({
      role: user.role,
      name: user.fullName,
      phone: user.phone,
      id: user.id,
    });


    await tokenService.saveToken(user.id, tokens.refreshToken);
    return {
      ...tokens,
      user: {
        role: user.role,
        name: user.fullName,
        phone: user.phone,
        id: user.id,
      },
    };
  }
}

module.exports = new UserService();
