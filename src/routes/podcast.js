const express = require('express');
const router = express.Router();
const PodcastController = require('../controllers/podcastController');

router.get('/:podcast_id/reviews', PodcastController.Review);
router.get('/:podcast_id/:esposide_id', PodcastController.DetailEsposide);
router.get('/:podcast_id', PodcastController.Esposides);

module.exports = router;