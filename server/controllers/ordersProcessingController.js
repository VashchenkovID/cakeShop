const { startOfMonth, endOfMonth } = require("date-fns");
const { Op } = require("sequelize");
const {
  Basket,
  IndividualOrder,
  BasketDevice,
  IndividualOrderItem,
} = require("../models/models");
const ApiError = require("../Error/ApiError");

class OrdersProcessingController {
  async getOrders(req, res, next) {
    try {
      let { date } = req.params;
      let fromDate;
      let toDate;
      if (date) {
        fromDate = startOfMonth(new Date(date));
        toDate = endOfMonth(new Date(date));
      }
      const baskets = await Basket.findAll({
        where: { createdAt: { [Op.between]: [fromDate, toDate] } },
        include: [{ model: BasketDevice, as: "items" }],
      });
      const individualOrders = await IndividualOrder.findAll({
        where: { createdAt: { [Op.between]: [fromDate, toDate] } },
        include: [{ model: IndividualOrderItem, as: "items" }],
      });

      return res.json({
        items: [
          ...baskets
            .map((basket) => {
              return {
                ...basket.dataValues,
                type: "custom",
              };
            })
            .filter(
              (itm) => itm.status !== "COMPLETED" || itm.status !== "REJECTED"
            ),
          ...individualOrders
            .map((order) => {
              return {
                ...order.dataValues,
                type: "unauthorized",
              };
            })
            .filter(
              (itm) => itm.status !== "COMPLETED" || itm.status !== "REJECTED"
            ),
        ],
      });
    } catch (e) {
      next(ApiError.badRequest(e.message));
    }
  }
  async getHistory(req, res, next) {
    try {
      let { date } = req.params;
      let fromDate;
      let toDate;
      if (date) {
        fromDate = startOfMonth(new Date(date));
        toDate = endOfMonth(new Date(date));
      }
      const baskets = await Basket.findAll({
        where: { createdAt: { [Op.between]: [fromDate, toDate] } },
        include: [{ model: BasketDevice, as: "items" }],
      });
      const individualOrders = await IndividualOrder.findAll({
        where: { createdAt: { [Op.between]: [fromDate, toDate] } },
        include: [{ model: IndividualOrderItem, as: "items" }],
      });

      return res.json({
        items: [
          ...baskets.map((basket) => {
            return {
              ...basket.dataValues,
              type: "custom",
            };
          }),
          ...individualOrders.map((order) => {
            return {
              ...order.dataValues,
              type: "unauthorized",
            };
          }),
        ],
      });
    } catch (e) {
      next(ApiError.badRequest(e.message));
    }
  }
  async updateOrder(req, res, next) {
    try {
      const { type, status: newStatus } = req.body;
      const { id } = req.params;
      if (type) {
        if (type === "custom") {
          const oldOrder = await Basket.findOne({
            where: { id },
          });
          if (oldOrder) {
            await Basket.upsert({
              id: id,
              ...oldOrder.dataValues,
              status: newStatus.toString(),
            }).then((r) => {
              return res.json({ updateItem: r });
            });
          }
        }
        if (type === "unauthorized") {
          const oldOrder = await IndividualOrder.findOne({
            where: { id },
          });
          if (oldOrder) {
            await IndividualOrder.upsert({
              id: id,
              ...oldOrder.dataValues,
              status: newStatus.toString(),
            }).then((r) => {
              return res.json({ updateItem: r });
            });
          }
        }
      }
    } catch (e) {
      console.log(e.message);
    }
  }
}
module.exports = new OrdersProcessingController();
