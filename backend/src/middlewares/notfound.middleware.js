import httpStatusCodes from "http-status-codes";

/**
 * Route not found middleware
 * @type {import("express").Handler}
 */
export default function routeNotFoundMiddleware(req, res) {
  return res.status(httpStatusCodes.NOT_FOUND).json({
    status: false,
    message: `${req.originalUrl} : ${req.method} is not available on server`,
  });
}
