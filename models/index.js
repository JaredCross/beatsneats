var mongoose = require('mongoose');
mongoose.connect("mongodb://" + process.env.MONGOLAB_URI);

module.exports.Destinations = require('./destinations.js');
module.exports.Users = require('./users.js');
