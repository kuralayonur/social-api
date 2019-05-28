const express = require('express');
const router = express.Router();
const Likes = require('../models/Likes');


router.get('/:post_id/:user_name', (req, res, next) => {
    Likes.findOne({ post_id: req.params.post_id, user_name: req.params.user_name }, (err, like) => {
        if (err) throw err;
        else {
            if (like != null) {
                res.json({ status: true });
            } else res.json({ status: false });
        }
    });
});

router.post('/post/:post_id/:user_name/:like', (req, res, next) => {
    const like = new Likes({post_id:req.params.post_id, user_name:req.params.user_name, liketype: req.params.like});
    const promise = like.save();
    promise.then((result) => {
        res.json({status:true});
    }).catch((err) => {
        res.json({status:false});
    });
});

module.exports = router;