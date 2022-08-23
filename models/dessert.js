const mongoose = require('mongoose');

const DessertSchema = new mongoose.Schema({
  name: {
    type: String,
    unique: true,
    required: [true, 'What is the name of the museum?'],
  },
  category: {
    type: String,
    enum: ['Cookie', 'Donut', 'Ice_Cream'],
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
    default: "This is public domain image",
  },
  createdAt: {
    type: Date,
    default: Date.now()
  }
});

module.exports = mongoose.model('Dessert', DessertSchema);

