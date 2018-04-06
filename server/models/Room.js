var mongoose = require('mongoose');
var RoomSchema = new mongoose.Schema({
  roomId: String,
  state: String
});
module.exports = mongoose.model('Room', RoomSchema);