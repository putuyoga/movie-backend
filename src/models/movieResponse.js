const Joi = require('joi');

const movieResponseObj =  Joi.object({
    id: Joi.string().guid(),
    name: Joi.string(),
    year: Joi.number()
});

module.exports = movieResponseObj;