const {
    Device,
    DeviceInfo,
    Type,
    Rating,
    Characteristics,
    CharacteristicsItem,
    SEO,
    Image
} = require("../models/models");
const uuid = require("uuid");
const path = require("path");
const ApiError = require("../Error/ApiError");
const {where} = require("sequelize");
const fs = require("fs");

class DeviceController {
    async create(req, res, next) {
        try {
            let {
                name,
                price,
                typeId,
                info,
                description,
                fillingId,
                biscuitId,
                weightType,
                countWeightType,
                discount,
                options,
                seo
            } = req.body;
            const images = req.files?.img || [];

            const device = await Device.create({
                name,
                price: Number(price),
                TypeId: typeId,
                BiscuitId: biscuitId,
                FillingId: fillingId,
                description: `${description}`,
                weightType: weightType,
                countWeightType: countWeightType,
                discount: discount,
            });
            // Грузим картинки
            if (images.length > 0) {
                images.forEach(img => {
                    let fileName;
                    if (img) {
                        fileName = uuid.v4() + ".jpg";
                        img.mv(path.resolve(__dirname, "..", "static", fileName));
                        Image.create({
                            deviceId: device.id,
                            name: fileName
                        })
                    }
                })
            }
            // Смотрим есть ли рецепт и создаем
            if (info && info.length > 0) {
                let newInfo = JSON.parse(info);
                newInfo?.forEach((i) =>
                    DeviceInfo.create({
                        name: i.name,
                        weight: i.weight,
                        weightType: i.weightType,
                        deviceId: device.id,
                        pricePerUnit: i.pricePerUnit,
                    })
                );
            }
            // Смотрим есть ли характеристики и создаем
            if (options && options.length > 0) {
                let newOptions = JSON.parse(options);
                newOptions?.forEach((option) => {
                    Characteristics.create({
                        name: option.name,
                        deviceId: device.id,
                    }).then((r) => {
                        if (r.id && option.items && option.items.length > 0) {
                            option.items.forEach(item => {
                                CharacteristicsItem.create({
                                    characteristicsId: r.id,
                                    value: item.value
                                })
                            })
                        }
                    });

                })
            }
            // Смотрим есть ли сео разметка и создаем
            if (seo && seo.length > 0) {
                let newSeo = JSON.parse(seo);
                newSeo?.forEach((option) => {
                    SEO.create({
                        name: option.name,
                        deviceId: device.id,
                    })

                })
            }
            return res.json({id: device.id});
        } catch (e) {
            next(ApiError.badRequest(e.message));
        }
    }

    async update(req, res, next) {
        try {
            let {
                name,
                price,
                description,
                typeId,
                info,
                fillingId,
                biscuitId,
                weightType,
                countWeightType,
                discount,
                options,
                seo
            } = req.body;
            let {id} = req.params;
            const images = req.files?.img || null;

            // Грузим картинки
            if (images.length > 0) {
                images.forEach(img => {
                    let fileName;
                    if (img) {
                        fileName = uuid.v4() + ".jpg";
                        img.mv(path.resolve(__dirname, "..", "static", fileName));
                        Image.create({
                            deviceId: id,
                            name: fileName
                        })
                    }
                })
            }
            const device = await Device.upsert({
                id,
                name: name,
                price: price,
                TypeId: typeId,
                FillingId: fillingId,
                BiscuitId: biscuitId,
                description: description,
                weightType: weightType,
                countWeightType: countWeightType,
                discount: discount,
            });
            // Проверяем рецепт
            if (info) {
                let newInfo = JSON.parse(info);
                if (newInfo.length === 0) {
                    DeviceInfo.destroy({
                        where: {deviceId: id},
                    });
                    DeviceInfo.destroy({
                        where: {deviceId: null},
                    });
                } else {
                    newInfo?.forEach((i) => {
                        if (i.id) {
                            DeviceInfo.upsert(
                                {
                                    id: i.id,
                                    name: i.name,
                                    weight: i.weight,
                                    weightType: i.weightType,
                                    deviceId: device.id,
                                    pricePerUnit: i.pricePerUnit,
                                },
                                {
                                    where: {deviceId: id},
                                }
                            );
                        } else {
                            DeviceInfo.create({
                                name: i.name,
                                weight: i.weight,
                                weightType: i.weightType,
                                deviceId: id,
                                pricePerUnit: i.pricePerUnit,
                            });
                        }
                    });
                }
            }
            // Проверяем характеристики
            if (options) {
                let newOptions = JSON.parse(options);
                if (newOptions.length > 0) {
                    newOptions?.forEach((option) => {
                        Characteristics.upsert({
                            id: option.id,
                            name: option.name,
                            deviceId: id,
                        })
                        if (option.items?.length > 0) {
                            option.items.forEach(item => {
                                CharacteristicsItem.upsert({
                                    id: item.id,
                                    characteristicsId: option.id,
                                    value: item.value
                                })
                            })
                        }

                    })
                }
            }
            // Проверяем разметку
            if (seo) {
                let newSeo = JSON.parse(seo);
                if (newSeo.length > 0) {
                    newSeo?.forEach((option) => {
                        SEO.upsert({
                            id: option.id,
                            name: option.name,
                            deviceId: id,
                        })
                    })
                }
            }

            const finalEditedObject = await Device.findOne({
                where: {id},
                include: [{model: DeviceInfo, as: "info"}, {model: SEO, as: "seo"}],
            })
            let characteristics = await Characteristics.findAll()

            characteristics = characteristics.filter((c) => c.deviceId === finalEditedObject.dataValues.id);
            return res.json(
                {...finalEditedObject, characteristics}
            );
        } catch (e) {
            next(ApiError.badRequest(e.message));
        }
    }

    async getAll(req, res, next) {
        try {
            let {limit, page, typeId} = req.query;
            page = page || 1;
            limit = limit || 9;
            let offset = page * limit - limit;
            let devices;
            if (typeId) {
                devices = await Device.findAndCountAll({
                    limit,
                    offset,
                    where: {
                        TypeId: typeId,
                    },
                });
            } else {
                devices = await Device.findAndCountAll({
                    limit,
                    offset,
                });
            }
            let ratings = await Rating.findAll();
            let devicesWithRait = devices.rows.map((device) => {
                return {
                    ...device?.dataValues,
                    rating:
                        ratings
                            .filter((rait) => rait.deviceId === device.dataValues.id)
                            .reduce((acc, el) => acc + Number(el.rating), 0) /
                        ratings.filter((rait) => rait.deviceId === device.dataValues.id)
                            .length,
                };
            });

            return res.json({count: devices.count, rows: devicesWithRait});
        } catch (e) {
            next(ApiError(e.message));
        }
    }

    async getOneForAdmin(req, res, next) {
        try {
            const {id} = req.params;
            const device = await Device.findOne({
                where: {id},
                include: [{model: DeviceInfo, as: "info"}],
            });
            let ratings = await Rating.findAll();
            let deviceWithRait = {
                ...device?.dataValues,
                rating:
                    ratings
                        .filter((rait) => rait.deviceId === device.dataValues.id)
                        .reduce((acc, el) => acc + Number(el.rating), 0) /
                    ratings.filter((rait) => rait.deviceId === device.dataValues.id)
                        .length,
            };
            return res.json(deviceWithRait);
        } catch (e) {
            next(ApiError(e.message));
        }
    }

    async getOne(req, res, next) {
        try {
            const {id} = req.params;
            const device = await Device.findOne({
                where: {id},
            });
            let ratings = await Rating.findAll();
            let deviceWithRait = {
                ...device?.dataValues,
                rating:
                    ratings
                        .filter((rait) => rait.deviceId === device.dataValues.id)
                        .reduce((acc, el) => acc + Number(el.rating), 0) /
                    ratings.filter((rait) => rait.deviceId === device.dataValues.id)
                        .length,
            };
            return res.json(deviceWithRait);
        } catch (e) {
            next(ApiError(e.message));
        }
    }

    async remove(req, res, next) {
        try {
            const {id} = req.params;
            if (id) {
                const fullDevice = await Device.findOne({where: {id}});
                if (fullDevice) {
                    fs.readdir("static", (err, files) => {
                        if (err) throw err;
                        for (const file of files) {
                            if (file === fullDevice.img) {
                                fs.unlink(path.join("static", file), (err) => {
                                    if (err) throw err;
                                    console.log("файл удален");
                                });
                            }
                        }
                    });
                }
                let characteristics = await Characteristics.findAll();
                characteristics = characteristics.filter((c) => c.deviceId === id);

                for (const ch of characteristics) {
                    const charactId = ch?.id;
                    if (charactId) {
                        const items = await CharacteristicsItem.findAll({where: {id:charactId}});
                        for (const item of items) {
                            if (item.id) {
                                await  CharacteristicsItem.destroy({where: {id: item.id}})
                            }
                        }
                        await Characteristics.destroy({where:{id:ch.id}})
                    }
                }

                await Device.destroy({where: {id}});
                await DeviceInfo.destroy({where: {deviceId: id}});
                await SEO.destroy({where: {deviceId: id}});
                return res.json({message: "Удаление успешно!"});
            }
        } catch (e) {
            next(ApiError(e.message));
        }
    }

    async getStartInfo(req, res, next) {
        try {
            const devices = await Device.findAll();
            const types = await Type.findAll();

            function groupBy(xs, key) {
                return xs.reduce(function (rv, x) {
                    (rv[x[key]] = rv[x[key]] || []).push(x);
                    return rv;
                }, {});
            }

            let ratings = await Rating.findAll();
            let devicesWithRait = devices.map((device) => {
                return {
                    ...device?.dataValues,
                    rating:
                        ratings
                            .filter((rait) => rait.deviceId === device.dataValues.id)
                            .reduce((acc, el) => acc + Number(el.rating), 0) /
                        ratings.filter((rait) => rait.deviceId === device.dataValues.id)
                            .length,
                };
            });
            let grouped = groupBy(
                devicesWithRait.map((d) => {
                    return {
                        ...d,
                        typeName: types.find((t) => t.id === d.TypeId).name,
                    };
                }),
                "typeName"
            );
            Object.keys(grouped).forEach((key) => {
                grouped[key] = grouped[key].slice(0, 3);
            });
            return res.json({
                items: grouped,
                types: types,
            });
        } catch (e) {
            next(ApiError(e.message));
        }
    }

    async getEntity(req, res, next) {
        try {
            const devices = await Device.findAll();

            return res.json(
                devices.map((device) => {
                    return {id: device.id, name: device.name};
                })
            );
        } catch (e) {
            next(ApiError(e.message));
        }
    }
}

module.exports = new DeviceController();
