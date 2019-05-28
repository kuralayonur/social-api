const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const FollowersSchema = new Schema({
    followed: String,
    follower: String
});

module.exports = mongoose.model('Followers', FollowersSchema);
