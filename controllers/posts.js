// controllers/posts.js
const express = require('express');
const router = express.Router();
const Post = require('../models/post');
const User = require('../models/user')
const CheckAuth = require('../utils/authorize');

// INDEX Post
router.get('/', (req, res) => {
    const currentUser = req.user;

    Post.find().lean()
    .then(posts => {
        res.render('posts-index', { posts, currentUser });
    })
    .catch(error => {
        console.error(error);
    });
});

// INDEX Post - SUBREDDIT
router.get("/n/:sub", (req, res) => {
    const currentUser = req.user;

    Post.find({ subreddit: req.params.sub }).lean()
    .then(posts => {
        res.render("posts-index", { posts, currentUser });
    })
    .catch(error => {
        console.log(error);
    });
});

// NEW Post
router.get('/posts/new', (req, res) => {
    res.render('posts-new');
});

// CREATE Post
router.post('/posts', CheckAuth, (req, res) => {
    const post = new Post(req.body);
    post.author = req.user._id

    post.save()
    .then(post => {
        return User.findById(req.user._id)
    })
    .then(user => {
        user.posts.unshift(post);
        user.save();

        res.redirect(`/posts/${post._id}`);
    })
    .catch(error => {
        console.error(error);
    });
});

// SHOW Post
router.get('/posts/:id', (req, res) => {
    const currentUser = req.user;

    Post.findById(req.params.id).populate('comments').lean()
    .then(post => {
        res.render('posts-show', { post, currentUser });
    })
    .catch(error => {
        console.error(error);
    });
});

router.put('/posts/:id/vote-:direction', CheckAuth, (req, res) => {
    Post.findById(req.params.id)
    .then(post => {
        switch(req.params.direction.toUpperCase()) {
            case 'UP':
                post.upVotes.push(req.user._id);
                post.voteScore += 1;
                post.save();
                return res.status(200).json({ voted: true });
            case 'DOWN':
                post.downVotes.push(req.user._id);
                post.voteScore -= 1;
                post.save();
                return res.status(200).json({ voted: false });
            default:
                return res.status(400).json({
                    voted: false,
                    reason: 'Invalid vote'
                });
        }
    })
    .catch(error => {
        console.error(error);
        res.status(500).json({
            voted: false,
            reason: `Server error: ${error.message}`
        });
    });
});

module.exports = router
