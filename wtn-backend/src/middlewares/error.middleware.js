/* eslint-disable no-unused-vars */
import logger from "../configs/logger.js";
import ApiError from "../utils/ApiError.js";

const errorHandler = (err, req, res, next) => {
  logger.error(err);

  let statusCode = 500;
  if (err instanceof ApiError) {
    statusCode = err.statusCode;
  }

  res.status(statusCode).json({
    status: "error",
    message: err.message,
  });
};

export default errorHandler;
