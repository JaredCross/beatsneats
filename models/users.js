var mongoose = require('mongoose')

var userSchema = new mongoose.Schema({
  email: String,
  password: String,
  favoriteMusic: Array,
  favoriteFood: Array
})

var User = mongoose.model('User', userSchema);

module.exports = User;
