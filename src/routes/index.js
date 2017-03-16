const Joi = require('joi');

const movieController = require('../controllers/movieController');

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
                                'schema': Joi.array().items(Joi.object({
                                    id: Joi.string().guid(),
                                    name: Joi.string(),
                                    year: Joi.number()
                                })).label('List Movie')
                            },
                            '400': {'description': 'Bad Request'}
                        }
                    }
                }
            }
        },
        {
            method: 'GET',
            path: '/contacts/{id}',
            config: {
                handler: (request, reply) => movieController.getMovieDtl,
                description: 'Get movie detail information',
                tags: ['api', 'movies'],
                plugins: {
                    'hapi-swagger': {
                        responses: {
                            '200': {
                                'description': 'Success',
                                'schema': Joi.object({
                                    id: Joi.string().guid(),
                                    name: Joi.string(),
                                    year: Joi.number(),
                                    directorName: Joi.string(),
                                    language: Joi.string(),
                                    country: Joi.string(),
                                    genre: Joi.array().items(Joi.string()),
                                    rating: Joi.number(),
                                    vote: Joi.number()
                                }).label('List Movie')
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