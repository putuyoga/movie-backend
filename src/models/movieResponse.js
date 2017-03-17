let Joi = require('joi');
Joi.objectId = require('joi-objectid')(Joi);

const movieResponseObj =  Joi.object({
    id: Joi.objectId(),
    name: Joi.string(),
    year: Joi.number()
});

module.exports = movieResponseObj;