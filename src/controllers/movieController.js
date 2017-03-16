const movieRepositoryObj = require('../repositories/movieRepo');
const movieService = require('../services/movieService');
const Boom = require('Boom');

const getMovies = (request, reply) => {
    const page = request.query.page ? request.query.page : 1;
    
    movieService.getMovies(page, movieRepositoryObj.getMovies)
    .then(movies => reply(movies))
    .catch(error => reply(Boom.badImplementation('Failed to get contacts', error)));
}

const getMovieDtl = (request, reply) => {
    let movie = {};
    reply(movie);
}

module.exports = {
    getMovies,
    getMovieDtl
}