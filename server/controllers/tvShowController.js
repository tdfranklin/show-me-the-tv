const apiKey = 'fb6a1d3f38c3d97f67df6d141f936f29';
const apiSearchUrl = 'https://api.themoviedb.org/3';
const apiImageUrl = 'https://image.tmdb.org/t/p/original';
const axios = require('axios');

const formatShows = payload => {
    const shows = [];
    payload.data.results.forEach(show => {
        shows.push({
            id: show.id,
            name: show.name,
            image: `${apiImageUrl}${show.backdrop_path}`
        });
    });
    return shows;
}

const getPopularShows = (req, res) => {
    axios.get(`${apiSearchUrl}/tv/popular?api_key=${apiKey}`)
        .then(payload =>{
            const popularShows = formatShows(payload);
            res.json(popularShows);
        })
        .catch(err => console.log(err));
}

const getShow = (req, res) => {
    const showId = req.params.id;
    axios.get(`${apiSearchUrl}/tv/${showId}?api_key=${apiKey}`)
        .then(payload => {
            const show = payload.data;
            const genres = [];
            show.genres.map(genre => genres.push(genre.name));
            const showData = {
                id: show.id,
                name: show.name,
                genres: genres.join(', '),
                website: show.homepage,
                status: show.status,
                episodes: show.number_of_episodes,
                seasons: show.number_of_seasons,
                summary: show.overview,
                image: `${apiImageUrl}${show.poster_path}`,
                rating: show.vote_average
            }
            res.json(showData);
        })
        .catch(err => console.log(err));
}

const searchShows = (req, res) => {
    const searchText = req.params.text;
    axios.get(`${apiSearchUrl}/search/tv?api_key=${apiKey}&query=${searchText}`)
        .then(payload => {
            const searchResults = formatShows(payload);
            res.json(searchResults);
        })
        .catch(err => console.log(err));
}

module.exports = {getPopularShows, getShow, searchShows};