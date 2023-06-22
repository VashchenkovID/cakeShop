const sequilize = require("../db");
const { DataTypes } = require("sequelize");

const User = sequilize.define("User", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  email: { type: DataTypes.STRING, unique: true },
  password: { type: DataTypes.STRING },
  role: { type: DataTypes.STRING, defaultValue: "USER" },
  fullName: { type: DataTypes.STRING, allowNull: true },
  phone: { type: DataTypes.STRING, allowNull: true },
});

const UniqUser = sequilize.define("UniqUser", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  address: { type: DataTypes.STRING(1000) },
});

const Token = sequilize.define("Token", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  refreshToken: { type: DataTypes.STRING, required: true },
});

const Basket = sequilize.define("Basket", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  name: { type: DataTypes.STRING },
  status: { type: DataTypes.STRING },
  date_completed: { type: DataTypes.DATE },
  customer: { type: DataTypes.STRING, allowNull: false },
  customer_phone: { type: DataTypes.STRING, allowNull: false },
  customer_email: { type: DataTypes.STRING },
});

const IndividualOrder = sequilize.define("IndividualOrder", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  name: { type: DataTypes.STRING },
  status: { type: DataTypes.STRING },
  date_completed: { type: DataTypes.DATE },
  customer: { type: DataTypes.STRING, allowNull: false },
  customer_phone: { type: DataTypes.STRING, allowNull: false },
  customer_email: { type: DataTypes.STRING },
});

const IndividualOrderItem = sequilize.define("IndividualOrder_item", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  name: { type: DataTypes.STRING, allowNull: false },
  count: { type: DataTypes.INTEGER, allowNull: false },
  price: { type: DataTypes.INTEGER, allowNull: false },
  countWeightType: { type: DataTypes.INTEGER, allowNull: false },
});

const BasketDevice = sequilize.define("Basket_device", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  name: { type: DataTypes.STRING, allowNull: false },
  count: { type: DataTypes.INTEGER, allowNull: false },
  price: { type: DataTypes.INTEGER, allowNull: false },
  countWeightType: { type: DataTypes.INTEGER, allowNull: false },
});

const Device = sequilize.define("device", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  name: { type: DataTypes.STRING, unique: true, allowNull: false },
  price: { type: DataTypes.INTEGER, allowNull: false },
  discount: { type: DataTypes.INTEGER, allowNull: false, defaultValue: 0 },
  rating: { type: DataTypes.INTEGER, defaultValue: 0 },
  img: { type: DataTypes.STRING, allowNull: true },
  description: { type: DataTypes.STRING(1500), allowNull: true },
  weightType: { type: DataTypes.STRING, allowNull: false },
  countWeightType: { type: DataTypes.INTEGER, allowNull: false },
});

const Type = sequilize.define("Type", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  name: { type: DataTypes.STRING, unique: true, allowNull: false },
});

const Filling = sequilize.define("Filling", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  name: { type: DataTypes.STRING, unique: true, allowNull: false },
  img: { type: DataTypes.STRING, allowNull: true },
});

const Biscuit = sequilize.define("Biscuit", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  name: { type: DataTypes.STRING, unique: true, allowNull: false },
  img: { type: DataTypes.STRING, allowNull: true },
});

const DeviceInfo = sequilize.define("Device_info", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  name: { type: DataTypes.STRING },
  weight: { type: DataTypes.DECIMAL },
  weightType: { type: DataTypes.STRING },
  pricePerUnit: { type: DataTypes.DECIMAL },
});

const Decor = sequilize.define("Decor", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  name: { type: DataTypes.STRING, allowNull: false, unique: true },
  count: { type: DataTypes.DECIMAL, allowNull: false, defaultValue: 1 },
  countType: { type: DataTypes.STRING, allowNull: false },
  pricePerUnit: { type: DataTypes.DECIMAL, allowNull: false },
  constPrice: { type: DataTypes.DECIMAL, allowNull: false },
});

const OrderDecor = sequilize.define("Order_decor", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  name: { type: DataTypes.STRING, allowNull: false },
});

const OrderDecorItem = sequilize.define("Order_decor_item", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  name: { type: DataTypes.STRING, allowNull: false },
  count: { type: DataTypes.DECIMAL, allowNull: false, defaultValue: 1 },
  countType: { type: DataTypes.STRING, allowNull: false },
  pricePerUnit: { type: DataTypes.DECIMAL, allowNull: false },
  constPrice: { type: DataTypes.DECIMAL, allowNull: false },
});

const Rating = sequilize.define("Rating", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  ratingComment: { type: DataTypes.STRING },
  rating: { type: DataTypes.STRING, defaultValue: "0" },
});

const TODOList = sequilize.define("TODOList", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  description: { type: DataTypes.STRING(1500) },
  isReady: { type: DataTypes.BOOLEAN },
});

const Audit = sequilize.define("AUDIT", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  description: { type: DataTypes.STRING(1500) },
  user: { type: DataTypes.STRING(1500) },
});

User.hasMany(Basket);
Basket.belongsTo(User);

User.hasOne(Token);
Token.hasOne(User);

User.hasMany(Rating);
Rating.belongsTo(User);

Basket.hasMany(BasketDevice, { as: "items" });
BasketDevice.belongsTo(Basket);

IndividualOrder.hasMany(IndividualOrderItem, { as: "items" });
IndividualOrderItem.belongsTo(IndividualOrder);

Type.hasMany(Device);
Device.belongsTo(Type);

Filling.hasMany(Device);
Device.belongsTo(Filling);

Biscuit.hasMany(Device);
Device.belongsTo(Biscuit);

Device.hasMany(Rating);
Rating.belongsTo(Device);

Device.hasMany(BasketDevice);
BasketDevice.belongsTo(Device);

Device.hasMany(IndividualOrderItem);
IndividualOrderItem.belongsTo(Device);

Decor.hasMany(OrderDecorItem);
OrderDecorItem.belongsTo(Decor);

Device.hasMany(DeviceInfo, { as: "info" });
DeviceInfo.belongsTo(Device);

Basket.hasMany(OrderDecor, { as: "decors" });
OrderDecor.belongsTo(Basket);

IndividualOrder.hasMany(OrderDecor, { as: "decors" });
OrderDecor.belongsTo(IndividualOrder);

OrderDecor.hasMany(OrderDecorItem, { as: "items" });
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
  IndividualOrder,
  IndividualOrderItem,
  Decor,
  OrderDecor,
  OrderDecorItem,
  Biscuit,
  TODOList,
  Audit,
  UniqUser
};
