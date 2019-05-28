const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const CommentsSchema = new Schema({
    post_id : String,
    user_name : String,
    comment: String,
    vote:{
        type:Number,
        default:0
    },
    parent_id: [String]
});

module.exports = mongoose.model('Comments', CommentsSchema);
