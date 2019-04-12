const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const UsersSchema = new Schema({
    name:{
        type: String,
    
        unique:true
    },
    password:{
        type: String
    },
        
    mail:{
        type: String,
        unique:true
    },
    etherwallet:{
        type : String,
        unique:true
    },
    timestamp:{
        type : Date,
        default :Date.now
    }
});

module.exports = mongoose.model('Users', UsersSchema);