const { Basket, BasketDevice, Device } = require("../models/models");

class BasketController {
  async create(req, res, next) {
    let { name, items, user_id } = req.body;

    const basket = await Basket.create({
      name: name,
      userId: user_id,
    });

    if (items) {
      items = JSON.parse(items);
      items.forEach((item) =>
        BasketDevice.create({
          name: item.name,
          deviceId: item.deviceId,
          basketId: basket.id,
          count: item.count,
          price: item.price,
        })
      );
    }

    return res.json({ id: basket.id });
  }
  async getAll(req, res) {
    let { limit, page, userId } = req.query;
    page = page || 1;
    limit = limit || 9;
    let offset = page * limit - limit;
    let devices;
    if (userId) {
      devices = await Device.findAndCountAll({ limit, offset, UserId: userId });
    } else devices = await Device.findAndCountAll({ limit, offset });
    return res.json(devices);
  }

  async getOne(req, res) {
    const { id } = req.params;
    const basket = await Basket.findOne({
      where: { id },
      include: [
        {
          model: BasketDevice,
          as: "basketId",
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
