const express = require('express');
const router = express.Router();
const Followers = require('../models/Followers');


router.get('/followed/:followers', (req, res, next) => {
    Followers.find({followed:req.params.followers}, (err,followers) => {
        if(err) throw err;
        else res.json(followers);
    });
});

router.get('/follower/:followers', (req, res, next) => {
    Followers.find({follower:req.params.followers}, (err,followers) => {
        if(err) throw err;
        else res.json(followers);
    });
});

router.post('/:followed/:follower', (req, res, next) => {
    const follower = new Followers({followed: req.params.followed, follower: req.params.follower});
    const promise = follower.save();
    promise.then((result) => {
        res.json(result);
    }).catch((err) => {
        res.json(err);
    });
});



module.exports = router;
