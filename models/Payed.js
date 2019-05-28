const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const PayedSchema = new Schema({
    user_name: String,
    ipfs_hash: String,
    title: String,
    vote :Number,
    time_stamp:{
        type:Date,
        default:Date.now
    },
    image_ipfs:String,
    money: Number,
    
});

module.exports = mongoose.model('Payed', PayedSchema);