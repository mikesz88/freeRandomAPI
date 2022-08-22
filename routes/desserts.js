const { Router } = require("express");
const filteredResults = require('../middleware/filteredResults');
const Dessert = require('../models/dessert');


const router = Router();

const { getDesserts, getDessertType } = require("../controller/dessert");

router.get('/', filteredResults(Dessert), getDesserts);
router.get('/:category', filteredResults(Dessert), getDessertType);


module.exports = router;