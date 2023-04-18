const { Device, DeviceInfo, Type } = require("../models/models");
const uuid = require("uuid");
const path = require("path");
const ApiError = require("../Error/ApiError");
const { where } = require("sequelize");

class DeviceController {
  async create(req, res, next) {
    try {
      let { name, price, typeId, info, description, fillingId } = req.body;
      const img = req.files?.img || null;
      let fileName;
      fileName = uuid.v4() + ".jpg";
      img.mv(path.resolve(__dirname, "..", "static", fileName));

      const device = await Device.create({
        name,
        price: Number(price),
        TypeId: typeId,
        FillingId: fillingId,
        description: `${description}`,
        img: fileName,
      });
      if (info && info.length > 0) {
        let newInfo = JSON.parse(info);
        newInfo?.forEach((i) =>
          DeviceInfo.create({
            name: i.name,
            weight: i.weight,
            deviceId: device.id,
            pricePerUnit: i.pricePerUnit,
          })
        );
      }
      return res.json({ id: device.id });
    } catch (e) {
      next(ApiError.badRequest(e.message));
    }
  }

  async update(req, res, next) {
    try {
      let { name, price, description, typeId, info, fillingId } = req.body;
      let { id } = req.params;
      const img = req.files?.img || null;
      let fileName;
      if (img) {
        fileName = uuid.v4() + ".jpg";
        img.mv(path.resolve(__dirname, "..", "static", fileName));
      }
      let oldImg;
      if (!img) {
        oldImg = await Device.findOne({ where: { id: id } });
      }
      const device = await Device.upsert({
        id,
        name: name,
        price: price,
        TypeId: typeId,
        FillingId: fillingId,
        description: description,
        img: fileName || oldImg?.dataValues?.img,
      });
      if (info) {
        let newInfo = JSON.parse(info);
        if (newInfo.length === 0) {
          DeviceInfo.destroy({
            where: { deviceId: id },
          });
          DeviceInfo.destroy({
            where: { deviceId: null },
          });
        } else {
          newInfo?.forEach((i) => {
            if (i.id) {
              DeviceInfo.upsert(
                {
                  id: i.id,
                  name: i.name,
                  weight: i.weight,
                  deviceId: device.id,
                  pricePerUnit: i.pricePerUnit,
                },
                {
                  where: { deviceId: id },
                }
              );
            } else {
              DeviceInfo.create({
                name: i.name,
                weight: i.weight,
                deviceId: id,
                pricePerUnit: i.pricePerUnit,
              });
            }
          });
        }
      }

      return res.json(
        Device.findOne({
          where: { id },
          include: [{ model: DeviceInfo, as: "info" }],
        })
      );
    } catch (e) {
      next(ApiError.badRequest(e.message));
    }
  }

  async getAll(req, res) {
    let { limit, page, typeId } = req.query;
    page = page || 1;
    limit = limit || 9;
    let offset = page * limit - limit;
    let devices;
    if (typeId){
      devices = await Device.findAndCountAll({
        limit,
        offset,
        where: {
          TypeId: typeId,
        },
      });
    } else {
      devices = await Device.findAndCountAll({
        limit,
        offset,
      });
    }

    return res.json(devices);
  }

  async getOneForAdmin(req, res) {
    const { id } = req.params;
    const device = await Device.findOne({
      where: { id },
      include: [{ model: DeviceInfo, as: "info" }],
    });
    return res.json(device);
  }

  async getOne(req, res) {
    const { id } = req.params;
    const device = await Device.findOne({
      where: { id },
    });
    return res.json(device);
  }

  async remove(req, res) {
    const { id } = req.params;
    if (id) {
      await Device.destroy({ where: { id } });
      await DeviceInfo.destroy({ where: { deviceId: id } });
      return res.json({ message: "Удаление успешно!" });
    }
  }
}

module.exports = new DeviceController();
