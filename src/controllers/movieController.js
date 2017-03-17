const movieRepositoryObj = require('../repositories/movieRepo');
const movieService = require('../services/movieService');
const Boom = require('Boom');

const getMovies = (request, reply) => {
    // Log request
    request.log(['Incomming request']);

    const page = request.query.page ? request.query.page : 1;
    
    movieService.getMovies(page, movieRepositoryObj.getMovies)
    .then(movies => {
        console.log('Reponse payload:', movies);
        return reply(movies);
    })
    .catch(error => {
        console.log(error);
        return reply(Boom.badImplementation('Failed to get movies', error));
    });
}

const getMovieDtl = (request, reply) => {
    // Log request
    request.log(['Incomming request']);

    const movieId = request.params.id;

    movieService.getMovie(movieId, movieRepositoryObj.getMovie)
    .then(movie => {
        console.log('Reponse payload:', movie);
        return reply(movie);
    })
    .catch(error => {
        console.log(error);
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