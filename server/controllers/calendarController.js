const ApiError = require("../Error/ApiError");
const {
  startOfMonth,
  endOfMonth,
  getDaysInMonth,
  getMonth,
} = require("date-fns");
const {
  Basket,
  BasketDevice,
  IndividualOrder,
  IndividualOrderItem,
} = require("../models/models");
const { Op } = require("sequelize");

class CalendarController {
  async getCalendar(req, res, next) {
    try {
      const { date } = req.params;
      let fromDate;
      const datesCount = getDaysInMonth(new Date(date));
      let calendar = [];
      const month = getMonth(new Date(date));
      const year = new Date(date).getFullYear();
      for (let i = 0; i <= datesCount; i++) {
        calendar.push(new Date(year, month, i + 1));
      }
      let toDate;
      if (date) {
        fromDate = startOfMonth(new Date(date));
        toDate = endOfMonth(new Date(date));
      }
      const baskets = await Basket.findAll({
        where: {
          date_completed: { [Op.between]: [fromDate, toDate] },
        },
        include: [{ model: BasketDevice, as: "items" }],
      });
      const individualOrders = await IndividualOrder.findAll({
        where: {
          date_completed: { [Op.between]: [fromDate, toDate] },
          status: "COMPLETED",
        },
        include: [{ model: IndividualOrderItem, as: "items" }],
      });

      const calendarWithOrders = calendar.map((date) => {
        if (
          baskets.find(
            (basket) =>
              new Date(basket.date_completed).toLocaleDateString() ===
              new Date(date).toLocaleDateString()
          )
        ) {
          const findedBasket = baskets.find(
            (basket) =>
              new Date(basket.date_completed).toLocaleDateString() ===
              new Date(date).toLocaleDateString()
          );
          if (
            individualOrders.find(
              (order) =>
                new Date(order.date_completed).toLocaleDateString() ===
                new Date(date).toLocaleDateString()
            )
          ) {
            const findedOrder = individualOrders.find(
              (order) =>
                new Date(order.date_completed).toLocaleDateString() ===
                new Date(date).toLocaleDateString()
            );
            return { date: date, orders: [findedBasket, findedOrder] };
          }
          return { date: date, orders: [findedBasket] };
        } else return { date: date, orders: [] };
      });

      return res.json(calendarWithOrders);
    } catch (e) {
      console.log(e.message);
    }
  }
}
module.exports = new CalendarController();
