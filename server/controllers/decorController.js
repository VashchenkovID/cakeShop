const ApiError = require("../Error/ApiError");
const { Decor } = require("../models/models");

class DecorController {
  async create(req, res, next) {
    try {
      const { name, count, countType, pricePerUnit, constPrice } = req.body;

      const newDecor = await Decor.create({
        name: name,
        count: count,
        countType: countType,
        pricePerUnit: pricePerUnit,
        constPrice: constPrice,
      });

      return res.json({ id: newDecor.id });
    } catch (e) {
      next(ApiError(e.message));
    }
  }

  async update(req, res, next) {
    try {
      const { id } = req.params;
      const { name, count, countType, pricePerUnit, constPrice } = req.body;

      const newDecor = await Decor.upsert(id, {
        name: name,
        count: count,
        countType: countType,
        pricePerUnit: pricePerUnit,
        constPrice: constPrice,
      });

      return res.json(newDecor);
    } catch (e) {
      next(ApiError(e.message));
    }
  }

  async getAllAdmin(req, res, next) {
    try {
      const decors = await Decor.findAll();
      return res.json(decors);
    } catch (e) {
      next(ApiError(e.message));
    }
  }

  async getAll(req, res, next) {
    try {
      const decors = await Decor.findAll();
      return res.json(
        decors.map((i) => {
          return {
            id: i.id,
            name: i.name,
            count: i.count,
            countType: i.countType,
            pricePerUnit: i.pricePerUnit,
          };
        })
      );
    } catch (e) {
      next(ApiError(e.message));
    }
  }

  async remove(req, res, next) {
    try {
      const { id } = req.params;
      await Decor.destroy({ where: { id } });
      return res.json({ message: "OK" });
    } catch (e) {
      next(ApiError(e.message));
    }
  }
}

module.exports = new DecorController();
