const express = require('express');
const router = express.Router();
const Post = require('../models/Posts');

router.get('/:id',  (req, res, next) => {
    Post.findById(req.params.id, (err,post)=>{
      if(err)
        res.json({status: false});
      if(!post){
        res.json({status: false});
      }else{
       // res.json({status: true,user_name:post.user_name,ipfs_hash:post.ipfs_hash,title:post.title,vote:post.vote,time:post.time_stamp,image_ipfs:post.image_ipfs});
        res.json(post);
      }
    });
});

module.exports = router;