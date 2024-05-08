const Podcast = require('../models/podcasts');
const { mutipleMongooseToObject, mongooseToObject } = require('../until/mongoose');

class HomeController {
   home(req, res, next){
    Podcast.find({}).limit(5)
        .then(podcasts => {
         podcasts = podcasts.map(podcast => podcast.toObject())
         res.render('home', { podcasts, showFooter: true });
        })
        .catch(next);
   }
   logout(req, res, next){
      res.cookie('jwt', '', {maxAge: 1});
      res.redirect('/');
   }
   login(req, res, next) {
      res.render('login', { showFooter: true });
   }
   signup(req, res, next) {
      res.render('signup', { showFooter: true });
   }
   Discovery(req, res, next){
      res.render('discovery', { showFooter: true });
   }
   MyPodcasts(req, res, next){
      res.render('MyPodcasts', { showFooter: true });
   }
   MyQueue(req, res, next){
      res.render('MyQueue', { showFooter: true });
   }
   Recently(req, res, next){
      res.render('recently', { showFooter: true });
   }

}

module.exports = new HomeController();
