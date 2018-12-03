// models/comment.js
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Autopopulate = require('./autopopulate');

const CommentSchema = new Schema({
    content: {
        type: String,
        required: true
    },
    author: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
});

CommentSchema.pre('findOne', Autopopulate('author'));
CommentSchema.pre('find', Autopopulate('author'));

module.exports = mongoose.model('Comment', CommentSchema);
