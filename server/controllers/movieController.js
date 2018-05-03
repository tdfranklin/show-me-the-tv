const apiKey = 'fb6a1d3f38c3d97f67df6d141f936f29';
const apiSearchUrl = 'https://api.themoviedb.org/3';
const apiImageUrl = 'https://image.tmdb.org/t/p/original';
const axios = require('axios');

const formatMovies = payload => {
    const movies = [];
    payload.data.results.forEach(movie => {
        movies.push({
            id: movie.id,
            name: movie.title,
            image: `${apiImageUrl}${movie.backdrop_path}`
        });
    });
    return movies;
}

const getPopularMovies = (req, res) => {
    axios.get(`${apiSearchUrl}/movie/popular?api_key=${apiKey}`)
        .then(payload =>{
            const popularMovies = formatMovies(payload);
            res.json(popularMovies);
        })
        .catch(err => console.log(err));
}

const getMovie = (req, res) => {
    const movieId = req.params.id;
    axios.get(`${apiSearchUrl}/movie/${movieId}?api_key=${apiKey}`)
        .then(payload => {
            const movie = payload.data;
            const genres = [];
            movie.genres.map(genre => genres.push(genre.name));
            const movieData = {
                id: movie.id,
                name: movie.title,
                genres: genres.join(', '),
                website: movie.homepage,
                runtime: `${movie.runtime} minutes`,
                release: movie.release_date,
                summary: movie.overview,
                image: `${apiImageUrl}${movie.poster_path}`,
                rating: movie.vote_average
            }
            res.json(movieData);
        })
        .catch(err => console.log(err));
}

const searchMovies = (req, res) => {
    const searchText = req.params.text;
    axios.get(`${apiSearchUrl}/search/movie?api_key=${apiKey}&query=${searchText}&include_adult=false`)
        .then(payload => {
            const searchResults = formatMovies(payload);
            res.json(searchResults);
        })
        .catch(err => console.log(err));
}

module.exports = {getPopularMovies, getMovie, searchMovies};