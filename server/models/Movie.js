var mongoose = require('mongoose');
var MovieSchema = new mongoose.Schema({
  title: String,
  imdbId: String,
  user: String,
  roomId: String,
  votes: Number
});
module.exports = mongoose.model('Movie', MovieSchema);