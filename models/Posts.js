const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const PostsSchema = new Schema({
    user_name: String,
    ipfs_hash: String,
    title: String,
    vote : {
        type:Number,
        default:0
    },
    time_stamp:{
        type:Date,
        default:Date.now
    },
    image_ipfs:String,
    money: {
        type: Number,
        default: 0
    }
});

module.exports = mongoose.model('Posts', PostsSchema);