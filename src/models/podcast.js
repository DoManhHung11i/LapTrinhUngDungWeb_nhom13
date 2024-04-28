const mongoose = require('mongoose');

const podcastSchema = new mongoose.Schema({
    title: String,
    description: String, 
    image: String
});

const Podcast = mongoose.model('Podcast', podcastSchema);
module.exports = Podcast;