// controllers/posts.js
const express = require('express');
const router = express.Router();
const Post = require('../models/post')

router.get('/posts/new', (req, res) => {
    res.render('posts-new');
});

router.post('/posts', (req, res) => {
    const post = new Post(req.body);

    post.save((err, post) => {
        return res.redirect(req.baseUrl);
    })
});

router.get('/', (req, res) => {
    Post.find().lean()
    .then(posts => {
        res.render('posts-index', { posts });
    })
    .catch(error => {
        console.error(error);
    });
});

// SUBREDDIT
router.get("/n/:sub", (req, res) => {
    Post.find({ subreddit: req.params.sub }).lean()
    .then(posts => {
        res.render("posts-index", { posts });
    })
    .catch(err => {
        console.log(err);
    });
});

router.get('/posts/:id', (req, res) => {
    Post.findById(req.params.id).lean()
    .then(post => {
        res.render('posts-show', { post });
    })
    .catch(error => {
        console.error(error);
    });
});

module.exports = router
