import { RequestHandler } from 'express';
const Dogs = require('../models/dog');

export const getDogs: RequestHandler = async (req, res, next) => {
  const dogs = await Dogs.find();
  res.status(200).json({ success: true, data: { count: dogs.length, dogs } });
}