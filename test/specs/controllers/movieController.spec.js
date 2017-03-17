const sinon = require('sinon');
const chai = require('chai');
const sinonChai = require('sinon-chai');
var chaiAsPromised = require("chai-as-promised");
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
});