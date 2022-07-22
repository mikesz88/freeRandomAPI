const { faker } = require('@faker-js/faker');
const axios = require('axios');
const subtractYears = require('../utils/date');

const getCatImage = async (catId) => {
  const { data: catImage } = await axios.get(`https://api.thecatapi.com/v1/images/search?breed_ids=${catId}&api_key=${process.env.CAT_API_KEY}`);

  return catImage[0].url;
}

const getCatBreeds = async () => {
  const { data } = await axios.get(`https://api.thecatapi.com/v1/breeds?limit=67&page=0api_key=${process.env.CAT_API_KEY}`);
  return data.map(profile => {
    return {
      id: profile.id,
      breed: profile.name
    }
  })
}

// getCatBreeds();
const createCatPool = async () =>  {
  const catPool = [];
  const catProfiles = await getCatBreeds();

  for (let index = 0; index < 1000; index++) {
    const typeOfCat = faker.helpers.arrayElement(catProfiles);
    const name = faker.name.firstName();
    const age = faker.datatype.number({ min: 1, max: 20});
    const birthday = subtractYears(age);  
    const breed = typeOfCat.breed;
    let currentPhoto = await getCatImage(typeOfCat.id);
    const photoUrl = !(catPool.find(profile => profile.photoUrl === currentPhoto))
    ? currentPhoto
    : await getCatImage(typeOfCat.id);
  
    catPool.push({
      name,
      age,
      birthday,
      breed,
      photoUrl
    })
    console.log(index);
  }

  return catPool;
};

module.exports = createCatPool;
