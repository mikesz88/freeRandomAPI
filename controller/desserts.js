const express = require('express');
const Dessert = require('../models/Dessert');
const asyncHandler = require('../middleware/async');

// @desc Get all desserts
// @route GET /api/v1/desserts
// @access PUBLIC
exports.getDesserts = asyncHandler( async (req, res, next) => {
  res.status(200).json(res.filteredResults);
});