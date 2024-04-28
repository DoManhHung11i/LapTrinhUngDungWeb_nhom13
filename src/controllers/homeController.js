const Podcast = require('../models/podcast');
const { mutipleMongooseToObject, mongooseToObject } = require('../until/mongoose');

class HomeController{
    get(req, res) {
            
        Podcast.find({})
        .then(podcasts => {
            console.log(podcasts);
            // Xử lý dữ liệu ở đây
        })
        .catch(err => console.error('Error:', err));
    }
}
module.exports = new HomeController();