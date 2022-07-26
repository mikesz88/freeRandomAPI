const express = require('express');
const Museum = require('../models/museum');
const asyncHandler = require('../middleware/async');

// @desc Get all museums
// @route GET /api/v1/museums
// @access PUBLIC
exports.getMuseums = asyncHandler( async (req, res, next) => {
  res.status(200).json(res.filteredResults);
});

