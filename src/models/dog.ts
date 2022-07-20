const mongoose = require('mongoose');

const DogSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'What is the dogs name?']
  },
  age: {
    type: Number,
    required: [true, 'What is the dogs age?']
  },
  birthday: Date,
  photoUrl: {
    type: String,
    required: [true, 'Where is the photo link?'],
    match: [
      /[(http(s)?):\/\/(www\.)?a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/ig,
      'Please enter a valid url'
    ]
  }
});

module.exports = mongoose.model('Dog', DogSchema);

/* 
const testDogs: any[] = [{
  name: 'Lucy',
  age: 4,
  birthday: '4/4/2022',
  photoUrl: 'https://images.dog.ceo/breeds/terrier-wheaten/n02098105_2474.jpg'
}];
 */