const express = require('express');
const router = express.Router();
const Users = require('../models/Users');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Followers = require('../models/Followers');
const Posts = require('../models/Posts');


router.get('/:user_name', (req, res, next) => {
  Users.findOne({ name: req.params.user_name }, (err, user) => {
    if (err)
      throw err;
    if (!user) {
      res.json({
        status: false
      });
    } else {
      Followers.count({ follower: req.params.user_name }, (err, followerCount) => {
        if (err) throw err;
        else {
          Followers.count({ followed: req.params.user_name }, (err, followedCount) => {
            if (err) throw err;
            else {
              Posts.count({ user_name: req.params.user_name }, (err, postCount) => {
                if (err) throw err;
                else {
                  res.json({reputation: user.reputation,
                    description: user.description,
                    followerCount: followerCount,
                    followedCount:followedCount,
                    postCount:postCount,
                    etherwallet: user.etherwallet
                  });
                }
              })
            }
          });
        }

      });
    }
  });
});

router.get('/:user_name/:password', (req, res) => {
  Users.findOne({ name: req.params.user_name }, (err, user) => {
    if (err)
      throw err;
    if (!user) {
      res.json({
        status: false,
        message: 'Login failed, user not found!'
      });
    } else {
      bcrypt.compare(req.params.password, user.password).then(async (result) => {
        if (!result) {
          res.json({
            status: false,
            message: 'Incorrect password.',
          });
        } else {
          const payload = {
            user: req.params.user_name,
            reputation: user.reputation
          };
          const token = await jwt.sign(payload, req.app.get('important'), {
            expiresIn: 7200
          });
          res.json({
            status: true,
            token: token
          });
        }
      });
    }
  });
});

router.get('/reg/:name/:email', (req, res, next) => {
  Users.findOne({name: req.params.name,email:req.params.email}, (err,user) => {
    if(err) throw err;
    if(!user) res.json({status:true});
    else res.json({status:false});
  });
});

router.post('/:name/:password/:email/:etherwallet', (req, res, next) => {
  bcrypt.hash(req.params.password, 10, (err, hash) => {
    const users = new Users({ name: req.params.name, password: hash, mail: req.params.email, etherwallet: req.params.etherwallet });
    const promise = users.save();
    promise.then((data) => {
      res.json({ status: true });
    }).catch((err) => {
      res.json({ status: false, error: err });
    });
  });
});




module.exports = router;
