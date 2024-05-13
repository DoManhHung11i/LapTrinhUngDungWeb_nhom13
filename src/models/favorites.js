<<<<<<< HEAD
const { ObjectId } = require('mongodb');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const favoriteSchema = new Schema({
    userID: ObjectId,
    esposidesID: ObjectId,
    add_at: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Favorite', favoriteSchema);
=======
const { ObjectId } = require('mongodb');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const db = require('mongodb');

const favoriteSchema = new Schema({
    userID: { type: Schema.Types.ObjectId, ref: 'User' }, // Tham chiếu tới model User
    esposideID: { type: Schema.Types.ObjectId, ref: 'Esposide' }, // Tham chiếu tới model Esposide
    add_at: { type: Date, default: Date.now }
});
favoriteSchema.index({ userID: 1, esposideID: 1 }, { unique: true });
module.exports = mongoose.model('Favorite', favoriteSchema);
>>>>>>> b1ca706f7aaab9cde5794f1db8777a182aac2907
