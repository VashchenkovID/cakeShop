const ApiError = require("../Error/ApiError");
const { startOfMonth, endOfMonth } = require("date-fns");
const { UniqUser } = require("../models/models");
const { Op } = require("sequelize");

class UniqUsersController {
  async getUniqUsers(req, res, next) {
    try {
      let { date } = req.params;
      let fromDate;
      let toDate;
      let users = [];

      if (date) {
        fromDate = startOfMonth(new Date(date));
        toDate = endOfMonth(new Date(date));
        users = await UniqUser.findAll({
          where: {
            date_completed: {
              [Op.between]: [fromDate.toISOString(), toDate.toISOString()],
            },
          },
        });
      } else {
        users = await UniqUser.findAll;
      }
      return res.json(users);
    } catch (e) {
      next(ApiError(e.message));
    }
  }
}

module.exports = new UniqUsersController();
