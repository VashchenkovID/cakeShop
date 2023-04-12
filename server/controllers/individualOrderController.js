const { IndividualOrderItem, IndividualOrder } = require("../models/models");

class IndividualOrderController {
  async create(req, res, next) {
    let { name, items, customer, date_completed } = req.body;

    const order = await IndividualOrder.create({
      name: name,
      status: "CREATED",
      customer: customer.fullName,
      customer_phone: customer.phone,
      customer_email: customer.email,
      date_completed: date_completed,
    });

    if (items) {
      items = JSON.parse(items);
      items.forEach((item) =>
        IndividualOrderItem.create({
          name: item.name,
          deviceId: item.deviceId,
          IndividualOrderId: order.id,
          count: item.count,
          price: item.price,
        })
      );
    }

    return res.json({ id: order.id });
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
