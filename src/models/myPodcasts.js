const { ObjectId } = require('mongodb');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const db = require('mongodb');

const MyPodcastSchema = new Schema({
    userID: { type: Schema.Types.ObjectId, ref: 'User' }, // Tham chiếu tới model User
    esposideID: { type: Schema.Types.ObjectId, ref: 'Esposide' }, // Tham chiếu tới model Esposide
    add_at: { type: Date, default: Date.now }
});
MyPodcastSchema.index({ userID: 1, esposideID: 1 }, { unique: true });
module.exports = mongoose.model('MyPodcast', MyPodcastSchema);
