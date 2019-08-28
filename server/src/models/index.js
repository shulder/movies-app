const Sequelize = require('sequelize');
const MovieModel = require('./movie.js');
const StarModel = require('./star.js');
const FormatModel = require('./format.js');
const config = require('../config/config.json');

const sequelize = new Sequelize(config.database);

const Movie = MovieModel(sequelize, Sequelize);
// MovieStar will be a junction table between Star and Movie, holding only movieId and starId fields
// it turns single many-to-many relationship into two one-to-many relationships
const MovieStar = sequelize.define('movie_star', {});
const Star = StarModel(sequelize, Sequelize);
const Format = FormatModel(sequelize, Sequelize);
// relations
Movie.belongsToMany(Star, { through: MovieStar, unique: false, onDelete: 'cascade' });
Star.belongsToMany(Movie, { through: MovieStar, unique: false, onDelete: 'cascade' });
Format.hasMany(Movie, { onDelete: 'cascade', hooks: true });
// Movie and Format are connected through formatId foreign key in Movie table
Movie.belongsTo(Format, { foreignKey: 'formatId' });

sequelize.sync()
  .then(() => {
    console.log('Connected to database!');
  })
  .catch((err) => {
    console.error('Unable to connect to the database:', err);
  });

module.exports = {
  Movie,
  Star,
  Format,
  Database: sequelize,
};
