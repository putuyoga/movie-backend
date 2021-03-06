let Joi = require('joi');
Joi.objectId = require('joi-objectid')(Joi);

const movieDtlResponseObj =  Joi.object({
    id: Joi.objectId(),
    name: Joi.string(),
    year: Joi.number(),
    directorName: Joi.string(),
    language: Joi.string(),
    country: Joi.string(),
    genre: Joi.array().items(Joi.string()),
    rating: Joi.number(),
    vote: Joi.number()
});

module.exports = movieDtlResponseObj;