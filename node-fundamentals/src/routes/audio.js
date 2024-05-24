const express = require('express');
const router = express.Router();
const { saveAudioData, getAudioData, deleteAudioData } = require('../controllers/audioController');

router.post('/save-audio-data', saveAudioData);
router.get('/audio-data', getAudioData);
router.delete('/audio-data', deleteAudioData);

module.exports = router;
