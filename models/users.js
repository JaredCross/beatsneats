var mongoose = require('mongoose')

var userSchema = new mongoose.Schema({
  fullName: String,
  email: String,
  password: String,
  destinations: Array,
})

var User = mongoose.model('User', userSchema);

module.exports = User;
