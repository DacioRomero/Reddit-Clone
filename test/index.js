const chai = require('chai');
const chaiHttp = require('chai-http');
const should = chai.should();
const server = require('../server');

chai.use(chaiHttp);

describe('site', () => {
    it('Should have home page', () => {
        return chai.request(server)
        .get('/')
        .then(res => {
            res.should.have.status(200);
            res.should.be.html;
        });
    });
});
