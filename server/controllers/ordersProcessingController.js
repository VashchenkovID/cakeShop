const { startOfMonth, endOfMonth } = require("date-fns");
const { Op } = require("sequelize");
const {
  Basket,
  IndividualOrder,
  BasketDevice,
  IndividualOrderItem,
  OrderDecor,
  OrderDecorItem,
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
        where: {
          date_completed: {
            [Op.between]: [fromDate.toISOString(), toDate.toISOString()],
          },
        },
        include: [{ model: BasketDevice, as: "items" }],
      });
      const individualOrders = await IndividualOrder.findAll({
        where: {
          date_completed: {
            [Op.between]: [fromDate.toISOString(), toDate.toISOString()],
          },
        },
        include: [{ model: IndividualOrderItem, as: "items" }],
      });

      const orderDecors = await OrderDecor.findAll({
        include: [{ model: OrderDecorItem, as: "items" }],
      });

      return res.json({
        items: [
          ...baskets
            .map((basket) => {
              return {
                ...basket.dataValues,
                type: "custom",
                decors: orderDecors.filter((dec) => basket.id === dec.BasketId),
                items: basket.dataValues.items.map((itm) => {
                  return {
                    ...itm.dataValues,
                  };
                }),
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
                items: order.dataValues.items.map((itm) => {
                  return {
                    ...itm.dataValues,
                  };
                }),
                decors: orderDecors.filter(
                  (dec) => order.id === dec.IndividualOrderId
                ),
              };
            })
            .filter(
              (itm) => itm.status !== "COMPLETED" || itm.status !== "REJECTED"
            ),
        ].map((element, index) => {
          return { ...element, dropId: index };
        }),
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
        where: { date_completed: { [Op.between]: [fromDate, toDate] } },
      });
      const individualOrders = await IndividualOrder.findAll({
        where: { date_completed: { [Op.between]: [fromDate, toDate] } },
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
        ]
          .filter(
            (item) => item.status === "COMPLETED" || item.status === "REJECTED"
          )
          .map((item, index) => {
            return { ...item, dropId: index };
          }),
      });
    } catch (e) {
      next(ApiError.badRequest(e.message));
    }
  }
  async getHistoryOrder(req, res, next) {
    try {
      let { id, type } = req.params;
      let order;
      let decors;
      if (type === "custom") {
        decors = await OrderDecor.findAll({
          where: {
            BasketId: id,
          },
          include: [{ model: OrderDecorItem, as: "items" }],
        });
        order = await Basket.findOne({
          where: { id },
          include: [{ model: BasketDevice, as: "items" }],
        });
      }
      if (type === "unauthorized") {
        decors = await OrderDecor.findAll({
          where: {
            IndividualOrderId: id,
          },
          include: [{ model: OrderDecorItem, as: "items" }],
        });
        order = await IndividualOrder.findOne({
          where: {
            id: id,
          },
          include: [{ model: IndividualOrderItem, as: "items" }],
        });
      }
      let returnedItem = { ...order.dataValues, decors: decors };
      return res.json(returnedItem);
    } catch (e) {
      next(ApiError(e.message));
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
