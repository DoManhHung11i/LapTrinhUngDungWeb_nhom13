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
   signup(req, res, next) {
      res.render('signup');
   }
   Discovery(req, res, next){
      res.render('discovery');
   }
   MyPodcasts(req, res, next){
      res.render('MyPodcasts');
   }
   MyQueue(req, res, next){
      res.render('MyQueue');
   }
   Recently(req, res, next){
      res.render('recently');
   }

}

module.exports = new HomeController();
