var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Movie = require('../models/Movie.js');

/* update votes in /movies */
router.post('/', function(req, res, next) {
    Movie.findOneAndUpdate({'imdbId': req.body.imdbId, 'roomId': req.body.roomId}, 
        { 
            $inc: { votes: 1 } 
        }, 
        function (err, post) {
            if (err) return next(err);
            res.json(post);
        }
    );
 });

 /*router.get('/:id', function(req, res, next) {
    Movie.aggregate([
        {$match: {
            "roomId": req.params.id
        }},
        {
            $group: {
                _id: "$imdbId", count: {$sum:1}
            }
        }
    ], function (err, post) {
        if (err) return next(err);
        res.json(post);
      });
});*/
    
    

 module.exports = router;