export class ReportNotFound extends Error {
  constructor() {
    super("Report Not found");
    this.code = 404;
    this.stack = Error.captureStackTrace(this);
    this.name = "ReportNotFound";
  }
}
