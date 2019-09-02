module.exports = (sequelize, types) => {
  return sequelize.define('star', {
    id: {
      type: types.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: types.STRING,
      required: true,
    },
    surname: {
      type: types.STRING,
      required: true,
    },
  }, {
    charset: 'utf8',
    collate: 'utf8_unicode_ci',
    timestamps: false,
  });
};
