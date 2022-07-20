import { ErrorRequestHandler } from "express";

const CustomError = require('../utils/errorResponse');

const handleError: ErrorRequestHandler = (err: TypeError | CustomError, req, res, next) => {
  let customError = err;

  if (!(err instanceof CustomError)) {
    customError = new CustomError(
      'Oh no, this is embarrassing. We are having troubles my friend'
    );
  }

  res.status((customError as CustomError).status).send(customError);
};

export default CustomError;