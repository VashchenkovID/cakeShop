const { Filling, Biscuit } = require("../models/models");
const uuid = require("uuid");
const path = require("path");
const ApiError = require("../Error/ApiError");
const fs = require("fs");

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

  async update(req, res, next) {
    try {
      const { name } = req.body;
      const { id } = req.params;
      const img = req.files?.img || null;
      let fileName;
      if (img) {
        fileName = uuid.v4() + ".jpg";
        img.mv(path.resolve(__dirname, "..", "static", fileName));
        await Filling.upsert({ name: name, img: fileName }, { where: { id } });
      } else {
        const oldFilling = await Filling.findOne({ where: { id } });
        await Filling.upsert(
          { name: name, img: oldFilling.img, id: id },
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
       const filling = await Filling.findOne({ where: { id: id } });
      if (filling) {
        fs.readdir('static', (err, files) => {
          if (err) throw err;
          for (const file of files) {
            if (file === filling.img) {
              fs.unlink(path.join('static', file), (err) => {
                if (err) throw err;
                console.log('файл удален')
              });
            }

          }
        });
      }

      await Filling.destroy({ where: { id: id } });
      return res.json({ message: "Удаление успешно!" });
    }
  }
}

module.exports = new FillingController();
