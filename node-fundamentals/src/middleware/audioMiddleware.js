const fs = require('fs');
const path = require('path');

const dataFilePath = path.join(__dirname, '../data/audioData.json');

const loadAudioData = (req, res, next) => {
  if (fs.existsSync(dataFilePath)) {
    const audioData = JSON.parse(fs.readFileSync(dataFilePath, 'utf8'));
    res.locals.audioData = audioData;
  } else {
    res.locals.audioData = null;
  }
  next();
};

module.exports = { loadAudioData };
