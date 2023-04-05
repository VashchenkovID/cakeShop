exports.up = (pgm) => {
  pgm.createTable("Users", {
    id: "id",
    name: { type: "varchar(1000)", notNull: true },
    createdAt: {
      type: "timestamp",
      notNull: true,
      default: pgm.func("current_timestamp"),
    },
  });
  pgm.createTable("Devices", {
    id: "id",
    userId: {
      type: "integer",
      notNull: true,
      references: '"users"',
      onDelete: "cascade",
    },
    body: { type: "text", notNull: true },
    createdAt: {
      type: "timestamp",
      notNull: true,
      default: pgm.func("current_timestamp"),
    },
  });
  pgm.createTable("Baskets", {
    id: "id",
    userId: {
      type: "integer",
      notNull: true,
      references: '"users"',
      onDelete: "cascade",
    },
    body: { type: "text", notNull: true },
    createdAt: {
      type: "timestamp",
      notNull: true,
      default: pgm.func("current_timestamp"),
    },
  });
  pgm.createTable("Basket_devices", {
    id: "id",
    userId: {
      type: "integer",
      notNull: true,
      references: '"users"',
      onDelete: "cascade",
    },
    body: { type: "text", notNull: true },
    createdAt: {
      type: "timestamp",
      notNull: true,
      default: pgm.func("current_timestamp"),
    },
  });
  pgm.createTable("Ratings", {
    id: "id",
    userId: {
      type: "integer",
      notNull: true,
      references: '"users"',
      onDelete: "cascade",
    },
    body: { type: "text", notNull: true },
    createdAt: {
      type: "timestamp",
      notNull: true,
      default: pgm.func("current_timestamp"),
    },
  });
  pgm.createTable("Types", {
    id: "id",
    userId: {
      type: "integer",
      notNull: true,
      references: '"users"',
      onDelete: "cascade",
    },
    body: { type: "text", notNull: true },
    createdAt: {
      type: "timestamp",
      notNull: true,
      default: pgm.func("current_timestamp"),
    },
  });
  pgm.createIndex("posts", "userId");
};
