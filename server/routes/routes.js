const {getPopularShows, getShow, searchShows} = require('../controllers/tvShowController');
const {getPopularMovies, getMovie, searchMovies} = require('../controllers/movieController');

module.exports = (app) => {
    app.route('/api/tv/popular')
        .get(getPopularShows);

    app.route('/api/tv/:id')
        .get(getShow);

    app.route('/api/tv/search/:text')
        .get(searchShows);

    app.route('/api/movie/popular')
        .get(getPopularMovies);

    app.route('/api/movie/:id')
        .get(getMovie);

    app.route('/api/movie/search/:text')
        .get(searchMovies);
};