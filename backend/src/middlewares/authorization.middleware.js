export class UnauthorizedError extends Error {
  constructor() {
    super("Unauthorized for this request");
    this.code = 403;
    this.stack = Error.captureStackTrace(this);
    this.name = "Unauthorized";
  }
}

/**
 *
 * @param {import("express").Request} req
 * @param {import("express").Response} res
 * @param {import("express").NextFunction} next
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
