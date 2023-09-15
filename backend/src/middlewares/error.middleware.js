import { NODE_ENV } from "../config.js";
import httpStatusCodes from "http-status-codes";
/**
 * 
 * @type {import("express").ErrorRequestHandler}
 */
export function errorHandler(err, req, res, next) {
  if (res.headersSent) {
    return next(err);
  }
  let message = err.message || "internal server error";
  let code = err.code || httpStatusCodes.INTERNAL_SERVER_ERROR;
  if (err.name === "CastError") {
    message = "Entity not found";
    code = httpStatusCodes.NOT_FOUND;
  }
  if (err.name === "MongoServerError") {
    message = "Some error occured";
    code = httpStatusCodes.BAD_REQUEST;
  }
  if (err.name === "ValidationError") {
    code = httpStatusCodes.BAD_REQUEST;
    message = err.message;
  }
  if (err.name === "JWEInvalid") {
    code = httpStatusCodes.UNAUTHORIZED;
    message = "token invalid";
  }
  if (err.name === "JWTExpired") {
    code = httpStatusCodes.UNAUTHORIZED;
    message = "token invalid";
  }
  if (err.name === "JWEDecryptionFailed") {
    code = httpStatusCodes.UNAUTHORIZED;
    message = "token invalid";
  }
  if (err.name === "TypeError") {
    message = "type validation failed";
    code = httpStatusCodes.BAD_REQUEST;
  }
  return res.status(code).json({ status: false, message });
}

/**
 * 
 * @type {import("express").ErrorRequestHandler}
 */
export function logErrors(err, req, res, next) {
  if (NODE_ENV === "development") {
    console.error(err.stack);
  }
  next(err);
}
