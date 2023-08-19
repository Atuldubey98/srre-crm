export class ServiceNotFound extends Error {
  constructor() {
    super("service not found");
    this.code = 404;
    this.stack = Error.captureStackTrace(this);
    this.name = "SERVICE_NOT_FOUND";
  }
}
export class ServiceBeingUsedByReportError extends Error {
  constructor() {
    super("Service already being used by reports");
    this.code = 400;
    this.stack = Error.captureStackTrace(this);
    this.name = "SERVICE_BEING_USED";
  }
}
