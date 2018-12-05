const chai = require('chai');
const chaiHttp = require('chai-http');

const User = require('../models/user');
const server = require('../server');

chai.should();
chai.use(chaiHttp);

describe('User', () => {
    const agent = chai.request.agent(server);

    const user = {
        username: 'authtest',
        password: 'testauth'
    };

    it('Should not be able to login if they have not registered', async () => {
        const res = await agent.post('/login').send(user);

        res.should.have.status(401)
    });

    it('Should be able to register', async () => {
        const res = await agent.post('/register').send(user);

        res.should.have.status(200);
        agent.should.have.cookie('nToken');

    });

    it('Should be able to login', async () => {
        const res = await agent.post('/login').send(user);

        res.should.have.status(200);
    })

    it('Should be able to logout', async () => {
        await agent.get('/logout');

        agent.should.not.have.cookie('nToken');
    });

    after(() => {
        agent.close();

        return User.findOneAndDelete({
            username: user.username
        });
    });
});
