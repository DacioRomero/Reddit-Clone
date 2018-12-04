const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../server');
const Post = require("../models/post");

chai.should();
chai.use(chaiHttp);

describe("Posts", () => {
    const agent = chai.request.agent(server);

    before(() => {
        return agent.post('/login').send({
            username: "testone",
            password: "password"
        })
    })

    after(() => {
        agent.close();
    })

    it("should create with valid attributes at POST /posts", async () => {
        var post = {
            title: "post title",
            url: "https://www.google.com",
            summary: "post summary",
            subreddit: "sub"
        };

        const firstCount = await Post.countDocuments();

        const res = await agent.post('/posts').send(post);
        res.should.have.status(200);

        firstCount.should.equal(await Post.countDocuments() - 1)

        await Post.findOneAndDelete(post)
    });
});
