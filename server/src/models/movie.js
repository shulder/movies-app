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
    charset: 'utf8',
    collate: 'utf8_unicode_ci',
    timestamps: false,
  });
};
