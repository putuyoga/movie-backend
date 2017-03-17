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
    },
    createdDate         : { type: Date, default: Date.now }
});

var Movie = mongoose.model('Movie', MovieSchema);

module.exports = Movie;