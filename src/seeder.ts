import mongoose from "mongoose";
const dotenv = require('dotenv');
const { createDogPool } = require('./_data/dog');

dotenv.config({ path: '../src/config/config.env' });

const Dog = require("./models/dog");

mongoose.connect(process.env.MONGO_URI as string);


const importData = async () => {
  try {
    const dogs = await createDogPool();
    await Dog.create(dogs);
    console.log('data imported');
    process.exit();
  } catch (error) {
    console.error(error)
  }
}

const deleteData = async () => {
  try {
    await Dog.deleteMany();
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