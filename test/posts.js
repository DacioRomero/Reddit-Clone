const chai = require('chai');
const chaiHttp = require('chai-http');
const should = chai.should();
const server = require('../server');
const Post = require("../models/post");


describe("Posts", () => {
    const agent = chai.request.agent(server);

    before(() => {
        return agent.post('/login').send({ username: "testone", password: "password" })
    })

    after(() => {
        agent.close();
        server.stop();
    })

    it("should create with valid attributes at POST /posts", () => {
        var post = {
            title: "post title",
            url: "https://www.google.com",
            summary: "post summary",
            subreddit: "sub"
        };

        return Post.countDocuments()
        .then(count => {
            return Promise.all([
                count,
                agent.post('/posts').send(post)
            ])
        })
        .then(([count, res]) => {
            console.log(count)
            res.should.have.status(200);
            return Promise.all([
                count,
                Post.countDocuments()
            ])
        })
        .then(([count, newCount]) => {
            newCount.should.be.equal(count + 1)
            return Post.findOneAndDelete(post)
        });
    });
});
