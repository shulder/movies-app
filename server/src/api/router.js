const router = require('express').Router();
const middlewares = require('./middlewares');
const controllers = require('./controllers');

router.get('/movies', controllers.getMovies);

router.post('/movies', controllers.addMovie);

router.get('/movies/search', controllers.searchMoviesByQuery);

router.post('/movies/import', middlewares.handleMultipartData(), controllers.importMoviesFromFile);

router.get('/movies/:id', controllers.getMovieById);

router.delete('/movies/:id', controllers.deleteMovieById);

module.exports = router;
