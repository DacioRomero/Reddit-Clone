const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Autopopulate = require('../utils/autopopulate');

const PostSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    url: {
        type: String,
        required: true
    },
    summary: {
        type: String,
        required: true
    },
    subreddit: {
        type: String,
        required: true
    },
    comments: [{
        type: Schema.Types.ObjectId,
        ref: 'Comment'
    }],
    author: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    upVotes: [{
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }],
    downVotes: [{
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }],
    voteScore: {
        type: Number,
        default: 0
    }
});

// https://stackoverflow.com/a/30052105/10336544
// Makes using posts easier as you almost always want author info
PostSchema.pre('findOne', Autopopulate('author'));
PostSchema.pre('find', Autopopulate('author'));

module.exports = mongoose.model('Post', PostSchema);
