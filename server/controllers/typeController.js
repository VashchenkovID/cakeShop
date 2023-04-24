const { Type } = require("../models/models");
const ApiError = require("../Error/ApiError");

class TypeController {
  async create(req, res, next) {
    try {
      const { name } = req.body;
      await Type.create({ name: name });
      return res.json({ message: "OK" });
    } catch (e) {
      next(ApiError(e.message));
    }
  }
  async getAll(req, res) {
    const types = await Type.findAll();
    return res.json(types);
  }
  async update(req, res, next) {
    try {
      const { name } = req.body;
      const { id } = req.params;
      await Type.upsert({ name: name, id: id }, { where: { id } });
      return res.json({ message: "OK" });
    } catch (e) {
      next(ApiError(e.message));
    }
  }

  async remove(req, res) {
    const { id } = req.params;
    if (id) {
      await Type.destroy({ where: { id } });
      return res.json({ message: "Удаление успешно!" });
    }
  }
}

module.exports = new TypeController();
