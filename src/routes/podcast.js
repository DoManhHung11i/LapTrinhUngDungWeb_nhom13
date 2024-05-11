const express = require('express');
const router = express.Router();
const PodcastController = require('../controllers/podcastController');
const { requireAuth, checkUser } = require('../middleware/authMiddleware');
const podcastController = require('../controllers/podcastController');

router.post('/add-to-queue',requireAuth, podcastController.AddToQueue);
router.post('/:podcast_id/comment', requireAuth, PodcastController.Comment);
router.get('/:podcast_id/reviews', PodcastController.Review);
router.get('/:podcast_id/:esposide_id', PodcastController.DetailEsposide);
router.get('/:podcast_id', PodcastController.Esposides);

module.exports = router;