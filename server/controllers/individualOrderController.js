const {
  IndividualOrderItem,
  IndividualOrder,
  OrderDecor,
  OrderDecorItem,
  Decor,
  User,
} = require("../models/models");

class IndividualOrderController {
  async create(req, res, next) {
    let { name, items, user_id, date_completed } = req.body;

    const user = await User.findOne({ where: { id: user_id } });
    let basket = null;
    if (user) {
      basket = await IndividualOrder.create({
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
        await IndividualOrderItem.create({
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
    const oldOrder = IndividualOrder.findOne({
      where: { id },
      include: [{ model: IndividualOrderItem, as: "items" }],
    });

    const order = await IndividualOrder.upsert({
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
        await IndividualOrderItem.destroy({
          where: { IndividualOrderId: id },
        });
        await IndividualOrderItem.destroy({
          where: { IndividualOrderId: null },
        });
      } else {
        items.forEach((item) => {
          if (item.id) {
            IndividualOrderItem.upsert(
              {
                id: item.id,
                name: item.name,
                deviceId: item.deviceId,
                IndividualOrderId: order.id,
                count: item.count,
                price: item.price,
              },
              {
                where: { IndividualOrderId: id },
              }
            );
          } else {
            IndividualOrderItem.create({
              name: item.name,
              deviceId: item.deviceId,
              IndividualOrderId: order.id,
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
    page = page || 1;
    limit = limit || 9;
    let offset = page * limit - limit;
    let devices;
    if (userId) {
      devices = await IndividualOrder.findAndCountAll({
        limit,
        offset,
      });
    } else devices = await IndividualOrder.findAndCountAll({ limit, offset });
    return res.json(devices);
  }

  async getOne(req, res) {
    const { id } = req.params;
    const basket = await IndividualOrder.findOne({
      where: { id },
      include: [
        {
          model: IndividualOrderItem,
          as: "IndividualOrderId",
        },
      ],
    });
    return res.json(basket);
  }
  async remove(req, res) {
    const { id } = req.params;
    if (id) {
      await IndividualOrder.destroy({ where: { id } });
      return res.json({ message: "Удаление успешно" });
    }
  }
}

module.exports = new IndividualOrderController();
