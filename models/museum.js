const mongoose = require('mongoose');

const MuseumSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'What is the name of the museum?'],
  },
  location: {
    type: String,
    required: [true, 'What is the address of the museum?'],
  },
  coordinates: {
    type: String,
    required: [true, "What are the coordinates of the museum?"]
  },
  type: {
    type: String,
    required: [true, 'What type of museum is it?']
  },
  category: {
    type: String,
    required: [true, 'What category of museum is it?']
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
    required: [true, 'Who is the author of the picture?']
  },
  website: {
    type: String,
    required: [true, 'What is the website of the museum?'],
    unique: true,
    match: [
      /[(http(s)?):\/\/(www\.)?a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/ig,
      'Please enter a valid url'
    ],
  },
  createdAt: {
    type: Date,
    default: Date.now()
  }
});

module.exports = mongoose.model('Museum', MuseumSchema);

