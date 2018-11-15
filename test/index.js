const chai = require('chai');
const chaiHttp = require('chai-http');
const should = chai.should();
const server = require('../server');

chai.use(chaiHttp);

describe('site', () => {
    // Describe what you are testing
    it('Should have home page', () => {
        // Describe what should happen
        // In this case we test that the home page loads
        return chai.request(server)
        .get('/')
        .then(res => {
            res.should.have.status(200);
            res.should.be.html;
        });
    });
});
