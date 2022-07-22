const mongoose = require('mongoose');

const CatSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'What is the cats name?'],
  },
  age: {
    type: Number,
    required: [true, 'What is the cats age?'],
  },
  birthday: {
    type: Date,
    required: [true, "What is the cat's birthday?"]
  },
  breed: {
    type: String,
    required: [true, 'What type of breed is the cat?']
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
  createdAt: {
    type: Date,
    default: Date.now()
  }
});

module.exports = mongoose.model('Cat', CatSchema);

