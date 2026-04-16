const { EntitySchema } = require("typeorm");

module.exports = new EntitySchema({
  name: "User",
  tableName: "users",
  columns: {
    id: {
      type: Number,
      primary: true,
      generated: true,
    },
    email: {
      type: String,
      unique: true,
      nullable: false,
    },
    passwordHash: {
      type: String,
      nullable: false,
    },
    createdAt: {
      type: "timestamp",
      createDate: true,
    },
  },
});