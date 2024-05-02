const express = require('express');
const router = express.Router();
const PodcastController = require('../controllers/podcastController');

router.get('/:podcast_id', PodcastController.getPodcastPlaylist)

module.exports = router;