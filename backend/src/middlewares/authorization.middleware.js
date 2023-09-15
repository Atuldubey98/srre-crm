import httpStatusCodes from "http-status-codes";
export class UnauthorizedError extends Error {
  constructor() {
    super("Unauthorized for this request");
    this.code = httpStatusCodes.FORBIDDEN;
    this.stack = Error.captureStackTrace(this);
    this.name = "Unauthorized";
  }
}

/**
 * autorization middleware checks for role
 * @type {import("express").Handler}
 */
export default function authorizationMiddleware(req, res, next) {
  try {
    const role = req.user.role;
    if (role === "ADMIN") {
      next();
    } else {
      throw new UnauthorizedError();
    }
  } catch (error) {
    next(error);
  }
}
