const homeRouter = require('./home');
const podcastRouter = require('./podcast');
const { requireAuth, checkUser } = require('../middleware/authMiddleware');

function route(app){
    app.use('*', checkUser);
    app.use('/podcast', podcastRouter);
    app.use('/', homeRouter);

}

module.exports = route;