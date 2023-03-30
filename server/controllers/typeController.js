const { Type } = require("../models/models");
const ApiError = require("../Error/ApiError");

class TypeController {
  async create(req, res) {
    const { typeName } = req.body;
    if (typeName) {
      const type = await Type.create({ typeName });
      return res.json(type);
    }
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
