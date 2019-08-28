module.exports = (sequelize, types) => {
  return sequelize.define('movie', {
    id: {
      type: types.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    title: {
      type: types.STRING,
      required: true,
      unique: true,
    },
    releaseYear: {
      type: types.INTEGER,
      required: true,
    },
    formatId: types.INTEGER,
  }, {
    timestamps: false,
  });
};
