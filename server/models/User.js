var mongoose = require('mongoose');
var UserSchema = new mongoose.Schema({
  name: String,
  roomId: String
});
module.exports = mongoose.model('User', UserSchema);