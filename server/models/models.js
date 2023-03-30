const sequilize = require("../db");
const { DataTypes } = require("sequelize");

const User = sequilize.define("User", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  email: { type: DataTypes.STRING, unique: true },
  password: { type: DataTypes.STRING },
  role: { type: DataTypes.STRING, defaultValue: "USER" },
});

const Basket = sequilize.define("Basket", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
});

const BasketDevice = sequilize.define("Basket_device", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
});

const Device = sequilize.define("Device", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  name: { type: DataTypes.STRING, unique: true, allowNull: false },
  price: { type: DataTypes.STRING, allowNull: false },
  type: { type: DataTypes.STRING, allowNull: false },
  rating: { type: DataTypes.STRING, defaultValue: "0" },
  img: { type: DataTypes.STRING, allowNull: false },
  feedback: { type: DataTypes.STRING },
  description: { type: DataTypes.STRING },
});

const Type = sequilize.define("Type", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  typeName: { type: DataTypes.STRING, unique: true, allowNull: false },
});

const DeviceInfo = sequilize.define("Device_info", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  comment: { type: DataTypes.STRING },
});

const Rating = sequilize.define("Rating", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  ratingComment: { type: DataTypes.STRING },
  rating: { type: DataTypes.STRING, defaultValue: "0" },
});

User.hasOne(Basket);
Basket.belongsTo(User);

User.hasMany(Rating);
Rating.belongsTo(User);

Basket.hasMany(BasketDevice);
BasketDevice.belongsTo(Basket);

Type.hasMany(Device);
Device.belongsTo(Type);

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
};
