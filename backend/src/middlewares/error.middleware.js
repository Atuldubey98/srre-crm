import { NODE_ENV } from "../config.js";

export function errorHandler(err, req, res, next) {
  if (res.headersSent) {
    return next(err);
  }
  let message = err.message || "internal server error";
  let code = err.code || 500;
  if (err.name === "CastError") {
    message = "Entity not found";
  }
  if (err.name === "MongoServerError") {
    message = "Some error occured";
    code = 400;
  }
  if (err.name === "ValidationError") {
    code = 400;
    message = err.message;
  }
  if (err.name === "JWEInvalid") {
    code = 401;
    message = "token invalid";
  }
  if (err.name === "JWTExpired") {
    code = 401;
    message = "token invalid";
  }
  if (err.name === "JWEDecryptionFailed") {
    code = 401;
    message = "token invalid";
  }
  if (err.name === "TypeError") {
    message = "type validation failed";
    code = 400;
  }
  return res.status(code).json({ status: false, message });
}
export function logErrors(err, req, res, next) {
  if (NODE_ENV === "development") {
    console.error(err.stack);
  }
  next(err);
}
