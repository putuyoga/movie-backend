const Joi = require('joi');

const movieController = require('../controllers/movieController');
const movieResponseObj = require('../models/movieResponse');
const movieDetailResponseObj = require('../models/movieDtlResponse');

const configureRoutes = () => {

    return [
        {
            method: 'GET',
            path: '/movies',
            config: {
                handler: (request, reply) => movieController.getMovies,
                description: 'Get all movies',
                tags: ['api', 'movies'],
                validate: {
                    query: {
                        page: Joi.number()
                    }
                },
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
                validate: {
                    params: {
                        id: Joi.string().guid().required()
                    }
                },
                plugins: {
                    'hapi-swagger': {
                        responses: {
                            '200': {
                                'description': 'Success',
                                'schema': movieDetailResponseObj.label('Movie Detail')
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