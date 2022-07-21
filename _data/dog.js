const { faker } = require('@faker-js/faker');
const axios = require('axios');
const { subtractYears } = require('../utils/date')

const getDogPicture = async (breed, type) => {
  if (typeof type !== 'undefined') {
    const { data } = await axios.get(`https://dog.ceo/api/breed/${breed}/${type}/images/random`)
    const message = data.message;
    return message;
  }
  
  const { data } = await axios(`https://dog.ceo/api/breed/${breed}/images/random`);
  const message = data.message;
  return message;
}

const specifyBreedTypes = async (breed, element) => {
  const breedTypes = []
  for (const type of element) {
    breedTypes.push({
      breed: `${type} ${breed}`,
      photoUrl: await getDogPicture(breed)
    });
  }
  return breedTypes;
}

const listDogBreeds = async (data) => {
  const listSpecificDogBreeds = [];
  for (const breed in data) {
      const element = data[breed];
      if (element.length === 0) {
        listSpecificDogBreeds.push({
          breed,
          photoUrl: await getDogPicture(breed)
        });
      } else {
        listSpecificDogBreeds.push(...await specifyBreedTypes(breed, element))
      }
  }
  return listSpecificDogBreeds;
  
}

const getDogBreeds = async () => {
  const { data } = await axios.get('https://dog.ceo/api/breeds/list/all');
  
  return await listDogBreeds(data.message);
}

export const createDogPool = async () => {
  const dogPool = []
  const dogProfiles = await getDogBreeds();

for (let index = 0; index < dogProfiles.length; index++) {
  const name = faker.name.firstName();
  const age = faker.datatype.number({ min: 1, max: 15});
  const birthday = subtractYears(age, new Date());
  const breed = dogProfiles[index].breed;
  const photoUrl = dogProfiles[index].photoUrl;

  dogPool.push({
    name,
    age,
    birthday,
    breed,
    photoUrl
  })
};

  return dogPool;
};