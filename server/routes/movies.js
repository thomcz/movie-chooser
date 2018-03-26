var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Movie = require('../models/Movie.js');
/* GET /movies listing. */
router.get('/', function(req, res, next) {
    Movie.find(function (err, movies) {
    if (err) return next(err);
    res.json(movies);
  });
});

/* GET /movies/roomid */
router.get('/:id', function(req, res, next) {
    Movie.find({'roomId': req.params.id}, function (err, post) {
      if (err) return next(err);
      res.json(post);
    });
});

/* POST /movies */
router.post('/', function(req, res, next) {
    Movie.create(req.body, function (err, post) {
      if (err) return next(err);
      res.json(post);
    });
 });

/* DELETE /movies/imdbId/username/roomid */
router.delete('/:imdbId/:user/:room', function(req, res, next) {
  Movie.remove({'imdbId': req.params.imdbId, 'user': req.params.user, 'roomId': req.params.room}, function (err, post) {
    if (err) return next(err);
    res.json(post);
  });
});
module.exports = router;