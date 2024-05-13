const mongoose = require('mongoose');


async function connect() {
    try {
        await mongoose.connect('mongodb+srv://oezil1179:PVN8zZoHtJxmnuTp@project-podcast.fzgpl7x.mongodb.net/project-podcast');
        console.log('Connect successfully');
    } catch (error) {
        console.log('failure');
    }
}

module.exports = { connect };




