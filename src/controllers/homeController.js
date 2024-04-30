const podcasts = require('../models/podcasts');
const Podcast = require('../models/podcasts');
const { mutipleMongooseToObject, mongooseToObject } = require('../until/mongoose');

class HomeController {
   home(req, res, next){
    Podcast.find({}).limit(5)
        .then(podcasts => {
         podcasts = podcasts.map(podcast => podcast.toObject())
         res.render('home', { podcasts });
        })
        .catch(next);
   }
   login(req, res, next) {
      res.render('login');
   }
}

module.exports = new HomeController();
