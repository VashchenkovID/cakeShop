const { Type } = require("../models/models");
const ApiError = require("../Error/ApiError");

class TypeController {
  async create(req, res) {
    try {
      const name = req.body;
      if (name) {
        await Type.create({ ...name });
      }
      return { message: "OK" };
    } catch (e) {}
  }
  async getAll(req, res) {
    const types = await Type.findAll();
    return res.json(types);
  }
  async remove(req, res) {
    const { id } = req.body;
    if (id) {
      await Type.destroy({ where: { id } });
      return res.json({ message: "Удаление успешно!" });
    }
  }
}

module.exports = new TypeController();
