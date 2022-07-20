import { query, RequestHandler } from 'express';
import asyncHandler from "express-async-handler"
const Dogs = require('../models/dog');

interface Pagination {
  total: number,
  totalPages: number,
  next?: {
    page: number,
    limit: number
  },
  prev?: {
    page: number,
    limit: number,
  }
}

export const getDogs = asyncHandler( async (req, res, next) => {

  let dogs: DTO.Dog[] = await Dogs.find();
  
  if (!req.query.select) {
    req.query.select = 'all';
  }
  console.log(req.query);
  
  if (req.query.select !== 'all') {
    const fields = (req.query.select as string).split(',').join(' ');
    dogs = await Dogs.find().select(fields);
  }

  if (!req.query.sort) {
    req.query.sort = '-createdAt';
  }

  if (req.query.sort) {
    const sortBy = (req.query.sort as string).split(',').join(' ');
    dogs = await Dogs.find().sort(sortBy);
  }

  if (!req.query.page) {
    req.query.page = '1';
  }

  if (!req.query.limit) {
    req.query.limit = '25';
  }

  // Pagination
  const page = +req.query.page;
  const limit = +req.query.limit;
  const startIndex = (page - 1) * limit;
  const endIndex = page * limit;
  const total = await Dogs.countDocuments();

  dogs = await Dogs.find().skip(startIndex).limit(limit);

  const pagination: Pagination = {
    total,
    totalPages: Math.ceil(total / limit)
  };

  if (endIndex < total) {
    pagination.next = { page: page + 1, limit }
  }

  if (startIndex > 0) {
    pagination.prev = { page: page - 1, limit }
  }

  res.status(200).json({ success: true, data: { count: dogs.length, pagination, dogs } });

});
