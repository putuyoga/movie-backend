const movieRepositoryObj = require('../repositories/movieRepo');
const movieService = require('../services/movieService');
const Boom = require('Boom');

const getMovies = (request, reply) => {
    const page = request.query.page ? request.query.page : 1;
    
    movieService.getMovies(page, movieRepositoryObj.getMovies)
    .then(movies => reply(movies))
    .catch(error => reply(Boom.badImplementation('Failed to get movies', error)));
}

const getMovieDtl = (request, reply) => {
    const movieId = request.params.id;

    movieService.getMovie(movieId, movieRepositoryObj.getMovie)
    .then(movie => reply(movie))
    .catch(error => {
        if(error.code === 'NoSuchMovie'){
            return reply(Boom.notFound('Movie not found', error));
        } else {
            return reply(Boom.badImplementation('Failed to get movie', error));
        }
    });
}

module.exports = {
    getMovies,
    getMovieDtl
}