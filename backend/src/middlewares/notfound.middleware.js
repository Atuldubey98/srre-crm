/**
 * @description : Route not found handler
 * @param {Request} req
 * @param {Response} res
 * @param {NextFunction} next
 * @returns {Response}
 */
export default function routeNotFoundMiddleware(req, res) {
  return res.status(404).json({
    status: false,
    message: `${req.originalUrl} : ${req.method} is not available on server`,
  });
}
