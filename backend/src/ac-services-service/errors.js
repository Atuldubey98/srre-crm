export class ServiceNotFound extends Error {
  constructor() {
    super("service not found");
    this.code = 404;
    this.stack = Error.captureStackTrace(this);
    this.name = "SERVICE_NOT_FOUND";
  }
}
