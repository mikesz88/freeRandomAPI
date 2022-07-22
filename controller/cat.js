const express = require('express');
const Cat = require('../models/cat');
const asyncHandler = require('../middleware/async');

// @desc Get all dogs
// @route GET /api/v1/dogs
// @access PUBLIC
exports.getCats = asyncHandler( async (req, res, next) => {
  res.status(200).json(res.filteredResults);
});

