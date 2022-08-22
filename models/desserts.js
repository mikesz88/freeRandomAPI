const mongoose = require('mongoose');

const DessertSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'What is the name of the museum?'],
  },
  category: {
    type: String,
    enum: ['Cookie', 'Donuts', 'Ice Cream'],
    required: [true, 'What type of dessert is it?']
  },
  photoUrl: {
    type: String,
    required: [true, 'Where is the photo link?'],
    unique: true,
    match: [
      /[(http(s)?):\/\/(www\.)?a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/ig,
      'Please enter a valid url'
    ],
  },
  photoAttribute: {
    type: String,
    default: "This ia public domain image",
    required: [true, 'Who is the author of the picture?']
  },
  createdAt: {
    type: Date,
    default: Date.now()
  }
});

module.exports = mongoose.model('Dessert', DessertSchema);

