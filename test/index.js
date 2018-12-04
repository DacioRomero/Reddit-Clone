const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../server');

chai.should();
chai.use(chaiHttp);

describe('site', () => {
    it('Should have home page', async () => {
        const res = await chai.request(server).get('/');
        res.should.have.status(200);
        res.should.be.html;
    });
});
