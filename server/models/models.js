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

const Basket = sequilize.define("Basket", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  name: { type: DataTypes.INTEGER },
  status: { type: DataTypes.STRING },
  date_completed: { type: DataTypes.DATE },
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
});

const BasketDevice = sequilize.define("Basket_device", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  name: { type: DataTypes.STRING, unique: true, allowNull: false },
  count: { type: DataTypes.INTEGER, allowNull: false },
  price: { type: DataTypes.INTEGER, allowNull: false },
});

const Device = sequilize.define("device", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  name: { type: DataTypes.STRING, unique: true, allowNull: false },
  price: { type: DataTypes.INTEGER, allowNull: false },
  rating: { type: DataTypes.INTEGER, defaultValue: 0 },
  img: { type: DataTypes.STRING, allowNull: true },
  description: { type: DataTypes.STRING, allowNull: true },
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

const DeviceInfo = sequilize.define("Device_info", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  name: { type: DataTypes.STRING },
  weight: { type: DataTypes.STRING },
  pricePerUnit: { type: DataTypes.INTEGER },
});

const Rating = sequilize.define("Rating", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  ratingComment: { type: DataTypes.STRING },
  rating: { type: DataTypes.STRING, defaultValue: "0" },
});

User.hasMany(Basket);
Basket.belongsTo(User);

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

Device.hasMany(Rating);
Rating.belongsTo(Device);

Device.hasMany(BasketDevice);
BasketDevice.belongsTo(Device);

Device.hasMany(DeviceInfo, { as: "info" });
DeviceInfo.belongsTo(Device);

module.exports = {
  User,
  Basket,
  BasketDevice,
  Device,
  DeviceInfo,
  Type,
  Rating,
  Filling,
  IndividualOrder,
  IndividualOrderItem,
};
