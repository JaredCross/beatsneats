var mongoose = require('mongoose');

var destinationSchema = new mongoose.Schema({
  name: String,
  toDos: Array,
  userId: String,
})

var Destination = mongoose.model('Destination', destinationSchema)

module.exports = Destination;
