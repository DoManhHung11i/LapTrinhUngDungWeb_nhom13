<<<<<<< HEAD
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
      //res.render('discovery', { showFooter: true });
      const user = res.locals.user;

    // Kiểm tra xem người dùng đã đăng nhập hay chưa
    if (user) {
        res.send(`Xin chào, ${user.username}!`); // Hiển thị tên người dùng nếu đã đăng nhập
    } else {
        res.send('Xin chào khách thăm!'); // Hiển thị tin nhắn chào mừng nếu chưa đăng nhập
    }
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
=======
const Podcast = require('../models/podcasts');
const Esposide = require('../models/esposides');
const Comment = require('../models/comments');
const User = require('../models/users');
const Favorite = require('../models/favorites');
const MyPodcast = require('../models/myPodcasts');
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
   ChangePassword(req, res){
      res.render('ChangePassword', { showFooter: true });
   }
   login(req, res, next) {
      res.render('login', { showFooter: true });
   }
   signup(req, res, next) {
      res.render('signup', { showFooter: true });
   }
   Discovery(req, res, next){
      //res.render('discovery', { showFooter: true });
      const user = res.locals.user;

    // Kiểm tra xem người dùng đã đăng nhập hay chưa
    if (user) {
        res.send(`Xin chào, ${user.username}!`); // Hiển thị tên người dùng nếu đã đăng nhập
    } else {
        res.send('Xin chào khách thăm!'); // Hiển thị tin nhắn chào mừng nếu chưa đăng nhập
    }
   }
   async MyPodcasts(req, res, next){
      const user = res.locals.user;
      const myPodcasts = await MyPodcast.find({ userID: user._id });
      const esposides = [];
      for (const myPodcast of myPodcasts) {
            const esposide = await Esposide.findById(myPodcast.esposideID);
            esposides.push(esposide);
      }
      const esposidesObjects = mutipleMongooseToObject(esposides);
      for (const esposideObject of esposidesObjects) {
         const podcast = await Podcast.findById(esposideObject.podcast_id);
         if (podcast) {
             esposideObject.podcastTitle = podcast.title;
             esposideObject.image = podcast.image;
             esposideObject.name_author = podcast.name_author;
         }
     }
     res.render('MyPodcast', { esposidesObjects });
   }
   async MyQueue(req, res, next){   
      const user = res.locals.user;
      const favorites = await Favorite.find({ userID: user._id }).sort( { add_at: 1 });
      const esposides = [];
      for (const favorite of favorites) {
            const esposide = await Esposide.findById(favorite.esposideID);
            esposides.push(esposide);
      }
      const esposidesObjects = mutipleMongooseToObject(esposides);
      for (const esposideObject of esposidesObjects) {
         const podcast = await Podcast.findById(esposideObject.podcast_id);
         if (podcast) {
             esposideObject.podcastTitle = podcast.title;
             esposideObject.image = podcast.image;
             esposideObject.name_author = podcast.name_author;
         }
     }
     res.render('MyQueue', { esposidesObjects });
   }
   Recently(req, res, next){
      res.render('recently', { showFooter: true });
   }

}

module.exports = new HomeController();
>>>>>>> b1ca706f7aaab9cde5794f1db8777a182aac2907
