const toMovie = (movie => {
    return {
        id: movie._id,
        name: movie.name,
        year: movie.year
    }
});

const getMovies = (page, load) => {
    return load(page).then(movies => movies.map(movie => toMovie(movie)));
};

module.exports = {
    getMovies
}