const { Filling } = require("../models/models");
const uuid = require("uuid");
const path = require("path");

class FillingController {
  async create(req, res) {
    try {
      const { name } = req.body;
      const img = req.files?.img || null;
      let fileName;
      fileName = uuid.v4() + ".jpg";
      img.mv(path.resolve(__dirname, "..", "static", fileName));
      if (name) {
        await Filling.create({ name: name, img: fileName });
      }
      return res.json({ message: "OK" });
    } catch (e) {}
  }

  async getAll(req, res) {
    const fillings = await Filling.findAll();
    return res.json(fillings);
  }

  async remove(req, res) {
    const { id } = req.body;
    if (id) {
      await Filling.destroy({ where: { id } });
      return res.json({ message: "Удаление успешно!" });
    }
  }
}

module.exports = new FillingController();
