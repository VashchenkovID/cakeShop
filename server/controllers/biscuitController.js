const uuid = require("uuid");
const path = require("path");
const { Biscuit, Type } = require("../models/models");
const ApiError = require("../Error/ApiError");

class BiscuitController {
  async create(req, res) {
    try {
      const { name } = req.body;
      const img = req.files?.img || null;
      let fileName;
      fileName = uuid.v4() + ".jpg";
      img.mv(path.resolve(__dirname, "..", "static", fileName));
      if (name) {
        await Biscuit.create({ name: name, img: fileName });
      }
      return res.json({ message: "OK" });
    } catch (e) {}
  }

  async getAll(req, res) {
    const fillings = await Biscuit.findAll();
    return res.json(fillings);
  }
  async update(req, res, next) {
    try {
      const { name } = req.body;
      const { id } = req.params;
      const img = req.files?.img || null;
      let fileName;
      if (img) {
        fileName = uuid.v4() + ".jpg";
        img.mv(path.resolve(__dirname, "..", "static", fileName));
        await Biscuit.upsert({ name: name, img: fileName }, { where: { id } });
      } else {
        const oldBiscuit = await Biscuit.findOne({ where: { id } });
        await Biscuit.upsert(
          { name: name, img: oldBiscuit.img , id:id},
          { where: { id } }
        );
      }
      return res.json({ message: "OK" });
    } catch (e) {
      next(ApiError(e.message));
    }
  }

  async remove(req, res) {
    const { id } = req.params;
    if (id) {
      await Biscuit.destroy({ where: { id } });
      return res.json({ message: "Удаление успешно!" });
    }
  }
}

module.exports = new BiscuitController();
