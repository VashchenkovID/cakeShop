const ApiError = require("../Error/ApiError");
const { startOfMonth, endOfMonth } = require("date-fns");
const { UniqUser } = require("../models/models");
const { Op } = require("sequelize");

class UniqUsersController {
  async getUniqUsers(req, res, next) {
    let { date, type } = req.params;
    let fromDate;
    let toDate;
    let users = [];

    if (type === 'month') {
      fromDate = startOfMonth(new Date(date));
      toDate = endOfMonth(new Date(date));
      users = await UniqUser.findAll({
        where: {
          createdAt: {
            [Op.between]: [fromDate.toISOString(), toDate.toISOString()],
          },
        },
      });
    } else {
      users = await UniqUser.findAll();
    }
    return res.json({ users: users.length, usersFull: users });
  }
}

module.exports = new UniqUsersController();
