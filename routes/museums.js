const { Router } = require("express");
const filteredResults = require('../middleware/filteredResults');
const Museum = require("../models/museum");


const router = Router();

const { getMuseums } = require("../controller/museum");

router.get('/', filteredResults(Museum), getMuseums);


module.exports = router;