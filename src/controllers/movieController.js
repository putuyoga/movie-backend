const getMovies = (request, reply) => {
    let movieList = [];
    reply(movieList);
}

const getMovieDtl = (request, reply) => {
    let movie = {};
    reply(movie);
}

module.exports = {
    getMovies,
    getMovieDtl
}