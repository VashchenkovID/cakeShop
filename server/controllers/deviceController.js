const { Device, DeviceInfo, Type } = require("../models/models");
const uuid = require("uuid");
const path = require("path");
const ApiError = require("../Error/ApiError");

class DeviceController {
  async create(req, res, next) {
    try {
      let { name, price, typeId, info, description } = req.body;
      const img = req.files?.img || null;
      let fileName;
      if (img) {
        fileName = uuid.v4() + ".jpg";
        img.mv(path.resolve(__dirname, "..", "static", fileName));
      }

      const device = await Device.create({
        name,
        price,
        TypeId: typeId,
        description,
        img: "fileName",
      });
      info.forEach((i) =>
        DeviceInfo.create({
          name: i.name,
          weight: i.weight,
          deviceId: device.id,
          pricePerUnit: i.pricePerUnit,
        })
      );

      return res.json({ id: device.id });
    } catch (e) {
      next(ApiError.badRequest(e.message));
    }
  }

  async getAll(req, res) {
    let { limit, page } = req.query;
    page = page || 1;
    limit = limit || 9;
    let offset = page * limit - limit;
    let devices;
    devices = await Device.findAndCountAll({ limit, offset });
    return res.json(devices);
  }

  async getOneForAdmin(req, res) {
    const { id } = req.params;
    const device = await Device.findOne({
      where: { id },
      include: [
        { model: DeviceInfo, as: "info" },
        { model: Type, as: "typeId" },
      ],
    });
    return res.json(device);
  }

  async getOne(req, res) {
    const { id } = req.params;
    const device = await Device.findOne({
      where: { id },
      include: [{ model: Type, as: "typeId" }],
    });
    return res.json(device);
  }

  async remove(req, res) {
    const { id } = req.body;
    if (id) {
      await Device.destroy({ where: { id } });
      return res.json({ message: "Удаление успешно!" });
    }
  }
}

module.exports = new DeviceController();
