const { parseMovieInfo } = require('../helpers/fileParser.js');
const { getPageData, getTotalNumberOfPages } = require('../helpers/pagination.js');
const {
  Database,
  Movie,
  Star,
  Format,
} = require('../models');

const insertMovieInfo = async (movieInfo) => {
  const {
    title,
    releaseYear,
    format,
    stars,
  } = movieInfo;
  // proceed only if all attributes are specified
  // also some constraints and type checking need to be done
  if (title && releaseYear && format && stars) {
    // insert format and movie concurrently
    const [[movie], [movieFormat]] = await Promise.all([
      Movie.findOrCreate({
        where: {
          title,
          releaseYear: Number(releaseYear),
        },
      }),
      Format.findOrCreate({
        where: {
          type: format.type.toUpperCase(),
        },
      }),
    ]);
    // specify a foreign key in Movie table
    await movie.setFormat(movieFormat);
    // create an array of stars insertion promises
    const insertionPromises = stars.map(async ({ name, surname }) => {
      const [movieStar] = await Star.findOrCreate({
        where: {
          name,
          surname,
        },
      });
      return movie.addStar(movieStar);
    });
    // insert stars concurrently
    return Promise.all(insertionPromises);
  }
};

// GET /movies
// GET /movies?page=number&limit=number
const getMovies = async (req, res) => {
  const page = Number(req.query.page);
  const limit = Number(req.query.limit);
  try {
    const movies = await Movie.findAll({
      attributes: ['id', 'title', 'releaseYear'],
    });
    const paginatedMovies = getPageData(movies, page, limit);
    const totalPages = getTotalNumberOfPages(movies, limit);
    res.status(200).json({
      movies: paginatedMovies,
      totalPages,
    });
  } catch (err) {
    console.log('error in getMovies controller!', err);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// GET /movies/:id
const getMovieById = async (req, res) => {
  const movieId = req.params.id;
  try {
    const movie = await Movie.findOne({
      attributes: ['id', 'title', 'releaseYear'],
      include: [
        {
          model: Format,
          attributes: ['type'],
        },
        {
          model: Star,
          through: {
            attributes: [],
          },
        },
      ],
      where: {
        id: movieId,
      },
    });
    res.json(movie);
  } catch (err) {
    console.log('error in getMovieById controller!', err);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// GET /movies/search?input=string
const searchMoviesByQuery = async (req, res) => {
  const { input } = req.query;
  const page = Number(req.query.page);
  const limit = Number(req.query.limit);
  // It's not obvios how to perform the same SQL query with ORM syntax
  // (using include, Op.or, Op.like, etc).
  const searchQuery = `
    SELECT movies.id, movies.title, movies.releaseYear FROM movies
      JOIN movie_stars
        ON movies.id = movie_stars.movieId
      JOIN stars
        ON movie_stars.starId = stars.id
      WHERE 
        movies.title LIKE '%${input}%' OR stars.name LIKE '%${input}%' OR stars.surname LIKE '%${input}%'
      GROUP BY movies.id;`;
  try {
    // returns all movies which contain user-typed query in a movie title
    // or in a featuring star's name/surname
    const [moviesInfo] = await Database.query(searchQuery);
    if (moviesInfo.length > 0) {
      const paginatedMoviesInfo = getPageData(moviesInfo, page, limit);
      const totalPages = getTotalNumberOfPages(moviesInfo, limit);
      res.status(200).json({
        movies: paginatedMoviesInfo,
        totalPages,
      });
    } else {
      res.status(404).json({ error: 'No data found for this search input' });
    }
  } catch (err) {
    console.log('error in searchMovieByQuery controller!', err);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// POST /movies
const addMovie = async (req, res) => {
  const movieInfo = req.body;
  console.log('received json from client', movieInfo);
  try {
    await insertMovieInfo(movieInfo);
    res.status(200).json({ ok: true });
  } catch (err) {
    console.log('error in addMovie controller!', err);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// POST /movies/import
const importMoviesFromFile = async (req, res) => {
  const textFile = req.file.buffer.toString();
  try {
    const movies = parseMovieInfo(textFile);
    const insertionPromises = movies.map(movie => insertMovieInfo(movie));
    await Promise.all(insertionPromises);
    res.status(200).json({ ok: true });
  } catch (err) {
    console.log('error in importMoviesFromFile controller!', err);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// DELETE /movies/:id
const deleteMovieById = async (req, res) => {
  const movieId = req.params.id;
  try {
    await Movie.destroy({
      where: {
        id: movieId,
      },
    });
    res.status(200).json({ ok: true });
  } catch (err) {
    console.log('error in deleteMovieById controller!', err);
    res.status(500).json({ error: 'Internal server error' });
  }
};

module.exports = {
  addMovie,
  deleteMovieById,
  getMovies,
  getMovieById,
  importMoviesFromFile,
  searchMoviesByQuery,
};
