var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Room = require('../models/Room.js');

/* add room in /room */
router.post('/', function(req, res, next) {
    //console.log(req.body);
    Room.create(req.body, function (err, post) {
      if (err) return next(err);
      res.json(post);
    });
 });

/* get state from /room with roomId */
router.get('/:roomId', function(req, res, next) {
    Room.findOne({'roomId': req.params.roomId}, function (err, post) {
      //console.log(post);
      if (err) return next(err);
      res.json(post.state);
    });
  });

/* update room state in /room */
router.post('/:roomId', function(req, res, next) {
    console.log(req.params.roomId);
    console.log(req.body);
    Room.findOneAndUpdate({'roomId': req.params.roomId}, 
        { 
            'state': req.body.state 
        }, 
        function (err, post) {
            if (err) return next(err);
            res.json(post);
        }
    );
 });

    

 module.exports = router;