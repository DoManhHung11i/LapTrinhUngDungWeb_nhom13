const { ObjectId } = require('mongodb');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const favoriteSchema = new Schema({
    userID: ObjectId,
    esposidesID: ObjectId,
    add_at: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Favorite', favoriteSchema);
