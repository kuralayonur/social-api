const express = require('express');
const router = express.Router();
const Comment = require('../models/Comments');
const Post = require('../models/Posts');

router.get('/count/:post_id', (req, res, next) => {
    Comment.count({post_id:req.params.post_id}, (err, count) => {
        if (err) throw err;
        else res.json({count:count});
    });
});
// get comment and post by user
router.get('/getbyuser/:user_name', (req, res , next) => {
    let results = [];
    Comment.find({user_name:req.params.user_name}, (err, comments) => {
        if (err) throw err;
        else {
            comments.forEach((element,index) => {
                console.log(element.post_id);
                Post.findById(element.post_id, (err, post) => {
                    if (err) throw err;
                    else {
                        results[index] = {post_id:post._id,author:post.user_name,title:post.title,comment:element.comment};
                    }
                });                         
            });
            setTimeout(() => {
                res.json(results); 
            }, 500);          
        }
    })
});
// get all comments
router.get('/', (req, res, next) => {
    Comment.find((err, result) => {
        if (err) {
            res.json({ status: false });
        } else res.json(result);
    });
});
// get one post comments
router.get('/:post_id', (req, res, next) => {
    Comment.find({ post_id: req.params.post_id }, (err, result) => {
        if (err) {
            res.json({ status: false });
        } else res.json(result);
    });
});
// get user comments
router.get('/user/:user_name', (req, res, next) => {
    Comment.find({ user_name: req.params.user_name }, (err, result) => {
        if (err) {
            res.json({ status: false });
        } else res.json(result);
    });
});

// comment without parent comment
router.post('/:post_id/:user_name/:comment', (req, res, next) => {
    const commet = new Comment({ post_id: req.params.post_id, user_name: req.params.user_name, comment: req.params.comment });
    const promise = commet.save();
    promise.then((result) => {
        res.json(result);
    }).catch((err) => {
        res.json(err);
    });
});

// comment with parent comment
router.post('/:post_id/:user_name/:comment/:parent_id', (req, res, next) => {
    const comment = new Comment({ post_id: req.params.post_id, user_name: req.params.user_name, comment: req.params.comment });
    const promise = comment.save();

    promise.then((result) => {
        Comment.findByIdAndUpdate({ _id: result._id }, { $push: { parent_id: req.params.parent_id } }, (err, result) => {
            if (err) {
                throw err;
            } else res.json(result);
        });
    }).catch((err) => {
        res.json(err);
    });
});


module.exports = router;