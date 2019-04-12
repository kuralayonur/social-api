const express = require('express');
const router = express.Router();
const Post = require('../models/Posts');



router.get('/',  (req, res, next) => {
  Post.find((err,post)=>{
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



router.post('/:user_name/:ipfs_hash/:image_ipfs/:title', function (req, res, next) {
    const posts = new Post({user_name:req.params.user_name,ipfs_hash:req.params.ipfs_hash,image_ipfs:req.params.image_ipfs,title:req.params.title});
    const promise = posts.save();
    promise.then((data) => {
      res.json({ status:true });
    }).catch((err) => {
      res.json({ status:false });
    });

  });

module.exports = router;
