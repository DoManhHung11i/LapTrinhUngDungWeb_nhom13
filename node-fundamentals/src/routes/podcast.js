const express = require('express');
const router = express.Router();
const PodcastController = require('../controllers/podcastController');
const { requireAuth, checkUser } = require('../middleware/authMiddleware');
const podcastController = require('../controllers/podcastController');

router.post('/AddToRecently', podcastController.AddToRecently);
router.post('/remove-from-QueueOrMyPodcast', podcastController.RemoveFromQueueOrMyPodcast);
router.post('/add-to-QueueOrMyPodcast', podcastController.AddToQueueOrMyPodcast);
router.post('/check-QueueOrMyPodcast', podcastController.checkQueueOrMyPodcast);
router.post('/:podcast_id/comment', requireAuth, PodcastController.Comment);
router.get('/:podcast_id/reviews', PodcastController.Review);
router.get('/calendar', podcastController.Calendar);
router.get('/:podcast_id/about', podcastController.About);
router.get('/:podcast_id/:esposide_id', PodcastController.DetailEsposide);
router.get('/:podcast_id', PodcastController.Esposides);

module.exports = router;