const { Rating, User } = require("../models/models");
const ApiError = require("../Error/ApiError");
const jwt = require("jsonwebtoken");
const TokenService = require("../services/token-service");

class RatingsController {
  async create(req, res, next) {
    try {
      const { rating, ratingComment, device_id } = req.body;
      const token = req.headers?.authorization?.split(" ")[1]; // Bearer asfasnfkajsfnjk
      let newRating;
      if (token !== "null") {
        const user = TokenService.validateAccessToken(token);
        newRating = await Rating.create({
          rating: rating,
          ratingComment: ratingComment,
          deviceId: device_id,
          UserId: user.id,
        });
      } else {
        newRating = await Rating.create({
          rating: rating,
          ratingComment: ratingComment,
          deviceId: device_id,
        });
      }

      if (newRating) {
        return res.json({ id: newRating.id });
      } else return res.status(500).json({ message: "Ошибка при создании" });
    } catch (e) {
      // next(ApiError("Ошибка при создании", e.message));
    }
  }
  async update(req, res, next) {
    try {
      const { rating, ratingComment } = req.body;
      const { id } = req.params;

      const newRating = await Rating.upsert({
        id: id,
        rating: rating,
        ratingComment: ratingComment,
      });

      if (newRating) {
        return res.json({ rating: newRating });
      } else
        return res.status(500).json({ message: "Ошибка при редактировании" });
    } catch (e) {
      next(ApiError("Ошибка при редактировании"));
    }
  }
  async remove(req, res, next) {
    try {
      const { id } = req.params;
      await Rating.destroy({
        where: { id },
      });
      return res.json({ message: "OK" });
    } catch (e) {
      next(ApiError("Ошибка при удалении"));
    }
  }
  async getDeviceNotUserRatings(req, res, next) {
    try {
      let { limit, page, device_id } = req.query;
      const token = req.headers.authorization.split(" ")[1]; // Bearer asfasnfkajsfnjk
      const reqUser = TokenService.validateAccessToken(token);

      page = page || 1;
      limit = limit || 9;
      let offset = page * limit - limit;
      let ratings;
      let ratingsWithUser;
      const users = await User.findAll();
      if (device_id) {
        ratings = await Rating.findAndCountAll({
          limit,
          offset,
          where: { deviceId: device_id },
        });
        ratingsWithUser = ratings.rows;
      } else ratings = [];
      return res.json({
        count: ratings.count,
        rows: ratingsWithUser.map((rait) => {
          return {
            ...rait?.dataValues,
            user:
              users.find((user) => user.id === rait?.dataValues.UserId)
                ?.fullName || "Аноним",
          };
        }),
        // .filter((rating) => rating.UserId !== reqUser.id),
      });
    } catch (e) {
      next(ApiError("Ошибка при запросе"));
    }
  }
  async getDeviceRatings(req, res, next) {
    try {
      let { limit, page, device_id } = req.query;
      page = page || 1;
      limit = limit || 9;
      let offset = page * limit - limit;
      let ratings;
      let ratingsWithUser;
      const users = await User.findAll();
      if (device_id) {
        ratings = await Rating.findAndCountAll({
          limit,
          offset,
          where: { deviceId: device_id },
        });
        ratingsWithUser = ratings.rows;
      } else ratings = [];
      return res.json({
        count: ratings.count,
        rows: ratingsWithUser.map((rait) => {
          return {
            ...rait.dataValues,
            user:
              users.find((user) => user.id === rait.dataValues.UserId)
                ?.fullName || "Аноним",
          };
        }),
      });
    } catch (e) {
      next(ApiError("Ошибка при запросе"));
    }
  }
  async getUserRatings(req, res, next) {
    try {
      let { limit, page, user_id } = req.query;
      page = page || 1;
      limit = limit || 9;
      let offset = page * limit - limit;
      let ratings;
      if (user_id) {
        ratings = await Rating.findAndCountAll({
          limit,
          offset,
          where: { UserId: user_id },
        });
      } else ratings = [];
      return res.json(ratings);
    } catch (e) {
      next(ApiError("Ошибка при запросе"));
    }
  }
}

module.exports = new RatingsController();
