const uuid = require("uuid");
const path = require("path");
const { Biscuit, Type } = require("../models/models");
const ApiError = require("../Error/ApiError");
const fs = require("fs");

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
      const biscuit = await Biscuit.findOne({ where:{ id}})
      if (biscuit) {
        fs.readdir('static', (err, files) => {
          if (err) throw err;
          for (const file of files) {
            if (file === biscuit.img) {
              fs.unlink(path.join('static', file), (err) => {
                if (err) throw err;
                console.log('файл удален')
              });
            }

          }
        });
      }
      await Biscuit.destroy({ where: { id } });
      return res.json({ message: "Удаление успешно!" });
    }
  }
}

module.exports = new BiscuitController();
