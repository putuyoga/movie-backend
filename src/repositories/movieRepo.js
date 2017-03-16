var Movie = require('../models/movieDBModel');
const repoConstant = require('./constant');

const getMovies = (page) => Movie.find()
                            .sort({ 'createdDate' : 1 })
                            .skip((page-1)*repoConstant.numberOfRowPerPage)
                            .limit(repoConstant.numberOfRowPerPage);

const getMovie = (movieId) => Movie.findById(movieId);

module.exports = {
    getMovies,
    getMovie
}