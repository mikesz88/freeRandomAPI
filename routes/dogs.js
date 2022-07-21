const { Router } = require("express");
const filteredResults = require('../middleware/filteredResults');
const Dog = require('../models/dog');



const router = Router();

const { getDogs } = require("../controller/dog");

router.get('/', filteredResults(Dog), getDogs);


module.exports = router;