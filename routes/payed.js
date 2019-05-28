const express = require('express');
const router = express.Router();
const Payed = require('../models/Payed');



router.post('/:user_name/:ipfs_hash/:image_ipfs/:title', function (req, res, next) {
    const payed = new Payed({user_name:req.params.user_name,ipfs_hash:req.params.ipfs_hash,image_ipfs:req.params.image_ipfs,title:req.params.title});
    const promise = payed.save();
    promise.then((data) => {
      res.json({ status:true });
    }).catch((err) => {
      res.json({ status:false });
    });
});

module.exports = router;