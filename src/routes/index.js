let Joi = require('joi');
Joi.objectId = require('joi-objectid')(Joi);

const movieController = require('../controllers/movieController');
const movieResponseObj = require('../models/movieResponse');
const movieDetailResponseObj = require('../models/movieDtlResponse');

const configureRoutes = () => {

    return [
        {
            method: 'GET',
            path: '/movies',
            config: {
                handler: movieController.getMovies,
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
                            '400': {'description': 'Bad Request'},
                            '500': {'description': 'Internal Server Error'}
                        }
                    }
                }
            }
        },
        {
            method: 'GET',
            path: '/movies/{id}',
            config: {
                handler: movieController.getMovieDtl,
                description: 'Get movie detail information',
                tags: ['api', 'movies'],
                validate: {
                    params: {
                        id: Joi.objectId()
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
        },
        {
            method: 'GET',
            path: '/movies/{id}/image',
            handler: function (request, reply) {
                reply.file(`./src/public/images/${request.params.id}.jpeg`);
            }
        }
    ]
};

module.exports = configureRoutes;