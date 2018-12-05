// test/posts.js
const chai = require('chai');
const chaiHttp = require('chai-http');

const Post = require('../models/post');
const User = require('../models/user')
const server = require('../server');

chai.should();
chai.use(chaiHttp);

describe('Posts', () => {
    const post = {
        title: 'post title',
        url: 'https://www.google.com',
        summary: 'post summary',
        subreddit: 'sub'
    };

    describe('Authenticated', () => {
        const agent = chai.request.agent(server);

        const user = {
            username: 'poststest',
            password: 'testposts'
        };

        before(() => {
            return agent.post('/register').send(user);
        });

        it('Should create with valid attributes at POST /posts', async () => {
            const originalCount = await Post.countDocuments();
            const res = await agent.post('/posts').send(post);
            const newCount = await Post.countDocuments();

            res.should.be.html;
            res.should.have.status(200);;
            originalCount.should.equal(newCount - 1);

            await Post.findOneAndDelete(post);
        });

        after(() => {
            agent.close();

            return User.findOneAndDelete({
                username: user.username
            });
        });
    });

    describe('Unauthenticated', () => {
        const agent = chai.request.agent(server);

        it('Should not create post at POST /posts', async () => {
            const res = await agent.post('/posts').send(post);

            res.should.be.html;
            res.should.have.status(401);
        });

        after(() => {
            agent.close()
        });
    });
});
