const { Device, DeviceInfo, Type, Rating } = require("../models/models");
const uuid = require("uuid");
const path = require("path");
const ApiError = require("../Error/ApiError");
const { where } = require("sequelize");
const fs = require("fs");

class DeviceController {
  async create(req, res, next) {
    try {
      let {
        name,
        price,
        typeId,
        info,
        description,
        fillingId,
        biscuitId,
        weightType,
        countWeightType,
        discount,
      } = req.body;
      const img = req.files?.img || null;
      let fileName;
      fileName = uuid.v4() + ".jpg";
      img.mv(path.resolve(__dirname, "..", "static", fileName));
      const device = await Device.create({
        name,
        price: Number(price),
        TypeId: typeId,
        BiscuitId: biscuitId,
        FillingId: fillingId,
        description: `${description}`,
        img: fileName,
        weightType: weightType,
        countWeightType: countWeightType,
        discount: discount,
      });
      if (info && info.length > 0) {
        let newInfo = JSON.parse(info);
        newInfo?.forEach((i) =>
          DeviceInfo.create({
            name: i.name,
            weight: i.weight,
            weightType: i.weightType,
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
      let {
        name,
        price,
        description,
        typeId,
        info,
        fillingId,
        biscuitId,
        weightType,
        countWeightType,
        discount,
      } = req.body;
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
        BiscuitId: biscuitId,
        description: description,
        weightType: weightType,
        countWeightType: countWeightType,
        discount: discount,
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
                  weightType: i.weightType,
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
                weightType: i.weightType,
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

  async getAll(req, res, next) {
    try {
      let { limit, page, typeId } = req.query;
      page = page || 1;
      limit = limit || 9;
      let offset = page * limit - limit;
      let devices;
      if (typeId) {
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
      let ratings = await Rating.findAll();
      let devicesWithRait = devices.rows.map((device) => {
        return {
          ...device?.dataValues,
          rating:
            ratings
              .filter((rait) => rait.deviceId === device.dataValues.id)
              .reduce((acc, el) => acc + Number(el.rating), 0) /
            ratings.filter((rait) => rait.deviceId === device.dataValues.id)
              .length,
        };
      });

      return res.json({ count: devices.count, rows: devicesWithRait });
    } catch (e) {
      next(ApiError(e.message));
    }
  }

  async getOneForAdmin(req, res, next) {
    try {
      const { id } = req.params;
      const device = await Device.findOne({
        where: { id },
        include: [{ model: DeviceInfo, as: "info" }],
      });
      let ratings = await Rating.findAll();
      let deviceWithRait = {
        ...device?.dataValues,
        rating:
          ratings
            .filter((rait) => rait.deviceId === device.dataValues.id)
            .reduce((acc, el) => acc + Number(el.rating), 0) /
          ratings.filter((rait) => rait.deviceId === device.dataValues.id)
            .length,
      };
      return res.json(deviceWithRait);
    } catch (e) {
      next(ApiError(e.message));
    }
  }

  async getOne(req, res, next) {
    try {
      const { id } = req.params;
      const device = await Device.findOne({
        where: { id },
      });
      let ratings = await Rating.findAll();
      let deviceWithRait = {
        ...device?.dataValues,
        rating:
          ratings
            .filter((rait) => rait.deviceId === device.dataValues.id)
            .reduce((acc, el) => acc + Number(el.rating), 0) /
          ratings.filter((rait) => rait.deviceId === device.dataValues.id)
            .length,
      };
      return res.json(deviceWithRait);
    } catch (e) {
      next(ApiError(e.message));
    }
  }

  async remove(req, res, next) {
    try {
      const { id } = req.params;
      if (id) {
        const fullDevice = await Device.findOne({ where: { id } });
        if (fullDevice) {
          fs.readdir("static", (err, files) => {
            if (err) throw err;
            for (const file of files) {
              if (file === fullDevice.img) {
                fs.unlink(path.join("static", file), (err) => {
                  if (err) throw err;
                  console.log("файл удален");
                });
              }
            }
          });
        }

        await Device.destroy({ where: { id } });
        await DeviceInfo.destroy({ where: { deviceId: id } });
        return res.json({ message: "Удаление успешно!" });
      }
    } catch (e) {
      next(ApiError(e.message));
    }
  }

  async getStartInfo(req, res, next) {
    try {
      const devices = await Device.findAll();
      const types = await Type.findAll();
      function groupBy(xs, key) {
        return xs.reduce(function (rv, x) {
          (rv[x[key]] = rv[x[key]] || []).push(x);
          return rv;
        }, {});
      }
      let ratings = await Rating.findAll();
      let devicesWithRait = devices.map((device) => {
        return {
          ...device?.dataValues,
          rating:
            ratings
              .filter((rait) => rait.deviceId === device.dataValues.id)
              .reduce((acc, el) => acc + Number(el.rating), 0) /
            ratings.filter((rait) => rait.deviceId === device.dataValues.id)
              .length,
        };
      });
      let grouped = groupBy(
        devicesWithRait.map((d) => {
          return {
            ...d,
            typeName: types.find((t) => t.id === d.TypeId).name,
          };
        }),
        "typeName"
      );
      Object.keys(grouped).forEach((key) => {
        grouped[key] = grouped[key].slice(0, 3);
      });
      return res.json({
        items: grouped,
        types: types,
      });
    } catch (e) {
      next(ApiError(e.message));
    }
  }

  async getEntity(req, res, next) {
    try {
      const devices = await Device.findAll();

      return res.json(
        devices.map((device) => {
          return { id: device.id, name: device.name };
        })
      );
    } catch (e) {
      next(ApiError(e.message));
    }
  }
}

module.exports = new DeviceController();
