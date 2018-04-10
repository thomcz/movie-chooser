var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var User = require('../models/User.js');

/* add user in /user */
router.post('/', function(req, res, next) {
    User.create(req.body, function (err, post) {
      if (err) return next(err);
      res.json(post);
    });
});

/* GET /users/roomid */
router.get('/:roomId', function(req, res, next) {
    User.find({'roomId': req.params.roomId}, function (err, post) {
      if (err) return next(err);
      res.json(post);
    });
  });

 module.exports = router;