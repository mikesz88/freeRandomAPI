const mongoose = require("mongoose");
const dotenv = require('dotenv');
const fs = require('fs');
const createDogPool = require('./_data/dog');
const createCatPool = require('./_data/cat');

dotenv.config({ path: 'config/config.env' });

const Dog = require("./models/dog");
const Cat = require("./models/cat");
const Museum = require('./models/museum');

mongoose.connect(process.env.MONGO_URI);

// Read JSON
const museums = JSON.parse(fs.readFileSync(`${__dirname}/_data/museums.json`, 'utf-8'));

const importData = async () => {
  try {
    const dogs = await createDogPool();
    await Dog.create(dogs);
    const cats = await createCatPool();
    await Cat.create(cats)
    await Museum.create(museums);
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
    await Museum.deleteMany();
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