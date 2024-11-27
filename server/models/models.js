const sequilize = require("../db");
const {DataTypes} = require("sequelize");
/**
 * Модель пользователя
 */
const User = sequilize.define("User", {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    email: {type: DataTypes.STRING(1500), unique: true},
    password: {type: DataTypes.STRING(1500)},
    role: {type: DataTypes.STRING(1500), defaultValue: "USER"},
    fullName: {type: DataTypes.STRING(1500), allowNull: true},
    phone: {type: DataTypes.STRING(1500), allowNull: true},
});
/**
 * Модель для занесения уникальных пользователей
 */
const UniqUser = sequilize.define("UniqUser", {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    address: {type: DataTypes.STRING(1000)},
});
/**
 * Токен авторизации
 */
const Token = sequilize.define("Token", {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    refreshToken: {type: DataTypes.STRING(3000), required: true},
});
/**
 * Модель корзины
 */
const Basket = sequilize.define("Basket", {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    name: {type: DataTypes.STRING},
    status: {type: DataTypes.STRING},
    date_completed: {type: DataTypes.DATE},
    customer: {type: DataTypes.STRING, allowNull: false},
    customer_phone: {type: DataTypes.STRING, allowNull: false},
    customer_email: {type: DataTypes.STRING},
});


/**
 * Модель товара в корзине
 */
const BasketDevice = sequilize.define("Basket_device", {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    name: {type: DataTypes.STRING, allowNull: false},
    count: {type: DataTypes.INTEGER, allowNull: false},
    price: {type: DataTypes.INTEGER, allowNull: false},
    countWeightType: {type: DataTypes.INTEGER, allowNull: false},
});
/**
 * Модель товара
 */
const Device = sequilize.define("device", {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    name: {type: DataTypes.STRING, unique: true, allowNull: false},
    price: {type: DataTypes.INTEGER, allowNull: false},
    discount: {type: DataTypes.INTEGER, allowNull: false, defaultValue: 0},
    rating: {type: DataTypes.INTEGER, defaultValue: 0},
    description: {type: DataTypes.STRING(1500), allowNull: true},
    weightType: {type: DataTypes.STRING, allowNull: false},
    countWeightType: {type: DataTypes.INTEGER, allowNull: false},
});
/**
 * Список характеристик изделия
 */
const Characteristics = sequilize.define('characteristic', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    name: {type: DataTypes.STRING, unique: true, allowNull: false},
})
/**
 * Характеристика изделия
 */
const CharacteristicsItem = sequilize.define('characteristicsItem', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    value: {type: DataTypes.STRING, unique: false, allowNull: false},
})
/**
 * Тип изделия
 */
const Type = sequilize.define("Type", {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    name: {type: DataTypes.STRING, unique: true, allowNull: false},
});
/**
 * Тип начинки
 */
const Filling = sequilize.define("Filling", {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    name: {type: DataTypes.STRING, unique: true, allowNull: false},
    img: {type: DataTypes.STRING, allowNull: true},
});
/**
 * Тип бисквита
 */
const Biscuit = sequilize.define("Biscuit", {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    name: {type: DataTypes.STRING, unique: true, allowNull: false},
    img: {type: DataTypes.STRING, allowNull: true},
});
/**
 * Изображения
 */
const Image = sequilize.define("Image", {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    fileName: {type: DataTypes.STRING, allowNull: false},
});
/**
 * Модель информации о товаре
 */
const DeviceInfo = sequilize.define("Device_info", {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    name: {type: DataTypes.STRING},
    weight: {type: DataTypes.DECIMAL},
    weightType: {type: DataTypes.STRING},
    pricePerUnit: {type: DataTypes.DECIMAL},
});
/**
 * Модель доп товаров
 */
const Decor = sequilize.define("Decor", {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    name: {type: DataTypes.STRING, allowNull: false, unique: true},
    count: {type: DataTypes.DECIMAL, allowNull: false, defaultValue: 1},
    countType: {type: DataTypes.STRING, allowNull: false},
    pricePerUnit: {type: DataTypes.DECIMAL, allowNull: false},
    constPrice: {type: DataTypes.DECIMAL, allowNull: false},
});

/**
 * Модель доп товаров в заказе
 */
const OrderDecor = sequilize.define("Order_decor", {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    name: {type: DataTypes.STRING, allowNull: false},
});
/**
 * Модель доп товаров в заказе
 */
const OrderDecorItem = sequilize.define("Order_decor_item", {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    name: {type: DataTypes.STRING, allowNull: false},
    count: {type: DataTypes.DECIMAL, allowNull: false, defaultValue: 1},
    countType: {type: DataTypes.STRING, allowNull: false},
    pricePerUnit: {type: DataTypes.DECIMAL, allowNull: false},
    constPrice: {type: DataTypes.DECIMAL, allowNull: false},
});
/**
 * Рейтинг товара
 */
const Rating = sequilize.define("Rating", {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    ratingComment: {type: DataTypes.STRING},
    rating: {type: DataTypes.STRING, defaultValue: "0"},
});
/**
 * Модель для туту листа
 */
const TODOList = sequilize.define("TODOList", {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    description: {type: DataTypes.STRING(1500)},
    isReady: {type: DataTypes.BOOLEAN},
});
/**
 * Модель журнала запросов
 */
const Audit = sequilize.define("AUDIT", {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    description: {type: DataTypes.STRING(1500)},
    user: {type: DataTypes.STRING(1500)},
});
/**
 * Модель СЕО тэгов
 */
const SEO = sequilize.define('SEO', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    type: {type: DataTypes.STRING(1500)},
    description: {type: DataTypes.STRING(1500)},
})

User.hasMany(Basket);
Basket.belongsTo(User);

User.hasOne(Token);
Token.hasOne(User);

User.hasMany(Rating);
Rating.belongsTo(User);

Basket.hasMany(BasketDevice, {as: "items"});
BasketDevice.belongsTo(Basket);


Type.hasMany(Device);
Device.belongsTo(Type);

Filling.hasMany(Device);
Device.belongsTo(Filling);

Biscuit.hasMany(Device);
Device.belongsTo(Biscuit);

Device.hasMany(Rating);
Rating.belongsTo(Device);

Device.hasMany(Image, {as: 'images'});
Image.belongsTo(Device);

Device.hasMany(BasketDevice);
BasketDevice.belongsTo(Device);


Decor.hasMany(OrderDecorItem);
OrderDecorItem.belongsTo(Decor);

Device.hasMany(DeviceInfo, {as: "info"});
DeviceInfo.belongsTo(Device);

Device.hasMany(Characteristics, {as: 'options'})
Characteristics.belongsTo(Device)

Device.hasMany(SEO, {as: 'seo'})
SEO.belongsTo(Device)

Characteristics.hasMany(CharacteristicsItem, {as: 'items'})
CharacteristicsItem.belongsTo(Characteristics)

Basket.hasMany(OrderDecor, {as: "decors"});
OrderDecor.belongsTo(Basket);


OrderDecor.hasMany(OrderDecorItem, {as: "items"});
OrderDecorItem.belongsTo(OrderDecor);

module.exports = {
    User,
    Token,
    Basket,
    BasketDevice,
    Device,
    DeviceInfo,
    Type,
    Rating,
    Filling,
    Decor,
    OrderDecor,
    OrderDecorItem,
    Biscuit,
    TODOList,
    Audit,
    UniqUser,
    Characteristics,
    CharacteristicsItem,
    SEO,
    Image
};
