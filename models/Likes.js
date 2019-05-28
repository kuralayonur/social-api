const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const LikesSchema = new Schema({
    post_id: String,
    user_name: String,
    liketype: {
        type:Boolean,
        default:false
    }
});

module.exports = mongoose.model('Likes', LikesSchema);
