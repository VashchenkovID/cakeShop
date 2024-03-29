const ApiError = require("../Error/ApiError");
const bcrypt = require("bcrypt");
const { User, Basket } = require("../models/models");
const jwt = require("jsonwebtoken");
const TokenService = require("../services/token-service");
const userService = require("../services/user-service");

const generateJwt = (id, email, role) => {
  return jwt.sign({ id, email, role }, process.env.SECRET_KEY, {
    expiresIn: "24h",
  });
};

class UserController {
  async registration(req, res, next) {
    const { email, password, fullName, phone } = req.body;
    if (!email || !password) {
      return next(ApiError.badRequest("Некорректный email или password"));
    }
    const candidate = await User.findOne({ where: { email } });
    if (candidate) {
      return next(
        ApiError.badRequest("Пользователь с таким email уже существует")
      );
    }
    const hashPassword = await bcrypt.hash(password, 5);
    const user = await User.create({
      email:email,
      role: "USER",
      password: hashPassword,
      fullName: fullName,
      phone: phone,
    });

    const tokens = TokenService.generateTokens({
      id: user.id,
      role: user.role,
      email: user.email,
      phone: user.phone,
      fullName: user.fullName,
    });

    const dataToken = await TokenService.saveToken(
      user.id,
      tokens.refreshToken
    );
    await User.upsert(
      {
        id: user.id,
        email: user.email,
        role: user.role,
        password: hashPassword,
        fullName: user.fullName,
        phone: user.phone,
        TokenId: dataToken.id,
      },
      { where: { UserId: user.id } }
    );
    return res.json({
      ...tokens,
      user: {
        role: user.role,
        name: user.fullName,
        phone: user.phone,
        id: user.id,
      },
    });
  }
  async login(req, res, next) {
    try {
      const { email, password } = req.body;
      const user = await User.findOne({ where: { email } });
      if (!user) {
        return next(ApiError.internal("Пользователь не найден"));
      }
      let comparePassword = bcrypt.compareSync(password, user.password);
      if (!comparePassword) {
        return next(ApiError.internal("Указан неверный пароль"));
      }
      const tokens = TokenService.generateTokens({
        id: user.id,
        role: user.role,
        email: user.email,
        phone: user.phone,
        fullName: user.fullName,
      });
      const dataToken = await TokenService.saveToken(
        user.id,
        tokens.accessToken
      );
      await User.upsert(
        {
          id: user.id,
          email: user.email,
          role: user.role,
          password: user.password,
          fullName: user.fullName,
          phone: user.phone,
          TokenId: dataToken.id,
        },
        { where: { UserId: user.id } }
      );
      return res.json({
        ...tokens,
        user: {
          role: user.role,
          name: user.fullName,
          phone: user.phone,
          id: user.id,
        },
      });
    } catch (e) {
      next(e);
    }
  }
  async logout(req, res, next) {
    try {
      const refreshToken = req.headers.authorization.split(" ")[1]; // Bearer asfasnfkajsfnjk
      const token = await TokenService.removeToken(refreshToken);
      return res.json(token);
    } catch (e) {
      next(e);
    }
  }
  async refresh(req, res, next) {
    try {
      const refreshToken = req.headers.authorization.split(" ")[1]; // Bearer asfasnfkajsfnjk
      const userData = await userService.refresh(refreshToken);
      return res.json(userData);
    } catch (e) {
      next(e);
    }
  }
}

module.exports = new UserController();
