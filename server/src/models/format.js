module.exports = (sequelize, types) => {
  return sequelize.define('format', {
    id: {
      type: types.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    type: {
      type: types.STRING,
      unique: true,
      required: true,
    },
  }, {
    timestamps: false,
  });
};
