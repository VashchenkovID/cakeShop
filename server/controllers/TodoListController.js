const ApiError = require("../Error/ApiError");
const { TODOList } = require("../models/models");

class TodoListController {
  async create(req, res, next) {
    try {
      let { name } = req.body;

      const newRow = await TODOList.create({
        name: name,
        isReady: false,
      });
      return res.json({
        id: newRow.id,
      });
    } catch (e) {
      next(ApiError.badRequest(e.message));
    }
  }
  async update(req, res, next) {
    try {
      let { id } = req.params;
      let { name, isReady } = req.body;
      if (name === "") {
        return res.status(404, { message: "Заполните строку!" });
      } else {
        const updatedRow = await TODOList.upsert({
          id,
          name: name,
          isReady: isReady,
        });
        return res.json({ ...updatedRow });
      }
    } catch (e) {
      next(ApiError.badRequest(e.message));
    }
  }
  async remove(req, res, next) {
    try {
      const { id } = req.params;
      if (id) {
        await TODOList.destroy({ where: { id } });
        return res.json({ message: "Удаление успешно!" });
      }
    } catch (e) {
      next(ApiError.badRequest(e.message));
    }
  }

  async getOne(req, res, next) {
    try {
      const { id } = req.params;
      if (id) {
        const row = await TODOList.findOne({ where: { id } });
        return res.json(row);
      }
    } catch (e) {
      next(ApiError.badRequest(e.message));
    }
  }
  async getAll(req, res, next) {
    try {
      const rows = await TODOList.findAll();
      return res.json({ rows: rows });
    } catch (e) {
      next(ApiError.badRequest(e.message));
    }
  }
}

module.exports = new TodoListController()
