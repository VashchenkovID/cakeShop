const {badRequest} = require("../Error/ApiError");
const {SEO} = require("../models/models");


class SeoController {
    /**
     * Создание тэга
     */
    async create(req, res, next) {
        try {
            const {type, description} = req.body;
            if (type && description) {
                const newSeo = await SEO.create({type, description});
                return res.json({message: "OK"});
            }
        } catch (e) {
            next(badRequest({
                message: 'Ошибка при создании тэга',
                detail: e
            }));
        }
    }

    /**
     * Редактирование тэга
     */
    async update(req, res, next) {
        try {
            const {type, description} = req.body;
            const {id} = req.params
            if (type && description) {
                const newSeo = await SEO.upsert({type, description}, {
                    where: {id}
                });
                return res.json({message: "OK", newSeo});
            }
        } catch (e) {
            next(ApiError.badRequest({
                message: 'Ошибка при редактировании тэга',
                detail: e
            }));
        }
    }

    /**
     * Удаление тэга
     */
    async remove(req, res) {
        const {id} = req.params;
        if (id) {
            await SEO.destroy({where: {id}})
            return res.json({message: "Удаление успешно!"});
        }
    }
}

module.exports = new SeoController();