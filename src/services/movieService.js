const toMovie = (movie => {
    return {
        id: movie._id,
        name: movie.name,
        year: movie.year
    }
});

const toMovieDetail = (movie => {
    if(movie){
        return {
            id: movie._id,
            name: movie.name,
            year: movie.year,
            movieDetail: movie.movieDetail
        }
    } else {
        throw {
            message: 'Movie cannot be null or undefined',
            code: 'NoSuchMovie'
        }
    }
})

const getMovies = (page, load) => {
    return load(page).then(movies => movies.map(movie => toMovie(movie)));
};

const getMovie = (id, load) => {
    return load(id).then(movie => toMovieDetail(movie));
};

module.exports = {
    getMovies,
    getMovie
}