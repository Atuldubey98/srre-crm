export class ReportNotFound extends Error {
  constructor() {
    super("Report Not found");
    this.code = 404;
    this.stack = Error.captureStackTrace(this);
    this.name = "ReportNotFound";
  }
}
export class ReportFilterInvalid extends Error {
  constructor() {
    super("Report Filter invalid");
    this.code = 400;
    this.stack = Error.captureStackTrace(this);
    this.name = "ReportNotFound";
  }
}
