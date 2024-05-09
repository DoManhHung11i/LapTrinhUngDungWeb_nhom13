const Podcast = require('../models/podcasts');
const Esposide = require('../models/esposides');
const Comment = require('../models/comments');
const User = require('../models/users');
const { ObjectId } = require('mongodb');
const { mutipleMongooseToObject, mongooseToObject } = require('../until/mongoose');
const { getUserIdFromToken } = require('../middleware/authMiddleware');


class PodcastController {
    async Esposides(req, res, next) {

            const podcastIDString = req.params.podcast_id;
            const podcastID = new ObjectId(podcastIDString);

            const podcast = mongooseToObject(await Podcast.findById(podcastID));
            const esposides = mutipleMongooseToObject(await Esposide.find({ podcast_id: podcastID }));
            esposides.forEach(esposide => {
                esposide.formattedDate = esposide.release_date.toDateString();
            });
            
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

        esposide.formattedDate = esposide.release_date.toDateString();

        const userIds = comments.map(comment => comment.userid);
        const users = await User.find({ _id: { $in: userIds } });
        const userMap = {};
        users.forEach(user => {
            userMap[user._id] = user;
        });
        comments.forEach(comment => {
            const user = userMap[comment.userid];
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
            if (user) {
                comment.username = user.username;
            }
        });
        
        
        res.render('Review', { podcast, comments });
        }

        async Comment(req, res){
           const { title, content } = req.body;
           const podcastIDString = req.params.podcast_id;
           const podcastID = new ObjectId(podcastIDString);
           const userIDString = await getUserIdFromToken(req.cookies.jwt);
           const userID = new ObjectId(userIDString);
           const user = await User.findById(userID);
           const username = user.username;

           const comment = new Comment({
                user_id: userID,
                podcast_id: podcastID,
                title: title,
                content: content,
                username: username
           });
            await comment.save();
            res.redirect('/');
        }
}
module.exports = new PodcastController();
