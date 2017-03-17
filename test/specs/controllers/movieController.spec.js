const sinon = require('sinon');
const chai = require('chai');
const sinonChai = require('sinon-chai');
var chaiAsPromised = require("chai-as-promised");
const Boom = require('Boom');

const movieController = require('../../../src/controllers/movieController');
const movieService = require('../../../src/services/movieService');

chai.use(sinonChai);
chai.use(chaiAsPromised);
chai.should();

describe('Get Movies API', () => {
	it("should return empty array if no movie is available", (done) => {
		sinon.stub(movieService, 'getMovies', () => Promise.resolve([]));
		const reply = sinon.spy();
		movieController.getMovies({
            log: () => null,
            query: {}
        }, reply)
		.then(() => {
			reply.should.have.been.calledWith([]);
            movieService.getMovies.restore();
            done();
		}).catch(error => {
            movieService.getMovies.restore();
            done(error);
        });
	});

    it("should return movie array", (done) => {
        const movieArray = [
            {    
                name: 'Kong Skull Island',
                year: 1980 ,
                createdDate: Date(),
                movieDetail: {
                    directorName: 'Jordan Vogt-Roberts',
                    language: 'English',
                    country: 'US',
                    genre: ['action', 'romantic'],
                    rating: 5,
                    vote: 100000
                }
            },
            {    
                name: 'Kong Skull Island Part 2',
                year: 1981 ,
                createdDate: Date(),
                movieDetail: {
                    directorName: 'Jordan Vogt-Roberts',
                    language: 'English',
                    country: 'US',
                    genre: ['action', 'romantic'],
                    rating: 4,
                    vote: 1000
                }
            }
        ];
		sinon.stub(movieService, 'getMovies', () => Promise.resolve(movieArray));
		const reply = sinon.spy();
		movieController.getMovies({
            log: () => null,
            query: {}
        }, reply)
		.then(() => {
			reply.should.have.been.calledWith(movieArray);
            movieService.getMovies.restore();
            done();
		}).catch(error => {
            movieService.getMovies.restore();
            done(error);
        });
	});

    it("should return error if could not get movie list", (done) => {
		sinon.stub(movieService, 'getMovies', () => Promise.reject({
            message: 'Could not get movie list',
            code: 'failedToGetMovieList'
        }));
		const reply = sinon.spy();
		movieController.getMovies({
            log: () => null,
            query: {}
        }, reply)
		.then(() => {
            movieService.getMovies.restore();
            done();
		}).catch(error => {
            reply.should.have.been.calledWith(Boom.badImplementation('Failed to get movies', error));
            movieService.getMovies.restore();
            done(error);
        });
	});
});