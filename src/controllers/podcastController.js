const Podcast = require('../models/podcasts');
const Esposide = require('../models/esposides');
const { ObjectId } = require('mongodb');
const { mutipleMongooseToObject, mongooseToObject } = require('../until/mongoose');


class PodcastController {
    async getPodcastPlaylist(req, res, next) {

            const podcastIDString = req.params.podcast_id;
            const podcastID = new ObjectId(podcastIDString);
            
                    
            Esposide.find({ podcast_id: podcastID })
                    .then(esposides => {
                        esposides = esposides.map(esposide => esposide.toObject())
                        res.render('esposide', { esposides });
                    })
                    .catch(error => {
                        console.error('Error fetching episodes:', error);
                        res.status(500).send('Internal Server Error');
                    });

            
    }
}
module.exports = new PodcastController();
