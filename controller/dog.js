const express = require('express');
const Dogs = require('../models/dog');
const asyncHandler = require('../middleware/async');

// @desc Get all dogs
// @route GET /api/v1/dogs
// @access PUBLIC
exports.getDogs = asyncHandler( async (req, res, next) => {
  res.status(200).json(res.filteredResults);
});

