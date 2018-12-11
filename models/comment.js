// models/comment.js
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Populate = require('../utils/populate');

const CommentSchema = new Schema({
    content: {
        type: String,
        required: true
    },
    author: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    replies: [{
        type: Schema.Types.ObjectId,
        ref: 'Comment'
    }]
});

CommentSchema
    .pre('findOne', Populate('author'))
    .pre('findOne', Populate('replies'))
    .pre('find', Populate('author'))
    .pre('find', Populate('replies'));

module.exports = mongoose.model('Comment', CommentSchema);
