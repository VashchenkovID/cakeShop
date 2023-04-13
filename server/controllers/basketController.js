const { Basket, BasketDevice, User } = require("../models/models");

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

    if (items && basket) {
      items.forEach((item) =>
        BasketDevice.create({
          name: item.name,
          deviceId: item.deviceId,
          BasketId: basket.id,
          count: item.count,
          price: item.price,
        })
      );
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
    let { limit, page, userId } = req.query;
    page = page || 1;
    limit = limit || 9;
    let offset = page * limit - limit;
    let devices;
    if (userId) {
      devices = await Basket.findAndCountAll({ limit, offset, UserId: userId });
    } else devices = await Basket.findAndCountAll({ limit, offset });
    return res.json(devices);
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
