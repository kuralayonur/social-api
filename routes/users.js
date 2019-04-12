const express = require('express');
const router = express.Router();
const Users = require('../models/Users');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')

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
            username: req.params.user_name
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

router.put('/:user_name', (req, res, next) => {
  const promise = Users.findByIdAndUpdate(req.params.user_name, req.body, { new: true });
  promise.then((user) => {
    if (!user) {
      next({ message: 'The user not found!', status: false });
    }
    res.json({ status: true });
  }).catch((err) => {
    res.json(err);
  });
});



module.exports = router;
