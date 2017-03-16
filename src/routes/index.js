const Joi = require('joi');

const movieController = require('../controllers/movieController');
const movieResponseObj = require('../models/movieResponse');
const movieDtlResponseObj = require('../models/movieDtlResponse');

const configureRoutes = () => {

    return [
        {
            method: 'GET',
            path: '/movies',
            config: {
                handler: (request, reply) => movieController.getMovies,
                description: 'Get all movies',
                tags: ['api', 'movies'],
                plugins: {
                    'hapi-swagger': {
                        responses: {
                            '200': {
                                'description': 'Success',
                                'schema': Joi.array().items(movieResponseObj).label('List Movie')
                            },
                            '400': {'description': 'Bad Request'}
                        }
                    }
                }
            }
        },
        {
            method: 'GET',
            path: '/movies/{id}',
            config: {
                handler: (request, reply) => movieController.getMovieDtl,
                description: 'Get movie detail information',
                tags: ['api', 'movies'],
                plugins: {
                    'hapi-swagger': {
                        responses: {
                            '200': {
                                'description': 'Success',
                                'schema': movieDtlResponseObj.label('Movie Detail')
                            },
                            '400': {'description': 'Bad Request'},
                            '404': {'description': 'Not found'}
                        }
                    }
                }
            }
        }
    ]
};

module.exports = configureRoutes;