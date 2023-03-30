const { Device, DeviceInfo, Type } = require("../models/models");
const uuid = require("uuid");
const path = require("path");
const ApiError = require("../Error/ApiError");

class DeviceController {
  async create(req, res, next) {
    try {
      let { name, price, type, rating, feedback, description, info } = req.body;
      const { img } = req.files;
      let fileName = uuid.v4() + ".jpg";
      await img.mv(path.resolve(__dirname, "..", "photos", fileName));

      if (info) {
        info = JSON.parse(info);
        info.forEach((i) =>
          DeviceInfo.create({
            title: i.title,
            description: i.description,
            deviceId: device.id,
          })
        );
      }

      const device = await Device.create({
        name,
        price,
        type,
        rating,
        feedback,
        description,
        img: fileName,
      });
      return res.json(device);
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

  async getOne(req, res) {
    const { id } = req.params;
    const device = await Device.findOne({
      where: { id },
      include: [{ model: DeviceInfo, as: "info" }],
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
