const Podcast = require('../models/podcasts');
const Esposide = require('../models/esposides');
const Comment = require('../models/comments');
const User = require('../models/users');
const Favorite = require('../models/favorites');
const MyPodcast = require('../models/myPodcasts');
const RecentlyPodcast = require('../models/recentlyPodcasts');
const { ObjectId } = require('mongodb');
const { mutipleMongooseToObject, mongooseToObject } = require('../until/mongoose');
const { getUserIdFromToken, requireAuth } = require('../middleware/authMiddleware');



class PodcastController {
    async Esposides(req, res, next) {
            const user = res.locals.user;
            const podcastIDString = req.params.podcast_id;
            const podcastID = new ObjectId(podcastIDString);

            const podcast = mongooseToObject(await Podcast.findById(podcastID));
            const esposides = mutipleMongooseToObject(await Esposide.find({ podcast_id: podcastID }));
            esposides.forEach(esposide => {
                esposide.formattedDate = esposide.release_date.toDateString();
            });
            
            res.render('esposide', { podcast, esposides, user });
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
        
        res.render('detail_esposide', { podcast, esposide, lastFourComments, nobar: true });
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
        
        async About(req, res){
            const podcastIDString = req.params.podcast_id;
            const podcastID = new ObjectId(podcastIDString);

            const podcast = mongooseToObject(await Podcast.findById(podcastID));
            res.render('about', {podcast}   );
        }
        Calendar(req, res){
            res.render('calendar');
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
            const dynamicURL = `/podcast/${podcastIDString}/reviews`;
            res.redirect(dynamicURL);
        }

        async checkQueueOrMyPodcast(req, res) {
            try {
                const { esposideId, userId, action } = req.body;
                const esposideIdString = esposideId.toString();
                const userIdString = userId.toString();
                const esposideID = new ObjectId(esposideIdString);
                const userID = new ObjectId(userIdString);
                let favorite, myPodcast;
                if(action === 'addToQueue'){
                    favorite = await Favorite.findOne({ esposideID, userID });                   
                }
                else if(action === 'addToMyPodcast'){
                    myPodcast = await MyPodcast.findOne({ esposideID, userID });
                }
                if (favorite || myPodcast) {
                    res.json({ found: true, action: action });
                } else {
                    res.json({ found: false, action: action });
                }               
            } catch (error) {
                console.error(error);
                res.status(500).json({ error: "err" });
            }
        }
        

        async AddToQueueOrMyPodcast(req, res){
            try {
                const { esposideId, userId, action } = req.body;
                const esposideIdString = esposideId.toString();
                const userIdString = userId.toString();
                const esposideID = new ObjectId(esposideIdString);
                const userID = new ObjectId(userIdString);

                if(action === 'addToQueue'){
                    const favorite = new Favorite({
                        userID: userID,
                        esposideID: esposideID
                    });                   
                    await favorite.save();
                    res.status(200).json({ saved: true, message: 'Esposide added to queue' });
                }
                else if(action === 'addToMyPodcast'){
                    const myPodcast = new MyPodcast({
                        userID: userID,
                        esposideID: esposideID
                    });                   
                    await myPodcast.save();
                    res.status(200).json({ saved: true, message: 'Esposide added to My Podcast' });
                }
            } catch (error) {
                console.error(error);
                res.status(500).json({ saved: false, error: 'Internal Server Error' });
            }
        }
        async RemoveFromQueueOrMyPodcast(req, res){
            const { esposideId, userId, action } = req.body;
            const esposideIdString = esposideId.toString();
            const userIdString = userId.toString();
            const esposideID = new ObjectId(esposideIdString);
            const userID = new ObjectId(userIdString);
            if(action === 'addToQueue'){
                const result = await Favorite.deleteOne({ esposideID: esposideID, userID: userID });
                if (result.deletedCount > 0) {
                    res.status(200).json({ deleted: true, message: 'Esposide removed from queue' });
                } else {
                    res.status(404).json({ deleted: false, message: 'Esposide not found in queue' });
                }
            }
            else if (action === 'addToMyPodcast'){
                const result = await MyPodcast.deleteOne({ esposideID: esposideID, userID: userID });
                if (result.deletedCount > 0) {
                    res.status(200).json({ deleted: true, message: 'Esposide removed from MyPodcast' });
                } else {
                    res.status(404).json({ deleted: false, message: 'Esposide not found in MyPodcast' });
                }
            }
            
        }
        
        async AddToRecently(req, res){
            const { esposideId, userId } = req.body;
            const esposideIdString = esposideId.toString();
            const userIdString = userId.toString();
            const esposideID = new ObjectId(esposideIdString);
            const userID = new ObjectId(userIdString);
            const esposide = await  RecentlyPodcast.findOne({ userID: userID, esposideID: esposideID });
            if(!esposide){
                const recentlyPodcast = new RecentlyPodcast({
                    userID: userID,
                    esposideID: esposideID
                });                   
                await recentlyPodcast.save();
                res.status(200).json({ saved: true });
            }
            else{
               const esposideUpdate = esposide;
               const update = { $set: { add_at: Date.now() }};
               await RecentlyPodcast.updateOne( esposideUpdate, update);
               res.status(200).json({ updated: true });
            }
        }
}
module.exports = new PodcastController();
