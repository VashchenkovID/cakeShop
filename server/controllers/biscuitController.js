const uuid = require("uuid");
const path = require("path");
const { Biscuit } = require("../models/models");

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

  async remove(req, res) {
    const { id } = req.body;
    if (id) {
      await Biscuit.destroy({ where: { id } });
      return res.json({ message: "Удаление успешно!" });
    }
  }
}

module.exports = new BiscuitController();
