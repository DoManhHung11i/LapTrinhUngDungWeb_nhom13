const homeRouter = require('./home');
const authRouter = require('./auth');
const podcastRouter = require('./podcast')

function route(app){
    app.use('/podcast', podcastRouter);
    app.use('/', homeRouter);
}

module.exports = route;