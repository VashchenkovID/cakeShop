const {
  Basket,
  BasketDevice,
  User,
  OrderDecor,
  OrderDecorItem,
  Decor,
} = require("../models/models");
const TokenService = require("../services/token-service");
const { startOfMonth, endOfMonth } = require("date-fns");
const { Op } = require("sequelize");
const ApiError = require("../Error/ApiError");

class BasketController {
  async create(req, res, next) {
    let { name, items, user_id, date_completed } = req.body;

    const user = await User.findOne({ where: { id: user_id } });
    let basket = null;
    if (user) {
      basket = await Basket.create({
        name: name,
        UserId: user_id,
        status: "CREATED",
        customer: user.fullName,
        customer_phone: user.phone,
        customer_email: user.email || null,
        date_completed: new Date(date_completed),
      });
    }
    const baseDecors = await Decor.findAll();
    if (items && basket) {
      for (const item of items) {
        await BasketDevice.create({
          name: item.name,
          deviceId: item.deviceId,
          BasketId: basket.id,
          count: item.count,
          price: item.price,
          countWeightType: item.countWeightType,
        });
        if (item.decors) {
          for (const decor of item.decors) {
            const newOrder = await OrderDecor.create({
              name: decor.name,
              BasketId: basket.id,
            });
            if (newOrder && decor.items) {
              for (const itm of decor.items) {
                const findedDecor = baseDecors.find((i) => i.name === itm.name);
                await OrderDecorItem.create({
                  name: itm.name,
                  count: itm.count,
                  countType: itm.countType,
                  pricePerUnit: itm.pricePerUnit,
                  constPrice: findedDecor.constPrice,
                  OrderDecorId: newOrder.id,
                });
              }
            }
          }
        }
      }
    }

    return res.json({ id: basket.id });
  }
  async update(req, res, next) {
    let { status, items, date_completed } = req.body;
    let { id } = req.params;
    const oldOrder = Basket.findOne({
      where: { id },
      include: [{ model: BasketDevice, as: "items" }],
    });

    const order = await Basket.upsert({
      id: id,
      name: oldOrder.name,
      status: status,
      customer: oldOrder.customer,
      customer_phone: oldOrder.customer_phone,
      customer_email: oldOrder.customer_email,
      date_completed: date_completed,
    });

    if (items) {
      items = JSON.parse(items);
      if (items.length === 0) {
        await BasketDevice.destroy({
          where: { BasketId: id },
        });
        await BasketDevice.destroy({
          where: { BasketId: null },
        });
      } else {
        items.forEach((item) => {
          if (item.id) {
            BasketDevice.upsert(
              {
                id: item.id,
                name: item.name,
                deviceId: item.deviceId,
                BasketId: order.id,
                count: item.count,
                price: item.price,
              },
              {
                where: { BasketId: id },
              }
            );
          } else {
            BasketDevice.create({
              name: item.name,
              deviceId: item.deviceId,
              BasketId: order.id,
              count: item.count,
              price: item.price,
            });
          }
        });
      }
    }
    return res.json({ id: order.id });
  }
  async getAll(req, res) {
    let { limit, page } = req.query;
    const authorizationHeader = req.headers.authorization;
    const accessToken = authorizationHeader?.split(" ")[1];
    let userData;
    if (accessToken) {
      userData = TokenService.validateAccessToken(accessToken);
    }
    page = page || 1;
    limit = limit || 9;
    let offset = page * limit - limit;
    let devices;
    if (userData && userData.id) {
      devices = await Basket.findAndCountAll({
        limit,
        offset,
        UserId: userData.id,
      });
    } else devices = await Basket.findAndCountAll({ limit, offset });
    return res.json(devices);
  }
  async getUserOrders(req, res, next) {
    try {
      let { limit, page } = req.query;
      const authorizationHeader = req.headers.authorization;
      const accessToken = authorizationHeader?.split(" ")[1];
      let userData;
      if (accessToken) {
        userData = TokenService.validateAccessToken(accessToken);
      }
      page = page || 1;
      limit = limit || 9;
      let offset = page * limit - limit;
      let devices;
      if (userData && userData.id) {
        devices = await Basket.findAndCountAll({
          limit,
          offset,
          UserId: userData.id,
          include: [
            { model: BasketDevice, as: "items" },
            {
              model: OrderDecor,
              as: "decors",
              include: [{ model: OrderDecorItem, as: "items" }],
            },
          ],
        });
        return res.json({
          count: devices.count,
          rows: devices.rows.map((basket) => {
            return {
              ...basket.dataValues,
              decors: basket.dataValues.decors.map((decor) => decor.items).flat(),
            };
          }),
        });
      } else return res.status(403, { message: "Не авторизован" });
    } catch (e) {
      next(ApiError.badRequest(e.message));
    }
  }
  async getOne(req, res) {
    const { id } = req.params;
    const basket = await Basket.findOne({
      where: { id },
      include: [
        {
          model: BasketDevice,
          as: "BasketId",
        },
      ],
    });
    return res.json(basket);
  }
  async remove(req, res) {
    const { id } = req.params;
    if (id) {
      await Basket.destroy({ where: { id } });
      return res.json({ message: "Удаление успешно" });
    }
  }
}

module.exports = new BasketController();
