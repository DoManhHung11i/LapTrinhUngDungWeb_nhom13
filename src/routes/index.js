<<<<<<< HEAD
const homeRouter = require('./home');
const authRouter = require('./auth');
const podcastRouter = require('./podcast');
const { requireAuth, checkUser } = require('../middleware/authMiddleware');

function route(app){
    app.use('*', checkUser);
    app.use('/podcast', podcastRouter);
    app.use('/', homeRouter);

}

=======
const homeRouter = require('./home');
const podcastRouter = require('./podcast');
const { requireAuth, checkUser } = require('../middleware/authMiddleware');

function route(app){
    app.use('*', checkUser);
    app.use('/podcast', podcastRouter);
    app.use('/', homeRouter);

}

>>>>>>> b1ca706f7aaab9cde5794f1db8777a182aac2907
module.exports = route;