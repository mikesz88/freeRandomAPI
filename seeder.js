const mongoose = require("mongoose");
const dotenv = require('dotenv');
const createDogPool = require('./_data/dog');
const createCatPool = require('./_data/cat');

dotenv.config({ path: 'config/config.env' });

const Dog = require("./models/dog");
const Cat = require("./models/cat");

mongoose.connect(process.env.MONGO_URI);


const importData = async () => {
  try {
    const dogs = await createDogPool();
    await Dog.create(dogs);
    const cats = await createCatPool();
    await Cat.create(cats)
    console.log('data imported');
    process.exit();
  } catch (error) {
    console.error(error)
  }
}

const deleteData = async () => {
  try {
    await Dog.deleteMany();
    await Cat.deleteMany();
    console.log('data deleted');
    process.exit();
  } catch (error) {
    console.error(error)
  }
}

if (process.argv[2] === '-i') {
  importData();
} else if (process.argv[2] === '-d') {
  deleteData();
}