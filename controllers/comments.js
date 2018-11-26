// controllers/comments.js
const express = require('express');
const router = express.Router();
const Comment = require('../models/comment');
const Post = require('../models/post');

router.post('/posts/:postId/comments', (req, res) => {
    const comment = new Comment(req.body);

    comment.save()
    .then(comment => {
        return Post.findById(req.params.postId)
    })
    .then(post => {
        post.comments.unshift(comment)
        return post.save()
    })
    .then(post => {
        res.redirect('/')
    })
    .catch(console.error);
})

module.exports = router;
