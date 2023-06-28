const { startOfMonth, endOfMonth } = require("date-fns");
const { Op, or } = require("sequelize");
const sub = require("date-fns/sub");
const {
  Basket,
  BasketDevice,
  IndividualOrder,
  IndividualOrderItem,
  Device,
  DeviceInfo,
  OrderDecor,
  OrderDecorItem,
} = require("../models/models");
const ApiError = require("../Error/ApiError");

class AnalyticsController {
  async getPopularItems(req, res, next) {
    try {
      const { date } = req.params;
      let fromDate;
      let toDate;
      const backDate = sub(new Date(date), { months: 1 });
      let fromDateBack;
      let toDateBack;
      if (date) {
        fromDate = startOfMonth(new Date(date));
        toDate = endOfMonth(new Date(date));
      }
      if (backDate) {
        fromDateBack = startOfMonth(new Date(backDate));
        toDateBack = endOfMonth(new Date(backDate));
      }
      const baskets = await Basket.findAll({
        where: {
          date_completed: { [Op.between]: [fromDate, toDate] },
          status: "COMPLETED",
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

      const basketsBack = await Basket.findAll({
        where: {
          date_completed: { [Op.between]: [fromDateBack, toDateBack] },
        },
        include: [{ model: BasketDevice, as: "items" }],
      });
      const individualOrdersBack = await IndividualOrder.findAll({
        where: {
          date_completed: { [Op.between]: [fromDateBack, toDateBack] },
        },
        include: [{ model: IndividualOrderItem, as: "items" }],
      });
      const allOrder = [
        ...baskets
          .filter((item) => item.status === "COMPLETED")
          .map((itm) =>
            itm.items.map((i) => {
              return { ...i, deviceId: itm.deviceId };
            })
          ),
        ...individualOrders
          .filter((itm) => itm.status === "COMPLETED")
          .map((itm) =>
            itm.items.map((i) => {
              return { ...i, deviceId: itm.deviceId };
            })
          ),
      ]
        .flat()
        .map((itm) => {
          return {
            ...itm.dataValues,
            id: itm.dataValues.id,
            name: itm.dataValues.name,
            price: itm.dataValues.price,
            count: itm.dataValues.count,
            deviceId: itm.dataValues.deviceId,
          };
        });
      const allBackOrders = [
        ...basketsBack
          .filter((item) => item.status === "COMPLETED")
          .map((itm) =>
            itm.items?.map((i) => {
              return { ...i, deviceId: itm.deviceId };
            })
          ),
        ...individualOrdersBack
          .filter((itm) => itm.status === "COMPLETED")
          .map((itm) =>
            itm.items?.map((i) => {
              return { ...i, deviceId: itm.deviceId };
            })
          ),
      ]
        .flat()
        .map((itm) => {
          return {
            ...itm.dataValues,
            id: itm.dataValues.id,
            name: itm.dataValues.name,
            price: itm.dataValues.price,
            count: itm.dataValues.count,
            deviceId: itm.dataValues.deviceId,
          };
        });
      const convert = (orders) => {
        const groups = [];
        for (const element of orders) {
          const existingGroups = groups.filter(
            (group) => group.name === element.name
          );
          if (existingGroups.length > 0) {
            existingGroups[0].rows.push({
              count: element.count,
              price: element.price,
            });
          } else {
            const newGroup = {
              deviceId: element.id,
              name: element.name,
              rows: [
                {
                  count: element.count,
                  price: element.price,
                },
              ],
            };
            groups.push(newGroup);
          }
        }
        const filtered = groups.map((item) => {
          return {
            id: item.deviceId,
            name: item.name,
            price: item.rows.reduce(
              (accum, item) => accum + item.price * item.count,
              0
            ),
            count: item.rows.reduce((accum, item) => accum + item.count, 0),
          };
        });
        return filtered;
      };
      const allBackConvertOrders = convert(allBackOrders);

      return res.json({
        items: convert(allOrder).map((order) => {
          if (allBackConvertOrders.find((o) => o.name === order.name)) {
            const oldOrder = allBackConvertOrders.find(
              (o) => o.name === order.name
            );
            if (oldOrder.count < order.count) {
              return { ...order, popularity: true };
            } else return { ...order, popularity: false };
          } else return { ...order, popularity: false };
        }),
      });
    } catch (e) {
      next(ApiError.badRequest(e.message));
    }
  }

  async getMonthGraphicsSales(req, res, next) {
    try {
      const { date } = req.params;
      let fromDate;
      let toDate;
      if (date) {
        fromDate = startOfMonth(new Date(date));
        toDate = endOfMonth(new Date(date));
      }
      const baskets = await Basket.findAll({
        where: {
          date_completed: {
            [Op.between]: [fromDate, toDate],
          },
        },
        include: [{ model: BasketDevice, as: "items" }],
      });
      const individualOrders = await IndividualOrder.findAll({
        where: {
          date_completed: { [Op.between]: [fromDate, toDate] },
        },
        include: [{ model: IndividualOrderItem, as: "items" }],
      });

      const orderDecors = await OrderDecor.findAll({
        include: [{ model: OrderDecorItem, as: "items" }],
      });

      const deviceIds = [
        ...new Set(
          individualOrders.map((bt) => bt.items.map((i) => i.deviceId)).flat()
        ),
        ...new Set(baskets.map((bt) => bt.items.map((i) => i.deviceId)).flat()),
      ].filter((i) => !isNaN(i));

      let devices = [];
      for (const i of deviceIds) {
        const d = await Device.findOne({
          where: { id: i },
          include: [{ model: DeviceInfo, as: "info" }],
        });
        devices.push({
          id: d.id,
          constPrice: d.info.reduce((accum, elem) => {
            const oneConst = Number(
              Number(elem.pricePerUnit) * Number(elem.weight)
            );
            return accum + oneConst;
          }, 0),
        });
      }
      const orders = [
        ...baskets
          .filter((itm) => itm.status === "COMPLETED")
          .map((basket) => {
            return {
              ...basket.dataValues,
              type: "custom",
              items: basket.dataValues.items.map((itm) => {
                return {
                  ...itm.dataValues,
                };
              }),
              decors: orderDecors.filter((dec) => basket.id === dec.BasketId),
            };
          })
          .map((item) => {
            return {
              id: item.id,
              name: item.name,
              allPrice:
                item.items.reduce(
                  (accum, elem) =>
                    accum + Number(elem.price) * Number(elem.count),
                  0
                ) +
                item.decors
                  .map((dec) =>
                    dec.items.reduce(
                      (accum, elem) =>
                        accum + Number(elem.count) * Number(elem.pricePerUnit),
                      0
                    )
                  )
                  .reduce((acc, el) => acc + el, 0),
              constPrice:
                item.items
                  .map((it) => {
                    return {
                      ...it,
                      device: devices.find((d) => d.id === it.deviceId)
                        ?.constPrice,
                    };
                  })
                  .reduce((accum, element) => {
                    return (
                      accum +
                      Number(element.device) *
                        Number(element.count) *
                        Number(element.countWeightType)
                    );
                  }, 0) +
                item.decors
                  .map((decor) =>
                    decor.items.reduce((acc, el) => {
                      console.log("testLog", el.count, el.constPrice);
                      return acc + Number(el.count) * Number(el.constPrice);
                    }, 0)
                  )
                  .reduce((acc, el) => acc + el, 0),
              date_completed: item.date_completed,
              type: "custom",
            };
          }),
        ...individualOrders
          .filter((itm) => itm.status === "COMPLETED")
          .map((basket) => {
            return {
              ...basket.dataValues,
              type: "unauthorized",
              items: basket.dataValues.items.map((itm) => {
                return {
                  ...itm.dataValues,
                };
              }),
              decors: orderDecors.filter(
                (dec) => basket.id === dec.IndividualOrderId
              ),
            };
          })
          .map((item) => {
            return {
              id: item.id,
              name: item.name,
              allPrice:
                item.items.reduce((accum, elem) => {
                  return accum + Number(elem.price) * Number(elem.count);
                }, 0) +
                item.decors
                  .map((dec) => {
                    return dec.dataValues.items.reduce((accum, elem) => {
                      return (
                        accum +
                        Number(elem.dataValues.count) *
                          Number(elem.dataValues.pricePerUnit)
                      );
                    }, 0);
                  })
                  .reduce((acc, el) => acc + el, 0),

              constPrice:
                item.items
                  .map((it) => {
                    return {
                      ...it,
                      device: devices.find((d) => d.id === it.deviceId)
                        ?.constPrice,
                    };
                  })
                  .reduce((accum, element) => {
                    return (
                      accum +
                      Number(element.device) *
                        Number(element.count) *
                        Number(element.countWeightType)
                    );
                  }, 0) +
                item.decors
                  .map((decor) =>
                    decor.items.reduce(
                      (acc, el) =>
                        acc + Number(el.count) * Number(el.constPrice),
                      0
                    )
                  )
                  .reduce((acc, el) => acc + el, 0),
              date_completed: item.date_completed,
              type: "unauthorized",
            };
          }),
      ];
      return res.json({
        message: "OK",
        items: orders,
        earned: orders.reduce((accum, elem) => accum + elem.allPrice, 0),
        spent: orders
          .filter((o) => {
            return !isNaN(o.constPrice);
          })
          .reduce((accum, elem) => accum + elem.constPrice, 0),
        profit:
          orders.reduce((accum, elem) => accum + elem.allPrice, 0) -
          orders
            .filter((o) => {
              return !isNaN(o.constPrice);
            })
            .reduce((accum, elem) => accum + elem.constPrice, 0),
      });
    } catch (e) {
      next(ApiError.badRequest(e.message));
    }
  }
}

module.exports = new AnalyticsController();
