var mongoose = require('mongoose');
mongoose.connect("mongodb://" + process.env.BEATSEATS_MONGOLAB_URI);

module.exports.Users = require('./users.js');
