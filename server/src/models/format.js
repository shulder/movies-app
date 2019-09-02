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
    charset: 'utf8',
    collate: 'utf8_unicode_ci',
    timestamps: false,
  });
};
