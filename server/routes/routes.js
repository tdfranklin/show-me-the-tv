const {getPopularShows, getShow, searchShows} = require('../controllers/tvShowController');

module.exports = (app) => {
    app.route('/api/popular')
        .get(getPopularShows);

    app.route('/api/show/:id')
        .get(getShow);

    app.route('/api/search/:text')
        .get(searchShows);
};