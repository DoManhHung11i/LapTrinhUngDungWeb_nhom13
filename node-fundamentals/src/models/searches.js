const { ObjectId } = require('mongodb');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const db = require('mongodb');
2  
const SearchSchema = new Schema({

    esposideID: { type: Schema.Types.ObjectId, ref: 'Esposide' }, // Tham chiếu tới model Esposide
    add_at: { type: Date, default: Date.now }
});
SearchSchema.index({ esposideID: 1 }, { unique: true });
module.exports = mongoose.model('Searches', SearchSchema);
