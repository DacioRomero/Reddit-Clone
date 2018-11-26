// controllers/posts.js
const express = require('express');
const router = express.Router();
const Post = require('../models/post');

// INDEX Post
router.get('/', (req, res) => {s
    Post.find().lean()
    .then(posts => {
        res.render('posts-index', { posts });
    })
    .catch(error => {
        console.error(error);
    });
});

// INDEX Post - SUBREDDIT
router.get("/n/:sub", (req, res) => {
    Post.find({ subreddit: req.params.sub }).lean()
    .then(posts => {
        res.render("posts-index", { posts });
    })
    .catch(err => {
        console.log(err);
    });
});

// NEW Post
router.get('/posts/new', (req, res) => {
    res.render('posts-new');
});

// CREATE Post
router.post('/posts', (req, res) => {
    const post = new Post(req.body);

    post.save((err, post) => {
        return res.redirect('/');
    });
});

// SHOW Post
router.get('/posts/:id', (req, res) => {
    Post.findById(req.params.id).populate('comments').lean()
    .then(post => {
        res.render('posts-show', { post });
    })
    .catch(error => {
        console.error(error);
    });
});

module.exports = router
