const homeRouter = require('./home');
const podcastRouter = require('./podcast');
const audioRouter = require('./audio');
const { requireAuth, checkUser } = require('../middleware/authMiddleware');
const { loadAudioData } = require('../middleware/audioMiddleware');

function route(app){
    app.use('*', checkUser);
    app.use(loadAudioData); // Ensure audio data is loaded for all routes
    app.use('/podcast', podcastRouter);
    app.use('/api', audioRouter); // Add this line
    app.use('/', homeRouter);

}

module.exports = route;