const { ObjectId } = require('mongodb');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const esposideSchema = new Schema({
    title: String, 
    description: String, 
    duration: String,
    release_date: Date,
    audio_url: String,
    podcast_id: {
        type: Schema.Types.ObjectId,
        ref: "Podcast"
    }
});

module.exports = mongoose.model('Esposide', esposideSchema);