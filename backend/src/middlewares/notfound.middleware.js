import httpStatusCodes from "http-status-codes";

/**
 * @description : Route not found handler
 * @param {import("express").Request} req
 * @param {import("express").Response} res
 * @param {import("express").NextFunction} next
 */
export default function routeNotFoundMiddleware(req, res) {
  return res.status(httpStatusCodes.NOT_FOUND).json({
    status: false,
    message: `${req.originalUrl} : ${req.method} is not available on server`,
  });
}
