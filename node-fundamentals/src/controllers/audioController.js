const fs = require('fs');
const path = require('path');

// Define the path to the storage file
const dataDirPath = path.join(__dirname, '../data');
const dataFilePath = path.join(dataDirPath, 'audioData.json');

const saveAudioData = (req, res) => {
  const { audioUrl, imageUrl, title } = req.body;

  const audioData = {
    audioUrl,
    imageUrl,
    title
  };

  // Ensure the directory exists
  if (!fs.existsSync(dataDirPath)) {
    fs.mkdirSync(dataDirPath, { recursive: true });
  }

  // Save the data to a file (or you could save to a database)
  fs.writeFileSync(dataFilePath, JSON.stringify(audioData));

  res.status(200).json({ message: 'Audio data saved successfully' });
};

const getAudioData = (req, res) => {
  if (fs.existsSync(dataFilePath)) {
    const audioData = JSON.parse(fs.readFileSync(dataFilePath, 'utf8'));
    res.status(200).json(audioData);
  } else {
    res.status(404).json({ message: 'No audio data found' });
  }
};

const deleteAudioData = (req, res) => {
  if (fs.existsSync(dataFilePath)) {
    fs.unlinkSync(dataFilePath);
    res.status(200).json({ message: 'Audio data deleted successfully' });
  } else {
    res.status(404).json({ message: 'No audio data found to delete' });
  }
};

module.exports = { saveAudioData, getAudioData, deleteAudioData };
