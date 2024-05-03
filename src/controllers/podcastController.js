const Podcast = require('../models/podcasts');
const Esposide = require('../models/esposides');
const Comment = require('../models/comments');
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
        res.render('detail_esposide', { podcast, esposide });
    }
    async Review(req, res){
        const podcastIDString = req.params.podcast_id;
        const podcastID = new ObjectId(podcastIDString); 

        const podcast = mongooseToObject(await Podcast.findById(podcastID));
        const comments = mutipleMongooseToObject(await Comment.find({ podcast_id: podcastID}));
        res.render('Review', { podcast, comments });
    }
}
module.exports = new PodcastController();
