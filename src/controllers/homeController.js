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
