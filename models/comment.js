// models/comment.js
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Autopopulate = require('../utils/autopopulate');

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
    })
    .pre('findOne', Autopopulate('author'))
    .pre('findOne', Autopopulate('replies'))
    .pre('find', Autopopulate('author'))
    .pre('find', Autopopulate('replies'));

module.exports = mongoose.model('Comment', CommentSchema);
