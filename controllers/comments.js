// controllers/comments.js
const express = require('express');
const router = express.Router();
const Comment = require('../models/comment');
const Post = require('../models/post');
const User = require('../models/user');
const CheckAuth = require('../check-auth');

router.post('/posts/:postId/comments', CheckAuth, (req, res) => {
    const comment = new Comment(req.body);
    comment.author = req.user._id

    comment.save()
    .then(comment => {
        return Promise.all([
            Post.findById(req.params.postId),
            User.findById(req.user._id)
        ]);
    })
    .then(([post, user]) => {
        post.comments.unshift(comment);
        user.comments.unshift(comment);

        return Promise.all([
            post.save(),
            user.save()
        ]);
    })
    .then(() => {
         res.redirect(`/posts/${req.params.postId}`);
    })
    .catch(console.error);
})

module.exports = router;
