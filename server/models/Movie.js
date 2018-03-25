var mongoose = require('mongoose');
var MovieSchema = new mongoose.Schema({
  title: String,
  imdbId: String,
  user: String,
  roomId: String
});
module.exports = mongoose.model('Movie', MovieSchema);