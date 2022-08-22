const { Router } = require("express");
const filteredResults = require('../middleware/filteredResults');
const Dessert = require("../models/dessert");


const router = Router();

const { getDesserts } = require("../controller/museum");

router.get('/', filteredResults(Dessert), getDesserts);


module.exports = router;