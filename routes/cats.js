const { Router } = require("express");
const filteredResults = require('../middleware/filteredResults');
const Cat = require('../models/cat');



const router = Router();

const { getCats } = require("../controller/cat");

router.get('/', filteredResults(Cat), getCats);


module.exports = router;