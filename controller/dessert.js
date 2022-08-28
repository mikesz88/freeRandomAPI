const express = require('express');
const Dessert = require('../models/dessert');
const ErrorResponse = require('../utils/errorResponse');
const asyncHandler = require('../middleware/async');

// @desc Get all desserts
// @route GET /api/v1/desserts
// @access PUBLIC
exports.getDesserts = asyncHandler( async (req, res, next) => {
  res.status(200).json(res.filteredResults);
});