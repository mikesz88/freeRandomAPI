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

// @desc Get all cookies
// @route GET /api/v1/desserts/:category
// @access PUBLIC
exports.getDessertType = asyncHandler( async (req, res, next) => {
  const dessertCategory = req.params.category;
  let dessertType = Dessert.find({ category:  dessertCategory });


  // Pagination
  const page = +req.query.page || 1;
  const limit = +req.query.limit || 25;
  const startIndex = (page - 1) * limit;
  const endIndex = page * limit;
  const total = await Dessert.find({ category:  dessertCategory }).countDocuments();

  dessertType = dessertType.skip(startIndex).limit(limit);

  const pagination = {
    total,
    totalPages: Math.ceil(total / limit)
  };

  if (endIndex < total) {
    pagination.next = { page: page + 1, limit }
  }

  if (startIndex > 0) {
    pagination.prev = { page: page - 1, limit }
  }

  const results = await dessertType;

  if (!results.length) {
    return next(new ErrorResponse(`Category not found with name of ${dessertCategory}`))
  }

  res.filteredResults = {
    success: true,
    count: results.length,
    pagination,
    data: results
  }

  res.status(200).json(res.filteredResults);
});