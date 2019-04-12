const mongoose = require('mongoose');

module.exports = () =>{
    mongoose.connect('mongodb+srv://onur:onur123@social-djuaz.mongodb.net/Social?retryWrites=true',{ useNewUrlParser: true });
    mongoose.connection.on('open',()=>{
        console.log('connected');
    });

    mongoose.connection.on('error',(err)=>{
        console.log('error: ', err);
    });
    mongoose.Promise = global.Promise;
};