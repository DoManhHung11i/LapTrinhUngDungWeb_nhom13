const Podcast = require('../models/podcasts');
const Esposide = require('../models/esposides');
const Comment = require('../models/comments');
const User = require('../models/users');
const { ObjectId } = require('mongodb');
const { mutipleMongooseToObject, mongooseToObject } = require('../until/mongoose');


class PodcastController {
    async Esposides(req, res, next) {

            const podcastIDString = req.params.podcast_id;
            const podcastID = new ObjectId(podcastIDString);

            const podcast = mongooseToObject(await Podcast.findById(podcastID));
            const esposides = mutipleMongooseToObject(await Esposide.find({ podcast_id: podcastID }));
            
            res.render('esposide', { podcast, esposides });
    }

    async DetailEsposide(req, res){
        const podcastIDString = req.params.podcast_id;
        const podcastID = new ObjectId(podcastIDString);
        const esposideIDString = req.params.esposide_id;
        const esposideID = new ObjectId(esposideIDString);

        const podcast = mongooseToObject(await Podcast.findById(podcastID));
        const esposide = mongooseToObject(await Esposide.findById(esposideID));
        const comments = mutipleMongooseToObject(await Comment.find({ podcast_id: podcastID}));

        const userIds = comments.map(comment => comment.userid);
        const users = await User.find({ _id: { $in: userIds } });
        const userMap = {};
        users.forEach(user => {
            userMap[user._id] = user;
        });
        comments.forEach(comment => {
            const user = userMap[comment.userid];
            console.log(user);
            if (user) {
                comment.username = user.username;
            }
        });
        const lastFourComments = comments.slice(-4);
        
        res.render('detail_esposide', { podcast, esposide, lastFourComments });
    }
    async Review(req, res){
        const podcastIDString = req.params.podcast_id;
        const podcastID = new ObjectId(podcastIDString); 

        const podcast = mongooseToObject(await Podcast.findById(podcastID));
        const comments = mutipleMongooseToObject(await Comment.find({ podcast_id: podcastID}));


        const userIds = comments.map(comment => comment.userid);

        const users = await User.find({ _id: { $in: userIds } });

        const userMap = {};
        users.forEach(user => {
            userMap[user._id] = user;
        });

        comments.forEach(comment => {
            const user = userMap[comment.userid];
            console.log(user);
            if (user) {
                comment.username = user.username;
            }
        });
        
        
        res.render('Review', { podcast, comments });
        }
}
module.exports = new PodcastController();
