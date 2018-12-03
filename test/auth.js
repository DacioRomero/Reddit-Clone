const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../server');
const User = require('../models/user');

const should = chai.should();

chai.use(chaiHttp);

const agent = chai.request.agent('http://localhost:3000');

describe('User', () => {
    it('Should not be able to login if they have not registered', done => {
        agent.post('/login')
            .send({
                username: "wrong@wrong.com",
                password: "nope"
            })
            .end((err, res) => {
                res.status.should.be.equal(401);
                done();
            })
    });

    it('Should be able to register', done => {
        User.findByIdAndRemove({ username: 'testone' }, () => {
            agent.post('/register')
                .send({
                    username: 'testone',
                    password: 'password'
                })
                .end((err, res) => {
                    res.should.have.status(200);
                    agent.should.have.cookie('nToken');
                    done();
                })
        });
    });

    it('should be able to logout', done => {
        agent.get('/logout')
            .end((err, res) => {
                agent.should.not.have.cookie('nToken');
                done();
            });
    })
});
