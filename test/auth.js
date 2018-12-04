const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../server');
const User = require('../models/user');

chai.should();
chai.use(chaiHttp);

describe('User', () => {
    const agent = chai.request.agent(server);

    after(() => {
        agent.close();
    });

    it('Should not be able to login if they have not registered', async () => {
        const res = await agent.post('/login')
        .send({
            username: "wrong@wrong.com",
            password: "nope"
        });
        res.should.have.status(401)
    });

    it('Should be able to register', async () => {
        const res = await agent.post('/register')
        .send({
            username: 'testone',
            password: 'password'
        });
        res.should.have.status(200);
        agent.should.have.cookie('nToken');

        await User.findOneAndDelete({ username: 'testone'});
    });

    it('should be able to logout', async () => {
        await agent.get('/logout');
        agent.should.not.have.cookie('nToken');
    })
});
