const { ObjectId } = require('mongodb');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const commentSchema = new Schema({
    user_id: ObjectId,
    podcast_id: ObjectId,
    title: String, 
    content: String,
    created_at: { type: Date, default: Date.now },
    username: String
});

module.exports = mongoose.model('Comment', commentSchema);