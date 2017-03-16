let mongoose = require('../../config/db');

var MovieSchema = mongoose.Schema({
    name                : String,
    year                : Number,
    movieDetail         : {
        directorName    : String,
        language        : String,
        country         : String,
        genre           : [],
        rating          : Number,
        vote            : Number
    }
});

var Movie = mongoose.model('Movie', MovieSchema);

module.exports = Movie;