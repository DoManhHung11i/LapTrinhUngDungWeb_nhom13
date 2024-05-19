const Podcast = require('../models/podcasts');
const Esposide = require('../models/esposides');
const Comment = require('../models/comments');
const User = require('../models/users');
const Favorite = require('../models/favorites');
const MyPodcast = require('../models/myPodcasts');
const RecentlyPodcast = require('../models/recentlyPodcasts');
const Searches = require('../models/searches');
const { mutipleMongooseToObject, mongooseToObject } = require('../until/mongoose');

class HomeController {
   async home(req, res, next){
      const podcasts = mutipleMongooseToObject(await Podcast.find({}).limit(5));
      const recentlyPodcasts = mutipleMongooseToObject(await RecentlyPodcast.find({}).limit(5));
      const esposides = [];
      for (const recentlyPodcast of recentlyPodcasts) {
            const esposide = await Esposide.findById(recentlyPodcast.esposideID);
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
      res.render('home', { podcasts, esposidesObjects, showFooter: true });
   }//search
   async Search(req, res, next) {
      const esposides = await Esposide.find({});
      const esposidesObjects = mutipleMongooseToObject(esposides);
      for (const esposideObject of esposidesObjects) {
          const podcast = await Podcast.findById(esposideObject.podcast_id);
      if (podcast) {
           esposideObject.podcastTitle = podcast.title;
           esposideObject.image = podcast.image;
           esposideObject.name_author = podcast.name_author;
    }
}
   res.render('search', { esposidesObjects});
   
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
   async Recently(req, res, next){
      const user = res.locals.user;
      const recentlyPodcasts = await RecentlyPodcast.find({ userID: user._id }).sort( { add_at: -1 });
      const esposides = [];
      for (const recentlyPodcast of recentlyPodcasts) {
            const esposide = await Esposide.findById(recentlyPodcast.esposideID);
            const currentTime = new Date();
            const timeDifference = Math.abs(currentTime - recentlyPodcast.add_at) / 36e5; 
            esposide.timePassed = timeDifference.toFixed(2); 
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

      res.render('recently', { esposidesObjects });
   }

}

module.exports = new HomeController();
